export const $ = s => document.querySelector(s);
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[c]);
export function toast(t) {
  $('#toast').textContent = t;
  $('#toast').classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3500);
}
export function download(name, text) {
  const blob = new Blob([text], {
      type: 'text/plain;charset=utf-8'
    }),
    url = URL.createObjectURL(blob),
    a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  toast('Yuklab olish boshlandi');
}
