const data = window.FEED_DATA;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = s => new Date(s+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'});
const project = id => data.projects.find(p => p.id===id);
const external = (url,label) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
let activeProject='all';
function showView(view,updateHash=true){
 document.querySelectorAll('.view').forEach(el => el.hidden=el.id!==view+'-view');
 document.querySelectorAll('[data-view]').forEach(el => el.setAttribute('aria-pressed',el.dataset.view===view));
 if(updateHash)history.replaceState(null,'','#'+view);
}
function evidence(e){return ['Protocol','Policy'].includes(e.type)||e.status.includes('API verified')?'official':['Research','Reality check'].includes(e.type)?'research':'reported'}
function renderFilters(){ $('#filters').innerHTML=[{id:'all',name:'All projects'},...data.projects].map(p=>`<button data-project="${p.id}" aria-pressed="${activeProject===p.id}">${esc(p.name)}</button>`).join(''); }
function renderFeed(){
 const q=$('#search').value.trim().toLowerCase();const ev=$('#evidence').value;
 const notes=data.entries.filter(e=>(activeProject==='all'||e.project===activeProject)&&(ev==='all'||evidence(e)===ev)&&[e.title,e.summary,e.detail,e.type,project(e.project).name].join(' ').toLowerCase().includes(q)).sort((a,b)=>b.date.localeCompare(a.date));
 $('#result-count').textContent=`${notes.length} ${notes.length===1?'note':'notes'} / checked ${date(data.updated)}`;
 $('#empty').hidden=!!notes.length;
 $('#feed-list').innerHTML=notes.map(e=>`<article class="note" id="${e.id}" style="--accent:${project(e.project).color}"><div class="note-top"><span>${esc(project(e.project).name.toUpperCase())} / ${esc(e.type.toUpperCase())}</span><time datetime="${e.date}">${date(e.date)}</time></div><div class="note-body"><span class="status">${esc(e.status)}</span><h3>${esc(e.title)}</h3><p>${esc(e.summary)}</p><details><summary>Context & caveats</summary><p>${esc(e.detail)}</p></details></div><div class="note-links">${e.sources.map(s=>external(s.url,s.label)).join('')}</div></article>`).join('');
 renderFilters();
}
const guide='https://danilarious-ordinals-field-guide.netlify.app/';
$('#projects-list').innerHTML=data.projects.map(p=>`<article class="project-card" style="--accent:${p.color}"><span class="symbol">${esc(p.symbol)}</span><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><p class="muted">${data.entries.filter(e=>e.project===p.id).length} source-linked notes</p>${p.id==='bitcoin'?external(guide,'Ordinals field guide'):''}<p><button data-open-project="${p.id}">Read the ${esc(p.name)} feed →</button></p></article>`).join('');
$('#timeline-list').innerHTML=data.timeline.map(e=>`<article class="event"><time datetime="${e.date}">${date(e.date)}</time><div><span class="status">${esc(e.status.toUpperCase())}</span><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p>${external(e.url,'Source & current status')}</div></article>`).join('');
const resources=[{title:'Bitcoin & Ordinals',description:'The deeper art guide and the Bitcoin reference library.',links:[['Ordinals field guide',guide],['Bitcoin reference','https://bitcoin.org/'],['Ordinals protocol','https://ord.net/']]},{title:'Zcash protocol',description:'Read the actual proposals, then check their status.',links:[['NU7 deployment','https://zips.z.cash/zip-0259'],['Shielded assets: transfer & burn','https://zips.z.cash/zip-0226'],['Shielded assets: issuance','https://zips.z.cash/zip-0227'],['Tachyon roadmap','https://tachyon.z.cash/roadmap/']]},{title:'Cardano & Midnight',description:'Primary ecosystem resources and the new Japan market.',links:[['Cardano','https://cardano.org/'],['Midnight','https://midnight.network/'],['OKJ NIGHT-JPY instrument status','https://api.okj.com/api/v5/public/instruments?instType=SPOT&instId=NIGHT-JPY']]},{title:'Policy & the archive',description:'Published rules, structured feed data and a reader-friendly subscription.',links:[['CFTC advance notice',data.entries.find(e=>e.id==='cftc-comments').sources[0].url],['JSON feed archive','data/feed.json'],['RSS feed','rss.xml']]}];
$('#resources-list').innerHTML=resources.map(r=>`<article class="resource-card"><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p>${r.links.map(([label,url])=>external(url,label)).join('')}</article>`).join('');
document.addEventListener('click',e=>{const tab=e.target.closest('[data-view]');if(tab)showView(tab.dataset.view);const f=e.target.closest('[data-project]');if(f){activeProject=f.dataset.project;renderFeed()}const p=e.target.closest('[data-open-project]');if(p){activeProject=p.dataset.openProject;$('#search').value='';$('#evidence').value='all';showView('feed');renderFeed();$('.view-tabs').scrollIntoView({behavior:'smooth',block:'start'})}});
$('#search').addEventListener('input',renderFeed);$('#evidence').addEventListener('change',renderFeed);$('#reset').addEventListener('click',()=>{activeProject='all';$('#search').value='';$('#evidence').value='all';renderFeed()});
window.addEventListener('hashchange',()=>{const v=location.hash.slice(1);showView(['feed','projects','timeline','resources','agentic'].includes(v)?v:'feed',false)});

let atData=null,atRequested=false;
function renderAgentic(){
 if(!document.querySelector('#at-stack'))return;
 if(!atData){
  if(!atRequested){atRequested=true;fetch('data/agentic-trading.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(d=>{atData=d;renderAgentic()}).catch(()=>{document.querySelector('#at-count').textContent='Agentic trading archive unavailable';});}
  return;
 }
 const ACC='#A8D5BA';
 document.querySelector('#at-stack').innerHTML=atData.stack.map(t=>`<article class="at-tool" style="--accent:${ACC}"><span class="at-role">${esc(t.role.toUpperCase())}</span><h4><a href="${esc(t.url)}" target="_blank" rel="noopener noreferrer">${esc(t.name)} ↗</a></h4><p>${esc(t.note)}</p><p class="muted">${esc(t.latest)} · ${esc(t.latestDate)} · ${Number(t.stars).toLocaleString()} stars · checked ${date(t.checked)}</p></article>`).join('');
 const notes=[...atData.entries].sort((a,b)=>b.date.localeCompare(a.date));
 document.querySelector('#at-count').textContent=`${notes.length} ${notes.length===1?'note':'notes'} / edition checked ${date(atData.updated)}`;
 document.querySelector('#at-empty').hidden=!!notes.length;
 document.querySelector('#at-list').innerHTML=notes.map(e=>`<article class="note" id="${esc(e.id)}" style="--accent:${ACC}"><div class="note-top"><span>AGENTIC TRADING / ${esc(e.type.toUpperCase())}</span><time datetime="${e.date}">${date(e.date)}</time></div><div class="note-body"><span class="status">${esc(e.status)}</span><h3>${esc(e.title)}</h3><p>${esc(e.summary)}</p><details><summary>Context & caveats</summary><p>${esc(e.detail)}</p></details></div><div class="note-links">${e.sources.map(s=>external(s.url,s.label)).join('')}</div></article>`).join('');
}
renderAgentic();
renderFeed();showView(['feed','projects','timeline','resources','agentic'].includes(location.hash.slice(1))?location.hash.slice(1):'feed',false);
