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
        templateId = "milten",
        name = "Milten",
        warlord = 3,
        intellect = 10,
        vanguard = 2,
        archon = 10,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "xardas",
        name = "Xardas",
        warlord = 4,
        intellect = 10,
        vanguard = 2,
        archon = 9,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "saturas",
        name = "Saturas",
        warlord = 3,
        intellect = 10,
        vanguard = 3,
        archon = 8,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "pyrokar",
        name = "Pyrokar",
        warlord = 5,
        intellect = 9,
        vanguard = 2,
        archon = 9,
        isMage = true
    ),
    CharacterTemplate(
        templateId = "torrez",
        name = "Torrez",
        warlord = 4,
        intellect = 9,
        vanguard = 2,
        archon = 9,
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
        templateId = "lee",
        name = "Lee",
        warlord = 10,
        intellect = 5,
        vanguard = 8,
        archon = 1,
        isSoldier = true
    ),
    CharacterTemplate(
        templateId = "gomez",
        name = "Gomez",
        warlord = 9,
        intellect = 7,
        vanguard = 6,
        archon = 2,
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
        warlord = 6,
        intellect = 6,
        vanguard = 10,
        archon = 2,
        isSoldier = true
    )
)
