import fs from 'node:fs';import assert from 'node:assert/strict';
const d=JSON.parse(fs.readFileSync('feed.json','utf8'));const ids=new Set();
for(const e of d.entries){assert(!ids.has(e.id),'duplicate entry');ids.add(e.id);assert(d.projects.some(p=>p.id===e.project));assert(d.topics.some(t=>t.id===e.topic));assert(/^\d{4}-\d{2}-\d{2}$/.test(e.date));assert(e.sources.length);for(const s of e.sources)assert.equal(new URL(s.url).protocol,'https:');for(const f of ['title','summary','detail','status'])assert(e[f]);}
assert.equal(d.timeline.length,3);console.log('Feed schema, identifiers, source URLs and project/topic references pass.');
const c=JSON.parse(fs.readFileSync('creators.json','utf8'));
assert(c.entries.length>=7);assert(c.repos.length>=7);assert(c.voices.length>=8);
for(const e of c.entries){assert(!ids.has(e.id));ids.add(e.id);assert(/^\d{4}-\d{2}-\d{2}$/.test(e.date));assert(e.kind&&e.lens&&e.summary&&e.detail);for(const s of e.sources)assert.equal(new URL(s.url).protocol,'https:');}
for(const r of c.repos){assert(r.stars>1000);assert(r.pushed>='2026-10-01');assert(r.caveat&&r.license);assert.equal(new URL(r.url).hostname,'github.com');}
console.log('Creator notes, active repositories and source records pass.');

const m=JSON.parse(fs.readFileSync('multi-agent.json','utf8'));
assert(/^\d{4}-\d{2}-\d{2}$/.test(m.updated));assert(Array.isArray(m.entries));
for(const e of m.entries){assert(!ids.has(e.id),'duplicate chapter id');ids.add(e.id);assert(/^\d{4}-\d{2}-\d{2}$/.test(e.date));for(const f of ['type','status','title','summary','detail'])assert(e[f]);assert(e.sources.length);for(const s of e.sources)assert.equal(new URL(s.url).protocol,'https:');}
for(const page of ['index.html','creators.html','multi-agent.html','agent-town.html']){const h=fs.readFileSync(page,'utf8');assert(h.includes('multi-agent.html'));assert(h.includes('creators.html'));assert(h.includes('index.html'));}
assert(fs.readFileSync('agent-town.html','utf8').includes('10. Open questions and gaps'));
console.log('Multi-agent archive schema, chapter navigation and research page pass.');

for(const chapter of [c,m]){assert(Array.isArray(chapter.repoPicks));for(const r of chapter.repoPicks){assert(!ids.has(r.id),'duplicate repo-pick id');ids.add(r.id);for(const f of ['name','summary','why','url'])assert(r[f]);for(const f of ['date','checked'])assert(/^\d{4}-\d{2}-\d{2}$/.test(r[f]));assert(Number.isInteger(r.stars)&&r.stars>=0);assert.equal(new URL(r.url).hostname,'github.com');assert.equal(new URL(r.url).protocol,'https:');}}
for(const page of ['creators.html','multi-agent.html']){const h=fs.readFileSync(page,'utf8');assert(h.includes('id="open-source"'));assert(h.includes('repo-archive.js'));assert(h.includes('repo-archive.css'));}
console.log('Dated repo-pick archives and section hooks pass.');

const indexNavHtml = fs.readFileSync('blockchain.html', 'utf8');
assert.equal((indexNavHtml.match(/aria-label="Chapters"/g) || []).length, 1);
assert.match(indexNavHtml, /<main class="page">\s*<nav class="chapter-links" aria-label="Chapters">/);
assert.match(indexNavHtml, /\.chapter-links a\{[^}]*border:1px solid/);
assert.match(indexNavHtml, /<a href="blockchain.html" aria-current="page">01 \/ Blockchain &amp; Crypto<\/a>/);
assert.match(indexNavHtml, /<a href="index.html" aria-label="Instinct Feeds home">/);
console.log('Chapter 01 top navigation placement and button styling pass.');

