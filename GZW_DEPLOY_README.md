# FirstPersonSaga GZW Module — Deployment

The enclosed site is a **complete static copy** of the supplied FirstPersonSaga website, with three new pages and data files. No external framework, Node modules or build step are needed.

## New URLs

- `/gray-zone-warfare/` — GZW hub
- `/gray-zone-warfare/hideout/` — planner
- `/gray-zone-warfare/rogue-ops/` — update guide

The homepage gained GZW navigation and content. Existing Tarkov / WARDOGS pages were retained as supplied.

## Deploy to Vercel

1. Unzip the archive.
2. Copy **the contents of** `firstpersonsaga-web/` into the root of the existing repository. Review the modifications before commit.
3. Commit and push. The existing static Vercel deployment should serve the new directories. No package.json or framework migration.
4. Check each new URL, then try changing inventory, building a station and reloading to confirm LocalStorage persistence on the production domain.

## Test locally

From the `firstpersonsaga-web` folder:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/gray-zone-warfare/hideout/`. **Do not double-click the HTML file** (`file://` blocks local JSON fetch).

## Product operation

- Default operator has Player 1 / Lab Rat 1 / Artisan 1. Update values in Operator Profile.
- Build shows station milestones and next-tier material needs.
- Inventory holds all item counts and a separate USD wallet.
- Build & consume decrements requirements and advances one milestone; Sync as built records a previously completed game upgrade without double-consuming materials.
- Target level 0 skips an unbuilt station in shopping lists; completed progress cannot be removed by lowering targets.
- Up to 4 operators and JSON export/import backups.
- English UI with Turkish switch inside Planner and Patch Report. Game items/stations remain in English to match the source and gameplay.

## Provenance / limitations

See `FPS_GZW_PRD_v1.0.md`. The dataset was reconstructed from the **user-supplied** ZoneIntel HTML snapshots and must be reviewed after major game updates. Ventilation L2, the Personal room, exact capability values and craft recipe inputs remain unverified; the app deliberately does not invent those values or deduct recipe input stock.

## Included new files

```
FPS_GZW_PRD_v1.0.md
GZW_DEPLOY_README.md
gray-zone-warfare/
  index.html
  hideout/index.html
  rogue-ops/index.html
  assets/gzw.css
  assets/hideout.js
  assets/patch.js
  assets/lab.webp
  assets/workshop.webp
  assets/utility.webp
  data/gzw-05.json
```
