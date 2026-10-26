(function(){
  var d=document,de=d.documentElement;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;
  de.classList.add('js');
  function ready(f){d.readyState==='loading'?d.addEventListener('DOMContentLoaded',f):f()}
  ready(function(){
    var targets=[];
    function add(el,kind,delay){
      if(!el||el.dataset.rv)return;
      el.dataset.rv=kind;el.classList.add('rv','rv-'+kind);
      el.style.transitionDelay=(delay||0)+'ms';targets.push(el);
    }
    // ヒーロー（最初のセクション）：背景写真をゆっくりズーム、文言を順に表示
    var hero=d.querySelector('header + section');
    if(hero){
      var hi=hero.querySelector('img');if(hi)hi.classList.add('hero-img');
      var kids=hero.querySelectorAll('p,h1,h2,a');
      kids.forEach(function(k,i){if(k.classList.contains('hero-cap')){add(k,'up',200);return}add(k,'up',300+i*180)});
    }
    // 各セクションの子要素を順に表示
    d.querySelectorAll('section').forEach(function(s){
      if(s===hero)return;
      var inner=s.firstElementChild&&s.children.length===1?s.firstElementChild:s;
      Array.prototype.forEach.call(inner.children,function(c,i){
        if(c.tagName==='SCRIPT')return;
        add(c,'up',Math.min(i,5)*90);
      });
    });
    d.querySelectorAll('article').forEach(function(a){add(a,'up',0)});
    d.querySelectorAll('.kpi>div').forEach(function(k,i){add(k,'up',i*90)});
    // 写真は枠の中でふわっとズームアウト
    d.querySelectorAll('img').forEach(function(im){
      if(im.classList.contains('hero-img')||im.closest('header')||im.getAttribute('aria-hidden'))return;
      var w=im.parentElement;if(w&&getComputedStyle(w).overflow==='hidden'){w.classList.add('img-frame');}
    });
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
    },{threshold:0.08,rootMargin:'0px 0px -6% 0px'});
    targets.forEach(function(t){io.observe(t)});
    d.querySelectorAll('.img-frame').forEach(function(f){io.observe(f)});
    if(hero)requestAnimationFrame(function(){hero.classList.add('hero-in')});
    setTimeout(function(){d.querySelectorAll('.rv,.img-frame').forEach(function(e){e.classList.add('in')})},6000);
    // ページ遷移：フェードアウト
    d.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('a[href]');
      if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||a.target)return;
      var u=new URL(a.href,location.href);
      if(u.origin!==location.origin||(u.pathname===location.pathname&&u.hash))return;
      e.preventDefault();de.classList.add('leaving');
      setTimeout(function(){location.href=a.href},260);
    });
    window.addEventListener('pageshow',function(e){if(e.persisted)de.classList.remove('leaving')});
  });
})();
