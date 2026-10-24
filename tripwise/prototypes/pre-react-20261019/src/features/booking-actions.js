import { flights, hotels, tours } from "../data/catalog.js";
import { persist, state } from "../core/store.js";
import { closeModal, confirmAction } from "../components/dialog.js";
import { beginBooking, total } from "./booking.js";
import { $, download, toast } from "../core/dom.js";
import { nights } from "../core/format.js";
import { render } from "../core/navigation.js";
import { session } from "../core/session.js";
import { go } from "../core/navigation.js";
export const bookingActions = {
  "book-flight": (el, id) => {
    const f = flights.find(f => f.id === id),
      t = tours.find(t => t.id === state.destination) || tours[0];
    closeModal();
    beginBooking({
      title: f.air + ' · ' + state.from + ' — ' + t.city,
      base: f.price * state.people,
      type: 'flight',
      image: t.image
    });
  },
  "book-tour": (el, id) => {
    const t = tours.find(t => t.id === id);
    const date = $('#tour-date')?.value;
    if (!date) {
      toast('Boshlanish sanasini tanlang');
      return;
    }
    state.start = date;
    const end = new Date(date + 'T12:00:00');
    end.setDate(end.getDate() + t.days - 1);
    state.end = end.toISOString().slice(0, 10);
    beginBooking({
      title: t.title,
      base: t.price * state.people,
      type: 'tour',
      image: t.image,
      dates: state.start + ' — ' + state.end
    });
  },
  "book-hotel": (el, id) => {
    const h = hotels.find(h => h.id === id),
      price = h.price + (el.dataset.room === 'comfort' ? 30 : 0),
      rooms = Math.ceil(state.people / 2);
    beginBooking({
      title: h.name + ' · ' + (el.dataset.room === 'comfort' ? 'Komfort' : 'Standart') + ' · ' + rooms + ' xona',
      base: price * nights() * rooms,
      type: 'hotel',
      image: h.image
    });
  },
  "hotel-dates": (el, id) => {
    const start = $('#hotel-start').value,
      end = $('#hotel-end').value;
    if (!start || !end || end <= start) {
      toast('To‘g‘ri sana oralig‘ini tanlang');
      return;
    }
    state.start = start;
    state.end = end;
    render();
  },
  "booking-back": (el, id) => {
    session.booking.step = Math.max(1, session.booking.step - 1);
    render();
  },
  "promo": (el, id) => {
    if ($('#promo').value.trim().toUpperCase() === 'DEMO20') {
      session.booking.promo = true;
      render();
      toast('20 USD demo chegirma qo‘llandi');
    } else toast('Demo kodi: DEMO20');
  },
  "pay-method": (el, id) => {
    session.booking.method = id;
    render();
  },
  "complete-booking": () => {
    if (!session.booking || session.booking.step !== 3) return;
    const id = 'DEMO-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    state.bookings.push({
      id,
      title: session.booking.title,
      total: total(),
      people: state.people,
      dates: session.booking.dates || state.start + ' — ' + state.end,
      image: session.booking.image,
      name: session.booking.name,
      status: 'Tasdiqlangan'
    });
    if (!persist()) {
      state.bookings.pop();
      toast('Buyurtmani saqlash uchun brauzer xotirasida joy yetarli emas.');
      return;
    }
    session.booking = null;
    go('success/' + id);
  },
  "voucher": (el, id) => {
    const b = state.bookings.find(b => b.id === id);
    download('Tripwise-' + b.id + '.txt', `TRIPWISE — DEMO VAUCHER\nHaqiqiy bilet yoki bron hujjati EMAS.\n\n${b.id}\n${b.title}\n${b.dates}\n${b.people} kishi\n${b.name}\nDemo summa: $${b.total}\nHolat: ${b.status}\n\nHech qanday to‘lov olinmagan yoki xizmat band qilinmagan.`);
  },
  "cancel-booking": (el, id) => {
    confirmAction('Demo buyurtmani bekor qilish', 'Buyurtma “Bekor qilingan” bo‘limiga o‘tadi. Haqiqiy pul qaytarish bo‘lmaydi.', () => {
      state.bookings.find(b => b.id === id).status = 'Bekor qilingan';
      persist();
      render();
      toast('Demo buyurtma bekor qilindi');
    });
  }
};
