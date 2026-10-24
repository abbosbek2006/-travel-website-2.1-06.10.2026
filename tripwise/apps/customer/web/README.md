# Tripwise — React mijozlar ilovasi

Sayt React komponentlari va JSX orqali chiziladi. HTML fayli faqat React kirish nuqtasi. Dizayn CSS fayllarida saqlanadi.

## Ishga tushirish

Asosiy loyiha papkasida `npm start`. Ishlab chiqarish nusxasi uchun `npm run build`.
Mijozlar ilovasini alohida ishga tushirish: shu papkada `npm start` yoki `npm run build`.

## Manbalar

- `src/App.jsx`: React hayot sikli, sahifa navigatsiyasi va umumiy tuzilma.
- `src/pages/*.jsx`: bosh sahifa, turlar, parvozlar, mehmonxonalar, yo‘nalishlar va bildirishnomalar.
- `src/features/*.jsx`: buyurtma, hisob, yordamchi, reja, esdaliklar, reklama va kirish animatsiyasi.
- `src/components/*.jsx`: qayta ishlatiladigan JSX komponentlari, modal, toast va shakl elementlari.
- `src/core`: ilova holati, React yangilanish signallari va biznes amallari bilan hodisalar bog‘lanishi.
- `src/styles`: mavjud responsiv dizayn.
- `public/assets`: logotip va zaxira tasvirlar.

Asosiy loyiha `src/tripwise` ichiga shu ilova kodining yig‘ish nusxasini avtomatik oladi. Qo‘lda shu nusxani tahrirlamang; asl kod shu ilova papkasida. Hamkorlar va super admin ilovalari alohida papkalarda qoladi.

Avvalgi oddiy JavaScript beta `tripwise/prototypes/pre-react-20261019` papkasida saqlangan.
Haqiqiy login, hamkorlar API, to‘lov va jonli AI hali ulanmagan. Reactga ko‘chirish ushbu xizmatlarni avtomatik ulamaydi.
