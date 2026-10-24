import React, { useEffect, useRef, useState } from 'react';
export function Welcome() {
  const [open, setOpen] = useState(() => {
    try {
      return sessionStorage.getItem('tripwise-welcome-seen') !== '1';
    } catch {
      return true;
    }
  });
  const [closing, setClosing] = useState(false);
  const button = useRef(null);
  const touch = useRef(0);
  useEffect(() => {
    if (!open) return;
    const app = document.getElementById('app');
    app.inert = true;
    button.current?.focus();
    try {
      sessionStorage.setItem('tripwise-welcome-seen', '1');
    } catch {}
    const timer = setTimeout(() => setClosing(true), 2200);
    const keydown = event => {
      if (event.key === 'Escape') setClosing(true);
      if (event.key === 'Tab') {
        event.preventDefault();
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', keydown);
    return () => {
      clearTimeout(timer);
      app.inert = false;
      window.removeEventListener('keydown', keydown);
    };
  }, [open]);
  useEffect(() => {
    if (!closing) return;
    const timer = setTimeout(() => {
      setOpen(false);
      document.getElementById('main')?.focus({
        preventScroll: true
      });
    }, 420);
    return () => clearTimeout(timer);
  }, [closing]);
  if (!open) return null;
  return <section id="premium-welcome" className={`premium-welcome ${closing ? 'welcome-exit' : ''}`} role="dialog" aria-modal="true" aria-labelledby="welcome-title" onWheel={event => {
    if (event.deltaY > 10) setClosing(true);
  }} onTouchStart={event => {
    touch.current = event.touches[0].clientY;
  }} onTouchEnd={event => {
    if (touch.current - event.changedTouches[0].clientY > 40) setClosing(true);
  }}>
    <div className="welcome-orbit"><img className="welcome-symbol" src="/assets/brand/tripwise-symbol.png" alt="Tripwise" width="96" height="96" /></div>
    <p className="welcome-kicker">TRIPWISE · SAYOHAT OSONROQ</p><h1 id="welcome-title">Xush kelibsiz</h1>
    <p className="welcome-copy">Oqilona rejalang. Uzoqroqqa boring.</p>
    <button ref={button} className="welcome-start" onClick={() => setClosing(true)}>Sayohatni boshlash <span>↗</span></button>
    <div className="welcome-progress"><span /></div>
  </section>;
}
