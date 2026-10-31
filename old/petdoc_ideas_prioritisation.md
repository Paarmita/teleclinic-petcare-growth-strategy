# PetDoc — Idea Backlog, JTBD & Prioritisation

**Problem statement:** PetDoc treats each consultation as a one-off transaction, while owners need ongoing care for their pet. Nothing pulls them back after the visit, and nothing remembers them when they return. Only 21.2% of new owners return within 180 days.

**Goal this quarter:** raise the 180-day second-consultation rate (21.2% → ~25.9% base case).

---

## 1. Jobs to be done

Format: *When [situation], I want to [motivation], so I can [expected outcome].*

| Persona | Share / return | Core job |
|---|---|---|
| **Worried one-timer** (Acute) | 61% / 14.3% | When my pet is still unwell a few days after the call, I want to know whether this is normal and get the same vet to look again quickly, so I can stop worrying and know I didn't miss something serious. |
| **New pet parent** (Young animal) | 22% / 25.7% | When I've just got a puppy or kitten and don't know what's due when, I want someone to tell me what my pet needs and when, so I can raise a healthy pet without missing vaccines or making mistakes. |
| **Care manager** (Chronic) | 12% / 51.0% | When I'm managing my pet's long-term condition, I want every vet I see to already know the history, meds and last results, so I can spend the consultation on what's changed, not re-telling the story. |
| **PetDoc vet** (internal) | — | When a consultation starts, I want a one-screen view of the pet's history and what's new, so I can give good advice without making the call longer. |

**Supporting jobs (all owners):**

- When something goes wrong mid-call (video drops, upload fails), I want it fixed or made right without effort from me, so I can still trust PetDoc next time.
- When my pet's medication is prescribed, I want to know when it will arrive and how to give it, so I can start treatment on time.
- When nothing is wrong, I want light, relevant nudges about my pet's health, so I can prevent problems instead of only reacting to them.

---

## 2. Full idea list with user stories

Impact is the estimated lift on the 180-day return rate, from the data analysis where available (segment-adjusted). Effort: **S** ≈ < 2 sprints, one team · **M** ≈ 2–4 sprints or cross-team · **L** ≈ a quarter+, platform work or ops/partner dependency.

### A. Follow up — create a reason to return soon (Acute, 61%)

| # | Idea | User story | Impact | Effort |
|---|---|---|---|---|
| A1 | **Vet-set day-3 check-in** ("How is Bella today?" better / same / worse → one-tap re-check with the same vet) | As a worried one-timer, I want the app to check on my pet a few days after the call, so that I can get a re-check quickly if things aren't improving. | **High** (~+3pp; acute 30-day return 2.2% → 6%) | **M** |
| A2 | **Post-visit care summary** (diagnosis, home-care steps, red-flag symptoms, when to come back) | As a worried one-timer, I want a written summary of what the vet said, so that I know what to watch for and when to book again. | Med (~+0.5pp; enables A1) | **S** |
| A3 | **Same-vet re-booking** ("Book again with Dr. X", history attached) | As an owner, I want to see the same vet again, so that I don't have to start from scratch with someone new. | Med | M |
| A4 | **Free short async follow-up** (48–72h text/photo question to the vet) | As a worried one-timer, I want to send a quick photo/question after the call, so that I can get reassurance without paying for a full consultation. | Med–High (tests the "reassurance not re-check" risk); may cannibalise paid re-checks | M–L (vet capacity, cost) |
| A5 | **Recovery tracker** (daily symptom/photo log for skin, wounds, GI) shared with the vet | As a worried one-timer, I want to log how my pet is doing day by day, so that the vet can see the trend at the re-check. | Low–Med | M |
| A6 | **Rx delivery tracking + dosing reminders** | As an owner whose pet got a prescription, I want to track delivery and get dose reminders, so that treatment starts on time and I finish the course. | Med (~+0.5pp; each extra delivery day OR 0.85) | S–M |
| A7 | **Case closure → saved to pet record** ("Better" closes the episode) | As an owner, I want the episode saved to my pet's record, so that next time PetDoc already knows what happened. | Low (feeds B1) | S |

### B. Remember — make returning easy (all, essential for Chronic)

| # | Idea | User story | Impact | Effort |
|---|---|---|---|---|
| B1 | **Living pet profile** (history, past consults, uploads, meds, allergies) | As an owner, I want my pet's information stored in one place, so that I never have to repeat it. | **High** (enabler; ~+1.4pp from re-telling alone) | **L** |
| B2 | **Vet pre-call one-screen summary** | As a PetDoc vet, I want a short summary of the pet before the call starts, so that I don't ask for information the owner already gave. | **High** for Chronic (55% → 35% return when re-telling happens) | M (needs B1) |
| B3 | **"Anything new since last time?" delta intake** | As a returning owner, I want to tell PetDoc only what has changed, so that booking takes seconds and the call starts with what matters. | Med | S–M |
| B4 | **Auto-attach history to every booking** | As a care manager, I want my latest results and meds attached automatically, so that the vet is prepared without me uploading again. | Med | S (after B1) |
| B5 | **Book-next-check at end of call** (recurring slot for chronic cases) | As a care manager, I want to book my next check-in before the call ends, so that I keep a regular cadence without having to remember. | Med (chronic cadence ~26 days) | S |
| B6 | **Chronic medication refill reminders + one-tap review** | As a care manager, I want a reminder before meds run out with an option to book a review, so that my pet's treatment never lapses. | Med (Chronic) | S–M |
| B7 | **"The vet already knew my pet" one-tap survey** | As a product team, we want a one-tap post-visit question, so that we can see context loss that star ratings hide. | Measurement only (unlocks the leading metric) | **S** |

