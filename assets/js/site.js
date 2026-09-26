(() => {
  'use strict';
  const toggle = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('#site-navigation');
  const mobile = matchMedia('(max-width: 1023px)');
  if (toggle && navigation) {
    toggle.hidden = false;
    const collapse = () => {
      toggle.setAttribute('aria-expanded', 'false');
      navigation.dataset.collapsed = String(mobile.matches);
    };
    collapse();
    mobile.addEventListener('change', collapse);
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navigation.dataset.collapsed = String(expanded);
    });
    navigation.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobile.matches) { collapse(); toggle.focus(); }
    });
  }
  const article = document.querySelector('.article__content');
  const toc = document.querySelector('[data-toc]');
  if (article) {
    const headings = article.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    const list = toc && toc.querySelector('ol');
    const selectors = toc ? (toc.dataset.tocSelectors || 'h1,h2,h3') : '';
    headings.forEach(heading => {
      const title = heading.textContent;
      const link = document.createElement('a');
      link.href = '#' + encodeURIComponent(heading.id);
      link.textContent = title;
      if (list && heading.matches(selectors)) {
        const item = document.createElement('li');
        if (heading.tagName === 'H3') item.className = 'toc-sub';
        item.append(link); list.append(item);
      }
      const anchor = link.cloneNode(false);
      anchor.textContent = '#'; anchor.className = 'heading-anchor';
      anchor.setAttribute('aria-label', 'Link: ' + title);
      heading.append(anchor);
    });
    if (toc) {
      toc.hidden = list.children.length === 0;
      const disclosure = toc.querySelector('details');
      disclosure.open = !mobile.matches;
      mobile.addEventListener('change', () => { disclosure.open = !mobile.matches; });
    }
  }
  document.querySelectorAll('.prose table').forEach(table => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll'; wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region'); wrapper.setAttribute('aria-label', 'Scrollable table');
    table.before(wrapper); wrapper.append(table);
  });
  document.querySelectorAll('pre').forEach(pre => {
    pre.tabIndex = 0; pre.setAttribute('aria-label', 'Code sample');
  });
})();
