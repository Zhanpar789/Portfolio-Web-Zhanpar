# AGENTS.md

## Project Overview

This repository is a static, single-page portfolio for Zhanpar Isman Andria, a Software Quality Assurance Engineer. It has no package manager, build step, test runner, or local dependency directory.

## Repository Layout

- `index.html`: All page markup and portfolio content. It loads Tailwind CSS, Lucide, Font Awesome, and Google Fonts from CDNs. Tailwind theme extensions are configured inline in the document head.
- `style.css`: Project-specific CSS for animations, reveal states, the mobile menu, and the hamburger button.
- `script.js`: DOM behavior after `DOMContentLoaded`: Lucide icon rendering, mobile menu state, and `IntersectionObserver`-based reveal animations.
- `.gitignore`: Ignores the `.img` path.

## Development

There are no install, build, lint, or automated test commands. Serve the repository with any static-file server and inspect the result in a browser, for example:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000` and manually verify desktop and mobile layouts.

## Implementation Conventions

- Keep the site dependency-free locally. Use the existing CDN-based Tailwind, Lucide, Font Awesome, and Google Fonts setup unless a task explicitly requires an architectural change.
- Keep all portfolio copy and page sections in `index.html`. Section IDs must remain aligned with the navigation links: `home`, `about`, `skills`, `experience`, `projects`, and `contact`.
- Prefer existing Tailwind utility classes for layout, typography, color, spacing, borders, and responsive behavior. The shared custom colors are `primary`, `accent`, and `border`.
- Add reusable custom behavior or animations to `style.css`; do not add inline style attributes except for intentional dynamic values such as the terminal animation `--delay` values already in use.
- Use 4-space indentation in HTML, CSS, and JavaScript. Keep the existing semicolon style in JavaScript and CSS.
- Preserve the existing visual language: white and light-gray surfaces, dark neutral text, blue accents, rounded cards, restrained shadows, and responsive Tailwind breakpoints.
- Initialize or modify DOM behavior inside the existing `DOMContentLoaded` handler in `script.js`. Guard optional DOM lookups before attaching listeners.
- When adding an element that uses `data-lucide`, ensure `lucide.createIcons()` still runs after the element exists. When adding scroll-revealed cards, include its selector in the observer query and provide matching initial and `.animate-in` CSS states.

## Content And Link Changes

- Keep professional portfolio copy in English unless the task requests another language.
- Use `target="_blank"` for external links, matching the existing GitHub and LinkedIn links.
- Keep mail links in `mailto:` form and verify addresses and external URLs before publishing.
- When adding a project, preserve the existing `project-card` structure, technology tags, responsive grid order, and source/project link treatment.

## Verification Checklist

- Open the site with a static server; do not rely only on opening the file directly.
- Check every navigation link, mail link, and added external link.
- Test the mobile menu toggle and confirm it closes after selecting a menu link.
- Check the page at a small mobile width and a desktop width for overflow, wrapping, and section spacing.
- Scroll through the page and confirm skill, experience, project, and stat cards reveal correctly.
- Confirm browser developer tools report no JavaScript errors and icons render.

## Scope Discipline

- Do not introduce a framework, bundler, package manifest, or build tooling for ordinary content, styling, or interaction changes.
- Do not edit third-party CDN URLs or the inline Tailwind theme unless the task needs it.
- Avoid unrelated copy, design, or dependency changes in focused updates.
