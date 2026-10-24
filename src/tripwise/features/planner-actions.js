import { session } from "../core/session.js";
import { render } from "../core/navigation.js";
import { persist, state } from "../core/store.js";
import { go } from "../core/navigation.js";
import { download, toast } from "../core/dom.js";
import { tours } from "../data/catalog.js";
import { itinerary } from "../pages/tours.jsx";
import { ask } from "./assistant.jsx";
export const plannerActions = {
  "guide-tab": (el, id) => {
    session.guideTab = id;
    render();
  },
  "plan-city": (el, id) => {
    state.destination = id;
    go('planner');
  },
  "day": (el, id) => {
    session.selectedDay = Number(id);
    render();
  },
  "replace-activity": (el, id) => {
    state.plan.replaced = state.plan.replaced || {};
    state.plan.replaced[session.selectedDay] = !state.plan.replaced[session.selectedDay];
    persist();
    render();
    toast('Kunlik faoliyat yangilandi');
  },
  "download-plan": (el, id) => {
    const p = state.plan,
      t = tours.find(t => t.id === p.city);
    download('Tripwise-sayohat-rejasi.txt', `TRIPWISE — DEMO SAYOHAT REJASI\n${t.city}, ${p.days} kun, ${p.people} kishi\nBudjet: $${p.budget}\n\n` + Array.from({
      length: p.days
    }, (_, i) => `${i + 1}-kun: ${p.replaced?.[i + 1] ? 'Mahalliy bog‘ va sokin sayr' : itinerary(t)[i % itinerary(t).length]}\n09:00 nonushta; 10:00 asosiy faoliyat; 13:00 tushlik; 15:00 erkin sayr; 19:00 qaytish.`).join('\n\n') + '\n\nBu namunaviy reja, real vaqt va narxlar tekshirilmagan.');
  },
  "matching-tours": (el, id) => {
    state.destination = id;
    state.max = 1600;
    state.style = 'any';
    state.duration = 'any';
    go('tours');
  },
  "ask": (el, id) => {
    ask(el.dataset.text);
  },
  "clear-chat": (el, id) => {
    state.messages = [];
    persist();
    render();
  }
};
