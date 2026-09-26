---
version: alpha
name: CyberShu
description: Design foundation for the new CyberShu website, using the updated brand identity and the existing website content and functionality.
colors:
  primary: "#0A1628"
  accent: "#FF6B35"
  neutral: "#F7F4ED"
  muted-on-dark: "#B0BEC5"
  role-on-dark: "#C6D0D7"
  secondary: "#52677C"
  decorative-line: "#A6A9AA"
typography:
  display:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
  heading:
    fontFamily: Inter
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.25
  subheading:
    fontFamily: Inter
    fontSize: 1.375rem
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.5
  caption:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
  wordmark:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.2
  code:
    fontFamily: ui-monospace, SFMono-Regular, Consolas, monospace
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: 0px
  control: 4px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px
  section-wide: 96px
components:
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  hero:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "{spacing.xl}"
  hero-description:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.muted-on-dark}"
    typography: "{typography.body}"
  author-role:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.role-on-dark}"
    typography: "{typography.caption}"
  wordmark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.wordmark}"
  wordmark-accent:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.accent}"
    typography: "{typography.wordmark}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "{spacing.md}"
  metadata:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    typography: "{typography.caption}"
  input:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "{spacing.md}"
  code-block:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.code}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  divider-decorative:
    backgroundColor: "{colors.decorative-line}"
    height: 1px
---

# CyberShu website design system

## Overview

This document is the design foundation for the new CyberShu website. It defines the website's visual language, page requirements and component behavior for the production implementation and subsequent design work. It is not a specification for reproducing a printed business card or preserving the current TeXt appearance.

The design starts with the website's content and tasks: discovering articles, reading technical material, finding conference resources, understanding the consultation offer and making contact. The existing site supplies the content and functional baseline. The business-card project supplies inspiration and updated brand assets, particularly the palette, Inter typography and CyberShu logo/wordmark. It does not supply a website layout, page hierarchy, audience restriction or mandatory copy.[^pages][^v9][^base]

The file follows the Google DESIGN.md `alpha` format. YAML tokens are the current website design baseline; dimensions, component geometry and layouts are web design decisions that can evolve through website design work. They are not measurements or obligations inherited from print. Reviewed against the repository and a fresh Jekyll build on 2026-09-26.[^format]

All project documentation, agent instructions, review reports and style-guide explanations must be written in English. Original article titles and quoted source material retain their language. This rule does not authorize translating published content.

The companion [style guide](style-guide.html) provides a generated kitchen sink for the website. Its token samples and generic controls use this document's YAML directly. Its production specimen shares the website CSS and navigation/search scripts. Its coverage table distinguishes interactive examples from static provider and consent states. The [design review](DESIGN-REVIEW.md) records the original requirements audit; [website review](WEBSITE-REVIEW.md) records implementation verification.

### Design inputs and their authority

| Input | Supplies | Does not prescribe |
| --- | --- | --- |
| Existing CyberShu content and functionality | Page families, article formats, languages, discoverability, consultation content, booking and feedback integrations | The current TeXt styling, exact visual arrangement, button shapes or page density |
| Updated branding in the business-card project | Navy/cream/orange palette, Inter typography, CyberShu logo/wordmark and reusable brand assets | A two-column portrait hero, front/reverse composition, print proportions, slogans, QR panels or website positioning |
| Website design work represented here | Semantic tokens, accessible color use, reading geometry, responsive patterns and component states | A claim that the new design is already implemented or that every page specimen is finished |

Use v9 to identify the latest available brand reference, not as a page mockup. Older print variants and their production constraints are provenance only. Reference images remain in `docs/design-reference/` for tracing the palette and logo; they are not website composition templates.[^v9]

### Fixed requirements and adjustable defaults

Preserve the supplied CyberShu identity: the wordmark, core navy/cream/orange palette and Inter family. Preserve the website's content and compatibility contracts below. Accessibility requirements apply to every proposed treatment, regardless of its appearance.

