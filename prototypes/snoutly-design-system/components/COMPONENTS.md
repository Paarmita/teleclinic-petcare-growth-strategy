# Snoutly components

React 18 components exposed on `window.Snoutly` (`components/bundle.js`), styled by `components/bundle.css` (class prefix `sn-`) on top of `tokens.css`. Props: `components/index.d.ts`. Live examples: `components/examples/*.html`.

## Chunky pill buttons with an ink outline and a 'sticker' shadow that squishes down when pressed.

- **Consumer provides:** `children` (a short verb phrase), optional `icon`/`iconRight`, `variant`, `size`, `block`, plus any `<button>` props.
- `primary` (tangerine `brand`, text `on-brand`) — ONE per screen: the next step of the consult flow ("Start video consult", "Pay ₹499").
- `secondary` (`surface-raised`) — the alternative path ("Book later"). `ghost` — low-stakes navigation ("Back", "Skip").
- `danger` — only for emergency routes ("Emergency help"); always with the `alert` icon. Never use it for playful moments.
- Sizes: `lg` 56px for the bottom sticky CTA on mobile; `md` 48px default; `sm` 40px inside cards. Use `block` for full-width bottom CTAs within the 16px gutter.
- Do: write labels as actions, sentence case. Don't: put two primaries side by side, or exclamation marks on buttons.

## A toggleable pill for quick picks — symptoms, pet type, time slots — so owners tap instead of type.

- **Consumer provides:** `children` (1–3 words), `selected`, `onClick`; optional `icon` (replaced by a check when selected).
- Selected chips fill with `brand-tint`, gain an ink outline and a check — selection never relies on colour alone.
- Wrap chips in a flex row with `space-2` gaps; they reflow on narrow screens. Always offer a "Something else" chip that opens a TextField.
- Exposes `aria-pressed`. Minimum height 40px with 8px gaps keeps a ≥48px effective target.

## A small pill that labels status — vet availability, consult state, urgency — or a fun perk.

- **Consumer provides:** `tone` and a short `children` label (always a word, never a lone dot).
- Availability: `online` (mint dot), `busy` (sunny dot), `away` (grey dot).
- States: `success` (teal + check), `waiting` (amber text + clock), `urgent` (danger + alert). Success is teal, kept off the red–green axis, and every state has an icon and a word.
- `fun` (bubblegum) is for perks and celebrations only; `neutral` for facts like species and age.

## Snoutly's own rounded line icons: 24px grid, 2.2px round-capped strokes, `currentColor`; `paw` and `star` are solid.

- **Consumer provides:** `name`, optional `size` (default 24) and `label` (only when the icon stands alone and carries meaning; otherwise it is hidden from screen readers).
- Set: paw, chat, video, calendar, home, user, heart, star, send, check, alert, clock, plus, back.
- Icons inherit text colour: `ink` by default, `on-brand` on tangerine. Keep icons ≥3:1 against their ground.
- No emoji in UI chrome — the paw is our mascot shape.

## A labelled single- or multi-line input with friendly hint and error text.

- **Consumer provides:** `label` (always visible — never placeholder-only), optional `hint`, `error`, `multiline`, plus native input props.
- 16px input text so iOS never zooms; 48px minimum height; `line-strong` border, ink border on focus, `danger` border plus alert icon and message on error.
- Errors say how to fix it, kindly: "Please enter a number, like 12.5" — never "Invalid input".

## A wobbly blob with the pet's initial, tinted by species, with a little paw sticker.

- **Consumer provides:** `name`, `species` (`dog` brand-tint · `cat` bubblegum-tint · `bird` sky-tint · `rabbit` mint-tint · `other` sunny-tint), optional `size` (default 56) and `showPaw`.
- Each species has its own blob shape so a pet list feels lively. When the owner uploads a photo, clip it to the same blob and keep the ink outline.
- Hide the paw below 40px. Always paired with the pet's name in text nearby.

## The vet listing card: who they are, how pets rate them, availability, price and a consult button.

- **Consumer provides:** `name`, `specialty`, `rating`, `reviews`, `price`, optional `nextSlot`, `status` (`online`/`busy`/`away`), `mode` (`chat`/`video` sets the button icon), `cta`, `initials`, `onConsult`.
- Stack cards in a single column on mobile with `space-5` gaps; two columns from 720px.
- The rating star is decoration in `sunny`; the number beside it carries the meaning.
- Use "happy pets" for review counts — the card's one playful touch. Keep credentials and price plain and factual.

## A message in the consult chat: vets speak from bubblegum bubbles on the left, owners from white bubbles on the right.

- **Consumer provides:** `from` (`vet` · `owner` · `system`), `children`, optional `author` and `time`.
- Place the thread on `surface-sunken` with `space-2` between bubbles; show `author` only on the first of a run from the vet.
- `system` lines are centred and muted ("Dr. Meera joined the consult").
- Messages use 16px text for comfortable reading on phones.

## Three hopping dots in a vet bubble that show the vet is replying — the waiting moment, made cute.

- **Consumer provides:** optional `label` (default "Vet is typing…"). Announced politely to screen readers via `role="status"`.
- Animation stops under `prefers-reduced-motion`.

## A step tracker of paw prints for the booking flow: done steps become mint checks, the current paw tilts and sticks out.

- **Consumer provides:** `steps` (2–5 short labels) and `current` (0-based index).
- Sits at the top of each booking screen under the title. Labels stay 1–2 words so it fits 360px.
- State is shown by fill, icon and label weight — not colour alone. Exposes `aria-current="step"`.

## The floating mobile tab bar — the app's home base, within thumb reach.

- **Consumer provides:** `items` (`{id, label, icon, badge?}`, 3–5 of them), `active`, `onChange`.
- Float it 12px above the bottom edge inside the 16px gutter; it pads for the iOS safe area. Reserve `nav-height` + 24px of bottom space in scroll content.
- The active tab gets a tangerine pill behind its icon and a bolder label. Badges (bubblegum) count unread vet messages only.
- From 960px wide, replace it with a side rail using the same items.

