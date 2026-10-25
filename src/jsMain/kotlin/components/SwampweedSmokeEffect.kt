package components

import androidx.compose.runtime.*
import dev.kilua.core.IComponent
import dev.kilua.html.*
import kotlinx.browser.document
import kotlinx.browser.window
import kotlinx.coroutines.delay
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import kotlin.js.Date
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin
import kotlin.random.Random

/**
 * Particle representing a puff of drifting swampweed smoke.
 * Uses translucent blue-green colors (#2d5a4c to #4e9a86).
 */
private class SmokeParticle(
    var x: Double,
    var y: Double,
    var vx: Double,
    var vy: Double,
    var radius: Double,
    val maxRadius: Double,
    var alpha: Double,
    val maxAlpha: Double,
    var rotation: Double,
    val rotationSpeed: Double,
    val colorIndex: Int,
    var age: Double = 0.0,
    val maxAge: Double = 160.0 + Random.nextDouble() * 80.0
)

/**
 * The Swamp Camp "Swampweed Exhale" Smoke Effect.
 *
 * 1. Displays a stylized silhouette/icon of an old Gothic swampweed pipe/joint near the board corner.
 * 2. Emits drifting, lazy trails of translucent blue-green smoke (#2d5a4c to #4e9a86 with low opacity)
 *    along the lower edge of the game board.
 * 3. Smoothly fades in when thinking starts; triggers a ~300ms wind-gust dissipation effect
 *    when thinking resolves before unmounting.
 */
