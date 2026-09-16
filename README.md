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
