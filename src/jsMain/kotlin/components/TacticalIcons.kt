package components

import models.TacticalTileType

/**
 * Dedicated SVG Vector Icon Catalog for the Tactical Combat Arena.
 * High-fidelity fantasy vector assets replacing Unicode emojis with crisp,
 * atmospheric vector graphics that scale cleanly within tactical grid cells.
 */
object TacticalIcons {

    val FOREST: String = """
        <svg class="tactical-svg-icon svg-tile-forest" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="forestGroundShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#021408" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#021408" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="pineBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#1b4326"/>
              <stop offset="100%" stop-color="#0d2816"/>
            </linearGradient>
            <linearGradient id="pineFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#2d6a3f"/>
              <stop offset="60%" stop-color="#1e4d2b"/>
              <stop offset="100%" stop-color="#0f2b18"/>
            </linearGradient>
            <linearGradient id="pineHighlight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#52b788" stop-opacity="0.75"/>
              <stop offset="100%" stop-color="#2d6a3f" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="54" rx="26" ry="8" fill="url(#forestGroundShadow)"/>
          <rect x="18" y="44" width="3.5" height="9" rx="1.5" fill="#382216"/>
          <polygon points="20,18 10,32 14,32 8,44 32,44 26,32 30,32" fill="url(#pineBack)"/>
          <polygon points="20,18 10,32 14,32 8,44 20,44" fill="url(#pineHighlight)"/>
          <rect x="42" y="44" width="3.5" height="9" rx="1.5" fill="#382216"/>
          <polygon points="44,20 34,34 38,34 32,45 56,45 50,34 54,34" fill="url(#pineBack)"/>
          <polygon points="44,20 34,34 38,34 32,45 44,45" fill="url(#pineHighlight)"/>
          <rect x="30" y="42" width="4.5" height="12" rx="2" fill="#2d170b"/>
          <polygon points="32,28 14,48 50,48" fill="url(#pineFront)"/>
          <path d="M 32,28 L 14,48 L 32,48 Z" fill="url(#pineHighlight)"/>
          <path d="M 14,48 Q 23,44 32,47 Q 41,44 50,48 Z" fill="#0b1e11" opacity="0.6"/>
          <polygon points="32,18 18,36 46,36" fill="url(#pineFront)"/>
          <path d="M 32,18 L 18,36 L 32,36 Z" fill="url(#pineHighlight)"/>
          <path d="M 18,36 Q 25,32 32,35 Q 39,32 46,36 Z" fill="#0b1e11" opacity="0.6"/>
          <polygon points="32,8 23,24 41,24" fill="url(#pineFront)"/>
          <path d="M 32,8 L 23,24 L 32,24 Z" fill="url(#pineHighlight)"/>
        </svg>
    """.trimIndent()

    val RIVER: String = """
        <svg class="tactical-svg-icon svg-tile-river" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="riverFlowGrad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#38bdf8"/>
              <stop offset="50%" stop-color="#0284c7"/>
              <stop offset="100%" stop-color="#0369a1"/>
            </linearGradient>
            <linearGradient id="riverFlowGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#7dd3fc"/>
              <stop offset="60%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#0ea5e9"/>
            </linearGradient>
          </defs>
          <path d="M 4,14 C 18,8 24,20 36,16 C 48,12 54,20 60,15 L 60,49 C 52,54 44,46 32,50 C 20,54 14,46 4,50 Z" fill="rgba(3, 105, 161, 0.22)"/>
          <path d="M 6,18 C 18,11 26,23 38,18 C 48,13 54,22 60,17" stroke="url(#riverFlowGrad1)" stroke-width="3" stroke-linecap="round"/>
          <path d="M 12,23 C 20,18 25,25 33,22" stroke="url(#riverFlowGrad2)" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="8 5"/>
          <path d="M 4,32 C 16,24 24,38 38,32 C 48,27 54,37 60,31" stroke="url(#riverFlowGrad2)" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M 18,36 C 26,31 32,39 42,35" stroke="#e0f2fe" stroke-width="1.8" stroke-linecap="round" opacity="0.8"/>
          <path d="M 6,46 C 18,39 26,51 38,46 C 48,41 54,50 60,45" stroke="url(#riverFlowGrad1)" stroke-width="2.8" stroke-linecap="round"/>
          <circle cx="22" cy="27" r="1.5" fill="#bae6fd" opacity="0.75"/>
          <circle cx="46" cy="40" r="1.8" fill="#bae6fd" opacity="0.8"/>
          <circle cx="52" cy="24" r="1.2" fill="#e0f2fe" opacity="0.6"/>
        </svg>
    """.trimIndent()

