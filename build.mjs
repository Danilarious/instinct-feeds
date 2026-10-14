import fs from 'node:fs';
const d=JSON.parse(fs.readFileSync('feed.json','utf8'));
const c=JSON.parse(fs.readFileSync('creators.json','utf8'));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist/data',{recursive:true});
for(const f of ['index.html','style.css','app.js','creators.html','creators.json'])fs.copyFileSync(f,'dist/'+f);
fs.copyFileSync('feed.json','dist/data/feed.json');fs.writeFileSync('dist/feed-data.js','window.FEED_DATA='+JSON.stringify(d)+';');
fs.writeFileSync('dist/rss.xml',`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Instinct Feeds | Danilarious</title><link>https://github.com/Danilarious/instinct-feeds</link><description>Source-linked blockchain, crypto and creator technology notes.</description><lastBuildDate>${new Date(d.updated+'T12:00:00Z').toUTCString()}</lastBuildDate>${[...d.entries,...c.entries.map(e=>({...e,status:e.kind,project:e.lens}))].map(e=>`<item><title>${esc(e.title)}</title><guid isPermaLink="false">instinct-feeds:${e.id}</guid><link>${esc(e.sources[0].url)}</link><pubDate>${new Date(e.date+'T12:00:00Z').toUTCString()}</pubDate><category>${esc(e.project)}</category><description>${esc(e.status+'. '+e.summary+' '+e.detail+' Sources: '+e.sources.map(s=>s.url).join(' | '))}</description></item>`).join('')}</channel></rss>`);
console.log(`Built ${d.entries.length} notes, ${d.projects.length} projects, ${d.timeline.length} dates.`);
