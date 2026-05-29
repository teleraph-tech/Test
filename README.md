# Test AG — Design System

> A French-language customer-portal design system. Sourced from `AG2.fig`, which depicts a multi-product insurance / pension / savings dashboard (mutuelle santé, retraite supplémentaire, épargne, prévoyance, documents).

The user-supplied company name is **Test AG**. The source Figma file uses the **AG2R LA MONDIALE** brand as visual reference (logo + co-branding with Decathlon, customer "Marie Dupont"). Treat the *visual language* and *component patterns* in this kit as the source of truth; swap the brand mark / wordmark / partner imagery for Test AG's own when productionising.

## Sources

- **Figma file** — `AG2.fig` (attached, mounted as virtual FS while authoring).
  - Page `/Composants` — atomic kit: Fonts, Titre, Status, Button-Link, Card, Icons.
  - Page `/Page-1` — assembled screens: full customer dashboard (`Frame-5-1`, `Frame-52`), Mutuelle section (`Frame-7`), Retraite / Épargne (`Frame-51`), accent strip (`Frame-37`).
- **No codebase was attached.** Everything in this kit is derived from the Figma JSX pseudocode + the rasterised reference at `assets/figma-screen-mockup.png`.

## What's in this folder

| Path | Purpose |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography, index. |
| `SKILL.md` | Agent-Skill entry point (cross-compatible with Claude Code skills). |
| `colors_and_type.css` | The token layer — CSS vars for color, radii, spacing, type. Import this first in any artifact. |
| `assets/` | Real visual material — copied SVG icons + the original Figma reference render. |
| `assets/icons/` | Brand-supplied stroke icons (heart, calendar, piggybank, file, bell, arrows). |
| `preview/` | Per-token / per-component preview cards for the Design System tab. |
| `ui_kits/customer-portal/` | High-fidelity recreation of the customer dashboard — JSX components + an interactive `index.html`. |
| `slides/` | *(not provided — no slide template in source)*. |

---

## CONTENT FUNDAMENTALS

**Language.** French (`fr-FR`). All UI copy in the source uses the *vouvoiement* register — formal "vous", never "tu". Headings and section labels nearly always start with **"Votre …"** (*Your …*) to keep the experience personal: *Votre mutuelle, Votre santé, Votre épargne, Votre retraite supplémentaire, Votre prévoyance, Votre carte tiers payant, Vos derniers documents, Vos derniers remboursements, Vos contrats, Agir sur votre contrat*.

**Tone.** Calm, factual, administrative-but-warm. Sentences are short and information-dense. Numbers are front-and-center; copy supports the numbers rather than the reverse.

**Casing.**
- **Sentence case** for titles and section headers — *"Bienvenue Marie Dupont"*, *"Votre carte tiers payant"*, *"Notice d'information"*.
- **ALL-CAPS** is reserved for an "eyebrow" / category tag — *"DOCUMENTS CONTRACTUELS"*. 12px, weight 700.
- **Action verbs** in buttons stay imperative-infinitive, capitalised first word only: *"Faire un versement"*, *"Faire un rachat"*, *"Télécharger votre carte TP"*, *"Tous vos remboursements"*.

**Numbers + units.**
- French thousands separator (a *thin space* or regular space): `12 345,67 €`, `22 500,00 €`, `45 000,52 €`.
- Comma as decimal mark. **Euro sign trails** with a hair space: `27,95 €`.
- Currency colour follows the action: large amounts use brand-blue when they are *the* point of the row, ink-black when they are descriptive context.

**Dates.** Always `DD/MM/YYYY` — `15/01/2025`, `01/10/2026`. Range form is *"du DD/MM/YYYY au DD/MM/YYYY"*. Inline date label: *"Soin du 21/02/2021"*, *"Estim. au 19/06/2021"*.

**Microcopy patterns.**
- Greeting: *"Bienvenue {Prénom} {Nom}"* + *"N°Adhérent : 0123456789"* underneath as `t-meta`.
- Contracts: bold product name in blue + grey contract number — *"**Vivepargne** · 00123456"*.
- Statuses are single-word badges: *Remboursé*, *Dépensé*, *Tiers payant*, *En attente*.
- Catch-all CTA at the bottom of any list: *"Tous les …"* / *"Tous vos …"* (e.g. *Tous vos remboursements*).

