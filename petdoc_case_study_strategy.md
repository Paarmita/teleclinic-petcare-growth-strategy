# PetDoc — Patient Experience Case Study

*Senior PM, Patient Experience · All numbers taken from `petdoc_case_data_EN.csv` (1,413 consultations, 1,200 owners, Aug 2025 – Jan 2026, 180-day follow-up window).*

---

## 0. Executive summary

PetDoc wins the first visit (4.8★, NPS 65) and then disappears from the owner's life. Only **21.2% of owners come back for a second consultation within 6 months**. The data says this is not mainly a quality problem, it is a **design problem: PetDoc treats each consultation as a one-off transaction, while the pet needs ongoing care.** Two gaps follow from that:

1. **The follow-through gap.** 61% of owners arrive with an acute problem. Only 14.3% of them return, and when they do it is after ~70 days, for a new episode. Just 0.7% come back within 14 days, even though the days right after an acute consultation are exactly when owners wonder "is this getting better?". Nothing in the product asks.
2. **The memory gap.** In 19% of consultations the vet asks for information the owner already gave. Ratings barely move (4.35 → 3.89), but return drops by a third (22.6% → 15.3%). This is silent churn that star ratings hide.

Fixing every measurable friction point (re-telling, video, upload, delivery) would only lift return to ~25% (+4–5pp). The rest of the gap is structural: most owners have no reason to come back. So the strategy is to **give owners a reason to return and make returning effortless**.

**The feature for this quarter: "Care Loop" (Nachsorge).** The vet sets a check-in day during the consultation. On that day the owner gets *"Wie geht es Bella heute?"* → Better / Same / Worse. "Same" or "Worse" leads to a one-tap re-check with the same vet, with the full history and a new photo already attached, at the normal price. "Better" closes the case and saves it to the pet's record.

| | Today | Care Loop alone (base) | Programme, 2 quarters (base) | 12-month ambition |
|---|---|---|---|---|
| 180-day second-consultation rate | 21.2% | ~23.5% | ~25.9% | ~29% |
| Acute re-check within 14 days | 0.7% | ≥3% | 4–5% | 5% |
| Re-telling rate | 19% | — | <10% | <5% |

---

## 1. Brief, constraints and the question I'm answering

| Item | Detail |
|---|---|
| Company | PetDoc, Germany's leading pet telemedicine app: video + chat with vets, Rx shipped via partner pharmacy |
| Scale | 50,000 MAU · ~2,800 new registrations/month · 120 vets · 4.8★ · NPS 65 |
| Business model | Pay-per-visit €35–45, ~€10 contribution margin per consultation. **Pricing and model are fixed.** |
| Mission goal (set) | More users come back for a second consultation |
| Neighbouring missions | Vet Experience (everything vets do), Growth (acquisition, activation, new user groups) |
| My call | Which problem to solve, for whom, and what the team builds |

The question: *Why does a 4.8★ first visit not turn into a second one, and what is the highest-leverage thing Patient Experience can build this quarter to change that?*

---

## 2. Data analysis

### 2.1 Dataset and method

| Item | Detail |
|---|---|
| Rows | 1,413 consultations, 1,200 owners, one row per consultation |
| Window | 1 Aug 2025 – 31 Jan 2026; extracted 1 Aug 2026, so every row has a full 180 days |
| Unit for retention | Each owner's **first consultation in the sample** (n=1,200) |

**Data caveats worth stating upfront:**
- Baseline is 21.2% at owner level, 22.5% at consultation level; the brief's 23% is consultation-level.
- "First visit in sample" may not be the owner's true first visit on PetDoc.
- Rating is missing for 54% of first visits, and raters return more (24.0% vs 18.8%), so **ratings are biased upward**.
- Segment is fixed per owner. `consultation_restarted` is a subset of `video_audio_issue`.
- There is **no vet ID, diagnosis or condition column**. Same-vet feasibility and condition-specific check-in days can't be validated from this data.
- Sample sizes are small for chronic (149 owners), so chronic-specific conclusions have wide confidence intervals.

### 2.2 Who comes back: segment is the biggest driver

| Segment | Owners | Share | 180d return | Median days to return | Adjusted OR vs Acute |
|---|---|---|---|---|---|
| **Acute** | 736 | 61% | **14.3%** | 70 | 1.0 (ref) |
| Young animal | 261 | 22% | 25.7% | 45 | 2.15 (p<0.001) |
| Chronic | 149 | 12% | 51.0% | 26 | 7.01 (p<0.001) |
| Unclear | 54 | 5% | 11.1% | 45 | 0.73 (n.s.) |

Chronic owners return on a care cadence (~4 weeks). Young-animal owners return on a developmental cadence. **Acute owners — the majority — return only when the next problem happens.**

