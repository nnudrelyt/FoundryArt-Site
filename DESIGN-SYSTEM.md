# Linden Workshops — Design System

Single source of truth for the LW visual language as shipped on the master landing (`/`). All values are codified in `/assets/tokens.css` and documented here.

This is what every other LW page should look like — `/bronzework-studio/`, `/talisman/`, `/our-team/`, collection detail pages, `/about/`, `/contact/`, `/where-to-buy/`, and any future LW page. The Foundry Art e-commerce flows (`/foundry-art/**`) are scoped separately and keep their own redesign aesthetic.

---

## 1. Scope

The LW design system is active wherever `<body data-section="linden|bronzework-studio|talisman">` is set. The selectors in `/assets/styles.css` are explicitly namespaced by this attribute (lines 2790–5007).

The Foundry Art shop (`/foundry-art/**`) sets `data-section="foundry-art"` and inherits a different visual system. **Don't apply LW tokens to Foundry Art pages** — and don't apply Foundry Art conventions to LW pages. The Foundry Art shell has its own rules; see §9.

---

## 2. Token reference

All tokens live in `/assets/tokens.css` under `:root`. Cite them with `var(--lw-name)` — never hard-code raw hex or px values in new work inside the LW scope.

### Colors

| Token | Value | Used for |
|---|---|---|
| `--lw-bg-page` | `#FFFFFF` | Page background, footer-row background |
| `--lw-bg-header` | `#E6E4DD` | Top header strip behind LW wordmark + nav |
| `--lw-bg-panel-bronzework` | `#E0E0E0` | Bronzework studio panel |
| `--lw-bg-panel-foundry` | `#E0DED5` | Foundry Art studio panel |
| `--lw-bg-panel-talisman` | `#F7F7F7` | Talisman studio panel |
| `--lw-bg-caption-strip` | `#EDECEC` | Lighter shade behind card title + body |
| `--lw-bg-featured-designer` | `#F0F0F0` | Featured Designer section |
| `--lw-bg-team-row` | `#E0DED5` | Team B&W row |
| `--lw-bg-buy-dark` | `#1F1F1F` | **Exception** — dark Buy CTA band |
| `--lw-text-primary` | `#000000` | Body copy, headlines |
| `--lw-text-secondary` | `#757367` | (Reserved for muted secondary nav text — currently unused after the round-5 nav recolor) |
| `--lw-text-muted` | `#999999` | Copyright |
| `--lw-accent-red` | `#A31414` | Inline links, "fine tile showrooms", FA shop CTA |
| `--lw-accent-red-hover` | `#7A0E0E` | Hover state on red links |
| `--lw-border-subtle` | `rgba(0,0,0,0.18)` | Showroom Login outline, FA shop CTA outline |
| `--lw-border-dark-divider` | `rgba(255,255,255,0.18)` | Vertical rule between Buy CTA cards |
| `--lw-border-input` | `rgba(0,0,0,0.30)` | Form input borders |
| `--lw-btn-gray` | `#CCCCCC` | Submit button background |
| `--lw-btn-gray-hover` | `#999999` | Submit hover |

### Typography

Two families:
- **`--lw-font-serif`** = `'Fanwood Text', Georgia, serif` — Headlines, section headings, card titles, taglines on mobile/tablet
- **`--lw-font-sans`** = `'Open Sans', Helvetica, sans-serif` — Body copy, nav, form labels, footer copy, card descriptors

Sizes scale by breakpoint. The token suffix indicates target:
- `-m` mobile (≤768)
- `-t` tablet (769–1024)
- no suffix = desktop (1025–1439, the system "base")
- `-w` wide (1440+)

See the token reference table in `tokens.css` for all sizes.

### Spacing

| Token | Value | Used for |
|---|---|---|
| `--lw-panel-margin` | `25px` | White inset border around studio panels — all breakpoints |
| `--lw-panel-padding-m` | `36px 32px 32px` | Mobile inner padding (gives 261 px cards at 375 vp) |
| `--lw-panel-padding-t` | `56px` | Tablet uniform padding |
| `--lw-panel-padding-d` | `80px 60px 60px` | Desktop |
| `--lw-card-gap-m` | `25px` | Stacked single-column cards |
| `--lw-card-gap-t` | `36px` | Tablet single-column cards |
| `--lw-card-gap-d` | `42px` | Desktop 3-up grid |
| `--lw-team-photo-w` | `790px` | Team B&W photo width (desktop) |
| `--lw-footer-logo-max` | `460px` | Linden Workshops wordmark in footer |
| `--lw-form-gap` | `22px` | Vertical gap between form fields |

