import { pagehead } from '../components/layout.js';
import { state } from '../core/store.js';
import { esc } from '../core/dom.js';
import { icon } from '../components/icons.js';

export function notifications() {
  const bookings = [...state.bookings].reverse();
  return `${pagehead('Bildirishnomalar', 'Buyurtmalaringiz va Tripwise yangiliklari bir joyda.')}<div class="notifications-page">
    <section class="stack notifications-list" aria-label="Bildirishnomalar ro‘yxati">
      <article class="panel notification-card">
        <span class="notification-icon">${icon('bell')}</span>
        <div><span class="pill">Tripwise</span><h2>Tripwise’ga xush kelibsiz!</h2>
          <p>Yo‘nalishlarni kashf eting, turlarni solishtiring va sayohatingizni rejalang.</p>
          <a class="textbtn" href="#tours">Tur paketlarni ko‘rish →</a>
        </div>
      </article>
      ${bookings.map(booking => `<article class="panel notification-card">
        <span class="notification-icon">${icon(booking.status === 'Bekor qilingan' ? 'close' : 'bag')}</span>
        <div><span class="pill">${esc(booking.status)}</span><h2>${esc(booking.title)}</h2>
          <p>${esc(booking.id)} · ${esc(booking.dates)} · ${esc(booking.people)} kishi</p>
          <a class="textbtn" href="#success/${encodeURIComponent(booking.id)}">Buyurtma tafsilotlari →</a>
        </div>
      </article>`).join('')}
      ${bookings.length ? '' : '<p class="muted notification-note">Buyurtma berganingizdan so‘ng, uning holati haqidagi xabarlar shu yerda ko‘rinadi.</p>'}
      <p class="footnote notification-note">Beta versiyada xabarlar shu brauzerdagi buyurtmalar asosida ko‘rsatiladi. Push bildirishnomalar hali ulanmagan.</p>
    </section>
  </div>`;
}