### 2.3 When they come back: the empty post-visit window

Cumulative return after the first visit:

| Segment | ≤14 days | ≤30 days | ≤60 days | ≤90 days | ≤180 days |
|---|---|---|---|---|---|
| Acute | **0.7%** | **2.2%** | 6.0% | 9.0% | 14.3% |
| Young animal | 3.8% | 8.8% | 17.6% | 22.2% | 25.7% |
| Chronic | 11.4% | 29.5% | 42.3% | 49.0% | 51.0% |
| All | 2.8% | 7.1% | 13.1% | 16.9% | 21.2% |

For an acute problem (skin, GI, wound, eye/ear), the days after the consultation are when recovery is uncertain. Almost nobody uses PetDoc then. Either the problem resolves, or the owner goes elsewhere (26 comments explicitly mention going back to the local clinic).

### 2.4 What pushes them away: friction, inside every segment

| Friction on first visit | Affected | Return if yes vs no | Adjusted OR (p) |
|---|---|---|---|
| Vet asked for info already provided ("re-telling") | 19% (229) | 15.3% vs 22.6% | **0.54 (0.004)** |
| Video/audio issue | 9% (107) | 5.6% vs 22.7% | **0.19 (<0.001)** |
| Upload failed | 8% (92) | 15.2% vs 21.7% | 0.49 (0.025) |
| Rx delivery ≥5 days (of 459 Rx owners) | 28% (127) | 16.5% vs 25.6% | 0.86 per extra day (0.015) |

- Smooth visit: **24.6%** return. Any friction: **14.0%**. Tech issue + re-telling together: **3.2%** (n=31).
- Friction hits every segment roughly equally (31–35% of first visits) and roughly halves return in each: Acute 16.8% → 8.7%, Young animal 30.4% → 16.7%, Chronic 61.2% → 31.4%.
- Chronic owners who had to re-tell: 54.5% → 34.6% return.
- Re-telling also happens on returning visits (22% of second consultations), so the memory gap persists for the most loyal owners.

### 2.5 What the ratings don't show

| Signal | Rating effect | Return effect | Read |
|---|---|---|---|
| Video/audio issue | 4.36 → 2.46 | 22.7% → 5.6% | Visible; owners complain |
| Re-telling | 4.35 → 3.89 | 22.6% → 15.3% | **Silent churn**; owners leave quietly |
| 5★ raters | — | 68% do not return | Satisfaction ≠ a reason to return |

Return by rating: 5★ 32%, 4★ 20%, 3★ 9%, 1–2★ ~6%. The 4.8★ headline overstates loyalty because unhappy owners rate less often.

### 2.6 What doesn't matter (much)

| Factor | Finding |
|---|---|
| Platform (iOS / Android / Web) | No significant difference (OR 0.85–1.10, n.s.) |
| Consultation duration | Not significant |
| Prescription issued | 23.1% vs 20.0%, no meaningful difference |
| Wait time | Weak (OR 0.97/min, p=0.06); only >15 min matters (16.0% return). Evening waits are longer (9.7–11.1 min after 17:00 vs ~7 min daytime) |
| Cohort month | Stable 17–27%, no trend |

### 2.7 Voice of the owner (comment themes, consultation level)

| Theme | n | Return | Typical comment |
|---|---|---|---|
| Context present (positive) | 72 | **36%** | "Everything was already on file, we got straight to the point." |
| Positive (other) | 40 | 38% | "No waiting, no technical problems, helped right away." |
| Neutral | 60 | 28% | "It was fine. But no more than that." |
| Context lost (re-telling) | 53 | 25% | "There's a file, but apparently nobody read it." · "The same questions as last time. That was the point where I gave up on it." |
| Video/audio | 22 | 18% | "The sound kept cutting out. Next time I'll go back to the clinic." |
| Upload | 19 | 16% | "Error message when uploading, no explanation." |
| Delivery | 17 | 12% | "The prescription came fast, the package didn't." · "Shipment tracking is missing entirely." |
| Waiting | 13 | 8% | "Waited over twenty minutes." |

The most loyal theme is not "fast" or "cheap". It is **"they already knew my pet."**

### 2.8 Sizing the ceiling of friction fixes

Counterfactual from the adjusted model (set each friction to zero, keep segment mix):

| Fix | Lift on 180d return |
|---|---|
| No re-telling | +1.6pp |
| No video/audio issues | +1.4pp |
| No upload failures | +0.8pp |
| Rx delivery ≤4 days | ~+0.9pp |
| **All friction removed** | **~+4–5pp → ~25–26%** |

Even a perfect consultation leaves PetDoc at ~25%. **Friction fixes are necessary but capped; most of the gap is that acute owners have no reason to come back.** Moving Acute by +6pp is worth ~+3.7pp overall; moving Young animal by +6pp is worth ~+1.3pp.

