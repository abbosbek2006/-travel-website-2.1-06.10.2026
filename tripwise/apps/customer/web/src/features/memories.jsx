import React from "react";
import { listen } from "../core/events.js";
import { Select } from "../components/Select.jsx";
import { popularSpots } from "../data/catalog.js";
import { persist, state } from "../core/store.js";
import { $, toast } from "../core/dom.js";
import { icon } from "../components/icons.jsx";
import { render } from "../core/navigation.js";
let uploading = false;
function MemoryGallery(city) {
  const spots = popularSpots[city] || popularSpots.istanbul,
    photos = state.memoryPhotos?.[city] || [],
    totalPhotos = Object.values(state.memoryPhotos || {}).reduce((sum, list) => sum + list.length, 0),
    limitReached = totalPhotos >= 5;
  return <section className="memory-section">
<div className="sectionhead">
<div>
<span className="eyebrow blue-eyebrow">SAYOHAT XOTIRALARI</span>
<h2>Mashhur joylardan esdaliklar</h2>
<p>O‘zingiz olgan suratlarni joy bilan bog‘lab saqlang.</p>
</div>
<span className="memory-count">
{totalPhotos}
{" / 5 rasm"}
</span>
</div>
<div className="memory-upload-row">
<label className="field memory-place">
Surat olingan joy
<Select id="memory-place">{spots.map((s, index) => <option key={index}>{s}</option>)}</Select>
</label>
<label className={`memory-upload ${limitReached ? 'disabled' : ''}`}>
<input type="file" id="memory-upload" data-memory-city={city} accept="image/jpeg,image/png,image/webp" multiple={true} disabled={limitReached} />
<span className="memory-plus">＋</span>
<span>
<strong>{limitReached ? 'Limit to‘ldi' : 'Rasm tanlash'}</strong>
<small>Rasm fayllari · jami 5 tagacha</small>
</span>
</label>
</div>
{photos.length ? <div className="memory-grid">{photos.map((p, index) => <article className="memory-photo" key={index}>
<img src={p.src} alt={`${p.spot} xotirasi`} />
<span>{p.spot}</span>
<button type="button" aria-label={`${p.spot} suratini o‘chirish`} data-memory-remove={p.key} data-memory-city={city}>×</button>
</article>)}</div> : <div className="memory-empty">
{icon('globe')}
<span>Hali surat yo‘q. Birinchi esdalik rasmingizni qo‘shing.</span>
</div>}
<p className="memory-note">Beta demo: suratlar siqilib, faqat shu brauzerda saqlanadi. Ular ommaviy galereyaga yuborilmaydi.</p>
</section>;
}
export { MemoryGallery };
export async function compactMemoryPhoto(file) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Faqat rasm fayllari qabul qilinadi.');
  if (file.size > 20 * 1024 * 1024) throw new Error('Har bir rasm 20 MB dan kichik bo‘lishi kerak.');
  const bitmap = await createImageBitmap(file),
    scale = Math.min(1, 960 / Math.max(bitmap.width, bitmap.height)),
    canvas = document.createElement('canvas');
  if (bitmap.width * bitmap.height > 24000000) {
    bitmap.close();
    throw new Error('Rasm juda katta. 24 megapikseldan kichik rasm tanlang.');
  }
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  return canvas.toDataURL('image/jpeg', .65);
}
export function initMemories() {
  listen(document, 'change', async e => {
    const input = e.target.closest('#memory-upload');
    if (!input || !input.files?.length) return;
    if (uploading) return;
    const city = input.dataset.memoryCity,
      existing = state.memoryPhotos?.[city] || [],
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
        key: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
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
  listen(document, 'click', e => {
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
