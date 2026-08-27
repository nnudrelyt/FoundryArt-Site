#!/usr/bin/env python3
"""Regenerate the photo library index.

Run from the repo root:  python3 docs/photo-library/generate.py

Indexes two sources into one page:

  site      assets/images — the web-ready photography the build actually
            ships. Linked at full size, served by the local http server.

  archive   the client's photo archive in Dropbox (_Assets/Photography),
            which mirrors the Google Drive folders Stacza shares. Mostly
            print-resolution JPG/TIF/PSD that no browser can display and
            that sits outside the repo, so each one is thumbnailed into
            docs/photo-library/thumbs/ and the card carries the absolute
            source path instead of a link into assets.

Every card in the grid shows a 480px thumbnail. Clicking a site card opens the
real file; clicking an archive card opens a 900px preview, since the original
is a TIF or PSD the browser cannot display.

Two measurements drive the tone filters:

  luminance  mean grey value. The footer ground (--charcoal-warm, #2D2E2F)
             sits at 0.177; a photo close to that needs little or no
             correction to sit on a dark band, and one far from it will
             wash out when suppressed.

  cut-out    whether the corner pixel is transparent. A true cut-out has no
             photo edge, so it reads as an object on the ground rather than
             a rectangle laid over it. NB: %[fx:mean(a)] is not a valid
             ImageMagick operator — it errors — so this samples p{2,2}.a.

Thumbnails are regenerated only when missing or older than their source, so a
re-run after a handful of new photos costs seconds rather than minutes.
"""

import concurrent.futures
import html
import os
import subprocess
import sys
import urllib.parse

FOOTER_LUM = 0.177          # --charcoal-warm #2D2E2F
SITE_SKIP = {"linden"}                      # wordmarks and social icons
ARCHIVE_SKIP = {"Foundry Art Logotype"}     # logotypes, not photography
WEB_EXT = (".jpg", ".jpeg", ".png", ".webp")
ARCHIVE_EXT = WEB_EXT + (".tif", ".tiff", ".psd")
GRID_PX = 480               # long edge of the thumbnail shown in the grid
VIEW_PX = 900               # long edge of the archive click-through preview

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
IMAGES = os.path.join(REPO, "assets", "images")
# .../Foundry Art/_Assets/Photography — three levels up from the repo root
ARCHIVE = os.environ.get("FA_ARCHIVE") or os.path.abspath(
    os.path.join(REPO, "..", "..", "..", "_Assets", "Photography"))
THUMBS = os.path.join(HERE, "thumbs")
OUT = os.path.join(HERE, "index.html")

skipped = []                # (path, why) — reported at the end


def probe(path, fmt):
    try:
        r = subprocess.run(["magick", path + "[0]", "-format", fmt, "info:"],
                           capture_output=True, text=True, timeout=60)
        return r.stdout.strip()
    except Exception:
        return ""


def walk(root, exts, skip):
    """Every image under root, depth-first, skipping the named directories."""
    found = []
    for dirpath, dirnames, files in os.walk(root):
        dirnames[:] = [d for d in dirnames
                       if d not in skip and not d.startswith(".")]
        for f in sorted(files):
            if f.startswith(".") or not f.lower().endswith(exts):
                continue
            found.append(os.path.join(dirpath, f))
    return found


def thumbnail(src, dest, px):
    """Web-sized copy of an original. False if it cannot be read.

    Every card in the grid points at one of these rather than at the source:
    the site folder alone is ~140 MB, and a page that lazy-loads the real
    files bogs the browser down long before you have scrolled through it.
    """
    if (os.path.exists(dest)
            and os.path.getmtime(dest) >= os.path.getmtime(src)):
        return True
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    r = subprocess.run(
        ["magick", src + "[0]", "-auto-orient", "-colorspace", "sRGB",
         "-resize", "%dx%d>" % (px, px), "-quality", "80", dest],
        capture_output=True, text=True, timeout=180)
    return r.returncode == 0 and os.path.exists(dest)


def url(*parts):
    """A relative href for a thumbnail path, safe for spaces and &."""
    return html.escape("/".join(
        urllib.parse.quote(p) for p in parts), quote=True)


