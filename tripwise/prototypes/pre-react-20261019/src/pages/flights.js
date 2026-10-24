import { flights, tours } from "../data/catalog.js";
import { state } from "../core/store.js";
import { pagehead } from "../components/layout.js";
import { esc } from "../core/dom.js";
import { empty, filterPanel, toolbar } from "../components/search.js";
import { icon } from "../components/icons.js";
import { money } from "../core/format.js";
export function flightList() {
  let a = flights.filter(f => f.price <= state.max && (!state.direct || f.direct) && (state.baggage !== 'checked' || f.bag));
  if (state.sort === 'cheap') a.sort((a, b) => a.price - b.price);
  const dest = tours.find(t => t.id === state.destination) || tours[0];
  return `${pagehead('Aviachiptalar', `${esc(state.from)} — ${dest.city} · ${state.start} / ${state.end} · ${state.people} kishi`)}<div class="notice" style="margin-bottom:20px">Parvoz jadvali, yo‘nalish va narxlar sinov uchun namunaviy. Qaytish chiptasi tarifga kiritilgan.</div>
<div class="layout">${filterPanel('flights')}<section>${toolbar(a.length)}${a.length ? a.map(f => `<article class="panel flight">
<div class="airline">
<span class="airbadge">${icon('plane')}</span>
<div>${f.air}<small class="muted" style="display:block">${f.code} · Ekonom</small>
</div>
</div>
<div>
<div class="flightpath">
<div>
<strong>${f.depart}</strong>
<small>${esc(state.from)}</small>
</div>
<div class="flightline">${f.hours}<div>${icon('plane')}</div>${f.direct ? 'To‘g‘ridan-to‘g‘ri' : '1 ta to‘xtash'}</div>
<div>
<strong>${f.arrive}</strong>
<small>${dest.city}</small>
</div>
</div>
<div class="includes">
<span>${icon('bag')}8 kg qo‘l yuki</span>
<span>${f.bag ? '23 kg bagaj' : 'Bagaj kiritilmagan'}</span>
</div>
</div>
<div class="flightprice">
<div class="price">${money(f.price)}</div>
<small class="muted">1 kishi · borish-qaytish</small>
<button class="btn sm full" data-act="flight-detail" data-id="${f.id}">Tanlash</button>
</div>
</article>`).join('') : empty()}</section>
</div>`;
}
