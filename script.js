document.getElementById('duyuruEkleForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Formun gönderilmesini engelle

    // E-posta ve duyuru metnini al
    const email = document.getElementById('email').value;
    const duyuruMetni = document.getElementById('duyuruMetni').value;

    // Backend'e istek gönder
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            message: duyuruMetni,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('sonuc').textContent = data.message;
    })
    .catch((error) => {
        document.getElementById('sonuc').textContent = 'E-posta gönderilirken hata oluştu.';
    });
});
