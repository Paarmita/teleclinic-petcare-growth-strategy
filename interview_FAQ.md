# Appendix F: CTO review FAQ

Questions a CTO is likely to ask in the review, from the long-term to the small. Each answer is the version I would say out loud, with a pointer to where the case goes deeper.

**The five I expect first:** F1.2 (is this gaming the metric?), F1.3 (why is +2.3pp worth a quarter?), F2.1 (what do we build?), F3.2 (why no LLM?), and F4.1 (can we read it in a quarter?).

## F1 Strategy and problem choice

**F1.1 Why this problem, when re-telling has stronger evidence?**
Re-telling is capped: removing it entirely adds +1.6pp. The follow-through gap is the only one large enough to move the goal, so I take the bigger, less proven bet and test it in three weeks before engineering commits. The re-telling fix ships alongside (IP-1B), because Care Loop would recreate the problem without it. *Sections 02 and 03.*

**F1.2 Isn't a re-check just gaming the north star?**
It could be, so I split the north star into same-episode re-checks and new-episode return, and made new-episode return a guardrail: acute 13.6% today, and it must not fall. Vets also mark re-checks "not needed"; above 15% stops the rollout. The real thesis is that an owner who was checked on comes back for the next problem too. *Section 09.*

**F1.3 +2.3pp is small. Why spend a quarter of a twelve-person team on it?**
Directly it is about €10k contribution a year from new cohorts, and I won't dress that up. It is worth it because it proves the loop the whole roadmap rests on, it runs on every acute consultation (not only new owners), and it lifts contribution per acquired owner. And if the concierge test fails, we have spent three weeks, not a quarter. *Appendix A.*

**F1.4 What if most acute pets are fine by day 3?**
Then the follow-through gap is not real, and Care Loop stops after the concierge test (fewer than 10% "same" or "worse"). The intake hand-off becomes the lead bet and the care plan moves forward. That is why the riskiest assumption is tested first and cheapest.

**F1.5 How does this connect to the ambition of an app owners open again and again?**
Care Loop is the first reason to open PetDoc without having booked anything. The record it builds powers the care plan, then the health timeline. Q4's exit gate is literally owners opening the app without a problem, growing month on month. *Section 11.*

**F1.6 What did you deliberately not build?**
Free or discounted re-checks and subscriptions (pricing is fixed), broadcast nudges (low intent, fatigue), LLM clinical summaries in v1 (accuracy risk), and our own pharmacy logistics (owned by Ops). *Section 04.*

**F1.7 What would make you stop the whole programme?**
Two signals together: owners answer the check-in but don't book, and a capped async follow-up also fails to move 180-day return. That would mean acute owners see PetDoc as a one-off service, and the mission should put its weight on young animals and chronic care instead.

**F1.8 Why not copy Airvet and offer unlimited follow-ups?**
Pricing is fixed, and at €10 contribution per consultation, free follow-ups only work inside a subscription. Care Loop gets most of the relationship value at the normal price, because the vet decides when a follow-up is clinically useful.

## F2 Architecture and build

**F2.1 What new components does this need?**
Four: an episode service with a small state machine; a scheduler that fires the check-in; a notification policy layer that caps messages per owner across all features; and two vet-tool changes (the check-in field and the intake on the pre-call screen). Plus an event schema. Push and email delivery can stay on whatever PetDoc uses today. *Section 06.*

**F2.2 Where does episode state live, and what are the states?**
Server-side, keyed by pet and consultation. States: scheduled, sent, answered (better, same or worse), then one end state: closed, re-booked, escalated, expired or switched off. Clients only render a server-driven card, so iOS, Android and web cannot drift apart.

**F2.3 Build or buy the scheduling and messaging?**
Buy delivery, build decisions. Sending a push or email is a commodity. Deciding whether and when to contact an owner about a sick animal is clinical logic, and it should not live in a marketing tool where it can be edited without medical review.

**F2.4 How big is the MVP, and how would you staff it?**
My working estimate is 5 to 6 weeks: two backend engineers on the episode service, scheduler and events; one each on iOS, Android and web for the card and booking flow; QA throughout; and the vet-tool change paired with Vet Experience. That leaves about two engineers for the intake hand-off and measurement. The EM owns the real estimate, and I'd validate mine in week 1.

**F2.5 Why not start in low-code?**
We do: the concierge test is the low-code version, with a form for vets, an email or push with a booking link, and a spreadsheet. If it passes, the native build is justified; if not, we saved six weeks.

**F2.6 What happens if notifications are off?**
The check-in shows as an in-app card and goes out by email. Permission is asked right after the call, when the owner has a reason to say yes. Today's opt-in rate is an open question I'd answer in week 1.

