# Foundry Art — responsive site rebuild

Client: Foundry Art (Linden Workshops family). Static HTML site, one directory per page.

## Brand — read before any copy or design work
- Canonical brand docs: `docs/brand/` — POSITIONING, COMPETITIVE, USER-RESEARCH, VOICE, ROADMAP, METRICS.
- Positioning is **locked**: "Small Details. Unmistakeable artistry." Don't re-open it.
- Site-level specs: `DESIGN-SYSTEM.md` (root) and `AUDIT.md`.

## Deploys
- **Canonical target: foundry-art-site.vercel.app** (Vercel project `foundry-art-site`, team `the-main-sequence`; this dir is linked via `.vercel/`).
- **Production deploy = `vercel --prod --yes`** from this dir. Git pushes to the `foundryart-site` remote only produce **Preview** builds — production is promoted via the CLI, not a branch.
- Workflow: commit on local `precision-mirror` → `git push foundryart-site precision-mirror` (history/preview) → `vercel --prod --yes` (go live). Bump the shared `?v=` cache-buster across all pages whenever `assets/styles.css` changes.
- **Deprecated (2026-07-09):** the old `origin` remote (`Foundry-Art-Responsive` → foundry-art-responsive.vercel.app) is archived — removed locally so it can't be pushed to. Archive the GitHub repo + its Vercel project from the dashboards.

## Collection-detail template
- `/precision/` was rebuilt 1:1 against live lindenworkshops.com/precision using LW components — it is the **canonical collection-detail template** (see DESIGN-SYSTEM §8).
- Next: clone the precision template to `autograph/`, `classic/`, `instinct/`.
- Review loop convention: side-by-side inspector specs at the reviewer's ~2251px width.

## Gotcha
- This is a Dropbox CloudStorage dir — for local preview, copy/rsync to /tmp first; the sandboxed http.server can't read CloudStorage paths.
