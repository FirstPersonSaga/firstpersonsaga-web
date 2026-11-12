# FirstPersonSaga — Gray Zone Warfare Expansion

**Document:** FPS-GZW-001 | Product Requirements Document v1.0  
**Date:** 2026-10-29 | **Status:** MVP IMPLEMENTED / DATA REVIEW REQUIRED  
**Target:** Existing static FirstPersonSaga website on Vercel.  
**Product owners:** FirstPersonSaga.  
**Primary launch language:** English; Turkish available on Hideout and Patch Report.  
**Game baseline:** Gray Zone Warfare Update 0.5.0.1 / Rogue Ops (2026-10-22).

## 1. Problem and outcome

Rogue Ops adds a substantial Hideout/production progression loop. Individual station upgrades share resources across rooms, while rooms require vendor progress; players need a reliable way to see which material to keep during raids and how much to collect. A passive list is insufficient: the tool must account for the user's owned items, built levels, target levels, vendor status and currencies without double counting.

Deliver a cohesive FirstPersonSaga GZW Hub with (A) a functioning, persistent Hideout planning tool and (B) an editorial patch intel page. Preserve the existing static site's architecture, URLs and appearance for Tarkov/WARDOGS.

## 2. Research evidence and distinctions

**Official and Steam:** The launch date is 2026-10-22; official release version 0.5.0.1. New features include Hideout, crafting, timed smuggling/hunting, three Tier 4 points of interest, hacking tools, up to four characters, soft wipe, streamlined medical treatment, AI behavior changes and technical updates. The official changelog is linked at the bottom.

**Community snapshot supplied by user:** ZoneIntel HTML page captures from 2026-10-29, referencing game build 2026-10-22. Parsed into 15 devices/stations, 36 documented upgrade milestones, 46 building materials, 331 units, $340,000 total funds, and 37 recipe references. These are **not** an official game API and can drift after hotfixes.

**User's screenshots:** Confirm four visible Hideout room tabs (Laboratory, Electronics Workshop, Utility Room, Personal), station/category names, Help guidance concerning power / production / disassembly / crafting / storage, and the game UI layout. Screenshots supplied by the user are used as darkened atmospheric UI imagery, not as an exact page clone.

**User's historical play evidence:** Lab Rat rank 2 unlocked Laboratory and Utility Room; Electronics Workshop remained locked. ZoneIntel snapshot additionally reports Artisan rank 2 requirement for Electronics Workshop. Those are the rules implemented in v1, with Player rank 1.

**Design:** Notion FirstPersonSaga Brand Colour Palette v1.0: Saga Crimson #D91124, Soft White #F5F5F7, Graphite Black #111315; extended Carbon #1A1D21 and Gunmetal #262B31. Brand guidelines for thumbnails do not mandate exact thumbnail-specific coordinates in web UI. This product uses the brand's content hierarchy and color roles instead.

## 3. Information architecture

- `/` — existing homepage, extended with a new GZW section and navigation link.
- `/gray-zone-warfare/` — game hub, direct paths to the planner and patch report.
- `/gray-zone-warfare/hideout/` — full planner with Build / Inventory / Recipes / Operator profile / Data & Help tabs.
- `/gray-zone-warfare/rogue-ops/` — 0.5.0.1 categorized editorial changelog.
- `/gray-zone-warfare/data/gzw-05.json` — versioned, reviewable content data independent from UI.

## 4. User stories / functionality

