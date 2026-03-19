# STIRE — Portfolio v2
White & Gold · Robotic AI Figure · Loading Screen

## Folder Structure
```
STIRE/
├── index.html          ← Open this in browser
├── css/
│   └── style.css       ← White & gold luxury styles
├── js/
│   ├── main.js         ← Loader, cursor, nav, parallax, reveal, counters
│   └── robot.js        ← Three.js robotic AI figure (per-section + loader)
└── README.md
```

## How to Run
Open `index.html` directly in Chrome, Firefox, or Edge.
No build tools or server required.

## Features
- **Loading screen** — robotic AI figure with welcome message
- **Robotic AI figure** — appears in every section, rotates as you scroll
- **White & gold theme** — luxury palette with Cinzel + Cormorant Garamond fonts
- **Parallax** — hero grid, project card inner parallax
- **Scroll reveal** — staggered section reveals
- **Animated counters** — stats count up on scroll
- **Custom gold cursor** with lagging ring

## Customise

| What               | Where                                  |
|--------------------|----------------------------------------|
| Agency name        | `index.html` nav, footer, loader       |
| Hero copy          | `index.html` `.hero-left`              |
| Contact email      | `index.html` CTA + `css/style.css`     |
| Stats              | `index.html` `.stat-n` + `js/main.js`  |
| Robot colors       | `js/robot.js` → `MAT` object           |
| Gold accent color  | `css/style.css` → `--gold` variable    |
| Loading duration   | `js/main.js` → `setTimeout(enterSite)`|

## Key CSS Variables
```css
--gold:     #c9a84c   /* primary gold */
--gold2:    #e8c96a   /* lighter gold */
--bg:       #fafaf8   /* off-white bg */
--ink:      #1a1a14   /* primary text */
--dark:     #0a0a08   /* dark sections */
```

## Dependencies (CDN — no install needed)
- [Three.js r128](https://cdnjs.cloudflare.com)
- Google Fonts: Cinzel · Cormorant Garamond · Jost
