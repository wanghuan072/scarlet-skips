# Scarlet Skips image plan

## Image roles

| Role | Purpose | Allowed source | Treatment |
| --- | --- | --- | --- |
| Brand hero | Establish the bright Scarlet Skips identity and leave room for HTML copy | Original editorial illustration | Wide crop, no embedded text or UI |
| Section hero | Communicate the page goal before the user reads | Original editorial illustration | One subject, one clear mechanic, page-specific composition |
| Gameplay evidence | Support a factual mechanic or card claim | Official Steam screenshot | Preserve the visible game state and describe limitations in the caption |
| Guide thumbnail | Preview the exact topic of an article | Official screenshot or achievement art | Use a different frame when the topic changes |
| UI icon | Identify an upgrade or tool | Project SVG icon system | Never replace with a generated raster icon |
| Decorative background | Add atmosphere behind cards without carrying factual meaning | Editorial illustration | Low contrast, cropped freely, decorative only |

## Editorial assets

| Asset | Primary use | Composition |
| --- | --- | --- |
| `home-hero-v2.webp` | Home hero and upgrade side promotion | Ultra-wide composition with Scarlet on the right and copy-safe sky on the left |
| `home-hero-mobile.webp` | Home hero below 768px | Portrait crop authored separately so the character remains complete on tall screens |
| `upgrades-hero.webp` | Upgrades index and upgrade-detail banner | Three symbolic upgrade cards with shallow-banner safe framing |
| `builds-hero.webp` | Builds index and Run Lab background | Scarlet comparing three build directions |
| `guides-hero.webp` | Guides index | Controlled beginner jump with a readable rope path |
| `high-score-hero.webp` | High-score guide | Rocket Shoes and fire-rope pressure in one score-focused scene |
| `ending-hero.webp` | Ending guide | Rocket ascent toward the Moon with dark copy-safe space |

All editorial assets are original generated illustrations stored as optimized WebP files. They must not be captioned as official gameplay.

## Official screenshot mapping

| Screenshot | Correct use |
| --- | --- |
| `screenshot-1.jpg` | Baseline jumping and beginner context |
| `screenshot-2.jpg` | Ignite Jump Rope and visible fire multiplier |
| `screenshot-3.jpg` | Upgrade selection, Increase Luck, Add Jump Rope and Reinforce Jump Rope |
| `screenshot-4.jpg` | Standard active-rope state; acceptable neutral timing illustration |
| `screenshot-5.jpg` | Rocket Shoes / Rocket Fuel evidence and update 1.0.1 context |
| `screenshot-6.jpg` | Broken-rope failure state and troubleshooting content |
| `screenshot-7.jpg` | Miss/recovery or expressive failure context |

Do not use a static screenshot to claim a numeric speed, height, durability or probability value. Captions must say when the image only shows the state and cannot prove the formula.

## Responsive crop rules

- Desktop heroes keep the subject in the right half and copy in the left half.
- Mobile crops prioritize the face, hands and active mechanic; decorative scenery may be lost.
- Meaningful images use descriptive alt text. Decorative CSS backgrounds carry no content responsibility.
- `next/image` reserves the layout box and serves responsive optimized variants; non-critical images remain lazy-loaded.
