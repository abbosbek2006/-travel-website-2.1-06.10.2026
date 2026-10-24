import React, { useEffect, useRef, useState } from 'react';
import { imgs, promoCampaigns, tours } from '../data/catalog.js';
import { money } from '../core/format.js';
export function Promotions({
  route
}) {
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem('tripwise-promo-hidden') === '1';
    } catch {
      return false;
    }
  });
  const root = useRef(null);
  const paused = useRef(false);
  const visible = !hidden && ['home', 'tours', 'flights', 'hotels', 'destinations', 'guide'].includes(route.split('/')[0]);
  useEffect(() => {
    if (!visible) return;
    const timer = setInterval(() => {
      if (document.hidden || paused.current || root.current?.contains(document.activeElement)) return;
      setSeconds(value => value - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [visible]);
  useEffect(() => {
    if (seconds > 0) return;
    setIndex(value => (value + 1) % promoCampaigns.length);
    setSeconds(10);
  }, [seconds]);
  if (!visible) return null;
  const offer = promoCampaigns[index];
  const tour = tours.find(item => item.id === offer.id);
  const previous = Math.round(tour.price / (1 - offer.discount / 100) / 10) * 10;
  return <aside id="promo-dock" className="promo-dock" ref={root} aria-label="Sayohat takliflari" onMouseEnter={() => {
    paused.current = true;
  }} onMouseLeave={() => {
    paused.current = false;
  }}>
    <div className="promo-card">
      <button className="promo-close" aria-label="Taklifni yopish" onClick={() => {
        setHidden(true);
        try {
          sessionStorage.setItem('tripwise-promo-hidden', '1');
        } catch {}
      }}>×</button>
      <div className="promo-image"><img src={imgs[tour.image]} alt={`${tour.city} manzarasi`} /><span>{offer.tag}</span></div>
      <div className="promo-copy"><p className="promo-country">{tour.country} · {tour.days} KUN</p><h2>{offer.headline}</h2><p className="promo-detail">{offer.detail}</p>
        <div className="promo-price"><del>{money(previous)}</del><strong>{money(tour.price)} <small>/ kishi</small></strong><span>−{offer.discount}%</span></div>
        <a className="promo-more" href={`#tour/${tour.id}`}>Batafsil <b>↗</b></a>
      </div>
      <div className="promo-timer" aria-label={`Keyingi taklif ${seconds} soniyada`}><span style={{
          '--promo-progress': `${seconds * 10}%`
        }} /><b>{String(seconds).padStart(2, '0')}</b><small>soniya</small></div>
      <p className="promo-disclaimer">Demo aksiya · narxlar namunaviy</p>
    </div>
  </aside>;
}
