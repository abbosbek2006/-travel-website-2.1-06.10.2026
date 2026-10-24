import React from "react";
import { imgs } from "../data/catalog.js";
import { state } from "../core/store.js";
import { icon } from "./icons.jsx";
import { money } from "../core/format.js";
function TourCard({
  tour: t
}) {
  return <article className="card">
<div className="cardimage">
<img src={imgs[t.image]} alt={`${t.city} manzarasi`} loading="lazy" />
<span className="pill">{t.style}</span>
<button className={`iconbtn ${state.favorites.includes(t.id) ? 'saved' : ''}`} data-act="favorite" data-id={t.id} aria-label={`${t.title}ni saqlash`} aria-pressed={state.favorites.includes(t.id)}>{icon('heart')}</button>
</div>
<div className="cardbody">
<div className="cardmeta">
<span>
{icon('pin')}
{t.country}
{", "}
{t.city}
</span>
<span className="rating">
{"★ "}
{t.rating}
<span className="muted">
(
{t.reviews}
)
</span>
</span>
</div>
<h3><a href={`#tour/${t.id}`} style={{
          "color": "inherit"
        }}>{t.title}</a></h3>
<div className="muted small">
{t.days}
{" kun · "}
{t.days - 1}
{" tun · 4★ mehmonxona"}
</div>
<div className="includes">
<span>
{icon('plane')}
Aviachipta
</span>
<span>
{icon('hotel')}
Mehmonxona
</span>
<span>
{icon('bag')}
Transfer
</span>
</div>
<div className="cardfoot">
<div className="price">
{money(t.price)}
<small>/ kishi</small>
</div>
<a className="btn sm light" href={`#tour/${t.id}`}>Batafsil</a>
</div>
</div>
</article>;
}
export { TourCard };
