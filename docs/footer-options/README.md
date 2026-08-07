# Footer background options

Working review page for the `.site-footer` background. Each option renders
the **real footer at full size** — same markup, same type, same 758px height
— so only the photograph and how it is blended into the charcoal change
between them.

Open through a local server rooted at the repo (image and stylesheet paths
are absolute):

    python3 -m http.server 8765
    # http://localhost:8765/docs/footer-options/

## Current options

| | Photograph | Correction |
|---|---|---|
| Currently implemented | `hero/footer-bowl.webp` | none — live rule |
| 2 | `lifestyle/floor-grid-white-bronze.jpg` | brightness .62 |
| 3 | `process/hand-toning.jpg` | brightness .68 |
| 4 | `lifestyle/floor-square-white-limestone.jpg` | **none** |
| 5 | `lifestyle/foyer-lotus-closer-mono.jpg` | brightness .50 |
| 6 | `lifestyle/fireplace-sun-travertine.jpg` | brightness .60 |
| 7 | `products/moon-blossom-3x3/gallery-2.jpg` | brightness .52 |
| 8 | `products/sun-3x3/gallery-2.jpg` | brightness .54 |

## What was learned choosing these

**Tone match matters more than treatment.** The footer ground
(`--charcoal-warm`, `#2D2E2F`) sits at 0.177 luminance. Photos measuring
near that need little or no correction and blend invisibly; photos at
0.6–0.7 wash out no matter how they are masked, blended or duotoned. Use
the luminance figures in `docs/photo-library/` to shortlist before trying
any treatment.

**Crop within the frame, not just across the set.** A photo can read bright
overall and still hold a usable dark band. The limestone floor measures
0.538 whole-frame but 0.180 at `y=19%` — which is why option 4 needs no
correction at all.

**The bowl works because it has no photo edge.** It is a true cut-out, so
it reads as an object sitting in the space rather than a rectangle laid
over it. Room shots are flat architectural surfaces and feathering only
disguises the boundary. Only three cut-outs exist in the library
(`footer-bowl.webp`, `knobs-pulls-wood.png`, `bronze-liners-marble.png`),
and the latter two are rectangular slabs, so they show a hard edge.

**The hand shots cannot be keyed automatically.** Their backdrop is uniform
(219–227), but the tile's mid-tones and parts of the palm sit too close to
it, so a flood-fill eats holes in the tile face. A true cut-out from those
needs hand-masking.

## Open

Stacza asked to see the footer with a room shot rather than the bowl. The
bowl is preserved as the first block for comparison and is still what
ships. Nothing here is live.

Excluded from deploys via `.vercelignore`.
