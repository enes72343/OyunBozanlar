// Firebase yapılandırma
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
};

// Firebase'i başlat
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Bildirim izni isteme
function bildirimIzinIste() {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Bildirim izni verildi.');
            // FCM token al
            messaging.getToken({ vapidKey: 'YOUR_VAPID_KEY' }).then((currentToken) => {
                if (currentToken) {
                    console.log('FCM Token:', currentToken);
                    // Token'i sunucuya gönder (backend'e kaydet)
                } else {
                    console.log('Token alınamadı.');
                }
            }).catch((err) => {
                console.log('Token alınırken hata:', err);
            });
        } else {
            console.log('Bildirim izni verilmedi.');
        }
    });
}

// Sayfa yüklendiğinde bildirim izni iste
bildirimIzinIste();

// Duyuruları localStorage'da saklama
let duyurular = JSON.parse(localStorage.getItem('duyurular')) || [];

// Duyuru ekleme formunu dinle
document.getElementById('duyuruEkleForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Formun gönderilmesini engelle

    // Duyuru metnini al
    const duyuruMetni = document.getElementById('duyuruMetni').value;

    // Duyuruyu listeye ekle
    duyurular.push(duyuruMetni);
    localStorage.setItem('duyurular', JSON.stringify(duyurular));

    // Duyuruları ekranda göster
    duyurulariGoster();

    // Bildirim gönder
    bildirimGonder('Yeni Duyuru!', duyuruMetni);

    // Formu temizle
    document.getElementById('duyuruMetni').value = '';
});

// Duyuruları ekranda gösterme fonksiyonu
function duyurulariGoster() {
    const duyuruListesi = document.getElementById('duyuruListesi');
    duyuruListesi.innerHTML = ''; // Listeyi temizle

    duyurular.forEach(function (duyuru) {
        const li = document.createElement('li');
        li.textContent = duyuru;
        duyuruListesi.appendChild(li);
    });
}

// Bildirim gönderme fonksiyonu
function bildirimGonder(baslik, icerik) {
    // Firebase FCM ile bildirim gönder
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'key=YOUR_SERVER_KEY', // Firebase Cloud Messaging Server Key
        },
        body: JSON.stringify({
            to: '/topics/all', // Tüm kullanıcılara gönder
            notification: {
                title: baslik,
                body: icerik,
            },
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Bildirim gönderildi:', data);
    })
    .catch((error) => {
        console.error('Bildirim gönderilirken hata:', error);
    });
}

// Sayfa yüklendiğinde duyuruları göster
duyurulariGoster();
