# Raakesh Menon — Portfolio

A modern, static portfolio for **Raakesh Menon**, a Senior Data Engineer based in Bengaluru, India.

Built with **HTML, CSS, and vanilla JavaScript**—no frameworks, build tools, or trackers.

---

## 📁 Project Structure

```text
.
├── index.html
├── assets
│   ├── css
│   │   └── style.css
│   ├── js
│   │   └── main.js
│   └── files
│       └── Raakesh_Menon_Senior_Data_Engineer_Resume.pdf
└── .claude
    └── launch.json
```

| File | Purpose |
|------|---------|
| `index.html` | Entire portfolio page |
| `assets/css/style.css` | Design tokens, layout, animations, light/dark themes |
| `assets/js/main.js` | Theme switching, reveals, counters, typewriter, filters, scrollspy |
| `assets/files/...Resume.pdf` | Resume used by download buttons |
| `.claude/launch.json` | Local preview configuration |

---

## ✨ Features

- Hero section with animated role rotator
- Live metrics with count-up animation
- Infinite technology marquee
- About section
- Filterable Skills grid
- Interactive Experience timeline
- Five featured projects
- Certifications & achievements
- Contact section with resume download
- Light & Dark themes
- Fully responsive layout

---

## 🎨 Design System

The colour palette is based on **Snowflake's live CSS custom properties** rather than manually recreated values.

| Token | Hex | Snowflake Variable |
|------|------|--------------------|
| Snowflake Blue | `#29b5e8` | `--ui-04` |
| Mid Blue | `#249edc` | `--ui-01` |
| Midnight Navy | `#11567f` | `--ui-02` |
| Light Blue | `#76d0f1` | `--ui-11` |
| Purple | `#7d44cf` | `--text-08` |
| Pink | `#d45b90` | `--text-09` |
| Mist / Divider | `#a0bbcc` | `--divider-01` |
| Surface Tints | `#f6f9fa`, `#ecf1f5` | `--ui-background-05/08` |

### Typography

- **Inter** — primary UI font
- **JetBrains Mono** — metrics and code-style labels

Snowflake's proprietary **Texta** font is replaced with **Inter**, following the original fallback stack (`Texta, Lato, sans-serif`).

---

## 🌗 Theme Support

The portfolio includes a flash-free light/dark theme implementation.

### Behaviour

- Theme is resolved **before first paint**.
- User selection is stored in `localStorage` using the key `rm-theme`.
- Applies `data-theme="light"` or `data-theme="dark"` to `<html>`.
- Falls back to `prefers-color-scheme` when no preference is stored.
- Automatically follows system theme changes.

---

## 🎬 Animations

The site includes lightweight, performance-friendly interactions:

- Scroll reveals with staggered timing
- Animated metric counters
- Typewriter role rotator
- SVG pipeline animation using `animateMotion`
- Gradient blob backgrounds
- Infinite tech marquee
- Scroll-filling timeline rail
- Cursor spotlight on skill cards
- Scroll progress indicator
- Navigation scrollspy

### Accessibility

All animations respect `prefers-reduced-motion`.

When enabled:

- reveals appear instantly
- marquee stops
- typewriter stops
- transitions are minimized
- motion-heavy effects are disabled

---

## 🚀 Running Locally

No build process is required.

Start a static server:

```bash
npx --yes http-server . -p 4321 -c-1
```

Open:

```text
http://localhost:4321
```

---

## ☁️ Deployment

This is a static website and can be deployed anywhere.

### GitHub Pages

1. Push the repository.
2. Go to **Settings → Pages**.
3. Choose **Deploy from branch**.
4. Select the repository root.

### Netlify / Vercel / Cloudflare Pages

- **Build command:** None
- **Publish directory:** `.`

---

## ✏️ Updating Content

All portfolio content lives in `index.html`.

### Replace the Resume

Overwrite:

```text
assets/files/Raakesh_Menon_Senior_Data_Engineer_Resume.pdf
```

Keep the filename unchanged so the navigation and contact download buttons continue to work.

---

## 🔍 SEO

### What is implemented

