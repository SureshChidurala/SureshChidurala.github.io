# Portfolio — sureshchidurala.github.io

Personal portfolio for **Suresh Chidurala**, Lead Front End Engineer.

Live at: **https://sureshchidurala.github.io**

## What's here

```
.
├── index.html          # Markup + content
├── styles.css          # All styling (modern dark with neon accents)
├── script.js           # Animated counters, live GitHub API, scroll-reveal
├── .nojekyll           # Disables Jekyll on GitHub Pages
└── README.md
```

No build step. No dependencies. Just static files — push to GitHub and it ships.

## Live GitHub data

The "Live GitHub" pill in the hero pulls real-time data from the public GitHub API:

- Followers
- Public repos
- Public-repo PR count

These come from:

- `https://api.github.com/users/SureshChidurala`
- `https://api.github.com/search/issues?q=author:SureshChidurala+type:pr`

> The numbers shown here only reflect **public** activity. The 978+ PRs at REAL Brokerage are largely in private organization repositories and aren't visible to the public API — that figure stays as static content.

GitHub's unauthenticated API allows ~60 requests per hour per IP. That's plenty for a portfolio.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or open `index.html` directly in a browser.

## Editing the content

All content lives in `index.html` — written in plain HTML so it's easy to edit by hand.

Update the fixed numbers in the hero stat strip by editing the `data-target` attributes:

```html
<span class="stat-num" data-target="978">0</span>
```

## Browser support

Tested on the latest two versions of Chrome, Safari, Firefox, and Edge. Uses CSS Grid, Flexbox, IntersectionObserver, `backdrop-filter`, and CSS custom properties. Respects `prefers-reduced-motion`.
