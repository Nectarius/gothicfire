package config

import java.io.File
import models.TacticalBalanceConfig
import models.TacticalBalanceRepository
import org.slf4j.LoggerFactory

/**
 * Loads tactical combat balance settings from the dedicated JSON file upon startup
 * and caches the configuration in memory via TacticalBalanceRepository.
 */
object TacticalBalanceLoader {
    private val logger = LoggerFactory.getLogger(TacticalBalanceLoader::class.java)

    /**
     * Attempts to load tactical combat balance settings in order:
     * 1. Explicit path parameter (if provided)
     * 2. Environment variable `TACTICAL_BALANCE_PATH`
     * 3. Working directory file `tactical_balance.json`
     * 4. Classpath resource `/tactical_balance.json`
     * 5. Built-in default configuration
     */
    fun loadBalanceSettings(preferredPath: String? = null): TacticalBalanceConfig {
        val targetPath = preferredPath 
            ?: System.getenv("TACTICAL_BALANCE_PATH") 
            ?: "tactical_balance.json"

        val file = File(targetPath)
        if (file.exists() && file.isFile) {
            try {
                val jsonText = file.readText(Charsets.UTF_8)
                val config = TacticalBalanceRepository.loadFromJson(jsonText)
                logger.info("⚔️ [TacticalBalance] Successfully loaded balance settings from file: ${file.absolutePath} (${config.units.size} unit profiles configured)")
                return config
            } catch (e: Exception) {
                logger.error("⚔️ [TacticalBalance] Failed to load balance from file ${file.absolutePath}, attempting classpath fallback", e)
            }
        }

        val resourceStream = TacticalBalanceLoader::class.java.getResourceAsStream("/tactical_balance.json")
        if (resourceStream != null) {
            try {
                val jsonText = resourceStream.bufferedReader(Charsets.UTF_8).use { it.readText() }
                val config = TacticalBalanceRepository.loadFromJson(jsonText)
                logger.info("⚔️ [TacticalBalance] Successfully loaded balance settings from classpath resource /tactical_balance.json (${config.units.size} unit profiles configured)")
                return config
            } catch (e: Exception) {
                logger.error("⚔️ [TacticalBalance] Failed to parse classpath resource /tactical_balance.json, using built-in defaults", e)
            }
        }

        logger.warn("⚔️ [TacticalBalance] No external balance file found at '$targetPath' or in classpath. Retaining built-in default balance settings.")
        return TacticalBalanceRepository.getConfig()
    }
}
