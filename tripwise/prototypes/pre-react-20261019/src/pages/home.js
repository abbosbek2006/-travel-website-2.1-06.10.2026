import { imgs, tours } from "../data/catalog.js";
import { icon } from "../components/icons.js";
import { searchForm } from "../components/search.js";
import { state } from "../core/store.js";
import { money } from "../core/format.js";
import { tourCard } from "../components/tour-card.js";
export function home() {
  return `<section class="hero premium-hero">
<img src="${imgs.istanbul}" alt="Istanbul va Bosfor manzarasi">
<div class="hero-content">
<div class="eyebrow">
<span class="eyebrow-dot">
</span>TRIPWISE · SAYOHAT OSONROQ</div>
<h1>Dunyo sizni<br>kutmoqda.</h1>
<p>G‘oya toping. Safaringizni rejalang.<br>Sayohatga yengil qadam qo‘ying.</p>
<div class="hero-actions">
<a class="btn hero-cta" href="#browse">${icon('search')}Sayohatni boshlash</a>
<a class="hero-link" href="#destinations">Yo‘nalishlarni kashf etish <span>↗</span>
</a>
</div>
</div>
<div class="hero-sidecard">
<div class="eyebrow">BU HAFTANING MANZILI</div>
<h3>Istanbul</h3>
<p>Bosfor bo‘yidagi yangi taassurotlar.</p>
<div class="row">
<span class="hero-rating">★ 4.9 <small>namunaviy baho</small>
</span>
<a href="#guide/istanbul" aria-label="Istanbul qo‘llanmasini ochish">↗</a>
</div>
<div class="hero-photo-caption">${icon('pin')} Turkiya · 7 kunlik g‘oya</div>
</div>
<div class="hero-pagination">
<span class="on">
</span>
<span>
</span>
<span>
</span>
<small>01 / 03</small>
</div>
</section>
<div id="browse">${searchForm()}</div>
<div class="perks premium-perks">
<span>${icon('shield')}Hamkor takliflarini solishtiring</span>
<span>${icon('wallet')}Narxlar ochiq ko‘rsatiladi</span>
<span>${icon('spark')}Sizga mos safar rejasi</span>
<span>${icon('help')}Safar haqida foydali maslahatlar</span>
</div>
<section class="mood-section">
<div class="sectionhead">
<div>
<span class="eyebrow blue-eyebrow">ILHOMNI TANLANG</span>
<h2>Bugun qaysi sayohat kayfiyati sizga yaqin?</h2>
<p>Birini bosing — sizga mos takliflarni ko‘rsatamiz.</p>
</div>
<a class="textbtn small" href="#destinations">Barcha yo‘nalishlar</a>
</div>
<div class="mood-grid">
<button class="mood-card ${!state.homeMood || state.homeMood === 'all' ? 'active' : ''}" data-act="mood" data-id="all">
<span class="mood-icon">✳</span>
<span>
<strong>Hamma taassurotlar</strong>
<small>Barcha yo‘nalishlarni ko‘rish</small>
</span>${icon('back')}</button>
<button class="mood-card ${state.homeMood === 'Madaniyat' ? 'active' : ''}" data-act="mood" data-id="Madaniyat">
<span class="mood-icon">◈</span>
<span>
<strong>Tarix va madaniyat</strong>
<small>Ko‘chalar, muzeylar, taomlar</small>
</span>${icon('back')}</button>
<button class="mood-card ${state.homeMood === 'Shahar' ? 'active' : ''}" data-act="mood" data-id="Shahar">
<span class="mood-icon">⌂</span>
<span>
<strong>Shahar energiyasi</strong>
<small>Yorqin manzaralar va yangi joylar</small>
</span>${icon('back')}</button>
<button class="mood-card ${state.homeMood === 'Dengiz' ? 'active' : ''}" data-act="mood" data-id="Dengiz">
<span class="mood-icon">⌁</span>
<span>
<strong>Dengiz va sokinlik</strong>
<small>Sohil, quyosh, erkin vaqt</small>
</span>${icon('back')}</button>
</div>
</section>
<section>
<div class="sectionhead">
<div>
<span class="eyebrow blue-eyebrow">SIZNING KEYINGI MANZILINGIZ</span>
<h2>Yaqinroq tanishing</h2>
<p>Har bir manzil — o‘ziga xos taassurotlar.</p>
</div>
<a class="textbtn small" href="#destinations">Barchasini ko‘rish</a>
</div>
<div class="destgrid premium-dest">${tours.map(t => `<button class="destination" data-go="guide/${t.id}">
<img src="${imgs[t.image]}" alt="${t.city} manzarasi" loading="lazy">
<span class="destination-eyebrow">${t.country} · ${t.days} kunlik g‘oya</span>
<strong>${t.city}</strong>
<span class="destination-price">Turlar ${money(t.price)} dan <b>↗</b>
</span>
</button>`).join('')}</div>
</section>
<section class="premium-offers">
<div class="sectionhead">
<div>
<span class="eyebrow blue-eyebrow">MUHARRIR TANLOVI</span>
<h2 id="offer-title">${state.homeMood && state.homeMood !== 'all' ? state.homeMood + ' uchun g‘oyalar' : 'Sayohat uchun yaxshi g‘oyalar'}</h2>
<p id="offer-subtitle">Siz tanlagan kayfiyatga mos takliflardan boshlang.</p>
</div>
<a class="textbtn small" href="#tours">Barcha tur paketlar ↗</a>
</div>
<div class="cards" id="home-offers">${tours.filter(t => !state.homeMood || state.homeMood === 'all' || t.style === state.homeMood).map(tourCard).join('') || '<div class="notice">Bu kayfiyat uchun yangi takliflar tez orada qo‘shiladi. Boshqa yo‘nalishlarni ham ko‘ring.</div>'}</div>
</section>
<section class="editorial">
<div class="editorial-image">
<img src="${imgs.dubai}" alt="Dubayning kechki manzarasi" loading="lazy">
<span class="editorial-tag">3 QADAMDA OSONROQ</span>
</div>
<div class="editorial-copy">
<span class="eyebrow blue-eyebrow">SAFAR SIZNIKI</span>
<h2>Rejangiz aniq bo‘lsa, sayohat tezroq boshlanadi.</h2>
<p>Manzilni tanlang. Budjetingizni belgilang. Kunlik marshrutni ko‘rib chiqing — sizga mos takliflarni solishtirish osonlashadi.</p>
<a class="btn" href="#planner">${icon('spark')}Shaxsiy reja tuzish</a>
<div class="editorial-proof">
<span>${icon('check')}Kunlar bo‘yicha reja</span>
<span>${icon('check')}Xarajatlar taqsimoti</span>
</div>
</div>
</section>
<section class="ai-banner premium-ai">
<div class="aibadge">${icon('spark')}</div>
<div>
<span class="eyebrow blue-eyebrow">TRIPWISE YORDAMCHISI</span>
<h3>Savolingizni bering, rejangizni birga tuzamiz.</h3>
<p>Yo‘nalish bo‘yicha g‘oyalar, kunlik reja va budjet ko‘rinishi.</p>
</div>
<a class="btn" href="#ai">Yordamchiga o‘tish</a>
</section>
<section class="bottom-discovery">
<div>
<span class="eyebrow blue-eyebrow">DAVOM ETING</span>
<h2>Keyingi qadam oddiy.</h2>
<p>O‘zingizga mos tur yoki yo‘nalishni tanlang.</p>
</div>
<div>
<a class="btn" href="#tours">Turlarni solishtirish</a>
<a class="btn white" href="#flights">Aviachiptalarni ko‘rish</a>
</div>
</section>`;
}
