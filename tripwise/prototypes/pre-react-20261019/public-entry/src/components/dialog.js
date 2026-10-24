import { $ } from "../core/dom.js";
import { icon } from "./icons.js";
import { session } from "../core/session.js";
import { render } from "../core/navigation.js";
export function openDialog(title, body) {
  const m = $('#modal');
  m.innerHTML = `<div class="modalhead">
<h3 style="margin:0">${title}</h3>
<button class="iconbtn" data-act="close" aria-label="Yopish">${icon('close')}</button>
</div>
<div class="modalbody">${body}</div>`;
  if (!m.open) m.showModal();
}
export function closeDialog() {
  $('#modal').close();
}
export function confirmAction(title, text, action) {
  session.pending = action;
  modal(title, `<p>${text}</p>
<div class="row">
<button class="btn white" data-act="close">Ortga</button>
<button class="btn" data-act="confirm">Tasdiqlash</button>
</div>`);
}
export function modal(title, body) {
  const m = $('#modal');
  clearTimeout(window.tripwiseModalCloseTimer);
  m.classList.remove('modal-closing');
  openDialog(title, body);
}
export function closeModal() {
  const m = $('#modal');
  if (!m?.open) return;
  clearTimeout(window.tripwiseModalCloseTimer);
  m.classList.add('modal-closing');
  window.tripwiseModalCloseTimer = setTimeout(() => {
    if (m.open && m.classList.contains('modal-closing')) {
      m.classList.remove('modal-closing');
      closeDialog();
    }
  }, 240);
}
export const premiumModal = $('#modal');
export const finishModalDrag = e => {
  if (!session.modalDragStart || session.modalDragStart.id !== e.pointerId) return;
  const dy = Math.max(0, e.clientY - session.modalDragStart.y);
  session.modalDragStart = null;
  premiumModal.classList.remove('modal-dragging');
  premiumModal.style.removeProperty('--modal-drag-y');
  if (dy > 110) closeModal();
};
export function initDialogs() {
  window.addEventListener('hashchange', () => {
    if ($('#modal').open) closeModal();
    render();
  });
  $('#modal')?.addEventListener('cancel', e => {
    e.preventDefault();
    closeModal();
  });
  $('#modal')?.addEventListener('click', e => {
    if (e.target === $('#modal')) closeModal();
  });
  premiumModal?.addEventListener('pointerdown', e => {
    if (!e.target.closest('.modalhead') || e.target.closest('button') || matchMedia('(min-width:681px)').matches) return;
    session.modalDragStart = {
      y: e.clientY,
      id: e.pointerId
    };
    premiumModal.setPointerCapture?.(e.pointerId);
  });
  premiumModal?.addEventListener('pointermove', e => {
    if (!session.modalDragStart || session.modalDragStart.id !== e.pointerId) return;
    const dy = Math.max(0, e.clientY - session.modalDragStart.y);
    premiumModal.classList.add('modal-dragging');
    premiumModal.style.setProperty('--modal-drag-y', `${dy}px`);
  });
  premiumModal?.addEventListener('pointerup', finishModalDrag);
  premiumModal?.addEventListener('pointercancel', finishModalDrag);
}
