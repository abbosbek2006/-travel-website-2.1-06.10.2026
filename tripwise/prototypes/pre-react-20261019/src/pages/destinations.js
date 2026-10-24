import { pagehead } from "../components/layout.js";
import { imgs, tours } from "../data/catalog.js";
import { session } from "../core/session.js";
import { icon } from "../components/icons.js";
import { money } from "../core/format.js";
import { state } from "../core/store.js";
import { memoryGallery } from "../features/memories.js";
export function destinations() {
  return `${pagehead('Yo‘nalishlarni kashf eting', 'Madaniyat, shahar hayoti yoki dengiz bo‘yida dam olish.')}<div class="cards">${tours.map(t => `<article class="card">
<div class="cardimage">
<img src="${imgs[t.image]}" alt="${t.city}">
</div>
<div class="cardbody">
<span class="pill">${t.country}</span>
<h2 style="margin:15px 0">${t.city}</h2>
<p class="muted">${t.desc}</p>
<a class="btn light" href="#guide/${t.id}">Qo‘llanmani ochish</a>
</div>
</article>`).join('')}</div>`;
}
export function guideContent(id) {
  const t = tours.find(t => t.id === id) || tours[0];
  const info = {
    istanbul: ['Turk lirasi · TRY', 'Turk tili', 'UTC+3', 'Bosfor, Galata, Sultonahmad'],
    dubai: ['Dirham · AED', 'Arab tili', 'UTC+4', 'Marina, eski shahar, sohil'],
    thai: ['Tailand bati · THB', 'Tay tili', 'UTC+7', 'Sohillar, orollar, tabiat']
  }[t.id];
  return `${pagehead(`${t.city}, ${t.country}`, 'Safardan oldin bilish foydali bo‘lgan ma’lumotlar.')}<div class="detailhero">
<img src="${imgs[t.image]}" alt="${t.city}">
</div>
<div class="tabs">${[['overview', 'Umumiy'], ['places', 'Joylar'], ['transport', 'Transport va budjet'], ['checklist', 'Safarga tayyorgarlik']].map(([id, n]) => `<button class="tab ${session.guideTab === id ? 'active' : ''}" data-act="guide-tab" data-id="${id}">${n}</button>`).join('')}</div>${session.guideTab === 'overview' ? `<div class="three">${info.slice(0, 3).map((v, i) => `<div class="fact">${icon(['wallet', 'globe', 'clock'][i])}<strong>${v}</strong>
<small>${['Pul birligi', 'Mahalliy til', 'Vaqt mintaqasi'][i]}</small>
</div>`).join('')}</div>
<div class="sectionhead">
<h2>${t.city} haqida</h2>
</div>
<p>${t.desc}</p>
<div class="two">
<div class="panel">
<h3>Sayohat ritmi</h3>
<p class="muted">Asosiy joylarga ertalab boring. Kun davomida dam olish uchun tanaffus qoldiring va transport vaqtini rejangizga qo‘shing.</p>
</div>
<div class="panel">
<h3>Mahalliy madaniyat</h3>
<p class="muted">Tarixiy va diniy joylardagi kiyinish hamda suratga olish qoidalariga amal qiling. Xizmat narxini oldindan aniqlang.</p>
</div>
</div>` : session.guideTab === 'places' ? `<div class="three">${info[3].split(', ').map((p, i) => `<div class="panel">
<span class="pill">0${i + 1}</span>
<h3 style="margin-top:16px">${p}</h3>
<p class="muted">Sayr va tanishish uchun namunaviy yo‘nalish. Ish vaqti va kirish narxini tashrifdan oldin tekshiring.</p>
<a class="btn light sm" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p + ' ' + t.city)}" target="_blank" rel="noopener">${icon('map')}Xaritada ko‘rish</a>
</div>`).join('')}</div>` : session.guideTab === 'transport' ? `<div class="two">
<div class="panel">
<h3>Transport variantlari</h3>
<ul class="list">
<li>${icon('check')}Jamoat transporti — tejamkor tanlov</li>
<li>${icon('check')}Rasmiy taksi — manzilgacha qulay</li>
<li>${icon('check')}Oldindan kelishilgan transfer</li>
</ul>
<p class="footnote">Narx va qatnov vaqtlarini xizmatning rasmiy sahifasida tekshiring.</p>
</div>
<div class="panel">
<h3>Namunaviy kunlik budjet</h3>${[['Ovqatlanish', 25], ['Transport', 10], ['Sayr va kirish chiptalari', 20]].map(([n, p]) => `<div class="row" style="margin:17px 0">
<span>${n}</span>
<strong>${money(p)}</strong>
</div>`).join('')}<div class="notice">Bir kishi uchun taxminiy demo hisob. Mehmonxona kiritilmagan.</div>
</div>
</div>` : `<div class="panel">
<h3>Safar ro‘yxati</h3>${['Pasport va safar hujjatlari', 'Viza hamda kirish qoidalarini rasmiy manbadan tekshirish', 'Sug‘urta variantlarini ko‘rib chiqish', 'Aviachipta va mehmonxona vaucheri', 'Internet yoki eSIM', 'Aeroportdan manzilgacha transport', 'Muhim kontaktlar va oflayn nusxalar'].map((s, i) => `<label class="check">
<input type="checkbox" data-check="${t.id}-${i}" ${(state.checks || []).includes(t.id + '-' + i) ? 'checked' : ''}>${s}</label>`).join('')}<div class="notice warn">Viza va kirish talablari bu demoda tasdiqlanmaydi. Safar oldidan konsullik va tashuvchi ma’lumotlarini tekshiring.</div>
</div>`}<section class="ai-banner">
<div class="aibadge">${icon('spark')}</div>
<div>
<h3>${t.city} uchun shaxsiy reja</h3>
<p>Qiziqishlaringizga mos kunlik dastur tuzing.</p>
</div>
<button class="btn" data-act="plan-city" data-id="${t.id}">Reja tuzish</button>
</section>`;
}
export function guide(id) {
  if (!tours.some(tour => tour.id === id)) return `<section class="panel empty"><h1>Yo‘nalish topilmadi</h1><a class="btn" href="#destinations">Yo‘nalishlarni ko‘rish</a></section>`;
  return guideContent(id) + memoryGallery(id);
}
