// Existing business actions use one React event boundary, with effect cleanup.
const handlers = new Map();
const cleanups = [];
export function listen(target, type, handler, options) {
  if (target === document && ['click', 'submit', 'change', 'input'].includes(type)) {
    if (!handlers.has(type)) handlers.set(type, new Set());
    handlers.get(type).add(handler);
    cleanups.push(() => handlers.get(type)?.delete(handler));
  } else {
    target.addEventListener(type, handler, options);
    cleanups.push(() => target.removeEventListener(type, handler, options));
  }
}
export function dispatch(event) {
  const type = event.type === 'change' ? 'change' : event.type;
  handlers.get(type)?.forEach(handler => handler(event));
}
export function disposeEvents() {
  cleanups.splice(0).forEach(cleanup => cleanup());
}
