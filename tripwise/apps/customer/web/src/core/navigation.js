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
