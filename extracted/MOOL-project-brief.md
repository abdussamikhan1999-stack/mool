# MOOL — Website Project Brief

> **मूल** *(mool)* — Sanskrit/Hindi for **"root."**
> Tagline: **Start at the root.**
> Category: Modern, scalp-first botanical hair care.

This is the working brief for building the MOOL brand website. It consolidates the brand board, the product line, the claims policy, and the site that has already been built into one handoff document. Everything a developer or designer needs to keep going should be here.

---

## 1. Brand snapshot

| | |
|---|---|
| **Name** | MOOL (मूल) |
| **Tagline** | Start at the root. |
| **One-liner** | Scalp-first hair rituals built on two botanicals — rosemary for the scalp, bhringraj for strength. A routine, not a shelf of oils. |
| **Category** | Botanical hair care (cosmetic) |
| **Market** | India (pricing in ₹ / INR) |
| **Core idea** | Hair is made or broken at the scalp, so the routine starts there. Sell one routine, not more bottles. |

### Positioning
Most hair brands sell more product. MOOL sells one disciplined routine and starts at the scalp. The whole line is built on **two recognisable botanicals** rather than a long, mysterious ingredient list.

### Audience
- Ages **22–40**, women and men.
- Managing **breakage, dryness, scalp buildup**, and routines they never quite stick to.
- **Ingredient-aware** and tired of miracle promises.

### Voice
**Exact, calm, ingredient-literate.** Explain the scalp. Name the actives. Give the dose. **No miracle-growth language, ever.** Being specific beats being clever.

---

## 2. Visual identity

### Colour palette

| Token | Name | Hex | Use |
|---|---|---|---|
| `--field` | Rosemary Field | `#10201A` | Primary background |
| `--panel` | Forest (panel) | `#172E23` | Raised cards / panels |
| `--panel-2` | Forest (hover) | `#1E3B2C` | Hover / inner surfaces |
| `--sage` | Sage | `#9DB79A` | Mid-botanical, secondary type, motifs |
| `--brass` | Brass | `#C6A566` | The single accent (CTAs, prices, active names) |
| `--bone` | Bone | `#F1ECDF` | Primary type on dark |
| `--ink` | Ink | `#12211A` | Type on brass buttons |

Supporting alphas: `--bone-dim` (62%), `--bone-faint` (40%), `--line` (14% bone) for hairline dividers.

**Direction:** dark apothecary — deep botanical field, bone type, **one** brass accent. Deliberately the opposite of the cream-and-clay wellness cliché. Boldness lives in one place (the botanical sprig + lab-label mono details); everything else stays quiet.

### Typography

| Role | Typeface | Notes |
|---|---|---|
| **Display** | **Fraunces** (serif) | Wordmark & headlines. Soft high-contrast serif — used sparingly. |
| **Body** | **Inter** | All running copy and UI. Neutral, legible. |
| **Data / labels** | **IBM Plex Mono** | The signature. Specs, actives, lot data — set like a lab label. Proof over hype. |

Google Fonts import (already wired in the site):
```
Fraunces (ital, 300–600) · Inter (400–600) · IBM Plex Mono (400–500)
```

### Signature elements
- **Botanical sprig** (rosemary-style line drawing) in the hero and as leaf motifs on ingredient cards.
- **Lab-label mono treatment** — sizes, actives and specs typeset in IBM Plex Mono like a lab/apothecary label.
- **MOOL मूल wordmark** — Latin wordmark with the Devanagari मूल set small in brass.

---

## 3. Product line — "the routine"

Four products, one routine, scalp to lengths.

| # | Product | Role | Cadence | Active(s) | Size | MRP |
|---|---|---|---|---|---|---|
| 1 | **Rosemary Scalp Tonic** ⭐ *hero* | Daily scalp reset (leave-in) | Every night | Rosemary | 100 mL | ₹799 |
| 2 | **Bhringraj Root Strength Oil** | Pre-wash strength | 2–3× / week | Bhringraj | 100 mL | ₹499 |
| 3 | **Neelibhringadi Intensive Oil** | Weekly deep-condition | 1–2× / week | Neeli + Bhringraj | 100 mL | ₹599 |
| 4 | **Rosemary Strength Shampoo** | Clarifying cleanse | As needed | Rosemary | 200 mL | ₹499 |

### Product claims (approved copy)
- **Scalp Tonic:** A lightweight leave-in that refreshes the scalp and supports stronger, fuller-looking roots — without the weight of an oil.
- **Root Strength Oil:** A concentrated pre-wash oil that conditions dry roots and lengths and helps reduce the feel of breakage.
- **Neelibhringadi Oil:** A richer weekly oil for hair that feels dry, rough or overworked — for softness, shine and stronger-looking lengths.
- **Strength Shampoo:** A gentle cleanser that clears scalp buildup and leaves hair fresh — not stripped.

### The two botanicals
- **Rosemary** *(Rosmarinus officinalis)* — **for the scalp.** Refreshes and clarifies; clears buildup so roots have a clean place to grow from. In: Scalp Tonic, Strength Shampoo.
- **Bhringraj** *(Eclipta alba)* — **for strength.** Conditions dry roots and lengths; helps hair feel less prone to breakage. In: Root Strength Oil, Neelibhringadi Oil.