| ID | Priority | User story | MVP behavior |
| --- | --- | --- | --- |
| F01 | P0 | As a player I can enter player and trader ranks. | Player / Lab Rat / Artisan fields; rooms show their verified unlock requirements. |
| F02 | P0 | I can inspect all rooms and stations before meeting requirements. | Rooms may be examined even when locked; actual build transaction is guarded. Personal room is marked unverified. |
| F03 | P0 | I can track each upgrade milestone separately. | Every station has a built count and a selectable target count, with source-derived in-game tier names. |
| F04 | P0 | I can plan total demand for shared materials. | Add quantities of all unbuilt tiers up to target; aggregate by exact material names. |
| F05 | P0 | I can record loot as I obtain or spend it. | Global shared stock +/− and direct quantity entry. Separate USD wallet and expense tracking. |
| F06 | P0 | When I build a milestone, it removes the correct items and cost. | Transaction is refused when room locked or insufficient stock; on success, decrement stock and increase built. |
| F07 | P0 | I can reconcile upgrades constructed before using the website. | Explicit `Sync as built` changes built level without double-consuming stock; requires confirmation. |
| F08 | P0 | My progress survives reloads. | LocalStorage with distinct per-character profiles; export/import JSON for backup. |
| F09 | P0 | I can understand costs without opening 36 pages. | Expandable station cards, per-item quantities, on-hand counts, upcoming tier name; text hints. |
| F10 | P0 | I can read patch notes without the full unstructured changelog. | 9 topic-led explanations + categories + links to authoritative full sources. |
| F11 | P1 | I can track several in-game characters separately. | Up to 4 profiles, independent rank, inventory, built progress, targets, wallet and recipes. |
| F12 | P1 | I can filter a shopping list by room/station. | Scope selector; caveat that inventory remains globally shared. |
| F13 | P1 | I can choose English or Turkish. | English default, Turkish switch on Hideout and Patch Report; game item names remain English. |
| F14 | P1 | I can browse craft and disassembly references. | 37 documented recipes, filters and manual known/planned states. Inputs are not guessed or deducted. |
| F15 | P1 | I can recover from a mistaken build operation. | Undo restores one saved pre-transaction snapshot (max 30 previous actions). |
| F16 | P2 | I can discover source data and limitations. | Embedded data explanations, official/community source links, explicitly marked gaps. |

## 5. Data model and math

Core JSON `room`: `id`, `name`, `requirements`, `unverified?`.  
`station`: `id`, `room`, `name`, `tiers[{gameLevel,name,materials:{item:quantity},usd}]`, `prerequisiteStations`, `dependencyStatus`.  
`recipe`: `id`, `name`, `room`, `kind`, `summary`, `knownByDefault`, `materialsVerified`.  
`operator`: `id`, `name`, `player`, `labrat`, `artisan`, `wallet`, `inventory`, `built`, `target`, `recipeKnown`, `recipePlan`, `history`.

**Demand (item m)** for each station `s`:

`D[m] = Σ_s Σ_{i=built[s]}^{target[s]-1} tier[s][i].materials[m]`

**Missing to find** = `Σ_m max(0, D[m] - inventory[m])`.

**Money to collect** = `max(0, Σ remainingTierUSD - currentWalletUSD)`.

The `target` value represents a number of documented milestones, not a promise that displayed gameLevel integers are contiguous; the user-supplied snapshot lacks the Ventilation L2 entry, while showing L3. Upgrading one milestone costs exactly the tier's material map, and `Build & consume` also decrements the owned wallet. Because both future demand and owned resources drop by the same costs, the *net missing item quantity* can remain unchanged if those costs were already fully owned; this is mathematically correct. A scoped shopping list compares the selected subset with the shared global stock, **without reserving** stock for other scopes.

## 6. UX/UI

Design mode: Graphite / Premium Tactical. Main canvas #111315; surfaces #1A1D21; dividers #262B31; text #F5F5F7; restrained #D91124 accents for actions/selection. Use native font stack; Tactic Sans not bundled or redistributed. Compact, responsive grid; information density optimized for desktop with a mobile single-column fallback. Use user-supplied game screenshots as subtle imagery. Distinguish an action (build / deduct) from an observation (sync already built). Disabled actions are visibly disabled. Support standard keyboard controls and clear labels.

Design priorities: **Readability > material feedback > tactical texture > decoration**. Brand language is shared with the existing website, not a copy of in-game menus or another community site.

## 7. Patch Report editorial coverage

Nine editorial sections are tagged by group (systems / world & combat / progression / technical), based on official 0.5.0.1 release materials:

1. Hideout and crafting loop
2. Smuggling and Hunting
3. Hacking
4. Three Tier 4 locations
5. AI changes
6. Weapons and audio
7. Multiple characters and soft wipe
8. Health system and economy
9. Technical performance and anti-cheat

No unverifiable promise of precise loot spawns, monetary profits or guaranteed FPS boost. Notes intentionally **do not reproduce** a full copyrighted changelog; they link to the authoritative complete copy.

## 8. Data quality, product limits and decisions

