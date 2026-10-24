# Backend ulanish chegaralari

Frontend React orqali matnni xavfsiz chizadi; HTML matnini bevosita bajarish ishlatilmaydi. Brauzer ma’lumotlari ishonchli manba emas. Demo profil yoki buyurtma serverdagi autentifikatsiya va bron o‘rnini bosmaydi.

Backend qo‘shilganda:

1. Sessiya uchun HttpOnly, Secure va SameSite cookie; cookie asosidagi yozuvchi so‘rovlarga CSRF himoyasi.
2. Har so‘rovda mijoz, hamkor va admin vakolatlarini hamda yozuv egasini tekshirish.
3. Yakuniy narx, chegirma, bo‘sh o‘rin va to‘lov holatini faqat serverda hisoblash.
4. Kiritmalar va fayllarni serverda tekshirish; rasmlar uchun o‘lcham, format va son limitlari.
5. Qidiruv va AIga so‘rov tezligi limiti, sahifalash, kesh, timeout va xarajat cheklovi.
6. Buyurtma va to‘lovda takror so‘rovni bir marta bajarish; to‘lov webhook imzosini tekshirish.
7. API kalitlari va maxfiy sozlamalarni frontendga kiritmaslik.

Frontenddagi limitlar foydalanuvchi qurilmasini yengillashtiradi; ular serverdagi tekshiruvlarning o‘rnini bosmaydi. Hozir jonli backend so‘rovlari yuborilmaydi.
