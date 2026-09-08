# Signup Portal

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- Web Crypto API
- LocalStorage
- DOM API
- Regular Expressions
- Responsive CSS
- CSS Media Queries

## Project Structure
- `index.html` — HTML document structure, forms, dashboard, comments UI, theme toggle, social links.
- `style.css` — layout, component styling, responsive breakpoints, focus states, dark-mode selectors, transitions.
- `script.js` — form handling, validation, hashing, LocalStorage persistence, DOM rendering, deletion, comments, theme state.

## HTML
- Semantic elements: `main`, `header`, `section`, `form`, `label`, `input`, `textarea`, `button`, `table`, `thead`, `tbody`, `footer`.
- Form identifiers: `signupForm`, `commentForm`.
- Input types: `text`, `email`, `password`.
- Accessibility: `aria-live="polite"`.
- External stylesheet/script loading via `<link>` and `<script>`.

## CSS
- CSS custom selectors and component classes.
- Flexbox and CSS Grid layouts.
- `min()`, `100%`, viewport units, and responsive sizing.
- CSS transitions and hover/focus pseudo-classes.
- `border-radius`, `box-shadow`, gradients, transparency, and `color-scheme`.
- Responsive breakpoints using `@media (max-width: 650px)`.
- Dark-mode state through `body.dark-mode`.
- Monospace rendering for hashed password output.

## JavaScript
- DOM querying and event listeners.
- `submit`, `click`, and form-event handling.
- Client-side validation.
- Regex-based email validation.
- Password length validation.
- `localStorage` CRUD operations.
- JSON serialization/deserialization with `JSON.stringify()` and `JSON.parse()`.
- `crypto.subtle.digest()` with SHA-256 hashing.
- `TextEncoder` for string-to-byte conversion.
- `ArrayBuffer` / `Uint8Array` processing.
- Hexadecimal conversion for hash output.
- Dynamic DOM generation and rendering.
- `createElement()`, `appendChild()`, `textContent`, and `classList`.
- Event delegation for dynamically rendered controls.
- Timestamp generation with `Date`.
- Persistent theme state.
- Empty-state rendering.
- User-count synchronization.

## Data Flow
1. Form submission triggers client-side validation.
2. Username, email, and password fields are read from the DOM.
3. Email syntax is validated with a regular expression.
4. Password input is validated against the minimum length constraint.
5. Password data is processed through SHA-256 hashing.
6. User objects are serialized and persisted to `localStorage`.
7. Stored records are deserialized and rendered into the dashboard.
8. Delete actions mutate the stored collection and trigger re-rendering.
9. Comment submissions are serialized into local storage and rendered dynamically.
10. Theme state is persisted and restored through local storage.

## Persistence
- Storage layer: browser `localStorage`.
- Serialization format: JSON.
- Persistence scope: current browser origin.
- No server-side database or API layer.

## Validation
- Required field validation.
- Email format validation using regex.
- Password minimum-length validation.
- Invalid-field CSS state via `.invalid`.
- Status messaging via `.form-status`.
- Form submission is handled client-side.

## Security
- Passwords are represented using SHA-256 digests before storage.
- `textContent` is used for dynamically rendered text to avoid direct HTML interpolation.
- `target="_blank"` external links use `rel="noopener noreferrer"`.
- Client-side hashing is not equivalent to production password storage; authentication systems should use server-side password hashing with a password-specific KDF.

## UI State
- Light/dark theme state.
- Empty dashboard state.
- Empty comments state.
- Validation-error state.
- Success/error status state.
- Responsive mobile layout.

## Browser APIs
- `localStorage`
- `crypto.subtle`
- `TextEncoder`
- DOM APIs
- `Date`

## Runtime
- No build step.
- No package manager.
- No framework.
- No backend.
- Static asset execution through a browser runtime.

## Execution
- Keep `index.html`, `style.css`, and `script.js` in the same directory.
- Open `index.html` in a modern browser.
