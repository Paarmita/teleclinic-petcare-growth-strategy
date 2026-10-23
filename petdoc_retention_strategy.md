# PetDoc — Patient Experience Retention Strategy

**Mission goal (this quarter):** more users come back to PetDoc for a second consultation.
**Data:** `petdoc_case_data_EN.csv` — 1,413 consultations from 1,200 owners, 1 Aug 2025 – 31 Jan 2026, each with a full 180-day follow-up window.
**Method:** retention measured from each owner's first consultation in the sample (n = 1,200). Baseline 180-day return = **21.2%** (consultation-level 22.5%; brief states 23%).

---

## 1. Executive summary

- **Who** the owner is matters more than **how** the visit went. Chronic owners return at 51%, acute owners at 14%. Acute owners are 61% of new users.
- **Friction halves return in every segment**, and the biggest friction (re-telling known info, 19% of visits) is almost invisible in ratings.
- **Removing all friction only lifts return from 21.2% to ~24.9%.** Necessary, not sufficient. The larger gap is structural: most owners have no reason to come back.
- **Strategy:** move PetDoc from a single consultation to continuous care for the pet, through three pillars — *Remember*, *Follow up*, *Plan ahead*.
- **Base-case prediction:** 21.2% → ~25.9% second-consultation rate (+4.7pp).

---

## 2. Data analysis

### 2.1 Data notes and caveats
- Segment is fixed per owner — every returner came back in the same segment.
- `consultation_restarted` is a subset of `video_audio_issue` (all 54 restarts also had A/V issues).
- 67% of follow-ups appear as a later row in the data; the rest fall after 31 Jan (consistent with `days_to_follow_up`).
- Rating is missing for 54% of first visits; raters return more (24% vs 19%), so ratings are biased upward.
- An owner's first visit in the sample may not be their true first visit on PetDoc.
- Small samples: Chronic (149 owners), Unclear (54), and 2nd→3rd visit analysis are directional only.

### 2.2 Segment is the biggest driver

| Segment | Share of first visits | 180-day return | ≤ 30-day return | Median days to return | Consults per owner |
|---|---|---|---|---|---|
| Acute | 61% | 14.3% | 2.2% | 70 | 1.09 |
| Young animal | 22% | 25.7% | 8.8% | 45 | 1.23 |
| Chronic | 12% | 51.0% | 29.5% | 26 | 1.56 |
| Unclear | 5% | 11.1% | 3.7% | 44 | 1.07 |

- Logistic regression (controlling for friction, platform, wait, duration): Chronic **OR 7.0**, Young animal **OR 2.1** vs Acute.
- Acute returners come back after ~70 days, which means a new episode, not follow-up care. Chronic owners return on a care cadence (~4 weeks).

### 2.3 Friction cuts return within every segment

| Factor (first visit) | Affected | Return if yes vs no | Adjusted OR (p) |
|---|---|---|---|
| Vet asked for info already provided (re-telling) | 19% | 15.3% vs 22.6% | 0.54 (0.004) |
| Video/audio issue | 9% | 5.6% vs 22.7% | 0.21 (0.004) |
| Upload failed | 8% | 15.2% vs 21.7% | 0.49 (0.03) |
| Rx delivery ≥ 5 days (Rx users) | 28% of Rx | 16.5% vs 25.6% (≤ 4 days) | 0.85 per extra day (0.006) |

- Smooth visit: **24.6%** return → any friction: **14.0%** → tech issue + re-telling: **3.2%**.
- Chronic owners: **54.5% → 34.6%** when the vet asked for known info.

Return rate by segment, smooth vs friction visit:

| Segment | Smooth visit | Any friction |
|---|---|---|
| Acute | 16.8% | 8.7% |
| Young animal | 30.4% | 16.7% |
| Chronic | 61.2% | 31.4% |
| All owners | 24.6% | 14.0% |

### 2.4 Ratings hide the context problem
- A/V issues drop rating 4.35 → 2.63 (visible, likely already prioritised).
- Re-telling drops rating only 4.35 → 3.90 but cuts return by a third. This is **silent churn**.
- **68% of 5-star raters do not return.** Satisfaction ≠ a reason to return.
- Comment themes: "Context present (positive)" has the highest return of any theme (36%). "Context lost (re-telling)" appears 53 times.
  - *"There's a file, but apparently nobody read it."*
  - *"The same questions as last time. That was the point where I gave up on it."*
  - *"Half the time went on telling the story — annoying for the price."*

