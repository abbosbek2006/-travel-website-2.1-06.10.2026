import React from 'react';
import { HomePage } from "../pages/home.jsx";
import { ToursPage, TourDetailPage } from "../pages/tours.jsx";
import { FlightsPage } from "../pages/flights.jsx";
import { HotelsPage, HotelDetailPage } from "../pages/hotels.jsx";
import { DestinationsPage, DestinationPage } from "../pages/destinations.jsx";
import { PlannerPage, PlanPage } from "../features/planner.jsx";
import { AssistantPage } from "../features/assistant.jsx";
import { BookingPage, SuccessPage } from "../features/booking.jsx";
import { FavoritesPage, ProfilePage, TripsPage } from "../features/account.jsx";
import { StatesPage, SupportPage } from "../features/support.jsx";
import { NotificationsPage } from "../pages/notifications.jsx";
const pages = {
  home: HomePage,
  browse: HomePage,
  tours: ToursPage,
  flights: FlightsPage,
  hotels: HotelsPage,
  destinations: DestinationsPage,
  planner: PlannerPage,
  plan: PlanPage,
  ai: AssistantPage,
  booking: BookingPage,
  profile: ProfilePage,
  trips: TripsPage,
  favorites: FavoritesPage,
  support: SupportPage,
  states: StatesPage,
  notifications: NotificationsPage
};
const detailPages = {
  tour: TourDetailPage,
  hotel: HotelDetailPage,
  guide: DestinationPage,
  success: SuccessPage
};
export function RouteView({
  route
}) {
  const [section, id] = route.split('/');
  const Page = pages[section] || detailPages[section];
  if (Page) return <Page id={id} />;
  return <section className="panel empty"><h1>Sahifa topilmadi</h1><p>Manzilni tekshiring yoki bosh sahifaga qayting.</p><a className="btn" href="#home">Bosh sahifa</a></section>;
}
