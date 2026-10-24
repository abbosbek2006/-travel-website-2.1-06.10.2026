import React from "react";
import { empty, filterPanel, filtered, toolbar } from "../components/search.jsx";
import { hotels, imgs } from "../data/catalog.js";
import { state } from "../core/store.js";
import { pagehead } from "../components/layout.jsx";
import { icon } from "../components/icons.jsx";
import { money, nights } from "../core/format.js";
function HotelsPage() {
  let a = filtered(hotels).filter(h => (!state.stars || state.stars === 'any' || h.stars === Number(state.stars)) && (!state.breakfast || h.breakfast));
  return <>{pagehead('Mehmonxonalar', 'Safaringizga mos qulay manzil toping.')}<div className="layout">
{filterPanel('hotels')}
<section>
{toolbar(a.length)}
{a.length ? a.map((h, index) => <article className="card hotelrow" key={index}>
<img src={imgs[h.image]} alt={`${h.city} yo‘nalishi manzarasi`} loading="lazy" />
<div className="cardbody">
<div className="cardmeta">
<span>
{h.city}
{" · Markaziy hudud"}
</span>
<span className="pill">
{h.rating}
{" / 10"}
</span>
</div>
<h3>{h.name}</h3>
<div className="rating">{'★'.repeat(h.stars)}</div>
<div className="includes">
<span>
{icon('wifi')}
Wi-Fi
</span>
<span>{h.breakfast ? 'Nonushta kiritilgan' : 'Nonushta ixtiyoriy'}</span>
</div>
<div className="cardfoot">
<div>
<span className="price">{money(h.price)}</span>
<small className="muted">{" / kecha"}</small>
<div className="small muted">
{money(h.price * nights())}
{" / "}
{nights()}
{" kecha, 1 xona"}
</div>
</div>
<a className="btn sm" href={`#hotel/${h.id}`}>Xonalar</a>
</div>
</div>
</article>) : empty()}
<p className="footnote">Mehmonxona nomlari va reytinglar demo uchun. Suratda xona emas, yo‘nalish manzarasi ko‘rsatilgan.</p>
</section>
</div></>;
}
export { HotelsPage };
function HotelDetailPage({
  id
}) {
  const h = hotels.find(h => h.id === id);
  if (!h) return empty();
  return <>{pagehead(h.name, `${h.city} · ${'★'.repeat(h.stars)} · ${h.rating}/10 namunaviy baho`)}<div className="detailgrid">
<section>
<div className="detailhero"><img src={imgs[h.image]} alt={`${h.city} manzarasi`} /></div>
<div className="notice">Suratda yo‘nalish manzarasi. Mehmonxona va xona ma’lumotlari demo uchun.</div>
<div className="sectionhead"><h2>Qulayliklar</h2></div>
<div className="three">{[['wifi', 'Bepul Wi-Fi'], ['hotel', '24 soat resepshen'], ['bag', 'Bagaj saqlash']].map(([i, t], index) => <div className="fact" key={index}>
{icon(i)}
<strong>{t}</strong>
</div>)}</div>
<div className="sectionhead"><h2>Xona va tarif tanlang</h2></div>
{[['standard', 'Standart xona', h.price, '24 m² · 2 kishilik · bekor qilish mumkin'], ['comfort', 'Komfort xona', h.price + 30, '32 m² · katta yotoq · nonushta kiritilgan']].map(([id, t, p, s], index) => <div className="panel" style={{
          "marginBottom": "15px"
        }} key={index}><div className="row">
<div>
<h3>{t}</h3>
<p className="small muted">{s}</p>
<span className="pill green">Demo: mavjud</span>
</div>
<div style={{
              "textAlign": "right"
            }}>
<div className="price">
{money(p)}
<small>{" / kecha"}</small>
</div>
<small className="muted">
{money(p * nights())}
{" / "}
{nights()}
{" kecha"}
</small>
<p><button className="btn sm" data-act="book-hotel" data-id={h.id} data-room={id}>Tanlash</button></p>
</div>
</div></div>)}
<div className="panel">
<h3>Joylashish qoidalari</h3>
<p className="muted">Kirish: 14:00 dan · Chiqish: 12:00 gacha. Demo tarifda soliqlar kiritilgan.</p>
<details>
<summary>Bekor qilish va qo‘shimcha yotoq</summary>
<p>Namunaviy shart: kirishdan 24 soat oldin bepul bekor qilish. Qo‘shimcha yotoq hamkor orqali alohida tasdiqlanadi.</p>
</details>
</div>
</section>
<aside className="panel sticky">
<h3>Sizning turar joyingiz</h3>
<p>
{state.start}
{" — "}
{state.end}
</p>
<p className="muted">
{nights()}
{" kecha · "}
{state.people}
{" kishi"}
</p>
<label className="field">
Kirish
<input id="hotel-start" type="date" defaultValue={state.start} />
</label>
<label className="field" style={{
          "marginTop": "12px"
        }}>
Chiqish
<input id="hotel-end" type="date" defaultValue={state.end} />
</label>
<button className="btn light full" style={{
          "marginTop": "15px"
        }} data-act="hotel-dates">Sanalarni yangilash</button>
<p className="footnote">1 xona, ko‘pi bilan 2 kishi. Katta guruh uchun demo bron bir nechta xonani avtomatik hisoblaydi.</p>
</aside>
</div></>;
}
export { HotelDetailPage };