def measure(path):
    """Luminance and cut-out flag, read off whatever the browser will show."""
    try:
        lum = float(probe(path, "%[fx:mean]") or 0)
    except ValueError:
        lum = 0.0
    try:
        cutout = float(probe(path, "%[fx:p{2,2}.a]") or 1) < 0.05
    except ValueError:
        cutout = False
    return lum, cutout


def site_card(full):
    rel = os.path.relpath(full, IMAGES).replace(os.sep, "/")
    if os.path.getsize(full) == 0:
        skipped.append(("assets/images/" + rel, "0 bytes"))
        return None
    wh = probe(full, "%wx%h")
    if not wh:
        skipped.append(("assets/images/" + rel, "unreadable"))
        return None
    grid_rel = os.path.splitext(rel)[0] + ".jpg"
    if not thumbnail(full, os.path.join(THUMBS, "grid", "site", grid_rel),
                     GRID_PX):
        skipped.append(("assets/images/" + rel, "could not thumbnail"))
        return None
    lum, cutout = measure(full)
    return dict(src="site", group=os.path.dirname(rel) or "root",
                name=os.path.basename(rel),
                href=url("/assets/images", *rel.split("/")),
                thumb=url("thumbs", "grid", "site", *grid_rel.split("/")),
                wh=wh, kb=round(os.path.getsize(full) / 1024),
                lum=lum, cutout=cutout,
                fmt=os.path.splitext(rel)[1][1:].upper(),
                path="assets/images/" + rel)


def archive_card(full):
    rel = os.path.relpath(full, ARCHIVE).replace(os.sep, "/")
    if os.path.getsize(full) == 0:
        skipped.append((rel, "0 bytes"))
        return None
    jpg_rel = os.path.splitext(rel)[0] + ".jpg"
    ok = (thumbnail(full, os.path.join(THUMBS, "grid", "archive", jpg_rel),
                    GRID_PX)
          and thumbnail(full, os.path.join(THUMBS, "view", "archive", jpg_rel),
                        VIEW_PX))
    if not ok:
        skipped.append((rel, "could not thumbnail"))
        return None
    wh = probe(full, "%wx%h") or "?"
    lum, cutout = measure(full)
    return dict(src="archive", group=os.path.dirname(rel) or "root",
                name=os.path.basename(rel),
                href=url("thumbs", "view", "archive", *jpg_rel.split("/")),
                thumb=url("thumbs", "grid", "archive", *jpg_rel.split("/")),
                wh=wh, kb=round(os.path.getsize(full) / 1024),
                lum=lum, cutout=cutout,
                fmt=os.path.splitext(rel)[1][1:].upper(),
                path=os.path.join(ARCHIVE, rel))


def collect():
    site = walk(IMAGES, WEB_EXT, SITE_SKIP)
    arch = walk(ARCHIVE, ARCHIVE_EXT, ARCHIVE_SKIP) \
        if os.path.isdir(ARCHIVE) else []
    print("scanning %d site images, %d archive originals"
          % (len(site), len(arch)))
    cards = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        cards += [c for c in ex.map(site_card, site) if c]
        cards += [c for c in ex.map(archive_card, arch) if c]
    return cards


def band(lum):
    d = abs(lum - FOOTER_LUM)
    return "near" if d < 0.16 else ("mid" if d < 0.34 else "bright")


SRC_LABEL = {"site": "On site", "archive": "Client archive"}
SRC_NOTE = {
    "site": "Web-ready photography in <code>assets/images</code> — what the "
            "build ships today. Click a card for the real file at full size.",
    "archive": "Everything in the client archive "
               "(<code>Foundry Art/_Assets/Photography</code>), which mirrors "
               "the Google Drive folders Stacza shares. Print-resolution "
               "originals, TIF and PSD included, so a click opens a 900px "
               "preview rather than the file itself, and the grey line under "
               "each is the source path on disk, not a web path.",
}


