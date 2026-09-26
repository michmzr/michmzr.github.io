// Run with Playwright available on NODE_PATH and a root Jekyll build on SITE_URL.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const origin = process.env.SITE_URL || 'http://127.0.0.1:4174';
const screenshots = process.env.REVIEW_OUTPUT || '/tmp/cybershu-review';
fs.mkdirSync(screenshots, { recursive: true });
const routes = ['/', '/page2/', '/page3/', '/archive.html', '/articles/spring-boot-cors.html', '/articles/n8n-setup.html', '/confitura-2026-resilience-w-erze-ai-notatki-prelegenta.html', '/javeloper-2026-zrob-cebulowego-sassa-notatki-prelegenta.html', '/vibe-coding-might-be-very-hard.html', '/articles/webinar-second-brain.html', '/consultations.html', '/contact.html', '/about.html', '/uses.html', '/404.html', '/commandbook.html'];

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  try {
    const context = await browser.newContext();
    const external = [];
    await context.route('**/*', route => {
      if (route.request().url().startsWith(origin)) return route.continue();
      external.push(route.request().url()); return route.abort();
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const findings = [];
    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        await page.goto(origin + route); await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => scrollTo(0, 0));
        if (await page.locator('#cookie-preferences').isVisible()) await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
        const metrics = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, font: getComputedStyle(document.body).fontFamily }));
        if (metrics.scroll > width) findings.push({ route, width, overflow: metrics.scroll });
        assert.ok(metrics.font.startsWith('Inter'), route + ' font');
        if ([320, 1440].includes(width)) await page.screenshot({ path: screenshots + '/' + width + '-' + (route === '/' ? 'index' : route.replaceAll('/', '').replace('.html', '')) + '.png' });
      }
    }
    console.log('Responsive findings:', JSON.stringify(findings));
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(origin + '/contact.html');
      assert.equal(response.status(), 200, 'Contact route must exist');
      // Inspect mailto without activating it or launching an email client.
      assert.equal(await page.locator('.contact-email').getAttribute('href'), 'mailto:kontakt@cybershu.eu');
      assert.equal(await page.locator('#site-navigation a[href="/contact.html"]').getAttribute('aria-current'), 'page');
      assert.equal(await page.locator('footer a[href="/contact.html"]').count(), 1);
      const contactLinks = page.locator('.contact-email, .contact-socials a');
      assert.equal(await contactLinks.count(), 4);
      const remaining = new Set(await contactLinks.evaluateAll(links => links.map(link => link.getAttribute('href'))));
      for (let step = 0; step < 60 && remaining.size; step++) {
        await page.keyboard.press('Tab');
        const focused = await page.evaluate(() => {
          const element = document.activeElement;
          const style = getComputedStyle(element);
          return { contact: element.matches('.contact-email, .contact-socials a'), href: element.getAttribute('href'), outline: style.outlineStyle, width: parseFloat(style.outlineWidth) };
        });
        if (focused.contact) {
          assert.notEqual(focused.outline, 'none', 'Contact link needs visible keyboard focus');
          assert.ok(focused.width > 0, 'Contact focus outline needs nonzero width');
          remaining.delete(focused.href);
        }
      }
      assert.equal(remaining.size, 0, 'Email and every social profile must be reachable using Tab');
    }
    await page.goto(origin + '/archive.html?tag=ai');
    assert.equal(await page.locator('[data-tag="ai"]').getAttribute('aria-pressed'), 'true');
    assert.ok(await page.locator('[data-archive-entry]:visible').count() > 0);
    await page.locator('.topic-picker summary').click();
    await page.locator('[data-tag="devops"]').click(); assert.ok(page.url().includes('tag=devops'));
    await page.goBack(); assert.equal(await page.locator('[data-tag="ai"]').getAttribute('aria-pressed'), 'true');
    await page.locator('[data-tag=""]').click(); assert.equal(await page.locator('[data-archive-entry]:visible').count(), 19);
    await page.goto(origin + '/archive.html?tag=missing-topic'); assert.equal(await page.locator('[data-archive-entry]:visible').count(), 0);
    await page.locator('[data-search-open]').click();
    const input = page.getByRole('searchbox'); await input.fill('Spring');
    assert.ok(await page.locator('[data-search-results] a').count() > 0);
    await input.press('ArrowDown');
    assert.equal(await page.evaluate(() => document.activeElement.parentElement.parentElement.hasAttribute('data-search-results')), true);
    await page.keyboard.press('Escape'); assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-search-open')), true);
    await page.locator('[data-search-open]').click(); await input.fill('zzzz-not-here'); assert.match(await page.locator('[data-search-status]').textContent(), /No articles/);
    await page.getByRole('button', { name: 'Clear', exact: true }).click(); assert.equal(await input.inputValue(), '');
    await page.screenshot({ path: screenshots + '/search.png' }); await page.keyboard.press('Escape');
    await page.setViewportSize({ width: 320, height: 900 }); await page.goto(origin + '/articles/spring-boot-cors.html');
    await page.locator('[data-menu-toggle]').click(); assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'), 'true');
    await page.locator('#site-navigation a').first().focus(); await page.keyboard.press('Escape'); assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'), 'false');
    await page.locator('[data-toc] summary').click(); await page.locator('[data-toc] a').first().click(); assert.ok(new URL(page.url()).hash);
    assert.ok(await page.locator('.article__content h4[id] .heading-anchor').count() > 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    await page.keyboard.press('Tab');
    await page.locator('[data-search-open]').focus(); assert.notEqual(await page.locator('[data-search-open]').evaluate(el => getComputedStyle(el).outlineStyle), 'none');
    for (const route of routes) {
      await page.goto(origin + route); await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      if (width > 320) findings.push({ route, width: 320, text: '200%', overflow: width });
    }
    assert.equal(external.filter(url => /googletagmanager|addtoany/.test(url)).length, 0);
    await page.goto(origin + '/consultations.html'); await page.locator('a[href="#book-consultation"]').first().click();
    assert.equal(new URL(page.url()).hash, '#book-consultation');
    assert.equal(await page.locator('#book-consultation [data-provider]').getAttribute('data-loaded'), 'true');
    await page.waitForFunction(() => document.querySelector('#book-consultation .provider-status').textContent.includes('could not load'));
    await page.screenshot({ path: screenshots + '/booking-blocked.png' });
    assert.ok(await page.locator('#book-consultation .provider-fallback a').isVisible());
    await page.locator('[data-cookie-settings]').click(); await page.getByRole('button', { name: 'Accept optional', exact: true }).click();
    await page.waitForFunction(() => !!document.querySelector('[data-analytics-script]'));
    await page.locator('[data-cookie-settings]').click();
    await Promise.all([page.waitForEvent('load'), page.getByRole('button', { name: 'Reject optional', exact: true }).click()]);
    assert.equal(await page.locator('[data-analytics-script]').count(), 0);
    assert.equal(await page.locator('#cookie-preferences').isVisible(), false);
    await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto(origin + '/about.html'); await page.locator('.site-footer').scrollIntoViewIfNeeded();
    await page.screenshot({ path: screenshots + '/footer.png' });
    const fresh = await browser.newContext({ viewport: { width: 320, height: 800 } });
    const freshPage = await fresh.newPage(); await freshPage.goto(origin);
    await freshPage.screenshot({ path: screenshots + '/cookie-320.png' }); await fresh.close();
    console.log(JSON.stringify({ routes: routes.length, widths: 4, findings, errors, screenshots }, null, 2));
    fs.writeFileSync(screenshots + '/results.json', JSON.stringify({ routes, widths: [320, 768, 1024, 1440], findings, errors }, null, 2));
    assert.equal(findings.length, 0, 'Responsive overflow'); assert.equal(errors.length, 0, 'Browser exceptions');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
