package models

import kotlinx.serialization.Serializable

@Serializable
enum class NpcTag {
    HUNTER
}

@Serializable
data class TavernPatron(
    val id: String,
    val name: String,
    val role: String,
    val iconUrl: String,
    val catchphrase: String,
    val topicDescription: String = "",
    val defaultResponse: String = "",
    val tags: Set<NpcTag> = emptySet()
) {
    val greeting: String get() = catchphrase
    val isHunter: Boolean get() = tags.contains(NpcTag.HUNTER)
}

@Serializable
data class SectorSubLocation(
    val sectorId: String,
    val buttonEmoji: String,
    val buttonLabel: String,
    val buttonTooltip: String,
    val modalTitle: String,
    val modalSubtitle: String,
    val bannerImageUrl: String = "/tavern_khorinis.png",
    val patrons: List<TavernPatron>
)

val KhorinisTavernPatrons = listOf(
    TavernPatron(
        id = "KARDIF",
        name = "Kardif",
        role = "Barkeep & Information Broker",
        iconUrl = "/characters/kardif.png",
        catchphrase = "Information costs gold, friend. In the harbor, nobody talks for free. What do you want to hear?",
        topicDescription = "Inquire about general gossip, food supplies, and the state of the city",
        defaultResponse = "Inside detail: Buy my info on the secret thieves guild and who trades stolen goods behind the slipway. Strategic Hint: The City of Khorinis is your Home Castle with 20 base Protection and 7 Food/turn."
    ),
    TavernPatron(
        id = "MOE",
        name = "Moe",
        role = "Harbor Gate Thug",
        iconUrl = "/characters/moe.png",
        catchphrase = "Hey, you! You're new here. Newcomers usually buy Moe a beer before they get their faces smashed in.",
        topicDescription = "Ask about city defense, street brawls, and border protection",
        defaultResponse = "Inside detail: Beat me in a brawl outside Kardif's door and I'll leave you alone forever. Strategic Hint: Keep your city walls fortified above 20 Protection to repel raids from Lobart's Farm."
    ),
    TavernPatron(
        id = "ALRIK",
        name = "Alrik",
        role = "Pit Fighter & Veteran Duelist",
        iconUrl = "/characters/alrik.png",
        catchphrase = "Looking for a fight? Fifty gold coins and we step behind the storehouse. No magic, no potions, just steel.",
        topicDescription = "Ask about army strength, soldier discipline, and military power",
        defaultResponse = "Inside detail: Return my stolen sword from Jora's merchant booth to unlock duel wagers. Strategic Hint: Heavy Infantry recruit directly at Castles with 20 Protection."
    ),
    TavernPatron(
        id = "HALVOR",
        name = "Halvor",
        role = "Fish Merchant & Fence",
        iconUrl = "/characters/halvor.png",
        catchphrase = "Fresh fish from the bay! ...Or perhaps you are interested in goods that didn't pay the governor's customs tax?",
        topicDescription = "Ask about the merchant market rates and treasury gold reserves",
        defaultResponse = "Inside detail: Give me my incriminating fish note without turning me in to Lord Andre, and I become your permanent fence for silver and gold chalices. Strategic Hint: Use market trade when the exchange rate favors gold."
    ),
    TavernPatron(
        id = "VALENTINO",
        name = "Valentino",
        role = "Arrogant Upper District Noble",
        iconUrl = "/characters/valentino.png",
        catchphrase = "Step aside, peasant. You're blocking the light. Some of us actually have estates and gold to drink away.",
        topicDescription = "Taunt him regarding your royal treasury compared to the rivals",
        defaultResponse = "Inside detail: Beat me up behind Coragon's tavern at 4 AM to loot my ring and key without city guard bounties! Strategic Hint: Stockpile gold in the royal treasury to hire high-tier units."
    )
)

