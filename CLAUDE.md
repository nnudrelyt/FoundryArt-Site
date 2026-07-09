# Foundry Art — responsive site rebuild

Client: Foundry Art (Linden Workshops family). Static HTML site, one directory per page.

## Brand — read before any copy or design work
- Canonical brand docs: `docs/brand/` — POSITIONING, COMPETITIVE, USER-RESEARCH, VOICE, ROADMAP, METRICS.
- Positioning is **locked**: "Small Details. Unmistakeable artistry." Don't re-open it.
- Site-level specs: `DESIGN-SYSTEM.md` (root) and `AUDIT.md`.

## Deploys
- **Canonical target: foundry-art-site.vercel.app.** Deploy by pushing to the `foundryart-site` remote's `updates` branch (Vercel git-connected, production = `updates`): `git push foundryart-site HEAD:updates`. Work happens on the local `precision-mirror` branch, kept in sync with `updates`. Bump the shared `?v=` cache-buster across all pages whenever `assets/styles.css` changes.
- **Deprecated:** the `origin` remote (`Foundry-Art-Responsive` → foundry-art-responsive.vercel.app) is old/archived as of 2026-07-09 — do NOT push there.

## Collection-detail template
- `/precision/` was rebuilt 1:1 against live lindenworkshops.com/precision using LW components — it is the **canonical collection-detail template** (see DESIGN-SYSTEM §8).
- Next: clone the precision template to `autograph/`, `classic/`, `instinct/`.
- Review loop convention: side-by-side inspector specs at the reviewer's ~2251px width.

## Gotcha
- This is a Dropbox CloudStorage dir — for local preview, copy/rsync to /tmp first; the sandboxed http.server can't read CloudStorage paths.