---

## 4. Bundles

| Bundle | Contains | Price | Notes |
|---|---|---|---|
| **Root Reset Duo** (starter) | Scalp Tonic + Root Strength Oil | ₹999 | Entry routine · ~15% off singles |
| **The Complete Root Ritual** (best value) | All four products | ₹1,299 | Sold on refill / subscription · anchors AOV |

---

## 5. Claims policy (important — this IS the brand)

Honesty about a scalp routine, instead of false growth promises, is the differentiator **and** compliance with India's **Drugs & Magic Remedies (Objectionable Advertisements) Act**. A claim only moves to the "we say" column when there's a formula and evidence on file.

**✓ We say**
- Stronger, fuller-looking hair
- Helps reduce breakage
- Refreshes & clarifies the scalp
- Conditions dry hair; adds softness & shine
- Clears buildup without stripping

**✕ We never say**
- Regrows hair / cures baldness
- Stops hair fall / treats hair loss
- Reverses greying
- Treats dandruff / scalp disease
- "Clinically proven" (without a study on file)

**Site disclaimer (customer-facing):** MOOL products are cosmetics that support a scalp-first hair-care routine. They are not intended to diagnose, treat, cure or prevent hair loss, greying, dandruff or any medical condition.

---

## 6. Site structure (information architecture)

Current build is a **single-page storefront**. Section order:

1. **Sticky nav** — wordmark · The Routine · Ingredients · The Ritual · Our Claims · Bag
2. **Hero** — wordmark, "Start at the root", lede, `Shop the routine` + `How the ritual works` CTAs, three meta stats
3. **Thesis** — the pull-quote ("we sell you one routine…")
4. **Ingredients** *(01)* — the two botanicals, each with the products it lives in
5. **The routine / shop** *(02)* — four product cards with add-to-bag
6. **A week with MOOL** *(03)* — the ritual as a numbered weekly rhythm
7. **Our claims** *(04)* — the say / never-say trust block
8. **Bundles** *(05)* — Root Reset Duo + Complete Root Ritual
9. **Email capture** — "Start at the root" routine-guide signup
10. **Footer** — shop / learn / company links + claims disclaimer

---

## 7. What's already built

**File:** `index.html` (single self-contained file — HTML, CSS, and JS inline; only external dependency is Google Fonts).

Features implemented:
- Full responsive layout (desktop → mobile) with a mobile hamburger menu.
- **Sticky nav** that turns translucent/blurred on scroll, with a live bag counter.
- **Working bag (in-memory):** add-to-bag on every product and bundle, a slide-in cart drawer with quantity steppers, remove, live subtotal, "free shipping over ₹999" note, and a demo checkout.
- Product cards generated from a JS catalogue array (single source of truth — edit `PRODUCTS` / `BUNDLES` to change the store).
- Scroll-reveal animations, hover micro-interactions, toast notifications.
- Email-capture form with a success state (front-end only).
- Accessibility floor: visible keyboard focus, Esc closes the drawer, `prefers-reduced-motion` respected.

---

## 8. Tech notes & current limitations

- **No backend.** Checkout and the email form are **front-end demos** — no payment is taken and no data is stored. State lives in JavaScript memory and resets on refresh (no localStorage).
- **No product photography.** Cards use the botanical line motif as a placeholder in place of pack shots.
- **Single page.** Products don't yet have individual detail pages.
- **Trademark / regulatory:** name, wordmark and product names are subject to trademark clearance; final on-pack and ad copy must be tied to the verified formula, licence classification and evidence file before anything is printed or published. Prices are launch targets, not final.

---

## 9. Next steps / roadmap

**Phase 1 — content & assets**
- [ ] Shoot or source product photography (pack shots + lifestyle) and swap out the leaf placeholders.
- [ ] Finalise legally-cleared on-pack and web copy against the verified formula.
- [ ] Confirm final pricing and bundle discounts.

**Phase 2 — commerce**
- [ ] Choose a platform (Shopify recommended for D2C India, or WooCommerce). Wire the existing catalogue/cart to real products and checkout.
- [ ] Set up the subscription flow for the Complete Root Ritual.
- [ ] Connect the email capture to a real ESP (Klaviyo / Mailchimp) and build the routine-guide auto-responder.
- [ ] Payments (Razorpay / Shopify Payments), shipping zones, GST.

**Phase 3 — depth**
- [ ] Split into multiple pages: Home · Shop · individual Product pages · Ingredients · About.
- [ ] Add an "ingredient index" / education content ("The Root" journal).
- [ ] Reviews / social proof (once real).
- [ ] Analytics + basic SEO (titles, meta, Open Graph, structured data for products).

---

## 10. File reference

| File | What it is |
|---|---|
| `index.html` | The live single-page storefront (current build). |
| `MOOL_brand_board.html` | Original brand board (source of tokens, products, claims). |
| `MOOL-project-brief.md` | This document. |

**To edit the store:** open `index.html` and change the `PRODUCTS` and `BUNDLES` arrays near the top of the `<script>` block — cards, prices and the cart all read from there.

---

*Working brief — not final artwork. Every claim shown is a direction; final copy must be tied to the verified formula, licence classification and evidence file.*
