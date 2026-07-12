# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

MOOL is a scalp-first botanical hair-care brand (India / INR market). This directory is a
**multi-project workspace**, not a single app:

```
extracted/        the static storefront (original; a git repo — the only one here)
app/              storefront evolved into a Node/Express client+server app
board/            Express-backed project board (Epic > Feature > Story > Task, 2-sprint plan)
kanban/           static single-file drag-and-drop kanban (16-sprint launch plan)
sprint-tracker/   static single-file checkbox tracker (same 16-sprint plan, different UI)
HANDOFF.md        session-handoff doc (partially stale — see below)
*.cmd             Windows helper scripts (deploy, Docker/WSL setup, disk cleanup)
```

Only `extracted/` is a git repo (branch `master`, one commit, **no remotes**). The
workspace root is not under version control.

`extracted/MOOL-project-brief.md` is the authoritative brand doc — product line, pricing,
claims policy, IA, roadmap. Read it before making brand/content changes anywhere.

**HANDOFF.md is stale in two ways:** it predates `app/` and `board/` (doesn't mention
them), and lists the css/js refactor of `extracted/` as "paused/awaiting go" when it has
in fact been completed. Trust this file and the code over HANDOFF.md where they disagree.

## Running / developing

No lint or tests anywhere. Node LTS is at `C:\Users\sami\tools\node`.

| Project | Run | Notes |
|---|---|---|
| `extracted/` | `npx serve extracted` (or open `index.html` via `file://`) | static; fonts need network |
| `app/` | `cd app && npm start` → :3000 | Express; `node_modules` already installed |
| `board/` | `cd board && npm start` → :3000 | Express; same port as app — don't run both at once (or set `PORT`) |
| `kanban/`, `sprint-tracker/` | open `index.html` or any static server | single-file, localStorage state |

`app/` and `board/` each have a `Dockerfile` (node:lts-alpine, port 3000);
`sprint-tracker/` has an optional static-site Dockerfile. `kanban/` and `sprint-tracker/`
carry `vercel.json` for Vercel static deploys (nothing deployed yet as of Jul 2026).

Helper scripts at the root (all `.cmd`, most need admin):
- `deploy-mool-website.cmd` — deploys `extracted/` to Vercel. **Contains a hardcoded
  Vercel token — treat as compromised, rotate it, and never copy it anywhere.**
- `install-wsl.cmd` / `start-docker-engine.cmd` — one-time Docker Desktop prerequisites.
- `clean-wasteful.cmd` — Windows disk cleanup; unrelated to MOOL.

## The storefront exists in TWO copies — edit the right one(s)

`app/public/` began as a copy of `extracted/`. Today: `index.html` is byte-identical and
`js/cart.js` is identical, but `js/catalog.js`, `js/ui.js`, `js/main.js` **differ** —
the `app/` versions `fetch()` the catalogue and checkout from the Express API instead of
using hardcoded data. A storefront change (copy, styles, markup, cart behavior) usually
needs to land in **both** `extracted/` and `app/public/`, minding those diverged files.
In `app/`, the catalogue's source of truth is server-side `app/data.js` (same four
products/prices as the front-end `PRODUCTS`), served via `GET /api/products`;
`POST /api/checkout` re-prices the cart server-side and holds orders **in-memory**
(Razorpay integration is the stated next stage; a real DB is the stated next stage for
`data.js`).

## Storefront architecture (applies to both copies)

Single-page storefront. Section order: nav → hero → thesis → ingredients (01) →
routine/shop (02) → ritual (03) → claims (04) → bundles (05) → email capture → footer,
with a cart drawer + toast appended at the end.

**Script load order matters.** Four classic (non-module) `defer` scripts in fixed order:
`catalog → cart → ui → main`. Top-level `const`s in `catalog.js` (`PRODUCTS`, `BUNDLES`,
`CATALOG`, `fmt`) and the `function`s in `cart.js`/`ui.js` share one global scope. Keep
the order, keep them classic (`type="module"` would break `file://` loading and inline
`onclick` handlers), and keep cart/drawer functions global — the HTML calls `openCart()`,
`closeCart()`, `changeQty()`, `removeItem()`, `fakeCheckout()` via inline `onclick`.

**Two rendering models coexist — know which applies before editing:**
- **Product cards render from JS.** `PRODUCTS` (in `extracted/js/catalog.js`; in `app/`
  fetched from the API backed by `app/data.js`) drives the four cards via `main.js` into
  `#prodGrid`.
- **Everything else is hardcoded HTML** — ingredients, ritual, claims, bundles sections
  and footer are static markup in `index.html`. Editing `PRODUCTS` does *not* touch them.

**Cart (`js/cart.js`):** `cart` is an `id -> qty` map; `CATALOG` merges `PRODUCTS` +
`BUNDLES` by id. `addToBag`/`changeQty`/`removeItem` mutate and call `renderCart()`.
`data-add` / `data-bundle` attributes drive add-to-bag via one delegated listener in `ui.js`.

**Gotcha — bundle prices live in two places per copy.** Bundle *card* prices (₹999 /
₹1,299) are hardcoded in the HTML; the `BUNDLES` object holds the price used for cart
math. Change both or the cart disagrees with the displayed price. (Product prices render
from JS and don't have this problem.)

## Planning tools (board / kanban / sprint-tracker)

Two different plans exist — don't conflate them:
- `kanban/` and `sprint-tracker/` are two UIs over the **same 16-sprint plan**
  (Jul '26 → Feb '27, 6 workstreams, stage gates G0–G8). Edit the plan via the `SPRINTS`
  array in each file's inline `<script>`. State is per-browser `localStorage`.
- `board/` is a later, server-backed re-take with a **condensed 2-sprint plan** and an
  Epic > Feature > User Story > Task hierarchy in `board/workitems.js` (~40 KB data file).
  `PATCH /api/workitems/:id` moves items between New/Active/Resolved/Closed — in-memory,
  resets on server restart.

## Claims policy — the hard constraint

Not stylistic: legal compliance with India's Drugs & Magic Remedies (Objectionable
Advertisements) Act. When writing or editing any product copy, claim, or marketing text:
- **Never** add growth/regrowth, "stops hair fall", anti-greying, dandruff/disease-
  treatment, or "clinically proven" (absent a study) language — brief §5 has the full list.
- Keep to the approved set: stronger/fuller-*looking*, reduces breakage, refreshes &
  clarifies scalp, conditions/softens/shine, clears buildup without stripping.
- Voice is exact, calm, ingredient-literate — no miracle-growth language, ever.

This applies in **every copy of the copy**: `extracted/js/catalog.js`, `app/data.js`,
both `index.html` honesty sections and footer disclaimers, and even the sprint-tracker
footer. Keep them all consistent with the brief.

## Design tokens

Palette, type scale, and spacing are CSS custom properties in `:root` at the top of
`css/styles.css` (both copies) — e.g. `--field`, `--panel`, `--brass`, `--bone`, `--sage`;
fonts `--serif` Fraunces / `--sans` Inter / `--mono` IBM Plex Mono. Style via tokens, not
hardcoded colors. Dark "apothecary" look, single brass accent, mono for spec/label
details. `prefers-reduced-motion` is respected via the `.rv` reveal classes — preserve
that when adding animation.
