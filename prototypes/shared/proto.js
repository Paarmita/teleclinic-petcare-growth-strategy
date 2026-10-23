/* PetDoc prototype shell — window.Proto. Plain JS (no JSX) so it loads from file://.
   Needs React 18, ReactDOM 18 and the Snoutly bundle (window.Snoutly) loaded first. */
(function () {
  var React = window.React, h = React.createElement, S = window.Snoutly;
  var LOGO = '../snoutly-design-system/assets/logos/snoutly-mark.svg';
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  /* ---------- Icons: the Snoutly set plus a few extras in the same 24px / 2.2px round style ---------- */
  var SN = { paw: 1, chat: 1, video: 1, calendar: 1, home: 1, user: 1, heart: 1, star: 1, send: 1, check: 1, alert: 1, clock: 1, plus: 1, back: 1 };
  var X = {
    x: [['path', { d: 'M6.5 6.5l11 11M17.5 6.5l-11 11' }]],
    chevron: [['path', { d: 'M9.5 5.5L16 12l-6.5 6.5' }]],
    down: [['path', { d: 'M5.5 9.5L12 16l6.5-6.5' }]],
    bell: [['path', { d: 'M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z' }], ['path', { d: 'M10 20.5a2.2 2.2 0 0 0 4 0' }]],
    pill: [['rect', { x: 3.5, y: 8.5, width: 17, height: 7, rx: 3.5, transform: 'rotate(-35 12 12)' }], ['path', { d: 'M9.6 8.6l4.8 6.8' }]],
    truck: [['path', { d: 'M3 7h11v9H3zM14 10h4l3 3v3h-7' }], ['circle', { cx: 7, cy: 17.5, r: 1.8 }], ['circle', { cx: 17, cy: 17.5, r: 1.8 }]],
    file: [['path', { d: 'M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z' }], ['path', { d: 'M14 3.5V8h4M9 12.5h6M9 16h6' }]],
    camera: [['path', { d: 'M4 8.5h3.2L9 6h6l1.8 2.5H20v10H4z' }], ['circle', { cx: 12, cy: 13.3, r: 3.2 }]],
    scale: [['rect', { x: 4, y: 4, width: 16, height: 16, rx: 4 }], ['path', { d: 'M8.5 10a4.5 4.5 0 0 1 7 0M12 10.5l1.5-2' }]],
    sun: [['circle', { cx: 12, cy: 12, r: 4 }], ['path', { d: 'M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4' }]],
    shield: [['path', { d: 'M12 3.5l7 2.5v5.5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6z' }], ['path', { d: 'M9 12l2.2 2.2L15.5 10' }]],
    refresh: [['path', { d: 'M19 12a7 7 0 1 1-2-4.9' }], ['path', { d: 'M19.5 4.5v4h-4' }]],
    image: [['rect', { x: 3.5, y: 5, width: 17, height: 14, rx: 3 }], ['circle', { cx: 9, cy: 10, r: 1.6 }], ['path', { d: 'M4 17l5-4.5 4 3.5 3-2.5 4 3.5' }]],
    list: [['path', { d: 'M9 7h11M9 12h11M9 17h11' }], ['circle', { cx: 5, cy: 7, r: .6 }], ['circle', { cx: 5, cy: 12, r: .6 }], ['circle', { cx: 5, cy: 17, r: .6 }]],
    sparkle: [['path', { d: 'M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z' }], ['path', { d: 'M18.5 16v4M16.5 18h4' }]],
    gift: [['rect', { x: 4, y: 9, width: 16, height: 11, rx: 2 }], ['path', { d: 'M3.5 9h17M12 9v11M12 9c-1.5-3.5-5.5-3.5-5.5-1S10 9 12 9zm0 0c1.5-3.5 5.5-3.5 5.5-1S14 9 12 9z' }]],
    phone: [['path', { d: 'M6.5 4h3l1.5 4-2 1.5a10 10 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 6a2 2 0 0 1 2-2z' }]],
    wifi: [['path', { d: 'M3.5 9.5a12 12 0 0 1 17 0M6.5 12.8a7.5 7.5 0 0 1 11 0M9.5 16a3.2 3.2 0 0 1 5 0' }], ['circle', { cx: 12, cy: 19, r: .8 }]],
    upload: [['path', { d: 'M12 15.5V4.5M7.5 9L12 4.5 16.5 9M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15' }]],
    book: [['path', { d: 'M5 5a1.5 1.5 0 0 1 1.5-1.5H19v15H6.5A1.5 1.5 0 0 0 5 20z' }], ['path', { d: 'M5 20a1.5 1.5 0 0 0 1.5 1h12.5M9 8h6' }]],
    moon: [['path', { d: 'M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z' }]],
    users: [['circle', { cx: 9, cy: 8.5, r: 3.2 }], ['path', { d: 'M3 19.5c.8-3.2 3.3-4.8 6-4.8s5.2 1.6 6 4.8' }], ['path', { d: 'M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.9c1.6.6 3 2 3.5 4.6' }]],
    edit: [['path', { d: 'M5 19l1-4L16 5l3 3L9 18z' }], ['path', { d: 'M14 7l3 3' }]],
    chart: [['path', { d: 'M4 19.5h16' }], ['path', { d: 'M5 15l4.5-4.5 3.5 3 6-6.5' }], ['path', { d: 'M15 7h4v4' }]],
    syringe: [['path', { d: 'M14.5 4.5l5 5M17 7l-9.5 9.5-3 .5.5-3L14.5 4.5M9 11l2 2M11.5 8.5l2 2M4.5 19.5l2-2' }]],
    bowl: [['path', { d: 'M3.5 12h17a8.5 7 0 0 1-17 0z' }], ['path', { d: 'M8 8.5c0-1.5 1-2 1-3.5M12 8.5c0-1.5 1-2 1-3.5M16 8.5c0-1.5 1-2 1-3.5' }]],
    tick: [['ellipse', { cx: 12, cy: 13, rx: 4.5, ry: 5.5 }], ['circle', { cx: 12, cy: 6.5, r: 1.8 }], ['path', { d: 'M7.5 10L4 8M7.5 14l-3.5 1M16.5 10L20 8M16.5 14l3.5 1M8.5 17.5L6 20.5M15.5 17.5l2.5 3' }]],
    euro: [['path', { d: 'M17.5 6.5a6.5 6.5 0 1 0 0 11M5 10.5h9M5 13.5h9' }]],
    lock: [['rect', { x: 5, y: 10.5, width: 14, height: 10, rx: 3 }], ['path', { d: 'M8 10.5V8a4 4 0 0 1 8 0v2.5' }]],
    mic: [['rect', { x: 9, y: 3.5, width: 6, height: 11, rx: 3 }], ['path', { d: 'M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5' }]],
    search: [['circle', { cx: 11, cy: 11, r: 6 }], ['path', { d: 'M15.5 15.5L20 20' }]],
    flag: [['path', { d: 'M6 20.5V4M6 4.5h11l-2 4 2 4H6' }]],
    thumb: [['path', { d: 'M7.5 10.5V20H4.5v-9.5zM7.5 10.5l3.5-6.5c1.5 0 2.5 1 2.2 2.6l-.7 3.4h5.3a1.8 1.8 0 0 1 1.8 2.1l-1.2 6.4a2 2 0 0 1-2 1.5H7.5' }]]
  };

  function Icon(p) {
    if (SN[p.name]) return h(S.Icon, p);
    var size = p.size || 24, shapes = X[p.name] || X.sparkle;
    return h('svg', {
      className: cx('sn-icon', p.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round',
      'aria-hidden': p.label ? undefined : true, role: p.label ? 'img' : undefined, 'aria-label': p.label
    }, shapes.map(function (s, i) { return h(s[0], Object.assign({ key: i }, s[1])); }));
  }

  /* ---------- Context so screens and frames can reach the prototype API ---------- */
  var Ctx = React.createContext(null);
  function useProto() { return React.useContext(Ctx); }

  var NAV = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'pets', label: 'My pets', icon: 'paw' },
    { id: 'consults', label: 'Consults', icon: 'chat' },
    { id: 'profile', label: 'Profile', icon: 'user' }
  ];

  /* Phone frame. nav: active tab id (omit to hide). cta: node pinned at the bottom. */
  function Phone(p) {
    var api = useProto();
    return h('div', { className: 'ph', role: 'region', 'aria-label': 'Phone prototype' },
      h('div', { className: 'ph__status', style: p.dark ? { background: 'var(--berry)', color: 'var(--on-berry)' } : null },
        h('span', null, '9:41'), h('span', { className: 'hstack', style: { gap: 6 } }, h(Icon, { name: 'wifi', size: 16 }), h('i', { style: p.dark ? { borderColor: 'var(--on-berry)' } : null }))),
      h('div', { className: 'ph__body' },
        p.children,
        p.cta && h('div', { className: 'ph__cta', style: p.nav ? { bottom: 0, paddingBottom: 'calc(var(--nav-height) + 28px)' } : null }, p.cta)),
      p.nav && h('div', { className: 'ph__nav' }, h(S.BottomNav, { items: p.navItems || NAV, active: p.nav, onChange: p.onNav || function () {} })),
      p.sheet,
      api && api.toastMsg && h('div', { className: 'toast', role: 'status' }, h(Icon, { name: 'check', size: 20 }), api.toastMsg));
  }

  /* Scroll area inside the phone. nav: true reserves space for the bottom nav. */
  function Scroll(p) {
    return h('div', { className: cx('ph__scroll', p.nav && 'ph__scroll--nav', p.className), style: p.style }, p.children);
  }

  function AppBar(p) {
    return h('header', { className: 'ab' },
      p.onBack ? h('button', { className: 'ab__icon', onClick: p.onBack, 'aria-label': 'Back' }, h(Icon, { name: 'back' })) : h('span', { style: { width: 8 } }),
      h('h2', { className: 'ab__title' }, p.title),
      p.right || null);
  }

  function LockScreen(p) {
    return h('div', { className: 'lock' },
      h('p', { className: 'lock__date' }, p.date || 'Thursday 12 March'),
      h('p', { className: 'lock__time' }, p.time || '9:41'),
      h('div', { className: 'lock__stack' }, p.children),
      p.hint && h('p', { className: 'lock__hint' }, p.hint));
  }

  function Push(p) {
    return h(p.onClick ? 'button' : 'div', { className: cx('push', !p.onClick && 'push--quiet'), onClick: p.onClick },
      h('span', { className: 'push__app' }, h('img', { src: LOGO, alt: '' })),
      h('span', { className: 'push__main' },
        h('span', { className: 'push__head' }, h('span', null, p.app || 'PetDoc'), h('span', null, p.when || 'now')),
        h('span', { className: 'push__title', style: { display: 'block' } }, p.title),
        h('span', { className: 'push__text', style: { display: 'block' } }, p.text)));
  }

  function Sheet(p) {
    if (!p.open) return null;
    return h('div', { className: 'scrim', onClick: function (e) { if (e.target === e.currentTarget && p.onClose) p.onClose(); } },
      h('div', { className: 'sheet', role: 'dialog', 'aria-modal': true, 'aria-label': p.label || 'Sheet' },
        h('span', { className: 'sheet__grab', 'aria-hidden': true }), p.children));
  }

  function Row(p) {
    return h(p.onClick ? 'button' : 'div', { className: 'row', onClick: p.onClick },
      p.icon && h('span', { className: cx('row__ic', p.iconClass) }, typeof p.icon === 'string' ? h(Icon, { name: p.icon, size: 22 }) : p.icon),
      h('span', { className: 'row__main' }, h('span', { className: 'row__t', style: { display: 'block' } }, p.title), p.sub && h('span', { className: 'row__s', style: { display: 'block' } }, p.sub)),
      p.right !== undefined ? p.right : (p.onClick ? h(Icon, { name: 'chevron', size: 20 }) : null));
  }

  function VetAv(p) { return h('span', { className: cx('vet-av', p.lg && 'vet-av--lg'), 'aria-hidden': true }, p.initials || 'LW'); }

  function Section(p) {
    return h('section', { className: 'sec' },
      (p.title || p.action) && h('div', { className: 'sec__h' }, h('h3', { className: 'sec__t' }, p.title), p.action && h('button', { className: 'sec__a', onClick: p.onAction }, p.action)),
      p.children);
  }

  /* Vet-side desktop frame */
  function Desk(p) {
    var api = useProto();
    return h('div', { className: 'desk', role: 'region', 'aria-label': 'Vet console prototype', style: { position: 'relative' } },
      h('div', { className: 'desk__bar' }, h('span', { className: 'desk__dots', 'aria-hidden': true }, h('i'), h('i'), h('i')), h('img', { src: LOGO, alt: '' }), h('span', null, p.title || 'PetDoc for vets'), h('span', { style: { flex: 1 } }), p.right),
      h('div', { className: 'desk__body' }, p.children),
      api && api.toastMsg && h('div', { className: 'toast', role: 'status', style: { bottom: 24, left: 'auto', right: 24, maxWidth: 360 } }, h(Icon, { name: 'check', size: 20 }), api.toastMsg));
  }

  /* ---------- Page shell ---------- */
  function Page(props) {
    var cfg = props.cfg, screens = cfg.screens;
    var _s = React.useState(screens[0].id), cur = _s[0], setCur = _s[1];
    var _st = React.useState(cfg.initialState || {}), state = _st[0], setState = _st[1];
    var _t = React.useState(null), toastMsg = _t[0], setToast = _t[1];
    var tRef = React.useRef();
    var idx = Math.max(0, screens.findIndex(function (s) { return s.id === cur; }));
    var scr = screens[idx];

    function go(id) { setCur(id); setToast(null); var b = document.querySelector('.ph__body, .desk__body'); if (b) b.scrollTop = 0; }
    var api = {
      screen: cur, state: state, toastMsg: toastMsg,
      go: go,
      next: function () { if (idx < screens.length - 1) go(screens[idx + 1].id); },
      back: function () { if (idx > 0) go(screens[idx - 1].id); },
      set: function (patch) { setState(function (s) { return Object.assign({}, s, typeof patch === 'function' ? patch(s) : patch); }); },
      reset: function () { setState(cfg.initialState || {}); go(screens[0].id); },
      toast: function (m) { setToast(m); clearTimeout(tRef.current); tRef.current = setTimeout(function () { setToast(null); }, 2600); }
    };
    var idea = cfg.idea;

    return h(Ctx.Provider, { value: api },
      h('header', { className: 'pp-top' },
        h('a', { className: 'pp-top__home', href: 'index.html' }, h('img', { src: LOGO, alt: '' }), h('span', null, 'PetDoc prototypes')),
        h('span', { className: 'pp-top__sp' }),
        h('button', { className: 'sn-btn sn-btn--ghost sn-btn--sm', onClick: function () { var r = document.documentElement; r.dataset.theme = (r.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark' ? 'light' : 'dark'; } }, h(Icon, { name: 'moon', size: 18 }), h('span', null, 'Theme')),
        h('a', { className: 'sn-btn sn-btn--secondary sn-btn--sm', href: 'index.html', style: { textDecoration: 'none' } }, h(Icon, { name: 'back', size: 18 }), h('span', null, 'All ideas'))),
      h('main', { className: 'pp-wrap' },
        h('aside', { className: 'pp-info' },
          h('span', { className: 'pp-code' }, idea.code + ' · ' + idea.group),
          h('h1', { className: 'pp-title' }, idea.title),
          h('div', { className: 'pp-meta' },
            idea.persona && h(S.Badge, { tone: 'fun' }, idea.persona),
            idea.impact && h(S.Badge, { tone: 'neutral' }, 'Impact: ' + idea.impact),
            idea.effort && h(S.Badge, { tone: 'neutral' }, 'Effort: ' + idea.effort),
            idea.when && h(S.Badge, { tone: 'waiting' }, idea.when)),
          h('div', { className: 'pp-story' }, h('p', null, idea.story)),
          idea.why && h('div', { className: 'pp-block' }, h('h3', null, 'Why'), h('p', null, idea.why)),
          h('div', { className: 'pp-block' }, h('h3', null, 'Flow'),
            h('ol', { className: 'pp-flow' }, screens.map(function (s, i) {
              return h('li', { key: s.id }, h('button', { className: cx(s.id === cur && 'is-on'), onClick: function () { go(s.id); }, 'aria-current': s.id === cur ? 'step' : undefined },
                h('span', { className: 'pp-flow__n' }, i + 1), h('span', null, s.label), s.who && h('span', { className: 'pp-flow__who' }, s.who)));
            }))),
          idea.measure && idea.measure.length && h('div', { className: 'pp-block' }, h('h3', null, 'What we measure'), h('ul', null, idea.measure.map(function (m, i) { return h('li', { key: i }, m); }))),
          idea.notes && idea.notes.length && h('div', { className: 'pp-block' }, h('h3', null, 'Design notes'), h('ul', null, idea.notes.map(function (m, i) { return h('li', { key: i }, m); })))),
        h('section', { className: 'pp-stage', 'aria-label': 'Prototype' },
          h('div', { className: 'pp-stage__nav' },
            h(S.Button, { variant: 'secondary', size: 'sm', icon: 'back', disabled: idx === 0, onClick: api.back }, 'Previous'),
            h('span', { className: 'label' }, (idx + 1) + ' / ' + screens.length),
            h(S.Button, { variant: 'secondary', size: 'sm', iconRight: 'send', disabled: idx === screens.length - 1, onClick: api.next }, 'Next'),
            h(S.Button, { variant: 'ghost', size: 'sm', onClick: api.reset }, 'Restart')),
          scr.caption && h('p', { className: 'pp-stage__cap' }, scr.caption),
          h(React.Fragment, { key: cur }, scr.render(api)))));
  }

  function mount(cfg) {
    document.title = cfg.idea.code + ' ' + cfg.idea.title + ' — PetDoc';
    ReactDOM.createRoot(document.getElementById('root')).render(h(Page, { cfg: cfg }));
  }

  /* Shared sample data so prototypes feel like one app */
  var data = {
    owner: { name: 'Anna' },
    pet: { name: 'Bella', species: 'dog', breed: 'Labrador mix', age: '4 years', weight: '27.4 kg' },
    kitten: { name: 'Milo', species: 'cat', breed: 'British Shorthair', age: '10 weeks', weight: '1.2 kg' },
    senior: { name: 'Oskar', species: 'cat', breed: 'Domestic shorthair', age: '13 years', weight: '4.1 kg', condition: 'Chronic kidney disease (stage 2)' },
    vet: { name: 'Dr. Lena Weber', initials: 'LW', specialty: 'Small animals · Skin & digestion' },
    vet2: { name: 'Dr. Jonas Brandt', initials: 'JB', specialty: 'Small animals · Internal medicine' },
    price: '€39'
  };

  window.Proto = { mount: mount, useProto: useProto, Icon: Icon, Phone: Phone, Scroll: Scroll, AppBar: AppBar, LockScreen: LockScreen, Push: Push, Sheet: Sheet, Row: Row, VetAv: VetAv, Section: Section, Desk: Desk, LOGO: LOGO, data: data, cx: cx };
})();
