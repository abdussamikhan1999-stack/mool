# HANDOFF — MOOL

_Last updated: 2026-07-12. Written to catch up a fresh Claude Code session on work done in Cowork._

## What this repo is

MOOL (मूल, "root") — a scalp-first botanical hair-care brand (India / INR). Core of the repo
is the single-file storefront `extracted/index.html`. See `CLAUDE.md` for architecture, design
tokens, and the **claims policy** (the hard constraint — DMR Act compliance; read §"Claims policy"
before touching any copy).

## What's been built (all on disk, nothing hidden in chat)

- `extracted/index.html` — the live single-page storefront. Verified working: add-to-bag → cart
  drawer → subtotal all function. In-memory state (resets on refresh).
- `sprint-tracker/` — checkbox progress tracker for the launch plan: **16 two-week sprints
  (Jul '26 → Feb '27)**, six workstreams, stage gates G0–G8. Self-contained `index.html` +
  `vercel.json` + `Dockerfile` + `README.md`. State in `localStorage`.
- `kanban/` — custom drag-and-drop Kanban of the same plan: 80 cards (16 sprints × 5 tasks)
  across Backlog → To Do → In Progress → Review → Done. Filters by sprint/workstream/search.
  PM defaults: Sprint 1 seeded into **To Do**, rest in Backlog. `index.html` + `vercel.json` + `README.md`.

## The plan, in one line per arc

- **Foundations & compliance (S1–S5):** lock formula, clear claims/copy (G1), package + label, shoot photography (G2).
- **Build & commerce (S6–S12):** real platform (Shopify), multi-page IA, checkout + payments (G3),
  subscription, ESP/lifecycle, production + stock (G4), SEO/analytics.
- **Launch & scale (S13–S16):** QA/a11y hardening (G5), soft launch (G6), campaign (G7), public launch + retro (G8).

## Deploy status — OPEN

- **Nothing is deployed yet.** Target is Vercel (static sites, no build needed).
- Deploy could **not** be run from the Cowork sandbox — its network is allowlisted and Vercel is
  unreachable (API returned HTTP 000). Must be run from the user's machine.
- One-liner (from `kanban/` or `sprint-tracker/`):
  `npx vercel deploy --prod --yes --token <TOKEN>`
- ⚠️ **Rotate the Vercel token.** A token was pasted into chat during the Cowork session; treat it
  as compromised and regenerate it in Vercel → Settings → Tokens.

## Open decisions / next steps

1. **Deploy** the kanban and/or tracker to Vercel from the user's machine; capture the live URLs.
2. **Refactor (paused):** split `extracted/index.html` into `styles.css` + `js/`. Proposed defaults:
   extract in place, classic `defer` scripts, one `styles.css`. Awaiting a "go".
3. **Backend / "Vercel endpoint":** it was mentioned but never defined. Clarify whether the storefront
   should call a real endpoint (email signup / checkout / product data) before wiring `fetch()`.
4. **Docker:** intentionally skipped for local use (needs admin + reboot on the user's machine).
   A `Dockerfile` exists in `sprint-tracker/` only as an optional container recipe; not required for Vercel.

## Landmines to respect

- **Claims policy is law here.** Never add growth/regrowth, "stops hair fall", anti-greying,
  dandruff/disease-treatment, or "clinically proven" (no study) language. See `CLAUDE.md`.
- **Bundle prices live in two places** in `extracted/index.html` — the hardcoded HTML card AND the
  `BUNDLES` object. Change both or the cart disagrees with the display.
- Product cards render from the `PRODUCTS` array; everything else is hardcoded HTML.
