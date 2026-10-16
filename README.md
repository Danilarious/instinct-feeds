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

## Chapter 03: Multi-Agent Systems

`multi-agent.html` is the broad chapter landing page. `agent-town.html` is the full reading edition of the October 15, 2026 consolidated Agent Town research report. The report is a dated archive: keep its verification labels, cost assumptions and conflict notes. Its recommendations are not claims that a project has been built. It includes project-specific context at the owner's request.

`multi-agent.json` is the weekly update archive. It starts with no weekly entries, rather than presenting the report's older references as fresh news. Append source-linked records to `entries`; keep stable IDs and history. Each record has `id`, `date` (source publication date), `type` (News, Paper, Repository, Release, Video or Research), `status`, `title`, `summary`, `detail`, and `sources` (`label` plus HTTPS `url`). Set `updated` to the check date. Keep vendor claims, tested results and commentary distinct. Unknown dates are not invented; put undated references into the research archive instead of chronological news. Repository metrics remain dated snapshots, not a trend ranking. Date-sorted updates render automatically and join the combined RSS on build.

Run `npm test && npm run build`, inspect desktop and phone, commit main, then verify the Netlify deployment. Preserve the three chapter links on every page. The hub is static; editorial collection and publication run outside the page. No connected-agent telemetry, private transcripts or live controls are exposed here.
