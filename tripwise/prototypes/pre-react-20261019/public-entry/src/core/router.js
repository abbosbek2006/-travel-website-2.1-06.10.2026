import { notifications } from '../pages/notifications.js';
import { render } from "./navigation.js";
import { session } from "./session.js";
import { home } from "../pages/home.js";
import { tourDetail, tourList } from "../pages/tours.js";
import { flightList } from "../pages/flights.js";
import { hotelDetail, hotelList } from "../pages/hotels.js";
import { destinations, guide } from "../pages/destinations.js";
import { plan, planner } from "../features/planner.js";
import { ai } from "../features/assistant.js";
import { bookingPage, successPage } from "../features/booking.js";
import { favorites, profile, trips } from "../features/account.js";
import { statesPage, support } from "../features/support.js";
import { $ } from "./dom.js";
import { shell } from "../components/layout.js";
export function renderPage() {
  const changed = session.currentRoute !== (location.hash.slice(1) || 'home');
  const scroll = window.scrollY;
  session.currentRoute = location.hash.slice(1) || 'home';
  const [r, id] = session.currentRoute.split('/');
  const views = {
    home,
    browse: home,
    tours: tourList,
    flights: flightList,
    hotels: hotelList,
    tour: () => tourDetail(id),
    hotel: () => hotelDetail(id),
    destinations,
    guide: () => guide(id),
    planner,
    plan,
    ai,
    booking: bookingPage,
    success: () => successPage(id),
    profile,
    trips,
    favorites,
    support,
    notifications,
    states: statesPage
  };
  const notFound = () => `<section class="panel empty"><h1>Sahifa topilmadi</h1><p>Manzilni tekshiring yoki bosh sahifaga qayting.</p><a class="btn" href="#home">Bosh sahifa</a></section>`;
  $('#app').innerHTML = shell((views[r] || notFound)());
  document.title = r === 'home' || r === 'browse' ? 'Tripwise — Dunyo sizni kutmoqda' : 'Tripwise — ' + ($('#main h1')?.textContent || 'Sayohatlar');
  window.scrollTo(0, changed ? 0 : scroll);
  if (changed) $('#main')?.focus({ preventScroll: true });
  if (r === 'browse') requestAnimationFrame(() => $('#browse')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  }));
}
