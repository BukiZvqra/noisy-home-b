/* Преход без N: докато хирото излиза нагоре, текстът избледнява, плочките се разминават и хирото се слива с втората секция. Видеата вървят само докато хирото се вижда. */
(function(){var h=document.querySelector('.ghs');if(!h)return;
 var rm=matchMedia('(prefers-reduced-motion:reduce)').matches,vs=[] /* видеата се управляват от nfx.js */,inView=true,tick=0;
 function sync(){var on=inView&&!document.hidden&&!rm;vs.forEach(function(v){if(on){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})}
 var ts=[].slice.call(h.querySelectorAll('.ghs-t'));
 /* вектор на всяка плочка към точката, където започва втората секция (долу в центъра на хирото) */
 function vec(){var r=h.getBoundingClientRect(),cx=r.width/2,cy=r.height*1.02;ts.forEach(function(t){if(getComputedStyle(t).display==='none')return;var o={x:t.offsetLeft+t.offsetWidth/2,y:t.offsetTop+t.offsetHeight/2};t.style.setProperty('--tx',((cx-o.x)*.62).toFixed(0)+'px');t.style.setProperty('--ty',((cy-o.y)*.55).toFixed(0)+'px')})}
 function upd(){tick=0;var r=h.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/Math.max(1,r.height*.85)));h.style.setProperty('--gp',p.toFixed(3))}
 addEventListener('resize',function(){vec();upd()});vec();
 if(!rm)addEventListener('scroll',function(){if(!tick){tick=1;requestAnimationFrame(upd)}},{passive:true});
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){inView=es[0].isIntersecting;sync()},{threshold:0}).observe(h);
 document.addEventListener('visibilitychange',sync);addEventListener('focus',sync);
 vs.forEach(function(v){v.addEventListener('loadeddata',sync)});sync();upd();
 if(!rm&&matchMedia('(pointer:fine)').matches){h.addEventListener('pointermove',function(e){var r=h.getBoundingClientRect();h.style.setProperty('--mx',((e.clientX-r.left)/r.width*2-1).toFixed(3));h.style.setProperty('--my',((e.clientY-r.top)/r.height*2-1).toFixed(3))},{passive:true})}
})();
