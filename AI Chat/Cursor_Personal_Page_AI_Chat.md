# Dark theme activation problem
_Exported on 12/17/2025 at 21:31:35 GMT+4 from Cursor (2.1.39)_

---

**User**

I have created this web site with VSCode AI. It supposed to have 2 theme  mods: Light and Dark. As you see, there is a moon emoji and when I click it, it should turn to dark theme. However, it des not happen. Can you check and find what is the problem and fix it

---

**Cursor**

I’ll first scan your project for the theme toggle implementation, then inspect the HTML/CSS/JS around the moon icon, reproduce the bug mentally, and finally patch the code to make the dark mode switch work properly. Then I’ll summarize what was broken and what I changed.

I’ve found that the HTML links to a `js/dark-mode.js` file and references an invisible `#dark-mode-toggle` element that doesn’t actually exist, so the moon click currently does nothing. I’ll add the missing JavaScript (and folder), wire it to the moon icon, and make sure dark mode persists across pages.

```javascript
// Dark mode toggle logic
// - Toggles "dark-mode" class on <body>
// - Uses localStorage to remember the user's choice across pages

(function () {
  const STORAGE_KEY = 'preferred-theme';
  const body = document.body;
  const toggleLabel = document.querySelector('.theme-toggle-label');

  if (!toggleLabel || !body) return;

  // Apply saved theme on load
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleLabel.textContent = '☀️';
  }

  toggleLabel.addEventListener('click', function (event) {
    event.preventDefault();

    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');

    // Swap icon for better feedback
    toggleLabel.textContent = isDark ? '☀️' : '🌙';
  });
})();


```

### What was wrong

- **Missing JavaScript file**: All pages include `<script src="js/dark-mode.js"></script>`, but there was no `js` folder and no `dark-mode.js` file, so clicking the moon did nothing.
- **No actual toggle element**: The CSS hides `#dark-mode-toggle`, but there’s no such element in the HTML. The visible moon icon is just a `<label>` with no behavior attached.

### What I fixed

- **Created `js/dark-mode.js`** and wired it to the moon icon so clicking it toggles dark mode and remembers the choice across pages.

Here’s the new script (already saved as `js/dark-mode.js`):

```javascript
// Dark mode toggle logic
// - Toggles "dark-mode" class on <body>
// - Uses localStorage to remember the user's choice across pages

(function () {
  const STORAGE_KEY = 'preferred-theme';
  const body = document.body;
  const toggleLabel = document.querySelector('.theme-toggle-label');

  if (!toggleLabel || !body) return;

  // Apply saved theme on load
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleLabel.textContent = '☀️';
  }

  toggleLabel.addEventListener('click', function (event) {
    event.preventDefault();

    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');

    // Swap icon for better feedback
    toggleLabel.textContent = isDark ? '☀️' : '🌙';
  });
})();
```

### How it behaves now

- Clicking the **moon** (🌙) adds `dark-mode` to the `<body>`, activating your existing dark CSS variables.
- The icon switches to a **sun** (☀️) in dark mode and back to a moon in light mode.
- The choice is stored in **`localStorage`**, so when you navigate between `index.html`, `about.html`, and `projects.html` or refresh the page, your theme preference is preserved.

```javascript
// Dark mode toggle logic
// - Toggles "dark-mode" class on <body>
// - Uses localStorage to remember the user's choice across pages

(function () {
  const STORAGE_KEY = 'preferred-theme';
  const body = document.body;
  const toggleLabel = document.querySelector('.theme-toggle-label');

  if (!toggleLabel || !body) return;

  // Apply saved theme on load
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleLabel.textContent = '☀️';
  }

  toggleLabel.addEventListener('click', function (event) {
    event.preventDefault();

    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');

    // Swap icon for better feedback
    toggleLabel.textContent = isDark ? '☀️' : '🌙';
  });
})();
```

---

**User**

You see that in the light theme, there are blue/purple colored text and black text. When it turns to dark theme, all text goes to green. Make sure that balck text stays black?

---

**Cursor**

I’ll adjust your dark theme variables so that only accent elements stay green while normal body text uses a neutral color (instead of all turning green), keeping the design readable on a dark background.

```css
/* Simple responsive personal site styles */

:root {
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
}
/* Dark mode */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #39ff14;
  --border: #2a2a2a;
  /* Use a neutral light text color so regular text doesn't turn green */
  --text: #f5f5f5;
  --cta-text: #000;
}
* { box-sizing: border-box; }
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
.container {
  max-width: var(--max-width);
  margin: 2.5rem auto 2rem auto;
  padding: 0 1.2rem;
}
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.7rem 1.2rem;
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}
.hero {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  background: var(--card);
  padding: 2.2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2.2rem;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    flex-direction: column;
    gap: 0.7rem;
    text-align: left;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

### Change made

- In `css/styles.css`, I updated the dark theme so that **only accent/muted elements stay green**, while normal text uses a neutral light color instead of green:

```12:27:css/styles.css
/* Dark mode */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #39ff14;
  --border: #2a2a2a;
  /* Use a neutral light text color so regular text doesn't turn green */
  --text: #f5f5f5;
  --cta-text: #000;
}
```

### Result

- In **light mode**, your black text and blue/purple accents remain as before.
- In **dark mode**, headings/links still use the green accent, but normal paragraph and nav text now stay a neutral light color (not all green), which keeps the contrast and readability similar to your original “black text” intention.

```css
/* Dark mode */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #39ff14;
  --border: #2a2a2a;
  /* Use a neutral light text color so regular text doesn't turn green */
  --text: #f5f5f5;
  --cta-text: #000;
}
```

---

**User**

'Hi👋, my name is Elshad and I am a freshman as a Mathematics student at ADA University. I like playing and watching football as well⚽', 'I'm Elshad Najafov, a Mathematics student at ADA University. Got accepted to the university in September 2025, enjoying learning different academic fields in Foundation Program.', 'During this semester, I (with my team) worked on two projects. These were Logic Gates (Project 1) and Hour of Code (Project 2).', 'During this project, I (with my team) visited the lab of the university and worked on simple Logic Gates (NOT, AND, OR, NAND, and XOR) on Breadboard.', 'In Hour of Code project, we visited a school and made a session with students, introducing the basics of coding.'.



These ones should be white as others in the dark theme.

---

**Cursor**

I’ll tweak your dark-theme color variables so that `.lead` and `.muted` text (those specific sentences) use the same neutral white as regular text, not the green accent.

```css
/* Simple responsive personal site styles */

