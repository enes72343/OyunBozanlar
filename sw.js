// Service Worker Kurulumu
self.addEventListener('install', (event) => {
    console.log('Service Worker yüklendi.');
});

// Bildirimleri Dinleme
self.addEventListener('push', (event) => {
    const data = event.data.json(); // Bildirim verilerini al
    const baslik = data.baslik || 'Yeni Duyuru!';
    const icerik = data.icerik || 'Bir duyuru var.';

    // Bildirimi göster
    event.waitUntil(
        self.registration.showNotification(baslik, {
            body: icerik,
            icon: 'logo.png', // Bildirim ikonu (isteğe bağlı)
            vibrate: [200, 100, 200], // Titreşim (mobilde)
        })
    );
});

// Bildirime Tıklandığında Yapılacak İşlem
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // Bildirimi kapat
    event.waitUntil(
        clients.openWindow('https://www.oyunbozanlar.com') // Bildirime tıklandığında açılacak sayfa
    );
});
