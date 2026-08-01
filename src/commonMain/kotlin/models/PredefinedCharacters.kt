package models

import kotlinx.serialization.Serializable

@Serializable
data class CharacterTemplate(
    val templateId: String,
    val name: String,
    val title: String,
    val strength: Int,
    val agility: Int,
    val wisdom: Int,
    val description: String
)

val PredefinedCharacters: List<CharacterTemplate> = listOf(
    CharacterTemplate(
        templateId = "hero",
        name = "Nameless Hero",
        title = "Chosen of Innos",
        strength = 14,
        agility = 13,
        wisdom = 13,
        description = "A versatile warrior and tactician capable of adapting to any combat situation."
    ),
    CharacterTemplate(
        templateId = "diego",
        name = "Diego",
        title = "Master Shadow",
        strength = 10,
        agility = 20,
        wisdom = 10,
        description = "A cunning shadow with unmatched dexterity, speed, and strategic awareness."
    ),
    CharacterTemplate(
        templateId = "gorn",
        name = "Gorn",
        title = "Mercenary Berserker",
        strength = 22,
        agility = 10,
        wisdom = 8,
        description = "A ferocious front-line champion possessing devastating physical power."
    ),
    CharacterTemplate(
        templateId = "milten",
        name = "Milten",
        title = "Magician of Fire",
        strength = 8,
        agility = 10,
        wisdom = 22,
        description = "A devoted scholar of the circle of fire, wielding ancient wisdom."
    ),
    CharacterTemplate(
        templateId = "lester",
        name = "Lester",
        title = "Brotherhood Novice",
        strength = 12,
        agility = 12,
        wisdom = 16,
        description = "A calm meditative monk with balanced combat training and strong mental fortitude."
    )
)
