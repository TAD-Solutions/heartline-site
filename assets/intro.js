/* Heartline home opening. Timings per design/site-spec.md (round 5 pick #2). Runs before site.js. */
(function () {
  var root = document.documentElement;
  var intro = document.getElementById('intro');
  if (!intro) return;
  /* the gate script in <head> adds intro-active before first paint when the opening should play */
  if (!root.classList.contains('intro-active')) { intro.classList.add('is-done'); return; }
  try { sessionStorage.setItem('hl-intro', '1'); } catch (e) {}
  window.HL_INTRO = { film: 4.0, h1: 4.6, h2: 5.3, rest: 5.9 };
  document.body.style.overflow = 'hidden';

  var E = 'cubic-bezier(.22,1,.36,1)';
  var main = intro.querySelector('.intro-logo.main');
  var bleed = intro.querySelector('.intro-logo.bleed');
  var wash = intro.querySelector('.intro-wash');

  /* draw */
  main.querySelectorAll('.st, .core').forEach(function (p) {
    var L = p.getTotalLength();
    p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
    p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 2600, delay: p.closest('.pk') ? 120 : 0, easing: 'cubic-bezier(.5,.05,.35,1)', fill: 'forwards' });
  });
  main.querySelectorAll('.tl').forEach(function (t) { t.animate([{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 350, delay: 2500, easing: E, fill: 'forwards' }); });
  main.querySelectorAll('.dt').forEach(function (t) { t.animate([{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 300, delay: 2950, easing: E, fill: 'forwards' }); });
  main.classList.add('is-ready');
  bleed.classList.add('is-ready');
  main.querySelector('.caps').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 700, delay: 3200, fill: 'forwards' });

  /* bleed clone: fully drawn, pink only */
  bleed.querySelectorAll('.tl, .dt').forEach(function (t) { t.style.opacity = 1; });
  bleed.animate([
    { opacity: 0, filter: 'blur(0px)', transform: 'translate(-50%,-50%) scale(1)' },
    { opacity: .9, filter: 'blur(24px)', transform: 'translate(-50%,-50%) scale(1.5)' },
    { opacity: 0, filter: 'blur(60px)', transform: 'translate(-50%,-50%) scale(2.6)' }
  ], { duration: 1200, delay: 3600, easing: 'cubic-bezier(.4,0,.6,1)', fill: 'forwards' });
  wash.animate([
    { opacity: 0, transform: 'scale(.6)' }, { opacity: .9, transform: 'scale(1.3)' }, { opacity: 0, transform: 'scale(2)' }
  ], { duration: 1100, delay: 3800, easing: 'linear', fill: 'forwards' });

  /* glide to the header logo slot (FLIP) */
  setTimeout(function () {
    var target = document.querySelector('.site-header .logo img');
    var from = main.getBoundingClientRect();
    var to = target ? target.getBoundingClientRect() : { left: 28, top: 28, width: from.width * .14 };
    var s = to.width / from.width;
    var dx = to.left - from.left, dy = to.top - from.top;
    main.style.transformOrigin = '0 0';
    var a = main.animate([
      { transform: 'translate(-50%,-50%) translate(0px,0px) scale(1)' },
      { transform: 'translate(-50%,-50%) translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')' }
    ], { duration: 1200, easing: E, fill: 'forwards' });
    a.onfinish = function () {
      root.classList.remove('intro-pending');
      main.style.opacity = 0;
    };
  }, 3800);

  /* the film surfaces: overlay fades from 4.0s */
  setTimeout(function () {
    intro.style.pointerEvents = 'none';
    intro.animate([{ backgroundColor: 'rgba(11,11,12,1)' }, { backgroundColor: 'rgba(11,11,12,0)' }], { duration: 1100, fill: 'forwards' });
  }, 4000);

  /* release scroll and remove the overlay */
  setTimeout(function () {
    document.body.style.overflow = '';
    root.classList.remove('intro-active');
    intro.classList.add('is-done');
  }, 6200);
})();
