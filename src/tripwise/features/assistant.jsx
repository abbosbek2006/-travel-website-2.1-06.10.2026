import React from "react";
import { pagehead } from "../components/layout.jsx";
import { icon } from "../components/icons.jsx";
import { persist, state } from "../core/store.js";
import { $ } from "../core/dom.js";
import { session } from "../core/session.js";
import { render } from "../core/navigation.js";
import { go } from "../core/navigation.js";
function AssistantPage() {
  return <>{pagehead('AI sayohat yordamchisi', 'Safaringiz haqida savol bering yoki reja tuzing.')}<div className="chatlayout">
<aside className="panel chatside">
<h3>Tezkor savollar</h3>
<div className="sidemenu">{['Istanbul uchun 7 kunlik reja', 'Transport haqida', 'Budjetni qanday tejayman?', 'Viza va hujjatlar'].map((t, index) => <button data-act="ask" data-text={t} key={index}>
{icon('spark')}
{t}
</button>)}</div>
<hr className="divider" />
<a className="btn light full" href="#planner">Yangi reja</a>
</aside>
<section className="panel chat">
<div className="chathead row">
<div>
<strong>
{icon('spark')}
{" Tripwise yordamchi"}
</strong>
<div className="small muted">Namunaviy javoblar · Jonli AI ulanmagan</div>
</div>
<button className="iconbtn" data-act="clear-chat" aria-label="Suhbatni tozalash">{icon('close')}</button>
</div>
<div className="messages" id="messages">
<div className="bubble">Salom! Qayerga sayohat qilmoqchisiz? Manzil, davomiylik va budjetni tanlab, demo reja tuzishingiz mumkin.</div>
{state.messages.map((m, index) => <div className={`bubble ${m.role === 'user' ? 'user' : ''}`} key={index}>{m.text}</div>)}
</div>
<form id="chat-form" className="composer">
<input className="control" name="message" placeholder="Masalan, transport haqida ayting" aria-label="Savolingiz" maxLength="1000" required={true} />
<button className="btn" aria-label="Yuborish">{icon('send')}</button>
</form>
</section>
<aside className="panel">
<span className="pill">Safaringiz uchun</span>
<h3 style={{
          "marginTop": "15px"
        }}>Rejadan sayohatgacha</h3>
<p className="muted small">Tayyor marshrutni ko‘rib chiqing, mos tur toping va bron jarayonini sinang.</p>
<a className="btn full" href="#planner">Reja tuzish</a>
<hr className="divider" />
<a href="#destinations">Mamlakat qo‘llanmalari</a>
<p className="footnote">Viza, narx va ish vaqti haqidagi ma’lumotlarni rasmiy manbalarda tekshiring.</p>
</aside>
</div></>;
}
export { AssistantPage };
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
