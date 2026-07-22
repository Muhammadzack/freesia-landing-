/* ============ RENDER ============ */
var lang = (function(){ try { return localStorage.getItem("freesia_lang")==="en"?"en":"id"; } catch(e){ return "id"; } })();
var liveFailed = false;   /* agar pesan error tidak tertimpa saat ganti bahasa */

function tr(o){ return lang==="id" ? o.id : o.en; }

function renderFeatures(){
  document.getElementById("features-grid").innerHTML = FEATURES.map(function(f){
    return '<div class="lift bg-pure-white rounded-2xl p-6 border border-black/5">'+
      '<div class="text-3xl mb-3">'+f.ic+'</div>'+
      '<div class="font-bold mb-2">'+tr(f.t)+'</div>'+
      '<div class="text-text-secondary text-sm leading-relaxed">'+(lang==="id"?f.id:f.en)+'</div></div>';
  }).join("");
}
function renderTok(){
  document.getElementById("tok-list").innerHTML = TOK.map(function(u){
    return '<div class="flex gap-3"><div class="mt-0.5 w-5 h-5 rounded-full bg-soft-green/10 flex items-center justify-center shrink-0 text-soft-green text-xs">✓</div>'+
      '<div><div class="font-semibold text-[15px]">'+tr(u.t)+'</div><div class="text-text-secondary text-sm leading-relaxed">'+(lang==="id"?u.id:u.en)+'</div></div></div>';
  }).join("");
}
function renderRoadmap(){
  document.getElementById("roadmap-list").innerHTML = ROADMAP.map(function(r){
    var badge = r.active
      ? '<span class="text-[11px] font-mono px-2 py-0.5 rounded-pill bg-soft-green text-white">'+(lang==="id"?"Aktif":"Active")+'</span>'
      : '<span class="text-[11px] font-mono px-2 py-0.5 rounded-pill bg-surface-raised text-text-secondary">'+(lang==="id"?"Direncanakan":"Planned")+'</span>';
    return '<div class="lift bg-pure-white rounded-2xl p-6 border '+(r.active?"border-soft-green":"border-black/5")+'">'+
      '<div class="flex items-center justify-between mb-2 flex-wrap gap-2">'+
        '<div class="flex items-center gap-3"><span class="font-mono text-sm text-soft-green font-bold">'+r.p+'</span><span class="font-bold">'+tr(r.t)+'</span></div>'+
        '<div class="flex items-center gap-3">'+badge+'<span class="font-mono text-xs text-text-secondary">'+(lang==="id"?r.tId:r.tEn)+'</span></div>'+
      '</div>'+
      '<div class="text-soft-green text-sm font-semibold mb-1">'+r.f+'</div>'+
      '<div class="text-text-secondary text-sm leading-relaxed">'+(lang==="id"?r.id:r.en)+'</div></div>';
  }).join("");
}
function renderSecurity(){
  document.getElementById("security-grid").innerHTML = SECURITY.map(function(s){
    return '<div class="lift bg-bg-white rounded-2xl p-6 border border-black/5">'+
      '<div class="text-3xl mb-3">'+s.ic+'</div><div class="font-bold mb-2">'+tr(s.t)+'</div>'+
      '<div class="text-text-secondary text-sm leading-relaxed">'+tr(s.d)+'</div></div>';
  }).join("");
}
function renderFaq(){
  var list = FAQ[lang];
  document.getElementById("faq-list").innerHTML = list.map(function(f,i){
    return '<div class="faq-item bg-pure-white rounded-xl border border-black/5 overflow-hidden">'+
      '<button onclick="toggleFaq('+i+')" class="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-semibold">'+
        '<span>'+f.q+'</span><span class="faq-chev transition-transform text-text-secondary">▾</span></button>'+
      '<div class="faq-body"><div class="px-5 pb-4 text-text-secondary text-sm leading-relaxed">'+f.a+'</div></div></div>';
  }).join("");
}
/* Tinggi dihitung dari isi sebenarnya — jawaban panjang tidak lagi terpotong */
function toggleFaq(i){
  var item = document.querySelectorAll(".faq-item")[i];
  if(!item) return;
  var body = item.querySelector(".faq-body");
  var open = item.classList.toggle("open");
  body.style.maxHeight = open ? (body.scrollHeight + "px") : "0px";
}

