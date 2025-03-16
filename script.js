document.addEventListener("DOMContentLoaded", function() {
    // Maçlar bölümüne dinamik içerik ekleme
    const maclarSection = document.getElementById("mac-listesi");
    maclarSection.innerHTML = `
        <p>Maç 1: Oyun Bozanlar vs Belirli Değil - Sonuç: Yakında </p>
        <p>Maç 2: Oyun Bozanlar vs Belirli Değil - Sonuç: Yakında</p>
    `;

    // Puan listesi bölümüne dinamik içerik ekleme
    const puanListesiSection = document.getElementById("puan-tablosu");
    puanListesiSection.innerHTML = `
        <p>1. Oyun Bozanlar - 20 Puan</p>
        <p>2. Yıldız City - 12 Puan</p>
        <p>3. PonçikSpor - Belli Değil</p>
    `;
});
