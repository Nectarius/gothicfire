package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.form.text.text
import dev.kilua.form.select.*
import dev.kilua.html.*
import game.GameWebSocket
import models.GameAction
import models.GameState
import models.PredefinedCharacters
import models.Team

@Composable
fun IComponent.GameLobby(
    ws: GameWebSocket,
    gameState: GameState?,
    yourPlayerId: String
) {
    var playerName by remember { mutableStateOf("") }
    var selectedHeroIds by remember { mutableStateOf(listOf<String>()) }

    val myPlayer = gameState?.players?.find { it.id == yourPlayerId }
    val myCharacters = gameState?.characters?.filter { it.playerId == yourPlayerId } ?: emptyList()
    
    div(className = "lobby-container glass p-4 text-center w-full") {
        h1(className = "m-0 mb-2") { textNode("Gothic Fire Team Battle") }
        
        if (myPlayer == null) {
            // Not joined yet
            p(className = "text-gray mb-2") { textNode("Enter your name and pick a team.") }
            div(className = "d-flex justify-center items-center gap-1 mb-2") {
                text(value = playerName, placeholder = "Your Name", className = "w-full max-w-sm text-center") {
                    onInput { playerName = this.value ?: "" }
                }
            }
            
            div(className = "d-flex justify-center gap-20") {
                val redCount = gameState?.players?.count { it.team == Team.RED } ?: 0
                val blueCount = gameState?.players?.count { it.team == Team.BLUE } ?: 0
                
                button("Join RED Team ($redCount/5)", className = "btn btn-primary ${if(redCount >= 5) "opacity-50 pointer-events-none" else ""}") {
                    onClick {
                        if (playerName.isNotBlank() && redCount < 5) {
                            ws.connect {
                                ws.sendAction(GameAction.JoinTeam(Team.RED, playerName))
                            }
                        }
                    }
                }
                
                button("Join BLUE Team ($blueCount/5)", className = "btn btn-primary ${if(blueCount >= 5) "opacity-50 pointer-events-none" else ""}") {
                    onClick {
                        if (playerName.isNotBlank() && blueCount < 5) {
                            ws.connect {
                                ws.sendAction(GameAction.JoinTeam(Team.BLUE, playerName))
                            }
                        }
                    }
                }
            }
        } else {
            // Joined a team
            if (myCharacters.size < 2) {
                h2(className = "mb-05 text-primary") { textNode("Choose Your 2 Heroes (${selectedHeroIds.size}/2)") }
                p(className = "text-gray text-sm mt-0 mb-2") {
                    textNode("Select 2 iconic heroes from the Colony to lead into battle.")
                }
                
                div(className = "hero-grid") {
                    for (hero in PredefinedCharacters) {
                        val isSelected = hero.templateId in selectedHeroIds
                        val selectionIndex = if (isSelected) selectedHeroIds.indexOf(hero.templateId) + 1 else null
                        
                        div(className = "hero-card ${if (isSelected) "selected" else ""}") {
                            if (selectionIndex != null) {
                                span(className = "hero-selection-badge") {
                                    textNode("HERO #$selectionIndex")
                                }
                            }
                            
                            h3(className = "m-0 text-gold text-base") { textNode(hero.name) }
                            span(className = "text-xs text-gray mb-1") { textNode(hero.title) }
                            
                            div(className = "hero-stats-row") {
                                span(className = "hero-stat-pill text-red") { textNode("STR: ${hero.strength}") }
                                span(className = "hero-stat-pill text-blue") { textNode("AGI: ${hero.agility}") }
                                span(className = "hero-stat-pill text-purple") { textNode("WIS: ${hero.wisdom}") }
                            }
                            
                            p(className = "text-xs text-gray mt-1 mb-0") {
                                textNode(hero.description)
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
            } else {
                h3(className = "mb-1 text-primary") { textNode("Heroes Selected!") }
                
                div(className = "d-flex justify-center gap-1 mb-2") {
                    for (mc in myCharacters) {
                        div(className = "glass px-3 py-1 d-flex items-center gap-1") {
                            span(className = "font-600 text-gold") { textNode(mc.name) }
                            span(className = "text-xs text-gray") {
                                textNode("⚔️ ${mc.strength} | 🏹 ${mc.agility} | 🔮 ${mc.wisdom}")
                            }
                        }
                    }
                }
                
                if (!myPlayer.isReady) {
                    val myTeamCastle = gameState.teamCastles[myPlayer.team]
                    if (myTeamCastle == null) {
                        val availableCastles = listOf("13" to "Castles Blackhood", "20" to "Castles Blackwood")
                            .filter { it.first !in gameState.teamCastles.values }
                        
                        if (availableCastles.size == 1) {
                            button("Ready", className = "btn btn-primary mb-2") {
                                onClick {
                                    ws.sendAction(GameAction.SelectCastleAndReady(availableCastles.first().first))
                                }
                            }
                        } else if (availableCastles.size > 1) {
                            var selectedCastle by remember { mutableStateOf(availableCastles.first().first) }
                            
                            div(className = "d-flex flex-col items-center gap-1 mb-2") {
                                p(className = "text-sm text-gray m-0") { textNode("Choose your Team's Castle:") }
                                select(className = "stat-input w-full max-w-xs text-center") {
                                    for (c in availableCastles) {
                                        option(value = c.first, label = c.second)
                                    }
                                    onChange { selectedCastle = this.value ?: availableCastles.first().first }
                                }
                                button("Select & Ready", className = "btn btn-primary mt-1") {
                                    onClick {
                                        ws.sendAction(GameAction.SelectCastleAndReady(selectedCastle))
                                    }
                                }
                            }
                        }
                    } else {
                        button("Ready", className = "btn btn-primary mb-2") {
                            onClick {
                                ws.sendAction(GameAction.ToggleReady)
                            }
                        }
                    }
                } else {
                    button("Unready", className = "btn bg-red-light text-red mb-2") {
                        onClick {
                            ws.sendAction(GameAction.ToggleReady)
                        }
                    }
                }
            }
        }
        
        // Show split screen of teams
        div(className = "d-flex justify-between gap-20 mt-2") {
            // RED TEAM
            div(className = "glass flex-col items-center p-2 w-full") {
                val redCastleId = gameState?.teamCastles?.get(Team.RED)
                val redCastleName = if (redCastleId == "13") "Castles Blackhood" else if (redCastleId == "20") "Castles Blackwood" else "No base chosen"
                h3(className = "text-red m-0 mb-1") { textNode("RED TEAM") }
                p(className = "text-xs text-gray mt-0 mb-1") { textNode("Base: $redCastleName") }
                val redPlayers = gameState?.players?.filter { it.team == Team.RED } ?: emptyList()
                for (p in redPlayers) {
                    val pChars = gameState?.characters?.filter { it.playerId == p.id } ?: emptyList()
                    val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""
                    div(className = "d-flex justify-between items-center w-full mt-05") {
                        span { textNode("${p.name}$heroesStr") }
                        if (p.isReady) {
                            span(className = "text-sm text-primary font-600") { textNode("READY") }
                        } else {
                            span(className = "text-sm text-gray") { textNode("NOT READY") }
                        }
                    }
                }
            }
            
            // BLUE TEAM
            div(className = "glass flex-col items-center p-2 w-full") {
                val blueCastleId = gameState?.teamCastles?.get(Team.BLUE)
                val blueCastleName = if (blueCastleId == "13") "Castles Blackhood" else if (blueCastleId == "20") "Castles Blackwood" else "No base chosen"
                h3(className = "text-blue m-0 mb-1") { textNode("BLUE TEAM") }
                p(className = "text-xs text-gray mt-0 mb-1") { textNode("Base: $blueCastleName") }
                val bluePlayers = gameState?.players?.filter { it.team == Team.BLUE } ?: emptyList()
                for (p in bluePlayers) {
                    val pChars = gameState?.characters?.filter { it.playerId == p.id } ?: emptyList()
                    val heroesStr = if (pChars.isNotEmpty()) " (${pChars.joinToString(", ") { it.name }})" else ""
                    div(className = "d-flex justify-between items-center w-full mt-05") {
                        span { textNode("${p.name}$heroesStr") }
                        if (p.isReady) {
                            span(className = "text-sm text-primary font-600") { textNode("READY") }
                        } else {
                            span(className = "text-sm text-gray") { textNode("NOT READY") }
                        }
                    }
                }
            }
        }
        
        if (myPlayer != null && myPlayer.isReady && gameState != null) {
            val allReady = gameState.players.isNotEmpty() && gameState.players.all { it.isReady }
            val hasRed = gameState.players.any { it.team == Team.RED }
            val hasBlue = gameState.players.any { it.team == Team.BLUE }
            
            if (allReady && hasRed && hasBlue) {
                button("Start Game", className = "btn btn-primary mt-2 w-full") {
                    onClick {
                        ws.sendAction(GameAction.StartGame)
                    }
                }
            } else {
                p(className = "text-gray mt-2") { textNode("Waiting for all players to be ready and both teams to have members...") }
            }
        }
    }
}

