import fs from 'node:fs';import assert from 'node:assert/strict';
const d=JSON.parse(fs.readFileSync('feed.json','utf8'));const ids=new Set();
for(const e of d.entries){assert(!ids.has(e.id),'duplicate entry');ids.add(e.id);assert(d.projects.some(p=>p.id===e.project));assert(d.topics.some(t=>t.id===e.topic));assert(/^\d{4}-\d{2}-\d{2}$/.test(e.date));assert(e.sources.length);for(const s of e.sources)assert.equal(new URL(s.url).protocol,'https:');for(const f of ['title','summary','detail','status'])assert(e[f]);}
assert.equal(d.timeline.length,3);console.log('Feed schema, identifiers, source URLs and project/topic references pass.');