Dimensions, spacing, type sizes, breakpoints, surface allocation, corner radii, elevation, alignment and transition timing are adjustable website defaults. Their current values provide a coherent starting point, not brand restrictions or a completed page design. Component appearance descriptions below describe that baseline unless they explicitly protect identity, content, functionality or accessibility. For example, a light header, rounded filter controls or a restrained overlay shadow are valid alternatives if they serve the website's tasks and pass the relevant checks.

Use the current tokens consistently until revising the shared design. A revision must update affected tokens, prose and specimens together and demonstrate the result with representative website content and responsive states. Ordinary visual decisions within this scope do not require separate approval. Changing the brand identity, published content or existing integration contracts is outside a visual refactor.

### Website scope and visual direction

CyberShu contains a technical blog, engineering essays, conference and webinar resources, a personal profile, a developer setup page, a contact page and a consultation offer. The offer covers developer mentoring, career entry, interview preparation and cognitive coaching alongside architecture and automation. Support these existing audiences through a coherent website identity.[^pages][^consultations]

Use readable editorial typography, a clear distinction between primary content and supporting information, and restrained orange accents on navy and cream surfaces. The updated logo identifies the site across its page families. Give long-form reading and content discovery enough space; use stronger promotional treatments where the page's purpose calls for them.

The website's composition can be redesigned: header arrangement, article-list presentation, navigation treatment, visual grouping and use of introductory sections are website decisions. Preserve access to existing content and functionality, URLs and integration contracts unless a separate change is requested. This preserves the site's capabilities without freezing the old layout.

Brand slogans and portrait images are optional material, not required website components. Choose website copy and imagery for the page's task. The printed card's target audience and content exclusions do not redefine the website's positioning. A portrait can support an author profile or consultation introduction when useful; it is not a mandatory homepage hero.

### Icons and browser identity

Functional icons share a 24-unit SVG grid, a 1.5-unit stroke, round caps and joins, and `currentColor`. Render them at 1em alongside visible labels; contact artwork may use 24px. Decorative SVGs have `aria-hidden="true"` and `focusable="false"`. Use the shared files in `_includes/icons/` for search, menu, dismissal, arrows and RSS. Social logos retain their recognizable silhouettes and inherit the surrounding text color.

The user approved the two-color CS ligature on 2026-09-26. Cream C and orange S share coordinated curves and separated, angled terminals. `assets/images/logo/cs-monogram.svg` is the vector master. Use the transparent monogram beside the CyberShu wordmark in the header and footer, through `_includes/brand.html`. The mark is decorative within the named home link; keep its image alternative empty to avoid duplicate announcements. The monogram is approximately 48 × 32px beside a 28px wordmark and scales with text. Preserve the aspect ratio and clear space between the mark and wordmark. When enlarged text leaves insufficient inline space, wrap the wordmark below the monogram instead of clipping or shrinking the name.

For browser and device icons, center the same monogram on a navy rounded square. On light backgrounds, retain a navy field behind the two-color mark; the wordmark may be navy. Use a monochrome silhouette only where the platform requires it, including Safari pinned tabs. The root favicon and manifest remain compatible entry points. Regenerate SVG derivatives, PNG, ICO and the 1200 × 630px social preview with `python3 tools/generate-icons.py` (requires `rsvg-convert` and uses the local licensed Inter Bold font for the social wordmark). All shapes derive from the master; do not redraw individual sizes. The manifest uses paths relative to itself, and HTML metadata respects the configured base URL. Browser chrome and tiles use navy; the manifest background uses cream. The default Open Graph and X preview uses `assets/images/logo/social-card.png`; preserve article-specific imagery when configured.

## Colors

YAML values are the current shared implementation baseline. Use shared tokens instead of introducing page-specific copies. The core brand palette is an identity input; supporting color roles and their application are website decisions subject to contrast checks.

| Token | Value | Role |
| --- | --- | --- |
| `primary` | `#0A1628` | Navy: strong website surfaces, header, primary text on cream |
| `accent` | `#FF6B35` | Orange: “Shu”, primary action and narrow decorative divider |
| `neutral` | `#F7F4ED` | Cream: reading surface and text on navy |
| `muted-on-dark` | `#B0BEC5` | Supporting copy on navy |
| `role-on-dark` | `#C6D0D7` | Author role on navy |
| `secondary` | `#52677C` | Metadata on cream and divider on navy |
| `decorative-line` | `#A6A9AA` | Nonessential rules on cream |