    val BRIDGE: String = """
        <svg class="tactical-svg-icon svg-tile-bridge" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bridgePlank" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#5c3d22"/>
              <stop offset="20%" stop-color="#8b5e34"/>
              <stop offset="50%" stop-color="#a06d3b"/>
              <stop offset="80%" stop-color="#8b5e34"/>
              <stop offset="100%" stop-color="#5c3d22"/>
            </linearGradient>
            <linearGradient id="bridgeRailingBeam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3d2616"/>
              <stop offset="50%" stop-color="#694324"/>
              <stop offset="100%" stop-color="#2c1a0e"/>
            </linearGradient>
          </defs>
          <rect x="12" y="6" width="40" height="52" fill="rgba(0,0,0,0.55)" rx="3"/>
          <rect x="12" y="8" width="40" height="6.5" rx="1.5" fill="url(#bridgePlank)" stroke="#3e2716" stroke-width="0.75"/>
          <circle cx="15" cy="11.2" r="0.8" fill="#d97706"/><circle cx="49" cy="11.2" r="0.8" fill="#d97706"/>
          <rect x="12" y="16" width="40" height="6.5" rx="1.5" fill="url(#bridgePlank)" stroke="#3e2716" stroke-width="0.75"/>
          <circle cx="15" cy="19.2" r="0.8" fill="#d97706"/><circle cx="49" cy="19.2" r="0.8" fill="#d97706"/>
          <rect x="12" y="24" width="40" height="6.5" rx="1.5" fill="url(#bridgePlank)" stroke="#3e2716" stroke-width="0.75"/>
          <circle cx="15" cy="27.2" r="0.8" fill="#d97706"/><circle cx="49" cy="27.2" r="0.8" fill="#d97706"/>
          <rect x="12" y="32" width="40" height="6.5" rx="1.5" fill="url(#bridgePlank)" stroke="#3e2716" stroke-width="0.75"/>
          <circle cx="15" cy="35.2" r="0.8" fill="#d97706"/><circle cx="49" cy="35.2" r="0.8" fill="#d97706"/>
          <rect x="12" y="40" width="40" height="6.5" rx="1.5" fill="url(#bridgePlank)" stroke="#3e2716" stroke-width="0.75"/>
          <circle cx="15" cy="43.2" r="0.8" fill="#d97706"/><circle cx="49" cy="43.2" r="0.8" fill="#d97706"/>
          <rect x="12" y="48" width="40" height="6.5" rx="1.5" fill="url(#bridgePlank)" stroke="#3e2716" stroke-width="0.75"/>
          <circle cx="15" cy="51.2" r="0.8" fill="#d97706"/><circle cx="49" cy="51.2" r="0.8" fill="#d97706"/>
          <rect x="9" y="5" width="4.5" height="54" rx="2" fill="url(#bridgeRailingBeam)" stroke="#1c1109" stroke-width="0.8"/>
          <circle cx="11.2" cy="8" r="1.2" fill="#fbbf24"/>
          <circle cx="11.2" cy="32" r="1.2" fill="#fbbf24"/>
          <circle cx="11.2" cy="56" r="1.2" fill="#fbbf24"/>
          <rect x="50.5" y="5" width="4.5" height="54" rx="2" fill="url(#bridgeRailingBeam)" stroke="#1c1109" stroke-width="0.8"/>
          <circle cx="52.8" cy="8" r="1.2" fill="#fbbf24"/>
          <circle cx="52.8" cy="32" r="1.2" fill="#fbbf24"/>
          <circle cx="52.8" cy="56" r="1.2" fill="#fbbf24"/>
        </svg>
    """.trimIndent()

