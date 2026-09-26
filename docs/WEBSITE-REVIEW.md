# Website implementation review

Reviewed on 2026-09-26 against `DESIGN.md`, the living style guide and the root-configuration build captured before implementation. The detailed sequence is in [the implementation plan](plans/2026-09-26-website-redesign.md).

## Implemented scope

The production site now uses the navy, cream and orange identity, local Inter fonts and shared CSS under `_sass/cybershu/`. The shell includes a skip link, active navigation, mobile disclosure, native search dialog, footer navigation, social links, RSS and compact cookie preferences. The original TeXt Sass remains as upstream reference but is not imported by the production entry point.

The index retains chronological excerpts, article tags, read-more links and three pagination pages. The archive retains year groups, counted filters, direct `?tag=` links and history restoration. Its topic controls live in a disclosure so mobile users can reach the entries without scrolling through the entire tag inventory.

Article pages use a reading column with a desktop TOC and mobile disclosure. Heading IDs and h1–h6 permalink controls are retained. Code scrolls locally; images retain their proportions. The existing warning treatment now uses the shared palette. About and Uses keep their prose and lists. Consultations retain the complete offering, all six learning paths, pricing explanation, both booking links and the original involve.me project. The 404 page offers explicit recovery navigation. The auxiliary commandbook route, feeds, sitemap and downloaded resources remain available.

Cookie preferences default to no optional services. Acceptance loads optional analytics and sharing; rejection preserves reading and local discovery. Following the 2026-09-26 request, Tally, involve.me and Disqus initialize immediately regardless of this preference. A versioned preference expires after 180 days. Direct provider links and failure messages remain available. Automatic forms and comments do not wait for a load button. Reopening preferences from the footer uses a modal dialog; Escape closes it without changing the saved choice. Revocation reloads the document when optional analytics or sharing has started; automatic forms and comments initialize again. Provider-owned storage is outside the site's origin.

## Verification evidence

| Check | Observed result |
| --- | --- |
| Root Jekyll build, production environment | Passed; output at `/tmp/cybershu-redesign` |
| Build regression suite | 6 tests, 348 assertions, no failures; compares routes, existing article heading IDs, downloadable links and normalized prose of all 19 articles against `/tmp/cybershu-before` |
| Generator tests | 7 tests, 20 assertions, no failures |
| Preview freshness | `ruby tools/style-guide.rb --check` passed |
| DESIGN.md validator | 0 errors, 0 warnings |
| Responsive browser suite | 16 routes at 320, 768, 1024 and 1440px; no document overflow or JavaScript exceptions |
| Text enlargement | All 16 routes at 320px with a 200% root font size; no document overflow |
| Accessibility automation | axe-core 4.13.0: 20 WCAG A/AA scans across nine page families at 320/1440px plus cookie and search dialogs; no reported violations |
| Provider lifecycle fixture | 11 assertions passed, including one initialization, container availability, script order and shared-library deduplication |
| Production style-guide specimen | Rendered directly from disk without Jekyll; shared CSS loaded, search returned one result for “Spring”, no JavaScript exceptions |
| Syntax contrast | On navy: keyword 10.02:1, string 11.81:1, function/type 10.90:1, number 11.30:1 |

The responsive route set covers `/`, `/page2/`, `/page3/`, `/archive.html`, the CORS and n8n tutorials, both 2026 conference-resource pages, the vibe-coding PDF page, the Second Brain webinar, `/consultations.html`, `/contact.html`, `/about.html`, `/uses.html`, `/404.html` and `/commandbook.html`.

Interaction checks exercised direct tag URLs, Show all, selected filters, unknown tags, browser Back, search matches, empty results, clear, arrow-key selection, Escape and focus return. They also exercised the mobile menu, TOC fragments including existing CORS h4 permalink controls, visible keyboard focus, reduced-motion behavior, the booking anchor, preference reopening/acceptance/rejection/reload and blocked-provider fallback access.

Tally and involve.me were additionally loaded from their actual services at a 390px viewport. The Tally feedback questions and the first page of the five-step consultation form rendered. No form was filled or submitted. The fixed-height Tally fallback and its dynamic-height widget remain supported; the two existing Confitura form placements were preserved.

## Automatic loading follow-up

The subsequent request changed forms and comments to automatic loading, including when optional cookies have been rejected. All 19 generated post pages include an auto-starting Disqus panel. Existing Disqus thread keys and canonical URLs are preserved; a missing key falls back to the page URL. Local development builds include Disqus as well. Tally frames are eager, and the involve.me loader runs immediately without scrolling or a button click. Rejecting cookies does not reload a page merely because automatic providers have started.