### Contrast and application

Ratios below were calculated from opaque sRGB values and rounded to two decimals for display. Normal text requires at least 4.5:1, large text 3:1 and essential control boundaries 3:1 against adjacent colors.[^contrast][^nontext]

| Pair | Contrast | Use |
| --- | ---: | --- |
| Cream / navy | 16.51:1 | Main text in either direction |
| Orange / navy | 6.39:1 | Accent text on navy; navy labels on orange buttons |
| `muted-on-dark` / navy | 9.51:1 | Supporting copy on dark surfaces |
| `role-on-dark` / navy | 11.57:1 | Author role on dark surfaces |
| `secondary` / cream | 5.33:1 | Metadata and secondary text on light surfaces |
| Orange / cream | 2.58:1 | Decoration only; not ordinary text or the sole control boundary |
| `secondary` / navy | 3.10:1 | Rules, not small text |
| `decorative-line` / cream | 2.15:1 | Decoration, not essential control outlines |

Body links on cream are navy and underlined. An orange button on cream needs a 1px navy border. Do not use cream button labels on orange. Active, error and selected states must have a non-color cue.

The website palette uses the branding values rather than the colors of the print-preview application. The current web baseline uses solid surfaces. A different surface treatment needs a website purpose and contrast verification; the print reference supplies no general ban on gradients or effects. Do not introduce competing brand colors as an incidental styling change. Syntax highlighting, charts and third-party embedded content are separate concerns: preserve their meaning, assess contrast and document any required semantic palette rather than recoloring every item orange.

## Typography

Inter is the interface and prose family. Local Regular, SemiBold and Bold files, with their license, are included in `docs/design-reference/fonts/` for the style guide. Production serves licensed copies from `assets/fonts/`, using the same three weights. The fallback stack is `Inter, system-ui, -apple-system, "Segoe UI", sans-serif`.[^base]

Tokens describe the initial wide-screen scale. The current preview switches below 768px: the main display uses `display-mobile` and section headings use 1.5rem. Body copy retains 1.125rem with 1.65 line height. The initial metadata size is 0.875rem. Adjust the scale and breakpoints against real titles, dense content and mobile reading; use relative units and support text enlargement without clipping.

Headings use weight 600; the wordmark and author's name may use 700. Supporting text uses 400. Print point sizes must not be transferred directly to the screen. Do not scale the page as a bitmap of the card.

The wordmark is `CyberShu`, without a space. On navy, “Cyber” is cream and “Shu” orange, sharing a baseline. On a light surface, use a navy wordmark or a navy field behind the two-color version. The approved CS ligature accompanies this wordmark in site navigation and stands alone in small browser and device contexts.

Preserve natural sentence case. Uppercase QR labels do not establish a rule for website navigation. Choose heading width and line breaks for the actual page content; do not force brand slogans or print line breaks into page titles. Code uses the `code` monospace stack; preserve indentation, selectable content and local horizontal scrolling for long lines.

The repository contains 19 dated posts: 15 explicitly English, three explicitly Polish and one using the English site default. Preserve each page's `lang` metadata. Test long English titles, Polish diacritics, inline code and URLs rather than relying on short placeholder headings.[^posts]

## Layout

### Shared geometry

The starting treatment uses cream reading surfaces and a navy header. A light header or a different allocation of the core surfaces is a valid website design choice; retain logo legibility and sufficient contrast. Navy identity and contact sections are optional page-level patterns, not mandatory blocks on every route. This is not a separate dark-mode specification.

Initial geometry: a container up to 1200px and a reading column up to 70ch. Side gutters are 24px from 768px and 16px below. Use the YAML spacing scale: 8–16px within small groups, 24–32px inside panels and 64–96px between major sections; use 48px between sections on mobile in the initial treatment. These dimensions may change together after checking line length, hierarchy and density on real page content; long learning paths and archive lists need not inherit promotional section spacing.

