## Personal_Page — Static Website

This repository contains a small, clean static personal website built with **plain HTML and CSS only** — no JavaScript.

## Files

- `index.html` — Home page with profile photo and short summary.
- `about.html` — Background, qualifications and activities.
- `projects.html` — Two projects (Prpject 1 and Project 2).
- `css/styles.css` — Central responsive styles (mobile-first).
- `images/` — Images.

## Setup & Preview

You can open `index.html` directly in a browser, or serve it from a simple HTTP server. With Python installed, run:

```powershell
cd 'c:\Users\User\OneDrive\Documents\GitHub\Personal_Page'
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

## Customization

- **Update your name and bio:** Edit text in `index.html`, `about.html`, etc.
- **Replace images:** Swap `images/profile.svg`, `images/project1.svg`, `images/project2.svg` with real photos (keep filenames or update `src=` in HTML).
- **Update links:** GitHub links are set to `https://github.com/ElshadNajafov`. Update them in the HTML files if you want a different username or repo.
- **Add content:** Expand the `<main>` sections in each page with your real information.

## Responsive Design

The site adapts gracefully to phones and tablets:
- **Desktop:** Full navigation bar, 2-column project grid.
- **Tablet/Mobile:** Reduced font sizes, 1-column layout.
- **Small phones:** Compact header and footer, mobile-friendly spacing.

## Next Steps

- Replace placeholder text and images with your real content.
- Add real project repository links in `projects.html`.
- (Optional) Add a `contact.html` page or integrate with GitHub Pages.
