package components

import androidx.compose.runtime.*
import dev.kilua.compose.ComponentNode
import dev.kilua.core.IComponent
import dev.kilua.html.*
import models.*

@Composable
fun IComponent.AdvisorModal(
    playerId: String,
    gameState: GameState,
    latestAdvice: GameEvent.AdvisorAdviceReceived?,
    isLoading: Boolean,
    onAskQuestion: (String) -> Unit,
    onClose: () -> Unit
) {
    val myPlayer = gameState.players.find { it.id == playerId }
    val chosenAdvisorId = myPlayer?.advisorId ?: "ZORAX"
    val advisor = PredefinedAdvisors.find { it.id == chosenAdvisorId } ?: PredefinedAdvisors[0]

    val isZorax = advisor.id == "ZORAX"
    val accentColor = if (isZorax) "#eab308" else "#c084fc"
    val glowColor = if (isZorax) "rgba(234, 179, 8, 0.4)" else "rgba(192, 132, 252, 0.4)"

    div(className = "modal-overlay") {
        onClick { onClose() }

        div(className = "modal-content glass p-4 text-left") {
            style("max-width", "680px")
            style("width", "92%")
            style("border", "1px solid $accentColor")
            style("box-shadow", "0 0 25px $glowColor")
            style("border-radius", "16px")
            style("position", "relative")
            style("overflow", "hidden")

            // Prevent overlay click from closing when clicking inside
            onClick { it.stopPropagation() }

            // Close button in corner
            button("✕", className = "btn btn-sm") {
                style("position", "absolute")
                style("top", "16px")
                style("right", "16px")
                style("background", "rgba(255,255,255,0.08)")
                style("color", "#d1d5db")
                style("border", "none")
                style("font-size", "1.2rem")
                style("cursor", "pointer")
                style("border-radius", "50%")
                style("width", "36px")
                style("height", "36px")
                onClick { onClose() }
            }

            // Advisor Profile Header
            div(className = "d-flex items-center gap-1 mb-2") {
                div {
                    style("position", "relative")
                    img(
                        src = advisor.iconUrl,
                        alt = advisor.name,
                        className = "advisor-portrait"
                    ) {
                        style("width", "96px")
                        style("height", "96px")
                        style("border-radius", "16px")
                        style("border", "2px solid $accentColor")
                        style("box-shadow", "0 0 16px $glowColor")
                        style("object-fit", "cover")
                        style("display", "block")
                    }
                }

                div {
                    h2(className = "m-0") {
                        style("color", accentColor)
                        style("font-size", "1.6rem")
                        style("letter-spacing", "0.5px")
                        textNode(advisor.name)
                    }
                    p(className = "m-0 text-sm") {
                        style("color", "#9ca3af")
                        style("font-weight", "500")
                        textNode(advisor.title)
                    }
                    p(className = "m-0 text-sm mt-05") {
                        style("color", "#cbd5e1")
                        style("font-style", "italic")
                        textNode("\"${advisor.personality}\"")
                    }
                }
            }

            // Divider
            hr {
                style("border", "0")
                style("border-top", "1px solid rgba(255, 255, 255, 0.12)")
                style("margin", "1rem 0")
            }

            // 3 Question Buttons
            p(className = "m-0 mb-1 text-sm font-600") {
                style("color", "#e2e8f0")
                textNode("Choose a topic to consult your advisor:")
            }

            div(className = "d-flex flex-col gap-05 mb-2") {
                for (q in AdvisorQuestions) {
                    val isCurrentQuestion = latestAdvice?.questionType == q.type
                    button(className = "btn glass text-left p-2") {
                        style("border", if (isCurrentQuestion) "1px solid $accentColor" else "1px solid rgba(255,255,255,0.15)")
                        style("background", if (isCurrentQuestion) "rgba(255,255,255,0.12)" else "rgba(0,0,0,0.25)")
                        style("cursor", if (isLoading) "wait" else "pointer")
                        style("transition", "all 0.2s ease")
                        style("border-radius", "10px")

                        div(className = "d-flex items-center justify-between") {
                            div(className = "d-flex items-center gap-05") {
                                span {
                                    style("font-size", "1.3rem")
                                    textNode(q.icon)
                                }
                                div {
                                    span(className = "font-600") {
                                        style("color", if (isCurrentQuestion) accentColor else "#f8fafc")
                                        style("display", "block")
                                        textNode(q.label)
                                    }
                                    span(className = "text-sm text-gray") {
                                        style("font-size", "0.82rem")
                                        textNode(q.description)
                                    }
                                }
                            }
                            span {
                                style("color", accentColor)
                                style("font-weight", "bold")
                                textNode("Ask →")
                            }
                        }

                        onClick {
                            if (!isLoading) {
                                onAskQuestion(q.type)
                            }
                        }
                    }
                }
            }

            // Advice Output Box
            div {
                style("background", "rgba(15, 23, 42, 0.75)")
                style("border", "1px solid rgba(255, 255, 255, 0.15)")
                style("border-radius", "12px")
                style("padding", "1.2rem")
                style("min-height", "110px")

                if (isLoading) {
                    div(className = "d-flex items-center gap-1 justify-center") {
                        style("padding", "1.5rem 0")
                        span {
                            style("font-size", "1.5rem")
                            style("animation", "spin 1.5s linear infinite")
                            textNode(if (isZorax) "⚔️" else "🔮")
                        }
                        span(className = "text-md") {
                            style("color", accentColor)
                            style("font-weight", "600")
                            textNode("${advisor.name} is surveying the battlefield...")
                        }
                    }
                } else if (latestAdvice != null) {
                    div {
                        div(className = "d-flex items-center justify-between mb-05") {
                            span(className = "text-xs font-600") {
                                style("color", accentColor)
                                style("text-transform", "uppercase")
                                style("letter-spacing", "1px")
                                val category = when (latestAdvice.questionType) {
                                    "STATUS" -> "Imperial Status Assessment"
                                    "NEXT_MOVE" -> "Tactical Turn Counsel"
                                    else -> "Grand Campaign Strategy"
                                }
                                textNode(category)
                            }
                        }

                        p(className = "m-0 text-md") {
                            style("color", "#f1f5f9")
                            style("line-height", "1.6")
                            style("font-size", "1.05rem")
                            textNode(latestAdvice.advice)
                        }

                        if (latestAdvice.keyPoints.isNotEmpty()) {
                            div(className = "mt-1") {
                                p(className = "m-0 mb-05 text-xs text-gray font-600") {
                                    textNode("KEY TAKEAWAYS:")
                                }
                                div(className = "d-flex flex-wrap gap-05") {
                                    for (point in latestAdvice.keyPoints) {
                                        span(className = "glass") {
                                            style("padding", "0.25rem 0.65rem")
                                            style("border-radius", "999px")
                                            style("font-size", "0.82rem")
                                            style("border", "1px solid $accentColor")
                                            style("color", "#f8fafc")
                                            style("background", "rgba(0,0,0,0.3)")
                                            textNode("• $point")
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    div(className = "text-center text-gray p-2") {
                        p(className = "m-0") {
                            textNode("Select any of the three questions above to receive counsel from ${advisor.name}.")
                        }
                    }
                }
            }
        }
    }
}
