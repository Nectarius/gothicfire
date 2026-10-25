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
    var pveSelectedAdvisor by remember { mutableStateOf("ZORAX") }
    var pveRoleFilter by remember { mutableStateOf("ALL") }
    var mpRoleFilter by remember { mutableStateOf("ALL") }

    
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
                        for (team in Team.PLAYABLE_TEAMS) {
                            option(value = team.name, label = t(team.i18nKey), selected = team == pveTeam)
                        }
                        onChange { 
                            val chosen = try { Team.valueOf(this.value ?: "RED") } catch (e: Exception) { Team.RED }
                            pveTeam = chosen
                            pveTeamColor = chosen.defaultHex
                            pveColorError = false
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
                    
                    div(className = "d-flex gap-1 mb-1 justify-center flex-wrap") {
                        val filterOptions = listOf(
                            "ALL" to "All (${PredefinedCharacters.size})",
                            "MAGE" to "Mages (${PredefinedCharacters.count { it.isMage }})",
                            "ARCHER" to "Archers (${PredefinedCharacters.count { it.isArcher }})",
                            "SOLDIER" to "Soldiers (${PredefinedCharacters.count { it.isSoldier }})"
                        )
                        for ((key, labelText) in filterOptions) {
                            val isActive = pveRoleFilter == key
                            button(
                                labelText,
                                className = "btn ${if (isActive) "btn-primary" else "bg-dark-gray text-gray"}"
                            ) {
                                style("padding", "0.35rem 0.8rem")
                                style("font-size", "0.85rem")
                                style("border-radius", "8px")
                                onClick { pveRoleFilter = key }
                            }
                        }
                    }

                    val pveFilteredHeroes = PredefinedCharacters.filter { hero ->
                        when (pveRoleFilter) {
                            "MAGE" -> hero.isMage
                            "ARCHER" -> hero.isArcher
                            "SOLDIER" -> hero.isSoldier
                            else -> true
                        }
                    }

                    div(className = "hero-grid") {
                        for (hero in pveFilteredHeroes) {
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
                            option(value = c.id, label = c.name ?: "Castle ${c.id}", selected = c.id == pveSelectedCastle)
                        }
                        onChange { pveSelectedCastle = this.value ?: "14" }
                    }
                }

                div(className = "mb-2") {
                    p(className = "m-0 mb-05 font-600") { textNode("Choose Your Tactical Advisor") }
                    div(className = "d-flex gap-1 flex-wrap") {
                        for (adv in models.PredefinedAdvisors) {
                            val isSelected = pveSelectedAdvisor == adv.id
                            div(className = "glass p-2 d-flex items-center gap-1 cursor-pointer") {
                                style("flex", "1 1 240px")
                                style("border", if (isSelected) "2px solid ${adv.accentColor}" else "1px solid rgba(255,255,255,0.15)")
                                style("box-shadow", if (isSelected) "0 0 14px ${adv.accentColor}66" else "none")
                                style("border-radius", "12px")
                                style("background", if (isSelected) "rgba(255,255,255,0.08)" else "rgba(0,0,0,0.2)")
                                style("transition", "all 0.2s ease")

                                img(src = adv.iconUrl, alt = adv.name) {
                                    style("width", "56px")
                                    style("height", "56px")
                                    style("border-radius", "10px")
                                    style("object-fit", "cover")
                                    style("border", "1px solid ${adv.accentColor}")
                                }
                                div {
                                    div(className = "font-600") {
                                        style("color", adv.accentColor)
                                        textNode(adv.name)
                                    }
                                    div(className = "text-sm text-gray") {
                                        textNode(adv.title)
                                    }
                                }
                                onClick { pveSelectedAdvisor = adv.id }
                            }
                        }
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
                                val colorName = predefinedColors.find { it.first.uppercase() == pveTeamColor.uppercase() }?.second ?: t(pveTeam.i18nKey)
                                ws.sendAction(
                                    GameAction.StartPvEGame(
                                        playerName = effectivePlayerName,
                                        gameName = effectiveGameName,
                                        allowSecondPlayer = pveAllowSecond,
                                        playerTeam = pveTeam,
                                        playerTeamColor = pveTeamColor,
                                        playerTeamName = colorName,
                                        chosenHeroes = pveSelectedHeroes,
                                        chosenCastle = pveSelectedCastle,
                                        chosenAdvisor = pveSelectedAdvisor
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
                val existingTeams = gameState.teamInfos.values.toList()
                val team1Info = existingTeams.getOrNull(0)
                val team2Info = existingTeams.getOrNull(1)

                // TEAM 1 logic
                div(className = "glass p-2 w-full") {
                    if (team1Info == null) {
                        var chosenTeam1 by remember { mutableStateOf(Team.RED) }
                        var teamName by remember { mutableStateOf("") }
                        var teamColor by remember(chosenTeam1) { mutableStateOf(chosenTeam1.defaultHex) }
                        var colorError by remember { mutableStateOf(false) }
                        
                        h3(className = "m-0 mb-1") { 
                            style("color", teamColor)
                            textNode(t("lobby.create_team_1")) 
                        }

                        div(className = "mb-1 text-center") {
                            label(className = "text-xs text-gray mb-05 d-block") { textNode(t("lobby.choose_team")) }
                            select(className = "w-full max-w-xs mb-1") {
                                for (team in Team.PLAYABLE_TEAMS) {
                                    option(value = team.name, label = t(team.i18nKey), selected = team == chosenTeam1)
                                }
                                onChange {
                                    val chosen = try { Team.valueOf(this.value ?: "RED") } catch (e: Exception) { Team.RED }
                                    chosenTeam1 = chosen
                                    teamColor = chosen.defaultHex
                                    colorError = false
                                }
                            }
                        }
                        
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
                                    val newColor = this.value ?: chosenTeam1.defaultHex
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
                                val effectiveTeamName = teamName.trim().ifBlank { t(chosenTeam1.i18nKey) }
                                if (playerName.isNotBlank() && !colorError) {
                                    ws.connect {
                                        ws.sendAction(GameAction.CreateTeam(chosenTeam1, effectiveTeamName, teamColor, playerName))
                                    }
                                }
                            }
                        }
                    } else {
                        h3(className = "m-0 mb-1") { 
                            style("color", team1Info.color)
                            textNode(team1Info.name) 
                        }
                        val team1Count = gameState.players.count { it.team == team1Info.id }
                        button(t("lobby.join_team", team1Info.name, team1Count), className = "btn btn-primary w-full ${if(team1Count >= 5) "opacity-50 pointer-events-none" else ""}") {
                            onClick {
                                if (playerName.isNotBlank() && team1Count < 5) {
                                    ws.connect {
                                        ws.sendAction(GameAction.JoinTeam(team1Info.id, playerName))
                                    }
                                }
                            }
                        }
                    }
                }
                
                // TEAM 2 logic
                div(className = "glass p-2 w-full") {
                    if (team2Info == null) {
                        val availableTeamsForSlot2 = Team.PLAYABLE_TEAMS.filter { it != team1Info?.id }
                        val defaultSlot2Team = if (team1Info?.id == Team.BLUE) Team.RED else Team.BLUE
                        var chosenTeam2 by remember(team1Info?.id) { mutableStateOf(defaultSlot2Team) }
                        var teamName by remember { mutableStateOf("") }
                        var teamColor by remember(chosenTeam2) { mutableStateOf(chosenTeam2.defaultHex) }
                        var colorError by remember { mutableStateOf(false) }
                        
                        h3(className = "m-0 mb-1") { 
                            style("color", teamColor)
                            textNode(t("lobby.create_team_2")) 
                        }

                        div(className = "mb-1 text-center") {
                            label(className = "text-xs text-gray mb-05 d-block") { textNode(t("lobby.choose_team")) }
                            select(className = "w-full max-w-xs mb-1") {
                                for (team in availableTeamsForSlot2) {
                                    option(value = team.name, label = t(team.i18nKey), selected = team == chosenTeam2)
                                }
                                onChange {
                                    val chosen = try { Team.valueOf(this.value ?: "BLUE") } catch (e: Exception) { Team.BLUE }
                                    chosenTeam2 = chosen
                                    teamColor = chosen.defaultHex
                                    colorError = false
                                }
                            }
                        }
                        
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
                                    val newColor = this.value ?: chosenTeam2.defaultHex
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
                                val effectiveTeamName = teamName.trim().ifBlank { t(chosenTeam2.i18nKey) }
                                if (playerName.isNotBlank() && !colorError) {
                                    ws.connect {
                                        ws.sendAction(GameAction.CreateTeam(chosenTeam2, effectiveTeamName, teamColor, playerName))
                                    }
                                }
                            }
                        }
                    } else {
                        h3(className = "m-0 mb-1") { 
                            style("color", team2Info.color)
                            textNode(team2Info.name) 
                        }
                        val team2Count = gameState.players.count { it.team == team2Info.id }
                        button(t("lobby.join_team", team2Info.name, team2Count), className = "btn btn-primary w-full ${if(team2Count >= 5) "opacity-50 pointer-events-none" else ""}") {
                            onClick {
                                if (playerName.isNotBlank() && team2Count < 5) {
                                    ws.connect {
                                        ws.sendAction(GameAction.JoinTeam(team2Info.id, playerName))
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

                div(className = "d-flex gap-1 mb-1 justify-center flex-wrap") {
                    val filterOptions = listOf(
                        "ALL" to "All (${PredefinedCharacters.size})",
                        "MAGE" to "Mages (${PredefinedCharacters.count { it.isMage }})",
                        "ARCHER" to "Archers (${PredefinedCharacters.count { it.isArcher }})",
                        "SOLDIER" to "Soldiers (${PredefinedCharacters.count { it.isSoldier }})"
                    )
                    for ((key, labelText) in filterOptions) {
                        val isActive = mpRoleFilter == key
                        button(
                            labelText,
                            className = "btn ${if (isActive) "btn-primary" else "bg-dark-gray text-gray"}"
                        ) {
                            style("padding", "0.35rem 0.8rem")
                            style("font-size", "0.85rem")
                            style("border-radius", "8px")
                            onClick { mpRoleFilter = key }
                        }
                    }
                }

                val mpFilteredHeroes = PredefinedCharacters.filter { hero ->
                    when (mpRoleFilter) {
                        "MAGE" -> hero.isMage
                        "ARCHER" -> hero.isArcher
                        "SOLDIER" -> hero.isSoldier
                        else -> true
                    }
                }
                
                div(className = "hero-grid") {
                    for (hero in mpFilteredHeroes) {
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
                            val otherCastle = gameState.teamCastles.entries.find { it.key != myPlayer.team }?.value
                            val defaultChoice = if (otherCastle == "14") "23" else "14"
                            var selectedCastle by remember { mutableStateOf(if (availableCastles.any { it.first == defaultChoice }) defaultChoice else availableCastles.first().first) }
                            
                            div(className = "d-flex flex-col items-center gap-1 mb-2") {
                                p(className = "text-sm text-gray m-0") { textNode(t("lobby.choose_team_castle")) }
                                select(className = "stat-input w-full max-w-xs text-center") {
                                    for (c in availableCastles) {
                                        option(value = c.first, label = c.second, selected = c.first == selectedCastle)
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
        
        if (gameState.status == GameStatus.LOBBY && gameState.creatorPlayerId == currentName) {
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
            if (gameState.isPvE) {
                // Human team
                val humanTeamInfo = gameState.teamInfos.values.find { it.id != Team.YELLOW }
                val humanCastleId = humanTeamInfo?.let { gameState.teamCastles[it.id] }
                val humanCastleName = humanCastleId?.let { MapData[it]?.name ?: "Castle $it" } ?: t("lobby.no_base")
                div(className = "glass flex-col items-center p-2 w-full") {
                    if (humanTeamInfo != null) {
                        h3(className = "m-0 mb-1") { 
                            style("color", humanTeamInfo.color)
                            textNode(humanTeamInfo.name.uppercase()) 
                        }
                    } else {
                        h3(className = "text-gray m-0 mb-1") { textNode(t("lobby.team_1_not_created")) }
                    }
                    p(className = "text-xs text-gray mt-0 mb-1") { textNode(t("lobby.base", humanCastleName)) }
                    val humanPlayers = gameState.players.filter { it.team == (humanTeamInfo?.id ?: Team.RED) }
                    for (p in humanPlayers) {
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
                
                // Bot team
                val yellowTeamInfo = gameState.teamInfos[Team.YELLOW]
                val yellowCastleId = gameState.teamCastles[Team.YELLOW]
                val yellowCastleName = yellowCastleId?.let { MapData[it]?.name ?: "Castle $it" } ?: t("lobby.no_base")
                div(className = "glass flex-col items-center p-2 w-full") {
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
            } else {
                val nonBotTeams = gameState.teamInfos.values.toList()
                val t1 = nonBotTeams.getOrNull(0)
                val t2 = nonBotTeams.getOrNull(1)

                // TEAM 1 Slot
                div(className = "glass flex-col items-center p-2 w-full") {
                    val t1CastleId = t1?.let { gameState.teamCastles[it.id] }
                    val t1CastleName = t1CastleId?.let { MapData[it]?.name ?: "Castle $it" } ?: t("lobby.no_base")
                    if (t1 != null) {
                        h3(className = "m-0 mb-1") { 
                            style("color", t1.color)
                            textNode(t1.name.uppercase()) 
                        }
                    } else {
                        h3(className = "text-gray m-0 mb-1") { textNode(t("lobby.team_1_not_created")) }
                    }
                    
                    p(className = "text-xs text-gray mt-0 mb-1") { textNode(t("lobby.base", t1CastleName)) }
                    val t1Players = if (t1 != null) gameState.players.filter { it.team == t1.id } else emptyList()
                    for (p in t1Players) {
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
                
                // TEAM 2 Slot
                div(className = "glass flex-col items-center p-2 w-full") {
                    val t2CastleId = t2?.let { gameState.teamCastles[it.id] }
                    val t2CastleName = t2CastleId?.let { MapData[it]?.name ?: "Castle $it" } ?: t("lobby.no_base")
                    if (t2 != null) {
                        h3(className = "m-0 mb-1") { 
                            style("color", t2.color)
                            textNode(t2.name.uppercase()) 
                        }
                    } else {
                        h3(className = "text-gray m-0 mb-1") { textNode(t("lobby.team_2_not_created")) }
                    }
                    
                    p(className = "text-xs text-gray mt-0 mb-1") { textNode(t("lobby.base", t2CastleName)) }
                    val t2Players = if (t2 != null) gameState.players.filter { it.team == t2.id } else emptyList()
                    for (p in t2Players) {
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
