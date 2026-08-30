import re

with open('src/jsMain/kotlin/components/StrategicMap.kt', 'r') as f:
    content = f.read()

# 1. Update territory ownership color to handle Yellow
color_ui = """
                    val ownerTeam = terr.ownerTeam
                    val borderColor = when (ownerTeam) {
                        Team.RED -> "#ef4444"
                        Team.BLUE -> "#3b82f6"
                        Team.YELLOW -> "#eab308"
                        else -> "#808080"
                    }
                    val bgColor = when (ownerTeam) {
                        Team.RED -> "rgba(239, 68, 68, 0.3)"
                        Team.BLUE -> "rgba(59, 130, 246, 0.3)"
                        Team.YELLOW -> "rgba(234, 179, 8, 0.3)"
                        else -> "rgba(128, 128, 128, 0.3)"
                    }
"""
content = re.sub(
    r'val ownerTeam = terr\.ownerTeam\s*val borderColor = when \(ownerTeam\) \{\s*Team\.RED -> "#ef4444"\s*Team\.BLUE -> "#3b82f6"\s*else -> "#808080"\s*\}\s*val bgColor = when \(ownerTeam\) \{\s*Team\.RED -> "rgba\(239, 68, 68, 0\.3\)"\s*Team\.BLUE -> "rgba\(59, 130, 246, 0\.3\)"\s*else -> "rgba\(128, 128, 128, 0\.3\)"\s*\}',
    color_ui,
    content
)

# 2. Add 🤖 badge to map tokens
token_ui = """
                        val tokenColor = when (charPlayer?.team) {
                            Team.RED -> "#ef4444"
                            Team.BLUE -> "#3b82f6"
                            Team.YELLOW -> "#eab308"
                            else -> "white"
                        }
                        
                        val botIndicator = if (charPlayer?.isBot == true) " 🤖" else ""
                        
                        div(className = "character-token ${if (isSelected) "selected" else ""}") {
                            style("background-color", tokenColor)
                            onClick {
                                it.stopPropagation()
                                onSectorClick(sectorId) // Select sector when clicking character
                                onCharacterSelect(char.id) // Select the character
                            }
                            
                            // Tooltip for character
                            div(className = "character-tooltip") {
                                strong { textNode("${char.name}$botIndicator") }
"""
content = re.sub(
    r'val tokenColor = when \(charPlayer\?\.team\) \{\s*Team\.RED -> "#ef4444"\s*Team\.BLUE -> "#3b82f6"\s*else -> "white"\s*\}\s*div\(className = "character-token \$\{if \(isSelected\) "selected" else ""\}"\) \{\s*style\("background-color", tokenColor\)\s*onClick \{\s*it\.stopPropagation\(\)\s*onSectorClick\(sectorId\)\s*onCharacterSelect\(char\.id\)\s*\}\s*// Tooltip for character\s*div\(className = "character-tooltip"\) \{\s*strong \{ textNode\(char\.name\) \}',
    token_ui,
    content
)

with open('src/jsMain/kotlin/components/StrategicMap.kt', 'w') as f:
    f.write(content)

print("StrategicMap.kt updated")
