package components

import androidx.compose.runtime.*
import dev.kilua.core.IComponent
import dev.kilua.html.*
import kotlinx.coroutines.delay
import kotlin.random.Random
import models.GothicIndicators

/**
 * Classic Gothic Colony micro-phrases heard throughout the Old Camp,
 * New Camp, and Swamp Camp.
 */
val GOTHIC_COLONY_PHRASES = GothicIndicators.COLONY_PHRASES

/**
 * Feature 2: Colony Chat Log ("Small Talk" Overlay)
 *
 * 1. Display Rule: Triggers only once every 3rd computer turn (aiTurnCount % 3 === 0).
 * 2. Visuals: Weathered parchment / rough slate style dialogue box with classic Gothic yellow-orange typography.
 * 3. Behavior: Cycles through iconic Gothic colony small-talk phrases at 1.5–2.5 second intervals.
 * 4. Fades out cleanly within 300ms when the computer finishes its move.
 */
@Composable
fun IComponent.ColonyChatLog(
    isThinking: Boolean,
    aiTurnCount: Int,
    className: String = "",
    arrowPosition: String = "bottom-center"
) {
    val shouldTrigger = GothicIndicators.shouldTriggerDialogue(aiTurnCount)

    var isVisible by remember { mutableStateOf(false) }
    var isDissipating by remember { mutableStateOf(false) }
    var currentPhraseIndex by remember { mutableStateOf(0) }
    var textFadeState by remember { mutableStateOf(true) } // true = visible, false = changing

    // Lifecycle: show on thinking start (if 3rd turn); fade out cleanly when move finishes
    LaunchedEffect(isThinking, shouldTrigger) {
        if (isThinking && shouldTrigger) {
            isDissipating = false
            isVisible = true
            currentPhraseIndex = Random.nextInt(GOTHIC_COLONY_PHRASES.size)
            textFadeState = true
        } else if (isVisible) {
            isDissipating = true
            delay(300) // clean fade-out window before unmounting
            isVisible = false
            isDissipating = false
        }
    }

    // Phrase cycling timer: 2.0s interval (within 1.5s–2.5s window) while thinking is active
    LaunchedEffect(isVisible, isDissipating) {
        if (!isVisible || isDissipating) return@LaunchedEffect

        while (true) {
            delay(2000)
            if (!isVisible || isDissipating) break

            // Smooth crossfade between phrases
            textFadeState = false
            delay(200)

            var nextIdx = Random.nextInt(GOTHIC_COLONY_PHRASES.size)
            if (nextIdx == currentPhraseIndex && GOTHIC_COLONY_PHRASES.size > 1) {
                nextIdx = (currentPhraseIndex + 1) % GOTHIC_COLONY_PHRASES.size
            }
            currentPhraseIndex = nextIdx
            textFadeState = true
        }
    }

    if (!isVisible) return

    val dissipationClass = if (isDissipating) "colony-chat-dissipating" else "colony-chat-active"
    val arrowClass = "arrow-$arrowPosition"
    val phraseText = GOTHIC_COLONY_PHRASES.getOrElse(currentPhraseIndex) { GOTHIC_COLONY_PHRASES[0] }

    div(className = "colony-chat-container $dissipationClass $className") {
        div(className = "colony-chat-bubble $arrowClass") {
            // Embellished Gothic Header Tag
            div(className = "colony-chat-header") {
                div(className = "d-flex items-center gap-05") {
                    img(src = "/colony_whisper.jpg", alt = "Old Camp Rumor", className = "colony-whisper-mini-icon")
                    span(className = "colony-chat-badge") {
                        textNode("✦ COLONY SMALL TALK ✦")
                    }
                }
                span(className = "colony-chat-turn") {
                    textNode("Turn $aiTurnCount")
                }
            }

            // Dialogue content with animated crossfade and Gothic typography
            div(className = "colony-chat-body ${if (textFadeState) "phrase-visible" else "phrase-fading"}") {
                span(className = "gothic-quote-mark") { textNode("“") }
                span(className = "gothic-speech-text") {
                    textNode(phraseText)
                }
                span(className = "gothic-quote-mark") { textNode("”") }
            }

            // Decorative tail pointing toward the speaker/status indicator
            div(className = "colony-chat-tail")
        }
    }
}
