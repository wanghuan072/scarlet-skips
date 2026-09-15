# Data maintenance

## Evidence labels

- `Official`: directly stated or visibly confirmed by Yerk Games / the Steam store.
- `Community Verified`: an observable behavior or name supported by multiple visible sources.
- `Player Report`: a route, interaction, score or unlock method reported by an identified player source.
- `Unconfirmed`: useful context without enough evidence for a stronger label.

Do not promote a claim merely because it is repeated. Prefer official notes, reproducible in-game evidence and stable source URLs.

## Updating a patch

1. Add the primary announcement to `src/data/sources.json` with the check date.
2. Add the release to `src/data/updates/updates.json` without expanding terse patch notes into unsupported specifics.
3. Re-test affected upgrade and build entries, then update `verifiedVersion`, `updatedDate`, and source IDs.
4. Update `src/data/game.json` only when the current version is officially confirmed.
5. Change the sitemap `lastModified` date for a content release.
6. Run `npm run lint` and `npm run build`.

## Adding documented cards

Yerk Games states that Scarlet Skips contains 10 upgrade cards. This site currently names only the eight cards supported by official screenshots, recorded gameplay and sourced player material. Add another entry to `src/data/upgrades/upgrades.json` only when its exact in-game name and effect are visible. Never create placeholder names to reach the official count.

## Interactive recommendations

The Build Planner uses transparent goal weights from each upgrade entry. These weights are editorial guidance, not hidden game statistics. When changing them, update the displayed reasoning and verify that beginner, ending and high-score goals still produce coherent results.
