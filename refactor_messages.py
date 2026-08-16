import re

with open("src/commonMain/kotlin/models/GameMessages.kt", "r") as f:
    content = f.read()

old_cc = "data class CreateCharacter(val name: String, val strength: Int, val agility: Int, val wisdom: Int) : GameAction()"
new_cc = "data class CreateCharacter(val name: String, val warlord: Int, val intellect: Int, val vanguard: Int, val archon: Int) : GameAction()"
content = content.replace(old_cc, new_cc)

with open("src/commonMain/kotlin/models/GameMessages.kt", "w") as f:
    f.write(content)

with open("src/jvmMain/kotlin/game/GameSocketRoute.kt", "r") as f:
    content = f.read()

old_sr = "is GameAction.CreateCharacter -> game.createCharacter(playerId, action.name, action.strength, action.agility, action.wisdom)"
new_sr = "is GameAction.CreateCharacter -> game.createCharacter(playerId, action.name, action.warlord, action.intellect, action.vanguard, action.archon)"
content = content.replace(old_sr, new_sr)

with open("src/jvmMain/kotlin/game/GameSocketRoute.kt", "w") as f:
    f.write(content)

print("GameMessages and GameSocketRoute updated")
