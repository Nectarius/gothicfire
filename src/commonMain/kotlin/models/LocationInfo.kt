package models

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/**
 * Canon titles across the Gothic game series.
 */
object GothicTitles {
    const val G1 = "Gothic"
    const val G2 = "Gothic II"
    const val NOTR = "Night of the Raven"
    const val G3 = "Gothic 3"
}

/**
 * An iconic NPC or creature associated with a sector.
 */
@Serializable
data class LocationCharacter(
    val name: String,
    val role: String,
    val description: String
)

/**
 * Lore chronicle entry for a strategic map location.
 * Information is defined in external JSON files (`location_info.json` and `location_info_<locale>.json`)
 * so that content and language additions can be made without touching Kotlin code.
 */
@Serializable
data class LocationInfo(
    val sectorId: String,
    val title: String,
    val region: String,
    val tagline: String,
    val imageUrl: String,
    val appearsIn: List<String> = emptyList(),
    val description: String,
    val history: String,
    val characters: List<LocationCharacter> = emptyList(),
    val facts: List<String> = emptyList()
)

/**
 * Repository managing location information loaded dynamically from JSON files.
 * Supports multiple locales (e.g. `location_info_en.json`, `location_info_ru.json`, `location_info_el.json`)
 * and falls back gracefully to the default English catalog.
 */
object LocationInfoRepository {
    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
    }

    private val catalogsByLang = mutableMapOf<String, Map<String, LocationInfo>>()

    init {
        // Initialize with default fallback JSON
        try {
            val defaultCatalog = parseCatalog(DefaultLocationInfoJson.CONTENT)
            catalogsByLang["default"] = defaultCatalog
            catalogsByLang["en"] = defaultCatalog
        } catch (_: Throwable) {
            // Fallback catalog is empty if parsing fails
        }
    }

    /**
     * Parses a JSON string containing either a map of sectorId -> LocationInfo
     * or a list of LocationInfo items.
     */
    fun parseCatalog(jsonString: String): Map<String, LocationInfo> {
        return try {
            json.decodeFromString<Map<String, LocationInfo>>(jsonString)
        } catch (_: Throwable) {
            // Support list format as well
            val list = json.decodeFromString<List<LocationInfo>>(jsonString)
            list.associateBy { it.sectorId }
        }
    }

    /**
     * Registers or updates a catalog for a specific language code.
     */
    fun registerCatalog(langCode: String, catalog: Map<String, LocationInfo>) {
        catalogsByLang[langCode.lowercase()] = catalog
    }

    /**
     * Loads and registers a catalog directly from a JSON string.
     */
    fun loadFromJson(jsonString: String, langCode: String = "en"): Map<String, LocationInfo> {
        val parsed = parseCatalog(jsonString)
        registerCatalog(langCode, parsed)
        return parsed
    }

    /**
     * Retrieves location info for a given sectorId, checking the requested language
     * first and falling back to English / default.
     */
    fun getLocationInfo(sectorId: String, langCode: String? = null): LocationInfo? {
        val lang = langCode?.lowercase()
        if (lang != null && lang.isNotBlank()) {
            val localized = catalogsByLang[lang]?.get(sectorId)
            if (localized != null) return localized
        }
        return catalogsByLang["en"]?.get(sectorId)
            ?: catalogsByLang["default"]?.get(sectorId)
    }

    /**
     * Returns all locations for a given language.
     */
    fun getAllLocations(langCode: String? = null): Map<String, LocationInfo> {
        val lang = langCode?.lowercase()
        if (lang != null && lang.isNotBlank()) {
            val localized = catalogsByLang[lang]
            if (localized != null && localized.isNotEmpty()) return localized
        }
        return catalogsByLang["en"]
            ?: catalogsByLang["default"]
            ?: emptyMap()
    }

    /**
     * Checks if a catalog has been loaded for the given language.
     */
    fun isLanguageLoaded(langCode: String): Boolean {
        val lang = langCode.lowercase()
        return catalogsByLang[lang]?.isNotEmpty() == true
    }
}

/**
 * Top-level convenience accessor for LocationInfo by sectorId.
 */
fun getLocationInfo(sectorId: String, langCode: String? = null): LocationInfo? =
    LocationInfoRepository.getLocationInfo(sectorId, langCode)

/**
 * Backward-compatible catalog map.
 */
val LocationInfoCatalog: Map<String, LocationInfo>
    get() = LocationInfoRepository.getAllLocations()