---

## 3. The gap

| Layer | What owners need | What PetDoc does today | Evidence |
|---|---|---|---|
| **Follow-through** | "Tell me if this is normal, and let me get the same vet back quickly if it isn't" | Consultation ends; nothing happens until the owner has a new problem | Acute 14-day return 0.7%; returners come back after ~70 days |
| **Memory** | "Every vet I see already knows my pet" | Info given at intake or in earlier consultations doesn't reach the vet reliably | 19% re-telling, OR 0.54; "context present" is the most loyal theme |
| **Plan ahead** | "Tell me what my puppy needs and when" | No care plan, no reminders | Young animal 25.7%, predictable needs, 60-day return 17.6% |
| **Reliability** | "The call works, my files upload, meds arrive" | 9% A/V, 8% upload, 28% of Rx take ≥5 days | Combined ~+3pp, owned by other missions |

**Problem statement:** *PetDoc treats each consultation as a one-off transaction, while owners need ongoing care for their pet. Nothing pulls them back after the visit, and nothing remembers them when they return.*

---

## 4. Users and jobs to be done

| Persona | Share / return | Core job |
|---|---|---|
| **Worried one-timer** (Acute) | 61% / 14.3% | When my pet is still unwell a few days after the call, I want to know whether this is normal and get the same vet to look again quickly, so I can stop worrying and know I didn't miss something serious. |
| **New pet parent** (Young animal) | 22% / 25.7% | When I've just got a puppy or kitten and don't know what's due when, I want someone to tell me what my pet needs and when, so I can raise a healthy pet without missing anything. |
| **Care manager** (Chronic) | 12% / 51.0% | When I'm managing a long-term condition, I want every vet to already know the history, meds and last results, so the consultation is about what changed. |
| **PetDoc vet** (internal) | 120 vets | When a consultation starts, I want a one-screen view of the pet and what's new, so I can give good advice without making the call longer. |

Supporting jobs for all owners: when something goes wrong mid-call, make it right without effort from me; when medication is prescribed, tell me when it arrives and how to give it.

---

## 5. Competitive landscape

| Player | Type | How owners access it | Strength | Gap PetDoc can exploit |
|---|---|---|---|---|
| **Dr. Fressnapf** | Retail-owned tele-vet | Free for DA Direkt insured; unlimited use included in Fressnapf/petolo insurance tariffs | Brand, store network, insurance distribution, 4.9★ | Single-consult triage model; strongest copy risk for continuity |
| **FirstVet** | Nordic tele-vet, insurer-bundled | Free/unlimited for Dalma customers (7–24h); Barmenia with direct billing | Scale across Europe, insurer partnerships | Trustpilot reviewers complain about multi-day waits and long intake questionnaires |
| **Pfotendoctor** | Berlin D2C tele-vet startup | Video consults with vets who also work in practices | Vet credibility, small and focused | Small team, limited product depth |
| **Dr. Sam** | D2C tele-vet | From earlier scan, not re-verified | — | — |
| **Insurers** (Allianz, DA Direkt, Barmenia, Dalma) | Bundle tele-vet as a free benefit | Included in policy | Price = free for the insured | Only ~23% of German pet owners have pet health insurance, so ~3/4 of the market pays per visit |
| **Retail / pharmacy** (Fressnapf, Shop-Apotheke) | Rx and products | E-commerce | Logistics, product range | No consultation relationship |
| **Local vet clinics** | The real alternative | In person | Trust, physical exam, vaccinations | No follow-up between visits; owners mention "back to the clinic" after bad PetDoc experiences |
| **US/CA benchmarks** (Airvet, Pawp, Vetster) | Membership / follow-up models | Subscription or per-visit | Follow-up and membership patterns | Reference only; subscription is out of scope here |

**Where PetDoc can't win:** price (insurers give it away), raw 24/7 availability, consultation quality (table stakes; PetDoc already rates 4.8★).

**Where PetDoc can win, and it fits the data:**
1. **Continuity** — "the vet already knows my pet". Directly addresses the 19% re-telling problem and builds a pet-record data moat.
2. **Closed-loop follow-up** — PetDoc checks back after an acute visit, inside pay-per-visit. Competitors end at the consultation.
3. **Proactive care plan** for young animals — predictable needs, a scheduled reason to return.

**Positioning:** *"Others give you a vet when something's wrong. PetDoc is the vet who remembers your pet and checks back."*

**Main competitive risk:** Dr. Fressnapf copies continuity. Defence is speed and compounding: the pet record and same-vet relationships get more valuable the earlier they start.

---

## 6. Options considered, and why most were not the lead bet

