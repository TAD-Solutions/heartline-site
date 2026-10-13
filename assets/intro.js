/* Heartline home opening — Warm Glow & Clear. Runs before site.js. */
(function () {
  var root = document.documentElement;
  var intro = document.getElementById('intro');
  if (!intro) return;
  if (!root.classList.contains('intro-active')) { intro.classList.add('is-done'); return; }
  try { sessionStorage.setItem('hl-intro', '1'); } catch (e) {}
  window.HL_INTRO = { film: 7.0, h1: 8.0, h2: 9.5, rest: 11.0 };
  document.body.style.overflow = 'hidden';

  var E = 'cubic-bezier(.4,0,.2,1)';
  var main = intro.querySelector('.intro-logo.main');
  var bleed = intro.querySelector('.intro-logo.bleed');
  var wash = intro.querySelector('.intro-wash');

  /* slow draw (3.5s) */
  main.querySelectorAll('.st, .core').forEach(function (p) {
    var L = p.getTotalLength();
    p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
    p.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], { duration: 3500, delay: p.closest('.pk') ? 150 : 0, easing: 'cubic-bezier(.4,.05,.35,1)', fill: 'forwards' });
  });
  main.querySelectorAll('.tl').forEach(function (t) {
    t.animate([{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 400, delay: 3200, easing: E, fill: 'forwards' });
  });
  main.querySelectorAll('.dt').forEach(function (t) {
    t.animate([{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 350, delay: 3500, easing: E, fill: 'forwards' });
  });
  main.classList.add('is-ready');
  bleed.classList.add('is-ready');
  main.querySelector('.caps').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: 3800, fill: 'forwards' });

  /* warm glow: wash builds slowly from 5s, 4s duration */
  wash.animate([
    { opacity: 0, transform: 'scale(.4)' },
    { opacity: .7, transform: 'scale(.9)' },
    { opacity: .6, transform: 'scale(1.4)' },
    { opacity: 0, transform: 'scale(2.2)' }
  ], { duration: 4000, delay: 5000, easing: 'ease-in-out', fill: 'forwards' });

  /* subtle warm bloom from bleed layer */
  bleed.querySelectorAll('.tl, .dt').forEach(function (t) { t.style.opacity = 1; });
  bleed.animate([
    { opacity: 0, filter: 'blur(0px)', transform: 'translate(-50%,-50%) scale(1)' },
    { opacity: .5, filter: 'blur(30px)', transform: 'translate(-50%,-50%) scale(1.3)' },
    { opacity: 0, filter: 'blur(60px)', transform: 'translate(-50%,-50%) scale(2)' }
  ], { duration: 3500, delay: 5500, easing: 'ease-in-out', fill: 'forwards' });

  /* logo fades out gently — no fly, just dissolves */
  main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1500, delay: 7000, easing: E, fill: 'forwards' });

  /* header logo appears */
  setTimeout(function () { root.classList.remove('intro-pending'); }, 7500);

  /* overlay fades, revealing the hero video beneath */
  setTimeout(function () {
    intro.style.pointerEvents = 'none';
    intro.animate([{ backgroundColor: 'rgba(11,11,12,1)' }, { backgroundColor: 'rgba(11,11,12,0)' }], { duration: 1500, easing: E, fill: 'forwards' });
  }, 7000);

  /* release scroll and remove the overlay */
  setTimeout(function () {
    document.body.style.overflow = '';
    root.classList.remove('intro-active');
    intro.classList.add('is-done');
  }, 12500);
})();