### 2.5 Weak or non-drivers
- Platform (iOS / Android / Web): not significant.
- Consultation duration: not significant.
- Prescription issued: not significant.
- Wait time: OR 0.97/min (p = 0.06); return drops only above 15 min. Evening/late waits are longer (10–12 min vs 6–8).

### 2.6 Sizing the levers
- Removing **all** friction: 21.2% → ~24.9% (+3.7pp, segment-adjusted).
  - Re-telling ≈ +1.4pp · A/V ≈ +1.4pp · Upload ≈ +0.8pp · Slow delivery ≈ +0.9pp
- Structural levers: +6pp in Acute ≈ +3.7pp overall; +9pp in Young animal ≈ +2pp overall.
- Each +1pp on ~2,800 new registrations/month ≈ 28 extra second consultations/month (~€280 contribution), plus a cascade: 28% of 2nd-visit owners make a 3rd.

---

## 3. Problem statement

> Pet owners love their first PetDoc consultation (4.8★, NPS 65) but have no reason to return, and when they do, PetDoc doesn't remember them. Only 21% come back within 180 days. 61% of users arrive with a one-off acute problem and get no follow-up moment. Those who do return often have to re-tell their pet's story, which quietly halves their chance of returning again without showing up in ratings.

**One-liner:** PetDoc treats each consultation as a one-off transaction, while owners need ongoing care for their pet. Nothing pulls them back after the visit, and nothing remembers them when they return.

**Two layers:**
1. **No reason to return (the bigger gap).** Acute owners: 14% return, only 2.2% within 30 days. Even a perfect visit only gets acute to ~17%. The gap is after the visit, not in it.
2. **No memory when they return (the trust breaker).** 19% of visits involve re-telling, which cuts return 23% → 15% (chronic 55% → 35%), hidden by ratings.

**What this rules out:** fixing video, wait time or platform alone. Together they're worth ~+4pp, which is necessary but won't reach the quarter's goal.

---

## 4. Personas

| Persona | Share | 180-day return | Role in strategy |
|---|---|---|---|
| **Worried one-timer** (Acute) | 61% | 14.3% | **Primary target.** Largest and lowest-returning group; nothing brings them back after the visit. |
| **New pet parent** (Young animal) | 22% | 25.7% | **Secondary target.** Has predictable care needs (vaccines, deworming, check-ups) that PetDoc doesn't plan for. |
| **Care manager** (Chronic) | 12% | 51.0% | **Protect.** Already returns every ~4 weeks; re-telling cuts their return 55% → 35%. |
| Unclear | 5% | 11.1% | Not a target; too small to optimise for now. |

---

## 5. Strategy — three pillars

The strategy moves PetDoc from a single consultation to continuous care for the pet.

### Pillar 1 — PetDoc remembers your pet
- **Problem:** 19% of visits involve re-telling; −⅓ return; hidden by ratings.
- **What we build:** a living pet profile (history, past consultations, uploads, medications); a one-screen summary for the vet before the call; "anything new since last time?" intake instead of starting from scratch.
- **Persona:** everyone; essential for care managers.
- **Measured by:** re-telling rate 17–19% → < 5%; "the vet already knew my pet" ≥ 80%; chronic 30-day return.
- **Needs from Vet Experience:** the summary fits the vet's workflow without making consultations longer.
- **Why first:** the other pillars bring people back, and without this one they return to a vet who doesn't know their pet.

### Pillar 2 — The visit doesn't end when the call ends
- **Problem:** 61% of users are acute one-timers; only 2.2% return within 30 days. There is no follow-up of the episode.
- **What we build:** the vet sets a check-in date during the visit (e.g. day 3). The app asks *"How is Bella today?"* (better / same / worse). "Same" or "worse" leads to a one-tap re-check with the same vet, with history attached. "Better" closes the case and saves it to the pet record. Prescription delivery tracking is included.
- **Persona:** worried one-timers.
- **Measured by:** check-in response ~40%; re-check within 14 days 0.7% → 4–5%; acute 30-day return 2.2% → 6%.
- **Guardrails:** vets confirm the check-in date and whether a re-check is needed (no medically unnecessary visits); notification opt-out rate.

### Pillar 3 — A reason to open the app between problems
- **Problem:** new pet parents have a predictable care calendar, but PetDoc is only used when something goes wrong. They return at 26% when they could behave more like chronic owners (50%+).
- **What we build:** at a young animal's first visit, the vet starts a care plan based on species and age. Owners get timely reminders with one-tap booking for the right consultation type. The plan grows with the pet (growth, diet, behaviour).
- **Persona:** new pet parents first; later extend to chronic care plans and older pets.
- **Measured by:** plan setup ~50%; reminder → booking ~15%; young-animal 60-day return.
- **Needs from Growth:** this starts the "everyday companion" ambition and can open new user groups. Agree with Growth who owns the care-plan sign-up flow.

