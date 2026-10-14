/* Heartline home opening — logo draw only. Runs before site.js. */
(function () {
  var root = document.documentElement;
  var intro = document.getElementById('intro');
  if (!intro) return;
  if (!root.classList.contains('intro-active')) { intro.classList.add('is-done'); return; }
  try { sessionStorage.setItem('hl-intro', '1'); } catch (e) {}
  document.body.style.overflow = 'hidden';

  var E = 'cubic-bezier(.4,0,.2,1)';
  var main = intro.querySelector('.intro-logo.main');

  /* draw the logo (3.5s) */
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
  main.querySelector('.caps').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: 3800, fill: 'forwards' });

  /* logo fades out */
  main.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1200, delay: 5000, easing: E, fill: 'forwards' });

  /* header logo appears */
  setTimeout(function () { root.classList.remove('intro-pending'); }, 5500);

  /* overlay fades to reveal page */
  setTimeout(function () {
    intro.style.pointerEvents = 'none';
    intro.animate([{ backgroundColor: 'rgba(11,11,12,1)' }, { backgroundColor: 'rgba(11,11,12,0)' }], { duration: 1200, easing: E, fill: 'forwards' });
  }, 5000);

  /* release scroll and clean up */
  setTimeout(function () {
    document.body.style.overflow = '';
    root.classList.remove('intro-active');
    intro.classList.add('is-done');
  }, 6500);
})();
