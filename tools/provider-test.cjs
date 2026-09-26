const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  try {
    const page = await browser.newPage();
    let requests = 0;
    await page.route('https://provider.test/widget.js', route => {
      requests++;
      return route.fulfill({ contentType: 'text/javascript', body: 'window.remoteExecutions = (window.remoteExecutions || 0) + 1; window.inlineRanFirst = window.providerExecutions === 1;' });
    });
    await page.setContent(`<dialog id="cookie-preferences"><button data-consent="rejected">Reject</button><button data-consent="accepted">Accept</button></dialog>
      <div data-provider="Automatic fixture" data-provider-auto><div class="provider-placeholder">Loading</div><p class="provider-status"></p><template><script>window.autoExecutions = (window.autoExecutions || 0) + 1;</script></template></div>
      <div data-provider="Fixture"><div class="provider-placeholder"><button data-provider-load>Load fixture</button></div><p class="provider-status"></p>
      <template><div id="provider-target"></div><script>window.providerExecutions = (window.providerExecutions || 0) + 1; window.targetPresent = !!document.querySelector('#provider-target');</script><script src="https://provider.test/widget.js"></script></template></div>
      <div data-provider="Second fixture"><div class="provider-placeholder"><button data-provider-load>Load second fixture</button></div><p class="provider-status"></p><template><script>window.secondExecutions = (window.secondExecutions || 0) + 1;</script><script src="https://provider.test/widget.js"></script></template></div>`);
    await page.addScriptTag({ content: fs.readFileSync('assets/js/consent.js', 'utf8') });
    assert.equal(await page.evaluate(() => window.autoExecutions), 1, 'Automatic provider starts without consent');
    await page.getByRole('button', { name: 'Reject', exact: true }).click();
    assert.equal(await page.evaluate(() => window.autoExecutions), 1, 'Rejection does not reload an automatic provider');
    await page.evaluate(() => document.querySelector('#cookie-preferences').show());
    await page.getByRole('button', { name: 'Load fixture' }).click();
    assert.equal(await page.evaluate(() => window.providerExecutions), 1, 'Initialize provider exactly once');
    assert.equal(await page.evaluate(() => window.targetPresent), true, 'Provider container exists before initialization');
    await page.waitForFunction(() => window.remoteExecutions);
    assert.equal(await page.evaluate(() => window.remoteExecutions), 1);
    assert.equal(await page.evaluate(() => window.inlineRanFirst), true);
    assert.equal(requests, 1);
    await page.getByRole('button', { name: 'Accept', exact: true }).click();
    assert.equal(await page.evaluate(() => window.providerExecutions), 1, 'Global consent does not initialize an already loaded provider again');
    assert.equal(await page.evaluate(() => window.secondExecutions), 1);
    assert.equal(requests, 1, 'Shared provider library requested only once');
    assert.equal(await page.evaluate(() => window.autoExecutions), 1, 'Acceptance does not reinitialize automatic providers');
    console.log('Provider lifecycle: 11 assertions passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
