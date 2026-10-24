export const state = {
  tab: 'tours',
  destination: 'all',
  from: 'Toshkent',
  start: '2026-11-15',
  end: '2026-11-22',
  people: 2,
  max: 1600,
  sort: 'popular',
  favorites: [],
  bookings: [],
  user: 'Mehmon',
  currency: 'USD',
  plan: null,
  messages: [],
  filterOpen: false
};
// Only recognized UI preferences and bounded demo records are saved.
const storageKey = 'tripwise-demo-v1';
const cities = ['istanbul', 'dubai', 'thai'];
const isRecord = value => value && typeof value === 'object' && !Array.isArray(value);
const safeText = value => typeof value === 'string' && value.length <= 2000;
const list = (value, limit) => Array.isArray(value) ? value.slice(-limit).filter(isRecord) : [];

function boundedRecords(value) {
  return {
    bookings: list(value.bookings, 100).filter(item =>
      ['id', 'title', 'dates', 'name', 'status'].every(key => safeText(item[key])) &&
      Number.isFinite(item.total) && Number.isInteger(item.people) && item.people > 0),
    messages: list(value.messages, 100).filter(item =>
      ['user', 'assistant'].includes(item.role) && safeText(item.text)),
    requests: list(value.requests, 50).filter(item => safeText(item.topic) && safeText(item.message)),
  };
}

export function persist() {
  try {
    Object.assign(state, boundedRecords(state));
    const saved = JSON.stringify(state);
    if (saved.length > 4000000) return false;
    localStorage.setItem(storageKey, saved);
    return true;
  } catch { return false; }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw || raw.length > 4000000) return;
    const saved = JSON.parse(raw);
    if (!isRecord(saved)) return;
    Object.assign(state, boundedRecords(saved));
    for (const key of ['tab', 'destination', 'from', 'start', 'end', 'sort', 'user', 'currency', 'email', 'homeMood', 'style', 'duration', 'baggage', 'stars']) {
      if (safeText(saved[key])) state[key] = saved[key];
    }
    for (const key of ['direct', 'breakfast', 'notifications']) {
      if (typeof saved[key] === 'boolean') state[key] = saved[key];
    }
    state.people = Number.isInteger(saved.people) && saved.people >= 1 && saved.people <= 6 ? saved.people : 2;
    state.max = Number.isFinite(saved.max) && saved.max >= 100 && saved.max <= 100000 ? saved.max : 1600;
    state.currency = ['USD', 'UZS'].includes(state.currency) ? state.currency : 'USD';
    state.favorites = Array.isArray(saved.favorites) ? [...new Set(saved.favorites.filter(id => cities.includes(id)))] : [];
    state.checks = Array.isArray(saved.checks) ? saved.checks.filter(safeText).slice(0, 50) : [];
    const plan = saved.plan;
    if (isRecord(plan) && cities.includes(plan.city) && [3, 5, 7, 10].includes(plan.days) && Number.isFinite(plan.budget) && plan.budget >= 300 && plan.budget <= 50000 && Number.isInteger(plan.people) && plan.people >= 1 && plan.people <= 10 && safeText(plan.pace) && Array.isArray(plan.interests)) {
      state.plan = { city: plan.city, days: plan.days, budget: plan.budget, people: plan.people, pace: plan.pace, interests: plan.interests.filter(safeText).slice(0, 5), replaced: {} };
      if (isRecord(plan.replaced)) for (let day = 1; day <= plan.days; day += 1) {
        if (typeof plan.replaced[day] === 'boolean') state.plan.replaced[day] = plan.replaced[day];
      }
    }
    state.memoryPhotos = {};
    let remaining = 5;
    for (const city of cities) {
      const photos = isRecord(saved.memoryPhotos) ? saved.memoryPhotos[city] : [];
      state.memoryPhotos[city] = list(photos, remaining).filter(photo => safeText(photo.key) && safeText(photo.spot) && typeof photo.src === 'string' && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(photo.src) && photo.src.length <= 700000).slice(0, remaining);
      remaining -= state.memoryPhotos[city].length;
    }
  } catch { /* Invalid or unavailable browser storage falls back to the default UI. */ }
}
