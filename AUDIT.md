# LW master landing pixel-match spec (1440 viewport)

Source: `/Users/tylerdunn/.../Site Update/Screenshots/LIndenWorkshops_1440.png` (2x retina, 2880×13057 → 1440×6528 CSS).

All values below are sampled or measured from pixel data — not estimated.

---

## A. Page-level structure (CSS px, Y top-down)

| # | Block | Y start | Y end | Height | Bg color | Width treatment |
|---|---|---|---|---|---|---|
| 1 | Top notice bar | 0 | ~35 | ~35 | `#D7DDE0` light blue-gray | full-width |
| 2 | Header (LW wordmark + nav) | ~35 | ~100 | ~65 | `#E6E4DD` warm sand | full-width |
| 3 | Hero (dark McQueen + overlays) | ~100 | 686 | ~586 | full-bleed photo | full-width |
| 4 | **White strip** | 686 | 711 | **25** | `#FFFFFF` | full-width |
| 5 | **Bronzework panel** | 711 | 1611 | **900** | `#E0E0E0` cool neutral gray | inset 25px both sides |
| 6 | **White strip** | 1611 | 1643 | **32** | `#FFFFFF` | full-width |
| 7 | **Foundry Art panel** | 1643 | 2773 | **1130** | `#E0DED5` warm tan | inset 25px both sides |
| 8 | **White strip** | 2773 | 2853 | **80** | `#FFFFFF` | full-width |
| 9 | **Talisman section** | 2853 | ~3573 | ~720 | `#F7F7F7` very light cool gray | **narrower inset** (not full-width — needs measurement) |
| 10 | White strip | ~3573 | 3813 | ~240 | `#FFFFFF` | full-width |
| 11 | **Featured Designer** | 3813 | 4533 | 720 | `#F0F0F0` light neutral gray | full-width |
| 12 | White strip | 4533 | 5013 | 480 | `#FFFFFF` | full-width |
| 13 | **Buy CTAs** | 5013 | TBD | TBD | `#E0DED5` warm tan (same as FA) | full-width |
| 14 | Team B&W + copy | TBD | TBD | TBD | TBD | TBD |
| 15 | Footer (wordmark + form) | TBD | TBD | TBD | `#FFFFFF` | full-width |
| 16 | Dark band (badges + ©) | TBD | end | TBD | dark | full-width |

The "white border surrounding the whole thing" = the 25px CSS white page bg showing on the left + right of each panel + the white strips of 25-80px CSS between consecutive panels.

---

## B. Bronzework panel — full detail (the section currently most wrong)

### Frame
- Panel bg: `#E0E0E0`
- Page bg shows through: 25 CSS px on left, 25 CSS px on right (so panel = 1390 CSS wide on a 1440 viewport)
- Panel inner horizontal padding: **0** — cards reach the panel edge with no extra inset
- Panel vertical padding: top + bottom space between panel edge and content — needs precise measurement

### Header content (centered inside panel)
- "BRONZEWORK STUDIO" wordmark — large black serif, all caps, ~`Fanwood Text` style — **target height TBD (need to measure)**
- Tagline "Metal inset tiles, liners, and trim" — black serif italic
- "Available at fine tile showrooms" line — black with red `#A31414`-ish link styling (need to sample exact red)

### Card grid (3 cards)
- Card width: **~435 CSS each** (measured from panel scan)
- Inter-card gap: **42 CSS px** (panel bg shows between cards)
- Card width math: `(1390 panel width − 2 × 42 gap) ÷ 3 = ~435` ✓
- **No border on cards.** Confirmed by horizontal scan at Y 1300 — no border pixels between panel-bg and card-image at edges.
- **No inner card padding.** Image touches the card edges.