**Emoji / illustrations.** **None.** No emoji anywhere in the kit. No hand-illustrated mascots. The only "warm" touch is the dark photographic hero band (leaves / foliage) behind the welcome card. Stick to that vocabulary.

**Vibe in one line.** *Quiet, exact, French, slightly institutional — a private bank's customer space, not a fintech.*

---

## VISUAL FOUNDATIONS

### Colors
A four-layer palette. **One** dominant brand blue, ink-black for structure, a tinted background blue for sections, plus a small accent set for status pills and dataviz.

- **Primary** — `--ag-blue` `#0242F4` (rgb 2,66,244). The single brand colour. **Reserved for emphasis**: section headings, links, primary CTAs, hover/selected state on cards & rows (titles + amounts + left rail recolour), focus rings, chart highlights. Card row titles and big amounts are **ink-black by default** and only flip to brand-blue when their row is hovered / selected.
- **Ink** — `--ag-ink` `#0C0C0C`. Body text, dark surfaces (e.g. the `48px` left rail on contract cards, the global header bar). Pure black `#000000` is used rarely (eyebrow / all-caps only).
- **Grey** — `--ag-grey` `#666666`. All secondary text — meta lines, dates, contract numbers.
- **Rule** — `--ag-rule` `#EDEDED`. Hairline borders on the dashboard header and the grey footer strip behind "Vos derniers documents".
- **Section tint** — `--ag-blue-tint` `#E6EEFD`. The dashboard's signature: full-bleed `rgb(230,238,253)` panels behind every major section.
- **Accent set (use sparingly):**
  - Green `#55BCAD` + tint `#90ECB2` — section icons + *Remboursé* pill (positive).
  - Yellow `#FBDC6C` — *Dépensé* pill (neutral / spent).
  - Cyan tint `#B5DCE9` + border `#60C2E5` — the tiers-payant card.
  - Pink `#F098DA` + violet `#9DAFFF` — avatar chips (F / M).
  - Orange `#EE8339` + purple `#7229F5` — donut chart slices, documents section icon.
- **Drop-shadow** — `rgb(176,188,224)` (or 75% alpha) — *not* black. Every elevation in the system is a soft cool-blue shadow, never neutral.

### Typography
- **Family.** **Inter** only. Three weights in use: Regular 400, Medium 500, Bold 700 (the Figma reports "Semi Bold" but every `fontWeight: 700` usage labels it "Bold"; we ship 400/500/600/700 from Google Fonts for safety).
- **Scale** (all `line-height: 1.4`):
  - 24/500 — page + section headings (*"Bienvenue Marie Dupont"*, *"Votre mutuelle"*).
  - 16/700 — card titles, row titles, primary numbers (*"Vivepargne"*, *"22 500,00 €"*).
  - 14/700 — button labels, menu labels, avatar initials.
  - 14/400 — body, meta values, sub-labels.
  - 12/700 — eyebrow / all-caps tags (*"DOCUMENTS CONTRACTUELS"*).
  - 12/400 — small meta, status-pill text, dates.
- **No serif, no display, no italics.** No letter-spacing changes except the implicit tracking inside Inter's caps.

### Spacing & layout
- 4-based scale: `4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 52 · 64`.
- Standard card padding is **16/20** — `16px` vertical, `20px` horizontal. Tighter cards (document tiles) are flat 16. The hero/tiers-payant card uses 24.
- Page gutter on the dashboard is `48px` from edge; section internal padding is `52px`.
- Card-to-card stack uses **16px** gaps; section-to-section uses 32–40.

### Backgrounds & surface treatment
- **Two background "moods"** alternating top→bottom:
  1. **Section blue** — full-bleed `--bg-section` (`#E6EEFD`) — Santé, Retraite, Épargne.
  2. **Plain white** between sections (Retraite block in the reference) or **section grey** `--bg-section-grey` (`#EDEDED`) for the documents footer strip.