/* -- Menu mobile / tablet -- */
function toggleMenu(){
  var menu = document.getElementById('mobileMenu');
  var btn  = document.getElementById('menuBtn');
  if(!menu || !btn) return;
  var willOpen = !menu.classList.contains('open');
  menu.classList.toggle('open', willOpen);
  btn.classList.toggle('open', willOpen);
  btn.setAttribute('aria-expanded', String(willOpen));
  btn.setAttribute('aria-label', willOpen ? 'Tutup menu' : 'Buka menu');
  menu.setAttribute('aria-hidden', String(!willOpen));
  document.body.classList.toggle('menu-open', willOpen);
}
function closeMenu(){
  var menu = document.getElementById('mobileMenu');
  var btn  = document.getElementById('menuBtn');
  if(!menu || !btn) return;
  menu.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded','false');
  btn.setAttribute('aria-label','Buka menu');
  menu.setAttribute('aria-hidden','true');
  document.body.classList.remove('menu-open');
}
window.addEventListener('resize', function(){
  if(window.innerWidth >= 1024) closeMenu();
});
window.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeMenu();
});

function applyLinks(){
  var m = {
    "nav-launch":CONFIG.DEX_URL, "hero-launch":CONFIG.DEX_URL, "cta-launch":CONFIG.DEX_URL, "foot-launch":CONFIG.DEX_URL, "start-launch":CONFIG.DEX_URL, "menu-launch":CONFIG.DEX_URL,
    "hero-verify":CONFIG.VERIFY_URL, "proof-verify":CONFIG.VERIFY_URL, "foot-verify":CONFIG.VERIFY_URL, "con-verify":CONFIG.VERIFY_URL,
    "proof-log":CONFIG.LOG_URL, "foot-log":CONFIG.LOG_URL, "foot-report":CONFIG.ISSUES_URL,
    "dev-x":CONFIG.X, "foot-x":CONFIG.X,
    "dev-gh":CONFIG.GITHUB, "foot-gh":CONFIG.GITHUB,
    "cta-docs":CONFIG.DOCS_URL, "foot-docs":CONFIG.DOCS_URL, "nav-docs":CONFIG.DOCS_URL, "menu-docs":CONFIG.DOCS_URL,
    "foot-tg":CONFIG.TELEGRAM, "foot-dc":CONFIG.DISCORD,
  };
  Object.keys(m).forEach(function(id){ var el=document.getElementById(id); if(el) el.href=m[id]; });
}
function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    var k = el.getAttribute("data-i18n");
    if(!I18N[k]) return;
    if(k === "live_note" && liveFailed) return;      // jangan timpa pesan kegagalan RPC
    var v = lang==="id"?I18N[k][0]:I18N[k][1];
    if(v.indexOf("<") !== -1) el.innerHTML = v; else el.textContent = v;
  });
  document.querySelectorAll("[data-lang-btn]").forEach(function(b){
    var active = b.getAttribute("data-lang-btn")===lang;
    b.className = "px-3 py-1 rounded-pill text-xs font-bold transition " + (active?"bg-deep-teal text-white":"text-text-secondary");
  });
  document.documentElement.lang = lang;
}
/* ---- Cara Mulai ---- */
function renderSteps(){
  document.getElementById("steps-list").innerHTML = STEPS.map(function(s){
    return '<div class="lift bg-pure-white rounded-2xl p-6 border border-black/5 relative">'+
      '<div class="absolute top-5 right-5 font-mono text-4xl font-bold text-black/5">'+s.n+'</div>'+
      '<div class="text-3xl mb-3">'+s.ic+'</div>'+
      '<div class="font-bold mb-2">'+tr(s.t)+'</div>'+
      '<div class="text-text-secondary text-sm leading-relaxed">'+tr(s.d)+'</div></div>';
  }).join("");
  document.getElementById("tips-list").innerHTML = TIPS[lang].map(function(t){
    return '<li class="flex gap-2"><span class="text-soft-green shrink-0">•</span><span>'+t+'</span></li>';
  }).join("");
}

