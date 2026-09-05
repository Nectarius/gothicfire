package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.form.text.text
import dev.kilua.form.select.*
import dev.kilua.html.*
import dev.kilua.form.color.colorPicker
import game.GameWebSocket
import i18n.t
import models.GameAction
import models.GameState
import models.GameStatus
import models.PredefinedCharacters
import models.Team
import models.MapData

fun isYellowish(hex: String): Boolean {
    if (hex.length != 7) return false
    try {
        val r = hex.substring(1, 3).toInt(16)
        val g = hex.substring(3, 5).toInt(16)
        val b = hex.substring(5, 7).toInt(16)
        return r > 180 && g > 180 && b < 100
    } catch (e: Exception) {
        return false
    }
}

val predefinedColors = listOf(
    "#D32F2F" to "Crimson Red",
    "#1976D2" to "Cobalt Blue",
    "#2E7D32" to "Emerald Green",
    "#F57C00" to "Blaze Orange",
    "#7B1FA2" to "Royal Purple",
    "#00BCD4" to "Electric Cyan",
    "#E91E63" to "Magenta Pink",
    "#00796B" to "Teal / Sea Green",
    "#A0522D" to "Burnt Copper",
    "#FFFFFF" to "Pure White",
    "#212121" to "Charcoal Black",
    "#B388FF" to "Lavender / Violet",
    "#64DD17" to "Lime Green",
    "#FF6F61" to "Coral / Salmon",
    "#607D8B" to "Slate Blue / Steel"
)

