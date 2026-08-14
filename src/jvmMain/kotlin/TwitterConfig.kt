import EnvConfig

object TwitterConfig {
    val clientId: String = EnvConfig["TWITTER_CLIENT_ID"] ?: "dummy_client_id"
    val clientSecret: String = EnvConfig["TWITTER_CLIENT_SECRET"] ?: "dummy_client_secret"
    val authUrl: String = EnvConfig["TWITTER_AUTH_URI"] ?: "https://twitter.com/i/oauth2/authorize"
    val tokenUrl: String = EnvConfig["TWITTER_TOKEN_URI"] ?: "https://api.twitter.com/2/oauth2/token"
    val isDev: Boolean = (EnvConfig["APP_MODE"] ?: "DEV").equals("DEV", ignoreCase = true)
    val callbackUrl: String = EnvConfig["TWITTER_CALLBACK_URL"] 
        ?: if (isDev) "http://localhost:5120/auth/twitter/callback" else "https://kornelian.com/auth/twitter/callback"
    val scopes: String = "tweet.read users.read offline.access"
}
