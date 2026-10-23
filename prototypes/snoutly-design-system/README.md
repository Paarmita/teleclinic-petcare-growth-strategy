# Snoutly design system

Snoutly is online vet consultation for pets — chat or video with a real vet from the couch. The interface is a pocket-sized, sticker-book world: cream paper, tangerine pills, ink outlines and things that squish when you tap them. It should make a worried owner smile **and** feel in safe hands. Fun lives in the shapes, colour and motion; the words about a pet's health stay clear and calm.

## Content fundamentals

- **Voice:** a warm, upbeat vet nurse. Friendly first, never silly about symptoms. Speak to the owner as "you" and about the pet by name ("How is Biscuit doing?"). We are "we".
- **Casing:** sentence case everywhere — buttons, titles, tabs. No ALL CAPS, no exclamation marks on buttons.
- **Play where it's safe:** onboarding, empty states, waiting rooms, success screens and counts ("1,240 happy pets", "Fetching your vet…", "All done — treats are on you").
- **Calm where it matters:** symptoms, diagnoses, prescriptions, prices and emergencies use plain words, no puns. Urgent copy says what to do next: "This sounds urgent. Call your nearest emergency clinic now."
- **Errors are kind and fixable:** "Please enter a number, like 12.5" — never "Invalid input".
- **Emoji:** not in UI chrome (buttons, nav, headings). Owners and vets may use them in chat.

## Visual foundations

### Colour
- Ground is `surface` (warm cream); cards, sheets and owner chat bubbles are `surface-raised`; chat threads and input wells sit on `surface-sunken`.
- Text is `ink` on every surface and every `*-tint`; secondary text is `ink-muted` on the three surfaces only. Links are `brand-ink`.
- `brand` (tangerine) is the Snoutly colour: the one primary button per screen, the active nav pill, the logo. Text on it is always `on-brand` — never white.
- Accents each have a job: `bubblegum` = the vet's voice and celebrations, `mint` = online and done, `sky` = video and info, `sunny` = ratings and rewards, `berry` = deep hero panels (text `on-berry`).
- Species tints colour pet avatars: dog `brand-tint`, cat `bubblegum-tint`, bird `sky-tint`, rabbit `mint-tint`, other `sunny-tint`.
- Status: `success` is teal (off the red–green axis), `warning` amber, `danger` red — each on its `*-tint`, and always with an icon and a word.
- Both themes are first-class. Dark keeps the cream-paper warmth as a plum-night `surface`; accents lighten and take dark `on-brand` text.

### Type
- **Fredoka** (`display` family) for anything with personality: `display-xl`, `display`, `title`, `heading`. Weight 600, tight leading.
- **Nunito** (`body` family) for reading: `body-lg` for chat and leads, `body` default, `label` (800) for buttons, chips and field labels, `caption` for timestamps and nav labels.
- Both load from Google Fonts. Never below 12px; inputs are 16px so phones don't zoom.

### The sticker look
- Interactive things wear a `stroke-sticker` (2px) `ink` outline and sit on `shadow-sticker` — a hard 4px offset, no blur. Pressed: move down 3px and switch to `shadow-sticker-pressed`.
- Floating layers (bottom nav, sheets, toasts) use `shadow-float` instead.
- Decorative dividers are dashed `line`; control borders are `line-strong`.
- Radii are generous: `radius-pill` for buttons and chips, `radius-md` for fields and bubbles, `radius-lg` for cards and the nav, `radius-xl` for hero panels. Pet avatars are irregular blobs.

### Spacing and layout (mobile first)
- Design at `screen-min` (360px) first. Side gutter `space-4`; gap between cards `space-5`; between sections `space-6`.
- Every tap target is at least `tap-target` (48px). Primary actions live in the bottom third — a sticky `lg` block button above the bottom nav.
- One column on phones; two-column card grids from 720px; the bottom nav becomes a side rail from 960px.

### Motion
- The "boing": spring easing `cubic-bezier(.34,1.56,.64,1)`, 160–240ms. Buttons squish, chips pop, the current paw step tilts, typing dots hop.
- No motion on anything about health status or urgency. Everything stops under `prefers-reduced-motion`.

