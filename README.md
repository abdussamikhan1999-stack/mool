# MOOL

A scalp-first botanical hair-care brand (India / INR market) — a disciplined two-botanical routine rather than a long ingredient list. This repo holds the brand's storefront.

## Structure

| Path | What it is |
|---|---|
| [`extracted/`](./extracted) | The original static storefront — single-page, no build step |
| [`app/`](./app) | The storefront evolved into a Node/Express app with a small API (catalogue, checkout) |
| `extracted/MOOL-project-brief.md` | Authoritative brand doc — product line, pricing, claims policy, IA, roadmap |
| `CLAUDE.md` | Architecture notes and editing rules for AI-assisted work in this repo |
| `HANDOFF.md` | Session handoff notes (see caveats in `CLAUDE.md` — partially stale) |

## Running

| Project | Command | Notes |
|---|---|---|
| `extracted/` | `npx serve extracted` (or open `index.html` via `file://`) | Static; fonts need network |
| `app/` | `cd app && npm install && npm start` → `:3000` | Express server + API |

Both have a `Dockerfile` (`node:lts-alpine`, port 3000).

## The storefront exists in two copies

`app/public/` began as a copy of `extracted/`. `index.html` and `js/cart.js` stayed identical; `js/catalog.js`, `js/ui.js`, `js/main.js` diverged — the `app/` versions fetch the catalogue and checkout from the Express API (`app/data.js`, `GET /api/products`, `POST /api/checkout`) instead of using hardcoded data. **A storefront change usually needs to land in both copies.** See `CLAUDE.md` for the full architecture breakdown (script load order, cart model, design tokens).

## Claims policy — hard constraint

Product copy must comply with India's Drugs & Magic Remedies (Objectionable Advertisements) Act: no growth/regrowth, "stops hair fall", anti-greying, disease-treatment, or unproven "clinically proven" language. Approved language only (stronger/fuller-*looking*, reduces breakage, refreshes scalp, etc.) — see `MOOL-project-brief.md` §5 and `CLAUDE.md` for the full list before touching any copy, in either storefront copy.

## Status

Nothing is deployed yet; target is Vercel. See `HANDOFF.md` for the current plan and open decisions.

## Security note

One `.cmd` deploy script that contained a hardcoded Vercel token is intentionally excluded from this repo via `.gitignore`. If you still have a copy of it, treat that token as compromised and rotate it — do not commit or share it.
