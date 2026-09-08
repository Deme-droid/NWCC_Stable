# Profile Website

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- DOM API
- IntersectionObserver API
- LocalStorage
- HTML5 Video API
- CSS Custom Properties
- CSS Grid
- Flexbox
- CSS Media Queries

## Project Structure
- `index.html` — document structure, hero video, profile sections, image containers, external links, footer.
- `style.css` — layout system, theming, responsive behavior, transitions, animations, component states.
- `script.js` — theme state, video source switching, playback state preservation, scroll reveal observer.
- `assets/` — raster image and MP4 video assets.

## HTML
- Semantic layout using `main`, `section`, `footer`, `picture`, `video`.
- `<source>` element for dynamic video asset replacement.
- `autoplay`, `muted`, `loop`, `playsinline`, `preload="auto"`.
- Anchor navigation using fragment identifiers.
- External navigation with `target="_blank"`.
- Accessibility attributes: `aria-label`.
- External stylesheet and JavaScript module loading through `<link>` and `<script>`.

## CSS Architecture
- CSS custom properties under `:root`.
- Theme overrides through `body.light`.
- Global box-sizing reset.
- Responsive layout using CSS Grid and Flexbox.
- `clamp()`, `min()`, `calc()` and viewport units for fluid sizing.
- `aspect-ratio` for image constraints.
- `object-fit` for media rendering.
- `backdrop-filter` for glassmorphism.
- `color-mix()` for dynamic panel composition.
- CSS gradients and alpha compositing.
- CSS transitions for theme, transform, opacity, and interaction states.
- `@keyframes` animation for the floating scroll indicator.
- `@media` responsive breakpoints.
- `@media (prefers-reduced-motion: reduce)` accessibility handling.

## Theme System
- Theme state persisted with `localStorage`.
- Storage key: `profile-theme`.
- Default state resolves to dark mode unless stored value is `light`.
- `body.light` overrides CSS custom properties.
- Theme toggle updates:
  - `document.body`
  - toggle glyph
  - `aria-label`
  - hero video source
- Theme-specific media assets:
  - `assets/intro-dark.mp4`
  - `assets/intro-light.mp4`

## JavaScript
- `document.querySelector()`
- `document.querySelectorAll()`
- `classList.toggle()`
- `setAttribute()`
- `addEventListener()`
- `localStorage.getItem()`
- `localStorage.setItem()`
- `URL` constructor
- `HTMLVideoElement.load()`
- `HTMLVideoElement.play()`
- `currentTime`
- `paused`
- `duration`
- `Number.isFinite()`
- `IntersectionObserver`

## Video State Management
1. Resolve theme from `localStorage`.
2. Select theme-specific MP4 asset.
3. Resolve the absolute asset URL.
4. Compare the current source against the target source.
5. Capture playback state and `currentTime`.
6. Replace the `<source>` URL.
7. Reload the video resource with `load()`.
8. Wait for `loadedmetadata`.
9. Restore the playback position.
10. Resume playback when the previous state was playing.
11. Handle autoplay/playback rejection with `catch()`.

## Scroll Reveal
- `IntersectionObserver` observes `.reveal` elements.
- Observer threshold: `0.18`.
- Intersecting elements receive `.visible`.
- CSS controls the transition from:
  - `opacity: 0`
  - `transform: translateY(60px)`
- Visible state resolves to:
  - `opacity: 1`
  - `transform: translateY(0)`

## Layout
- Desktop profile sections use two-column CSS Grid.
- Reversed sections swap image/content order.
- Link cards use a two-column grid.
- Mobile breakpoint: `768px`.
- Mobile profile sections collapse to a single column.
- Mobile link grid collapses to one column.
- Hero video uses viewport-height sizing.
- `100svh` is used for mobile viewport handling.

## Media
- Hero background implemented with `<video>`.
- Video uses `object-fit: cover`.
- Image assets use `<picture>` and `<img>`.
- Upper profile image uses intrinsic aspect ratio.
- Standard profile images use `aspect-ratio: 4 / 5`.
- Hover transforms apply `scale(1.04)` to image elements.

## Interaction States
- Theme toggle hover transform.
- Link-card hover translation and border transition.
- Image hover scaling.
- Smooth anchor scrolling.
- Reveal-on-intersection animation.
- Reduced-motion override.

## Runtime
- Client-side static application.
- No backend runtime.
- No database.
- No package manager.
- No build pipeline.
- No framework dependency.
- Browser-native APIs only.

## Dependencies
- No external JavaScript libraries.
- No external CSS frameworks.
- Browser APIs:
  - DOM
  - LocalStorage
  - IntersectionObserver
  - HTMLMediaElement
  - URL
  - CSSOM-compatible styling

## Execution
- Preserve the following relative paths:
  - `index.html`
  - `style.css`
  - `script.js`
  - `assets/intro-dark.mp4`
  - `assets/intro-light.mp4`
  - `assets/kovid-top.jpg`
  - `assets/kovid-award.jpg`
- Serve or open `index.html` from the project root.
