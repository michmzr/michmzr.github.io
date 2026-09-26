(() => {
  'use strict';
  const key = 'cybershu-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const dialog = document.querySelector('#cookie-preferences');
  if (!dialog) return;
  let optionalStarted = false;
  let opener;
  let preference;
  const providerScripts = new Map();
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && ['accepted', 'rejected'].includes(saved.value) && saved.expires > Date.now()) preference = saved.value;
  } catch (_) { /* Storage may be blocked; the page still works. */ }

  function loadProvider(panel, moveFocus = false) {
    if (panel.dataset.loaded) return;
    panel.dataset.loaded = 'true';
    if (!panel.hasAttribute('data-provider-auto')) optionalStarted = true;
    const status = panel.querySelector('.provider-status');
    const polish = panel.lang === 'pl';
    status.textContent = polish ? 'Jeśli formularz się nie pojawi, użyj bezpośredniego linku powyżej.' : 'If the content does not appear, use the direct link above.';
    const template = panel.querySelector('template');
    if (!template) return;
    const content = template.content.cloneNode(true);
    // Keep scripts out of the inserted fragment: cloned template scripts can
    // execute on insertion. Replace inert markers exactly once afterwards.
    const scripts = [...content.querySelectorAll('script')].map(inert => {
      const marker = document.createComment('provider script');
      inert.replaceWith(marker);
      return { inert, marker };
    });
    content.querySelectorAll('iframe[data-src]').forEach(frame => { frame.src = frame.dataset.src; frame.removeAttribute('data-src'); });
    panel.append(content);
    scripts.forEach(({ inert, marker }) => {
      const source = inert.getAttribute('src');
      const refresh = () => {
        if (panel.dataset.provider === 'Tally' && window.Tally) window.Tally.loadEmbeds();
      };
      const existing = source && providerScripts.get(source);
      if (existing) {
        marker.remove();
        existing.addEventListener('load', refresh, { once: true });
        refresh();
        return;
      }
      const script = document.createElement('script');
      script.async = false;
      for (const attr of inert.attributes) script.setAttribute(attr.name, attr.value);
      script.textContent = inert.textContent;
      if (source) providerScripts.set(source, script);
      script.addEventListener('load', refresh, { once: true });
      script.addEventListener('error', () => { status.textContent = polish ? 'Nie udało się wczytać formularza. Użyj bezpośredniego linku.' : 'The service could not load. Use the direct link above.'; });
      marker.replaceWith(script);
    });
    panel.querySelector('.provider-placeholder').hidden = true;
    if (moveFocus) { status.tabIndex = -1; status.focus(); }
  }
  function enableOptional() {
    const id = document.body.dataset.analyticsId;
    if (id && !document.querySelector('[data-analytics-script]')) {
      optionalStarted = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date()); window.gtag('config', id);
      const script = document.createElement('script');
      script.async = true; script.dataset.analyticsScript = '';
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.append(script);
    }
    document.querySelectorAll('[data-provider]').forEach(panel => loadProvider(panel));
  }
  function dismiss() { dialog.close(); if (opener) opener.focus(); }
  function choose(value) {
    preference = value;
    try { localStorage.setItem(key, JSON.stringify({ value, expires: Date.now() + lifetime })); } catch (_) { /* Session-only consent when storage is unavailable. */ }
    dismiss();
    if (value === 'accepted') enableOptional();
    else if (optionalStarted) location.reload();
  }
  dialog.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => choose(button.dataset.consent)));
  dialog.addEventListener('cancel', event => { event.preventDefault(); dismiss(); });
  dialog.addEventListener('keydown', event => { if (event.key === 'Escape') { event.preventDefault(); dismiss(); } });
  document.querySelectorAll('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => {
    opener = button;
    if (dialog.open) dialog.close();
    dialog.showModal();
  }));
  document.querySelectorAll('[data-provider-load]').forEach(button => button.addEventListener('click', () => loadProvider(button.closest('[data-provider]'), true)));
  // Forms and comments start immediately, independently of optional consent.
  document.querySelectorAll('[data-provider-auto]').forEach(panel => loadProvider(panel));
  if (preference === 'accepted') enableOptional();
  else if (!preference) {
    const active = document.activeElement;
    dialog.show();
    if (active && active !== document.body) active.focus();
    else document.activeElement.blur();
  }
  window.addEventListener('storage', event => { if (event.key === key) location.reload(); });
})();
