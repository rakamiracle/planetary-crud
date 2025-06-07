Planetary API
Selamat datang di Planetary API, sebuah aplikasi Deno untuk mengelola data planet dan bulan dengan MariaDB. Dibuat pada Sabtu, 07 Juni 2025, 05:22 PM WIB.
Apa Ini?
Aplikasi ini memungkinkan Anda menambah, lihat, ubah, dan hapus data planet dan bulan melalui API sederhana.
Yang Dibutuhkan

Deno: Instal terbaru (cek dengan deno --version).
MariaDB: Server lokal yang sudah jalan (port 3306).
Navicat (opsional): Untuk atur database.
Internet: Untuk unduh dependensi.

Cara Instalasi

Siapkan Database:
Buka Navicat, buat database planetary_db.
Buat tabel planets dan moons (lihat struktur di kode).


Atur .env:
Buat file .env dengan:DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=kata_sandi_anda
DB_NAME=planetary_db

Ganti kata_sandi_anda dengan password MariaDB Anda.


Unduh Dependensi:
Buka terminal di folder planetary-api, ketik:deno cache --reload deps.ts




Jalankan Aplikasi:
Ketik:deno run --allow-net --allow-read --allow-env server.ts


Server jalan di http://localhost:8000.



Cara Pakai

Planet:
Lihat semua: GET /api/planets
Tambah: POST /api/planets (contoh: {"name":"Mars","diameter":6792,"distance_from_sun":227900000,"has_rings":false})
Ubah: PUT /api/planets/:id
Hapus: DELETE /api/planets/:id


Bulan:
Lihat semua: GET /api/moons
Tambah: POST /api/moons (contoh: {"planet_id":1,"name":"Phobos","diameter":22,"discovered_year":1877})
Ubah: PUT /api/moons/:id
Hapus: DELETE /api/moons/:id



Coba dengan curl:

Tambah planet:curl -X POST http://localhost:8000/api/planets -H "Content-Type: application/json" -d '{"name":"Mars","diameter":6792,"distance_from_sun":227900000,"has_rings":false}'



Struktur Folder

config/: Koneksi database.
controllers/: Logika CRUD.
models/: Tipe data.
routes/: Endpoint API.
server.ts: Mulai server.
deps.ts: Dependensi.
.env: Pengaturan.

Catatan

Pastikan MariaDB menyala sebelum jalankan server.
Jika error, cek terminal dan pastikan .env benar.

Kontribusi
Ingin tambah fitur? Silakan beri saran!
Lisensi
MIT (lihat LICENSE jika ada).
