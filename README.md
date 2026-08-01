# aashisluitel.com

Static site. No build step, no dependencies, no framework. Plain HTML, one stylesheet, one small JavaScript file. Deploys to GitHub Pages by uploading the files.

## File tree

```
/
├── index.html          Home
├── about.html          About
├── practice.html       Practice (case studies)
├── teaching.html       Teaching & Research
├── writing.html        Writing & Media (filterable archive)
├── speaking.html       Speaking
├── contact.html        Contact
├── press-kit.html      Press kit
├── 404.html            Custom not-found page (absolute paths)
├── CNAME               aashisluitel.com
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── favicon.svg
    ├── css/styles.css
    ├── js/main.js
    └── images/         ← photographs go here
```

## Deployment

1. Upload every file and folder to the repo root, preserving the `assets/` structure.
2. GitHub Pages is already configured. Do not change Pages settings or DNS.
3. Do not delete or edit `CNAME`. It must contain exactly `aashisluitel.com`.
4. Changes go live roughly one minute after commit.

To edit later: open the file in the GitHub web editor, change the text, commit to `main`.

## Required images

Drop these into `assets/images/`. Filenames must match exactly. Until a file
exists, the page shows a deliberate hatched placeholder naming the missing file.
No broken image icons appear at any point.

| Filename | Ratio | Min size | Priority | Alt text already set |
|---|---|---|---|---|
| `aashis-hero.jpg` | 4:5 | 1000×1250 | **Required** | Portrait of Aashis Luitel |
| `aashis-speaking.jpg` | 3:2 | 1200×800 | High | Aashis Luitel speaking on a panel |
| `aashis-teaching.jpg` | 3:2 | 1200×800 | Medium | Aashis Luitel teaching |
| `aashis-navy.jpg` | 3:2 | 1200×800 | Medium | Aashis Luitel during U.S. Navy service |
| `writing-colorado-politics.jpg` | 3:2 | 900×600 | Optional | decorative, empty alt |
| `writing-informationweek.jpg` | 3:2 | 900×600 | Optional | decorative, empty alt |
| `writing-colorado-sun.jpg` | 3:2 | 900×600 | Optional | decorative, empty alt |
| `writing-cumberlands.jpg` | 3:2 | 900×600 | Optional | decorative, empty alt |

Notes:

- Use only photographs you own or are licensed to use. Do not hotlink images
  from publishers, employers or universities.
- Export JPEG at quality 80, under about 400 KB each. The hero can go to 600 KB.
- The site is designed to work with the hero portrait alone. Every other image
  degrades to a placeholder without breaking layout.
- The four `writing-*.jpg` thumbnails are optional. If you have no lawful image
  for an article, leave them absent; the cards still read correctly.

## Adding a new publication

Two files to update. Keep them in sync.

1. `index.html` — the Featured writing section. Copy an existing `<a class="card">`
   block, replace href, outlet, date, title and description. Keep four cards;
   remove the oldest.
2. `writing.html` — the archive. Copy an existing `<a class="row">` block into the
   `.rows` container, newest first. Set `data-cat` to one of:
   `governance`, `assurance`, `enterprise`, `profile`.
   Update the `.chip` label to match.
3. Every external link needs `target="_blank" rel="noopener noreferrer"` and the
   `<svg class="ext-ico">` plus `<span class="sr-only">(opens in a new tab)</span>`.
4. Add the URL to `sitemap.xml` only if it is a page on this domain. External
   articles do not belong in the sitemap.

## Remaining factual assumptions

Everything on the site is either supplied by Aashis Luitel or traceable to a
published source. The items below are inferences or editorial framings I wrote
rather than facts taken from a document, and are the only places where an error
could originate.

1. **Article summaries.** The two-sentence descriptions of each publication on
   `index.html` and `writing.html` are my characterizations of each argument,
   written from the headline and subject. They are not quotations and were not
   verified line by line against the full articles.
2. **Microsoft role wording.** "Senior product and program roles" and the case
   narratives on `practice.html` are written from the University of the
   Cumberlands profile and your own description. No confidential outcome,
   customer, authorization decision or internal metric appears anywhere.
3. **Course descriptions.** The one-sentence explanations under Ethics in AI,
   Introduction to Responsible AI and Transforming Business with AI are written
   from the course titles. Only the PhDAI 832 term (Fall 2026) is stated as fact.
4. **Federal News Network appearance date** shown as May 2026, taken from the
   article URL. Note the outlet spelled the name "Ashish Luitel" in that piece.
5. **Research framing.** "AI agent identity, authorization and attribution" is
   described as a current interest, not as published or funded work.
6. **Copyright year** in the footer is hard-coded to 2026 and needs a manual
   edit each January.

## Facts confirmed by Aashis Luitel

Master of Engineering in Cybersecurity, George Washington University.
InformationWeek article published July 7, 2026.
Associate Professor of Artificial Intelligence, University of the Cumberlands,
is the current title. The June 2026 Cumberlands profile predates the appointment
and uses the earlier adjunct title; that term appears nowhere on this site.

## Missing image filenames

These are the exact filenames the code looks for. They appear here only. No
filename is ever shown to a visitor.

`aashis-hero.jpg`, `aashis-speaking.jpg`, `aashis-teaching.jpg`,
`aashis-navy.jpg`, `writing-colorado-politics.jpg`,
`writing-informationweek.jpg`, `writing-colorado-sun.jpg`,
`writing-cumberlands.jpg`

Fallback behavior when a file is absent:

| Asset | Fallback shown |
|---|---|
| Hero portrait | "AL" serif monogram, with screen-reader text describing it as a placeholder |
| Speaking | Neutral hatched field labeled "Speaking" |
| Teaching | Neutral hatched field labeled "Teaching" |
| Navy | Neutral hatched field labeled "Service" |
| Publication thumbnails | Image area is removed; the card reflows as a text-only editorial card with a rule above it |

## Accessibility and technical implementation

These describe how the site is built. They are implementation choices, not
results of an audit. No automated accessibility checker, contrast analyzer,
Lighthouse run or cross-browser test suite has been run against this build.

- Semantic landmarks: `header`, `nav`, `main`, `footer`, with a skip link.
- Mobile menu uses `aria-expanded` and `aria-controls`, closes on Escape and on
  outside click, and returns focus to the toggle.
- Focus states are visible on every interactive element.
- Palette was chosen with AA contrast in mind. Verify with a contrast checker
  before relying on it.
- `prefers-reduced-motion` disables transitions and smooth scrolling.
- Writing filters use `aria-pressed` and announce the result count through a
  live region.
- No `localStorage`, no cookies, no analytics, no third-party scripts other than
  Google Fonts.

## Suggested checks before announcing the site

Run these yourself; they have not been run here.

- Load every page at roughly 390px, 768px, 1024px and 1440px. Confirm no
  horizontal scrolling.
- Tab through each page. Confirm focus is always visible and the mobile menu
  traps and releases focus sensibly.
- Confirm every external link opens in a new tab and the original tab stays put.
- Open the browser console on each page and confirm it is clean.
- After deploying, request a nonexistent URL and confirm `404.html` renders with
  styles intact.
