const listeners = new Set();
let revision = 0;
export const subscribe = listener => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
export const getSnapshot = () => revision;
export function render() {
  revision += 1;
  listeners.forEach(listener => listener());
}
export function go(route) {
  if (window.location.hash.slice(1) === route) render();else window.location.hash = route;
}

// Track only Tripwise entries so a direct visit never sends users to another site.
let historyIndex = 0;
function historyEntry(route) {
  const entry = window.history.state?.tripwise;
  return entry?.route === route && Number.isInteger(entry.index) && entry.index >= 0 ? entry : null;
}
function saveHistory(route) {
  window.history.replaceState({ ...window.history.state, tripwise: { route, index: historyIndex } }, '');
}
export function initializeHistory(route) {
  historyIndex = historyEntry(route)?.index ?? 0;
  saveHistory(route);
}
export function trackHistory(route) {
  historyIndex = historyEntry(route)?.index ?? historyIndex + 1;
  saveHistory(route);
}
export function goBack() {
  if (historyIndex > 0) window.history.back();
  else go('home');
}
