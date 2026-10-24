import React from "react";
import { Select } from "../components/Select.jsx";
import { pagehead, AccountNavigation } from "../components/layout.jsx";
import { state } from "../core/store.js";
import { icon } from "../components/icons.jsx";
function SupportPage() {
  return <>{pagehead('Yordam va xabarlar', 'Savollaringizga javob toping.')}<div className="account">
{AccountNavigation('support')}
<section className="stack">
<div className="panel">
<h2>Tez-tez so‘raladigan savollar</h2>
{[['Bu yerda chipta sotib olsam bo‘ladimi?', 'Bu interaktiv demo. Qidiruv, tanlash va bron jarayonini sinash mumkin; real xizmat band qilinmaydi.'], ['Buyurtmani qanday bekor qilaman?', 'Safarlarim bo‘limida buyurtma kartochkasidagi Bekor qilish tugmasini bosing va tasdiqlang.'], ['Saqlanganlar boshqa telefonda ko‘rinadimi?', 'Hozircha yo‘q. Demo ma’lumotlari har bir brauzerda alohida saqlanadi.'], ['AI javoblari qayerdan keladi?', 'Ushbu beta tayyor javoblar va reja qoidalaridan foydalanadi. Jonli AI keyingi bosqichda ulanadi.']].map(([q, a], index) => <details key={index}>
<summary>{q}</summary>
<p>{a}</p>
</details>)}
</div>
<div className="panel">
<h3>Demo murojaat</h3>
<p className="muted">Forma holatini sinang. Xabar haqiqiy operatorga yuborilmaydi.</p>
<form id="support-form" className="stack">
<label className="field">
Mavzu
<Select name="topic">
<option>Bron haqida</option>
<option>To‘lov haqida</option>
<option>Taklif va fikr</option>
</Select>
</label>
<label className="field">
Xabaringiz
<textarea name="message" required={true} minLength="5" maxLength="2000" placeholder="Fikringizni yozing..." />
</label>
<button className="btn" style={{
              "justifySelf": "start"
            }}>Demo murojaatni saqlash</button>
</form>
{(state.requests || []).map((r, index) => <div className="notice" style={{
            "marginTop": "15px"
          }} key={index}>
<strong>
{r.topic}
{" · Qurilmada saqlangan"}
</strong>
<p>{r.message}</p>
</div>)}
</div>
</section>
</div></>;
}
export { SupportPage };
function StatesPage() {
  return <>{pagehead('Xizmat holatlari', 'Har bir holatni tugma orqali sinab ko‘ring.')}<div className="statesgrid">{[['search', 'Natija topilmadi', 'Filtrga mos taklif bo‘lmasa ko‘rsatiladi.', 'empty-state', 'Sinash'], ['wifi', 'Internet aloqasi yo‘q', 'Ulanish tiklanganda qayta urinish.', 'offline-state', 'Sinash'], ['wallet', 'To‘lov amalga oshmadi', 'Xato va muqobil to‘lov variantlari.', 'payment-error', 'Sinash'], ['clock', 'Bron muddati tugadi', 'Qidiruvni yangilash taklifi.', 'expired-state', 'Sinash'], ['chart', 'Narx o‘zgardi', 'Yangi narxni qabul qilish alohida talab qilinadi.', 'price-state', 'Sinash'], ['spark', 'Yuklanish', 'Ma’lumotlar kelguncha qisqa holat.', 'loading-state', 'Sinash']].map(([i, t, s, a, b], index) => <div className="panel state" key={index}>
{icon(i)}
<h3>{t}</h3>
<p>{s}</p>
<button className="btn light" data-act={a}>{b}</button>
</div>)}</div></>;
}
export { StatesPage };