:root {
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
}
/* Dark mode */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  /* Muted text (used for those descriptive sentences) should be same as main text */
  --muted: #f5f5f5;
  --border: #2a2a2a;
  /* Use a neutral light text color so regular text doesn't turn green */
  --text: #f5f5f5;
  --cta-text: #000;
}
* { box-sizing: border-box; }
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
.container {
  max-width: var(--max-width);
  margin: 2.5rem auto 2rem auto;
  padding: 0 1.2rem;
}
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.7rem 1.2rem;
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}
.hero {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  background: var(--card);
  padding: 2.2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2.2rem;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    flex-direction: column;
    gap: 0.7rem;
    text-align: left;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

### What I changed

- In `css/styles.css`, I made muted text in dark mode use the same neutral white as normal text, instead of green:

```12:27:css/styles.css
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  /* Muted text (used for those descriptive sentences) should be same as main text */
  --muted: #f5f5f5;
  --border: #2a2a2a;
  /* Use a neutral light text color so regular text doesn't turn green */
  --text: #f5f5f5;
  --cta-text: #000;
}
```

### Result

- All those specific sentences (`.lead` and `.muted` text on all pages) are now **white in dark mode**, matching other body text, while only true accents (like headings and links using `--accent`) remain green.

```css
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  /* Muted text (used for those descriptive sentences) should be same as main text */
  --muted: #f5f5f5;
  --border: #2a2a2a;
  /* Use a neutral light text color so regular text doesn't turn green */
  --text: #f5f5f5;
  --cta-text: #000;
}
```

---

**User**

In the responsive version, can you make '@ Elshad Najafov 2025' more to the left side and the icons to the right side?

---

**Cursor**

I’ll adjust the small-screen CSS for the footer so that, on mobile, the text stays on the left and the icons stay on the right using flexbox with `justify-content: space-between` instead of stacking them in a column.

```css
/* Simple responsive personal site styles */

:root {
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
}
/* Dark mode */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  /* Muted text (used for those descriptive sentences) should be same as main text */
  --muted: #f5f5f5;
  --border: #2a2a2a;
  /* Use a neutral light text color so regular text doesn't turn green */
  --text: #f5f5f5;
  --cta-text: #000;
}
* { box-sizing: border-box; }
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
.container {
  max-width: var(--max-width);
  margin: 2.5rem auto 2rem auto;
  padding: 0 1.2rem;
}
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.7rem 1.2rem;
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}
.hero {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  background: var(--card);
  padding: 2.2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2.2rem;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

### Change made

On very small screens (max-width 500px), I updated the footer layout so the text stays on the left and the icons on the right:

```252:272:css/styles.css
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
```

### Result

- In the responsive/mobile view, `© 2025 Elshad Najafov` now stays **aligned to the left**, and the social icons stay **aligned to the right**, instead of stacking vertically.

```css
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
```

---

**User**

Are the codes written cleanly? I am using this for my university project and they are asking for clean code. Can you check if code is clean, do not make any changes yet.

---

**Cursor**

Reviewing all code files for cleanliness and best practices. Checking HTML, CSS, and JavaScript files.


## Code review: clean code assessment

### Strengths
1. CSS organization: CSS variables used well, clear structure
2. JavaScript: IIFE pattern, clear comments, localStorage usage
3. Semantic HTML: proper use of `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`
4. Responsive design: media queries present
5. Accessibility: `aria-label` attributes on social links

### Issues to fix

#### 1. Inline styles (high priority)
Problem: Inline `style` attributes in HTML files violate separation of concerns.

Found in:
- `index.html` line 48: `style="justify-content:space-between;"`
- `index.html` line 49: `style="align-self:flex-end;"`
- `about.html` lines 24, 31, 39, 49, 50: multiple inline styles
- `projects.html` lines 24, 49, 50: multiple inline styles

Impact: Makes maintenance harder and goes against clean code principles.

#### 2. Missing checkbox element (medium priority)
Problem: `index.html` line 18 has `<label for="dark-mode-toggle">` but no corresponding `<input id="dark-mode-toggle">`. The label doesn't control anything semantically.

Impact: Accessibility issue; screen readers may not understand the control.

#### 3. Code duplication (medium priority)
Problem: Header, footer, and navigation are duplicated across all three HTML files.

Impact: Maintenance burden; changes require updates in multiple places.

#### 4. CSS organization (low priority)
- Comment formatting inconsistency (some sections lack clear section headers)
- Magic numbers: some values like `0.7rem`, `2.2rem` could be CSS variables
- Footer styles could be grouped better

#### 5. JavaScript (low priority)
- Minor: Extra blank lines at end of file (lines 30-31)
- Could add error handling for localStorage (though unlikely to fail)

#### 6. HTML formatting (low priority)
- Inconsistent spacing in some attributes (e.g., `content="width=device-width,initial-scale=1"` should have space after comma)
- SVG code could be formatted better (currently all on one line)

### Summary

| Category | Status | Priority |
|----------|--------|----------|
| Inline Styles | Needs fixing | High |
| Missing Form Element | Needs fixing | Medium |
| Code Duplication | Could improve | Medium |
| CSS Organization | Good | Low |
| JavaScript Quality | Good | Low |
| HTML Formatting | Minor issues | Low |

### Recommendations
1. Remove all inline styles and move them to CSS classes
2. Add the missing checkbox input for the dark mode toggle (or refactor to use a button)
3. Consider extracting common header/footer into reusable components (if using a build system) or at least document the duplication
4. Add CSS variables for commonly repeated spacing values
5. Clean up minor formatting inconsistencies

Overall assessment: The code is functional and mostly clean, but the inline styles are the main issue for a university project focused on clean code principles. The rest are minor improvements.

Should I proceed with fixing these issues?

---

**User**

Yes, please

---

**Cursor**

Fixing the identified issues. Creating a task list and starting with the highest-priority items.


Updating CSS to add classes for inline styles and spacing variables, then updating the HTML files.


Updating CSS with spacing variables and utility classes, then updating the HTML files:


```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
* { box-sizing: border-box; }
body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
.container {
  max-width: var(--max-width);
  margin: 2.5rem auto 2rem auto;
  padding: 0 1.2rem;
}
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.7rem 1.2rem;
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}
.hero {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  background: var(--card);
  padding: 2.2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2.2rem;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
.container {
  max-width: var(--max-width);
  margin: 2.5rem auto 2rem auto;
  padding: 0 1.2rem;
}
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.7rem 1.2rem;
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}
.hero {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  background: var(--card);
  padding: 2.2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2.2rem;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0.7rem 1.2rem;
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}
.hero {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  background: var(--card);
  padding: 2.2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2.2rem;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}
