// Generates the static pages. Run: node build.js
const fs = require('fs');
const PHONE = '(801) 491-6642', TEL = 'tel:+18014916642';
const EMAIL = 'COUNTRYAUTOSHOP@GMAIL.COM';
const MAPQ = encodeURIComponent('2500 S State St, Springville, UT 84663');
const DIRS = 'https://www.google.com/maps/dir/?api=1&destination=' + MAPQ;
const ic = (n, c = '') => `<i data-icon="${n}" class="${c}"></i>`;

const nav = (active) => {
  const l = [['index.html', 'Home'], ['services.html', 'Services'], ['about.html', 'About'], ['contact.html', 'Contact']];
  return `<header class="site-header"><div class="wrap">
  <a class="logo" href="index.html" aria-label="Country Auto home"><span class="logo-mark">${ic('wrench')}</span><span><b>Country Auto</b><small>Springville, Utah</small></span></a>
  <button class="nav-toggle" aria-label="Menu" aria-expanded="false">&#9776;</button>
  <nav class="nav">${l.map(([h, t]) => `<a href="${h}"${h === active ? ' class="active"' : ''}>${t}</a>`).join('')}<a class="nav-call" href="${TEL}">${PHONE}</a></nav>
</div></header>`;
};

const footer = `<footer class="site-footer"><div class="wrap footer-main">
  <div><a class="logo" href="index.html"><span class="logo-mark">${ic('wrench')}</span><span><b>Country Auto</b><small>Springville, Utah</small></span></a>
  <p style="max-width:380px">Honest automotive service since 2011. Serving drivers in Springville and throughout Utah County.</p>
  <div class="socials"><a href="https://www.yelp.com/biz/country-auto-springville" target="_blank" rel="noopener">Yelp</a><a href="https://www.facebook.com/CountryAutoUT" target="_blank" rel="noopener">Facebook</a></div></div>
  <div><h4>Quick Links</h4><ul><li><a href="index.html">Home</a></li><li><a href="services.html">Services</a></li><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li><li><a href="index.html#appointment">Schedule an Appointment</a></li></ul></div>
  <div><h4>Visit Us</h4><address><span>2500 S State St<br>Springville, UT 84663</span><a href="${TEL}">${PHONE}</a><a href="mailto:${EMAIL}">${EMAIL}</a><span>Mon–Fri: 8:00 AM–5:00 PM<br>Sat–Sun: Closed</span></address></div>
</div><div class="footer-bottom"><div class="wrap"><span>&copy; ${new Date().getFullYear()} Country Auto. All rights reserved.</span><span>2500 S State St, Springville, UT</span></div></div></footer>`;

