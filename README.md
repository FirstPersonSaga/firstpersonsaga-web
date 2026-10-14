# FirstPersonSaga Web

FirstPersonSaga'nın web platformu için statik site repository'si.

## Amaç

Bu repository başlangıçta:

- FirstPersonSaga ana sayfasını,
- Escape from Tarkov oyun hub'ını,
- Tarkov guide index'ini,
- Lightkeeper + KORD BREACH Runbook route'unu

barındırır.

İleride yeni oyunlar, rehberler ve interaktif araçlar aynı yapı altında eklenebilir.

## Dizin yapısı

```text
firstpersonsaga-web/
├── index.html
├── 404.html
├── vercel.json
├── assets/
│   ├── css/
│   │   └── site.css
│   └── images/
│       └── favicon.svg
└── tarkov/
    ├── index.html
    └── guides/
        ├── index.html
        └── kord-breach/
            ├── README.md
            └── runbook.html   <-- bu dosyayı sen ekleyeceksin
```

## KORD BREACH Runbook

Kendi `runbook.html` dosyanı şuraya koy:

```text
tarkov/guides/lightkeeper-kord-breach/runbook.html
```

`vercel.json` clean route tanımlar:

```text
/tarkov/guides/lightkeeper-kord-breach
```

→

```text
/tarkov/guides/lightkeeper-kord-breach/runbook.html
```

## Local test

Statik HTML olduğu için dosyaları doğrudan tarayıcıda açabilirsin.

Routing'i Vercel'e yakın biçimde test etmek istersen Vercel CLI kullanılabilir, ancak ilk deploy için zorunlu değildir.

## Deployment

Repository GitHub'a push edildikten sonra Vercel'de repo import edilir.

Framework preset:

```text
Other
```

Build command, install command ve output directory gerekmiyor.

## Marka bağlantıları

- Twitch: https://www.twitch.tv/firstpersonsaga
- YouTube: https://www.youtube.com/@FirstPersonSaga
- Kick: https://kick.com/firstpersonsaga
- Discord: https://discord.gg/invite/XKsRKC3hSW
- Instagram: https://www.instagram.com/firstpersonsaga/
- X: https://x.com/FirstPersonSaga
- TikTok: https://www.tiktok.com/@firstpersonsaga


## WARDOGS Season 02 (2026-10-15)

Yeni statik içerik: `/wardogs/season-2/` (oyun hub: `/wardogs/`).

- `wardogs/season-2/index.html`: Türkçe patch notları, tam Role Track / Vendor Price tabloları, grafikler, kaynak bağlantısı.
- `assets/css/wardogs-season2.css`: Mevcut `site.css` tasarım dilinde ve responsive.
- `assets/js/wardogs-season2.js`: İçindekiler, tablo içi arama ve görsel büyütme.
- `assets/images/wardogs/season-02/*.webp`: Yayın rehberinden ayrıştırılmış yerel, önbelleklenebilir görseller.
- `wardogs/index.html`: WARDOGS oyun merkezi.

Herhangi bir framework, paket yöneticisi, build komutu veya harici JavaScript kütüphanesi gerekmez. `vercel.json` mevcut biçimde kalır. Tüm bağlantıları ve browser davranışını yerel HTTP sunucuda doğrulamak için örnek: `python -m http.server 8000`.

### İçerik notu

Sayfa, kullanıcının sağladığı Season 02 yayın rehberinin içerik ve tablolarını korur. Yayın/sunucu kontrolleri, çift pencere ve sunucuya özel anlatım paneli kaldırılmıştır. Kullanıcıya yönelik bölüm özetleri ve FirstPersonSaga analizleri ayrılmıştır. Kaynak: Steam Patch Notes duyurusu (14 Ekim 2026).
