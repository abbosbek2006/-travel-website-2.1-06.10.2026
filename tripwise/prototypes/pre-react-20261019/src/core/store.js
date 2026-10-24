export let state = {
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
  offers: [],
  partnerOrders: [{
    id: 'DEMO-1024',
    status: 'Kutilmoqda',
    title: 'Istanbul klassik sayohat',
    total: 1400
  }],
  filterOpen: false
};
export function persist() {
  try {
    localStorage.setItem('tripwise-demo-v1', JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem('tripwise-demo-v1'));
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return;
    for (const key of Object.keys(state)) {
      const value = saved[key];
      if (Array.isArray(state[key]) ? Array.isArray(value) : typeof value === typeof state[key]) {
        state[key] = value;
      }
    }
    for (const key of ['email', 'notifications', 'checks', 'requests', 'memoryPhotos', 'homeMood']) {
      if (Object.hasOwn(saved, key)) state[key] = saved[key];
    }
    if (!['USD', 'UZS'].includes(state.currency)) state.currency = 'USD';
    if (!Number.isInteger(state.people) || state.people < 1 || state.people > 6) state.people = 2;
    if (state.plan && (!['istanbul', 'dubai', 'thai'].includes(state.plan.city) || !Array.isArray(state.plan.interests))) state.plan = null;
  } catch {}
}
