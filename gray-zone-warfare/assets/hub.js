(()=>{const KEY='fps:gzw05:locale';let lang=localStorage.getItem(KEY)==='tr'?'tr':'en';const copy={
'hub-tagline':['YOUR NEXT OPERATION STARTS HERE','SONRAKİ OPERASYONUN BURADA BAŞLIYOR'],
'hub-lead':['Plan your Hideout, track every material, and get straight to the changes that matter. A compact field companion built for Rogue Ops.','Hideout planını oluştur, tüm malzemelerini takip et, güncellemenin önemli değişikliklerine hemen ulaş. Rogue Ops için sade bir saha yardımcısı.'],
'hub-open':['Open Hideout Planner','Hideout Planner’ı aç'],
'hub-patch':['Explore Rogue Ops 0.5','Rogue Ops 0.5’i incele'],
'hub-choose':['Choose your intel.','İhtiyacın olan aracı seç.'],
'hub-hidemsg':['Build requirements, trader ranks, stock tracking, shopping lists, production reference and local save slots.','İnşa gereksinimleri, trader seviyeleri, malzeme stoğu, alışveriş listeleri, üretim rehberi ve tarayıcı kayıtları.'],
'hub-patchmsg':['The important gameplay changes — explained clearly, grouped by topic, with direct official sources.','Önemli oynanış değişiklikleri: konu konu, net açıklamalar ve resmî kaynak bağlantıları.'],
'hub-openlink':['Open planner ↗','Planlayıcıyı aç ↗'],
'hub-readlink':['Read field report ↗','Saha raporunu oku ↗']
};const draw=()=>{document.documentElement.lang=lang;for(const [id,values]of Object.entries(copy)){const e=document.getElementById(id);if(e)e.textContent=values[lang==='tr'?1:0]}document.getElementById('hub-lang').textContent=lang==='tr'?'EN / TR':'TR / EN'};document.getElementById('hub-lang').addEventListener('click',()=>{lang=lang==='tr'?'en':'tr';localStorage.setItem(KEY,lang);draw()});draw()})();