/* ---- Kontrak ---- */
function shortAddr(a){ return a.slice(0,6)+"…"+a.slice(-4); }
function renderContracts(){
  document.getElementById("con-network").textContent = CHAIN.NETWORK_NAME || "—";
  document.getElementById("con-chainid").textContent = CHAIN.CHAIN_ID ? CHAIN.CHAIN_ID : "—";
  var soon = lang==="id" ? "Segera hadir" : "Coming soon";
  document.getElementById("contracts-list").innerHTML = CONTRACTS.map(function(c){
    var addr = CHAIN[c.key];
    var right;
    if(addr){
      var exp = CHAIN.EXPLORER ? '<a href="'+CHAIN.EXPLORER+'/address/'+addr+'" target="_blank" rel="noopener noreferrer" class="text-soft-green hover:underline text-xs no-underline">'+(lang==="id"?"Lihat":"View")+' ↗</a>' : '';
      right = '<div class="flex items-center gap-3">'+
        '<code class="font-mono text-xs text-text-secondary">'+shortAddr(addr)+'</code>'+
        '<button onclick="copyAddr(''+addr+'',this)" class="text-xs px-2 py-1 rounded-md bg-surface-raised hover:bg-soft-green hover:text-white transition">'+(lang==="id"?"Salin":"Copy")+'</button>'+
        exp+'</div>';
    } else {
      right = '<span class="font-mono text-xs text-text-secondary/60">'+soon+'</span>';
    }
    /* Pool generasi awal diberi catatan jujur, bukan disembunyikan */
    var flag = c.flag
      ? '<div class="w-full mt-3 pt-3 border-t border-black/5 text-[11.5px] leading-relaxed text-text-secondary">⚠️ '+
        (lang==="id"?I18N.con_legacy[0]:I18N.con_legacy[1])+'</div>'
      : '';
    return '<div class="bg-bg-white border '+(c.flag?'border-amber-500/30':'border-black/5')+' rounded-xl p-4 flex items-center justify-between gap-3 flex-wrap">'+
      '<div><div class="font-semibold text-sm">'+tr(c.label)+'</div><div class="font-mono text-[11px] text-text-secondary">'+tr(c.sub)+'</div></div>'+
      right+flag+'</div>';
  }).join("");
}
function copyAddr(addr, btn){
  var done = lang==="id" ? "Tersalin!" : "Copied!";
  var orig = btn.textContent;
  function ok(){ btn.textContent = done; setTimeout(function(){ btn.textContent = orig; },1500); }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(addr).then(ok).catch(function(){ fallback(); });
  } else { fallback(); }
  function fallback(){
    var ta=document.createElement("textarea"); ta.value=addr; document.body.appendChild(ta);
    ta.select(); try{ document.execCommand("copy"); ok(); }catch(e){} document.body.removeChild(ta);
  }
}

/* ---- AI Vault ---- */
function renderVault(){
  var container = document.getElementById("vault-container");
  if(!container) return;
  var pts = VAULT.points.map(function(pt){
    return '<li><span class="tick">&#10003;</span><span>'+(lang==="id"?pt.id:pt.en)+'</span></li>';
  }).join("");
  container.innerHTML =
    '<div class="vault-section">'+
      '<div class="vault-inner">'+
        '<div class="vault-badges">'+
          '<span class="vault-badge exp">'+tr(VAULT.badge_exp)+'</span>'+
          '<span class="vault-badge open">'+tr(VAULT.badge_open)+'</span>'+
        '</div>'+
        '<h2>AI Liquidity <span class="accent">Vault</span></h2>'+
        '<p class="vault-lead">'+tr(VAULT.lead)+'</p>'+
        '<ul class="vault-points">'+pts+'</ul>'+
        '<div class="vault-cta">'+
          '<a class="vault-btn" href="'+CONFIG.VAULT_URL+'">'+tr(VAULT.cta)+' &rarr;</a>'+
          '<span class="vault-note">'+tr(VAULT.note)+'</span>'+
        '</div>'+
      '</div>'+
    '</div>';
}

