import React from "react";
import { closeModal, confirmAction, modal } from "../components/dialog.jsx";
import { session } from "../core/session.js";
import { icon } from "../components/icons.jsx";
import { state } from "../core/store.js";
import { $, toast } from "../core/dom.js";
import { render } from "../core/navigation.js";
import { flights, tours } from "../data/catalog.js";
import { money } from "../core/format.js";
import { go } from "../core/navigation.js";
export const interfaceActions = {
  "close": (el, id) => {
    closeModal();
  },
  "confirm": (el, id) => {
    const run = session.pending;
    session.pending = null;
    closeModal();
    run?.();
  },
  "menu": (el, id) => {
    modal('Barcha bo‘limlar', <div className="sidemenu">{[['home', 'home', 'Bosh sahifa'], ['flights', 'plane', 'Aviachiptalar'], ['tours', 'bag', 'Tur paketlar'], ['hotels', 'hotel', 'Mehmonxonalar'], ['destinations', 'globe', 'Yo‘nalishlar'], ['ai', 'spark', 'AI yordamchi'], ['planner', 'calendar', 'Reja tuzish'], ['trips', 'bag', 'Safarlarim'], ['profile', 'user', 'Profil'], ['notifications', 'bell', 'Bildirishnomalar'], ['states', 'settings', 'Xizmat holatlari']].map(([r, i, t], index) => <a href={`#${r}`} data-act="close" key={index}>
{icon(i)}
{t}
</a>)}</div>);
  },
  "notifications": () => {
    closeModal();
    go('notifications');
  },
  "about": (el, id) => {
    modal('Tripwise · Interaktiv beta', <><p>Telefon va noutbuk uchun ishlaydigan dizayn prototipi.</p><ul className="list">
<li>
{icon('check')}
Qidiruv, filtrlar va saqlanganlar
</li>
<li>
{icon('check')}
Namunaviy AI reja va suhbat
</li>
<li>
{icon('check')}
Demo bron hamda boshqaruv
</li>
</ul><p className="muted">Real narxlar, hamkorlar API, login, AI va to‘lov xizmatlari ulanmagan. Ma’lumotlar faqat shu brauzerda saqlanadi.</p><p className="small">
{"Suratlar: "}
<a href="https://unsplash.com/photos/WA1u0scVLZU" target="_blank" rel="noopener noreferrer">Engin Yapici / Istanbul</a>
{", "}
<a href="https://unsplash.com/photos/-K_UEc_kXP8" target="_blank" rel="noopener noreferrer">Ahmed Galal / Dubay</a>
{", "}
<a href="https://unsplash.com/photos/1QUUFuOsRk4" target="_blank" rel="noopener noreferrer">Margo Kosh / Tailand</a>
{" (Unsplash). Mehmonxona tasviri sifatida yo‘nalish manzaralari ishlatilgan."}
</p></>);
  },
  "filters": (el, id) => {
    state.filterOpen = !state.filterOpen;
    render();
  },
  "reset-filter": (el, id) => {
    Object.assign(state, {
      destination: 'all',
      max: 1600,
      direct: false,
      baggage: 'any',
      style: 'any',
      duration: 'any',
      stars: 'any',
      breakfast: false
    });
    render();
  },
  "flight-detail": (el, id) => {
    const f = flights.find(f => f.id === id),
      d = tours.find(t => t.id === state.destination) || tours[0];
    modal('Parvoz tafsilotlari', <><div className="row">
<strong>{f.air}</strong>
<span className="pill">{f.code}</span>
</div><p>
{state.from}
{" — "}
{d.city}
<br />
<span className="muted small">
{state.start}
{" · "}
{f.depart}
–
{f.arrive}
{" · "}
{f.hours}
</span>
</p><div className="notice">
{"Qaytish: "}
{state.end}
{" · 09:15–16:15 · Namunaviy jadval"}
</div><ul className="list">
<li>
{icon('check')}
8 kg qo‘l yuki
</li>
<li>
{icon('check')}
{f.bag ? f.bag + ' kg bagaj' : 'Ro‘yxatdan o‘tuvchi bagaj kiritilmagan'}
</li>
<li>
{icon('check')}
{"Ekonom tarif · "}
{f.direct ? 'To‘g‘ridan-to‘g‘ri' : '1 ta to‘xtash'}
</li>
</ul><p className="small muted">Almashtirish va bekor qilish shartlari haqiqiy sotuvdan oldin tashuvchi tomonidan belgilanadi.</p><div className="row">
<strong>
{state.people}
{" kishi"}
</strong>
<strong className="price">{money(f.price * state.people)}</strong>
</div><button className="btn full" style={{
        "marginTop": "20px"
      }} data-act="book-flight" data-id={id}>Bron jarayoniga o‘tish</button></>);
  },
  "trip-tab": (el, id) => {
    session.tripTab = id;
    render();
  },
  "travelers": (el, id) => {
    modal('Saqlangan demo sayohatchilar', <><div className="panel">
<strong>{state.user === 'Mehmon' ? 'Demo Sayohatchi' : state.user}</strong>
<p className="muted">Asosiy demo sayohatchi · Pasport ma’lumoti saqlanmagan</p>
</div><p className="small muted">Haqiqiy sayohatchilarni boshqarish yakuniy versiyada qo‘shiladi.</p></>);
  },
  "documents": (el, id) => {
    modal('Sayohat hujjatlari', state.bookings.length ? state.bookings.map((b, index) => <div className="row" style={{
      "marginBottom": "15px"
    }} key={index}>
<span>{b.id}</span>
<button className="btn light sm" data-act="voucher" data-id={b.id}>Demo vaucher</button>
</div>) : <p className="muted">Demo bron tugallangach, namunaviy vaucher shu yerda paydo bo‘ladi.</p>);
  },
  "reset-demo": (el, id) => {
    confirmAction('Demo ma’lumotlarini o‘chirish', 'Shu brauzerdagi buyurtmalar, saqlanganlar va rejalar o‘chiriladi.', () => {
      localStorage.removeItem('tripwise-demo-v1');
      window.location.hash = 'home';
      window.location.reload();
    });
  },
  "payment-error": (el, id) => {
    modal('To‘lov amalga oshmadi', <div className="state">
{icon('wallet')}
<h3>Namunaviy to‘lov xatosi</h3>
<p>Pul yechilmadi. Boshqa usulni tanlash yoki qayta urinish mumkin.</p>
<button className="btn" data-act="close">Qayta urinish</button>
</div>);
  },
  "empty-state": (el, id) => {
    modal('Natija topilmadi', <div className="state">
{icon('search')}
<h3>Bu filtrga mos taklif yo‘q</h3>
<p>Narx chegarasini oshiring yoki manzilni o‘zgartiring.</p>
<button className="btn" data-act="close">Filtrga qaytish</button>
</div>);
  },
  "offline-state": (el, id) => {
    modal('Internet aloqasi yo‘q', <div className="state">
{icon('wifi')}
<p>Ulanishni tekshiring. Bu xato holatining namunasidir.</p>
<button className="btn" data-act="state-retry">Qayta urinish</button>
</div>);
  },
  "state-retry": (el, id) => {
    closeModal();
    toast('Demo: ulanish tiklandi');
  },
  "expired-state": (el, id) => {
    modal('Bron muddati tugadi', <><p>Taklif narxi va mavjudligini qaytadan tekshirish kerak.</p><button className="btn full" data-act="expired-search">Qidiruvga qaytish</button></>);
  },
  "expired-search": (el, id) => {
    closeModal();
    go('tours');
  },
  "price-state": (el, id) => {
    modal('Narx o‘zgardi', <><p className="muted">Yangi narxga rozilik alohida olinadi.</p><div className="row">
<del>{money(1400)}</del>
<strong className="price">{money(1420)}</strong>
</div><p className="small muted">Bu alohida namuna, amaldagi buyurtmangizni o‘zgartirmaydi.</p><div className="row">
<button className="btn white" data-act="close">Rad etish</button>
<button className="btn" data-act="price-accept">Qabul qilish</button>
</div></>);
  },
  "price-accept": (el, id) => {
    closeModal();
    toast('Yangi demo narx qabul qilindi');
  },
  "loading-state": (el, id) => {
    modal('Takliflar qidirilmoqda', <div aria-busy="true">{[1, 2, 3, 4].map((item, index) => <div className="skeleton" key={index} />)}</div>);
    setTimeout(() => {
      if ($('#modal').open) {
        closeModal();
        toast('Namunaviy takliflar yuklandi');
      }
    }, 1600);
  }
};