### How the pillars fit together

| | Pillar 1: Remember | Pillar 2: Follow up | Pillar 3: Plan ahead |
|---|---|---|---|
| Purpose | Make returning easy | Create a reason to return soon | Create a reason to return regularly |
| Persona | All, especially chronic | Acute (61%) | Young animal (22%) |
| Estimated impact | ~+1 to 1.5pp | ~+3pp | ~+1.3pp |
| Timing | Build now; the others depend on it | Quarter's main bet | Next quarter, or test with a small version |

**Deliberately left out:**
- Video/audio, uploads and delivery belong to other missions. Track them and push for fixes, but together they're worth only ~+3–4pp.
- Pricing and subscriptions are fixed in the brief.
- Wait times barely affect returns below 15 minutes.

**Prototype focus:** Pillar 2's day-3 check-in screen, with Pillar 1's history attached to the re-check booking. This is where the hypothesis is proven or disproven: a worried owner gets "How is Bella today?" and either books a re-check or doesn't.

---

## 6. Metrics

### 6.1 North-star metric (lagging)
**% of new owners with a second consultation within 180 days** (today 21.2%), always reported **per persona**. The overall number can rise just because more chronic owners sign up, without anything actually improving.

### 6.2 Leading indicators per persona (readable in 2–6 weeks)

| Persona | Leading metric | Today | Base-case target |
|---|---|---|---|
| Worried one-timer | Check-in response rate (day 3–7) | none (no check-in) | 40% |
| | Re-check consultation within 14 days | 0.7% | 4–5% |
| | 30-day return | 2.2% | 6% |
| New pet parent | Care-plan setup at first visit | none (no plan) | 50% |
| | Reminder → booking rate | none | 15% |
| | 60-day return | ~15% | 21% |
| Care manager | Re-telling rate | 17% | < 5% |
| | 30-day return | 29.5% | 33% |
| All | "The vet already knew my pet" (one-tap, after the visit) | not measured | 80% yes |

### 6.3 Guardrails (must not get worse)
- App Store rating ≥ 4.8, NPS ≥ 65.
- Notification opt-out / uninstall rate below an agreed limit.
- Vet consultation length and vet satisfaction stable (agreed with Vet Experience).
- Clinical appropriateness: share of re-checks the vet marks as "not needed".
- Contribution margin per consultation ~€10 (no discount-driven returns).

### 6.4 Health metrics owned by other missions (tracked, not owned)
- Video/audio issue rate: 9%
- Upload failure rate: 8%
- Rx delivery ≥ 5 days: 28% of prescriptions

---

## 7. Predictions

Estimates use the persona mix (61 / 22 / 12 / 5%) and assume the three pillars ship.

| Scenario | One-timer | New pet parent | Care manager | **Overall** | Change |
|---|---|---|---|---|---|
| Today | 14.3% | 25.7% | 51.0% | **21.2%** | — |
| Conservative | 16.5% | 29% | 53% | **23.5%** | +2.3pp |
| **Base case** | 19% | 32% | 54% | **25.9%** | **+4.7pp** |
| Optimistic | 22% | 36% | 57% | **29.0%** | +7.8pp |

**Base-case logic:**
- One-timers: ~5% book a re-check within 14 days (today 0.7%), plus less re-telling → ~+4.7pp.
- New pet parents: half set up a care plan; ~12% of those book from a reminder → ~+6pp.
- Care managers: removing re-telling is worth at most +3.4pp → assume ~+3pp.

**Business impact (base case):**
- Each monthly cohort of 2,800 new users → ~132 extra second consultations, plus ~37 third visits (28% cascade).
- ≈ €1,700 contribution per monthly cohort, ~€20k/year from new users alone, before counting the 50k existing MAU.
- The bigger effect is lifetime value: 6-month contribution per new owner rises from ~€11.80 to ~€12.70 (+8%) for the same acquisition spend, which directly helps the Growth mission.

**Signs we'd be wrong:**
- Owners respond to check-ins but don't book consultations. They want reassurance rather than another visit, so the answer is free async chat, not a paid re-check.
- Care plans get set up, but reminders lead to bookings at local vet clinics instead.
- Re-telling rate falls but return doesn't move. Re-telling was a symptom of a worse vet experience, not the cause.
- Notification opt-outs rise faster than returns.

**Confidence:** all figures come from 1,200 owners, so they show direction rather than precise outcomes. Smaller groups (care managers, 149 owners) have wide error margins. Each pillar should be A/B tested per persona.
