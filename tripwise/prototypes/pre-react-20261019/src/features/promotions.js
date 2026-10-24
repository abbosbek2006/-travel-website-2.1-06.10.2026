import { $ } from "../core/dom.js";
import { imgs, promoCampaigns, tours } from "../data/catalog.js";
import { money } from "../core/format.js";
export function renderPromo() {
  const root = $('#promo-dock');
  if (!root) return;
  const section = (location.hash.slice(1) || 'home').split('/')[0];
  if (!['home', 'tours', 'flights', 'hotels', 'destinations', 'guide'].includes(section)) {
    root.hidden = true;
    return;
  }
  try {
    if (sessionStorage.getItem('tripwise-promo-hidden') === '1') {
      root.hidden = true;
      return;
    }
  } catch {}
  const offer = promoCampaigns[window.promoIndex % promoCampaigns.length],
    tour = tours.find(x => x.id === offer.id);
  if (!tour) return;
  const was = Math.round(tour.price / (1 - offer.discount / 100) / 10) * 10;
  root.hidden = false;
  root.innerHTML = `<div class="promo-card">
<button class="promo-close" type="button" data-premium-action="close-promo" aria-label="Taklifni yopish">×</button>
<div class="promo-image">
<img src="${imgs[tour.image]}" alt="${tour.city} manzarasi">
<span>${offer.tag}</span>
</div>
<div class="promo-copy">
<p class="promo-country">${tour.country} · ${tour.days} KUN</p>
<h2>${offer.headline}</h2>
<p class="promo-detail">${offer.detail}</p>
<div class="promo-price">
<del>${money(was)}</del>
<strong>${money(tour.price)} <small>/ kishi</small>
</strong>
<span>−${offer.discount}%</span>
</div>
<a class="promo-more" href="#tour/${tour.id}">Batafsil <b>↗</b>
</a>
</div>
<div class="promo-timer" aria-label="Keyingi taklif ${window.promoSeconds} soniyada">
<span style="--promo-progress:${window.promoSeconds * 10}%">
</span>
<b data-countdown>${String(window.promoSeconds).padStart(2, '0')}</b>
<small>soniya</small>
</div>
<p class="promo-disclaimer">Demo aksiya · narxlar namunaviy</p>
</div>`;
}
export function initPromotions() {
  document.addEventListener('currencychange', renderPromo);
  window.promoIndex = window.promoIndex || 0;
  window.promoSeconds = 10;
  $('#promo-dock')?.addEventListener('click', e => {
    if (!e.target.closest('[data-premium-action="close-promo"]')) return;
    try {
      sessionStorage.setItem('tripwise-promo-hidden', '1');
    } catch {}
    ;
    $('#promo-dock').hidden = true;
  });
  window.addEventListener('hashchange', () => window.setTimeout(renderPromo, 0));
  window.setInterval(() => {
    const dock = $('#promo-dock');
    if (!dock || dock.hidden || document.hidden || dock.matches(':hover') || dock.contains(document.activeElement)) return;
    if (window.promoSeconds > 1) {
      window.promoSeconds--;
      const n = $('#promo-dock [data-countdown]'),
        ring = $('#promo-dock .promo-timer>span'),
        timer = $('#promo-dock .promo-timer');
      if (n) n.textContent = String(window.promoSeconds).padStart(2, '0');
      if (ring) ring.style.setProperty('--promo-progress', `${window.promoSeconds * 10}%`);
      if (timer) timer.setAttribute('aria-label', `Keyingi taklif ${window.promoSeconds} soniyada`);
    } else {
      window.promoIndex = (window.promoIndex + 1) % promoCampaigns.length;
      window.promoSeconds = 10;
      renderPromo();
    }
  }, 1000);
}