### C. Plan ahead — a reason to open the app between problems (Young animal, 22%)

| # | Idea | User story | Impact | Effort |
|---|---|---|---|---|
| C1 | **Care plan at first visit** (vaccines, deworming, check-ups by species/age) with reminders + one-tap booking | As a new pet parent, I want a personalised care calendar, so that I don't miss what my puppy or kitten needs. | **High–Med** (~+1.3pp; young-animal 60-day return 15% → 21%) | **M** |
| C2 | **Milestone content** (growth, diet, behaviour, training by age) | As a new pet parent, I want timely tips for my pet's current age, so that I feel confident I'm doing it right. | Low–Med | S–M |
| C3 | **Weight / growth tracker** | As a new pet parent, I want to log my pet's weight, so that I can see whether growth is on track and ask a vet if not. | Low | S |
| C4 | **Seasonal prevention nudges** (ticks, heat, fireworks, toxic foods) for all owners | As an owner, I want a heads-up before seasonal risks, so that I can prevent problems instead of reacting. | Low–Med | **S** |
| C5 | **Annual wellness check reminder** for acute owners | As a one-time user, I want a reminder for a yearly check, so that I come back before something goes wrong. | Low–Med (acute returners already come back ~70 days later) | S |
| C6 | **Extend plans to senior / chronic pets** | As an owner of an older pet, I want a care plan for ageing, so that problems are caught early. | Med (later) | M |

### D. Fix friction — mostly owned by other missions (track and push)

| # | Idea | User story | Impact | Effort |
|---|---|---|---|---|
| D1 | **Service recovery after a bad visit** (auto apology + free/discounted re-consult when A/V failed or re-telling flagged) | As an owner whose call went wrong, I want PetDoc to make it right, so that I give it another chance. | Med (tech + re-telling visits return at only 3.2%) | **S** |
| D2 | **Pre-call connection check + auto fallback to audio/phone** | As an owner, I want the app to test my connection and switch to audio if video fails, so that the consultation isn't lost. | Med (~+1.4pp) | M–L (other mission) |
| D3 | **Upload before the call + retry/background upload** | As an owner, I want my photos and files to upload reliably before the call, so that the vet can see them. | Low–Med (~+0.8pp) | S–M (other mission) |
| D4 | **Faster Rx delivery** (≤ 4-day SLA, local pharmacy option) | As an owner, I want medication within a few days, so that treatment starts quickly. | Med (~+0.9pp) | L (ops/partners) |
| D5 | **Wait-time transparency + call-back slot** in evenings | As an owner waiting in the evening, I want to see the wait or get a call back, so that I don't drop off. | Low (only matters > 15 min) | S |

### E. Lifecycle / re-engagement