Choose page composition from the content. An article needs a readable main column with optional supporting navigation. An index needs a scannable list and discovery controls. A consultation page needs clear service groupings and a booking destination. An introductory hero is optional; its columns, imagery and proportions are not fixed by the brand reference.

Portraits and other images use a context-appropriate frame and preserve the subject without distortion. Choose crop and placement in the website composition. Do not derive a global image ratio, border or position from the business card. Screenshots and diagrams retain their information and natural proportions. Use “Michał Mazur” as alternative text when a portrait identifies the author.

### Page families and preserved behavior

This inventory is the content and behavior baseline for the new design, not a requirement to reproduce existing layouts or every capability bundled with TeXt. The fresh build has 19 posts and three index pages, with eight posts per page except the final page. Keep these counts data-driven.[^pages][^posts]

| Page family | Existing route or source | Visual and behavioral requirements |
| --- | --- | --- |
| Blog index | `/`, `/page2/`, `/page3/`; `home` → `articles` layouts | Reverse-chronological entries with title, excerpt, read-more link, date and tags. Keep pagination and article discovery primary. Covers are currently disabled; their use in the new design is a website decision, not a brand requirement. |
| Archive | `/archive.html` | The current list groups articles by year. Preserve dates, tag counts, Show All and selected-tag state; grouping and layout may change. Preserve `?tag=` links and filtering. Tags here are interactive controls, not decorative labels. |
| Technical article | `_posts/`, `article` layout | Long-form reading, heading anchors, table of contents, highlighted code, screenshots and links. Preserve per-post routes, metadata and previous/next navigation. |
| Talk or webinar resource | Same article layout; Polish conference notes and webinar posts | Keep presentation downloads, reference lists and feedback forms visible. Allow video or PDF content without applying the portrait hero layout. |
| Consultations | `/consultations.html` | Preserve expertise and offering groups, six detailed learning paths, pricing explanation and booking CTA target `#book-consultation`. Support substantial lists instead of reducing the page to short cards. |
| Contact | `/contact.html` | Email is the primary contact action, followed by LinkedIn, X and GitHub profile links with visible names and decorative icons. Use the configured author email and profile handles. Keep the complete address selectable and readable on narrow screens. |
| Profile | `/about.html` | Readable biography, experience and technology lists, social links and the author's disclaimer. Portrait is optional. |
| Developer setup | `/uses.html` | Preserve category headings and labeled hardware/software lists with inline links. No mandatory cards or marketing CTA. |
| Not found | `/404.html` | Keep an explicit 404 heading, a short explanation and accessible navigation back to existing content. |
| Auxiliary output | `/feed.xml`, `/sitemap.xml`, generated `/commandbook.html` | Preserve feeds, discovery metadata and existing URLs. `commandbook.md` currently emits a utility page; removal or publication changes require a separate decision. |

Keep Archive, Uses, Consultations, About, Contact, home and search discoverable. Contact must be available from both the shared header and footer. Their placement and visual grouping can change in the new website design. Route spelling, pagination paths, post-level `permalink` overrides and assets under `assets/docs/` are content contracts. Do not change them as a side effect of styling.

### Reading, navigation and media

The initial list treatment aligns title, excerpt and metadata to a shared left edge; alternate arrangements must keep their relationship clear. A list entry does not require a shadowed card. Long titles wrap without ellipses in the main article list. Navigation must wrap or collapse accessibly. No page-level horizontal scrolling is allowed at 320px; wide tables, diagrams and code may scroll inside labeled local containers.

The article table of contents may occupy an adjacent column on wide screens and move into the content flow on narrow screens. Do not conceal the article behind a fixed sidebar. Preserve heading IDs and fragment links.

Keep screenshots and diagrams readable at their natural aspect ratio. PDF, PPTX and ZIP download links remain accessible without an embedded viewer. Existing Tally feedback and involve.me booking embeds require usable mobile wrappers, descriptive labels and visible fallback access when the provider is unavailable. Do not replace those integrations with the kitchen sink's local demo form.[^media][^consultations]

