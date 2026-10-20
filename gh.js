/* Хиро „Гледай“: клиповете вървят само докато хирото се вижда и разделът е на преден план. */
(function(){var h=document.querySelector('.gh');if(!h)return;
 var vs=[].slice.call(h.querySelectorAll('video')),rm=matchMedia('(prefers-reduced-motion:reduce)').matches,inView=true;
 function sync(){var on=inView&&!document.hidden&&!rm;vs.forEach(function(v){if(on){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})}
 if('IntersectionObserver' in window){new IntersectionObserver(function(es){inView=es[0].isIntersecting;sync()},{threshold:0}).observe(h)}
 document.addEventListener('visibilitychange',sync);addEventListener('focus',sync);addEventListener('pageshow',sync);
 vs.forEach(function(v){v.addEventListener('loadeddata',function(){if(inView&&!document.hidden&&!rm){var p=v.play();if(p&&p.catch)p.catch(function(){})}})});
 sync();
})();
