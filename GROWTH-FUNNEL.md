# GROWTH FUNNEL — MOOL

_Two-engine growth model: **leads via Meta marketing** at the top, **sales via commission (affiliates/creators)** at the bottom. This is a build-vs-buy plan and phasing doc — it decides what MOOL builds itself, what it buys, and in what order. Read alongside `CLAUDE.md` (architecture + claims policy) and the 16-sprint launch plan in `kanban/` / `sprint-tracker/`._

_Status: draft for review. Nothing here is wired yet._

---

## 1. The funnel, end to end

```
Meta ads / creators        →  Quiz lead magnet        →  Email nurture        →  Storefront checkout   →  Affiliates resell
(AWARENESS)                   (LEAD)                     (CONSIDERATION)          (PURCHASE)               (ADVOCACY → SALES)

Engine A: Meta → Leads  ────────────────────────────────┘                                                │
Engine B: Commission → Sales ──────────────────────────────────────────────────────────────────────────┘
```

- **Engine A (top):** paid + organic Meta traffic lands on the **"Find your routine" quiz** (already built — `extracted/quiz.html`, `app/public/quiz.html`), which is the lead magnet. Every completion → captured email → retargeting + nurture.
- **Engine B (bottom):** affiliates/creators get referral links or codes and earn **commission per sale**. Attribution + payouts.

The quiz is the hinge between the two: it's the highest-converting Meta asset we have, and its result page is the natural place to drop a creator's referral offer.

---

## 2. Engine A — Meta → Leads

| Component | Build or Buy | Notes |
|---|---|---|
| Meta ad account + Pixel + Conversions API (CAPI) | **Buy/Setup** (Meta Business Suite) | Need a **Pixel/dataset ID** + CAPI token. Free, but requires a business account. |
| Lead magnet (quiz) | **Built** ✓ | Add an email-capture step on the result screen. |
| Landing / quiz page | **Built** ✓ | Self-contained, claims-compliant, on-brand. |
| Pixel event tracking | **Build (light)** | Standard events below. Consider Google Tag Manager (free) to manage tags without code edits. |
| Server-side CAPI (event dedupe) | **Build** — Phase 1 | Fire from the Express app with a shared `event_id` to dedupe against the browser Pixel. Improves match quality vs. iOS/ad-blocker loss. |
| Lead storage / ESP | **Buy** (Klaviyo recommended for D2C ecom) | Interim: a thin `POST /api/lead` on the Express app to collect while ESP is chosen. |
| Nurture / welcome flows | **Buy** (ESP) | Welcome series, quiz-result follow-up, launch offer. |
| Consent + privacy | **Build** | Consent checkbox + privacy policy — required (see §5, India DPDP Act). |

**Standard events to instrument (Pixel + CAPI, all with `event_id` for dedupe):**

| Event | Fires when | Key params |
|---|---|---|
| `PageView` | any page | — |
| `ViewContent` | product/quiz view | `content_ids`, `content_type` |
| `Lead` | quiz result / email submit | `content_name` = "routine-quiz" |
| `AddToCart` | add-to-bag | `content_ids`, `value`, `currency:"INR"` |
| `InitiateCheckout` | checkout opened | `value`, `currency` |
| `Purchase` | order complete | `value`, `currency`, `content_ids` |

**Capture on every entry:** `utm_source/medium/campaign/content/term`, `fbclid`, and `?ref` (see Engine B) → persist to cookie/`localStorage`, attach to the lead and later the order.

---

## 3. Engine B — Commission → Sales (affiliate / creator program)

Definition: creators/affiliates get a **unique link or code**; sales they drive are **attributed** to them and earn **commission**, paid out on a schedule.