## Elevation

The initial specimens use flat surfaces, with contrast, spacing, typography and rules expressing hierarchy. Their panels have no shadow, control outlines are 1px and accent dividers are 2px. These are web defaults. Restrained elevation may distinguish an overlay or interactive layer when it improves comprehension; it is not forbidden by the brand. Optional short rules use `secondary`; their placement follows the website component's hierarchy rather than a printed signature block.

Overlay content must remain legible and distinguishable from the page beneath it. The current specimens use opaque, bounded surfaces. Any revised transparency or hover treatment must preserve contrast, keyboard equivalence and reduced-motion behavior. Third-party embedded content may have its own appearance; style its wrapper without assuming cross-origin access to its internal document.

## Shapes

The current web baseline uses 0px corner radius for sections and content panels. Image treatment is selected for its context; no portrait-frame requirement is inherited from print. Buttons and fields use the web-specific 4px control radius. These radii are adjustable, including rounded or pill-shaped filter controls where useful. Shape must not be the only indication of selection or interactivity.

Use the approved CS ligature and CyberShu wordmark as the shared identity. Do not substitute unrelated symbols or redraw the monogram per component. Decorative patterns are optional website design choices, not requirements inherited from historical print variants. Functional icons must use a consistent visual style and accessible names. Preserve technology names and existing security content.

## Components

### Site identity and page introductions

Render the monogram with the text wordmark and the home-link name “CyberShu home”. The initial navigation uses cream on navy; a light-header variant uses accessible dark text. The current destination needs a visible non-color cue and `aria-current`.

The site header and logo establish shared identity. Page introductions then explain the page's purpose: an article title, an archive heading, a service introduction or profile information. The `hero` token describes an optional high-emphasis web surface, not a prescribed composition. A hero can be text-only; no portrait, slogan, signature block or 2:1 grid is required. Demonstrations must use website tasks and content rather than recreating the front of the card.

### Buttons, links and state

A primary button has orange fill, navy text and a navy border on cream; its border is orange on navy. Hover and active use navy fill and cream text, retaining a visible border. Secondary buttons use cream fill, navy text and a navy border. Generic preview buttons underline on hover; production controls use navy fill and cream text. Booking actions on navy reverse to cream on hover. These treatments retain readable contrast.

Standalone controls use a project target of at least 44px height; the production horizontal padding is 16px (24px for prominent booking actions). This is a minimum, not a fixed height that clips wrapped labels. `focus-visible` has a 2px outline offset by 4px: navy on cream, cream on navy. Text links stay underlined without hover.

Disabled controls expose an unavailable state and reject activation. Busy controls retain their dimensions and expose a textual status. Selection and error must not be indicated only through color.

### Blog list, pagination and archive tags

Each list item has a primary title link and a distinct metadata row. Preserve read-more access without making an entire complex entry a nested interactive card. Date and metadata use `secondary` on cream; tag links remain recognizable links.

Pagination has previous/next affordances, page links and a current-page state. At boundaries, unavailable directions must not remain actionable. Preserve the actual generated URLs.

Archive tags are buttons with counts and selected states. Use `aria-pressed` for the selected filter and a visible selection cue; keep Show All. Preserve the existing `?tag=` contract. Production places the full tag list in a native “Filter by topic” disclosure, with the selected topic visible in its summary, to keep article access close to the top on phones. Decorative article labels are a different role and must not be used as a substitute for filtering.[^archive]

### Search

The existing header opens a default-search overlay, not a dedicated search route. Preserve discoverable search, a labeled input, clear action, results, a no-results state, result links and keyboard access. Presentation may change. If an overlay is retained, its specimen and refactor must include dismissal and focus return to the trigger. A generic text input or generic dialog alone does not cover this interaction.[^search]

### Article body and footer

Support the existing heading hierarchy and fragment links, paragraphs, nested lists, inline emphasis and code, blockquotes, images and language-marked code fences. Tables are a supported robustness specimen, even though the reviewed posts do not currently contain Markdown pipe tables. Mermaid is enabled in configuration; do not claim it is used by current posts without checking the content.[^posts][^runtime]

