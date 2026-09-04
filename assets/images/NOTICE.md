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
| square-3x3 | main + traditional + white + 1 gallery — client archive |
| lotus-2x2 | main + traditional + white + 1 gallery — client archive |
| moon-blossom-2x2 | main + traditional + white + 1 gallery — client archive, 600px |
| lotus-1x1 | main + traditional + white + 1 gallery — client archive |
| moon-blossom-1x1 | main + traditional + white + 1 gallery — client archive, 600px |
| aspen-leaf-1x1 | main + traditional + white + 1 gallery — client archive |
| dove-1x1 | main + traditional + white + 1 gallery — client archive |
| pinwheel-1x1 | main + traditional + white + 1 gallery — client archive |
| pyramid-1x1 | main + traditional + white + 1 gallery — client archive |

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

### The 2026 price-list additions (added 2026-09-04) — CLIENT-SUPPLIED, rights-clear

Fourteen pieces from the *Foundry Art RETAIL Prices 2026* list were added to the
catalog on 2026-09-04. **Their photography came from the client's own archive**,
not from a third-party site — `Foundry Art/_Assets/Photography`, the Dropbox
mirror of the Google Drive folders Stacza shares. Unlike everything listed above,
these do **not** need to be re-shot or re-licensed before launch.

Sources, by folder:

- **`Foundry Art Insets-White Background-JPG/`** — 800×800, named by price-list
  SKU code, same shoot as the existing on-site flats. Used for
  `square-3x3` (TSQU33/WSQU33), `lotus-2x2` (TLOT22/WLOT22),
  `lotus-1x1` (TLOT11/WLOT11), `aspen-leaf-1x1` (TASL11/WASL11),
  `dove-1x1` (TDOV11/WDOV11), `pinwheel-1x1` (TPIN11/WPIN11) and
  `pyramid-1x1` (TPYR11/WPYR11) → `traditional.jpg` + `white.jpg` (+ `main.jpg`,
  a copy of `traditional.jpg`, matching the existing folders).
- **`ALL Foundry Art Individual Tiles/Foundry Art Tile Images - 2015 Website finals/`**
  — 600×600. Used for `moon-blossom-2x2` (`FA-MoonBlossom-Med-*`) and
  `moon-blossom-1x1` (`FA-MoonBlossom-Gem-*`). **Moon Blossom is absent from the
  white-background set at all three sizes** — worth asking Stacza whether a
  white-background MOB set exists that did not make it into the mirror. Until
  then these two sit at 600px while their neighbours are 800px.
- **`Foundry Art Insets-Oblique Angle-JPG/`** — 600×600 angled views, used as
  `gallery-1.jpg` (the "Studio shot" thumb) on all nine tiles above.
- **`Foundry Art Knobs and Pulls/FA Knobs and Pulls Mounted-PSD/`** — 2240×2240
  layered PSDs, flattened to 800px JPEG with
  `sips -s format jpeg -s formatOptions 82 -Z 800`. Both alloys exist, so the
  three new knobs carry a real White Bronze shot rather than reusing the
  Traditional one: `aspen-leaf-knob`, `pinwheel-knob`, `pyramid-knob` →
  `<piece>-mounted.jpg` (Traditional) + `<piece>-white-mounted.jpg` (White
  Bronze). `bar-pull-10` → `pull-10in-white-mounted.jpg`, White Bronze only,
  because Traditional (TFAP10P) is discontinued on the 2026 list.

`dove-knob` was the fourteenth and already had `hardware/dove-knob-mounted.jpg`
sitting unused in the tree.

**One exception to the rights-clear claim above.**
`hardware/pull-10in-in-hand-bw.jpg` is the in-hand frame from Claremont Tile's
live listing (`claremonttile.com/wp-content/uploads/2018/01/Foundry-Art-cabinet-drawer-pull-metal-bronze-10in-hand-copy.jpg`,
added 2026-09-04 at the brand owner's request so the 10-inch pull matches what
customers already see at retail). It carries the same placeholder status as the
Claremont photography listed further up and must be cleared or replaced before
launch. It was chosen over Claremont's other two shots because it is monochrome:
those are Traditional Bronze, and this catalog lists the pull in White Bronze
only, so a colour frame would show the wrong alloy.

The 10-inch pull now lists **both** alloys, matching Claremont's page and the
rest of the catalog, with Traditional Bronze marked discontinued per the 2026
list rather than hidden. Its Traditional shot (`pull-10in-mounted.jpg`) is the
archive's own `Foundry Art Pull 10 inch Traditional Bronze mounted.psd`, so it
is rights-clear and pairs with the White Bronze frame from the same shoot.

Still worth reconciling with Stacza: Claremont sells the Traditional pull as
available, the price list calls it discontinued. One of the two is out of date.

**The archive covers 26 of the 27 catalogued pieces**, so it is the route to
retiring the Claremont Tile placeholders above — the only gap is Moon Blossom's
white-background treatment, including the 3×3 that is already live. Re-sourcing
the other eleven was deliberately left out of this pass (brand owner, 2026-09-04:
the current on-site shots look right as they are).

