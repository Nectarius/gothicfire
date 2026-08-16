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
    // Mages
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
        templateId = "nefarius",
        name = "Nefarius",
        warlord = 2,
        intellect = 8,
        vanguard = 4,
        archon = 8,
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
    
    // Archers / Hunters
    CharacterTemplate(
        templateId = "cavalorn",
        name = "Cavalorn",
        warlord = 4,
        intellect = 4,
        vanguard = 9,
        archon = 2,
        isArcher = true
    ),
    CharacterTemplate(
        templateId = "bosper",
        name = "Bosper",
        warlord = 2,
        intellect = 6,
        vanguard = 8,
        archon = 1,
        isArcher = true
    ),
    CharacterTemplate(
        templateId = "bartok",
        name = "Bartok",
        warlord = 3,
        intellect = 3,
        vanguard = 10,
        archon = 1,
        isArcher = true
    ),
    
    // Soldiers / Mercenaries
    CharacterTemplate(
        templateId = "lordhagen",
        name = "Lord Hagen",
        warlord = 10,
        intellect = 6,
        vanguard = 8,
        archon = 2,
        isSoldier = true
    ),
    CharacterTemplate(
        templateId = "lee",
        name = "Lee",
        warlord = 9,
        intellect = 5,
        vanguard = 9,
        archon = 1,
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