| Option | Upside | Why not the lead bet |
|---|---|---|
| **Fix friction first** (audio fallback, reliable uploads, faster Rx) | ~+3–4pp combined | Capped (§2.8); mostly owned by Vet Experience / Ops. **Advocate and track, don't lead.** |
| **Free async follow-up chat** (48–72h question to the vet) | Strong reassurance value | €10 margin can't absorb unpaid vet time; cannibalises paid re-checks; pricing is fixed. **Test only if Care Loop shows owners want reassurance, not re-checks.** |
| **Subscription / membership** | Strong retention lever elsewhere | Pricing and model fixed. Out of scope. |
| **Broadcast re-engagement** (seasonal nudges, content, win-back) | Cheap | Low intent; acute owners return ~70 days later for a new episode, which a broadcast can't create. Risk of notification fatigue. |
| **Chronic-first programme** | Highest value per owner | Already 51% return and only 12% of owners. Protect via continuity, don't lead with it. |
| **Young-animal care plan** | ~+1.3pp, strong strategic fit | Second bet (next quarter): needs a plan engine, and vaccinations require in-person visits, so bookings may leak to clinics. Needs its own test. |
| **Full pet health record** | Foundation for everything | Too big for one quarter. Build a **thin** version only (past consults, uploads, meds). |
| **Wait-time improvements** | Small | Weak driver; only >15 min matters. |
| **✅ Care Loop: post-visit check-in + one-tap re-check with context** | **~+2.3pp alone (base)** | **Chosen.** Biggest and least-served segment, a real medical moment, owned by my mission, testable within a quarter, uses the fixed price as-is, and builds the pet record. |

---

## 7. Strategy and solution

### 7.1 Strategy on a page

| | |
|---|---|
| **Vision** | Move PetDoc from one consultation at a time to continuous care for the pet |
| **Strategic choice** | Win on continuity and follow-through for the ~3/4 of owners who pay per visit, not on price |
| **Bets, in order** | 1. **Follow up** (Acute) — Care Loop this quarter · 2. **Remember** (all) — thin pet profile + vet pre-call summary · 3. **Plan ahead** (Young animal) — care plan next quarter |
| **Not doing** | Pricing/subscription changes; broadcast engagement; leading on friction we don't own |
| **North star** | % of new owners with a second consultation within 180 days, reported per segment |

### 7.2 Feature concept: Care Loop

**Hypothesis.** *If the vet sets a check-in day during an acute consultation and PetDoc asks the owner "How is Bella today?" on that day, with a one-tap re-check with the same vet and all context attached, then acute owners whose pet isn't improving will come back to PetDoc instead of waiting, googling or going to a local clinic. This raises acute 14-day re-checks from 0.7% to ≥3% and the overall 180-day return by ~2pp, without lowering ratings or adding unnecessary consultations.*

**Scope.** Acute and Unclear first-time and returning consultations (~66% of owners, ~1,840 new owners/month). Chronic owners get "book your next check" instead (same component, different default). Young animals get the care plan next quarter.

#### End-to-end flow

