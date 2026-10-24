import React from "react";
import { pagehead } from "../components/layout.jsx";
import { imgs, tours } from "../data/catalog.js";
import { session } from "../core/session.js";
import { icon } from "../components/icons.jsx";
import { money } from "../core/format.js";
import { state } from "../core/store.js";
import { MemoryGallery } from "../features/memories.jsx";
function DestinationsPage() {
  return <>{pagehead('Yo‘nalishlarni kashf eting', 'Madaniyat, shahar hayoti yoki dengiz bo‘yida dam olish.')}<div className="cards">{tours.map((t, index) => <article className="card" key={index}>
<div className="cardimage"><img src={imgs[t.image]} alt={t.city} /></div>
<div className="cardbody">
<span className="pill">{t.country}</span>
<h2 style={{
            "margin": "15px 0"
          }}>{t.city}</h2>
<p className="muted">{t.desc}</p>
<a className="btn light" href={`#guide/${t.id}`}>Qo‘llanmani ochish</a>
</div>
</article>)}</div></>;
}
export { DestinationsPage };
function DestinationContent(id) {
  const t = tours.find(t => t.id === id) || tours[0];
  const info = {
    istanbul: ['Turk lirasi · TRY', 'Turk tili', 'UTC+3', 'Bosfor, Galata, Sultonahmad'],
    dubai: ['Dirham · AED', 'Arab tili', 'UTC+4', 'Marina, eski shahar, sohil'],
    thai: ['Tailand bati · THB', 'Tay tili', 'UTC+7', 'Sohillar, orollar, tabiat']
  }[t.id];
  return <>{pagehead(`${t.city}, ${t.country}`, 'Safardan oldin bilish foydali bo‘lgan ma’lumotlar.')}<div className="detailhero"><img src={imgs[t.image]} alt={t.city} /></div><div className="tabs">{[['overview', 'Umumiy'], ['places', 'Joylar'], ['transport', 'Transport va budjet'], ['checklist', 'Safarga tayyorgarlik']].map(([id, n], index) => <button className={`tab ${session.guideTab === id ? 'active' : ''}`} data-act="guide-tab" data-id={id} key={index}>{n}</button>)}</div>{session.guideTab === 'overview' ? <><div className="three">{info.slice(0, 3).map((v, i) => <div className="fact" key={i}>
{icon(['wallet', 'globe', 'clock'][i])}
<strong>{v}</strong>
<small>{['Pul birligi', 'Mahalliy til', 'Vaqt mintaqasi'][i]}</small>
</div>)}</div><div className="sectionhead"><h2>
{t.city}
{" haqida"}
</h2></div><p>{t.desc}</p><div className="two">
<div className="panel">
<h3>Sayohat ritmi</h3>
<p className="muted">Asosiy joylarga ertalab boring. Kun davomida dam olish uchun tanaffus qoldiring va transport vaqtini rejangizga qo‘shing.</p>
</div>
<div className="panel">
<h3>Mahalliy madaniyat</h3>
<p className="muted">Tarixiy va diniy joylardagi kiyinish hamda suratga olish qoidalariga amal qiling. Xizmat narxini oldindan aniqlang.</p>
</div>
</div></> : session.guideTab === 'places' ? <div className="three">{info[3].split(', ').map((p, i) => <div className="panel" key={i}>
<span className="pill">
0
{i + 1}
</span>
<h3 style={{
          "marginTop": "16px"
        }}>{p}</h3>
<p className="muted">Sayr va tanishish uchun namunaviy yo‘nalish. Ish vaqti va kirish narxini tashrifdan oldin tekshiring.</p>
<a className="btn light sm" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p + ' ' + t.city)}`} target="_blank" rel="noopener noreferrer">
{icon('map')}
Xaritada ko‘rish
</a>
</div>)}</div> : session.guideTab === 'transport' ? <div className="two">
<div className="panel">
<h3>Transport variantlari</h3>
<ul className="list">
<li>
{icon('check')}
Jamoat transporti — tejamkor tanlov
</li>
<li>
{icon('check')}
Rasmiy taksi — manzilgacha qulay
</li>
<li>
{icon('check')}
Oldindan kelishilgan transfer
</li>
</ul>
<p className="footnote">Narx va qatnov vaqtlarini xizmatning rasmiy sahifasida tekshiring.</p>
</div>
<div className="panel">
<h3>Namunaviy kunlik budjet</h3>
{[['Ovqatlanish', 25], ['Transport', 10], ['Sayr va kirish chiptalari', 20]].map(([n, p], index) => <div className="row" style={{
          "margin": "17px 0"
        }} key={index}>
<span>{n}</span>
<strong>{money(p)}</strong>
</div>)}
<div className="notice">Bir kishi uchun taxminiy demo hisob. Mehmonxona kiritilmagan.</div>
</div>
</div> : <div className="panel">
<h3>Safar ro‘yxati</h3>
{['Pasport va safar hujjatlari', 'Viza hamda kirish qoidalarini rasmiy manbadan tekshirish', 'Sug‘urta variantlarini ko‘rib chiqish', 'Aviachipta va mehmonxona vaucheri', 'Internet yoki eSIM', 'Aeroportdan manzilgacha transport', 'Muhim kontaktlar va oflayn nusxalar'].map((s, i) => <label className="check" key={i}>
<input type="checkbox" data-check={`${t.id}-${i}`} defaultChecked={(state.checks || []).includes(t.id + '-' + i)} />
{s}
</label>)}
<div className="notice warn">Viza va kirish talablari bu demoda tasdiqlanmaydi. Safar oldidan konsullik va tashuvchi ma’lumotlarini tekshiring.</div>
</div>}<section className="ai-banner">
<div className="aibadge">{icon('spark')}</div>
<div>
<h3>
{t.city}
{" uchun shaxsiy reja"}
</h3>
<p>Qiziqishlaringizga mos kunlik dastur tuzing.</p>
</div>
<button className="btn" data-act="plan-city" data-id={t.id}>Reja tuzish</button>
</section></>;
}
export { DestinationContent };
function DestinationPage({
  id
}) {
  if (!tours.some(tour => tour.id === id)) return <section className="panel empty">
<h1>Yo‘nalish topilmadi</h1>
<a className="btn" href="#destinations">Yo‘nalishlarni ko‘rish</a>
</section>;
  return <>{DestinationContent(id)}{MemoryGallery(id)}</>;
}
export { DestinationPage };
