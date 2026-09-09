/* Heartline Productions - shared behaviour. Spec: design/site-spec.md */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var root = document.documentElement;
  if (reduce) root.classList.add('no-motion');

  /* smooth scroll */
  var lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) { lenis.on('scroll', ScrollTrigger.update); }
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      });
    });
  }

  /* header */
  var header = document.querySelector('.site-header');
  var lastY = 0;
  function onScroll() {
    var y = window.scrollY || 0;
    if (!header) return;
    header.classList.toggle('is-scrolled', y > 80);
    if (y > 320 && y > lastY + 4) header.classList.add('is-hidden');
    else if (y < lastY - 4) header.classList.remove('is-hidden');
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  var path = location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav a, .mobile-menu nav a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
  });

  /* mobile menu */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      burger.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
      menu.hidden = open;
      menu.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
      if (lenis) open ? lenis.start() : lenis.stop();
    });
  }

  /* cursor */
  var cursor = document.querySelector('.cursor');
  if (cursor && fine && !reduce) {
    document.body.classList.add('has-cursor');
    var dot = cursor.querySelector('.cursor-dot'), ring = cursor.querySelector('.cursor-ring'), label = cursor.querySelector('.cursor-label');
    var mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest('a, button, .btn, [data-cursor]');
      cursor.classList.toggle('is-hover', !!t);
      var word = t && t.getAttribute('data-cursor');
      cursor.classList.toggle('has-label', !!word);
      label.textContent = word || '';
    });
    document.addEventListener('mouseleave', function () { mx = my = -100; });
  }

  /* magnetic buttons */
  if (fine && !reduce) {
    document.querySelectorAll('.btn').forEach(function (b) {
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
        b.style.transform = 'translate(' + x * 8 + 'px,' + y * 8 + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  /* reveals */
  function splitLines(el) {
    var text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    var words = text.split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span class="w">' + w + '</span>'; }).join(' ');
    var lines = [], cur = [], top = null;
    Array.prototype.forEach.call(el.querySelectorAll('.w'), function (w) {
      var t = w.offsetTop;
      if (top === null) top = t;
      if (t !== top) { lines.push(cur); cur = []; top = t; }
      cur.push(w.textContent);
    });
    lines.push(cur);
    el.innerHTML = lines.map(function (l) { return '<span class="line"><span>' + l.join(' ') + '</span></span>'; }).join('');
  }
  if (window.gsap && !reduce) {
    if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
    var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    fontsReady.then(function () {
      document.querySelectorAll('.reveal-lines').forEach(function (el) {
        splitLines(el);
        gsap.to(el.querySelectorAll('.line > span'), { y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    });
    document.querySelectorAll('.reveal-group').forEach(function (g) {
      gsap.to(g.querySelectorAll('.reveal'), { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: g, start: 'top 85%', once: true } });
    });
    document.querySelectorAll('.reveal').forEach(function (el) {
      if (el.closest('.reveal-group')) return;
      gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
    /* hero intro */
    var hero = document.querySelector('.hero');
    if (hero) {
      var h1 = hero.querySelector('h1');
      var l1 = h1 && h1.querySelector('.l1'), l2 = h1 && h1.querySelector('.l2');
      var T = window.HL_INTRO; /* set by intro.js on the home page when the logo opening plays */
      if (T && l1 && l2) {
        /* two-beat headline after the logo opening */
        gsap.set([hero.querySelector('.label'), l1, l2, hero.querySelector('.hero-sub'), hero.querySelector('.hero-actions')], { opacity: 0, y: 40 });
        gsap.set(hero.querySelector('.rule'), { width: 0 });
        var tl = gsap.timeline();
        tl.to(hero.querySelector('.label'), { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, T.h1)
          .to(l1, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, T.h1)
          .to(l2, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, T.h2)
          .to(hero.querySelector('.rule'), { width: 140, duration: 0.8, ease: 'power3.inOut' }, T.rest)
          .to(hero.querySelector('.hero-sub'), { opacity: 1, y: 0, duration: 0.9 }, T.rest + 0.1)
          .to(hero.querySelector('.hero-actions'), { opacity: 1, y: 0, duration: 0.9 }, T.rest + 0.2);
      } else {
        if (h1 && !h1.querySelector('.word')) {
          h1.querySelectorAll('.l1, .l2').forEach(function (line) {
            line.innerHTML = line.textContent.trim().split(/\s+/).map(function (w) { return '<span class="word">' + w + '</span>'; }).join(' ');
          });
          if (!l1) h1.innerHTML = h1.textContent.trim().split(/\s+/).map(function (w) { return '<span class="word">' + w + '</span>'; }).join(' ');
        }
        var tl = gsap.timeline({ delay: 0.2 });
        tl.to(hero.querySelectorAll('.word'), { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06 })
          .to(hero.querySelector('.rule'), { width: 140, duration: 0.8, ease: 'power3.inOut' }, '-=0.3')
          .to(hero.querySelector('.hero-sub'), { opacity: 1, duration: 0.8 }, '-=0.4')
          .to(hero.querySelector('.hero-actions'), { opacity: 1, duration: 0.8 }, '-=0.6');
      }
      var media = hero.querySelector('.hero-media video, .hero-media img');
      if (media) gsap.to(media, { scale: 1, duration: 6, ease: 'power2.out', delay: T ? T.film : 0 });
      gsap.to(hero.querySelector('.hero-inner'), { y: 80, opacity: 0.2, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    }
  } else {
    document.querySelectorAll('.reveal, .hero .word, .hero-sub, .hero-actions').forEach(function (el) { el.style.opacity = 1; el.style.transform = 'none'; });
  }

  /* film card hover preview */
  document.querySelectorAll('.film-card').forEach(function (card) {
    var v = card.querySelector('video');
    if (!v) return;
    card.addEventListener('mouseenter', function () { v.play().catch(function () {}); });
    card.addEventListener('mouseleave', function () { v.pause(); v.currentTime = 0; });
  });

  /* forms: inline validation + friendly errors, posts to Web3Forms */
  document.querySelectorAll('form[data-web3forms]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    form.querySelectorAll('textarea[maxlength]').forEach(function (ta) {
      var c = ta.parentElement.querySelector('.count');
      function upd() { if (c) c.textContent = ta.value.length + ' / ' + ta.maxLength; }
      ta.addEventListener('input', upd); upd();
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        var field = f.closest('.field');
        var bad = !f.value.trim() || (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
        if (field) field.classList.toggle('error', bad);
        if (bad) ok = false;
      });
      if (!ok) { status.textContent = 'Please fill in the highlighted fields.'; return; }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      status.textContent = 'Sending your message.';
      var data = new FormData(form);
      fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && j.success) { status.textContent = 'Thank you. Rania will reply within two working days.'; form.reset(); }
          else { throw new Error('bad'); }
        })
        .catch(function () { status.textContent = 'That did not go through. Email rania@heartline.productions or message on WhatsApp and we will pick it up.'; })
        .then(function () { if (btn) btn.disabled = false; });
    });
  });
})();
