# Agent instructions

## Documentation language and authority

Write all newly authored or updated project documentation in English, including design rules, reviews, agent instructions and style-guide explanations. Preserve the original language of quoted brand copy, article titles and reference assets, and mark non-English specimens with the appropriate HTML `lang` attribute. This does not authorize translating published website content or rewriting inherited upstream translations.

Project documentation lives in `docs/`. Before visual changes, read [docs/DESIGN.md](docs/DESIGN.md), its page-family inventory and [docs/style-guide.html](docs/style-guide.html). [docs/DESIGN-REVIEW.md](docs/DESIGN-REVIEW.md) records the review against the current website and outstanding specimen gaps. Brand reference assets are in `docs/design-reference/`.

`DESIGN.md` is the foundation for the new CyberShu website design; the production theme has not yet been refactored to match it. The business-card project supplies branding inspiration, the palette, typography and updated logo/wordmark only. Do not treat its composition, portrait placement, slogans, audience brief or print constraints as website requirements. Design page layouts and components around website content and user tasks. Explicit user instructions take priority. Keep tokens, prose and relevant specimens consistent when an accepted rule changes.

Treat the design's geometry, density, surface allocation, radii and motion timing as adjustable website defaults, not permanent branding constraints. Use the current shared baseline consistently until revising tokens, prose and affected specimens together. Preserve identity, accessibility and existing content/function contracts. Ordinary visual decisions within that scope do not require separate approval.

## Existing website contracts

CyberShu is a technical blog and consultation website. The existing site is the content and functionality baseline, not a requirement to preserve its current appearance or exact layout. Header composition, navigation presentation, article-list treatment and page introductions may be redesigned while keeping content and functions accessible. Preserve the paginated index, tag-filtered archive, technical articles, conference resources, About, Uses and 404 pages. Keep English and Polish page languages, existing post permalinks, pagination paths, heading fragments and downloadable assets.

The consultation offer includes developer mentoring, cognitive coaching and six learning paths. Preserve its booking target and involve.me integration. Preserve Tally feedback embeds on conference pages, configured search, RSS, sharing and comments. Card-specific content exclusions do not authorize removing website services or article content.

## Living style guide

Do not edit generated `docs/style-guide.html` by hand. `tools/style-guide.rb` reads YAML tokens from `docs/DESIGN.md`; layout, styles and interactions live in `tools/style-guide/`. The HTML uses local fonts and images and needs no Jekyll build. Run `ruby tools/style-guide.rb` after changing the document or preview sources, then `ruby tools/style-guide.rb --check`. Include the regenerated HTML in the same change.

`ruby tools/style-guide.rb --watch` regenerates the file after source changes; refresh the browser afterward. Equivalent package scripts are `style-guide:build`, `style-guide:check` and `style-guide:watch`. Prefer pnpm over npm when pnpm is available. The direct Ruby commands require no Node dependencies.

The generator synchronizes tokens, not natural-language requirements or production CSS. Update affected examples manually when prose rules change. Add a representative kitchen-sink specimen for each new production component or state, and keep its coverage table honest. Generic dialogs do not prove search coverage; the local demo form is not the real booking integration. Aim to share component styles during the future site refactor.

## Repository and publication scope

Jekyll/TeXt styles enter through `assets/css/main.scss`; partials are in `_sass/`, with `_sass/custom.scss` imported last. Templates are in `_layouts/` and `_includes/`; navigation is in `_data/navigation.yml`. `consultations.md` also contains an embedded stylesheet. Never edit generated `_site/` output.

The root `_config.yml` defines CyberShu and excludes `/docs`, `/tools` and `AGENTS.md` from publication. Preserve these exclusions. Other material under `docs/`, including `_docs/`, `_sample_*` and demo configurations, is inherited TeXt reference, not the CyberShu design system. The old Travis workflow builds the theme demo, not the root site.

`README.md` is currently an older author bio, and `HOW_TO_RELEASE.md` describes publishing the theme gem. Do not treat either as an authoritative deployment guide for CyberShu.

## Verification

After design-document changes, validate its structure with `pnpm dlx @google/design.md lint docs/DESIGN.md`. Run `ruby tools/style-guide-test.rb` for generator tests and `ruby tools/style-guide.rb --check` for freshness. The generator supports Ruby 3.2 or newer with standard libraries; tests use Minitest.

GitHub Actions and the package `build` script check preview freshness. They do not regenerate files, commit changes or prove production parity. A direct `bundle exec jekyll build` bypasses the package check, so run it explicitly as part of visual-change verification.

For production changes, build with the root configuration and verify the page families and interactions listed in DESIGN.md. Test 320/768/1024/1440px widths, 200% text, keyboard focus, reduced motion and external-provider failure states. Report which flows were exercised; do not claim full coverage from the generic kitchen sink.
