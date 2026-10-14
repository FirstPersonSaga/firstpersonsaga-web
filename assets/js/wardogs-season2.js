/* Progressive enhancement only. All tables, notes and image links remain readable with JS disabled. */
(()=>{'use strict';
 const $=(selector,root=document)=>root.querySelector(selector);
 const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
 const toc=$('#wd-toc');const aside=$('.wd-aside');const toggle=$('.wd-toc-toggle');
 if(toggle && aside){toggle.addEventListener('click',()=>{const expanded=aside.classList.toggle('wd-aside-open');toggle.setAttribute('aria-expanded',String(expanded));toggle.innerHTML=expanded?'Bölümleri gizle <span>⌃</span>':'Bölümleri göster <span>⌄</span>'});}
 if(toc){
   $$('.wd-toc-link',toc).forEach(link=>link.addEventListener('click',()=>{if(window.matchMedia('(max-width:800px)').matches){aside.classList.remove('wd-aside-open');toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.innerHTML='Bölümleri göster <span>⌄</span>';}}));
   const links=$$('.wd-toc-link',toc);const byID=new Map(links.map(l=>[l.hash.slice(1),l]));
   const blocks=$$('.wd-section');
   if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;links.forEach(l=>{l.classList.remove('active');l.removeAttribute('aria-current')});const link=byID.get(entry.target.id);if(link){link.classList.add('active');link.setAttribute('aria-current','location')}}},{rootMargin:'-8% 0px -77% 0px',threshold:0});blocks.forEach(b=>io.observe(b));}
 }
 const input=$('#wd-filter'),reset=$('#wd-reset'),result=$('#wd-result');
 const tables=$$('.wd-article table');const allRows=tables.flatMap(t=>$$('tbody tr',t));
 const nestedDetails=$$('.wd-article details.track');nestedDetails.forEach(det=>det.dataset.beforeSearch=det.open?'open':'closed');
 if(input){
  const normalize=s=>s.toLocaleLowerCase('tr-TR').normalize('NFKD').replace(/[\u0300-\u036f]/g,'');
  const filter=()=>{
    const query=normalize(input.value.trim());reset.hidden=!query;result.hidden=!query;
    let found=0;
    allRows.forEach(row=>{const match=!query||normalize(row.textContent).includes(query);row.classList.toggle('wd-filtered-out',!match);if(query&&match)found++;});
    nestedDetails.forEach(detail=>{if(!query){detail.hidden=false;detail.open=detail.dataset.beforeSearch==='open';return;}const has=$$('tbody tr',detail).some(r=>!r.classList.contains('wd-filtered-out'));detail.hidden=!has;detail.open=has;});
    if(query)result.textContent=found?`${found} eşleşen tablo satırı. Role Track ve Vendor tablolarında sonuçlar otomatik açıldı.`:'Tablolarda eşleşme bulunamadı.';
  };
  input.addEventListener('input',filter);reset.addEventListener('click',()=>{input.value='';filter();input.focus()});
 }
 const dlg=$('#wd-image-dialog');
 if(dlg&&typeof dlg.showModal==='function'){
   $$('.wd-image-link').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();const im=$('img',link);const large=$('img',dlg);large.src=link.href;large.alt=im?.alt||'WARDOGS Season 02';$('p',dlg).textContent=im?.alt||'';dlg.showModal();}));
   dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});dlg.addEventListener('close',()=>{$('img',dlg).removeAttribute('src')});
 }
})();
