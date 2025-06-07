# Planetary API

Selamat datang di **Planetary API**, sebuah aplikasi Deno untuk mengelola data planet dan bulan dengan MariaDB. Dibuat pada **Sabtu, 07 Juni 2025, 05:24 PM WIB**.

## Apa Ini?
Aplikasi ini memungkinkan Anda menambah, lihat, ubah, dan hapus data planet dan bulan melalui API sederhana.

## Yang Dibutuhkan
- **Deno**: Instal terbaru (cek dengan `deno --version`).
- **MariaDB**: Server lokal yang sudah jalan (port 3306).
- **Navicat** (opsional): Untuk atur database.
- **Internet**: Untuk unduh dependensi.

## Cara Instalasi
1. **Siapkan Database**:
   - Buka Navicat, buat database `planetary_db`.
   - Buat tabel `planets` dan `moons` (lihat struktur di kode).
2. **Atur `.env`**:
   - Buat file `.env` dengan:
     ```plaintext
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=kata_sandi_anda
     DB_NAME=planetary_db