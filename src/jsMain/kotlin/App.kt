import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import androidx.compose.runtime.LaunchedEffect
import dev.kilua.rpc.getService
import dev.kilua.form.text.text
import dev.kilua.form.text.textArea
import dev.kilua.html.*
import dev.kilua.Application
import dev.kilua.startApplication
import dev.kilua.compose.root
import rpc.AppService
import models.Note
import models.Discussion
import models.UserSession
import models.GameState
import components.CharacterPanel
import components.TurnHud
import components.StrategicMap
import components.GameLobby
import components.KingdomOverviewPanel
import components.GameHistoryPanel
import components.NatureEventModal
import components.MarketPanel
import components.ArmyRecruitmentPanel
import components.EventPopupModal
import components.VictoryPopupModal
import game.GameWebSocket
import kotlinx.coroutines.launch
import kotlinx.coroutines.delay
import models.GameEvent
import i18n.I18n
import i18n.Language
import i18n.t

data class PopupEvent(
    val title: String,
    val icon: String,
    val message: String,
    val colorClass: String = "text-primary"
)

class App : Application() {
    private val appService = getService<AppService>()
    private val scope = kotlinx.coroutines.MainScope()

    override fun start() {
        root("root") {
            rawHtml("""<style>
                .d-flex { display: flex; }
                .flex-col { flex-direction: column; }
                .flex-wrap { flex-wrap: wrap; }
                .items-center { align-items: center; }
                .gap-05 { gap: 0.5rem; }
                .gap-1 { gap: 1rem; }
                .gap-20 { gap: 20px; }
                .justify-between { justify-content: space-between; }
                .justify-center { justify-content: center; }
                .text-center { text-align: center; }
                .p-2 { padding: 1rem; }
                .p-4 { padding: 4rem; }
                .mb-1 { margin-bottom: 1rem; }
                .mb-2 { margin-bottom: 2rem; }
                .mt-1 { margin-top: 1rem; }
                .mt-05 { margin-top: 0.5rem; }
                .m-0 { margin: 0; }
                .text-gray { color: #D3D3D3; }
                .text-dark-gray { color: #808080; }
                .text-red { color: #ef4444; }
                .text-yellow { color: #eab308; }
                .bg-yellow { background-color: #eab308; color: #111827; }
                .bg-red-light { background: rgba(239, 68, 68, 0.2); }
                .border-yellow { border: 1px solid rgba(234, 179, 8, 0.4); box-shadow: 0 0 10px rgba(234, 179, 8, 0.15); }
                .font-600 { font-weight: 600; }
                .text-sm { font-size: 0.8rem; }
                .text-md { font-size: 0.9rem; }
                .text-xl { font-size: 1.5rem; }
                .btn-delete { padding: 0.3rem 0.8rem; }
                .self-start { align-self: flex-start; }
                .text-none { text-decoration: none; }
                .text-primary { color: var(--primary); }
                .language-btn { padding: 0.25rem 0.5rem; font-size: 0.8rem; border-radius: 6px; }
            </style>""")
            
            var currentUser: UserSession? by remember { mutableStateOf(null) }
            var notes by remember { mutableStateOf(emptyList<Note>()) }
            var discussions by remember { mutableStateOf(emptyList<Discussion>()) }
            var currentTab by remember { mutableStateOf("map") } // "notes", "discussions", or "map"
            
            var gameState by remember { mutableStateOf<GameState?>(null) }
            var yourPlayerId by remember { mutableStateOf("") }
            var wsError by remember { mutableStateOf("") }
            var activeFight by remember { mutableStateOf<GameEvent.FightOccurred?>(null) }
            var activePopups by remember { mutableStateOf<List<PopupEvent>>(emptyList()) }
            var activeNatureEvents by remember { mutableStateOf<List<GameEvent.NatureEventOccurred>>(emptyList()) }
            var activeTransfers by remember { mutableStateOf<List<GameEvent.ResourceTransferred>>(emptyList()) }
            
            var victoryAcknowledged by remember { mutableStateOf(false) }
            var observingPlayPvE by remember { mutableStateOf(false) }
            var mapFullscreen by remember { mutableStateOf(false) }
            LaunchedEffect(gameState?.status) {
                if (gameState?.status == models.GameStatus.GAME_OVER) {
                    victoryAcknowledged = false
                }
            }
            
            val ws = remember {
                GameWebSocket(
                    onStateUpdated = { newState, playerId ->
                        gameState = newState
                        yourPlayerId = playerId
                        wsError = ""
                        if (newState.status == models.GameStatus.IN_PROGRESS && newState.players.any { it.id == playerId }) {
                            observingPlayPvE = false
                        }
                    },
                    onError = { err ->
                        wsError = err
                    },
                    onFightOccurred = { fightEvent ->
                        activeFight = fightEvent
                        val winnerChar = gameState?.characters?.find { it.id == fightEvent.winnerId }
                        val loserChar = gameState?.characters?.find { it.id == fightEvent.loserId }
                        val winnerName = winnerChar?.name ?: "Victor"
                        val loserName = loserChar?.name ?: "Enemy"
                        val casualtyInfo = if (fightEvent.winnerLosses > 0) t("popup.casualties_lost", fightEvent.winnerLosses) else t("popup.no_casualties")
                        val strategyLabel = when (fightEvent.strategy) {
                            models.BattleStrategy.ARCANE_PHALANX -> " 🛡️ " + t("battle.strat_phalanx")
                            models.BattleStrategy.HAMMER_AND_SPELL -> " ⚔️ " + t("battle.strat_hammer")
                            models.BattleStrategy.SPELL_INFUSED_VOLLEY -> " 🔥 " + t("battle.strat_volley")
                            else -> ""
                        }
                        
                        activePopups = activePopups + PopupEvent(
                            title = t("popup.battle_report"),
                            icon = "⚔️",
                            message = t("popup.battle_message", fightEvent.sectorId, winnerName, loserName, casualtyInfo, strategyLabel),
                            colorClass = "text-red"
                        )
                        
                        scope.launch {
                            delay(3500)
                            if (activeFight == fightEvent) {
                                activeFight = null
                            }
                        }
                    },
                    onScrollFound = { event ->
                        val scrollTypeName = when (event.scroll.type) {
                            models.ScrollType.WARLORD -> t("scroll.warlord")
                            models.ScrollType.INTELLECT -> t("scroll.intellect")
                            models.ScrollType.VANGUARD -> t("scroll.vanguard")
                            models.ScrollType.ARCHON -> t("scroll.archon")
                        }
                        activePopups = activePopups + PopupEvent(
                            title = t("popup.scroll_found_title"),
                            icon = "📜",
                            message = t("popup.scroll_found_msg", event.characterName, scrollTypeName, event.scroll.boostAmount),
                            colorClass = "text-primary"
                        )
                    },
                    onScrollSearchFailed = { event ->
                        activePopups = activePopups + PopupEvent(
                            title = t("popup.scroll_failed_title"),
                            icon = "🔍",
                            message = t("popup.scroll_failed_msg", event.characterName),
                            colorClass = "text-gray"
                        )
                    },
                    onNatureEvent = { event ->
                        activeNatureEvents = activeNatureEvents + event
                    },
                    onResourceTransferred = { event ->
                        activeTransfers = activeTransfers + event
                        scope.launch {
                            delay(4000)
                            activeTransfers = activeTransfers.filter { it != event }
                        }
                    }
                )
            }
            
            LaunchedEffect(currentTab, currentUser) {
                if (currentTab == "map" && currentUser != null) {
                    ws.connect()
                }
            }
            
            // Fetch initial state
            scope.launch {
                try {
                    currentUser = appService.getCurrentUser()
                    if (currentUser != null) {
                        notes = appService.getNotes()
                        discussions = appService.getDiscussions()
                    }
                } catch (e: Exception) {
                    // Not logged in — show login page
                    currentUser = null
                }
            }

            // Navbar — hidden in fullscreen map mode
            if (!mapFullscreen) {
                nav(className = "navbar glass") {
                    div(className = "navbar-brand") {
                        textNode(t("nav.brand"))
                    }
                    div(className = "d-flex items-center gap-20") {
                        // Language Switcher
                        div(className = "d-flex items-center gap-05") {
                            val activeLang = I18n.currentLanguage.value
                            button("EN", className = "btn btn-xs language-btn ${if (activeLang == Language.EN) "btn-primary" else "glass"}") {
                                title("Switch to English")
                                onClick { I18n.setLanguage(Language.EN) }
                            }
                            button("ΕΛ", className = "btn btn-xs language-btn ${if (activeLang == Language.EL) "btn-primary" else "glass"}") {
                                title("Αλλαγή σε Ελληνικά")
                                onClick { I18n.setLanguage(Language.EL) }
                            }
                            button("RU", className = "btn btn-xs language-btn ${if (activeLang == Language.RU) "btn-primary" else "glass"}") {
                                title("Переключить на Русский")
                                onClick { I18n.setLanguage(Language.RU) }
                            }
                        }

                        if (currentUser != null) {
                            span { textNode(t("nav.welcome", currentUser?.name ?: "")) }
                            a(href = "/logout", className = "btn btn-primary text-none") {
                                textNode(t("nav.logout"))
                            }
                        } else {
                            a(href = "/login", className = "btn btn-primary text-none") {
                                textNode(t("nav.login_google"))
                            }
                            a(href = "/auth/twitter", className = "btn btn-primary text-none") {
                                textNode(t("nav.login_twitter"))
                            }
                        }
                    }
                }
            }

            // Main Content
            div(className = if (mapFullscreen) "container container-fullscreen" else "container") {
                if (currentUser == null) {
                    div(className = "glass card text-center p-4") {
                        h2 { textNode(t("notes.title")) }
                        p(className = "text-gray") { 
                            textNode(t("notes.desc"))
                        }
                    }
                } else {
                    // Tabs — hidden in fullscreen map mode
                    if (!mapFullscreen) {
                        div(className = "d-flex gap-1 mb-2") {
                            button(t("nav.tab_notes"), className = "btn ${if (currentTab == "notes") "btn-primary" else "glass"}") {
                                onClick { currentTab = "notes" }
                            }
                            button(t("nav.tab_discussions"), className = "btn ${if (currentTab == "discussions") "btn-primary" else "glass"}") {
                                onClick { currentTab = "discussions" }
                            }
                            button(t("nav.tab_map"), className = "btn ${if (currentTab == "map") "btn-primary" else "glass"}") {
                                onClick { currentTab = "map" }
                            }
                            button(t("nav.tab_history"), className = "btn ${if (currentTab == "history") "btn-primary" else "glass"}") {
                                onClick { currentTab = "history" }
                            }
                        }
                    }
                    
                    if (currentTab == "notes") {
                        div {
                            // Note Form
                            div(className = "glass card mb-2") {
                                h3 { textNode(t("notes.add_note")) }
                                var title by remember { mutableStateOf("") }
                                var content by remember { mutableStateOf("") }
                                
                                div(className = "d-flex flex-col gap-1") {
                                    text(value = title, placeholder = t("notes.title_placeholder"), className = "") {
                                        onInput { title = this.value ?: "" }
                                    }
                                    textArea(value = content, rows = 4, placeholder = t("notes.content_placeholder"), className = "") {
                                        onInput { content = this.value ?: "" }
                                    }
                                    button(t("notes.save_note"), className = "btn btn-primary self-start") {
                                        onClick {
                                            if (title.isNotBlank() && content.isNotBlank()) {
                                                scope.launch {
                                                    val note = appService.saveNote(title, content)
                                                    notes = listOf(note) + notes
                                                    title = ""
                                                    content = ""
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            
                            // Notes Grid
                            div(className = "grid") {
                                for (note in notes) {
                                    div(className = "glass card") {
                                        h4(className = "m-0") { textNode(note.title) }
                                        p(className = "text-md text-gray") { 
                                            textNode(note.content)
                                        }
                                        button(t("notes.delete"), className = "btn bg-red-light text-red text-sm btn-delete mt-1") {
                                            onClick {
                                                scope.launch {
                                                    if (appService.deleteNote(note.id)) {
                                                        notes = notes.filter { it.id != note.id }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (currentTab == "discussions") {
                        // Discussions Tab
                        div {
                            div(className = "glass card mb-2") {
                                h3 { textNode(t("notes.join_discussion")) }
                                var content by remember { mutableStateOf("") }
                                
                                div(className = "d-flex flex-col gap-1") {
                                    textArea(value = content, rows = 3, placeholder = t("notes.mind_placeholder"), className = "") {
                                        onInput { content = this.value ?: "" }
                                    }
                                    button(t("notes.post"), className = "btn btn-primary self-start") {
                                        onClick {
                                            if (content.isNotBlank()) {
                                                scope.launch {
                                                    val post = appService.postDiscussion(content)
                                                    discussions = listOf(post) + discussions
                                                    content = ""
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            
                            // Discussion Feed
                            div(className = "d-flex flex-col gap-1") {
                                for (post in discussions) {
                                    div(className = "glass card") {
                                        div(className = "d-flex justify-between") {
                                            span(className = "font-600 text-primary") { 
                                                textNode(post.authorName)
                                            }
                                            span(className = "text-sm text-dark-gray") { 
                                                textNode(t("notes.just_now"))
                                            }
                                        }
                                        p(className = "mt-05") { 
                                            textNode(post.content)
                                        }
                                    }
                                }
                            }
                        }
                    } else if (currentTab == "map") {
                        // War Map Tab
                        val isObserver = gameState != null &&
                            (gameState!!.status == models.GameStatus.IN_PROGRESS || gameState!!.status == models.GameStatus.GAME_OVER) &&
                            gameState!!.players.none { it.id == yourPlayerId }

                        if (wsError.isNotBlank()) {
                            div(className = "glass card text-center p-4") {
                                h3(className = "text-red m-0") { textNode(t("app.conn_error")) }
                                p { textNode(wsError) }
                                button(t("app.reconnect"), className = "btn btn-primary mt-1") {
                                    onClick {
                                        wsError = ""
                                        gameState = null
                                    }
                                }
                            }
                        } else if (gameState == null || gameState!!.status == models.GameStatus.LOBBY || gameState!!.status == models.GameStatus.NOT_CREATED) {
                            GameLobby(ws = ws, gameState = gameState, yourPlayerId = yourPlayerId)
                        } else if (isObserver && observingPlayPvE) {
                            GameLobby(
                                ws = ws,
                                gameState = null,
                                yourPlayerId = yourPlayerId,
                                initialCreatingPvE = true,
                                onCancelPvE = { observingPlayPvE = false }
                            )
                        } else {
                            var selectedCharacterId by remember { mutableStateOf<String?>(null) }
                            
                            var showMarket by remember { mutableStateOf(false) }
                            var showRecruitment by remember { mutableStateOf(false) }
                            var panelOpen by remember { mutableStateOf(false) }
                            
                            if (!mapFullscreen) {
                                if (isObserver) {
                                    div(className = "glass card p-2 mb-1 d-flex justify-between items-center flex-wrap gap-1 border-yellow") {
                                        div(className = "d-flex items-center gap-1") {
                                            span(className = "text-xl") { textNode("👁️") }
                                            div {
                                                h4(className = "m-0 text-yellow") { textNode(t("lobby.observing_notice")) }
                                                p(className = "m-0 text-sm text-gray") { textNode(t("lobby.observing_desc")) }
                                            }
                                        }
                                        button(t("lobby.play_pve_independent"), className = "btn bg-yellow text-dark-gray font-600") {
                                            onClick {
                                                observingPlayPvE = true
                                            }
                                        }
                                    }
                                }
                                
                                TurnHud(
                                    playerId = yourPlayerId, 
                                    gameState = gameState, 
                                    onOpenMarket = { showMarket = true },
                                    onOpenRecruitment = { showRecruitment = true },
                                    sendAction = { ws.sendAction(it) }
                                )
                            }
                            
                            // Scroll notification popup is handled via activePopups
                            
                            if (showMarket) {
                                MarketPanel(
                                    playerId = yourPlayerId,
                                    gameState = gameState!!,
                                    selectedCharacterId = selectedCharacterId,
                                    onClose = { showMarket = false },
                                    sendAction = { ws.sendAction(it) }
                                )
                            }
                            
                            if (showRecruitment) {
                                ArmyRecruitmentPanel(
                                    playerId = yourPlayerId,
                                    gameState = gameState!!,
                                    selectedCharacterId = selectedCharacterId,
                                    onClose = { showRecruitment = false },
                                    sendAction = { ws.sendAction(it) }
                                )
                            }
                            
                            // Mobile panel backdrop overlay
                            div(className = "panel-backdrop${if (panelOpen) " panel-backdrop-visible" else ""}") {
                                onClick { panelOpen = false }
                            }
                            
                            // Mobile panel toggle button (floating action button)
                            button(className = "panel-toggle-btn${if (panelOpen) " panel-btn-active" else ""}") {
                                textNode(if (panelOpen) "✕" else "⚔️")
                                onClick { panelOpen = !panelOpen }
                            }
                            
                            // Fullscreen map mode: floating compact HUD
                            if (mapFullscreen) {
                                div(className = "fullscreen-hud") {
                                    val myPlayer = gameState?.players?.find { it.id == yourPlayerId }
                                    val isMyTurn = gameState?.activeTeamTurn == myPlayer?.team
                                    val turnClass = if (isMyTurn) "turn-active" else "turn-waiting"
                                    span(className = "turn-indicator $turnClass") {}
                                    if (isMyTurn) {
                                        val teamName = myPlayer?.team?.let { gameState?.teamInfos?.get(it)?.name } ?: t("hud.your_team")
                                        span(className = "text-sm font-600 text-primary") { textNode(teamName) }
                                    } else {
                                        span(className = "text-sm text-gray") { textNode(t("hud.enemy_team")) }
                                    }
                                    span(className = "text-xs text-dark-gray") { 
                                        textNode(" · T${gameState?.currentTurn ?: 1}/${gameState?.maxTurns ?: "?"}") 
                                    }
                                    button("⚔️", className = "btn btn-xs glass fullscreen-hud-btn") {
                                        title(t("char.your_heroes"))
                                        onClick { panelOpen = !panelOpen }
                                    }
                                }
                            }
                            
                            // Fullscreen toggle button — always visible during gameplay
                            button(className = "fullscreen-toggle-btn") {
                                textNode(if (mapFullscreen) "✕" else "🗺️")
                                title(if (mapFullscreen) "Exit fullscreen" else "Fullscreen map")
                                onClick { 
                                    mapFullscreen = !mapFullscreen
                                    if (!mapFullscreen) panelOpen = false
                                }
                            }
                            
                            div(className = if (mapFullscreen) "war-map-layout war-map-fullscreen" else "war-map-layout") {
                                if (!mapFullscreen) {
                                    CharacterPanel(
                                        playerId = yourPlayerId, 
                                        gameState = gameState, 
                                        selectedCharacterId = selectedCharacterId,
                                        onSelectCharacter = { selectedCharacterId = it },
                                        sendAction = { ws.sendAction(it) },
                                        panelOpen = panelOpen
                                    )
                                } else {
                                    // In fullscreen mode, CharacterPanel is a sliding drawer
                                    CharacterPanel(
                                        playerId = yourPlayerId, 
                                        gameState = gameState, 
                                        selectedCharacterId = selectedCharacterId,
                                        onSelectCharacter = { selectedCharacterId = it },
                                        sendAction = { ws.sendAction(it) },
                                        panelOpen = panelOpen
                                    )
                                }
                                StrategicMap(
                                    playerId = yourPlayerId, 
                                    gameState = gameState, 
                                    selectedCharacterId = selectedCharacterId,
                                    onSelectCharacter = { selectedCharacterId = it },
                                    activeFight = activeFight,
                                    activeNatureEvents = activeNatureEvents,
                                    activeTransfers = activeTransfers,
                                    sendAction = { ws.sendAction(it) }
                                )
                            }
                            
                            if (!mapFullscreen) {
                                KingdomOverviewPanel(
                                    playerId = yourPlayerId,
                                    gameState = gameState,
                                    onSelectCharacter = { selectedCharacterId = it },
                                    sendAction = { ws.sendAction(it) }
                                )
                            }
                        }
                    } else if (currentTab == "history") {
                        // Game History Tab
                        GameHistoryPanel(appService = appService)
                    }
                    
                    if (activePopups.isNotEmpty()) {
                        val currentPopup = activePopups.first()
                        EventPopupModal(
                            event = currentPopup,
                            onClose = {
                                activePopups = activePopups.filter { it != currentPopup }
                            }
                        )
                    }
                    
                    if (activeNatureEvents.isNotEmpty()) {
                        val currentEvent = activeNatureEvents.first()
                        NatureEventModal(
                            event = currentEvent,
                            gameState = gameState,
                            onClose = {
                                activeNatureEvents = activeNatureEvents.filter { it != currentEvent }
                            }
                        )
                    }
                    
                    if (gameState != null && gameState!!.status == models.GameStatus.GAME_OVER && !victoryAcknowledged) {
                        VictoryPopupModal(
                            gameState = gameState!!,
                            onClose = { victoryAcknowledged = true }
                        )
                    }
                }
            }
        }
    }
}

fun main() {
    startApplication(::App)
}
