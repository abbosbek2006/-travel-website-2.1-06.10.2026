import { pagehead, side } from "../components/layout.js";
import { esc, toast } from "../core/dom.js";
import { persist, state } from "../core/store.js";
import { icon } from "../components/icons.js";
import { session } from "../core/session.js";
import { imgs, tours } from "../data/catalog.js";
import { money } from "../core/format.js";
import { tourCard } from "../components/tour-card.js";
import { closeModal, modal } from "../components/dialog.js";
import { render } from "../core/navigation.js";
export function profileContent() {
  return `${pagehead('Shaxsiy kabinet')}<div class="account">${side('profile')}<section class="stack">
<div class="panel">
<h2>Profil va sozlamalar</h2>
<p class="muted">Sozlamalar faqat shu brauzerda saqlanadi.</p>
<form id="profile-form" class="stack">
<div class="two">
<label class="field">Ismingiz<input name="name" value="${esc(state.user)}" minlength="2" maxlength="40" required>
</label>
<label class="field">Valyuta<select name="currency">
<option ${state.currency === 'USD' ? 'selected' : ''}>USD</option>
<option ${state.currency === 'UZS' ? 'selected' : ''}>UZS</option>
</select>
</label>
</div>
<div class="notice">Til: O‘zbekcha. Ruscha va inglizcha tarjimalar keyingi versiyaga rejalashtirilgan.</div>
<label class="check">
<input name="notifications" type="checkbox" ${state.notifications ? 'checked' : ''}>Demo bildirishnomalarini ko‘rsatish</label>
<button class="btn" style="justify-self:start">O‘zgarishlarni saqlash</button>
</form>
</div>
<div class="panel">
<h3>Sayohatchilar va hujjatlar</h3>
<p class="muted">Haqiqiy hujjatlar yuklanmaydi. Demo sayohatchilarni ko‘rishingiz mumkin.</p>
<button class="btn light" data-act="travelers">${icon('user')}Sayohatchilar</button>
<button class="btn white" data-act="documents">${icon('bag')}Hujjatlar</button>
</div>
<div class="panel">
<h3>Maxfiylik va demo ma’lumotlari</h3>
<p class="muted">Saqlangan turlar, rejalar va buyurtmalar shu qurilmadagi brauzer xotirasida turadi. Boshqa qurilmaga sinxronlanmaydi.</p>
<button class="btn danger" data-act="reset-demo">Demo ma’lumotlarini o‘chirish</button>
</div>
</section>
</div>`;
}
export function trips() {
  const a = state.bookings.filter(b => session.tripTab === 'cancelled' ? b.status === 'Bekor qilingan' : b.status !== 'Bekor qilingan');
  return `${pagehead('Mening safarlarim', 'Demo buyurtmalar, vaucherlar va sayohat rejalari.')}<div class="trips-page"><section>
<div class="tabs">
<button class="tab ${session.tripTab === 'active' ? 'active' : ''}" data-act="trip-tab" data-id="active">Faol buyurtmalar</button>
<button class="tab ${session.tripTab === 'cancelled' ? 'active' : ''}" data-act="trip-tab" data-id="cancelled">Bekor qilingan</button>
</div>${a.length ? a.map(b => `<article class="panel trip">
<img src="${imgs[b.image || 'istanbul']}" alt="Sayohat yo‘nalishi">
<div>
<span class="pill ${b.status === 'Bekor qilingan' ? 'gray' : 'green'}">${b.status}</span>
<h3 style="margin-top:11px">${esc(b.title)}</h3>
<div class="small muted">${b.dates} · ${b.people} kishi · ${b.id}</div>
<strong>${money(b.total)}</strong>
</div>
<div class="stack">
<button class="btn light sm" data-act="voucher" data-id="${b.id}">Vaucher</button>${b.status !== 'Bekor qilingan' ? `<button class="textbtn small red" data-act="cancel-booking" data-id="${b.id}">Bekor qilish</button>` : `<span class="small muted">Real pul olinmagan</span>`}</div>
</article>`).join('') : `<div class="panel empty">${icon('bag')}<h3>${session.tripTab === 'active' ? 'Hali demo sayohatingiz yo‘q' : 'Bekor qilingan buyurtma yo‘q'}</h3>
<p class="muted">Tur tanlang va bron jarayonini sinab ko‘ring.</p>
<a class="btn" href="#tours">Tur tanlash</a>
</div>`}${state.plan ? `<div class="ai-banner">
<div>
<h3>Saqlangan sayohat rejangiz</h3>
<p>${tours.find(t => t.id === state.plan.city).city} · ${state.plan.days} kun</p>
</div>
<a class="btn" href="#plan">Rejani ochish</a>
</div>` : ''}</section>
</div>`;
}
export function favorites() {
  const a = tours.filter(t => state.favorites.includes(t.id));
  return `${pagehead('Saqlanganlar', 'Yoqtirgan takliflaringiz shu yerda.')}<div class="favorites-page"><section>${a.length ? `<div class="resultcards">${a.map(tourCard).join('')}</div>` : `<div class="panel empty">${icon('heart')}<h3>Hozircha saqlangan tur yo‘q</h3>
<p class="muted">Tur kartochkasidagi yurak belgisini bosing.</p>
<a class="btn" href="#tours">Turlarni ko‘rish</a>
</div>`}</section>
</div>`;
}
export function profile() {
  return `${profileContent()}<section class="panel account-entry">
<span class="eyebrow blue-eyebrow">TRIPWISE HISOBI</span>
<h2>${state.email ? 'Profilingiz tayyor' : 'Sayohatlaringizni bir joyda saqlang'}</h2>
<p class="muted">${state.email ? esc(state.email) : 'Ro‘yxatdan o‘tib, safar rejalaringiz va yoqtirgan yo‘nalishlaringizni shu qurilmada tartibli saqlang.'}</p>
<div class="row">
<button class="btn white" data-act="login">Kirish</button>
<button class="btn" data-act="auth-mode" data-id="register">Demo profil yaratish</button>
</div>
</section>`;
}
export function showAuth(mode) {
  const registering = mode === 'register';
  if (registering) {
    modal('Ro‘yxatdan o‘tish', `<p class="muted">Ismingiz va emailingiz bilan demo profil yarating.</p>
<form id="register-form" class="stack">
<label class="field">Ism va familiya<input name="name" autocomplete="name" minlength="2" maxlength="50" required placeholder="Ismingiz">
</label>
<label class="field">Email manzil<input name="email" type="email" autocomplete="email" required placeholder="siz@example.com">
</label>
<p class="auth-note">Bu demo profil: parol so‘ralmaydi va haqiqiy hisob yaratmaydi. Ma’lumotlar faqat shu brauzerda saqlanadi.</p>
<button class="btn full">Demo profil yaratish</button>
</form>
<button class="textbtn full" data-act="auth-mode" data-id="login">Hisobingiz bormi? Kirish</button>`);
  } else {
    const name = state.user === 'Mehmon' ? '' : esc(state.user);
    modal('Tripwise’ga xush kelibsiz', `<p class="muted">Demo hisob bilan bo‘limlarni sinang. Haqiqiy kirish va SMS tasdiqlash ulanmagan.</p>
<form id="login-form">
<label class="field">Ismingiz<input name="name" autocomplete="name" placeholder="Ismingiz" value="${name}" minlength="2" maxlength="50" required>
</label>
<button class="btn full">Demo hisobga kirish</button>
</form>
<button class="textbtn full" data-act="auth-mode" data-id="register" style="margin-top:10px">Yangi mijozmisiz? Ro‘yxatdan o‘tish</button>`);
  }
}
export function initAccount() {
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-act]');
    if (button?.dataset.act === 'login') showAuth('login');
    if (button?.dataset.act === 'auth-mode') showAuth(button.dataset.id);
  });
  document.addEventListener('submit', e => {
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