### Breakpoints (literal — used in `@media`)

| Range | Behaviour |
|---|---|
| **≤ 768** mobile | 1-col cards (261 px wide at 375 vp), hero wordmark buttons hidden, nav hidden, type scaled down |
| **769 – 1024** tablet | 1-col cards full panel width, hero wordmark buttons visible, type scaled up |
| **1025 – 1439** desktop | 3-col cards (Bronzework), 2-col (Foundry), 1-col (Talisman) |
| **1440 – 1919** wide | Same as desktop with bumped type sizes and padding |
| **≥ 1920** cinema | Further bumped type + padding |

CSS variables can't drive `@media` directly, so the literal pixel values appear inline in the `@media` rules. Keep them in sync with the comments in `tokens.css`.

---

## 3. Components

Each entry lists: structure (HTML), classes, tokens used, behaviour notes, and the CSS line range in `styles.css`.

### 3.1 Header

```html
<header class="lw2-header">
  <div class="lw2-header-left">
    <button class="studios-toggle lw2-studios-toggle">...</button>  <!-- dot-grid drawer trigger -->
    <a href="/" class="lw2-logo"><img src="/assets/images/linden/wordmarks/linden-workshops.png" alt="Linden Workshops"></a>
  </div>
  <nav class="lw2-nav">
    <a>...</a>
    <a class="lw2-login">Showroom Login</a>
  </nav>
</header>
```

- Tokens: `--lw-bg-header`, `--lw-text-primary`, `--lw-border-subtle`, `--lw-font-sans`
- Logo `vertical-align: middle` + parent `display: flex` so the wordmark is true-centered against the dot-grid + nav row
- Showroom Login: thin black border, fills black on hover
- Mobile: nav hidden, logo height 24 px
- CSS: lines 2852–2899, 4313–4341

### 3.2 Hero

```html
<section class="lw2-hero">
  <div class="lw2-hero-bg"><img src="/assets/images/linden/hero-mcqueen.jpg"></div>
  <div class="lw2-hero-inner">
    <h1>Luxury designer metal accent tile.</h1>
    <p class="lw2-hero-sub">Elevate your home from beautiful to extraordinary.</p>
    <div class="lw2-wordmark-row">
      <a class="lw2-wordmark-link"><img src=".../bronzework-studio.png"></a>
      <a class="lw2-wordmark-link"><img src=".../foundry-art.png"></a>
      <a class="lw2-wordmark-link"><img src=".../talisman.png"></a>
    </div>
  </div>
</section>
```

- Tokens: hero sizes vary by breakpoint (`--lw-fs-hero-h1-m` / `-t` / `-w`, same pattern for sub)
- Dark McQueen photo background (kept as exception vs the live tile-band hero)
- Mobile: wordmark row hidden
- CSS: lines 2903–2946, 3344–3357, 4643–4660

### 3.3 Studio panel

```html
<section class="lw2-studio [lw2-studio--foundry|--talisman]" id="bronzework-studio">
  <div class="lw2-section-mark"><img src=".../bronzework-studio.png" alt="Bronzework Studio"></div>
  <p class="lw2-studio-blurb">Metal inset tiles, liners, and trim.</p>
  <p class="lw2-studio-avail">Available at <a>fine tile showrooms</a></p>
  <div class="lw2-collection-grid">...</div>
</section>
```

- White-inset-bordered panel — `margin: var(--lw-panel-margin)` uniform top/right/left
- bg per studio: `--lw-bg-panel-bronzework` / `-foundry` / `-talisman`
- Padding scales by breakpoint
- Wordmark image rendered at native aspect, width-constrained on mobile (so the cap-height matches across the three brands)
- CSS: lines 3843–3865, 4073–4078, 4664–4673

### 3.4 Section wordmark (cap-height matching)

The three section wordmark PNGs have wildly different aspect ratios:

| Mark | Native | Aspect | Ink ratio (PNG ink ÷ canvas h) |
|---|---|---|---|
| Bronzework Studio | 800 × 56 | 14.3 : 1 | 87.5 % |
| Foundry Art | 800 × 56 | 14.3 : 1 | 89.3 % |
| Talisman | 1280 × 188 | 6.81 : 1 | 96.3 % |