| Step | Who | Moment | What happens |
|---|---|---|---|
| 1 | Vet | End of consultation (≤15 s) | Picks condition category; check-in day pre-filled by category (e.g., GI 2 days, wound/eye/ear 3 days, skin 5 days); confirms red-flag list from template; adds an optional one-line note: "expect improvement within X days" |
| 2 | Owner | Right after the call | **Care summary card:** diagnosis in plain German, home-care steps, red flags, Rx status, and "We'll check on Bella on Thursday." Notification permission asked here, in context |
| 3 | System | Check-in day | Push (email/SMS fallback): **"Wie geht es Bella heute?"** If Rx is not yet delivered, check-in moves to delivery + 2 days (treatment hasn't started yet) |
| 4a | Owner | Taps **Better** | "Great — case closed." Episode saved to Bella's record. One-tap question: "Did the vet already know Bella?" Soft prompt to complete the pet profile |
| 4b | Owner | Taps **Same** | Shows the vet's expected recovery window. Options: **re-check with Dr. X** (next slot shown, history attached) or "remind me in 2 days" |
| 4c | Owner | Taps **Worse** | 3-question red-flag screen. Red flag → urgent in-person guidance + nearest emergency clinic. No red flag → **priority re-check with Dr. X**, or next available vet within 2 hours with full history |
| 5 | Owner | Booking | One tap. Reason pre-filled, previous notes + check-in answer + optional new photo attached. **Normal price shown upfront (€35–45)** |
| 6 | Vet | Before the re-check | One-screen summary: last consultation note, meds, check-in answer, new photo, "what's new" |
| 7 | System | No response | One reminder after 24h, then stop. Max 2 notifications per episode |

**The decision moment:** the check-in screen (steps 3–4). That is where the hypothesis holds or fails: do owners answer, how many say "same/worse", and do they book?

#### Screen states for design

| Screen | States |
|---|---|
| Care summary | Rx shipped / not shipped · check-in scheduled / notifications off (show in-app card + email instead) |
| Check-in | Better · Same · Worse · photo attached · note added · expired (>72h, show "book a consultation" instead) |
| Same | Within expected window ("this is normal until Friday") · outside window (stronger re-check prompt) |
| Worse | Red flag → emergency guidance · no red flag → priority re-check · same vet unavailable → next available with history |
| Booking | Same vet slot · next available · price confirmation · payment |
| Closed | Saved to record · "vet knew my pet" survey · profile completion prompt |

#### Business rules and edge cases

- Re-checks are normal paid consultations. No discounts (pricing fixed, and any discount needs a GOT/legal check).
- Same vet preferred; fallback to the next available vet within 2 hours for "worse", with full context.
- One active Care Loop per pet per episode; multi-pet owners get one per pet.
- Check-in is a **service message tied to the consultation**, not marketing (consent handled accordingly).
- Red-flag routing to in-person care is a safety requirement, not an option.
- Vet can switch the check-in off ("not needed for this case"); the share of switch-offs is tracked.

#### Instrumentation

Events: `checkin_set` (vet, category, day) · `summary_viewed` · `checkin_sent` / `opened` / `answered` (better/same/worse, photo) · `redflag_triggered` · `recheck_booked` (same vet / other) · `recheck_completed` · `vet_marked_not_needed` · `notification_optout` · `vet_knew_pet` (yes/no).

#### MVP vs later

| MVP (this quarter) | Later |
|---|---|
| Vet sets day from category defaults · care summary · push/email check-in · better/same/worse · one-tap re-check with notes attached · red-flag screen | Condition-specific recovery curves · photo comparison · recovery tracker · async question option (only if validated) · same-vet scheduling optimisation |

### 7.3 Why this, not something else

- **Biggest segment, lowest return:** 61% of owners at 14.3%.
- **A real need at a real moment:** "is this normal?" a few days after an acute consultation is a medical question, not a marketing hook.
- **Owned by Patient Experience:** the core build sits in my mission; the vet-side field is small.
- **Fits the fixed model:** a re-check is a normal paid consultation.
- **Measurable fast:** 14-day and 30-day leading indicators within the quarter.
- **Compounds:** every closed episode feeds the pet record that powers the memory and care-plan bets.

---

## 8. Impact sizing

### 8.1 Care Loop funnel (Acute + Unclear, ~66% of new owners)

| Step | Low | Base | High |
|---|---|---|---|
| Check-in delivered (push or fallback) | 80% | 85% | 90% |
| Owner answers | 25% | 40% | 50% |
| Says Same or Worse | 25% | 30% | 30% |
| Books re-check | 35% | 45% | 50% |
| Incremental (wouldn't have returned anyway) | 70% | 75% | 80% |
| **Incremental second consultations, % of eligible** | 1.2% | 3.4% | 5.4% |
| **Lift on overall 180-day return** | **+0.8pp** | **+2.3pp** | **+3.6pp** |

Base case means ~84 re-check bookings per month from new owners. That is trivial against 120 vets, so capacity is not a constraint. Upside not counted: the "Better" path saves the episode and the vet, which should make the next episode more likely to come to PetDoc.

### 8.2 Programme to the base case (~25.9%)

| Bet | Lift (base) | Basis |
|---|---|---|
| Care Loop (Acute) | +2.3pp | Funnel above |
| Thin pet profile + vet pre-call summary | +0.8pp | Halving re-telling (worth +1.6pp if eliminated) |
| Care plan for young animals (next quarter) | +1.3pp | +6pp in a 22% segment |
| Quick wins (care summary, service recovery after bad visits) | +0.3pp | Tech + re-telling visits return at 3.2% |
| **Total** | **+4.7pp → ~25.9%** | |
| Friction fixes by other missions (advocacy) | +1–3pp | Toward the ~29% ambition |

### 8.3 Business value (honest framing)

| Metric | Today (21.2%) | Base (25.9%) | Ambition (29%) |
|---|---|---|---|
| Consultations per new owner in 180 days (incl. 28% 2nd → 3rd cascade) | 1.27 | 1.33 | 1.37 |
| Contribution per new owner, 180 days (€10/consult) | €12.72 | €13.32 (+4.7%) | €13.72 (+7.9%) |

- Each +1pp ≈ 28 extra second consultations/month + ~8 third consultations ≈ **€4.3k contribution / ~€17k revenue per year** from new cohorts alone.
- Base case (+4.7pp) ≈ **€20k contribution / ~€80k revenue per year** from new cohorts.
- **The direct euro value is modest at today's scale.** The real value is strategic: it compounds across the 50k MAU base, lowers effective CAC per consultation, and builds the continuity moat that free insurer-bundled competitors don't have. CAC data from Growth is needed to express this as payback.

---

## 9. Metrics

### 9.1 North star

| Metric | Definition | Baseline | Target |
|---|---|---|---|
| **180-day second-consultation rate** | % of new owners with a 2nd consultation within 180 days of the first, **by segment** | 21.2% (Acute 14.3 · Young 25.7 · Chronic 51.0) | ~23.5% (Q1 cohorts) → ~25.9% (Q2) → ~29% (12 months) |

The north star lags by 180 days, so **quarterly go/no-go decisions run on leading indicators**, with a long-running holdout to confirm the 180-day effect.

### 9.2 Leading indicators (decide within the quarter)

| Metric | Baseline | Target | Why |
|---|---|---|---|
| Acute re-check within 14 days | 0.7% | ≥3% | Direct effect of Care Loop |
| Acute return within 30 days | 2.2% | ≥4.5% | Confirms it holds beyond the check-in |
| Overall 60-day return | 13.1% | ≥15% | Early read on the north star |
| Check-in answer rate | — | ≥30% go, 40% target | Is the moment relevant? |
| Same/Worse → booking rate | — | ≥40% | Do owners want a vet or just reassurance? |

### 9.3 User metrics (is the experience better?)

| Metric | Baseline | Target |
|---|---|---|
| "The vet already knew my pet" (new one-tap survey) | Not measured | Baseline Q1 → ≥80% |
| Re-telling rate (`vet_asked_for_known_info`) | 19% | <10% (Q1) → <5% |
| Time from "Worse" to talking to a vet | — | Median <2h |
| Owner-reported recovery ("Better" share at check-in) | — | Tracked, not targeted |
| Care summary viewed | — | ≥70% |
| Notification opt-out per episode | — | <5% |
| Rating / NPS | 4.8★ / 65 | Hold ≥4.8 / ≥65 |
| Video/audio issue rate · upload failure rate (advocacy) | 9% · 8% | Tracked with Vet Experience |
| Rx delivered ≤4 days | 72% | ≥90% (Ops) |

### 9.4 Business metrics (is it worth it?)

| Metric | Baseline | Target |
|---|---|---|
| Consultations per new owner, 180 days | 1.27 | 1.33 |
| Contribution per new owner, 180 days | €12.72 | €13.32 |
| Incremental re-checks vs holdout | — | ≥3% of treated acute owners |
| Second → third consultation | 28% | ≥28% (don't dilute quality) |
| Repeat share of all consultations | ~15% in sample | Rising |
| Re-checks vets mark "not needed" | — | <15% |
| Vet minutes per re-check / vet utilisation | — | Within capacity |
| CAC payback (with Growth) | Unknown | Defined in Q1 |

### 9.5 Guardrails and counter-metrics

| Guardrail | Threshold | What it protects |
|---|---|---|
| Rating / NPS | ≥4.8 / ≥65 | Experience |
| Consultation duration | Unchanged (vet adds ≤15 s) | Vet workflow |
| "Not needed" re-checks | <15% | Medical integrity, no upselling |
| Notification opt-outs | Not rising faster than returns | Trust |
| Red-flag escalations followed correctly | 100% | Safety |
| **Pull-forward check** | Treated 180-day return > control, not only 30-day | Returns are new, not borrowed from the ~day-70 episode |
| Vet satisfaction | Stable | Supply side |

---

## 10. Who I'd involve before implementation

| Who | Why | What I need from them | How I'd get it |
|---|---|---|---|
| **My trio** (EM, designer) + engineers | Build and design | Feasibility, notification infra, effort estimate | Joint discovery from week 1; engineers in vet interviews |
| **Vet Experience mission** | Vet sets the check-in; vet sees the pre-call summary | A small vet-side field (≤15 s) and a summary screen on their roadmap | Bring the data: re-telling drops ratings and return; propose a **shared KR** (re-telling rate + consultation duration); co-design session |
| **Medical lead + 6–8 vets** | Clinical correctness and safety | Condition categories, default check-in days, red flags, recovery windows | Co-design workshop; vets review copy; sign-off before launch |
| **Growth mission** | Owns notifications, CRM and permission prompts | Channel slots, no collision with acquisition campaigns, alignment on who owns lifecycle messaging | Agree a messaging RACI; share the experiment calendar |
| **Ops / pharmacy partner** | Check-in timing depends on Rx delivery | Delivery status feed; push on ≤4-day SLA | Data request + joint review of the delivery–return link |
| **Data / analytics** | Experiment validity | Randomisation, holdout, survey instrumentation, power checks | Analysis plan before build |
| **Legal / data protection** | Consent and fees | Service vs marketing message classification (DSGVO/UWG), GOT/professional rules for re-check pricing, telemedicine rules | Review in discovery, not at launch |
| **Customer service** | Owners will reply and escalate | Scripts for "worse", service recovery | Briefing + feedback loop |
| **Leadership / finance** | Model is fixed | Confirm no discounts; sign-off on any service-recovery credit | Short decision memo |

---

## 11. Validation plan

### 11.1 Riskiest assumptions

| # | Assumption | If wrong… |
|---|---|---|
| 1 | Enough acute owners are still "same/worse" at day 2–5 | No one to bring back |
| 2 | They answer a check-in | The moment isn't relevant |
| 3 | They want a vet, not just reassurance | Response high, bookings low |
| 4 | Re-checks are medically useful | Vets mark them "not needed"; trust risk |
| 5 | Vets set the check-in in ≤15 s | Adoption fails on the supply side |
| 6 | Returns are incremental | 30-day up, 180-day flat (pull-forward) |

### 11.2 Steps

| Phase | When | What | Sample / read |
|---|---|---|---|
| 0. Discovery | Weeks 1–2 | 10 interviews with acute one-timers 5–14 days after the consultation; 6 vet interviews; re-telling deep dive | Qualitative; tests assumptions 1, 3, 5 |
| 1. Concierge test | Weeks 2–4 | Manual check-in email/push to ~400 acute owners with a booking link; vets set the day on a simple form | Answer rate, same/worse share, booking; tests 1–3 |
| 2. MVP A/B | Weeks 5–10 | 50/50 randomised on acute/unclear consultations | ~480 per arm detects 14-day re-check 0.7% → 3%; ~930 per arm detects 30-day return 2.2% → 4.5% (80% power, α 0.05). ~1,840 eligible new owners/month → ~3–5 weeks of enrolment |
| 3. Holdout | Ongoing | 10% long-term holdout | ~2,050 per arm detects acute 180-day 14.3% → 17.5% |

### 11.3 Decision rules — what would tell me I'm wrong

| Signal | Decision |
|---|---|
| Answer ≥30%, 14-day re-check ≥3%, "not needed" <15%, ratings stable | **Scale** to all acute categories; start the care plan |
| Answer high, booking <1.5% | Need is **reassurance**, not a re-check → test a capped async follow-up (A4) |
| Answer <15% | Moment or channel is wrong → test timing (day 1 vs 3 vs 5) and in-app vs push before killing |
| 30-day up, 180-day flat vs holdout | **Pull-forward only** → value is lower than modelled; reassess |
| "Not needed" >25% or upselling complaints | Clinical framing wrong → narrow to categories where vets want follow-up |
| Vets skip setting the day (>50%) | Supply-side failure → automatic defaults, vet opt-out instead of opt-in |

---

## 12. Roadmap

### 12.1 This quarter

| Weeks | Ship | Why |
|---|---|---|
| 1–2 | Discovery; "vet already knew my pet" survey; analysis plan | Baseline for the hidden metric |
| 2–4 | Post-visit care summary; service recovery after failed visits; concierge Care Loop test | Cheap, starts learning |
| 3–8 | Thin pet profile (consults, uploads, meds) → vet pre-call summary (with Vet Experience) | Foundation for memory |
| 5–10 | **Care Loop MVP A/B** on acute | The quarter's main bet |
| 10–12 | Read leading indicators; go/no-go; plan care plan for young animals | Exit gate |

### 12.2 Twelve months

| | Q1 — Remember & follow up | Q2 — Plan ahead | Q3 — Deepen care | Q4 — Everyday companion |
|---|---|---|---|---|
| Focus | Acute + all | Young animal | Chronic + senior | All owners, existing MAU |
| Key bets | Thin profile · vet summary · **Care Loop** | **Care plan + reminders** · same-vet re-booking · scale Care Loop | Chronic/senior plans · refill reminders · async follow-up (if validated) | Health timeline · annual wellness · multi-pet · win-back |
| North star | ~23.5% | ~25.9% | ~27.5% | ~29% |
| Exit gate | Answer ≥30%, re-check ≥3% | Plan setup ≥40%, reminder → booking ≥10% | Chronic 30-day ≥33%, re-telling <5% | Owners opening the app without a problem growing |

Always-on: advocate friction fixes (audio fallback, reliable uploads, Rx ≤4 days) with Vet Experience and Ops; monthly cohort review per segment; holdout all year.

---

## 13. Risks and mitigations

| Risk | Signal | Response |
|---|---|---|
| Owners want reassurance, not a paid re-check | High answers, low bookings | Bring a capped async follow-up forward |
| Feels like upselling | Complaints, "not needed" rising | Vet-set, clinically framed, honest copy ("this is normal until Friday") |
| Vet workflow friction | Vets skip the field; longer consultations | Smart defaults; Vet Experience co-ownership |
| Notification fatigue | Opt-outs up | Max 2 messages per episode; service-message framing |
| Care-plan bookings leak to clinics (Q2) | Plans set, few PetDoc bookings | Position PetDoc as plan + triage; explore clinic partnerships |
| Re-telling falls but return doesn't move | Survey up, return flat | Look at vet consistency and quality |
| Small samples (chronic n=149) | Wide confidence intervals | Longer tests, pool across months |
| Competitor copies continuity | Dr. Fressnapf launches similar | Speed; pet record and same-vet relationships compound |

---

## 14. Open questions

1. Is "first visit in sample" the true first visit? Need full history to confirm the baseline.
2. No vet ID in the data: how often can owners actually get the same vet? Needs scheduling data from Vet Experience.
3. No diagnosis/condition field: condition-specific check-in days need vet input and new tagging.
4. What is CAC by channel? Needed to express retention as payback.
5. What share of owners grant notification permission today?
6. Why do 19% of consultations involve re-telling when owners already provided the info? Is the intake not shown, not read, or not trusted?
7. Where do acute owners go between day 1 and day 70 — nowhere (pet recovered) or to clinics?

---

## Appendix A — Idea backlog and prioritisation (condensed)

Impact and effort scored 1–5 (5 = highest). Priority = impact ÷ effort, adjusted for dependencies.

| # | Idea | Persona | Impact | Effort | Decision |
|---|---|---|---|---|---|
| A1 | **Day-N check-in + one-tap re-check (Care Loop)** | Acute | 5 | 3 | **Main bet, this quarter** |
| A2 | Post-visit care summary | Acute | 3 | 1.5 | Quick win, part of Care Loop |
| B7 | "Vet already knew my pet" survey | All | 3 | 1 | Quick win (measurement) |
| D1 | Service recovery after a bad visit | All | 3 | 1.5 | Quick win |
| B5 | Book next check at end of call | Chronic | 3 | 1.5 | Quick win |
| B3 | "Anything new since last time?" intake | All | 3 | 2 | Quick win |
| B1 | Thin pet profile | All | 5 | 4.5 | Foundation (thin version) |
| B2 | Vet pre-call one-screen summary | All / vets | 4 | 3 | Big bet with Vet Experience |
| C1 | Care plan + reminders | Young animal | 4 | 3 | Next quarter |
| A6 | Rx delivery tracking + dose reminders | Acute | 3 | 2.5 | Fill-in |
| B6 | Chronic refill reminders | Chronic | 3 | 2.5 | Q3 |
| A3 | Same-vet re-booking | All | 3 | 3 | Q2 |
| A4 | Free async follow-up | Acute | 3.5 | 4 | Only if Care Loop shows reassurance demand |
| C4 / E1 / E2 | Seasonal nudges · 5★ → save profile · multi-pet | All | 2 | 1.5 | Fill-ins |
| D2 / D3 / D4 | Audio fallback · reliable uploads · faster Rx | All | 3 | 4–5 | Other missions; advocate |
| A5 / C3 / D5 | Recovery tracker · weight tracker · wait-time transparency | — | 1–2 | 1.5–3 | Later / low |

---

## Appendix B — Sources

- Case data: `petdoc_case_data_EN.csv` (all quantitative findings re-computed for this document).
- DA Direkt × Dr. Fressnapf, free video consultations for insured customers: https://da-direkt.de/tierversicherung/onlinetierarzt
- Fressnapf press release, online vets included in insurance tariffs: https://fressnapf-holding-se.mynewsdesk.com/pressreleases/damit-tierarzt-und-versicherung-das-budget-nicht-sprengen-fressnapf-gruppe-bietet-preiswerte-beratungs-und-vorsorgemodelle-3219040.pdf
- Dalma × FirstVet, free and unlimited 7–24h: https://intercom.help/dalma/de/articles/8416260-wie-funktioniert-der-online-tierarzt
- Barmenia × FirstVet with direct billing: https://www.mynewsdesk.com/de/barmeniagothaer/pressreleases/barmenia-tier-krankenversicherung-telemedizin-fur-haustiere-rund-um-die-uhr-3090771
- FirstVet Trustpilot reviews (waits, intake questionnaire): https://de.trustpilot.com/review/firstvet.com/location/f03bbc05-8611-47df-8a03-706cffa922e7
- Allianz on telemedicine reimbursement under GOT: https://www.allianz.de/gesundheit/tierkrankenversicherung/telemedizin.html
- Share of insured pet owners (~23%, DA Direkt survey via DocCheck): https://www.doccheck.com/de/detail/articles/45498-der-tele-tierarzt-kommt
- Pfotendoctor (Berlin, Petcare Solutions GmbH): https://www.startbase.de/organization/pfotendoctor/
