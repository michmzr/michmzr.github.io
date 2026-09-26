const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const origin = process.env.SITE_URL || 'http://127.0.0.1:4174';

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  try {
    const page = await browser.newPage();
    const requests = [];
    await page.route('**/*', route => {
      const url = route.request().url();
      if (url.startsWith(origin)) return route.continue();
      requests.push(url);
      if (url === 'https://cybershu.disqus.com/embed.js') return route.fulfill({ contentType: 'text/javascript', body: 'window.disqusStarts=(window.disqusStarts||0)+1; window.disqusSettings={page:{}}; disqus_config.call(window.disqusSettings);' });
      if (url === 'https://tally.so/widgets/embed.js') return route.fulfill({ contentType: 'text/javascript', body: 'window.Tally={loadEmbeds(){}};' });
      if (url === 'https://michal-mazur.involve.me/embed') return route.fulfill({ contentType: 'text/javascript', body: 'window.bookingStarts=(window.bookingStarts||0)+1;' });
      if (url.startsWith('https://tally.so/embed/')) return route.fulfill({ contentType: 'text/html', body: '<p>Mock feedback form</p>' });
      return route.abort();
    });
    // A fresh visitor sees forms before making any cookie choice.
    await page.goto(origin + '/consultations.html');
    await page.waitForFunction(() => window.bookingStarts === 1);
    assert.equal(await page.locator('#cookie-preferences').isVisible(), true);
    await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
    assert.equal(await page.evaluate(() => window.bookingStarts), 1);
    await page.goto(origin + '/archive.html');
    const posts = await page.locator('[data-archive-entry] h3 a').evaluateAll(links => links.map(link => link.getAttribute('href')));
    assert.equal(posts.length, 19);
    for (const path of posts) {
      await page.goto(origin + path);
      await page.waitForFunction(() => window.disqusStarts === 1);
      const config = await page.evaluate(() => window.disqusSettings.page);
      assert.ok(config.identifier, path + ': thread identifier');
      assert.equal(config.url, 'https://www.cybershu.eu' + path, path + ': canonical URL');
      assert.equal(await page.locator('[data-provider="Disqus"] #disqus_thread').count(), 1);
    }
    for (const path of ['/confitura-2026-resilience-w-erze-ai-notatki-prelegenta.html', '/javeloper-2026-zrob-cebulowego-sassa-notatki-prelegenta.html']) {
      const before = requests.length;
      await page.goto(origin + path);
      const forms = page.locator('[data-provider="Tally"]');
      assert.equal(await forms.count(), await page.locator('[data-provider="Tally"][data-loaded="true"] iframe[src]').count());
      assert.equal(requests.slice(before).filter(url => url === 'https://tally.so/widgets/embed.js').length, 1);
    }
    assert.equal(requests.filter(url => /googletagmanager|addtoany/.test(url)).length, 0);
    console.log('Autoload passed: 19 Disqus threads, booking before consent, all Tally forms after rejection, optional analytics/sharing inactive.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
