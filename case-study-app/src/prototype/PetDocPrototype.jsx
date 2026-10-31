// PetDoc clickable prototype, ported from "PetDoc Prototype.html" to plain React.
// Screen markup is generated from the original template; state and logic are the original class.
import React from 'react';
import imgBella from './assets/bella.webp';
import imgBellaHappy from './assets/bella-happy.webp';
import imgBellaBlanket from './assets/bella-blanket.webp';
import imgBellaSitting from './assets/bella-sitting.webp';
import imgShareQr from './assets/share-qr.svg';
import imgMilo from './assets/milo.png';
import imgOskar from './assets/oskar.png';
import './prototype.css';

const KEY = 'petdoc-proto-screen';
export const S = {
  home:{label:'Home · three pets',device:'Owner app',tag:'Q4 · Everyday companion',tests:'One hub holds an acute episode, a care plan and a chronic routine without them competing. At most one card per pet, and no marketing during an active episode.',persona:'Every owner; multi-pet homes get one loop per pet',events:'home_viewed · card_tapped (type, pet)'},
  intake:{label:'Intake form',device:'Owner app',tag:'IP-1B · Intake hand-off',tests:'Showing the owner’s intake to the vet cuts re-telling from 19% to 10% (EXP-003). Upload retry keeps a failed upload (8% today) from losing the story.',persona:'Everyone, from the first visit',events:'intake_submitted · upload_failed · upload_retried'},
  waiting:{label:'Waiting room',device:'Owner app',tag:'IP-1B · Intake hand-off',tests:'Owners see their notes reached the vet. Audio fallback is advocacy for Vet Experience (video issues on 9% of first visits).',persona:'Everyone',events:'notes_received · wait_time · audio_fallback_used'},
  vetIntake:{label:'Vet pre-call · new case',device:'Vet tool',tag:'IP-1B · Intake hand-off',tests:'The vet starts without asking for what the owner already gave. Shared metric with Vet Experience: re-telling rate with stable call length.',persona:'PetDoc vet (120)',events:'precall_viewed · time_on_precall'},
  vetWrap:{label:'Vet sets check-in',device:'Vet tool',tag:'IP-1A · Care Loop',tests:'Vets set the check-in in the last 15 seconds without lengthening the call. The condition group pre-fills the day; switching it off logs a reason.',persona:'PetDoc vet',events:'checkin_set (condition, day) · checkin_off (reason) · retelling_flag'},
  summary:{label:'Care summary',device:'Owner app',tag:'IP-1A · Care Loop',tests:'Summary opened by 70%+. Naming the check-in day lifts answer rate from 40% to 48% (EXP-008). Permission is asked here, in context. Try the Rx and notification tweaks.',persona:'Worried one-timer (61%, 14.3% return)',events:'summary_viewed · notification_permission'},
  push:{label:'Check-in push',device:'Owner app',tag:'IP-1A · Care Loop',tests:'Do owners open it? The first of at most two messages per episode.',persona:'Worried one-timer',events:'checkin_sent · checkin_delivered · checkin_opened'},
  checkin:{label:'Check-in · decision point',device:'Owner app',tag:'IP-1A · Care Loop',tests:'Answer rate 30% to go, 40% target; 25%+ say same or worse (EXP-001).',persona:'Worried one-timer; unsure first-timer gets day 2',events:'checkin_answered (answer) · photo_added · note_added'},
  better:{label:'Better · case closed',device:'Owner app',tag:'IP-1A + IP-1C',tests:'Closure feels good, not salesy. The episode is saved to the record and asks whether the vet already knew Bella.',persona:'Worried one-timer, silent happy leaver',events:'episode_closed · vet_knew_pet'},
  same:{label:'Same · inside window',device:'Owner app',tag:'IP-1A · EXP-007',tests:'Reassurance first halves re-checks marked “not needed” (20% to 10%) without lowering 30-day return.',persona:'Worried one-timer',events:'same_reassured · recheck_started · snoozed'},
  sameLate:{label:'Same · past the window',device:'Owner app',tag:'IP-1A · Care Loop',tests:'Outside the vet’s expected window, the re-check leads.',persona:'Worried one-timer',events:'recheck_prompt_shown · recheck_started'},
  snoozed:{label:'Ask again Saturday',device:'Owner app',tag:'IP-1A · Care Loop',tests:'The second and last message. Nothing else is sent during the episode.',persona:'Worried one-timer',events:'snooze_set'},
  worse:{label:'Worse · red-flag check',device:'Owner app',tag:'IP-1A · Safety',tests:'The safety path is clear in under a minute. Questions come from the template the vet confirmed.',persona:'Worried one-timer',events:'redflag_answered (question, answer)'},
  redflag:{label:'Red flag · in person',device:'Owner app',tag:'IP-1A · Safety',tests:'100% of red-flag cases routed to in-person care. A safety requirement, not an option.',persona:'Worried one-timer',events:'redflag_shown · clinic_called · directions_opened'},
  priority:{label:'No red flag · priority',device:'Owner app',tag:'IP-1A · EXP-006',tests:'Same vet vs next available within 2 hours: does same-vet routing lift booking from 40% to 50%? Try the “same vet free” tweak.',persona:'Worried one-timer',events:'recheck_booked (same_vet | other) · time_to_vet'},
  recheck:{label:'One-tap re-check',device:'Owner app',tag:'IP-1A · Care Loop',tests:'Do owners book at the full price? Notes, answer and photo travel with the booking.',persona:'Worried one-timer',events:'recheck_booked · price_seen'},
  booked:{label:'Re-check booked',device:'Owner app',tag:'IP-1A · Care Loop',tests:'Confirms the vet already has the story before the call.',persona:'Worried one-timer',events:'recheck_confirmed · calendar_added'},
  vetRecheck:{label:'Vet pre-call · re-check',device:'Vet tool',tag:'IP-1A + IP-2A',tests:'The vet starts without re-telling. Guardrail: under 15% of re-checks marked “not needed”.',persona:'PetDoc vet',events:'precall_viewed · marked_not_needed'},
  expired:{label:'Check-in expired',device:'Owner app',tag:'IP-1A · Care Loop',tests:'After 72 hours the answer is stale; the episode expires but still leaves a way back.',persona:'Worried one-timer',events:'episode_expired · consult_card_tapped'},
  rate:{label:'Rating + vet knew my pet',device:'Owner app',tag:'IP-1C · Measure',tests:'One tap after each visit sets the KR3 baseline (EXP-004), response rate 30%+. Ratings alone miss re-telling (4.35 vs 3.89).',persona:'Everyone',events:'rating · vet_knew_pet · repeated_items'},
  recovery:{label:'Service recovery',device:'Owner app',tag:'IP-1C · Recover',tests:'Owning the failure, with a priority slot and no discount, recovers return for owners whose first visit went wrong.',persona:'Burned first-timer (32%, 14.0% vs 24.6%)',events:'recovery_shown · priority_slot_booked'},
  record:{label:'Bella’s record',device:'Owner app',tag:'IP-2A · Thin pet record',tests:'Every closed episode builds the record. Re-telling on second visits (23% today) drops.',persona:'Care manager, everyone',events:'record_viewed · profile_field_added'},
  share:{label:'Share with a clinic',device:'Owner app',tag:'Year 2 · Record as platform',tests:'Owner-controlled sharing with local clinics. The red-flag path hands the story over.',persona:'Everyone',events:'record_shared (items, expiry)'},
  planSetup:{label:'Care plan set-up',device:'Owner app',tag:'IP-2B · Care plan',tests:'Captures species and age, which PetDoc doesn’t have today. Q2 gate: plan set-up 40%+.',persona:'New pet parent (22%, 25.7% return)',events:'species_age_captured · plan_created'},
  plan:{label:'Milo’s plan',device:'Owner app',tag:'IP-2B · Care plan',tests:'In-person items go to the local clinic, while the plan and the record stay with PetDoc (clinic-leakage risk).',persona:'New pet parent',events:'plan_viewed · reminder_toggled'},
  planPush:{label:'Plan reminder',device:'Owner app',tag:'IP-2B · Care plan',tests:'Reminder to booking 10%+ (Q2 gate).',persona:'New pet parent',events:'reminder_sent · reminder_opened'},
  planBook:{label:'One-tap plan booking',device:'Owner app',tag:'IP-2B · EXP-009',tests:'60-day return rises from 17.6% to 23.6%.',persona:'New pet parent',events:'plan_booking (item)'},
  vetNext:{label:'Vet books next check',device:'Vet tool',tag:'IP-3A · Chronic & senior',tests:'Booking at the end of the call protects the 51% return. Care Loop stays off for chronic cases: they already come back.',persona:'Care manager (12%, 51% return)',events:'next_check_booked · refill_set · checkin_off (chronic)'},
  chronic:{label:'Oskar’s care',device:'Owner app',tag:'IP-3A · Chronic & senior',tests:'Q3 gate: chronic 30-day return 33%+, re-telling under 5%.',persona:'Care manager',events:'refill_ordered · next_check_viewed'},
  refillPush:{label:'Refill reminder',device:'Owner app',tag:'IP-3A · Chronic & senior',tests:'Useful, not noisy: opt-outs under 5%. One policy service caps all messages.',persona:'Care manager',events:'refill_reminder_sent · reorder_tapped'},
  update:{label:'What has changed?',device:'Owner app',tag:'IP-3A · Chronic & senior',tests:'Efficient tone. The questions are the ones the vet picked; answers land on the pre-call view.',persona:'Care manager',events:'pre_visit_update (fields)'},
  ask:{label:'One free question',device:'Owner app',tag:'IP-3B · Conditional',tests:'Ships only if owners answer but few book. Guardrails: paid re-checks, vet minutes and margin (EXP-010, leadership sign-off).',persona:'Worried one-timer',events:'question_sent · vet_minutes · recheck_after_question'},
  tracker:{label:'Recovery tracker',device:'Owner app',tag:'Q4 · Everyday companion',tests:'Owners open the app without a problem, month on month. Photo comparison is a “later, if the MVP works” item.',persona:'Worried one-timer, care manager',events:'tracker_entry · photo_compared'}
};
export const FLOWS = [
  {code:'Start',title:'Owner home',steps:['home']},
  {code:'IP-1B',title:'Intake hand-off',steps:['intake','waiting','vetIntake']},
  {code:'IP-1A',title:'Care Loop',steps:['vetWrap','summary','push','checkin','better','same','sameLate','snoozed','worse','redflag','priority','recheck','booked','vetRecheck','expired']},
  {code:'IP-1C',title:'Measure & recover',steps:['rate','recovery']},
  {code:'IP-2A',title:'Pet record',steps:['record','share']},
  {code:'IP-2B',title:'Care plan',steps:['planSetup','plan','planPush','planBook']},
  {code:'IP-3A',title:'Chronic & senior',steps:['vetNext','chronic','refillPush','update']},
  {code:'IP-3B',title:'One free question',steps:['ask']},
  {code:'Q4',title:'Everyday companion',steps:['tracker']}
];
const ORDER = FLOWS.flatMap(f => f.steps);
const VET = ['vetIntake','vetWrap','vetRecheck','vetNext'];
const URLS = {vetIntake:'vet.petdoc.app/consult/bella/pre-call',vetWrap:'vet.petdoc.app/consult/bella/live',vetRecheck:'vet.petdoc.app/consult/bella/re-check',vetNext:'vet.petdoc.app/consult/oskar/live'};
const DAYS = ['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday','Monday','Tuesday'];
const CONDS = {
  'GI':{short:'Stomach',label:'Upset stomach',day:2,win:3,flags:['Blood in vomit or stool','Not drinking for 12+ hours','Very weak or unable to stand'],owner:['has blood in her vomit or stool','stops drinking for 12+ hours','is very weak or can’t stand'],qs:['Is there blood in her vomit or stool?','Has she not drunk anything for 12 hours or more?','Is she very weak or unable to stand?']},
  'Skin':{short:'Skin',label:'Skin irritation',day:5,win:7,flags:['Swelling of face or throat','Spreading redness, heat or pus','Fever or very low energy'],owner:['has a swollen face or throat','has redness that spreads, feels hot or oozes','seems feverish or very low on energy'],qs:['Is her face or throat swelling?','Is the redness spreading, hot or oozing?','Does she seem feverish or very low on energy?']},
  'Wound':{short:'Wound',label:'Wound',day:3,win:5,flags:['Bleeding that won’t stop','Wound opens or smells','Leg swollen or not used'],owner:['bleeds and it won’t stop','has a wound that opens or smells','has a swollen leg or stops using it'],qs:['Is it bleeding and won’t stop?','Has the wound opened or started to smell?','Is the leg swollen, or is she not using it?']},
  'Eye / ear':{short:'Eye / ear',label:'Eye or ear',day:3,win:4,flags:['Eye cloudy or bulging','Sudden loss of balance','Pain when touching the head'],owner:['has an eye that looks cloudy or bulging','suddenly loses her balance','cries out when you touch her head'],qs:['Does her eye look cloudy or bulging?','Has she suddenly lost her balance?','Does she cry out when you touch her head?']},
  'Unclear':{short:'Not sure yet',label:'Not sure yet',day:2,win:2,flags:['Breathing fast at rest','Not drinking for 12+ hours','Collapse or seizure'],owner:['breathes fast while resting','stops drinking for 12+ hours','collapses or has a seizure'],qs:['Is she breathing fast while resting?','Has she not drunk anything for 12 hours or more?','Has she collapsed or had a seizure?']}
};
const DAYOPTS = [1,2,3,5];
const SIGNS = ['Vomiting','Diarrhoea','Not eating','Tired','Drinking less','Other'];
const NEXT_DATES = {2:'Tue 24 Nov',4:'Tue 8 Dec',6:'Tue 22 Dec',8:'Tue 5 Jan'};
const UPD_OPTS = {Appetite:['Less','Same','More'],Drinking:['Less','Same','More'],Weight:['Down','Same','Up'],Litter:['Less','Same','More'],Energy:['Lower','Same','Higher']};
const INIT = {screen:'home',hist:[],cond:'GI',day:2,win:3,loopOn:true,offReason:null,retell:false,signs:{Vomiting:true,Diarrhoea:true},since:'1–2 days',intakeText:'Threw up twice last night after getting into the bin. Loose stool this morning. Still drinking.',uploadOk:false,notifOn:false,photoAdded:false,noteAdded:false,knew:null,answer:'same',rq:[null,null,null],vetPick:null,prBooked:false,slot:'16:30',vetMark:null,stars:0,rateKnew:null,repeated:{},allergy:false,vacc:false,share:{episode:true,meds:true,photos:true,past:false},shareSent:false,species:'Dog',planRem:true,planSlot:'18:15',planBooked:false,weeks:4,nextSlot:'10:30',refills:{med:true,diet:true},askChips:{Appetite:true,Drinking:true,Weight:true,Litter:false,Energy:false},ordered:false,upd:{},updSent:false,askText:'',askSent:false,track:{Appetite:'Normal',Stool:'Loose',Energy:'Normal'},trackSaved:false};

class PetDocPrototype extends React.Component {
  scrollRef = React.createRef();
  state = (() => { let s = 'home'; try { const v = localStorage.getItem(KEY); if (v && S[v]) s = v; } catch (e) {} return {...INIT, screen: s}; })();

  componentDidUpdate() {
    if (this._lastScreen !== this.state.screen) {
      this._lastScreen = this.state.screen;
      const el = this.scrollRef.current; if (el) el.scrollTop = 0;
    }
  }
  go(id) {
    const extra = {};
    if (id === 'chronicOrder') { extra.ordered = true; id = 'chronic'; }
    if (id === 'better' || id === 'same' || id === 'worse') extra.answer = id;
    if (id === 'worse') extra.rq = [null,null,null];
    try { localStorage.setItem(KEY, id); } catch (e) {}
    this.setState(s => id === s.screen ? extra : ({...extra, screen: id, hist: [...s.hist, s.screen].slice(-40)}));
  }
  back() {
    const h = this.state.hist; const prev = h.length ? h[h.length - 1] : 'home';
    try { localStorage.setItem(KEY, prev); } catch (e) {}
    this.setState({screen: prev, hist: h.slice(0, -1)});
  }
  toggleIn(key, k) { this.setState(s => ({[key]: {...s[key], [k]: !s[key][k]}})); }