const page = (file, title, desc, body) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${desc}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css"></head><body>
${nav(file)}
${body}
${footer}
<script src="js/main.js"></script></body></html>`;

const services = [
  ['Complete Auto Repair', 'Professional mechanical repairs for cars and trucks of all makes and models.', 'wrench', 'repair'],
  ['Oil Changes & Maintenance', 'Keep your vehicle running smoothly with routine maintenance and oil service.', 'oil', 'oil'],
  ['Brake Service', "Inspection, maintenance, and repair for your vehicle's braking system.", 'brake', 'brake'],
  ['Tire Sales & Service', 'Tire service to help keep your vehicle safe, stable, and road-ready.', 'tire', 'tire'],
  ['Emissions Testing', 'Convenient Utah County emissions testing for qualifying vehicles.', 'emissions', 'emissions'],
  ['Vehicle Diagnostics', 'Diagnostic services to identify warning lights, performance issues, and other vehicle problems.', 'diag', 'diag'],
  ['Cooling & Heating', "Service for your vehicle's heating and cooling systems.", 'climate', 'cooling'],
  ['Alignments', 'Wheel alignment service to support proper handling and tire wear.', 'align', 'align'],
  ['On-the-Spot Registration Renewal', 'Convenient registration renewal services available at the shop.', 'doc', 'reg']
];
const allServices = [
  ['Mechanical Auto Repair', 'Professional mechanical repairs for cars and trucks of all makes and models.', 'wrench', 'repair'],
  ['Oil Changes & Maintenance', 'Routine maintenance and oil service to keep your vehicle running smoothly.', 'oil', 'oil'],
  ['Brake Service', "Inspection, maintenance, and repair for your vehicle's braking system.", 'brake', 'brake'],
  ['Tire Sales & Service', 'Tire service to help keep your vehicle safe, stable, and road-ready.', 'tire', 'tire'],
  ['Emissions Testing', 'Convenient Utah County emissions testing for qualifying vehicles.', 'emissions', 'emissions'],
  ['Vehicle Diagnostics', 'Diagnostic services to identify warning lights, performance issues, and other vehicle problems.', 'diag', 'diag'],
  ['Wheel Alignments', 'Wheel alignment service to support proper handling and tire wear.', 'align', 'align'],
  ['Cooling & Heating', "Service for your vehicle's heating and cooling systems.", 'climate', 'cooling'],
  ['Electronic Tune-Ups', 'Tune-up service to help your vehicle perform the way it should.', 'bolt', 'tune'],
  ['Timing Belt Service', 'Timing belt service for your vehicle.', 'gear', 'belt'],
  ['On-the-Spot Registration Renewal', 'Convenient registration renewal services available at the shop.', 'doc', 'reg']
];
const serviceOptions = allServices.map(s => s[0]).concat(['Not sure / Other']);

const cards = (list) => `<div class="cards">${list.map(([t, d, i, im], n) => `<article class="card"><div class="card-top" style="background-image:url(img/svc-${im}.jpg)"><span class="num">${String(n + 1).padStart(2, '0')}</span>${ic(i)}</div>
<div class="card-body"><h3>${t}</h3><p>${d}</p><div class="card-actions"><a class="btn sm" href="index.html#appointment">Schedule</a><a class="btn sm dark" href="${TEL}">Call Us</a></div></div></article>`).join('')}</div>`;

const form = (id, extraNote) => `<div class="form-card"${id ? ` id="${id}"` : ''}>
<h3>Request an Appointment</h3><p class="note">${extraNote} Fields marked <b style="color:var(--red)">*</b> are required.</p>
<form class="appt-form" novalidate-off>
<div class="form-grid">
<div class="field"><label for="${id}fn">First Name <i>*</i></label><input id="${id}fn" name="first_name" autocomplete="given-name" required></div>
<div class="field"><label for="${id}ln">Last Name</label><input id="${id}ln" name="last_name" autocomplete="family-name"></div>
<div class="field"><label for="${id}ph">Phone Number <i>*</i></label><input id="${id}ph" name="phone" type="tel" autocomplete="tel" required></div>
<div class="field"><label for="${id}em">Email Address <i>*</i></label><input id="${id}em" name="email" type="email" autocomplete="email" required></div>
<div class="field"><label for="${id}vy">Vehicle Year</label><input id="${id}vy" name="vehicle_year" inputmode="numeric" maxlength="4" placeholder="e.g. 2018"></div>
<div class="field"><label for="${id}vm">Vehicle Make</label><input id="${id}vm" name="vehicle_make"></div>
<div class="field"><label for="${id}vo">Vehicle Model</label><input id="${id}vo" name="vehicle_model"></div>
<div class="field"><label for="${id}sv">Service Needed <i>*</i></label><select id="${id}sv" name="service" required><option value="">Select a service</option>${serviceOptions.map(s => `<option>${s.replace('&', '&amp;')}</option>`).join('')}</select></div>
<div class="field"><label for="${id}dt">Preferred Date <i>*</i></label><input id="${id}dt" name="date" type="date" required></div>
<div class="field"><label for="${id}tm">Preferred Time</label><select id="${id}tm" name="time"><option value="">Any time</option><option>Morning (8 AM–12 PM)</option><option>Afternoon (12 PM–5 PM)</option></select></div>
<div class="field full"><label for="${id}dd">Additional Details</label><textarea id="${id}dd" name="details" placeholder="Tell us what's going on with your vehicle"></textarea></div>
</div>
<button class="btn" type="submit">Request Appointment</button>
<div class="form-status" role="status" aria-live="polite"></div>
</form></div>`.replace(' novalidate-off', '');

const apptSection = (id) => `<section class="appt" id="appointment"><div class="wrap">
<div class="appt-copy"><span class="kicker" style="color:#fff">Request a Visit</span><h2>Schedule an Appointment</h2><p>Tell us what your vehicle needs and request a convenient service time.</p><span class="proto">Prototype request form</span>
<div class="call">${ic('phone')}<span><small>Prefer to call?</small><a href="${TEL}">${PHONE}</a></span></div></div>
${form(id, 'This is a request form prototype, not a live calendar.')}
</div></section>`;

const infoBar = `<section class="info-bar"><div class="wrap">
<a class="info-item" href="${TEL}">${ic('phone')}<div><b>Call</b><span>${PHONE}</span></div></a>
<a class="info-item" href="mailto:${EMAIL}">${ic('mail')}<div><b>Email</b><span>${EMAIL}</span></div></a>
<a class="info-item" href="${DIRS}" target="_blank" rel="noopener">${ic('pin')}<div><b>Visit</b><span>2500 S State St<br>Springville, UT 84663</span></div></a>
<div class="info-item">${ic('clock')}<div><b>Hours</b><span>Mon–Fri: 8:00 AM–5:00 PM<br>Sat–Sun: Closed</span></div></div>
</div></section>`;

// ---------- HOME ----------
const home = `<section class="hero"><div class="wrap"><div class="hero-copy">
<span class="eyebrow">Springville, Utah &middot; Since 2011</span>
<h1>Reliable Auto Care. <span>Honest Service.</span></h1>
<p>From routine maintenance to major repairs, Country Auto provides dependable automotive service for drivers throughout Springville and Utah County.</p>
<div class="btns"><a class="btn" href="#appointment">Schedule an Appointment</a><a class="btn ghost" href="${TEL}">${ic('phone')} Call Country Auto</a></div></div></div>
<div class="hero-badge"><div><small>Since</small><b>2011</b></div></div></section>

