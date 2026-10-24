import { session } from "../core/session.js";
import { icon } from "./icons.js";
import { state } from "../core/store.js";
import { esc } from "../core/dom.js";
export function nav(r, label, i) {
  return `<a href="#${r}" class="${session.currentRoute.split('/')[0] === r ? 'active' : ''}">${i ? icon(i) : ''}${label}</a>`;
}
export function shell(content) {
  return `<header class="top">
<div class="topinner">
<a href="#home" class="logo">
<img class="brand-symbol" src="./assets/brand/tripwise-symbol.png" alt="" width="40" height="40"><span class="brand-name">Tripwise</span></a>
<nav class="nav" aria-label="Asosiy menyu">${nav('home', 'Sayohatlar')}${nav('flights', 'Aviachiptalar')}${nav('tours', 'Tur paketlar')}${nav('hotels', 'Mehmonxonalar')}${nav('ai', 'AI yordamchi')}</nav>
<div class="tools">
<button class="textbtn currency" data-act="currency">${icon('globe')} ${state.currency}</button>
<button class="iconbtn" aria-label="Saqlanganlar" data-go="favorites">${icon('heart')}</button>
<a class="iconbtn" href="#notifications" aria-label="Bildirishnomalar" ${session.currentRoute === 'notifications' ? 'aria-current="page"' : ''}>${icon('bell')}</a>
<button class="btn sm" data-act="login">${state.user === 'Mehmon' ? 'Kirish' : esc(state.user)}</button>
<button class="iconbtn mobileonly" aria-label="Barcha bo‘limlar" data-act="menu">${icon('menu')}</button>
</div>
</div>
</header>
<div class="demo-strip">INTERAKTIV BETA · Narxlar va takliflar namunaviy. Haqiqiy bron va to‘lov amalga oshirilmaydi.</div>
<main id="main" class="container" tabindex="-1">${content}</main>
<footer class="footer">
<div class="footer-inner">
<a href="#home" class="logo" aria-label="Tripwise — bosh sahifa"><img class="brand-symbol" src="./assets/brand/tripwise-symbol.png" alt="" width="40" height="40"><span class="brand-name">Tripwise</span><span class="pill">BETA</span></a>
<div>


<a href="#states">Xizmat holatlari</a>
<a href="#support">Yordam</a>
</div>
<div>
<button class="textbtn small" data-act="about">Demo haqida va suratlar</button>
</div>
</div>
</footer>
<nav class="mobilebar" aria-label="Mobil menyu">${nav('home', 'Bosh sahifa', 'home')}${nav('tours', 'Qidirish', 'search')}${nav('ai', 'AI reja', 'spark')}${nav('trips', 'Safarlarim', 'bag')}${nav('profile', 'Profil', 'user')}</nav>`;
}
export function pagehead(title, sub = '') {
  return `<div class="breadcrumb">
<a href="#home">Bosh sahifa</a> / ${title}</div>
<div class="pagehead">
<h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>`;
}
export function side(active) {
  return `<aside class="panel profileaside">
<div class="row" style="margin-bottom:22px">
<div class="avatar">${esc(state.user[0] || 'M')}</div>
<div>
<strong>${esc(state.user)}</strong>
<small class="muted" style="display:block">Demo hisob</small>
</div>
</div>
<nav class="sidemenu">${[['profile', 'user', 'Mening profilim'], ['trips', 'bag', 'Safarlarim'], ['favorites', 'heart', 'Saqlanganlar'], ['notifications', 'bell', 'Bildirishnomalar'], ['support', 'help', 'Yordam']].map(([r, i, t]) => `<a href="#${r}" class="${active === r ? 'active' : ''}">${icon(i)}${t}</a>`).join('')}</nav>
</aside>`;
}
export function businessNav(active) {
  return `<div class="tabs">${[['partner', 'Hamkor paneli'], ['offers', 'Takliflar'], ['partner-orders', 'Buyurtmalar'], ['admin', 'Admin paneli']].map(([r, t]) => `<a class="tab ${active === r ? 'active' : ''}" href="#${r}">${t}</a>`).join('')}</div>`;
}
export function stats(items) {
  return `<div class="statgrid">${items.map(([i, n, v, s]) => `<div class="stat">${icon(i)}<div class="small muted">${n}</div>
<strong>${v}</strong>
<span class="small green">${s}</span>
</div>`).join('')}</div>`;
}
