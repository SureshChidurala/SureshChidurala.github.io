/* ==========================================================
   Suresh Chidurala — Portfolio
   - Animated stat counters
   - Live GitHub data fetch
   - Scroll-reveal
   ========================================================== */

const GH_USER = 'SureshChidurala';

// ---------- Year in footer ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Animated stat counters ----------
function animateCount(el, target, duration = 1400) {
  const start = performance.now();
  const startVal = 0;
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(startVal + (target - startVal) * eased);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        if (!Number.isNaN(target)) animateCount(el, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const stripEl = document.getElementById('stats-strip');
if (stripEl) statsObserver.observe(stripEl);

// ---------- Live GitHub data ----------
async function fetchJson(url) {
  const r = await fetch(url, { headers: { 'Accept': 'application/vnd.github+json' } });
  if (!r.ok) throw new Error(`GitHub API ${r.status}`);
  return r.json();
}

async function loadGithubStats() {
  const followersEl = document.getElementById('gh-followers');
  const reposEl = document.getElementById('gh-public-repos');
  const prsEl = document.getElementById('gh-public-prs');

  try {
    const [user, prSearch] = await Promise.all([
      fetchJson(`https://api.github.com/users/${GH_USER}`),
      fetchJson(`https://api.github.com/search/issues?q=author:${GH_USER}+type:pr&per_page=1`),
    ]);

    if (user.followers != null && followersEl) followersEl.textContent = user.followers.toLocaleString();
    if (user.public_repos != null && reposEl) reposEl.textContent = user.public_repos.toLocaleString();
    if (prSearch.total_count != null && prsEl) prsEl.textContent = prSearch.total_count.toLocaleString();
  } catch (err) {
    console.warn('GitHub stats unavailable:', err.message);
    [followersEl, reposEl, prsEl].forEach((el) => { if (el && el.textContent === '—') el.textContent = '—'; });
  }
}
loadGithubStats();

// ---------- Scroll-reveal ----------
const revealEls = document.querySelectorAll('.about-card, .proj, .tl-card, .skill-cat, .contact-card');
revealEls.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el) => revealObserver.observe(el));

// ---------- Click to copy email ----------
const emailLink = document.getElementById('email-link');
const emailValue = document.getElementById('email-value');
if (emailLink && emailValue) {
  emailLink.addEventListener('click', (e) => {
    if (!navigator.clipboard) return;
    e.preventDefault();
    navigator.clipboard.writeText(emailValue.textContent.trim()).then(() => {
      const original = emailValue.textContent;
      emailValue.textContent = 'Copied to clipboard ✓';
      setTimeout(() => {
        emailValue.textContent = original;
      }, 1500);
    }).catch(() => {
      window.location.href = emailLink.href;
    });
  });
}
