import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
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
import game.GameWebSocket
import kotlinx.coroutines.launch
import kotlinx.coroutines.delay
import models.GameEvent

class App : Application() {
    private val appService = getService<AppService>()
    private val scope = kotlinx.coroutines.MainScope()

    override fun start() {
        root("root") {
            rawHtml("""<style>
                .d-flex { display: flex; }
                .flex-col { flex-direction: column; }
                .items-center { align-items: center; }
                .gap-1 { gap: 1rem; }
                .gap-20 { gap: 20px; }
                .justify-between { justify-content: space-between; }
                .text-center { text-align: center; }
                .p-4 { padding: 4rem; }
                .mb-2 { margin-bottom: 2rem; }
                .mt-1 { margin-top: 1rem; }
                .mt-05 { margin-top: 0.5rem; }
                .m-0 { margin: 0; }
                .text-gray { color: #D3D3D3; }
                .text-dark-gray { color: #808080; }
                .text-red { color: #ef4444; }
                .bg-red-light { background: rgba(239, 68, 68, 0.2); }
                .font-600 { font-weight: 600; }
                .text-sm { font-size: 0.8rem; }
                .text-md { font-size: 0.9rem; }
                .btn-delete { padding: 0.3rem 0.8rem; }
                .self-start { align-self: flex-start; }
                .text-none { text-decoration: none; }
                .text-primary { color: var(--primary); }
            </style>""")
            
            var currentUser: UserSession? by remember { mutableStateOf(null) }
            var notes by remember { mutableStateOf(emptyList<Note>()) }
            var discussions by remember { mutableStateOf(emptyList<Discussion>()) }
            var currentTab by remember { mutableStateOf("map") } // "notes", "discussions", or "map"
            
            var gameState by remember { mutableStateOf<GameState?>(null) }
            var yourPlayerId by remember { mutableStateOf("") }
            var wsError by remember { mutableStateOf("") }
            var activeFight by remember { mutableStateOf<GameEvent.FightOccurred?>(null) }
            
            val ws = remember {
                GameWebSocket(
                    onStateUpdated = { newState, playerId ->
                        gameState = newState
                        yourPlayerId = playerId
                        wsError = ""
                    },
                    onError = { err ->
                        wsError = err
                    },
                    onFightOccurred = { fightEvent ->
                        activeFight = fightEvent
                        scope.launch {
                            delay(2500)
                            if (activeFight == fightEvent) {
                                activeFight = null
                            }
                        }
                    }
                )
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

            // Navbar
            nav(className = "navbar glass") {
                div(className = "navbar-brand") {
                    textNode("Kilua Notes")
                }
                div(className = "d-flex items-center gap-20") {
                    if (currentUser != null) {
                        span { textNode("Welcome, ${currentUser?.name}") }
                        a(href = "/logout", className = "btn btn-primary text-none") {
                            textNode("Logout")
                        }
                    } else {
                        a(href = "/login", className = "btn btn-primary text-none") {
                            textNode("Login with Google")
                        }
                        a(href = "/auth/twitter", className = "btn btn-primary text-none") {
                            textNode("Login with X/Twitter")
                        }
                    }
                }
            }

            // Main Content
            div(className = "container") {
                if (currentUser == null) {
                    div(className = "glass card text-center p-4") {
                        h2 { textNode("Secure Notes & Global Discussions") }
                        p(className = "text-gray") { 
                            textNode("Login to create your private notes and participate in the community discussion.")
                        }
                    }
                } else {
                    // Tabs
                    div(className = "d-flex gap-1 mb-2") {
                        button("Private Notes", className = "btn ${if (currentTab == "notes") "btn-primary" else "glass"}") {
                            onClick { currentTab = "notes" }
                        }
                        button("Public Discussion", className = "btn ${if (currentTab == "discussions") "btn-primary" else "glass"}") {
                            onClick { currentTab = "discussions" }
                        }
                        button("War Map", className = "btn ${if (currentTab == "map") "btn-primary" else "glass"}") {
                            onClick { currentTab = "map" }
                        }
                    }
                    
                    if (currentTab == "notes") {
                        div {
                            // Note Form
                            div(className = "glass card mb-2") {
                                h3 { textNode("Add Note") }
                                var title by remember { mutableStateOf("") }
                                var content by remember { mutableStateOf("") }
                                
                                div(className = "d-flex flex-col gap-1") {
                                    text(value = title, placeholder = "Title", className = "") {
                                        onInput { title = this.value ?: "" }
                                    }
                                    textArea(value = content, rows = 4, placeholder = "Content", className = "") {
                                        onInput { content = this.value ?: "" }
                                    }
                                    button("Save Note", className = "btn btn-primary self-start") {
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
                                        button("Delete", className = "btn bg-red-light text-red text-sm btn-delete mt-1") {
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
                                h3 { textNode("Join the discussion") }
                                var content by remember { mutableStateOf("") }
                                
                                div(className = "d-flex flex-col gap-1") {
                                    textArea(value = content, rows = 3, placeholder = "What's on your mind?", className = "") {
                                        onInput { content = this.value ?: "" }
                                    }
                                    button("Post", className = "btn btn-primary self-start") {
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
                                                textNode("Just now")
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
                        if (wsError.isNotBlank()) {
                            div(className = "glass card text-center p-4") {
                                h3(className = "text-red m-0") { textNode("Connection Error") }
                                p { textNode(wsError) }
                                button("Reconnect", className = "btn btn-primary mt-1") {
                                    onClick {
                                        wsError = ""
                                        gameState = null
                                    }
                                }
                            }
                        } else if (gameState == null || gameState!!.status == models.GameStatus.LOBBY) {
                            GameLobby(ws = ws, gameState = gameState, yourPlayerId = yourPlayerId)
                        } else {
                            TurnHud(playerId = yourPlayerId, gameState = gameState, sendAction = { ws.sendAction(it) })
                            
                            div(className = "war-map-layout") {
                                CharacterPanel(
                                    playerId = yourPlayerId, 
                                    gameState = gameState, 
                                    sendAction = { ws.sendAction(it) }
                                )
                                StrategicMap(
                                    playerId = yourPlayerId, 
                                    gameState = gameState, 
                                    activeFight = activeFight,
                                    sendAction = { ws.sendAction(it) }
                                )
                            }
                        }
                    }
                }
            }
        }
    }
}

fun main() {
    startApplication(::App)
}