- A single **dark photographic band** sits at the top of the dashboard hero (foliage / nature). This is the *only* photographic element in the system — use it as a quiet, dark "leaves at night" texture; do not over-use imagery elsewhere.
- **No gradients.** A few flat 2-tone "stack" fills appear in status pills (Dépensé/Remboursé), but they read as solid in product.
- **No noise / grain.** No textures beyond the hero photo.

### Cards — the workhorse
Every card in this system shares the same anatomy:
- `background: #FFF` · `border-radius: 8px` · `box-shadow: 0 4px 16px var(--ag-blue-shadow)`.
- Optional **48px-wide dark left rail** (`--ag-ink` or `--ag-blue`) for "contract" rows, containing a 24×24 icon, with the rail and card sharing the same 8px outer radius.
- **Default state:** row titles + amounts in `--ag-ink`. No blue.
- **Hover / selected state:** add `border: 1.6px solid var(--ag-blue)`, swap left rail from `--ag-ink` → `--ag-blue`, and recolour the row title + the primary amount to `--ag-blue`. The shadow does not deepen.
- The "tiers payant" card breaks the rule: `--ag-cyan-tint` fill, `--ag-cyan` 1px border, 12px radius, 24px padding.

### Buttons
| Variant | Fill | Border | Text | Radius | Padding |
|---|---|---|---|---|---|
| Primary | `--ag-ink` | `1px --ag-blue` | white, 14/400 | 8 | 12 |
| Secondary (outline) | white | `1px --ag-ink` | ink, 14/700 | 8 | 12 |
| Secondary nav tab | white | none | ink 14/700 title + 12/400 sub | — | 4 |
| Hover (any fill) | `--ag-blue` | `1px --ag-blue` | white | unchanged | unchanged |
| Link / hyperlink | none | none / `1px --ag-blue` on hover | `--ag-ink` → `--ag-blue` on hover | — | — |
| Small icon | white | `1px --ag-grey` | grey icon | 4 | square 32 |
| Small icon active | `--ag-blue` | none | white icon | 4 | square 32 |

All buttons keep their **same dimensions** on hover — the affordance is a fill swap to brand-blue with white text + icon. No press-shrink, no shadow lift.

### Animation
The source has no explicit motion. Recommended defaults:
- **Easing**: `cubic-bezier(.4, 0, .2, 1)` (standard material) for hover/press.
- **Duration**: 120ms (hover), 200ms (modal/drawer).
- **No bounces, no spring, no parallax.** Crossfades only.

### Hover & press
- **Hover** = fill swaps to `--ag-blue` with white text + icon. *Never* change opacity. *Never* change radius.
- **Press** = no transform. Optionally darken the blue 8% via `filter: brightness(.92)`.
- **Focus-visible** = 2px solid `--ag-blue` outline at `outline-offset: 2px`.

### Borders, rules & dividers
- **1px solid `--ag-rule`** — top of dashboard header bar.
- **1px solid `--ag-green`** — under section headings (a quiet teal underline running full width).
- **1px (rotated 90°) solid `--ag-grey`** — short 12px tick between "UNIPRICE SA" and "RG1362691" in document cards.
- **No dashed borders in product.** Dashed purple in the Figma is Figma's frame chrome — never ship.

### Shadow / elevation
Only one elevation in the system: `0 4px 16px rgb(176,188,224)` (or its 75% variant for crisper edges). Cards either *have* it or *don't*. No second tier.

### Transparency & blur
- No backdrop blur anywhere in source.
- The 75% alpha shadow variant is the only opacity used. Avoid `opacity` for state changes (use a 1px border instead).

### Corner radii vocabulary
- `4` icon chips (32×32) — file/bell/arrow-enter
- `5` status capsules
- `8` cards + primary/secondary buttons + the 48px left rail
- `12` tiers-payant card
- `40` full pills (the "+1245,67 €" growth badge)
- `9999` avatars + small status dots

### Imagery
- One photographic band (dark, cool, nature/leaves). Cool-leaning colour grade, real photography, never illustrated.
- Co-brand logo lockup uses a small composite (e.g. `Logo_Decathlon_AG2R`, 42×42). Treat these as `image-slot` placeholders in derived work.

