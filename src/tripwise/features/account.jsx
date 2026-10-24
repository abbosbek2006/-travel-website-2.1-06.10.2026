import React from "react";
import { listen } from "../core/events.js";
import { Select } from "../components/Select.jsx";
import { pagehead } from "../components/layout.jsx";
import { toast } from "../core/dom.js";
import { persist, state } from "../core/store.js";
import { icon } from "../components/icons.jsx";
import { session } from "../core/session.js";
import { imgs, tours } from "../data/catalog.js";
import { money } from "../core/format.js";
import { TourCard } from "../components/tour-card.jsx";
import { closeModal, modal } from "../components/dialog.jsx";
import { render } from "../core/navigation.js";
function ProfileContent() {
  return <>{pagehead('Shaxsiy kabinet')}<div className="profile-page">
<section className="stack">
<div className="panel">
<h2>Profil va sozlamalar</h2>
<p className="muted">Sozlamalar faqat shu brauzerda saqlanadi.</p>
<form id="profile-form" className="stack">
<div className="two">
<label className="field">
Ismingiz
<input name="name" defaultValue={state.user} minLength="2" maxLength="40" required={true} />
</label>
<label className="field">
Valyuta
<Select name="currency">
<option selected={state.currency === 'USD'}>USD</option>
<option selected={state.currency === 'UZS'}>UZS</option>
</Select>
</label>
</div>
<div className="notice">Til: O‘zbekcha. Ruscha va inglizcha tarjimalar keyingi versiyaga rejalashtirilgan.</div>
<label className="check">
<input name="notifications" type="checkbox" defaultChecked={state.notifications} />
Demo bildirishnomalarini ko‘rsatish
</label>
<button className="btn" style={{
              "justifySelf": "start"
            }}>O‘zgarishlarni saqlash</button>
</form>
</div>
<div className="panel">
<h3>Sayohatchilar va hujjatlar</h3>
<p className="muted">Haqiqiy hujjatlar yuklanmaydi. Demo sayohatchilarni ko‘rishingiz mumkin.</p>
<button className="btn light" data-act="travelers">
{icon('user')}
Sayohatchilar
</button>
<button className="btn white" data-act="documents">
{icon('bag')}
Hujjatlar
</button>
</div>
<div className="panel">
<h3>Maxfiylik va demo ma’lumotlari</h3>
<p className="muted">Saqlangan turlar, rejalar va buyurtmalar shu qurilmadagi brauzer xotirasida turadi. Boshqa qurilmaga sinxronlanmaydi.</p>
<button className="btn danger" data-act="reset-demo">Demo ma’lumotlarini o‘chirish</button>
</div>
</section>
</div></>;
}
export { ProfileContent };
function TripsPage() {
  const a = state.bookings.filter(b => session.tripTab === 'cancelled' ? b.status === 'Bekor qilingan' : b.status !== 'Bekor qilingan');
  return <>{pagehead('Mening safarlarim', 'Demo buyurtmalar, vaucherlar va sayohat rejalari.')}<div className="trips-page"><section>
<div className="tabs">
<button className={`tab ${session.tripTab === 'active' ? 'active' : ''}`} data-act="trip-tab" data-id="active">Faol buyurtmalar</button>
<button className={`tab ${session.tripTab === 'cancelled' ? 'active' : ''}`} data-act="trip-tab" data-id="cancelled">Bekor qilingan</button>
</div>
{a.length ? a.map((b, index) => <article className="panel trip" key={index}>
<img src={imgs[b.image || 'istanbul']} alt="Sayohat yo‘nalishi" />
<div>
<span className={`pill ${b.status === 'Bekor qilingan' ? 'gray' : 'green'}`}>{b.status}</span>
<h3 style={{
              "marginTop": "11px"
            }}>{b.title}</h3>
<div className="small muted">
{b.dates}
{" · "}
{b.people}
{" kishi · "}
{b.id}
</div>
<strong>{money(b.total)}</strong>
</div>
<div className="stack">
<button className="btn light sm" data-act="voucher" data-id={b.id}>Vaucher</button>
{b.status !== 'Bekor qilingan' ? <button className="textbtn small red" data-act="cancel-booking" data-id={b.id}>Bekor qilish</button> : <span className="small muted">Real pul olinmagan</span>}
</div>
</article>) : <div className="panel empty">
{icon('bag')}
<h3>{session.tripTab === 'active' ? 'Hali demo sayohatingiz yo‘q' : 'Bekor qilingan buyurtma yo‘q'}</h3>
<p className="muted">Tur tanlang va bron jarayonini sinab ko‘ring.</p>
<a className="btn" href="#tours">Tur tanlash</a>
</div>}
{state.plan ? <div className="ai-banner">
<div>
<h3>Saqlangan sayohat rejangiz</h3>
<p>
{tours.find(t => t.id === state.plan.city).city}
{" · "}
{state.plan.days}
{" kun"}
</p>
</div>
<a className="btn" href="#plan">Rejani ochish</a>
</div> : ''}
</section></div></>;
}
export { TripsPage };
function FavoritesPage() {
  const a = tours.filter(t => state.favorites.includes(t.id));
  return <>{pagehead('Saqlanganlar', 'Yoqtirgan takliflaringiz shu yerda.')}<div className="favorites-page"><section>{a.length ? <div className="resultcards">{a.map(tour => <TourCard key={tour.id} tour={tour} />)}</div> : <div className="panel empty">
{icon('heart')}
<h3>Hozircha saqlangan tur yo‘q</h3>
<p className="muted">Tur kartochkasidagi yurak belgisini bosing.</p>
<a className="btn" href="#tours">Turlarni ko‘rish</a>
</div>}</section></div></>;
}
export { FavoritesPage };
function ProfilePage() {
  return <>{<ProfileContent />}<section className="panel account-entry">
<span className="eyebrow blue-eyebrow">TRIPWISE HISOBI</span>
<h2>{state.email ? 'Profilingiz tayyor' : 'Sayohatlaringizni bir joyda saqlang'}</h2>
<p className="muted">{state.email ? state.email : 'Ro‘yxatdan o‘tib, safar rejalaringiz va yoqtirgan yo‘nalishlaringizni shu qurilmada tartibli saqlang.'}</p>
<div className="row">
<button className="btn white" data-act="login">Kirish</button>
<button className="btn" data-act="auth-mode" data-id="register">Demo profil yaratish</button>
</div>
</section></>;
}
export { ProfilePage };
export function showAuth(mode) {
  const registering = mode === 'register';
  if (registering) {
    modal('Ro‘yxatdan o‘tish', <><p className="muted">Ismingiz va emailingiz bilan demo profil yarating.</p><form id="register-form" className="stack">
<label className="field">
Ism va familiya
<input name="name" autoComplete="name" minLength="2" maxLength="50" required={true} placeholder="Ismingiz" />
</label>
<label className="field">
Email manzil
<input name="email" type="email" autoComplete="email" required={true} placeholder="siz@example.com" />
</label>
<p className="auth-note">Bu demo profil: parol so‘ralmaydi va haqiqiy hisob yaratmaydi. Ma’lumotlar faqat shu brauzerda saqlanadi.</p>
<button className="btn full">Demo profil yaratish</button>
</form><button className="textbtn full" data-act="auth-mode" data-id="login">Hisobingiz bormi? Kirish</button></>);
  } else {
    const name = state.user === 'Mehmon' ? '' : state.user;
    modal('Tripwise’ga xush kelibsiz', <><p className="muted">Demo hisob bilan bo‘limlarni sinang. Haqiqiy kirish va SMS tasdiqlash ulanmagan.</p><form id="login-form">
<label className="field">
Ismingiz
<input name="name" autoComplete="name" placeholder="Ismingiz" defaultValue={name} minLength="2" maxLength="50" required={true} />
</label>
<button className="btn full">Demo hisobga kirish</button>
</form><button className="textbtn full" data-act="auth-mode" data-id="register" style={{
        "marginTop": "10px"
      }}>Yangi mijozmisiz? Ro‘yxatdan o‘tish</button></>);
  }
}
export function initAccount() {
  listen(document, 'click', event => {
    const button = event.target.closest('[data-act]');
    if (button?.dataset.act === 'login') showAuth('login');
    if (button?.dataset.act === 'auth-mode') showAuth(button.dataset.id);
  });
  listen(document, 'submit', e => {
    const form = e.target;
    if (form.id !== 'register-form') return;
    e.preventDefault();
    const data = new FormData(form),
      name = String(data.get('name') || '').trim(),
      email = String(data.get('email') || '').trim();
    if (!name || !email) {
      toast('Ism va emailni tekshiring.');
      return;
    }
    state.user = name;
    state.email = email;
    persist();
    closeModal();
    render();
    toast(`Xush kelibsiz, ${name}! Demo profilingiz tayyor.`);
  });
}
