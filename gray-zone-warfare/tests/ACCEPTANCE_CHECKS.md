# FPS GZW Expansion v1.0 — Test Evidence

Tested 2026-10-29, Chromium via Playwright with local HTML/CSS/JS injected and a simulated fetch/localStorage implementation. Static HTTP response for planner entrypoint also checked. **Production Vercel deployment and live account sync were not tested; no live account sync exists.**

Passed:

- Dataset invariant: 15 stations, 36 documented upgrade events, 46 materials, 37 recipes, 331 material units, $340,000.
- First load: 15 station cards; 46 materials in inventory; matching headline totals.
- Trader lock: Utility cannot be built at Lab Rat rank 1 and is available at rank 2.
- Generator L1: 1 each of Dynamo / Mechanical Parts / Motor Oil / Steel enables build; building advances station one step and decrements owned quantities exactly.
- Undo: reverts built and inventory to prior state.
- Second operator: starts with separate inventory and tracking data.
- EN/TR: Hideout UI and patch report switch language without JavaScript exceptions.
- Patch report: nine visible editorial sections.
- 390 px viewport: no horizontal document overflow.

Known not yet verified in production:

- Real Vercel canonical route behavior and production-origin LocalStorage persistence.
- Import/export through native browser file picker in the deployed site.
- Full game data correctness after 2026-10-22 snapshot (particularly Ventilation L2, Personal room, production inputs).
- Third-party game user workflows across all available operating systems and mobile browser models.

Run local integration testing with an HTTP server before production release. Source files are free of required external JS dependencies.
