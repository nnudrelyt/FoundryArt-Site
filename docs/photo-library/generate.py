#!/usr/bin/env python3
"""Regenerate the photo library index from assets/images.

Run from the repo root:  python3 docs/photo-library/generate.py

Reads every image under assets/images and writes docs/photo-library/index.html.
Two measurements drive the filters:

  luminance  mean grey value. The footer ground (--charcoal-warm, #2D2E2F)
             sits at 0.177; a photo close to that needs little or no
             correction to sit on a dark band, and one far from it will
             wash out when suppressed.

  cut-out    whether the corner pixel is transparent. A true cut-out has no
             photo edge, so it reads as an object on the ground rather than
             a rectangle laid over it. NB: %[fx:mean(a)] is not a valid
             ImageMagick operator — it errors — so this samples p{2,2}.a.
"""

import html
import os
import subprocess
import sys

FOOTER_LUM = 0.177          # --charcoal-warm #2D2E2F
SKIP_DIRS = {"linden"}      # wordmarks and social icons, not photography
EXT = (".jpg", ".jpeg", ".png", ".webp")

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
IMAGES = os.path.join(REPO, "assets", "images")
OUT = os.path.join(HERE, "index.html")


def probe(path, fmt):
    try:
        r = subprocess.run(["magick", path, "-format", fmt, "info:"],
                           capture_output=True, text=True, timeout=25)
        return r.stdout.strip()
    except Exception:
        return ""


def collect():
    groups = {}
    for dirpath, dirnames, files in os.walk(IMAGES):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        rel_dir = os.path.relpath(dirpath, IMAGES)
        for f in sorted(files):
            if not f.lower().endswith(EXT) or f.startswith("."):
                continue
            full = os.path.join(dirpath, f)
            rel = os.path.relpath(full, IMAGES).replace(os.sep, "/")
            try:
                lum = float(probe(full, "%[fx:mean]") or 0)
            except ValueError:
                lum = 0.0
            try:
                cutout = float(probe(full, "%[fx:p{2,2}.a]") or 1) < 0.05
            except ValueError:
                cutout = False
            groups.setdefault(rel_dir if rel_dir != "." else "root", []).append(
                dict(rel=rel, name=f,
                     wh=probe(full, "%wx%h"),
                     lum=lum, cutout=cutout,
                     kb=round(os.path.getsize(full) / 1024)))
    return groups


def render(groups):
    cards = []
    for g in sorted(groups):
        items = groups[g]
        cards.append('<h2 class="grp">%s <span>%d</span></h2>'
                     % (html.escape(g), len(items)))
        cards.append('<div class="grid">')
        for it in items:
            d = abs(it["lum"] - FOOTER_LUM)
            band = "near" if d < 0.16 else ("mid" if d < 0.34 else "bright")
            cards.append(
                '<figure class="card" data-cut="%s" data-band="%s">'
                '<a href="/assets/images/%s" target="_blank">'
                '<img loading="lazy" src="/assets/images/%s" alt=""></a>'
                '<figcaption><span class="fn">%s</span>'
                '<span class="meta">%s &middot; %s KB</span>'
                '<span class="meta">lum <b>%.3f</b>%s</span>'
                '<span class="path">assets/images/%s</span>'
                '</figcaption></figure>'
                % ("1" if it["cutout"] else "0", band, it["rel"], it["rel"],
                   html.escape(it["name"]), it["wh"], it["kb"], it["lum"],
                   ' &middot; <b class="cut">CUT-OUT</b>' if it["cutout"] else "",
                   it["rel"]))
        cards.append("</div>")
    return "\n".join(cards)


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
  .filters { display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
  button { font:inherit; font-size:13px; padding:7px 14px; border:1px solid var(--rule);
           background:#fff; border-radius:3px; cursor:pointer; color:var(--ink); }
  button.on { background:var(--ink); color:#fff; border-color:var(--ink); }
  button:focus-visible { outline:2px solid var(--bronze); outline-offset:2px; }
  .grp { font-size:12px; letter-spacing:2px; text-transform:uppercase; color:var(--bronze);
         margin:38px 40px 14px; font-weight:500; }
  .grp span { color:var(--mid); letter-spacing:0; text-transform:none; font-weight:400; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(232px,1fr));
          gap:26px; padding:0 40px; }
  .card { margin:0; }
  .card img { width:100%; aspect-ratio:4/3; object-fit:cover; display:block;
              background:#2D2E2F; border:1px solid var(--rule); }
  figcaption { display:flex; flex-direction:column; gap:2px; padding-top:8px; }
  .fn { font-size:13px; font-weight:500; word-break:break-all; }
  .meta { font-size:12px; color:var(--mid); font-variant-numeric:tabular-nums; }
  .cut { color:var(--bronze); }
  .path { font-size:11px; color:#9AA2A0; word-break:break-all; user-select:all; }
  .card.hide { display:none; }
</style></head><body>
<header>
  <h1>Foundry Art — photo library</h1>
  <p class="sub">Every image in <code>assets/images</code>. Click a thumbnail for full size;
  the grey path under each is selectable. Thumbnails sit on the footer charcoal, so cut-outs
  show their true edge. <b>lum</b> is mean luminance &mdash; the footer ground is 0.177, and the
  closer a photo sits to it the less correction it needs. Regenerate with
  <code>python3 docs/photo-library/generate.py</code>.</p>
  <div class="filters">
    <button data-f="all" class="on">All</button>
    <button data-f="cut">Cut-outs only</button>
    <button data-f="near">Near footer tone</button>
    <button data-f="mid">Mid</button>
    <button data-f="bright">Bright</button>
  </div>
</header>
__CARDS__
<script>
  const btns = document.querySelectorAll('.filters button');
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.classList.toggle('on', x === b));
    const f = b.dataset.f;
    document.querySelectorAll('.card').forEach(c => {
      const show = f === 'all' ? true
                 : f === 'cut' ? c.dataset.cut === '1'
                 : c.dataset.band === f;
      c.classList.toggle('hide', !show);
    });
  }));
</script>
</body></html>
"""


def main():
    if not os.path.isdir(IMAGES):
        sys.exit("assets/images not found at %s" % IMAGES)
    groups = collect()
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(DOC.replace("__CARDS__", render(groups)))
    total = sum(len(v) for v in groups.values())
    cut = sum(1 for v in groups.values() for i in v if i["cutout"])
    print("wrote %s" % os.path.relpath(OUT, REPO))
    print("  %d images across %d groups, %d cut-out(s)" % (total, len(groups), cut))


if __name__ == "__main__":
    main()
