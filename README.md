# Instinct Feeds

A source-linked news and research hub, starting with **Blockchain & Crypto**. Bitcoin hosts the existing Ordinals field guide; Zcash, Cardano/Midnight and wider ecosystem coverage have their own project filters.

## Build

Node 22, no dependencies required.

```sh
npm test
npm run build
```

Netlify builds `dist/` from `main`. Its deployment settings are in `netlify.toml`.

## Updating the feed

Edit `feed.json`, run the tests/build, visually check phone and desktop layouts, then commit and push. The build generates the browser data bundle and RSS from the same record. Keep old entries to preserve the archive. Use stable entry IDs; revise a factual correction in place with a clear explanation, or add a follow-up when the state changes.

Every entry has a topic, project, event date, type, status, summary, context and source links. Distinguish official records, reported news, research, targets and unofficial projects. Do not promote a draft to live without a deployment source. Keep uncertainty next to the claim.

Add future subject areas to `topics`; add projects to `projects`. The initial UI is one chapter, rather than empty placeholder categories. Future chapters can use the same entry schema.

The hub is a curated snapshot. It does not fetch news automatically, run trading tools, or expose account data. Ongoing feed updates need a content-editing workflow; RSS updates when new commits deploy. This first edition is checked 13 October 2026. No live price ticker is included because stale prices should not masquerade as current data.

## Views

- Feed: project, evidence and text filters; expandable caveats.
- Projects: stable project homes and the Bitcoin/Ordinals link.
- Timeline: published dates versus planned targets.
- Resources: deeper project references, JSON archive and RSS.

Direct links: `#feed`, `#projects`, `#timeline`, `#resources`.

## Chapter 02: AI & The Creator Economy

`creators.html` is the chapter's page, linked from the original hub. `creators.json` holds its notes, repository snapshots, video features and source directory. This keeps the chapter-01 feed and project filters unchanged. The build includes both chapters' dated notes in RSS. Undated videos stay outside chronological RSS rather than inventing dates.

For creator updates, preserve stable IDs and archive older entries. Use the source publication date, not today's check date, for dated notes. Identify opinion, vendor claims, reporting and historical material. Repository star and push values come from GitHub metadata and must retain a checked date; they are not a live trend ranking. Software licenses do not establish model, dataset or output rights. Do not install integrations or connect studio assets as part of editorial updates. Run tests/build and inspect desktop and phone before publishing.

This first edition is a curated snapshot. The watchlist names editorial threads, not an automatic monitoring service.