def render(cards):
    out = []
    for src in ("site", "archive"):
        mine = [c for c in cards if c["src"] == src]
        if not mine:
            continue
        out.append('<h2 class="src">%s <span>%d</span></h2>'
                   % (SRC_LABEL[src], len(mine)))
        out.append('<p class="srcnote">%s</p>' % SRC_NOTE[src])
        for group in sorted({c["group"] for c in mine}):
            items = sorted((c for c in mine if c["group"] == group),
                           key=lambda c: c["name"].lower())
            out.append('<h3 class="grp">%s <span>%d</span></h3>'
                       % (html.escape(group), len(items)))
            out.append('<div class="grid">')
            for it in items:
                fmt = ('<b class="raw">%s</b>' % it["fmt"]
                       if it["fmt"] in ("TIF", "TIFF", "PSD") else it["fmt"])
                out.append(
                    '<figure class="card" data-src="%s" data-cut="%s" data-band="%s">'
                    '<a href="%s" target="_blank">'
                    '<img loading="lazy" src="%s" alt=""></a>'
                    '<figcaption><span class="fn">%s</span>'
                    '<span class="meta">%s &middot; %s KB &middot; %s</span>'
                    '<span class="meta">lum <b>%.3f</b>%s</span>'
                    '<span class="path">%s</span>'
                    '</figcaption></figure>'
                    % (it["src"], "1" if it["cutout"] else "0",
                       band(it["lum"]), it["href"], it["thumb"],
                       html.escape(it["name"]), it["wh"], it["kb"], fmt,
                       it["lum"],
                       ' &middot; <b class="cut">CUT-OUT</b>'
                       if it["cutout"] else "",
                       html.escape(it["path"])))
            out.append("</div>")
    return "\n".join(out)


