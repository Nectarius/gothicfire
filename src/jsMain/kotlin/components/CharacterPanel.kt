package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.GameState
import models.GameAction

@Composable
fun IComponent.CharacterPanel(
    playerId: String,
    gameState: GameState?,
    sendAction: (GameAction) -> Unit
) {
    val myPlayer = gameState?.players?.find { it.id == playerId }
    val myCharacter = gameState?.characters?.find { it.playerId == playerId }
    
    val isMyTurn = gameState?.activeTeamTurn == myPlayer?.team
    
    div(className = "character-panel glass flex-col gap-1") {
        h3(className = "m-0") { textNode("Your Character") }
        
        if (myCharacter != null) {
            val isUnplaced = myCharacter.currentSector == null
            val hasActed = myCharacter.hasActedThisTurn
            
            val cardClasses = mutableListOf("char-card", "glass")
            if (hasActed || myCharacter.isDead) cardClasses.add("char-card-acted")
            if (isUnplaced && isMyTurn && !hasActed && !myCharacter.isDead) cardClasses.add("char-card-clickable")
            
            div(className = cardClasses.joinToString(" ")) {
                div(className = "d-flex justify-between items-center") {
                    span(className = "font-600 ${if (myCharacter.isDead) "text-red" else "text-primary"}") { 
                        textNode(myCharacter.name)
                        if (myCharacter.isDead) textNode(" 💀")
                    }
                    span(className = "text-sm ${if (hasActed || myCharacter.isDead) "text-red" else "text-dark-gray"}") { 
                        textNode(
                            when {
                                myCharacter.isDead -> "Defeated"
                                hasActed && isUnplaced -> "Acted"
                                myCharacter.currentSector != null -> "At Sector ${myCharacter.currentSector}"
                                else -> "Unplaced (Click map to place)"
                            }
                        )
                    }
                }
                div(className = "d-flex gap-1 text-sm mt-05 text-gray") {
                    span { textNode("STR: ${myCharacter.strength}") }
                    span { textNode("AGI: ${myCharacter.agility}") }
                    span { textNode("WIS: ${myCharacter.wisdom}") }
                }
            }
        } else {
            p(className = "text-sm text-dark-gray") { textNode("You haven't created a character.") }
        }
    }
}
