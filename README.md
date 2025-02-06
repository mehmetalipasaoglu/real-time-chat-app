# ChatApp - Real-Time Chat Application

Bu proje, gerçek zamanlı mesajlaşma sağlayan bir **SignalR** tabanlı sohbet uygulamasıdır. **.NET Core** ve **React (Vite)** kullanılarak geliştirilmiştir.

## ✨ Teknolojiler

Bu projede aşağıdaki teknolojiler kullanılmıştır:

- **Back-End:** .NET Core, C#, SignalR, Entity Framework
- **Front-End:** React, TypeScript, Vite
- **Veri Tabanı:** MongoDB
- **Gerçek Zamanlı Haberleşme:** SignalR

## 🚀 Özellikler
- **Gerçek Zamanlı Mesajlaşma:** SignalR kullanarak anlık iletişim.
- **Oda Sistemi:** Kullanıcılar farklı odalara katılabilir.
- **Kimlik Doğrulama:** Kullanıcı oturum açabilir ve doğrulama sağlanır.
- **Mesaj Geçmişi:** Oda bazlı mesaj geçmişi saklanır.

## ⚖️ Proje Mimarisi

Proje, **Clean Architecture** prensiplerine uygun olarak aşağıdaki gibi organize edilmiştir:

```
ChatApp/
├── Backend/
│   ├── ChatService/
│   │   ├── Hubs/
│   │   ├── Models/
│   │   ├── Services/
│   ├── Program.cs
│   ├── Startup.cs
│   ├── appsettings.json
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.tsx
│   ├── vite.config.ts
│   ├── package.json
│
└── README.md
```

## 🚀 Kurulum

### 1️⃣ Backend (API) Kurulumu
```bash
# Backend klasörüne girin
cd backend

# Bağımlılıkları yükleyin
dotnet restore

#Veri tabanını migrate edin:#
dotnet ef database update

# Uygulamayı çalıştırın
dotnet run
```

**MongoDB bağlantısını yapılandırmak için:**
- `appsettings.json` dosyasında `ConnectionStrings:MongoDb` alanını kendi MongoDB bağlantı URI’nizle değiştirin.
```json
"ConnectionStrings": {
  "MongoDb": "mongodb+srv://username:password@cluster.mongodb.net/DatabaseName"
}
```
- MongoDB çalıştırmak için **Docker** kullanabilirsiniz:
```bash
docker run -d -p 27017:27017 --name mongo-container mongo
```

### 2️⃣ Frontend (React) Kurulumu
```bash
# Frontend klasörüne girin
cd frontend

# Bağımlılıkları yükleyin
npm install  #
# React uygulamasını çalıştırın
npm run dev  #
```

## 📜 API Endpoint'leri
| Metot  | Endpoint            | Açıklama                      |
|--------|---------------------|--------------------------------|
| GET    | `/api/messages`     | Mesaj geçmişini getirir       |
| POST   | `/api/messages`     | Yeni mesaj gönderir           |
| POST   | `/api/auth/login`   | Kullanıcı girişi yapar        |
| POST   | `/api/auth/register`| Kullanıcı kaydı oluşturur     |


## 🎯 Katkıda Bulunun
1. Bu repo'yu forklayın.
2. Yeni bir dal oluşturun (`git checkout -b yeni-ozellik`).
3. Değişikliklerinizi işleyin (`git commit -m 'Yeni özellik eklendi'`).
4. Dallanızı gönderin (`git push origin yeni-ozellik`).
5. Bir **Pull Request** açın!



---

## 🌟 Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen aşağıdaki adımları takip edin:

1. Depoyu forklayın
2. Yeni bir branch oluşturun (`git checkout -b feature-ismi`)
3. Değişikliklerinizi yapın ve commit atın (`git commit -m 'Yeni özellik ekledim'`)
4. Değişiklikleri push edin (`git push origin feature-ismi`)
5. Bir pull request oluşturun

---

## 🛠️ Sorunlar ve Geri Bildirim

Herhangi bir hata veya geliştirme öneriniz varsa, lütfen bir [GitHub Issue](https://github.com/mehmetalipasaoglu/ChatAppWsignalR/issues) oluşturun.

---

Bu proje, gerçek zamanlı uygulamalar geliştirme konusunda öğrenme amaçlı oluşturulmuştur. Katkılarınız ve geri bildirimleriniz benim için çok değerlidir! 🚀


























## 📄 Lisans
MIT Lisansı altında dağıtılmaktadır. Daha fazla bilgi için `LICENSE` dosyasına bakabilirsiniz.

---
✨ **Projeye katkılarınızı bekliyoruz!** 🚀

