import { state } from "../core/store.js";
import { pagehead } from "../components/layout.js";
import { tours } from "../data/catalog.js";
import { icon } from "../components/icons.js";
import { itinerary } from "../pages/tours.js";
import { esc } from "../core/dom.js";
import { session } from "../core/session.js";
import { money } from "../core/format.js";
export function planner() {
  const selected = state.destination === 'all' ? 'istanbul' : state.destination;
  return `${pagehead('Sayohatingizni birga rejalaymiz', 'Manzil va istaklaringiz asosida namunaviy marshrut.')}<div class="detailgrid">
<form id="planner-form" class="panel">
<div class="notice" style="margin-bottom:23px">AI demo: tayyor qoidalar asosida reja tuziladi. Jonli AI xizmati hali ulanmagan.</div>
<div class="two">
<label class="field">Manzil<select name="city">${tours.map(t => `<option value="${t.id}" ${t.id === selected ? 'selected' : ''}>${t.city}, ${t.country}</option>`).join('')}</select>
</label>
<label class="field">Davomiylik<select name="days">${[3, 5, 7, 10].map(n => `<option value="${n}" ${n === 7 ? 'selected' : ''}>${n} kun</option>`).join('')}</select>
</label>
<label class="field">Jami budjet (USD)<input name="budget" type="number" min="300" max="50000" step="50" value="1500" required>
</label>
<label class="field">Sayohatchilar<input name="people" type="number" min="1" max="10" value="${state.people}" required>
</label>
</div>
<h3 style="margin-top:25px">Nimalarga qiziqasiz?</h3>
<div class="chips">${['Madaniyat', 'Taomlar', 'Tabiat', 'Xaridlar', 'Oila bilan'].map((s, i) => `<label class="check">
<input type="checkbox" name="interest" value="${s}" ${i === 0 ? 'checked' : ''}>${s}</label>`).join('')}</div>
<label class="field" style="margin:20px 0">Sayohat sur’ati<select name="pace">
<option>Sokin</option>
<option selected>Muvozanatli</option>
<option>Faol</option>
</select>
</label>
<button class="btn full">${icon('spark')}Reja yaratish</button>
</form>
<aside class="panel sticky">
<span class="pill">Sizga mos</span>
<h2 style="margin:17px 0">Har bir kunning<br>o‘z hikoyasi bor.</h2>
<p class="muted">Kunlik marshrut, xarajatlar taqsimoti va mos tur takliflarini bir joyda ko‘ring.</p>
<ul class="list">
<li>${icon('check')}Budjetga mos hisob</li>
<li>${icon('check')}O‘zgartiriladigan faoliyatlar</li>
<li>${icon('check')}Qurilmangizga saqlanadigan reja</li>
</ul>
<a class="textbtn" href="#ai">Yordamchi bilan suhbat</a>
</aside>
</div>`;
}
export function plan() {
  if (!state.plan) return planner();
  const p = state.plan,
    t = tours.find(t => t.id === p.city);
  const cats = [['Aviachiptalar', .4], ['Turar joy', .28], ['Ovqatlanish', .14], ['Transport', .06], ['Sayrlar', .08], ['Zaxira', .04]];
  const activities = itinerary(t);
  return `${pagehead(`${t.city}: ${p.days} kunlik rejangiz`, `${p.people} kishi · ${esc(p.pace)} · ${esc(p.interests.join(', ') || 'Erkin sayohat')}`)}<div class="detailgrid">
<section class="panel">
<div class="row">
<h2>Kunlik marshrut</h2>
<a class="btn white sm" href="#planner">${icon('edit')}O‘zgartirish</a>
</div>
<div class="tabs" style="margin-top:15px">${Array.from({
    length: p.days
  }, (_, i) => `<button class="tab ${session.selectedDay === i + 1 ? 'active' : ''}" data-act="day" data-id="${i + 1}">${i + 1}-kun</button>`).join('')}</div>
<h3>${activities[(session.selectedDay - 1) % activities.length]}</h3>
<div class="timeline">${[['09:00', 'Nonushta va kunni rejalash', 'Mehmonxona yaqinida, shoshilmasdan.'], ['10:00', p.replaced?.[session.selectedDay] ? 'Mahalliy bog‘ va sokin sayr' : activities[(session.selectedDay - 1) % activities.length], p.pace === 'Faol' ? '3–4 soat faol tanishuv.' : '1–2 soat, tanaffuslar bilan.'], ['13:00', p.interests.includes('Taomlar') ? 'Mahalliy taomlarni tatib ko‘rish' : 'Tushlik va dam olish', 'Budjetdan alohida ulush ajrating.'], ['15:00', p.interests.includes('Oila bilan') ? 'Oila uchun yengil sayr' : 'Erkin sayr va yangi joylar', 'Yo‘l vaqtini ham hisobga oling.'], ['19:00', 'Mehmonxonaga qaytish', 'Keyingi kun uchun tayyorgarlik.']].map(([time, title, desc]) => `<div class="timeline-item">
<small>${time}</small>
<h3 style="margin:5px 0">${esc(title)}</h3>
<p>${desc}</p>
</div>`).join('')}</div>
<button class="btn light" data-act="replace-activity">${icon('edit')}Asosiy faoliyatni almashtirish</button>
<div class="notice" style="margin-top:23px">Bu namunaviy reja. Masofa, ish vaqti va mavjudlik jonli tekshirilmagan.</div>
</section>
<aside class="panel sticky">
<h3>Reja budjeti</h3>
<div class="price">${money(p.budget)}</div>
<p class="muted small">${p.people} kishi uchun jami taxmin</p>${cats.map(([n, r]) => `<div style="margin:17px 0">
<div class="row small">
<span>${n}</span>
<strong>${money(p.budget * r)}</strong>
</div>
<div class="progress" style="margin-top:7px">
<span style="width:${r * 200}%">
</span>
</div>
</div>`).join('')}<button class="btn full" data-act="download-plan">${icon('download')}Rejani yuklab olish</button>
<button class="btn light full" style="margin-top:10px" data-act="matching-tours" data-id="${t.id}">Mos turlarni ko‘rish</button>
<p class="footnote">Reja faqat shu brauzerda saqlanadi.</p>
</aside>
</div>`;
}