### Card structure (each card = two stacked zones, no separator)
1. **Square image** — exactly 1:1 aspect, ~435×435 CSS
2. **Caption strip below image** — ~435 wide × ~164 tall CSS, bg `#EDECEC` (a lighter shade than the panel — barely visible contrast)
   - Title: serif (Fanwood-ish), centered, e.g. "Autograph Collection"
   - Descriptor: smaller serif italic, centered, e.g. "Graphic borders and insets cast in solid bronze »" — with red `»` arrow

### Critical correction vs what I shipped
| Element | Live PDF (correct) | What I have shipped |
|---|---|---|
| Panel bg | `#E0E0E0` cool gray | `#F5F2E9` warm cream |
| Page margin around panel | 25 CSS px both sides | 0 (panel was full-bleed) |
| White strips between panels | 25–80 CSS px | none |
| Card border | none | 1px `#D4CCB8` ← **wrong, must remove** |
| Card bg | white (image) + `#EDECEC` (caption strip) | `#FFFFFF` solid with frame |
| Card inner padding | 0 | 10px |
| Card gap | 42 CSS px | 28 CSS px |
| Card image aspect | 1:1 (~435×435) | 1:1 (close ✓ but on wrong card size) |

---

## C. Open questions — I need answers / source before writing CSS

### C1. Talisman section width
Looking at the screenshot, the Talisman section's bg (`#F7F7F7`) appears narrower than the full panel width — like an inset card, not a full-width panel. What's the intended width?
- **Option A**: Talisman section is a centered inset, narrower than Bronzework/FA (e.g., max-width 720–900 CSS)
- **Option B**: It's full-width but the visible panel area is narrower because of greater inner padding
- **Option C**: Just match what I measure (which I can do)

### C2. Wordmark exact size
I can measure the "BRONZEWORK STUDIO" wordmark height from the screenshot, but I'd like to confirm: is it **typed text** (Fanwood Text serif) or a **wordmark image** (.png)? On the live site:
- If typed: I can match font-size from the screenshot measurement.
- If image: I need the .png at native resolution. The wordmark images currently in `/assets/images/linden/wordmarks/` are 800×56 — very narrow aspect that won't render the visible size shown in the live PDF.

### C3. Hero overlaid text vs. background
The hero shows "Luxury designer metal accent tile. / Elevate your home from beautiful to extraordinary." in white serif over a dark photo, then 3 wordmark buttons below. Currently we have the same. Confirm: keep our dark McQueen photo per the earlier exception?

### C4. Talisman page (`/talisman/`) and other sub-pages
You said "all non-foundry art pages need to match exactly to the live site." The screenshots only show the LW master landing (`/`). For `/bronzework-studio/`, `/talisman/`, `/our-team/` — can you share the same 1440 + 1920 screenshots of those pages too? Otherwise I'm flying blind on those.

### C5. Buy CTAs treatment (the existing exception)
Earlier we agreed to keep our dark `#1f1f1f` Buy CTA grid as an exception, vs. live's light bordered cards. The live screenshot here shows light cards. **Do you want to keep that exception, or revert and match live?**

### C6. Foundry Art section bg (the other existing exception)
Live shows `#E0DED5` warm tan; we shipped `#cfc3ad` per an earlier user-approved "noticeably darker warm beige" call. **Keep `#cfc3ad` exception, or revert to live `#E0DED5`?**

### C7. Hero photo (third existing exception)
Live shows the lighter bronze-tile band; we have dark McQueen photo per "exception 1." **Keep exception, or revert?**

---

## D. Plan once questions are answered

1. Update CSS so Bronzework section panel matches exactly: bg `#E0E0E0`, 25px page margin both sides, 42px card gap, square image cards, `#EDECEC` caption strip, no card border, no inner padding. Same for Foundry Art (with its bg `#E0DED5` or kept exception) and others.
2. Add 25–80 CSS px white strips between every panel.
3. Add Talisman/Featured Designer/Buy CTAs/team/footer pixel-match passes — once C4 is resolved.
4. **Render a side-by-side comparison image** before pushing — our render vs. the source screenshot — so we both confirm match before deploy.