/* ---- Live Stats (on-chain via JSON-RPC eth_call) ----
   Ringan & tanpa dependensi: hanya eth_call dengan selector yang sudah diverifikasi. */
function hexToNum(hex, decimals){
  if(!hex || hex==="0x") return null;
  try {
    var v = BigInt(hex);
    var base = BigInt(10) ** BigInt(decimals);
    return Number(v / base);
  } catch(e){ return null; }
}
function fmt(n){
  if(n===null || n===undefined || isNaN(n)) return "—";
  return n.toLocaleString(lang==="id"?"id-ID":"en-US");
}
/* Hitung naik dengan easing — hanya dijalankan saat kartunya terlihat */
function animateTo(el, target, suffix){
  if(el === null || el === undefined) return;
  if(target===null){ el.textContent="—"; return; }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce){ el.textContent = fmt(target) + (suffix||""); return; }
  var start=0, dur=1100, t0=performance.now();
  function step(now){
    var p = Math.min((now-t0)/dur, 1);
    var eased = 1-Math.pow(1-p,3);
    el.textContent = fmt(Math.floor(start + (target-start)*eased)) + (suffix||"");
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function rpcCall(to, data){
  return fetch(CHAIN.RPC_URL, {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({jsonrpc:"2.0", id:1, method:"eth_call", params:[{to:to, data:data},"latest"]})
  }).then(function(r){ return r.json(); }).then(function(j){ return j.result; });
}
var liveLoaded = false;
function loadLiveStats(){
  if(liveLoaded) return;
  liveLoaded = true;
  var note = document.getElementById("live-note");
  var dot  = document.getElementById("live-dot");
  dot.className = "w-2 h-2 rounded-full bg-soft-green live-on";

  var pools = [CHAIN.POOL, CHAIN.POOL_KOPDES, CHAIN.POOL_MBGUSDC, CHAIN.POOL_MBGUSDT].filter(Boolean);

  /* Pool USDC/DAI: cadangan + suplai LP. Keduanya stablecoin, jadi menjumlahkannya
     wajar sebagai perkiraan USD. Pool lain TIDAK dijumlahkan — MBG bukan $1. */
  var jobs = [
    rpcCall(CHAIN.POOL, SEL.reserveA),
    rpcCall(CHAIN.POOL, SEL.reserveB),
    rpcCall(CHAIN.POOL, SEL.totalSupply),
    rpcCall(CHAIN.STAKING, SEL.totalSupply),
  ].concat(pools.map(function(p){ return rpcCall(p, SEL.reserveA).catch(function(){ return null; }); }));

  Promise.all(jobs).then(function(res){
    var ra = hexToNum(res[0], CHAIN.DECIMALS);
    var rb = hexToNum(res[1], CHAIN.DECIMALS);
    var lp = hexToNum(res[2], CHAIN.DECIMALS);
    var st = hexToNum(res[3], CHAIN.DECIMALS);
    var active = res.slice(4).reduce(function(n,h){
      var v = hexToNum(h, CHAIN.DECIMALS);
      return n + (v !== null && v > 0 ? 1 : 0);
    }, 0);

    if(ra===null && rb===null){ throw new Error("rpc"); }

    animateTo(document.getElementById("ls-tvl"), (ra!==null&&rb!==null) ? ra+rb : null);
    animateTo(document.getElementById("ls-lp"), lp);
    animateTo(document.getElementById("ls-staked"), st);
    var poolsEl = document.getElementById("ls-pools");
    animateTo(poolsEl, active, " / " + pools.length);
    liveFailed = false;
    note.textContent = lang==="id" ? I18N.live_note[0] : I18N.live_note[1];
  }).catch(function(){
    liveFailed = true;
    note.textContent = lang==="id" ? I18N.live_fail[0] : I18N.live_fail[1];
    dot.className = "w-2 h-2 rounded-full bg-text-secondary/40";
    ["ls-tvl","ls-lp","ls-pools","ls-staked"].forEach(function(id){
      var el = document.getElementById(id); if(el) el.textContent = "—";
    });
  });
}

function renderAll(){ renderFeatures(); renderTok(); renderRoadmap(); renderSecurity(); renderFaq(); renderSteps(); renderContracts(); renderVault(); applyI18n(); applyLinks(); observeNew(); }
function setLang(l){ lang=l; try{ localStorage.setItem("freesia_lang",l);}catch(e){} renderAll(); }

/* ============ GERAK ============ */
/* Satu observer untuk semua: seksi muncul, anak-anak grid menyusul beruntun,
   angka on-chain baru dihitung saat kartunya benar-benar terlihat. */
/* Pengaman: kalau apa pun gagal, isi halaman TETAP tampil.
   Konten tidak boleh bergantung pada animasi. */
function showAllNow(){
  document.querySelectorAll("section, .stagger").forEach(function(el){ el.classList.add("in"); });
  document.querySelectorAll(".bar").forEach(function(b){ b.style.width = b.getAttribute("data-w") + "%"; });
  loadLiveStats();
}

var io = null;
try {
  if("IntersectionObserver" in window) io = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if(!e.isIntersecting) return;
    e.target.classList.add("in");
    if(e.target.classList.contains("stagger")){
      Array.prototype.slice.call(e.target.children).forEach(function(child, i){
        child.style.transitionDelay = Math.min(i*70, 560) + "ms";
      });
    }
    if(e.target.id === "livestats") loadLiveStats();
    if(e.target.id === "tokenomics"){
      document.querySelectorAll(".bar").forEach(function(b){
        b.style.transition = "width 1.1s cubic-bezier(.22,.61,.36,1)";
        requestAnimationFrame(function(){ b.style.width = b.getAttribute("data-w") + "%"; });
      });
    }
    io.unobserve(e.target);
  });
  }, {threshold:.12, rootMargin:"0px 0px -40px 0px"});
} catch(e){ io = null; }

