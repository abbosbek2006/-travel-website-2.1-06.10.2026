import { pagehead } from "../components/layout.js";
import { icon } from "../components/icons.js";
import { persist, state } from "../core/store.js";
import { $, esc } from "../core/dom.js";
import { session } from "../core/session.js";
import { render } from "../core/navigation.js";
import { go } from "../core/navigation.js";
export function ai() {
  return `${pagehead('AI sayohat yordamchisi', 'Safaringiz haqida savol bering yoki reja tuzing.')}<div class="chatlayout">
<aside class="panel chatside">
<h3>Tezkor savollar</h3>
<div class="sidemenu">${['Istanbul uchun 7 kunlik reja', 'Transport haqida', 'Budjetni qanday tejayman?', 'Viza va hujjatlar'].map(t => `<button data-act="ask" data-text="${t}">${icon('spark')}${t}</button>`).join('')}</div>
<hr class="divider">
<a class="btn light full" href="#planner">Yangi reja</a>
</aside>
<section class="panel chat">
<div class="chathead row">
<div>
<strong>${icon('spark')} Tripwise yordamchi</strong>
<div class="small muted">Namunaviy javoblar · Jonli AI ulanmagan</div>
</div>
<button class="iconbtn" data-act="clear-chat" aria-label="Suhbatni tozalash">${icon('close')}</button>
</div>
<div class="messages" id="messages">
<div class="bubble">Salom! Qayerga sayohat qilmoqchisiz? Manzil, davomiylik va budjetni tanlab, demo reja tuzishingiz mumkin.</div>${state.messages.map(m => `<div class="bubble ${m.role === 'user' ? 'user' : ''}">${esc(m.text)}</div>`).join('')}</div>
<form id="chat-form" class="composer">
<input class="control" name="message" placeholder="Masalan, transport haqida ayting" aria-label="Savolingiz" maxlength="1000" required>
<button class="btn" aria-label="Yuborish">${icon('send')}</button>
</form>
</section>
<aside class="panel">
<span class="pill">Safaringiz uchun</span>
<h3 style="margin-top:15px">Rejadan sayohatgacha</h3>
<p class="muted small">Tayyor marshrutni ko‘rib chiqing, mos tur toping va bron jarayonini sinang.</p>
<a class="btn full" href="#planner">Reja tuzish</a>
<hr class="divider">
<a href="#destinations">Mamlakat qo‘llanmalari</a>
<p class="footnote">Viza, narx va ish vaqti haqidagi ma’lumotlarni rasmiy manbalarda tekshiring.</p>
</aside>
</div>`;
}
export function ask(text) {
  if (!text.trim()) return;
  const s = text.toLowerCase();
  let reply = s.includes('viza') || s.includes('hujjat') ? 'Viza va kirish talablari fuqaroligingiz, pasportingiz va safar sanasiga bog‘liq. Bu demoda amaldagi qoidalar tekshirilmaydi. Konsullikning rasmiy sahifasidan talablarni aniqlang. Safarga tayyorgarlik ro‘yxatini yo‘nalish qo‘llanmasida belgilab chiqishingiz mumkin.' : s.includes('transport') ? 'Transport uchun uch variantni solishtiring: jamoat transporti, rasmiy taksi va oldindan buyurtma qilingan transfer. Aeroportdan yo‘l vaqtini hisobga oling. Demo reja budjetining 6% qismini transportga ajratadi; bu haqiqiy tarif emas.' : s.includes('budjet') || s.includes('arzon') ? 'Budjetni aviachipta, turar joy, ovqat, transport, sayrlar va zaxiraga ajrating. Reja tuzish sahifasida jami summani o‘zgartirsangiz, xarajatlar qayta hisoblanadi. Muqobil sanalar va mehmonxona tariflarini solishtirish ham foydali.' : 'Sayohat rejasini tuzish uchun “Reja tuzish” bo‘limida manzil, kunlar, sayohatchilar va budjetni tanlang. Demo yordamchi Istanbul, Dubay va Krabi uchun kunlik dastur yaratadi. Hozirgi javoblar tayyor namunalar asosida ishlaydi.';
  state.messages.push({
    role: 'user',
    text
  }, {
    role: 'assistant',
    text: reply
  });
  persist();
  if (session.currentRoute === 'ai') render();else go('ai');
  setTimeout(() => {
    $('#messages')?.scrollTo(0, 99999);
  }, 0);
}
