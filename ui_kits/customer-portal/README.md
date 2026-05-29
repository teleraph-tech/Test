# Customer portal — UI kit

High-fidelity recreation of the **Test AG espace client** dashboard from `AG2.fig`.

## What's here
- `index.html` — interactive demo. Open this.
- `styles.css` — all kit CSS, importing `../../colors_and_type.css` + `../../assets/icons.css`.
- `components.jsx` — atomic kit: `GlobalHeader`, `HeroBand`, `WelcomeCard`, `SectionHeader`, `RemboursementCard`, `ContractCard`, `TiersPayantCard`, `ActionGrid`, `DocumentTile`, `DocumentStrip`, `DonutCard`, `Avatar`, `Pill`, `GrowthPill`, `IconChip`, `Icon`, `Btn`, `Link`, `Modal`, `NotifPanel`, `Toast`.
- `app.jsx` — wires the components into the live dashboard.

## Interactive states
- **Nav tabs** (welcome card) scroll-snap to their section.
- **Notification bell** opens a side panel.
- **Remboursement** / **contract** rows show hover + selected (blue border + blue rail).
- **Faire un versement / rachat / versement programmé** opens a modal with contract + amount.
- **Télécharger votre carte TP** + **Tous vos remboursements** + tile clicks fire a toast.

## Cosmetic-only
This is a high-fidelity *visual* recreation; no real data, no real navigation, no auth, no API. Drop in real components and data when productionising.

## Known gaps vs source
- The dashboard hero is reproduced as a dark cool-toned synthetic gradient; the source uses a real foliage photograph. Swap in the real asset (or treat it as an `<image-slot>`).
- The brand mark is a placeholder geometric lockup (`TEST AG · ESPACE CLIENT`). Replace with the real wordmark / logotype when supplied.
- Material Symbols glyphs (`add`, `add_circle`, `archive`, `attach_file`) are stand-ins using inline SVG matched to the Figma's 2-px stroke style.
