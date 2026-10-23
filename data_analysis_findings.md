# PetDoc case data — analysis findings

Source: petdoc_case_data_EN.csv — 1,413 consultations, 1,200 owners, Aug 2025–Jan 2026, 180-day follow-up window. Unit of analysis for retention: each owner's first consultation in the sample (n=1,200). Baseline 180d return = 21.2% (consultation-level 22.5%; brief says 23%).

## Data notes
- Segment is fixed per owner (returners always return in the same segment).
- `consultation_restarted` is a subset of `video_audio_issue` (all 54 restarts had A/V issues).
- 67% of follow-ups appear as a later row; the rest fall after 31 Jan (consistent with days_to_follow_up).
- Rating missing for 54% of first visits; raters return more (24% vs 19%) → ratings are biased upward.
- "First visit in sample" may not be the owner's true first visit on PetDoc.

## 1. Segment is the biggest driver
| Segment | Share of first visits | 180d return | Median days to return |
|---|---|---|---|
| Acute | 61% | 14.3% | 70 |
| Young animal | 22% | 25.7% | 45 |
| Chronic | 12% | 51.0% | 26 |
| Unclear | 5% | 11.1% | 44 |

Logit (controls for friction, platform, wait, duration): Chronic OR 7.0, Young animal OR 2.1 vs Acute.
Acute returners come back after ~70 days → a new episode, not follow-up care. Chronic returns on a care cadence (~4 weeks).

## 2. Friction cuts return, within every segment
| Factor (first visit) | Affected | Return if yes vs no | Adj. OR (p) |
|---|---|---|---|
| Vet asked for info already provided | 19% | 15.3% vs 22.6% | 0.54 (0.004) |
| Video/audio issue | 9% | 5.6% vs 22.7% | 0.21 (0.004) |
| Upload failed | 8% | 15.2% vs 21.7% | 0.49 (0.03) |
| Rx delivery ≥5 days (Rx users) | 28% of Rx | 16.5% vs 25.6% (≤4 days) | 0.85 per extra day (0.006) |

Smooth visit 24.6% return vs any friction 14.0% vs tech + re-telling 3.2%.
Chronic: 54.5% → 34.6% when vet asked for known info.

## 3. Ratings hide the context problem
- A/V issue drops rating 4.35 → 2.63 (visible). Re-telling drops it only 4.35 → 3.90 but cuts return by a third (silent churn).
- 68% of 5-star raters do not return. Satisfaction ≠ reason to return.
- Comments: "Context lost (re-telling)" (53) vs "Context present (positive)" (72, 36% return — highest theme). Quotes: "There's a file, but apparently nobody read it", "The same questions as last time. That was the point where I gave up."

## 4. Not / weak drivers
Platform (n.s.), wait time (OR 0.97/min, p=0.06; drop only >15 min), duration (n.s.), prescription issued (n.s.). Evening/late waits are longer (10–12 min vs 6–8).

## 5. Sizing
- Removing ALL friction lifts return only 21.2% → ~24.9% (+3.7pp, segment-adjusted). Re-telling ≈1.4pp, A/V ≈1.4pp, upload ≈0.8pp, slow delivery ≈0.9pp.
- Gap to chronic-like behaviour is structural: Acute owners (61%) have no reason to return. +6pp in Acute ≈ +3.7pp overall; +9pp in Young animal ≈ +2pp.
- Each +1pp on ~2,800 new registrations/month ≈ 28 extra second consults/month (~€280 contribution), plus cascade: 28% of 2nd-visit owners make a 3rd.

## Implication
Two layers: (a) fix continuity — vet sees history/uploads so owners never re-tell (needs Vet Experience); (b) give non-chronic owners a reason to return — post-consult check-in for Acute, care plan/schedule for Young animal. Friction fixes are necessary but capped at ~+4pp.