<section class="section"><div class="wrap split">
<div class="copy"><span class="kicker">Why Country Auto</span><h2>New Technology. Old-Fashioned Values.</h2><div class="rule"></div>
<p>Since 2011, Country Auto has served the Springville community with a straightforward approach to automotive care. We combine modern diagnostic technology with honest service and practical solutions for your vehicle.</p>
<p>Whether you need routine maintenance, an emissions test, tire service, or mechanical repairs, our goal is to get you back on the road safely and confidently.</p>
<div class="btns"><a class="btn" href="about.html">About Country Auto</a><a class="btn dark" href="#appointment">Schedule Service</a></div></div>
<div class="vehicle"><img src="img/why.jpg" alt="Vehicle with open hood on a lift in a repair garage" loading="lazy"></div>
</div></section>

<section class="section gray" id="services"><div class="wrap">
<div class="section-head center"><span class="kicker">What We Do</span><h2>Our Services</h2><div class="rule"></div></div>
${cards(services)}
<div style="text-align:center;margin-top:44px"><a class="btn dark" href="services.html">See All Services</a></div>
</div></section>

<section class="section promo" style="padding:0"><div class="wrap">
<div class="promo-img"><img src="img/mechanic.jpg" alt="Technician working under the hood of a vehicle" loading="lazy"></div>
<div class="promo-copy"><span class="small">Cars &amp; Trucks &middot; All Makes &amp; Models</span><h2>Complete Care for Your Vehicle</h2>
<p>From routine maintenance to mechanical repairs, Country Auto helps keep your vehicle dependable and road-ready.</p>
<div class="btns"><a class="btn" href="services.html">View Our Services</a><a class="btn ghost" href="${TEL}">${ic('phone')} ${PHONE}</a></div></div>
</div></section>