### Focus and accessibility
- Focus ring: `stroke-focus` (3px) solid `focus`, offset 2px, on every interactive element. It sits on the ground around the control, so it holds 3:1 on every surface in both themes.
- Text pairs meet 4.5:1 in both themes; control borders and meaningful icons meet 3:1. The rating star in `sunny` is decoration — the number beside it carries the meaning.

## Iconography
- Snoutly's own line set, built into the `Icon` component: 24px grid, 2.2px round-cap strokes, `currentColor`. `paw` and `star` are solid.
- The paw is our mascot shape: use it for pets, progress and the active-pet marker. No emoji or clip-art in chrome.
- Logo: `assets/Logos/snoutly-mark.svg` — a paw in a tangerine speech bubble. Set the word "Snoutly" beside it in `display`, `ink`.

## Components (summary)
`Button`, `Chip`, `Badge`, `Icon`, `TextField`, `PetAvatar`, `VetCard`, `ChatBubble`, `TypingDots`, `PawProgress`, `BottomNav` — global `window.Snoutly`, styles in `components/bundle.css` (prefix `sn-`).

## Files

- `tokens.css` — all tokens as CSS custom properties (light default, dark via `data-theme="dark"` or system preference) + type-style classes + Google Fonts import.
- `tokens.json` — the same tokens as data.
- `components/` — `bundle.js` (React 18, `window.Snoutly`), `bundle.css`, `index.d.ts` (props), `COMPONENTS.md` (usage guidelines), `examples/` (one live page per component).
- `assets/logos/snoutly-mark.svg` — the logo mark.
- `index.html` — open in a browser to see the whole system, with a light/dark toggle.