Not used: the archive also holds a **Square 2×2** (`FA_Square_2x2_*`) that does
not appear on the 2026 price list.

### Other

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

## Bronzework Studio page (added Phase 2)

- assets/images/linden/inspiration/drury-glen-ellyn-kitchen.jpg — source: lindenworkshops.com/wp-content/uploads/1600-x-900-Well-Dressed-Traditional-Glen-Ellyn-Kitchen-drury-design21.jpg. Used in /bronzework-studio/ design inspiration callout. Placeholder pending brand-owner asset swap before production.

## Talisman page (added Phase 2)

- assets/images/linden/talisman/hero-tile-pattern.jpg — source: lindenworkshops.com/wp-content/uploads/white-ceramic-tile-decorative-pattern-design-ideas-1280x1280.jpg. Used as Talisman page full-bleed hero with overlaid tagline. Placeholder pending brand-owner asset swap.

## Autograph collection page (added Phase 3, prototype for collection-detail template)

All images below were pulled from `lindenworkshops.com/wp-content/uploads/` and live in `assets/images/linden/autograph/`. Filenames preserved verbatim from source so provenance is unambiguous. Used as placeholder pending brand-owner asset swap before production launch.

**Lifestyle / hero photos** (`750x450` crops of `1900x{1267,1068}` originals):
- `Autograph-Dahlia-Whiskey-1-1900x1267-750x450.jpg` — Traditional Bronze Octave + Dahlia, white marble
- `Autograph-Bebop-mirrors-e1494948609232-1900x1068-750x450.jpg` — Traditional Bronze Bebop + Squares, white marble

**1×12 inch accent liner strips** (1900×~180):
- `Octave_full-1900x182.jpg`, `Galileo-1900x181.jpg`, `Quadrile_full-1900x187.jpg`, `Tuxedo_full-1900x183.jpg`, `Beebop_full-1900x178.jpg`

**Featured tile portraits — character-named installs** (220×345):
- `James-Bond-2016-1-220x345.jpg`, `Juliet-2016-220x345.jpg`, `Bruce-Wayne-2016-220x345.jpg`, `Mrs-Robinson-2016-220x345.jpg`, `Holly-Go-Lightly-2016-2-220x345.jpg`

**Inset tile catalog**:
- `Square-600-1-325x225.jpg` — 1×1 inch inset, Traditional Bronze
- `Dhalia_full-325x225.jpg` — 2½ inch inset, Traditional Bronze
- `Dahlia-600-293x293.jpg` — Dahlia, Traditional Bronze square crop
- `BWS-Dahlia-White-Bronze-300x300.jpg` — Dahlia, White Bronze square crop

**Tear sheet PDFs (preview images only — the actual PDFs are not mirrored here)**:
- `BWS-tear-sheet-Autograph-2024-08-08_Page_1-230x300.jpg`
- `BWS-2024-How-We-Make-Our-Tiles-230x300.jpg`
- `BWS-2024-Recycled-Content-230x300.jpg`
- `BWS-Installation-and-Cleaning-BRONZE-and-ZINC-2024-08-08-230x300.jpg`

**"Also available from" sibling-collection cross-link cards**:
- `Bronzework-Studio-Precision-Square-Brass-herringbone-floor.jpg` — links to /precision/
- `Bronzework-Studio-Beach-Grass-Liner-Zinc-black-stone-floor.jpg` — links to /classic/

## Precision collection page (added Phase 3)

Assets in `assets/images/linden/precision/`. All pulled from `lindenworkshops.com/wp-content/uploads/`, filenames preserved. Placeholder pending brand-owner swap.

**Hero / lifestyle**:
- `Bronzework-Studio-Hepburn-Brass-liner-Terrazzo-floor-1900x1267.jpg` — masthead banner
- `Bronzework-Studio-Precision-Liner-Living-Brass-Herringbone-Floor-1280x720.jpg` — lifestyle 1
- `Bronzework-Studio-Precision-Dome-Liner-Danish-Tea-2560x1440-1.jpg` — lifestyle 2
- `10-Bronzework-Studio-Monmouth-Street-bath.jpg` — in-context install banner-strip

**Profile arrays** (2-up Square + Dome):
- `Precision-Square-Array-2025-web.jpg`, `Precision-Dome-Array.jpg`

**Finish comparison**:
- `Empire-and-Hepburn-13-v2-scaled.jpg` — Empire high-luster vs Hepburn low-luster

**Named installs** (5-up portrait gallery):
- `Genevieve-2016-…`, `Mondrian-2016.jpg`, `Annalees-Trio-2016-300x300.jpg`, `Debussy-2016-…`, `Fitzgerald-1-…-300x300.jpg`

**Tear-sheet PDF previews**:
- `BWS-tear-sheet-Precision-Square-…`, `BWS-tear-sheet-Precision-Dome-…`, `BWS-Installation-and-Cleaning-Precision-Square-Brass-Stainless-liners-…`
- Reuses `BWS-2024-How-We-Make-Our-Tiles-230x300.jpg` from /autograph/