1. **Ventilation L2 gap:** the snapshot has Fan L1 and Ventilation L3 but not the intermediate L2 ingredients/name. Treat as an explicit gap, not a free level. Needs manual in-game validation before the planner is declared fully complete.
2. **Personal room:** locked/disabled as no verified unlock conditions and stations were available in the provided snapshot. No invented content.
3. **Craft input data:** 37 recipe labels, types and some capability/duration hints available, but not verified full material inputs. Recipe planning is informational only and never changes physical stock.
4. **Station capability values and deep prerequisites:** The supplied UI and community text show some conditions, but not complete, source-reconciled values for all 36 tiers. Indicate possible dependencies, do not hard-block progress based on unverified inferences.
5. **Images:** In-game screenshots were provided by project owner. The code does not redistribute ZoneIntel item icon files or hotlink their assets; the original reference URLs exist only in the internal extraction script and are not included in deployment data.
6. **Account sync:** no game API/login integration. A browser save is local to that origin/browser/profile; JSON backup is recommended.
7. **No runtime scraping:** Source content is frozen as a versioned JSON bundle for performance and reproducibility. Review when game patches change.
8. **Data accuracy vs confidence:** Date/version and major update features: official. Station materials: supplied community snapshot. Local unlock experience: user's own in-game observation and community data. Any unsourced rules: proposal, not game facts.

## 9. Technical approach

- Plain HTML, scoped CSS and vanilla JavaScript; no bundler, runtime dependencies, server, account database or build process.
- Static JSON loaded using `fetch` on Vercel/http server. Opening the files directly with `file://` is not supported due browser security.
- LocalStorage schema `fps:gzw05:hideout:v1`; versioned import/export document identifies the app and schema version.
- Calculations derive from one data bundle and operator state; no duplicate manually maintained totals.
- Bounded undo stack, input sanitization, finite positive integer counts, per-operator save slots.
- Do not replace existing routes or break existing pages. Vercel handles static directories.

## 10. Acceptance checks

| Test | Expected |
| --- | --- |
| Fresh operator | 0/36 built, 331 material units missing, $340,000 remaining upgrade USD, 46 shopping rows |
| Trader rank Lab Rat 1 | Laboratory and Utility Room cannot execute Build/Sync |
| Lab Rat 2 and Artisan 1 | Laboratory and Utility accessible; Workshop still locked |
| Lab Rat 2 and Artisan 2 | Workshop accessible |
| Collect Dynamo 1, Mechanical Parts 1, Motor Oil 1, Steel 1 | Generator L1 Build & consume enabled when Utility unlocked |
| Build Generator L1 | Built 1/36; those four inventory quantities decrease by 1; remaining build demand reduces by four |
| Undo the above | Built count and item stocks restored from previous snapshot |
| Target an undesired station to zero | Its future requirements excluded (unless already built) |
| Set money / change target | Currency missing calculation updates; independent of physical unit count |
| Profile switch | No inventory or progress leaks between operators |
| Reload | LocalStorage save restored |
| Export/import | JSON backup can round-trip valid state; invalid input rejected |
| Craft planning | No silent inventory deduction without verified recipe inputs |
| Patch English ↔ Turkish | Editorial contents and controls switch without rewriting game terms |
| Mobile 390px | No horizontal scrolling or clipped primary controls |

## 11. Future iterations (not implemented in v1)

- Validate missing Ventilation L2, Personal room, all capability formulas, craft/production/disassembly input/output quantities in the live game.
- Complete Station dependency graph with verified threshold values, then enforce it optionally.
- Full crafting inventory engine, time-to-completion scheduling and trade profitability with current prices.
- Icons and item photography under explicit permission/license; searchable index of spawn locations with grounded map references.
- Data migration policy for future updates and optional cloud sync with user consent.
- Complete localization of all minor hub microcopy, footer labels and explanatory source notes (the main hub copy switches languages in MVP).
- Extended automation for multiple actual Hideout production slots (only after recipes are verified).

## 12. References

Official 0.5.0.1 changelog: https://www.grayzonewarfare.com/news/rogue-ops-out-now-changelog  
Official new features: https://www.grayzonewarfare.com/news/new-features-rogue-ops-devlog  
Official new content: https://www.grayzonewarfare.com/news/new-content-rogue-ops-devlog  
Steam announcements: https://steamcommunity.com/app/2479810/allnews  
Community reference: https://zoneintel.gg/hideout  
Brand guidelines: https://app.notion.com/p/40435054af3d8021853ffd8e0dc07fd0

**Document owner decision:** MVP ships as transparent, source-aware functionality; unknown game data must not be fabricated to create an illusion of completeness.