To make them read at the **same visible cap-height**, we use different strategies per breakpoint:

- **Desktop**: explicit `height: N px`. The values `47 / 46 / 43` give matching cap-heights to ~ 41 px each.
- **Mobile / tablet**: `max-width: N px` + `height: auto` + `object-fit: contain`. Different widths per mark (`--lw-wordmark-width-{bw|fa|tal}-{m|t}`) so each visible cap-height lands at ~ 18 / 22 px respectively.

When adding a fourth brand:
1. Sample the new PNG's ink-to-canvas ratio (Python: count non-transparent pixels per row, find topmost and bottommost rows).
2. Compute heights / widths to land at the same visible cap-height as Foundry Art (the baseline).
3. Add new tokens `--lw-wordmark-width-X-{m|t}` and `--lw-wordmark-height-X-d`.

CSS: lines 2868–2885, 4675–4693, 4281–4289

### 3.5 Collection card

```html
<a class="lw2-card" href="/...">
  <div class="lw2-card-img"><img src="..." loading="lazy"></div>
  <h3>Autograph Collection</h3>
  <p class="lw2-card-body">Graphic borders and insets cast in solid bronze <em>»</em></p>
</a>
```

- No border, no padding on `.lw2-card` itself
- `.lw2-card-img` → `aspect-ratio: 1/1`, `object-fit: cover`
- Caption strip (`h3` + `.lw2-card-body`) has `--lw-bg-caption-strip` background on Bronzework + Foundry Art cards. Talisman card sits on the Talisman panel directly (no separate strip).
- Mobile: card width capped at 261 px (panel inner width at 375 vp)
- CSS: lines 3942–4001, 4718–4736

### 3.6 Foundry Art shop CTA

```html
<div class="lw2-studio-shop">
  <p class="lw2-studio-shop-eyebrow">Visit our online shop</p>
  <a href="/foundry-art/shop/" class="lw2-studio-shop-btn">Shop Foundry Art</a>
</div>
```

- Outer container: no border, transparent bg
- Eyebrow currently `display: none` (live mobile shows no eyebrow). Flip via CSS to show.
- Button: 32 px Fanwood, red text, 2 px red border, transparent bg → fills red with white text on hover
- CSS: lines 4125–4162

### 3.7 Featured Designer block

- Full-width, no side margins (overrides the 25 px panel margin)
- Desktop: 1 : 2 grid (portrait + caption + CTA on left, big kitchen photo on right)
- Mobile: 1-col stack — portrait + caption hidden, headline + CTA + kitchen photo only
- Portrait: 220 × 220 square (no border-radius)
- CSS: lines 4024–4030, 4174–4211, 4231–4279

### 3.8 Buy CTA grid (exception — kept dark)

- Two cards on `--lw-bg-buy-dark` background
- 1 px vertical white-alpha rule between them (full container height)
- Each card padding `136 px 40 px` (= legacy grid 80 + card 56 combined so divider spans full height)
- Mobile: stacks vertically, horizontal divider instead of vertical
- Rollover: button fills white with dark text on either button hover OR parent card hover
- CSS: lines 4035–4036, 4575–4597

### 3.9 Team B&W row

- Desktop: flex row, centered group. 790 × 635 photo + 200 px narrow text column
- Lead copy: 24 px Fanwood
- CTA: inline red `Open Sans 16 px` link
- Mobile: flex column, photo full-width, text centered
- CSS: lines 4218–4375, 4803–4824

### 3.10 Footer (no dark band)

- 2-column grid: philosophy column on left, contact form on right
- Left column: Linden Workshops wordmark + philosophy paragraph + "Our friendly crew" intro + 3-col link grid + vertically-stacked badges (Instagram, Houzz, Tile Heritage with size differentiation: 25 px / 60 px / 50 px)
- Right column: "Contact us!" h2 + phone + form + copyright bottom-right
- Mobile: single column, link grid 1-col, copyright centered
- CSS: lines 4047–4051, 4377–4549

---

## 4. Responsive ladder

