import re

with open('src/jsMain/kotlin/components/GameLobby.kt', 'r') as f:
    content = f.read()

# 1. Add PvE state variables
state_vars = """
    var creatingPvE by remember { mutableStateOf(false) }
    var pveTeam by remember { mutableStateOf(Team.RED) }
    var pveAllowSecond by remember { mutableStateOf(false) }
    var pveSelectedHeroes by remember { mutableStateOf(listOf<String>()) }
    var pveSelectedCastle by remember { mutableStateOf("14") }
"""
content = content.replace('var viewingTeams by remember { mutableStateOf(false) }', 'var viewingTeams by remember { mutableStateOf(false) }\n' + state_vars)

# 2. Add "Create PvE Game" button and form
create_game_ui = """
            div(className = "d-flex justify-center items-center gap-1 mb-2") {
                text(value = playerName, placeholder = "Your Name", className = "w-full max-w-sm text-center") {
                    onInput { playerName = this.value ?: "" }
                }
            }
            div(className = "d-flex justify-center gap-1") {
                button("Create Multiplayer", className = "btn btn-primary") {
                    onClick {
                        if (playerName.isNotBlank() && gameNameInput.isNotBlank()) {
                            ws.connect {
                                ws.sendAction(GameAction.CreateGame(playerName, gameNameInput))
                            }
                        }
                    }
                }
                button("Play vs Computer", className = "btn bg-yellow text-dark-gray") {
                    onClick {
                        if (playerName.isNotBlank() && gameNameInput.isNotBlank()) {
                            creatingPvE = true
                        }
                    }
                }
            }
"""

content = re.sub(
    r'div\(className = "d-flex justify-center items-center gap-1 mb-2"\) \{.*?button\("Create New Game".*?\}\n\s*\}\n\s*\}',
    create_game_ui,
    content,
    flags=re.DOTALL
)

# 3. Add PvE Form rendering if creatingPvE is true
pve_form_ui = """
        if (creatingPvE && (gameState == null || gameState.status == GameStatus.NOT_CREATED)) {
            div(className = "glass p-4 mt-2 text-left") {
                h2(className = "text-primary mt-0") { textNode("PvE Setup") }
                
                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode("1. Choose Team:") }
                    select(className = "w-full max-w-xs") {
                        option(value = "RED", label = "Red Team")
                        option(value = "BLUE", label = "Blue Team")
                        onChange { 
                            pveTeam = if (this.value == "BLUE") Team.BLUE else Team.RED 
                        }
                    }
                }
                
                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode("2. Co-op Mode:") }
                    div(className = "d-flex items-center gap-1") {
                        dev.kilua.form.check.checkBox(value = pveAllowSecond) {
                            onChange { pveAllowSecond = this.value }
                        }
                        span { textNode("Allow a second player to join") }
                    }
                }
                
                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode("3. Choose 2 Heroes (${pveSelectedHeroes.size}/2):") }
                    div(className = "hero-grid") {
                        for (hero in PredefinedCharacters) {
                            val isSelected = hero.templateId in pveSelectedHeroes
                            div(className = "hero-card ${if (isSelected) "selected" else ""}") {
                                h3(className = "m-0 text-gold text-base") { textNode(hero.name) }
                                onClick {
                                    pveSelectedHeroes = if (isSelected) {
                                        pveSelectedHeroes - hero.templateId
                                    } else {
                                        if (pveSelectedHeroes.size < 2) pveSelectedHeroes + hero.templateId else listOf(pveSelectedHeroes[1], hero.templateId)
                                    }
                                }
                            }
                        }
                    }
                }
                
                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode("4. Choose Castle:") }
                    val availableCastles = MapData.values.filter { it.isCastle }
                    select(className = "w-full max-w-xs") {
                        for (c in availableCastles) {
                            option(value = c.id, label = c.name ?: "Castle ${c.id}")
                        }
                        onChange { pveSelectedCastle = this.value ?: "14" }
                    }
                }
                
                val canStart = pveSelectedHeroes.size == 2
                button("Start Game!", className = "btn btn-primary w-full ${if (!canStart) "btn-disabled" else ""}") {
                    onClick {
                        if (canStart) {
                            ws.connect {
                                ws.sendAction(GameAction.StartPvEGame(
                                    playerName, gameNameInput, pveAllowSecond, pveTeam, pveSelectedHeroes, pveSelectedCastle
                                ))
                            }
                            creatingPvE = false
                        }
                    }
                }
                button("Cancel", className = "btn bg-red-light text-red w-full mt-1") {
                    onClick { creatingPvE = false }
                }
            }
            return@div
        }
"""

content = content.replace('return@div\n        }', 'return@div\n        }\n' + pve_form_ui)


# 4. Handle Join PvE
join_pve_ui = """
                if (gameState.isPvE) {
                    if (gameState.players.count { !it.isBot } < 2) {
                        button("Join Co-op (PvE)", className = "btn btn-primary mt-1") {
                            onClick {
                                if (playerName.isNotBlank()) {
                                    viewingTeams = true
                                }
                            }
                        }
                    }
                } else {
                    button("Join Game", className = "btn btn-primary") {
                        onClick {
                            if (playerName.isNotBlank()) {
                                viewingTeams = true
                            }
                        }
                    }
                }
"""