| Area | Detail |
|------|--------|
| Title | `Raakesh Menon \| Senior Data Engineer in Bengaluru, India` (56 chars) |
| Meta description | 150 chars, keyword-led, action-closing |
| Canonical | `https://raakeshmenona.github.io/` |
| Robots | `index, follow, max-image-preview:large, max-snippet:-1` |
| Language | `lang="en-IN"`, `og:locale=en_IN` |
| Geo meta | `geo.region=IN-KA`, `geo.placename`, `geo.position`, `ICBM` |
| Open Graph | `og:type=profile`, full set + 1200×630 image |
| Twitter card | `summary_large_image` |
| Structured data | One JSON-LD `@graph`: Person, WebSite, ProfilePage, ItemList, FAQPage |
| Crawl files | `robots.txt`, `sitemap.xml` (with image sitemap), `site.webmanifest` |
| Error page | `404.html` with `noindex, follow` |
| Identity | `rel="me"` on the GitHub and LinkedIn links |
| Headings | Exactly one `<h1>`, clean `h2` → `h3` hierarchy |
| Content | FAQ section answering real recruiter queries, marked up as `FAQPage` |

### The structured-data graph

`index.html` carries a single JSON-LD `@graph` that describes Raakesh as an **entity**, not just a page:

- **Person** — job title, Bengaluru `PostalAddress` + `homeLocation` geo, `worksFor` TCS,
  `alumniOf` Anna University, `hasOccupation` with `occupationLocation: Bengaluru`,
  23 `knowsAbout` topics, 4 `hasCredential` certificates, `sameAs` GitHub + LinkedIn.
- **WebSite / ProfilePage** — ties the page to the person.
- **ItemList** — the five projects as `SoftwareSourceCode` with `codeRepository` links.
- **FAQPage** — five questions mirroring the visible FAQ section.

Validate after any edit at <https://search.google.com/test/rich-results> and
<https://validator.schema.org/>.

### Social preview image

`assets/img/og-cover.png` (1200×630). Regenerate with the script in the scratchpad, or edit and
re-export at the same dimensions — `og:image:width` / `og:image:height` are declared in the head.

### ⚠️ Before this ranks: change the domain if it differs

Every absolute URL assumes **`https://raakeshmenona.github.io/`**. If you deploy elsewhere, update:

```text
index.html        canonical, og:url, og:image, twitter:image, all 12 JSON-LD @id / url fields
404.html          nothing (uses root-relative paths)
robots.txt        Sitemap: line
sitemap.xml       both <loc> entries and the <image:loc>
site.webmanifest  nothing (uses relative paths)
```

### Off-page: what actually moves the ranking

On-page SEO is now done and is the smaller half. Ranking for competitive queries like
*senior data engineer bengaluru* depends mostly on signals this repo cannot contain:

1. **Google Search Console** — add the property, verify, submit `sitemap.xml`, then
   *URL Inspection → Request Indexing*. Without this the site may take weeks to appear at all.
   Also add **Bing Webmaster Tools** (it feeds ChatGPT and Copilot search).
2. **Backlinks from your own profiles** — put the URL in the LinkedIn *Website* field and About
   section, the GitHub profile *Website* field, your GitHub profile README, Stack Overflow,
   Medium/Dev.to, and your email signature. These are the highest-value links you fully control.
3. **Name consistency** — spell your name, title and city identically on the site, LinkedIn and
   GitHub. Entity matching is literal.
4. **Publish technical writing** — two or three deep posts (Snowflake migration, medallion
   architecture, LLM-assisted ETL) hosted *on this domain* under `/blog/`. Long-form pages that
   earn links are the single biggest lever for a personal site.
5. **Be patient and realistic** — a brand-new `github.io` subdomain has no domain authority.
   Expect to rank for **"Raakesh Menon"** and **"Raakesh Menon data engineer"** within weeks, and
   for generic city+role queries only after sustained content and links. A custom domain
   (e.g. `raakeshmenon.com`) is worth it if you intend to invest long-term.

## 🔗 Connect

- **Live Website:** <https://raakeshmenona.github.io/>
- **GitHub:** <https://github.com/Raakeshmenona>
- **LinkedIn:** <https://www.linkedin.com/in/araakeshmenon/>

---

## 📄 License

This repository contains the personal portfolio website and associated content of **Raakesh Menon**.