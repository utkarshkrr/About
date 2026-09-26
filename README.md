# utkarshkrr - Personal Portfolio

This is the source for my personal portfolio, built to introduce myself, show what I've built, and give people an easy way to reach me. It's a single-page site put together with React, Vite, and Tailwind CSS, with a custom motion engine underneath that handles all the scroll, cursor, and reveal interactions.

Live structure aside, my goal with this site wasn't to use a template. I wanted something that felt personal, quiet, and a little playful once you start poking around it.

## What this page is

At its core, it's a one-page introduction to me: who I am, what I've studied, what I've built, and how to get in touch. It opens on a hero section with my name and current focus, then flows down through About, Skills, Projects, Experience, and Contact, all inside a single scrollable rail. There's no multi-page navigation in the traditional sense, everything lives on one route, and the nav links just scroll you to the right section.

The only other page is a custom 404, which shows up for any path other than the home route.

## Tech stack

- **React 18** for the UI
- **Vite** for the dev server and build
- **Tailwind CSS** (with CSS custom properties driving the color system, so light/dark theming stays cheap)
- **Plain JavaScript** for the motion/interaction layer - no animation library, everything in `src/motion.js` is hand-rolled
- No backend, no database, no router library. It's fully static and client-rendered

## Running it locally

```bash
npm install
npm run dev
```

This starts the Vite dev server with hot reload. By default it'll be available at `http://localhost:5173`.

### Building for production

```bash
npm run build
```

This outputs a production build to `dist/`. To sanity-check the build locally before deploying:

```bash
npm run preview
```

### Deployment

The site is set up to deploy on Vercel. `vercel.json` rewrites every path back to `index.html`, which is what lets the app handle routing (and the 404 page) on the client side instead of needing a server-side router.

## Website architecture

The app has a fairly small footprint on purpose. Everything is either a component or the one file that drives the motion:

```
src/
├── App.jsx            # Entry point — decides home vs. 404, mounts sections
├── main.jsx            # React root + a couple of console easter eggs
├── motion.js            # The interaction/animation engine (see below)
├── index.css            # Tailwind layers + theme tokens + custom animations
└── components/
    ├── LoadingScreen.jsx  # Typing-effect loader shown on first paint
    ├── Sidebar.jsx        # Desktop rail / mobile drawer navigation
    ├── ThemeToggle.jsx    # Light/dark switch with time-based auto mode
    ├── Hero.jsx            # Name, tagline, status card
    ├── About.jsx           # Education, certifications, languages
    ├── Skills.jsx          # Skill categories
    ├── Projects.jsx        # Project cards
    ├── Experience.jsx      # Internship / upcoming role timeline
    ├── Contact.jsx         # Email / GitHub / LinkedIn
    ├── Footer.jsx          # Copyright, version tag, terminal trigger
    ├── Terminal.jsx        # The hidden command-line easter egg
    └── NotFound.jsx        # Custom 404
```

There's no client-side router library involved. `App.jsx` checks `window.location.pathname` directly — if it's `/` (or empty), it renders the full site; anything else renders `NotFound`. Combined with the Vercel rewrite, this gives me SPA-style routing without pulling in a routing dependency I don't really need for a one-page site.

The color system is worth calling out separately: every color is defined once as an RGB triplet in `index.css` (`--color-bg`, `--color-text`, `--color-accent`, etc.), and Tailwind's config maps those onto semantic names (`ink`, `paper`, `signal`, `muted`...) using Tailwind's `rgb(var(--x) / <alpha-value>)` pattern. That means switching themes is just swapping the values of a handful of CSS variables on `<html data-theme="...">`, and every Tailwind opacity utility (`bg-signal/20`, etc.) keeps working across both themes for free.

All the interactivity - scroll reveals, tilt, magnetic buttons, and so on is centralized in `motion.js` rather than spread across components. Components just mark themselves up with `data-*` attributes (`data-reveal`, `data-tilt`, `data-magnetic`, `data-parallax`, and a few more), and a single `requestAnimationFrame` loop in `motion.js` reads those attributes and drives the actual motion. It respects `prefers-reduced-motion` and disables cursor-based effects on touch devices, so nothing fights the browser's own accessibility settings.

