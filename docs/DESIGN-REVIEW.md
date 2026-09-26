# Design documentation review

Reviewed on 2026-09-26 against the working repository and a fresh build using the root `_config.yml`. The palette, typography and updated logo have a traceable branding source. The business-card project is inspiration and an asset source, not the design specification for the website. Before this review, the documentation and kitchen sink covered generic brand elements more thoroughly than the website's actual page families and interactions.

The review updates the documentation and its language. It does not redesign production pages or change their copy, routes or external integrations. Priority P1 means a requirement to settle before a visual refactor; P2 means a coverage or maintenance gap. These are documentation findings, not claims of newly introduced production bugs.

## Scope correction

The intended deliverable is a foundation for designing the new CyberShu website. Earlier versions gave the print composition too much authority, including a 2:1 portrait hero and a signature hierarchy. Those rules have been removed. Website content, tasks and responsive behavior now determine composition; the current site provides a functional baseline, not a fixed visual layout. The guide now starts with website logo treatments and an editorial content specimen rather than a recreation of the card. Historical references below describe the reviewed version, not accepted print-derived requirements.

## Constraint audit

A follow-up review on 2026-09-26 found that removing the portrait hero was insufficient: several remaining defaults were still phrased as permanent restrictions. The document was internally inconsistent because it allowed new website composition while requiring a navy header and prohibiting some control shapes and elevation treatments. These restrictions were not justified by the recorded branding inputs or the existing website contracts.

| Rule reviewed | Assessment and correction |
| --- | --- |
| Mandatory navy header | Surface allocation is a website decision. Both light and dark headers are permitted with an accessible logo treatment. |
| Fixed 1200px container, 70ch reading width, breakpoints and section spacing | Retained as initial values, explicitly adjustable after checking real content, density and responsive behavior. They are not print-derived requirements. |
| No pill controls, shadows or gradients | Replaced blanket prohibitions with a flat starting treatment. Alternative shapes and elevation require a coherent purpose and accessible states. |
| Exact type scale, padding and 150ms transitions | Identified as adjustable web defaults. Readability, usable targets, visible focus and reduced-motion support remain requirements. |
| Year grouping, shared left edges and search overlay | Distinguished current presentation from preserved discovery functions. A retained overlay still requires dismissal and focus restoration. |
| Core identity, published content, URLs and provider integrations | Retained as scope boundaries. A visual refactor does not authorize replacing the brand or removing website capabilities. |

The revised foundation allows a new website composition without requiring per-page exceptions to arbitrary stylistic bans. This is a documentation assessment, not proof that a proposed design works: there are no complete page-family specimens yet. Validate the future design with article discovery, long-form reading, conference downloads and the full consultation offer before calling it ready for implementation. The current coverage gaps below remain open.

## Findings

### F1: Page families need explicit contracts (P1)

The previous design described an optional portrait hero and a generic article list, but had no route-to-layout inventory. The actual home layout uses `paginator.posts`, excerpts, metadata, read-more links and no list covers. The site also has an archive, profile, setup list and error page. A brand-first specimen alone cannot establish the hierarchy for those pages.[^home][^pages]

The design now includes a page-family table and preservation rules. Article discovery remains supported; the new website can change its visual presentation and the placement of introductory content. A portrait is optional and has no inherited column ratio. Page-specific full-layout specimens remain a gap in the kitchen sink.

### F2: A demo form does not cover the booking flow (P1)

The kitchen sink provided a local email-validation demo and contact panel. The production consultation page instead contains two CTAs targeting `#book-consultation` and an involve.me project embed. It also has six substantial learning paths and a free 30-minute consultation offer.[^consultations]

The design now distinguishes local demonstrations from production booking and documents the required CTA, anchor, long-form offer content and provider wrapper. No form submission was performed during the review. Booking and provider-failure specimens still need to be added before that flow is refactored.

### F3: Interactive discovery patterns were missing (P2)

Generic tags and a generic dialog did not cover the current archive filters or search. Archive tags are buttons with counts and a selected state; filtering reads and writes `?tag=`. The header opens a search overlay, and the home index has previous/next and numbered pagination.[^archive][^search]

The document now defines those behaviors and their accessibility requirements. The guide explicitly marks interactive archive filtering, search and pagination as missing specimens. Static tag labels must not be mistaken for coverage of those controls.

### F4: The article specimen underrepresented real content (P2)

The guide showed short prose, a simple code block and a table. Existing posts contain long tutorials, syntax-highlighted code, screenshots, downloads and external feedback. The webinar offers PPTX and ZIP files; the vibe-coding article embeds a PDF; the Javeloper and Confitura notes embed Tally forms. The article templates add a table of contents, metadata, sharing, subscription and previous/next links.[^media][^article]

The design now includes technical and conference-resource page requirements, download fallbacks, external-provider boundaries and a regression matrix. Media wrappers, real long-form content and article-footer specimens remain incomplete. Markdown pipe tables were not found in the reviewed posts; the table specimen is retained as a supported robustness case rather than described as current usage. Mermaid is configured, but no Mermaid code fence was found in those posts.

### F5: The business-card audience is narrower than the website audience (P2)

The earlier documentation centered the card's small-business positioning. The site also addresses developers and people starting an IT career. The consultation page explicitly includes Mentoring for Developers, Technical Interview Prep and Cognitive Coaching. Three current posts explicitly declare Polish; most declare English.[^consultations][^posts]

