import React from "react";
import { pagehead } from "../components/layout.jsx";
import { state } from '../core/store.js';
import { icon } from "../components/icons.jsx";
function NotificationsPage() {
  const bookings = [...state.bookings].reverse();
  return <>{pagehead('Bildirishnomalar', 'Buyurtmalaringiz va Tripwise yangiliklari bir joyda.')}<div className="notifications-page"><section className="stack notifications-list" aria-label="Bildirishnomalar ro‘yxati">
<article className="panel notification-card">
<span className="notification-icon">{icon('bell')}</span>
<div>
<span className="pill">Tripwise</span>
<h2>Tripwise’ga xush kelibsiz!</h2>
<p>Yo‘nalishlarni kashf eting, turlarni solishtiring va sayohatingizni rejalang.</p>
<a className="textbtn" href="#tours">Tur paketlarni ko‘rish →</a>
</div>
</article>
{bookings.map((booking, index) => <article className="panel notification-card" key={index}>
<span className="notification-icon">{icon(booking.status === 'Bekor qilingan' ? 'close' : 'bag')}</span>
<div>
<span className="pill">{booking.status}</span>
<h2>{booking.title}</h2>
<p>
{booking.id}
{" · "}
{booking.dates}
{" · "}
{booking.people}
{" kishi"}
</p>
<a className="textbtn" href={`#success/${encodeURIComponent(booking.id)}`}>Buyurtma tafsilotlari →</a>
</div>
</article>)}
{bookings.length ? '' : <p className="muted notification-note">Buyurtma berganingizdan so‘ng, uning holati haqidagi xabarlar shu yerda ko‘rinadi.</p>}
<p className="footnote notification-note">Beta versiyada xabarlar shu brauzerdagi buyurtmalar asosida ko‘rsatiladi. Push bildirishnomalar hali ulanmagan.</p>
</section></div></>;
}
export { NotificationsPage };