  renderVals() {
    const st = this.state, P = this.props;
    const cur = S[st.screen] ? st.screen : 'home';
    const meta = S[cur];
    const is = {}; ORDER.forEach(k => is[k] = k === cur);
    const LOCKS = {
      push:{date:DAYS[st.day] + ' ' + (10 + st.day) + ' November',time:'09:00',title:'How is Bella today?',body:'Day ' + st.day + ' since your call with Dr. Weber. One tap tells us how she’s doing.',open:'checkin',actions:[['Better','better'],['About the same','same'],['Worse','worse']]},
      planPush:{date:'Monday 30 November',time:'08:30',title:'Milo’s growth check is due next week',body:'Part of Milo’s plan. A 15-minute video call with a PetDoc vet.',open:'planBook',actions:[['Book a time','planBook'],['See Milo’s plan','plan']]},
      refillPush:{date:'Tuesday 1 December',time:'18:00',title:'Oskar’s renal diet runs out Sunday',body:'Reorder the 2 kg bag now and it arrives Friday.',open:'chronic',actions:[['Reorder','chronicOrder'],['Remind me tomorrow','home']]}
    };
    is.lock = !!LOCKS[cur];
    const go = {}; ORDER.forEach(k => go[k] = () => this.go(k)); go.chronicOrder = () => this.go('chronicOrder');
    const onOff = on => ({bg: on ? '#A8DEC6' : '#F4F6F5', fw: on ? 700 : 500});
    const vetChip = on => ({bg: on ? '#DDF4F3' : '#FFFFFF', border: on ? '1.5px solid #087F8C' : '1px solid #E5EBEB', fg: on ? '#066A75' : '#202A30', fw: on ? 700 : 500});
    const sw = on => ({track: on ? '#087F8C' : '#C9D2D2', justify: on ? 'flex-end' : 'flex-start'});

    let n = 0;
    const flows = FLOWS.map(f => ({code: f.code, title: f.title, steps: f.steps.map(k => {
      n++; const on = k === cur;
      return {num: String(n).padStart(2, '0'), label: S[k].label, go: go[k], bg: on ? '#202A30' : 'transparent', fg: on ? '#FFFFFF' : '#2F3A40', numFg: on ? '#C9D2D2' : '#5E6B73', fw: on ? 600 : 500, vet: VET.includes(k), tagBg: on ? '#3A4549' : '#DDF4F3', tagFg: on ? '#FFFFFF' : '#066A75'};
    })}));
    const idx = ORDER.indexOf(cur); const flow = FLOWS.find(f => f.steps.includes(cur));
    const note = {tag: meta.tag, device: meta.device, flow: flow.title, pos: (flow.steps.indexOf(cur) + 1) + ' of ' + flow.steps.length, label: meta.label, tests: meta.tests, persona: meta.persona, events: meta.events};

    const L = LOCKS[cur];
    const lock = L ? {date: L.date, time: L.time, title: L.title, body: L.body, open: go[L.open], actions: L.actions.map(([label, to], i, a) => ({label, go: go[to], border: i < a.length - 1 ? '1px solid #EEF1F0' : '0'}))} : {actions: []};

    // intake
    const onSigns = SIGNS.filter(l => st.signs[l]);
    const signs = SIGNS.map(l => ({label: l, toggle: () => this.toggleIn('signs', l), ...onOff(!!st.signs[l])}));
    const sinceOpts = ['Today','1–2 days','Longer'].map(l => ({label: l, pick: () => this.setState({since: l}), ...onOff(st.since === l)}));
    const signsSummary = onSigns.length ? onSigns.length + (onSigns.length === 1 ? ' sign: ' : ' signs: ') + onSigns.join(', ').toLowerCase() : 'No signs picked';

    // vet wrap-up
    const C = CONDS[st.cond];
    const conds = Object.keys(CONDS).map(k => ({label: k, pick: () => this.setState({cond: k, day: CONDS[k].day, win: CONDS[k].win}), ...vetChip(k === st.cond)}));
    const days = DAYOPTS.map(d => { const on = d === st.day; return {label: 'Day ' + d, wd: DAYS[d].slice(0, 3), pick: () => this.setState({day: d}), bg: on ? '#087F8C' : '#FFFFFF', fg: on ? '#FFFFFF' : '#202A30', border: on ? '0' : '1px solid #E5EBEB', wdColor: on ? '#FFFFFF' : '#5E6B73', fw: on ? 700 : 600}; });
    const offReasons = ['Chronic, already returns','Referred in person','Resolved during the call','Other'].map(l => ({label: l, pick: () => this.setState({offReason: l}), ...vetChip(st.offReason === l)}));
    const windowLabel = st.win + (st.win === 1 ? ' day' : ' days');

    // summary
    const delayed = !!P.rxDelayed, emailOnly = !!P.notificationsOff && !delayed;
    const checkDay = DAYS[st.day];

    // worse
    const answered = st.rq.every(x => x); const yesIdx = st.rq.indexOf('yes');
    const questions = C.qs.map((t, i) => { const a = st.rq[i]; return {text: t, yesOn: a === 'yes', yesOff: a !== 'yes', noOn: a === 'no', noOff: a !== 'no', pickYes: () => this.setState(s => { const r = [...s.rq]; r[i] = 'yes'; return {rq: r}; }), pickNo: () => this.setState(s => { const r = [...s.rq]; r[i] = 'no'; return {rq: r}; })}; });

    // priority
    const free = !!P.sameVetFree;
    const VETS = free
      ? [{id:'weber',initials:'LW',name:'Dr. Lena Weber',sub:'Today 10:15 · in 70 min · saw Bella Tue',time:'10:15'},{id:'brandt',initials:'JB',name:'Dr. Jonas Brandt',sub:'Today 10:30 · in 85 min',time:'10:30'}]
      : [{id:'brandt',initials:'JB',name:'Dr. Jonas Brandt',sub:'Today 10:30 · in 85 min',time:'10:30'},{id:'weber',initials:'LW',name:'Wait for Dr. Weber',sub:'Fri 09:00 · not within 2 hours',time:'Fri 09:00'}];
    const pickId = VETS.some(v => v.id === st.vetPick) ? st.vetPick : VETS[0].id;
    const pv = VETS.find(v => v.id === pickId);
    const vets = VETS.map(v => { const on = v.id === pickId; return {...v, pick: () => this.setState({vetPick: v.id}), shadow: on ? '0 0 0 2px #A8DEC6, 0 8px 24px rgba(32,42,48,0.06)' : '0 8px 24px rgba(32,42,48,0.06)', dot: on ? '#A8DEC6' : '#F4F6F5', stroke: on ? '#202A30' : 'none'}; });
    const vetFirst = pv.name.replace('Wait for ', '');

    // later screens
    const pct = 60 + (st.allergy ? 20 : 0) + (st.vacc ? 20 : 0);
    const shareItems = [['episode','This episode','Dr. Weber’s notes and check-in answers'],['meds','Medication','Probiotic paste'],['photos','Photos','3 photos'],['past','Past episodes','Ear irritation, Jun 2026']].map(([k, l, sub]) => ({label: l, sub, toggle: () => this.toggleIn('share', k), ...sw(st.share[k])}));
    const chipStyle = (s) => s.startsWith('Done') ? {chipBg:'#E6F2EC',chipFg:'#256B48'} : s.startsWith('Due') ? {chipBg:'#FBF0DC',chipFg:'#8A5A10'} : {chipBg:'#EEF1F1',chipFg:'#4F5B62'};
    const planItems = [
      {when:'8 wks',title:'First vaccination',where:'Local clinic',status:'Done'},
      {when:'12 wks',title:'Second vaccination',where:'Local clinic',status:'Done'},
      {when:'13 wks',title:'Worming',where:'At home',status:'Done'},
      {when:'16 wks',title:'Third vaccination + rabies',where:'Local clinic · needs an in-person visit',status:'Due 30 Nov'},
      {when:'17 wks',title:'Growth & diet check',where:'PetDoc video call',status:'Due 7 Dec'},
      {when:'Monthly',title:'Flea & tick',where:'At home',status:'Reminder'},
      {when:'6 mo',title:'Neutering: when and whether',where:'PetDoc video call',status:'Later'}
    ].map(p => ({...p, ...chipStyle(p.status)}));
    const timeSlots = (list, curv, key, vetStyle) => list.map(t => ({label: t, pick: () => this.setState({[key]: t}), ...(vetStyle ? vetChip(curv === t) : onOff(curv === t))}));
    const askKeys = Object.keys(st.askChips).filter(k => st.askChips[k]);
    const updQs = askKeys.map(k => ({label: k, opts: UPD_OPTS[k].map(o => ({label: o, pick: () => this.setState(s => ({upd: {...s.upd, [k]: o}})), ...onOff(st.upd[k] === o)}))}));
    const askLen = st.askText.length;
    const trackDays = [
      {label:'Tue',sub:'Call',dot:'#066A75'},{label:'Wed',sub:'—',dot:'#E3E8E6'},{label:'Thu',sub:'Same',dot:'#9AA6AB'},{label:'Fri',sub:'Better',dot:'#2F855A'},{label:'Sat',sub: st.trackSaved ? 'Better' : 'Today',dot: st.trackSaved ? '#2F855A' : '#FFFFFF'}
    ].map((d, i) => ({...d, ring: i === 4 ? '3px solid #A8DEC6' : '0'}));
    const TR = {Appetite:['Normal','Less'],Stool:['Normal','Loose'],Energy:['Normal','Low']};
    const trackRows = Object.keys(TR).map(k => ({label: k, opts: TR[k].map(o => ({label: o, pick: () => this.setState(s => ({track: {...s.track, [k]: o}})), ...onOff(st.track[k] === o)}))}));

    return {
      is, go, flows, note, lock,
      phone: !VET.includes(cur), vet: VET.includes(cur), vetUrl: URLS[cur] || '',
      notesOn: P.notesPanel ?? true,
      scrollRef: this.scrollRef,
      back: () => this.back(),
      restart: () => { try { localStorage.setItem(KEY, 'home'); } catch (e) {} this.setState({...INIT, hist: []}); },
      prev: () => this.go(ORDER[Math.max(0, idx - 1)]),
      next: () => this.go(ORDER[Math.min(ORDER.length - 1, idx + 1)]),
      homeLoopLine: 'Day ' + st.day + ' since Dr. Weber’s call. One tap.',
      homeOskarLine: st.ordered ? 'Reordered · arrives Friday' : '5 days left · reorder in one tap',
      // intake
      signs, sinceOpts, intakeText: st.intakeText, setIntakeText: e => this.setState({intakeText: e.target.value}),
      uploadOk: st.uploadOk, uploadFailed: !st.uploadOk, retryUpload: () => this.setState({uploadOk: true}),
      signsSummary, photoLine: st.uploadOk ? '1 photo of Bella' : 'Your text (the photo can follow in the call)',
      signsOn: onSigns.map(l => ({label: l})), sinceVal: st.since,
      // vet wrap
      toggleLoop: () => this.setState(s => ({loopOn: !s.loopOn})), loopOn: st.loopOn, loopOff: !st.loopOn,
      loopTrack: st.loopOn ? '#087F8C' : '#C9D2D2', loopJustify: st.loopOn ? 'flex-end' : 'flex-start', loopLabel: st.loopOn ? 'On' : 'Off', loopLabelColor: st.loopOn ? '#066A75' : '#5E6B73',
      conds, days, offReasons, condName: st.cond, flags: C.flags.map(t => ({text: t})),
      defaultHint: st.day === C.day ? 'Default for ' + st.cond + ': day ' + C.day : 'Edited · default is day ' + C.day,
      windowLabel, decWindow: () => this.setState(s => ({win: Math.max(1, s.win - 1)})), incWindow: () => this.setState(s => ({win: Math.min(14, s.win + 1)})),
      toggleRetell: () => this.setState(s => ({retell: !s.retell})), retellBg: st.retell ? '#087F8C' : '#FFFFFF', retellBorder: st.retell ? '0' : '1.5px solid #B8C4C4', retellStroke: st.retell ? '#FFFFFF' : 'none',
      switchOff: () => this.setState(s => ({loopOn: false, offReason: s.offReason || 'Resolved during the call'})),
      wrapCta: st.loopOn ? 'Confirm & end consult' : 'End consult',
      // summary
      condShort: C.short, rxOnTime: !delayed, rxLate: delayed,
      sumNormal: st.loopOn && !delayed && !emailOnly, sumDelayed: st.loopOn && delayed, sumEmail: st.loopOn && emailOnly, sumOff: !st.loopOn,
      checkDay, notifAsk: !st.notifOn, notifSet: st.notifOn, enableNotif: () => this.setState({notifOn: true}),
      ownerFlags: C.owner.map(t => ({text: t})),
      // checkin
      checkinPill: 'Day ' + st.day + ' · ' + C.label,
      togglePhoto: () => this.setState(s => ({photoAdded: !s.photoAdded})), toggleNote: () => this.setState(s => ({noteAdded: !s.noteAdded})),
      photoLabel: st.photoAdded ? 'Photo added' : 'Add photo', photoBg: st.photoAdded ? '#E6F5EE' : '#FFFFFF',
      noteLabel: st.noteAdded ? 'Note added' : 'Add a note', noteBg: st.noteAdded ? '#E6F5EE' : '#FFFFFF',
      photoAdded: st.photoAdded, attachAny: st.photoAdded || st.noteAdded,
      attachLine: st.noteAdded ? '“Ate a little this morning, still loose stool.”' : 'Photo ready to send with your answer',
      // better
      knewUnanswered: st.knew === null, knewAnswered: st.knew !== null, answerYes: () => this.setState({knew: 'yes'}), answerNo: () => this.setState({knew: 'no'}),
      profilePct: pct + '%', profileWidth: pct + '%', profileHint: pct < 100 ? 'Add allergies and vaccines so no vet asks twice.' : 'Complete. Every vet sees this before the call.',
      // same
      winEnd: DAYS[st.win], winEndShort: DAYS[st.win].slice(0, 3), lateDay: DAYS[Math.max(st.win + 1, st.day + 2)],
      // worse
      questions, wReady: answered, wNotReady: !answered,
      wHint: yesIdx >= 0 ? 'One answer means Bella needs an in-person exam.' : 'No warning signs. Let’s get Bella seen.',
      wNext: () => this.go(yesIdx >= 0 ? 'redflag' : 'priority'),
      redReason: (C.flags[yesIdx >= 0 ? yesIdx : 1]).toLowerCase(),
      // priority
      vets, prBody: free ? 'Dr. Weber has a slot this morning and already knows Bella.' : 'Dr. Weber is fully booked today. Any vet you pick gets Bella’s full history.',
      prCta: 'Book ' + vetFirst + ' · ' + pv.time, prBook: () => this.setState({prBooked: true}), prBooked: st.prBooked, prConfirm: vetFirst + ' will see Bella at ' + pv.time + ', with her notes and today’s answers.',
      // recheck & booked
      slots: timeSlots(['16:30','17:15','18:00'], st.slot, 'slot'), slot: st.slot,
      answerLine: st.answer === 'worse' ? 'Today’s check-in: worse' : 'Today’s check-in: about the same',
      answerLabel: st.answer === 'worse' ? 'Worse' : 'About the same',
      loopChip: 'Care Loop · day ' + st.day + ' of ' + st.win + ' · “' + (st.answer === 'worse' ? 'worse' : 'about the same') + '”',
      markNeeded: () => this.setState({vetMark: 'needed'}), markNotNeeded: () => this.setState({vetMark: 'not'}),
      neededBg: st.vetMark === 'needed' ? '#087F8C' : '#FFFFFF', neededFg: st.vetMark === 'needed' ? '#FFFFFF' : '#202A30',
      notNeededBg: st.vetMark === 'not' ? '#202A30' : '#FFFFFF', notNeededFg: st.vetMark === 'not' ? '#FFFFFF' : '#202A30',
      // rate
      stars: [1,2,3,4,5].map(k => ({pick: () => this.setState({stars: k}), fill: k <= st.stars ? '#E0A100' : '#E3E8E6'})),
      rateOpts: ['Yes','Partly','Not really'].map(l => ({label: l, pick: () => this.setState({rateKnew: l}), ...onOff(st.rateKnew === l)})),
      rateRepeat: st.rateKnew === 'Partly' || st.rateKnew === 'Not really',
      repeatedOpts: ['Symptoms','Photos','Past visits','Medication'].map(l => ({label: l, toggle: () => this.toggleIn('repeated', l), ...onOff(!!st.repeated[l])})),
      // record & share
      allergyAdded: st.allergy, allergyMissing: !st.allergy, addAllergy: () => this.setState({allergy: true}),
      vaccAdded: st.vacc, vaccMissing: !st.vacc, addVacc: () => this.setState({vacc: true}),
      shareItems, shareSent: st.shareSent, shareNotSent: !st.shareSent, sendShare: () => this.setState({shareSent: true}),
      // plan
      speciesOpts: ['Dog','Cat'].map(l => ({label: l, pick: () => this.setState({species: l}), ...onOff(st.species === l)})),
      planSub: st.species === 'Dog' ? 'Dog · Mixed breed · 13 weeks' : 'Cat · 13 weeks',
      planItems, togglePlanRem: () => this.setState(s => ({planRem: !s.planRem})), planRemTrack: sw(st.planRem).track, planRemJustify: sw(st.planRem).justify, planRemLabel: st.planRem ? 'On · one message per item' : 'Off',
      planSlots: timeSlots(['09:30','12:00','18:15'], st.planSlot, 'planSlot'), planSlot: st.planSlot,
      planBookIt: () => this.setState({planBooked: true}), planBooked: st.planBooked, planNotBooked: !st.planBooked,
      // chronic
      weeks: [2,4,6,8].map(w => ({label: w + ' wks', pick: () => this.setState({weeks: w}), ...vetChip(st.weeks === w)})),
      nextDate: NEXT_DATES[st.weeks], nextSlots: timeSlots(['09:00','10:30','17:00'], st.nextSlot, 'nextSlot', true), nextSlot: st.nextSlot,
      refillsList: [['med','Benazepril 2.5 mg · 30 tablets'],['diet','Renal diet · 2 kg bag']].map(([k, t]) => ({title: t, sub: 'Remind 5 days before it runs out', toggle: () => this.toggleIn('refills', k), bg: st.refills[k] ? '#087F8C' : '#FFFFFF', border: st.refills[k] ? '0' : '1.5px solid #B8C4C4', stroke: st.refills[k] ? '#FFFFFF' : 'none'})),
      askChipsList: Object.keys(st.askChips).map(k => ({label: k, toggle: () => this.toggleIn('askChips', k), ...vetChip(st.askChips[k])})),
      dietOrdered: st.ordered, dietNotOrdered: !st.ordered, orderDiet: () => this.setState({ordered: true}),
      dietWidth: st.ordered ? '100%' : '17%', dietBar: st.ordered ? '#A8DEC6' : '#D99A32', dietLeft: st.ordered ? '2 kg bag arriving Friday' : '5 days left',
      updQs, updSent: st.updSent, updNotSent: !st.updSent, sendUpd: () => this.setState({updSent: true}),
      // ask
      askText: st.askText, setAskText: e => this.setState({askText: e.target.value.slice(0, 280)}), askLen: askLen + ' / 280',
      askSent: st.askSent, askNotSent: !st.askSent, sendAsk: () => { if (st.askText.trim()) this.setState({askSent: true}); },
      askBtnBg: askLen ? '#A8DEC6' : '#E3E8E6', askBtnFg: askLen ? '#202A30' : '#4F5B62', askShown: st.askText || 'Can Bella have her usual treats yet?',
      // tracker
      trackDays, trackRows, saveTrack: () => this.setState({trackSaved: true}), trackLabel: st.trackSaved ? 'Saved to Bella’s record' : 'Save today'
    };
  }