    val CLIFF_ROCK: String = """
        <svg class="tactical-svg-icon svg-tile-cliff" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="cliffShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#020617" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="cragLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#94a3b8"/>
              <stop offset="50%" stop-color="#64748b"/>
              <stop offset="100%" stop-color="#475569"/>
            </linearGradient>
            <linearGradient id="cragDark" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#334155"/>
              <stop offset="70%" stop-color="#1e293b"/>
              <stop offset="100%" stop-color="#0f172a"/>
            </linearGradient>
          </defs>
          <ellipse cx="32" cy="54" rx="26" ry="7" fill="url(#cliffShadow)"/>
          <polygon points="18,22 10,48 24,48" fill="url(#cragDark)"/>
          <polygon points="18,22 24,48 28,40" fill="url(#cragLight)"/>
          <polygon points="48,26 40,50 56,50" fill="url(#cragLight)"/>
          <polygon points="48,26 56,50 58,42" fill="url(#cragDark)"/>
          <polygon points="32,10 18,34 22,52 32,54" fill="url(#cragDark)"/>
          <polygon points="32,10 44,32 42,52 32,54" fill="url(#cragLight)"/>
          <polyline points="32,10 32,32 30,44 32,54" stroke="#e2e8f0" stroke-width="1.2" stroke-linejoin="round" opacity="0.9"/>
          <polyline points="32,24 24,32" stroke="#94a3b8" stroke-width="0.8" opacity="0.6"/>
          <polyline points="32,32 38,38" stroke="#f1f5f9" stroke-width="0.8" opacity="0.8"/>
          <path d="M 8,49 L 14,45 L 20,51 L 12,54 Z" fill="#475569" stroke="#1e293b" stroke-width="0.75"/>
          <path d="M 44,48 L 52,46 L 56,52 L 48,54 Z" fill="#334155" stroke="#0f172a" stroke-width="0.75"/>
        </svg>
    """.trimIndent()

    val FORTRESS_WALL: String = """
        <svg class="tactical-svg-icon svg-tile-wall" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="stoneMerlonLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#94a3b8"/>
              <stop offset="40%" stop-color="#64748b"/>
              <stop offset="100%" stop-color="#334155"/>
            </linearGradient>
            <linearGradient id="wallBaseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#475569"/>
              <stop offset="60%" stop-color="#334155"/>
              <stop offset="100%" stop-color="#1e293b"/>
            </linearGradient>
          </defs>
          <rect x="6" y="52" width="52" height="7" rx="3" fill="rgba(0,0,0,0.6)"/>
          <rect x="8" y="24" width="48" height="30" rx="2" fill="url(#wallBaseGrad)" stroke="#1e293b" stroke-width="1.2"/>
          <path d="M 8,24 L 8,11 L 20,11 L 20,24 Z" fill="url(#stoneMerlonLight)" stroke="#1e293b" stroke-width="1.2"/>
          <rect x="7" y="10" width="14" height="3" rx="1" fill="#cbd5e1" opacity="0.8"/>
          <path d="M 26,24 L 26,11 L 38,11 L 38,24 Z" fill="url(#stoneMerlonLight)" stroke="#1e293b" stroke-width="1.2"/>
          <rect x="25" y="10" width="14" height="3" rx="1" fill="#cbd5e1" opacity="0.8"/>
          <path d="M 44,24 L 44,11 L 56,11 L 56,24 Z" fill="url(#stoneMerlonLight)" stroke="#1e293b" stroke-width="1.2"/>
          <rect x="43" y="10" width="14" height="3" rx="1" fill="#cbd5e1" opacity="0.8"/>
          <line x1="8" y1="34" x2="56" y2="34" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="8" y1="44" x2="56" y2="44" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="22" y1="24" x2="22" y2="34" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="42" y1="24" x2="42" y2="34" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="32" y1="34" x2="32" y2="44" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="14" y1="34" x2="14" y2="44" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="50" y1="34" x2="50" y2="44" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="24" y1="44" x2="24" y2="54" stroke="#0f172a" stroke-width="1.2"/>
          <line x1="40" y1="44" x2="40" y2="54" stroke="#0f172a" stroke-width="1.2"/>
          <rect x="30" y="27" width="4" height="12" rx="1" fill="#090d16" stroke="#d97706" stroke-width="0.8"/>
          <line x1="28" y1="33" x2="36" y2="33" stroke="#d97706" stroke-width="0.8"/>
        </svg>
    """.trimIndent()

