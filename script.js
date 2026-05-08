/* ==========================================================
   Suresh Chidurala — Portfolio
   - Animated stat counters
   - Live GitHub data fetch
   - Scroll-reveal
   - Contributions section
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
const revealEls = document.querySelectorAll('.about-card, .proj, .tl-card, .skill-cat, .contact-card, .contrib-stats, .contrib-card, .c-app-card');
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

// ==========================================================
// CONTRIBUTIONS SECTION — Data + Rendering
// ==========================================================

const CONTRIB = {
  highlightUser: 'SureshChidurala',

  topByCommits: [
    { u: 'vivek25constants', c: 11799 },
    { u: 'rawat-hitesh', c: 9244 },
    { u: 'yogi-fabstudios', c: 9053 },
    { u: 'piyushstack', c: 8220 },
    { u: 'vinesh4Real', c: 7265 },
    { u: 'atharvathanekar', c: 7236 },
    { u: 'abdulwasey', c: 6899 },
    { u: 'msquitieri', c: 6616 },
    { u: 'SureshChidurala', c: 6249 },
    { u: 'omkar-yelpale', c: 5005 },
    { u: 'RishavShah03', c: 4355 },
    { u: 'iraviteja', c: 4146 },
    { u: 'U1-Shankar', c: 3596 },
    { u: 'kevinking00', c: 3293 },
    { u: 'viznusri', c: 3008 },
    { u: 'skkaushik21', c: 2926 },
    { u: 'sameersitre', c: 2917 },
    { u: 'yashwanthanumula', c: 2196 },
    { u: 'mominnawaf-real', c: 2150 },
    { u: 'AyushSinghP', c: 2048 },
  ],

  topByRepos: [
    { u: 'msquitieri', r: 21 },
    { u: 'vivek25constants', r: 16 },
    { u: 'kevinking00', r: 14 },
    { u: 'piyushstack', r: 13 },
    { u: 'SureshChidurala', r: 12 },
    { u: 'atharvathanekar', r: 12 },
    { u: 'yogi-fabstudios', r: 11 },
    { u: 'sliangreal', r: 11 },
    { u: 'sameersitre', r: 11 },
    { u: 'iraviteja', r: 11 },
  ],

  myRepos: [
    { repo: 'bolt', commits: 3248 },
    { repo: 'real-app', commits: 1071 },
    { repo: 'airm', commits: 526 },
    { repo: 'real-signature', commits: 509 },
    { repo: 'phoenix', commits: 450 },
    { repo: 'onereal', commits: 191 },
    { repo: 'dak', commits: 144 },
    { repo: 'airm-app', commits: 53 },
    { repo: 'onereal-app', commits: 36 },
    { repo: 'dali', commits: 19 },
    { repo: 'runway', commits: 1 },
    { repo: 'marshaller', commits: 1 },
  ],

  apps: [
    { name: 'bolt', type: 'web', desc: 'Main agent dashboard (reZEN)' },
    { name: 'airm', type: 'web', desc: 'Agent Intelligence & Relationship Manager' },
    { name: 'onereal', type: 'web', desc: 'Consumer-facing web app' },
    { name: 'onereal-mortgage-web', type: 'web', desc: 'One Real Mortgage web app' },
    { name: 'real-signature', type: 'web', desc: 'Real Signature web app' },
    { name: 'runway', type: 'web', desc: 'Landing page (joinreal.com)' },
    { name: 'phoenix', type: 'web', desc: 'AI consumer property search' },
    { name: 'iris-web', type: 'web', desc: 'Agent referral system web' },
    { name: 'dali', type: 'web', desc: 'PDF rendering service' },
    { name: 'dak', type: 'web', desc: 'Email rendering service' },
    { name: 'real-app', type: 'mobile', desc: 'Main React Native mobile app' },
    { name: 'airm-app', type: 'mobile', desc: 'AiRM mobile app' },
    { name: 'onereal-app', type: 'mobile', desc: 'Consumer mobile app' },
    { name: 'onereal-mortgage-app', type: 'mobile', desc: 'Mortgage mobile app' },
    { name: 'iris-app', type: 'mobile', desc: 'Referral system mobile app' },
    { name: 'leo-voice-ui', type: 'mobile', desc: 'Leo voice UI' },
  ],
};

function fmt(n) { return n.toLocaleString(); }
function rankCls(i) {
  if (i === 0) return 'c-rank c-rank-1';
  if (i === 1) return 'c-rank c-rank-2';
  if (i === 2) return 'c-rank c-rank-3';
  return 'c-rank';
}

// --- My Repos bar chart ---
function renderMyRepos() {
  const el = document.getElementById('myRepoBars');
  if (!el) return;
  const max = CONTRIB.myRepos[0].commits;
  const total = CONTRIB.myRepos.reduce((s, r) => s + r.commits, 0);
  el.innerHTML = CONTRIB.myRepos.map((r, i) => {
    const pct = ((r.commits / max) * 100).toFixed(1);
    const pctTotal = ((r.commits / total) * 100).toFixed(1);
    return `<div class="c-bar-row" style="animation-delay:${i * 0.06}s">
      <span class="c-bar-label">${r.repo}</span>
      <div class="c-bar-track"><div class="c-bar-fill" style="width:${pct}%"></div></div>
      <span class="c-bar-value">${fmt(r.commits)}</span>
      <span class="c-bar-pct">${pctTotal}%</span>
    </div>`;
  }).join('');
}
renderMyRepos();

// --- Top by Commits table ---
function renderTopCommits() {
  const el = document.getElementById('topCommitsBody');
  if (!el) return;
  const max = CONTRIB.topByCommits[0].c;
  el.innerHTML = CONTRIB.topByCommits.map((d, i) => {
    const pct = ((d.c / max) * 100).toFixed(1);
    const hl = d.u === CONTRIB.highlightUser ? ' c-highlight' : '';
    return `<tr class="${hl}">
      <td><span class="${rankCls(i)}">${i + 1}</span></td>
      <td class="c-username">${d.u}</td>
      <td>${fmt(d.c)}</td>
      <td><div class="c-minibar"><div class="c-minibar-fill" style="width:${pct}%"></div></div></td>
    </tr>`;
  }).join('');
}
renderTopCommits();

// --- Top by Repos table ---
function renderTopRepos() {
  const el = document.getElementById('topReposBody');
  if (!el) return;
  const max = CONTRIB.topByRepos[0].r;
  el.innerHTML = CONTRIB.topByRepos.map((d, i) => {
    const pct = ((d.r / max) * 100).toFixed(1);
    const hl = d.u === CONTRIB.highlightUser ? ' c-highlight' : '';
    return `<tr class="${hl}">
      <td><span class="${rankCls(i)}">${i + 1}</span></td>
      <td class="c-username">${d.u}</td>
      <td>${d.r}</td>
      <td><div class="c-minibar"><div class="c-minibar-fill" style="width:${pct}%"></div></div></td>
    </tr>`;
  }).join('');
}
renderTopRepos();

// --- Frontend Apps grid ---
function renderApps(filter) {
  const el = document.getElementById('appsGrid');
  if (!el) return;
  const apps = filter === 'all' ? CONTRIB.apps : CONTRIB.apps.filter(a => a.type === filter);
  el.innerHTML = apps.map(a => `
    <div class="c-app-card">
      <div class="c-app-name">${a.name}</div>
      <div class="c-app-desc">${a.desc}</div>
      <span class="c-app-type c-app-type-${a.type}">${a.type}</span>
    </div>
  `).join('');

  // Re-observe for reveal
  el.querySelectorAll('.c-app-card').forEach(card => {
    card.classList.add('reveal');
    revealObserver.observe(card);
  });
}
renderApps('all');

// --- Tab switching ---
document.querySelectorAll('.contrib-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.contrib-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.contrib-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('cpanel-' + tab.dataset.ctab);
    if (panel) panel.classList.add('active');
  });
});

// --- App filter switching ---
document.querySelectorAll('.contrib-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.contrib-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderApps(btn.dataset.appfilter);
  });
});