  render() {
    const v = this.renderVals();
    return (
      <div className="pd-proto" style={{boxSizing: "border-box", padding: "24px", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "24px", fontFamily: "Inter,system-ui,sans-serif", color: "#202A30"}}>
        <nav style={{flex: "0 0 268px", boxSizing: "border-box", position: "sticky", top: "24px", maxHeight: "calc(100vh - 48px)", overflowY: "auto", background: "#FFFFFF", borderRadius: "24px", padding: "20px 12px", display: "flex", flexDirection: "column", gap: "18px"}}>
          <div style={{display: "flex", alignItems: "center", gap: "10px", padding: "0 8px"}}>
            <svg width="32" height="26" viewBox="0 0 40 32" aria-hidden="true">
              <circle cx="14" cy="16" r="14" fill="#087F8C">
              </circle>
              <circle cx="27" cy="16" r="11" fill="#DDF4F3" fillOpacity="0.92">
              </circle>
            </svg>
            <div style={{display: "flex", flexDirection: "column", gap: "1px"}}>
              <span style={{fontFamily: "Manrope,Inter,sans-serif", fontWeight: "700", fontSize: "17px"}}>
                PetDoc
              </span>
              <span style={{fontSize: "12px", color: "#5E6B73"}}>
                Prototype · every initiative
              </span>
            </div>
            <button onClick={v.restart} aria-label="Restart prototype" title="Restart prototype" style={{marginLeft: "auto", width: "36px", height: "36px", flex: "none", borderRadius: "999px", border: "0", background: "#F4F6F5", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8">
                </path>
                <path d="M3 3v5h5">
                </path>
              </svg>
            </button>
          </div>
          {v.flows.map((f, f_i) => (<React.Fragment key={f_i}>
            <div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
              <div style={{display: "flex", alignItems: "center", gap: "8px", padding: "0 8px 6px"}}>
                <span style={{fontSize: "11px", fontWeight: "700", letterSpacing: "0.03em", color: "#066A75", background: "#DDF4F3", borderRadius: "6px", padding: "3px 6px"}}>
                  {f.code}
                </span>
                <span style={{fontSize: "13px", fontWeight: "600"}}>
                  {f.title}
                </span>
              </div>
              {f.steps.map((st, st_i) => (<React.Fragment key={st_i}>
                <button onClick={st.go} style={{display: "flex", alignItems: "center", gap: "8px", minHeight: "34px", padding: "6px 10px", border: "0", borderRadius: "12px", cursor: "pointer", textAlign: "left", fontFamily: "Inter,sans-serif", fontSize: "13px", lineHeight: "18px", background: st.bg, color: st.fg, fontWeight: st.fw}}>
                  <span style={{flex: "none", width: "20px", fontSize: "11px", fontVariantNumeric: "tabular-nums", color: st.numFg}}>
                    {st.num}
                  </span>
                  <span style={{flex: "1"}}>
                    {st.label}
                  </span>
                  {st.vet && (<>
                    <span style={{fontSize: "10px", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase", padding: "2px 6px", borderRadius: "6px", background: st.tagBg, color: st.tagFg}}>
                      Vet
                    </span>
                  </>)}
                </button>
              </React.Fragment>))}
            </div>
          </React.Fragment>))}
        </nav>
        <main style={{flex: "1 1 440px", minWidth: "0", display: "flex", justifyContent: "center"}}>
          {v.phone && (<>
            <div style={{width: "422px", height: "876px", flex: "none", boxSizing: "border-box", padding: "16px", borderRadius: "64px", background: "#1C2326", boxShadow: "inset 0 0 0 2px #3A4549, inset 0 0 0 6px #1C2326, inset 0 0 0 7px #2A3337, 0 30px 60px rgba(32,42,48,0.18)", position: "relative"}}>
              <div className="pd-scroll" ref={v.scrollRef} style={{width: "390px", height: "844px", borderRadius: "48px", overflowX: "hidden", overflowY: "auto", scrollbarWidth: "none", position: "relative", background: "#F4F6F5"}}>
                {v.is.home && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{background: "#FFFFFF", borderRadius: "0 0 40px 40px", padding: "60px 20px 22px", display: "flex", flexDirection: "column", gap: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.05)"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Good morning, Anna
                          </span>
                          <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                            Your pets
                          </span>
                        </div>
                        <span style={{width: "44px", height: "44px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "14px"}}>
                          AK
                        </span>
                      </div>
                      <div style={{display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "10px"}}>
                        <button onClick={v.go.record} style={{border: "0", background: "transparent", cursor: "pointer", padding: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", fontFamily: "Inter,sans-serif", color: "#202A30"}}>
                          <span style={{width: "84px", height: "84px", borderRadius: "999px", background: "#E6F5EE", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", boxShadow: "0 0 0 3px #FFFFFF, 0 0 0 5px #A8DEC6"}}>
                            <img src={imgBella} alt="Bella" style={{width: "72px", height: "78px", objectFit: "contain", objectPosition: "bottom"}} />
                          </span>
                          <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Bella
                            </span>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              Recovering
                            </span>
                          </span>
                        </button>
                        <button onClick={v.go.plan} style={{border: "0", background: "transparent", cursor: "pointer", padding: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", fontFamily: "Inter,sans-serif", color: "#202A30"}}>
                          <span style={{width: "84px", height: "84px", borderRadius: "999px", background: "#FBF0DC", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src={imgMilo} alt="Milo, a fluffy mixed-breed puppy" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%"}} />
                          </span>
                          <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Milo
                            </span>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              Puppy plan
                            </span>
                          </span>
                        </button>
                        <button onClick={v.go.chronic} style={{border: "0", background: "transparent", cursor: "pointer", padding: "0", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", fontFamily: "Inter,sans-serif", color: "#202A30"}}>
                          <span style={{width: "84px", height: "84px", borderRadius: "999px", background: "#EEF1F1", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                            <img src={imgOskar} alt="Oskar, a fluffy cream cat" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 28%"}} />
                          </span>
                          <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "1px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Oskar
                            </span>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              Kidney care
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
                      <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73", padding: "0 4px"}}>
                        Today
                      </span>
                      <div style={{background: "#A8DEC6", borderRadius: "24px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 10px 24px rgba(72,170,130,0.25)"}}>
                        <div style={{display: "flex", gap: "14px", alignItems: "center"}}>
                          <span style={{flex: "none", width: "48px", height: "48px", borderRadius: "999px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="5" width="18" height="16" rx="2">
                              </rect>
                              <path d="M16 3v4M8 3v4M3 10h18M9 15l2 2 4-4">
                              </path>
                            </svg>
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "16px"}}>
                              How is Bella today?
                            </span>
                            <span style={{fontSize: "13px", lineHeight: "18px"}}>
                              {v.homeLoopLine}
                            </span>
                          </span>
                        </div>
                        <button onClick={v.go.checkin} style={{height: "52px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#202A30", color: "#FFFFFF", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                          Answer check-in
                        </button>
                      </div>
                      <button onClick={v.go.plan} style={{textAlign: "left", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", color: "#202A30", background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                        <span style={{flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="5" width="18" height="16" rx="2">
                            </rect>
                            <path d="M16 3v4M8 3v4M3 10h18">
                            </path>
                          </svg>
                        </span>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Milo’s growth check is due
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Mon 7 Dec · part of his plan
                          </span>
                        </span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 6 6 6-6 6">
                          </path>
                        </svg>
                      </button>
                      <button onClick={v.go.chronic} style={{textAlign: "left", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", color: "#202A30", background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                        <span style={{flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#FBF0DC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A5A10" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7z">
                            </path>
                            <path d="m8.5 8.5 7 7">
                            </path>
                          </svg>
                        </span>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Oskar’s renal diet runs low
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            {v.homeOskarLine}
                          </span>
                        </span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 6 6 6-6 6">
                          </path>
                        </svg>
                      </button>
                      <button onClick={v.go.intake} style={{marginTop: "6px", height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 6px 18px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="6" width="14" height="12" rx="2">
                          </rect>
                          <path d="m16 10 6-3v10l-6-3">
                          </path>
                        </svg>
                        Talk to a vet now
                      </button>
                      <span style={{fontSize: "13px", color: "#5E6B73", textAlign: "center"}}>
                        Usual wait right now: about 7 minutes
                      </span>
                    </div>
                  </div>
                </>)}
                {v.is.intake && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          Before the call · 1 of 2
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                          What’s going on with Bella?
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          Dr. Weber reads this before the call, so you won’t have to say it twice.
                        </p>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Main signs
                        </span>
                        <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                          {v.signs.map((c, c_i) => (<React.Fragment key={c_i}>
                            <button onClick={c.toggle} style={{height: "40px", padding: "0 14px", borderRadius: "999px", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", color: "#202A30", background: c.bg, fontWeight: c.fw}}>
                              {c.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73", paddingTop: "4px"}}>
                          Since when
                        </span>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px"}}>
                          {v.sinceOpts.map((c, c_i) => (<React.Fragment key={c_i}>
                            <button onClick={c.pick} style={{height: "44px", borderRadius: "999px", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", color: "#202A30", background: c.bg, fontWeight: c.fw}}>
                              {c.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "10px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          In your words
                        </span>
                        <textarea value={v.intakeText} onChange={v.setIntakeText} rows="4" style={{border: "0", resize: "none", background: "#F4F6F5", borderRadius: "16px", padding: "12px 14px", fontFamily: "Inter,sans-serif", fontSize: "15px", lineHeight: "22px", color: "#202A30"}}>
                        </textarea>
                      </div>
                      {v.uploadFailed && (<>
                        <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "14px 16px", boxShadow: "0 0 0 1.5px #F1C9CB, 0 8px 24px rgba(32,42,48,0.06)", display: "flex", alignItems: "center", gap: "12px"}}>
                          <span style={{flex: "none", width: "44px", height: "44px", borderRadius: "999px", background: "#FBE9E9", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A8353A" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                              </path>
                              <circle cx="12" cy="13" r="4">
                              </circle>
                            </svg>
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Photo didn’t upload
                            </span>
                            <span style={{fontSize: "13px", lineHeight: "18px", color: "#5E6B73"}}>
                              The connection dropped. Your text is saved.
                            </span>
                          </span>
                          <button onClick={v.retryUpload} style={{height: "40px", padding: "0 16px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#202A30", color: "#FFFFFF", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                            Retry
                          </button>
                        </div>
                      </>)}
                      {v.uploadOk && (<>
                        <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "12px 16px 12px 12px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", alignItems: "center", gap: "12px"}}>
                          <img src={imgBellaBlanket} alt="Anna’s photo of Bella on a blanket" style={{flex: "none", width: "52px", height: "52px", borderRadius: "14px", objectFit: "cover"}} />
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              1 photo attached
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              Goes to Dr. Weber with your notes
                            </span>
                          </span>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                        </div>
                      </>)}
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "10px"}}>
                      <button onClick={v.go.waiting} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        Continue to the waiting room
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.waiting && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          Waiting room · 2 of 2
                        </span>
                      </div>
                      <div style={{position: "relative", height: "196px", display: "flex", justifyContent: "center"}}>
                        <span style={{position: "absolute", top: "12px", width: "184px", height: "184px", borderRadius: "999px", background: "#E6F5EE"}}>
                        </span>
                        <img src={imgBellaSitting} alt="Bella, a tricolor beagle, sitting" style={{position: "relative", width: "164px", height: "192px", objectFit: "contain", objectPosition: "bottom"}} />
                      </div>
                      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textAlign: "center"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                          Dr. Weber is reading your notes
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#5E6B73"}}>
                          You’re next. About 6 minutes.
                        </p>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Already with Dr. Weber
                        </span>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "21px"}}>
                            What you wrote, in your words
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "21px"}}>
                            {v.signsSummary}
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "21px"}}>
                            {v.photoLine}
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "21px"}}>
                            Bella’s record, incl. ear irritation in June
                          </span>
                        </div>
                      </div>
                      <div style={{background: "#E6F5EE", borderRadius: "24px", padding: "14px 16px", display: "flex", gap: "12px", alignItems: "center"}}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none"}}>
                          <rect x="2" y="6" width="14" height="12" rx="2">
                          </rect>
                          <path d="m16 10 6-3v10l-6-3">
                          </path>
                        </svg>
                        <span style={{fontSize: "14px", lineHeight: "20px"}}>
                          If the video drops, we switch to audio and keep the call going.
                        </span>
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "8px"}}>
                      <button onClick={v.go.vetIntake} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        See what Dr. Weber sees
                      </button>
                      <span style={{fontSize: "12px", color: "#5E6B73", textAlign: "center"}}>
                        Prototype shortcut to the vet’s screen
                      </span>
                    </div>
                  </div>
                </>)}
                {v.is.lock && (<>
                  <div style={{minHeight: "844px", position: "relative", background: "#2E3A3F", color: "#FFFFFF"}}>
                    <span style={{position: "absolute", left: "20px", bottom: "120px", fontSize: "11px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#D8DEE0"}}>
                      Owner’s own wallpaper · not our asset
                    </span>
                    <div style={{padding: "96px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px"}}>
                      <span style={{fontSize: "17px", fontWeight: "500", color: "#E8ECED"}}>
                        {v.lock.date}
                      </span>
                      <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "80px", lineHeight: "1.05", fontVariantNumeric: "tabular-nums"}}>
                        {v.lock.time}
                      </span>
                    </div>
                    <div style={{position: "absolute", left: "12px", right: "12px", top: "300px", display: "flex", flexDirection: "column", gap: "8px"}}>
                      <button onClick={v.lock.open} style={{textAlign: "left", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", color: "#202A30", background: "#FFFFFF", borderRadius: "24px", padding: "14px 16px", display: "flex", gap: "12px", boxShadow: "0 10px 28px rgba(0,0,0,0.20)"}}>
                        <span style={{flex: "none", width: "40px", height: "40px", borderRadius: "12px", background: "#A8DEC6", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="24" height="19" viewBox="0 0 40 32" aria-hidden="true">
                            <circle cx="14" cy="16" r="12" fill="#202A30">
                            </circle>
                            <circle cx="27" cy="16" r="9.5" fill="#FFFFFF" fillOpacity="0.85">
                            </circle>
                          </svg>
                        </span>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{display: "flex", justifyContent: "space-between"}}>
                            <span style={{fontSize: "13px", fontWeight: "600"}}>
                              PetDoc
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              now
                            </span>
                          </span>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            {v.lock.title}
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "21px", color: "#2F3A40"}}>
                            {v.lock.body}
                          </span>
                        </span>
                      </button>
                      <div style={{background: "#FFFFFF", borderRadius: "20px", overflow: "hidden", display: "flex", flexDirection: "column"}}>
                        {v.lock.actions.map((a, a_i) => (<React.Fragment key={a_i}>
                          <button onClick={a.go} style={{height: "48px", padding: "0 18px", border: "0", borderBottom: a.border, background: "#FFFFFF", textAlign: "left", cursor: "pointer", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "500"}}>
                            {a.label}
                          </button>
                        </React.Fragment>))}
                      </div>
                    </div>
                  </div>
                </>)}
                {v.is.summary && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{background: "#FFFFFF", borderRadius: "0 0 40px 40px", padding: "56px 20px 24px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 8px 24px rgba(32,42,48,0.05)"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                          Care summary
                        </span>
                        <button onClick={v.go.home} aria-label="Close" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round">
                            <path d="M18 6 6 18M6 6l12 12">
                            </path>
                          </svg>
                        </button>
                      </div>
                      <div style={{display: "flex", alignItems: "flex-end", gap: "12px"}}>
                        <div style={{flex: "1", display: "flex", flexDirection: "column", gap: "6px", paddingBottom: "8px"}}>
                          <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                            Bella’s care plan
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73", fontVariantNumeric: "tabular-nums"}}>
                            Dr. Lena Weber · Tue 10 Nov
                          </span>
                        </div>
                        <img src={imgBellaSitting} alt="Bella, a tricolor beagle, sitting" style={{flex: "none", width: "140px", height: "150px", objectFit: "contain", objectPosition: "bottom"}} />
                      </div>
                      <div style={{display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px"}}>
                        <span style={{background: "#F4F6F5", borderRadius: "18px", padding: "10px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px"}}>
                          <span style={{fontSize: "12px", color: "#5E6B73"}}>
                            Issue
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600"}}>
                            {v.condShort}
                          </span>
                        </span>
                        <span style={{background: "#F4F6F5", borderRadius: "18px", padding: "10px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px"}}>
                          <span style={{fontSize: "12px", color: "#5E6B73"}}>
                            Recovery
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", fontVariantNumeric: "tabular-nums"}}>
                            {v.windowLabel}
                          </span>
                        </span>
                        {v.rxOnTime && (<>
                          <span style={{background: "#F4F6F5", borderRadius: "18px", padding: "10px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px"}}>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              Rx arrives
                            </span>
                            <span style={{fontSize: "14px", fontWeight: "600"}}>
                              Wed
                            </span>
                          </span>
                        </>)}
                        {v.rxLate && (<>
                          <span style={{background: "#FBF0DC", borderRadius: "18px", padding: "10px 6px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px"}}>
                            <span style={{fontSize: "12px", color: "#8A5A10"}}>
                              Rx
                            </span>
                            <span style={{fontSize: "14px", fontWeight: "600", color: "#8A5A10"}}>
                              Delayed
                            </span>
                          </span>
                        </>)}
                      </div>
                    </div>
                    <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "14px"}}>
                      {v.sumNormal && (<>
                        <div style={{background: "#A8DEC6", borderRadius: "24px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 10px 24px rgba(72,170,130,0.25)"}}>
                          <div style={{display: "flex", gap: "14px", alignItems: "center"}}>
                            <span style={{flex: "none", width: "48px", height: "48px", borderRadius: "999px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center"}}>
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="5" width="18" height="16" rx="2">
                                </rect>
                                <path d="M16 3v4M8 3v4M3 10h18M9 15l2 2 4-4">
                                </path>
                              </svg>
                            </span>
                            <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                              <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "16px"}}>
                                {"We’ll check on Bella "}{v.checkDay}
                              </span>
                              <span style={{fontSize: "13px", lineHeight: "18px"}}>
                                One question. If she’s not better, Dr. Weber can look again.
                              </span>
                            </span>
                          </div>
                          {v.notifAsk && (<>
                            <button onClick={v.enableNotif} style={{height: "52px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#202A30", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9">
                                </path>
                                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0">
                                </path>
                              </svg>
                              Turn on reminders
                            </button>
                            <span style={{fontSize: "12px", lineHeight: "16px", textAlign: "center"}}>
                              One message about Bella, nothing else.
                            </span>
                          </>)}
                          {v.notifSet && (<>
                            <span style={{height: "52px", borderRadius: "999px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "15px", fontWeight: "600"}}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5">
                                </path>
                              </svg>
                              {"Reminder set for "}{v.checkDay}{" 09:00"}
                            </span>
                          </>)}
                        </div>
                      </>)}
                      {v.sumDelayed && (<>
                        <div style={{background: "#A8DEC6", borderRadius: "24px", padding: "18px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 10px 24px rgba(72,170,130,0.25)"}}>
                          <div style={{display: "flex", gap: "14px", alignItems: "center"}}>
                            <span style={{flex: "none", width: "48px", height: "48px", borderRadius: "999px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center"}}>
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 8 12 3 3 8v8l9 5 9-5z">
                                </path>
                                <path d="M3 8l9 5 9-5M12 13v8">
                                </path>
                              </svg>
                            </span>
                            <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                              <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "16px"}}>
                                Check-in moved to Saturday
                              </span>
                              <span style={{fontSize: "13px", lineHeight: "18px"}}>
                                Bella’s meds now arrive Thursday. We’ll ask 2 days after she starts them.
                              </span>
                            </span>
                          </div>
                          <span style={{fontSize: "14px", fontWeight: "600", textDecoration: "underline", paddingLeft: "62px"}}>
                            Track delivery
                          </span>
                        </div>
                      </>)}
                      {v.sumEmail && (<>
                        <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", gap: "14px", alignItems: "center"}}>
                          <span style={{flex: "none", width: "48px", height: "48px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="5" width="18" height="14" rx="2">
                              </rect>
                              <path d="m3 7 9 6 9-6">
                              </path>
                            </svg>
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "16px"}}>
                              {v.checkDay}’s check-in comes by email
                            </span>
                            <span style={{fontSize: "13px", lineHeight: "18px", color: "#2F3A40"}}>
                              Notifications are off, so we’ll email you instead. It’s also waiting here in the app.
                            </span>
                          </span>
                        </div>
                      </>)}
                      {v.sumOff && (<>
                        <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "4px"}}>
                          <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "16px"}}>
                            No check-in needed this time
                          </span>
                          <span style={{fontSize: "13px", lineHeight: "18px", color: "#2F3A40"}}>
                            If anything changes, book a consultation. Dr. Weber’s notes come with it.
                          </span>
                        </div>
                      </>)}
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "6px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          What’s going on
                        </span>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "17px", fontWeight: "600"}}>
                          Upset stomach
                        </span>
                        <span style={{fontSize: "15px", lineHeight: "22px"}}>
                          Mild gastroenteritis. Common in dogs and usually settles within 3 days.
                        </span>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Care at home
                        </span>
                        <div style={{display: "flex", gap: "12px", alignItems: "flex-start"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F5EE", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            1
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            Small, bland meals (rice + boiled chicken) for 3 days.
                          </span>
                        </div>
                        <div style={{display: "flex", gap: "12px", alignItems: "flex-start"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F5EE", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            2
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            Fresh water available at all times.
                          </span>
                        </div>
                        <div style={{display: "flex", gap: "12px", alignItems: "flex-start"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F5EE", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            3
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            Probiotic paste once a day with food.
                          </span>
                        </div>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "10px"}}>
                        <span style={{display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "15px", fontWeight: "600", color: "#A8353A"}}>
                          <span style={{width: "32px", height: "32px", borderRadius: "999px", background: "#FBE9E9", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 3 2 20h20z">
                              </path>
                              <path d="M12 10v4">
                              </path>
                              <path d="M12 17h.01">
                              </path>
                            </svg>
                          </span>
                          Get help right away if Bella
                        </span>
                        {v.ownerFlags.map((fl, fl_i) => (<React.Fragment key={fl_i}>
                          <span style={{fontSize: "15px", lineHeight: "22px", paddingLeft: "40px"}}>
                            {fl.text}
                          </span>
                        </React.Fragment>))}
                      </div>
                      <div style={{paddingTop: "6px", display: "flex", flexDirection: "column", gap: "6px"}}>
                        <button onClick={v.go.push} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                          Got it
                        </button>
                        <button onClick={v.go.rate} style={{alignSelf: "center", border: "0", background: "transparent", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600", color: "#066A75", padding: "12px 0"}}>
                          Rate today’s call
                        </button>
                      </div>
                    </div>
                  </div>
                </>)}
                {v.is.checkin && (<>
                  <div style={{width: "390px", height: "844px", position: "relative", overflow: "hidden", background: "#FFFFFF"}}>
                    <div style={{position: "absolute", left: "20px", right: "20px", top: "56px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                      <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600", fontVariantNumeric: "tabular-nums"}}>
                        {v.checkinPill}
                      </span>
                      <button onClick={v.go.home} aria-label="Close" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round">
                          <path d="M18 6 6 18M6 6l12 12">
                          </path>
                        </svg>
                      </button>
                    </div>
                    <span style={{position: "absolute", left: "75px", top: "150px", width: "240px", height: "240px", borderRadius: "999px", background: "#E6F5EE"}}>
                    </span>
                    <img src={imgBellaSitting} alt="Bella, a tricolor beagle, sitting" style={{position: "absolute", left: "85px", top: "128px", width: "220px", height: "252px", objectFit: "contain", objectPosition: "bottom"}} />
                    <div style={{position: "absolute", left: "0", right: "0", top: "380px", bottom: "0", background: "#F4F6F5", borderRadius: "48px 48px 0 0", padding: "28px 20px 0", display: "flex", flexDirection: "column", gap: "20px"}}>
                      <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textAlign: "center"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          How is Bella today?
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#5E6B73"}}>
                          Compared with Tuesday’s call with Dr. Weber
                        </p>
                      </div>
                      <div style={{display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "10px"}}>
                        <button onClick={v.go.better} style={{border: "0", cursor: "pointer", color: "#202A30", height: "108px", borderRadius: "28px", background: "#FFFFFF", boxShadow: "0 8px 24px rgba(32,42,48,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                          <span style={{width: "44px", height: "44px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 17 17 7M8 7h9v9">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                            Better
                          </span>
                        </button>
                        <button onClick={v.go.same} style={{border: "0", cursor: "pointer", color: "#202A30", height: "108px", borderRadius: "28px", background: "#FFFFFF", boxShadow: "0 8px 24px rgba(32,42,48,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                          <span style={{width: "44px", height: "44px", borderRadius: "999px", background: "#EEF1F1", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4F5B62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M13 6l6 6-6 6">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                            Same
                          </span>
                        </button>
                        <button onClick={v.go.worse} style={{border: "0", cursor: "pointer", color: "#202A30", height: "108px", borderRadius: "28px", background: "#FFFFFF", boxShadow: "0 8px 24px rgba(32,42,48,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                          <span style={{width: "44px", height: "44px", borderRadius: "999px", background: "#FBE9E9", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8353A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 7l10 10M17 8v9H8">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                            Worse
                          </span>
                        </button>
                      </div>
                      <div style={{display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "10px"}}>
                        <button onClick={v.togglePhoto} style={{height: "52px", borderRadius: "999px", border: "0", cursor: "pointer", boxShadow: "0 4px 14px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: v.photoBg}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                            </path>
                            <circle cx="12" cy="13" r="4">
                            </circle>
                          </svg>
                          {v.photoLabel}
                        </button>
                        <button onClick={v.toggleNote} style={{height: "52px", borderRadius: "999px", border: "0", cursor: "pointer", boxShadow: "0 4px 14px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: v.noteBg}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9">
                            </path>
                            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z">
                            </path>
                          </svg>
                          {v.noteLabel}
                        </button>
                      </div>
                      {v.attachAny && (<>
                        <div style={{display: "flex", alignItems: "center", gap: "12px", background: "#FFFFFF", borderRadius: "18px", padding: "8px", marginTop: "-6px"}}>
                          {v.photoAdded && (<>
                            <img src={imgBellaBlanket} alt="Anna’s photo of Bella on a blanket" style={{flex: "none", width: "48px", height: "48px", borderRadius: "12px", objectFit: "cover"}} />
                          </>)}
                          <span style={{flex: "1", fontSize: "13px", lineHeight: "18px", color: "#2F3A40", paddingLeft: "4px"}}>
                            {v.attachLine}
                          </span>
                        </div>
                      </>)}
                      <span style={{fontSize: "13px", lineHeight: "18px", color: "#5E6B73", textAlign: "center", marginTop: "-8px"}}>
                        Optional. Anything you add goes straight to Dr. Weber.
                      </span>
                    </div>
                  </div>
                </>)}
                {v.is.better && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{background: "#FFFFFF", borderRadius: "0 0 48px 48px", padding: "64px 20px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center"}}>
                      <div style={{position: "relative", width: "180px", height: "180px"}}>
                        <span style={{position: "absolute", inset: "10px", borderRadius: "999px", background: "#E6F5EE"}}>
                        </span>
                        <img src={imgBellaHappy} alt="Bella looking happy with her tongue out" style={{position: "absolute", left: "6px", top: "0", width: "168px", height: "172px", objectFit: "contain", objectPosition: "bottom"}} />
                        <span style={{position: "absolute", right: "6px", bottom: "6px", width: "48px", height: "48px", borderRadius: "999px", background: "#2F855A", border: "4px solid #FFFFFF", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                        </span>
                      </div>
                      <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                        So glad Bella’s feeling better
                      </h1>
                      <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#5E6B73"}}>
                        Case closed and saved to her record, so the next vet already knows the story.
                      </p>
                    </div>
                    <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "15px", fontWeight: "600", lineHeight: "22px"}}>
                          Did Dr. Weber already know Bella when the call started?
                        </span>
                        {v.knewUnanswered && (<>
                          <div style={{display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "8px"}}>
                            <button onClick={v.answerYes} style={{height: "44px", borderRadius: "999px", border: "0", background: "#F4F6F5", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600", cursor: "pointer"}}>
                              Yes
                            </button>
                            <button onClick={v.answerNo} style={{height: "44px", borderRadius: "999px", border: "0", background: "#F4F6F5", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600", cursor: "pointer"}}>
                              Not really
                            </button>
                          </div>
                        </>)}
                        {v.knewAnswered && (<>
                          <span style={{display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "600", color: "#256B48"}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                            Thanks, that helps us improve
                          </span>
                        </>)}
                      </div>
                      <button onClick={v.go.record} style={{textAlign: "left", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", color: "#202A30", background: "#E6F5EE", borderRadius: "24px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px", width: "100%"}}>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "8px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            {"Bella’s profile is "}{v.profilePct}{" done"}
                          </span>
                          <span style={{height: "8px", borderRadius: "999px", background: "#FFFFFF", overflow: "hidden", display: "block"}}>
                            <span style={{display: "block", height: "8px", borderRadius: "999px", background: "#066A75", width: v.profileWidth}}>
                            </span>
                          </span>
                          <span style={{fontSize: "13px", lineHeight: "18px", color: "#2F3A40"}}>
                            {v.profileHint}
                          </span>
                        </span>
                        <span style={{flex: "none", width: "44px", height: "44px", borderRadius: "999px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 6 6 6-6 6">
                            </path>
                          </svg>
                        </span>
                      </button>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "10px"}}>
                      <button onClick={v.go.home} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        Done
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.same && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 34px", display: "flex", flexDirection: "column", gap: "20px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", gap: "6px", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F5B62" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 6l6 6-6 6">
                            </path>
                          </svg>
                          About the same
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          That’s still expected
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          {"Dr. Weber expected Bella to improve within "}{v.windowLabel}{", so until "}
                          <strong style={{fontWeight: "600"}}>
                            {v.winEnd}
                          </strong>
                          . Keep going with the bland meals.
                        </p>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "20px 18px 16px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <div style={{position: "relative", height: "26px"}}>
                          <span style={{position: "absolute", left: "0", right: "0", top: "9px", height: "8px", borderRadius: "999px", background: "#E6F5EE"}}>
                          </span>
                          <span style={{position: "absolute", left: "0", width: "66%", top: "9px", height: "8px", borderRadius: "999px", background: "#A8DEC6"}}>
                          </span>
                          <span style={{position: "absolute", left: "calc(66% - 13px)", top: "0", width: "26px", height: "26px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 2px 8px rgba(32,42,48,0.2)", border: "4px solid #066A75", boxSizing: "border-box"}}>
                          </span>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", fontSize: "12px", color: "#5E6B73"}}>
                          <span>
                            Tue · call
                          </span>
                          <span style={{textAlign: "center"}}>
                            Wed
                          </span>
                          <span style={{textAlign: "center", fontWeight: "600", color: "#066A75"}}>
                            Today
                          </span>
                          <span style={{textAlign: "right"}}>
                            {v.winEndShort}
                          </span>
                        </div>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "16px"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                          <span style={{flex: "none", width: "52px", height: "52px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "15px"}}>
                            LW
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Want Dr. Weber to look again?
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              Today 16:30 · Bella’s notes attached
                            </span>
                          </span>
                        </div>
                        <button onClick={v.go.recheck} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                          Book a re-check
                        </button>
                      </div>
                      <button onClick={v.go.snoozed} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 6px 18px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9">
                          </path>
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0">
                          </path>
                        </svg>
                        Ask me again on Saturday
                      </button>
                      <div style={{display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap"}}>
                        <button onClick={v.go.ask} style={{border: "0", background: "transparent", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600", color: "#066A75", padding: "10px 0"}}>
                          Just a quick question?
                        </button>
                        <button onClick={v.go.summary} style={{border: "0", background: "transparent", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600", color: "#A8353A", padding: "10px 0", display: "inline-flex", alignItems: "center", gap: "6px"}}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3 2 20h20z">
                            </path>
                            <path d="M12 10v4">
                            </path>
                            <path d="M12 17h.01">
                            </path>
                          </svg>
                          Warning signs
                        </button>
                      </div>
                    </div>
                  </div>
                </>)}
                {v.is.sameLate && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 34px", display: "flex", flexDirection: "column", gap: "20px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", gap: "6px", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F5B62" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 6l6 6-6 6">
                            </path>
                          </svg>
                          {"Still the same · "}{v.lateDay}
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          Bella should be improving by now
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          {"Dr. Weber expected her to be better by "}{v.winEnd}. It’s worth having another look.
                        </p>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "20px 18px 16px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <div style={{position: "relative", height: "26px"}}>
                          <span style={{position: "absolute", left: "0", right: "0", top: "9px", height: "8px", borderRadius: "999px", background: "#FBF0DC"}}>
                          </span>
                          <span style={{position: "absolute", left: "0", width: "75%", top: "9px", height: "8px", borderRadius: "999px", background: "#A8DEC6"}}>
                          </span>
                          <span style={{position: "absolute", left: "75%", top: "4px", width: "3px", height: "18px", borderRadius: "2px", background: "#066A75"}}>
                          </span>
                          <span style={{position: "absolute", right: "0", top: "0", width: "26px", height: "26px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 2px 8px rgba(32,42,48,0.2)", border: "4px solid #D99A32", boxSizing: "border-box"}}>
                          </span>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", fontSize: "12px", color: "#5E6B73"}}>
                          <span>
                            Tue · call
                          </span>
                          <span style={{textAlign: "center"}}>
                            Wed
                          </span>
                          <span style={{textAlign: "right", paddingRight: "8px"}}>
                            {v.winEndShort}{" · expected"}
                          </span>
                          <span style={{textAlign: "right", fontWeight: "600", color: "#8A5A10"}}>
                            Today
                          </span>
                        </div>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 0 0 2px #A8DEC6, 0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "16px"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                          <span style={{flex: "none", width: "52px", height: "52px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "15px"}}>
                            LW
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Recommended: re-check today
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              Dr. Weber · 11:00 · notes attached
                            </span>
                          </span>
                        </div>
                        <button onClick={v.go.recheck} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                          Book a re-check
                        </button>
                      </div>
                      <button onClick={v.go.summary} style={{alignSelf: "center", border: "0", background: "transparent", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600", color: "#A8353A", padding: "10px 0", display: "inline-flex", alignItems: "center", gap: "8px"}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3 2 20h20z">
                          </path>
                          <path d="M12 10v4">
                          </path>
                          <path d="M12 17h.01">
                          </path>
                        </svg>
                        Warning signs to watch for
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.snoozed && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{background: "#FFFFFF", borderRadius: "0 0 48px 48px", padding: "112px 20px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center"}}>
                      <span style={{width: "88px", height: "88px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9">
                          </path>
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0">
                          </path>
                        </svg>
                      </span>
                      <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                        We’ll ask again on Saturday
                      </h1>
                      <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#5E6B73"}}>
                        One message at 09:00, then we stop. Until then, keep going with the bland meals.
                      </p>
                    </div>
                    <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
                      <button onClick={v.go.recheck} style={{textAlign: "left", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", color: "#202A30", background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Changed your mind?
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Book a re-check with Dr. Weber now
                          </span>
                        </span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 6 6 6-6 6">
                          </path>
                        </svg>
                      </button>
                      <button onClick={v.go.tracker} style={{textAlign: "left", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", color: "#202A30", background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Log how she’s doing
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Appetite, stool, energy. Dr. Weber sees it.
                          </span>
                        </span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 6 6 6-6 6">
                          </path>
                        </svg>
                      </button>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px"}}>
                      <button onClick={v.go.home} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        Done
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.worse && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "20px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", gap: "6px", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FBE9E9", color: "#A8353A", fontSize: "13px", fontWeight: "600"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 7l10 10M17 8v9H8">
                            </path>
                          </svg>
                          Worse
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          Let’s check a few things first
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          Three questions so we send you to the right care, fast.
                        </p>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        {v.questions.map((q, q_i) => (<React.Fragment key={q_i}>
                          <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600", lineHeight: "22px"}}>
                              {q.text}
                            </span>
                            <div style={{display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "8px"}}>
                              {q.yesOn && (<>
                                <button aria-pressed="true" onClick={q.pickYes} style={{height: "44px", borderRadius: "999px", border: "0", background: "#A8DEC6", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "700", cursor: "pointer"}}>
                                  Yes
                                </button>
                              </>)}
                              {q.yesOff && (<>
                                <button aria-pressed="false" onClick={q.pickYes} style={{height: "44px", borderRadius: "999px", border: "0", background: "#F4F6F5", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "500", cursor: "pointer"}}>
                                  Yes
                                </button>
                              </>)}
                              {q.noOn && (<>
                                <button aria-pressed="true" onClick={q.pickNo} style={{height: "44px", borderRadius: "999px", border: "0", background: "#A8DEC6", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "700", cursor: "pointer"}}>
                                  No
                                </button>
                              </>)}
                              {q.noOff && (<>
                                <button aria-pressed="false" onClick={q.pickNo} style={{height: "44px", borderRadius: "999px", border: "0", background: "#F4F6F5", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "500", cursor: "pointer"}}>
                                  No
                                </button>
                              </>)}
                            </div>
                          </div>
                        </React.Fragment>))}
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "10px"}}>
                      {v.wReady && (<>
                        <span style={{fontSize: "13px", lineHeight: "18px", color: "#5E6B73", textAlign: "center"}}>
                          {v.wHint}
                        </span>
                        <button onClick={v.wNext} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                          Continue
                        </button>
                      </>)}
                      {v.wNotReady && (<>
                        <span style={{fontSize: "13px", lineHeight: "18px", color: "#5E6B73", textAlign: "center"}}>
                          Answer all three to continue
                        </span>
                        <span aria-disabled="true" style={{height: "56px", borderRadius: "999px", background: "#E3E8E6", color: "#4F5B62", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                          Continue
                        </span>
                      </>)}
                    </div>
                  </div>
                </>)}
                {v.is.redflag && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 34px", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m15 6-6 6 6 6">
                          </path>
                        </svg>
                      </button>
                      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <span style={{alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "6px", height: "32px", padding: "0 12px", borderRadius: "999px", background: "#FBE9E9", color: "#A8353A", fontSize: "13px", fontWeight: "600"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 3 2 20h20z">
                            </path>
                            <path d="M12 10v4">
                            </path>
                            <path d="M12 17h.01">
                            </path>
                          </svg>
                          Needs an in-person exam
                        </span>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                          Let’s get Bella checked today
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          Try not to worry: this is usually very treatable. But “{v.redReason}” needs a vet to examine her in person.
                        </p>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", overflow: "hidden", boxShadow: "0 8px 24px rgba(32,42,48,0.06)"}}>
                        <div style={{height: "112px", position: "relative", background: "#EEF2F0", overflow: "hidden"}}>
                          <svg width="100%" height="112" viewBox="0 0 350 150" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map: you are 2.4 km from the emergency clinic">
                            <rect x="0" y="0" width="350" height="150" fill="#EEF2F0">
                            </rect>
                            <path d="M-10 118 C 60 100, 110 132, 180 112 S 300 92, 360 104" fill="none" stroke="#CFE3EA" strokeWidth="16" strokeLinecap="round">
                            </path>
                            <rect x="232" y="14" width="86" height="58" rx="14" fill="#D9ECDF">
                            </rect>
                            <rect x="18" y="20" width="62" height="40" rx="10" fill="#D9ECDF">
                            </rect>
                            <path d="M0 46 H350" stroke="#FFFFFF" strokeWidth="9">
                            </path>
                            <path d="M0 84 H350" stroke="#FFFFFF" strokeWidth="6">
                            </path>
                            <path d="M120 0 V150" stroke="#FFFFFF" strokeWidth="9">
                            </path>
                            <path d="M210 0 V150" stroke="#FFFFFF" strokeWidth="6">
                            </path>
                            <path d="M40 150 L160 0" stroke="#FFFFFF" strokeWidth="5">
                            </path>
                            <path d="M300 0 V150" stroke="#FFFFFF" strokeWidth="5">
                            </path>
                            <path d="M62 116 C 90 100, 112 92, 120 84 L 210 84 L 210 46 L 268 46" fill="none" stroke="#066A75" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 8">
                            </path>
                            <circle cx="62" cy="116" r="11" fill="#066A75" fillOpacity="0.18">
                            </circle>
                            <circle cx="62" cy="116" r="6" fill="#066A75" stroke="#FFFFFF" strokeWidth="2.5">
                            </circle>
                            <path d="M268 46 c -11 -12 -11 -26 0 -26 s 11 14 0 26 z" transform="translate(0 -6)" fill="#A8353A">
                            </path>
                            <circle cx="268" cy="21" r="4.5" fill="#FFFFFF">
                            </circle>
                          </svg>
                          <span style={{position: "absolute", left: "12px", top: "12px", display: "inline-flex", alignItems: "center", height: "28px", padding: "0 12px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 2px 8px rgba(32,42,48,0.12)", fontSize: "12px", fontWeight: "600"}}>
                            8 min by car
                          </span>
                        </div>
                        <div style={{padding: "14px 18px 16px", display: "flex", flexDirection: "column", gap: "12px"}}>
                          <div style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                              Nearest emergency clinic
                            </span>
                            <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "17px", fontWeight: "600"}}>
                              [Clinic name]
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              2.4 km · open 24 hours
                            </span>
                          </div>
                          <div style={{display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "8px"}}>
                            <button style={{height: "52px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#066A75", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z">
                                </path>
                              </svg>
                              Call clinic
                            </button>
                            <button style={{height: "52px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#F4F6F5", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                              Directions
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                          What to do now
                        </span>
                        <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#A8DEC6", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            1
                          </span>
                          <span style={{fontSize: "14px", lineHeight: "20px"}}>
                            Call ahead so the clinic is ready for her
                          </span>
                        </div>
                        <button onClick={v.go.share} style={{display: "flex", gap: "12px", alignItems: "center", border: "0", background: "transparent", padding: "0", cursor: "pointer", textAlign: "left", fontFamily: "Inter,sans-serif", color: "#202A30"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F5EE", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            2
                          </span>
                          <span style={{flex: "1", fontSize: "14px", lineHeight: "20px"}}>
                            {"Show "}
                            <span style={{color: "#066A75", fontWeight: "600", textDecoration: "underline"}}>
                              Bella’s notes
                            </span>
                            {" at the desk"}
                          </span>
                        </button>
                        <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F5EE", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            3
                          </span>
                          <span style={{fontSize: "14px", lineHeight: "20px"}}>
                            Keep her calm and warm on the way
                          </span>
                        </div>
                        <span style={{fontSize: "13px", lineHeight: "18px", color: "#5E6B73", borderTop: "1px solid #EEF1F0", paddingTop: "10px"}}>
                          We’ll check on Bella tomorrow to see how the visit went.
                        </span>
                      </div>
                    </div>
                  </div>
                </>)}
                {v.is.priority && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5", position: "relative"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", gap: "6px", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FBF0DC", color: "#8A5A10", fontSize: "13px", fontWeight: "600"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9">
                            </circle>
                            <path d="M12 7v5l3 2">
                            </path>
                          </svg>
                          Priority
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                          Let’s get Bella seen within 2 hours
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          {v.prBody}
                        </p>
                      </div>
                      {v.vets.map((v, v_i) => (<React.Fragment key={v_i}>
                        <button onClick={v.pick} style={{textAlign: "left", border: "0", cursor: "pointer", background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px", fontFamily: "Inter,sans-serif", color: "#202A30", boxShadow: v.shadow}}>
                          <span style={{flex: "none", width: "52px", height: "52px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "15px"}}>
                            {v.initials}
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              {v.name}
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              {v.sub}
                            </span>
                          </span>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", display: "flex", alignItems: "center", justifyContent: "center", background: v.dot}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={v.stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                        </button>
                      </React.Fragment>))}
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "14px 16px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "6px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Shared with the vet
                        </span>
                        <span style={{fontSize: "14px", lineHeight: "20px"}}>
                          Tuesday’s notes · today’s check-in: worse · red-flag answers: none
                        </span>
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "10px"}}>
                      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0 6px"}}>
                        <span style={{fontSize: "13px", color: "#5E6B73"}}>
                          Standard consultation price
                        </span>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "18px", fontWeight: "600"}}>
                          €39
                        </span>
                      </div>
                      <button onClick={v.prBook} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        {v.prCta}
                      </button>
                    </div>
                    {v.prBooked && (<>
                      <div style={{position: "absolute", inset: "0", background: "#F4F6F5", display: "flex", flexDirection: "column", zIndex: "2"}}>
                        <div style={{background: "#FFFFFF", borderRadius: "0 0 48px 48px", padding: "120px 20px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center"}}>
                          <span style={{width: "88px", height: "88px", borderRadius: "999px", background: "#A8DEC6", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <h2 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                            Re-check booked
                          </h2>
                          <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#5E6B73"}}>
                            {v.prConfirm}
                          </p>
                        </div>
                        <div style={{padding: "20px"}}>
                          <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", gap: "12px", alignItems: "flex-start"}}>
                            <span style={{flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#FBE9E9", display: "flex", alignItems: "center", justifyContent: "center"}}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A8353A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 3 2 20h20z">
                                </path>
                                <path d="M12 10v4">
                                </path>
                                <path d="M12 17h.01">
                                </path>
                              </svg>
                            </span>
                            <span style={{fontSize: "14px", lineHeight: "20px"}}>
                              If she stops drinking, shows blood, or can’t stand before then, go to an emergency clinic.
                            </span>
                          </div>
                        </div>
                        <div style={{marginTop: "auto", padding: "20px 20px 34px"}}>
                          <button onClick={v.go.vetRecheck} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                            Done
                          </button>
                        </div>
                      </div>
                    </>)}
                  </div>
                </>)}
                {v.is.recheck && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "20px"}}>
                          Re-check for Bella
                        </span>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                          <span style={{flex: "none", width: "56px", height: "56px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "16px"}}>
                            LW
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Dr. Lena Weber
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              Saw Bella on Tuesday
                            </span>
                          </span>
                          <span style={{display: "inline-flex", alignItems: "center", height: "30px", padding: "0 12px", borderRadius: "999px", background: "#E6F5EE", fontSize: "12px", fontWeight: "600"}}>
                            Same vet
                          </span>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px"}}>
                          {v.slots.map((s, s_i) => (<React.Fragment key={s_i}>
                            <button onClick={s.pick} style={{height: "44px", borderRadius: "999px", border: "0", cursor: "pointer", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontVariantNumeric: "tabular-nums", background: s.bg, fontWeight: s.fw}}>
                              {s.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                        <span style={{fontSize: "13px", color: "#5E6B73"}}>
                          Today, Thu 12 Nov · video call
                        </span>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Dr. Weber will already have
                        </span>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px"}}>
                            Tuesday’s notes and diagnosis
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px"}}>
                            {v.answerLine}
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px"}}>
                            Probiotic paste, delivered Wed
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "12px", background: "#F4F6F5", borderRadius: "18px", padding: "8px"}}>
                          <img src={imgBellaBlanket} alt="Owner’s photo of Bella lying on a blanket" style={{flex: "none", width: "60px", height: "60px", borderRadius: "14px", objectFit: "cover"}} />
                          <span style={{flex: "1", fontSize: "13px", lineHeight: "18px", color: "#2F3A40"}}>
                            “Ate a little this morning, still loose stool.”
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "12px"}}>
                      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0 6px"}}>
                        <span style={{fontSize: "13px", color: "#5E6B73"}}>
                          Standard consultation price
                        </span>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "18px", fontWeight: "600"}}>
                          €39
                        </span>
                      </div>
                      <button onClick={v.go.booked} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        {"Book re-check · "}{v.slot}
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.booked && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{background: "#FFFFFF", borderRadius: "0 0 48px 48px", padding: "88px 20px 28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center"}}>
                      <div style={{position: "relative", width: "132px", height: "132px"}}>
                        <span style={{position: "absolute", inset: "0", borderRadius: "999px", background: "#E6F5EE"}}>
                        </span>
                        <img src={imgBella} alt="Bella" style={{position: "absolute", left: "16px", top: "12px", width: "100px", height: "108px", objectFit: "contain", objectPosition: "bottom"}} />
                        <span style={{position: "absolute", right: "-4px", bottom: "0", width: "48px", height: "48px", borderRadius: "999px", background: "#A8DEC6", border: "4px solid #FFFFFF", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="5" width="18" height="16" rx="2">
                            </rect>
                            <path d="M16 3v4M8 3v4M3 10h18M9 15l2 2 4-4">
                            </path>
                          </svg>
                        </span>
                      </div>
                      <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                        Re-check booked
                      </h1>
                      <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#5E6B73"}}>
                        Dr. Weber will have everything about Bella ready before the call.
                      </p>
                    </div>
                    <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                          <span style={{flex: "none", width: "52px", height: "52px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "15px"}}>
                            LW
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Dr. Lena Weber
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              Video call
                            </span>
                          </span>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "8px"}}>
                          <span style={{background: "#F4F6F5", borderRadius: "18px", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px"}}>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              Today
                            </span>
                            <span style={{fontSize: "15px", fontWeight: "600", fontVariantNumeric: "tabular-nums"}}>
                              {v.slot}
                            </span>
                          </span>
                          <span style={{background: "#F4F6F5", borderRadius: "18px", padding: "10px", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px"}}>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              Price
                            </span>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              €39
                            </span>
                          </span>
                        </div>
                      </div>
                      <div style={{background: "#E6F5EE", borderRadius: "24px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px"}}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none"}}>
                          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9">
                          </path>
                          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0">
                          </path>
                        </svg>
                        <span style={{fontSize: "14px", lineHeight: "20px"}}>
                          We’ll remind you 10 minutes before. Have Bella nearby.
                        </span>
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "10px"}}>
                      <button style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 6px 18px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                        Add to calendar
                      </button>
                      <button onClick={v.go.vetRecheck} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        Done
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.expired && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 34px", display: "flex", flexDirection: "column", gap: "20px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          {"Day 6 · "}{v.condShort}
                        </span>
                        <button onClick={v.go.home} aria-label="Close" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round">
                            <path d="M18 6 6 18M6 6l12 12">
                            </path>
                          </svg>
                        </button>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "12px", paddingTop: "24px"}}>
                        <span style={{width: "64px", height: "64px", borderRadius: "999px", background: "#EEF1F1", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4F5B62" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9">
                            </circle>
                            <path d="M12 7v5l3 2">
                            </path>
                          </svg>
                        </span>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          This check-in has closed
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          We asked about Bella more than 3 days ago, so this answer would be out of date. How is she now?
                        </p>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <span style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Still worried about her?
                          </span>
                          <span style={{fontSize: "13px", lineHeight: "18px", color: "#5E6B73"}}>
                            Book a consultation. Dr. Weber’s notes come with it.
                          </span>
                        </span>
                        <button onClick={v.go.recheck} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                          Book a consultation
                        </button>
                      </div>
                      <button onClick={v.go.better} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 6px 18px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                        She’s fine now, close the case
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.rate && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "20px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          Tue 10 Nov · Dr. Weber
                        </span>
                        <button onClick={v.go.home} aria-label="Close" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round">
                            <path d="M18 6 6 18M6 6l12 12">
                            </path>
                          </svg>
                        </button>
                      </div>
                      <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                        How was today’s call?
                      </h1>
                      <div style={{display: "flex", gap: "8px"}}>
                        {v.stars.map((s, s_i) => (<React.Fragment key={s_i}>
                          <button onClick={s.pick} aria-label="Star" style={{width: "52px", height: "52px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.08)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="26" height="26" viewBox="0 0 24 24">
                              <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z" fill={s.fill}>
                              </path>
                            </svg>
                          </button>
                        </React.Fragment>))}
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "15px", fontWeight: "600", lineHeight: "22px"}}>
                          Did Dr. Weber already know Bella when the call started?
                        </span>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px"}}>
                          {v.rateOpts.map((o, o_i) => (<React.Fragment key={o_i}>
                            <button onClick={o.pick} style={{height: "44px", borderRadius: "999px", border: "0", cursor: "pointer", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "14px", background: o.bg, fontWeight: o.fw}}>
                              {o.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                        {v.rateRepeat && (<>
                          <span style={{fontSize: "13px", lineHeight: "18px", color: "#2F3A40", paddingTop: "4px"}}>
                            Sorry about that. What did you have to repeat?
                          </span>
                          <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                            {v.repeatedOpts.map((o, o_i) => (<React.Fragment key={o_i}>
                              <button onClick={o.toggle} style={{height: "40px", padding: "0 14px", borderRadius: "999px", border: "0", cursor: "pointer", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "14px", background: o.bg, fontWeight: o.fw}}>
                                {o.label}
                              </button>
                            </React.Fragment>))}
                          </div>
                        </>)}
                      </div>
                      <button onClick={v.go.recovery} style={{textAlign: "left", border: "0", cursor: "pointer", fontFamily: "Inter,sans-serif", color: "#202A30", background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                        <span style={{flex: "none", width: "40px", height: "40px", borderRadius: "999px", background: "#FBF0DC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8A5A10" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="6" width="14" height="12" rx="2">
                            </rect>
                            <path d="m16 10 6-3v10l-6-3">
                            </path>
                          </svg>
                        </span>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Something went wrong?
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Video, upload or delivery problems
                          </span>
                        </span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 6 6 6-6 6">
                          </path>
                        </svg>
                      </button>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px"}}>
                      <button onClick={v.go.home} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        Send
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.recovery && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "20px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FBF0DC", color: "#8A5A10", fontSize: "13px", fontWeight: "600"}}>
                          Your call on Tuesday
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "12px", paddingTop: "8px"}}>
                        <span style={{width: "64px", height: "64px", borderRadius: "999px", background: "#FBF0DC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8A5A10" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="6" width="14" height="12" rx="2">
                            </rect>
                            <path d="m16 10 6-3v10l-6-3">
                            </path>
                          </svg>
                        </span>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          Sorry your call kept dropping
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          The video cut out twice while you were talking to Dr. Weber. That was our fault, and here is what we’ve done about it.
                        </p>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <div style={{display: "flex", alignItems: "flex-start", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            Dr. Weber’s notes are saved, so no one will ask you again
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "flex-start", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            Your next call skips the queue
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "flex-start", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            If video struggles again, we switch to audio automatically
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "flex-start", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            {"We’ll still check on Bella "}{v.checkDay}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "10px"}}>
                      <button onClick={v.go.recheck} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        Finish the conversation now
                      </button>
                      <button onClick={v.go.home} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 6px 18px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                        We’re fine, thanks
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.record && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{background: "#FFFFFF", borderRadius: "0 0 40px 40px", padding: "56px 20px 22px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 8px 24px rgba(32,42,48,0.05)"}}>
                      <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "20px"}}>
                          Bella’s record
                        </span>
                      </div>
                      <div style={{display: "flex", alignItems: "center", gap: "14px"}}>
                        <span style={{flex: "none", width: "72px", height: "72px", borderRadius: "999px", background: "#E6F5EE", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                          <img src={imgBella} alt="Bella" style={{width: "62px", height: "66px", objectFit: "contain", objectPosition: "bottom"}} />
                        </span>
                        <div style={{flex: "1", display: "flex", flexDirection: "column", gap: "6px"}}>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Beagle · female, spayed · 3 yrs · 11.8 kg
                          </span>
                          <span style={{height: "8px", borderRadius: "999px", background: "#E6F5EE", overflow: "hidden", display: "block"}}>
                            <span style={{display: "block", height: "8px", borderRadius: "999px", background: "#066A75", width: v.profileWidth}}>
                            </span>
                          </span>
                          <span style={{fontSize: "13px", fontWeight: "600"}}>
                            {"Profile "}{v.profilePct}{" complete"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "14px"}}>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Every vet sees this first
                        </span>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", paddingBottom: "12px", borderBottom: "1px solid #EEF1F0"}}>
                          <span style={{fontSize: "15px"}}>
                            Current meds
                          </span>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Probiotic paste
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", paddingBottom: "12px", borderBottom: "1px solid #EEF1F0"}}>
                          <span style={{fontSize: "15px"}}>
                            Allergies
                          </span>
                          {v.allergyMissing && (<>
                            <button onClick={v.addAllergy} style={{height: "36px", padding: "0 14px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#A8DEC6", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                              + Add
                            </button>
                          </>)}
                          {v.allergyAdded && (<>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              None known
                            </span>
                          </>)}
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px"}}>
                          <span style={{fontSize: "15px"}}>
                            Vaccinations
                          </span>
                          {v.vaccMissing && (<>
                            <button onClick={v.addVacc} style={{height: "36px", padding: "0 14px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#A8DEC6", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                              + Add
                            </button>
                          </>)}
                          {v.vaccAdded && (<>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Up to date · May 2026
                            </span>
                          </>)}
                        </div>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Timeline
                        </span>
                        <div style={{display: "flex", gap: "12px"}}>
                          <span style={{flex: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", paddingTop: "4px"}}>
                            <span style={{width: "12px", height: "12px", borderRadius: "999px", background: "#066A75"}}>
                            </span>
                            <span style={{width: "2px", flex: "1", background: "#E3E8E6"}}>
                            </span>
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px", paddingBottom: "8px"}}>
                            <span style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                              <span style={{fontSize: "15px", fontWeight: "600"}}>
                                Upset stomach
                              </span>
                              <span style={{fontSize: "12px", fontWeight: "600", color: "#8A5A10", background: "#FBF0DC", borderRadius: "999px", padding: "2px 8px"}}>
                                Open
                              </span>
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              {"10 Nov · Dr. Weber · check-in "}{v.checkDay}
                            </span>
                            <span style={{fontSize: "13px", color: "#2F3A40"}}>
                              Bland diet, probiotic paste · 1 photo
                            </span>
                          </span>
                        </div>
                        <div style={{display: "flex", gap: "12px"}}>
                          <span style={{flex: "none", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4px"}}>
                            <span style={{width: "12px", height: "12px", borderRadius: "999px", background: "#C9D2D2"}}>
                            </span>
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                              <span style={{fontSize: "15px", fontWeight: "600"}}>
                                Ear irritation
                              </span>
                              <span style={{fontSize: "12px", fontWeight: "600", color: "#256B48", background: "#E6F2EC", borderRadius: "999px", padding: "2px 8px"}}>
                                Closed
                              </span>
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              14 Jun · Dr. Brandt · better on day 5
                            </span>
                            <span style={{fontSize: "13px", color: "#2F3A40"}}>
                              Ear drops, 7 days · 2 photos
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "0 20px 34px"}}>
                      <button onClick={v.go.share} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 6px 18px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="11" width="16" height="10" rx="2">
                          </rect>
                          <path d="M8 11V7a4 4 0 0 1 8 0v4">
                          </path>
                        </svg>
                        Share with a clinic
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.share && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "20px"}}>
                          Share Bella’s notes
                        </span>
                      </div>
                      <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                        Show this at the clinic desk. You choose what’s included, and the link stops working after 7 days.
                      </p>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", alignItems: "center", gap: "16px"}}>
                        <img src={imgShareQr} alt="QR code for Bella’s shared notes" style={{flex: "none", width: "112px", height: "112px", borderRadius: "12px", background: "#FFFFFF"}} />
                        <span style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                          <span style={{fontSize: "12px", color: "#5E6B73"}}>
                            Or give them this code
                          </span>
                          <span style={{fontFamily: "'JetBrains Mono',monospace", fontSize: "18px", fontWeight: "500", letterSpacing: "0.04em"}}>
                            BELLA-4K2P
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Valid until Thu 19 Nov
                          </span>
                        </span>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "6px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column"}}>
                        {v.shareItems.map((i, i_i) => (<React.Fragment key={i_i}>
                          <button onClick={i.toggle} style={{display: "flex", alignItems: "center", gap: "12px", border: "0", borderBottom: "1px solid #EEF1F0", background: "transparent", padding: "12px 0", cursor: "pointer", textAlign: "left", fontFamily: "Inter,sans-serif", color: "#202A30"}}>
                            <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                              <span style={{fontSize: "15px", fontWeight: "600"}}>
                                {i.label}
                              </span>
                              <span style={{fontSize: "13px", color: "#5E6B73"}}>
                                {i.sub}
                              </span>
                            </span>
                            <span style={{flex: "none", width: "44px", height: "26px", borderRadius: "999px", padding: "3px", boxSizing: "border-box", display: "flex", background: i.track, justifyContent: i.justify}}>
                              <span style={{width: "20px", height: "20px", borderRadius: "999px", background: "#FFFFFF"}}>
                              </span>
                            </span>
                          </button>
                        </React.Fragment>))}
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "8px"}}>
                      {v.shareNotSent && (<>
                        <button onClick={v.sendShare} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                          Copy link
                        </button>
                      </>)}
                      {v.shareSent && (<>
                        <span style={{height: "56px", borderRadius: "999px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                          Link copied
                        </span>
                      </>)}
                    </div>
                  </div>
                </>)}
                {v.is.planSetup && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "20px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          New pet · Milo
                        </span>
                        <button onClick={v.go.home} aria-label="Close" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round">
                            <path d="M18 6 6 18M6 6l12 12">
                            </path>
                          </svg>
                        </button>
                      </div>
                      <span style={{alignSelf: "center", width: "150px", height: "150px", borderRadius: "999px", background: "#FBF0DC", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                        <img src={imgMilo} alt="Milo, a fluffy mixed-breed puppy" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%"}} />
                      </span>
                      <div style={{display: "flex", flexDirection: "column", gap: "8px", textAlign: "center"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          Let’s plan Milo’s first year
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          Tell us two things and we’ll line up what’s due, and when.
                        </p>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Milo is a
                        </span>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "8px"}}>
                          {v.speciesOpts.map((o, o_i) => (<React.Fragment key={o_i}>
                            <button onClick={o.pick} style={{height: "48px", borderRadius: "999px", border: "0", cursor: "pointer", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", background: o.bg, fontWeight: o.fw}}>
                              {o.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73", paddingTop: "4px"}}>
                          Born
                        </span>
                        <span style={{height: "48px", borderRadius: "16px", background: "#F4F6F5", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", fontSize: "15px", fontWeight: "600"}}>
                          August 2026
                          <span style={{fontSize: "13px", fontWeight: "500", color: "#5E6B73"}}>
                            13 weeks old
                          </span>
                        </span>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73", paddingTop: "4px"}}>
                          Breed (optional)
                        </span>
                        <span style={{height: "48px", borderRadius: "16px", background: "#F4F6F5", display: "flex", alignItems: "center", padding: "0 14px", fontSize: "15px"}}>
                          Mixed breed
                        </span>
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px"}}>
                      <button onClick={v.go.plan} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        Build Milo’s plan
                      </button>
                    </div>
                  </div>
                </>)}
                {v.is.plan && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{background: "#FFFFFF", borderRadius: "0 0 40px 40px", padding: "56px 20px 22px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 8px 24px rgba(32,42,48,0.05)"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#F4F6F5", fontSize: "13px", fontWeight: "600"}}>
                          3 of 7 done
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                          Milo’s plan
                        </span>
                        <span style={{fontSize: "13px", color: "#5E6B73"}}>
                          {v.planSub}
                        </span>
                      </div>
                      <div style={{background: "#A8DEC6", borderRadius: "24px", padding: "16px 18px", display: "flex", alignItems: "center", gap: "12px"}}>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "12px", fontWeight: "600"}}>
                            Next with PetDoc
                          </span>
                          <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "16px", fontWeight: "600"}}>
                            Growth & diet check
                          </span>
                          <span style={{fontSize: "13px"}}>
                            Video call · due Mon 7 Dec
                          </span>
                        </span>
                        <button onClick={v.go.planBook} style={{height: "44px", padding: "0 18px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#202A30", color: "#FFFFFF", fontFamily: "Poppins,Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                          Book
                        </button>
                      </div>
                    </div>
                    <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "14px"}}>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "6px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column"}}>
                        {v.planItems.map((p, p_i) => (<React.Fragment key={p_i}>
                          <div style={{display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", borderBottom: "1px solid #EEF1F0"}}>
                            <span style={{flex: "none", width: "52px", fontSize: "12px", fontWeight: "600", color: "#5E6B73"}}>
                              {p.when}
                            </span>
                            <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                              <span style={{fontSize: "15px", fontWeight: "600"}}>
                                {p.title}
                              </span>
                              <span style={{fontSize: "13px", color: "#5E6B73"}}>
                                {p.where}
                              </span>
                            </span>
                            <span style={{flex: "none", fontSize: "12px", fontWeight: "600", borderRadius: "999px", padding: "3px 9px", background: p.chipBg, color: p.chipFg}}>
                              {p.status}
                            </span>
                          </div>
                        </React.Fragment>))}
                      </div>
                      <button onClick={v.togglePlanRem} style={{display: "flex", alignItems: "center", gap: "12px", border: "0", cursor: "pointer", textAlign: "left", fontFamily: "Inter,sans-serif", color: "#202A30", background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)"}}>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Reminders for Milo
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            {v.planRemLabel}
                          </span>
                        </span>
                        <span style={{flex: "none", width: "44px", height: "26px", borderRadius: "999px", padding: "3px", boxSizing: "border-box", display: "flex", background: v.planRemTrack, justifyContent: v.planRemJustify}}>
                          <span style={{width: "20px", height: "20px", borderRadius: "999px", background: "#FFFFFF"}}>
                          </span>
                        </span>
                      </button>
                      <span style={{fontSize: "13px", lineHeight: "18px", color: "#5E6B73", padding: "0 6px"}}>
                        Vaccinations need an in-person visit. Your clinic does them; we keep the dates in Milo’s record.
                      </span>
                    </div>
                  </div>
                </>)}
                {v.is.planBook && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5", position: "relative"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "20px"}}>
                          Growth & diet check
                        </span>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                          <span style={{flex: "none", width: "56px", height: "56px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "16px"}}>
                            LW
                          </span>
                          <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Dr. Lena Weber
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              Already knows your household
                            </span>
                          </span>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px"}}>
                          {v.planSlots.map((s, s_i) => (<React.Fragment key={s_i}>
                            <button onClick={s.pick} style={{height: "44px", borderRadius: "999px", border: "0", cursor: "pointer", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontVariantNumeric: "tabular-nums", background: s.bg, fontWeight: s.fw}}>
                              {s.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                        <span style={{fontSize: "13px", color: "#5E6B73"}}>
                          Mon 7 Dec · 15-minute video call
                        </span>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Comes with the booking
                        </span>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px"}}>
                            Milo’s plan and vaccination dates
                          </span>
                        </div>
                        <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                          <span style={{flex: "none", width: "26px", height: "26px", borderRadius: "999px", background: "#E6F2EC", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <span style={{fontSize: "15px"}}>
                            Breed, age and current food
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "12px"}}>
                      <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0 6px"}}>
                        <span style={{fontSize: "13px", color: "#5E6B73"}}>
                          Standard consultation price
                        </span>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "18px", fontWeight: "600"}}>
                          €39
                        </span>
                      </div>
                      <button onClick={v.planBookIt} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        {"Book · Mon "}{v.planSlot}
                      </button>
                    </div>
                    {v.planBooked && (<>
                      <div style={{position: "absolute", inset: "0", background: "#F4F6F5", display: "flex", flexDirection: "column", zIndex: "2"}}>
                        <div style={{background: "#FFFFFF", borderRadius: "0 0 48px 48px", padding: "120px 20px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center"}}>
                          <span style={{width: "88px", height: "88px", borderRadius: "999px", background: "#A8DEC6", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <h2 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                            Milo’s check is booked
                          </h2>
                          <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#5E6B73"}}>
                            {"Mon 7 Dec, "}{v.planSlot}, with Dr. Weber. We’ll remind you 10 minutes before.
                          </p>
                        </div>
                        <div style={{marginTop: "auto", padding: "20px 20px 34px"}}>
                          <button onClick={v.go.plan} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                            Back to Milo’s plan
                          </button>
                        </div>
                      </div>
                    </>)}
                  </div>
                </>)}
                {v.is.chronic && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{background: "#FFFFFF", borderRadius: "0 0 40px 40px", padding: "56px 20px 22px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 8px 24px rgba(32,42,48,0.05)"}}>
                      <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "20px"}}>
                          Oskar’s care
                        </span>
                      </div>
                      <div style={{display: "flex", alignItems: "center", gap: "14px"}}>
                        <span style={{flex: "none", width: "72px", height: "72px", borderRadius: "999px", background: "#EEF1F1", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                          <img src={imgOskar} alt="Oskar, a fluffy cream cat" style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 28%"}} />
                        </span>
                        <span style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Cat · 13 yrs · 4.0 kg
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Kidney care with Dr. Weber since March
                          </span>
                        </span>
                      </div>
                      <div style={{background: "#A8DEC6", borderRadius: "24px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "12px", fontWeight: "600"}}>
                            Next check
                          </span>
                          <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "17px", fontWeight: "600"}}>
                            {v.nextDate}{" · "}{v.nextSlot}
                          </span>
                          <span style={{fontSize: "13px"}}>
                            Video call with Dr. Weber · booked at the end of the last call
                          </span>
                        </span>
                        <button onClick={v.go.update} style={{height: "48px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#202A30", color: "#FFFFFF", fontFamily: "Poppins,Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                          Tell Dr. Weber what’s changed
                        </button>
                      </div>
                    </div>
                    <div style={{padding: "20px", display: "flex", flexDirection: "column", gap: "14px"}}>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "16px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Supplies
                        </span>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                          <div style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Benazepril 2.5 mg
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              12 days left
                            </span>
                          </div>
                          <span style={{height: "8px", borderRadius: "999px", background: "#EEF1F1", overflow: "hidden", display: "block"}}>
                            <span style={{display: "block", width: "40%", height: "8px", borderRadius: "999px", background: "#A8DEC6"}}>
                            </span>
                          </span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                          <div style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                            <span style={{fontSize: "15px", fontWeight: "600"}}>
                              Renal diet · 2 kg
                            </span>
                            <span style={{fontSize: "13px", color: "#5E6B73"}}>
                              {v.dietLeft}
                            </span>
                          </div>
                          <span style={{height: "8px", borderRadius: "999px", background: "#EEF1F1", overflow: "hidden", display: "block"}}>
                            <span style={{display: "block", height: "8px", borderRadius: "999px", width: v.dietWidth, background: v.dietBar}}>
                            </span>
                          </span>
                          {v.dietNotOrdered && (<>
                            <button onClick={v.orderDiet} style={{alignSelf: "flex-start", height: "40px", padding: "0 16px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#202A30", color: "#FFFFFF", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                              Reorder · arrives Friday
                            </button>
                          </>)}
                        </div>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "10px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Since the last check
                        </span>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                          <span style={{fontSize: "15px"}}>
                            Weight
                          </span>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            4.1 → 4.0 kg
                          </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                          <span style={{fontSize: "15px"}}>
                            Blood test
                          </span>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            Due at next check
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>)}
                {v.is.update && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5", position: "relative"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          {"Before "}{v.nextDate}
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          What has changed for Oskar?
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          One minute. Dr. Weber reads it before the call, so you can start with what matters.
                        </p>
                      </div>
                      {v.updQs.map((q, q_i) => (<React.Fragment key={q_i}>
                        <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "16px 18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "10px"}}>
                          <span style={{fontSize: "15px", fontWeight: "600"}}>
                            {q.label}
                          </span>
                          <div style={{display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px"}}>
                            {q.opts.map((o, o_i) => (<React.Fragment key={o_i}>
                              <button onClick={o.pick} style={{height: "44px", borderRadius: "999px", border: "0", cursor: "pointer", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "14px", background: o.bg, fontWeight: o.fw}}>
                                {o.label}
                              </button>
                            </React.Fragment>))}
                          </div>
                        </div>
                      </React.Fragment>))}
                      <button style={{height: "52px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "500", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"}}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#066A75" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
                          </path>
                          <circle cx="12" cy="13" r="4">
                          </circle>
                        </svg>
                        Add a photo or video
                      </button>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px"}}>
                      <button onClick={v.sendUpd} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        Send to Dr. Weber
                      </button>
                    </div>
                    {v.updSent && (<>
                      <div style={{position: "absolute", inset: "0", background: "#F4F6F5", display: "flex", flexDirection: "column", zIndex: "2"}}>
                        <div style={{background: "#FFFFFF", borderRadius: "0 0 48px 48px", padding: "120px 20px 32px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", textAlign: "center"}}>
                          <span style={{width: "88px", height: "88px", borderRadius: "999px", background: "#A8DEC6", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                          </span>
                          <h2 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "26px", lineHeight: "32px"}}>
                            Sent to Dr. Weber
                          </h2>
                          <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#5E6B73"}}>
                            {"She’ll see it before "}{v.nextDate}. If anything gets worse before then, book a consultation.
                          </p>
                        </div>
                        <div style={{marginTop: "auto", padding: "20px 20px 34px"}}>
                          <button onClick={v.go.chronic} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                            Done
                          </button>
                        </div>
                      </div>
                    </>)}
                  </div>
                </>)}
                {v.is.ask && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", gap: "6px", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F5B62" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="9">
                            </circle>
                            <path d="M12 7v5l3 2">
                            </path>
                          </svg>
                          Open until Fri 14:00
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                        <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                          Ask Dr. Weber one question
                        </h1>
                        <p style={{margin: "0", fontSize: "15px", lineHeight: "22px", color: "#2F3A40"}}>
                          Free within 72 hours of your call. For anything that needs a look, book a re-check.
                        </p>
                      </div>
                      {v.askNotSent && (<>
                        <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "10px"}}>
                          <textarea value={v.askText} onChange={v.setAskText} rows="5" placeholder="e.g. Can Bella have her usual treats yet?" style={{border: "0", resize: "none", background: "#F4F6F5", borderRadius: "16px", padding: "12px 14px", fontFamily: "Inter,sans-serif", fontSize: "15px", lineHeight: "22px", color: "#202A30"}}>
                          </textarea>
                          <span style={{alignSelf: "flex-end", fontSize: "12px", color: "#5E6B73", fontVariantNumeric: "tabular-nums"}}>
                            {v.askLen}
                          </span>
                        </div>
                      </>)}
                      {v.askSent && (<>
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                          <span style={{alignSelf: "flex-end", maxWidth: "80%", background: "#202A30", color: "#FFFFFF", borderRadius: "20px 20px 6px 20px", padding: "12px 14px", fontSize: "15px", lineHeight: "22px"}}>
                            {v.askShown}
                          </span>
                          <div style={{display: "flex", alignItems: "flex-end", gap: "8px"}}>
                            <span style={{flex: "none", width: "32px", height: "32px", borderRadius: "999px", background: "#E6F5EE", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "12px"}}>
                              LW
                            </span>
                            <span style={{maxWidth: "80%", background: "#FFFFFF", borderRadius: "20px 20px 20px 6px", padding: "12px 14px", fontSize: "15px", lineHeight: "22px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)"}}>
                              Not yet. Stay on bland meals until Friday, then mix her normal food back in over two days.
                            </span>
                          </div>
                          <span style={{fontSize: "12px", color: "#5E6B73", paddingLeft: "40px"}}>
                            Dr. Weber · replied in 3 h
                          </span>
                        </div>
                      </>)}
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px", display: "flex", flexDirection: "column", gap: "8px"}}>
                      {v.askNotSent && (<>
                        <button onClick={v.sendAsk} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: v.askBtnBg, color: v.askBtnFg}}>
                          Send question
                        </button>
                        <span style={{fontSize: "12px", color: "#5E6B73", textAlign: "center"}}>
                          One question per visit. Dr. Weber usually replies within 4 hours.
                        </span>
                      </>)}
                      {v.askSent && (<>
                        <button onClick={v.go.recheck} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 6px 18px rgba(32,42,48,0.08)", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                          Still unsure? Book a re-check
                        </button>
                      </>)}
                    </div>
                  </div>
                </>)}
                {v.is.tracker && (<>
                  <div style={{minHeight: "844px", display: "flex", flexDirection: "column", background: "#F4F6F5"}}>
                    <div style={{padding: "56px 20px 0", display: "flex", flexDirection: "column", gap: "18px"}}>
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <button onClick={v.back} aria-label="Back" style={{width: "44px", height: "44px", flex: "none", borderRadius: "999px", border: "0", cursor: "pointer", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.12)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#202A30" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 6-6 6 6 6">
                            </path>
                          </svg>
                        </button>
                        <span style={{display: "inline-flex", alignItems: "center", height: "36px", padding: "0 14px", borderRadius: "999px", background: "#FFFFFF", boxShadow: "0 4px 14px rgba(32,42,48,0.10)", fontSize: "13px", fontWeight: "600"}}>
                          Bella · day 4
                        </span>
                      </div>
                      <h1 style={{margin: "0", fontFamily: "Poppins,Inter,sans-serif", fontWeight: "600", fontSize: "28px", lineHeight: "34px"}}>
                        Bella’s recovery
                      </h1>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: "4px"}}>
                        {v.trackDays.map((d, d_i) => (<React.Fragment key={d_i}>
                          <span style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "6px"}}>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              {d.label}
                            </span>
                            <span style={{width: "28px", height: "28px", borderRadius: "999px", boxSizing: "border-box", background: d.dot, border: d.ring}}>
                            </span>
                            <span style={{fontSize: "12px", fontWeight: "600"}}>
                              {d.sub}
                            </span>
                          </span>
                        </React.Fragment>))}
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Compare photos
                        </span>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "8px"}}>
                          <span style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                            <img src={imgBellaBlanket} alt="Bella on Thursday" style={{width: "100%", aspectRatio: "1 / 1", borderRadius: "16px", objectFit: "cover"}} />
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              Thu 12 Nov
                            </span>
                          </span>
                          <span style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                            <span style={{width: "100%", aspectRatio: "1 / 1", borderRadius: "16px", background: "#E6F5EE", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                              <img src={imgBellaHappy} alt="Bella today, happy with her tongue out" style={{width: "88%", height: "92%", objectFit: "contain", objectPosition: "bottom"}} />
                            </span>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              Today
                            </span>
                          </span>
                        </div>
                      </div>
                      <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "18px", boxShadow: "0 8px 24px rgba(32,42,48,0.06)", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "500", color: "#5E6B73"}}>
                          Today
                        </span>
                        {v.trackRows.map((r, r_i) => (<React.Fragment key={r_i}>
                          <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                            <span style={{flex: "1", fontSize: "15px", fontWeight: "600"}}>
                              {r.label}
                            </span>
                            {r.opts.map((o, o_i) => (<React.Fragment key={o_i}>
                              <button onClick={o.pick} style={{height: "40px", minWidth: "80px", padding: "0 12px", borderRadius: "999px", border: "0", cursor: "pointer", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "14px", background: o.bg, fontWeight: o.fw}}>
                                {o.label}
                              </button>
                            </React.Fragment>))}
                          </div>
                        </React.Fragment>))}
                      </div>
                    </div>
                    <div style={{marginTop: "auto", padding: "20px 20px 34px"}}>
                      <button onClick={v.saveTrack} style={{height: "56px", width: "100%", border: "0", cursor: "pointer", borderRadius: "999px", background: "#A8DEC6", color: "#202A30", fontFamily: "Poppins,Inter,sans-serif", fontSize: "15px", fontWeight: "600", boxShadow: "0 10px 24px rgba(72,170,130,0.30)"}}>
                        {v.trackLabel}
                      </button>
                    </div>
                  </div>
                </>)}
              </div>
              <span aria-hidden="true" style={{position: "absolute", left: "50%", top: "27px", marginLeft: "-56px", width: "112px", height: "32px", borderRadius: "999px", background: "#0B0F11", pointerEvents: "none", zIndex: "5"}}>
              </span>
            </div>
          </>)}
          {v.vet && (<>
            <div style={{width: "100%", maxWidth: "1180px", borderRadius: "18px", overflow: "hidden", background: "#FAFBF9", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 24px 60px rgba(32,42,48,0.14)"}}>
              <div style={{height: "40px", background: "#EEF1F1", display: "flex", alignItems: "center", gap: "8px", padding: "0 16px"}}>
                <span style={{width: "12px", height: "12px", borderRadius: "999px", background: "#D5DBDB"}}>
                </span>
                <span style={{width: "12px", height: "12px", borderRadius: "999px", background: "#D5DBDB"}}>
                </span>
                <span style={{width: "12px", height: "12px", borderRadius: "999px", background: "#D5DBDB"}}>
                </span>
                <span style={{marginLeft: "12px", flex: "1", maxWidth: "420px", height: "24px", borderRadius: "8px", background: "#FFFFFF", display: "flex", alignItems: "center", padding: "0 10px", fontSize: "12px", color: "#5E6B73"}}>
                  {v.vetUrl}
                </span>
              </div>
              {v.is.vetIntake && (<>
                <div style={{background: "#FAFBF9", minHeight: "720px"}}>
                  <header style={{background: "#FFFFFF", borderBottom: "1px solid #E5EBEB", padding: "16px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px"}}>
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                      <svg width="32" height="26" viewBox="0 0 40 32" aria-hidden="true">
                        <circle cx="14" cy="16" r="14" fill="#087F8C">
                        </circle>
                        <circle cx="27" cy="16" r="11" fill="#DDF4F3" fillOpacity="0.92">
                        </circle>
                      </svg>
                      <span style={{fontFamily: "Manrope,Inter,sans-serif", fontWeight: "700", fontSize: "18px"}}>
                        PetDoc Vet
                      </span>
                    </div>
                    <div style={{flex: "1 1 320px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", justifyContent: "flex-end"}}>
                      <span style={{fontSize: "14px", color: "#5E6B73", fontVariantNumeric: "tabular-nums"}}>
                        Next: Bella · new case · starts in 1 min
                      </span>
                      <button onClick={v.go.vetWrap} style={{height: "44px", padding: "0 20px", borderRadius: "12px", border: "0", cursor: "pointer", background: "#087F8C", color: "#FFFFFF", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                        Join call
                      </button>
                    </div>
                  </header>
                  <div style={{padding: "24px", display: "flex", flexDirection: "column", gap: "20px"}}>
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px"}}>
                      <img src={imgBella} alt="" style={{width: "56px", height: "56px", borderRadius: "999px", background: "#E6F5EE", objectFit: "cover", objectPosition: "top"}} />
                      <div style={{flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "2px"}}>
                        <span style={{fontFamily: "Manrope,Inter,sans-serif", fontWeight: "700", fontSize: "26px", letterSpacing: "-0.02em"}}>
                          Bella
                        </span>
                        <span style={{fontSize: "14px", color: "#5E6B73"}}>
                          Beagle · female, spayed · 3 yrs · 11.8 kg · owner: Anna K.
                        </span>
                      </div>
                      <span style={{display: "inline-flex", alignItems: "center", gap: "6px", height: "32px", padding: "0 14px", borderRadius: "999px", background: "#DDF4F3", color: "#066A75", fontSize: "14px", fontWeight: "600"}}>
                        Intake received 09:41
                      </span>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px", alignItems: "start"}}>
                      <section style={{background: "#DDF4F3", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#066A75"}}>
                          From Anna, in her words
                        </span>
                        <span style={{fontSize: "16px", lineHeight: "24px"}}>
                          “{v.intakeText}”
                        </span>
                        <div style={{display: "flex", flexWrap: "wrap", gap: "6px"}}>
                          {v.signsOn.map((c, c_i) => (<React.Fragment key={c_i}>
                            <span style={{height: "28px", padding: "0 10px", borderRadius: "999px", background: "#FFFFFF", display: "inline-flex", alignItems: "center", fontSize: "13px", fontWeight: "600"}}>
                              {c.label}
                            </span>
                          </React.Fragment>))}
                          <span style={{height: "28px", padding: "0 10px", borderRadius: "999px", background: "#FFFFFF", display: "inline-flex", alignItems: "center", fontSize: "13px", fontWeight: "600"}}>
                            {"Since: "}{v.sinceVal}
                          </span>
                        </div>
                        {v.uploadOk && (<>
                          <img src={imgBellaBlanket} alt="Owner’s photo of Bella" style={{width: "100%", maxWidth: "260px", aspectRatio: "3 / 2", borderRadius: "12px", objectFit: "cover"}} />
                        </>)}
                        {v.uploadFailed && (<>
                          <span style={{fontSize: "14px", color: "#8A5A10", background: "#FBF0DC", borderRadius: "10px", padding: "10px 12px"}}>
                            Photo upload failed on the owner’s side. Ask for it in the call.
                          </span>
                        </>)}
                      </section>
                      <section style={{background: "#FFFFFF", border: "1px solid #E5EBEB", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                          Already answered · no need to ask
                        </span>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Onset
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", textAlign: "right"}}>
                            Last night
                          </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Vomiting
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", textAlign: "right"}}>
                            Twice
                          </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Stool
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", textAlign: "right"}}>
                            Loose this morning
                          </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Drinking
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", textAlign: "right"}}>
                            Yes
                          </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Likely trigger
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", textAlign: "right"}}>
                            Got into the bin
                          </span>
                        </div>
                      </section>
                      <section style={{background: "#FFFFFF", border: "1px solid #E5EBEB", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                          Bella’s profile
                        </span>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Current meds
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600"}}>
                            None
                          </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Allergies
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", color: "#8A5A10"}}>
                            Not recorded
                          </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Vaccinations
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", color: "#8A5A10"}}>
                            Not recorded
                          </span>
                        </div>
                        <span style={{fontSize: "13px", fontWeight: "600", color: "#5E6B73", paddingTop: "4px"}}>
                          Previous episodes
                        </span>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                          <span style={{fontSize: "14px"}}>
                            Ear irritation
                          </span>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Jun 2026 · resolved
                          </span>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </>)}
              {v.is.vetWrap && (<>
                <div style={{display: "flex", flexWrap: "wrap", minHeight: "760px", background: "#FAFBF9"}}>
                  <div style={{flex: "1 1 320px", minHeight: "360px", position: "relative", background: "repeating-linear-gradient(135deg,#243034 0 14px,#1F2A2E 14px 28px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src={imgBellaBlanket} alt="Live video of Bella on a blanket" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover"}} />
                    <span style={{position: "absolute", left: "16px", top: "16px", display: "inline-flex", alignItems: "center", gap: "8px", height: "30px", padding: "0 12px", borderRadius: "999px", background: "rgba(0,0,0,0.45)", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", fontVariantNumeric: "tabular-nums"}}>
                      <span style={{width: "8px", height: "8px", borderRadius: "999px", background: "#E5484D"}}>
                      </span>
                      08:42
                    </span>
                    <span style={{position: "absolute", right: "16px", bottom: "16px", width: "150px", height: "96px", borderRadius: "12px", background: "#2A3337", boxShadow: "0 0 0 2px rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                      <span style={{width: "48px", height: "48px", borderRadius: "999px", background: "#DDF4F3", color: "#066A75", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope,Inter,sans-serif", fontWeight: "700", fontSize: "16px"}}>
                        LW
                      </span>
                    </span>
                  </div>
                  <div style={{flex: "0 1 480px", minWidth: "320px", boxSizing: "border-box", background: "#FFFFFF", borderLeft: "1px solid #E5EBEB", display: "flex", flexDirection: "column"}}>
                    <div style={{padding: "24px 24px 16px", borderBottom: "1px solid #E5EBEB", display: "flex", flexDirection: "column", gap: "4px"}}>
                      <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                        Wrap-up · Bella, Beagle, 3 yrs
                      </span>
                      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <span style={{fontFamily: "Manrope,Inter,sans-serif", fontWeight: "700", fontSize: "22px"}}>
                          Follow-up check-in
                        </span>
                        <button onClick={v.toggleLoop} aria-label="Toggle check-in" style={{display: "inline-flex", alignItems: "center", gap: "8px", border: "0", background: "transparent", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "13px", fontWeight: "600", color: v.loopLabelColor}}>
                          <span style={{width: "44px", height: "26px", borderRadius: "999px", padding: "3px", boxSizing: "border-box", display: "flex", background: v.loopTrack, justifyContent: v.loopJustify}}>
                            <span style={{width: "20px", height: "20px", borderRadius: "999px", background: "#FFFFFF"}}>
                            </span>
                          </span>
                          {v.loopLabel}
                        </button>
                      </div>
                    </div>
                    <div style={{flex: "1", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "22px"}}>
                      {v.loopOn && (<>
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                          <span style={{fontSize: "13px", fontWeight: "600"}}>
                            Condition
                          </span>
                          <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                            {v.conds.map((c, c_i) => (<React.Fragment key={c_i}>
                              <button onClick={c.pick} style={{height: "40px", padding: "0 14px", borderRadius: "999px", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", border: c.border, background: c.bg, color: c.fg, fontWeight: c.fw}}>
                                {c.label}
                              </button>
                            </React.Fragment>))}
                          </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                          <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                            <span style={{fontSize: "13px", fontWeight: "600"}}>
                              Check in on
                            </span>
                            <span style={{fontSize: "12px", color: "#5E6B73"}}>
                              {v.defaultHint}
                            </span>
                          </div>
                          <div style={{display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "8px"}}>
                            {v.days.map((d, d_i) => (<React.Fragment key={d_i}>
                              <button onClick={d.pick} style={{height: "56px", borderRadius: "12px", cursor: "pointer", fontFamily: "Inter,sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", border: d.border, background: d.bg, color: d.fg}}>
                                <span style={{fontSize: "14px", fontWeight: d.fw}}>
                                  {d.label}
                                </span>
                                <span style={{fontSize: "12px", color: d.wdColor}}>
                                  {d.wd}
                                </span>
                              </button>
                            </React.Fragment>))}
                          </div>
                          <span style={{fontSize: "12px", lineHeight: "17px", color: "#5E6B73"}}>
                            Moves to delivery + 2 days if the Rx arrives late.
                          </span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                          <span style={{fontSize: "13px", fontWeight: "600"}}>
                            Expect improvement within
                          </span>
                          <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
                            <button onClick={v.decWindow} aria-label="Fewer days" style={{width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #E5EBEB", background: "#FFFFFF", cursor: "pointer", fontSize: "20px", color: "#202A30"}}>
                              −
                            </button>
                            <span style={{fontSize: "17px", fontWeight: "600", fontVariantNumeric: "tabular-nums", minWidth: "64px", textAlign: "center"}}>
                              {v.windowLabel}
                            </span>
                            <button onClick={v.incWindow} aria-label="More days" style={{width: "44px", height: "44px", borderRadius: "12px", border: "1px solid #E5EBEB", background: "#FFFFFF", cursor: "pointer", fontSize: "20px", color: "#202A30"}}>
                              +
                            </button>
                          </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                          <span style={{fontSize: "13px", fontWeight: "600"}}>
                            {"Red flags shown to owner · "}{v.condName}{" template"}
                          </span>
                          {v.flags.map((fl, fl_i) => (<React.Fragment key={fl_i}>
                            <span style={{display: "flex", alignItems: "center", gap: "10px", fontSize: "14px"}}>
                              <span style={{flex: "none", width: "18px", height: "18px", borderRadius: "4px", background: "#087F8C", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M20 6 9 17l-5-5">
                                  </path>
                                </svg>
                              </span>
                              {fl.text}
                            </span>
                          </React.Fragment>))}
                        </div>
                      </>)}
                      {v.loopOff && (<>
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                          <span style={{fontSize: "13px", fontWeight: "600"}}>
                            Why no check-in?
                          </span>
                          <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                            {v.offReasons.map((c, c_i) => (<React.Fragment key={c_i}>
                              <button onClick={c.pick} style={{height: "40px", padding: "0 14px", borderRadius: "999px", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", border: c.border, background: c.bg, color: c.fg, fontWeight: c.fw}}>
                                {c.label}
                              </button>
                            </React.Fragment>))}
                          </div>
                          <span style={{fontSize: "12px", lineHeight: "17px", color: "#5E6B73"}}>
                            The reason is logged. The owner still gets the care summary.
                          </span>
                        </div>
                      </>)}
                      <button onClick={v.toggleRetell} style={{display: "flex", alignItems: "flex-start", gap: "10px", border: "0", borderTop: "1px solid #E5EBEB", background: "transparent", padding: "18px 0 0", cursor: "pointer", textAlign: "left", fontFamily: "Inter,sans-serif", color: "#202A30"}}>
                        <span style={{flex: "none", width: "18px", height: "18px", marginTop: "1px", borderRadius: "4px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", background: v.retellBg, border: v.retellBorder}}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={v.retellStroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5">
                            </path>
                          </svg>
                        </span>
                        <span style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "14px", fontWeight: "600"}}>
                            I asked for something the owner had already given
                          </span>
                          <span style={{fontSize: "12px", lineHeight: "17px", color: "#5E6B73"}}>
                            Feeds the re-telling rate, shared with Vet Experience
                          </span>
                        </span>
                      </button>
                    </div>
                    <div style={{padding: "16px 24px 24px", borderTop: "1px solid #E5EBEB", display: "flex", alignItems: "center", gap: "12px"}}>
                      <button onClick={v.switchOff} style={{height: "48px", padding: "0 4px", border: "0", background: "transparent", cursor: "pointer", color: "#5E6B73", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                        Not needed
                      </button>
                      <button onClick={v.go.summary} style={{flex: "1", height: "48px", borderRadius: "12px", border: "0", cursor: "pointer", background: "#087F8C", color: "#FFFFFF", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                        {v.wrapCta}
                      </button>
                    </div>
                  </div>
                </div>
              </>)}
              {v.is.vetRecheck && (<>
                <div style={{background: "#FAFBF9", minHeight: "720px"}}>
                  <header style={{background: "#FFFFFF", borderBottom: "1px solid #E5EBEB", padding: "16px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px"}}>
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                      <svg width="32" height="26" viewBox="0 0 40 32" aria-hidden="true">
                        <circle cx="14" cy="16" r="14" fill="#087F8C">
                        </circle>
                        <circle cx="27" cy="16" r="11" fill="#DDF4F3" fillOpacity="0.92">
                        </circle>
                      </svg>
                      <span style={{fontFamily: "Manrope,Inter,sans-serif", fontWeight: "700", fontSize: "18px"}}>
                        PetDoc Vet
                      </span>
                    </div>
                    <div style={{flex: "1 1 320px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", justifyContent: "flex-end"}}>
                      <span style={{fontSize: "14px", color: "#5E6B73", fontVariantNumeric: "tabular-nums"}}>
                        {"Next: Re-check · "}{v.slot}{" · starts in 4 min"}
                      </span>
                      <button style={{height: "44px", padding: "0 20px", borderRadius: "12px", border: "0", cursor: "pointer", background: "#087F8C", color: "#FFFFFF", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                        Join call
                      </button>
                    </div>
                  </header>
                  <div style={{padding: "24px", display: "flex", flexDirection: "column", gap: "20px"}}>
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px"}}>
                      <img src={imgBella} alt="" style={{width: "56px", height: "56px", borderRadius: "999px", background: "#E6F5EE", objectFit: "cover", objectPosition: "top"}} />
                      <div style={{flex: "1 1 280px", display: "flex", flexDirection: "column", gap: "2px"}}>
                        <span style={{fontFamily: "Manrope,Inter,sans-serif", fontWeight: "700", fontSize: "26px", letterSpacing: "-0.02em"}}>
                          Bella
                        </span>
                        <span style={{fontSize: "14px", color: "#5E6B73"}}>
                          Beagle · female, spayed · 3 yrs · 11.8 kg · owner: Anna K.
                        </span>
                      </div>
                      <span style={{display: "inline-flex", alignItems: "center", gap: "6px", height: "32px", padding: "0 14px", borderRadius: "999px", background: "#EEF1F1", color: "#2F3A40", fontSize: "14px", fontWeight: "600"}}>
                        {v.loopChip}
                      </span>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px", alignItems: "start"}}>
                      <section style={{background: "#DDF4F3", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#066A75"}}>
                          What’s new since Tuesday
                        </span>
                        <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                          <span style={{fontSize: "13px", color: "#2F3A40"}}>
                            Check-in · Thu 09:12
                          </span>
                          <span style={{fontSize: "17px", fontWeight: "600"}}>
                            {v.answerLabel}
                          </span>
                        </div>
                        <div style={{display: "flex", gap: "12px", alignItems: "flex-start"}}>
                          <img src={imgBellaBlanket} alt="Owner’s new photo of Bella" style={{flex: "none", width: "88px", height: "88px", borderRadius: "12px", objectFit: "cover"}} />
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            “Ate a little this morning, still loose stool.”
                          </span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #BFE6E3", paddingTop: "12px"}}>
                          <span style={{fontSize: "14px", display: "flex", gap: "8px"}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none", marginTop: "2px"}}>
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                            Rx delivered Wed 11 Nov
                          </span>
                          <span style={{fontSize: "14px", display: "flex", gap: "8px"}}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#256B48" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" style={{flex: "none", marginTop: "2px"}}>
                              <path d="M20 6 9 17l-5-5">
                              </path>
                            </svg>
                            Red-flag check: none reported
                          </span>
                        </div>
                      </section>
                      <section style={{background: "#FFFFFF", border: "1px solid #E5EBEB", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "14px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "8px"}}>
                          <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                            Last consultation
                          </span>
                          <span style={{fontSize: "13px", color: "#5E6B73"}}>
                            Tue 10 Nov · you
                          </span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                          <span style={{fontSize: "13px", fontWeight: "600", color: "#5E6B73"}}>
                            Assessment
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            Mild gastroenteritis, likely dietary. Alert, hydrated, no fever reported.
                          </span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                          <span style={{fontSize: "13px", fontWeight: "600", color: "#5E6B73"}}>
                            Plan
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            Bland diet 3 days, probiotic paste daily, water ad lib.
                          </span>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                          <span style={{fontSize: "13px", fontWeight: "600", color: "#5E6B73"}}>
                            Expected
                          </span>
                          <span style={{fontSize: "15px", lineHeight: "22px"}}>
                            {"Improvement within "}{v.windowLabel}{" (by "}{v.winEnd})
                          </span>
                        </div>
                      </section>
                      <section style={{background: "#FFFFFF", border: "1px solid #E5EBEB", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px"}}>
                        <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                          Bella’s profile
                        </span>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Current meds
                          </span>
                          <span style={{fontSize: "14px", fontWeight: "600", textAlign: "right"}}>
                            Probiotic paste
                          </span>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Allergies
                          </span>
                          {v.allergyMissing && (<>
                            <span style={{fontSize: "14px", fontWeight: "600", color: "#8A5A10"}}>
                              Not recorded
                            </span>
                          </>)}
                          {v.allergyAdded && (<>
                            <span style={{fontSize: "14px", fontWeight: "600"}}>
                              None known
                            </span>
                          </>)}
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px", paddingBottom: "10px", borderBottom: "1px solid #E5EBEB"}}>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Vaccinations
                          </span>
                          {v.vaccMissing && (<>
                            <span style={{fontSize: "14px", fontWeight: "600", color: "#8A5A10"}}>
                              Not recorded
                            </span>
                          </>)}
                          {v.vaccAdded && (<>
                            <span style={{fontSize: "14px", fontWeight: "600"}}>
                              Up to date · May 2026
                            </span>
                          </>)}
                        </div>
                        <span style={{fontSize: "13px", fontWeight: "600", color: "#5E6B73", paddingTop: "4px"}}>
                          Previous episodes
                        </span>
                        <div style={{display: "flex", justifyContent: "space-between", gap: "8px"}}>
                          <span style={{fontSize: "14px"}}>
                            Ear irritation
                          </span>
                          <span style={{fontSize: "14px", color: "#5E6B73"}}>
                            Jun 2026 · resolved
                          </span>
                        </div>
                      </section>
                    </div>
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px", background: "#FFFFFF", border: "1px solid #E5EBEB", borderRadius: "16px", padding: "14px 20px"}}>
                      <span style={{flex: "1 1 240px", fontSize: "14px", color: "#2F3A40"}}>
                        After the call: was this re-check clinically needed?
                      </span>
                      <button onClick={v.markNeeded} style={{height: "40px", padding: "0 16px", borderRadius: "10px", border: "1px solid #E5EBEB", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600", background: v.neededBg, color: v.neededFg}}>
                        Needed
                      </button>
                      <button onClick={v.markNotNeeded} style={{height: "40px", padding: "0 16px", borderRadius: "10px", border: "1px solid #E5EBEB", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600", background: v.notNeededBg, color: v.notNeededFg}}>
                        Not needed
                      </button>
                    </div>
                  </div>
                </div>
              </>)}
              {v.is.vetNext && (<>
                <div style={{display: "flex", flexWrap: "wrap", minHeight: "760px", background: "#FAFBF9"}}>
                  <div style={{flex: "1 1 320px", minHeight: "360px", position: "relative", background: "repeating-linear-gradient(135deg,#243034 0 14px,#1F2A2E 14px 28px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src={imgOskar} alt="Live video of Oskar" style={{position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 35%", background: "#FFFFFF"}} />
                    <span style={{position: "absolute", left: "16px", top: "16px", display: "inline-flex", alignItems: "center", gap: "8px", height: "30px", padding: "0 12px", borderRadius: "999px", background: "rgba(0,0,0,0.45)", color: "#FFFFFF", fontSize: "13px", fontWeight: "600", fontVariantNumeric: "tabular-nums"}}>
                      <span style={{width: "8px", height: "8px", borderRadius: "999px", background: "#E5484D"}}>
                      </span>
                      12:05
                    </span>
                  </div>
                  <div style={{flex: "0 1 480px", minWidth: "320px", boxSizing: "border-box", background: "#FFFFFF", borderLeft: "1px solid #E5EBEB", display: "flex", flexDirection: "column"}}>
                    <div style={{padding: "24px 24px 16px", borderBottom: "1px solid #E5EBEB", display: "flex", flexDirection: "column", gap: "4px"}}>
                      <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                        Wrap-up · Oskar, cat, 13 yrs · CKD stage 2
                      </span>
                      <span style={{fontFamily: "Manrope,Inter,sans-serif", fontWeight: "700", fontSize: "22px"}}>
                        Next steps
                      </span>
                    </div>
                    <div style={{flex: "1", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "22px"}}>
                      <div style={{display: "flex", alignItems: "center", gap: "10px", background: "#F4F6F5", borderRadius: "12px", padding: "12px 14px"}}>
                        <span style={{flex: "1", display: "flex", flexDirection: "column", gap: "2px"}}>
                          <span style={{fontSize: "14px", fontWeight: "600"}}>
                            Follow-up check-in: off
                          </span>
                          <span style={{fontSize: "12px", lineHeight: "17px", color: "#5E6B73"}}>
                            Chronic case. Oskar already comes back; the next check replaces it.
                          </span>
                        </span>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
                          <span style={{fontSize: "13px", fontWeight: "600"}}>
                            Book next check in
                          </span>
                          <span style={{fontSize: "12px", color: "#5E6B73"}}>
                            {v.nextDate}
                          </span>
                        </div>
                        <div style={{display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "8px"}}>
                          {v.weeks.map((w, w_i) => (<React.Fragment key={w_i}>
                            <button onClick={w.pick} style={{height: "44px", borderRadius: "12px", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", border: w.border, background: w.bg, color: w.fg, fontWeight: w.fw}}>
                              {w.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                        <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                          {v.nextSlots.map((s, s_i) => (<React.Fragment key={s_i}>
                            <button onClick={s.pick} style={{height: "40px", padding: "0 14px", borderRadius: "999px", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", fontVariantNumeric: "tabular-nums", border: s.border, background: s.bg, color: s.fg, fontWeight: s.fw}}>
                              {s.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <span style={{fontSize: "13px", fontWeight: "600"}}>
                          Refill reminders
                        </span>
                        {v.refillsList.map((r, r_i) => (<React.Fragment key={r_i}>
                          <button onClick={r.toggle} style={{display: "flex", alignItems: "flex-start", gap: "10px", border: "0", background: "transparent", padding: "0", cursor: "pointer", textAlign: "left", fontFamily: "Inter,sans-serif", color: "#202A30"}}>
                            <span style={{flex: "none", width: "18px", height: "18px", marginTop: "1px", borderRadius: "4px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", background: r.bg, border: r.border}}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={r.stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6 9 17l-5-5">
                                </path>
                              </svg>
                            </span>
                            <span style={{display: "flex", flexDirection: "column", gap: "2px"}}>
                              <span style={{fontSize: "14px", fontWeight: "600"}}>
                                {r.title}
                              </span>
                              <span style={{fontSize: "12px", color: "#5E6B73"}}>
                                {r.sub}
                              </span>
                            </span>
                          </button>
                        </React.Fragment>))}
                      </div>
                      <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                        <span style={{fontSize: "13px", fontWeight: "600"}}>
                          Ask the owner before the next check
                        </span>
                        <div style={{display: "flex", flexWrap: "wrap", gap: "8px"}}>
                          {v.askChipsList.map((c, c_i) => (<React.Fragment key={c_i}>
                            <button onClick={c.toggle} style={{height: "40px", padding: "0 14px", borderRadius: "999px", cursor: "pointer", fontFamily: "Inter,sans-serif", fontSize: "14px", border: c.border, background: c.bg, color: c.fg, fontWeight: c.fw}}>
                              {c.label}
                            </button>
                          </React.Fragment>))}
                        </div>
                      </div>
                    </div>
                    <div style={{padding: "16px 24px 24px", borderTop: "1px solid #E5EBEB", display: "flex"}}>
                      <button onClick={v.go.chronic} style={{flex: "1", height: "48px", borderRadius: "12px", border: "0", cursor: "pointer", background: "#087F8C", color: "#FFFFFF", fontFamily: "Inter,sans-serif", fontSize: "15px", fontWeight: "600"}}>
                        Confirm & end consult
                      </button>
                    </div>
                  </div>
                </div>
              </>)}
            </div>
          </>)}
        </main>
        {v.notesOn && (<>
          <aside style={{flex: "0 0 300px", boxSizing: "border-box", position: "sticky", top: "24px", display: "flex", flexDirection: "column", gap: "12px"}}>
            <div style={{background: "#FFFFFF", borderRadius: "24px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px"}}>
              <div style={{display: "flex", flexWrap: "wrap", gap: "6px"}}>
                <span style={{height: "26px", padding: "0 10px", borderRadius: "999px", background: "#DDF4F3", color: "#066A75", display: "inline-flex", alignItems: "center", fontSize: "12px", fontWeight: "700"}}>
                  {v.note.tag}
                </span>
                <span style={{height: "26px", padding: "0 10px", borderRadius: "999px", background: "#F4F6F5", color: "#2F3A40", display: "inline-flex", alignItems: "center", fontSize: "12px", fontWeight: "600"}}>
                  {v.note.device}
                </span>
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                <span style={{fontSize: "12px", color: "#5E6B73"}}>
                  {v.note.flow}{" · step "}{v.note.pos}
                </span>
                <span style={{fontFamily: "Poppins,Inter,sans-serif", fontSize: "20px", fontWeight: "600", lineHeight: "26px"}}>
                  {v.note.label}
                </span>
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                  What it tests
                </span>
                <span style={{fontSize: "14px", lineHeight: "21px", textWrap: "pretty"}}>
                  {v.note.tests}
                </span>
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                  Who it’s for
                </span>
                <span style={{fontSize: "14px", lineHeight: "21px"}}>
                  {v.note.persona}
                </span>
              </div>
              <div style={{display: "flex", flexDirection: "column", gap: "4px"}}>
                <span style={{fontSize: "12px", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E6B73"}}>
                  Events logged
                </span>
                <span style={{fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", lineHeight: "19px", color: "#2F3A40"}}>
                  {v.note.events}
                </span>
              </div>
              <div style={{display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "8px"}}>
                <button onClick={v.prev} style={{height: "44px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#F4F6F5", color: "#202A30", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                  ← Previous
                </button>
                <button onClick={v.next} style={{height: "44px", borderRadius: "999px", border: "0", cursor: "pointer", background: "#202A30", color: "#FFFFFF", fontFamily: "Inter,sans-serif", fontSize: "14px", fontWeight: "600"}}>
                  Next →
                </button>
              </div>
            </div>
            <span style={{fontSize: "12px", lineHeight: "18px", color: "#4F5B62", padding: "0 8px"}}>
              Names, dates and the €39 price are illustrative. Every screen is clickable; the panel walks the flows in order.
            </span>
          </aside>
        </>)}
      </div>
    );
  }
}

export default PetDocPrototype;
