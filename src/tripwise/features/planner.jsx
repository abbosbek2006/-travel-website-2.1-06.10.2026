import React from "react";
import { Select } from "../components/Select.jsx";
import { state } from "../core/store.js";
import { pagehead } from "../components/layout.jsx";
import { tours } from "../data/catalog.js";
import { icon } from "../components/icons.jsx";
import { itinerary } from "../pages/tours.jsx";
import { session } from "../core/session.js";
import { money } from "../core/format.js";
function PlannerPage() {
  const selected = state.destination === 'all' ? 'istanbul' : state.destination;
  return <>{pagehead('Sayohatingizni birga rejalaymiz', 'Manzil va istaklaringiz asosida namunaviy marshrut.')}<div className="detailgrid">
<form id="planner-form" className="panel">
<div className="notice" style={{
          "marginBottom": "23px"
        }}>AI demo: tayyor qoidalar asosida reja tuziladi. Jonli AI xizmati hali ulanmagan.</div>
<div className="two">
<label className="field">
Manzil
<Select name="city">{tours.map((t, index) => <option value={t.id} selected={t.id === selected} key={index}>
{t.city}
{", "}
{t.country}
</option>)}</Select>
</label>
<label className="field">
Davomiylik
<Select name="days">{[3, 5, 7, 10].map((n, index) => <option value={n} selected={n === 7} key={index}>
{n}
{" kun"}
</option>)}</Select>
</label>
<label className="field">
Jami budjet (USD)
<input name="budget" type="number" min="300" max="50000" step="50" defaultValue="1500" required={true} />
</label>
<label className="field">
Sayohatchilar
<input name="people" type="number" min="1" max="10" defaultValue={state.people} required={true} />
</label>
</div>
<h3 style={{
          "marginTop": "25px"
        }}>Nimalarga qiziqasiz?</h3>
<div className="chips">{['Madaniyat', 'Taomlar', 'Tabiat', 'Xaridlar', 'Oila bilan'].map((s, i) => <label className="check" key={i}>
<input type="checkbox" name="interest" defaultValue={s} defaultChecked={i === 0} />
{s}
</label>)}</div>
<label className="field" style={{
          "margin": "20px 0"
        }}>
Sayohat sur’ati
<Select name="pace">
<option>Sokin</option>
<option selected={true}>Muvozanatli</option>
<option>Faol</option>
</Select>
</label>
<button className="btn full">
{icon('spark')}
Reja yaratish
</button>
</form>
<aside className="panel sticky">
<span className="pill">Sizga mos</span>
<h2 style={{
          "margin": "17px 0"
        }}>
Har bir kunning
<br />
o‘z hikoyasi bor.
</h2>
<p className="muted">Kunlik marshrut, xarajatlar taqsimoti va mos tur takliflarini bir joyda ko‘ring.</p>
<ul className="list">
<li>
{icon('check')}
Budjetga mos hisob
</li>
<li>
{icon('check')}
O‘zgartiriladigan faoliyatlar
</li>
<li>
{icon('check')}
Qurilmangizga saqlanadigan reja
</li>
</ul>
<a className="textbtn" href="#ai">Yordamchi bilan suhbat</a>
</aside>
</div></>;
}
export { PlannerPage };
function PlanPage() {
  if (!state.plan) return PlannerPage();
  const p = state.plan,
    t = tours.find(t => t.id === p.city);
  const cats = [['Aviachiptalar', .4], ['Turar joy', .28], ['Ovqatlanish', .14], ['Transport', .06], ['Sayrlar', .08], ['Zaxira', .04]];
  const activities = itinerary(t);
  return <>{pagehead(`${t.city}: ${p.days} kunlik rejangiz`, `${p.people} kishi · ${p.pace} · ${p.interests.join(', ') || 'Erkin sayohat'}`)}<div className="detailgrid">
<section className="panel">
<div className="row">
<h2>Kunlik marshrut</h2>
<a className="btn white sm" href="#planner">
{icon('edit')}
O‘zgartirish
</a>
</div>
<div className="tabs" style={{
          "marginTop": "15px"
        }}>{Array.from({
            length: p.days
          }, (_, i) => <button className={`tab ${session.selectedDay === i + 1 ? 'active' : ''}`} data-act="day" data-id={i + 1}>
{i + 1}
-kun
</button>).join('')}</div>
<h3>{activities[(session.selectedDay - 1) % activities.length]}</h3>
<div className="timeline">{[['09:00', 'Nonushta va kunni rejalash', 'Mehmonxona yaqinida, shoshilmasdan.'], ['10:00', p.replaced?.[session.selectedDay] ? 'Mahalliy bog‘ va sokin sayr' : activities[(session.selectedDay - 1) % activities.length], p.pace === 'Faol' ? '3–4 soat faol tanishuv.' : '1–2 soat, tanaffuslar bilan.'], ['13:00', p.interests.includes('Taomlar') ? 'Mahalliy taomlarni tatib ko‘rish' : 'Tushlik va dam olish', 'Budjetdan alohida ulush ajrating.'], ['15:00', p.interests.includes('Oila bilan') ? 'Oila uchun yengil sayr' : 'Erkin sayr va yangi joylar', 'Yo‘l vaqtini ham hisobga oling.'], ['19:00', 'Mehmonxonaga qaytish', 'Keyingi kun uchun tayyorgarlik.']].map(([time, title, desc], index) => <div className="timeline-item" key={index}>
<small>{time}</small>
<h3 style={{
              "margin": "5px 0"
            }}>{title}</h3>
<p>{desc}</p>
</div>)}</div>
<button className="btn light" data-act="replace-activity">
{icon('edit')}
Asosiy faoliyatni almashtirish
</button>
<div className="notice" style={{
          "marginTop": "23px"
        }}>Bu namunaviy reja. Masofa, ish vaqti va mavjudlik jonli tekshirilmagan.</div>
</section>
<aside className="panel sticky">
<h3>Reja budjeti</h3>
<div className="price">{money(p.budget)}</div>
<p className="muted small">
{p.people}
{" kishi uchun jami taxmin"}
</p>
{cats.map(([n, r], index) => <div style={{
          "margin": "17px 0"
        }} key={index}>
<div className="row small">
<span>{n}</span>
<strong>{money(p.budget * r)}</strong>
</div>
<div className="progress" style={{
            "marginTop": "7px"
          }}><span style={{
              "width": `${r * 200}%`
            }} /></div>
</div>)}
<button className="btn full" data-act="download-plan">
{icon('download')}
Rejani yuklab olish
</button>
<button className="btn light full" style={{
          "marginTop": "10px"
        }} data-act="matching-tours" data-id={t.id}>Mos turlarni ko‘rish</button>
<p className="footnote">Reja faqat shu brauzerda saqlanadi.</p>
</aside>
</div></>;
}
export { PlanPage };
