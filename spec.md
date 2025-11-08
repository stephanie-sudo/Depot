# Energy Healing Homepage – Functional & Design Specification (v0.3)

> **Change-log 2025-07-25**  Added package-booking logic, Supporter→Solidarity capacity unlock, and answered open questions (shop/cart, newsletter).

---

## 0  Purpose

Build a lean, legally compliant German wellness site that

1. Presents the practitioner’s blended offering (Yoga + Energy Medicine + Elemental/Colour work).
2. Lets visitors **book single sessions *or* discounted multi-session packages** and pre-pay online.
3. Automatically tracks Supporter bookings and unlocks *Solidarity* capacity.
4. Scales to testimonials, blog, newsletter, and course sales in later phases.

---

## 1  Target Audience

* Adults (25-55) in Germany seeking holistic or spiritual wellness support.
* Pet-owners looking for gentle animal-wellness modalities.
* Yoga students expanding from asana to subtle-energy work.

---

## 2  Brand Voice & Visual Mood

| Element    | Guideline                                                                      |
| ---------- | ------------------------------------------------------------------------------ |
| Tone       | Warm, grounded, mentor-like; avoid medical jargon.                             |
| Palette    | Earth / emerald **#1C7C54**, soft sand **#F4EFEA**, highlight gold **#D8A657** |
| Typography | Headings → Playfair Display • Body → Inter.                                    |
| Imagery    | Subtle fractal or sacred-geometry backdrops, no stock “chakra clichés.”        |
| Icons      | Lucide-react thin-line set.                                                    |
| German Tone| Informal "Du" address in all German copy.                                      |

---

## 3  Sitemap & Routes

| Page / Feature         | Route       | Priority | Notes                                      |
| ---------------------- | ----------- | -------- | ------------------------------------------ |
| Home                   | `/`         | ★★★★☆    | Hero, UVP, CTA                             |
| About Me               | `/about`    | ★★★☆☆    | Personal story, credentials                |
| Sessions & Pricing     | `/sessions` | ★★★★☆    | Single sessions + **Package table**        |
| FAQ & Legal Disclaimer | `/faq`      | ★★★☆☆    | Heilpraktiker compliance, Solidarity rules |
| Testimonials (Phase 2) | `/stories`  | ★★☆☆☆    | CMS-driven feedback cards                  |
| Blog (Phase 2)         | `/blog`     | ★★☆☆☆    | MDX / CMS                                  |
| Contact / Book         | `/contact`  | ★★★★☆    | Cal.com embed + support email              |

---

## 4  Homepage Wireframe

1. **Hero** – “Ground → Glow → Grow” + CTA “Book Your Session”.
2. **Three Pillars** – Yoga • Energy Medicine • Vibrational Work (cards).
3. **Mini-Case** – Dog lymphoma vignette (60 w) + link.
4. **How It Works** – 4-step timeline (Ground → Scan → Heal → Integrate).
5. **Pricing Snapshot** – Standard • Solidarity • Supporter **＋ Package strip**.
6. **Booking Widget** – Cal.com (single or package checkout with Stripe).
7. **Footer** – Contact, socials, *Impressum*, DSGVO, disclaimer.

---

## 5  Packages & Sliding-Scale Logic

### 5.1 Tier Definitions

| Tier           | Price (60 min) | Notes                                      |
| -------------- | -------------- | ------------------------------------------ |
| **Standard**   | €90            | Default fair price.                        |
| **Solidarity** | €60            | For low-income clients; **slots limited**. |
| **Supporter**  | €120           | Pays +€30 to sponsor Solidarity pool.      |

### 5.2 Discount Packages

| Package                 | Contents        | Price | Per-session | Savings |
| ----------------------- | --------------- | ----- | ----------- | ------- |
| **Balance-5**           | 5×60 min Std.   | €400  | €80         | €50     |
| **Balance-5 Supporter** | 5×60 min Sup.   | €550  | €110        | —       |

### 5.3 Solidarity Pool Algorithm

