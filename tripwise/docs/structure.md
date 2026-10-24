# Tripwise papkalari

```text
tripwise/
│
├── apps/                             # Alohida ilovalar
│   │
│   ├── customer/                     # MIJOZLAR
│   │   ├── web/                      # Telefon va kompyuter uchun sayt
│   │   ├── mobile/                   # Android va iPhone ilovasi
│   │   └── shared/                   # Sayt va ilovaga umumiy mantiq
│   │       ├── onboarding/           # Til tanlash, kirish animatsiyasi
│   │       ├── auth/                 # Ro‘yxatdan o‘tish va kirish
│   │       ├── home/                 # Bosh sahifa, takliflar, reklama
│   │       ├── search/               # Qidiruv va filtrlar
│   │       ├── flights/              # Aviachiptalar
│   │       ├── tours/                # Tur paketlar
│   │       ├── hotels/               # Mehmonxonalar
│   │       ├── destinations/         # Davlat va shahar qo‘llanmalari
│   │       ├── trip-planner/         # Sayohat rejasi va AI yordamchi
│   │       ├── booking/              # Bron va buyurtma jarayoni
│   │       ├── payments/             # To‘lov holatlari
│   │       ├── my-trips/             # Mijozning safarlari
│   │       ├── favorites/            # Saqlangan takliflar
│   │       ├── memories/             # Esdalik rasmlari — jami 5 ta
│   │       ├── profile/              # Profil va sozlamalar
│   │       └── support/              # Yordam va murojaatlar
│   │
│   ├── flight-partner/               # AVIAKASSALAR
│   │   ├── mobile/                   # Shaxsiy tarqatiladigan Android APK
│   │   ├── desktop/                  # Kompyuterga o‘rnatiladigan dastur
│   │   └── shared/
│   │       ├── dashboard/            # Umumiy ko‘rsatkichlar
│   │       ├── offers/               # Aviachipta takliflarini boshqarish
│   │       ├── orders/               # Buyurtmalar
│   │       ├── refunds/              # Bekor qilish va qaytarish so‘rovlari
│   │       ├── finance/              # Hisob-kitoblar
│   │       └── company/              # Kompaniya ma’lumotlari
│   │
│   ├── tour-partner/                 # TUR AGENTLIKLARI
│   │   ├── mobile/                   # Shaxsiy tarqatiladigan Android APK
│   │   ├── desktop/                  # Kompyuter dasturi
│   │   └── shared/
│   │       ├── dashboard/            # Umumiy ko‘rsatkichlar
│   │       ├── packages/             # Tur paketlarni yaratish va tahrirlash
│   │       ├── departures/           # Safar sanalari va mavjud o‘rinlar
│   │       ├── orders/               # Buyurtmalar
│   │       ├── finance/              # Hisob-kitoblar
│   │       └── company/              # Kompaniya ma’lumotlari
│   │
│   └── super-admin/                  # PLATFORMANI BOSHQARISH
│       └── web/
│           ├── dashboard/            # Umumiy statistika
│           ├── customers/            # Mijozlar boshqaruvi
│           ├── partner-applications/ # Hamkorlik arizalari
│           ├── partners/             # Tasdiqlash, ruxsat, bloklash
│           ├── moderation/           # Takliflarni tekshirish
│           ├── orders/               # Barcha buyurtmalar
│           ├── finance/              # To‘lov, komissiya va qaytarishlar
│           ├── content/              # Manzillar, maqolalar, reklama
│           ├── reports/              # Hisobot va statistika
│           ├── support/              # Murojaatlar
│           ├── app-releases/         # Hamkor ilovalari versiyalari
│           ├── audit-log/            # Kim, qachon, nimani o‘zgartirdi
│           └── settings/             # Platforma sozlamalari
│
├── backend/                          # Barcha ilovalarga umumiy server
│   ├── api/                          # Ilovalardan keladigan so‘rovlar
│   ├── modules/                      # Asosiy biznes qoidalari
│   │   ├── auth/                     # Kirish va ruxsatlarni tekshirish
│   │   ├── customers/
│   │   ├── partners/
│   │   ├── catalog/                  # Takliflar, narx va mavjudlik
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── media/                    # Rasm va video yuklash
│   │   ├── notifications/
│   │   ├── ai/
│   │   └── analytics/
│   ├── integrations/                 # Tashqi chipta, to‘lov va AI xizmatlari
│   └── jobs/                         # Fon vazifalari va xabarnomalar
│
├── packages/                         # Qayta foydalaniladigan umumiy qismlar
│   ├── design-tokens/                # Ranglar, shriftlar, o‘lchamlar
│   ├── ui-web/                       # Sayt va kompyuter interfeys elementlari
│   ├── ui-mobile/                    # Telefon interfeys elementlari
│   ├── api-client/                   # Server bilan aloqa
│   ├── contracts/                    # Ilova-server ma’lumot shakllari
│   ├── validation/                   # Forma ma’lumotlarini tekshirish
│   └── translations/                 # O‘zbekcha, inglizcha va boshqa tillar
│
├── database/
│   ├── schema/                       # Ma’lumotlar tuzilishi
│   ├── migrations/                   # Bazadagi o‘zgarishlar tarixi
│   └── seeds/                        # Dastlabki sinov ma’lumotlari
│
├── assets/
│   ├── brand/                        # Tripwise logotipi va belgilar
│   ├── icons/
│   └── intro/                        # Kirish animatsiyasi materiallari
│
├── infrastructure/                   # Serverni joylash va muhit sozlamalari
├── scripts/                          # Loyihani ishga tushirish yordamchilari
├── docs/                             # Tushuntirishlar va ish rejasi
├── prototypes/                       # Oldingi beta dizayn
├── .env.example                      # Kerakli sozlamalar namunasi
└── README.md                         # Loyihani qanday ochish va ishlatish
```
