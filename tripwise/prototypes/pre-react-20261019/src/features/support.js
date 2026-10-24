import { pagehead, side } from "../components/layout.js";
import { state } from "../core/store.js";
import { esc } from "../core/dom.js";
import { icon } from "../components/icons.js";
export function support() {
  return `${pagehead('Yordam va xabarlar', 'Savollaringizga javob toping.')}<div class="account">${side('support')}<section class="stack">
<div class="panel">
<h2>Tez-tez so‘raladigan savollar</h2>${[['Bu yerda chipta sotib olsam bo‘ladimi?', 'Bu interaktiv demo. Qidiruv, tanlash va bron jarayonini sinash mumkin; real xizmat band qilinmaydi.'], ['Buyurtmani qanday bekor qilaman?', 'Safarlarim bo‘limida buyurtma kartochkasidagi Bekor qilish tugmasini bosing va tasdiqlang.'], ['Saqlanganlar boshqa telefonda ko‘rinadimi?', 'Hozircha yo‘q. Demo ma’lumotlari har bir brauzerda alohida saqlanadi.'], ['AI javoblari qayerdan keladi?', 'Ushbu beta tayyor javoblar va reja qoidalaridan foydalanadi. Jonli AI keyingi bosqichda ulanadi.']].map(([q, a]) => `<details>
<summary>${q}</summary>
<p>${a}</p>
</details>`).join('')}</div>
<div class="panel">
<h3>Demo murojaat</h3>
<p class="muted">Forma holatini sinang. Xabar haqiqiy operatorga yuborilmaydi.</p>
<form id="support-form" class="stack">
<label class="field">Mavzu<select name="topic">
<option>Bron haqida</option>
<option>To‘lov haqida</option>
<option>Taklif va fikr</option>
</select>
</label>
<label class="field">Xabaringiz<textarea name="message" required minlength="5" maxlength="2000" placeholder="Fikringizni yozing...">
</textarea>
</label>
<button class="btn" style="justify-self:start">Demo murojaatni saqlash</button>
</form>${(state.requests || []).map(r => `<div class="notice" style="margin-top:15px">
<strong>${esc(r.topic)} · Qurilmada saqlangan</strong>
<p>${esc(r.message)}</p>
</div>`).join('')}</div>
</section>
</div>`;
}
export function statesPage() {
  return `${pagehead('Xizmat holatlari', 'Har bir holatni tugma orqali sinab ko‘ring.')}<div class="statesgrid">${[['search', 'Natija topilmadi', 'Filtrga mos taklif bo‘lmasa ko‘rsatiladi.', 'empty-state', 'Sinash'], ['wifi', 'Internet aloqasi yo‘q', 'Ulanish tiklanganda qayta urinish.', 'offline-state', 'Sinash'], ['wallet', 'To‘lov amalga oshmadi', 'Xato va muqobil to‘lov variantlari.', 'payment-error', 'Sinash'], ['clock', 'Bron muddati tugadi', 'Qidiruvni yangilash taklifi.', 'expired-state', 'Sinash'], ['chart', 'Narx o‘zgardi', 'Yangi narxni qabul qilish alohida talab qilinadi.', 'price-state', 'Sinash'], ['spark', 'Yuklanish', 'Ma’lumotlar kelguncha qisqa holat.', 'loading-state', 'Sinash']].map(([i, t, s, a, b]) => `<div class="panel state">${icon(i)}<h3>${t}</h3>
<p>${s}</p>
<button class="btn light" data-act="${a}">${b}</button>
</div>`).join('')}</div>`;
}
