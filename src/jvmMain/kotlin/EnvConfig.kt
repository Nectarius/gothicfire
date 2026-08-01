import java.io.File

object EnvConfig {
    private val envVars = mutableMapOf<String, String>()

    init {
        val file = File(".env")
        if (file.exists()) {
            file.readLines().forEach { line ->
                val trimmed = line.trim()
                if (trimmed.isNotBlank() && !trimmed.startsWith("#")) {
                    val parts = trimmed.split("=", limit = 2)
                    if (parts.size == 2) {
                        envVars[parts[0].trim()] = parts[1].trim()
                    }
                }
            }
        }
    }

    operator fun get(key: String): String? {
        return System.getenv(key) ?: envVars[key]
    }
}
