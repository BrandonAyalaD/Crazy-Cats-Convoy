'use strict';
window.ConvoyMobile=(()=>{
const arena=document.querySelector('.arena'),controls=document.querySelector('.controls'),layout=document.querySelector('.battle-layout'),wallet=document.querySelector('.wallet'),topline=document.querySelector('.topline'),hud=document.querySelector('.hud');
const reset=document.getElementById('reset'),footer=document.querySelector('footer'),headerRight=document.querySelector('.header-right'),cover=document.getElementById('rotate-cover');
const pause=document.getElementById('pause');const menuStack=document.createElement('div');menuStack.className='mobile-menu-stack';headerRight.append(menuStack);let mobile=false,blocked=false;
function isMobile(){return matchMedia('(pointer:coarse)').matches&&Math.min(innerWidth,innerHeight)<=900||innerWidth<=760;}
function sync(){mobile=isMobile();blocked=mobile&&innerHeight>innerWidth;document.body.classList.toggle('mobile-mode',mobile);document.body.classList.toggle('needs-landscape',blocked);cover.hidden=!blocked;cover.setAttribute('aria-hidden',String(!blocked));
if(mobile){if(controls.parentNode!==arena)arena.append(controls);if(wallet.parentNode!==hud)hud.append(wallet);menuStack.append(reset,pause);}else{if(controls.parentNode!==layout)layout.append(controls);if(wallet.parentNode!==topline)topline.append(wallet);if(reset.parentNode!==footer)footer.append(reset);hud.append(pause);}
window.dispatchEvent(new Event('convoy-layout'));}
async function requestLandscape(){if(!mobile)return;try{if(!document.fullscreenElement&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen({navigationUI:'hide'});}catch{}
try{if(screen.orientation?.lock)await screen.orientation.lock('landscape');}catch{}
sync();}
document.getElementById('rotate-action').onclick=requestLandscape;window.addEventListener('resize',sync);window.addEventListener('orientationchange',sync);document.addEventListener('fullscreenchange',sync);sync();
return{get blocked(){return blocked},get enabled(){return mobile},requestLandscape};})();
