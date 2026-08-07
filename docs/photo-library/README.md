# Photo library

A browsable index of everything in `assets/images`, used when choosing
photography for a page. Each thumbnail sits on the footer charcoal
(`#2D2E2F`) so cut-outs show their true edge, and each card reports mean
luminance — the footer ground is 0.177, and the closer a photo measures to
it the less correction it needs to sit on a dark band.

Filters: all / cut-outs only / near footer tone / mid / bright.

Regenerate after adding or removing images:

    python3 docs/photo-library/generate.py

Open it through a local server rooted at the repo (the image paths are
absolute), e.g. `python3 -m http.server 8765` then
<http://localhost:8765/docs/photo-library/>.

Excluded from deploys via `.vercelignore`.
