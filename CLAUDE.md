# Foundry Art — responsive site rebuild

Client: Foundry Art (Linden Workshops family). Static HTML site, one directory per page.

## Brand — read before any copy or design work
- Canonical brand docs: `docs/brand/` — POSITIONING, COMPETITIVE, USER-RESEARCH, VOICE, ROADMAP, METRICS.
- Positioning is **locked**: "Small Details. Unmistakeable artistry." Don't re-open it.
- Site-level specs: `DESIGN-SYSTEM.md` (root) and `AUDIT.md`.

## Deploys
- Working/preview deploy: foundry-art-responsive.vercel.app · prod-track deploy: foundry-art-site.vercel.app (the `/precision/` rebuild is live there). Confirm which target before pushing.

## Collection-detail template
- `/precision/` was rebuilt 1:1 against live lindenworkshops.com/precision using LW components — it is the **canonical collection-detail template** (see DESIGN-SYSTEM §8).
- Next: clone the precision template to `autograph/`, `classic/`, `instinct/`.
- Review loop convention: side-by-side inspector specs at the reviewer's ~2251px width.

## Gotcha
- This is a Dropbox CloudStorage dir — for local preview, copy/rsync to /tmp first; the sandboxed http.server can't read CloudStorage paths.