`tools/autoload-test.cjs` checks all 19 Disqus initializations with successful mocked responses, the canonical thread URLs, booking initialization before a choice, both Tally pages after rejection, SDK deduplication and the absence of optional analytics/sharing requests. `tools/provider-test.cjs` separately checks automatic initialization and prevents duplicate initialization when preferences change. A live Disqus check also created its comment iframe while the cookie dialog was still open, without any cookie selection. No comments or forms were submitted.

## Contact follow-up

The dedicated `/contact.html` page makes `kontakt@cybershu.eu` the primary mailto action and provides exactly three secondary social links: LinkedIn, X and GitHub. The email comes from the existing brand specification and is now configured in `site.author.email`; mailbox delivery was not tested. Header and footer navigation link to the page. The page has no contact form or comments, and its links work without JavaScript.

Three subagents owned implementation, documentation and regression tests separately. The coordinating agent integrated configuration and navigation, regenerated the guide, built the root site and ran the combined checks. A fourth read-only reviewer found no implementation blockers and identified an outdated Contact status in this report, now corrected. Contact keyboard checks reach every primary/social link with visible focus at 320px and 1440px. Visual review inspected both screenshots; email priority, readable labels and mobile spacing are retained. The shared responsive suite also checks Contact at 768px, 1024px and 200% root font size. No email was sent and no external profile was modified.

## Findings addressed during review

| Finding | Correction and evidence |
| --- | --- |
| Duplicate page title on 404 and commandbook | Normalized the numeric Jekyll layout name and explicitly configured commandbook's existing body heading; route tests enforce one page title for these routes |
| Provider scripts initialized twice | Reproduced the failure as `2 !== 1`; extracted scripts from inert templates before insertion, then initialized once; successful mocked external script fixture passes |
| Shared Tally library repeated for two existing forms | Cache provider scripts by source and refresh Tally after library readiness; fixture verifies one shared request |
| h4 permalink controls lost and h1 omitted from TOC | Generate heading anchors independently of the TOC; use configured/default TOC selectors; CORS h4 regression check passes |
| Long tag inventory pushed mobile entries down | Put tag controls in a native disclosure with the current selection in its summary |
| Uses title stored in a malformed locale field | Use the existing title text in the proper `title` front-matter field, without a page-specific template branch |
| Consultation legacy styles conflicted with the palette | Removed embedded CSS and inline color overrides; full offering uses the shared production stylesheet |

## Visual evidence

The screenshots show representative production views. The deterministic review blocks external requests; some inherited remote emoji images therefore display their alternative text. The separate live-provider screenshots show real external form rendering.

- [Desktop index](review-assets/index-desktop.png)
- [Mobile index](review-assets/index-mobile.png)
- [Desktop article and TOC](review-assets/article-desktop.png)
- [Mobile conference resource](review-assets/conference-mobile.png)
- [Archive](review-assets/archive-desktop.png)
- [Mobile consultations](review-assets/consultations-mobile.png)
- [Desktop Contact](review-assets/contact-desktop.png)
- [Mobile Contact](review-assets/contact-mobile.png)
- [Footer](review-assets/footer.png)
- [Compact mobile cookies](review-assets/cookies-mobile.png)
- [Live booking form](review-assets/booking-mobile.png)
- [Live Tally feedback](review-assets/feedback-mobile.png)
- [Production components in the standalone style guide](review-assets/style-guide.png)

## Test boundaries and reproduction

The checks use isolated Chromium. They do not constitute a manual screen-reader review or verification in Safari/Firefox. The blocked-provider suite intentionally generates failed third-party requests; the zero-error result refers to JavaScript exceptions in site code. Tally and involve.me keep their provider-owned internal styling and behavior. Cross-origin form internals, submissions, Disqus login and social-provider sharing completion were not changed or certified. Local wrappers, loading controls and fallback links use the website design.

Run the static checks after a root build:

```sh
rtk proxy ruby tools/style-guide-test.rb
rtk proxy ruby tools/style-guide.rb --check
rtk proxy pnpm dlx @google/design.md lint docs/DESIGN.md
rtk proxy env JEKYLL_ENV=production bundle exec jekyll build --destination /tmp/cybershu-redesign
rtk proxy env WEBSITE_BASELINE=/tmp/cybershu-before bundle exec ruby tools/website-test.rb /tmp/cybershu-redesign
```

The optional baseline is a pre-change build, not a generated file committed to the repository. Browser tools are development-only: `tools/website-browser-test.cjs` and `tools/provider-test.cjs` require `playwright`; `tools/website-accessibility-test.cjs` additionally requires `axe-core`. Provide installed packages through Node resolution or `NODE_PATH`. Set `CHROMIUM_PATH` only when using a nondefault browser executable. With the local build served on port 4174, run each script with Node. `SITE_URL` changes the target and `REVIEW_OUTPUT` changes the responsive screenshot directory. The scripts do not submit forms.

The implementation and evidence are local workspace changes. No production deployment was performed.