* **For every Supporter *single* session booked** ➜ add **+1 Solidarity credit**.
* **For every Supporter *package* (5 sessions)** ➜ add **+5 Solidarity credits**.
* Solidarity credits decrement when a user books a Solidarity slot.
* Credits persist in a `solidarity_ledger` table (Supabase) keyed by year.
* Display live counter on `/sessions` page (e.g., “🌱 3 low-cost sessions currently available”).

---

## 6  System Architecture

| Layer         | Tool / Service                             | Purpose                                                       |
| ------------- | ------------------------------------------ | ------------------------------------------------------------- |
| Front-end     | Next.js 14 (App Router) + React 18         | SSR/ISR pages                                                 |
| Styling       | Tailwind CSS v3 + Framer Motion            | Utility + animations                                          |
| Booking & Pay | **Cal.com Free Tier** + Stripe             | Calendar, packages, pay-link                                  |
| DB / API      | **Supabase** (PostgreSQL + Row Level Sec.) | Store package SKUs, ledger, testimonials                      |
| Serverless Fn | Vercel Edge Functions                      | Webhooks: Stripe `checkout.session.completed` → update ledger |
| Email / CMS   | Resend (transactional) • Sanity (Phase 2)  | Confirmation mails, blog CMS                                  |
| Analytics     | Plausible (EU self-host)                   | Cookie-less                                                   |

---

## 7  Component Catalogue

| Component             | Key Props / State                  | Description                                |
| --------------------- | ---------------------------------- | ------------------------------------------ |
| `<HeroSection>`       | title, subtitle, ctaLabel, ctaLink | Full-screen hero with fade-in.             |
| `<ServiceCard>`       | icon, heading, copy                | Hover scale-up.                            |
| `<PackageTable>`      | data[] (SKU, price, save)          | Highlights Balance-5 deals.                |
| `<SolidarityCounter>` | count (SSR-fetched)                | Live badge 🌱                              |
| `<BookingEmbed>`      | calUrl, packageMode                | Cal.com iframe (single or multi checkout). |
| `<PaymentSuccessFn>`  | — (serverless)                     | On Stripe success → update ledger.         |

---

## 8  Legal & Compliance

* **Impressum** with full address, contact, USt-ID.
* Disclaimer: *„Meine Angebote dienen der energetischen Harmonisierung und ersetzen keine medizinische Diagnose …“*
* DSGVO privacy policy; Plausible = no cookies.
* Ensure Stripe & Supabase data stored in EU region.

---

## 9  SEO & Accessibility

* Semantic landmarks, alt-text, aria-labels.
* OG meta-tags; canonical links.
* WCAG 2.1 AA colour contrast.
* Future `hreflang` for DE/EN toggle.

---

## 10  Road-map ↔ Feature Mapping

| Time-frame | Milestone                       | Feature Deliverables                                                     |
| ---------- | ------------------------------- | ------------------------------------------------------------------------ |
| M1–M3      | Website live                    | Home, About, Sessions (tiers + packages + counter), Contact, Legal pages |
|            | Cal.com + Stripe operational    | Single + package SKUs; PaymentSuccessFn webhook → ledger update          |
| M4–M6      | Collect 5 pilot testimonials    | `/stories` page + CMS schema                                             |
|            | Blog seed                       | MDX posts, category tags                                                 |
| M7–M9      | 3 paying clients via site       | Testimonials carousel; email PDF (signature session)                     |
|            | Newsletter launch               | Buttondown signup component                                              |
| M10–M12    | Multi-language & structured FAQ | i18n routing; JSON-LD FAQ markup                                         |

---

## 11  Open Questions (resolved)

| Topic               | Decision                                                            |
| ------------------- | ------------------------------------------------------------------- |
| Shop / cart         | **Stripe checkout links** for packages; no separate cart UI needed. |
| Newsletter provider | **Buttondown** (simple GDPR mode, EU servers).                      |
| Booking system      | **Cal.com Free Tier**; paid events enable package SKUs.             |

---
