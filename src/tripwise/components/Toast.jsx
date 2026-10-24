import React, { useSyncExternalStore } from 'react';
import { toastSignal, toastText } from '../core/dom.js';
export function Toast() {
  useSyncExternalStore(toastSignal.subscribe, toastSignal.getSnapshot);
  return <div id="toast" role="status" aria-live="polite" className={toastText ? 'show' : ''}>{toastText}</div>;
}