val SectorSubLocations: Map<String, SectorSubLocation> = mapOf(
    "0" to SectorSubLocation(
        sectorId = "0",
        buttonEmoji = "🏮",
        buttonLabel = "Enter Lighthouse Cabin",
        buttonTooltip = "Wind-swept tower overlooking the jagged reefs of Khorinis",
        modalTitle = "🏮 The Lantern Room & Keeper's Cabin",
        modalSubtitle = "Wind-swept tower overlooking the jagged reefs of Khorinis",
        bannerImageUrl = "/locations/jack_lighthouse_lantern.jpg",
        patrons = listOf(
            TavernPatron(
                id = "jack",
                name = "Old Jack",
                role = "Retired Sailor & Lighthouse Keeper",
                iconUrl = "/characters/old_jack.jpg",
                catchphrase = "Bandits chased me right out of my own tower! Thank Innos someone with steel in their spine finally cleared the steps.",
                topicDescription = "Inquire about coastal reefs, pirates, and defending the lighthouse",
                defaultResponse = "Inside detail: If you look out past the reefs on a clear day, you can still spot the route Captain Greg's pirate ship took before the royal galley sank her. Strategic Hint: My lighthouse only connects to Niclas's Overlook (#3). A single connections-1 dead-end means no enemy can flank you from behind—park a battered hero here to safely collect stored Gold and Food!"
            ),
            TavernPatron(
                id = "brian",
                name = "Brian",
                role = "Harad's Former Blacksmith Apprentice",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Once Harad's apprenticeship ended, I came up here to tend the beacon fires with Jack.",
                topicDescription = "Inquire about Harad's smithy, orc weapons, and fortifying the cliffs",
                defaultResponse = "Inside detail: Harad only respects warriors who bring him genuine Orc weapons, even if you quietly looted one off a cave floor near the East Gate! Strategic Hint: With 11 base Protection, fortifying this cliff turns it into a northern redoubt that takes an enemy siege engine to crack."
            )
        )
    ),
    "1" to SectorSubLocation(
        sectorId = "1",
        buttonEmoji = "🏹",
        buttonLabel = "Visit Hunter's Blind",
        buttonTooltip = "Pine-needle clearing littered with shadowbeast tracks and wolf pelts",
        modalTitle = "🏹 The Deep Grimwald Hunting Blind",
        modalSubtitle = "Pine-needle clearing littered with shadowbeast tracks and wolf pelts",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "bartok",
                name = "Bartok",
                role = "Former Hunter of Khorinis",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Fifty gold coins and we hunt together—just don't expect me to walk past that shadowbeast in the deep woods!",
                topicDescription = "Ask about hunting in the deep woods and missing hunters",
                defaultResponse = "Inside detail: My old friend Trokar went deeper into these woods after drinking too much at Coragon's tavern and never came back—only his hunting horn remained. Strategic Hint: Northern Grimwald bridges the Circle of the Sun (#5) and Black Troll Gorge (#2). Use Search Scrolls here before advancing on the Monastery!",
                tags = setOf(NpcTag.HUNTER)
            )
        )
    ),
    "2" to SectorSubLocation(
        sectorId = "2",
        buttonEmoji = "🔥",
        buttonLabel = "Visit Grimbald's Campfire",
        buttonTooltip = "Rocky plateau beside the Black Troll's boulder-strewn lair",
        modalTitle = "🔥 Grimbald's Lakeside Camp",
        modalSubtitle = "Rocky plateau beside the Black Troll's boulder-strewn lair",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "grimbald",
                name = "Grimbald",
                role = "Master Big-Game Hunter",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Keep your voice down! That hulking black beast across the stream has hide thicker than castle iron.",
                topicDescription = "Ask about big game hunting and the Black Troll's weakness",
                defaultResponse = "Inside detail: You don't need an army to slay the Black Troll—a single Shrink Monster scroll bought from Zuris shrinks it to the size of a sheep in seconds! Strategic Hint: This gorge has 12 natural Protection and borders the Monastery of Innos (#7) directly. Station a hero here to maintain Fog-of-War vision over the Monastery's northern flank.",
                tags = setOf(NpcTag.HUNTER)
            )
        )
    ),
    "3" to SectorSubLocation(
        sectorId = "3",
        buttonEmoji = "🍖",
        buttonLabel = "Sit by Niclas's Campfire",
        buttonTooltip = "Smoky campfire with roasting molerat meat high above the city road",
        modalTitle = "🍖 Niclas's Cliffside Roost",
        modalSubtitle = "Smoky campfire with roasting molerat meat high above the city road",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "niclas",
                name = "Niclas",
                role = "Hermit Marksman",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Have a piece of roasted meat! Down in the city everyone's scrambling for gold and paladin decrees—up here I answer only to the wind.",
                topicDescription = "Ask about hermit life, archery training, and cliff shortcuts",
                defaultResponse = "Inside detail: Most travelers never climb the ledge behind Jack's road, missing out on the earliest free bow-training on the island. Strategic Hint: My cliff connects 5 different sectors (#0, #1, #4, #5, #12). Controlling this hub lets your archers pivot between the northern coast and the central crossroads in a single turn.",
                tags = setOf(NpcTag.HUNTER)
            )
        )
    ),
    "4" to SectorSubLocation(
        sectorId = "4",
        buttonEmoji = "🍶",
        buttonLabel = "Enter Secret Still Cave",
        buttonTooltip = "Locked subterranean cellar smelling strongly of fermented berries and gin",
        modalTitle = "🍶 Vino's Hidden Forest Distillery",
        modalSubtitle = "Locked subterranean cellar smelling strongly of fermented berries and gin",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "vino_hollow",
                name = "Vino",
                role = "Fieldhand & Secret Distiller",
                iconUrl = "/characters/halvor.png",
                catchphrase = "How did you get past the rusty key lock?! Don't tell the Fire Mages—especially if they've already possessed my mind with Beliar's whispers!",
                topicDescription = "Ask about the secret berry still and avoiding Fire Mage scrutiny",
                defaultResponse = "Inside detail: Inside my hidden cave behind these woods, I kept an alchemical still that drove the novices mad with envy until the Seekers broke my mind in Chapter 3. Strategic Hint: Vinno's Hollow yields 4 Food per turn at base cultivation—cultivate it once with a high-Intellect commander to turn it into a reliable northern supply depot."
            )
        )
    ),
    "5" to SectorSubLocation(
        sectorId = "5",
        buttonEmoji = "☀️",
        buttonLabel = "Approach the Ritual Altar",
        buttonTooltip = "Ancient stone ring where the three gods' avatars converge",
        modalTitle = "☀️ The Megalithic Altar of the Sun",
        modalSubtitle = "Ancient stone ring where the three gods' avatars converge",
        bannerImageUrl = "/locations/monastery_library_cellar.jpg",
        patrons = listOf(
            TavernPatron(
                id = "vatras_sun",
                name = "Vatras",
                role = "Preacher of Adanos & Ritual Mediator",
                iconUrl = "/characters/vatras.jpg",
                catchphrase = "Only where Fire and Darkness stand in equilibrium through Water may the Eye of Innos be mended.",
                topicDescription = "Ask about divine balance, the Eye of Innos, and the ancient stone circles",
                defaultResponse = "Inside detail: Even Xardas and Pyrokar had to set aside centuries of schism at these stones when the Seekers shattered the sacred amulet frame. Strategic Hint: With 12 Protection and 5 adjacent routes (#1, #2, #3, #4, #7), holding the Circle of the Sun controls the western gate to the Monastery of Innos."
            )
        )
    ),
    "6" to SectorSubLocation(
        sectorId = "6",
        buttonEmoji = "🛡️",
        buttonLabel = "Visit Mika's Watchpost",
        buttonTooltip = "Timber clearing where the city militia watches the farm roads",
        modalTitle = "🛡️ Mika's Roadside Guard Post",
        modalSubtitle = "Timber clearing where the city militia watches the farm roads",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "mika",
                name = "Mika",
                role = "Militia Road Warden",
                iconUrl = "/knight_icon.png",
                catchphrase = "For ten gold pieces, I make sure bandits and mercenaries regret stepping into these trees.",
                topicDescription = "Hire road protection and ask about bandit movements",
                defaultResponse = "Inside detail: If you lure a shadowbeast or an entire pack of bandits out of Northgate Woods right up to me, I'll happily tank them for you—assuming I survive! Strategic Hint: Northgate Woods yields 5 Food per turn and links Erol's Bridge (#16) to Canthar's Crossroads (#12). Never leave it unguarded if enemies hold Lobart's Farm."
            )
        )
    ),
    "7" to SectorSubLocation(
        sectorId = "7",
        buttonEmoji = "📜",
        buttonLabel = "Enter Library & Wine Cellar",
        buttonTooltip = "Candlelit vaults beneath the sanctuary of the Circle of Fire",
        modalTitle = "📜 The Sacred Library & Gorax's Wine Cellar",
        modalSubtitle = "Candlelit vaults beneath the sanctuary of the Circle of Fire",
        bannerImageUrl = "/locations/monastery_library_cellar.jpg",
        patrons = listOf(
            TavernPatron(
                id = "hyglas",
                name = "Hyglas",
                role = "Keeper of the Sacred Books",
                iconUrl = "/portraits/pyrokar.png",
                catchphrase = "Mind the candle wax near the ancient folios! One stray spark and centuries of Fire lore turn to ash.",
                topicDescription = "Inquire about sacred manuscripts and secret monastery vaults",
                defaultResponse = "Inside detail: Deep behind the secret bookcase lever in the cellar lies the Almanac of the Possessed and the Tears of Innos—which instantly kills anyone who drinks it unless they are a Fire Mage! Strategic Hint: Because this is a Castle (20 Protection), you can recruit Heavy Infantry and buy Siege Weapons here even if you captured it as a Neutral Citadel."
            ),
            TavernPatron(
                id = "gorax",
                name = "Gorax",
                role = "Steward & Vintner of the Monastery",
                iconUrl = "/portraits/pyrokar.png",
                catchphrase = "Every novice wants a key to the treasury, yet none of them want to haul the sheep or sweep the chambers!",
                topicDescription = "Inquire about vintage monastery wine, trade with Orlan, and treasury keys",
                defaultResponse = "Inside detail: When Orlan tries to haggle down the price of monastery wine at the Dead Harpy, only a silver-tongued novice walks away with the full 240 gold. Strategic Hint: Castles have a hard Protection floor of 20 against Hurricanes and Floods—station your Mage army here safely during storm seasons!"
            )
        )
    ),
    "8" to SectorSubLocation(
        sectorId = "8",
        buttonEmoji = "🕯️",
        buttonLabel = "Enter Novice's Trial Cave",
        buttonTooltip = "Dim cavern behind the snapper packs where novices compete for the rune stone",
        modalTitle = "🕯️ The Cave of the Trial of Fire",
        modalSubtitle = "Dim cavern behind the snapper packs where novices compete for the rune stone",
        bannerImageUrl = "/locations/monastery_library_cellar.jpg",
        patrons = listOf(
            TavernPatron(
                id = "agon",
                name = "Agon",
                role = "Ambitious Novice of the Flame",
                iconUrl = "/portraits/pyrokar.png",
                catchphrase = "Back away from that chest! Innos chose ME to become a Magician of Fire, not you or Igaraz!",
                topicDescription = "Ask about the Trial of Fire and the hidden rune chest",
                defaultResponse = "Inside detail: During the Trial of Fire, I hid inside this very cave waiting to ambush the other novices over a single blank rune stone. Strategic Hint: Snapper Gorge is the only eastern backdoor into the Monastery of Innos (#7) from the coast (#9). A stealthy force marching up from Shipwreck Cove can bypass the main bridge entirely!"
            )
        )
    ),
    "9" to SectorSubLocation(
        sectorId = "9",
        buttonEmoji = "🌫️",
        buttonLabel = "Climb Foggy Watchtower",
        buttonTooltip = "Salt-sprayed stone ruin overlooking the eastern sea",
        modalTitle = "🌫️ The Haunted Cliffside Watchtower",
        modalSubtitle = "Salt-sprayed stone ruin overlooking the eastern sea",
        bannerImageUrl = "/locations/jack_lighthouse_lantern.jpg",
        patrons = listOf(
            TavernPatron(
                id = "rengaru_cliffs",
                name = "Rengaru",
                role = "Fleeing Cutpurse on the Lamb",
                iconUrl = "/characters/kardif.png",
                catchphrase = "Hey, if you didn't turn me in to Lord Andre at the market square, flash me the Thieves' Guild nod!",
                topicDescription = "Inquire about hidden keys, coastal watchtowers, and thieves' gossip",
                defaultResponse = "Inside detail: Inside the foggy tower along the eastern cliffs, skeleton mages guard one of the six Blood Chalices keys and a chronicler's book. Strategic Hint: Misty Cliffs is a narrow 2-degree corridor (#8 to #10) with 10 Protection. One fortified hero here locks down the entire northeastern coastline."
            )
        )
    ),
    "10" to SectorSubLocation(
        sectorId = "10",
        buttonEmoji = "⚓",
        buttonLabel = "Explore Smuggler's Wreckage",
        buttonTooltip = "Half-sunken ship timbers and scorched sand",
        modalTitle = "⚓ The Wrecked Hull & Fire Lizard Beach",
        modalSubtitle = "Half-sunken ship timbers and scorched sand",
        bannerImageUrl = "/locations/jack_lighthouse_lantern.jpg",
        patrons = listOf(
            TavernPatron(
                id = "greg_cove",
                name = "Captain Greg",
                role = "Pirate Captain of the Lost Galley",
                iconUrl = "/portraits/raven.jpg",
                catchphrase = "Blast those paladins! My ship went down in the storm, and every cove on this island is crawling with lizards.",
                topicDescription = "Ask about buried treasure maps and surviving the naval wreck",
                defaultResponse = "Inside detail: If you dig up every red 'X' I buried across Khorinis—starting in the cave by the lake—you'll unearth the amulet and rings before we ever sail to Jharkendar! Strategic Hint: Shipwreck Cove connects Sagitta's Grove (#19) to the northern cliffs (#9). Use it to outflank Onar's northern territories."
            )
        )
    ),
    "11" to SectorSubLocation(
        sectorId = "11",
        buttonEmoji = "⚔️",
        buttonLabel = "Enter Gate Guardhouse",
        buttonTooltip = "Portcullis winch room and militia armory",
        modalTitle = "⚔️ The Royal Gatehouse Barracks",
        modalSubtitle = "Portcullis winch room and militia armory",
        bannerImageUrl = "/tavern_khorinis.png",
        patrons = listOf(
            TavernPatron(
                id = "lothar",
                name = "Paladin Lothar",
                role = "Herald of the Royal Laws",
                iconUrl = "/portraits/lord_hagen.png",
                catchphrase = "Halt, citizen! Have you heard the new decrees of Lord Hagen? Even the greatest warrior cannot enter the upper quarter in rags!",
                topicDescription = "Ask about Lord Hagen's decrees and city entry permits",
                defaultResponse = "Inside detail: In Chapter 3, the Seekers murder me right on the street to frame Diego's old rival Bennet—unless you find the forged eyewitness ledger in Cornelius's pocket! Strategic Hint: With 14 base Protection, Khorinis East Gate is the primary shield between Lobart's Farm (#15) and the City of Khorinis (#14). Fortify it early!"
            )
        )
    ),
    "12" to SectorSubLocation(
        sectorId = "12",
        buttonEmoji = "🛒",
        buttonLabel = "Visit Canthar's Wagon",
        buttonTooltip = "Panicked merchant camp outside the city walls",
        modalTitle = "🛒 Canthar's Roadside Peddler Camp",
        modalSubtitle = "Panicked merchant camp outside the city walls",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "canthar",
                name = "Canthar",
                role = "Scheming Travelling Merchant",
                iconUrl = "/characters/halvor.png",
                catchphrase = "You look like a fellow who needs a pass into the city... and I look like a man who remembers favors!",
                topicDescription = "Negotiate merchant passes and questionable merchant favors",
                defaultResponse = "Inside detail: Even if you throw me in Lord Andre's dungeon for framing Sarah, I bribe my way out by Chapter 3 and turn all the marketplace merchants against you until you pay my fine! Strategic Hint: This 5-way crossroads (#3, #4, #6, #15, #16) yields 5 Food per turn. Hold it to tax movement between the city and the central river."
            )
        )
    ),
    "13" to SectorSubLocation(
        sectorId = "13",
        buttonEmoji = "🔥",
        buttonLabel = "Visit Isgaroth's Shrine",
        buttonTooltip = "Incense-lit prayer alcove beside the high stone bridge",
        modalTitle = "🔥 The Roadside Shrine of Innos",
        modalSubtitle = "Incense-lit prayer alcove beside the high stone bridge",
        bannerImageUrl = "/locations/monastery_library_cellar.jpg",
        patrons = listOf(
            TavernPatron(
                id = "isgaroth",
                name = "Master Isgaroth",
                role = "Guardian Fire Mage of the Shrine",
                iconUrl = "/portraits/pyrokar.png",
                catchphrase = "Innos's light watch over your steps, traveler. The bridge ahead leads only to those of pure devotion—or those bearing a sheep and a thousand gold coins.",
                topicDescription = "Ask about shrine blessings, crossing the river, and devotion to Innos",
                defaultResponse = "Inside detail: Praying at an Innos shrine once a day with 100 gold grants permanent Strength, Dexterity, or Mana blessings—until you hit the cap! Strategic Hint: Monastery Bridge links the Monastery (#7) to the Dead Harpy (#21) and Sekob's Farm (#17). Station a hero here to spot enemies crossing the central river."
            )
        )
    ),
    "14" to SectorSubLocation(
        sectorId = "14",
        buttonEmoji = "🍺",
        buttonLabel = "Enter Harbor Tavern",
        buttonTooltip = "Kardif's drinking den in the harbor quarter",
        modalTitle = "🍺 The Harbor Tavern of Khorinis",
        modalSubtitle = "Kardif's drinking den in the harbor quarter",
        bannerImageUrl = "/tavern_khorinis.png",
        patrons = KhorinisTavernPatrons
    ),
    "15" to SectorSubLocation(
        sectorId = "15",
        buttonEmoji = "🌾",
        buttonLabel = "Enter Lobart's Farmhouse",
        buttonTooltip = "Warm kitchen smelling of Hilda's turnip stew and fresh hay",
        modalTitle = "🌾 Lobart's Farmhouse & Barn",
        modalSubtitle = "Warm kitchen smelling of Hilda's turnip stew and fresh hay",
        bannerImageUrl = "/locations/mercenary_farm_kitchen.jpg",
        patrons = listOf(
            TavernPatron(
                id = "lobart",
                name = "Lobart",
                role = "Beleaguered Farmer",
                iconUrl = "/characters/halvor.png",
                catchphrase = "Are you with the rebellious peasants or the King's thieving paladins? Either way, pull some turnips if you want farmer's clothes!",
                topicDescription = "Complain about paladin taxes, turnip harvest, and peasant unrest",
                defaultResponse = "Inside detail: Every work-shirt task you finish for Hilda, Vino, and Maleth drops the price of the farmer's outfit in my chest by 10 gold—down to just 30 gold! Strategic Hint: Lobart's Farm has 18 Cultivation (9 Food/turn)—one of the top 5 breadbaskets on the map. Losing it will starve a large army in two turns!"
            ),
            TavernPatron(
                id = "hilda",
                name = "Hilda",
                role = "Lobart's Wife",
                iconUrl = "/advisor_jade.png",
                catchphrase = "Take this frying pan and fetch me a new one from Canthar before the fieldhands riot for supper!",
                topicDescription = "Offer to run farm errands in exchange for hearty turnip stew",
                defaultResponse = "Inside detail: Keep visiting me each chapter for a free bowl of hot stew, and bring me a healing potion from Vatras when the dark fever strikes me in Chapter 3. Strategic Hint: Because Lobart's Farm only has 6 Protection, never leave stored Food sitting here uncollected when enemy scouts are at Akil's Farm (#20)."
            )
        )
    ),
    "16" to SectorSubLocation(
        sectorId = "16",
        buttonEmoji = "🗿",
        buttonLabel = "Visit Erol's Wayside Camp",
        buttonTooltip = "Looted merchant cart beneath the bandits' stone bridge",
        modalTitle = "🗿 Erol's Under-Bridge Shelter",
        modalSubtitle = "Looted merchant cart beneath the bandits' stone bridge",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "erol",
                name = "Erol",
                role = "Wounded Merchant & Craftsman",
                iconUrl = "/characters/halvor.png",
                catchphrase = "Those cursed brigands on the bridge above cracked my ribs and took my ancient stone tablets!",
                topicDescription = "Inquire about stone tablets, builder glyphs, and strength training",
                defaultResponse = "Inside detail: Bring me three old stone tablets and I'll teach you how to strike with +1 permanent Strength using my bare-knuckle merchant technique! Strategic Hint: Erol's Bridge connects the northern woods (#6) straight down to The Dead Harpy Inn (#21). It's the fastest north-south highway in central Khorinis."
            )
        )
    ),
    "17" to SectorSubLocation(
        sectorId = "17",
        buttonEmoji = "🏠",
        buttonLabel = "Enter Sekob's Manor",
        buttonTooltip = "Drafty manor house where rent coins are counted under lock and key",
        modalTitle = "🏠 Sekob's Tenant Farmhouse",
        modalSubtitle = "Drafty manor house where rent coins are counted under lock and key",
        bannerImageUrl = "/locations/mercenary_farm_kitchen.jpg",
        patrons = listOf(
            TavernPatron(
                id = "sekob",
                name = "Sekob",
                role = "Stingy Tenant Farmer",
                iconUrl = "/characters/valentino.png",
                catchphrase = "Onar wants his rent, Torlof wants his cut, and now the Seekers have moved into my living room! Does nobody work anymore?!",
                topicDescription = "Inquire about Onar's rents, tenant grievances, and Seeker threats",
                defaultResponse = "Inside detail: If you help my wife Rosi and Till escape my farm in Chapter 5 before the dragon attacks intensify, you'll earn massive experience and gold. Strategic Hint: Sekob's Farm produces 8 Food per turn (17 Cultivation) right beside Onar's Farm (#23). Triggering an Abundant Harvest or cultivating here feeds an entire 100-unit army!"
            )
        )
    ),
    "18" to SectorSubLocation(
        sectorId = "18",
        buttonEmoji = "💀",
        buttonLabel = "Descend into Inubis's Crypt",
        buttonTooltip = "Torchlit sarcophagus chamber echoing with skeletal footsteps",
        modalTitle = "💀 The Defiled Vault of Lord Inubis",
        modalSubtitle = "Torchlit sarcophagus chamber echoing with skeletal footsteps",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "inubis",
                name = "Shade of Lord Inubis",
                role = "Fallen Paladin of the Crypt",
                iconUrl = "/knight_icon.png",
                catchphrase = "Who dares unseal the three switches of my sarcophagus behind Sekob's woods...?",
                topicDescription = "Question the undead shade regarding his corrupted resting place",
                defaultResponse = "Inside detail: Opening the side chests in my crypt spawns waves of skeletons, culminating in my own undead wrath—plus some of the richest early-game potions and gold on the island! Strategic Hint: With 11 Protection and low food value, this crypt is an ideal staging ground for searching arcane scrolls (Search Scrolls) without drawing economic raiders."
            )
        )
    ),
    "19" to SectorSubLocation(
        sectorId = "19",
        buttonEmoji = "🧪",
        buttonLabel = "Enter Sagitta's Herb Cave",
        buttonTooltip = "Damp forest cavern lined with bubbling retorts and rare Sun Aloe",
        modalTitle = "🧪 Sagitta's Alchemical Grotto",
        modalSubtitle = "Damp forest cavern lined with bubbling retorts and rare Sun Aloe",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "sagitta",
                name = "Sagitta",
                role = "Forest Witch & Master Herbalist",
                iconUrl = "/advisor_jade.png",
                catchphrase = "Step lightly near the alchemy bench! And don't ask where I get my Sun Aloe unless you've visited the Black Troll's dung heap.",
                topicDescription = "Ask about rare forest flora, Sun Aloe, and permanent stat elixirs",
                defaultResponse = "Inside detail: Bring me the rare Sun Aloe that grows only in the warm droppings of the Black Troll, and I'll teach you how to brew permanent Elixir of Dexterity and Mana potions! Strategic Hint: Tucked away in the far east (Degree 2) with 6 Food per turn, Sagitta's Grove is the safest backline economy node on the board."
            )
        )
    ),
    "20" to SectorSubLocation(
        sectorId = "20",
        buttonEmoji = "🥖",
        buttonLabel = "Enter Akil's Homestead",
        buttonTooltip = "Table laid with fresh farm bread, ham, and water above the stone steps",
        modalTitle = "🥖 Akil & Kati's Hilltop Kitchen",
        modalSubtitle = "Table laid with fresh farm bread, ham, and water above the stone steps",
        bannerImageUrl = "/locations/mercenary_farm_kitchen.jpg",
        patrons = listOf(
            TavernPatron(
                id = "akil",
                name = "Akil",
                role = "Hilltop Farmer",
                iconUrl = "/characters/halvor.png",
                catchphrase = "First Alvares and Engardo's mercenaries threaten my neck, and now armies are marching up my stone stairs!",
                topicDescription = "Ask about mercenary extortion and farm defense on the high steps",
                defaultResponse = "Inside detail: If you provoke Ehnim and Egill into fighting each other by telling each brother the other boasted of being stronger, they'll beat each other senseless for free XP! Strategic Hint: Akil's Farm produces 8 Food/turn and sits on 5 connections (#15, #21, #27, #28, #29). Fortify it immediately after capture or enemies will seize your granary."
            ),
            TavernPatron(
                id = "randolph",
                name = "Randolph",
                role = "Farmhand & Tavern Challenger",
                iconUrl = "/characters/moe.png",
                catchphrase = "Just give me ten gold for entry and slip a bottle of knock-out gin into Rukhar's chest at the Dead Harpy!",
                topicDescription = "Discuss drinking wagers and scheming against Rukhar",
                defaultResponse = "Inside detail: Swap Rukhar's water bottle with gin in Orlan's tavern chest before the drinking contest, and I'll drink him under the table! Strategic Hint: Stationing a high-Intellect commander here lets you boost Cultivation past 20, making starvation impossible."
            )
        )
    ),
    "21" to SectorSubLocation(
        sectorId = "21",
        buttonEmoji = "🍺",
        buttonLabel = "Enter The Dead Harpy",
        buttonTooltip = "Orlan's central roadhouse & secret headquarters of the Ring of Water",
        modalTitle = "🍺 The Dead Harpy Taproom",
        modalSubtitle = "Orlan's central roadhouse & secret headquarters of the Ring of Water",
        bannerImageUrl = "/tavern_khorinis.png",
        patrons = listOf(
            TavernPatron(
                id = "orlan",
                name = "Orlan",
                role = "Innkeeper & Brother of the Ring",
                iconUrl = "/characters/kardif.png",
                catchphrase = "That aquamarin ring on your finger... so Vatras sent you! Food and drink are on the house, brother.",
                topicDescription = "Inquire about island rumors, teleporter stones, and Ring of Water operations",
                defaultResponse = "Inside detail: Behind the locked door in my tavern cellar stands the central teleporter stone connecting the City, the Monastery, Onar's Farm, and the Water Mages' dig! Strategic Hint: The Dead Harpy is a 7-connection super-hub (#13, #16, #20, #22, #29, #30, #33) with 12 Protection and 7 Food/turn. Whoever controls Sector 21 controls the map."
            ),
            TavernPatron(
                id = "rukhar",
                name = "Rukhar",
                role = "Crooked Gambler",
                iconUrl = "/characters/moe.png",
                catchphrase = "Care to wager fifty gold on who can down the most jugs of double-malted ale without passing out?",
                topicDescription = "Place wagers on tavern brawls and endurance contests",
                defaultResponse = "Inside detail: Never bet against me until you've replaced the water in my locked chest with raw gin! Strategic Hint: Because 7 sectors touch this inn, a hero stationed here lifts Fog of War across almost the entire central plains."
            )
        )
    ),
    "22" to SectorSubLocation(
        sectorId = "22",
        buttonEmoji = "⚰️",
        buttonLabel = "Enter Gravekeeper's Crypt",
        buttonTooltip = "Weather-worn headstones between the Dead Harpy and Onar's estate",
        modalTitle = "⚰️ The Mossy Mausoleum",
        modalSubtitle = "Weather-worn headstones between the Dead Harpy and Onar's estate",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "lares_grave",
                name = "Lares",
                role = "Master Scout of the Ring of Water",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Walking past Onar's boundary stones alone? Stick close to me if you want to reach the eastern woods in one piece.",
                topicDescription = "Request escort through dangerous territory and discuss developer lore",
                defaultResponse = "Inside detail: Notice the gravestones across Khorinis? The names carved on them belong to the original Piranha Bytes developers and testers! Strategic Hint: Sector 22 directly borders Onar's Farm (#23) and Sekob's Farm (#17). Stage your siege forces here one turn before storming the Eastern Castle."
            )
        )
    ),
    "23" to SectorSubLocation(
        sectorId = "23",
        buttonEmoji = "🍲",
        buttonLabel = "Visit Thekla's Kitchen & Hall",
        buttonTooltip = "Boisterous hall where Lee's veterans feast on strength-giving stew",
        modalTitle = "🍲 Thekla's Steaming Kitchen & Mercenary Mess",
        modalSubtitle = "Boisterous hall where Lee's veterans feast on strength-giving stew",
        bannerImageUrl = "/locations/mercenary_farm_kitchen.jpg",
        patrons = listOf(
            TavernPatron(
                id = "thekla",
                name = "Thekla",
                role = "Head Cook of Onar's Estate",
                iconUrl = "/advisor_jade.png",
                catchphrase = "Sylvio and Bullco eat like trolls and never wash a dish! Teach Bullco some manners and I'll ladle you my special stew.",
                topicDescription = "Ask about hearty food rations and legendary Strength-boosting stew",
                defaultResponse = "Inside detail: Every bowl of Thekla's Stew permanently increases your Strength by +1—and you can get up to five bowls across the game by helping me, Sagitta, and Bennet! Strategic Hint: Onar's Farm is surrounded by two 17–18 Cultivation breadbaskets (#17 and #30). Hold this triangle and you'll out-produce any rival kingdom in Food."
            ),
            TavernPatron(
                id = "lee",
                name = "General Lee",
                role = "General of the Mercenaries",
                iconUrl = "/portraits/onar.png",
                catchphrase = "King Rhobar threw me into the Barrier for a crime his nobles fabricated. One day I'll sail back to the mainland and settle the score.",
                topicDescription = "Discuss military strategy, mercenary discipline, and vengeance on Myrtana",
                defaultResponse = "Inside detail: Once you reach Chapter 3, I give you the personal teleporter rune straight back to Onar's barn! Strategic Hint: As a 20-Protection Castle, Onar's Farm lets you recruit Heavy Infantry immediately to crush lightly armored militia."
            )
        )
    ),
    "24" to SectorSubLocation(
        sectorId = "24",
        buttonEmoji = "⚒️",
        buttonLabel = "Visit Bennet's Forge",
        buttonTooltip = "Ringing anvil sparks beside Cord's training grounds",
        modalTitle = "⚒️ Bennet's Smithy & The Duelling Pasture",
        modalSubtitle = "Ringing anvil sparks beside Cord's training grounds",
        bannerImageUrl = "/locations/mercenary_farm_kitchen.jpg",
        patrons = listOf(
            TavernPatron(
                id = "bennet",
                name = "Bennet",
                role = "Master Mercenary Blacksmith",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Militia steel is brittle pig-iron! Give me pure magic ore and dragon blood, and I'll forge a blade that cleaves paladin plate.",
                topicDescription = "Inquire about magic ore forging, dragon weapons, and raw steel billets",
                defaultResponse = "Inside detail: Buying up all my raw steel billets every chapter lets you forge infinite self-made swords in Khorinis for boundless gold! Strategic Hint: Mercenary Grounds has both high Protection (12) and high Cultivation (15 -> 7 Food/turn), making it the strongest non-castle sector in the east."
            ),
            TavernPatron(
                id = "sylvio",
                name = "Sylvio",
                role = "Ore-Baron Mercenary Captain",
                iconUrl = "/characters/moe.png",
                catchphrase = "You think Lee runs everything here? Watch your tongue, or Bullco will wipe the grass with your face.",
                topicDescription = "Confront the ruthless mercenary captain regarding faction leadership",
                defaultResponse = "Inside detail: Even though I'm invulnerable here on the farm, you can finally strike me down outside the Ice Dragon's lair in Chapter 4 when I try to rob you! Strategic Hint: Watch out for enemies dropping down from Dexter's Watchtower (#31) onto these pastures."
            )
        )
    ),
    "25" to SectorSubLocation(
        sectorId = "25",
        buttonEmoji = "🏮",
        buttonLabel = "Enter The Red Lantern",
        buttonTooltip = "Velvet-draped harbor establishment beside the royal war galley",
        modalTitle = "🏮 The Red Lantern & Esmeralda Docks",
        modalSubtitle = "Velvet-draped harbor establishment beside the royal war galley",
        bannerImageUrl = "/tavern_khorinis.png",
        patrons = listOf(
            TavernPatron(
                id = "bromor",
                name = "Bromor",
                role = "Proprietor of the Red Lantern",
                iconUrl = "/characters/valentino.png",
                catchphrase = "Welcome to the Red Lantern! Enjoy the music, pay fifty gold upstairs, and if you see my golden bowl, hand it back!",
                topicDescription = "Inquire about harbor nightlife and the stolen golden bowl",
                defaultResponse = "Inside detail: My golden dish was stolen by the bandit leader Dexter—recover it from his cliffside tower to earn my favor! Strategic Hint: Khorinis Harbor yields 7 Food/turn with 12 Protection and only 2 connections (#14 and #26). If you start in the City of Khorinis, capture Sector 25 on Turn 1!"
            ),
            TavernPatron(
                id = "nadja",
                name = "Nadja",
                role = "Dancer & Informant",
                iconUrl = "/advisor_jade.png",
                catchphrase = "Upstairs, away from Bromor's ears, I can tell you who Lucia left with before the bandits took her to Jharkendar.",
                topicDescription = "Whisper about Lucia's disappearance and secret bandit contacts",
                defaultResponse = "Inside detail: Lucia wrote a farewell letter to Elvrich hidden behind the bandits' tent in the woods behind Sekob's farm. Strategic Hint: Stationing a secondary hero here lets you stockpile Food safely behind the City of Khorinis's walls."
            )
        )
    ),
    "26" to SectorSubLocation(
        sectorId = "26",
        buttonEmoji = "🏴☠️",
        buttonLabel = "Visit Skip's Beach Camp",
        buttonTooltip = "Rowboat landing and rum barrels tucked beneath the harbor cliffs",
        modalTitle = "🏴☠️ Skip's Hidden Pirate Cove",
        modalSubtitle = "Rowboat landing and rum barrels tucked beneath the harbor cliffs",
        bannerImageUrl = "/locations/jack_lighthouse_lantern.jpg",
        patrons = listOf(
            TavernPatron(
                id = "skip",
                name = "Skip",
                role = "Pirate Smuggler Liaison",
                iconUrl = "/portraits/raven.jpg",
                catchphrase = "Where the devil is Baltram?! I've been sitting on this sand with twenty bottles of white rum waiting for that merchant!",
                topicDescription = "Ask about smuggling runs, white rum trade, and bypassing city guards",
                defaultResponse = "Inside detail: You don't need to climb a cliff to reach me—just dive off the end of the Esmeralda pier and swim right around the headland! Strategic Hint: Smugglers' Beach is the sneaky coastal bypass into the City of Khorinis (#14) from Cavalorn's Valley (#27)."
            )
        )
    ),
    "27" to SectorSubLocation(
        sectorId = "27",
        buttonEmoji = "🏕️",
        buttonLabel = "Sit by Cavalorn's Campfire",
        buttonTooltip = "Mountain gorge campfire surrounded by goblin bones and bandit packs",
        modalTitle = "🏕️ Cavalorn's Valley Encampment",
        modalSubtitle = "Mountain gorge campfire surrounded by goblin bones and bandit packs",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "cavalorn",
                name = "Cavalorn",
                role = "Former Shadow & Ring of Water Ranger",
                iconUrl = "/characters/alrik.png",
                catchphrase = "First those cursed goblins, then Brago's bandits stole my parcel for Vatras! Good thing you showed up when you did.",
                topicDescription = "Ask about the Old Camp days, archery lessons, and Vatras's pouch",
                defaultResponse = "Inside detail: If you tell Brago's sentry outside the cave that I'm coming to wipe them out, I'll charge right up the hill with you and clear the whole cave! Strategic Hint: Cavalorn's Valley connects the western coast (#26) to Akil's Farm (#20) and Bandit Bridge (#28)—a prime corridor for flanking western armies."
            )
        )
    ),
    "28" to SectorSubLocation(
        sectorId = "28",
        buttonEmoji = "⛺",
        buttonLabel = "Enter Bridge Bandit Tent",
        buttonTooltip = "Wooden palisade and cages overlooking the gorge",
        modalTitle = "⛺ The Ravine Bridge Prisoner Camp",
        modalSubtitle = "Wooden palisade and cages overlooking the gorge",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "elvrich",
                name = "Elvrich",
                role = "Thorben's Kidnapped Apprentice",
                iconUrl = "/characters/halvor.png",
                catchphrase = "Cut these ropes! The bandits took Lucia toward the ancient portal and left me locked in this tent!",
                topicDescription = "Ask about the kidnapped craftsmen and Lucia's fate",
                defaultResponse = "Inside detail: Rescuing me here makes Master Thorben forgive Gritta's debts and unlocks his lockpicking lessons in the lower quarter! Strategic Hint: Bandit Bridge links 5 sectors across the ravine (#20, #27, #29, #32, #35). Hold it to control access to Bengar's Farm."
            )
        )
    ),
    "29" to SectorSubLocation(
        sectorId = "29",
        buttonEmoji = "🎯",
        buttonLabel = "Visit Dragomir's Tent",
        buttonTooltip = "Hunter's lean-to south of the Dead Harpy Inn",
        modalTitle = "🎯 Dragomir's Meadow Camp",
        modalSubtitle = "Hunter's lean-to south of the Dead Harpy Inn",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "dragomir",
                name = "Dragomir",
                role = "Crossbow Hunter",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Don't go near the Circle of the Sun without silver or fire! I dropped my prized crossbow fleeing the undead up there.",
                topicDescription = "Ask about crossbow marksmanship and lost hunting gear",
                defaultResponse = "Inside detail: Return my lost crossbow from the Circle of the Sun and I'll train your Crossbow skill up to 60% for just 150 gold! Strategic Hint: Dragomir's Camp yields 5 Food/turn and sits directly below The Dead Harpy Inn (#21)—a critical stepping stone toward Gaan's Crossroads (#33).",
                tags = setOf(NpcTag.HUNTER)
            )
        )
    ),
    "30" to SectorSubLocation(
        sectorId = "30",
        buttonEmoji = "🌾",
        buttonLabel = "Visit Cipher & Rod's Camp",
        buttonTooltip = "Sunlit grain fields bordering Onar's manor",
        modalTitle = "🌾 The Golden Wheatfields & Weed Storage",
        modalSubtitle = "Sunlit grain fields bordering Onar's manor",
        bannerImageUrl = "/locations/mercenary_farm_kitchen.jpg",
        patrons = listOf(
            TavernPatron(
                id = "bodo",
                name = "Bodo",
                role = "Peaceful Peasant",
                iconUrl = "/characters/halvor.png",
                catchphrase = "Cipher swears I stole his package of swampweed from the harbor, but I haven't left these wheatfields all week!",
                topicDescription = "Hear about missing swampweed packages and farm life",
                defaultResponse = "Inside detail: It was Dar who stole Cipher's swampweed package and sold it to the bandits—tell Cipher and watch him beat Dar across the pasture! Strategic Hint: At 18 Cultivation (9 Food/turn), Bodo's Wheatfields ties Lobart's Farm as the richest food sector in the game!"
            ),
            TavernPatron(
                id = "rod",
                name = "Rod",
                role = "Two-Handed Sword Boaster",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Bet you thirty gold your scrawny arms can't even lift my two-handed sword off my shoulder!",
                topicDescription = "Accept a strength challenge and duel with heavy greatswords",
                defaultResponse = "Inside detail: Once you have 30 Strength, ask to hold my sword, refuse to give it back, and beat me in a fistfight before re-equipping it for double XP! Strategic Hint: With only 6 Protection, Bodo's fields are vulnerable to raids from Dexter's Watchtower (#31) right above us."
            )
        )
    ),
    "31" to SectorSubLocation(
        sectorId = "31",
        buttonEmoji = "🗡️",
        buttonLabel = "Enter Dexter's Command Room",
        buttonTooltip = "Heavily guarded palisade house overlooking Onar's valley",
        modalTitle = "🗡️ Dexter's Cliffside Quarters",
        modalSubtitle = "Heavily guarded palisade house overlooking Onar's valley",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "dexter",
                name = "Dexter",
                role = "Bandit Warlord & Former Gomez Guard",
                iconUrl = "/portraits/raven.jpg",
                catchphrase = "Well, well... the hero from the Valley of Mines! Raven is paying a mountain of gold for your head on a pike.",
                topicDescription = "Inquire about Raven's orders and missing city residents",
                defaultResponse = "Inside detail: If you tell the bridge guard my name ('Dexter'), the whole camp lets you walk right in peacefully—and Captain Greg charges in to slaughter the bandits as soon as you confront me! Strategic Hint: With 16 base Protection and 6 connections (#23, #24, #30, #33, #37, #42), Dexter's Watchtower is a miniature fortress dominating the eastern mountains."
            )
        )
    ),
    "32" to SectorSubLocation(
        sectorId = "32",
        buttonEmoji = "⚔️",
        buttonLabel = "Visit Stairway Guardpost",
        buttonTooltip = "Steep carved steps climbing toward Bengar's plateau",
        modalTitle = "⚔️ The Stone Stairway Overlook",
        modalSubtitle = "Steep carved steps climbing toward Bengar's plateau",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "cord",
                name = "Cord",
                role = "Master Swordsman & Ring of Water Brother",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Climbing to the high pastures? Keep your guard high—snappers and field raiders lurk at the top of the steps.",
                topicDescription = "Request advanced one-handed blade training and Ring of Water tests",
                defaultResponse = "Inside detail: Wear your Ring of Water aquamarin ring when speaking to me, and I'll handle Torlof's mercenary test for you automatically while training your blade mastery! Strategic Hint: With 10 Protection, High Pasture Steps shields Bengar's valley from northern invasions."
            )
        )
    ),
    "33" to SectorSubLocation(
        sectorId = "33",
        buttonEmoji = "🐺",
        buttonLabel = "Visit Gaan's Hunter Perch",
        buttonTooltip = "Windy crossroads outside the wooden palisade to the Valley of Mines",
        modalTitle = "🐺 Gaan's Southern Pass Camp",
        modalSubtitle = "Windy crossroads outside the wooden palisade to the Valley of Mines",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "gaan",
                name = "Gaan",
                role = "Master Trophy Hunter",
                iconUrl = "/characters/alrik.png",
                catchphrase = "A snorting dragon snapper has been terrorizing this crossroads! Slay that beast and I'll teach you how to harvest every claw and horn.",
                topicDescription = "Ask about dangerous dragon snappers and harvesting rare creature trophies",
                defaultResponse = "Inside detail: Learning to pull dragon snapper horns before Chapter 4 lets you sell them to Buster for 300 gold and huge XP apiece! Strategic Hint: Gaan's Crossroads is the southern twin of The Dead Harpy—a 7-connection hub (#21, #29, #30, #31, #32, #36, #37) linking north and south."
            ),
            TavernPatron(
                id = "buster",
                name = "Buster",
                role = "Acrobatic Mercenary",
                iconUrl = "/characters/moe.png",
                catchphrase = "Five gold coins says you don't know which end of a sword to hold!",
                topicDescription = "Challenge to a duel and inquire about acrobatic techniques",
                defaultResponse = "Inside detail: Beat me in a friendly duel and give me 5 gold Afterward, and I'll teach you Acrobatics and buy all your shadowbeast and dragon snapper horns! Strategic Hint: Station a hero here to intercept any army marching toward the Fortress of the Pass (#52)."
            )
        )
    ),
    "34" to SectorSubLocation(
        sectorId = "34",
        buttonEmoji = "🐑",
        buttonLabel = "Visit Shepherd's Rim Hut",
        buttonTooltip = "Windy pasture edge overlooking Xardas's distant valley",
        modalTitle = "🐑 The Western Cliffside Lean-To",
        modalSubtitle = "Windy pasture edge overlooking Xardas's distant valley",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "balthasar",
                name = "Balthasar",
                role = "Wandering Shepherd",
                iconUrl = "/characters/halvor.png",
                catchphrase = "Ever since Bengar let me graze my sheep up on the high pastures, the view over the western crags has been peaceful.",
                topicDescription = "Inquire about mountain grazing paths and avoiding wolves",
                defaultResponse = "Inside detail: Once you clear the bandits threatening Bengar's farm, you can convince Bengar to let me bring my flock up from Sekob's fields! Strategic Hint: West Pasture Rim is the quiet 2-degree backroad connecting Bengar's Farm (#35) down into Xardas's Valley (#46 via #38)."
            )
        )
    ),
    "35" to SectorSubLocation(
        sectorId = "35",
        buttonEmoji = "🌾",
        buttonLabel = "Enter Bengar's Barn",
        buttonTooltip = "Southern plateau farmstead facing the Valley Pass",
        modalTitle = "🌾 Bengar's Highland Farmhouse",
        modalSubtitle = "Southern plateau farmstead facing the Valley Pass",
        bannerImageUrl = "/locations/mercenary_farm_kitchen.jpg",
        patrons = listOf(
            TavernPatron(
                id = "bengar",
                name = "Bengar",
                role = "Highland Farmer",
                iconUrl = "/characters/halvor.png",
                catchphrase = "Malak and the boys ran off to the waterfall because of the creatures pouring out of the Pass! Someone has to guard this farm!",
                topicDescription = "Offer mercenary protection against Pass creatures",
                defaultResponse = "Inside detail: Hire the mercenary Wolf for 300 gold (or 800 gold if you play as a Paladin) to guard my farm in Chapter 3 so Malak returns safely! Strategic Hint: Bengar's Farm produces 8 Food/turn (17 Cultivation)—making it the only high-yield breadbasket in the southern half of the map."
            ),
            TavernPatron(
                id = "wolf",
                name = "Wolf",
                role = "Mercenary Bowyer & Armorer",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Give me ten minecrawler plates and I'll stitch you armor lighter than leather and tougher than steel.",
                topicDescription = "Inquire about crafting minecrawler plate armor and guarding farms",
                defaultResponse = "Inside detail: Ask me about minecrawler plate armor as soon as you meet me, then bring 10 plates from the caves to get free mid-game armor! Strategic Hint: Any commander besieging the Fortress of the Pass (#52) needs Bengar's Farm to feed their troops."
            )
        )
    ),
    "36" to SectorSubLocation(
        sectorId = "36",
        buttonEmoji = "🌊",
        buttonLabel = "Enter Waterfall Sanctuary",
        buttonTooltip = "Rushing cascades and hidden ledges between Bengar and Gaan",
        modalTitle = "🌊 The Mist-Shrouded Waterfall Cave",
        modalSubtitle = "Rushing cascades and hidden ledges between Bengar and Gaan",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "malak",
                name = "Malak",
                role = "Head Peasant of Bengar's Farm",
                iconUrl = "/characters/halvor.png",
                catchphrase = "You think I'm going back to Bengar's fields while black-robed Seekers are throwing fireballs at the Pass?! Not without a guard!",
                topicDescription = "Persuade fleeing farmhands to return to Bengar's pastures",
                defaultResponse = "Inside detail: When I flee Bengar's farm in Chapter 3, I take all the farmhands and hide in the ravine below the waterfalls near Grom's camp. Strategic Hint: Refugee Waterfall yields a solid 6 Food/turn (13 Cultivation) and bridges the high pastures to Grom's Camp (#40)."
            )
        )
    ),
    "37" to SectorSubLocation(
        sectorId = "37",
        buttonEmoji = "🔥",
        buttonLabel = "Visit Cliffside Bandit Fire",
        buttonTooltip = "Craggy mountain trail guarded by highwaymen",
        modalTitle = "🔥 The Southern Ridge Lookout",
        modalSubtitle = "Craggy mountain trail guarded by highwaymen",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "jesse",
                name = "Jesse",
                role = "Opportunist Bandit",
                iconUrl = "/characters/kardif.png",
                catchphrase = "Whoa, hold on! I wasn't the one who put those wanted posters with your face all over the mountains—that was Dexter!",
                topicDescription = "Bribe for bandit intelligence and ask about Dexter's bounties",
                defaultResponse = "Inside detail: Spare my life and warn me about Cavalorn, and I'll tip you off about Dexter's bounty before vanishing from the road! Strategic Hint: With 13 base Protection, Bandit Overlook is a natural defensive chokepoint between Gaan's Crossroads (#33) and Minental Ridge (#42)."
            )
        )
    ),
    "38" to SectorSubLocation(
        sectorId = "38",
        buttonEmoji = "🪨",
        buttonLabel = "Enter Crag Alcove",
        buttonTooltip = "Narrow stone path descending toward Xardas's hidden valley",
        modalTitle = "🪨 The Overgrown Cliff Ledge",
        modalSubtitle = "Narrow stone path descending toward Xardas's hidden valley",
        bannerImageUrl = "/locations/xardas_tower_study.jpg",
        patrons = listOf(
            TavernPatron(
                id = "karras",
                name = "Karras",
                role = "Researcher of the Seekers & Golems",
                iconUrl = "/portraits/pyrokar.png",
                catchphrase = "The stone resonance in these western crags is unmistakable—Beliar's corruption seeps through the mountain rock itself.",
                topicDescription = "Study elemental golem cores and wards against Seekers",
                defaultResponse = "Inside detail: Bring me a blessed lump of stone from the Magic Golem and three Almanac books to craft the sacred amulet that shields you from the Seekers' mental possession! Strategic Hint: Western Crags has 11 Protection and only 2 connections (#34 and #46)—perfect for sealing off the southwest."
            )
        )
    ),
    "39" to SectorSubLocation(
        sectorId = "39",
        buttonEmoji = "🧌",
        buttonLabel = "Inspect Troll Gorge Cave",
        buttonTooltip = "Bone-littered canyon echoing with deep roars",
        modalTitle = "🧌 The Two-Troll Gorge & Gobbo Cavern",
        modalSubtitle = "Bone-littered canyon echoing with deep roars",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "pedro_trail",
                name = "Pedro",
                role = "Fleeing Novice with the Eye of Innos",
                iconUrl = "/portraits/pyrokar.png",
                catchphrase = "I didn't want to steal the Eye of Innos! The voice in my head commanded me to run past the trolls into the mountains!",
                topicDescription = "Interrogate the possessed novice regarding the stolen Eye of Innos",
                defaultResponse = "Inside detail: When I stole the sacred Eye of Innos in Chapter 3, I sprinted past the novice guards and left a trail of dead bodies all the way to the Circle of the Sun! Strategic Hint: Troll Canyon's 12 Protection makes it a tough nut to crack when flanking toward Shadowbeast Woods (#41)."
            )
        )
    ),
    "40" to SectorSubLocation(
        sectorId = "40",
        buttonEmoji = "🪓",
        buttonLabel = "Visit Grom's Woodcutter Tent",
        buttonTooltip = "Stacked timber, sharpening stones, and a cold cooking pot",
        modalTitle = "🪓 Grom's Logging Glade",
        modalSubtitle = "Stacked timber, sharpening stones, and a cold cooking pot",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "grom",
                name = "Grom",
                role = "Hungry Logger & Trophy Hunter",
                iconUrl = "/characters/halvor.png",
                catchphrase = "Look at me—chopping logs all day beneath two mountain trolls on an empty stomach! Got any milk, bread, and ham?",
                topicDescription = "Trade foodstuffs for big-game skinning and trophy-pulling lessons",
                defaultResponse = "Inside detail: Feed me milk, bread, and a slab of ham, and I'll teach you how to skin shadowbeasts, pull mandibles, and harvest troll tusks! Strategic Hint: Grom's Camp yields 5 Food/turn and links Xardas's Valley (#46) to the southern woods (#41) and Golem Defile (#47).",
                tags = setOf(NpcTag.HUNTER)
            )
        )
    ),
    "41" to SectorSubLocation(
        sectorId = "41",
        buttonEmoji = "🌲",
        buttonLabel = "Enter Bosper's Forest Hideout",
        buttonTooltip = "Moonless canopy where ancient predators slumber",
        modalTitle = "🌲 The Deep Pine Shadowbeast Lair",
        modalSubtitle = "Moonless canopy where ancient predators slumber",
        bannerImageUrl = "/locations/wilderness_hunter_camp.jpg",
        patrons = listOf(
            TavernPatron(
                id = "bosper_woods",
                name = "Bosper",
                role = "Master Bowyer & Fur Trader",
                iconUrl = "/characters/alrik.png",
                catchphrase = "A shadowbeast pelt from these southern pines is worth its weight in gold—if you don't wake the beast before drawing your bow!",
                topicDescription = "Learn shadowbeast pelt harvesting and master bowcrafting",
                defaultResponse = "Inside detail: Inside the dark cave under the stone arch near these woods sleeps a shadowbeast guarding an orcish war-axe and a chest of valuables! Strategic Hint: Connecting 5 southern sectors (#39, #40, #42, #47, #48), Shadowbeast Woods is the central staging ground for assaulting the Pass."
            )
        )
    ),
    "42" to SectorSubLocation(
        sectorId = "42",
        buttonEmoji = "🔥",
        buttonLabel = "Visit Veteran's Ridge Camp",
        buttonTooltip = "Wind-blasted ridge commanding the approaches to the Pyramids and the Pass",
        modalTitle = "🔥 The High Mountain Watchfire",
        modalSubtitle = "Wind-blasted ridge commanding the approaches to the Pyramids and the Pass",
        bannerImageUrl = "/locations/citadel_pass_hall.jpg",
        patrons = listOf(
            TavernPatron(
                id = "diego_ridge",
                name = "Diego",
                role = "Shadow Veteran of the Old Camp",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Look at those mountain ridges, friend. Reminds you of the days under the Magic Barrier, doesn't it?",
                topicDescription = "Reminisce about the Barrier days and ask about his hidden gold pouch",
                defaultResponse = "Inside detail: If you escort me all the way from the Valley of Mines back to the Pass gate and later find my hidden 2,000-gold pouch, I'll buy the finest mansion in Khorinis's upper quarter! Strategic Hint: Minental Ridge is a 6-connection mountain fortress (13 Protection). Control it to split the eastern pyramids from the western pass."
            )
        )
    ),
    "43" to SectorSubLocation(
        sectorId = "43",
        buttonEmoji = "🏛️",
        buttonLabel = "Enter Pyramid Ruin Tent",
        buttonTooltip = "Ancient stone blocks carved with glyphs of the Builders",
        modalTitle = "🏛️ The Stepped Pyramid Expedition Tent",
        modalSubtitle = "Ancient stone blocks carved with glyphs of the Builders",
        bannerImageUrl = "/locations/water_mages_vault.jpg",
        patrons = listOf(
            TavernPatron(
                id = "riordian",
                name = "Riordian",
                role = "Water Mage Historian",
                iconUrl = "/characters/vatras.jpg",
                catchphrase = "Fascinating! These stepped pyramids predate the Kingdom of Myrtana by centuries—built by a civilization that worshipped Adanos.",
                topicDescription = "Decipher ancient stone tablet glyphs and study the lost culture",
                defaultResponse = "Inside detail: Inside the small pyramid building near the wooden palisade sits a locked chest containing a Stone Tablet and rare scrolls guarded by stone sentinels! Strategic Hint: With 14 base Protection, the Ancient Pyramids guard the northern entrance to the Mages' Excavation (#44) and Paladin Barricade (#50)."
            )
        )
    ),
    "44" to SectorSubLocation(
        sectorId = "44",
        buttonEmoji = "💧",
        buttonLabel = "Enter Water Mages' Vault",
        buttonTooltip = "Echoing underground rotunda lit by blue magical braziers",
        modalTitle = "💧 The Subterranean Hall of the Circle of Water",
        modalSubtitle = "Echoing underground rotunda lit by blue magical braziers",
        bannerImageUrl = "/locations/water_mages_vault.jpg",
        patrons = listOf(
            TavernPatron(
                id = "saturas",
                name = "Saturas",
                role = "Supreme Master of the Circle of Water",
                iconUrl = "/characters/vatras.jpg",
                catchphrase = "YOU! After draining our giant ore heap in the New Camp to charge Uriziel, you have the audacity to walk into my excavation?!",
                topicDescription = "Rebuild trust with the Water Mages and hand over Ornament pieces",
                defaultResponse = "Inside detail: Even though I'm still furious about the New Camp's ore mound from Gothic 1, giving me Vatras's token and recovering the Ornament pieces earns our trust to open Jharkendar! Strategic Hint: Mages' Excavation yields 4 Food/turn with 12 Protection—use Search Scrolls here with a high-Intellect hero for arcane firepower."
            ),
            TavernPatron(
                id = "nefarius",
                name = "Nefarius",
                role = "Portal Runesmith",
                iconUrl = "/characters/vatras.jpg",
                catchphrase = "The ancient ring key was broken into four fragments and hidden inside stone circles across Khorinis.",
                topicDescription = "Ask about reassembling the ancient stone portal ring key",
                defaultResponse = "Inside detail: Lord Hagen holds the final Ornament fragment because the paladins pried it out of the stone circle above Lobart's farm! Strategic Hint: Hold Sector 44 to protect the approaches to the Jharkendar Portal (#45)."
            )
        )
    ),
    "45" to SectorSubLocation(
        sectorId = "45",
        buttonEmoji = "🌀",
        buttonLabel = "Step into the Portal Chamber",
        buttonTooltip = "Glowing turquoise teleporter gate to the forgotten valley of Jharkendar",
        modalTitle = "🌀 The Sanctum of the Ancient Portal",
        modalSubtitle = "Glowing turquoise teleporter gate to the forgotten valley of Jharkendar",
        bannerImageUrl = "/locations/water_mages_vault.jpg",
        patrons = listOf(
            TavernPatron(
                id = "merdarion",
                name = "Merdarion",
                role = "Teleporter Matrix Researcher",
                iconUrl = "/characters/vatras.jpg",
                catchphrase = "Once the Ring of the Builders is inserted into the wall socket, the portal to Jharkendar hums with ancient energy!",
                topicDescription = "Ask about teleporter focus stones and ancient portal harmonics",
                defaultResponse = "Inside detail: Activating each focus stone on the small teleporter platforms unlocks instant fast-travel across the entire archaeological cavern! Strategic Hint: Jharkendar Portal has 16 Protection and links the Mages' Excavation (#44) directly down to the Mine Pass Tunnel (#53), letting you flank the Southern Castle (#52) from the east!"
            )
        )
    ),
    "46" to SectorSubLocation(
        sectorId = "46",
        buttonEmoji = "🌿",
        buttonLabel = "Visit Lester's Valley Campfire",
        buttonTooltip = "Quiet ravine campfire below Xardas's dark spire",
        modalTitle = "🌿 Lester's Secluded Valley Camp",
        modalSubtitle = "Quiet ravine campfire below Xardas's dark spire",
        bannerImageUrl = "/locations/xardas_tower_study.jpg",
        patrons = listOf(
            TavernPatron(
                id = "lester",
                name = "Lester",
                role = "Former Swamp Camp Novice & Friend",
                iconUrl = "/colony_whisper.jpg",
                catchphrase = "My head is still splitting from when the Sleeper was banished... I barely crawled out to this valley before Xardas found me.",
                topicDescription = "Share a pipe of swampweed and ask about Xardas's valley",
                defaultResponse = "Inside detail: Tell me about my valley camp when you reach Xardas's Tower, and I'll teleport straight up to Xardas's library to rest—and later bring you Xardas's secret letter in Chapter 3! Strategic Hint: Xardas's Valley is the sole gateway to Xardas's Tower (#49). Hold Sector 46 and nobody can touch Sector 49."
            )
        )
    ),
    "47" to SectorSubLocation(
        sectorId = "47",
        buttonEmoji = "🗿",
        buttonLabel = "Inspect Magic Golem Crater",
        buttonTooltip = "Narrow stone defile patrolled by elemental constructs",
        modalTitle = "🗿 The Shattered Golem Pass",
        modalSubtitle = "Narrow stone defile patrolled by elemental constructs",
        bannerImageUrl = "/locations/xardas_tower_study.jpg",
        patrons = listOf(
            TavernPatron(
                id = "serpentes",
                name = "Serpentes",
                role = "High Council Fire Mage",
                iconUrl = "/portraits/pyrokar.png",
                catchphrase = "No ordinary blade can scratch a Magic Golem—only the Sacred Hammer of Innos can shatter its enchanted heart!",
                topicDescription = "Ask about the trial of the Magic Golem and the Sacred Hammer",
                defaultResponse = "Inside detail: During the Trial of Fire, the Magic Golem spawns near this defile and dies in a single strike if you wield the Sacred Hammer stolen from the Monastery basement! Strategic Hint: Golem Defile has 13 Protection and links Xardas's Valley (#46) to the Pass Gorge (#48)."
            )
        )
    ),
    "48" to SectorSubLocation(
        sectorId = "48",
        buttonEmoji = "🪓",
        buttonLabel = "Visit Veterans' Gorge Camp",
        buttonTooltip = "Steep canyon leading up to the Paladin Barricade",
        modalTitle = "🪓 The Rocky Pass Approach",
        modalSubtitle = "Steep canyon leading up to the Paladin Barricade",
        bannerImageUrl = "/locations/citadel_pass_hall.jpg",
        patrons = listOf(
            TavernPatron(
                id = "gorn",
                name = "Gorn",
                role = "Axe-Wielding Veteran of the Colony",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Nothing clears a mountain gorge faster than a heavy battleaxe and a barrel of cold beer!",
                topicDescription = "Plan the assault on the orc vanguard and discuss heavy two-handed axes",
                defaultResponse = "Inside detail: Once you bail me out of Garond's dungeon for 1,000 gold (after Milten chips in 250 and Diego gives 300), I'll help you storm the orcish hordes at the Pass! Strategic Hint: With 14 Protection, Pass Gorge is the final staging ground before the Paladin Barricade (#50)."
            )
        )
    ),
    "49" to SectorSubLocation(
        sectorId = "49",
        buttonEmoji = "🔮",
        buttonLabel = "Enter Xardas's Arcane Study",
        buttonTooltip = "Pentagram-inscribed spire overlooking the southern peaks",
        modalTitle = "🔮 Xardas's Summoning Library",
        modalSubtitle = "Pentagram-inscribed spire overlooking the southern peaks",
        bannerImageUrl = "/locations/xardas_tower_study.jpg",
        patrons = listOf(
            TavernPatron(
                id = "xardas",
                name = "Xardas",
                role = "The Necromancer",
                iconUrl = "/characters/xardas.jpg",
                catchphrase = "For thirty days you lay buried beneath the rubble of the Sleeper's temple until my magic pulled you into this tower.",
                topicDescription = "Inquire about the dragons, the Eye of Innos, and secret tower switches",
                defaultResponse = "Inside detail: Don't forget the Belt of Strength (+5 Strength) sitting on the table in my locked side room—or the secret switches on my mantlepiece! Strategic Hint: Xardas's Tower has 18 base Protection (nearly a Castle!) and only 1 connection (#46). It is the single hardest non-castle sector to conquer in Gothic Fire."
            )
        )
    ),
    "50" to SectorSubLocation(
        sectorId = "50",
        buttonEmoji = "🛡️",
        buttonLabel = "Enter Barricade Watchpost",
        buttonTooltip = "Reinforced timber and stone breastworks guarding the mountain pass",
        modalTitle = "🛡️ The Royal Pass Palisade",
        modalSubtitle = "Reinforced timber and stone breastworks guarding the mountain pass",
        bannerImageUrl = "/locations/citadel_pass_hall.jpg",
        patrons = listOf(
            TavernPatron(
                id = "sengrath",
                name = "Paladin Sengrath",
                role = "Expedition Scrollmaster",
                iconUrl = "/knight_icon.png",
                catchphrase = "Hold the line! If this barricade falls, every orc between here and the Valley of Mines will pour into Khorinis!",
                topicDescription = "Inspect military scrolls and frontline paladin fortifications",
                defaultResponse = "Inside detail: Keep an eye on what you sell me in Chapter 2—if you sell me valuable quest items before I wander off into the orc encirclement in Chapter 4, they'll end up on my corpse! Strategic Hint: With 16 Protection, Paladin Barricade is the northern shield of the Fortress of the Pass (#52). Bring Siege Weapons to breach it!"
            )
        )
    ),
    "51" to SectorSubLocation(
        sectorId = "51",
        buttonEmoji = "⛏️",
        buttonLabel = "Enter Upper Mine Timbering",
        buttonTooltip = "Creaking mine beams and glittering veins of magic ore",
        modalTitle = "⛏️ The Forgotten Mountain Ore Shaft",
        modalSubtitle = "Creaking mine beams and glittering veins of magic ore",
        bannerImageUrl = "/locations/citadel_pass_hall.jpg",
        patrons = listOf(
            TavernPatron(
                id = "grimes",
                name = "Grimes",
                role = "Old Mine Survivor",
                iconUrl = "/characters/halvor.png",
                catchphrase = "I survived the flooding of the Old Mine in Gothic 1, and I'll survive the dragons and skeletons in this shaft too!",
                topicDescription = "Ask about surviving the Old Mine disaster and digging magic ore veins",
                defaultResponse = "Inside detail: Tell me you're heading back to Khorinis and I'll guide you along the safe ridge path past the orc patrols to the Abandoned Mine! Strategic Hint: Although Cultivation is low (3), this mine shaft sits in a defensible 13-Protection corner (#45 and #53) where you can safely hide a wounded commander."
            )
        )
    ),
    "52" to SectorSubLocation(
        sectorId = "52",
        buttonEmoji = "🏰",
        buttonLabel = "Enter Citadel Mess & Armory",
        buttonTooltip = "Besieged stone keep at the threshold of the Valley of Mines",
        modalTitle = "🏰 Garond's Citadel Hall & Quartermaster's Vault",
        modalSubtitle = "Besieged stone keep at the threshold of the Valley of Mines",
        bannerImageUrl = "/locations/citadel_pass_hall.jpg",
        patrons = listOf(
            TavernPatron(
                id = "engor",
                name = "Engor",
                role = "Fortress Provisioner",
                iconUrl = "/portraits/garond.png",
                catchphrase = "Commander Garond has cut rations again! Unless you've brought two dozen slabs of meat, cheese, and sausage, keep moving.",
                topicDescription = "Inquire about fortress rations, food shortages, and trading supplies",
                defaultResponse = "Inside detail: You can fulfill my meat-ration quest immediately by looting the hams and sausages stored in the fortress rafters right above my head! Strategic Hint: As the Southern Castle (20 Protection, 7 Food/turn), holding Sector 52 lets you build Siege Weapons and Heavy Infantry on the southern front."
            ),
            TavernPatron(
                id = "parcival",
                name = "Paladin Parcival",
                role = "Paladin Field Captain",
                iconUrl = "/portraits/lord_hagen.png",
                catchphrase = "We are surrounded on three sides, yet the light of Innos shall never falter within these walls!",
                topicDescription = "Ask about paladin defense plans and holding off the orc siege",
                defaultResponse = "Inside detail: Pulling the lever on the battering ram ramparts during an orc siege lets you rain fire spells down on the warlords below without taking a scratch! Strategic Hint: Protect your adjacent tunnels (#50, #53, #54) so enemies cannot surround your Home Castle."
            )
        )
    ),
    "53" to SectorSubLocation(
        sectorId = "53",
        buttonEmoji = "🕯️",
        buttonLabel = "Enter Underground Creek Cavern",
        buttonTooltip = "Torchlit underground waterway bypassing the orcish surface camps",
        modalTitle = "🕯️ The Subterranean Pass Tunnel",
        modalSubtitle = "Torchlit underground waterway bypassing the orcish surface camps",
        bannerImageUrl = "/locations/citadel_pass_hall.jpg",
        patrons = listOf(
            TavernPatron(
                id = "jergan",
                name = "Jergan",
                role = "Expedition Scout",
                iconUrl = "/characters/alrik.png",
                catchphrase = "Stay out of the upper canyon—an entire orc army is camped on the surface! Slip through this creek tunnel instead.",
                topicDescription = "Ask about stealth routes into the Valley of Mines and scouting orc camps",
                defaultResponse = "Inside detail: Before you step out of the tunnel into the Valley of Mines, tell me you'll inform Fajeth about his brother's death—and grab the teleporter rune inside the abandoned mine! Strategic Hint: Mine Pass Tunnel connects 4 critical southern sectors (#45, #51, #52, #54) with 14 Protection."
            )
        )
    ),
    "54" to SectorSubLocation(
        sectorId = "54",
        buttonEmoji = "⛓️",
        buttonLabel = "Enter Portcullis Winch House",
        buttonTooltip = "Massive iron portcullis sealing the southern border",
        modalTitle = "⛓️ The Great Gatehouse of the Penal Colony",
        modalSubtitle = "Massive iron portcullis sealing the southern border",
        bannerImageUrl = "/locations/citadel_pass_hall.jpg",
        patrons = listOf(
            TavernPatron(
                id = "udar",
                name = "Udar",
                role = "Rampart Crossbowman",
                iconUrl = "/knight_icon.png",
                catchphrase = "Every night those orcish war drums echo against the portcullis... Thank Innos the gate mechanism still holds!",
                topicDescription = "Inquire about rampart watch duty and the southern gate winch",
                defaultResponse = "Inside detail: Whatever you do in Chapter 5, DO NOT open the main courtyard gate before you're ready—Jan the blacksmith's idiot guard will let the entire orc horde storm the castle! Strategic Hint: With 18 base Protection and only 2 connections (#52 and #53), Valley of Mines Gate is an ironclad southern bastion for the Fortress of the Pass."
            ),
            TavernPatron(
                id = "brutus",
                name = "Brutus",
                role = "Keeper of the Winch & Dungeon",
                iconUrl = "/characters/moe.png",
                catchphrase = "Nothing like sharpening a blade while those meatbugs scurry out of the torture chamber...",
                topicDescription = "Ask about dungeon keys and why meatbugs terrify him",
                defaultResponse = "Inside detail: When the Seekers possess my mind in Chapter 4, I lock myself inside the torture chamber afraid of meatbugs until you knock me unconscious! Strategic Hint: Fortifying Sector 54 once brings it to 20+ Protection—making it as tough as a Castle!"
            )
        )
    )
)

fun getSubLocationForSector(sectorId: String): SectorSubLocation? = SectorSubLocations[sectorId]

fun getPatronForSector(sectorId: String, patronId: String): TavernPatron? =
    SectorSubLocations[sectorId]?.patrons?.find { it.id == patronId }
        ?: KhorinisTavernPatrons.find { it.id == patronId }

@Serializable
data class TavernDialogueResponse(
    val patronId: String,
    val patronName: String,
    val greeting: String,
    val gossipReply: String,
    val timestamp: Long = 0L
)