The design now states that card-specific content exclusions do not apply to published services. It preserves the broader audience, languages and per-post metadata. Original Polish card copy remains in the historical reference assets only; it does not define website copy or the language of the website or documentation.

### F6: Project documentation did not follow the requested language (P2)

`DESIGN.md`, `AGENTS.md` and guide explanations were in Polish. They are now in English, including specimen labels, interaction feedback and generator messages. The English-only rule is recorded in `AGENTS.md`. Original card images, quotations and a Polish-character specimen retain their language and are not translated marketing copy.

Inherited TeXt translations and published website content were not rewritten. The rule applies to newly authored or updated project documentation.

### F7: Contributor and build references need a scope warning (P2)

The root README is an older author bio with Jekyll front matter, not a contributor guide. `HOW_TO_RELEASE.md` describes publishing the upstream theme gem. The legacy Travis workflow uses Ruby 2.4.1 and `docs/_config.yml`, while the new guide generator supports Ruby 3.2 or newer and the actual CyberShu build uses the root configuration.[^runtime]

The design and agent instructions now distinguish those contexts. Replacing legacy onboarding or deployment documentation is still outside this review. The old Travis configuration must not be cited as proof that the root site or style-guide checks run in the deployed pipeline.

## Current specimen coverage

| Website concern | Guide coverage after this review | Remaining work before refactoring it |
| --- | --- | --- |
| Updated logo, colors, type, spacing and editorial identity | Demonstrated using website specimens and design tokens | Validate composition and hierarchy on each page family |
| Buttons, local form states, generic dialog and progress | Interactive demonstrations | Treat as local examples, not production integration tests |
| Prose, code, lists, table and decorative tags | Basic specimens | Add long titles, real highlighted code, TOC and article footer |
| Blog index and pagination | Requirements documented | Add list and page-boundary specimens |
| Archive filters and search | Requirements documented | Add selected/filter/result/empty/focus states |
| Consultations and booking | Requirements documented | Add a long learning path and provider-wrapper specimen |
| Conference resources and downloads | Requirements documented | Add media, download fallback and feedback-wrapper specimens |
| About, Uses and 404 | Requirements documented | Add representative page-level specimens |

## Synchronization boundary

The generator reads token values and includes a source fingerprint. Its freshness check catches a stale generated file after token, prose or template changes. It does not evaluate the meaning of prose, check the entire website's CSS, validate third-party forms or guarantee coverage of page families. Production templates and preview styles are currently separate. The documentation now requires explicit page checks and specimen coverage updates rather than claiming automatic production parity.

The package `build` script and the checked-in GitHub workflow run the freshness check. Direct Jekyll commands bypass the package script. Workflow configuration is evidence of intended automation, not evidence that a remote run passed.

## Verification and evidence

`bundle check` succeeded. `bundle exec jekyll build --destination /tmp/cybershu-design-review-site` completed using the root configuration. Its output confirmed `/`, `/page2/`, `/page3/`, `/archive.html`, `/about.html`, `/uses.html`, `/consultations.html`, `/404.html` and the existing `commandbook.html` utility page. The corpus has 19 dated posts: 15 explicitly English, three explicitly Polish and one inheriting the English site default.

This review is grounded in source and generated HTML. It does not certify every production interaction or the delivery of third-party forms. No contact or feedback message was sent. The source inventory below is separate from assumptions about what is currently deployed.

### Source inventory

[^home]: `index.html`; `_layouts/home.html:26–36`; `_layouts/articles.html`; `_includes/article-list.html`; `_includes/paginator.html`; `_config.yml:99–100`.
[^pages]: `_data/navigation.yml`; `archive.html`; `about.md`; `uses.md`; `404.html`; `commandbook.md`; `_layouts/archive.html`; `_layouts/404.html`; fresh generated HTML under `/tmp/cybershu-design-review-site`.
[^consultations]: `consultations.md:221–260` for existing audiences and coaching; `consultations.md:264–473` for learning paths, offer, CTAs and involve.me project `cybershu-consultation-inquiry-form-a822`.
[^archive]: `_includes/tags.html`; `_includes/scripts/archieve.js`; `_layouts/archive.html`; `_includes/paginator.html`.
[^search]: `_includes/header.html`; `_includes/search.html`; `_includes/search-providers/default/search.html`; `_includes/search-providers/default/search.js`; `_layouts/page.html`.
[^media]: `_posts/2021-09-24-webinar-second-brain.md:23–25`; `_posts/2025-06-15-vibe-coding.md:17–19`; `_posts/2026-05-14-javeloper-cebula.md:14–18`; `_posts/2026-09-23-confitura-resilience-w-erze-ai.md:20–24`; `assets/docs/`.
[^article]: `_layouts/article.html`; `_layouts/page.html`; `_includes/article-info.html`; `_includes/article-header.html`; `_includes/article-footer.html`; `_includes/article-section-navigator.html`; `_includes/aside/toc.html`; `_config.yml`; `_data/variables.yml`.
[^posts]: Dated files in `_posts/`, excluding `_template.md`; front matter, code fences and body content inspected on 2026-09-26.
[^runtime]: `README.md`; `HOW_TO_RELEASE.md`; `package.json`; `Gemfile`; local `Gemfile.lock`; `.travis.yml`; `.github/workflows/style-guide.yml`; `_config.yml`; `docs/_config.yml`. Local lock resolution: Jekyll 3.9.3, github-pages 228, kramdown 2.3.2 and Rouge 3.26.0. `package.json` identifies the inherited TeXt package as 2.2.6.
