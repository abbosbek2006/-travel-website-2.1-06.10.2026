import { go } from "../core/navigation.js";
import { persist, state } from "../core/store.js";
import { render } from "../core/navigation.js";
import { $, toast } from "../core/dom.js";
import { money } from "../core/format.js";
import { session } from "../core/session.js";
export function initInterface() {
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-act],[data-go]');
    if (!a) return;
    if (a.dataset.go) {
      go(a.dataset.go);
      return;
    }
    const act = a.dataset.act;
    if (act === 'search-tab') {
      state.tab = a.dataset.id;
      render();
    } else if (act === 'favorite') {
      state.favorites.includes(a.dataset.id) ? state.favorites = state.favorites.filter(x => x !== a.dataset.id) : state.favorites.push(a.dataset.id);
      persist();
      a.classList.toggle('saved');
      a.setAttribute('aria-pressed', a.classList.contains('saved'));
      if (session.currentRoute === 'favorites') render();
      toast('Saqlanganlar yangilandi');
    } else if (act === 'currency') {
      state.currency = state.currency === 'USD' ? 'UZS' : 'USD';
      persist();
      render();
      document.dispatchEvent(new Event('currencychange'));
      toast('UZS kursi demo uchun: 1 USD = 12 500 so‘m');
    }
  });
  document.addEventListener('submit', e => {
    if (e.target.id === 'search-form') {
      e.preventDefault();
      const f = new FormData(e.target);
      if (f.get('end') <= f.get('start')) {
        toast('Qaytish sanasi ketish sanasidan keyin bo‘lsin');
        return;
      }
      Object.assign(state, {
        destination: f.get('destination'),
        from: f.get('from'),
        start: f.get('start'),
        end: f.get('end'),
        people: Number(f.get('people'))
      });
      go(state.tab);
    }
  });
  document.addEventListener('input', e => {
    if (e.target.name === 'max' && $('#range-label')) $('#range-label').textContent = money(Number(e.target.value));
  });
  document.addEventListener('change', e => {
    const t = e.target;
    if (t.id === 'sort') {
      state.sort = t.value;
      render();
    } else if (t.id === 'detail-people') {
      state.people = Number(t.value);
      render();
    } else if (t.id === 'insurance' || t.id === 'transfer') {
      session.booking[t.id] = t.checked;
      render();
    } else if (t.dataset.check) {
      state.checks = state.checks || [];
      state.checks = t.checked ? [...new Set([...state.checks, t.dataset.check])] : state.checks.filter(v => v !== t.dataset.check);
      persist();
    }
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act="mood"]');
    if (!b) return;
    state.homeMood = b.dataset.id;
    persist();
    render();
  });
}
