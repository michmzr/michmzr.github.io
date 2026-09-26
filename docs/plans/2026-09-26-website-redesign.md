# CyberShu website implementation plan

**Goal:** Apply DESIGN.md and the living style guide to every published page family, including mobile navigation, a complete footer and compact cookie preferences.

**Architecture:** Keep Jekyll, front matter, published prose, permalinks and downloads. Replace the production presentation at shared template boundaries instead of layering a second theme over TeXt. Use shared Sass partials and small native JavaScript modules for navigation, search, archive filtering and consent. Keep the existing configured providers, with optional third-party resources activated after consent.

**Design authority:** `docs/DESIGN.md`, `docs/style-guide.html`, and the page inventory in `docs/DESIGN-REVIEW.md`. These are the accepted design input requested by the user. Ordinary layout decisions and local implementation are authorized; no deployment is included.

## 1. Establish the baseline

- [x] Read page inventory, tokens, preview sources, layouts and integration configuration.
- [x] Build the root configuration into `/tmp/cybershu-before`; retain it for URL, fragment and content comparisons.
- [x] Capture the current index and inspect the generated style guide in a browser.
- [x] Add regression checks for routes, preserved article IDs, six consultation paths, booking fragment, consent defaults and semantic navigation.

## 2. Build the shared shell

Files: `_layouts/base.html`, `_layouts/page.html`, `_includes/header.html`, `_includes/footer.html`, `_includes/head.html`, `assets/css/main.scss`, `_sass/custom.scss`, `_sass/cybershu/`, `assets/fonts/`.

- [x] Publish the three local Inter font weights with their license.
- [x] Define navy, cream, orange, text and spacing variables from DESIGN.md. Use 1200px maximum containers, 70ch prose, 16px mobile gutters, 44px minimum control targets and visible focus.
- [x] Create a navy wordmark header, active navigation, a keyboard-accessible mobile disclosure and skip link.
- [x] Build a navy footer with navigation, social links, RSS, copyright and a cookie-settings button.
- [x] Remove the zoom restriction. Keep page languages, canonical metadata and configured feature hooks.

## 3. Apply page-specific compositions

Files: `_layouts/home.html`, `_layouts/archive.html`, `_layouts/article.html`, `_layouts/404.html`, `_includes/paginator.html`, `consultations.md`, `_sass/cybershu/content.scss`.

- [x] Index: editorial introduction, chronological article rows, date, tags, excerpts and explicit read-more links; retain eight posts per page and the existing pagination URLs.
- [x] Archive: counted filters with pressed states, year groups, query-string restoration, empty result feedback and browser back/forward support.
- [x] Articles and conference resources: readable column, adjacent desktop TOC and mobile disclosure, heading links, code with local scrolling, original images, download links and previous/next navigation.
- [x] About and Uses: reuse the reading layout without rewriting existing content.
- [x] Consultations: remove embedded legacy CSS and inline color overrides; restyle expertise, offerings, all six full learning paths, pricing panels and both booking CTAs. Keep `#book-consultation` and the involve.me project.
- [x] 404: explicit error and links to the index and archive. Preserve commandbook and generated feeds.

## 4. Implement interaction and provider states

Files: `_includes/search.html`, `_includes/cookie-preferences.html`, `_includes/provider.html`, `assets/js/site.js`, `assets/js/discovery.js`, `assets/js/consent.js`, provider includes, conference embed markup.

- [x] Search uses the configured local index, a native dialog, labeled input, clear button, result count, empty state, keyboard navigation, Escape and focus return.
- [x] First-visit cookies use a compact non-blocking dialog at the bottom edge. Keep accept/reject equally accessible. Store a versioned preference, handle inaccessible storage, and allow reopening from the footer.
- [x] Do not load analytics, Disqus, AddToAny, Tally or involve.me before optional consent. Rejection keeps reading, search, filters and downloads working. Explicit load buttons allow an individual embed. Provider links stay visible if a script is blocked or fails.
- [x] Consent revocation reloads the document to remove already running optional embeds. Explain that external services apply their own policies; do not invent legal policy text.

## 5. Synchronize specimens and documentation

Files: `docs/DESIGN.md`, `docs/DESIGN-REVIEW.md`, `tools/style-guide/page.html.erb`, preview styles, generated `docs/style-guide.html`.

- [x] Document the actual implementation and consent behavior, replacing obsolete future-tense claims.
- [x] Add production-page specimens for shared chrome, article discovery, long-form content, provider fallback, footer and consent; distinguish interactive production coverage from static examples.
- [x] Regenerate with `ruby tools/style-guide.rb`, check with `ruby tools/style-guide.rb --check`, run `ruby tools/style-guide-test.rb` and `pnpm dlx @google/design.md lint docs/DESIGN.md`.

## 6. Review in a real browser and fix findings

- [x] Build with root configuration into `/tmp/cybershu-redesign` and serve locally.
- [x] Exercise all page families at 320, 768, 1024 and 1440px. Assert no document overflow; permit local code/table scrolling.
- [x] Inspect desktop and mobile screenshots for typography, hierarchy, spacing, long titles, footer and cookie footprint.
- [x] Exercise mobile disclosure, pagination, direct archive tag URLs, filter clearing, search results/empty/clear/Escape/focus return, TOC links and booking anchor.
- [x] Check 200% text, reduced motion, keyboard focus and blocked provider states. Do not submit third-party forms.
- [x] Compare baseline routes, article heading fragments, prose and download targets. Review the diff for security, accessibility, maintainability and scope.
- [x] Record exact checks and limitations in `docs/WEBSITE-REVIEW.md`, leave a local preview and report the result.

## Execution decisions

The user requested planning followed by implementation and visual review in this task. Execute continuously using the existing approved design. Use the clean current checkout and keep changes reviewable; do not publish. Native browser features avoid adding a frontend framework or an extra runtime dependency. The baseline root build passed on 2026-09-26.

Final evidence is in `docs/WEBSITE-REVIEW.md`. Review findings were corrected before completion: provider scripts now execute once, shared provider libraries are deduplicated, h1–h6 permalink controls are restored, and the archive filter inventory uses a disclosure. Tally and involve.me rendered live at 390px without any submission. External form internals retain provider styling.

## Follow-up tasks

- [x] Create a dedicated Contact page with an elegant, clean, responsive layout. Make email the primary contact action, as confirmed by the user; present social-media icons with accessible text labels as secondary options. Limit social links to LinkedIn, X and GitHub, using their existing profiles from `_config.yml`; exclude Facebook. Use the email recorded in DESIGN.md, add header/footer navigation and a matching style-guide specimen. Mailbox delivery is outside this local implementation check.

The 2026-09-26 follow-up request supersedes step 4's original consent gating for forms and comments: Tally, involve.me and Disqus now initialize automatically. Google Analytics and AddToAny remain optional.

## Contact coordination and verification

Implementation, documentation and regression checks were delegated to three subagents with separate file ownership. The coordinating agent integrated email configuration and navigation, regenerated the guide and verified the combined build. A separate reviewer inspected the Contact change without editing it. The integrated result passed 6 static tests with 348 assertions, 16 responsive routes at four widths, 200% text checks, 20 accessibility scans, generator tests and design lint. Desktop and mobile Contact screenshots are linked in the review report.