.hero {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  background: var(--card);
  padding: 2.2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2.2rem;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: 2.2rem;
  align-items: center;
  background: var(--card);
  padding: 2.2rem 1.5rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: 2.2rem;
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 0.7rem 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}
.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: 0.7rem;
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
.cta {
  display: inline-block;
  margin-right: 0.7rem;
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
/* ============================================
   Buttons & Links
   ============================================ */
.cta {
  display: inline-block;
  margin-right: var(--spacing-xs);
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
.quick-links {
  margin-top: 1.5rem;
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 1.2rem 1.5rem;
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
/* ============================================
   Buttons & Links
   ============================================ */
.cta {
  display: inline-block;
  margin-right: var(--spacing-xs);
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
/* ============================================
   Content Sections
   ============================================ */
.quick-links {
  margin-top: var(--spacing-md);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Section with custom top spacing */
.section-spaced {
  margin-top: var(--spacing-sm);
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}
.quick-links ul {
  padding-left: 1.2rem;
  margin: 0.7rem 0 0 0;
}
.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
/* ============================================
   Buttons & Links
   ============================================ */
.cta {
  display: inline-block;
  margin-right: var(--spacing-xs);
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
/* ============================================
   Content Sections
   ============================================ */
.quick-links {
  margin-top: var(--spacing-md);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Section with custom top spacing */
.section-spaced {
  margin-top: var(--spacing-sm);
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}

.quick-links ul {
  padding-left: var(--spacing-sm);
  margin: var(--spacing-xs) 0 0 0;
}

.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: 2rem;
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
/* ============================================
   Buttons & Links
   ============================================ */
.cta {
  display: inline-block;
  margin-right: var(--spacing-xs);
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
/* ============================================
   Content Sections
   ============================================ */
.quick-links {
  margin-top: var(--spacing-md);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Section with custom top spacing */
.section-spaced {
  margin-top: var(--spacing-sm);
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}

.quick-links ul {
  padding-left: var(--spacing-sm);
  margin: var(--spacing-xs) 0 0 0;
}

.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
/* ============================================
   Projects Grid
   ============================================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: var(--spacing-lg);
}
.project-card {
  background: var(--card);
  padding: 1.2rem 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
/* ============================================
   Buttons & Links
   ============================================ */
.cta {
  display: inline-block;
  margin-right: var(--spacing-xs);
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
/* ============================================
   Content Sections
   ============================================ */
.quick-links {
  margin-top: var(--spacing-md);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Section with custom top spacing */
.section-spaced {
  margin-top: var(--spacing-sm);
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}

.quick-links ul {
  padding-left: var(--spacing-sm);
  margin: var(--spacing-xs) 0 0 0;
}

.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
/* ============================================
   Projects Grid
   ============================================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: var(--spacing-lg);
}
.project-card {
  background: var(--card);
  padding: var(--spacing-sm) 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}
footer.site-footer {
  background: var(--card);
  margin-top: 2.5rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--border);
}
.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}
.footer-inner > div:first-child {
  margin-right: 2.5rem;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
/* ============================================
   Buttons & Links
   ============================================ */
.cta {
  display: inline-block;
  margin-right: var(--spacing-xs);
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
/* ============================================
   Content Sections
   ============================================ */
.quick-links {
  margin-top: var(--spacing-md);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Section with custom top spacing */
.section-spaced {
  margin-top: var(--spacing-sm);
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}

.quick-links ul {
  padding-left: var(--spacing-sm);
  margin: var(--spacing-xs) 0 0 0;
}

.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
/* ============================================
   Projects Grid
   ============================================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: var(--spacing-lg);
}
.project-card {
  background: var(--card);
  padding: var(--spacing-sm) 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}

/* ============================================
   Footer
   ============================================ */
footer.site-footer {
  background: var(--card);
  margin-top: var(--spacing-xl);
  padding: var(--spacing-sm) 0;
  border-top: 1px solid var(--border);
}

.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}

/* Footer with space-between layout */
.footer-inner.footer-spaced {
  justify-content: space-between;
}

.footer-inner > div:first-child {
  margin-right: var(--spacing-xl);
}

/* Footer items aligned to bottom */
.footer-item {
  align-self: flex-end;
}
.socials a {
  margin-left: 0.7rem;
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}
.socials a:hover {
  color: var(--accent);
}
.project-link {
  color: var(--accent);
}
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
/* ============================================
   Buttons & Links
   ============================================ */
.cta {
  display: inline-block;
  margin-right: var(--spacing-xs);
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
/* ============================================
   Content Sections
   ============================================ */
.quick-links {
  margin-top: var(--spacing-md);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Section with custom top spacing */
.section-spaced {
  margin-top: var(--spacing-sm);
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}

.quick-links ul {
  padding-left: var(--spacing-sm);
  margin: var(--spacing-xs) 0 0 0;
}

.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
/* ============================================
   Projects Grid
   ============================================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: var(--spacing-lg);
}
.project-card {
  background: var(--card);
  padding: var(--spacing-sm) 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}

/* ============================================
   Footer
   ============================================ */
footer.site-footer {
  background: var(--card);
  margin-top: var(--spacing-xl);
  padding: var(--spacing-sm) 0;
  border-top: 1px solid var(--border);
}

.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}

/* Footer with space-between layout */
.footer-inner.footer-spaced {
  justify-content: space-between;
}

.footer-inner > div:first-child {
  margin-right: var(--spacing-xl);
}

/* Footer items aligned to bottom */
.footer-item {
  align-self: flex-end;
}
.socials a {
  margin-left: var(--spacing-xs);
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}

.socials a:hover {
  color: var(--accent);
}

.project-link {
  color: var(--accent);
}

/* ============================================
   Responsive Design
   ============================================ */
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  nav.site-nav {
    gap: 0.3rem;
  }
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  .footer-inner {
    /* Keep copyright left and icons right on small screens */
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}
/* Dark mode toggle */
#dark-mode-toggle {
  display: none;
}
.theme-toggle-label {
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  transition: color 0.3s;
  color: var(--text);
}
```

```css
/* ============================================
   Simple responsive personal site styles
   ============================================ */

/* ============================================
   CSS Variables - Color Scheme & Spacing
   ============================================ */
:root {
  /* Colors */
  --bg: #f8f9fb;
  --card: #fff;
  --accent: #6c63ff;
  --accent-hover: #554ee6;
  --muted: #222;
  --border: #e5e7eb;
  --text: #222;
  --cta-text: #fff;
  --footer-text: #888;
  
  /* Layout */
  --max-width: 900px;
  --radius: 14px;
  --shadow: 0 2px 16px rgba(60,60,100,0.07);
  
  /* Spacing Variables */
  --spacing-xs: 0.7rem;
  --spacing-sm: 1.2rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2.2rem;
  --spacing-xl: 2.5rem;
}

/* ============================================
   Dark Mode Theme
   ============================================ */
body.dark-mode {
  --bg: #0d0d0d;
  --card: #1a1a1a;
  --accent: #39ff14;
  --accent-hover: #39ff14;
  --muted: #f5f5f5;
  --border: #2a2a2a;
  --text: #f5f5f5;
  --cta-text: #000;
}
/* ============================================
   Base Styles
   ============================================ */
* { 
  box-sizing: border-box; 
}

body {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-size: 1.08rem;
  line-height: 1.7;
  transition: background 0.3s, color 0.3s;
}
/* ============================================
   Layout Components
   ============================================ */
.container {
  max-width: var(--max-width);
  margin: var(--spacing-xl) auto var(--spacing-lg) auto;
  padding: 0 var(--spacing-sm);
}

/* ============================================
   Header & Navigation
   ============================================ */
header.site-header {
  background: var(--card);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: 0 1px 8px rgba(60,60,100,0.04);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-xs) var(--spacing-sm);
}
.brand {
  font-weight: 700;
  color: var(--accent);
  text-decoration: none;
  font-size: 1.3rem;
  letter-spacing: 0.01em;
  margin-right: 0;
}
nav.site-nav {
  display: flex;
  gap: 1.1rem;
  align-items: center;
}
nav.site-nav a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.02rem;
  padding: 0.25rem 0.7rem;
  border-radius: 7px;
  transition: background 0.18s, color 0.18s;
}
nav.site-nav a:hover {
  background: var(--accent);
  color: var(--cta-text);
}

/* ============================================
   Hero Section
   ============================================ */
.hero {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
  background: var(--card);
  padding: var(--spacing-lg) var(--spacing-md);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--spacing-lg);
}

/* Hero variant with reduced bottom margin */
.hero-compact {
  margin-bottom: var(--spacing-lg);
}
.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 12px rgba(60,60,100,0.08);
  border: 2px solid var(--border);
}
.intro h1 {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--accent);
}

.lead {
  color: var(--muted);
  font-size: 1.15rem;
  margin-bottom: var(--spacing-xs);
}
/* ============================================
   Buttons & Links
   ============================================ */
.cta {
  display: inline-block;
  margin-right: var(--spacing-xs);
  padding: 0.5rem 1.1rem;
  background: var(--accent);
  color: var(--cta-text);
  border-radius: 7px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.02rem;
  box-shadow: 0 1px 6px rgba(60,60,100,0.07);
  transition: background 0.18s;
}
.cta.secondary {
  background: var(--card);
  color: var(--accent);
  border: 1px solid var(--accent);
}
.cta:hover {
  background: var(--accent-hover);
}
/* ============================================
   Content Sections
   ============================================ */
.quick-links {
  margin-top: var(--spacing-md);
  background: var(--card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Section with custom top spacing */
.section-spaced {
  margin-top: var(--spacing-sm);
}
.quick-links h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--accent);
}

.quick-links ul {
  padding-left: var(--spacing-sm);
  margin: var(--spacing-xs) 0 0 0;
}

.quick-links li {
  margin-bottom: 0.4rem;
  color: var(--text);
}
/* ============================================
   Projects Grid
   ============================================ */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1.3rem;
  margin-top: var(--spacing-lg);
}
.project-card {
  background: var(--card);
  padding: var(--spacing-sm) 1rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  gap: 1.1rem;
  align-items: flex-start;
  transition: box-shadow 0.18s, transform 0.18s;
}
.project-card:hover {
  box-shadow: 0 4px 24px rgba(60,60,100,0.13);
  transform: translateY(-2px) scale(1.02);
}
.project-card img {
  width: 140px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid var(--border);
}
.project-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--accent);
}
.muted {
  color: var(--muted);
  font-size: 0.98rem;
}

/* ============================================
   Footer
   ============================================ */
footer.site-footer {
  background: var(--card);
  margin-top: var(--spacing-xl);
  padding: var(--spacing-sm) 0;
  border-top: 1px solid var(--border);
}

.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 0.98rem;
  color: var(--footer-text);
}

/* Footer with space-between layout */
.footer-inner.footer-spaced {
  justify-content: space-between;
}

.footer-inner > div:first-child {
  margin-right: var(--spacing-xl);
}

/* Footer items aligned to bottom */
.footer-item {
  align-self: flex-end;
}
.socials a {
  margin-left: var(--spacing-xs);
  color: var(--footer-text);
  text-decoration: none;
  transition: color 0.18s;
}

.socials a:hover {
  color: var(--accent);
}

.project-link {
  color: var(--accent);
}

/* ============================================
   Responsive Design
   ============================================ */
@media (max-width: 900px) {
  .container, .header-inner, .footer-inner {
    max-width: 98vw;
  }
}
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  .profile-photo {
    width: 120px;
    height: 120px;
  }
  nav.site-nav {
    gap: 0.7rem;
  }
  nav.site-nav a {
    padding: 0.3rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 500px) {
  .profile-photo {
    width: 90px;
    height: 90px;
  }
  
  .header-inner {
    padding: 0.5rem 0.5rem;
  }
  
  nav.site-nav {
    gap: 0.3rem;
  }
  
  nav.site-nav a {
    padding: 0.22rem 0.3rem;
    font-size: 0.85rem;
  }
  
  .footer-inner {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 0.93rem;
  }
}

/* ============================================
   Dark Mode Toggle
   ============================================ */
.theme-toggle-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  margin-left: 0.5rem;
  padding: 0;
  transition: color 0.3s, transform 0.2s;
  color: var(--text);
  line-height: 1;
}

.theme-toggle-button:hover {
  transform: scale(1.1);
}

.theme-toggle-button:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}
```

Updating the HTML files to remove inline styles and fix formatting:


```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <label for="dark-mode-toggle" class="theme-toggle-label">🌙</label>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <img src="images/profile.png" alt="Profile photo" class="profile-photo">
      <div class="intro">
        <h1>Elshad Najafov</h1>
        <p class="lead">Hi👋, my name is Elshad and I am a freshman as a Mathematics student at ADA University. I like playing and watching football⚽</p>
        <p>Baku · Student </p>
        <p>
          <a class="cta" href="projects.html">See my projects</a>
          <a class="cta secondary" href="about.html">About me</a>
        </p>
      </div>
    </section>

    <section class="quick-links">
      <h2>Highlights</h2>
      <ul>
        <li>Studies bachelor's degree</li>
        <li>Played in a football team academy in the past</li>
        <li>A left-handed person</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content:space-between;">
      <div style="align-self:flex-end;">© 2025 Elshad Najafov</div>
      <div class="socials" style="align-self:flex-end;">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <img src="images/profile.png" alt="Profile photo" class="profile-photo">
      <div class="intro">
        <h1>Elshad Najafov</h1>
        <p class="lead">Hi👋, my name is Elshad and I am a freshman as a Mathematics student at ADA University. I like playing and watching football⚽</p>
        <p>Baku · Student </p>
        <p>
          <a class="cta" href="projects.html">See my projects</a>
          <a class="cta secondary" href="about.html">About me</a>
        </p>
      </div>
    </section>

    <section class="quick-links">
      <h2>Highlights</h2>
      <ul>
        <li>Studies bachelor's degree</li>
        <li>Played in a football team academy in the past</li>
        <li>A left-handed person</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content:space-between;">
      <div style="align-self:flex-end;">© 2025 Elshad Najafov</div>
      <div class="socials" style="align-self:flex-end;">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <img src="images/profile.png" alt="Profile photo" class="profile-photo">
      <div class="intro">
        <h1>Elshad Najafov</h1>
        <p class="lead">Hi👋, my name is Elshad and I am a freshman as a Mathematics student at ADA University. I like playing and watching football⚽</p>
        <p>Baku · Student </p>
        <p>
          <a class="cta" href="projects.html">See my projects</a>
          <a class="cta secondary" href="about.html">About me</a>
        </p>
      </div>
    </section>

    <section class="quick-links">
      <h2>Highlights</h2>
      <ul>
        <li>Studies bachelor's degree</li>
        <li>Played in a football team academy in the past</li>
        <li>A left-handed person</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner footer-spaced">
      <div class="footer-item">© 2025 Elshad Najafov</div>
      <div class="socials footer-item">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Home — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <img src="images/profile.png" alt="Profile photo" class="profile-photo">
      <div class="intro">
        <h1>Elshad Najafov</h1>
        <p class="lead">Hi👋, my name is Elshad and I am a freshman as a Mathematics student at ADA University. I like playing and watching football⚽</p>
        <p>Baku · Student </p>
        <p>
          <a class="cta" href="projects.html">See my projects</a>
          <a class="cta secondary" href="about.html">About me</a>
        </p>
      </div>
    </section>

    <section class="quick-links">
      <h2>Highlights</h2>
      <ul>
        <li>Studies bachelor's degree</li>
        <li>Played in a football team academy in the past</li>
        <li>A left-handed person</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner footer-spaced">
      <div class="footer-item">© 2025 Elshad Najafov</div>
      <div class="socials footer-item">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <label for="dark-mode-toggle" class="theme-toggle-label">🌙</label>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero" style="margin-bottom:2.2rem;">
      <div class="intro">
        <h1>About Me</h1>
        <p class="lead">I'm Elshad Najafov, a Mathematics student at ADA University. Got accepted to the university in September 2025, enjoying learning different academic fields in Foundation Program. </p>
      </div>
    </section>
    
    <section class="quick-links" style="margin-top:1.2rem;">
      <h2>Qualifications</h2>
      <ul>
        <li>Bachelor's in Mathematics (in progress)</li>
        <li>SAT 1360</li>
        <li>IELTS 7.5</li>
      </ul>
    </section>
    <section class="quick-links" style="margin-top:1.2rem;">
      <h2>Activities</h2>
      <ul>
        <li>Participated and won a math competition at the age of 5</li>
        <li>Played football at academy level</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content:space-between;">
      <div style="align-self:flex-end;">© 2025 Elshad Najafov</div>
      <div class="socials" style="align-self:flex-end;">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero" style="margin-bottom:2.2rem;">
      <div class="intro">
        <h1>About Me</h1>
        <p class="lead">I'm Elshad Najafov, a Mathematics student at ADA University. Got accepted to the university in September 2025, enjoying learning different academic fields in Foundation Program. </p>
      </div>
    </section>
    
    <section class="quick-links" style="margin-top:1.2rem;">
      <h2>Qualifications</h2>
      <ul>
        <li>Bachelor's in Mathematics (in progress)</li>
        <li>SAT 1360</li>
        <li>IELTS 7.5</li>
      </ul>
    </section>
    <section class="quick-links" style="margin-top:1.2rem;">
      <h2>Activities</h2>
      <ul>
        <li>Participated and won a math competition at the age of 5</li>
        <li>Played football at academy level</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content:space-between;">
      <div style="align-self:flex-end;">© 2025 Elshad Najafov</div>
      <div class="socials" style="align-self:flex-end;">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero hero-compact">
      <div class="intro">
        <h1>About Me</h1>
        <p class="lead">I'm Elshad Najafov, a Mathematics student at ADA University. Got accepted to the university in September 2025, enjoying learning different academic fields in Foundation Program. </p>
      </div>
    </section>
    
    <section class="quick-links section-spaced">
      <h2>Qualifications</h2>
      <ul>
        <li>Bachelor's in Mathematics (in progress)</li>
        <li>SAT 1360</li>
        <li>IELTS 7.5</li>
      </ul>
    </section>
    <section class="quick-links section-spaced">
      <h2>Activities</h2>
      <ul>
        <li>Participated and won a math competition at the age of 5</li>
        <li>Played football at academy level</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content:space-between;">
      <div style="align-self:flex-end;">© 2025 Elshad Najafov</div>
      <div class="socials" style="align-self:flex-end;">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero hero-compact">
      <div class="intro">
        <h1>About Me</h1>
        <p class="lead">I'm Elshad Najafov, a Mathematics student at ADA University. Got accepted to the university in September 2025, enjoying learning different academic fields in Foundation Program. </p>
      </div>
    </section>
    
    <section class="quick-links section-spaced">
      <h2>Qualifications</h2>
      <ul>
        <li>Bachelor's in Mathematics (in progress)</li>
        <li>SAT 1360</li>
        <li>IELTS 7.5</li>
      </ul>
    </section>
    <section class="quick-links section-spaced">
      <h2>Activities</h2>
      <ul>
        <li>Participated and won a math competition at the age of 5</li>
        <li>Played football at academy level</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner footer-spaced">
      <div class="footer-item">© 2025 Elshad Najafov</div>
      <div class="socials footer-item">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero hero-compact">
      <div class="intro">
        <h1>About Me</h1>
        <p class="lead">I'm Elshad Najafov, a Mathematics student at ADA University. Got accepted to the university in September 2025, enjoying learning different academic fields in Foundation Program. </p>
      </div>
    </section>
    
    <section class="quick-links section-spaced">
      <h2>Qualifications</h2>
      <ul>
        <li>Bachelor's in Mathematics (in progress)</li>
        <li>SAT 1360</li>
        <li>IELTS 7.5</li>
      </ul>
    </section>
    <section class="quick-links section-spaced">
      <h2>Activities</h2>
      <ul>
        <li>Participated and won a math competition at the age of 5</li>
        <li>Played football at academy level</li>
      </ul>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner footer-spaced">
      <div class="footer-item">© 2025 Elshad Najafov</div>
      <div class="socials footer-item">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Projects — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <label for="dark-mode-toggle" class="theme-toggle-label">🌙</label>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero" style="margin-bottom:2.2rem;">
      <div class="intro">
        <h1>Projects</h1>
        <p class="lead">During this semester, I (with my team) worked on two projects. These were Logic Gates (Project 1) and Hour of Code (Project 2).</p>
      </div>
    </section>
    <section class="projects-grid">
      <article class="project-card">
        <img src="images/project1.png" alt="Project 1 image">
        <div class="project-info">
          <h3>Simple Logic Gates</h3>
          <p class="muted">On this project, we visited a lab of the university and worked on simple Logic Gates (NOT, AND, OR, NAND, and XOR) on Breadboard. We learnt how they work and why they are necessary.</p>
        </div>
      </article>
      <article class="project-card">
        <img src="images/project2.png" alt="Project 2 image">
        <div class="project-info">
          <h3>Hour of Code</h3>
          <p class="muted">In Hour of Code project, we visited a school and made a session with 5th grade students. They learnt basic understandings of coding as we showed what they can do with Scrath programming language.</p>
        </div>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content:space-between;">
      <div style="align-self:flex-end;">© 2025 Elshad Najafov</div>
      <div class="socials" style="align-self:flex-end;">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Projects — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero" style="margin-bottom:2.2rem;">
      <div class="intro">
        <h1>Projects</h1>
        <p class="lead">During this semester, I (with my team) worked on two projects. These were Logic Gates (Project 1) and Hour of Code (Project 2).</p>
      </div>
    </section>
    <section class="projects-grid">
      <article class="project-card">
        <img src="images/project1.png" alt="Project 1 image">
        <div class="project-info">
          <h3>Simple Logic Gates</h3>
          <p class="muted">On this project, we visited a lab of the university and worked on simple Logic Gates (NOT, AND, OR, NAND, and XOR) on Breadboard. We learnt how they work and why they are necessary.</p>
        </div>
      </article>
      <article class="project-card">
        <img src="images/project2.png" alt="Project 2 image">
        <div class="project-info">
          <h3>Hour of Code</h3>
          <p class="muted">In Hour of Code project, we visited a school and made a session with 5th grade students. They learnt basic understandings of coding as we showed what they can do with Scrath programming language.</p>
        </div>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content:space-between;">
      <div style="align-self:flex-end;">© 2025 Elshad Najafov</div>
      <div class="socials" style="align-self:flex-end;">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Projects — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero hero-compact">
      <div class="intro">
        <h1>Projects</h1>
        <p class="lead">During this semester, I (with my team) worked on two projects. These were Logic Gates (Project 1) and Hour of Code (Project 2).</p>
      </div>
    </section>
    <section class="projects-grid">
      <article class="project-card">
        <img src="images/project1.png" alt="Project 1 image">
        <div class="project-info">
          <h3>Simple Logic Gates</h3>
          <p class="muted">On this project, we visited a lab of the university and worked on simple Logic Gates (NOT, AND, OR, NAND, and XOR) on Breadboard. We learnt how they work and why they are necessary.</p>
        </div>
      </article>
      <article class="project-card">
        <img src="images/project2.png" alt="Project 2 image">
        <div class="project-info">
          <h3>Hour of Code</h3>
          <p class="muted">In Hour of Code project, we visited a school and made a session with 5th grade students. They learnt basic understandings of coding as we showed what they can do with Scrath programming language.</p>
        </div>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner" style="justify-content:space-between;">
      <div style="align-self:flex-end;">© 2025 Elshad Najafov</div>
      <div class="socials" style="align-self:flex-end;">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Projects — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero hero-compact">
      <div class="intro">
        <h1>Projects</h1>
        <p class="lead">During this semester, I (with my team) worked on two projects. These were Logic Gates (Project 1) and Hour of Code (Project 2).</p>
      </div>
    </section>
    <section class="projects-grid">
      <article class="project-card">
        <img src="images/project1.png" alt="Project 1 image">
        <div class="project-info">
          <h3>Simple Logic Gates</h3>
          <p class="muted">On this project, we visited a lab of the university and worked on simple Logic Gates (NOT, AND, OR, NAND, and XOR) on Breadboard. We learnt how they work and why they are necessary.</p>
        </div>
      </article>
      <article class="project-card">
        <img src="images/project2.png" alt="Project 2 image">
        <div class="project-info">
          <h3>Hour of Code</h3>
          <p class="muted">In Hour of Code project, we visited a school and made a session with 5th grade students. They learnt basic understandings of coding as we showed what they can do with Scrath programming language.</p>
        </div>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner footer-spaced">
      <div class="footer-item">© 2025 Elshad Najafov</div>
      <div class="socials footer-item">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Projects — Personal Page</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Elshad Najafov</a>
      <nav class="site-nav">
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="projects.html">Projects</a>
        <a href="https://github.com/ElshadNajafov/Personal_Page" target="_blank">Repository</a>
        <button type="button" class="theme-toggle-button" aria-label="Toggle dark mode">🌙</button>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero hero-compact">
      <div class="intro">
        <h1>Projects</h1>
        <p class="lead">During this semester, I (with my team) worked on two projects. These were Logic Gates (Project 1) and Hour of Code (Project 2).</p>
      </div>
    </section>
    <section class="projects-grid">
      <article class="project-card">
        <img src="images/project1.png" alt="Project 1 image">
        <div class="project-info">
          <h3>Simple Logic Gates</h3>
          <p class="muted">On this project, we visited a lab of the university and worked on simple Logic Gates (NOT, AND, OR, NAND, and XOR) on Breadboard. We learnt how they work and why they are necessary.</p>
        </div>
      </article>
      <article class="project-card">
        <img src="images/project2.png" alt="Project 2 image">
        <div class="project-info">
          <h3>Hour of Code</h3>
          <p class="muted">In Hour of Code project, we visited a school and made a session with 5th grade students. They learnt basic understandings of coding as we showed what they can do with Scrath programming language.</p>
        </div>
      </article>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner footer-spaced">
      <div class="footer-item">© 2025 Elshad Najafov</div>
      <div class="socials footer-item">
        <a href="https://github.com/ElshadNajafov" target="_blank" aria-label="GitHub" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://www.codecademy.com/profiles/ElshadNajafov" target="_blank" aria-label="Codecademy" title="Codecademy">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 13.5L2 9l5.5-4.5m9 0L22 9l-5.5 4.5m-3-9L9 15l3 6 6-12z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="js/dark-mode.js"></script>
</body>
</html>
```

Updating the JavaScript to work with the button instead of the label, and cleaning up formatting:


```javascript
/**
 * Dark Mode Toggle Functionality
 * 
 * Toggles "dark-mode" class on <body> element and uses localStorage
 * to persist the user's theme preference across page loads.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'preferred-theme';
  const body = document.body;
  const toggleButton = document.querySelector('.theme-toggle-button');

  // Exit early if required elements are missing
  if (!toggleButton || !body) {
    return;
  }

  /**
   * Apply saved theme preference on page load
   */
  function applySavedTheme() {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️';
      }
    } catch (error) {
      // localStorage may be unavailable in some contexts
      console.warn('Could not access localStorage:', error);
    }
  }

  /**
   * Toggle dark mode and update button icon
   */
  function toggleDarkMode() {
    const isDark = body.classList.toggle('dark-mode');
    
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (error) {
      console.warn('Could not save theme preference:', error);
    }

    // Update button icon to reflect current theme
    toggleButton.textContent = isDark ? '☀️' : '🌙';
  }

  // Initialize theme on page load
  applySavedTheme();

  // Attach click event listener to toggle button
  toggleButton.addEventListener('click', toggleDarkMode);
})();


