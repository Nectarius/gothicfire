# Gothic Fire: Map Locations & Territories Summary

This document provides a comprehensive summary of all strategic sectors and territories defined in [MapData.kt](file:///home/eudialyte/workspaces/gothic_fire/gothic_fire/gothicfire/src/commonMain/kotlin/models/MapData.kt). It covers the full location inventory, network topology, runtime systems integration, and a complete technical guide on how any aspect of the map can be adjusted or expanded.

---

## 1. Executive Summary & Graph Overview

- **Total Locations**: **55 sectors** (IDs `"0"` through `"54"`). All 55 sectors feature authentic *Gothic 2* lore names, individual base protection, and distinct base cultivation values.
- **Coordinate Space**: Normalized against the 1205 × 1095 pixel background image (`/gothic_fire_map.png`).
  - X coordinate range: `143` to `1066` ($11.9\%$ to $88.5\%$)
  - Y coordinate range: `144` to `1038` ($13.2\%$ to $94.8\%$)
- **Selectable Castles / Strongholds**: **4 Castles** positioned across the four compass points of Khorinis:
  - **Sector 14**: `"City of Khorinis"` (West Coast, Royal Paladin & Militia Capital)
  - **Sector 23**: `"Onar's Farm"` (East Basin, Mercenary & Landowner Stronghold)
  - **Sector 7**: `"Monastery of Innos"` (North Coast, Highland Sanctuary of Fire Mages)
  - **Sector 52**: `"Fortress of the Pass"` (Ruins & Pass, Southern Mountain Citadel at Minental Pass)
- **Economy & Yield Dynamics**:
  - **Base Cultivation**: Determines agricultural yield. End of turn food gain = `(cultivation / 2).coerceAtLeast(1)` + 1 gold.
  - **Breadbaskets (Cultivation 17-18 -> 8-9 Food/turn)**: Lobart's Farm (`15`), Akil's Farm (`20`), Sekob's Farm (`17`), Bodo's Wheatfields (`30`), Bengar's Farm (`35`).
  - **Wildlands / Mines (Cultivation 3-6 -> 1-3 Food/turn)**: Mines (`51`, `53`), Golem Defile (`47`), Black Troll Gorge (`2`), Misty Cliffs (`9`).
- **Recruitment & Defense Dynamics**:
  - **Recruitment Gates**: Light Infantry (`0`), Archers (`10`), Heavy Infantry (`20`), Mages (`30`).
  - **Archer-Ready Bastions (Base Protection 11-16)**: East Gate (`11`), Harbor (`25`), Dead Harpy (`21`), Dexter's Watchtower (`31`), Ancient Pyramids (`43`), Paladin Barricade (`50`), Jharkendar Portal (`45`).
- **Network Topology**:
  - **Edges**: 100 undirected connections (200 symmetric directed pairs).
  - **Connectivity**: 100% connected graph (1 single connected component).
  - **Degree Distribution**: Min = 1, Max = 7, Average = 3.64 connections per sector.
  - **Major Hubs (Degree 6–7)**: Sector `21` (Dead Harpy Inn, 7), Sector `33` (Gaan's Crossroads, 7), Sector `31` (Dexter's Watchtower, 6), Sector `42` (Minental Ridge, 6).

---

## 2. Complete Inventory of All 55 Sectors

| ID | Gothic 2 Name | Type | X | Y | X% | Y% | Deg | Adjacent Sectors | Base Prot | Base Cult | Food/Turn | Tactical Role & Lore Description |
|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---|:---:|:---:|:---:|:---|
| **0** | Jack's Lighthouse | Territory | 288 | 144 | 23.9% | 13.2% | 1 | 3 | 11 | 6 | 3 🌾 | North Coast cliff tower (Dead-end, Archer-ready) |
| **1** | Northern Grimwald | Territory | 501 | 165 | 41.6% | 15.1% | 3 | 2, 3, 5 | 7 | 8 | 4 🌾 | Dense northern hunting woods |
| **2** | Black Troll Gorge | Territory | 634 | 176 | 52.6% | 16.1% | 3 | 1, 5, 7 | 12 | 4 | 2 🌾 | Grimbald's northern lake and Black Troll lair |
| **3** | Niclas's Overlook | Territory | 410 | 185 | 34.0% | 16.9% | 5 | 0, 1, 4, 5, 12 | 9 | 7 | 3 🌾 | High cliffside hunter's lookout above the lighthouse trail |
| **4** | Vinno's Hollow | Territory | 475 | 291 | 39.4% | 26.6% | 4 | 3, 5, 6, 12 | 7 | 9 | 4 🌾 | Forest depression between northern road and Sun Circle |
| **5** | Circle of the Sun | Territory | 555 | 245 | 46.1% | 22.4% | 5 | 1, 2, 3, 4, 7 | 12 | 8 | 4 🌾 | Sacred stone circle for the Eye of Innos ritual |
| **6** | Northgate Woods | Territory | 493 | 364 | 40.9% | 33.2% | 3 | 4, 12, 16 | 7 | 10 | 5 🌾 | Timber forest ridge north of city crossroads |
| **7** | **Monastery of Innos** | **Castle** | 647 | 318 | 53.7% | 29.0% | 4 | 2, 5, 8, 13 | 20 | 14 | 7 🌾 | Northern Castle: Cliffside sanctuary & winery of Fire Mages |
| **8** | Snapper Gorge | Territory | 759 | 328 | 63.0% | 30.0% | 2 | 7, 9 | 8 | 5 | 2 🌾 | Deep canyon below Monastery prowled by snappers |
| **9** | Misty Cliffs | Territory | 852 | 315 | 70.7% | 28.8% | 2 | 8, 10 | 10 | 4 | 2 🌾 | Wind-swept northeastern coastal crags |
| **10** | Shipwreck Cove | Territory | 940 | 332 | 78.0% | 30.3% | 2 | 9, 19 | 6 | 6 | 3 🌾 | Far eastern beach with wreckage & fire lizards |
| **11** | Khorinis East Gate | Territory | 221 | 411 | 18.3% | 37.5% | 2 | 14, 15 | 14 | 10 | 5 🌾 | Militia-guarded gatehouse & moat defending north road |
| **12** | Canthar's Crossroads | Territory | 425 | 382 | 35.3% | 34.9% | 5 | 3, 4, 6, 15, 16 | 6 | 11 | 5 🌾 | Main road junction linking City, Lobart, and Akil |
| **13** | Monastery Bridge | Territory | 644 | 408 | 53.4% | 37.3% | 5 | 7, 16, 17, 21, 22 | 11 | 10 | 5 🌾 | Stone river bridge by Isgaroth's Shrine of Innos |
| **14** | **City of Khorinis** | **Castle** | 150 | 448 | 12.4% | 40.9% | 3 | 11, 25, 26 | 20 | 14 | 7 🌾 | Western Castle: Royal port city & Paladin headquarters |
| **15** | Lobart's Farm | Territory | 362 | 429 | 30.0% | 39.2% | 3 | 11, 12, 20 | 6 | 18 | 9 🌾 | Fertile farmstead outside South Gate; western breadbasket |
| **16** | Erol's Bridge | Territory | 551 | 427 | 45.7% | 39.0% | 4 | 6, 12, 13, 21 | 8 | 10 | 5 🌾 | Merchant road & stone bridge north of Dead Harpy Inn |
| **17** | Sekob's Farm | Territory | 754 | 466 | 62.6% | 42.6% | 5 | 13, 18, 22, 23, 24 | 7 | 17 | 8 🌾 | Northern tenant farmstead on Onar's fertile estate |
| **18** | Crypt of Inubis | Territory | 871 | 466 | 72.3% | 42.6% | 3 | 17, 19, 24 | 11 | 4 | 2 🌾 | Ancient Lord Inubis tomb & undead woods behind Sekob |
| **19** | Sagitta's Grove | Territory | 918 | 420 | 76.2% | 38.4% | 2 | 10, 18 | 9 | 13 | 6 🌾 | Secluded eastern forest sanctuary of the herbalist healer |
| **20** | Akil's Farm | Territory | 426 | 515 | 35.4% | 47.0% | 5 | 15, 21, 27, 28, 29 | 7 | 17 | 8 🌾 | Highland wheat farm atop stone stairway east of City |
| **21** | The Dead Harpy Inn | Territory | 589 | 521 | 48.9% | 47.6% | 7 | 13, 16, 20, 22, 29, 30, 33 | 12 | 14 | 7 🌾 | Orlan's fortified tavern at 7-way central crossroads |
| **22** | Crossroads Graveyard | Territory | 652 | 486 | 54.1% | 44.4% | 5 | 13, 17, 21, 23, 30 | 8 | 9 | 4 🌾 | Old cemetery & road leading from tavern to Onar's estate |
| **23** | **Onar's Farm** | **Castle** | 722 | 512 | 59.9% | 46.8% | 5 | 17, 22, 24, 30, 31 | 20 | 14 | 7 🌾 | Eastern Castle: Wealthy landowner estate & Mercenary HQ |
| **24** | Mercenary Grounds | Territory | 842 | 525 | 69.9% | 47.9% | 4 | 17, 18, 23, 31 | 12 | 15 | 7 🌾 | Lee's mercenary muster field & Pepe's sheep pastures |
| **25** | Khorinis Harbor | Territory | 143 | 559 | 11.9% | 51.1% | 2 | 14, 26 | 12 | 15 | 7 🌾 | Port docks, sea wall, fish market, & Esmeralda berth |
| **26** | Smugglers' Beach | Territory | 254 | 575 | 21.1% | 52.5% | 3 | 14, 25, 27 | 8 | 6 | 3 🌾 | South coast cliff trail & bandit sea cave |
| **27** | Cavalorn's Valley | Territory | 345 | 589 | 28.6% | 53.8% | 3 | 20, 26, 28 | 9 | 8 | 4 🌾 | Sheltered ravine & camp on road from Xardas's tower |
| **28** | Bandit Bridge | Territory | 434 | 597 | 36.0% | 54.5% | 5 | 20, 27, 29, 32, 35 | 10 | 8 | 4 🌾 | Wooden bridge & watchpost south of Akil's ridge |
| **29** | Dragomir's Camp | Territory | 544 | 560 | 45.1% | 51.1% | 5 | 20, 21, 28, 32, 33 | 6 | 11 | 5 🌾 | Open hunting meadow & shrine road south of Dead Harpy |
| **30** | Bodo's Wheatfields | Territory | 717 | 563 | 59.5% | 51.4% | 5 | 21, 22, 23, 31, 33 | 6 | 18 | 9 🌾 | Lush grain fields & marsh lake; eastern breadbasket |
| **31** | Dexter's Watchtower | Territory | 806 | 584 | 66.9% | 53.3% | 6 | 23, 24, 30, 33, 37, 42 | 16 | 5 | 2 🌾 | High cliffside bandit fortress overlooking Onar's valley |
| **32** | High Pasture Steps | Territory | 527 | 628 | 43.7% | 57.4% | 4 | 28, 29, 33, 36 | 10 | 8 | 4 🌾 | Stone stairway ascending to Bengar's high plateau |
| **33** | Gaan's Crossroads | Territory | 657 | 634 | 54.5% | 57.9% | 7 | 21, 29, 30, 31, 32, 36, 37 | 9 | 10 | 5 🌾 | Major 7-way southern junction outside High Pasture & Pass |
| **34** | West Pasture Rim | Territory | 356 | 705 | 29.5% | 64.4% | 2 | 35, 38 | 7 | 9 | 4 🌾 | Western highland bluff overlooking southern coast |
| **35** | Bengar's Farm | Territory | 450 | 718 | 37.3% | 65.6% | 3 | 28, 34, 36 | 7 | 17 | 8 🌾 | Highland sheep & grain farm feeding southern plateau |
| **36** | Refugee Waterfall | Territory | 567 | 714 | 47.1% | 65.2% | 4 | 32, 33, 35, 40 | 8 | 13 | 6 🌾 | Twin waterfalls & fertile river gorge beside Bengar |
| **37** | Bandit Overlook | Territory | 734 | 681 | 60.9% | 62.2% | 4 | 31, 33, 39, 42 | 13 | 5 | 2 🌾 | Fortified wooden watchtower on southern mountain trail |
| **38** | Western Crags | Territory | 280 | 737 | 23.2% | 67.3% | 2 | 34, 46 | 11 | 5 | 2 🌾 | Steep rocky mountain path descending from SW peaks |
| **39** | Troll Canyon | Territory | 716 | 754 | 59.4% | 68.9% | 3 | 37, 41, 42 | 12 | 4 | 2 🌾 | Narrow mountain canyon prowled by mountain trolls |
| **40** | Grom's Camp | Territory | 562 | 795 | 46.6% | 72.6% | 4 | 36, 41, 46, 47 | 8 | 10 | 5 🌾 | Southern lumberjack & hunter glade near mountain valley |
| **41** | Shadowbeast Woods | Territory | 658 | 817 | 54.6% | 74.6% | 5 | 39, 40, 42, 47, 48 | 9 | 7 | 3 🌾 | Deep forested basin in southern mountains |
| **42** | Minental Ridge | Territory | 784 | 771 | 65.1% | 70.4% | 6 | 31, 37, 39, 41, 43, 48 | 13 | 6 | 3 🌾 | 6-way ridge linking Dexter, Pyramids, and Pass |
| **43** | Ancient Pyramids | Territory | 843 | 823 | 70.0% | 75.2% | 3 | 42, 44, 50 | 14 | 6 | 3 🌾 | Stone Mayan-style pyramids of the ancient Builders |
| **44** | Mages' Excavation | Territory | 988 | 802 | 82.0% | 73.2% | 2 | 43, 45 | 12 | 8 | 4 🌾 | Water Mages' subterranean camp & temple dig site |
| **45** | Jharkendar Portal | Territory | 1057 | 838 | 87.7% | 76.5% | 3 | 44, 51, 53 | 16 | 6 | 3 🌾 | Fortified chamber housing teleporter portal to Jharkendar |
| **46** | Xardas's Valley | Territory | 407 | 853 | 33.8% | 77.9% | 4 | 38, 40, 47, 49 | 12 | 6 | 3 🌾 | Secluded southwestern mountain basin below Xardas's spire |
| **47** | Golem Defile | Territory | 612 | 862 | 50.8% | 78.7% | 4 | 40, 41, 46, 48 | 13 | 4 | 2 🌾 | Narrow stone canyon flanking southern mountain range |
| **48** | Pass Gorge | Territory | 680 | 895 | 56.4% | 81.7% | 4 | 41, 42, 47, 50 | 14 | 4 | 2 🌾 | Steep canyon choke point leading to Paladin barricade |
| **49** | Xardas's Tower | Territory | 468 | 918 | 38.8% | 83.8% | 1 | 46 | 18 | 6 | 3 🌾 | Necromancer's isolated bastion at SW peak (Dead-end) |
| **50** | Paladin Barricade | Territory | 775 | 918 | 64.3% | 83.8% | 3 | 43, 48, 52 | 16 | 5 | 2 🌾 | Fortified Paladin outpost guarding entrance to Valley Pass |
| **51** | Abandoned Mine Shaft | Territory | 1066 | 949 | 88.5% | 86.7% | 2 | 45, 53 | 13 | 3 | 1 🌾 | High mountain ore shaft overlooking the pass |
| **52** | **Fortress of the Pass** | **Castle** | 859 | 978 | 71.3% | 89.3% | 3 | 50, 53, 54 | 20 | 14 | 7 🌾 | Southern Castle: Heavy stone citadel at Minental Pass |
| **53** | Mine Pass Tunnel | Territory | 957 | 963 | 79.4% | 87.9% | 4 | 45, 51, 52, 54 | 14 | 3 | 1 🌾 | Underground mining cavern bypassing surface gorge |
| **54** | Valley of Mines Gate | Territory | 893 | 1038 | 74.1% | 94.8% | 2 | 52, 53 | 18 | 4 | 2 🌾 | The great fortified gateway into the Penal Colony |

---

## 3. Four Selectable Castles & Neutral Citadel Mechanics

| Castle ID | Name | Faction / Lore | Coordinates | Connections | Prot | Cult | Food/Turn | Strategic Orientation |
|:---:|:---|:---|:---:|:---:|:---:|:---:|:---:|:---|
| **14** | **City of Khorinis** | Royal Paladins & Militia Capital | (150, 448) | 11, 25, 26 (Deg 3) | 20 | 14 | 7 🌾 | Western Naval Capital (Classic Team Red base) |
| **23** | **Onar's Farm** | Mercenary & Landowner Stronghold | (722, 512) | 17, 22, 24, 30, 31 (Deg 5) | 20 | 14 | 7 🌾 | Eastern Basin Stronghold (Classic Team Blue base) |
| **7** | **Monastery of Innos** | Highland Sanctuary of Fire Mages | (647, 318) | 2, 5, 8, 13 (Deg 4) | 20 | 14 | 7 🌾 | Northern Mountain Sanctuary |
| **52** | **Fortress of the Pass** | Southern Mountain Citadel | (859, 978) | 50, 53, 54 (Deg 3) | 20 | 14 | 7 🌾 | Southern Pass Bastion |

### Neutral Citadels in Matches
When players pick their home castles (e.g. `14` vs `23`), the unchosen castles (`7` and `52`) spawn as high-value neutral strongholds:
1. **Forward Siege Workshops**: Commanders can craft siege weapons in captured citadels without traveling back to their home capital.
2. **Immediate Heavy Infantry Recruitment**: Protection resets to `20` upon capture, satisfying the `protection >= 20` threshold for Heavy Infantry.
3. **Disaster Protection Floor**: Citadels maintain `minProtection = 20` against hurricanes and floods.
4. **Home Castle vs Citadel Victory Rule**: Conquering an enemy team's registered **Home Castle** (`gameState.teamCastles`) triggers immediate victory (`GameStatus.GAME_OVER`). Conquering a neutral or captured secondary citadel transfers territory ownership without ending the game.

---

## 4. Map Label Rendering & UI Optimization

With all 55 territories named, label decluttering is handled in [StrategicMap.kt](file:///home/eudialyte/workspaces/gothic_fire/gothic_fire/gothicfire/src/jsMain/kotlin/components/StrategicMap.kt):
1. **Label Visibility Filter**: By default, `.territory-name-label` renders permanently only for key sectors:
   - Castles (`territory.isCastle`)
   - Active selected or inspected sectors (`isSectorSelected || openedTerritoryId == sector`)
   - Occupied sectors (`sectorOccupiedBy != null`)
   - Major landmarks (`protection >= 16 || cultivation >= 17 || adjacentIds.size >= 6`)
2. **Map Toolbar** (top-right of the map, `.map-toolbar`):
   - **`🗺️ Show Paths / Hide Paths`**: Draws all 100 connections between locations as an animated SVG overlay (`viewBox 0 0 1205 1095`, built from `adjacentIds` via `MapConnections`). Routes from the inspected sector (`openedTerritoryId`), or failing that the active character's sector, are highlighted in orange. A legend appears bottom-left while paths are on.
   - **`🙈 Hide Labels / 👁️ Show Labels`**: Clean map mode (`.map-clean-mode`). Hides name labels (hover ones too), sector numbers, and resource pills, and fades territory pins so the map art shows through. Castle icons, unit markers, and move/placement highlights stay visible.
   - **`🏷️ All Names / Key Names`**: Switches between showing all 55 labels and only the key ones (hidden while clean mode is on).
3. **Instant Hover Reveal**: Non-permanent labels render with `.territory-name-label-hover` (`display: none`), expanding via CSS `:hover` whenever the mouse rests on any territory pin.
4. **Rich Tooltips**: Every node contains a comprehensive `title(...)` attribute displaying:
   `"<Name> (#<id>) | 🛡️ Prot: <protection> | 🌾 Cult: <cultivation> (+<food> Food/turn)"`

---

## 5. Verification Command

Run the map symmetry and test suite verification at any time:
```bash
./gradlew jvmTest compileKotlinJs
```
