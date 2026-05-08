// ========================================================
// Realtyka Contributors Data
// Last updated: 2026-05-08
//
// To refresh: run the GitHub API queries and update the
// arrays below. The page reads from this file only.
// ========================================================

const CONTRIBUTORS_DATA = {
  lastUpdated: '2026-05-08',
  org: 'Realtyka',
  highlightUser: 'SureshChidurala',

  // Frontend application repos
  frontendApps: [
    { name: 'bolt', type: 'web', description: 'Main agent dashboard (reZEN)' },
    { name: 'airm', type: 'web', description: 'Agent Intelligence & Relationship Manager' },
    { name: 'onereal', type: 'web', description: 'Consumer-facing web app' },
    { name: 'onereal-mortgage-web', type: 'web', description: 'One Real Mortgage web app' },
    { name: 'real-signature', type: 'web', description: 'Real Signature web app' },
    { name: 'runway', type: 'web', description: 'Landing page (joinreal.com)' },
    { name: 'phoenix', type: 'web', description: 'Web app' },
    { name: 'iris-web', type: 'web', description: 'Agent referral system web' },
    { name: 'dali', type: 'web', description: 'PDF rendering service' },
    { name: 'dak', type: 'web', description: 'Email rendering service' },
    { name: 'real-app', type: 'mobile', description: 'Main React Native mobile app' },
    { name: 'airm-app', type: 'mobile', description: 'AiRM mobile app' },
    { name: 'onereal-app', type: 'mobile', description: 'Consumer mobile app' },
    { name: 'onereal-mortgage-app', type: 'mobile', description: 'Mortgage mobile app' },
    { name: 'iris-app', type: 'mobile', description: 'Referral system mobile app' },
    { name: 'leo-voice-ui', type: 'mobile', description: 'Leo voice UI' },
  ],

  // Top 20 contributors by total commits
  topByCommits: [
    { username: 'vivek25constants', commits: 11799 },
    { username: 'rawat-hitesh', commits: 9244 },
    { username: 'yogi-fabstudios', commits: 9053 },
    { username: 'piyushstack', commits: 8220 },
    { username: 'vinesh4Real', commits: 7265 },
    { username: 'atharvathanekar', commits: 7236 },
    { username: 'abdulwasey', commits: 6899 },
    { username: 'msquitieri', commits: 6616 },
    { username: 'SureshChidurala', commits: 6249 },
    { username: 'omkar-yelpale', commits: 5005 },
    { username: 'RishavShah03', commits: 4355 },
    { username: 'iraviteja', commits: 4146 },
    { username: 'U1-Shankar', commits: 3596 },
    { username: 'kevinking00', commits: 3293 },
    { username: 'viznusri', commits: 3008 },
    { username: 'skkaushik21', commits: 2926 },
    { username: 'sameersitre', commits: 2917 },
    { username: 'yashwanthanumula', commits: 2196 },
    { username: 'mominnawaf-real', commits: 2150 },
    { username: 'AyushSinghP', commits: 2048 },
  ],

  // Top 10 contributors by repo participation
  topByRepos: [
    { username: 'msquitieri', repos: 21 },
    { username: 'vivek25constants', repos: 16 },
    { username: 'kevinking00', repos: 14 },
    { username: 'piyushstack', repos: 13 },
    { username: 'SureshChidurala', repos: 12 },
    { username: 'atharvathanekar', repos: 12 },
    { username: 'yogi-fabstudios', repos: 11 },
    { username: 'sliangreal', repos: 11 },
    { username: 'sameersitre', repos: 11 },
    { username: 'iraviteja', repos: 11 },
  ],

  // Highlighted user's per-repo contributions
  myContributions: [
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
};
