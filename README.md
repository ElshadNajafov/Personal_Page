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

- **Desktop** Full navigation bar, 2-column project grid, optimal spacing
- **Tablet** Single-column layout, adjusted font sizes, optimized navigation
- **Mobile** Compact header and footer, mobile-friendly spacing, stacked layouts

## Theme System

The website supports both light and dark themes:

- **Light Theme:** Default theme with purple/blue accents on light background
- **Dark Theme:** High-contrast dark theme with green accents
- Theme preference is saved in browser localStorage
- Toggle button in navigation bar (🌙/☀️)

## Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Custom properties (CSS variables)
- **Vanilla JavaScript** — No frameworks, JavaScript

## Code Quality

- Separation of concerns (HTML, CSS, JavaScript)
- CSS custom properties for maintainable theming
- Semantic HTML5 elements
- Accessible markup with ARIA labels
- Clean, well-commented code structure