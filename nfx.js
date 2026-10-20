/* Netflix-Ads хиро: hover спира лентата и уголемява видеото (CSS); фонът поема цвета му; клик: останалите спират, натиснатото със звук; клик пак/Esc/извън: продължава. */
(function(){var h=document.querySelector('.ghs'),n=h&&h.querySelector('.nfx');if(!n)return;
 var ts=[].slice.call(n.querySelectorAll('.nfx-t')),vs=ts.map(function(t){return t.querySelector('video')}),cur=null,inView=true,g=n.querySelector('.nfx-glow');
 var cv=document.createElement('canvas');cv.width=cv.height=8;var cx=cv.getContext('2d',{willReadFrequently:true});
 function pl(v){var p=v.play();if(p&&p.catch)p.catch(function(){})}
 function playAll(){if(!inView||document.hidden)return;vs.forEach(function(v){v.muted=true;pl(v)})}
 function stopAll(){vs.forEach(function(v){v.pause()})}
 function tint(t){var v=t.querySelector('video');try{cx.drawImage(v,0,0,8,8);var d=cx.getImageData(0,0,8,8).data,r=0,gg=0,b=0;for(var i=0;i<d.length;i+=4){r+=d[i];gg+=d[i+1];b+=d[i+2]}var k=d.length/4;n.style.setProperty('--gc','rgba('+Math.round(r/k)+','+Math.round(gg/k)+','+Math.round(b/k)+',.9)')}catch(e){}
  var r1=t.getBoundingClientRect(),hr=h.getBoundingClientRect();n.style.setProperty('--gx',Math.round((r1.left+r1.width/2-hr.left)/hr.width*100)+'%')}
 ts.forEach(function(t){
  t.addEventListener('mouseenter',function(){n.classList.add('hover');tint(t)});
  t.addEventListener('mouseleave',function(){if(!cur)n.classList.remove('hover')});
  t.addEventListener('click',function(e){e.stopPropagation();if(cur===t)release();else focus(t)})});
 function focus(t){cur=t;n.classList.add('paused','hover');h.classList.add('nfx-on');tint(t);ts.forEach(function(x){x.classList.toggle('on',x===t)});var v=t.querySelector('video');vs.forEach(function(x){if(x!==v)x.pause()});v.muted=false;pl(v);var w=document.createElement('i');w.className='nfx-wave';t.querySelector('.nfx-in').appendChild(w);setTimeout(function(){w.remove()},950)}
 function release(){if(!cur)return;cur=null;n.classList.remove('paused','hover');h.classList.remove('nfx-on');ts.forEach(function(x){x.classList.remove('on')});playAll()}
 h.addEventListener('click',function(e){if(cur&&!e.target.closest('.nfx-t')&&!e.target.closest('a,button'))release()});
 addEventListener('keydown',function(e){if(e.key==='Escape')release()});
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){inView=es[0].isIntersecting;if(!inView){release();stopAll()}else if(!cur)playAll()},{threshold:0}).observe(h);
 document.addEventListener('visibilitychange',function(){if(document.hidden)stopAll();else if(!cur)playAll()});
 playAll();
})();
