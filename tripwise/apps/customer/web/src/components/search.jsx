import React from "react";
import { Select } from "./Select.jsx";
import { state } from "../core/store.js";
import { icon } from "./icons.jsx";
import { tours } from "../data/catalog.js";
import { money } from "../core/format.js";
function SearchForm() {
  return <div className="searchbox">
<div className="tabs">
{[['flights', 'plane', 'Aviachiptalar'], ['tours', 'bag', 'Tur paketlar'], ['hotels', 'hotel', 'Mehmonxonalar']].map(([id, i, t], index) => <button className={`tab ${state.tab === id ? 'active' : ''}`} data-act="search-tab" data-id={id} key={index}>
{icon(i)}
{t}
</button>)}
<button className="tab" data-go="planner">
{icon('spark')}
AI reja
</button>
</div>
<form id="search-form" className="searchform">
<label className="field">
Qayerdan?
<Select name="from">
<option selected={state.from === 'Toshkent'}>Toshkent</option>
<option selected={state.from === 'Samarqand'}>Samarqand</option>
</Select>
</label>
<label className="field">
Qayerga?
<Select name="destination">
<option value="all" selected={state.destination === 'all'}>Barcha yo‘nalishlar</option>
<option value="istanbul" selected={state.destination === 'istanbul'}>Istanbul, Turkiya</option>
<option value="dubai" selected={state.destination === 'dubai'}>Dubay, BAA</option>
<option value="thai" selected={state.destination === 'thai'}>Krabi, Tailand</option>
</Select>
</label>
<label className="field">
Ketish sanasi
<input type="date" name="start" defaultValue={state.start} required={true} />
</label>
<label className="field">
Qaytish sanasi
<input type="date" name="end" defaultValue={state.end} min={state.start} required={true} />
</label>
<label className="field">
Sayohatchilar
<Select name="people">{[1, 2, 3, 4, 5, 6].map((n, index) => <option selected={n === state.people} value={n} key={index}>
{n}
{" kishi"}
</option>)}</Select>
</label>
<button className="btn" type="submit">
{icon('search')}
Qidirish
</button>
</form>
</div>;
}
export { SearchForm };
export function opts() {
  return <><option value="all" selected={state.destination === 'all'}>Barcha yo‘nalishlar</option>{tours.map((t, index) => <option value={t.id} selected={state.destination === t.id} key={index}>
{t.city}
{", "}
{t.country}
</option>)}</>;
}
export function filterPanel(kind) {
  return <aside className={`panel filter ${state.filterOpen ? '' : 'collapsed'}`}>
<div className="row">
<h3>Filtrlar</h3>
<button className="textbtn small" data-act="reset-filter">Tozalash</button>
</div>
<form id="filter-form">
<label className="field">
Yo‘nalish
<Select name="destination">{opts()}</Select>
</label>
<label className="field">
{"Eng yuqori narx: "}
<span id="range-label">{money(state.max)}</span>
<input type="range" name="max" min="100" max="1600" step="50" defaultValue={state.max} aria-label="Eng yuqori narx" />
</label>
<label className="field">
Sayohatchilar
<Select name="people">{[1, 2, 3, 4, 5, 6].map((n, index) => <option value={n} selected={n === state.people} key={index}>
{n}
{" kishi"}
</option>)}</Select>
</label>
{kind === 'flights' ? <><label className="check">
<input name="direct" type="checkbox" defaultChecked={state.direct} />
{" Faqat to‘g‘ridan-to‘g‘ri"}
</label><label className="field">
Bagaj
<Select name="baggage">
<option value="any">Barchasi</option>
<option value="checked" selected={state.baggage === 'checked'}>23 kg bagaj bilan</option>
</Select>
</label></> : kind === 'hotels' ? <><label className="field">
Yulduzlar
<Select name="stars">
<option value="any">Barchasi</option>
<option value="4" selected={state.stars === '4'}>4 yulduz</option>
<option value="5" selected={state.stars === '5'}>5 yulduz</option>
</Select>
</label><label className="check">
<input type="checkbox" name="breakfast" defaultChecked={state.breakfast} />
{" Nonushta kiritilgan"}
</label></> : <><label className="field">
Dam olish uslubi
<Select name="style">
<option value="any">Barchasi</option>
{['Madaniyat', 'Shahar', 'Dengiz'].map((s, index) => <option selected={state.style === s} key={index}>{s}</option>)}
</Select>
</label><label className="field">
Davomiyligi
<Select name="duration">
<option value="any">Barchasi</option>
<option value="short" selected={state.duration === 'short'}>7 kungacha</option>
<option value="long" selected={state.duration === 'long'}>8 kun va ko‘proq</option>
</Select>
</label></>}
<button className="btn full" style={{
        "marginTop": "22px"
      }}>Filtrni qo‘llash</button>
</form>
<p className="footnote">Demo katalog. Narxlar bir kishi uchun USDda ko‘rsatilgan. UZS kursi namunaviy.</p>
</aside>;
}
export function empty(title = 'Natija topilmadi', text = 'Filtrlarni o‘zgartiring yoki boshqa yo‘nalishni tanlang.') {
  return <div className="panel empty">
{icon('search')}
<h3>{title}</h3>
<p className="muted">{text}</p>
<button className="btn light" data-act="reset-filter">Filtrlarni tozalash</button>
</div>;
}
export function filtered(arr) {
  let a = arr.filter(t => (state.destination === 'all' || t.id === state.destination) && t.price <= state.max);
  if (state.sort === 'cheap') a.sort((a, b) => a.price - b.price);
  if (state.sort === 'rating') a.sort((a, b) => Number(b.rating) - Number(a.rating));
  return a;
}
export function toolbar(n) {
  return <div className="toolbar">
<strong>
{n}
{" ta taklif topildi"}
</strong>
<button className="btn white sm mobileonly" data-act="filters">
{icon('filter')}
Filtrlar
</button>
<label className="field">
Saralash
<Select id="sort">
<option value="popular" selected={state.sort === 'popular'}>Tavsiya etilgan</option>
<option value="cheap" selected={state.sort === 'cheap'}>Eng arzon</option>
<option value="rating" selected={state.sort === 'rating'}>Eng yuqori baho</option>
</Select>
</label>
</div>;
}
