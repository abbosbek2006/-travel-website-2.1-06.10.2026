import React from "react";
import { flights, tours } from "../data/catalog.js";
import { state } from "../core/store.js";
import { pagehead } from "../components/layout.jsx";
import { empty, filterPanel, toolbar } from "../components/search.jsx";
import { icon } from "../components/icons.jsx";
import { money } from "../core/format.js";
function FlightsPage() {
  let a = flights.filter(f => f.price <= state.max && (!state.direct || f.direct) && (state.baggage !== 'checked' || f.bag));
  if (state.sort === 'cheap') a.sort((a, b) => a.price - b.price);
  const dest = tours.find(t => t.id === state.destination) || tours[0];
  return <>{pagehead('Aviachiptalar', `${state.from} — ${dest.city} · ${state.start} / ${state.end} · ${state.people} kishi`)}<div className="notice" style={{
      "marginBottom": "20px"
    }}>Parvoz jadvali, yo‘nalish va narxlar sinov uchun namunaviy. Qaytish chiptasi tarifga kiritilgan.</div><div className="layout">
{filterPanel('flights')}
<section>
{toolbar(a.length)}
{a.length ? a.map((f, index) => <article className="panel flight" key={index}>
<div className="airline">
<span className="airbadge">{icon('plane')}</span>
<div>
{f.air}
<small className="muted" style={{
                "display": "block"
              }}>
{f.code}
{" · Ekonom"}
</small>
</div>
</div>
<div>
<div className="flightpath">
<div>
<strong>{f.depart}</strong>
<small>{state.from}</small>
</div>
<div className="flightline">
{f.hours}
<div>{icon('plane')}</div>
{f.direct ? 'To‘g‘ridan-to‘g‘ri' : '1 ta to‘xtash'}
</div>
<div>
<strong>{f.arrive}</strong>
<small>{dest.city}</small>
</div>
</div>
<div className="includes">
<span>
{icon('bag')}
8 kg qo‘l yuki
</span>
<span>{f.bag ? '23 kg bagaj' : 'Bagaj kiritilmagan'}</span>
</div>
</div>
<div className="flightprice">
<div className="price">{money(f.price)}</div>
<small className="muted">1 kishi · borish-qaytish</small>
<button className="btn sm full" data-act="flight-detail" data-id={f.id}>Tanlash</button>
</div>
</article>) : empty()}
</section>
</div></>;
}
export { FlightsPage };
