/* @ds-bundle: {"format":4,"namespace":"Snoutly","components":[{"name":"Button"},{"name":"Chip"},{"name":"Badge"},{"name":"Icon"},{"name":"TextField"},{"name":"PetAvatar"},{"name":"VetCard"},{"name":"ChatBubble"},{"name":"TypingDots"},{"name":"PawProgress"},{"name":"BottomNav"}]} */
(function () {
  var React = window.React, h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }
  function rest(p, keys) { var o = {}; for (var k in p) if (keys.indexOf(k) < 0) o[k] = p[k]; return o; }

  var FILLED = { paw: 1, star: 1 };
  var P = {
    paw: [['circle', { cx: 6.2, cy: 10.2, r: 2.1 }], ['circle', { cx: 9.8, cy: 6.2, r: 2.1 }], ['circle', { cx: 14.2, cy: 6.2, r: 2.1 }], ['circle', { cx: 17.8, cy: 10.2, r: 2.1 }], ['path', { d: 'M12 11.6c-3 0-5.6 3.1-5.6 5.4 0 1.7 1.2 2.4 2.7 2.4 1.2 0 1.9-.6 2.9-.6s1.7.6 2.9.6c1.5 0 2.7-.7 2.7-2.4 0-2.3-2.6-5.4-5.6-5.4z' }]],
    chat: [['path', { d: 'M4.5 12c0-4 3.4-7 7.5-7s7.5 3 7.5 7-3.4 7-7.5 7c-1.2 0-2.3-.2-3.3-.6L4.5 19.5l1-3.4c-.6-1.2-1-2.6-1-4.1z' }]],
    video: [['rect', { x: 3, y: 6.5, width: 12, height: 11, rx: 3 }], ['path', { d: 'M15 10.5l5.5-3v9l-5.5-3z' }]],
    calendar: [['rect', { x: 3.5, y: 5, width: 17, height: 15, rx: 3.5 }], ['path', { d: 'M3.5 10h17M8 3v4M16 3v4' }]],
    home: [['path', { d: 'M4 11l8-6.5 8 6.5v8a1.5 1.5 0 0 1-1.5 1.5H15v-5.5H9v5.5H5.5A1.5 1.5 0 0 1 4 19z' }]],
    user: [['circle', { cx: 12, cy: 8, r: 3.6 }], ['path', { d: 'M5 20c1-3.8 4-5.6 7-5.6s6 1.8 7 5.6' }]],
    heart: [['path', { d: 'M12 19.5s-7.5-4.5-7.5-9.8A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.4c0 5.3-7.5 9.8-7.5 9.8z' }]],
    star: [['path', { d: 'M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z' }]],
    send: [['path', { d: 'M4.5 12L20 4.5 15 20l-3-6.2z' }], ['path', { d: 'M12 13.8L20 4.5' }]],
    check: [['path', { d: 'M5 12.5l4.5 4.5L19 7.5' }]],
    alert: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7.8v5M12 16.2v.1' }]],
    clock: [['circle', { cx: 12, cy: 12, r: 8.5 }], ['path', { d: 'M12 7.5V12l3 2' }]],
    plus: [['path', { d: 'M12 5v14M5 12h14' }]],
    back: [['path', { d: 'M14.5 5.5L8 12l6.5 6.5' }]]
  };

  function Icon(props) {
    var name = props.name || 'paw', size = props.size || 24, shapes = P[name] || P.paw, filled = FILLED[name];
    return h('svg', {
      className: cx('sn-icon', props.className), width: size, height: size, viewBox: '0 0 24 24',
      fill: filled ? 'currentColor' : 'none', stroke: filled ? 'none' : 'currentColor',
      strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round',
      'aria-hidden': props.label ? undefined : true, role: props.label ? 'img' : undefined, 'aria-label': props.label
    }, shapes.map(function (s, i) { return h(s[0], Object.assign({ key: i }, s[1])); }));
  }

  function Button(p) {
    var variant = p.variant || 'primary', size = p.size || 'md';
    var o = rest(p, ['variant', 'size', 'block', 'icon', 'iconRight', 'className', 'children']);
    return h('button', Object.assign({ type: 'button' }, o, {
      className: cx('sn-btn', 'sn-btn--' + variant, 'sn-btn--' + size, p.block && 'sn-btn--block', p.className)
    }), p.icon && h(Icon, { name: p.icon, size: size === 'sm' ? 18 : 20 }), h('span', null, p.children), p.iconRight && h(Icon, { name: p.iconRight, size: size === 'sm' ? 18 : 20 }));
  }

  function Chip(p) {
    var o = rest(p, ['selected', 'icon', 'className', 'children']);
    return h('button', Object.assign({ type: 'button', 'aria-pressed': !!p.selected }, o, {
      className: cx('sn-chip', p.selected && 'is-selected', p.className)
    }), p.selected ? h(Icon, { name: 'check', size: 16 }) : (p.icon && h(Icon, { name: p.icon, size: 16 })), h('span', null, p.children));
  }

  var BADGE_ICON = { success: 'check', urgent: 'alert', waiting: 'clock' };
  function Badge(p) {
    var tone = p.tone || 'neutral', ic = BADGE_ICON[tone];
    var dot = tone === 'online' || tone === 'busy' || tone === 'away';
    return h('span', { className: cx('sn-badge', 'sn-badge--' + tone, p.className) },
      dot && h('i', { className: 'sn-badge__dot', 'aria-hidden': true }),
      ic && h(Icon, { name: ic, size: 14 }), p.children);
  }

  function TextField(p) {
    var id = React.useId(), o = rest(p, ['label', 'hint', 'error', 'multiline', 'className']);
    var desc = (p.error || p.hint) ? id + '-d' : undefined;
    return h('div', { className: cx('sn-field', p.error && 'is-error', p.className) },
      p.label && h('label', { className: 'sn-field__label', htmlFor: id }, p.label),
      h(p.multiline ? 'textarea' : 'input', Object.assign({ id: id, 'aria-invalid': !!p.error, 'aria-describedby': desc, rows: p.multiline ? 3 : undefined }, o, { className: 'sn-field__input' })),
      (p.error || p.hint) && h('p', { id: desc, className: 'sn-field__msg' }, p.error && h(Icon, { name: 'alert', size: 16 }), p.error || p.hint));
  }

  function PetAvatar(p) {
    var size = p.size || 56, species = p.species || 'dog', name = p.name || '?';
    return h('span', { className: cx('sn-pet', 'sn-pet--' + species, p.className), style: { width: size, height: size, fontSize: Math.round(size * 0.42) }, role: 'img', 'aria-label': name + ' (' + species + ')' },
      h('span', { 'aria-hidden': true }, name.charAt(0).toUpperCase()),
      p.showPaw !== false && h('span', { className: 'sn-pet__paw', 'aria-hidden': true }, h(Icon, { name: 'paw', size: Math.max(12, Math.round(size * 0.24)) })));
  }

  function VetAvatar(p) {
    return h('span', { className: 'sn-vet__avatar', 'aria-hidden': true }, p.initials);
  }

  function VetCard(p) {
    var initials = p.initials || (p.name || '').replace(/^Dr\.?\s*/, '').split(' ').map(function (w) { return w.charAt(0); }).join('').slice(0, 2);
    return h('article', { className: cx('sn-vet', p.className) },
      h('div', { className: 'sn-vet__top' },
        h(VetAvatar, { initials: initials }),
        h('div', { className: 'sn-vet__who' },
          h('h3', { className: 'sn-vet__name' }, p.name),
          h('p', { className: 'sn-vet__title' }, p.specialty),
          h('p', { className: 'sn-vet__meta' }, h('span', { className: 'sn-vet__star' }, h(Icon, { name: 'star', size: 16 })), h('b', null, p.rating), ' · ' + Number(p.reviews).toLocaleString('en-IN') + ' happy pets')),
        p.status && h(Badge, { tone: p.status }, p.statusLabel || ({ online: 'Online', busy: 'In a consult', away: 'Away' })[p.status])),
      h('div', { className: 'sn-vet__bottom' },
        h('div', null, h('p', { className: 'sn-vet__price' }, p.price), p.nextSlot && h('p', { className: 'sn-vet__slot' }, p.nextSlot)),
        h(Button, { size: 'sm', icon: p.mode === 'video' ? 'video' : 'chat', onClick: p.onConsult }, p.cta || 'Consult')));
  }

  function ChatBubble(p) {
    var from = p.from || 'owner';
    return h('div', { className: cx('sn-msg', 'sn-msg--' + from, p.className) },
      p.author && h('p', { className: 'sn-msg__author' }, p.author),
      h('div', { className: 'sn-msg__bubble' }, p.children),
      p.time && h('p', { className: 'sn-msg__time' }, p.time));
  }

  function TypingDots(p) {
    return h('div', { className: 'sn-typing', role: 'status' },
      h('span', { className: 'sn-typing__dots', 'aria-hidden': true }, h('i'), h('i'), h('i')),
      h('span', { className: 'sn-typing__label' }, p.label || 'Vet is typing…'));
  }

  function PawProgress(p) {
    var steps = p.steps || [], cur = p.current || 0;
    return h('ol', { className: cx('sn-steps', p.className), 'aria-label': 'Progress' },
      steps.map(function (s, i) {
        var state = i < cur ? 'done' : i === cur ? 'current' : 'todo';
        return h('li', { key: i, className: 'sn-steps__item is-' + state, 'aria-current': state === 'current' ? 'step' : undefined },
          h('span', { className: 'sn-steps__paw' }, state === 'done' ? h(Icon, { name: 'check', size: 18 }) : h(Icon, { name: 'paw', size: 18 })),
          h('span', { className: 'sn-steps__label' }, s));
      }));
  }

  function BottomNav(p) {
    var items = p.items || [];
    return h('nav', { className: cx('sn-nav', p.className), 'aria-label': p.label || 'Main' },
      items.map(function (it) {
        var active = it.id === p.active;
        return h('button', { key: it.id, type: 'button', className: cx('sn-nav__item', active && 'is-active'), 'aria-current': active ? 'page' : undefined, onClick: function () { p.onChange && p.onChange(it.id); } },
          h('span', { className: 'sn-nav__icon' }, h(Icon, { name: it.icon, size: 22 }), it.badge ? h('b', { className: 'sn-nav__badge' }, it.badge) : null),
          h('span', { className: 'sn-nav__label' }, it.label));
      }));
  }

  var api = { Button: Button, Chip: Chip, Badge: Badge, Icon: Icon, TextField: TextField, PetAvatar: PetAvatar, VetCard: VetCard, ChatBubble: ChatBubble, TypingDots: TypingDots, PawProgress: PawProgress, BottomNav: BottomNav };
  window.Snoutly = Object.assign(window.Snoutly || {}, api);
})();
