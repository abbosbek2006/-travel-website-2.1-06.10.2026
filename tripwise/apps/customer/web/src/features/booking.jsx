import React from "react";
import { session } from "../core/session.js";
import { go } from "../core/navigation.js";
import { state } from "../core/store.js";
import { money } from "../core/format.js";
import { pagehead } from "../components/layout.jsx";
import { icon } from "../components/icons.jsx";
import { empty } from "../components/search.jsx";
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
  return <aside className="panel sticky">
<span className="pill">Demo buyurtma</span>
<h3 style={{
      "marginTop": "18px"
    }}>{session.booking.title}</h3>
<p className="muted small">
{session.booking.dates || state.start + ' — ' + state.end}
{" · "}
{state.people}
{" kishi"}
</p>
<hr className="divider" />
<div className="row">
<span>Asosiy xizmat</span>
<strong>{money(session.booking.base)}</strong>
</div>
<div className="row" style={{
      "marginTop": "10px"
    }}>
<span>Xizmat haqi</span>
<strong>{money(20)}</strong>
</div>
{session.booking.insurance ? <div className="row">
<span>Sug‘urta</span>
<strong>{money(25 * state.people)}</strong>
</div> : ''}
{session.booking.transfer ? <div className="row">
<span>Transfer</span>
<strong>{money(40)}</strong>
</div> : ''}
{session.booking.promo ? <div className="row green">
<span>DEMO20 chegirma</span>
<strong>
−
{money(20)}
</strong>
</div> : ''}
<hr className="divider" />
<div className="row">
<strong>Jami</strong>
<strong className="price">{money(total())}</strong>
</div>
<p className="footnote">Faqat sinov. Pul yechilmaydi, haqiqiy buyurtma yuborilmaydi.</p>
</aside>;
}
function BookingPage() {
  if (!session.booking) return <>{pagehead('Bron qilish')}<div className="panel empty">
<h3>Avval taklif tanlang</h3>
<p className="muted">Tur, aviachipta yoki mehmonxonadan boshlang.</p>
<a className="btn" href="#tours">Tur paketlarni ko‘rish</a>
</div></>;
  return <>{pagehead('Sayohatni bron qilish')}<div className="stepper">{['Sayohatchi', 'Tekshirish', 'To‘lov'].map((s, i) => <div className={`step ${session.booking.step >= i + 1 ? 'active' : ''}`} key={i}>
<b>{i + 1}</b>
{s}
</div>)}</div><div className="detailgrid">
<section className="panel">{session.booking.step === 1 ? <><h2>Sayohatchi ma’lumotlari</h2><p className="muted">Sinash uchun demo ismni ishlatishingiz mumkin.</p><div className="notice" style={{
            "marginBottom": "22px"
          }}>Haqiqiy pasport va karta ma’lumotlarini kiritmang.</div><form id="traveler-form">
<div className="two">
<label className="field">
Asosiy sayohatchi ism-familiyasi
<input name="name" defaultValue={session.booking.name} required={true} minLength="3" maxLength="80" />
</label>
<label className="field">
Email (ixtiyoriy)
<input name="email" type="email" defaultValue={session.booking.email} placeholder="demo@example.com" />
</label>
</div>
<p className="small muted">
{"Qo‘shimcha "}
{Math.max(0, state.people - 1)}
{" sayohatchi demo mehmon sifatida belgilanadi."}
</p>
<button className="btn">Davom etish</button>
</form></> : session.booking.step === 2 ? <><h2>Buyurtmani tekshirish</h2><p className="muted">
{session.booking.name}
{" · "}
{state.people}
{" kishi"}
</p><h3 style={{
            "marginTop": "23px"
          }}>Qo‘shimcha xizmatlar</h3><label className="check">
<input type="checkbox" id="insurance" defaultChecked={session.booking.insurance} />
{"Sug‘urta — "}
{money(25)}
{" / kishi"}
</label><label className="check">
<input type="checkbox" id="transfer" defaultChecked={session.booking.transfer} disabled={session.booking.type === 'tour'} />
{"Aeroport transferi — "}
{session.booking.type === 'tour' ? 'tur narxiga kiritilgan' : money(40)}
</label><div className="row" style={{
            "marginTop": "23px"
          }}>
<input id="promo" className="control" placeholder="Promo-kod: DEMO20" aria-label="Promo-kod" />
<button className="btn light" data-act="promo">Qo‘llash</button>
</div><details open={true}>
<summary>Bekor qilish shartlari</summary>
<p>Bu demo buyurtmani “Safarlarim” bo‘limida bekor qilish mumkin. Haqiqiy bron, to‘lov yoki pul qaytarish sodir bo‘lmaydi.</p>
</details><form id="review-form">
<label className="check">
<input type="checkbox" required={true} />
Sinov buyurtmasi ekanini tushundim.
</label>
<div className="row">
<button type="button" className="btn white" data-act="booking-back">Orqaga</button>
<button className="btn">To‘lovni sinash</button>
</div>
</form></> : <><h2>To‘lovni sinash</h2><p className="muted">To‘lov usulini tanlang va natija ko‘rinishini tekshiring.</p><div className="chips">{['Demo karta', 'Click', 'Payme', 'Uzcard', 'Humo'].map((m, index) => <button className={`chip ${session.booking.method === m ? 'active' : ''}`} data-act="pay-method" data-id={m} key={index}>{m}</button>)}</div><div className="notice" style={{
            "margin": "25px 0"
          }}>
{session.booking.method}
{" integratsiyasi ulanmagan. Karta raqami talab qilinmaydi."}
</div><div className="panel" style={{
            "background": "var(--bg)"
          }}>
<div className="row">
<strong>DEMO KARTA</strong>
{icon('wallet')}
</div>
<p className="price" style={{
              "letterSpacing": "4px"
            }}>•••• •••• •••• 2026</p>
<div className="muted small">DEMO SAYOHATCHI · REAL TO‘LOV EMAS</div>
</div><div className="row" style={{
            "marginTop": "25px"
          }}>
<button className="btn white" data-act="booking-back">Orqaga</button>
<button className="btn" data-act="complete-booking">
{money(total())}
{" · Demo tasdiqlash"}
</button>
</div><button className="textbtn" style={{
            "marginTop": "15px"
          }} data-act="payment-error">To‘lov xatosini sinash</button></>}</section>
{bookingSummary()}
</div></>;
}
export { BookingPage };
function SuccessPage({
  id
}) {
  const b = state.bookings.find(b => b.id === id);
  if (!b) return empty('Buyurtma topilmadi', 'Ushbu brauzerda bunday demo buyurtma yo‘q.');
  return <div className="panel" style={{
    "maxWidth": "720px",
    "margin": "20px auto"
  }}>
<div className="success">
<div className="successmark">{icon('check')}</div>
<h1>Demo buyurtma tayyor!</h1>
<p className="muted">Jarayonni muvaffaqiyatli sinab ko‘rdingiz.</p>
<span className="pill green">Namunaviy bron tasdiqlandi</span>
</div>
<div className="panel">
<div className="row">
<strong>{b.title}</strong>
<span className="pill">{b.id}</span>
</div>
<p className="muted">
{b.dates}
{" · "}
{b.people}
{" kishi"}
</p>
<div className="row">
<span>Jami demo summa</span>
<strong className="price">{money(b.total)}</strong>
</div>
</div>
<div className="notice" style={{
      "margin": "20px 0"
    }}>Pul olinmadi va xizmatlar band qilinmadi. Buyurtma faqat shu brauzer xotirasida saqlandi.</div>
<div className="two">
<button className="btn light" data-act="voucher" data-id={b.id}>
{icon('download')}
Demo vaucherni yuklash
</button>
<a className="btn" href="#trips">Safarlarimga o‘tish</a>
</div>
</div>;
}
export { SuccessPage };
