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

// Kartvizit resmi yüklendiğinde çalışacak fonksiyon
document.getElementById('kartvizitYukle').addEventListener('change', function (e) {
    const dosya = e.target.files[0];
    if (dosya) {
        const okuyucu = new FileReader();
        okuyucu.onload = function (e) {
            const resimURL = e.target.result;

            // Kartvizit doğrulama işlemi
            const dogrulamaSonucu = kartvizitDogrula(resimURL);

            // Sonucu ekranda göster
            const sonucElementi = document.getElementById('sonuc');
            if (dogrulamaSonucu) {
                sonucElementi.textContent = 'Giriş Başarılı!';
                sonucElementi.style.color = 'green';
            } else {
                sonucElementi.textContent = 'Geçersiz Kartvizit!';
                sonucElementi.style.color = 'red';
            }
        };
        okuyucu.readAsDataURL(dosya);
    }
});

// Kartvizit doğrulama fonksiyonu
function kartvizitDogrula(resimURL) {
    // Burada kartvizitin doğruluğunu kontrol edebilirsiniz.
    // Örneğin, önceden tanımlanmış bir kartvizit resmiyle karşılaştırma yapabilirsiniz.
    const gercekKartvizitURL = 'Memo.jpg';
    const gercekKartvizitURL = 'Yiğit.jpg';
    const gercekKartvizitURL = 'Arda.jpg';
    const gercekKartvizitURL = 'Enes.jpg';

    // Basit bir karşılaştırma (gerçekte daha karmaşık bir doğrulama yapılmalı)
    return resimURL === gercekKartvizitURL;
}

// Bildirim gönderme fonksiyonu
function bildirimGonder(baslik, icerik) {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.active.postMessage({
                baslik: baslik,
                icerik: icerik,
            });
        });
    }
}

// Service Worker'ı kaydetme
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('sw.js')
        .then((registration) => {
            console.log('Service Worker kaydedildi:', registration);
        })
        .catch((error) => {
            console.error('Service Worker kaydı başarısız:', error);
        });
}

// Bildirim izni isteme
function bildirimIzinIste() {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Bildirim izni verildi.');
            }
        });
    }
}

// Sayfa yüklendiğinde bildirim izni iste
bildirimIzinIste();

// Sayfa yüklendiğinde duyuruları göster
duyurulariGoster();
