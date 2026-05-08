/* === shared.js === */

/* ── Particles ── */
(function(){
  const c=document.getElementById('particles');
  if(!c)return;
  const ctx=c.getContext('2d');
  let W,H,pts=[];
  const N=70,COLORS=['#00ff88','#0088ff','#ff00ff','#ff6600'];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight}
  function mk(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.5+.5,c:COLORS[Math.floor(Math.random()*COLORS.length)]}}
  function init(){resize();pts=Array.from({length:N},mk)}
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c+'88';ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize',resize);
  init();draw();
})();

/* ── Progress bar ── */
(function(){
  const bar=document.getElementById('progress-bar');
  if(!bar)return;
  window.addEventListener('scroll',()=>{
    const s=document.documentElement;
    const pct=(s.scrollTop/(s.scrollHeight-s.clientHeight))*100;
    bar.style.width=pct+'%';
  });
})();

/* ── Back to top ── */
(function(){
  const btn=document.getElementById('btt');
  if(!btn)return;
  window.addEventListener('scroll',()=>btn.classList.toggle('show',window.scrollY>300));
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

/* ── Scroll reveal ── */
(function(){
  const els=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
  },{threshold:.12});
  els.forEach(el=>io.observe(el));
})();

/* ── Lightbox ── */
(function(){
  const lb=document.getElementById('lightbox');
  if(!lb)return;
  const lbImg=lb.querySelector('img');
  const lbCap=document.getElementById('lb-caption');
  const close=lb.querySelector('.close');
  document.querySelectorAll('.img-card').forEach(card=>{
    card.addEventListener('click',()=>{
      lbImg.src=card.querySelector('img').src;
      lbCap.textContent=card.querySelector('figcaption')?.textContent||'';
      lb.classList.add('open');
    });
  });
  function closeLB(){lb.classList.remove('open')}
  close.addEventListener('click',closeLB);
  lb.addEventListener('click',e=>{if(e.target===lb)closeLB()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLB()});
})();

/* ── Active nav link ── */
(function(){
  const cur=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=a.getAttribute('href');
    if(href===cur||(cur===''&&href==='index.html'))a.classList.add('active');
  });
})();
