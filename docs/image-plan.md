# Scarlet Skips image plan

Live pages use official Steam media and captured base-game states. Generated editorial illustrations may remain in the asset archive, but they are not used by page content or metadata.

| Asset | Verified use | Important limitation |
| --- | --- | --- |
| `steam-header.jpg` | Compact Steam header / OG fallback | Promotional art, not gameplay evidence |
| `steam-header-2x.jpg` | Updates listing hero; higher-res Steam key art | Promotional identity, not patch-note evidence |
| `trailer-art.jpg` | Game Info hero; official reveal-trailer thumbnail | Promotional, not a gameplay still or hardware proof |
| `screenshot-1.jpg` | Baseline jumping; Builds hero; Jump Height / beginner context | Does not prove a numeric jump-height value |
| `screenshot-2.jpg` | Fire-rope state; High Score hero | Does not prove the fire formula or Extinguish targeting |
| `screenshot-3.jpg` | Upgrade choice screen; Upgrades listing hero | Shows one random draw, not tier order |
| `screenshot-4.jpg` | Standard active-rope state; Guides listing hero | A still cannot establish rope speed |
| `screenshot-5.jpg` | Rocket Shoes state; Ending hero | Does not prove fuel duration, refill, or the Moon sequence |
| `screenshot-6.jpg` | Broken-rope state; update detail and Reinforce | Does not establish exact durability |
| `screenshot-7.jpg` | Miss / tangled-rope state; Mods hero and How to Play | Does not establish the failure rule by itself |
| `upgrade-cards/*.png` | Pause-screen card art from shipping `UpgradeCards` textures, recolored from official screenshot-3 (Luck / Reinforce / Add Rope palettes) | Identification only. Hang/score numbers are not in the art. Cooked DXT5 stores the drawing in alpha; RGB is dummy. |

Inner-page heroes stay unique across the main nav:

| Page | Hero asset | Why it fits |
| --- | --- | --- |
| `/upgrades` | `screenshot-3.jpg` | Three-card level-up screen |
| `/guides` | `screenshot-4.jpg` | Readable active rope / timing |
| `/builds` | `screenshot-1.jpg` | Baseline skip the simulator is modeled on |
| `/guides/high-score` | `screenshot-2.jpg` | Fire multiplier used late for score |
| `/ending` | `screenshot-5.jpg` | Rocket Shoes / height climb |
| `/mods` | `screenshot-7.jpg` | Base-game miss; not a Nexus thumbnail |
| `/game-info` | `trailer-art.jpg` | Official trailer art for a buy/info page |
| `/character` | `screenshot-1.jpg` | Clearest full-body look at Scarlet; also used on Builds |
| `/updates` | `steam-header-2x.jpg` | Store identity for the shipped product |
| `/updates/[slug]` | `screenshot-6.jpg` | Broken-rope still beside the actual patch list |

Rules:

- Keep screenshots uncropped enough that the relevant game state remains readable.
- Captions must say what the frame proves and what it cannot prove.
- Do not reuse third-party mod thumbnails or author files. The Mods page links to original listings.
- Meaningful images use descriptive alt text. Decorative backgrounds carry no factual claim.
- Do not turn a screenshot into evidence for numeric speed, height, durability, probability or score formulas.
