import { imgs } from "../data/catalog.js";
import { state } from "../core/store.js";
import { esc } from "../core/dom.js";
import { icon } from "./icons.js";
import { money } from "../core/format.js";
export function tourCard(t) {
  return `<article class="card">
<div class="cardimage">
<img src="${imgs[t.image]}" alt="${t.city} manzarasi" loading="lazy">
<span class="pill">${t.style}</span>
<button class="iconbtn ${state.favorites.includes(t.id) ? 'saved' : ''}" data-act="favorite" data-id="${t.id}" aria-label="${esc(t.title)}ni saqlash" aria-pressed="${state.favorites.includes(t.id)}">${icon('heart')}</button>
</div>
<div class="cardbody">
<div class="cardmeta">
<span>${icon('pin')} ${t.country}, ${t.city}</span>
<span class="rating">★ ${t.rating} <span class="muted">(${t.reviews})</span>
</span>
</div>
<h3>
<a href="#tour/${t.id}" style="color:inherit">${esc(t.title)}</a>
</h3>
<div class="muted small">${t.days} kun · ${t.days - 1} tun · 4★ mehmonxona</div>
<div class="includes">
<span>${icon('plane')}Aviachipta</span>
<span>${icon('hotel')}Mehmonxona</span>
<span>${icon('bag')}Transfer</span>
</div>
<div class="cardfoot">
<div class="price">${money(t.price)} <small>/ kishi</small>
</div>
<a class="btn sm light" href="#tour/${t.id}">Batafsil</a>
</div>
</div>
</article>`;
}
