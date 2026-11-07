# 🎂 Undangan Digital Ulang Tahun Anak - Hayyu Grill Korean BBQ

Undangan digital interaktif berbasis web (Mobile-First Responsive) untuk perayaan ulang tahun anak, dengan mengacu pada identitas visual **Hayyu Grill Korean BBQ** (background biru bercorak tradisional Seigaiha, ornamen sparkle, dan logo otentik Hayyu Grill).

---

## ✨ Fitur Utama

1. **Desain Mobile-First Responsif**:
   - Tampilan optimal untuk smartphone (Android & iOS).
   - Di perangkat desktop, ditampilkan dalam format card elegan berbingkai mobile modern.
   - Menggunakan warna biru khas Hayyu Grill (`#2554a5`), aksen merah ceria, dan ornamen Seigaiha wave pattern serta taburan bintang sparkle.
   - **Bebas dari gambar atau teks menu makanan/paket daging**, sesuai permintaan.

2. **Cover Pembuka (Amplop / Welcome Screen)**:
   - Logo otentik Hayyu Grill Korean BBQ + badge Yogya Group & Korean BBQ.
   - Foto anak dengan topi ulang tahun dan animasi pulsing.
   - Nama tamu dinamis: secara otomatis membaca URL parameter (contoh: `index.html?to=Keluarga+Bpk.+Rahmat`).
   - Tombol interaktif **"💌 Buka Undangan"** yang memicu musik latar otomatis dan letusan pesta confetti.

3. **Spotlight Foto Anak di Tengah**:
   - Foto potret anak di posisi tengah dengan bingkai bulat bercahaya (rotating glow) dan topi pesta.
   - Nama lengkap anak: **Keenan Althafandra** (dapat diubah langsung via menu edit).
   - Badge usia: **"Ke-5 Tahun 🎂"**.
   - Ucapan syukur dan kata sambutan hangat dari orang tua.

4. **Waktu, Hari, Jam & Lokasi**:
   - **Live Countdown Timer** (Hari, Jam, Menit, Detik) yang menghitung mundur secara real-time menuju tanggal acara.
   - Hari & Tanggal: **Minggu, 29 November 2026**.
   - Waktu: **15.00 - 18.00 WIB**.
   - Lokasi: **Hayyu Grill Korean BBQ (Lt. 2, Mall Yogya Grand Karawang)**.
   - Tombol **"🗺️ Buka di Google Maps"** dan **"📅 Simpan ke Google Calendar"**.

5. **Party Rundown (Susunan Acara)**:
   - Timeline interaktif dari registrasi, fun games & magic show, tiup lilin & potong kue, makan bersama Korean BBQ feast, hingga foto bersama & goodie bag.

6. **Kasih Kado Digital (Amplop Digital & Kado Fisik)**:
   - Rekening **BCA** & **Mandiri** dengan kartu berdesain modern dan tombol **"Salin No. Rekening"** 1-klik (dilengkapi toast notification feedback).
   - Tombol **"📱 Tampilkan QRIS"** yang membuka modal QRIS untuk kemudahan scan dari semua e-wallet (GoPay, OVO, Dana, BCA, dll).
   - Tombol **"🎁 Kirim Kado Fisik"** dengan alamat pengiriman lengkap dan tombol salin alamat.

7. **RSVP & Buku Tamu (Wishes Wall)**:
   - Form RSVP (Nama, Pilihan Kehadiran, Jumlah Orang, Doa/Ucapan).
   - Konfirmasi kehadiran otomatis tersimpan di LocalStorage dan langsung muncul di Buku Ucapan.
   - Tombol **"💬 Konfirmasi via WhatsApp"** yang otomatis membuat format pesan siap kirim ke nomor orang tua.

8. **Musik Latar & Efek Interaktif**:
   - Musik latar instrumental ceria *Happy Birthday* (format audio WAV + Web Audio API synthesizer fallback agar 100% selalu bisa berputar tanpa kendala).
   - Tombol floating kontrol musik (animasi piringan hitam berputar).
   - Tombol floating confetti untuk menebarkan efek confetti kapan saja.
   - **Log Admin & Panel Keamanan Berbasis PIN (🔒 Log Admin)**:
     - Tombol edit di kanan atas telah dihapus agar tamu umum tidak dapat mengubah data.
     - Di bagian paling bawah halaman (*footer*) terdapat tombol **"🔒 Log Admin"**.
     - Akses dilindungi oleh **PIN keamanan** (PIN bawaan: `1234`).
     - Admin dapat mengunggah/mengganti foto si kecil dari galeri, mengubah nama, usia, tanggal, lokasi acara, nomor rekening, hingga mengganti PIN keamanan admin langsung di dalam panel.

---

## 🚀 Cara Menjalankan

### Cara 1: Buka Langsung di Browser
Cukup klik ganda (double-click) file `index.html` di komputer Anda, atau buka file tersebut di browser (Chrome, Edge, Safari, Firefox).

### Cara 2: Custom Nama Tamu di Link
Untuk mengirimkan undangan ke tamu tertentu dengan nama mereka di cover depan:
```
index.html?to=Om+Kevin+dan+Tante+Vina
index.html?to=Keluarga+Bpk.+Rahmat
```

### Cara 3: Menggunakan Web Server Lokal (Opsional)
Jalankan perintah berikut di terminal:
```bash
python -m http.server 8000
```
Lalu buka di browser: `http://localhost:8000` atau di browser HP (melalui IP WiFi yang sama).

---

## 📁 Struktur Berkas

```
undangan_digital/
├── assets/
│   ├── hayyu_grill_logo.png      # Logo otentik Hayyu Grill (transparan)
│   ├── child_photo.jpg           # Foto anak ulang tahun beresolusi tinggi
│   ├── hayyu_bg.jpg              # Background biru dengan corak & sparkle
│   ├── seigaiha_pattern.svg      # Vektor pola gelombang Seigaiha Hayyu
│   ├── korean_bbq_badge.png      # Badge Korean BBQ
│   ├── yogya_group_badge.png     # Badge Yogya Group
│   └── birthday_music.wav        # Audio instrumen musik ulang tahun
├── index.html                    # Struktur halaman undangan digital
├── style.css                     # Gaya responsif, mobile-first, & animasi
├── script.js                     # Logika interaktif, musik, timer, RSVP, kado
└── README.md                     # Petunjuk & dokumentasi proyek
```
