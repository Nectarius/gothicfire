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
import io.ktor.server.websocket.*
import game.gameSocket
import kotlin.time.Duration.Companion.seconds
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.User
import models.UserSession
import models.TwitterPkceSession
import rpc.AppServiceImpl
import dev.kilua.rpc.applyRoutes
import com.mongodb.client.model.Filters
import io.ktor.client.request.forms.*
import io.ktor.util.*
import java.security.MessageDigest
import java.security.SecureRandom
import java.util.Base64

import config.TlsHelper
import org.slf4j.LoggerFactory

fun generateCodeVerifier(): String {
    val secureRandom = SecureRandom()
    val codeVerifier = ByteArray(32)
    secureRandom.nextBytes(codeVerifier)
    return Base64.getUrlEncoder().withoutPadding().encodeToString(codeVerifier)
}

fun generateCodeChallenge(codeVerifier: String): String {
    val bytes = codeVerifier.toByteArray(Charsets.US_ASCII)
    val messageDigest = MessageDigest.getInstance("SHA-256")
    messageDigest.update(bytes, 0, bytes.size)
    val digest = messageDigest.digest()
    return Base64.getUrlEncoder().withoutPadding().encodeToString(digest)
}

fun main() {
    val logger = LoggerFactory.getLogger("Server")
    val isDev = (EnvConfig["APP_MODE"] ?: "DEV").equals("DEV", ignoreCase = true)

    embeddedServer(
        factory = Netty,
        configure = {
            val behindProxy = (EnvConfig["BEHIND_REVERSE_PROXY"] ?: "false").toBoolean()
            if (isDev || behindProxy) {
                val devPort = EnvConfig["PORT"]?.toIntOrNull() ?: 8080
                connector {
                    host = "0.0.0.0"
                    port = devPort
                }
                if (isDev) {
                    logger.info("🚀 [Server] Running in DEV mode on http://localhost:$devPort (Addr: :$devPort)")
                } else {
                    logger.info("🚀 [Server] Running in PROD mode (Behind Proxy) on port $devPort")
                }
            } else {
                val prodPort = EnvConfig["PORT"]?.toIntOrNull() ?: 443
                val keyStore = TlsHelper.loadKeyStoreFromPem()
                sslConnector(
                    keyStore = keyStore,
                    keyAlias = "gothiccastles_key",
                    keyStorePassword = { "changeit".toCharArray() },
                    privateKeyPassword = { "changeit".toCharArray() }
                ) {
                    host = "0.0.0.0"
                    port = prodPort
                }
                logger.info("🔒 [Server] Running in PROD mode with TLS on https://gothiccastles.com:$prodPort (Addr: :$prodPort)")
            }
        },
        module = Application::module
    ).start(wait = true)
}

