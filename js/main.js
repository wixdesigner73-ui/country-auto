(function () {
  var P = {
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L3 18l3 3 6.5-6.5a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    oil: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9 14.5a3 3 0 0 0 3 3"/>',
    brake: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
    tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/><path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21"/>',
    emissions: '<rect x="5" y="4" width="14" height="17" rx="1.5"/><path d="M9 4V3h6v1M8.5 13l2.5 2.5 4.5-5"/>',
    diag: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4M6 10h3l1.5-3 3 6 1.5-3H18"/>',
    climate: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M9.5 3.8 12 6l2.5-2.2M9.5 20.2 12 18l2.5 2.2"/>',
    align: '<path d="M8 3v18M16 3v18"/><path d="M4 8l4-4 4 4M12 16l4 4 4-4" /><path d="M4 8h0"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/><circle cx="12" cy="12" r="6.8"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    check: '<path d="m4 12.5 5 5L20 6.5"/>',
    car: '<path d="M3 15v-3l2-5h14l2 5v3zM3 15v3h3v-3M18 15v3h3v-3"/><circle cx="7.5" cy="12.5" r=".8"/><circle cx="16.5" cy="12.5" r=".8"/>',
    shield: '<path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    pc: '<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/><path d="m8 10 2.5 2.5L16 8"/>',
    pinlocal: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><path d="m9 9 2 2 4-4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    all: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
  };
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    var p = P[el.getAttribute('data-icon')];
    if (!p) return;
    el.outerHTML = '<svg class="icon ' + (el.getAttribute('class') || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + p + '</svg>';
  });

  var toggle = document.querySelector('.nav-toggle'), nav = document.querySelector('.nav'), header = document.querySelector('.site-header');
  if (toggle) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    header.classList.toggle('scrolled-open', open);
  });
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); header.classList.remove('scrolled-open'); });
  });

  var today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  var min = today.toISOString().slice(0, 10);
  document.querySelectorAll('input[type=date]').forEach(function (d) { d.min = min; });

  document.querySelectorAll('form.appt-form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var s = f.querySelector('.form-status');
      s.innerHTML = '<strong>Thanks' + (f.elements.first_name.value ? ', ' + f.elements.first_name.value.replace(/[<>&]/g, '') : '') + '.</strong> This is a prototype form, so your request has not been sent. To reach Country Auto, please call <a href="tel:+18014916642"><strong>(801) 491-6642</strong></a>.';
      s.classList.add('show');
      s.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
})();
