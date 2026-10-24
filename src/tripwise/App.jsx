import { flushSync } from 'react-dom';
import React, { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Layout } from "./components/layout.jsx";
import { Dialog, closeModal } from "./components/dialog.jsx";
import { Toast } from "./components/Toast.jsx";
import { ScrollTop } from "./components/ScrollTop.jsx";
import { Promotions } from "./features/promotions.jsx";
import { Welcome } from "./features/welcome.jsx";
import { RouteView } from "./core/router.jsx";
import { session } from './core/session.js';
import { loadState } from './core/store.js';
import { subscribe, getSnapshot } from './core/navigation.js';
import { dispatch, disposeEvents } from './core/events.js';
import { initActions } from './features/actions.js';
import { initInterface } from './features/interface.js';
import { initAccount } from "./features/account.jsx";
import { initMemories } from "./features/memories.jsx";
import './styles/style.css';
import './styles/premium.css';
import './styles/mobile-fixes.css';
import './styles/luxury.css';
import './styles/brand.css';
import './styles/notifications.css';
loadState();
export default function App() {
  const revision = useSyncExternalStore(subscribe, getSnapshot);
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || 'home');
  const previousRoute = useRef(route);
  session.currentRoute = route;
  useEffect(() => {
    initActions();
    initInterface();
    initAccount();
    initMemories();
    const navigate = () => {
      const next = window.location.hash.slice(1) || 'home';
      closeModal();
      if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const transition = document.startViewTransition(() => flushSync(() => setRoute(next)));
        transition.finished.catch(() => {});
      } else setRoute(next);
    };
    window.addEventListener('hashchange', navigate);
    return () => {
      disposeEvents();
      window.removeEventListener('hashchange', navigate);
    };
  }, []);
  useLayoutEffect(() => {
    const changed = previousRoute.current !== route;
    document.title = `Tripwise — ${document.querySelector('#main h1')?.textContent || 'Oqilona sayohat'}`;
    if (changed) {
      window.scrollTo(0, 0);
      document.getElementById('main')?.focus({
        preventScroll: true
      });
      previousRoute.current = route;
    }
    if (route === 'browse') document.getElementById('browse')?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [route, revision]);
  return <div onClick={dispatch} onSubmit={dispatch} onChange={dispatch} onInput={dispatch} onError={event => {
    const image = event.target;
    if (image.tagName === 'IMG' && !image.dataset.fallback) {
      image.dataset.fallback = '1';
      image.src = '/assets/fallback.svg';
    }
  }}>
    <a className="skip" href="#main">Kontentga o‘tish</a>
    <div id="app"><Layout><RouteView key={`${route}:${revision}`} route={route} /></Layout></div>
    <Promotions route={route} />
    <ScrollTop />
    <Welcome />
    <Dialog />
    <Toast />
  </div>;
}
