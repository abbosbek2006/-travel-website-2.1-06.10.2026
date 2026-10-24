import { popularSpots } from "../data/catalog.js";
import { persist, state } from "../core/store.js";
import { $, esc, toast } from "../core/dom.js";
import { icon } from "../components/icons.js";
import { render } from "../core/navigation.js";
let uploading = false;
export function memoryGallery(city) {
  const spots = popularSpots[city] || popularSpots.istanbul,
    photos = state.memoryPhotos && state.memoryPhotos[city] || [],
    totalPhotos = Object.values(state.memoryPhotos || {}).reduce((sum, list) => sum + list.length, 0),
    limitReached = totalPhotos >= 5;
  return `<section class="memory-section">
<div class="sectionhead">
<div>
<span class="eyebrow blue-eyebrow">SAYOHAT XOTIRALARI</span>
<h2>Mashhur joylardan esdaliklar</h2>
<p>O‘zingiz olgan suratlarni joy bilan bog‘lab saqlang.</p>
</div>
<span class="memory-count">${totalPhotos} / 5 rasm</span>
</div>
<div class="memory-upload-row">
<label class="field memory-place">Surat olingan joy<select id="memory-place">${spots.map(s => `<option>${esc(s)}</option>`).join('')}</select>
</label>
<label class="memory-upload ${limitReached ? 'disabled' : ''}">
<input type="file" id="memory-upload" data-memory-city="${city}" accept="image/*" multiple ${limitReached ? 'disabled' : ''}>
<span class="memory-plus">＋</span>
<span>
<strong>${limitReached ? 'Limit to‘ldi' : 'Rasm tanlash'}</strong>
<small>Rasm fayllari · jami 5 tagacha</small>
</span>
</label>
</div>${photos.length ? `<div class="memory-grid">${photos.map(p => `<article class="memory-photo">
<img src="${esc(p.src)}" alt="${esc(p.spot)} xotirasi">
<span>${esc(p.spot)}</span>
<button type="button" aria-label="${esc(p.spot)} suratini o‘chirish" data-memory-remove="${esc(p.key)}" data-memory-city="${city}">×</button>
</article>`).join('')}</div>` : `<div class="memory-empty">${icon('globe')}<span>Hali surat yo‘q. Birinchi esdalik rasmingizni qo‘shing.</span>
</div>`}<p class="memory-note">Beta demo: suratlar siqilib, faqat shu brauzerda saqlanadi. Ular ommaviy galereyaga yuborilmaydi.</p>
</section>`;
}
export async function compactMemoryPhoto(file) {
  if (!file.type.startsWith('image/')) throw new Error('Faqat rasm fayllari qabul qilinadi.');
  if (file.size > 20 * 1024 * 1024) throw new Error('Har bir rasm 20 MB dan kichik bo‘lishi kerak.');
  const bitmap = await createImageBitmap(file),
    scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height)),
    canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas.toDataURL('image/jpeg', .65);
}
export function initMemories() {
  document.addEventListener('change', async e => {
    const input = e.target.closest('#memory-upload');
    if (!input || !input.files?.length) return;
    if (uploading) return;
    const city = input.dataset.memoryCity,
      existing = state.memoryPhotos && state.memoryPhotos[city] || [],
      files = Array.from(input.files),
      existingTotal = Object.values(state.memoryPhotos || {}).reduce((sum, list) => sum + list.length, 0);
    if (existingTotal + files.length > 5) {
      toast(`Jami yana faqat ${5 - existingTotal} ta rasm qo‘sha olasiz.`);
      input.value = '';
      return;
    }
    const spot = $('#memory-place')?.value || 'Sayohat xotirasi',
      y = window.scrollY;
    uploading = true;
    input.disabled = true;
    try {
      const added = [];
      for (const file of files) added.push({
        key: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
        spot,
        src: await compactMemoryPhoto(file)
      });
      state.memoryPhotos = state.memoryPhotos || {};
      state.memoryPhotos[city] = [...existing, ...added];
      if (!persist()) {
        state.memoryPhotos[city] = existing;
        toast('Brauzer xotirasi to‘ldi. Boshqa saqlangan rasmlarni o‘chirib, qayta urinib ko‘ring.');
        input.value = '';
        return;
      }
      render();
      window.scrollTo(0, y);
      toast(`${added.length} ta rasm xotiralarga saqlandi.`);
    } catch (err) {
      toast(err.message || 'Rasmni ochib bo‘lmadi. Boshqa rasm tanlang.');
      input.value = '';
    } finally {
      uploading = false;
      input.disabled = false;
    }
  });
  document.addEventListener('click', e => {
    const remove = e.target.closest('[data-memory-remove]');
    if (remove) {
      const y = window.scrollY,
        city = remove.dataset.memoryCity;
      state.memoryPhotos[city] = (state.memoryPhotos[city] || []).filter(p => p.key !== remove.dataset.memoryRemove);
      persist();
      render();
      window.scrollTo(0, y);
      return;
    }
  });
}