| Component | Build or Buy | Notes |
|---|---|---|
| Referral link / code capture | **Build-lite now** | `?ref=CODE` → cookie + passed to checkout. Starts collecting attribution *data* immediately. |
| Attribution + commission calc | **Buy** | Affiliate SaaS. Hand-building this on the in-memory Express app is not worth it. |
| Creator onboarding + dashboards + links | **Buy** | Self-serve creator portal. |
| Payouts | **Buy** | India payout support (bank/UPI). Do **not** hand-build payouts. |
| Discount-code attribution (creator codes) | **Buy + checkout** | Works once real checkout + platform exist. |

**Affiliate SaaS shortlist:** GoAffPro, UpPromote, Refersion (all strong on Shopify); Trackier / Affise (India-based, platform-agnostic). Pick after the platform decision (§4).

**Hard dependency:** commission sales need **real checkout + order records**. Today checkout is an in-memory stub (`POST /api/checkout`), so Engine B can only *collect attribution data* until payments are live. Payouts follow payments.

---

## 4. Platform decision (the pivot point)

The ESP + payments + affiliate triad is dramatically easier on **Shopify** — already the planned commerce platform for sprints S6–S12. Recommendation:

- **Keep** the custom quiz + landing pages as the Meta lead-gen front end (a real differentiator) → feed leads to the ESP.
- **Move** commerce + affiliate onto Shopify when payments go live; use a Shopify affiliate app + Razorpay/Shopify Payments.
- **Interim** on the current Express stack: capture leads + `?ref` codes (data only), no payouts yet.

This avoids hand-building checkout, order storage, commission math, and payouts on a stack that's explicitly slated to be replaced.

---

## 5. Compliance flags (do not skip)

- **DMR Act claims policy applies to ad creative too.** Every Meta ad, headline, and landing line must stay inside the approved set (stronger/fuller-*looking*, reduces breakage, refreshes scalp, softness & shine, clears buildup) — never growth/regrowth, hair-fall, greying, dandruff, or "clinically proven." See `CLAUDE.md` §"Claims policy". The quiz's compliant copy is the safe backbone for the whole funnel.
- **Meta's own health/beauty ad policies** — avoid before/after "results", personal-attribute targeting restrictions, and unrealistic outcome claims.
- **India DPDP Act 2023** — collecting lead emails/behaviour needs explicit consent, a published privacy policy, and a defined data-handling/deletion path. Build the consent checkbox before running lead ads.
- **Rotate the Vercel token** (flagged in `HANDOFF.md`) before anything goes to production.

---

## 6. Phased plan

**Phase 0 — Lead funnel on current stack (no external commerce needed)**
1. Quiz result → email capture step.
2. `POST /api/lead` on the Express app (or direct-to-ESP) to store leads.
3. Meta Pixel + standard browser events on storefront + quiz.
4. UTM + `fbclid` + `?ref` capture → attached to each lead.
5. Consent checkbox + privacy policy stub.
6. Claims-compliant ad-copy + creative library.

**Phase 1 — Commerce live**
1. Confirm platform (Shopify recommended) + payments (Razorpay / Shopify Payments).
2. Server-side CAPI with `event_id` dedupe.
3. `Purchase` event with real `value`/`currency`.

**Phase 2 — Commission engine live**
1. Install affiliate SaaS; migrate captured `?ref` data.
2. Creator codes + links, commission tiers, payout schedule.
3. Retargeting + lookalike audiences built from lead/purchaser data.

---

## 7. KPIs

- **Leads:** cost per lead (CPL), quiz completion rate, email opt-in rate.
- **Sales:** CAC, ROAS, AOV, conversion rate.
- **Affiliate:** % of revenue via affiliates, effective commission %, top creators.

---

## 8. Open decisions (need input before Phase 0 ships)

1. **Meta Pixel / dataset ID** — do you have a Business account + Pixel yet?
2. **ESP** — Klaviyo (recommended) vs Mailchimp vs Meta's native CRM?
3. **Platform** — commit to Shopify, or stay on the custom Express app longer?
4. **Affiliate SaaS + commission structure** — flat % vs tiered; which tool?
5. **Payouts** — India method (bank transfer / UPI) and schedule?
6. **Consent/privacy** — who owns the privacy policy copy?
