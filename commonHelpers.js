/* empty css                      */import{f,i as y}from"./assets/vendor-77e16229.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();let l,i;const a=document.querySelector("#startButton");document.querySelector("#datetime-picker");a.disabled=!0;const p={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(o){const r=new Date().getTime();l=o[0].getTime(),l<r?(y.error({title:"",message:"Please choose a date in the future",position:"topRight",timeout:0,iconUrl:"../img/bi_x-octagon.svg",backgroundColor:"#EF4040",messageColor:"#FFFFFF",close:!0,onOpening:function(s,e){var t=e.querySelector(".iziToast-close");t.style.backgroundColor="transparent",t.style.backgroundImage="url('../img/bi_x-lg.svg')",t.style.backgroundSize="contain",t.style.width="16px",t.style.height="16px",t.style.color="transparent",t.style.margin="18px"}}),a.disabled=!0):(i=l-r,console.log(i),a.disabled=!1)}};f("#datetime-picker",p);function g(o){const t=Math.floor(o/864e5),c=Math.floor(o%864e5/36e5),d=Math.floor(o%864e5%36e5/6e4),m=Math.floor(o%864e5%36e5%6e4/1e3);return{days:t,hours:c,minutes:d,seconds:m}}let u;a.addEventListener("click",()=>{u=setInterval(()=>{h()},1e3),a.disabled=!0});function h(){const o=document.querySelector("[data-days]"),n=document.querySelector("[data-hours]"),r=document.querySelector("[data-minutes]"),s=document.querySelector("[data-seconds]");if(i>999){let e=g(i);o.textContent=e.days,n.textContent=e.hours,r.textContent=e.minutes,s.textContent=e.seconds,i-=1e3}else s.textContent="00",clearInterval(u)}
//# sourceMappingURL=commonHelpers.js.map
