package models

import kotlinx.serialization.Serializable

@Serializable
data class TavernPatron(
    val id: String,
    val name: String,
    val role: String,
    val iconUrl: String,
    val catchphrase: String,
    val topicDescription: String
)

val KhorinisTavernPatrons = listOf(
    TavernPatron(
        id = "KARDIF",
        name = "Kardif",
        role = "Barkeep & Information Broker",
        iconUrl = "/characters/kardif.png",
        catchphrase = "Information costs gold, friend. In the harbor, nobody talks for free. What do you want to hear?",
        topicDescription = "Inquire about general gossip, food supplies, and the state of the city"
    ),
    TavernPatron(
        id = "MOE",
        name = "Moe",
        role = "Harbor Gate Thug",
        iconUrl = "/characters/moe.png",
        catchphrase = "Hey, you! You're new here. Newcomers usually buy Moe a beer before they get their faces smashed in.",
        topicDescription = "Ask about city defense, street brawls, and border protection"
    ),
    TavernPatron(
        id = "ALRIK",
        name = "Alrik",
        role = "Pit Fighter & Veteran Duelist",
        iconUrl = "/characters/alrik.png",
        catchphrase = "Looking for a fight? Fifty gold coins and we step behind the storehouse. No magic, no potions, just steel.",
        topicDescription = "Ask about army strength, soldier discipline, and military power"
    ),
    TavernPatron(
        id = "HALVOR",
        name = "Halvor",
        role = "Fish Merchant & Fence",
        iconUrl = "/characters/halvor.png",
        catchphrase = "Fresh fish from the bay! ...Or perhaps you are interested in goods that didn't pay the governor's customs tax?",
        topicDescription = "Ask about the merchant market rates and treasury gold reserves"
    ),
    TavernPatron(
        id = "VALENTINO",
        name = "Valentino",
        role = "Arrogant Upper District Noble",
        iconUrl = "/characters/valentino.png",
        catchphrase = "Step aside, peasant. You're blocking the light. Some of us actually have estates and gold to drink away.",
        topicDescription = "Taunt him regarding your royal treasury compared to the rivals"
    )
)

@Serializable
data class TavernDialogueResponse(
    val patronId: String,
    val patronName: String,
    val greeting: String,
    val gossipReply: String,
    val timestamp: Long = 0L
)