const tocHtml = fs.readFileSync('index.html', 'utf8');
for (const term of ['aria-label="Site contents"','<details','location.replace("blockchain.html#"','info.sig','data-lane="blockchain"','data-lane="creators"','data-lane="multi-agent"','data-lane="agentic"','data-lane="guitar"','blockchain.html#agentic','menu-data.js','localStorage','acquisition-scout-docs-daily-driver.netlify.app','bxby-2-search.netlify.app','danilarious-ordinals-field-guide.netlify.app','SITE IN BUILD','if-toc-seen']) assert(tocHtml.includes(term), 'TOC index missing: ' + term);
assert(!tocHtml.includes('href="index.html" aria-current="page">01 / Blockchain'));
for (const lanePage of ['creators.html','multi-agent.html','agent-town.html','graph-engineering.html']) { const h = fs.readFileSync(lanePage, 'utf8'); assert(h.includes('href="blockchain.html">01 / Blockchain'), lanePage + ' chapter-01 link'); }
assert(fs.readFileSync('build.mjs','utf8').includes('createHash'), 'lane sig must be a content hash');
console.log('Landing table-of-contents structure, lanes and chapter-01 relinks pass.');

const methodPage=fs.readFileSync('graph-engineering.html','utf8');
assert(fs.readFileSync('multi-agent.html','utf8').includes('id="methods"'));
assert(fs.readFileSync('multi-agent.html','utf8').includes('href="graph-engineering.html"'));
for(const term of ['Count expected results','Read next','Use it when / skip it when'])assert(methodPage.includes(term));
assert(!methodPage.includes('EDITORIAL PREVIEW'));
console.log('Methods catalog links and guide sections pass.');

const a=JSON.parse(fs.readFileSync('agentic-trading.json','utf8'));
assert(/^\d{4}-\d{2}-\d{2}$/.test(a.updated));assert(Array.isArray(a.entries)&&a.entries.length);assert(Array.isArray(a.stack)&&a.stack.length);assert(Array.isArray(a.repoPicks));
for(const e of a.entries){assert(!ids.has(e.id),'duplicate agentic id');ids.add(e.id);assert(/^\d{4}-\d{2}-\d{2}$/.test(e.date));for(const f of ['type','status','title','summary','detail'])assert(e[f]);assert(e.sources.length);for(const s of e.sources)assert.equal(new URL(s.url).protocol,'https:');}
for(const s of a.stack){for(const f of ['id','name','role','note','latest','latestDate','url'])assert(s[f],'stack field');assert(/^\d{4}-\d{2}-\d{2}$/.test(s.checked));assert(Number.isInteger(s.stars)&&s.stars>=0);assert.equal(new URL(s.url).protocol,'https:');}
for(const r of a.repoPicks){assert(!ids.has(r.id),'duplicate agentic repo-pick id');ids.add(r.id);for(const f of ['name','summary','why','url','label'])assert(r[f]);for(const f of ['date','checked'])assert(/^\d{4}-\d{2}-\d{2}$/.test(r[f]));assert(Number.isInteger(r.stars)&&r.stars>=0);assert.equal(new URL(r.url).hostname,'github.com');assert.equal(new URL(r.url).protocol,'https:');}
const indexAgenticHtml=fs.readFileSync('blockchain.html','utf8');
assert(indexAgenticHtml.includes('data-view="agentic"'));assert(indexAgenticHtml.includes('id="agentic-view"'));assert(indexAgenticHtml.includes('data/agentic-trading.json'));assert(indexAgenticHtml.includes('repo-archive.js'));assert(indexAgenticHtml.includes('repo-archive.css'));
const appJs=fs.readFileSync('app.js','utf8');
assert(appJs.includes("'agentic'"));assert(appJs.includes('data/agentic-trading.json'));
console.log('Agentic trading lane schema, stack snapshots, repo picks and chapter 01 hooks pass.');
