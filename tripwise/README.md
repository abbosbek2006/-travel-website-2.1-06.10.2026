# Tripwise

To‘rtta alohida mahsulot uchun yagona loyiha. Hozir mijozlar veb-saytining React betasi ishlangan.

| Bo‘lim | Asl kod | Holat |
| --- | --- | --- |
| Mijozlar sayti | `apps/customer/web/src` | React + JSX + CSS beta |
| Mijozlar mobil ilovasi | `apps/customer/mobile` | Keyingi bosqich |
| Tur agentliklari | `apps/tour-partner` | Alohida ilovalar uchun tuzilma |
| Aviakassalar | `apps/flight-partner` | Alohida ilovalar uchun tuzilma |
| Super admin | `apps/super-admin/web` | Alohida panel uchun tuzilma |

## Ishga tushirish

Asosiy loyiha papkasida `npm start`. Tayyor nusxa uchun `npm run build`, uni ko‘rish uchun `npm run preview` — http://127.0.0.1:4175.

Asl mijozlar kodini faqat `apps/customer/web/src` ichida tahrirlang. Asosiy React loyihasining `src/tripwise` papkasi CRA uchun avtomatik tayyorlanadigan nusxa; uni qo‘lda tahrirlamang.

## Mijozlar kodining tuzilishi

- `App.jsx`: React ilovasi va hayot sikli.
- `pages`: bosh sahifa, kataloglar, batafsil sahifalar va bildirishnomalar.
- `components`: umumiy dizayn elementlari, shakllar va dialog.
- `features`: buyurtma, profil, reja, yordamchi, rasmlar va reklama.
- `core`: ilova holati, navigatsiya va saqlash.
- `data`: namunaviy katalog.
- `styles`: responsiv CSS.

Eski HTML/JavaScript beta `prototypes/pre-react-20261019` ichida arxivlangan. Backend, haqiqiy login, to‘lov, hamkorlar API va jonli AI hali ulanmagan.
