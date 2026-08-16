import re

files_to_fix = [
    "src/jsMain/kotlin/components/KingdomOverviewPanel.kt",
    "src/jsMain/kotlin/components/StrategicMap.kt"
]

for filename in files_to_fix:
    with open(filename, "r") as f:
        content = f.read()
    
    # Replace all .soldiers with .army.total()
    content = content.replace(".soldiers", ".army.total()")
    
    with open(filename, "w") as f:
        f.write(content)

print("Fixed KingdomOverviewPanel and StrategicMap.")
