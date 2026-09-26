(() => {
  'use strict';
  const archive = document.querySelector('[data-archive]');
  if (archive) {
    const filters = [...archive.querySelectorAll('[data-tag]')];
    const entries = [...archive.querySelectorAll('[data-archive-entry]')];
    const apply = () => {
      const tag = new URL(location.href).searchParams.get('tag') || '';
      const label = archive.querySelector('[data-filter-label]');
      if (label) label.textContent = tag || 'All topics';
      let count = 0;
      entries.forEach(entry => {
        entry.hidden = !!tag && !JSON.parse(entry.dataset.tags).includes(tag);
        if (!entry.hidden) count++;
      });
      filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.tag === tag)));
      archive.querySelectorAll('[data-year]').forEach(year => {
        year.hidden = ![...year.querySelectorAll('[data-archive-entry]')].some(entry => !entry.hidden);
      });
      archive.querySelector('[data-archive-status]').textContent = count ? count + ' article' + (count === 1 ? '' : 's') + (tag ? ' tagged “' + tag + '”' : '') : 'No articles for this topic. Choose Show all to browse the archive.';
    };
    filters.forEach(button => button.addEventListener('click', () => {
      const url = new URL(location.href);
      if (button.dataset.tag) url.searchParams.set('tag', button.dataset.tag);
      else url.searchParams.delete('tag');
      history.pushState(null, '', url); apply();
    }));
    window.addEventListener('popstate', apply); apply();
  }
  const dialog = document.querySelector('#site-search');
  if (!dialog) return;
  const input = dialog.querySelector('input');
  const results = dialog.querySelector('[data-search-results]');
  const status = dialog.querySelector('[data-search-status]');
  let opener;
  const render = () => {
    results.replaceChildren();
    const query = input.value.trim().toLocaleLowerCase();
    if (!query) { status.textContent = 'Enter a title or keyword to find an article.'; return; }
    if (!window.TEXT_SEARCH_DATA) { status.textContent = 'Search is unavailable. Browse the archive instead.'; return; }
    const matches = Object.values(window.TEXT_SEARCH_DATA).flat().filter(post => post.title && post.title.toLocaleLowerCase().includes(query));
    matches.forEach(post => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = post.url; link.textContent = post.title; li.append(link); results.append(li);
    });
    status.textContent = matches.length ? matches.length + ' result' + (matches.length === 1 ? '' : 's') : 'No articles found. Try a different title or keyword.';
  };
  document.querySelectorAll('[data-search-open]').forEach(button => button.addEventListener('click', () => {
    opener = button; dialog.showModal(); input.focus(); render();
  }));
  dialog.querySelector('[data-search-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  dialog.querySelector('[data-search-clear]').addEventListener('click', () => { input.value = ''; render(); input.focus(); });
  input.addEventListener('input', render);
  dialog.addEventListener('keydown', event => {
    const links = [...results.querySelectorAll('a')];
    if (!links.length) return;
    const index = links.indexOf(document.activeElement);
    if (event.key === 'ArrowDown') { event.preventDefault(); links[(index + 1) % links.length].focus(); }
    if (event.key === 'ArrowUp') { event.preventDefault(); links[index <= 0 ? links.length - 1 : index - 1].focus(); }
    if (event.key === 'Enter' && document.activeElement === input) { event.preventDefault(); links[0].click(); }
  });
})();
