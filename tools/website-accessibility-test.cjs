const { chromium } = require('playwright');
const axe = require('axe-core');
const fs = require('node:fs');
const origin = process.env.SITE_URL || 'http://127.0.0.1:4174';
const routes = ['/', '/archive.html', '/articles/spring-boot-cors.html', '/confitura-2026-resilience-w-erze-ai-notatki-prelegenta.html', '/consultations.html', '/contact.html', '/about.html', '/uses.html', '/404.html'];
(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const findings = [];
  let scans = 0;
  try {
    const page = await browser.newPage();
    await page.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
    async function audit(label) {
      await page.addScriptTag({ content: axe.source });
      const result = await page.evaluate(() => axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
      scans++;
      for (const violation of result.violations) findings.push({ label, id: violation.id, impact: violation.impact, nodes: violation.nodes.map(n => ({ target: n.target, reason: n.failureSummary })) });
    }
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        await page.goto(origin + route); await page.evaluate(() => document.fonts.ready);
        if (await page.locator('#cookie-preferences').isVisible()) await page.getByRole('button', { name: 'Reject optional', exact: true }).click();
        await audit(width + ' ' + route);
      }
    }
    await page.locator('[data-cookie-settings]').click(); await audit('Cookie dialog'); await page.keyboard.press('Escape');
    await page.locator('[data-search-open]').click(); await page.getByRole('searchbox').fill('Spring'); await audit('Search results');
    fs.writeFileSync('/tmp/cybershu-review/accessibility.json', JSON.stringify(findings, null, 2));
    console.log(JSON.stringify({ scans, violations: findings }, null, 2));
    if (findings.length) process.exitCode = 1;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
