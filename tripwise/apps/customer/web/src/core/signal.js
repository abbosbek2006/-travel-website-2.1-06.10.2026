export function createSignal() {
  let revision = 0;
  const listeners = new Set();
  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    getSnapshot: () => revision,
    emit() {
      revision += 1;
      listeners.forEach(listener => listener());
    }
  };
}
