package models

import kotlinx.serialization.Serializable

@Serializable
data class CharacterTemplate(
    val templateId: String,
    val name: String,
    val warlord: Int,
    val intellect: Int,
    val vanguard: Int,
    val archon: Int,
    val isMage: Boolean = false,
    val isArcher: Boolean = false,
    val isSoldier: Boolean = false
)

val PredefinedCharacters = listOf(
    // =========================================================================
    // Mages (7 Heroes — Circle of Fire, Circle of Water, Necromancy & Sleeper)
    // =========================================================================
    CharacterTemplate(
        templateId = "riordian",
        name = "Riordian",
        warlord = 6,
        intellect = 8,
        vanguard = 2,
        archon = 9,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "merdarion",
        name = "Merdarion",
        warlord = 5,
        intellect = 10,
        vanguard = 2,
        archon = 8,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "neoras",
        name = "Neoras",
        warlord = 3,
        intellect = 9,
        vanguard = 4,
        archon = 8,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "parlan",
        name = "Parlan",
        warlord = 5,
        intellect = 8,
        vanguard = 5,
        archon = 7,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "daron",
        name = "Daron",
        warlord = 4,
        intellect = 8,
        vanguard = 2,
        archon = 8,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "nefarius",
        name = "Nefarius",
        warlord = 3,
        intellect = 9,
        vanguard = 4,
        archon = 8,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "lester",
        name = "Lester",
        warlord = 3,
        intellect = 8,
        vanguard = 6,
        archon = 7,
        isMage = true
    ),

    // =========================================================================
    // Archers / Hunters / Scouts (6 Heroes — Shadows, Rangers & Crossbowmen)
    // =========================================================================
    CharacterTemplate(
        templateId = "diego",
        name = "Diego",
        warlord = 5,
        intellect = 7,
        vanguard = 10,
        archon = 2,
        isArcher = true
    ),
    CharacterTemplate(
        templateId = "cavalorn",
        name = "Cavalorn",
        warlord = 5,
        intellect = 5,
        vanguard = 9,
        archon = 4,
        isArcher = true
    ),
    CharacterTemplate(
        templateId = "wolf",
        name = "Wolf",
        warlord = 5,
        intellect = 6,
        vanguard = 9,
        archon = 3,
        isArcher = true
    ),
    CharacterTemplate(
        templateId = "scorpio",
        name = "Scorpio",
        warlord = 6,
        intellect = 5,
        vanguard = 9,
        archon = 3,
        isArcher = true
    ),
    CharacterTemplate(
        templateId = "bosper",
        name = "Bosper",
        warlord = 4,
        intellect = 7,
        vanguard = 9,
        archon = 3,
        isArcher = true
    ),
    CharacterTemplate(
        templateId = "bartok",
        name = "Bartok",
        warlord = 5,
        intellect = 5,
        vanguard = 10,
        archon = 3,
        isArcher = true
    ),

    // =========================================================================
    // Soldiers / Mercenaries / Wardens (7 Heroes — Mercenaries, Barons & Templars)
    // =========================================================================
    CharacterTemplate(
        templateId = "wulfgar",
        name = "Wulfgar",
        warlord = 8,
        intellect = 5,
        vanguard = 8,
        archon = 1,
        isSoldier = true
    ),
    CharacterTemplate(
        templateId = "parcival",
        name = "Parcival",
        warlord = 10,
        intellect = 8,
        vanguard = 5,
        archon = 5,
        isSoldier = true
    ),
    CharacterTemplate(
        templateId = "gorn",
        name = "Gorn",
        warlord = 9,
        intellect = 4,
        vanguard = 9,
        archon = 2,
        isSoldier = true
    ),
    CharacterTemplate(
        templateId = "thorus",
        name = "Thorus",
        warlord = 9,
        intellect = 6,
        vanguard = 5,
        archon = 3,
        isSoldier = true
    ),
    CharacterTemplate(
        templateId = "corangar",
        name = "Cor Angar",
        warlord = 8,
        intellect = 5,
        vanguard = 5,
        archon = 6,
        isSoldier = true
    ),
    CharacterTemplate(
        templateId = "raven",
        name = "Raven",
        warlord = 7,
        intellect = 6,
        vanguard = 5,
        archon = 6,
        isSoldier = true
    ),
    CharacterTemplate(
        templateId = "lares",
        name = "Lares",
        warlord = 5,
        intellect = 8,
        vanguard = 10,
        archon = 2,
        isSoldier = true
    )
)