| # | Idea | User story | Impact | Effort |
|---|---|---|---|---|
| E1 | **Turn happy one-timers into profile owners** (68% of 5★ raters don't return; prompt to complete pet profile / save favourite vet after a 5★) | As a satisfied owner, I want to save my pet and vet easily, so that next time is faster. | Low–Med | **S** |
| E2 | **Multi-pet onboarding** ("Add your other pets") | As an owner with more than one pet, I want all my pets in one account, so that I can use PetDoc for any of them. | Low–Med | S |

**Out of scope:** pricing and subscriptions (fixed in the brief); platform-specific work and consultation length (not significant drivers).

---

## 3. Prioritisation

### 3.1 Scoring

Impact 1–5 (lift on the north-star metric and strategic value) · Effort 1–5 (5 = highest) · **Priority = Impact ÷ Effort**, then adjusted for dependencies.

| Rank | # | Idea | Impact | Effort | Score | Quadrant |
|---|---|---|---|---|---|---|
| 1 | B7 | "Vet already knew my pet" survey | 3 | 1 | 3.0 | Quick win (measurement) |
| 2 | A2 | Post-visit care summary | 3 | 1.5 | 2.0 | Quick win |
| 3 | D1 | Service recovery after bad visit | 3 | 1.5 | 2.0 | Quick win |
| 4 | B5 | Book-next-check at end of call | 3 | 1.5 | 2.0 | Quick win |
| 5 | A1 | Day-3 check-in + one-tap re-check | 5 | 3 | 1.7 | **Big bet — quarter's main bet** |
| 6 | B3 | "Anything new?" delta intake | 3 | 2 | 1.5 | Quick win |
| 7 | B2 | Vet pre-call summary | 4 | 3 | 1.3 | Big bet |
| 8 | C1 | Care plan + reminders | 4 | 3 | 1.3 | Big bet |
| 9 | A6 | Rx tracking + dose reminders | 3 | 2.5 | 1.2 | Fill-in |
| 10 | B6 | Chronic refill reminders | 3 | 2.5 | 1.2 | Fill-in |
| 11 | E1 | 5★ → save profile / vet | 2 | 1.5 | 1.3 | Fill-in |
| 12 | C4 | Seasonal nudges | 2 | 1.5 | 1.3 | Fill-in |
| 13 | E2 | Multi-pet onboarding | 2 | 1.5 | 1.3 | Fill-in |
| 14 | B1 | Living pet profile | 5 | 4.5 | 1.1 | **Big bet — foundation** |
| 15 | A3 | Same-vet re-booking | 3 | 3 | 1.0 | Big bet (small) |
| 16 | C5 | Annual wellness reminder | 2 | 2 | 1.0 | Fill-in |
| 17 | D2 | Connection check + audio fallback | 3 | 4 | 0.8 | Other mission |
| 18 | A4 | Free async follow-up | 3.5 | 4 | 0.9 | Test later (only if A1 shows "reassurance" demand) |
| 19 | D3 | Reliable uploads | 2 | 2.5 | 0.8 | Other mission |
| 20 | C2 | Milestone content | 2 | 2.5 | 0.8 | Fill-in |
| 21 | D5 | Wait-time transparency | 1 | 1.5 | 0.7 | Low priority |
| 22 | A5 | Recovery tracker | 2 | 3 | 0.7 | Later |
| 23 | C6 | Senior / chronic plans | 3 | 3.5 | 0.9 | Next quarter |
| 24 | C3 | Weight tracker | 1 | 1.5 | 0.7 | Low priority |
| 25 | D4 | Faster Rx delivery | 3 | 5 | 0.6 | Other mission (ops) |

> B1 scores low on ratio but is ranked as a foundation: A1, A3, B2, B4 and C1 all depend on it. Build a thin version first (consults + uploads + meds), not the full record.

### 3.2 Effort × impact matrix

| | **Low effort** | **High effort** |
|---|---|---|
| **High impact** | **Quick wins — do now:** B7 survey, A2 care summary, D1 service recovery, B5 book-next-check, B3 delta intake | **Big bets — plan & build:** A1 day-3 check-in (main bet), B1 thin pet profile (foundation), B2 vet summary, C1 care plan |
| **Low impact** | **Fill-ins — when capacity allows:** A6 Rx tracking, B6 refill reminders, E1, E2, C4, C5 | **Avoid / hand off:** D2, D3, D4 (other missions), A4 (test only if signals justify), A5, C6 (later) |

### 3.3 Sequencing

| Phase | What ships | Why |
|---|---|---|
| **Now (weeks 1–4)** | B7, A2, D1, B5, B3 | Cheap, start measuring hidden churn, small lift straight away |
| **Quarter core (weeks 3–10)** | B1 thin profile → B2 vet summary → **A1 day-3 check-in** with history attached to re-check | Main hypothesis: a follow-up moment turns acute one-timers into returners |
| **Quarter end / test** | C1 care plan as a small A/B test for young animals; A6 Rx tracking | Starts the "everyday companion" ambition |
| **Next quarter** | A3, B6, C2, C6; A4 only if check-in owners want reassurance rather than re-checks | Expand once the core loop is proven |
| **Advocate (other missions)** | D2, D3, D4 | ~+3pp combined; necessary but not ours |

---

## 4. Acceptance criteria for the top 3

**A1 — Day-3 check-in**
- Vet sets or confirms a check-in date during the consultation (default by condition type).
- Owner gets "How is [pet] today?" with better / same / worse.
- "Same" or "worse" → one-tap re-check with the same vet, history attached; fallback to next available vet within X hours.
- "Better" closes the case and saves it to the pet record.
- Tracked: response rate (target 40%), re-check within 14 days (0.7% → 4–5%), share of re-checks vets mark "not needed" (guardrail), notification opt-outs.

**B1 + B2 — Pet profile and vet summary**
- Every consult, upload and prescription is saved to the pet profile automatically.
- The vet sees a one-screen summary (last 3 consults, active meds, latest uploads, owner's "what's new") before joining.
- Tracked: re-telling rate 17–19% → < 5%; "vet already knew my pet" ≥ 80%; consultation length unchanged.

**C1 — Care plan**
- At a young animal's first visit, the vet creates a plan from a species/age template in under 30 seconds.
- Owner gets reminders with one-tap booking of the right consultation type.
- Tracked: plan setup ~50%; reminder → booking ~15%; young-animal 60-day return 15% → 21%.