function observeNew(){
  if(!io){ showAllNow(); return; }   // browser lama / observer gagal → tampilkan saja
  document.querySelectorAll("section, .stagger").forEach(function(el){
    if(el.dataset.obs) return;
    el.dataset.obs = "1";
    if(el.tagName === "SECTION" && el.id !== "top") el.classList.add("reveal");
    io.observe(el);
  });
}

/* Baru render setelah observer siap — urutan ini penting:
   renderAll() memanggil observeNew(), jadi io HARUS sudah ada. */
try {
  renderAll();
} catch(err) {
  console.error("Render gagal:", err);
  showAllNow();          // jangan pernah tinggalkan halaman kosong
}

/* Hero tidak perlu menunggu di-scroll */
var top_ = document.getElementById("top");
if(top_) top_.classList.add("in");

/* Jaring pengaman terakhir: kalau setelah 2,5 detik masih ada seksi yang
   belum tampil (mis. observer tak pernah memicu), tampilkan paksa. */
setTimeout(function(){
  document.querySelectorAll(".stagger:not(.in)").forEach(function(el){
    var r = el.getBoundingClientRect();
    if(r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
  });
}, 2500);

/* Bilah progres gulir */
var sp=document.getElementById("scroll-progress");
var nav=document.getElementById("nav");
var ticking=false;
window.addEventListener("scroll", function(){
  if(ticking) return;
  ticking = true;
  requestAnimationFrame(function(){
    var h=document.documentElement.scrollHeight-window.innerHeight;
    sp.style.width = h>0 ? (window.scrollY/h*100)+"%" : "0%";
    if(nav) nav.classList.toggle("shrunk", window.scrollY > 40);
    ticking = false;
  });
}, {passive:true});
