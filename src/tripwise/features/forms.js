import { persist, state } from "../core/store.js";
import { render } from "../core/navigation.js";
import { toast } from "../core/dom.js";
import { closeModal } from "../components/dialog.jsx";
import { session } from "../core/session.js";
import { go } from "../core/navigation.js";
import { ask } from "./assistant.jsx";
export const formHandlers = {
  "filter-form": (form, f) => {
    Object.assign(state, {
      destination: f.get('destination'),
      people: Number(f.get('people')),
      max: Number(f.get('max')),
      style: f.get('style') || 'any',
      duration: f.get('duration') || 'any',
      direct: f.has('direct'),
      baggage: f.get('baggage') || 'any',
      stars: f.get('stars') || 'any',
      breakfast: f.has('breakfast')
    });
    render();
    toast('Filtrlar qo‘llandi');
  },
  "login-form": (form, f) => {
    state.user = f.get('name').trim();
    persist();
    closeModal();
    render();
    toast('Demo hisob ochildi');
  },
  "profile-form": (form, f) => {
    state.user = f.get('name').trim();
    state.currency = f.get('currency');
    state.notifications = f.has('notifications');
    persist();
    render();
    toast('Sozlamalar saqlandi');
  },
  "planner-form": (form, f) => {
    state.plan = {
      city: f.get('city'),
      days: Number(f.get('days')),
      people: Number(f.get('people')),
      budget: Number(f.get('budget')),
      pace: f.get('pace'),
      interests: f.getAll('interest')
    };
    session.selectedDay = 1;
    persist();
    go('plan');
  },
  "chat-form": (form, f) => {
    ask(f.get('message').trim());
  },
  "traveler-form": (form, f) => {
    session.booking.name = f.get('name').trim();
    session.booking.email = f.get('email');
    session.booking.step = 2;
    render();
  },
  "review-form": (form, f) => {
    session.booking.step = 3;
    render();
  },
  "support-form": (form, f) => {
    state.requests = state.requests || [];
    state.requests.unshift({
      topic: f.get('topic'),
      message: f.get('message')
    });
    persist();
    render();
    toast('Demo murojaat qurilmada saqlandi');
  }
};
