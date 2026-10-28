package components

import androidx.compose.runtime.*
import dev.kilua.core.IComponent
import dev.kilua.html.*
import i18n.t
import models.*

@Composable
fun IComponent.TacticalBattleModal(
    battleState: TacticalBattleState,
    yourPlayerId: String,
    sendAction: (GameAction) -> Unit,
    onClose: (() -> Unit)? = null
) {
    var selectedUnitId by remember { mutableStateOf<String?>(null) }

    // Resolve player identity robustly (handles blank player ID or session mismatch)
    val resolvedPlayerId = when {
        yourPlayerId.isNotBlank() && (yourPlayerId == battleState.attackerPlayerId || yourPlayerId == battleState.defenderPlayerId) -> yourPlayerId
        battleState.attackerPlayerId.startsWith("bot_") && !battleState.defenderPlayerId.startsWith("bot_") -> battleState.defenderPlayerId
        battleState.defenderPlayerId.startsWith("bot_") && !battleState.attackerPlayerId.startsWith("bot_") -> battleState.attackerPlayerId
        yourPlayerId.isNotBlank() -> yourPlayerId
        else -> battleState.attackerPlayerId
    }

    val myUnits = battleState.units.filter { it.isAlive && it.ownerPlayerId == resolvedPlayerId }
    val enemyUnits = battleState.units.filter { it.isAlive && it.ownerPlayerId != resolvedPlayerId }
    val isMyTurn = (battleState.activeUnitOwnerId == resolvedPlayerId && !battleState.isFinished)

    // Auto-select active unit or first alive ally unit with moves remaining if none is explicitly selected
    val effectiveSelectedUnitId = selectedUnitId?.takeIf { id -> myUnits.any { it.id == id } }
        ?: if (isMyTurn) (myUnits.firstOrNull { it.movesRemaining > 0 }?.id ?: myUnits.firstOrNull()?.id) else null

    // Ensure selected unit is valid and alive
    val selectedUnit = battleState.units.find { it.id == effectiveSelectedUnitId && it.isAlive }

    val validMoves: Set<Pair<Int, Int>> = if (selectedUnit != null && isMyTurn && selectedUnit.ownerPlayerId == resolvedPlayerId) {
        TacticalRules.findValidMoves(selectedUnit, battleState)
    } else emptySet()

    val validAttackTargets: List<TacticalUnit> = if (selectedUnit != null && isMyTurn && selectedUnit.ownerPlayerId == resolvedPlayerId) {
        battleState.units.filter { TacticalRules.canAttackTarget(selectedUnit, it, battleState) }
    } else emptyList()

    val attackTargetPositions: Set<Pair<Int, Int>> = validAttackTargets.map { it.x to it.y }.toSet()

    val biome = TacticalMapGenerator.detectBiome(battleState.sectorId)
    val sectorName = MapData[battleState.sectorId]?.name ?: "Sector ${battleState.sectorId}"
    val locationInfo = LocationInfoCatalog[battleState.sectorId]

    div(className = "tactical-modal-backdrop") {
        div(className = "tactical-modal-card glass") {
            if (battleState.isFinished) {
                val isWinner = battleState.winnerPlayerId == resolvedPlayerId
                val myHero = battleState.units.find { it.ownerPlayerId == resolvedPlayerId && it.unitType.isHero }
                val enemyHero = battleState.units.find { it.ownerPlayerId != resolvedPlayerId && it.unitType.isHero }
                val isMyHeroDead = myHero != null && !myHero.isAlive
                val isEnemyHeroDead = enemyHero != null && !enemyHero.isAlive

                val myLivingUnits = battleState.units.filter { it.ownerPlayerId == resolvedPlayerId && it.isAlive }
                val enemyLivingUnits = battleState.units.filter { it.ownerPlayerId != resolvedPlayerId && it.isAlive }

                div(className = "tactical-results-overlay") {
                    div(className = "tactical-results-card ${if (isWinner) "result-victory" else "result-defeat"}") {
                        div(className = "tactical-results-icon") {
                            textNode(if (isWinner) "🏆" else "💀")
                        }
                        h2(className = "tactical-results-title") {
                            textNode(if (isWinner) "VICTORY ACHIEVED" else "DEFEAT IN TACTICAL COMBAT")
                        }
                        p(className = "tactical-results-subtitle") {
                            textNode(
                                when {
                                    isWinner && isEnemyHeroDead -> "Enemy Commander was slain in battle! The enemy ranks have broken!"
                                    isWinner -> "All enemy forces were eliminated in $sectorName!"
                                    isMyHeroDead -> "Your commander ${myHero?.name ?: ""} fell in combat! Your forces were routed!"
                                    else -> "All friendly forces were eliminated in $sectorName!"
                                }
                            )
                        }

                        div(className = "tactical-results-breakdown") {
                            div(className = "tactical-casualty-box flex-1") {
                                div(className = "font-600 text-sm mb-05 ${if (isWinner) "text-primary" else "text-red"}") {
                                    textNode("Your Forces")
                                }
                                div(className = "text-xs text-gray") {
                                    textNode("Commander: ${if (myHero?.isAlive == true) "Alive (${myHero.currentHp}/${myHero.maxHp} HP)" else "Slain 💀"}")
                                }
                                div(className = "text-xs text-gray mt-02") {
                                    textNode("Surviving Units: ${myLivingUnits.size}")
                                }
                            }
                            div(className = "tactical-casualty-box flex-1") {
                                div(className = "font-600 text-sm mb-05 ${if (!isWinner) "text-primary" else "text-red"}") {
                                    textNode("Enemy Forces")
                                }
                                div(className = "text-xs text-gray") {
                                    textNode("Commander: ${if (enemyHero?.isAlive == true) "Alive (${enemyHero.currentHp}/${enemyHero.maxHp} HP)" else "Slain 💀"}")
                                }
                                div(className = "text-xs text-gray mt-02") {
                                    textNode("Surviving Units: ${enemyLivingUnits.size}")
                                }
                            }
                        }

                        div(className = "tactical-results-log-container text-left") {
                            div(className = "text-xs font-600 text-gray mb-05") { textNode("Battle Chronicle:") }
                            div(className = "tactical-results-log") {
                                val recentLogs = battleState.battleLog.takeLast(6)
                                for (entry in recentLogs) {
                                    div(className = "text-xs text-light mb-02") {
                                        textNode(entry)
                                    }
                                }
                            }
                        }

                        button(
                            "Return to Strategic Map ➔",
                            className = "btn-tactical-acknowledge"
                        ) {
                            onClick {
                                onClose?.invoke() ?: sendAction(GameAction.TacticalAcknowledgeResult(battleState.battleId))
                            }
                        }
                    }
                }
            }

            // 1. Top Header
            div(className = "tactical-header d-flex justify-between items-center") {
                div(className = "d-flex items-center gap-1") {
                    span(className = "tactical-title font-600 text-xl") {
                        textNode("⚔️ $sectorName")
                    }
                    if (locationInfo?.region != null) {
                        span(className = "tactical-region-badge") {
                            textNode(locationInfo.region)
                        }
                    }
                    span(className = "tactical-round-badge") {
                        textNode("Round ${battleState.roundNumber}")
                    }
                    if (isMyTurn && selectedUnit != null) {
                        span(className = "tactical-round-badge") {
                            style("color", "#fbbf24")
                            style("border-color", "rgba(251, 191, 36, 0.4)")
                            textNode("🎯 ${selectedUnit.name} (👟 ${selectedUnit.movesRemaining}/${selectedUnit.maxMoves})")
                        }
                    }
                }

                div(className = "d-flex items-center gap-1") {
                    div(
                        className = if (isMyTurn) "tactical-turn-indicator turn-player pulse" else "tactical-turn-indicator turn-enemy"
                    ) {
                        textNode(if (isMyTurn) "⚡ YOUR TURN" else "⏳ ENEMY TURN")
                    }

                    button("⚡ Auto Resolve", className = "btn-tactical-auto") {
                        onClick {
                            sendAction(GameAction.TacticalAutoResolve(battleState.battleId))
                        }
                    }

                    button("🏳️ Retreat", className = "btn-tactical-retreat") {
                        onClick {
                            sendAction(GameAction.TacticalRetreat(battleState.battleId))
                        }
                    }
                }
            }

            // 2. Battle arena container with backdrop
            div(className = "tactical-arena-container") {
                style("background-image", "linear-gradient(rgba(10, 15, 20, 0.78), rgba(10, 15, 20, 0.88)), url('${biome.backdropUrl}')")

                // 10x8 Grid
                div(className = "tactical-grid") {
                    for (y in 0 until battleState.gridHeight) {
                        div(className = "tactical-grid-row") {
                            for (x in 0 until battleState.gridWidth) {
                                val tileType = battleState.tiles[y][x]
                                val unitOnTile = battleState.units.find { it.isAlive && it.x == x && it.y == y }
                                val isMoveTarget = (x to y) in validMoves
                                val isAttackTarget = (x to y) in attackTargetPositions
                                val isSelected = (selectedUnit?.x == x && selectedUnit.y == y)
                                val hasAllyUnit = (unitOnTile != null && unitOnTile.ownerPlayerId == resolvedPlayerId)
                                val hasEnemyUnit = (unitOnTile != null && unitOnTile.ownerPlayerId != resolvedPlayerId)

                                val cellClasses = buildList {
                                    add("tactical-cell")
                                    add("tile-${tileType.name.lowercase()}")
                                    if (hasAllyUnit) add("cell-has-ally")
                                    if (hasEnemyUnit) add("cell-has-enemy")
                                    if (isMoveTarget) add("cell-valid-move")
                                    if (isAttackTarget) add("cell-valid-attack")
                                    if (isSelected) add("cell-selected")
                                }.joinToString(" ")

                                div(className = cellClasses) {
                                    onClick {
                                        if (unitOnTile != null) {
                                            if (unitOnTile.ownerPlayerId == resolvedPlayerId) {
                                                // Select ally unit
                                                selectedUnitId = unitOnTile.id
                                            } else if (isAttackTarget && selectedUnit != null && isMyTurn) {
                                                // Attack enemy unit
                                                sendAction(
                                                    GameAction.TacticalAttackUnit(
                                                        battleId = battleState.battleId,
                                                        attackerUnitId = selectedUnit.id,
                                                        targetUnitId = unitOnTile.id
                                                    )
                                                )
                                            }
                                        } else if (isMoveTarget && selectedUnit != null && isMyTurn) {
                                            // Move unit to tile
                                            sendAction(
                                                GameAction.TacticalMoveUnit(
                                                    battleId = battleState.battleId,
                                                    unitId = selectedUnit.id,
                                                    targetX = x,
                                                    targetY = y
                                                )
                                            )
                                        }
                                    }

                                    // Render obstacle icons when not plain
                                    val obstacleSvg = TacticalIcons.renderTileObstacle(tileType)
                                    if (obstacleSvg != null) {
                                        val overlayClass = when (tileType) {
                                            TacticalTileType.BRIDGE -> "tile-bridge-overlay"
                                            TacticalTileType.FORTRESS_GATE -> "tile-gate-overlay"
                                            else -> "tile-obstacle-icon"
                                        }
                                        div(className = overlayClass) {
                                            rawHtml(obstacleSvg)
                                        }
                                    }

                                    // Render Unit Figurine if present
                                    if (unitOnTile != null) {
                                        val isAlly = (unitOnTile.ownerPlayerId == resolvedPlayerId)
                                        val hpPercent = (unitOnTile.currentHp.toDouble() / unitOnTile.maxHp.toDouble() * 100).coerceIn(0.0, 100.0)

                                        div(className = if (isAlly) "figurine-wrapper ally-unit" else "figurine-wrapper enemy-unit") {
                                            if (unitOnTile.isPrevalentUnit) {
                                                div(className = "prevalent-crown") {
                                                    title("Prevalent Squad: +25% ATK & DEF")
                                                    rawHtml(TacticalIcons.CROWN)
                                                }
                                            }

                                            img(
                                                src = unitOnTile.iconUrl.ifEmpty { unitOnTile.unitType.defaultIcon },
                                                className = "figurine-img",
                                                alt = unitOnTile.name
                                            ) {
                                                attribute("draggable", "false")
                                            }

                                            if (unitOnTile.initialSquadCount > 1) {
                                                val remainingTroops = TacticalRules.calculateSurvivingCount(
                                                    unitOnTile.initialSquadCount,
                                                    unitOnTile.currentHp,
                                                    unitOnTile.maxHp
                                                )
                                                div(className = "squad-badge") {
                                                    textNode("×$remainingTroops")
                                                }
                                            }

                                            // Facing pointer
                                            div(className = "facing-pointer facing-${unitOnTile.facing.name.lowercase()}") {
                                                attribute("title", "Facing: ${unitOnTile.facing.name}")
                                                textNode(when (unitOnTile.facing) {
                                                    UnitFacing.NORTH -> "▲"
                                                    UnitFacing.SOUTH -> "▼"
                                                    UnitFacing.EAST -> "▶"
                                                    UnitFacing.WEST -> "◀"
                                                })
                                            }

                                            // Mini HP bar
                                            div(className = "figurine-hp-bar") {
                                                div(className = if (isAlly) "figurine-hp-fill ally" else "figurine-hp-fill enemy") {
                                                    style("width", "${hpPercent}%")
                                                }
                                            }
                                        }
                                    }

                                    // Overlay target icons
                                    if (isMoveTarget) {
                                        div(className = "move-pin-indicator") {
                                            rawHtml(TacticalIcons.MOVE_PIN)
                                        }
                                    }
                                    if (isAttackTarget) {
                                        div(className = "attack-target-crosshair") {
                                            rawHtml(TacticalIcons.CROSSHAIR)
                                        }
                                        if (selectedUnit != null && unitOnTile != null) {
                                            val attackAngle = TacticalRules.determineAttackAngle(selectedUnit, unitOnTile)
                                            when (attackAngle) {
                                                TacticalAttackAngle.REAR -> {
                                                    div(className = "tactical-angle-badge angle-rear") {
                                                        attribute("title", "Rear Attack: Double Damage (x2.0)!")
                                                        textNode("REAR x2")
                                                    }
                                                }
                                                TacticalAttackAngle.FLANK -> {
                                                    div(className = "tactical-angle-badge angle-flank") {
                                                        attribute("title", "Flank Attack: +50% Damage (x1.5)!")
                                                        textNode("FLANK +50%")
                                                    }
                                                }
                                                TacticalAttackAngle.FRONT -> {}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 3. Battle Log ticker
            if (battleState.battleLog.isNotEmpty()) {
                div(className = "tactical-log-ticker") {
                    val recentLogs = battleState.battleLog.takeLast(2)
                    for (log in recentLogs) {
                        div(className = "tactical-log-item") {
                            textNode("📜 $log")
                        }
                    }
                }
            }

            // 4. Bottom Unit Card Tray & End Turn Action
            div(className = "tactical-tray-wrapper") {
                div(className = "tactical-units-tray") {
                    for (unit in myUnits) {
                        val isCardSelected = (unit.id == effectiveSelectedUnitId)
                        val hpPct = (unit.currentHp.toDouble() / unit.maxHp.toDouble() * 100).coerceIn(0.0, 100.0)

                        div(
                            className = if (isCardSelected) "tactical-unit-card card-selected" else "tactical-unit-card"
                        ) {
                            onClick {
                                selectedUnitId = unit.id
                            }

                            div(className = "d-flex items-center gap-05") {
                                img(
                                    src = unit.iconUrl.ifEmpty { unit.unitType.defaultIcon },
                                    className = "tray-unit-avatar",
                                    alt = unit.name
                                ) {
                                    attribute("draggable", "false")
                                }
                                div(className = "flex-grow-1") {
                                    div(className = "d-flex justify-between items-center") {
                                        span(className = "font-600 text-sm") { textNode(unit.name) }
                                        if (unit.isPrevalentUnit) {
                                            span(className = "badge-prevalent") { textNode("👑 +25%") }
                                        }
                                    }
                                    div(className = "tray-hp-bar mt-05") {
                                        div(className = "tray-hp-fill") {
                                            style("width", "${hpPct}%")
                                        }
                                    }
                                    div(className = "d-flex justify-between text-xs mt-05 text-gray") {
                                        span { textNode("HP ${unit.currentHp}/${unit.maxHp}") }
                                        span {
                                            attribute("title", "Weapon Def: ${unit.weaponDefense} | Arrow Def: ${unit.arrowDefense} | Magic Def: ${unit.magicDefense}")
                                            textNode("⚔️ ${unit.attack} 🛡️ ${unit.weaponDefense}/${unit.arrowDefense}/${unit.magicDefense}")
                                        }
                                        span {
                                            textNode("👟 ${unit.movesRemaining}/${unit.maxMoves}")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                div(className = "tactical-actions-tray") {
                    button("End Turn ⏳", className = if (isMyTurn) "btn-tactical-end-turn" else "btn-tactical-end-turn btn-disabled") {
                        onClick {
                            if (isMyTurn) {
                                sendAction(GameAction.TacticalEndUnitTurn(battleState.battleId))
                            }
                        }
                    }
                }
            }
        }
    }
}
