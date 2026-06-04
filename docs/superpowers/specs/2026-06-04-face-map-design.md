# Interactive Face Map — Design Spec

**Date:** 2026-06-04
**Status:** Exploratory prototype (may be cut — must be easy to roll back)
**Site:** avecutis_html — static Czech marketing site for Avecutis dermatology clinic (HTML/CSS/vanilla JS, no build)

## Goal

Help women navigate facial aesthetic treatments faster and more intuitively. Instead of
reading a flat list of treatment names, a customer sees a single-line illustration of a
woman's face and interacts with **regions** (forehead, eyelids, lips) to discover the
aesthetic procedures available for that area. This is a differentiator versus typical
clinic websites.

This is an experiment. It may be shown to the clinic owners and possibly removed, so the
implementation must be **isolated and trivially reversible**.

## Scope (proof of concept)

- **Three regions only:** Čelo (forehead), Oční víčka (eyelids), Rty (lips).
- One illustration style: **"A — Soft Beauty"** (see `docs/face-map/face-a-soft-beauty.svg`).
  Backup style "C — Minimal Glow" is stored in `docs/face-map/` for the owner discussion.
- Procedures + short descriptions per region. **No prices yet** — show "Cena na konzultaci".
- New dedicated section placed just above the existing Estetická dermatologie section.

### Out of scope (for now)
- Additional regions (cheeks, neck, chin, etc.).
- Real prices / linkage to the Ceník numbers.
- Booking flow, modals, deep procedure pages.

## Architecture — isolated module

Chosen for easy rollback: keep the feature in its own files.

| File | Purpose |
|------|---------|
| `facemap.css` (new) | All styling for the feature, self-contained. |
| `facemap.js` (new) | Behaviour + the `FACE_MAP_DATA` content object (single source of truth). |
| `index.html` (edit) | One new `<section id="face-map">` above Estetická, plus a `<link>` to `facemap.css` in `<head>` and a `<script src="facemap.js">` before `</body>`. |

**Rollback = delete `facemap.css` + `facemap.js`, remove the `#face-map` section and its two
link/script lines from `index.html`.** Nothing else in the site is touched.

Rationale for separate files over appending to the existing `styles.css` / `script.js`:
the feature's code stays physically separated, so removal is delete-files rather than
hunt-and-extract.

## Markup

```
<section id="face-map" class="section section-facemap">
  <div class="container">
    <h2 class="section-title">Najděte zákrok podle oblasti</h2>
    <p class="section-intro">Vyberte oblast obličeje a zobrazte si dostupné zákroky.</p>

    <div class="facemap-wrap">
      <div class="facemap-stage">
        <svg class="facemap-face" viewBox="0 0 200 250"> ...style A paths... 
          <!-- region hotspots: focusable buttons -->
          <g class="facemap-region" data-region="forehead" role="button" tabindex="0"
             aria-label="Čelo">...</g>
          <g class="facemap-region" data-region="eyelids" ...>...</g>
          <g class="facemap-region" data-region="lips" ...>...</g>
        </svg>
      </div>
      <div class="facemap-panel" id="facemapPanel" aria-live="polite">
        <!-- default prompt; replaced on region select -->
      </div>
    </div>
  </div>
</section>
```

- Region hotspots are transparent SVG shapes over the relevant feature, sized large enough
  for comfortable tapping (min ~44px target where possible).
- The face art is style A; the white-stroke paths come from `docs/face-map/face-a-soft-beauty.svg`.

## Data model (`facemap.js`)

```js
const FACE_MAP_DATA = {
  forehead: {
    label: "Čelo",
    procedures: [
      { name: "Botulotoxin – mimické vrásky", desc: "Vyhlazení vrásek na čele a mezi obočím." },
      { name: "Výplně kyselinou hyaluronovou", desc: "Korekce hlubokých vrásek." },
    ],
  },
  eyelids: {
    label: "Oční víčka",
    procedures: [
      { name: "Blefaroplastika", desc: "Chirurgická operace očních víček." },
      { name: "Nucleofill Soft Eyes", desc: "Polynukleotidy – hydratace oční oblasti." },
      { name: "Plexr", desc: "Plazmový generátor – nechirurgické zpevnění." },
    ],
  },
  lips: {
    label: "Rty",
    procedures: [
      { name: "Výplně rtů", desc: "Modelace a hydratace kyselinou hyaluronovou." },
    ],
  },
};
```

Price field intentionally omitted; the panel renders the fixed string **"Cena na konzultaci"**
for every procedure until owners supply real numbers. Adding prices later = add a `price`
field here and render it.

## Interaction (tap-first, progressive enhancement)

State: at most one region active at a time.

- **Tap / click a region** → region highlights gold; panel re-renders with that region's
  label + list of procedures (each procedure collapsed).
- **Tap / click a procedure** → it expands inline (accordion) to show `desc` + "Cena na
  konzultaci". Tapping another procedure expands it; the list stays in place.
- **Selecting a different region** swaps the whole panel content and moves the gold highlight.
- **Desktop hover enhancement:** hovering a region shows its label + a lighter highlight as a
  preview; this is purely additive and never required (touch devices have no hover).
- **Keyboard:** regions are focusable (`tabindex="0"`, `role="button"`); Enter/Space activate.
  The panel is `aria-live="polite"` so its updates are announced.

### Default / empty state
Before any selection, the panel shows a short prompt: "Najeďte nebo klepněte na oblast
obličeje (čelo, oční víčka, rty) a zobrazte dostupné zákroky."

## Responsive layout

- **Desktop (≥768px):** two columns — face left, panel right (CSS grid `1fr 1fr`).
- **Mobile (<768px):** single column — face on top, panel below. Consistent with the site's
  mobile-first convention (base styles = mobile; `min-width` query adds the two-column layout).

## Styling

- Brand: green gradient background (`#38a13e → #2a7d2f`), white face strokes, gold (`#d4af37`/
  `#ffd700`) highlights and accents, matching the hero/service-box aesthetic.
- Reuse existing CSS variables where practical, but keep declarations inside `facemap.css` so
  the file is self-sufficient and removable.

## Accessibility

- SVG has an `aria-label`; each region hotspot is a labelled button.
- Panel updates announced via `aria-live`.
- Highlight is conveyed by more than colour alone (also a stroke/weight change) for low-vision
  users.
- No-JS fallback: the existing Estetická dermatologie section directly below already lists all
  treatments as plain text, so the content remains reachable if `facemap.js` fails to load.

## Verification

No automated test setup exists in this static site, so verification is manual:
1. Desktop: hover highlights regions; clicking each region shows correct procedures; expanding
   a procedure shows its description + "Cena na konzultaci".
2. Mobile (responsive view / device): tap-only works end-to-end without hover; layout stacks.
3. Keyboard: Tab reaches each region, Enter/Space activates, panel content updates.
4. Rollback check: confirm removing the feature's files/lines leaves the site unchanged.

## Future (not built now)
- Real prices, optionally reconciled with Ceník as a single source.
- More regions; richer per-procedure detail; booking/contact CTA.
- Decision between styles A and C after owner feedback.