Quotes may use navy text with a decorative orange rule. Code blocks use navy and cream as a baseline. Production syntax roles use `#FFAD8B` for keywords, `#B8D9BB` for strings, `#A8CDED` for functions/types and `#E5C990` for numbers; each must pass 4.5:1 against navy. These code-only colors are semantic exceptions to the brand palette. Screenshots and diagrams must not inherit decorative image crops.

Keep article date/tags, table of contents, edit-on-GitHub links, RSS subscription and previous/next links where configured. Disqus comments and AddToAny sharing are configured integrations, not automatically new native components. Style their surrounding areas and account for blocked/unavailable providers. Author profiles and license blocks are conditional theme features, not mandatory new sections.[^article]

### Consultation and resource content

Consultation expertise panels and learning paths need clear headings, readable lists and room for the existing outcomes and scope descriptions. Preserve the free 30-minute consultation offer, pricing explanation and booking destination. The current text includes developer mentoring and cognitive coaching; changing that positioning is outside a visual refactor.[^consultations]

Conference resources need download links with meaningful names, link lists and feedback-embed wrappers. Do not hide downloadable material behind JavaScript or require a QR scan on the same device. Preserve existing language and link destinations.[^media]

### Inputs, notifications and demo-only elements

Fields use cream fill, navy text and a `secondary` outline. Labels remain visible above fields, and help/error text is associated with the input. A placeholder does not replace a label.

The style guide's form, progress example and generic dialog demonstrate interaction states locally. They are not new production features and do not implement booking or feedback. The demo submits no data. Distinguish information, success, error and empty states with text before adding any semantic palette.

The demo dialog has a cream surface, `secondary` border and a navy backdrop at 75% opacity. It supports keyboard use and restores focus when closed. Search, image lightboxes and provider dialogs require their own behavior checks rather than inheriting a blanket claim of coverage.

### Contact and site footer

The dedicated Contact page at `/contact.html` makes email the primary action. Render the complete `site.author.email` as a visible, selectable `mailto:` link. Its value, `kontakt@cybershu.eu`, comes from the branding reference. The address must wrap without clipping at 320px and with 200% text enlargement. Use a navy email action with cream text and a cream inset keyboard-focus outline. Secondary profile links retain underlines and the shared light-surface focus treatment.[^base][^contact]

LinkedIn, X and GitHub are secondary contact destinations, in that order, sourced from the existing author configuration. Each link combines its visible platform name with a decorative icon marked `aria-hidden="true"`; SVGs must not take keyboard focus. Visible names provide the accessible labels. The Contact page does not include Facebook. Keep contact access usable without JavaScript or an external form provider.[^contact]

The shared header and footer link to Contact. Preserve the footer's social links, copyright and feed access. The consultation page retains its separate booking integration and destination. A full-size contact hero is optional; it must not replace existing footer navigation or become compulsory after every article.[^consultations]

### Cookie preferences and external services

The first-visit preference panel is a compact, non-blocking native dialog, limited to 400px on wide screens and inset 16px on mobile. It presents equal-size accept/reject controls and an expandable explanation. It does not trap focus on first appearance. Reopening through the footer uses a modal dialog with Escape dismissal and focus return. Google Analytics and AddToAny stay inactive until acceptance. Tally and involve.me forms and Disqus comments initialize immediately on page load, independently of cookie preferences. Tally frames use eager loading, including forms below the fold.

Store a versioned choice in local storage with a 180-day expiry. When storage is unavailable, honor the current document's choice. Rejection keeps articles, local search, filters, RSS and downloads available. Revocation reloads the document if optional analytics or sharing code has started; forms and comments initialize again on the new document. Automatic form/comment loading alone does not cause a reload on rejection. This cannot erase storage belonging to another origin. Disqus is included on every blog post, retaining existing thread identifiers and falling back to the post URL when no key is defined. Direct provider links remain visible for blocked scripts, offline failures and no-JavaScript access. Do not style cross-origin form internals or imply that an illustrative specimen verifies a live submission.

### Motion

