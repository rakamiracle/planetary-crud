# Planetary API - Panduan Lengkap

Selamat datang di **Planetary API**, sebuah aplikasi web sederhana yang dibuat menggunakan **Express.js** untuk mengelola data planet dan bulan di tata surya kita! Aplikasi ini terhubung ke database **MariaDB** dan dirancang agar Anda bisa menambah, melihat, mengubah, atau menghapus data planet dan bulan dengan mudah. Proyek ini cocok untuk belajar membuat API atau mengelola data astronomi.

- **Versi**: 1.0.0
- **Lisensi**: ISC
- **Repository**: [GitHub](https://github.com/rakamiracle/planetary-crud)

## Apa Itu Planetary API?

Planetary API adalah alat online yang memungkinkan Anda menyimpan dan mengelola informasi tentang planet (seperti Bumi, Mars, Jupiter) dan bulan (seperti Bulan, Phobos, Europa). Anda bisa menggunakan API ini untuk:
- Melihat daftar planet dan bulan.
- Menambah planet atau bulan baru.
- Mengubah informasi yang sudah ada.
- Menghapus data yang tidak diperlukan.

Aplikasi ini menggunakan teknologi seperti **Express.js** (untuk membangun API), **MariaDB** (untuk menyimpan data), dan **Joi** (untuk memastikan data yang dimasukkan benar).

## Fitur Utama

- **Kelola Planet**: Tambah, lihat, ubah, atau hapus data planet.
- **Kelola Bulan**: Tambah, lihat, ubah, atau hapus data bulan, termasuk kaitannya dengan planet.
- **Validasi Data**: Pastikan data yang dimasukkan (seperti nama atau ukuran) sesuai aturan.
- **Keamanan Dasar**: Lindungi aplikasi dengan pengaturan keamanan sederhana.
- **Logging**: Catat semua aktivitas untuk debugging.
- **CORS**: Izinkan aplikasi lain mengakses API dari domain berbeda.

## Apa yang Dibutuhkan Sebelum Memulai?

Sebelum Anda bisa menjalankan Planetary API, pastikan komputer Anda sudah punya alat berikut:

- **Node.js**: Versi 18 atau lebih baru (unduh dari [nodejs.org](https://nodejs.org)).
- **npm**: Biasanya datang bersama Node.js (cek dengan perintah `npm -v` di terminal).
- **MariaDB**: Database untuk menyimpan data (unduh dari [mariadb.org](https://mariadb.org) atau instal via package manager).

### Pastikan MariaDB Berjalan
- Buka terminal dan ketik `mysql -u root -p`, lalu masukkan kata sandi (default kosong atau sesuai pengaturan Anda).
- Jika berhasil, MariaDB sudah siap. Jika tidak, instal dan mulai layanannya (misalnya `sudo systemctl start mariadb` di Linux).

## Cara Instalasi Langkah demi Langkah

### 1. Ambil Kode Proyek
- Buka terminal dan ketik:
  ```bash
  git clone https://github.com/rakamiracle/planetary-crud.git
  cd planetary-api
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