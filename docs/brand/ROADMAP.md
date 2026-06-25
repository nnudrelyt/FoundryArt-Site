# Strategic Roadmap

Indexed from the Roadmap deck, pages 91–101 (Brand Roadmap, Logo Exploratory) and synthesis from the audit phases.

## Brand strategy snapshot (Roadmap, page 91)

- **Vision** — The only American studio hand-casting solid bronze accent tile and hardware, sold directly to the consumer.
- **Purpose** — To bring the craft, permanence, and beauty of bronze into homes — one considered detail at a time.
- **Values** — Craft · Integrity · Honesty · American-made · Accessibility · Longevity
- **Positioning** — Small Details. Unmistakeable artistry. *(locked 2026-06-25)*
- **Goal** — Double Foundry Art year-over-year ecommerce sales.

## Strategic pillars

### 1. Elevate the brand & site experience

| Tactic | Status |
| --- | --- |
| Redesign site to reflect product quality | In progress — current wireframe iteration |
| Clarify brand hierarchy (Linden / Foundry Art / Claremont) | Active — addressed in studios drawer + nav refresh |
| Simplify and shorten the path to purchase | Active — Claremont handoff still a friction point |
| Introduce luxury visual language and typography | Ongoing — current pass uses Cormorant Garamond + Jost |
| Bring the hero line above the fold immediately | Done — hero scrim + bolder serif pass shipped |

### 2. Own bronze in search & discovery

| Tactic | Status |
| --- | --- |
| Target high-intent bronze & metal tile keywords | Post-launch (production developer) |
| Build a Houzz profile with installed photography | Post-launch |
| Establish presence in AI-powered referral (ChatGPT, Perplexity, etc.) | Post-launch — note: ChatGPT is already an emerging referral driver in the competitive set |
| Launch paid search campaign for category terms | Post-launch — competitive set has low paid activity, opportunity to capture |
| Develop SEO content around bronze tile use cases | Post-launch |

### 3. Tell the craft story

| Tactic | Status |
| --- | --- |
| Studio + maker story — who cast this, and how | Wireframed in "craft" section of FA homepage |
| Process photography: carving, casting, finishing | Live in homepage hero + craft section |
| Lookbook / downloadable buying guide | Wireframed in "Expert Guidance" section (PDF tiles) |
| Surface "How We Make Our Tiles" content prominently | Live |
| Add customer testimonials and case studies | Mocked on PDPs; needs real research-backed content |

## Tactical recommendations from the audit

(See USER-RESEARCH.md for the full set.)

- **SIMPLIFY TOP-OF-PAGE**
- **CLARIFY OFFERING** (tiles + hardware spoken to equally)
- **ELEVATE** the visual language so it earns the price point
- **CREATE CONTEXT** — show real-world installs on PDPs
- **MERCHANDISE** Foundry Art as a "whole room solution"
- **SHOW & TELL** — intersperse products with brand storytelling
- **EXPERT POSITIONING** — use buying-guidance content to forward "elevate" messaging
- **LEAN ON PAST SUCCESS** — surface customer stories from past purchasers
- **CUSTOMER FOCUS** — write from the customer's POV, not the company's

## Logo exploratory (Roadmap pages 93–101)

Two creative directions explored; final choice not locked in deck.

### Concept 01 — Emblem
- Shapes inspired by each tile collection paired with a typographic mark
- Wordmark sits between two iconic emblem-squares (Foundry Art, Bronzework Studio, Talisman each have their own framing emblem)
- The emblem is the strongest visual asset — could be used in isolation as a brand icon

### Concept 02 — Dimensional
- Typography that reflects the dimensionality of the studio's art
- Uses a serif wordmark with sculptural shading/grayscale gradient to suggest cast metal
- Reads more sculptural / "small bronze sculpture" — aligns with Ted's vocabulary

**Summary slide pairs the two for side-by-side comparison.** No final decision shown in deck — keep both directions open until client signs off.

## Color palette options (Roadmap pages 99–100)

### Palette 1 — Charcoal · Cream · Slate · Bronze · Black

- Charcoal (deep teal-black) — `~#142528` (matches the current `--charcoal` token)
- Cream (warm off-white) — `~#E5E0D7`
- Slate blue (cool accent) — `~#4A5C72`
- Sky pale (secondary accent) — `~#D2DAD7`
- Warm bronze brown — `~#7E5A41`
- Black — `~#2A2B2B`

### Palette 2 — Charcoal · Bronze (dominant) · Sand · Burgundy · Black

- Charcoal — `~#142528`
- Warm bronze (large area) — `~#7E5A41`
- Sand / warm beige — `~#B5A289`
- Bone white (small) — `~#EFEFEC`
- Deep burgundy — `~#5C3737`
- Black — `~#2A2B2B`

Both palettes share **charcoal + warm bronze + black** as the load-bearing trio. Decision deferred — current site uses palette 1 derivatives.

## Site wireframes (Roadmap pages 102–104)

The final pages of the deck show a **"Foundry Art — Redesigned Page"** wireframe with:

- Simplified nav: Foundry Art as primary brand, Linden Workshops as parent, single clear CTA (Shop)
- Full-bleed hero image with content panel overlaid on the right half; content background matches image tone; two CTAs (Shop tiles / See design ideas); trust signals below
- Brand voice band labeled "CUSTOMER VOICE / BRAND NARRATIVE" — *this is the placeholder the FA polish pass replaced with Ted's "Bronze becomes more beautiful with age." quote.*

## Open production-launch items (out of scope for wireframe)

Stacia flagged these in June feedback; they're real-backend / CMS work for the production developer:

- Easier way to offer trade discounts (currently cumbersome; may need to stay manual so the team can review trade applications)
- Easier way to offer free sample shipping to registered customers
- Real Cloudflare Turnstile integration on the contact form (current site uses a mock badge)
- Real Google Maps / Mapbox integration with live geocoding on Where to Buy (current site uses Leaflet + CartoDB Voyager tiles as the visual)
