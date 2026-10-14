# FirstPersonSaga — WARDOGS Season 02 entegrasyonu

Durum: Yerel projeye uygulandı; **canlı Vercel dağıtımı yapılmadı.**
Tarih: 15 Ekim 2026.

## Eklenen URL'ler

- `/wardogs/` — WARDOGS oyun merkezi
- `/wardogs/season-2/` — Season 02 Türkçe Patch Notes / karşılaştırma rehberi

Var olan `/`, `/tarkov/`, `/tarkov/guides/`, `/tarkov/keys/`, `/tarkov/guides/lightkeeper-kord-breach` yollarının yapısı ve `vercel.json` değişmedi.

## Değiştirilen ve eklenen dosyalar

```text
index.html                                      (güncellendi — nav, WARDOGS kartı ve link)
README.md                                       (güncellendi)
WARDOGS_SEASON02_DEPLOY.md                     (yeni)
wardogs/index.html                             (yeni)
wardogs/season-2/index.html                    (yeni)
assets/css/wardogs-season2.css                 (yeni)
assets/js/wardogs-season2.js                   (yeni)
assets/images/wardogs/season-02/*.webp         (19 yeni görsel)
```

## İçerik ve teknik notlar

- İlk kaynak: Kullanıcının sağladığı Season 02 yayın rehberi v1.1 (kaynağı resmî Steam duyurusu / kullanıcı HTML export'u).
- 15 sayfa bölümü (14 içerik + kaynak bölümü), 39 tablo, 151 Role Track tablo satırı, 82 Vendor Price tablo satırı.
- 19 ayrı `.webp` dosyası; görseller embedded/base64 değil, cachelenebilir statik dosyalar olarak sunulur.
- Kaynak oyun içi terimler, eski/yeni sayılar, karşılaştırma tabloları ve grafikler korunmuştur.
- Sunucu notları, çift monitör senkronizasyonu, presenter modu ve özel yayın araçları **kaldırılmıştır**.
- Responsive red/black marka stili, basit bölüm menüsü, tablo içi arama ve büyük görsel görünümü bulunmaktadır.
- Site bağımlılıkları değiştirilmedi; üçüncü taraf JS kütüphanesi kullanılmadı.

## Yerelde kontrol (Windows)

Repository kökünde PowerShell açıp:

```powershell
py -m http.server 8000
```

Tarayıcıda aç:

- `http://localhost:8000/`
- `http://localhost:8000/wardogs/`
- `http://localhost:8000/wardogs/season-2/`

Sayfa varlık yolları root-relative olduğundan `wardogs/season-2/index.html` dosyasını `file://` ile doğrudan açmak yerine HTTP sunucusu kullan.

## Repoya entegrasyon

1. **Güncellenen dosyalar** ZIP'ini mevcut `firstpersonsaga-web` repository köküne çıkar; aynı adla bulunan `index.html` ve `README.md` için dosyaları değiştir.
2. Değişiklikleri yerelde test et.
3. Git üzerinden commit & push yap; mevcut GitHub → Vercel otomatik dağıtımını kullan.

Örnek:

```bash
git add index.html README.md WARDOGS_SEASON02_DEPLOY.md wardogs/ assets/css/wardogs-season2.css assets/js/wardogs-season2.js assets/images/wardogs/
git commit -m "feat(wardogs): add Season 02 guide and hub"
git push origin main
```

Alternatif: **Tam proje** ZIP'ini yeni bir klasöre açıp oradaki siteyi test edebilirsin. Bu ZIP'te `.git` yoktur; mevcut repository'nin üzerine Git geçmişini ezmek için değil, teslim/kontrol amaçlıdır.

## Doğrulama

- Chromium üzerinden 1440×900 ve 390×844 responsive ekran görüntüleri kontrol edildi.
- JavaScript console hatası yok; mobil/desktop yatay overflow yok.
- `SPH-2` tablolarda arama, temizleme, gallery lightbox, mobil içindekiler menüsü çalışıyor.
- `node --check` JavaScript dosyasını doğruladı.
- Site-relative yeni varlık URL'leri kontrol edildi; tespit edilen eski `lightkeeper-kord-breach` bağlantıları mevcut `vercel.json` rewrite'iyle çözülüyor.

Bu işlem **canlı URL üzerinde kontrol/deploy edildiği anlamına gelmez**. Dağıtımdan sonra canlı yönlendirmelerin kontrol edilmesi gerekir.
