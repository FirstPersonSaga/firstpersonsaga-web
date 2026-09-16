(() => {
  const data = window.FPS_TARKOV_STREETS_KEYS;
  if (!data) return;

  const state = {
    mode: 'rotation',
    query: '',
    tag: 'all',
    saved: new Set(JSON.parse(localStorage.getItem('fps:tarkov:keyset') || '[]'))
  };

  const rotationGrid = document.querySelector('#rotation-grid');
  const catalogGrid = document.querySelector('#catalog-grid');
  const rotationSection = document.querySelector('#rotation-section');
  const catalogSection = document.querySelector('#catalog-section');
  const queryInput = document.querySelector('#key-search');
  const countEl = document.querySelector('#visible-count');
  const filterPanel = document.querySelector('#filter-panel');
  const drawer = document.querySelector('#key-drawer');
  const drawerPanel = document.querySelector('#key-drawer-panel');

  const normalize = value => (value || '').toLocaleLowerCase('tr-TR');
  const tagLabels = {
    'fps-rotation':'FPS Rotation', valuables:'Valuables', tech:'Tech', medical:'Medical', quest:'Quest',
    ammo:'Ammo', weapons:'Weapons', safe:'Safe', armor:'Armor', cash:'Cash', 'route-access':'Route Access'
  };

  function cardMatches(key) {
    const haystack = [key.name,key.shortName,key.opens,key.location,key.quest,(key.tags||[]).join(' '),(key.loot||[]).join(' ')].map(normalize).join(' ');
    const queryOk = !state.query || haystack.includes(normalize(state.query));
    const tagOk = state.tag === 'all' || (key.tags || []).includes(state.tag);
    return queryOk && tagOk;
  }

  function tagClass(tag){
    if(tag === 'fps-rotation') return 'hot';
    if(tag === 'quest') return 'quest';
    if(tag === 'route-access') return 'route';
    return '';
  }

  function renderRotation() {
    const keys = data.rotation.filter(cardMatches);
    rotationGrid.innerHTML = keys.length ? keys.map(key => `
      <article class="key-card ${state.saved.has(key.id) ? 'saved' : ''}" data-key-id="${key.id}">
        <div class="key-art"><img src="${key.image}" alt="${escapeHtml(key.name)}" loading="lazy"></div>
        <div class="key-card-body">
          <div class="key-card-top"><span class="key-short">${escapeHtml(key.shortName)}</span><span class="key-slot">${escapeHtml(key.siccSlot || '')}</span></div>
          <h3 class="key-name">${escapeHtml(key.name)}</h3>
          <div class="key-opens"><span>Açtığı yer</span>${escapeHtml(key.opens)}</div>
          <div class="key-badges">${(key.tags||[]).slice(0,4).map(tag => `<span class="key-badge ${tagClass(tag)}">${escapeHtml(tagLabels[tag] || tag)}</span>`).join('')}</div>
          <div class="key-card-actions">
            <button class="key-detail-btn" type="button" data-detail="${key.id}">Detayı aç</button>
            <button class="key-save-btn" type="button" title="My Key Set" aria-label="My Key Set: ${escapeHtml(key.name)}" aria-pressed="${state.saved.has(key.id)}" data-save="${key.id}">${state.saved.has(key.id) ? '✓' : '+'}</button>
          </div>
        </div>
      </article>`).join('') : `<div class="empty-state">Bu arama / filtre için eşleşen rotation key bulunamadı.</div>`;
    if (state.mode === 'rotation') countEl.textContent = `${keys.length} / ${data.rotation.length} key`;
  }

  function renderCatalog() {
    const rotationNames = new Map(data.rotation.map(k => [normalize(k.name),k]));
    const q = normalize(state.query);
    let names = data.allKeyNames.filter(name => !q || normalize(name).includes(q) || (rotationNames.get(normalize(name)) && cardMatches(rotationNames.get(normalize(name)))));
    if(state.tag !== 'all') names = names.filter(name => {
      const key = rotationNames.get(normalize(name));
      return key && (key.tags || []).includes(state.tag);
    });
    catalogGrid.innerHTML = names.length ? names.map(name => {
      const key = rotationNames.get(normalize(name));
      return `<div class="catalog-item ${key ? 'rotation' : ''}"><span>${escapeHtml(name)}</span><small>${key ? 'FPS ROTATION' : 'REFERENCE'}</small></div>`;
    }).join('') : `<div class="empty-state">Bu arama / filtre için key bulunamadı.</div>`;
    if (state.mode === 'all') countEl.textContent = `${names.length} / ${data.allKeyNames.length} key`;
  }

  function render() {
    rotationSection.hidden = state.mode !== 'rotation';
    catalogSection.hidden = state.mode !== 'all';
    document.querySelectorAll('[data-mode]').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === state.mode));
    renderRotation();
    renderCatalog();
  }

  function openDrawer(id) {
    const key = data.rotation.find(k => k.id === id);
    if(!key) return;
    drawerPanel.innerHTML = `
      <button class="key-drawer-close" type="button" aria-label="Detayı kapat">×</button>
      <div class="drawer-art"><img src="${key.image}" alt="${escapeHtml(key.name)}"></div>
      <div class="drawer-kicker">${escapeHtml(key.shortName)} // STREETS OF TARKOV</div>
      <h2 class="drawer-title">${escapeHtml(key.name)}</h2>
      <div class="drawer-meta">
        <div class="drawer-box"><label>Açtığı yer</label><div>${escapeHtml(key.opens)}</div></div>
        <div class="drawer-box"><label>Konum</label><div>${escapeHtml(key.location)}</div></div>
        <div class="drawer-box"><label>SICC slot</label><div>${escapeHtml(key.siccSlot || '—')}</div></div>
        <div class="drawer-box"><label>Quest</label><div>${escapeHtml(key.quest || '—')}</div></div>
      </div>
      ${key.prerequisite ? `<div class="drawer-section"><h3>Ön koşul</h3><p>${escapeHtml(key.prerequisite)}</p></div>` : ''}
      ${key.whyImportant ? `<div class="drawer-section"><h3>Neden önemli?</h3><p>${escapeHtml(key.whyImportant)}</p></div>` : ''}
      ${(key.loot||[]).length ? `<div class="drawer-section"><h3>Loot highlights</h3><div class="drawer-loot">${key.loot.map(x => `<span>${escapeHtml(x)}</span>`).join('')}</div></div>` : ''}
      <a class="drawer-source" href="${key.source}" target="_blank" rel="noopener">Official Wiki kaynağını aç ↗</a>`;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    drawerPanel.querySelector('.key-drawer-close').focus();
  }

  function closeDrawer(){
    drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.style.overflow='';
  }

  function toggleSaved(id){
    if(state.saved.has(id)) state.saved.delete(id); else state.saved.add(id);
    localStorage.setItem('fps:tarkov:keyset', JSON.stringify([...state.saved]));
    renderRotation();
    const savedCount = document.querySelector('#saved-count');
    if(savedCount) savedCount.textContent = state.saved.size;
  }

  function escapeHtml(value=''){
    return String(value).replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  document.addEventListener('click', e => {
    const mode = e.target.closest('[data-mode]');
    if(mode){state.mode=mode.dataset.mode;render();return;}
    const detail = e.target.closest('[data-detail]');
    if(detail){openDrawer(detail.dataset.detail);return;}
    const save = e.target.closest('[data-save]');
    if(save){toggleSaved(save.dataset.save);return;}
    const filter = e.target.closest('[data-filter]');
    if(filter){state.tag=filter.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b===filter));render();return;}
    if(e.target.closest('#filter-toggle')){filterPanel.classList.toggle('open');return;}
    if(e.target.classList.contains('key-drawer-backdrop') || e.target.closest('.key-drawer-close')) closeDrawer();
  });

  queryInput?.addEventListener('input', e => {state.query=e.target.value;render();});
  document.addEventListener('keydown', e => {if(e.key==='Escape' && drawer.classList.contains('open')) closeDrawer();});
  const savedCount = document.querySelector('#saved-count'); if(savedCount) savedCount.textContent = state.saved.size;
  render();
})();
