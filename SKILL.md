---
name: test-ag-design
description: Use this skill to generate well-branded interfaces and assets for Test AG (a French-language insurance / pension / savings customer-portal style brand), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. Always import `colors_and_type.css` first, then `assets/icons.css` if you need iconography — both define `currentColor`-aware CSS variables so a single `color:` declaration cascades through the design.

If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand. Pay attention to the **CONTENT FUNDAMENTALS** (vouvoiement French, "Votre …" pattern, no emoji, French number formatting) and **VISUAL FOUNDATIONS** (one brand-blue used sparingly for emphasis only, cool-blue drop shadow, 8-radius cards, dark-rail contract rows, blue only on hover/selected) sections of the README before designing.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions about scope and audience, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Cheat sheet
- **Brand blue** `--ag-blue` (#0242F4) — reserved for emphasis: links, primary CTAs, section titles, **hover/selected** state on rows. Never the default for big numbers or row titles.
- **Ink** `--ag-ink` (#0C0C0C) — body text, dark surfaces, default row titles + amounts.
- **Section tint** `--ag-blue-tint` (#E6EEFD) — full-bleed panels behind major sections.
- **Cool-blue shadow** `0 4px 16px rgb(176,188,224)` — *the* elevation in the system. Never use neutral shadows.
- **Inter** only, weights 400 / 500 / 700. Display 24/500, Title 16/700, Body 14/400, Meta 12.
- Cards are 8-radius white surfaces with the cool-blue shadow. Optional 48px dark left rail for contract rows.
- Buttons stay the same size on hover — fill swaps to brand-blue with white text. No press-shrink.
- Iconography: outline stroke, 24px artboard, 2px stroke. Use `assets/icons/*.svg` or the `assets/icons.css` mask classes (`.i.i-heart`, `.i-calendar`, `.i-piggy`, `.i-file`, `.i-bell`, `.i-arrow-up`, `.i-arrow-enter`).
- UI kit lives under `ui_kits/customer-portal/` — `index.html` is a working dashboard you can crib screens from.
