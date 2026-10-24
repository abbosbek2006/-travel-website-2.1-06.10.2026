import { session } from "../core/session.js";
import { go } from "../core/navigation.js";
import { state } from "../core/store.js";
import { esc } from "../core/dom.js";
import { money } from "../core/format.js";
import { pagehead } from "../components/layout.js";
import { icon } from "../components/icons.js";
import { empty } from "../components/search.js";
export function beginBooking(item) {
  session.booking = {
    ...item,
    step: 1,
    name: 'Demo Sayohatchi',
    email: '',
    insurance: false,
    transfer: false,
    promo: false,
    method: 'Demo karta'
  };
  go('booking');
}
export const total = () => session.booking ? session.booking.base + 20 + (session.booking.insurance ? 25 * state.people : 0) + (session.booking.transfer ? 40 : 0) - (session.booking.promo ? 20 : 0) : 0;
export function bookingSummary() {
  return `<aside class="panel sticky">
<span class="pill">Demo buyurtma</span>
<h3 style="margin-top:18px">${esc(session.booking.title)}</h3>
<p class="muted small">${esc(session.booking.dates || state.start + ' — ' + state.end)} · ${state.people} kishi</p>
<hr class="divider">
<div class="row">
<span>Asosiy xizmat</span>
<strong>${money(session.booking.base)}</strong>
</div>
<div class="row" style="margin-top:10px">
<span>Xizmat haqi</span>
<strong>${money(20)}</strong>
</div>${session.booking.insurance ? `<div class="row">
<span>Sug‘urta</span>
<strong>${money(25 * state.people)}</strong>
</div>` : ''}${session.booking.transfer ? `<div class="row">
<span>Transfer</span>
<strong>${money(40)}</strong>
</div>` : ''}${session.booking.promo ? `<div class="row green">
<span>DEMO20 chegirma</span>
<strong>−${money(20)}</strong>
</div>` : ''}<hr class="divider">
<div class="row">
<strong>Jami</strong>
<strong class="price">${money(total())}</strong>
</div>
<p class="footnote">Faqat sinov. Pul yechilmaydi, haqiqiy buyurtma yuborilmaydi.</p>
</aside>`;
}
export function bookingPage() {
  if (!session.booking) return `${pagehead('Bron qilish')}<div class="panel empty">
<h3>Avval taklif tanlang</h3>
<p class="muted">Tur, aviachipta yoki mehmonxonadan boshlang.</p>
<a class="btn" href="#tours">Tur paketlarni ko‘rish</a>
</div>`;
  return `${pagehead('Sayohatni bron qilish')}<div class="stepper">${['Sayohatchi', 'Tekshirish', 'To‘lov'].map((s, i) => `<div class="step ${session.booking.step >= i + 1 ? 'active' : ''}">
<b>${i + 1}</b>${s}</div>`).join('')}</div>
<div class="detailgrid">
<section class="panel">${session.booking.step === 1 ? `<h2>Sayohatchi ma’lumotlari</h2>
<p class="muted">Sinash uchun demo ismni ishlatishingiz mumkin.</p>
<div class="notice" style="margin-bottom:22px">Haqiqiy pasport va karta ma’lumotlarini kiritmang.</div>
<form id="traveler-form">
<div class="two">
<label class="field">Asosiy sayohatchi ism-familiyasi<input name="name" value="${esc(session.booking.name)}" required minlength="3" maxlength="80">
</label>
<label class="field">Email (ixtiyoriy)<input name="email" type="email" value="${esc(session.booking.email)}" placeholder="demo@example.com">
</label>
</div>
<p class="small muted">Qo‘shimcha ${Math.max(0, state.people - 1)} sayohatchi demo mehmon sifatida belgilanadi.</p>
<button class="btn">Davom etish</button>
</form>` : session.booking.step === 2 ? `<h2>Buyurtmani tekshirish</h2>
<p class="muted">${esc(session.booking.name)} · ${state.people} kishi</p>
<h3 style="margin-top:23px">Qo‘shimcha xizmatlar</h3>
<label class="check">
<input type="checkbox" id="insurance" ${session.booking.insurance ? 'checked' : ''}>Sug‘urta — ${money(25)} / kishi</label>
<label class="check">
<input type="checkbox" id="transfer" ${session.booking.transfer ? 'checked' : ''} ${session.booking.type === 'tour' ? 'disabled' : ''}>Aeroport transferi — ${session.booking.type === 'tour' ? 'tur narxiga kiritilgan' : money(40)}</label>
<div class="row" style="margin-top:23px">
<input id="promo" class="control" placeholder="Promo-kod: DEMO20" aria-label="Promo-kod">
<button class="btn light" data-act="promo">Qo‘llash</button>
</div>
<details open>
<summary>Bekor qilish shartlari</summary>
<p>Bu demo buyurtmani “Safarlarim” bo‘limida bekor qilish mumkin. Haqiqiy bron, to‘lov yoki pul qaytarish sodir bo‘lmaydi.</p>
</details>
<form id="review-form">
<label class="check">
<input type="checkbox" required>Sinov buyurtmasi ekanini tushundim.</label>
<div class="row">
<button type="button" class="btn white" data-act="booking-back">Orqaga</button>
<button class="btn">To‘lovni sinash</button>
</div>
</form>` : `<h2>To‘lovni sinash</h2>
<p class="muted">To‘lov usulini tanlang va natija ko‘rinishini tekshiring.</p>
<div class="chips">${['Demo karta', 'Click', 'Payme', 'Uzcard', 'Humo'].map(m => `<button class="chip ${session.booking.method === m ? 'active' : ''}" data-act="pay-method" data-id="${m}">${m}</button>`).join('')}</div>
<div class="notice" style="margin:25px 0">${esc(session.booking.method)} integratsiyasi ulanmagan. Karta raqami talab qilinmaydi.</div>
<div class="panel" style="background:var(--bg)">
<div class="row">
<strong>DEMO KARTA</strong>${icon('wallet')}</div>
<p class="price" style="letter-spacing:4px">•••• •••• •••• 2026</p>
<div class="muted small">DEMO SAYOHATCHI · REAL TO‘LOV EMAS</div>
</div>
<div class="row" style="margin-top:25px">
<button class="btn white" data-act="booking-back">Orqaga</button>
<button class="btn" data-act="complete-booking">${money(total())} · Demo tasdiqlash</button>
</div>
<button class="textbtn" style="margin-top:15px" data-act="payment-error">To‘lov xatosini sinash</button>`}</section>${bookingSummary()}</div>`;
}
export function successPage(id) {
  const b = state.bookings.find(b => b.id === id);
  if (!b) return empty('Buyurtma topilmadi', 'Ushbu brauzerda bunday demo buyurtma yo‘q.');
  return `<div class="panel" style="max-width:720px;margin:20px auto">
<div class="success">
<div class="successmark">${icon('check')}</div>
<h1>Demo buyurtma tayyor!</h1>
<p class="muted">Jarayonni muvaffaqiyatli sinab ko‘rdingiz.</p>
<span class="pill green">Namunaviy bron tasdiqlandi</span>
</div>
<div class="panel">
<div class="row">
<strong>${esc(b.title)}</strong>
<span class="pill">${b.id}</span>
</div>
<p class="muted">${b.dates} · ${b.people} kishi</p>
<div class="row">
<span>Jami demo summa</span>
<strong class="price">${money(b.total)}</strong>
</div>
</div>
<div class="notice" style="margin:20px 0">Pul olinmadi va xizmatlar band qilinmadi. Buyurtma faqat shu brauzer xotirasida saqlandi.</div>
<div class="two">
<button class="btn light" data-act="voucher" data-id="${b.id}">${icon('download')}Demo vaucherni yuklash</button>
<a class="btn" href="#trips">Safarlarimga o‘tish</a>
</div>
</div>`;
}
