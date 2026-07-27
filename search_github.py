import urllib.request
import json
req = urllib.request.Request("https://api.github.com/search/code?q=RpcServiceManager+repo:rjaros/kilua")
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        for item in data.get("items", []):
            print(item["path"])
except Exception as e:
    print(e)
