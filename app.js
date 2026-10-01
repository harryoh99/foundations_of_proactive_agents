(() => {
  'use strict';
  const app = document.querySelector('#app');
  const dialog = document.querySelector('#figure-dialog');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = value => {
    const s = String(value || '').trim();
    return /^(https?:\/\/|\.\.?\/|[a-zA-Z0-9_-])/.test(s) && !/^[^/]*:/.test(s.replace(/^https?:/, '')) ? s : '';
  };
  let figures = [];
  const tabs = new Map();
  const stats = items => items?.length ? `<div class="stats">${items.map(x => `<div class="stat"><strong>${esc(x.value)}</strong><span>${esc(x.label)}</span></div>`).join('')}</div>` : '';
  const cards = items => items?.length ? `<div class="cards">${items.map(x => `<article class="card ${['tc','ta','tr'].includes(x.tone) ? 'metric-card metric-' + x.tone : ''}"><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('')}</div>` : '';
  function figure(f, {hidden = false, group = '', index = 0, heading = true} = {}) {
    const key = figures.push(f) - 1;
    return `<figure class="paper-figure" ${hidden ? 'hidden' : ''} data-group="${esc(group)}" data-index="${index}">
      ${heading ? `<h3 class="figure-heading">${esc(f.title)}</h3>` : ''}
      ${f.description ? `<p class="figure-description">${esc(f.description)}</p>` : ''}
      <button type="button" class="figure-button" data-figure="${key}" aria-label="Enlarge ${esc(f.label)}: ${esc(f.title)}"><img src="${esc(safeUrl(f.src))}" alt="${esc(f.alt)}" decoding="async"><span class="zoom-hint" aria-hidden="true">Enlarge ↗</span></button>
      <figcaption><span class="figure-label">${esc(f.label)}.</span>${esc(f.caption)}</figcaption>
    </figure>`;
  }
  function section(s, sectionIndex) {
    const selected = Math.min(tabs.get(s.id) || 0, Math.max(0, (s.figures?.length || 1) - 1));
    const images = (s.figures || []).map((f, i) => figure(f, {group:s.id,index:i,hidden:s.figureTabs && i !== selected,heading:!s.figureTabs})).join('');
    return `<section class="paper-section" id="${esc(s.id)}">
      <header class="section-head"><span class="eyebrow">${String(sectionIndex + 1).padStart(2, "0")} / ${esc(s.eyebrow)}</span><h2>${esc(s.title)}</h2><p class="section-intro">${esc(s.intro)}</p></header>
      ${s.id === 'principles' ? cards(s.cards) : ''}
      ${s.figureTabs ? `<div class="figure-tabs" aria-label="Technical layer figures">${(s.figures || []).map((f,i)=>`<button type="button" class="figure-tab" data-tab-group="${esc(s.id)}" data-tab="${i}" aria-pressed="${i===selected}">${esc(f.title)}</button>`).join('')}</div>` : ''}
      ${images}${stats(s.stats)}${s.id !== 'principles' ? cards(s.cards) : ''}
      ${s.quotes?.length ? `<div class="quotes">${s.quotes.map(q=>`<blockquote><p>“${esc(q.text)}”</p><cite>${esc(q.attribution)}</cite></blockquote>`).join('')}</div>` : ''}
      ${s.note ? `<p class="section-note">${esc(s.note)}</p>` : ''}
    </section>`;
  }
  function render(data, preserve = false) {
    const y = scrollY;
    const abstractOpen = document.querySelector('.abstract')?.open;
    figures = [];
    const m=data.meta, t=data.theme, o=data.overview, sections=data.sections.filter(s=>s.enabled);
    document.title=m.title;
    document.documentElement.style.setProperty('--accent', /^#[0-9a-f]{6}$/i.test(t.accent) ? t.accent : '#294d72');
    document.documentElement.style.setProperty('--bg', /^#[0-9a-f]{6}$/i.test(t.background) ? t.background : '#ffffff');
    document.documentElement.style.setProperty('--width', `${Math.min(1440,Math.max(800,Number(t.contentWidth)||1080))}px`);
    document.documentElement.style.setProperty('--body-size', `${Math.min(22,Math.max(14,Number(t.bodySize)||16))}px`);
    app.innerHTML=`<header class="topbar"><nav class="container nav" aria-label="Main navigation"><a class="wordmark" href="#top">Proactive Agents</a><div class="navlinks"><a href="#overview">Overview</a>${sections.map(s=>`<a href="#${esc(s.id)}">${esc(s.nav)}</a>`).join('')}</div></nav></header>
      <main class="container" id="main"><header class="hero" id="top"><span class="eyebrow">${esc(m.eyebrow)}</span><h1>${esc(m.title)}</h1><p class="subtitle">${esc(m.subtitle)}</p><p class="summary">${esc(m.summary)}</p>
      ${m.authors ? `<p class="authors">${m.authors.split(',').map(name=>`<span class="author-name">${esc(name.trim())}</span>`).join('<span class="author-separator">, </span>')}</p>` : ''}${m.affiliations ? `<p class="affiliations">${esc(m.affiliations)}</p>` : ''}
      <div class="hero-actions">${safeUrl(m.paperUrl) ? `<a class="button primary" href="${esc(safeUrl(m.paperUrl))}" target="_blank" rel="noopener">Paper ↗</a>` : ''}${m.codeComingSoon ? '<button type="button" class="button coming-soon" disabled>Code · Coming soon</button>' : `<a class="button ${!m.paperUrl?'primary':''}" href="${esc(safeUrl(m.codeUrl))}" target="_blank" rel="noopener">Code ↗</a>`}<a class="button" href="#findings">Key findings ↓</a>${m.bibtex ? '<a class="button" href="#citation">BibTeX</a>' : ''}</div></header>
      <section class="overview" id="overview"><div class="overview-lead"><h2>${esc(o.title)}</h2><p>${esc(o.text)}</p></div>${figure(o.figure,{heading:false})}${stats(o.stats)}
      <details class="abstract" ${abstractOpen?'open':''}><summary>Read the abstract</summary><p>${esc(m.abstract)}</p></details></section>
      <section class="findings" id="findings"><h2>${esc(data.findings.title)}</h2><div class="finding-grid">${data.findings.items.map((f,i)=>`<a class="finding" href="#${esc(sections.some(s=>s.id===f.target)?f.target:'overview')}"><span class="number">0${i+1}</span><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p><span class="read-more">View evidence →</span></a>`).join('')}</div></section>
      ${sections.map(section).join('')}
      ${m.bibtex?`<section id="citation" class="citation"><h2>BibTeX</h2><pre>${esc(m.bibtex)}</pre><button class="button" type="button" id="copy-citation">Copy citation</button><span id="copy-status" role="status"></span></section>`:''}
      </main><footer class="container footer"><span>${esc(m.title)}</span>${m.codeComingSoon ? '<span>Code · Coming soon</span>' : `<a href="${esc(safeUrl(m.codeUrl))}" target="_blank" rel="noopener">Project repository ↗</a>`}</footer>`;
    if(preserve) requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'instant'}));
  }
  app.addEventListener('click', async e=>{
    const zoom=e.target.closest('[data-figure]');
    if(zoom){const f=figures[Number(zoom.dataset.figure)];document.querySelector('#dialog-image').src=safeUrl(f.src);document.querySelector('#original-image').href=safeUrl(f.src);document.querySelector('#dialog-image').alt=f.alt;document.querySelector('#dialog-label').textContent=`${f.label} · ${f.title}`;document.querySelector('#dialog-caption').textContent=f.caption;dialog.showModal();return;}
    const tab=e.target.closest('[data-tab-group]');
    if(tab){const group=tab.dataset.tabGroup,index=Number(tab.dataset.tab);tabs.set(group,index);app.querySelectorAll('[data-tab-group]').forEach(el=>{if(el.dataset.tabGroup===group)el.setAttribute('aria-pressed',String(Number(el.dataset.tab)===index));});app.querySelectorAll('.paper-figure[data-group]').forEach(el=>{if(el.dataset.group===group)el.hidden=Number(el.dataset.index)!==index;});return;}
    if(e.target.closest('#copy-citation')){try{await navigator.clipboard.writeText(window.PROJECT.meta.bibtex);document.querySelector('#copy-status').textContent=' Copied.';}catch{document.querySelector('#copy-status').textContent=' Select the citation text above to copy.';}}
  });
  document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  window.addEventListener('message',e=>{
    if(window.parent===window || e.source!==window.parent || e.data?.type!=='proactive-preview')return;
    if(!e.data.content?.meta||!Array.isArray(e.data.content?.sections))return;
    window.PROJECT=e.data.content;render(window.PROJECT,true);
  });
  render(window.PROJECT);
})();
