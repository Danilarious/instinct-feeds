(()=>{

for(const section of document.querySelectorAll('[data-repo-archive]')){
 const field=s=>section.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let picks=[];
 function render(){const q=field('input').value.toLowerCase().trim();const rows=picks.filter(r=>!q||JSON.stringify(r).toLowerCase().includes(q)).sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));const groups=new Map();for(const r of rows){if(!groups.has(r.date))groups.set(r.date,[]);groups.get(r.date).push(r)}
 field('.repo-archive-count').textContent=rows.length+' repo picks / '+groups.size+' dated editions';
 field('.repo-archive-list').innerHTML=[...groups].map(([date,rs])=>`<section class="repo-week"><h3>Edition / <time datetime="${esc(date)}">${esc(date)}</time></h3><div class="repo-pick-grid">${rs.map(r=>`<article class="repo-pick"><p class="eyebrow">${esc(r.label||'Notable repository / editorial pick')}</p><h4><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.name)} ↗</a></h4><p class="repo-stars">${Number(r.stars).toLocaleString()} stars / checked <time datetime="${esc(r.checked)}">${esc(r.checked)}</time></p><p>${esc(r.summary)}</p><p class="repo-why"><strong>Why it matters</strong><br>${esc(r.why)}</p>${r.caveat?`<details><summary>License &amp; use notes</summary><p>${esc(r.caveat)}</p></details>`:''}<a class="repo-pick-url" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.url)} ↗</a></article>`).join('')}</div></section>`).join('');const empty=field('.repo-archive-empty');empty.hidden=!!rows.length;empty.textContent=picks.length?'No matching repo picks. Try another search or reset the filter.':'No weekly repo picks published yet. This dated archive is ready for the first edition.';}
 field('input').addEventListener('input',render);field('button').addEventListener('click',()=>{field('input').value='';render()});
 fetch(section.dataset.repoArchive).then(r=>{if(!r.ok)throw Error('Archive unavailable');return r.json()}).then(d=>{picks=d.repoPicks||[];render()}).catch(()=>{field('.repo-archive-count').textContent='Repository archive unavailable';field('.repo-archive-empty').textContent='Could not load the repo picks. Reload or open the chapter archive below.'});
}

})();