DOC = """<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Foundry Art — photo library</title>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300..600&display=swap" rel="stylesheet">
<style>
  :root { --ink:#142528; --bronze:#8C6249; --rule:#E2E0DA; --mid:#6B7472; }
  body { font-family:'Jost',sans-serif; margin:0; background:#fff; color:var(--ink); }
  header { padding:34px 40px 20px; border-bottom:1px solid var(--rule);
           position:sticky; top:0; background:#fff; z-index:5; }
  h1 { font-size:20px; font-weight:500; margin:0 0 6px; letter-spacing:.3px; }
  .sub { font-size:14px; color:var(--mid); margin:0 0 16px; max-width:96ch; line-height:1.6; }
  code { font-size:13px; }
  .filters { display:flex; gap:10px; flex-wrap:wrap; align-items:baseline; }
  .filters + .filters { margin-top:10px; }
  .flabel { font-size:11px; letter-spacing:1.6px; text-transform:uppercase;
            color:var(--mid); width:58px; flex:none; }
  button { font:inherit; font-size:13px; padding:7px 14px; border:1px solid var(--rule);
           background:#fff; border-radius:3px; cursor:pointer; color:var(--ink); }
  button.on { background:var(--ink); color:#fff; border-color:var(--ink); }
  button:focus-visible { outline:2px solid var(--bronze); outline-offset:2px; }
  .src { font-size:15px; font-weight:500; margin:52px 40px 6px;
         padding-top:22px; border-top:1px solid var(--rule); }
  .src span { color:var(--mid); font-weight:400; }
  .srcnote { font-size:13px; color:var(--mid); margin:0 40px 10px;
             max-width:96ch; line-height:1.6; }
  .grp { font-size:12px; letter-spacing:2px; text-transform:uppercase; color:var(--bronze);
         margin:30px 40px 14px; font-weight:500; }
  .grp span { color:var(--mid); letter-spacing:0; text-transform:none; font-weight:400; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(232px,1fr));
          gap:26px; padding:0 40px; }
  .card { margin:0; }
  .card img { width:100%; aspect-ratio:4/3; object-fit:cover; display:block;
              background:#2D2E2F; border:1px solid var(--rule); }
  figcaption { display:flex; flex-direction:column; gap:2px; padding-top:8px; }
  .fn { font-size:13px; font-weight:500; word-break:break-all; }
  .meta { font-size:12px; color:var(--mid); font-variant-numeric:tabular-nums; }
  .cut, .raw { color:var(--bronze); }
  .path { font-size:11px; color:#9AA2A0; word-break:break-all; user-select:all; }
  .card.hide, .grp.hide, .grid.hide, .src.hide, .srcnote.hide { display:none; }
</style></head><body>
<header>
  <h1>Foundry Art — photo library</h1>
  <p class="sub">Every photo in one place: the web-ready set in
  <code>assets/images</code> that the build ships, and the full client archive in
  <code>Foundry Art/_Assets/Photography</code> — the mirror of the Google Drive
  folders Stacza shares. Archive cards are thumbnails of print-resolution
  originals; <b class="raw">TIF</b> or <b class="raw">PSD</b> means it needs
  converting before it can go on a page. Thumbnails sit on the footer charcoal,
  so cut-outs show their true edge. <b>lum</b> is mean luminance &mdash; the
  footer ground is 0.177, and the closer a photo sits to it the less correction
  it needs. Regenerate with
  <code>python3 docs/photo-library/generate.py</code>.</p>
  <div class="filters"><span class="flabel">Source</span>
    <button data-g="src" data-f="all" class="on">All</button>
    <button data-g="src" data-f="site">On site</button>
    <button data-g="src" data-f="archive">Client archive</button>
  </div>
  <div class="filters"><span class="flabel">Tone</span>
    <button data-g="tone" data-f="all" class="on">All</button>
    <button data-g="tone" data-f="cut">Cut-outs only</button>
    <button data-g="tone" data-f="near">Near footer tone</button>
    <button data-g="tone" data-f="mid">Mid</button>
    <button data-g="tone" data-f="bright">Bright</button>
  </div>
</header>
__CARDS__
<script>
  const state = { src:'all', tone:'all' };
  document.querySelectorAll('.filters button').forEach(b =>
    b.addEventListener('click', () => {
      const g = b.dataset.g;
      document.querySelectorAll('.filters button[data-g="' + g + '"]')
        .forEach(x => x.classList.toggle('on', x === b));
      state[g] = b.dataset.f;
      apply();
    }));

  function apply() {
    document.querySelectorAll('.card').forEach(c => {
      const okSrc = state.src === 'all' || c.dataset.src === state.src;
      const okTone = state.tone === 'all' ? true
                   : state.tone === 'cut' ? c.dataset.cut === '1'
                   : c.dataset.band === state.tone;
      c.classList.toggle('hide', !(okSrc && okTone));
    });
    // Collapse the headings whose cards have all been filtered away.
    document.querySelectorAll('.grid').forEach(g => {
      const empty = !g.querySelector('.card:not(.hide)');
      g.classList.toggle('hide', empty);
      const h = g.previousElementSibling;
      if (h && h.classList.contains('grp')) h.classList.toggle('hide', empty);
    });
    document.querySelectorAll('.src').forEach(s => {
      let n = s.nextElementSibling, empty = true;
      while (n && !n.classList.contains('src')) {
        if (n.classList.contains('grid') && !n.classList.contains('hide')) {
          empty = false;
          break;
        }
        n = n.nextElementSibling;
      }
      s.classList.toggle('hide', empty);
      const note = s.nextElementSibling;
      if (note && note.classList.contains('srcnote'))
        note.classList.toggle('hide', empty);
    });
  }
</script>
</body></html>
"""


def main():
    if not os.path.isdir(IMAGES):
        sys.exit("assets/images not found at %s" % IMAGES)
    if not os.path.isdir(ARCHIVE):
        print("! archive not found at %s — indexing site images only" % ARCHIVE)
    cards = collect()
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(DOC.replace("__CARDS__", render(cards)))

    site = [c for c in cards if c["src"] == "site"]
    arch = [c for c in cards if c["src"] == "archive"]
    raw = [c for c in arch if c["fmt"] in ("TIF", "TIFF", "PSD")]
    print("wrote %s" % os.path.relpath(OUT, REPO))
    print("  on site        %3d in %d groups"
          % (len(site), len({c["group"] for c in site})))
    print("  client archive %3d in %d groups (%d TIF/PSD needing conversion)"
          % (len(arch), len({c["group"] for c in arch}), len(raw)))
    if skipped:
        print("  skipped %d:" % len(skipped))
        for p, why in skipped:
            print("    %s — %s" % (p, why))


if __name__ == "__main__":
    main()
