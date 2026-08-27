# Photo library

One browsable index of every Foundry Art photo, used when choosing
photography for a page. Two sources sit on the same page, each with its own
section and its own filter:

**On site** — everything in `assets/images`, the web-ready set the build
actually ships. Clicking a card opens the real file at full size.

**Client archive** — everything in `Foundry Art/_Assets/Photography`, the
Dropbox mirror of the Google Drive folders Stacza shares. These are
print-resolution originals, TIF and PSD included, and they live outside the
repo, so each card shows a generated thumbnail, is badged with its format,
and carries its absolute source path instead of a web path. Clicking one
opens a 900px preview.

Every thumbnail in the grid is 480px — the site folder alone is ~140 MB, and
a page that lazy-loads the real files bogs down long before you have
scrolled through it.

Each card sits on the footer charcoal (`#2D2E2F`) so cut-outs show their
true edge, and reports mean luminance — the footer ground is 0.177, and the
closer a photo measures to it the less correction it needs to sit on a dark
band.

Filters combine: source (all / on site / client archive) × tone (all /
cut-outs / near footer tone / mid / bright). Headings collapse when
everything under them is filtered out.

Regenerate after adding or removing photos in either place:

    python3 docs/photo-library/generate.py

Thumbnails are rebuilt only when missing or older than their source, so a
re-run after a few new photos takes seconds. Point it at a different archive
with `FA_ARCHIVE=/some/path python3 docs/photo-library/generate.py`.

Open it through a local server rooted at the repo (site image paths are
absolute), e.g. `python3 -m http.server 8765` then
<http://localhost:8765/docs/photo-library/>.

`docs/` is excluded from deploys via `.vercelignore`, and the generated
`thumbs/` directory is gitignored.
