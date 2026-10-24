import { empty, filterPanel, filtered, toolbar } from "../components/search.js";
import { hotels, imgs } from "../data/catalog.js";
import { state } from "../core/store.js";
import { pagehead } from "../components/layout.js";
import { icon } from "../components/icons.js";
import { money, nights } from "../core/format.js";
export function hotelList() {
  let a = filtered(hotels).filter(h => (!state.stars || state.stars === 'any' || h.stars === Number(state.stars)) && (!state.breakfast || h.breakfast));
  return `${pagehead('Mehmonxonalar', 'Safaringizga mos qulay manzil toping.')}<div class="layout">${filterPanel('hotels')}<section>${toolbar(a.length)}${a.length ? a.map(h => `<article class="card hotelrow">
<img src="${imgs[h.image]}" alt="${h.city} yo‘nalishi manzarasi" loading="lazy">
<div class="cardbody">
<div class="cardmeta">
<span>${h.city} · Markaziy hudud</span>
<span class="pill">${h.rating} / 10</span>
</div>
<h3>${h.name}</h3>
<div class="rating">${'★'.repeat(h.stars)}</div>
<div class="includes">
<span>${icon('wifi')}Wi-Fi</span>
<span>${h.breakfast ? 'Nonushta kiritilgan' : 'Nonushta ixtiyoriy'}</span>
</div>
<div class="cardfoot">
<div>
<span class="price">${money(h.price)}</span>
<small class="muted"> / kecha</small>
<div class="small muted">${money(h.price * nights())} / ${nights()} kecha, 1 xona</div>
</div>
<a class="btn sm" href="#hotel/${h.id}">Xonalar</a>
</div>
</div>
</article>`).join('') : empty()}<p class="footnote">Mehmonxona nomlari va reytinglar demo uchun. Suratda xona emas, yo‘nalish manzarasi ko‘rsatilgan.</p>
</section>
</div>`;
}
export function hotelDetail(id) {
  const h = hotels.find(h => h.id === id);
  if (!h) return empty();
  return `${pagehead(h.name, `${h.city} · ${'★'.repeat(h.stars)} · ${h.rating}/10 namunaviy baho`)}<div class="detailgrid">
<section>
<div class="detailhero">
<img src="${imgs[h.image]}" alt="${h.city} manzarasi">
</div>
<div class="notice">Suratda yo‘nalish manzarasi. Mehmonxona va xona ma’lumotlari demo uchun.</div>
<div class="sectionhead">
<h2>Qulayliklar</h2>
</div>
<div class="three">${[['wifi', 'Bepul Wi-Fi'], ['hotel', '24 soat resepshen'], ['bag', 'Bagaj saqlash']].map(([i, t]) => `<div class="fact">${icon(i)}<strong>${t}</strong>
</div>`).join('')}</div>
<div class="sectionhead">
<h2>Xona va tarif tanlang</h2>
</div>${[['standard', 'Standart xona', h.price, '24 m² · 2 kishilik · bekor qilish mumkin'], ['comfort', 'Komfort xona', h.price + 30, '32 m² · katta yotoq · nonushta kiritilgan']].map(([id, t, p, s]) => `<div class="panel" style="margin-bottom:15px">
<div class="row">
<div>
<h3>${t}</h3>
<p class="small muted">${s}</p>
<span class="pill green">Demo: mavjud</span>
</div>
<div style="text-align:right">
<div class="price">${money(p)}<small> / kecha</small>
</div>
<small class="muted">${money(p * nights())} / ${nights()} kecha</small>
<p>
<button class="btn sm" data-act="book-hotel" data-id="${h.id}" data-room="${id}">Tanlash</button>
</p>
</div>
</div>
</div>`).join('')}<div class="panel">
<h3>Joylashish qoidalari</h3>
<p class="muted">Kirish: 14:00 dan · Chiqish: 12:00 gacha. Demo tarifda soliqlar kiritilgan.</p>
<details>
<summary>Bekor qilish va qo‘shimcha yotoq</summary>
<p>Namunaviy shart: kirishdan 24 soat oldin bepul bekor qilish. Qo‘shimcha yotoq hamkor orqali alohida tasdiqlanadi.</p>
</details>
</div>
</section>
<aside class="panel sticky">
<h3>Sizning turar joyingiz</h3>
<p>${state.start} — ${state.end}</p>
<p class="muted">${nights()} kecha · ${state.people} kishi</p>
<label class="field">Kirish<input id="hotel-start" type="date" value="${state.start}">
</label>
<label class="field" style="margin-top:12px">Chiqish<input id="hotel-end" type="date" value="${state.end}">
</label>
<button class="btn light full" style="margin-top:15px" data-act="hotel-dates">Sanalarni yangilash</button>
<p class="footnote">1 xona, ko‘pi bilan 2 kishi. Katta guruh uchun demo bron bir nechta xonani avtomatik hisoblaydi.</p>
</aside>
</div>`;
}