**F2.7 Quiet hours and weekends?**
Check-ins go out in the owner's local morning, never at night. Weekends are allowed, because pets get sick on weekends too, but only where vet capacity can answer "worse" within 2 hours; otherwise the rule routes to the next slot or to in-person care.

**F2.8 How does it fail safely?**
The safe failure is silence, not a wrong message. Sends are idempotent, the two-message cap is enforced server-side, every condition group sits behind a feature flag with a kill switch, and red-flag routing is a release-blocking test.

**F2.9 Rollout and rollback?**
Flag by condition group and percentage. Start with the one or two groups vets are most confident about, and expand group by group while guardrails hold. Rollback is a flag flip; episodes in flight finish without further messages.

**F2.10 What is the event schema?**
Check-in set (vet, condition group, day); summary viewed; check-in sent, delivered, opened and answered (answer, photo); red flag shown and its outcome; re-check booked (same vet or not) and completed; vet marked "not needed"; notification opt-out; "vet knew my pet"; episode closed (end state). Every event carries owner, pet, episode, consultation and experiment arm. *Appendix D.*

**F2.11 How do you instrument re-telling, which is a vet judgment today?**
From two sides: a one-tap vet flag in the tool, and the owner's one-tap "did the vet already know Bella?" after the visit. Where the two disagree is itself worth reading.

**F2.12 What technical debt does this create?**
Three risks: episode logic coupled too tightly to the consultation model; a condition-group list that will need migrating to a richer taxonomy; and notification rules spreading across features. I'd prevent the third from day one with one notification policy service that every feature calls.

## F3 Data, ML and AI

**F3.1 Why no machine learning in v1?**
There are no labels yet: no diagnosis, no check-in answers, no recovery outcome. Rules from the medical lead are explainable and safe. Six months of Care Loop answers become the training set for a timing or risk model later.

**F3.2 Will you use an LLM to summarise history for the vet?**
Not in v1. A wrong clinical summary costs trust we can't buy back, and early on there is little history to summarise. v1 shows structured data: last note, meds, uploads, check-in answer. In Year 2 I'd test an AI summary that links every line to its source and that the vet confirms, measured against an evaluation set built from real records.

**F3.3 The data has no vet ID or diagnosis. How do you get them?**
Vet ID almost certainly exists in production and just isn't in the case extract; I'd confirm in week 1. Diagnosis starts as the condition group the vet picks at the end of the call: a short list owned by the medical lead, which can later map to a standard veterinary terminology such as VeNom.

**F3.4 How confident are you in numbers from 1,200 owners?**
Confident in direction, not precision. Segment and the main frictions are significant at p<0.01; the chronic and unclear groups are small. That's why every target is re-based on the warehouse in week 1 and every bet is tested. *Appendix B.*

**F3.5 Correlation or causation in the friction findings?**
Observational. The model controls for segment and the other frictions, but owners who experienced re-telling may differ in ways we can't see. EXP-003 tests it causally: show the intake to the vet, then measure re-telling and return.

**F3.6 Whose data is the pet record, and what about GDPR?**
The owner's. Pet health data is not health data about a person under GDPR, but it is linked to an identifiable owner, so it is personal data and gets the same rigour: purpose limitation, retention rules, deletion on request. Legal also confirms in week 2 that the check-in is a service message, not marketing.

**F3.7 Can owners share the record with their local clinic?**
Not in Q1. An owner-initiated export (a PDF summary) is a cheap Q3 step; structured sharing with clinic systems is Year 2. Sharing is always started by the owner.

## F4 Experimentation and measurement

**F4.1 Can you read this inside a quarter?**
The 14-day re-check, yes: about 540 owners per arm, readable by week 10. The 30-day read lands around week 13. The 180-day effect cannot land in-quarter, so 50/50 enrolment runs about 10 weeks to power it, and the in-quarter decision rests on leading indicators. *Section 07.*

**F4.2 Why 50/50 rather than a small test group?**
Power. The 180-day acute read needs about 2,050 owners per arm, and a 10% holdout would take about 11 months to fill. Once the proof is in, rollout goes to 90% with a 10% holdout that watches for decay.

**F4.3 How do you stop tests contaminating each other?**
Randomise by owner, one test per moment, and declare nested tests upfront: the named-date test runs only inside the Care Loop arm. Holdout owners are excluded from everything. *Appendix C.*

**F4.4 Where does "0.7% to 3%" come from?**
From the funnel: 85% delivered, 40% answer, 30% "same" or "worse", 45% book, 75% incremental gives 3.4% of eligible owners. The bar of 3% is one the base case clears; the kill rule fires when answers are high but bookings stay under 1.5%.

**F4.5 What if results differ by condition group?**
Expected, and pre-registered: results are read by condition group and shipped group by group. A loop that works for stomach upsets and not for skin ships for stomach upsets.

