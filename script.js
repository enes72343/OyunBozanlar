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
    if (Notification.permission === 'granted') {
        new Notification(baslik, {
            body: icerik,
            icon: 'logo.png', // Bildirim ikonu (isteğe bağlı)
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(baslik, {
                    body: icerik,
                    icon: 'logo.png', // Bildirim ikonu (isteğe bağlı)
                });
            }
        });
    }
}

// Sayfa yüklendiğinde duyuruları göster
duyurulariGoster();