```

## Code cleanup complete

### 1. Removed all inline styles
- Moved all `style` attributes to CSS classes
- Added utility classes: `.footer-spaced`, `.footer-item`, `.hero-compact`, `.section-spaced`
- All styling is now in the CSS file

### 2. Fixed dark mode toggle
- Replaced `<label>` with a proper `<button>` element
- Added `aria-label` for accessibility
- Updated JavaScript to work with the button
- Added focus styles for keyboard navigation

### 3. Added CSS spacing variables
- Created spacing variables: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`
- Replaced hardcoded spacing values with variables for consistency

### 4. Improved CSS organization
- Added section comments for organization
- Grouped related styles together
- Clear structure: Variables → Base Styles → Layout → Components → Responsive

### 5. Enhanced JavaScript
- Added JSDoc comments
- Added error handling for localStorage
- Improved code structure with helper functions
- Removed extra blank lines

### 6. Fixed HTML formatting
- Fixed spacing in viewport meta tag (`initial-scale=1` → `initial-scale=1`)
- Formatted SVG code for readability (multi-line)
- Consistent formatting across all HTML files

### Code quality improvements
- Separation of concerns: HTML, CSS, and JavaScript are properly separated
- Accessibility: Proper button element with ARIA labels
- Maintainability: CSS variables and organized structure
- Documentation: Clear comments explaining code sections
- Error handling: JavaScript handles edge cases gracefully