    val FORTRESS_GATE: String = """
        <svg class="tactical-svg-icon svg-tile-gate" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gateStoneArch" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#94a3b8"/>
              <stop offset="50%" stop-color="#475569"/>
              <stop offset="100%" stop-color="#1e293b"/>
            </linearGradient>
            <linearGradient id="gateIronBeam" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#475569"/>
              <stop offset="50%" stop-color="#cbd5e1"/>
              <stop offset="100%" stop-color="#334155"/>
            </linearGradient>
          </defs>
          <path d="M 8,56 L 8,26 C 8,12 22,6 32,6 C 42,6 56,12 56,26 L 56,56 Z" fill="url(#gateStoneArch)" stroke="#0f172a" stroke-width="1.5"/>
          <path d="M 16,56 L 16,28 C 16,18 24,14 32,14 C 40,14 48,18 48,28 L 48,56 Z" fill="#080c14"/>
          <polygon points="32,4 28,12 36,12" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
          <rect x="16" y="24" width="32" height="3" fill="#334155" stroke="#1e293b" stroke-width="0.6"/>
          <rect x="16" y="36" width="32" height="3" fill="#334155" stroke="#1e293b" stroke-width="0.6"/>
          <rect x="16" y="47" width="32" height="3" fill="#334155" stroke="#1e293b" stroke-width="0.6"/>
          <rect x="21" y="20" width="2.5" height="32" fill="url(#gateIronBeam)"/>
          <polygon points="21,52 23.5,52 22.25,56" fill="#cbd5e1"/>
          <rect x="27" y="16" width="2.5" height="36" fill="url(#gateIronBeam)"/>
          <polygon points="27,52 29.5,52 28.25,56" fill="#cbd5e1"/>
          <rect x="33" y="15" width="2.5" height="37" fill="url(#gateIronBeam)"/>
          <polygon points="33,52 35.5,52 34.25,56" fill="#cbd5e1"/>
          <rect x="39" y="16" width="2.5" height="36" fill="url(#gateIronBeam)"/>
          <polygon points="39,52 41.5,52 40.25,56" fill="#cbd5e1"/>
          <rect x="45" y="20" width="2.5" height="32" fill="url(#gateIronBeam)"/>
          <polygon points="45,52 47.5,52 46.25,56" fill="#cbd5e1"/>
        </svg>
    """.trimIndent()