## Design philosophy

I wanted the site to read as considered rather than loud. Dark, editorial, and calm by default, with a single accent color ("signal," a muted sage green) doing all the work instead of a rainbow of UI colors. Light mode uses a warm beige rather than plain white, so it doesn't feel like a jarring inversion of the dark theme.

Typography carries a lot of the personality: **Fraunces**, a serif, is used for my name and section labels to give the page some warmth and a human touch; **Inter** handles body copy for readability; and **JetBrains Mono** shows up anywhere the site is being "technical" i.e. the wordmark, the terminal, version numbers, countdowns. That mono/serif contrast is intentional. It's meant to feel like a developer's site that still has some personality, not a resume dumped into a template.

Motion is treated as texture, not spectacle. Reveals, tilts, and magnetic pulls are all small and physically-eased (lerped, not linear), and they're gated behind reduced-motion and pointer-type checks so they never get in the way. The goal was for the site to feel alive without being distracting or laggy on a phone.

## Features

- **Loading screen** — a short typing animation (`utkarsh` + blinking cursor typing out `krr`) plays on first load, scroll is locked until it finishes, and it dispatches an `app-ready` event that the motion engine waits for before starting any scroll-reveal animations.
- **Time-aware theme** — the site checks the local hour and defaults to light mode from 6 AM–6 PM and dark mode otherwise. Manually toggling it overrides that until the next 6/18 boundary, at which point it reverts to automatic. The toggle also shows a live countdown to the next switch, and uses the View Transitions API for a circular reveal animation between themes (with a plain fallback where that API isn't supported).
- **Custom scroll-driven motion system** — scroll-reveal, staggered list reveals, count-up numbers (education GPA, project stats), a scroll-progress bar, scroll-spy active-link highlighting, and a velocity-based skew on the main content — all from one engine, no external animation library.
- **Cursor-reactive interactions** (desktop/pointer devices only) — a custom cursor ring, magnetic buttons, 3D tilt + spotlight on cards, proximity "swelling" on skill pills, and hero letters that shy away from the cursor.
- **Responsive navigation** — a fixed sidebar rail on desktop, and a slide-in drawer with a top bar on mobile/tablet.
- **Custom 404 page** — anything outside the home route renders a themed not-found page with its own staggered reveal animation and a link back home, instead of a generic browser error.
- **A working terminal** — accessible from the footer, this is a small in-browser shell with real commands (see Easter Eggs below).

## Easter eggs

A few things are tucked away for anyone who pokes around:

- **The blinking dot** in the Hero status card — hover it and it shows a tooltip ("welcoming connections"). It's a small "I'm around" signal dressed up as a status indicator.
- **Every `utkarshkrr` wordmark is a link home** — in the sidebar logo, the footer, and inside the terminal's output (`whoami`, `pwd`, `neofetch`, and the welcome message all render it as a link back to `/`).
- **Double-click the sidebar logo** and it glitches into binary (`01010101 01001011` — my initials, UK, in binary) for a couple of seconds before reverting.
- **The footer version tag** (`vXX.YY.ZZ`) opens a real terminal. Try `help`, `whoami`, `status`, `pwd`, `ls`, `neofetch`, or type `utkarshkrr` to jump home. `clear` wipes the session, and `Esc` closes it.
- **Console messages** — open devtools and there's a small styled greeting waiting there.
- **A comment in the page source** — worth a look if you're the type to check "view source."

## Responsiveness

The layout is mobile-first and breaks at Tailwind's `lg` boundary: below it, navigation collapses into a fixed top bar with a slide-in drawer (with a click-away area to dismiss it); above it, the sidebar becomes a fixed rail alongside the content. Section content sits inside a `max-w-4xl` container so line lengths stay readable on large screens without needing separate desktop/mobile layouts for the actual content. Cursor-driven effects (tilt, magnetic buttons, the cursor ring) are disabled on touch/coarse-pointer devices, both because they don't make sense without a cursor and to keep things fast on lower-powered devices.

