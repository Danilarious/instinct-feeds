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