    val CROSSHAIR: String = """
        <svg class="tactical-svg-icon svg-icon-crosshair" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="crosshairAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ef4444" stop-opacity="0.5"/>
              <stop offset="60%" stop-color="#b91c1c" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#b91c1c" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="crosshairStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fca5a5"/>
              <stop offset="50%" stop-color="#ef4444"/>
              <stop offset="100%" stop-color="#dc2626"/>
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#crosshairAura)"/>
          <circle class="crosshair-spin-ring" cx="32" cy="32" r="23" stroke="url(#crosshairStroke)" stroke-width="1.8" stroke-dasharray="8 5" fill="none"/>
          <circle cx="32" cy="32" r="14" stroke="#f87171" stroke-width="1.4" fill="none" opacity="0.85"/>
          <line x1="32" y1="4" x2="32" y2="15" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="32" y1="49" x2="32" y2="60" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="4" y1="32" x2="15" y2="32" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="49" y1="32" x2="60" y2="32" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round"/>
          <polyline points="18,22 18,18 22,18" stroke="#fca5a5" stroke-width="1.5" stroke-linecap="round"/>
          <polyline points="46,22 46,18 42,18" stroke="#fca5a5" stroke-width="1.5" stroke-linecap="round"/>
          <polyline points="18,42 18,46 22,46" stroke="#fca5a5" stroke-width="1.5" stroke-linecap="round"/>
          <polyline points="46,42 46,46 42,46" stroke="#fca5a5" stroke-width="1.5" stroke-linecap="round"/>
          <circle class="crosshair-pulse-dot" cx="32" cy="32" r="3.5" fill="#fee2e2" stroke="#ef4444" stroke-width="1"/>
        </svg>
    """.trimIndent()

    val MOVE_PIN: String = """
        <svg class="tactical-svg-icon svg-icon-move-pin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="movePinAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.55"/>
              <stop offset="60%" stop-color="#0284c7" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0"/>
            </radialGradient>
            <linearGradient id="movePinCyan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#e0f2fe"/>
              <stop offset="40%" stop-color="#38bdf8"/>
              <stop offset="100%" stop-color="#0284c7"/>
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="28" fill="url(#movePinAura)"/>
          <circle class="move-spin-ring" cx="32" cy="32" r="22" stroke="url(#movePinCyan)" stroke-width="1.8" stroke-dasharray="6 4" fill="none"/>
          <polygon points="32,15 44,20 49,32 44,44 32,49 20,44 15,32 20,20" stroke="#7dd3fc" stroke-width="1.2" fill="rgba(56, 189, 248, 0.15)"/>
          <circle cx="32" cy="11" r="2" fill="#38bdf8"/>
          <circle cx="32" cy="53" r="2" fill="#38bdf8"/>
          <circle cx="11" cy="32" r="2" fill="#38bdf8"/>
          <circle cx="53" cy="32" r="2" fill="#38bdf8"/>
          <polygon class="move-pulse-core" points="32,23 39,32 32,41 25,32" fill="url(#movePinCyan)" stroke="#e0f2fe" stroke-width="1.2"/>
          <circle cx="32" cy="32" r="2" fill="#ffffff"/>
        </svg>
    """.trimIndent()

    val CROWN: String = """
        <svg class="tactical-svg-icon svg-icon-crown" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="crownGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#fef08a"/>
              <stop offset="50%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#b45309"/>
            </linearGradient>
          </defs>
          <path d="M 2,19 L 22,19 L 20,7 L 15,13 L 12,3 L 9,13 L 4,7 Z" fill="url(#crownGrad)" stroke="#f59e0b" stroke-width="1.2" stroke-linejoin="round"/>
          <circle cx="12" cy="3" r="1.5" fill="#fef08a"/>
          <circle cx="4" cy="7" r="1.2" fill="#fef08a"/>
          <circle cx="20" cy="7" r="1.2" fill="#fef08a"/>
        </svg>
    """.trimIndent()

    fun renderTileObstacle(tileType: TacticalTileType): String? = when (tileType) {
        TacticalTileType.FOREST -> FOREST
        TacticalTileType.RIVER -> RIVER
        TacticalTileType.BRIDGE -> BRIDGE
        TacticalTileType.CLIFF_ROCK -> CLIFF_ROCK
        TacticalTileType.FORTRESS_WALL -> FORTRESS_WALL
        TacticalTileType.FORTRESS_GATE -> FORTRESS_GATE
        TacticalTileType.PLAIN -> null
    }
}