The initial color and border transitions last 150ms with `ease-out`; this timing is adjustable. The baseline omits text entrance effects, parallax and automatic carousels. Any added motion needs a functional purpose and must not delay access to content. Under `prefers-reduced-motion: reduce`, disable decorative transitions and smooth scrolling. A real progress update is a state change, not a decorative animation.

## Do's and don'ts

### Implementation rules

- Read this document and the style-guide coverage table before changing visual behavior. Explicit user instructions take priority. Distinguish fixed requirements from adjustable defaults; record visual revisions in the tokens, prose and specimens.
- Design for CyberShu's website tasks and page families. Use the updated palette and logo as brand inputs; do not translate the business card's composition or audience brief into website requirements.
- Preserve published copy, language metadata, paths, fragments, downloads and integrations unless their change is explicitly requested.
- Keep the design system separate from the historical TeXt examples. Do not treat every bundled layout, widget or translation as a feature in use on CyberShu.
- Use semantic HTML and keyboard-accessible controls. Never replace live text with a rasterized business card.
- Validate actual pages as well as generic specimens; passing a token linter or matching the generated HTML does not verify production behavior.

### Regression coverage

| Surface | Required checks |
| --- | --- |
| Index and archive | Long titles, excerpts, eight-item pagination, current/disabled page states, tag counts, filtering and direct `?tag=` access |
| Search | Open/close, labeling, query input, clear, result navigation, no results, keyboard operation and focus return |
| Technical article | Heading anchors/TOC, deep lists, inline code, long code lines, screenshots, footer metadata and previous/next |
| Conference resources | Polish copy, PDF/download fallback, resource lists and Tally wrapper with the provider unavailable |
| Consultations | Full learning-path copy, booking fragment, involve.me wrapper, pricing and mobile content flow |
| Contact | Email priority, exact `mailto:` destination, configured LinkedIn/X/GitHub links, decorative icons, visible names, keyboard focus, narrow layout and no-JavaScript access |
| Profile, setup and 404 | Biography and equipment lists, social links, error explanation and site navigation |
| Shared behavior | 320/768/1024/1440px widths, 200% text, visible focus, contrast, reduced motion and page language |

Use the CORS or n8n tutorial for technical content, the 2026 Confitura notes for Polish resources and external feedback, and the consultation page for dense service content. Test local code scrolling separately from page overflow. Use real content and preserve source links.[^posts][^media]

### Repository map and build scope

The root site uses Jekyll with TeXt. `assets/css/main.scss` imports `_sass/custom.scss`, which composes `_sass/cybershu/{foundation,shell,content,controls}.scss`. The legacy TeXt styles remain in the repository but are no longer loaded by the root site. Templates live in `_layouts/` and `_includes/`; navigation in `_data/navigation.yml`; production configuration in the root `_config.yml`. `consultations.md` uses the shared production styles; its old embedded stylesheet and inline color overrides have been removed. Do not edit generated `_site/` output.[^runtime]

`docs/` also contains inherited TeXt documentation and demo sites, including upstream translations. They are historical technical reference, not CyberShu brand rules. The root configuration excludes `/docs` and `/tools`. The alternative `docs/_config.yml` and `.travis.yml` refer to the TeXt demo workflow; a successful demo build is not verification of the root CyberShu site.[^runtime]

`README.md` currently contains an older author bio, and `HOW_TO_RELEASE.md` describes releasing the upstream theme gem. Neither is a complete CyberShu contributor/deployment guide. Do not infer a production release procedure from them.[^runtime]

### Keeping documentation and specimens current

Edit tokens and their explanatory prose together. Keep canonical section order and `{group.token}` references. Validate structure with `pnpm dlx @google/design.md lint docs/DESIGN.md`.[^cli]

Generate with `ruby tools/style-guide.rb`, watch with `ruby tools/style-guide.rb --watch`, and check with `ruby tools/style-guide.rb --check`. The equivalent package scripts are `style-guide:build`, `style-guide:watch` and `style-guide:check`. Ruby 3.2 or newer is the supported runtime; the generator needs no additional gems or Node dependency installation. Generator tests use Minitest via `ruby tools/style-guide-test.rb`.