## Classic collection page (added Phase 3)

Assets in `assets/images/linden/classic/`. All pulled from `lindenworkshops.com/wp-content/uploads/`, filenames preserved. Placeholder pending brand-owner swap.

**Hero / lifestyle**:
- `Zinc-array-v2-1900x1106.jpg` — masthead banner
- `traditional-bronze-tile-accent-petroglyph-black-bathroom.jpg` — lifestyle 1
- `white-bronze-tile-accent-marble-glass-bathroom.jpg` — lifestyle 2
- `BWS_BLL_Cello_Full_03-05.jpg` — Blooming Leaf family banner-strip

**Hand-carved tile patterns** (5-up portrait gallery):
- `BWS-BloomingLeaf-Lg-Traditional-Bronze.jpg`, `BWS-Mantra-Lg-Traditional-Bronze.jpg`, `BWS-Petroglyph-Lg-Traditional-Bronze.jpg`, `BWS-Sunrise-Med-Traditional-Bronze.jpg`, `BWS-Terrace-Lg-Traditional-Bronze.jpg`

**Liners** (5 full-bleed strips):
- `Origin-Edit-2-1-1900x254.jpg`, `BWS-Flowing-Lnr-Traditional-Bronze-1900x262.jpg`, `BWS-Roman-Lnr-Traditional-Bronze-1900x262.jpg`, `BWS-Mosaic-Lnr-Traditional-Bronze-1900x262.jpg`, `BWS-BeachGrass-Lnr-Traditional-Bronze-1900x262.jpg`

**Inset tiles**:
- `BWS-Water-Song-Inset-Traditional.jpg`, `BWS-Beach-Grass-Inset-Traditional1.jpg`
- Plus 2 inset cards reused from /autograph/

**Tear-sheet PDF previews**:
- `BWS-tear-sheet-Classic-4-pages-2024-08-08_Page_1-230x300.jpg`
- Reuses 3 other tear-sheet previews from /autograph/

## Instinct collection page (added Phase 3)

Minimal placeholder per live `lindenworkshops.com/instinct/` — the brand owner's live page has no imagery beyond the Instinct wordmark and cross-links to sibling tile collections.

- `assets/images/linden/wordmarks/instinct.png` — Instinct wordmark, source `lindenworkshops.com/wp-content/uploads/Instinct-logotype.png`
- Sibling cards reuse existing assets from /assets/images/bronzework/, /assets/images/hero/, /assets/images/linden/talisman/.

## Phase 4 leaf pages

### /feature-gail-drury/

Designer-feature article on Gail Drury, CMKBD, of Drury Design (Glen Ellyn, IL). Long-form interview with portrait + 7 in-context kitchen photos. All imagery in `assets/images/linden/drury/`, pulled from `lindenworkshops.com/wp-content/uploads/`. Filenames preserved verbatim.

Photos:
- `Gail-Drury-at-desk.jpg` — portrait, used in article lede
- `Bronzework-Studio-Drury-Design-Tradtional-Kitchen-1-1600x1200-a.jpg`
- `Bronzework-Studio-Drury-Design-Well-Dressed-Traditional-1600x1200-c.jpg`
- `Bronzework-Studio-Drury-Design-Refined-Traditional-Kitchen-4-1198x899-c.jpg`
- `Bronzework-Studio-Drury-Design-Tradtional-Kitchen-2-1600x1200-c.jpg`
- `Bronzework-Studio-Drury-Design-Sophisiticated-Transistional-Kitchen-6-1600x1200-a.jpg`
- `Bronzework-Studio-Drury-Design-Tailored-Timeless-Kitchen-1600x1200-a.jpg`
- `Bronzework-Studio-Drury-Design-White-Warm-Kitchen-1600x1200-a..jpg`

Photo credit (live-site footer): "All designs and photos ©Drury Design." Used here as placeholder pending brand-owner / Drury Design clearance for the redesigned site.

### /where-to-buy/

Showroom directory built from the verbatim live `lindenworkshops.com/where-to-buy/` listing, organized by US region (Midwest, Texas, East Coast, Mid-Atlantic & South, West) plus Canada and Europe. No imagery — all text content from the live page's content_text module. Includes Claremont Tile + Fired Earth referrals (kept here as factual where-to-buy guidance, since those are the live brand owner's official online-sales channels for Foundry Art).

### /about/, /tile-collections/, /contact/

- `/about/` is a content-identical mirror of `/our-team/`. CSS scope extended via comma-list selectors so any future restyle of one applies to both.
- `/tile-collections/` is an index page: 4 brand panels (Bronzework Studio, Foundry Art, Talisman, Instinct) with sub-collection cards linking to the detail pages. Reuses existing wordmarks + sub-brand array imagery.
- `/contact/` is a thin wrapper around the footer-form component with an extended form (Name / Email / Phone / Message) + a sidebar card with studio hours and phone. No new imagery.