## Token reference

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--surface` | `#fff7ec` | `#1c1722` | Page background — warm biscuit cream. Default app ground. |
| `--surface-raised` | `#ffffff` | `#282130` | Cards, sheets, chat bubbles from the owner, inputs. |
| `--surface-sunken` | `#fbead6` | `#140f19` | Chat thread background, input wells, skeletons. |
| `--ink` | `#2b2033` | `#fbf2e6` | Primary text and sticker outlines on surface, surface-raised, surface-sunken and every *-tint. Also the sticker border. |
| `--ink-muted` | `#67596f` | `#c4b6cc` | Secondary text (timestamps, hints, meta) on surface, surface-raised and surface-sunken. |
| `--line` | `#eedfcc` | `#3b3244` | Decorative dividers only — never the only boundary of a control. |
| `--line-strong` | `#8c7b93` | `#8e7f99` | Text-field and unselected-chip borders (3:1 on surface and surface-raised). |
| `--brand` | `#ff8a3d` | `#ff9d5c` | Tangerine — the Snoutly colour. Primary buttons, active nav pill, the logo. Text on it is on-brand. |
| `--brand-ink` | `#b0440b` | `#ffb27f` | Links and brand-coloured text on surface and surface-raised. |
| `--brand-tint` | `#ffe3cc` | `#4a2c1a` | Soft tangerine fill: selected chips, dog avatars, highlights. Text on it is ink. |
| `--on-brand` | `#2b2033` | `#1c1722` | Text and icons on brand, sunny, mint, sky, bubblegum fills. |
| `--bubblegum` | `#ff8fb8` | `#ff9cc2` | Playful accent: favourites, celebratory moments, the vet's typing dots. |
| `--bubblegum-tint` | `#ffe0ec` | `#4a2235` | Cat avatars, vet chat bubbles. Text on it is ink. |
| `--mint` | `#4fd1a8` | `#5ddcb4` | Fresh accent: 'online now' dots, completed paw steps. |
| `--mint-tint` | `#d4f6ea` | `#173d33` | Rabbit avatars, success-adjacent soft panels. Text on it is ink. |
| `--sky` | `#79c2ff` | `#8ccbff` | Calm accent: video-call surfaces, info illustrations. |
| `--sky-tint` | `#d9eeff` | `#1a3350` | Bird avatars, info panels. Text on it is ink. |
| `--sunny` | `#ffcf3a` | `#ffd55a` | Rating stars, rewards, the 'treat' moments. |
| `--sunny-tint` | `#fff1bf` | `#45391a` | 'Other' pet avatars, gentle notices. Text on it is ink. |
| `--berry` | `#3d2457` | `#b892f0` | Deep plum: hero panels, the active nav item background in light, premium badges. Text on it is on-berry. |
| `--on-berry` | `#fff7ec` | `#1c1722` | Text and icons on berry. |
| `--success` | `#0a6f7a` | `#5fd4dc` | Teal (kept off the red–green axis): 'Consult complete', saved, paid. Always with an icon or word. Text on surface and success-tint. |
| `--success-tint` | `#d3f1f2` | `#123c40` | Success banner and badge fill. |
| `--warning` | `#7f5300` | `#ffcf5c` | Waiting-room and 'vet running late' text on surface and warning-tint. |
| `--warning-tint` | `#fff1bf` | `#45391a` | Warning banner and badge fill. |
| `--danger` | `#b3261e` | `#ff8a7a` | Urgent / emergency text and outlines on surface and danger-tint. Always paired with the alert icon and a word. |
| `--danger-tint` | `#ffe1dc` | `#4a1d18` | Urgent banner and badge fill. |
| `--focus` | `#2b2033` | `#ffd55a` | Focus ring: 3px solid, 2px offset, on every interactive element. |

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Icon-to-label gap inside chips and badges. |
| `--space-2` | `8px` | Gap between chips; between stacked chat bubbles from the same sender. |
| `--space-3` | `12px` | Button icon gap; inner padding of compact cards. |
| `--space-4` | `16px` | Screen side gutter on mobile; card padding. |
| `--space-5` | `20px` | Gap between cards in a list. |
| `--space-6` | `24px` | Gap between sections; sheet padding. |
| `--space-8` | `32px` | Top of screen to hero headline; tablet gutter. |
| `--space-12` | `48px` | Big breathing room around empty states and celebrations. |
| `--radius-sm` | `10px` | Badges, small tags, input inner elements. |
| `--radius-md` | `16px` | Text fields, chat bubbles, small cards. |
| `--radius-lg` | `24px` | Cards, sheets, the bottom nav. |
| `--radius-xl` | `32px` | Hero panels and onboarding illustrations. |
| `--radius-pill` | `999px` | Buttons, chips, the active nav pill. |
| `--stroke-sticker` | `2px` | Ink outline on buttons, cards, avatars and the bottom nav. |
| `--stroke-focus` | `3px` | Focus ring width (offset 2px). |
| `--tap-target` | `48px` | Minimum height/width of anything tappable. |
| `--nav-height` | `68px` | Bottom navigation bar height (plus safe-area inset). |
| `--screen-min` | `360px` | Design baseline width; everything must work here first. |
| `--shadow-sticker` | `0 4px 0 0 #2b2033` | The Snoutly 'sticker' lift under buttons and interactive cards; pair with the 2px ink border. |
| `--shadow-sticker-pressed` | `0 1px 0 0 #2b2033` | Pressed state: element moves down 3px and the shadow shrinks — a squish. |
| `--shadow-float` | `0 12px 32px rgba(43,32,51,0.16)` | Bottom nav, sheets and toasts floating above content. |

### Type styles (CSS classes in tokens.css)

| Class | Family | Size / line | Weight | Usage |
|---|---|---|---|---|
| `.display-xl` | display | 40px / 44px | 600 | One per screen: onboarding and celebration screens. |
| `.display` | display | 32px / 36px | 600 | Home and screen hero headlines. |
| `.title` | display | 24px / 30px | 600 | Screen titles in the top bar, sheet titles. |
| `.heading` | display | 19px / 24px | 600 | Card titles, vet names, section headers. |
| `.body-lg` | body | 17px / 26px | 500 | Lead paragraphs, chat messages. |
| `.body` | body | 15px / 22px | 500 | Default body copy and list rows. |
| `.label` | body | 14px / 18px | 800 | Buttons, chips, tabs, field labels. |
| `.caption` | body | 12px / 16px | 700 | Timestamps, badges, nav labels. Never below 12px. |
