import { PageHeading } from './PageHeading.jsx';
import React from "react";
import { session } from "../core/session.js";
import { icon } from "./icons.jsx";
import { state } from "../core/store.js";
export function nav(r, label, i) {
  return <a href={`#${r}`} className={session.currentRoute.split('/')[0] === r ? 'active' : ''}>
{i ? icon(i) : ''}
{label}
</a>;
}
function Layout({
  children
}) {
  return <><header className="top"><div className="topinner">
<a href="#home" className="logo">
<img className="brand-symbol" src="/assets/brand/tripwise-symbol.png" alt="" width="40" height="40" />
<span className="brand-name">Tripwise</span>
</a>
<nav className="nav" aria-label="Asosiy menyu">
{nav('home', 'Sayohatlar')}
{nav('flights', 'Aviachiptalar')}
{nav('tours', 'Tur paketlar')}
{nav('hotels', 'Mehmonxonalar')}
{nav('ai', 'AI yordamchi')}
</nav>
<div className="tools">
<button className="textbtn currency" data-act="currency">
{icon('globe')}
{state.currency}
</button>
<button className="iconbtn" aria-label="Saqlanganlar" data-go="favorites">{icon('heart')}</button>
<a className="iconbtn" href="#notifications" aria-label="Bildirishnomalar" aria-current={session.currentRoute === 'notifications' ? "page" : undefined}>{icon('bell')}</a>
<button className="btn sm" data-act="login">{state.user === 'Mehmon' ? 'Kirish' : state.user}</button>
<button className="iconbtn mobileonly" aria-label="Barcha bo‘limlar" data-act="menu">{icon('menu')}</button>
</div>
</div></header><main id="main" className="container" tabIndex="-1">{children}</main><nav className="mobilebar" aria-label="Mobil menyu">
{nav('home', 'Bosh sahifa', 'home')}
{nav('tours', 'Tur paketlar', 'bag')}
{nav('ai', 'AI reja', 'spark')}
{nav('flights', 'Aviachiptalar', 'plane')}
{nav('trips', 'Safarlarim', 'bag')}
</nav></>;
}
export { Layout };
export function pagehead(title, sub = '') {
  return <PageHeading title={title} subtitle={sub} />;
}

function AccountNavigation(active) {
  return <aside className="panel profileaside">
<div className="row" style={{
      "marginBottom": "22px"
    }}>
<div className="avatar">{state.user[0] || 'M'}</div>
<div>
<strong>{state.user}</strong>
<small className="muted" style={{
          "display": "block"
        }}>Demo hisob</small>
</div>
</div>
<nav className="sidemenu">{[['profile', 'user', 'Mening profilim'], ['trips', 'bag', 'Safarlarim'], ['favorites', 'heart', 'Saqlanganlar'], ['notifications', 'bell', 'Bildirishnomalar'], ['support', 'help', 'Yordam']].map(([r, i, t], index) => <a href={`#${r}`} className={active === r ? 'active' : ''} key={index}>
{icon(i)}
{t}
</a>)}</nav>
</aside>;
}
export { AccountNavigation };
export function businessNav(active) {
  return <div className="tabs">{[['partner', 'Hamkor paneli'], ['offers', 'Takliflar'], ['partner-orders', 'Buyurtmalar'], ['admin', 'Admin paneli']].map(([r, t], index) => <a className={`tab ${active === r ? 'active' : ''}`} href={`#${r}`} key={index}>{t}</a>)}</div>;
}
export function stats(items) {
  return <div className="statgrid">{items.map(([i, n, v, s], index) => <div className="stat" key={index}>
{icon(i)}
<div className="small muted">{n}</div>
<strong>{v}</strong>
<span className="small green">{s}</span>
</div>)}</div>;
}