### Layout rules
- Top-left **logo + product wordmark** lockup on the global bar. Right side: a "Contact" pill button + signed-in user pill.
- Hero band is fixed-height (~128px black) overlaid by a white welcome card that bleeds down into the section-tint panel.
- Dashboards are **two-column at desktop**: a wide content column (≈779px) + a narrow side-rail (≈357px) for cross-sells / call-out cards.
- All scrollable horizontal strips (e.g. document cards) sit on a `--bg-section-grey` background, 48px page gutter, 19px card gap.

---

## ICONOGRAPHY

**Style.** Stroke icons, **2px stroke**, 24×24 art-board with a 20×20 visual footprint (≈2px inset), squared / lightly-rounded corners. Single-color. The system uses *outline* style, never filled-glyph style.

**Sources in this kit.**
- The Figma file ships its own SVG icons for the section vocabulary — **`heart` (santé), `calendar` (retraite), `piggybank` (épargne), `file` (documents), `bell` (notifications), `arrow-up`, `arrow-enter-left`**. These are real exported SVGs and live in `assets/icons/`. Use them directly — do not redraw.
- A handful of **Material Symbols** glyphs are referenced by name in the source (`add`, `add_circle`, `archive`, `attach_file`) but their geometry is not exported. The kit substitutes them from the Material Symbols Outlined CDN at runtime (loaded via Google Fonts), keeping the same 24px / 2px-stroke feel. This substitution is flagged below.
- No icon font is bundled. No PNG icons. No emoji.

**Container patterns.**
- **32×32 icon chip** — `--bg-icon-chip` fill (`--ag-blue-tint`), `4px` radius, 8px inner padding, icon stroked in `--ag-blue` (or `--ag-ink`). Used for: section header badges, notification bell, file-tag, bell, document section.
- **Active chip** — same dimensions, fill swaps to `--ag-blue`, icon to white.
- **Inline 24×24** — bare icon in the flow of a button or row, no container.

**Avatar conventions.** Two-letter initials in a 24×24 circle, `2px` border in the avatar's identity colour (`--ag-pink` for F, `--ag-violet` for M), `14/400` text in `--ag-ink`. **Always two letters**, both capital, derived from first+last name.

**Unicode chars.** Only typographic punctuation appears in copy — `€`, `°`, `…`, narrow-space inside numbers. **No unicode icons** (✓, ★, →, etc.). Real arrows are SVG.

**Flagged substitutions** *(please review)*:
- `add`, `add_circle`, `archive`, `attach_file` — substituted with Material Symbols Outlined from Google's CDN. Equivalent stroke weight and style. Replace if Test AG has bespoke versions.
- **Inter** is loaded from Google Fonts (not bundled as `.ttf`). Original Figma used Inter Regular / Medium / Semi-Bold; we ship 400 / 500 / 600 / 700 in case a future weight is needed. Please confirm or supply licensed files for `fonts/`.

---

## Index

- `colors_and_type.css` — **import first** in every artifact.
- `preview/` — design-system cards (palette, type ramp, radii, shadows, buttons, cards, status pills, avatars, icon chips, documents tile, the assembled customer dashboard preview).
- `ui_kits/customer-portal/` — `index.html` + `Composer.jsx`-style components for the dashboard:
  - `Header.jsx` — global bar (logo lockup + Contact + signed-in user).
  - `DashboardCard.jsx` — the welcome card with the 4 section nav tabs.
  - `SectionHeader.jsx` — section title with chip + optional KPI/delta.
  - `ContractCard.jsx` — Vivepargne-style row with left rail + estim.
  - `RemboursementCard.jsx` — mutuelle remboursement row with avatar + pills.
  - `TiersPayantCard.jsx` — cyan-tinted side card.
  - `ActionGrid.jsx` — Faire un versement / rachat / versement programmé.
  - `DocumentTile.jsx` — eyebrow + title + meta row.
  - `Pills.jsx`, `Avatars.jsx`, `IconChip.jsx`, `Buttons.jsx` — primitives.
- `assets/` — production-ready SVG icons + the original Figma reference render.
- `SKILL.md` — load this when invoking the skill in Claude Code.