${infoBar}
${apptSection('')}`;

// ---------- ABOUT ----------
const tiles = [
  ['Straightforward Service', 'We explain what your vehicle needs and help you understand your repair options.', 'chat', 'undefined'],
  ['Modern Diagnostics', 'We use current diagnostic technology to help identify vehicle problems accurately.', 'pc', 'undefined'],
  ['Local & Dependable', 'We are proud to serve Springville and the surrounding Utah County community.', 'pinlocal', 'undefined'],
  ["One Shop for Your Vehicle's Needs", 'From oil changes and brakes to tires, diagnostics, emissions testing, and mechanical repairs, we provide a wide range of automotive services.', 'all']
];
const about = `<section class="page-hero" style="background-image:url(img/about-hero.jpg)"><div class="wrap"><div class="sub">Honest Automotive Service Since 2011</div><h1>About Country Auto</h1></div></section>
<section class="section"><div class="wrap split rev">
<div class="vehicle left"><img src="img/about-split.jpg" alt="Mechanic using a tool on a vehicle" loading="lazy"></div>
<div class="copy"><span class="kicker">Our Story</span><h2>Honest Automotive Service Since 2011</h2><div class="rule"></div>
<p>Country Auto has been serving drivers in Springville and throughout Utah County since 2011. We believe automotive service should be built on honest communication, dependable workmanship, and old-fashioned customer care.</p>
<p>Our approach is simple: use modern technology to diagnose today's vehicles while maintaining the personal service customers expect from a local repair shop.</p>
<p>We work on cars and trucks of all makes and models and provide everything from routine maintenance to major mechanical repairs. When a repair requires a specialist or dealership, we believe in being honest about that too.</p></div>
</div></section>
<section class="section gray"><div class="wrap"><div class="section-head center"><span class="kicker">How We Work</span><h2>The Country Auto Way</h2><div class="rule"></div></div>
<div class="tiles">${tiles.map(([t, d, i]) => `<div class="tile">${ic(i)}<h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
<section class="cta-band"><div class="wrap"><div><h2>Your Vehicle Deserves Honest Care.</h2></div><a class="btn" href="index.html#appointment">Schedule Service</a></div></section>`;

// ---------- SERVICES ----------
const servicesPage = `<section class="page-hero" style="background-image:url(img/wrench.jpg)"><div class="wrap"><h1>Complete Automotive Services</h1><p>Country Auto provides automotive repair and maintenance services designed to keep your car or truck dependable, safe, and ready for the road.</p></div></section>
<section class="section gray"><div class="wrap">${cards(allServices)}</div></section>
<section class="cta-band"><div class="wrap"><div><h2>Not Sure What Your Vehicle Needs?</h2><p>Let Country Auto help identify the problem and recommend the right next step.</p></div><a class="btn" href="contact.html">Contact Us</a></div></section>`;

// ---------- CONTACT ----------
const contact = `<section class="page-hero" style="background-image:url(img/tools.jpg)"><div class="wrap"><div class="sub">Let's Get Your Vehicle Back on the Road.</div><h1>Contact Country Auto</h1><p>Have a question, need automotive service, or want to schedule a visit? Contact Country Auto today.</p></div></section>
<section class="section" style="padding-bottom:40px"><div class="wrap"><div class="contact-grid">
<div class="c-card">${ic('phone')}<h3>Phone</h3><p><a href="${TEL}">${PHONE}</a></p><p style="margin-top:16px"><a class="btn sm" href="${TEL}">Call Now</a></p></div>
<div class="c-card">${ic('mail')}<h3>Email</h3><p><a href="mailto:${EMAIL}">${EMAIL}</a></p></div>
<div class="c-card">${ic('pin')}<h3>Address</h3><p>2500 S State St<br>Springville, UT 84663</p><p style="margin-top:16px"><a class="btn sm dark" href="${DIRS}" target="_blank" rel="noopener">Get Directions</a></p></div>
<div class="c-card">${ic('clock')}<h3>Hours</h3><p>Monday–Friday:<br>8:00 AM–5:00 PM<br>Saturday–Sunday: Closed</p></div>
</div></div></section>
<section class="section" style="padding-top:56px"><div class="wrap map-row">
<div><span class="kicker">Send a Message</span><h2>Questions? Get in Touch.</h2><div class="rule"></div>
<form class="appt-form"><div class="form-grid">
<div class="field"><label for="cn">Name <i>*</i></label><input id="cn" name="first_name" required autocomplete="name"></div>
<div class="field"><label for="cp">Phone</label><input id="cp" name="phone" type="tel" autocomplete="tel"></div>
<div class="field full"><label for="ce">Email Address <i>*</i></label><input id="ce" name="email" type="email" required autocomplete="email"></div>
<div class="field full"><label for="cm">Message <i>*</i></label><textarea id="cm" name="message" required></textarea></div></div>
<button class="btn" type="submit" style="margin-top:22px">Send Message</button><div class="form-status" role="status" aria-live="polite"></div></form></div>
<div class="map-box"><iframe title="Map showing Country Auto at 2500 S State St, Springville, UT" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${MAPQ}&output=embed"></iframe></div>
</div></section>
${apptSection('')}`;

fs.writeFileSync('index.html', page('index.html', 'Country Auto | Auto Repair in Springville, UT', 'Country Auto provides dependable auto repair and maintenance in Springville, Utah. Honest service since 2011.', home));
fs.writeFileSync('about.html', page('about.html', 'About Country Auto | Springville, UT', 'Honest automotive service in Springville and Utah County since 2011.', about));
fs.writeFileSync('services.html', page('services.html', 'Auto Services | Country Auto, Springville UT', 'Auto repair, oil changes, brakes, tires, emissions testing, diagnostics, alignments and more in Springville, Utah.', servicesPage));
fs.writeFileSync('contact.html', page('contact.html', 'Contact Country Auto | Springville, UT', 'Call (801) 491-6642 or visit Country Auto at 2500 S State St, Springville, UT 84663.', contact));
console.log('built');
