#!/bin/sh
# Mirror this worktree to /tmp/lw-preview for local preview.
#
# Why a mirror: this is a Dropbox CloudStorage directory, and the sandboxed
# http.server can't getcwd() inside one — it exits with EPERM before it ever
# binds a port. Serving a plain /tmp copy is the documented workaround
# (CLAUDE.md, "Gotcha"). Re-run this after editing to refresh the preview.
set -e
SRC="$(cd "$(dirname "$0")/.." && pwd)"
rsync -a --delete \
  --exclude '.git*' --exclude 'node_modules' --exclude '.claude' --exclude '.vercel' \
  "$SRC/" /tmp/lw-preview/
echo "synced $SRC -> /tmp/lw-preview"
