package components

import androidx.compose.runtime.mutableStateOf
import kotlinx.browser.window
import models.LocationInfoRepository

/**
 * Client-side loader for location information JSON files.
 * Loads `location_info.json` or `location_info_<lang>.json` dynamically via HTTP fetch
 * and updates LocationInfoRepository reactively.
 */
object LocationInfoLoader {
    private val requestedLanguages = mutableSetOf<String>()

    /**
     * Observable version state that increments whenever new location info is loaded,
     * triggering recomposition in UI components that observe it.
     */
    val catalogVersion = mutableStateOf(0)

    fun loadLanguage(langCode: String) {
        val code = langCode.lowercase().trim()
        if (code.isEmpty() || requestedLanguages.contains(code)) return
        requestedLanguages.add(code)

        // Determine URL: for 'en' we check /locales/location_info_en.json then /locales/location_info.json
        val primaryUrl = "/locales/location_info_$code.json"
        val fallbackUrl = "/locales/location_info.json"

        try {
            window.fetch(primaryUrl).then { response ->
                if (response.ok) {
                    response.text().then { text ->
                        try {
                            LocationInfoRepository.loadFromJson(text, code)
                            catalogVersion.value += 1
                        } catch (_: Throwable) {}
                    }
                } else {
                    // Try fallback default location_info.json if primary locale file was not found
                    if (code != "en") {
                        loadDefaultFallback()
                    }
                }
            }.catch {
                loadDefaultFallback()
            }
        } catch (_: Throwable) {
            // Offline or fetch unavailable; repository keeps using default JSON
        }
    }

    private fun loadDefaultFallback() {
        try {
            window.fetch("/locales/location_info.json").then { response ->
                if (response.ok) {
                    response.text().then { text ->
                        try {
                            LocationInfoRepository.loadFromJson(text, "en")
                            catalogVersion.value += 1
                        } catch (_: Throwable) {}
                    }
                }
            }.catch {}
        } catch (_: Throwable) {}
    }
}