| Element | ≤ 768 mobile | 769–1024 tablet | 1025–1439 desktop | 1440 + wide |
|---|---|---|---|---|
| Hero h1 | 36 px Fanwood | 44 px Fanwood | 48 px Fanwood | 76 px Fanwood |
| Hero sub | 22 px Fanwood | 22 px Fanwood | 16 px | 28 px |
| Hero wordmark buttons | hidden | visible | visible | visible |
| Nav | hidden | shown | shown | shown |
| LW header logo | 24 px tall | 32 px | 36 px | 36 px |
| Studio panel margin | 25 px all sides | 25 px | 25 px | 25 px |
| Studio panel padding | 36 / 32 / 32 | 56 px | 80 / 60 / 60 | larger |
| Section wordmark | width-constrained per brand | width-constrained per brand | height-constrained per brand (cap-height matched) | larger heights |
| Studio tagline | 19 px Fanwood | 22 px Fanwood | 16 px Open Sans | 17 px |
| Bronzework grid | 1-col, card cap 261 px | 1-col, full panel | 3-col | 3-col |
| Foundry Art grid | 1-col | 1-col | 2-col | 2-col |
| Card h3 | 24 px Fanwood | 28 px Fanwood | 24 px Fanwood | 26 px |
| Card body | 16 px Open Sans | 18 px Open Sans | 16 px | 17 px |
| Featured Designer | 1-col, simplified (no portrait / caption) | 1-col with portrait + caption + CTA | 1 : 2 grid | 1 : 2 grid |
| Buy CTAs | stack vertical, horizontal divider | stack vertical, horizontal divider | 2-col, vertical divider | 2-col |
| Team B&W | flex column, photo full-width | flex column, photo max 600 px | flex row, 790 × 635 photo + 200 px text | row |
| Footer | 1-col | 2-col, link grid 3-col | 2-col, link grid 3-col | 2-col |

---

## 5. Exceptions

These are deliberate divergences from `lindenworkshops.com`, retained per brand-owner direction:

1. **Dark McQueen hero** — `/index.html` uses a dark tile-detail photo overlaid with white type. The live LW landing uses a lighter bronze-tile-on-marble band with three wordmark buttons stacked below on white. Our version overlays the wordmark buttons on the dark photo.
2. **Dark `#1F1F1F` Buy CTA grid** — the live site shows two light bordered cards on tan. Ours stays dark.
3. **Foundry Art shop CTA** — links to internal `/foundry-art/shop/` with the text "Shop Foundry Art", not the live's `claremonttile.com` button. Per brand-owner directive in NOTICE.md.
4. **`/foundry-art/` keeps the Foundry Art *redesign*** — dark McQueen hero, "Cast by hand", shop CTAs. The live LW-styled FA landing is not replicated. The master landing's "Foundry Art" section still links to `/foundry-art/`.
5. **Studios drawer (dot-grid trigger)** — present in our header, not in the live header.
6. **Top notice bar hidden** — the live site shows a "Lowitz & Company is now Linden Workshops" notice. Our build hides it; the markup is left in place so it can be toggled back with one CSS line.

---

## 6. Asset sourcing

For pages being built from the live site:

1. Identify referenced imagery — `curl https://lindenworkshops.com/<path>/ | grep wp-content/uploads`.
2. Download to `assets/images/linden/<page>/`.
3. Append a row to `NOTICE.md` covering source URL + that it's a placeholder.
4. Higher-resolution originals from the brand owner should swap in before any production launch.

Brand assets we already have:
- All 4 wordmark PNGs in `assets/images/linden/wordmarks/`
- Hero, team, Featured Designer, Talisman cover under `assets/images/linden/`
- 3 footer badges under `assets/images/linden/footer/`

---

## 7. Workflow

1. New page work cites `var(--lw-*)` exclusively. No raw hex / px inside the LW scope.
2. After implementing a new page, grep the file for stray hex literals — `grep -nE "#[0-9A-Fa-f]{3,6}"`. Exceptions only for documented divergences (see §5).
3. Render local + lindenworkshops.com side-by-side at 1440 + 375 before pushing (existing `/tmp/lw-audit/sxsN.jpg` workflow).
4. Cache buster on `styles.css` + `tokens.css` bumped at every release.
5. Single commit per page or template propagation batch.

---

## 8. Collection-detail template (Precision reference)

