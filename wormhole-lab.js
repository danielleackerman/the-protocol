/*
  Signal Mode Lab JS
  Isolated copy of production Utility JS for _experiments/signal-mode/ only.
  Do not use this file as production source of truth.
*/

(() => {
const KEY='the-protocol.bank.items.v12',MIG='the-protocol.bank.v12.migrated',THEME='the-protocol.theme';
const CATS=['Money','Body','Love','Work','Creative Output','Home','Visibility','Peace','Identity','Protection','Timing','Spiritual'];
const TYPE_ORDER=['runsequence','switch','default','command','law','peak','confirmation'];
const TYPE_LABEL={all:'All',runsequence:'Run Sequences',switch:'Switches',default:'Defaults',command:'Commands',law:'Laws',peak:'Peak States',confirmation:'Confirmations'};

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const id=()=>`${Date.now()}-${Math.random().toString(16).slice(2)}`;
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

function read(k,f=[]){try{const p=JSON.parse(localStorage.getItem(k));return Array.isArray(p)?p:f}catch{return f}}
function write(k,v){localStorage.setItem(k,JSON.stringify(v))}
function bank(){return read(KEY)}
function save(v){write(KEY,v)}
function addItem(i){let v=bank();v.unshift({id:id(),type:i.type,category:i.category||'Identity',title:i.title||'',text:i.text||'',meta:i.meta||{},createdAt:new Date().toISOString()});save(v)}
function del(itemId){save(bank().filter(i=>i.id!==itemId))}
function copyText(t){return navigator.clipboard?.writeText?navigator.clipboard.writeText(t):Promise.resolve()}

function label(t){return ({switch:'Switch',default:'Default',command:'Command',law:'Law',peak:'Peak',confirmation:'Receipt',runsequence:'Run Sequence'})[t]||t}
function text(i){
  if(i.type==='command')return i.text.toUpperCase().startsWith('EXECUTE:')?i.text:`EXECUTE: ${i.text}`;
  if(i.type==='peak'){let m=i.meta||{};return [i.title,m.body&&`Body: ${m.body}`,m.proof&&`Proof: ${m.proof}`,m.baseline&&`Baseline: ${m.baseline}`].filter(Boolean).join('\n')}
  return i.text||i.title;
}

function row(i){
  const isSeq = i.type==='runsequence';
  const cls = `ledger-item${isSeq?' ledger-item--runsequence':''}`;
  return `<article class="${cls}"><div class="ledger-item__meta"><span>${esc(label(i.type))}</span><span>${esc(i.category)}</span></div><div class="ledger-item__text">${esc(text(i)).replace(/\n/g,'<br>')}</div><div class="ledger-item__actions"><button data-copy-bank="${i.id}" type="button">Copy</button><button data-delete-bank="${i.id}" type="button">Delete</button></div></article>`;
}

function listInto(el,items,emptyMsg){if(el)el.innerHTML=items.length?items.map(row).join(''):`<p class="empty-state">${emptyMsg}</p>`}

function populateCats(){$$('[data-category-select]').forEach(s=>{s.innerHTML=CATS.map(c=>`<option>${c}</option>`).join('')})}

function add(type,catSel,textSel,titleSel,meta={}){
  let category=$(catSel)?.value||'Identity';
  let main=$(textSel)?.value?.trim();
  let title=titleSel?$(titleSel)?.value?.trim():'';
  if(!main&&!title)return;
  let m={};
  Object.entries(meta).forEach(([k,s])=>m[k]=$(s)?.value?.trim()||'');
  if(type==='command'&&main&&!main.toUpperCase().startsWith('EXECUTE:'))main=`EXECUTE: ${main}`;
  addItem({type,category,text:main||title,title,meta:m});
  [textSel,titleSel,...Object.values(meta)].filter(Boolean).forEach(s=>{let e=$(s);if(e)e.value=''});
  let st=$('#customStatus');
  if(st)st.textContent=`${label(type)} saved.`;
  renderBank();
}

/* -------------------------------------------------------------------- */
/* Bank — category-first with drilldown + sticky search                 */
/* -------------------------------------------------------------------- */

function getState(){
  // Hash router: #cat=Money, #cat=Money&type=runsequence, #q=text
  const h=(location.hash||'').replace(/^#/,'');
  const params=new URLSearchParams(h);
  const q=(params.get('q')||'').trim();
  if(q)return {mode:'search',q};
  const cat=params.get('cat')||'';
  if(cat&&CATS.includes(cat))return {mode:'drill',cat,type:params.get('type')||'all'};
  return {mode:'grid'};
}

function setState(next){
  const params=new URLSearchParams();
  if(next.mode==='drill'){params.set('cat',next.cat);if(next.type&&next.type!=='all')params.set('type',next.type);}
  else if(next.mode==='search'&&next.q)params.set('q',next.q);
  const h=params.toString();
  if(h)location.hash='#'+h; else if(location.hash)history.pushState('',document.title,location.pathname+location.search);
}

function showOnly(panelId){
  ['bank-grid-panel','bank-drill-panel','bank-search-results-panel'].forEach(p=>{
    const el=$('#'+p);if(!el)return;
    if(p===panelId)el.removeAttribute('hidden');else el.setAttribute('hidden','');
  });
}

function renderCategoryGrid(){
  const grid=$('#bankCategoryGrid');if(!grid)return;
  const items=bank();
  const counts={};CATS.forEach(c=>counts[c]=0);
  items.forEach(i=>{if(counts[i.category]!=null)counts[i.category]++});
  grid.innerHTML=CATS.map(c=>{
    const n=counts[c]||0;
    const empty=n===0?' bank-cat-card--empty':'';
    return `<a class="bank-cat-card${empty}" href="#cat=${encodeURIComponent(c)}"><span class="bank-cat-name">${esc(c)}</span><span class="bank-cat-count">${n} saved</span></a>`;
  }).join('');
}

function renderDrill(state){
  const titleEl=$('#bankDrillTitle');if(titleEl)titleEl.textContent=state.cat;
  const chipsEl=$('#bankTypeChips');
  const items=bank().filter(i=>i.category===state.cat);
  // Counts per type within this category
  const counts={all:items.length};TYPE_ORDER.forEach(t=>counts[t]=0);
  items.forEach(i=>{if(counts[i.type]!=null)counts[i.type]++});
  if(chipsEl){
    const order=['all',...TYPE_ORDER];
    chipsEl.innerHTML=order.map(t=>{
      const active=(state.type||'all')===t?' is-active':'';
      const n=counts[t]||0;
      return `<button type="button" class="bank-type-chip${active}" data-type-chip="${t}" aria-pressed="${active?'true':'false'}">${esc(TYPE_LABEL[t])} <span class="bank-type-chip__count">${n}</span></button>`;
    }).join('');
  }
  const filtered=(state.type&&state.type!=='all')?items.filter(i=>i.type===state.type):items;
  const listEl=$('#bankList');
  let emptyMsg;
  if(state.type&&state.type!=='all'){
    emptyMsg=`No ${TYPE_LABEL[state.type]} in ${esc(state.cat)} yet. Add one on Custom.`;
  }else{
    emptyMsg=`Nothing saved in ${esc(state.cat)} yet. Add an item on Custom.`;
  }
  listInto(listEl,filtered,emptyMsg);
}

function renderSearch(state){
  const heading=$('#bankSearchHeading');
  const listEl=$('#bankSearchList');
  const q=(state.q||'').toLowerCase();
  let items=bank();
  if(q)items=items.filter(i=>(`${i.type} ${i.category} ${i.title} ${i.text} ${JSON.stringify(i.meta||{})}`).toLowerCase().includes(q));
  if(heading)heading.textContent=`Results for “${state.q}” (${items.length})`;
  listInto(listEl,items,`Nothing matches “${esc(state.q)}”.`);
}

function renderBank(){
  if(!$('#bank-grid-panel'))return; // not on Bank page
  const state=getState();
  const prevMode=renderBank._lastMode;
  if(state.mode==='grid'){showOnly('bank-grid-panel');renderCategoryGrid();}
  else if(state.mode==='drill'){showOnly('bank-drill-panel');renderDrill(state);}
  else if(state.mode==='search'){showOnly('bank-search-results-panel');renderSearch(state);}
  // keep search input synced
  const s=$('#bankSearch');if(s){const desired=state.mode==='search'?state.q:'';if(s.value!==desired&&document.activeElement!==s)s.value=desired;}
  // Scroll feedback on mode change — when the user navigates between
  // bank views (grid → drill, drill → grid, * → search) the swapped
  // panel sits in the same DOM position the previous panel occupied,
  // so the user often can't tell anything changed. Bring the new
  // panel's header into view as the page's first visible content
  // below the sticky chrome.
  //
  // Implementation: scrollIntoView on the panel's heading element
  // (not the panel itself, because the panel may be `hidden` for a
  // fraction of a frame on first reveal). The sticky-header offset
  // is handled in CSS via `scroll-margin-top` on the .panel-kicker
  // / .bank-drill-head selectors — no JS math, no rAF gymnastics,
  // no stale getBoundingClientRect.
  //
  // Skipped when mode didn't change (refilters within drill via
  // type chips, hash-restore re-renders) so the viewport stays put
  // for in-mode updates.
  if(prevMode&&prevMode!==state.mode){
    let target=null;
    if(state.mode==='grid')target=$('#bank-grid-panel .panel-kicker')||$('#bank-grid-panel');
    else if(state.mode==='drill')target=$('#bank-drill-panel .bank-drill-head')||$('#bank-drill-panel');
    else if(state.mode==='search')target=$('#bank-search-results-panel .panel-kicker')||$('#bank-search-results-panel');
    if(target){
      // rAF gives the [hidden] toggle a frame to commit so the target
      // is actually laid out before we ask the browser to scroll to it.
      requestAnimationFrame(()=>{
        try{target.scrollIntoView({behavior:'smooth',block:'start'});}
        catch(e){target.scrollIntoView();}
      });
    }
  }
  renderBank._lastMode=state.mode;
}

function initBank(){
  if(!$('#bank-grid-panel'))return;
  // Search debounce
  let t=null;
  $('#bankSearch')?.addEventListener('input',e=>{
    clearTimeout(t);
    const q=e.target.value.trim();
    t=setTimeout(()=>{
      if(q)setState({mode:'search',q});
      else{
        // Clearing search returns to whatever cat we were in, or grid.
        const prev=getState();
        if(prev.mode==='search')setState({mode:'grid'});
      }
      renderBank();
    },120);
  });
  // Type chip clicks (event delegation)
  $('#bankTypeChips')?.addEventListener('click',e=>{
    const c=e.target.closest('[data-type-chip]');if(!c)return;
    const cur=getState();if(cur.mode!=='drill')return;
    setState({mode:'drill',cat:cur.cat,type:c.dataset.typeChip});
    renderBank();
  });
  // Back to grid
  $('#bankBackBtn')?.addEventListener('click',()=>{setState({mode:'grid'});renderBank();});
  // Hash changes (back button, manual edits)
  window.addEventListener('hashchange',renderBank);
  $('#exportBank')?.addEventListener('click',()=>copyText(JSON.stringify(bank(),null,2)));
  renderBank();
}

/* -------------------------------------------------------------------- */
/* Migration + chrome (theme + mobile menu) — unchanged behavior         */
/* -------------------------------------------------------------------- */

function migrate(){
  if(localStorage.getItem(MIG))return;
  let out=[];
  let grab=(key,type)=>read(key).forEach(i=>out.push({id:id(),type,category:i.group||i.category||'Identity',title:i.name||'',text:i.text||i.name||'',meta:{},createdAt:i.createdAt||new Date().toISOString()}));
  grab('the-protocol.custom.switches','switch');
  grab('the-protocol.custom.commands','command');
  grab('the-protocol.custom.laws','law');
  grab('the-protocol.custom.confirmations','confirmation');
  if(out.length)save([...out,...bank()]);
  localStorage.setItem(MIG,'true');
}

function chrome(){
  let t=localStorage.getItem(THEME);if(t)document.documentElement.dataset.theme=t;
  $$('[data-theme-toggle]').forEach(b=>b.onclick=()=>{let n=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=n;localStorage.setItem(THEME,n)});
  // Mobile menu — full-screen left-slide overlay. Covers the entire
  // viewport when open, slides in from the LEFT (translateX -100% → 0).
  // Keeps the .mobile-nav.is-open class and the toggle button's
  // aria-expanded attribute in sync. Closes on: any tap on the menu
  // surface (link or empty space), outside tap, Escape key.
  let nav=$('[data-mobile-nav]');
  let toggles=$$('[data-mobile-menu-toggle]');
  let setDrawer=open=>{
    if(!nav)return;
    nav.classList.toggle('is-open',open);
    toggles.forEach(b=>{
      b.setAttribute('aria-expanded',open?'true':'false');
      b.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
  };
  toggles.forEach(b=>b.onclick=()=>setDrawer(!nav?.classList.contains('is-open')));
  // Close when anywhere on the menu surface is tapped (link or empty space).
  nav?.addEventListener('click',()=>setDrawer(false));
  // Close when anywhere outside the menu / toggle is tapped while open.
  document.addEventListener('click',e=>{
    if(!nav?.classList.contains('is-open'))return;
    if(e.target.closest('[data-mobile-nav]'))return;
    if(e.target.closest('[data-mobile-menu-toggle]'))return;
    setDrawer(false);
  });
  // Close on Escape.
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('is-open'))setDrawer(false)});
}

document.addEventListener('click',async e=>{
  let templ=e.target.closest('[data-template-target]');
  if(templ){let input=document.getElementById(templ.dataset.templateTarget);if(input){input.value=templ.dataset.templateValue;input.focus()}}
  let c=e.target.closest('[data-copy-bank]');
  if(c){let i=bank().find(x=>x.id===c.dataset.copyBank);if(i)await copyText(text(i))}
  let d=e.target.closest('[data-delete-bank]');
  if(d){del(d.dataset.deleteBank);renderBank()}
});

document.addEventListener('DOMContentLoaded',()=>{
  chrome();
  populateCats();
  migrate();
  // Custom save handlers
  $('#addCustomRunSequence')?.addEventListener('click',()=>add('runsequence','#customRunSequenceCategory','#customRunSequenceText'));
  $('#addCustomSwitch')?.addEventListener('click',()=>add('switch','#customSwitchCategory',null,'#customSwitchName'));
  $('#addCustomDefault')?.addEventListener('click',()=>add('default','#customDefaultCategory','#customDefaultText'));
  $('#addCustomCommand')?.addEventListener('click',()=>add('command','#customCommandCategory','#customCommandText'));
  $('#addCustomLaw')?.addEventListener('click',()=>add('law','#customLawCategory','#customLawText'));
  $('#addCustomPeak')?.addEventListener('click',()=>add('peak','#customPeakCategory',null,'#customPeakTitle',{body:'#customPeakBody',proof:'#customPeakProof',baseline:'#customPeakBaseline'}));
  $('#addCustomConfirmation')?.addEventListener('click',()=>add('confirmation','#customConfirmationCategory','#customConfirmationText'));
  // Bank
  initBank();
});
})();
