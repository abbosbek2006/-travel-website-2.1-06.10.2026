import { createSignal } from './signal.js';
export const $ = selector => document.querySelector(selector);
export const esc = value => String(value ?? '');
export const toastSignal = createSignal();
export let toastText = '';
let timer;
export function toast(text) {
  toastText = text;
  toastSignal.emit();
  clearTimeout(timer);
  timer = setTimeout(() => {
    toastText = '';
    toastSignal.emit();
  }, 3500);
}
export function download(name, text) {
  const url = URL.createObjectURL(new Blob([text], {
    type: 'text/plain;charset=utf-8'
  }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  toast('Yuklab olish boshlandi');
}
