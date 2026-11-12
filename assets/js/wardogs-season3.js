/* FirstPersonSaga WARDOGS S03 — progressive enhancement / no external dependency */
(()=>{'use strict';
  const $$=(s,p=document)=>[...p.querySelectorAll(s)],$=(s,p=document)=>p.querySelector(s);
  const sections=$$('.s3-section'),links=$$('#s3-toc a');
  const menu=$('#s3-menu'),aside=$('.s3-aside'),search=$('#s3-search'),clear=$('#s3-clear'),results=$('#s3-results'),read=$('#s3-read'),sectionName=$('#s3-section-name');
  const norm=(s)=>s.toLocaleLowerCase('tr-TR').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/ı/g,'i');
  if(menu&&aside){menu.addEventListener('click',()=>{const open=aside.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Bölümleri Kapat ⌃':'Bölümler ⌄';});}
  links.forEach(a=>a.addEventListener('click',()=>{if(window.matchMedia('(max-width:840px)').matches){aside?.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='Bölümler ⌄';}}));
  if('IntersectionObserver' in window){const ob=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(!visible.length)return;const id=visible[0].target.id;links.forEach(l=>{l.classList.toggle('active',l.dataset.id===id);if(l.dataset.id===id)l.setAttribute('aria-current','location');else l.removeAttribute('aria-current');});if(sectionName)sectionName.textContent=visible[0].target.dataset.heading||'PATCH NOTES';},{rootMargin:'-8% 0px -68% 0px',threshold:0});sections.forEach(s=>ob.observe(s));}
  function filter(){const q=norm(search?.value.trim()||'');let found=0;sections.forEach(sec=>{const match=!q||norm(sec.textContent).includes(q);sec.classList.toggle('s3-filtered',!match);if(match&&q)found++;});if(clear)clear.hidden=!q;if(results){results.hidden=!q;results.textContent=q?(found?`${found} bölümde eşleşme bulundu. Eşleşen bölümler görüntüleniyor.`:'Eşleşen bölüm bulunamadı. Aramayı değiştirebilirsin.'):'';}}
  search?.addEventListener('input',filter);clear?.addEventListener('click',()=>{search.value='';filter();search.focus();});
  function setRead(on){document.body.classList.toggle('s3-reading',on);read?.setAttribute('aria-pressed',String(on));if(read)read.innerHTML=on?'◩ <span>Normal Görünüm</span>':'◧ <span>Okuma Modu</span>';}
  read?.addEventListener('click',()=>setRead(!document.body.classList.contains('s3-reading')));
  // Keyboard reading helpers: J/K navigate chapters, ESC exits reading mode; ignore when typing.
  document.addEventListener('keydown',e=>{if(e.ctrlKey||e.metaKey||e.altKey||['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;
    if(e.key==='Escape' && document.body.classList.contains('s3-reading')){setRead(false);return;}
    if(!['j','k'].includes(e.key.toLowerCase()))return;
    const visible=sections.filter(s=>!s.classList.contains('s3-filtered'));if(!visible.length)return;
    const cursor=window.scrollY+120;let i=visible.findIndex(s=>s.offsetTop>=cursor);if(i<0)i=visible.length-1;
    if(e.key.toLowerCase()==='k')i=Math.max(0,i-1);else if(visible[i]?.offsetTop<cursor+40)i=Math.min(visible.length-1,i+1);
    visible[i]?.scrollIntoView({behavior:'smooth',block:'start'});});
  const dlg=$('#s3-lightbox');if(dlg&&typeof dlg.showModal==='function'){$$('a[data-zoom]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const im=$('img',dlg);im.src=a.href;im.alt=$('img',a)?.alt||'WARDOGS Season 03';dlg.showModal();}));dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});dlg.addEventListener('close',()=>{$('img',dlg)?.removeAttribute('src')});}
})();
