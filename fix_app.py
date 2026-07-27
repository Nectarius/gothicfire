import re

with open('src/jsMain/kotlin/App.kt', 'r') as f:
    content = f.read()

# Replace states
content = re.sub(r'var (.*?) by state\((.*?)\)', r'var \1 by remember { mutableStateOf(\2) }', content)

# Imports
imports = """import androidx.compose.runtime.remember
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.setValue
import dev.kilua.rpc.getRpcService
import dev.kilua.form.text.text
import dev.kilua.form.text.textArea
import dev.kilua.html.helpers.setStyle
"""
content = content.replace("import dev.kilua.compose.root\n", imports + "import dev.kilua.compose.root\n")

# Replace styling
content = re.sub(r'display\(dev\.kilua\.html\.Display\.Flex\)', 'setStyle("display", "flex")', content)
content = re.sub(r'flexDirection\(dev\.kilua\.html\.FlexDirection\.Column\)', 'setStyle("flex-direction", "column")', content)
content = re.sub(r'alignItems\(dev\.kilua\.html\.AlignItems\.Center\)', 'setStyle("align-items", "center")', content)
content = re.sub(r'alignSelf\(dev\.kilua\.html\.AlignSelf\.FlexStart\)', 'setStyle("align-self", "flex-start")', content)
content = re.sub(r'justifyContent\(dev\.kilua\.html\.JustifyContent\.SpaceBetween\)', 'setStyle("justify-content", "space-between")', content)
content = re.sub(r'textAlign\(dev\.kilua\.html\.TextAlign\.Center\)', 'setStyle("text-align", "center")', content)
content = re.sub(r'textDecoration\(dev\.kilua\.html\.TextDecoration\.None\)', 'setStyle("text-decoration", "none")', content)

content = re.sub(r'gap\((.*?)\.rem\)', r'setStyle("gap", "\1rem")', content)
content = re.sub(r'gap\((.*?)\.px\)', r'setStyle("gap", "\1px")', content)
content = re.sub(r'margin\((.*?)\.px\)', r'setStyle("margin", "\1px")', content)
content = re.sub(r'marginBottom\((.*?)\.rem\)', r'setStyle("margin-bottom", "\1rem")', content)
content = re.sub(r'marginTop\((.*?)\.rem\)', r'setStyle("margin-top", "\1rem")', content)
content = re.sub(r'padding\((.*?)\.rem\)', r'setStyle("padding", "\1rem")', content)
content = re.sub(r'padding\("(.*?)"\)', r'setStyle("padding", "\1")', content)
content = re.sub(r'fontSize\((.*?)\.rem\)', r'setStyle("font-size", "\1rem")', content)
content = re.sub(r'fontWeight\((.*?)\)', r'setStyle("font-weight", "\1")', content)

content = re.sub(r'color\(dev\.kilua\.html\.Color\.hex\("(.*?)"\)\)', r'setStyle("color", "\1")', content)
content = re.sub(r'color\(dev\.kilua\.html\.Color\.name\("(.*?)"\)\)', r'setStyle("color", "\1")', content)
content = re.sub(r'background\("(.*?)"\)', r'setStyle("background", "\1")', content)

# Fix strings
content = content.replace('+note.title', 'textNode(note.title)')
content = content.replace('+note.content', 'textNode(note.content)')
content = content.replace('+post.authorName', 'textNode(post.authorName)')
content = content.replace('+post.content', 'textNode(post.content)')

with open('src/jsMain/kotlin/App.kt', 'w') as f:
    f.write(content)