content = re.sub(
    r'button\("Join Game", className = "btn btn-primary"\) \{\s*onClick \{\s*if \(playerName.isNotBlank\(\)\) \{\s*viewingTeams = true\s*\}\s*\}\s*\}',
    join_pve_ui,
    content
)

# 5. Fix hero selection for Join PvE
# If joining PvE, we need a special confirm button since we bypass the castle selection
hero_confirm_pve = """
                    val canConfirm = selectedHeroIds.size == 2
                    if (gameState.isPvE) {
                        button(
                            "Join Battle (${selectedHeroIds.size}/2)",
                            className = "btn btn-primary ${if (!canConfirm) "btn-disabled" else ""}"
                        ) {
                            onClick {
                                if (canConfirm) {
                                    ws.sendAction(GameAction.JoinPvEGame(playerName, selectedHeroIds))
                                }
                            }
                        }
                    } else {
                        button(
                            "Confirm Selection (${selectedHeroIds.size}/2)",
                            className = "btn btn-primary ${if (!canConfirm) "btn-disabled" else ""}"
                        ) {
                            onClick {
                                if (canConfirm) {
                                    ws.sendAction(GameAction.SelectCharacters(selectedHeroIds))
                                }
                            }
                        }
                    }
"""

content = re.sub(
    r'button\([^}]*?"Confirm Selection.*?\}\n\s*\}\n\s*\}',
    hero_confirm_pve,
    content,
    flags=re.DOTALL
)

# 6. Show Bot indicator on teams
team_render = """
                p(className = "text-xs text-gray mt-0 mb-1") { textNode("Base: $redCastleName") }
                val redPlayers = gameState.players.filter { it.team == Team.RED }
                for (p in redPlayers) {
                    val pChars = gameState.characters.filter { it.playerId == p.id }
                    val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""
                    val botIndicator = if (p.isBot) " 🤖" else ""
                    div(className = "d-flex justify-between items-center w-full mt-05") {
                        span { textNode("${p.name}$botIndicator$heroesStr") }
"""
content = content.replace(
    'val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""\n                    div(className = "d-flex justify-between items-center w-full mt-05") {\n                        span { textNode("${p.name}$heroesStr") }',
    'val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""\n                    val botIndicator = if (p.isBot) " 🤖" else ""\n                    div(className = "d-flex justify-between items-center w-full mt-05") {\n                        span { textNode("${p.name}$botIndicator$heroesStr") }'
)

# Do it again for Blue team (though the replace might have caught both if it matched generically, let's check)
# Actually the regex replace might fail if exact string doesn't match, let's just use re.sub for all player name rendering

content = re.sub(
    r'val heroesStr = if \(pChars\.isNotEmpty\(\)\) " \(\$\{pChars\.joinToString\(", "\) \{ it\.name \}\}\)" else ""\n\s*div\(className = "d-flex justify-between items-center w-full mt-05"\) \{\n\s*span \{ textNode\("\$\{p\.name\}\$heroesStr"\) \}',
    'val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""\n                    val botIndicator = if (p.isBot) " 🤖" else ""\n                    div(className = "d-flex justify-between items-center w-full mt-05") {\n                        span { textNode("${p.name}$botIndicator$heroesStr") }',
    content
)

# Add Yellow team rendering
yellow_team_ui = """
            // YELLOW TEAM (PvE Enemy)
            if (gameState.isPvE) {
                div(className = "glass flex-col items-center p-2 w-full") {
                    val yellowTeamInfo = gameState.teamInfos[Team.YELLOW]
                    val yellowCastleId = gameState.teamCastles[Team.YELLOW]
                    val yellowCastleName = yellowCastleId?.let { MapData[it]?.name ?: "Castle $it" } ?: "No base chosen"
                    if (yellowTeamInfo != null) {
                        h3(className = "m-0 mb-1") { 
                            style("color", yellowTeamInfo.color)
                            textNode(yellowTeamInfo.name.uppercase()) 
                        }
                    } else {
                        h3(className = "text-gray m-0 mb-1") { textNode("ENEMY TEAM") }
                    }
                    
                    p(className = "text-xs text-gray mt-0 mb-1") { textNode("Base: $yellowCastleName") }
                    val yellowPlayers = gameState.players.filter { it.team == Team.YELLOW }
                    for (p in yellowPlayers) {
                        val pChars = gameState.characters.filter { it.playerId == p.id }
                        val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""
                        val botIndicator = if (p.isBot) " 🤖" else ""
                        div(className = "d-flex justify-between items-center w-full mt-05") {
                            span { textNode("${p.name}$botIndicator$heroesStr") }
                            if (p.isReady) {
                                span(className = "text-sm text-primary font-600") { textNode("READY") }
                            } else {
                                span(className = "text-sm text-gray") { textNode("NOT READY") }
                            }
                        }
                    }
                }
            }
"""

content = content.replace(
    'if (gameState.creatorPlayerId == currentName) {',
    yellow_team_ui + '\n        if (gameState.creatorPlayerId == currentName) {'
)

# Remove background CSS for bg-yellow if it doesn't exist by adding it to App.kt later or inline here
# Actually, I'll just use inline style or a known class. Let's write the modified content back.

with open('src/jsMain/kotlin/components/GameLobby.kt', 'w') as f:
    f.write(content)

print("GameLobby.kt updated")
