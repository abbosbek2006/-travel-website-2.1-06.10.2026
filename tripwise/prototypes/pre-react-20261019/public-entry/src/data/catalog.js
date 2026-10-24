export const imgs = {
  istanbul: 'https://images.squarespace-cdn.com/content/v1/5eb8e2907c57723ce63891ca/1673588720820-LUAUJRDOT6KZL1UWI420/unsplash-image-WA1u0scVLZU.jpg?format=1500w',
  dubai: 'https://images.unsplash.com/photo-1623725259601-b8c41ad6a532?auto=format&fit=crop&w=1200&q=85',
  thai: 'https://images.unsplash.com/photo-1671169151706-fc5ab92fb937?auto=format&fit=crop&w=1200&q=85'
};
export const tours = [{
  id: 'istanbul',
  title: 'Istanbul klassik sayohat',
  city: 'Istanbul',
  country: 'Turkiya',
  price: 690,
  days: 7,
  rating: '4.9',
  reviews: 128,
  image: 'istanbul',
  style: 'Madaniyat',
  partner: 'Nova Travel',
  hotel: 'Bosphorus Garden',
  desc: 'Bosfor bo‘yidagi sayrlar, tarixiy ko‘chalar va turk oshxonasi. Istanbulni o‘z ritmingizda kashf eting.'
}, {
  id: 'dubai',
  title: 'Dubay premium ta’til',
  city: 'Dubay',
  country: 'BAA',
  price: 890,
  days: 6,
  rating: '4.8',
  reviews: 96,
  image: 'dubai',
  style: 'Shahar',
  partner: 'Skyline Tours',
  hotel: 'Marina View',
  desc: 'Zamonaviy arxitektura, shahar chiroqlari va dengiz bo‘yidagi sokin dam olish.'
}, {
  id: 'thai',
  title: 'Tailand — dengiz va orollar',
  city: 'Krabi',
  country: 'Tailand',
  price: 1050,
  days: 8,
  rating: '4.9',
  reviews: 84,
  image: 'thai',
  style: 'Dengiz',
  partner: 'Ocean Holidays',
  hotel: 'Azure Coast',
  desc: 'Moviy dengiz, oq qumli sohillar va orol sayohatlari. Shoshilmasdan dam olish uchun.'
}];
export const flights = [{
  id: 'f1',
  air: 'Uzbekistan Airways',
  code: 'HY 271',
  price: 320,
  depart: '08:50',
  arrive: '11:50',
  hours: '5 soat',
  direct: true,
  bag: 23
}, {
  id: 'f2',
  air: 'Turkish Airlines',
  code: 'TK 369',
  price: 350,
  depart: '14:20',
  arrive: '17:20',
  hours: '5 soat',
  direct: true,
  bag: 23
}, {
  id: 'f3',
  air: 'Flydubai',
  code: 'FZ 1942',
  price: 285,
  depart: '04:00',
  arrive: '12:30',
  hours: '10 soat 30 daq',
  direct: false,
  bag: 0
}];
export const hotels = [{
  id: 'istanbul',
  name: 'Bosphorus Garden',
  price: 128,
  stars: 4,
  rating: 8.9,
  image: 'istanbul',
  city: 'Istanbul',
  breakfast: true
}, {
  id: 'dubai',
  name: 'Marina View',
  price: 175,
  stars: 5,
  rating: 9.2,
  image: 'dubai',
  city: 'Dubay',
  breakfast: true
}, {
  id: 'thai',
  name: 'Azure Coast',
  price: 95,
  stars: 4,
  rating: 8.7,
  image: 'thai',
  city: 'Krabi',
  breakfast: false
}];
export const promoCampaigns = [{
  id: 'istanbul',
  tag: 'MUHARRIR TANLOVI',
  headline: 'Bosfor bo‘yida 7 kun',
  detail: 'Aviachipta · mehmonxona · nonushta',
  discount: 15
}, {
  id: 'dubai',
  tag: 'SHAHAR VA DENGIZ',
  headline: 'Dubayda 6 kunlik dam',
  detail: 'Marina hududi · transfer · aviachipta',
  discount: 12
}, {
  id: 'thai',
  tag: 'OROLLAR SARI',
  headline: 'Krabida 8 kunlik sayohat',
  detail: 'Sohil mehmonxonasi · nonushta · aviachipta',
  discount: 10
}];
export const popularSpots = {
  istanbul: ['Ayasofya', 'Galata minorasi', 'Bosfor', 'Sultonahmad'],
  dubai: ['Burj Xalifa', 'Dubai Marina', 'Eski shahar', 'Palm Jumeirah'],
  thai: ['Railay sohili', 'Phi Phi orollari', 'Ao Nang', 'Emerald Pool']
};