**F4.6 What about a novelty effect?**
The holdout catches it: if the gap between treated and holdout shrinks over six months, the effect was novelty. Check-ins are tied to an episode, not a campaign, so I expect less novelty than a marketing push.

**F4.7 How will you report progress?**
Weekly, the funnel and guardrails on one dashboard shared with Vet Experience. Monthly, a cohort review per persona with the 30-, 60- and 180-day curves. Quarterly, the gate decision, written up with what we learned, including what failed.

## F5 Clinical safety, vets and operations

**F5.1 Who is clinically accountable for the check-in?**
The vet who set it. The medical lead owns the condition groups, default days, red-flag questions and copy. The app never diagnoses; it routes.

**F5.2 What if the owner taps "better" but the pet is actually worse?**
The closure message repeats the red flags, and the episode can be reopened in one tap for 72 hours. We are not replacing judgment; we are making it easy to come back.

**F5.3 Will vets resist the extra field?**
Possibly, so it takes 15 seconds with defaults, can be switched off with a reason, and is co-designed with 6 to 8 vets. Skip rate is tracked; above half, the default flips to automatic with a vet opt-out.

**F5.4 What if re-checks spike?**
The base case is about 85 a month from new owners: under one per vet per month. If "worse" cases cluster in the evening, the rule routes to the next vet within 2 hours, then to in-person care, and time-to-vet shows it on the dashboard before owners feel it.

**F5.5 How do you stop it feeling like upselling?**
The vet decides there is a follow-up, the copy reassures before it offers a visit ("this is normal until Friday"), the price is shown upfront, and the "not needed" share is a hard guardrail.

**F5.6 What do German professional rules mean for this?**
Two questions need legal sign-off in week 2: that a follow-up video consultation at the normal fee fits the veterinary fee schedule (GOT) and remote-treatment rules, and that the check-in counts as a service message under GDPR. I treat both as launch blockers, not footnotes.

**F5.7 What does customer service need?**
Scripts for "worse" and red-flag cases, a way to reopen an episode, and a feedback loop into the weekly review. They hear about failure modes first.

## F6 Business case and the long term

**F6.1 What is it worth in euros?**
Each +1pp is about €4.3k contribution, or €17k revenue, a year from new owners; Care Loop's base case is about €10k contribution. Small directly. The case rests on platform-wide scope, contribution per acquired owner, and the record as a moat. *Appendix A.*

**F6.2 How does this scale to the 50,000 MAU?**
Care Loop runs on every acute consultation, so the existing base gets it in Q3, after the new-owner proof. That is where the volume is, and why I need the total consultation count in week 1.

**F6.3 What does Year 2 look like?**
The pet record becomes the platform: a health timeline, multi-pet households, owner-controlled sharing with clinics, insurer partnerships, and AI-assisted summaries a vet confirms. *Section 11.*

**F6.4 How does this defend against Dr. Fressnapf or free insurer consults?**
They can copy a check-in screen in a quarter. They cannot quickly copy a year of episodes per pet and owners who trust a specific vet. Speed matters, because the record compounds from the first closed episode.

**F6.5 What would you do with twice the engineers? With half?**
Twice: run the care plan in parallel in Q1 instead of Q2. Half: the concierge test and the intake hand-off only, then Care Loop on one platform first, since platform makes no difference to return.

**F6.6 What is the biggest risk you can't test away?**
Vet adoption. A test measures whether vets set the check-in; it can't make them believe in it. That is why vets co-design it and Vet Experience shares the metric.

**F6.7 How does this change what PetDoc is?**
From an on-demand vet to the vet who knows your pet. That is a positioning change, so Growth and leadership need to tell the same story; it is more than a feature launch.

## F7 Quick questions

| Question | Short answer |
| --- | --- |
| Why day 3? | It is a default per condition group (2 to 5 days), set with the medical lead and tested in EXP-002 |
| Why two messages at most? | An owner with a sick pet should feel looked after, not chased |
| What does a re-check cost the owner? | The normal €35 to €45, shown before booking |
| Does Care Loop run for chronic owners? | No. They already return; they get "book your next check" at the end of the call |
| Several pets? | One episode per pet; owners are randomised as a whole |
| Same vet unavailable? | The next vet within 2 hours, with the full context attached |
| Which language? | German copy in plain words; the team works in English |
| Accessibility? | Large tap targets, screen-reader labels, answerable one-handed in under 10 seconds |
| Poor connection? | The answer is a tiny payload with retries; photos upload in the background |
| First thing you'd do in week 1? | Replicate the baseline in the warehouse, confirm vet ID and notification opt-in, book the vet interviews |
| The one number you'd watch daily? | Answer rate in the concierge test |
| What do you need from the CTO? | A decision on who owns the notification policy service, an owner for the episode service, and two days of an architect's time in week 2 |

---

