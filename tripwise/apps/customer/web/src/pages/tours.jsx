import React from "react";
import { Select } from "../components/Select.jsx";
import { empty, filterPanel, filtered, toolbar } from "../components/search.jsx";
import { imgs, tours } from "../data/catalog.js";
import { state } from "../core/store.js";
import { pagehead } from "../components/layout.jsx";
import { TourCard } from "../components/tour-card.jsx";
import { icon } from "../components/icons.jsx";
import { money } from "../core/format.js";
function ToursPage() {
  let a = filtered(tours).filter(t => (!state.style || state.style === 'any' || t.style === state.style) && (!state.duration || state.duration === 'any' || (state.duration === 'short' ? t.days <= 7 : t.days >= 8)));
  return <>{pagehead('Tur paketlar', 'Parvoz, mehmonxona va taassurotlar — bir sayohatda.')}<div className="layout">
{filterPanel('tours')}
<section>
{toolbar(a.length)}
{a.length ? <div className="resultcards">{a.map(tour => <TourCard key={tour.id} tour={tour} />)}</div> : empty()}
</section>
</div></>;
}
export { ToursPage };
export function itinerary(t) {
  const acts = t.id === 'istanbul' ? ['Yetib kelish va Bosfor bo‘yida sayr', 'Sultonahmad va tarixiy markaz', 'Topkapi atrofi va mahalliy taomlar', 'Galata va Qorako‘y ko‘chalari', 'Osiyo tomoniga parom sayohati', 'Erkin kun va bozorlar', 'Qaytish safariga tayyorgarlik'] : t.id === 'dubai' ? ['Yetib kelish va Marina sayri', 'Shahar markazi va arxitektura', 'Dengiz bo‘yida dam olish', 'Eski shahar va bozorlar', 'Erkin sayohat kuni', 'Qaytish safariga tayyorgarlik'] : ['Yetib kelish va joylashish', 'Sohilda dam olish', 'Orollar bo‘ylab ekskursiya', 'Mahalliy oshxona bilan tanishuv', 'Tabiat qo‘ynida sayr', 'Erkin kun', 'Sohil va esdalik xaridlari', 'Qaytish safariga tayyorgarlik'];
  return acts;
}
function TourDetailPage({
  id
}) {
  const t = tours.find(t => t.id === id);
  if (!t) return empty('Tur topilmadi', 'Boshqa tur paketini tanlang.');
  return <>{pagehead(t.title, `${t.country}, ${t.city} · ★ ${t.rating} · ${t.reviews} ta namunaviy sharh`)}<div className="detailgrid">
<section>
<div className="detailhero"><img src={imgs[t.image]} alt={t.city} /></div>
<div className="three">
<div className="fact">
{icon('calendar')}
<strong>
{t.days}
{" kun / "}
{t.days - 1}
{" tun"}
</strong>
<small>Namunaviy dastur</small>
</div>
<div className="fact">
{icon('hotel')}
<strong>4★ mehmonxona</strong>
<small>{t.hotel}</small>
</div>
<div className="fact">
{icon('shield')}
<strong>{t.partner}</strong>
<small>Demo hamkor</small>
</div>
</div>
<div className="sectionhead"><h2>Sayohat haqida</h2></div>
<p className="muted">{t.desc}</p>
<div className="two">
<div className="panel">
<h3>Narxga kiritilgan</h3>
<ul className="list">{['Borish-qaytish aviachiptasi', `${t.days - 1} kecha mehmonxona`, 'Nonushta', 'Aeroport transferi'].map((s, index) => <li key={index}>
{icon('check')}
{s}
</li>)}</ul>
</div>
<div className="panel">
<h3>Alohida xarajatlar</h3>
<ul className="list">
<li>Viza va sug‘urta (zarur bo‘lsa)</li>
<li>Tushlik va kechki ovqat</li>
<li>Ixtiyoriy ekskursiyalar</li>
<li>Shaxsiy xaridlar</li>
</ul>
</div>
</div>
<div className="sectionhead"><h2>Kunlik dastur</h2></div>
<div className="panel">{itinerary(t).map((a, i) => <details open={i === 0} key={i}>
<summary>
{i + 1}
{"-kun · "}
{a}
</summary>
<p>
{"09:00 — Nonushta. 10:00 — "}
{a}
. 13:00 — Tushlik uchun tanaffus. Kechki payt erkin vaqt. Bu sinov dasturi; aniq vaqtlar hamkor tomonidan tasdiqlanadi.
</p>
</details>)}</div>
<div className="sectionhead"><h2>Shartlar va sharhlar</h2></div>
<div className="panel">
<details>
<summary>Bekor qilish shartlari</summary>
<p>Demo sharti: safarga 7 kun qolgunga qadar bekor qilish mumkin. Haqiqiy tarif shartlari yakuniy shartnomada ko‘rsatiladi.</p>
</details>
<details>
<summary>Joylashish va hujjatlar</summary>
<p>Standart ikki kishilik xona. Ism-familiya pasport bilan mos kelishi lozim. Kirish va viza qoidalarini rasmiy manbadan tekshiring.</p>
</details>
<details>
<summary>Namunaviy sharh · 5/5</summary>
<p>“Marshrut tushunarli va dam olish uchun yetarli vaqt bor.” — Demo sayohatchi.</p>
</details>
</div>
</section>
<aside className="panel sticky">
<span className="pill">Tur paketi</span>
<p className="price">
{money(t.price)}
<small>/ kishi</small>
</p>
<label className="field">
Boshlanish sanasi
<input id="tour-date" type="date" defaultValue={state.start} />
</label>
<label className="field" style={{
          "marginTop": "14px"
        }}>
Sayohatchilar
<Select id="detail-people">{[1, 2, 3, 4, 5, 6].map((n, index) => <option value={n} selected={n === state.people} key={index}>
{n}
{" kishi"}
</option>)}</Select>
</label>
<hr className="divider" />
<div className="row">
<span>Jami</span>
<strong className="price">{money(t.price * state.people)}</strong>
</div>
<p className="small muted">Xizmat haqi keyingi qadamda alohida ko‘rsatiladi.</p>
<button className="btn full" data-act="book-tour" data-id={t.id}>Bron qilishni sinash</button>
<button className="btn light full" style={{
          "marginTop": "10px"
        }} data-go={`guide/${t.id}`}>
{icon('globe')}
Shahar qo‘llanmasi
</button>
<button className="textbtn full" data-act="favorite" data-id={t.id}>
{icon('heart')}
Saqlash
</button>
</aside>
</div></>;
}
export { TourDetailPage };
