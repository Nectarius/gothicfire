import dev.kilua.html.*
import dev.kilua.compose.root

fun test() {
    root("test") {
        rawHtml("<style> .d-flex { display: flex; } </style>")
    }
}
