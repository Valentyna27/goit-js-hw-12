import{a as F,S as g,i as p}from"./assets/vendor-BjRz3xa9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();async function y(t,r){try{return(await F.get("https://pixabay.com/api/",{params:{key:"49254828-2c532cb2bf49660d4021e7362",q:encodeURIComponent(t),image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}catch(e){console.log(e)}}const m=document.querySelector(".gallery"),h=new g(".gallery a",{captionsData:"alt",captionDelay:300});function b(){m.innerHTML=""}function f(t){const r=t.map(e=>`
          <li class="gallery-item">
            <a class="gallery-link" href="${e.largeImageURL}">
              <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
            </a>
            <div class="container-image-info">
              <div class="sub-container">
                <p class="info-caption">Likes</p>
                <p class="info-numbers">${e.likes}</p>
              </div>
              <div class="sub-container">
                <p class="info-caption">Views</p>
                <p class="info-numbers">${e.views}</p>
              </div>
              <div class="sub-container">
                <p class="info-caption">Comments</p>
                <p class="info-numbers">${e.comments}</p>
              </div>
              <div class="sub-container">
                <p class="info-caption">Downloads</p>
                <p class="info-numbers">${e.downloads}</p>
              </div>
            </div>
          </li>`).join("");m.insertAdjacentHTML("beforeend",r),h.refresh()}const u=document.querySelector("form"),a=document.querySelector(".loader"),i=document.querySelector(".load-more-btn");let l=1,v=15,n="";u.addEventListener("submit",async t=>{t.preventDefault();let r=u.search.value.trim();a.style.display="block",l=1;try{if(b(),i.style.display="none",n=r,r=n,n===""){p.error({title:"Error",titleColor:"#FFFFFF",icon:"material-icons",iconText:"error",iconColor:"#FFFFFF",message:"Please, fill in the field",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"bottomRight",close:!1,layout:2,timeout:1e4});return}const e=await y(n,l);if(e.hits.length===0){p.error({title:"No images",titleColor:"#FFFFFF",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",position:"bottomRight",icon:"material-icons",iconText:"error",iconColor:"#FFFFFF",messageColor:"#FFFFFF",close:!1,layout:2,timeout:1e4});return}f(e.hits),i.style.display="block"}catch(e){console.error(e)}finally{a.style.display="none",u.reset()}});i.addEventListener("click",async()=>{a.style.display="block",i.style.display="none";try{l+=1;const t=await y(n,l);f(t.hits),C(),l*v>=t.totalHits?(p.show({title:"Notification",titleColor:"#FFFFFF",message:"We are sorry, but you have reached the end of search results.",backgroundColor:"#6cc4ea",position:"bottomRight",icon:"material-icons",iconText:"announcement",iconColor:"#FFFFFF",messageColor:"#FFFFFF",close:!1,layout:2,timeout:1e4}),i.style.display="none"):i.style.display="block"}catch(t){console.error(t)}finally{a.style.display="none"}});function C(){const t=document.querySelector(".gallery-item");if(t){const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
