import { $ } from "../core/dom.js";
import { session } from "../core/session.js";
export function closeWelcome() {
  const intro = $('#premium-welcome');
  if (!intro || intro.hidden) return;
  intro.classList.add('welcome-exit');
  window.setTimeout(() => {
    intro.hidden = true;
    intro.classList.remove('welcome-exit');
    $('#app').inert = false;
    $('#main')?.focus({ preventScroll: true });
  }, 420);
}
export function startWelcome() {
  const intro = $('#premium-welcome');
  if (!intro) return;
  let seen = false;
  try {
    seen = sessionStorage.getItem('tripwise-welcome-seen') === '1';
    if (!seen) sessionStorage.setItem('tripwise-welcome-seen', '1');
  } catch {}
  if (seen) {
    intro.hidden = true;
    return;
  }
  intro.hidden = false;
  $('#app').inert = true;
  $('#welcome-start')?.focus({
    preventScroll: true
  });
  $('#welcome-start')?.addEventListener('click', closeWelcome, {
    once: true
  });
  window.setTimeout(closeWelcome, 2200);
}
export function initWelcome() {
  $('#scroll-top')?.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: 'smooth'
  }));
  window.addEventListener('scroll', () => {
    const y = window.scrollY,
      up = y < session.premiumLastScroll - 4;
    const btn = $('#scroll-top');
    if (btn) {
      btn.classList.toggle('visible', y > 360 && up);
      btn.setAttribute('aria-hidden', String(!(y > 360 && up)));
    }
    session.premiumLastScroll = y;
  }, {
    passive: true
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeWelcome();
    if (e.key === 'Tab' && !$('#premium-welcome').hidden) {
      e.preventDefault();
      $('#welcome-start').focus();
    }
  });
  const intro = $('#premium-welcome');
  let touchY = 0;
  intro.addEventListener('touchstart', event => { touchY = event.touches[0].clientY; }, { passive: true });
  intro.addEventListener('touchend', event => {
    if (touchY - event.changedTouches[0].clientY > 40) closeWelcome();
  }, { passive: true });
  intro.addEventListener('wheel', event => { if (event.deltaY > 10) closeWelcome(); }, { passive: true });
}
