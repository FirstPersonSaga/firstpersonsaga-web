# FirstPersonSaga Tarkov Key Guide

## Architecture

- `/tarkov/keys/` — map index
- `/tarkov/keys/streets-of-tarkov/` — Streets MVP
- `/assets/data/tarkov/keys/streets-of-tarkov.js` — canonical UI data layer
- `/assets/js/tarkov/keys.js` — search, filters, detail drawer, My Key Set/localStorage
- `/assets/css/tarkov-keys.css` — Key Guide design-system extension
- `/assets/images/tarkov/keys/streets/` — local key art assets

The feature extends the existing static-first platform. No framework, package manager or build step is required.

## Data model

Detailed rotation records currently support:

- `id`
- `name`
- `shortName`
- `image`
- `opens`
- `location`
- `fpsRotation`
- `siccSlot`
- `carriedCopies`
- `whyImportant`
- `loot[]`
- `tags[]`
- `quest`
- `prerequisite`
- `source`

Future route data should add a user-confirmed `rotationOrder` / route identifier. The SICC screenshot slot order is deliberately not treated as route order.

## Current FirstPersonSaga SICC set

The supplied screenshot resolves to 17 unique Streets keys:

1. Concordia apartment 63 room key
2. Zmeisky 5 apartment 20 key
3. "Negotiation" room key
4. Concordia security room key (two copies visible)
5. Concordia apartment 8 room key
6. Iron gate key
7. Concordia apartment 64 office room key
8. Concordia apartment 64 key
9. Concordia apartment 34 room key
10. Tarbank cash register department key
11. Concordia apartment 8 home cinema key
12. Relaxation room key (two copies visible)
13. Car dealership director's office room key
14. Beluga restaurant director key
15. MVD academy entrance hall guard room key
16. Stair landing key
17. TerraGroup security armory key

The rouble stack in the SICC is not a key and is excluded.

## Data verification

Primary reference: Escape from Tarkov Official Wiki, checked 2026-09-17.

The older project brief included a different preliminary list (Cardinal, Aspect, REA, Chek. 15, etc.). This MVP prioritizes the newly supplied screenshot as the current rotation input and does not silently merge the two sets.

## MVP behavior

- FirstPersonSaga Rotation / All Keys tabs
- Search across detailed rotation data and catalog names
- Collapsible tag filters
- Detail drawer
- LocalStorage-based My Key Set
- Responsive card/grid layout
- No new build dependencies
- Existing runbook and routes remain unchanged

## Next data pass

1. Confirm whether the old rotation list should be retained as a historical/alternate loadout.
2. Get FirstPersonSaga's actual loot-route order; do not infer it from SICC positions.
3. Replace screenshot-derived local key art with canonical transparent item assets if a preferred licensed/source pipeline is selected.
4. Expand full-detail records and art from the 17 rotation keys to all Streets keys.
5. Add route integration only after route order is confirmed.
