import { state } from "../core/store.js";
import { icon } from "./icons.js";
import { tours } from "../data/catalog.js";
import { money } from "../core/format.js";
export function searchForm() {
  return `<div class="searchbox">
<div class="tabs">${[['flights', 'plane', 'Aviachiptalar'], ['tours', 'bag', 'Tur paketlar'], ['hotels', 'hotel', 'Mehmonxonalar']].map(([id, i, t]) => `<button class="tab ${state.tab === id ? 'active' : ''}" data-act="search-tab" data-id="${id}">${icon(i)}${t}</button>`).join('')}<button class="tab" data-go="planner">${icon('spark')}AI reja</button>
</div>
<form id="search-form" class="searchform">
<label class="field">Qayerdan?<select name="from">
<option ${state.from === 'Toshkent' ? 'selected' : ''}>Toshkent</option>
<option ${state.from === 'Samarqand' ? 'selected' : ''}>Samarqand</option>
</select>
</label>
<label class="field">Qayerga?<select name="destination">
<option value="all" ${state.destination === 'all' ? 'selected' : ''}>Barcha yo‘nalishlar</option>
<option value="istanbul" ${state.destination === 'istanbul' ? 'selected' : ''}>Istanbul, Turkiya</option>
<option value="dubai" ${state.destination === 'dubai' ? 'selected' : ''}>Dubay, BAA</option>
<option value="thai" ${state.destination === 'thai' ? 'selected' : ''}>Krabi, Tailand</option>
</select>
</label>
<label class="field">Ketish sanasi<input type="date" name="start" value="${state.start}" required>
</label>
<label class="field">Qaytish sanasi<input type="date" name="end" value="${state.end}" min="${state.start}" required>
</label>
<label class="field">Sayohatchilar<select name="people">${[1, 2, 3, 4, 5, 6].map(n => `<option ${n === state.people ? 'selected' : ''} value="${n}">${n} kishi</option>`).join('')}</select>
</label>
<button class="btn" type="submit">${icon('search')}Qidirish</button>
</form>
</div>`;
}
export function opts() {
  return `<option value="all" ${state.destination === 'all' ? 'selected' : ''}>Barcha yo‘nalishlar</option>${tours.map(t => `<option value="${t.id}" ${state.destination === t.id ? 'selected' : ''}>${t.city}, ${t.country}</option>`).join('')}`;
}
export function filterPanel(kind) {
  return `<aside class="panel filter ${state.filterOpen ? '' : 'collapsed'}">
<div class="row">
<h3>Filtrlar</h3>
<button class="textbtn small" data-act="reset-filter">Tozalash</button>
</div>
<form id="filter-form">
<label class="field">Yo‘nalish<select name="destination">${opts()}</select>
</label>
<label class="field">Eng yuqori narx: <span id="range-label">${money(state.max)}</span>
<input type="range" name="max" min="100" max="1600" step="50" value="${state.max}" aria-label="Eng yuqori narx">
</label>
<label class="field">Sayohatchilar<select name="people">${[1, 2, 3, 4, 5, 6].map(n => `<option value="${n}" ${n === state.people ? 'selected' : ''}>${n} kishi</option>`).join('')}</select>
</label>${kind === 'flights' ? `<label class="check">
<input name="direct" type="checkbox" ${state.direct ? 'checked' : ''}> Faqat to‘g‘ridan-to‘g‘ri</label>
<label class="field">Bagaj<select name="baggage">
<option value="any">Barchasi</option>
<option value="checked" ${state.baggage === 'checked' ? 'selected' : ''}>23 kg bagaj bilan</option>
</select>
</label>` : kind === 'hotels' ? `<label class="field">Yulduzlar<select name="stars">
<option value="any">Barchasi</option>
<option value="4" ${state.stars === '4' ? 'selected' : ''}>4 yulduz</option>
<option value="5" ${state.stars === '5' ? 'selected' : ''}>5 yulduz</option>
</select>
</label>
<label class="check">
<input type="checkbox" name="breakfast" ${state.breakfast ? 'checked' : ''}> Nonushta kiritilgan</label>` : `<label class="field">Dam olish uslubi<select name="style">
<option value="any">Barchasi</option>${['Madaniyat', 'Shahar', 'Dengiz'].map(s => `<option ${state.style === s ? 'selected' : ''}>${s}</option>`).join('')}</select>
</label>
<label class="field">Davomiyligi<select name="duration">
<option value="any">Barchasi</option>
<option value="short" ${state.duration === 'short' ? 'selected' : ''}>7 kungacha</option>
<option value="long" ${state.duration === 'long' ? 'selected' : ''}>8 kun va ko‘proq</option>
</select>
</label>`}<button class="btn full" style="margin-top:22px">Filtrni qo‘llash</button>
</form>
<p class="footnote">Demo katalog. Narxlar bir kishi uchun USDda ko‘rsatilgan. UZS kursi namunaviy.</p>
</aside>`;
}
export function empty(title = 'Natija topilmadi', text = 'Filtrlarni o‘zgartiring yoki boshqa yo‘nalishni tanlang.') {
  return `<div class="panel empty">${icon('search')}<h3>${title}</h3>
<p class="muted">${text}</p>
<button class="btn light" data-act="reset-filter">Filtrlarni tozalash</button>
</div>`;
}
export function filtered(arr) {
  let a = arr.filter(t => (state.destination === 'all' || t.id === state.destination) && t.price <= state.max);
  if (state.sort === 'cheap') a.sort((a, b) => a.price - b.price);
  if (state.sort === 'rating') a.sort((a, b) => Number(b.rating) - Number(a.rating));
  return a;
}
export function toolbar(n) {
  return `<div class="toolbar">
<strong>${n} ta taklif topildi</strong>
<button class="btn white sm mobileonly" data-act="filters">${icon('filter')}Filtrlar</button>
<label class="field">Saralash<select id="sort">
<option value="popular" ${state.sort === 'popular' ? 'selected' : ''}>Tavsiya etilgan</option>
<option value="cheap" ${state.sort === 'cheap' ? 'selected' : ''}>Eng arzon</option>
<option value="rating" ${state.sort === 'rating' ? 'selected' : ''}>Eng yuqori baho</option>
</select>
</label>
</div>`;
}
