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
Search the pages for `[ADD VERIFIED RESULT]` / `[ADD VERIFIED INFORMATION]` / "unverified". These mark places where the resume didn't provide enough detail, or where existing site copy (the Netflix vs Amazon Prime project) doesn't appear on the resume at all. Replace these with real content before submission.

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
