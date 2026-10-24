import { empty, filterPanel, filtered, toolbar } from "../components/search.js";
import { imgs, tours } from "../data/catalog.js";
import { state } from "../core/store.js";
import { pagehead } from "../components/layout.js";
import { tourCard } from "../components/tour-card.js";
import { icon } from "../components/icons.js";
import { money } from "../core/format.js";
export function tourList() {
  let a = filtered(tours).filter(t => (!state.style || state.style === 'any' || t.style === state.style) && (!state.duration || state.duration === 'any' || (state.duration === 'short' ? t.days <= 7 : t.days >= 8)));
  return `${pagehead('Tur paketlar', 'Parvoz, mehmonxona va taassurotlar — bir sayohatda.')}<div class="layout">${filterPanel('tours')}<section>${toolbar(a.length)}${a.length ? `<div class="resultcards">${a.map(tourCard).join('')}</div>` : empty()}</section>
</div>`;
}
export function itinerary(t) {
  const acts = t.id === 'istanbul' ? ['Yetib kelish va Bosfor bo‘yida sayr', 'Sultonahmad va tarixiy markaz', 'Topkapi atrofi va mahalliy taomlar', 'Galata va Qorako‘y ko‘chalari', 'Osiyo tomoniga parom sayohati', 'Erkin kun va bozorlar', 'Qaytish safariga tayyorgarlik'] : t.id === 'dubai' ? ['Yetib kelish va Marina sayri', 'Shahar markazi va arxitektura', 'Dengiz bo‘yida dam olish', 'Eski shahar va bozorlar', 'Erkin sayohat kuni', 'Qaytish safariga tayyorgarlik'] : ['Yetib kelish va joylashish', 'Sohilda dam olish', 'Orollar bo‘ylab ekskursiya', 'Mahalliy oshxona bilan tanishuv', 'Tabiat qo‘ynida sayr', 'Erkin kun', 'Sohil va esdalik xaridlari', 'Qaytish safariga tayyorgarlik'];
  return acts;
}
export function tourDetail(id) {
  const t = tours.find(t => t.id === id);
  if (!t) return empty('Tur topilmadi', 'Boshqa tur paketini tanlang.');
  return `${pagehead(t.title, `${t.country}, ${t.city} · ★ ${t.rating} · ${t.reviews} ta namunaviy sharh`)}<div class="detailgrid">
<section>
<div class="detailhero">
<img src="${imgs[t.image]}" alt="${t.city}">
</div>
<div class="three">
<div class="fact">${icon('calendar')}<strong>${t.days} kun / ${t.days - 1} tun</strong>
<small>Namunaviy dastur</small>
</div>
<div class="fact">${icon('hotel')}<strong>4★ mehmonxona</strong>
<small>${t.hotel}</small>
</div>
<div class="fact">${icon('shield')}<strong>${t.partner}</strong>
<small>Demo hamkor</small>
</div>
</div>
<div class="sectionhead">
<h2>Sayohat haqida</h2>
</div>
<p class="muted">${t.desc}</p>
<div class="two">
<div class="panel">
<h3>Narxga kiritilgan</h3>
<ul class="list">${['Borish-qaytish aviachiptasi', `${t.days - 1} kecha mehmonxona`, 'Nonushta', 'Aeroport transferi'].map(s => `<li>${icon('check')}${s}</li>`).join('')}</ul>
</div>
<div class="panel">
<h3>Alohida xarajatlar</h3>
<ul class="list">
<li>Viza va sug‘urta (zarur bo‘lsa)</li>
<li>Tushlik va kechki ovqat</li>
<li>Ixtiyoriy ekskursiyalar</li>
<li>Shaxsiy xaridlar</li>
</ul>
</div>
</div>
<div class="sectionhead">
<h2>Kunlik dastur</h2>
</div>
<div class="panel">${itinerary(t).map((a, i) => `<details ${i === 0 ? 'open' : ''}>
<summary>${i + 1}-kun · ${a}</summary>
<p>09:00 — Nonushta. 10:00 — ${a}. 13:00 — Tushlik uchun tanaffus. Kechki payt erkin vaqt. Bu sinov dasturi; aniq vaqtlar hamkor tomonidan tasdiqlanadi.</p>
</details>`).join('')}</div>
<div class="sectionhead">
<h2>Shartlar va sharhlar</h2>
</div>
<div class="panel">
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
<aside class="panel sticky">
<span class="pill">Tur paketi</span>
<p class="price">${money(t.price)} <small>/ kishi</small>
</p>
<label class="field">Boshlanish sanasi<input id="tour-date" type="date" value="${state.start}">
</label>
<label class="field" style="margin-top:14px">Sayohatchilar<select id="detail-people">${[1, 2, 3, 4, 5, 6].map(n => `<option value="${n}" ${n === state.people ? 'selected' : ''}>${n} kishi</option>`).join('')}</select>
</label>
<hr class="divider">
<div class="row">
<span>Jami</span>
<strong class="price">${money(t.price * state.people)}</strong>
</div>
<p class="small muted">Xizmat haqi keyingi qadamda alohida ko‘rsatiladi.</p>
<button class="btn full" data-act="book-tour" data-id="${t.id}">Bron qilishni sinash</button>
<button class="btn light full" style="margin-top:10px" data-go="guide/${t.id}">${icon('globe')}Shahar qo‘llanmasi</button>
<button class="textbtn full" data-act="favorite" data-id="${t.id}">${icon('heart')}Saqlash</button>
</aside>
</div>`;
}
