/* ============================================================
   STIRE — main.js
   Cursor · Loader · Nav · Parallax · Reveal · Counters
   ============================================================ */

/* ---- LOADER ---- */
const loader    = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderBtn = document.getElementById('loader-enter');

let progress = 0;
const fillBar = setInterval(() => {
  progress += Math.random() * 4 + 1;
  if (progress >= 100) {
    progress = 100;
    clearInterval(fillBar);
    loaderBtn && setTimeout(() => { loaderBtn.style.display = 'inline-block'; }, 200);
  }
  loaderBar && (loaderBar.style.width = progress + '%');
}, 60);

function enterSite() {
  if (loader) {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

loaderBtn && loaderBtn.addEventListener('click', enterSite);
document.body.style.overflow = 'hidden'; // lock scroll during load

// Auto-enter after 5 s
setTimeout(enterSite, 5200);

/* ---- CUSTOM CURSOR ---- */
const cursor     = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function animCursor() {
  if (cursor)     cursor.style.transform     = `translate(${mx - 5}px, ${my - 5}px)`;
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  if (cursorRing) cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .svc-card, .proj-card, .stat-item, .testi-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!cursorRing) return;
    cursorRing.style.width       = '56px';
    cursorRing.style.height      = '56px';
    cursorRing.style.borderColor = '#e8c96a';
  });
  el.addEventListener('mouseleave', () => {
    if (!cursorRing) return;
    cursorRing.style.width       = '36px';
    cursorRing.style.height      = '36px';
    cursorRing.style.borderColor = '#c9a84c';
  });
});

/* ---- NAV SCROLL ---- */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---- PARALLAX ---- */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;

  const heroGrid = document.querySelector('.hero-grid');
  if (heroGrid) heroGrid.style.transform = `translateY(${sy * 0.22}px)`;

  document.querySelectorAll('.proj-bg').forEach(bg => {
    const card = bg.closest('.proj-card');
    if (!card) return;
    const rect   = card.getBoundingClientRect();
    const offset = (rect.top / window.innerHeight - 0.5) * 28;
    bg.style.transform = `translateY(${offset}px)`;
  });
});

/* ---- SCROLL REVEAL ---- */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ---- COUNTER ANIMATION ---- */
function countUp(el, target, suffix) {
  let start = null;
  const dur = 1600;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const stats = [
  { suffix: '+',  value: 50  },
  { suffix: '%',  value: 98  },
  { suffix: 'x',  value: 3   },
  { suffix: 'yr', value: 4   },
];

const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-n').forEach((el, i) => {
        if (stats[i]) countUp(el, stats[i].value, stats[i].suffix);
      });
      cntObs.disconnect();
    }
  });
}, { threshold: 0.4 });

const statSection = document.querySelector('.stat-grid');
if (statSection) cntObs.observe(statSection);
