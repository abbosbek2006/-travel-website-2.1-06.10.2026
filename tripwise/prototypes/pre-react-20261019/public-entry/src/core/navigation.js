import { session } from "./session.js";
import { $ } from "./dom.js";
let renderPage;

export function configureNavigation(renderer) {
  renderPage = renderer;
}

export function go(route) {
  if (location.hash === '#' + route) render();
  else location.hash = route;
}
export function render() {
  const next = location.hash.slice(1) || 'home',
    changed = next !== session.currentRoute;
  if (!changed || matchMedia('(prefers-reduced-motion: reduce)').matches) return renderPage();
  if (typeof document.startViewTransition === 'function') {
    try {
      session.activeRouteTransition?.skipTransition();
      const transition = document.startViewTransition(() => renderPage());
      session.activeRouteTransition = transition;
      transition.finished.catch(() => {}).finally(() => {
        if (session.activeRouteTransition === transition) session.activeRouteTransition = null;
      });
    } catch {
      renderPage();
    }
  } else {
    const app = $('#app');
    app?.classList.add('route-fallback');
    renderPage();
    requestAnimationFrame(() => app?.classList.add('route-fallback-ready'));
    window.setTimeout(() => app?.classList.remove('route-fallback', 'route-fallback-ready'), 420);
  }
}
