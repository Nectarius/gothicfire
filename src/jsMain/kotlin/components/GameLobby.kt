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
import models.Team

@Composable
fun IComponent.GameLobby(
    ws: GameWebSocket,
    gameState: GameState?,
    yourPlayerId: String
) {
    var playerName by remember { mutableStateOf("") }
    
    // Character creation state
    var charName by remember { mutableStateOf("") }
    var strength by remember { mutableStateOf(5) }
    var agility by remember { mutableStateOf(5) }
    var wisdom by remember { mutableStateOf(5) }

    val myPlayer = gameState?.players?.find { it.id == yourPlayerId }
    val myCharacter = gameState?.characters?.find { it.playerId == yourPlayerId }
    
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
            if (myCharacter == null) {
                h3(className = "mb-1 text-primary") { textNode("Create Your Character") }
                div(className = "d-flex flex-col items-center gap-1 mb-2 max-w-sm mx-auto") {
                    text(value = charName, placeholder = "Character Name", className = "w-full") {
                        onInput { charName = this.value ?: "" }
                    }
                    div(className = "d-flex justify-between w-full") {
                        span { textNode("Strength") }
                        text(value = strength.toString(), className = "stat-input") {
                            onInput { strength = this.value?.toIntOrNull() ?: 5 }
                        }
                    }
                    div(className = "d-flex justify-between w-full") {
                        span { textNode("Agility") }
                        text(value = agility.toString(), className = "stat-input") {
                            onInput { agility = this.value?.toIntOrNull() ?: 5 }
                        }
                    }
                    div(className = "d-flex justify-between w-full") {
                        span { textNode("Wisdom") }
                        text(value = wisdom.toString(), className = "stat-input") {
                            onInput { wisdom = this.value?.toIntOrNull() ?: 5 }
                        }
                    }
                    button("Confirm Character", className = "btn btn-primary mt-1") {
                        onClick {
                            if (charName.isNotBlank()) {
                                ws.sendAction(GameAction.CreateCharacter(charName, strength, agility, wisdom))
                            }
                        }
                    }
                }
            } else {
                h3(className = "mb-1 text-primary") { textNode("Ready up!") }
                
                if (!myPlayer.isReady) {
                    val myTeamCastle = gameState?.teamCastles?.get(myPlayer.team)
                    if (myTeamCastle == null) {
                        val availableCastles = listOf("13" to "Castles Blackhood", "20" to "Castles Blackwood")
                            .filter { it.first !in (gameState?.teamCastles?.values ?: emptyList()) }
                        
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
                    val pChar = gameState?.characters?.find { it.playerId == p.id }
                    div(className = "d-flex justify-between items-center w-full mt-05") {
                        span { textNode(p.name + if (pChar != null) " (${pChar.name})" else "") }
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
                    val pChar = gameState?.characters?.find { it.playerId == p.id }
                    div(className = "d-flex justify-between items-center w-full mt-05") {
                        span { textNode(p.name + if (pChar != null) " (${pChar.name})" else "") }
                        if (p.isReady) {
                            span(className = "text-sm text-primary font-600") { textNode("READY") }
                        } else {
                            span(className = "text-sm text-gray") { textNode("NOT READY") }
                        }
                    }
                }
            }
        }
        
        if (myPlayer != null && myPlayer.isReady) {
            val allReady = gameState?.players?.isNotEmpty() == true && gameState.players.all { it.isReady }
            val hasRed = gameState?.players?.any { it.team == Team.RED } == true
            val hasBlue = gameState?.players?.any { it.team == Team.BLUE } == true
            
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
