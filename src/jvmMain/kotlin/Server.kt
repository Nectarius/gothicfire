import db.MongoConfig
import dev.kilua.rpc.initRpc
import dev.kilua.rpc.registerService
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.sessions.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.User
import models.UserSession
import rpc.AppServiceImpl
import dev.kilua.rpc.applyRoutes
import com.mongodb.client.model.Filters

fun main() {
    embeddedServer(Netty, port = 8081, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Delete)
        allowMethod(HttpMethod.Patch)
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowCredentials = true
        anyHost() // Use carefully in production!
    }

    install(Sessions) {
        cookie<UserSession>("USER_SESSION") {
            cookie.path = "/"
            cookie.maxAgeInSeconds = 3600 * 24 * 7 // 1 week
        }
    }

    val httpClient = HttpClient(CIO)

    install(Authentication) {
        oauth("auth-oauth-google") {
            urlProvider = { "http://localhost:5120/auth/google/callback" }
            providerLookup = {
                OAuthServerSettings.OAuth2ServerSettings(
                    name = "google",
                    authorizeUrl = EnvConfig["GOOGLE_AUTH_URI"] ?: "https://accounts.google.com/o/oauth2/auth",
                    accessTokenUrl = EnvConfig["GOOGLE_TOKEN_URI"] ?: "https://oauth2.googleapis.com/token",
                    requestMethod = HttpMethod.Post,
                    clientId = EnvConfig["GOOGLE_CLIENT_ID"] ?: "dummy_client_id",
                    clientSecret = EnvConfig["GOOGLE_CLIENT_SECRET"] ?: "dummy_client_secret",
                    defaultScopes = listOf("https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email")
                )
            }
            client = httpClient
        }
    }

    routing {
        authenticate("auth-oauth-google") {
            get("/login") {
                // Ktor automatically redirects to Google OAuth
            }
            get("/auth/google/callback") {
                val principal = call.principal<OAuthAccessTokenResponse.OAuth2>()
                if (principal != null) {
                    val token = principal.accessToken
                    
                    // Fetch user info from Google
                    val userInfoResponse: HttpResponse = httpClient.get("https://www.googleapis.com/oauth2/v2/userinfo") {
                        headers {
                            append(HttpHeaders.Authorization, "Bearer $token")
                        }
                    }
                    
                    if (userInfoResponse.status == HttpStatusCode.OK) {
                        val userInfoText = userInfoResponse.bodyAsText()
                        val json = Json.parseToJsonElement(userInfoText).jsonObject
                        
                        val id = json["id"]?.jsonPrimitive?.content ?: ""
                        val email = json["email"]?.jsonPrimitive?.content ?: ""
                        val name = json["name"]?.jsonPrimitive?.content ?: "User"
                        
                        // Check if user exists, else insert
                        var user = MongoConfig.users.find(Filters.eq("id", id)).firstOrNull()
                        if (user == null) {
                            user = User(id, email, name, System.currentTimeMillis())
                            MongoConfig.users.insertOne(user)
                        }
                        //localhost:5120/auth/google/callback
                        call.sessions.set(UserSession(id, email, name))
                        call.respondRedirect("/")
                    } else {
                        call.respondText("Failed to retrieve user info", status = HttpStatusCode.InternalServerError)
                    }
                } else {
                    call.respondRedirect("/")
                }
            }
        }

        get("/logout") {
            call.sessions.clear<UserSession>()
            call.respondRedirect("/")
        }

        applyRoutes(rpc.AppServiceManager)
    }

    // Define kilua RPC endpoint
    initRpc {
        registerService<rpc.AppService> { AppServiceImpl(it) }
    }
}
