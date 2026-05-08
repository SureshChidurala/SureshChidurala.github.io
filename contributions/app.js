// ========================================================
// Realtyka Contributors Dashboard — Dynamic Renderer
// Reads from CONTRIBUTORS_DATA in data.js
// ========================================================

(function () {
  const D = CONTRIBUTORS_DATA;

  // --- Helpers ---
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  function rankClass(i) {
    if (i === 0) return 'rank rank-1';
    if (i === 1) return 'rank rank-2';
    if (i === 2) return 'rank rank-3';
    return 'rank';
  }

  function fmt(n) { return n.toLocaleString(); }

  function isHighlight(username) {
    return username === D.highlightUser;
  }

  // --- Header ---
  $('#lastUpdated').textContent = 'Last updated: ' + D.lastUpdated;
  $('#orgName').textContent = D.org;
  $('#myUsername').textContent = D.highlightUser;

  // --- Stat Cards ---
  const totalCommits = D.myContributions.reduce((s, c) => s + c.commits, 0);
  const webApps = D.frontendApps.filter(a => a.type === 'web').length;
  const mobileApps = D.frontendApps.filter(a => a.type === 'mobile').length;

  $('#statCards').innerHTML = [
    { value: D.frontendApps.length, label: 'Frontend Apps' },
    { value: webApps + ' / ' + mobileApps, label: 'Web / Mobile' },
    { value: D.myContributions.length, label: 'Repos Contributed' },
    { value: fmt(totalCommits), label: 'Your Total Commits' },
  ].map(s => `
    <div class="stat-card">
      <div class="value">${s.value}</div>
      <div class="label">${s.label}</div>
    </div>
  `).join('');

  // --- Top by Commits Table ---
  function renderCommitsTable(sortBy) {
    let data = [...D.topByCommits].map((d, i) => ({ ...d, origRank: i + 1 }));
    if (sortBy === 'name') data.sort((a, b) => a.username.localeCompare(b.username));

    const maxCommits = D.topByCommits[0].commits;

    $('#commitsTableBody').innerHTML = data.map((d, i) => {
      const rank = sortBy === 'name' ? d.origRank : i + 1;
      const pct = ((d.commits / maxCommits) * 100).toFixed(1);
      const hl = isHighlight(d.username) ? ' highlight-row' : '';
      return `
        <tr class="${hl}">
          <td><span class="${rankClass(rank - 1)}">${rank}</span></td>
          <td class="username">${d.username}</td>
          <td>${fmt(d.commits)}</td>
          <td><div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%"></div></div></td>
        </tr>`;
    }).join('');
  }

  renderCommitsTable('rank');

  // --- Top by Repos Table ---
  const maxRepos = D.topByRepos[0].repos;
  $('#reposTableBody').innerHTML = D.topByRepos.map((d, i) => {
    const pct = ((d.repos / maxRepos) * 100).toFixed(1);
    const hl = isHighlight(d.username) ? ' highlight-row' : '';
    return `
      <tr class="${hl}">
        <td><span class="${rankClass(i)}">${i + 1}</span></td>
        <td class="username">${d.username}</td>
        <td>${d.repos}</td>
        <td><div class="mini-bar"><div class="mini-bar-fill" style="width:${pct}%"></div></div></td>
      </tr>`;
  }).join('');

  // --- My Contributions Chart ---
  const maxMyCommits = D.myContributions[0].commits;
  $('#myChart').innerHTML = D.myContributions.map(d => {
    const pct = ((d.commits / maxMyCommits) * 100).toFixed(1);
    const pctOfTotal = ((d.commits / totalCommits) * 100).toFixed(1);
    return `
      <div class="bar-row">
        <span class="bar-label">${d.repo}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        <span class="bar-value">${fmt(d.commits)}</span>
        <span class="bar-pct">${pctOfTotal}%</span>
      </div>`;
  }).join('');

  // --- Apps Grid ---
  function renderApps(filter) {
    const apps = filter === 'all' ? D.frontendApps : D.frontendApps.filter(a => a.type === filter);
    $('#appsGrid').innerHTML = apps.map((a, i) => `
      <div class="app-card" style="animation-delay:${i * 0.05}s">
        <div class="app-name">${a.name}</div>
        <div class="app-desc">${a.description}</div>
        <span class="app-type app-type-${a.type}">${a.type}</span>
      </div>
    `).join('');
  }

  renderApps('all');

  // --- Tab Switching ---
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.tab').forEach(t => t.classList.remove('active'));
      $$('.panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      $('#panel-' + tab.dataset.tab).classList.add('active');
    });
  });

  // --- Sort Controls ---
  $$('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.dataset.panel;
      $$('.sort-btn[data-panel="' + panel + '"]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (panel === 'commits') renderCommitsTable(btn.dataset.sort);
    });
  });

  // --- Filter Controls ---
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderApps(btn.dataset.filter);
    });
  });
})();
