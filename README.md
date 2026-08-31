# Riddhi Chowdhuri — Portfolio Website

A static, dependency-free portfolio site (HTML, CSS, vanilla JS only) — ready for GitHub Pages.

## Folder structure
```
/
├── index.html
├── about.html
├── education.html
├── experience.html
├── projects.html
├── skills.html
├── certifications.html
├── achievements.html
├── resume.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── Riddhi_Chowdhuri_Resume.pdf
└── README.md
```

## Features
- Responsive layout, no horizontal scroll (tested at 360px, 768px, 1024px, 1440px widths)
- Sticky nav with active-page highlighting, mobile hamburger menu
- Light/dark theme toggle (persisted via `localStorage`)
- Scroll-reveal animations, animated stat counters on the homepage
- Projects page: category filtering + click-through detail modal (data embedded per card as JSON)
- Contact form with client-side validation (name / email format / message length); on success it opens the visitor's email client pre-filled to 4riddhi2005@gmail.com — there is no backend or database, so this is the static-site equivalent of "sending"
- Resume page embeds the actual PDF plus download / open-in-new-tab buttons

## Content still needing verification
Search the pages for `[ADD VERIFIED RESULT]`. These mark places where a numerical finding, coefficient or conclusion wasn't available and has intentionally not been invented:
- Pedestrianisation & Vendor Income — ANOVA/F-test result
- Crammed & Dammed (inflation/GDP/unemployment) — regression coefficients/conclusions
- Solar Power Project FMVA — whether any output is shareable publicly (internal/confidential by default)
- AI Tools Comparison — comparison criteria/conclusion
- Netflix vs Amazon Prime — final classification result (this project isn't on the resume; it's filed under Data Mining coursework and marked accordingly)

Certification cards also say "Credential link to be added" — swap in real Coursera/Meta credential URLs if you have them; don't leave a fabricated link.

## Test locally
1. No build step needed. From the project folder, run a simple local server (opening `index.html` directly also works, except the PDF `<iframe>` on the Resume page may be blocked by some browsers under `file://` — a local server avoids that):
   ```
   python3 -m http.server 8000
   ```
2. Open `http://localhost:8000` in your browser.
3. Click through every nav link, resize the window (or use dev tools device toolbar) to check mobile behaviour, toggle dark mode, and try the Projects filters/modal and the Contact form.

## Upload to GitHub
1. Create a new repository on GitHub (e.g. `riddhi-portfolio`).
2. In the project folder:
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

## Enable GitHub Pages
1. On GitHub, open the repository → **Settings** → **Pages**.
2. Under "Build and deployment", set **Source** to "Deploy from a branch".
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait a minute or two, then your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## If pages 404 after deploying
This exact repo previously 404'd because `style.css` and `script.js` had ended up sitting at the repo root while every page linked to `css/style.css` and `js/script.js` (and the resume PDF was expected at `assets/...` but sat at root too). That's fixed in this version — the folders now match the links. If you still get 404s after re-uploading, check these in order:

1. **Folder structure survived the upload.** GitHub's web "Add file → Upload files" drag-and-drop does **not** preserve subfolders reliably. Uploading `style.css`, `script.js` and the PDF one-by-one through that UI is exactly how they end up flattened at the root again. Prefer `git push` (see above) or drag the whole `css`, `js` and `assets` *folders* at once in the web UI.
2. **You're loading the Pages URL, not the raw GitHub URL.** `https://github.com/<user>/<repo>/blob/main/about.html` will never render the site — only `https://<user>.github.io/<repo>/about.html` will.
3. **The repo isn't nested one level too deep.** If your files ended up inside an extra wrapper folder in the repo (e.g. `portfolio/portfolio/index.html`), the Pages root won't find `index.html`. `index.html` must sit at the repository root (or in `/docs` if you set that as the Pages folder).
4. **Pages is actually enabled** and pointed at the branch you pushed to (Settings → Pages → Source).
5. **Give it 1–2 minutes** after each push — Pages rebuilds are not instant, and a stale browser cache can also show an old 404. Try a hard refresh or a private/incognito window.
6. **Case sensitivity.** GitHub Pages servers are case-sensitive; `Index.html` ≠ `index.html`, `CSS/style.css` ≠ `css/style.css`.
