import React, { useLayoutEffect, useRef, useState } from 'react';
import { goBack } from '../core/navigation.js';

export function PageHeading({ title, subtitle }) {
  const heading = useRef(null);
  const toolbar = useRef(null);
  const [collapsed, setCollapsed] = useState(false);

  useLayoutEffect(() => {
    const header = document.querySelector('.top');
    const bar = toolbar.current;
    let observer;
    let frame;
    let cutoff = 0;
    const update = () => setCollapsed(heading.current.getBoundingClientRect().bottom <= cutoff);
    const measure = () => {
      const height = header?.getBoundingClientRect().height || 0;
      bar.style.top = `${height}px`;
      cutoff = height + bar.getBoundingClientRect().height;
      observer?.disconnect();
      if (window.IntersectionObserver) {
        observer = new window.IntersectionObserver(([entry]) => {
          setCollapsed(entry.boundingClientRect.bottom <= cutoff);
        }, { rootMargin: `-${cutoff}px 0px 0px 0px`, threshold: 0 });
        observer.observe(heading.current);
      }
      update();
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => { frame = null; update(); });
    };
    measure();
    const resize = window.ResizeObserver ? new window.ResizeObserver(measure) : null;
    if (header) resize?.observe(header);
    resize?.observe(bar);
    window.addEventListener('resize', measure);
    if (!window.IntersectionObserver) window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      resize?.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', onScroll);
    };
  }, [title]);

  return <>
    <div ref={toolbar} className="page-heading-toolbar" data-collapsed={collapsed}>
      <button type="button" className="page-back" onClick={goBack} aria-label="Ortga qaytish" title="Ortga qaytish">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 5-7 7 7 7M5 12h14" /></svg>
      </button>
      <span className="page-heading-compact" aria-hidden="true">{title}</span>
    </div>
    <div className="pagehead">
      <h1 ref={heading}>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  </>;
}
