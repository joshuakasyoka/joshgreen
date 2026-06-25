# Case study demos (Agentation-style)

Efficient playbook for portfolio feature demos sourced from the Doodler prototype.

## When to use

- User wants Agentation-style demos (scripted loop, fake browser chrome, animated cursor)
- **Not** full iframe embeds or screen recordings unless explicitly requested

## Source repo (read-only)

```
/Users/joshuagreen/Documents/Doodler
```

| Need | Read only this |
|------|----------------|
| Animation sequence | `scripts/record-*-demo.mjs` (hover targets + durations) |
| UI structure + copy | Matching `src/components/<Name>/<Name>.tsx` |
| Colors/fonts/spacing | `src/styles/tokens.css` |
| Default data | exports like `DEFAULT_ACTIVITIES_TABLE` in component file |
| Pre-recorded reference | `demos/videos/*.mp4` (timing only — don't ship as primary) |

**Do not** read `node_modules`, bundled HTML, or full `Prototype.tsx` unless necessary.

## Build pattern (one demo = two files)

1. `src/components/<Name>Demo.js` — static mock UI + `STEPS` array + cursor
2. `src/components/<Name>Demo.css` — tokens inlined; import Bricolage + Inter from Google Fonts

### STEPS shape (copy from record script)

```js
const STEPS = [
  { kind: 'row', row: 0, duration: 900 },
  { kind: 'cell', row: 0, col: 2, duration: 700 },
  { kind: 'idle', duration: 500 },
];
```

### Demo shell (reuse every time)

- `.demo-window` → browser bar (3 dots + url) → content area
- `targetRefs` on row/cell nodes; cursor `transform` via `getBoundingClientRect`
- `IntersectionObserver` on container — animate only when visible
- `setTimeout` cycles `stepIndex`; no user interaction

### Portfolio wiring

In `Portfolio.js` project `images`:

```js
{ demo: 'doodler-table', caption: '...' }
```

Register in `renderProjectMedia()`:

```js
if (demo === 'doodler-table') return <DoodlerTableDemo className="self-start w-full" />;
```

## Completed demos

| `demo` key | Source | Record script |
|------------|--------|---------------|
| `doodler-table` | `ActivitiesOverview` | `record-table-demo.mjs` |
| `doodler-nieuwe-doodle` | `NewDoodleModal` / `MVPNewContactModal` | `record-demos.mjs` → `01-nieuwe-doodle` |
| `doodler-journey` | `MVPDoodleFlow` + `Summary` | `record-demos.mjs` → `02-doodle-flow`, `03-samenvatting` |

## Queue (next demos)

| `demo` key | Source | Record script / video |
|------------|--------|------------------------|
| `doodler-bibliotheek` | gallery | `04-bibliotheek.mp4` |
| `doodler-samenvatting` | summary view | `03-samenvatting.mp4` |
| `doodler-bibliotheek` | gallery | `04-bibliotheek.mp4` |

## Token budget rules

1. Grep repo path first — don't broad `find` unless path unknown
2. Read record script → component TSX → tokens.css only
3. Simplify UI to what's visible in the animation; skip modals unless step requires them
4. Reuse `renderProjectMedia`; don't duplicate mobile/desktop render logic
5. One demo per PR-sized change

## Reference implementation

- `src/components/DoodlerTableDemo.js` + `.css`
- `src/components/DoodlerNewDoodleDemo.js` + `.css`
- `src/components/DoodlerJourneyDemo.js` + `.css`
- benji.org/agentation: inline React, CSS transitions, no iframes/videos