The per-collection landing template, scoped to `body[data-page="autograph|precision|classic|instinct"]` under `data-section="linden"`. **`/precision/` is the canonical, finished reference** — rebuilt 1:1 against `lindenworkshops.com/precision/` and matched to its *computed* values (read live via the browser inspector at the reviewer's actual viewport width, ~2251px). Built by assembling existing LW components, not bespoke CSS. CSS lives in `styles.css` under the "PRECISION page — assembled from existing LW components" block + the matching `@media` block; most rules are currently scoped `body[data-page="precision"]` (see Cloning below).

Sections, in document order, with the component each reuses:

1. **Masthead** (white) — `.lw2-coll-masthead`: `.lw2-section-mark` dominant Bronzework wordmark (`height:46px`) → `.lw2-coll-title` (Fanwood 28px, subordinate) → derived `.lw2-coll-subnav` (Open Sans 13px caps, top/bottom hairline rules; links inherit the LW link-red — see §below). Anchors `#profiles`/`#design-ideas`/`#further-information`.
2. **Hero** — full-bleed `.lw2-coll-hero` wrapping `.lw2-media-carousel` (cross-fade, wired by `initMediaCarousels()`), stage overridden to 16:9. `.lw2-coll-hero-overlay` = a centered semi-transparent white scrim (`rgba(255,255,255,0.66)`) holding `.lw2-coll-hero-tagline` (Fanwood 32px) + `.lw2-coll-hero-sub` (Fanwood 24px). Autoplays forward via a small inline script (pauses on hover/focus/reduced-motion/hidden tab).
3. **Intro** — `.lw2-coll-intro` (`max-width:1200`) → one Fanwood **40px** statement.
4. **Profiles** (side-by-side) — `.lw2-collection-grid--two` + two `.lw2-card`. **Uncapped** container (`max-width:none`, padding `2.5%`, gap `3.2%`) so each array image is ~**45.9% of viewport** like live (1034px @2251). Images shown at natural 3:2 (no square crop). Heading Fanwood 27px, body Open Sans 16px/28 #000.
5. **Finish band** — `.lw2-coll-finish` (`max-width:1390`, centered): Fanwood **40px/60** heading, `.lw2-coll-finish-image` capped at **1166px** (live render width), `.lw2-coll-finish-note` Fanwood 24px/36.
6. **Design Ideas** — `.lw2-coll-gallery`: **4-column CSS masonry** (`column-count:4`, `column-gap:34px`), uncapped with ~32px (1.4%) side padding; thumbs ~521px @2251. Each `.lw2-coll-gtile` is a `<button>` (image + `.lw2-coll-gcaption`, Open Sans 13px/#000 left). Opens a self-contained `.lw2-lightbox` (keyboard nav, scroll-lock). Tablet 3-col / mobile 2-col.
7. **Further Information** — `.lw2-coll-info` panel **`#E0E0E0`** (`--lw-bg-panel-bronzework`); 4 PDF cards, plain black labels (no arrow); centered `.lw2-coll-showroom-btn` (thin black border, `rgba(255,255,255,0.5)` bg, black text → red text on hover, **no fill**) → `/where-to-buy/`. Card gap 72px.
8. **Also available from** — `.lw2-coll-also` panel **`#E0DED5`** (`--lw-bg-team-row`); heading = `.lw2-coll-also-eyebrow` ("Also available from") + `.lw2-coll-also-wordmark` (Bronzework PNG, 40px). Two `.lw2-coll-also-card`, uncapped/~46% like profiles, 3:2 images, `.lw2-coll-also-caption` strip **`#EDECEC`** (Fanwood 28px title + Open Sans 16px desc).

**Imagery:** WebP via `<picture>` + JPEG/PNG fallback throughout (`body[data-page="precision"] picture { display:contents }`); `loading="lazy"` on gallery tiles. Page image payload ~3.8 MB (−70% vs source).

**Known divergence:** the sub-nav + "Classic Collection" links render in `--lw-accent-red` because of the global `body[data-section="linden"] a:not(...)` rule (line ~3379, ~15 `:not()` classes → very high specificity). Override needs `!important` or adding the class to that `:not()` chain (how the showroom button forces black).

**Cloned to autograph (2026-07-16).** `autograph/` now takes the template via the shared
`:is(body[data-page="precision"],body[data-page="classic"],body[data-page="autograph"])` selector lists
(76 of them). Its ~101 legacy `body[data-page="autograph"]` base rules are still in the earlier
collection-detail block and remain the *base layer* — the precision block overrides them later in the
cascade, exactly as it does for classic. Decisions taken:
- **Masthead hierarchy flipped** to DS §8.1 — the 56px title / 24px wordmark inversion is gone; now a
  dominant 46px Bronzework wordmark over a subordinate 28px title. Markup moved from `.lw2-coll-brand`
  to `.lw2-section-mark` (the template hook).
- **Sub-nav added** — Design Ideas / Tiles / Further Information, anchored to `#design-ideas`
  (portraits), `#tiles` (liners), `#further-information` (info panel). Mirrors live.
- **Signature section added** (`.lw2-coll-signature`) — the Fitzgerald signature is live row 3 and was
  missing from the mirror entirely. 79px tall, matching live's 224×79 render.
- **Intro reconciled** — autograph's intro carries two elements (pull-quote + lede) where precision
  carries one 40px statement. The quote takes the 40px statement role; the lede steps down to the
  template's established 24px secondary (= hero-sub / finish-note). See the AUTOGRAPH reconciliation
  block at the tail of the precision CSS.
- **Info panel** — was `#F2F0E9` (drifted in from the *Inspiration* article template, a different
  component family); now the template's `#E0E0E0`. Arrows dropped from labels per §8.7; real 2024 PDFs
  wired (were `href="#"`).
- **Also block** — eyebrow + 40px wordmark head and `#EDECEC` caption strips per §8.8; panel `#E0DED5`.
- **`instinct/` needs no clone.** Live `/instinct/` is genuinely minimal (one logotype, 3 headings,
  267 chars — no hero/gallery/info). The existing mirror already matches it 1:1; applying this template
  would invent a page the client doesn't have. Its small size is correct, not debt.

**Cloning to classic (remaining):**
- The precision rules are mostly scoped `body[data-page="precision"]`. To propagate, **generalise those selectors to the shared `autograph|precision|classic|instinct` list** (or duplicate per page), then per page swap: parent wordmark, collection title, sub-nav anchors, carousel slides + tagline, the two profile cards (image + finish copy), the finish band, the Design Ideas image set + captions, the Further-Information PDFs, and the two "Also available" sibling collections.
- Match each against its live page with the same inspector-at-reviewer-width method before shipping.

**Further Information panel now shared with `/showroom-zone/` (2026-09-01).** The
Showroom Zone's Literature block *is* §8.7 — `body[data-page="showroom-zone"]` was
added to the 12 shared `.lw2-coll-info*` / `.lw2-coll-section-title` selector groups
(base + both `@media` blocks) and to the four precision-block `:is()` overrides, so
the panel, thumbnails and card labels come from one definition. Five
showroom-only deltas, and the reason for each:

- **Card titles accept `h3` or `h4`.** The zone nests its cards under group
  headings (`h3` Tear Sheets / Installation and Cleaning / Other), so the card
  labels step down to `h4`. The showroom-zone twins of the card-title rules are
  written `.lw2-coll-info-card :is(h3, h4)`.
- **Fixed-width, centred tracks instead of `repeat(4, 1fr)`.** Collection pages run
  one 4-up row; the zone runs groups of 4 / 3 / 1. `repeat(auto-fit, 230px)` +
  `justify-content: center` collapses the unused tracks so short groups centre under
  their heading instead of hanging off the left, and each breakpoint's `max-width` is
  a `calc()` off the shared `--zone-card` / `--zone-gap` pair so the measure can't
  drift from the gap. This block **must stay after the precision `:is()` overrides** —
  they match at equal specificity and would otherwise win on source order. Tablet
  wraps 4 → 3 + 1 rather than squeezing the thumbnails below their native width.
- **White panel (brand-owner direction, 2026-09-01).** The collection pages'
  `#E0E0E0` ground is what separates the thumbnails from the page; the zone runs on
  white instead. The 80px top comes in to 64 — it was sized to give a colour band
  breathing room, and without the band it reads as a hole. The 88px bottom stays:
  the panel is the last block before the footer.
- **Group titles are sans labels, not headings (brand-owner direction, 2026-09-01).**
  Settled after several passes:

  | Heading | Face |
  |---|---|
  | `Literature` (h2) | Fanwood 32px / 26px mobile — the shared rule, unmodified |
  | The three group titles (h3) | **Open Sans 600 15px**, `letter-spacing: 0.02em` |
  | Sheet names (h4) | **Open Sans 16px** |

  At 15px the group titles sit *below* the 16px sheet names they head, so they read
  as labels above each set rather than as headings in their own right; weight and
  tracking carry them. The size holds at every breakpoint — no mobile step-down.
  **The rules live in the trailing block**, after the shared `@media` rules — a size
  restated only in the earlier 640px block is dead, because the trailing rules match
  at equal specificity and win on order. This bit us once already.
- **The document carries its own edge.** A consequence of the white panel: a white
  PDF page on a white ground has no boundary. So the 18px white mat is dropped
  (`padding: 0`), a `--lw-border-subtle` hairline is drawn on the sheet, and a soft
  shadow lifts it off the page — a sheet of paper rather than a bleeding rectangle.
  Hover deepens both, alongside the shared red label rollover.

The page carries **no contact form of its own** — the footer form is the only one, and
the price-list note links to it (`#contact`). Everything else is existing idiom: the
hero follows the `/contact/` leaf and the price-list note is a plain centred measure.
The note sits **with the hero, above the literature** — it answers the question
showroom staff arrive with, so it shouldn't trail the list — and reads as part of the
same opening statement, so the hero's bottom padding is half a normal section break
(28px desktop / 16px mobile) rather than the full 56/32. The gate and the
zone are two states of the same URL, as on live — the prototype swaps them on submit
without checking a password (a client-side check would be theatre), and
`?showroom=open` deep-links past it for review.

---

## 9. Foundry Art shell

Not part of the LW system. Documented here so the two aren't confused and so the
Foundry Art conventions have one place to live.

**Scope hook:** `<body data-section="foundry-art">`, set statically in the markup
of all 24 `/foundry-art/**` pages. `navHTML()` also normalises it at runtime, but
the attribute is written into the HTML deliberately — CSS that styles static
content through a JS-applied attribute paints unstyled first and then snaps.

### 9.1 Typography

| Role | Family |
|---|---|
| Display — page titles, card headlines | `'Cormorant Garamond', serif` (300/400/500/600) |
| Everything else — UI, body, labels, data | `'Jost', sans-serif` |

**Jost loads as a variable face across 100–900** (`family=Jost:wght@100..900`).
Google serves the whole variable font regardless of the sub-range requested, so
the full range costs the same 26.6 KB as any narrower slice — and ~53 KB less
than the three static weights this previously loaded. Any weight 100–900 is
available, including fractional values.

**Emphasis is 500, not 700.** `<strong>`, `<b>` and `<th>` are pinned to 500
across the shop, cart, checkout, order-received and account pages. This began as
a workaround (700 wasn't loaded, so browsers faked it by smearing the 400
outline) and is now a deliberate choice: 700 Jost is heavy in the small tracked
caps this UI leans on. Raise the value in that rule if a surface should shout;
don't delete the rule and let the browser default decide.

**Type floor** — reach for these instead of hard-coding sub-13px sizes:

| Token | Value | Use |
|---|---|---|
| `--fs-control` | 15px | Inputs, selects, buttons |
| `--fs-body` | 15px | Running and support text |
| `--fs-fine` | 13px | Helper text, captions — the smallest allowed |
| `--fs-eyebrow` | 12px | Uppercase tracked labels |

### 9.2 Corner radius

Two values. Anything else is drift.

| Radius | Applies to |
|---|---|
| **3px** | Buttons, chips, status pills, the SALE badge, facet checkboxes, the sort select, account cards |
| **4px** | Form fields — inputs, selects, textareas |

### 9.3 Buttons

All five variants carry the 3px radius, set once for the whole shell:

```css
body[data-section="foundry-art"] :is(
  .btn-primary, .btn-secondary, .btn-primary-lg, .btn-ghost, .btn-sample
) { border-radius: 3px; }
```

| Class | Role |
|---|---|
| `.btn-primary` | Primary action — charcoal fill, white label |
| `.btn-secondary` | Secondary — charcoal outline, transparent fill |
| `.btn-primary-lg` | Large primary, footer CTA band |
| `.btn-ghost` | Tertiary on dark grounds |
| `.btn-sample` | PDP sample request — bronze outline |

Role sizing is unified separately (one definition per role rather than per
page); see the "Type & control scale" block near the end of `styles.css`.

**LW buttons stay square.** The rule is namespaced to the Foundry Art section
precisely so `.lw2-studio-shop-btn` and the LW nav CTA are unaffected.
