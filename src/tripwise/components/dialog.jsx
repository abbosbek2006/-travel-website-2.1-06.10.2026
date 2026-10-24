import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { createSignal } from '../core/signal.js';
import { session } from '../core/session.js';
import { icon } from "./icons.jsx";
let content = null;
let closing = false;
let closeTimer;
let dialogRevision = 0;
const signal = createSignal();
const render = () => signal.emit();
export function modal(title, body) {
  clearTimeout(closeTimer);
  content = {
    title,
    body,
    key: ++dialogRevision
  };
  closing = false;
  render();
}
export function closeModal() {
  if (!content) return;
  closing = true;
  render();
  clearTimeout(closeTimer);
  closeTimer = setTimeout(() => {
    content = null;
    closing = false;
    render();
  }, 240);
}
export function confirmAction(title, text, action) {
  session.pending = action;
  modal(title, <><p>{text}</p><div className="row"><button className="btn white" data-act="close">Ortga</button><button className="btn" data-act="confirm">Tasdiqlash</button></div></>);
}
export function Dialog() {
  useSyncExternalStore(signal.subscribe, signal.getSnapshot);
  const ref = useRef(null);
  const drag = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const dialog = ref.current;
    if (content && !dialog.open) dialog.showModal();
    if (!content && dialog.open) dialog.close();
  });
  useEffect(() => () => clearTimeout(closeTimer), []);
  return <dialog id="modal" ref={ref} aria-labelledby="dialog-title" className={`${closing ? 'modal-closing' : ''} ${offset ? 'modal-dragging' : ''}`} style={{
    '--modal-drag-y': `${offset}px`
  }} onCancel={event => {
    event.preventDefault();
    closeModal();
  }} onClick={event => {
    if (event.target === event.currentTarget) closeModal();
  }} onPointerDown={event => {
    if (!event.target.closest('.modalhead') || event.target.closest('button') || matchMedia('(min-width:681px)').matches) return;
    drag.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  }} onPointerMove={event => {
    if (drag.current !== null) setOffset(Math.max(0, event.clientY - drag.current));
  }} onPointerUp={() => {
    if (offset > 110) closeModal();
    drag.current = null;
    setOffset(0);
  }} onPointerCancel={() => {
    drag.current = null;
    setOffset(0);
  }}>
    {content && <React.Fragment key={content.key}>
      <div className="modalhead"><h3 id="dialog-title" style={{
          margin: 0
        }}>{content.title}</h3><button className="iconbtn" data-act="close" aria-label="Yopish">{icon('close')}</button></div>
      <div className="modalbody">{content.body}</div>
    </React.Fragment>}
  </dialog>;
}