fun Application.module() {
    val isDev = (EnvConfig["APP_MODE"] ?: "DEV").equals("DEV", ignoreCase = true)

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
            cookie.httpOnly = true
            if (!isDev) {
                cookie.domain = "gothiccastles.com"
                cookie.secure = true
            }
        }
        cookie<TwitterPkceSession>("TWITTER_PKCE_SESSION") {
            cookie.path = "/"
            cookie.maxAgeInSeconds = 600 // 10 minutes
            cookie.httpOnly = true
            if (!isDev) {
                cookie.domain = "gothiccastles.com"
                cookie.secure = true
            }
        }
    }
    
    install(WebSockets) {
        pingPeriod = 15.seconds
        timeout = 15.seconds
        maxFrameSize = Long.MAX_VALUE
        masking = false
    }

    val httpClient = HttpClient(CIO)

    install(Authentication) {
        oauth("auth-oauth-google") {
            urlProvider = {
                if (isDev) {
                    EnvConfig["GOOGLE_REDIRECT_URI"] ?: "http://localhost:5120/auth/google/callback"
                } else {
                    EnvConfig["GOOGLE_REDIRECT_URI"] ?: "https://gothiccastles.com/auth/google/callback?provider=google"
                }
            }
            providerLookup = {
                OAuthServerSettings.OAuth2ServerSettings(
                    name = "google",
                    authorizeUrl = EnvConfig["GOOGLE_AUTH_URI"] ?: "https://accounts.google.com/o/oauth2/auth",
                    accessTokenUrl = EnvConfig["GOOGLE_TOKEN_URI"] ?: "https://oauth2.googleapis.com/token",
                    requestMethod = HttpMethod.Post,
                    clientId = EnvConfig["GOOGLE_CLIENT_ID"] ?: "dummy_client_id",
                    clientSecret = EnvConfig["GOOGLE_CLIENT_SECRET"] ?: "dummy_client_secret",
                    defaultScopes = listOf("email", "profile")
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
                        val redirectUrl = if (isDev) (EnvConfig["DEV_FRONTEND_URL"] ?: "http://localhost:5120/") else "/"
                        call.respondRedirect(redirectUrl)
                    } else {
                        call.respondText("Failed to retrieve user info", status = HttpStatusCode.InternalServerError)
                    }
                } else {
                    val redirectUrl = if (isDev) (EnvConfig["DEV_FRONTEND_URL"] ?: "http://localhost:5120/") else "/"
                    call.respondRedirect(redirectUrl)
                }
            }
        }

        get("/logout") {
            call.sessions.clear<UserSession>()
            val redirectUrl = if (isDev) (EnvConfig["DEV_FRONTEND_URL"] ?: "http://localhost:5120/") else "/"
            call.respondRedirect(redirectUrl)
        }

        get("/auth/twitter") {
            val codeVerifier = generateCodeVerifier()
            val codeChallenge = generateCodeChallenge(codeVerifier)
            val state = generateCodeVerifier() // reuse for random state string
            
            call.sessions.set(TwitterPkceSession(codeVerifier, state))
            
            val authUrl = URLBuilder(TwitterConfig.authUrl).apply {
                parameters.append("response_type", "code")
                parameters.append("client_id", TwitterConfig.clientId)
                parameters.append("redirect_uri", TwitterConfig.callbackUrl)
                parameters.append("scope", TwitterConfig.scopes)
                parameters.append("state", state)
                parameters.append("code_challenge", codeChallenge)
                parameters.append("code_challenge_method", "S256")
            }.buildString()
            
            call.respondRedirect(authUrl)
        }

        get("/auth/twitter/callback") {
            val code = call.request.queryParameters["code"]
            val state = call.request.queryParameters["state"]
            val pkceSession = call.sessions.get<TwitterPkceSession>()
            
            if (code == null || state == null || pkceSession == null || state != pkceSession.state) {
                call.respondText("Invalid request or state mismatch", status = HttpStatusCode.BadRequest)
                return@get
            }
            
            // clear pkce session
            call.sessions.clear<TwitterPkceSession>()
            
            // Exchange code for token
            val tokenResponse = httpClient.post(TwitterConfig.tokenUrl) {
                headers {
                    val authString = "${TwitterConfig.clientId}:${TwitterConfig.clientSecret}"
                    val base64Auth = Base64.getEncoder().encodeToString(authString.toByteArray())
                    append(HttpHeaders.Authorization, "Basic $base64Auth")
                }
                contentType(ContentType.Application.FormUrlEncoded)
                setBody(FormDataContent(Parameters.build {
                    append("grant_type", "authorization_code")
                    append("client_id", TwitterConfig.clientId)
                    append("redirect_uri", TwitterConfig.callbackUrl)
                    append("code", code)
                    append("code_verifier", pkceSession.codeVerifier)
                }))
            }
            
            if (tokenResponse.status.isSuccess()) {
                val tokenText = tokenResponse.bodyAsText()
                val json = Json.parseToJsonElement(tokenText).jsonObject
                val accessToken = json["access_token"]?.jsonPrimitive?.content
                
                if (accessToken != null) {
                    val userInfoResponse = httpClient.get("https://api.twitter.com/2/users/me") {
                        headers {
                            append(HttpHeaders.Authorization, "Bearer $accessToken")
                        }
                    }
                    
                    if (userInfoResponse.status.isSuccess()) {
                        val userText = userInfoResponse.bodyAsText()
                        val userJson = Json.parseToJsonElement(userText).jsonObject
                        val dataObj = userJson["data"]?.jsonObject
                        
                        val id = dataObj?.get("id")?.jsonPrimitive?.content ?: ""
                        val name = dataObj?.get("name")?.jsonPrimitive?.content ?: "Twitter User"
                        val username = dataObj?.get("username")?.jsonPrimitive?.content ?: ""
                        
                        val twitterId = "twitter_$id"
                        val email = "@$username"
                        
                        var user = MongoConfig.users.find(Filters.eq("id", twitterId)).firstOrNull()
                        if (user == null) {
                            user = User(twitterId, email, name, System.currentTimeMillis())
                            MongoConfig.users.insertOne(user)
                        }
                        
                        call.sessions.set(UserSession(twitterId, email, name))
                        val redirectUrl = if (isDev) (EnvConfig["DEV_FRONTEND_URL"] ?: "http://localhost:5120/") else "/"
                        call.respondRedirect(redirectUrl)
                        return@get
                    }
                }
            }
            call.respondText("Failed to authenticate with Twitter", status = HttpStatusCode.InternalServerError)
        }

        applyRoutes(rpc.AppServiceManager)
        
        gameSocket()
    }

    // Define kilua RPC endpoint
    initRpc {
        registerService<rpc.AppService> { AppServiceImpl(it) }
    }
}
