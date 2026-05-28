# Image provenance — placeholders pending replacement

All photography under `assets/images/` was downloaded from third-party sites on 2026-05-20:

- **Product flat shots** (`products/<slug>/`) — `claremonttile.com`
- **Hero, hardware lifestyle** (`hero/`, `hardware/`) — `claremonttile.com`
- **Process / studio + most in-situ lifestyle shots** (`process/`, most of `lifestyle/`) — `americanbathroomtile.com/fa3/` (a sibling Foundry Art instance)

Claremont Tile is Foundry Art's current online sales channel and these images depict actual Foundry Art products and the actual studio process — they're being used here strictly as placeholder visuals so the wireframe layout (Track A and Track B shopping flow) can be reviewed by stakeholders without gray boxes.

**These images must be replaced before any public production launch.** The photographs themselves are likely owned by Claremont Tile or American Bathroom Tile, not Foundry Art / Linden Workshops. The right path is:

1. **Re-shoot in studio** — commission fresh product, process, and lifestyle photography that matches the new brand direction.
2. **Or license from the current rights-holder** — if reusable rights can be cleared, do that explicitly.
3. **Or obtain originals from the foundry's own archive** — Linden Workshops may already hold higher-resolution originals from production shoots.

Until then, the `updates` branch is the only place these images live. Do not promote `updates` → `main` (production `foundry-art-responsive.vercel.app`) without first swapping these out.

## Inventory

### Product flat shots — `assets/images/products/<slug>/`
| Slug | Files |
|---|---|
| lotus-3x3 | main.jpg + 3 gallery |
| cabochon-3x3 | main.jpg + 2 gallery |
| moon-blossom-3x3 | main.jpg + 2 gallery |
| sun-3x3 | main.jpg + 2 gallery |
| water-3x3 | main.jpg + 2 gallery |
| grid-3x3 | main.jpg + 2 gallery |
| pinwheel-3x3 | main.jpg + 2 gallery |
| cabochon-2x2 | main.jpg + 2 gallery |
| center-square-2x2 | main.jpg + 2 gallery |
| cabochon-1x1 | main.jpg + 2 gallery |
| cabochon-1x1-knob | main.jpg + 2 gallery |

### Hero — `assets/images/hero/`
- `bronze-liners-marble.png` — used as homepage hero (Track A + Track B)
- `wall-liner-floor-inset.jpg`, `straight-line-band.jpg` — alternates not currently wired

### Process / studio — `assets/images/process/`
- `carving-wax.jpg` — used on craft section (homepage)
- `polishing-hands.jpg` — used on craft section (homepage)
- Extras not currently wired: `sketches.jpg`, `crucible-smoke.jpg`, `pouring-close.jpg`, `pouring-wide.jpg`, `casting-tree.jpg`, `hand-toning.jpg`, `finishing-stages.jpg`, `lotus-closeup.jpg`

### Lifestyle / in-situ — `assets/images/lifestyle/`
- `bath-cabochon-glass-mosaic.jpg` — featured slot in Design Ideas grid + visualizer default
- `kitchen-moon-blossom-beige.jpg` — Design Ideas + visualizer Kitchen scene
- `bath-straight-line-blue-stone.jpg` — Design Ideas slot
- `floor-lotus-white-stone.jpg` — Design Ideas slot
- `fireplace-sun-travertine.jpg` — Design Ideas slot + visualizer Fireplace scene
- `bath-aspen-half-round.jpg` — Track B Design Ideas slot
- Extras not currently wired: `bath-lotus-ceramic-wall.jpg`, `kitchen-square-black-marble.jpg`, `fireplace-sun-patina.jpg`, `floor-grid-white-bronze.jpg`, `floor-lotus-cream-marble.jpg`, `foyer-lotus-white-limestone.jpg`, `floor-lotus-pinwheel-cream.jpg`, `floor-square-white-limestone.jpg`

### Hardware — `assets/images/hardware/`
- `knobs-pulls-wood.png` — used as hardware section hero (homepage)
- `pull-5in-in-hand.jpg` — used for Bar Pull item (homepage)
- `pull-5in-mounted.jpg` — alternate, not currently wired

## What's still placeholder

A "Wall Hook" hardware item on the homepage has no real photography available yet — it falls back to the `wire-img` label "Wall Hook — photography pending".

Total image weight: ~23 MB across ~63 files. All within reason for Vercel; no CDN or optimization step yet.

---

## Content provenance (LW master + Talisman pages)

The non-Foundry-Art sections (`/` Linden Workshops master landing, `/talisman/`, `/bronzework-studio/`) are wireframes intended to mirror the structure of `lindenworkshops.com`. Short functional labels are reproduced as-is from the live site so the IA reads true:

- Hero headlines and taglines (e.g. "Luxury designer metal accent tile.")
- Section eyebrows ("Available at fine tile showrooms", "Field Patterns and Borders")
- Collection card titles + short descriptors with the live site's `»` arrow style
- CTA button labels ("Find a Showroom", "Contact us directly", "Tear Sheet »")
- Status notices (e.g. Talisman's "not currently in production" banner)
- The rebrand banner ("Lowitz & Company is now Linden Workshops. Updates coming soon!")

**Longer brand-defining prose (the "When you choose tile…" philosophy paragraph, the lead "Since 1990…" sentence) is intentionally left as a marked placeholder slot** styled with a dashed `wire-img` border. The brand owner should paste the canonical copy directly during content review — that keeps the wording in one authoritative place and avoids drift between this static wireframe and the live CMS.

**Claremont Tile mentions** were stripped per brand owner directive:
- The "Buy Foundry Art from our online shop at Claremont Tile" headline now reads "Buy Foundry Art from our online shop" and links to the internal `/foundry-art/shop/`.
- The "Shop claremonttile.com" button became "Shop Foundry Art".
- The drawer's "Foundry Art / Available at ClaremontTile.com" submenu was replaced by "Available direct".

**`/bronzework-studio/` is awaiting source content.** The live page at `lindenworkshops.com/bronzework-studio/` is currently password-protected, so the body could not be inventoried. The current wireframe for that page is a placeholder structure (Classic / Autograph / Precision intros) — it should be updated with canonical copy from the brand owner before this is shared externally.