@Composable
fun IComponent.GameLobby(
    ws: GameWebSocket,
    gameState: GameState?,
    yourPlayerId: String,
    initialCreatingPvE: Boolean = false,
    onCancelPvE: (() -> Unit)? = null,
    currentUserName: String = ""
) {
    var playerName by remember(currentUserName) { mutableStateOf(currentUserName) }
    var gameNameInput by remember { mutableStateOf("") }
    var selectedHeroIds by remember { mutableStateOf(listOf<String>()) }

    val myPlayer = gameState?.players?.find { it.id == yourPlayerId }
    val myCharacters = gameState?.characters?.filter { it.playerId == yourPlayerId } ?: emptyList()
    val currentName = myPlayer?.name ?: playerName
    
    var viewingTeams by remember { mutableStateOf(false) }

    var creatingPvE by remember { mutableStateOf(initialCreatingPvE) }
    var pveTeam by remember { mutableStateOf(Team.RED) }
    var pveAllowSecond by remember { mutableStateOf(false) }
    var pveSelectedHeroes by remember { mutableStateOf(listOf<String>()) }
    var pveSelectedCastle by remember { mutableStateOf("14") }
    var pveTeamColor by remember { mutableStateOf(predefinedColors[0].first) }
    var pveColorError by remember { mutableStateOf(false) }

    
    div(className = "lobby-container glass p-4 text-center w-full") {
        h1(className = "m-0 mb-2") { textNode(t("lobby.title")) }
        
        if (creatingPvE) {
            div(className = "glass p-4 mt-2 text-left") {
                h2(className = "text-primary mt-0") { textNode(t("lobby.pve_setup")) }
                
                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode(t("lobby.your_name")) }
                    text(value = playerName, placeholder = t("lobby.your_name"), className = "w-full max-w-xs") {
                        onInput { playerName = this.value ?: "" }
                    }
                }
                
                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode(t("lobby.game_name")) }
                    text(value = gameNameInput, placeholder = t("lobby.game_name"), className = "w-full max-w-xs") {
                        onInput { gameNameInput = this.value ?: "" }
                    }
                }

                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode(t("lobby.choose_team")) }
                    select(className = "w-full max-w-xs mb-1") {
                        option(value = "RED", label = t("lobby.red_team"))
                        option(value = "BLUE", label = t("lobby.blue_team"))
                        onChange { 
                            pveTeam = if (this.value == "BLUE") Team.BLUE else Team.RED 
                            // Auto-update color based on standard team if user hasn't chosen one
                            if (this.value == "BLUE" && pveTeamColor == predefinedColors[0].first) {
                                pveTeamColor = predefinedColors[1].first
                            } else if (this.value == "RED" && pveTeamColor == predefinedColors[1].first) {
                                pveTeamColor = predefinedColors[0].first
                            }
                        }
                    }
                    
                    p(className = "m-0 mb-05") { textNode(t("lobby.team_color")) }
                    div(className = "color-palette d-flex flex-wrap justify-start gap-05 mb-1") {
                        for (c in predefinedColors) {
                            div(className = "color-swatch ${if (pveTeamColor.uppercase() == c.first.uppercase()) "selected" else ""}") {
                                style("background-color", c.first)
                                title(c.second)
                                onClick {
                                    pveTeamColor = c.first
                                    pveColorError = false
                                }
                            }
                        }
                    }
                    
                    div(className = "d-flex flex-col items-start mb-1") {
                        label(className = "text-xs text-gray mb-05") { textNode(t("lobby.custom_color")) }
                        colorPicker(value = pveTeamColor, className = "w-full max-w-xs") {
                            onInput {
                                val newColor = this.value ?: "#ef4444"
                                if (isYellowish(newColor)) {
                                    pveColorError = true
                                } else {
                                    pveColorError = false
                                    pveTeamColor = newColor
                                }
                            }
                        }
                        if (pveColorError) {
                            p(className = "text-red text-xs mt-05 mb-0") { textNode(t("lobby.color_yellow_reserved")) }
                        }
                    }
                }
                
                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode(t("lobby.coop_mode")) }
                    div(className = "d-flex items-center gap-1") {
                        button(if (pveAllowSecond) t("lobby.coop_enabled") else t("lobby.coop_disabled"), className = "btn ${if (pveAllowSecond) "btn-primary" else "bg-dark-gray text-gray"}") {
                            onClick { pveAllowSecond = !pveAllowSecond }
                        }
                    }
                }
                
                div(className = "mb-2") {
                    p(className = "m-0 mb-05") { textNode(t("lobby.choose_heroes", pveSelectedHeroes.size)) }
                    div(className = "hero-grid") {
                        for (hero in PredefinedCharacters) {
                            val isSelected = hero.templateId in pveSelectedHeroes
                            val selectionIndex = if (isSelected) pveSelectedHeroes.indexOf(hero.templateId) + 1 else null
                            div(className = "hero-card ${if (isSelected) "selected" else ""}") {
                                if (selectionIndex != null) {
                                    span(className = "hero-selection-badge") {
                                        textNode(t("lobby.hero_badge", selectionIndex))
                                    }
                                }
                                h3(className = "m-0 text-gold text-base") { textNode(hero.name) }
                                
                                div(className = "hero-stats-row mt-1") {
                                    span(className = "hero-stat-pill text-red") { textNode("WAR: ${hero.warlord}") }
                                    span(className = "hero-stat-pill text-blue") { textNode("INT: ${hero.intellect}") }
                                    span(className = "hero-stat-pill text-green") { textNode("VAN: ${hero.vanguard}") }
                                    span(className = "hero-stat-pill text-purple") { textNode("ARC: ${hero.archon}") }
                                }
                                
                                val roleStr = when {
                                    hero.isMage -> t("lobby.role_mage")
                                    hero.isArcher -> t("lobby.role_archer")
                                    hero.isSoldier -> t("lobby.role_soldier")
                                    else -> t("lobby.role_hero")
                                }
                                p(className = "text-xs text-gray mt-1 mb-0") {
                                    textNode(t("lobby.role", roleStr))
                                }
                                
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
                    p(className = "m-0 mb-05") { textNode(t("lobby.choose_castle")) }
                    val availableCastles = MapData.values.filter { it.isCastle }
                    select(className = "w-full max-w-xs") {
                        for (c in availableCastles) {
                            option(value = c.id, label = c.name ?: "Castle ${c.id}")
                        }
                        onChange { pveSelectedCastle = this.value ?: "14" }
                    }
                }
                
                button(t("lobby.start_coop"), className = "btn btn-primary w-full p-2 text-lg ${if (pveSelectedHeroes.size != 2 || pveColorError || playerName.isBlank()) "btn-disabled" else ""}") {
                    onClick {
                        val effectivePlayerName = playerName.trim()
                        val effectiveGameName = gameNameInput.trim().ifBlank {
                            if (effectivePlayerName.isNotBlank()) "$effectivePlayerName's Campaign" else "Solo Campaign"
                        }
                        if (effectivePlayerName.isNotBlank() && pveSelectedHeroes.size == 2 && !pveColorError) {
                            ws.connect {
                                val colorName = predefinedColors.find { it.first.uppercase() == pveTeamColor.uppercase() }?.second ?: if (pveTeam == Team.RED) "Red Team" else "Blue Team"
                                ws.sendAction(
                                    GameAction.StartPvEGame(
                                        effectivePlayerName, effectiveGameName, pveAllowSecond, pveTeam, pveTeamColor, colorName, pveSelectedHeroes, pveSelectedCastle
                                    )
                                )
                            }
                            creatingPvE = false
                            onCancelPvE?.invoke()
                        }
                    }
                }
                button(t("lobby.cancel"), className = "btn bg-red-light text-red w-full mt-1") {
                    onClick {
                        creatingPvE = false
                        onCancelPvE?.invoke()
                    }
                }
            }

            return@div
        }
        
        if (gameState == null || gameState.status == GameStatus.NOT_CREATED) {
            p(className = "text-gray mb-2") { textNode(t("lobby.no_game")) }
            div(className = "d-flex justify-center items-center gap-1 mb-1") {
                text(value = gameNameInput, placeholder = t("lobby.game_name"), className = "w-full max-w-sm text-center") {
                    onInput { gameNameInput = this.value ?: "" }
                }
            }
            
            div(className = "d-flex justify-center items-center gap-1 mb-2") {
                text(value = playerName, placeholder = t("lobby.your_name"), className = "w-full max-w-sm text-center") {
                    onInput { playerName = this.value ?: "" }
                }
            }
            div(className = "d-flex justify-center gap-1 flex-wrap") {
                button(t("lobby.create_multiplayer"), className = "btn btn-primary") {
                    onClick {
                        if (playerName.isNotBlank() && gameNameInput.isNotBlank()) {
                            ws.connect {
                                ws.sendAction(GameAction.CreateGame(playerName, gameNameInput))
                            }
                        }
                    }
                }
                button(t("lobby.play_pve"), className = "btn bg-yellow text-dark-gray") {
                    onClick {
                        creatingPvE = true
                    }
                }
            }

            return@div
        }

        
        if (myPlayer == null) {
            // Not joined yet
            val isCreator = gameState.creatorPlayerId == currentName
            if (!viewingTeams && !isCreator) {
                h2(className = "m-0 mb-1 text-primary") { textNode(gameState.gameName ?: "Gothic Fire Battle") }
                p(className = "text-gray mb-2") { textNode(t("lobby.game_created_by", gameState.creatorPlayerId ?: "")) }
                div(className = "d-flex justify-center items-center gap-1 mb-2") {
                    text(value = playerName, placeholder = t("lobby.your_name"), className = "w-full max-w-sm text-center") {
                        onInput { playerName = this.value ?: "" }
                    }
                }
                
                div(className = "d-flex justify-center gap-1 flex-wrap") {
                    if (gameState.isPvE) {
                        if (gameState.players.count { !it.isBot } < 2) {
                            button(t("lobby.join_coop"), className = "btn btn-primary") {
                                onClick {
                                    if (playerName.isNotBlank()) {
                                        viewingTeams = true
                                    }
                                }
                            }
                        }
                    } else {
                        button(t("lobby.join_game"), className = "btn btn-primary") {
                            onClick {
                                if (playerName.isNotBlank()) {
                                    viewingTeams = true
                                }
                            }
                        }
                    }
                    button(t("lobby.play_pve_independent"), className = "btn bg-yellow text-dark-gray") {
                        onClick {
                            creatingPvE = true
                        }
                    }
                }

                return@div
            }
            
            h2(className = "m-0 mb-1 text-primary") { textNode(gameState.gameName ?: "Gothic Fire Battle") }
            p(className = "text-gray mb-2") { textNode(t("lobby.game_created_by", gameState.creatorPlayerId ?: "")) }
            div(className = "d-flex justify-center items-center gap-1 mb-2") {
                text(value = playerName, placeholder = t("lobby.your_name"), className = "w-full max-w-sm text-center") {
                    onInput { playerName = this.value ?: "" }
                }
            }
            
            div(className = "d-flex justify-center gap-20") {
                // TEAM RED logic
                div(className = "glass p-2 w-full") {
                    val teamRedInfo = gameState.teamInfos[Team.RED]
                    if (teamRedInfo == null) {
                        h3(className = "text-red m-0 mb-1") { textNode(t("lobby.create_team_1")) }
                        var teamName by remember { mutableStateOf("") }
                        var teamColor by remember { mutableStateOf(predefinedColors[0].first) }
                        var colorError by remember { mutableStateOf(false) }
                        
                        text(value = teamName, placeholder = t("lobby.team_name"), className = "w-full mb-1 text-center") {
                            onInput { teamName = this.value ?: "" }
                        }
                        
                        div(className = "color-palette d-flex flex-wrap justify-center gap-05 mb-1") {
                            for (c in predefinedColors) {
                                div(className = "color-swatch ${if (teamColor.uppercase() == c.first.uppercase()) "selected" else ""}") {
                                    style("background-color", c.first)
                                    title(c.second)
                                    onClick {
                                        teamColor = c.first
                                        colorError = false
                                    }
                                }
                            }
                        }
                        
                        div(className = "d-flex flex-col items-center mb-1") {
                            label(className = "text-xs text-gray mb-05") { textNode(t("lobby.custom_color")) }
                            colorPicker(value = teamColor, className = "w-full max-w-xs") {
                                onInput {
                                    val newColor = this.value ?: "#ef4444"
                                    if (isYellowish(newColor)) {
                                        colorError = true
                                    } else {
                                        colorError = false
                                        teamColor = newColor
                                    }
                                }
                            }
                            if (colorError) {
                                p(className = "text-red text-xs mt-05 mb-0") { textNode(t("lobby.color_yellow_reserved")) }
                            }
                        }
                        
                        button(t("lobby.create_team_btn"), className = "btn btn-primary w-full ${if(colorError) "btn-disabled" else ""}") {
                            onClick {
                                if (playerName.isNotBlank() && teamName.isNotBlank() && !colorError) {
                                    ws.connect {
                                        ws.sendAction(GameAction.CreateTeam(Team.RED, teamName, teamColor, playerName))
                                    }
                                }
                            }
                        }
                    } else {
                        h3(className = "m-0 mb-1") { 
                            style("color", teamRedInfo.color)
                            textNode(teamRedInfo.name) 
                        }
                        val redCount = gameState.players.count { it.team == Team.RED }
                        button(t("lobby.join_team", teamRedInfo.name, redCount), className = "btn btn-primary w-full ${if(redCount >= 5) "opacity-50 pointer-events-none" else ""}") {
                            onClick {
                                if (playerName.isNotBlank() && redCount < 5) {
                                    ws.connect {
                                        ws.sendAction(GameAction.JoinTeam(Team.RED, playerName))
                                    }
                                }
                            }
                        }
                    }
                }
                
                // TEAM BLUE logic
                div(className = "glass p-2 w-full") {
                    val teamBlueInfo = gameState.teamInfos[Team.BLUE]
                    if (teamBlueInfo == null) {
                        h3(className = "text-blue m-0 mb-1") { textNode(t("lobby.create_team_2")) }
                        var teamName by remember { mutableStateOf("") }
                        var teamColor by remember { mutableStateOf(predefinedColors[1].first) }
                        var colorError by remember { mutableStateOf(false) }
                        
                        text(value = teamName, placeholder = t("lobby.team_name"), className = "w-full mb-1 text-center") {
                            onInput { teamName = this.value ?: "" }
                        }
                        
                        div(className = "color-palette d-flex flex-wrap justify-center gap-05 mb-1") {
                            for (c in predefinedColors) {
                                div(className = "color-swatch ${if (teamColor.uppercase() == c.first.uppercase()) "selected" else ""}") {
                                    style("background-color", c.first)
                                    title(c.second)
                                    onClick {
                                        teamColor = c.first
                                        colorError = false
                                    }
                                }
                            }
                        }
                        
                        div(className = "d-flex flex-col items-center mb-1") {
                            label(className = "text-xs text-gray mb-05") { textNode(t("lobby.custom_color")) }
                            colorPicker(value = teamColor, className = "w-full max-w-xs") {
                                onInput {
                                    val newColor = this.value ?: "#3b82f6"
                                    if (isYellowish(newColor)) {
                                        colorError = true
                                    } else {
                                        colorError = false
                                        teamColor = newColor
                                    }
                                }
                            }
                            if (colorError) {
                                p(className = "text-red text-xs mt-05 mb-0") { textNode(t("lobby.color_yellow_reserved")) }
                            }
                        }
                        
                        button(t("lobby.create_team_btn"), className = "btn btn-primary w-full ${if(colorError) "btn-disabled" else ""}") {
                            onClick {
                                if (playerName.isNotBlank() && teamName.isNotBlank() && !colorError) {
                                    ws.connect {
                                        ws.sendAction(GameAction.CreateTeam(Team.BLUE, teamName, teamColor, playerName))
                                    }
                                }
                            }
                        }
                    } else {
                        h3(className = "m-0 mb-1") { 
                            style("color", teamBlueInfo.color)
                            textNode(teamBlueInfo.name) 
                        }
                        val blueCount = gameState.players.count { it.team == Team.BLUE }
                        button(t("lobby.join_team", teamBlueInfo.name, blueCount), className = "btn btn-primary w-full ${if(blueCount >= 5) "opacity-50 pointer-events-none" else ""}") {
                            onClick {
                                if (playerName.isNotBlank() && blueCount < 5) {
                                    ws.connect {
                                        ws.sendAction(GameAction.JoinTeam(Team.BLUE, playerName))
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            div(className = "d-flex justify-center mt-2") {
                button(t("lobby.play_pve_independent"), className = "btn bg-yellow text-dark-gray") {
                    onClick {
                        creatingPvE = true
                    }
                }
            }
        } else {
            // Joined a team
            if (myCharacters.size < 2) {
                h2(className = "mb-05 text-primary") { textNode(t("lobby.choose_2_heroes", selectedHeroIds.size)) }
                p(className = "text-gray text-sm mt-0 mb-2") {
                    textNode(t("lobby.choose_heroes_desc"))
                }
                
                div(className = "hero-grid") {
                    for (hero in PredefinedCharacters) {
                        val isSelected = hero.templateId in selectedHeroIds
                        val selectionIndex = if (isSelected) selectedHeroIds.indexOf(hero.templateId) + 1 else null
                        
                        div(className = "hero-card ${if (isSelected) "selected" else ""}") {
                            if (selectionIndex != null) {
                                span(className = "hero-selection-badge") {
                                    textNode(t("lobby.hero_badge", selectionIndex))
                                }
                            }
                            
                            h3(className = "m-0 text-gold text-base") { textNode(hero.name) }
                            div(className = "hero-stats-row mt-1") {
                                span(className = "hero-stat-pill text-red") { textNode("WAR: ${hero.warlord}") }
                                span(className = "hero-stat-pill text-blue") { textNode("INT: ${hero.intellect}") }
                                span(className = "hero-stat-pill text-green") { textNode("VAN: ${hero.vanguard}") }
                                span(className = "hero-stat-pill text-purple") { textNode("ARC: ${hero.archon}") }
                            }
                            
                            val roleStr = when {
                                hero.isMage -> t("lobby.role_mage")
                                hero.isArcher -> t("lobby.role_archer")
                                hero.isSoldier -> t("lobby.role_soldier")
                                else -> t("lobby.role_hero")
                            }
                            p(className = "text-xs text-gray mt-1 mb-0") {
                                textNode(t("lobby.role", roleStr))
                            }
                            
                            onClick {
                                selectedHeroIds = if (isSelected) {
                                    selectedHeroIds - hero.templateId
                                } else {
                                    if (selectedHeroIds.size < 2) {
                                        selectedHeroIds + hero.templateId
                                    } else {
                                        listOf(selectedHeroIds[1], hero.templateId)
                                    }
                                }
                            }
                        }
                    }
                }
                
                div(className = "d-flex justify-center mt-2") {
                    val canConfirm = selectedHeroIds.size == 2
                    if (gameState.isPvE) {
                        button(
                            t("lobby.join_battle_count", selectedHeroIds.size),
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
                            t("lobby.confirm_selection_count", selectedHeroIds.size),
                            className = "btn btn-primary ${if (!canConfirm) "btn-disabled" else ""}"
                        ) {
                            onClick {
                                if (canConfirm) {
                                    ws.sendAction(GameAction.SelectCharacters(selectedHeroIds))
                                }
                            }
                        }
                    }

                }
            } else {
                h3(className = "mb-1 text-primary") { textNode(t("lobby.heroes_selected")) }
                
                div(className = "d-flex justify-center gap-1 mb-2") {
                    for (mc in myCharacters) {
                        div(className = "glass px-3 py-1 d-flex items-center gap-1") {
                            span(className = "font-600 text-gold") { textNode(mc.name) }
                            span(className = "text-xs text-gray") {
                                textNode("⚔️${mc.warlord} | 🧠${mc.intellect} | 🛡️${mc.vanguard} | 🔮${mc.archon}")
                            }
                        }
                    }
                }
                
                if (!myPlayer.isReady) {
                    val myTeamCastle = gameState.teamCastles[myPlayer.team]
                    if (myTeamCastle == null) {
                        val availableCastles = MapData.values.filter { it.isCastle }
                            .map { it.id to (it.name ?: "Castle ${it.id}") }
                            .filter { it.first !in gameState.teamCastles.values }
                        
                        if (availableCastles.size == 1) {
                            button(t("lobby.ready"), className = "btn btn-primary mb-2") {
                                onClick {
                                    ws.sendAction(GameAction.SelectCastleAndReady(availableCastles.first().first))
                                }
                            }
                        } else if (availableCastles.size > 1) {
                            var selectedCastle by remember { mutableStateOf(availableCastles.first().first) }
                            
                            div(className = "d-flex flex-col items-center gap-1 mb-2") {
                                p(className = "text-sm text-gray m-0") { textNode(t("lobby.choose_team_castle")) }
                                select(className = "stat-input w-full max-w-xs text-center") {
                                    for (c in availableCastles) {
                                        option(value = c.first, label = c.second)
                                    }
                                    onChange { selectedCastle = this.value ?: availableCastles.first().first }
                                }
                                button(t("lobby.select_ready"), className = "btn btn-primary mt-1") {
                                    onClick {
                                        ws.sendAction(GameAction.SelectCastleAndReady(selectedCastle))
                                    }
                                }
                            }
                        }
                    } else {
                        button(t("lobby.ready"), className = "btn btn-primary mb-2") {
                            onClick {
                                ws.sendAction(GameAction.ToggleReady)
                            }
                        }
                    }
                } else {
                    button(t("lobby.unready"), className = "btn bg-red-light text-red mb-2") {
                        onClick {
                            ws.sendAction(GameAction.ToggleReady)
                        }
                    }
                }
            }
        }
        
        if (gameState != null && gameState.status == GameStatus.LOBBY && gameState.creatorPlayerId == currentName) {
            div(className = "d-flex justify-center mt-2 mb-1") {
                button(t("lobby.cancel_game"), className = "btn btn-outline text-red") {
                    title(t("lobby.cancel_game_desc"))
                    onClick {
                        ws.sendAction(GameAction.CancelGame(currentName))
                    }
                }
            }
        }
        
        // Show split screen of teams
        div(className = "d-flex justify-between gap-20 mt-2") {
            // RED TEAM
            div(className = "glass flex-col items-center p-2 w-full") {
                val redTeamInfo = gameState.teamInfos[Team.RED]
                val redCastleId = gameState.teamCastles[Team.RED]
                val redCastleName = redCastleId?.let { MapData[it]?.name ?: "Castle $it" } ?: t("lobby.no_base")
                if (redTeamInfo != null) {
                    h3(className = "m-0 mb-1") { 
                        style("color", redTeamInfo.color)
                        textNode(redTeamInfo.name.uppercase()) 
                    }
                } else {
                    h3(className = "text-gray m-0 mb-1") { textNode(t("lobby.team_1_not_created")) }
                }
                
                p(className = "text-xs text-gray mt-0 mb-1") { textNode(t("lobby.base", redCastleName)) }
                val redPlayers = gameState.players.filter { it.team == Team.RED }
                for (p in redPlayers) {
                    val pChars = gameState.characters.filter { it.playerId == p.id }
                    val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""
                    val botIndicator = if (p.isBot) " 🤖" else ""
                    div(className = "d-flex justify-between items-center w-full mt-05") {
                        span { textNode("${p.name}$botIndicator$heroesStr") }
                        if (p.isReady) {
                            span(className = "text-sm text-primary font-600") { textNode(t("lobby.status_ready")) }
                        } else {
                            span(className = "text-sm text-gray") { textNode(t("lobby.status_not_ready")) }
                        }
                    }
                }
            }
            
            // BLUE TEAM
            div(className = "glass flex-col items-center p-2 w-full") {
                val blueTeamInfo = gameState.teamInfos[Team.BLUE]
                val blueCastleId = gameState.teamCastles[Team.BLUE]
                val blueCastleName = blueCastleId?.let { MapData[it]?.name ?: "Castle $it" } ?: t("lobby.no_base")
                if (blueTeamInfo != null) {
                    h3(className = "m-0 mb-1") { 
                        style("color", blueTeamInfo.color)
                        textNode(blueTeamInfo.name.uppercase()) 
                    }
                } else {
                    h3(className = "text-gray m-0 mb-1") { textNode(t("lobby.team_2_not_created")) }
                }
                
                p(className = "text-xs text-gray mt-0 mb-1") { textNode(t("lobby.base", blueCastleName)) }
                val bluePlayers = gameState.players.filter { it.team == Team.BLUE }
                for (p in bluePlayers) {
                    val pChars = gameState.characters.filter { it.playerId == p.id }
                    val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""
                    val botIndicator = if (p.isBot) " 🤖" else ""
                    div(className = "d-flex justify-between items-center w-full mt-05") {
                        span { textNode("${p.name}$botIndicator$heroesStr") }
                        if (p.isReady) {
                            span(className = "text-sm text-primary font-600") { textNode(t("lobby.status_ready")) }
                        } else {
                            span(className = "text-sm text-gray") { textNode(t("lobby.status_not_ready")) }
                        }
                    }
                }
            }
        }
        
        
            // YELLOW TEAM (PvE Enemy)
            if (gameState.isPvE) {
                div(className = "glass flex-col items-center p-2 w-full") {
                    val yellowTeamInfo = gameState.teamInfos[Team.YELLOW]
                    val yellowCastleId = gameState.teamCastles[Team.YELLOW]
                    val yellowCastleName = yellowCastleId?.let { MapData[it]?.name ?: "Castle $it" } ?: t("lobby.no_base")
                    if (yellowTeamInfo != null) {
                        h3(className = "m-0 mb-1") { 
                            style("color", yellowTeamInfo.color)
                            textNode(yellowTeamInfo.name.uppercase()) 
                        }
                    } else {
                        h3(className = "text-gray m-0 mb-1") { textNode(t("lobby.enemy_team")) }
                    }
                    
                    p(className = "text-xs text-gray mt-0 mb-1") { textNode(t("lobby.base", yellowCastleName)) }
                    val yellowPlayers = gameState.players.filter { it.team == Team.YELLOW }
                    for (p in yellowPlayers) {
                        val pChars = gameState.characters.filter { it.playerId == p.id }
                        val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""
                        val botIndicator = if (p.isBot) " 🤖" else ""
                        div(className = "d-flex justify-between items-center w-full mt-05") {
                            span { textNode("${p.name}$botIndicator$heroesStr") }
                            if (p.isReady) {
                                span(className = "text-sm text-primary font-600") { textNode(t("lobby.status_ready")) }
                            } else {
                                span(className = "text-sm text-gray") { textNode(t("lobby.status_not_ready")) }
                            }
                        }
                    }
                }
            }

        if (gameState.creatorPlayerId == currentName) {
            val allReady = gameState.players.isNotEmpty() && gameState.players.all { it.isReady }
            val hasTwoTeams = gameState.teamInfos.size == 2
            
            if (hasTwoTeams && allReady) {
                button(t("lobby.start_game"), className = "btn btn-primary mt-2 w-full") {
                    onClick {
                        ws.sendAction(GameAction.StartGame)
                    }
                }
            } else {
                p(className = "text-gray mt-2") { textNode(t("lobby.creator_waiting")) }
            }
        }
    }
}
