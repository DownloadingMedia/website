const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Replace Google Fonts Import
css = css.replace(/@import url\('[^']+'\);/, "@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;600&display=swap');");

// 2. Insert Root Variables (Replace existing :root)
const newRoot = `:root {
  /* Colors */
  --color-void-black: #0e100f;
  --color-cream-glow: #fffce1;
  --color-olive-stone: #42433d;
  --color-ash-gray: #7c7c6f;
  --color-pulse-green: #0ae448;
  --gradient-pulse-green: linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%);
  --color-candy-pink: #fec5fb;
  --color-ember-orange: #ff8709;
  --color-electric-violet: #9d95ff;
  --color-signal-blue: #00bae2;
  --color-lime-flash: #abff84;

  /* Typography */
  --font-mori: 'Inter Tight', ui-sans-serif, system-ui, sans-serif;

  /* Scale */
  --text-caption: 14px;
  --text-body-sm: 16px;
  --text-body: 18px;
  --text-subheading: 21px;
  --text-heading-sm: 24px;
  --text-heading: 34px;
  --text-heading-lg: 44px;
  --text-display: 89px;
  --text-hero: 120px; /* Adapted for mobile */

  /* Old Vars Mapping */
  --font-body: var(--font-mori);
  --font-display: var(--font-mori);
  --bg: var(--color-void-black);
  --bg-surface: var(--color-void-black);
  --bg-hover: #1a1c1b;
  --border: var(--color-olive-stone);
  --border-hover: var(--color-cream-glow);
  --text: var(--color-cream-glow);
  --text-muted: var(--color-ash-gray);
  --text-dim: #42433d;
}`;
css = css.replace(/:root\s*\{[^}]+\}/, newRoot);

// 3. Remove all box-shadows
css = css.replace(/box-shadow:[^;]+;/g, '');

// 4. Update Border Radius
css = css.replace(/border-radius:\s*(?:6px|8px|12px|16px|24px|32px);/g, 'border-radius: 8px;');
css = css.replace(/border-radius:\s*(?:9999px|50px|100px);/g, 'border-radius: 100px;');

// 5. Update Buttons to Ghost Pill
css = css.replace(/\.btn-primary\s*\{([^}]+)\}/, (match, p1) => {
  let updated = p1.replace(/background:\s*[^;]+;/, 'background: transparent;');
  updated = updated.replace(/color:\s*[^;]+;/, 'color: var(--color-cream-glow);');
  updated = updated.replace(/border:\s*none;/, 'border: 1px solid var(--color-cream-glow);');
  updated = updated.replace(/border-radius:\s*[^;]+;/, 'border-radius: 100px;');
  return `.btn-primary {${updated}}`;
});
css = css.replace(/\.btn-primary:hover\s*\{([^}]+)\}/, (match, p1) => {
  let updated = p1.replace(/background:\s*[^;]+;/, 'background: var(--color-cream-glow);');
  updated += '  color: var(--color-void-black);\n';
  return `.btn-primary:hover {${updated}}`;
});

css = css.replace(/\.btn-secondary\s*\{([^}]+)\}/, (match, p1) => {
  let updated = p1.replace(/border-radius:\s*[^;]+;/, 'border-radius: 100px;');
  return `.btn-secondary {${updated}}`;
});

css = css.replace(/\.discord-btn\s*\{([^}]+)\}/, (match, p1) => {
  let updated = p1.replace(/background:\s*[^;]+;/, 'background: transparent;');
  updated = updated.replace(/color:\s*[^;]+;/, 'color: var(--color-cream-glow);');
  updated = updated.replace(/border-radius:\s*[^;]+;/, 'border-radius: 100px;');
  updated += '  border: 1px solid var(--color-cream-glow);\n';
  return `.discord-btn {${updated}}`;
});

css = css.replace(/\.discord-btn:hover\s*\{([^}]+)\}/, (match, p1) => {
  let updated = p1.replace(/background:\s*[^;]+;/, 'background: var(--color-cream-glow);');
  updated += '  color: var(--color-void-black);\n';
  return `.discord-btn:hover {${updated}}`;
});

// 6. Update Hero Typography (extreme scale & line-height)
css = css.replace(/\.hero h1\s*\{([^}]+)\}/, (match, p1) => {
  let updated = p1.replace(/font-size:\s*[^;]+;/, 'font-size: var(--text-hero);');
  updated = updated.replace(/font-weight:\s*[^;]+;/, 'font-weight: 400;');
  updated = updated.replace(/letter-spacing:\s*[^;]+;/, 'letter-spacing: -0.020em;');
  updated = updated.replace(/line-height:\s*[^;]+;/, 'line-height: 0.90;');
  return `.hero h1 {${updated}}`;
});

// Add Bracket Tag CSS
css += `
/* GSAP specific additions */
.bracket-tag {
  color: var(--color-cream-glow);
  font-size: var(--text-caption);
  font-weight: 400;
  display: inline-block;
  margin-bottom: 8px;
}
.accent-pink { color: var(--color-candy-pink) !important; }
.accent-green { color: var(--color-pulse-green) !important; }
.accent-orange { color: var(--color-ember-orange) !important; }
.accent-violet { color: var(--color-electric-violet) !important; }
.accent-blue { color: var(--color-signal-blue) !important; }
.accent-lime { color: var(--color-lime-flash) !important; }

.gradient-blob {
  background: var(--gradient-pulse-green);
  border-radius: 8px;
}
.hairline-divider {
  border-bottom: 1px solid var(--color-olive-stone);
  width: 100%;
}
.top-banner {
  background: var(--color-pulse-green);
  color: var(--color-void-black);
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 0;
  width: 100%;
}
`;

fs.writeFileSync(cssPath, css, 'utf8');
console.log('styles.css updated');