After saving source changes, watch mode rewrites the HTML; refresh the browser. Commit the generated HTML with its sources. The source fingerprint includes the whole design document and preview sources. It detects drift, but does not translate natural-language rules into CSS.

Update relevant specimens and their coverage status when a page pattern changes. GitHub Actions and the package `build` command check freshness but do not update files, make commits or prove that production styles match. Direct `bundle exec jekyll build` bypasses this package-script check. Before finishing a visual change, run the freshness check explicitly and verify the root site. The production specimen embeds the four plain-CSS production Sass partials and the navigation/search scripts. Their contents participate in the guide fingerprint. Keep these partials valid CSS so the standalone specimen requires no Sass build.

### Sources

[^format]: Google, [DESIGN.md alpha specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md), checked 2026-09-26; schema also inspected through Context7 for `/google-labs-code/design.md`.
[^v9]: Local branding project `/Users/michmzr/SecondBrain/1_Projects/Branding/wizytowka/`: `src/generate_business_card_v9.py`, `cybershu-business-card-v9.html`, v9 PNG exports and `v9-output/assets/michal-mazur-retusz.png`. Copies are in `docs/design-reference/`; original copy is retained in the images.
[^base]: Same branding project: `src/generate_business_card.py`, the three Inter TTF files under `assets/fonts/`, and the v8 reverse reused by v9. These supply the palette, font weights and QR destination.
[^pages]: Repository sources: `index.html`, `archive.html`, `about.md`, `uses.md`, `consultations.md`, `404.html`, `commandbook.md`, `_data/navigation.yml`, `_layouts/home.html`, `_layouts/articles.html`, `_layouts/archive.html`. Routes checked in a fresh root-config Jekyll build on 2026-09-26.
[^posts]: The 19 dated Markdown files under `_posts/`, excluding `_template.md`. Examples: `2023-02-27-spring-boot-cors.md`, `2023-12-26-n8n-setup.md`, `2026-09-07-think-before-you-build-side-project-economics.md` and `2026-09-23-confitura-resilience-w-erze-ai.md`. Counts are a dated inventory, not hard-coded UI data.
[^contact]: `contact.html`, `_sass/cybershu/content.scss` and `_config.yml` author fields; email sourced from the local branding project’s business-card assets.
[^consultations]: `consultations.md`, including the developer offerings, Cognitive Coaching section, six learning paths and `#book-consultation` involve.me embed.
[^media]: `_posts/2021-09-24-webinar-second-brain.md`, `_posts/2025-06-15-vibe-coding.md`, `_posts/2026-05-14-javeloper-cebula.md`, `_posts/2026-09-23-confitura-resilience-w-erze-ai.md` and `assets/docs/`.
[^archive]: `_includes/tags.html`, `_includes/paginator.html`, `_includes/scripts/archieve.js` and `_layouts/archive.html`.
[^search]: `_includes/header.html`, `_includes/search.html`, `_includes/search-providers/default/search.html`, `_includes/search-providers/default/search.js` and `_layouts/page.html`.
[^article]: `_layouts/article.html`, `_layouts/page.html`, `_includes/article-info.html`, `_includes/article-header.html`, `_includes/article-footer.html`, `_includes/article-section-navigator.html`, `_includes/footer.html`, `_config.yml` and `_data/variables.yml`.
[^runtime]: Root `package.json`, `Gemfile`, local `Gemfile.lock`, `_config.yml`, `_data/variables.yml`, `assets/css/main.scss`, `.travis.yml`, `.github/workflows/style-guide.yml`, `README.md` and `HOW_TO_RELEASE.md`. The local lock resolves Jekyll 3.9.3 with github-pages 228; these are observed local resolutions, not new required upgrades.
[^contrast]: W3C, [WCAG 2.2 text contrast, criterion 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
[^nontext]: W3C, [WCAG 2.2 non-text contrast, criterion 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
[^cli]: Google, [DESIGN.md validator](https://github.com/google-labs-code/design.md#cli-reference).