@Composable
fun IComponent.SwampweedSmokeEffect(
    isThinking: Boolean,
    boardCorner: String = "bottom-right",
    onDissipated: (() -> Unit)? = null
) {
    var isVisible by remember { mutableStateOf(false) }
    var isDissipating by remember { mutableStateOf(false) }
    val canvasId = remember { "swampweed-smoke-canvas-${Random.nextInt(1000, 9999)}" }

    // Lifecycle: mount smoothly on thinking start; trigger wind gust dissipation on thinking end
    LaunchedEffect(isThinking) {
        if (isThinking) {
            isDissipating = false
            isVisible = true
        } else if (isVisible) {
            isDissipating = true
            delay(300) // 300ms wind gust dissipation
            isVisible = false
            isDissipating = false
            onDissipated?.invoke()
        }
    }

    if (!isVisible) return

    val dissipationClass = if (isDissipating) "smoke-dissipating" else "smoke-active"
    val cornerClass = if (boardCorner == "bottom-left") "corner-bottom-left" else "corner-bottom-right"

    div(className = "swampweed-exhale-container $dissipationClass") {
        // Layer 1: Stylized Gothic Swampweed Pipe Silhouette with pulsating weed ember and rising wisp
        div(className = "swampweed-pipe-anchor $cornerClass") {
            title("Swamp Camp Novice Blend — Swampweed Exhale")

            rawHtml("""
                <div class="swampweed-pipe-wrap">
                    <div class="swampweed-pipe-artwork">
                        <img src="/swampweed_pipe.jpg" alt="Swampweed Pipe" class="swampweed-pipe-img" />
                        <div class="swampweed-pipe-ember-flare"></div>
                    </div>
                    <span class="swampweed-badge">Swampweed Exhale</span>
                </div>
            """)
        }

        // Layer 2: Ambient CSS undulating smoke ribbons along the lower board edge
        div(className = "swampweed-css-ribbons") {
            rawHtml("""
                <div class="smoke-ribbon smoke-ribbon-back"></div>
                <div class="smoke-ribbon smoke-ribbon-mid"></div>
                <div class="smoke-ribbon smoke-ribbon-front"></div>
            """)
        }

        // Layer 3: High-performance Canvas2D swirling particles
        tag("canvas", className = "swampweed-canvas") {
            id(canvasId)
        }
    }

    // Canvas2D animation controller
    LaunchedEffect(isVisible, isDissipating) {
        if (!isVisible) return@LaunchedEffect

        // Small delay to allow DOM element mounting
        delay(30)
        val canvas = document.getElementById(canvasId) as? HTMLCanvasElement ?: return@LaunchedEffect
        val ctx = canvas.getContext("2d") as? CanvasRenderingContext2D ?: return@LaunchedEffect

        var isRunning = true
        val particles = mutableListOf<SmokeParticle>()

        // Blue-green palette: #2d5a4c to #4e9a86
        val smokeColors = arrayOf(
            Triple(45, 90, 76),   // #2d5a4c - deep murky swamp green
            Triple(58, 125, 104), // #3a7d68 - mystic moss teal
            Triple(78, 154, 134), // #4e9a86 - pale ethereal swampweed mist
            Triple(35, 75, 63)    // #234b3f - shadow swamp haze
        )

        fun resizeCanvas() {
            val rect = canvas.getBoundingClientRect()
            val dpr = window.devicePixelRatio.coerceIn(1.0, 2.0)
            val w = if (rect.width > 0) rect.width else 800.0
            val h = if (rect.height > 0) rect.height else 140.0
            canvas.width = (w * dpr).toInt()
            canvas.height = (h * dpr).toInt()
            ctx.scale(dpr, dpr)
        }

        resizeCanvas()

        // Emitter origin: near the pipe bowl in the bottom-right or bottom-left corner
        fun spawnParticle(customX: Double? = null) {
            val rect = canvas.getBoundingClientRect()
            val canvasW = if (rect.width > 0) rect.width else 800.0
            val canvasH = if (rect.height > 0) rect.height else 140.0

            val originX = customX ?: if (boardCorner == "bottom-left") {
                50.0 + Random.nextDouble() * 80.0
            } else {
                canvasW - 90.0 + (Random.nextDouble() * 60.0 - 30.0)
            }
            val originY = canvasH - 30.0 + (Random.nextDouble() * 20.0 - 10.0)

            val dirX = if (boardCorner == "bottom-left") 1.0 else -1.0
            val vx = (dirX * (0.35 + Random.nextDouble() * 0.55)) + (Random.nextDouble() * 0.3 - 0.15)
            val vy = -(0.25 + Random.nextDouble() * 0.45) // lazy upward drift

            particles.add(
                SmokeParticle(
                    x = originX,
                    y = originY,
                    vx = vx,
                    vy = vy,
                    radius = 16.0 + Random.nextDouble() * 12.0,
                    maxRadius = 45.0 + Random.nextDouble() * 35.0,
                    alpha = 0.0,
                    maxAlpha = 0.12 + Random.nextDouble() * 0.14, // low opacity 0.12 - 0.26
                    rotation = Random.nextDouble() * PI * 2,
                    rotationSpeed = (Random.nextDouble() - 0.5) * 0.015,
                    colorIndex = Random.nextInt(smokeColors.size)
                )
            )
        }

        // Seed initial ambient smoke along the bottom
        val rect = canvas.getBoundingClientRect()
        val initialW = if (rect.width > 0) rect.width else 800.0
        for (i in 0 until 14) {
            spawnParticle(customX = Random.nextDouble() * initialW)
        }

        var lastSpawnTime = Date.now()

        fun loop() {
            if (!isRunning) return

            val now = Date.now()
            val rectCur = canvas.getBoundingClientRect()
            val curW = if (rectCur.width > 0) rectCur.width else 800.0
            val curH = if (rectCur.height > 0) rectCur.height else 140.0

            // Clear frame
            ctx.clearRect(0.0, 0.0, curW, curH)

            // Continuously emit new swirling smoke while thinking (and not dissipating)
            if (!isDissipating && (now - lastSpawnTime > 120.0) && particles.size < 40) {
                spawnParticle()
                lastSpawnTime = now
            }

            // Update & render particles
            val iterator = particles.iterator()
            while (iterator.hasNext()) {
                val p = iterator.next()
                p.age += 1.0

                if (isDissipating) {
                    // Wind gust simulation: accelerate horizontally, slight updraft, rapidly fade alpha within ~300ms
                    p.vx += if (boardCorner == "bottom-left") 0.6 else -0.6
                    p.vy -= 0.15
                    p.alpha *= 0.84 // Rapid exponential decay (~18 frames / 300ms)
                } else {
                    // Lazy swirling drift
                    val progress = p.age / p.maxAge
                    if (progress < 0.25) {
                        p.alpha = (progress / 0.25) * p.maxAlpha
                    } else if (progress > 0.7) {
                        p.alpha = ((1.0 - progress) / 0.3) * p.maxAlpha
                    } else {
                        p.alpha = p.maxAlpha
                    }

                    // Gentle sinusoidal swirling turbulence
                    val swirl = sin(p.age * 0.03 + p.colorIndex) * 0.28
                    p.x += p.vx + swirl
                    p.y += p.vy
                    p.rotation += p.rotationSpeed
                    p.radius += (p.maxRadius - p.radius) * 0.008
                }

                if (p.alpha <= 0.005 || p.age >= p.maxAge || p.y < -p.radius || p.x < -p.radius * 2 || p.x > curW + p.radius * 2) {
                    iterator.remove()
                    continue
                }

                // Render soft, translucent blue-green puff
                val color = smokeColors[p.colorIndex]
                val r = color.first
                val g = color.second
                val b = color.third

                ctx.save()
                ctx.translate(p.x, p.y)
                ctx.rotate(p.rotation)

                val grad = ctx.createRadialGradient(0.0, 0.0, 0.0, 0.0, 0.0, p.radius)
                grad.addColorStop(0.0, "rgba($r, $g, $b, ${p.alpha})")
                grad.addColorStop(0.5, "rgba($r, $g, $b, ${p.alpha * 0.6})")
                grad.addColorStop(1.0, "rgba($r, $g, $b, 0.0)")

                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.arc(0.0, 0.0, p.radius, 0.0, PI * 2)
                ctx.fill()

                ctx.restore()
            }

            window.requestAnimationFrame { loop() }
        }

        loop()
    }
}
