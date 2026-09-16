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
5. Keep guide and upgrade `updatedDate` values in ISO `YYYY-MM-DD` format; their sitemap and Article dates come from content. Undated pages omit `lastModified`.
6. Run `npm run validate:data`, `npm run lint`, `npm test`, and `npm run build`.

## Adding documented cards

The Steam listing says 10 upgrade cards. The shipping table currently supplies 16 named rows: 13 regular offers and three special rows. These are different counts; do not present table rows as 16 ordinary offer cards. Add a row only when the in-game name and provenance can be checked, and keep its `sourceIds` current.

## Interactive recommendations

The Run Lab uses transparent goal weights from each upgrade entry. These are editorial guidance, not hidden game statistics. The hang and score model is illustrative. When changing weights or simulation rules, update the displayed reasoning and tests for Moon, score, and spectacle goals.
