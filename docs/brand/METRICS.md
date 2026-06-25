# Metrics & Analytics Baseline

Indexed from the Roadmap deck, pages 16–32 (competitive analytics) and pages 39–41 (Linden Workshops user behavior). All numbers as of the Roadmap window — Nov 2025 to Jan 2026.

## Linden Workshops (as observed in GA + Similarweb)

- **361 active users** in measurement period
- **361 new users** (effectively 100% new — repeat-visit weakness)
- **2.2K event count**
- **Avg engagement time per active user: 19s**

### Top pages by views

| Page | Views | Active users | Bounce rate |
| --- | --- | --- | --- |
| Luxury Decorative Tile & Trim — Bronzework | 399 | 181 | 7.9% |
| Foundry Art | 118 | 45 | 11.1% |
| Precision | 75 | 31 | 8.3% |
| Classic | 60 | 24 | 7.1% |
| Bronzework Studio Collections | 54 | 20 | 4.5% |
| Talisman | 51 | 21 | 4.8% |
| About | 49 | 22 | 12.9% |

**Early insight:** product pages drive the most interest (especially the Bronzework decorative tile page) — visitors are primarily exploring collections rather than general information. SEO signals from Google, Bing, and Pinterest are promising. Many visits likely come from email, social, or referrals that aren't UTM-tagged.

### Top session sources

- (direct) — 311
- google / organic — 62
- Pinterest / organic — 5
- bing / organic — 4
- pinterest.com / referrer — 4
- kaegcr.online — 3
- allnaturalstone.com — 2

### Active users by city (top 7)

Singapore 153 · Lanzhou 62 · Chicago 13 · Boardman 12 · Council Bluffs 8 · San Jose 8 · Columbus 7

## Competitor benchmarks (Similarweb)

### Global rank
- lindenworkshops.com — **#11,931,279**
- motawi.com — #679,633 (~17x stronger than Linden)
- prattandlarson.com — #982,239
- syzygytile.com — #5,659,875
- lunadabaytile.com — #1,620,127

### US rank
- lindenworkshops.com — **#4,356,670**
- motawi.com — #143,356
- prattandlarson.com — #217,276
- syzygytile.com — #1,776,086
- lunadabaytile.com — #394,473

### Industry rank (Home & Garden)
- lindenworkshops.com — **N/A** (unranked)
- motawi.com — **#8,658** (strong category authority)
- Others — N/A

### Engagement comparison

| Metric | Linden | Motawi | Pratt + Larson | Syzygy | Lunada Bay |
| --- | --- | --- | --- | --- | --- |
| Monthly visits | 1,327 | 28,926 | 18,851 | 2,046 | 9,724 |
| Monthly unique visitors | 636 | 14,051 | 9,658 | 970 | 4,414 |
| Visits / unique | 2.09 | 2.06 | 1.95 | 2.11 | **2.20** |
| Visit duration | 0:12 | **3:29** | 2:14 | 1:23 | 0:30 |
| Pages per visit | 1.72 | **7.02** | 3.75 | 2.48 | 2.44 |
| Bounce rate | 39.49% | 39.03% | 42.31% | 35.15% | 45.69% |
| Page views | 2,285 | **203,101** | 70,606 | 5,083 | 23,710 |

**Linden Workshops is 7×–22× lower than key competitors on traffic** — competitors have built stronger acquisition engines. Engagement quality (12s session duration vs Motawi's 3:29) signals poor on-site experience, not just low reach.

### Marketing channel mix
Organic search and direct are the largest acquisition channels across the set. Motawi dominates direct, organic, and social. Social traffic is a meaningful acquisition driver for competitors but Linden Workshops receives minimal social traffic. Display advertising is not a major channel for any brand in the set — paid media is an underused opportunity.

### Organic search (top non-branded terms)
- **lunada bay** — 18.61% share (volume 1,470; CPC $0.70)
- **ceramic tile murals** — 14.72% (volume 40)
- **pratt 7 larson tiles** — 9.92% (volume 46)
- **bamboo forest lunada bay tile** — 6.49% (volume 30)
- **renovating arts and crafts firep…** — 4.38% (volume 53)

**Insight:** competitors rank for significantly more high-value non-branded keywords (product-focused, branded tile collections). Linden Workshops has limited visibility for category-level search terms. Organic search is a major traffic driver for competitors — a real white-space for FA bronze.

### Paid search (top non-branded terms)
- charley harper tiles — 48.78% (volume 74)
- uofm motawi tile — 46.34% (volume 39)
- michigan clay tiles — 2.44% (volume 64)
- bamboo forest lunada bay tile — 2.44% (volume 30)
- marble luxurious floors in… — 0% (volume 51)

**Motawi leads paid search visibility.** Paid activity is low across the industry, leaving an opening to expand reach by using paid media.

### Referrals (top sources)
- google.com — 27.02% (search engine)
- tmk.edgepilot.com — 22.76% (business services)
- houzz.com — 12.85% (home improvement) ← **major referral driver for the category**
- chatgpt.com — 12.85% (AI chatbot, **emerging**)
- tommybahama.com — 12.26% (fashion/apparel)

**Insight:** Key referral sources include Google, Houzz, Edgepilot, and ChatGPT. Houzz is a major referral driver for tile + home improvement. AI tools like ChatGPT are emerging as referral sources. Referral traffic plays a meaningful role in competitor acquisition.

### Social traffic (Nov 2025 – Jan 2026)
- Linden — 153 visits
- Motawi — 2,267 (controls ~51% of category social traffic)
- Lunada Bay — 1,052 (second-largest, ~23.5%)
- Pratt + Larson — 715 (volatile but active)
- Syzygy — 284
- Linden Workshops' social presence is flat and underdeveloped.

### Display advertising
Not a major channel for any brand in the set. **Opportunity** to significantly expand reach via paid media.

## Opportunities (Roadmap synthesis)

- **Expand SEO** to capture high-intent product and category searches that competitors are currently dominating.
- **Build stronger presence on visual discovery platforms** like Pinterest and Instagram to increase brand awareness and referral traffic.
- **Launch paid search campaigns** to quickly increase visibility and capture high-intent customers.
- **Strengthen brand awareness through consistent content + storytelling** to increase direct traffic and repeat visitors.
- **Optimize mobile experience** to align with competitor trends and improve engagement.

## Site implementation notes (for future devs)

Swatch chip colors on FA PDPs are sampled from real tile photography, not synthesized:

- `.swatch-chip.traditional` — `linear-gradient(135deg, #9C8470 0%, #6B5645 100%)` (warm pewter)
- `.swatch-chip.white` — `linear-gradient(135deg, #CCCAC0 0%, #8F8B7E 100%)` (cool muted pewter)

This was a deliberate choice over the original 3-stop high-contrast gradients that read as "polished plastic" rather than real bronze. If sampling new product photos, aim for 2-stop muted gradients in similar warm-pewter / cool-pewter ranges.