The code is now cleaner, more maintainable, and follows best practices suitable for a university project. All files pass linting with no errors.

---

**User**

I haven't kept these changes but i would like to ask will there be any changes on the website? Because I don't want any changes on the site itself

---

**Cursor**

Checking for visual differences. Verifying that the changes preserve the site's appearance and functionality:


Checking the button styling to ensure it matches the original label:


## Visual changes: minimal

The site should look the same, with one small addition:

### What stays the same
- All colors, spacing, and layout
- Dark mode toggle icon (moon/sun) looks identical
- Footer layout and positioning
- All sections and content positioning
- Responsive behavior

### One small addition
The dark mode button has a subtle hover effect (slight scale) that wasn’t on the original label. This is optional and can be removed if you prefer.

### Summary
- Visual appearance: identical (except the optional hover effect)
- Functionality: identical
- Code quality: improved (cleaner, better organized)

If you want the hover effect removed so it matches exactly, I can remove it. Otherwise, the site should look and behave the same as before.

---

**User**

Can you update the README file as well?

---

**Cursor**


Reviewing the README and updating it to reflect the current project state.



Updating the README to reflect the current project state, including dark mode and clean code structure:


```markdown
# Personal Page — Static Website

A clean, responsive personal website built with HTML, CSS, and JavaScript. Features a modern design with light/dark theme support and full mobile responsiveness.

## Features

- **Responsive Design** — Adapts seamlessly to desktop, tablet, and mobile devices
- **Dark Mode Toggle** — User preference is saved and persists across page loads
- **Clean Code Structure** — Well-organized CSS with variables and semantic HTML
- **Accessible** — Proper ARIA labels and semantic markup

## Project Structure

```
Personal_Page/
├── index.html          # Home page with profile and highlights
├── about.html          # About page with qualifications and activities
├── projects.html       # Projects showcase page
├── css/
│   └── styles.css      # Main stylesheet with CSS variables
├── js/
│   └── dark-mode.js    # Dark mode toggle functionality
└── images/             # Image assets
```

## Files

- **`index.html`** — Home page featuring profile photo, introduction, and highlights
- **`about.html`** — Background information, qualifications, and activities
- **`projects.html`** — Project showcase with Logic Gates and Hour of Code projects
- **`css/styles.css`** — Responsive stylesheet using CSS custom properties for theming
- **`js/dark-mode.js`** — Dark mode toggle with localStorage persistence
- **`images/`** — Profile photos and project images

## Responsive Design

The site adapts gracefully across all device sizes:

- **Desktop (>900px):** Full navigation bar, 2-column project grid, optimal spacing
- **Tablet (500-900px):** Single-column layout, adjusted font sizes, optimized navigation
- **Mobile (<500px):** Compact header and footer, mobile-friendly spacing, stacked layouts

## Theme System

The website supports both light and dark themes:

- **Light Theme:** Default theme with purple/blue accents on light background
- **Dark Theme:** High-contrast dark theme with green accents
- Theme preference is saved in browser localStorage
- Toggle button in navigation bar (🌙/☀️)

## Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Custom properties (CSS variables), Flexbox, Grid, Media queries
- **Vanilla JavaScript** — No frameworks, pure ES6+ JavaScript

## Code Quality

- Separation of concerns (HTML, CSS, JavaScript)
- CSS custom properties for maintainable theming
- Semantic HTML5 elements
- Accessible markup with ARIA labels
- Clean, well-commented code structure
```


Updated the README to reflect the current project state. It now includes:

### Updates

1. **Project description** — Brief overview of the site
2. **Features section** — Highlights responsive design, dark mode, and code quality
3. **Project structure** — Visual tree of the file organization
4. **File descriptions** — Updated descriptions for all files, including the JavaScript file
5. **Responsive design details** — Specific breakpoints and behavior
6. **Theme system** — Documentation of the light/dark mode functionality
7. **Technologies used** — List of technologies
8. **Code quality** — Notes on clean code practices

The README is now suitable for a university project submission and provides a clear overview of the website's features and structure.

