const phone = "6285700525830";
const templateMessageReservasi = `Halo, Dr. Nich. Saya ingin melakukan reservasi. 
Mohon bantuannya untuk informasi jadwal yang tersedia dan prosedur lebih lanjut. 

Berikut adalah detail saya:
- Nama: [Nama Lengkap Anda]
- Tanggal & Waktu Pilihan: [Tanggal dan waktu yang diinginkan]

Terima kasih atas perhatian dan bantuannya. Saya menunggu informasi dari Dr. Nich.`;

function sendWhatsAppReservasiMessage() {
  // Buat URL untuk membuka WhatsApp dengan pesan template
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(
    templateMessageReservasi
  )}`;

  // Buka URL di aplikasi WhatsApp (jika di ponsel) atau di tab baru (jika di desktop)
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // Jika perangkat adalah ponsel, buka URL langsung
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }
}

function sendWhatsAppReservasiLayananMessage(judul) {
  const message = `Halo, Dr. Nich. Saya ingin melakukan reservasi untuk *${judul}*.
Mohon bantuannya untuk informasi jadwal yang tersedia dan prosedur lebih lanjut.

Berikut adalah detail saya:
- Nama: [Nama Lengkap Anda]
- Tanggal & Waktu Pilihan: [Tanggal dan waktu yang diinginkan]

Terima kasih atas perhatian dan bantuannya. Saya menunggu informasi dari Dr. Nich. `;

  // Encode pesan agar sesuai dengan format URL
  const encodedMessage = encodeURIComponent(message);

  // Buat URL WhatsApp dengan nomor telepon dan pesan
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  // Periksa perangkat dan buka URL sesuai
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // Jika perangkat adalah ponsel, buka URL langsung
    window.location.href = url;
  } else {
    // Jika perangkat adalah desktop, buka URL di tab baru
    window.open(url, "_blank");
  }
}

function sendWhatsAppProdukMessage(nama) {
  const message = `Halo, Dr. Nich. Saya ingin melakukan pembelian untuk  Produk *${nama}*.
  Mohon bantuannya untuk informasi ketersediaan produk dan prosedur lebih lanjut.
  
  Berikut adalah detail saya:
  - Nama: [Nama Lengkap Anda]
  - Tanggal & Waktu Pilihan: [Tanggal dan waktu yang diinginkan]
  
  Terima kasih atas perhatian dan bantuannya. Saya menunggu informasi dari Dr. Nich.`;

  // Encode pesan agar sesuai dengan format URL
  const encodedMessage = encodeURIComponent(message);

  // Buat URL WhatsApp dengan nomor telepon dan pesan
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  // Periksa perangkat dan buka URL sesuai
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    // Jika perangkat adalah ponsel, buka URL langsung
    window.location.href = url;
  } else {
    // Jika perangkat adalah desktop, buka URL di tab baru
    window.open(url, "_blank");
  }
}

export {
  sendWhatsAppReservasiMessage,
  sendWhatsAppProdukMessage,
  sendWhatsAppReservasiLayananMessage,
};
