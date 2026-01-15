============================================================
       # GEARFLOW API - SISTEM PEMINJAMAN ALAT #
        Backend Service UKK RPL 2025/2026
============================================================

DESKRIPSI PROYEK
----------------
GearFlow adalah solusi RESTful API yang dirancang untuk mendigitalisasi 
prosedur peminjaman sarana dan prasarana. Fokus utama proyek ini adalah 
pada keamanan data, integritas relasi, dan kemudahan manajemen inventaris.

FITUR UTAMA BERDASARKAN ROLE
----------------------------

1. ADMINISTRATOR (Full Control)
   - Otomasi Inventaris: CRUD User, Alat, dan Kategori.
   - Audit Trail: Memantau seluruh jejak aktivitas melalui Log Aktivitas.
   - Reporting: Generasi laporan (PDF & Excel).
   - Data Oversight: Monitoring seluruh transaksi secara real-time.

2. PETUGAS (Verification & Monitoring)
   - Approval Workflow: Validasi (Setujui/Tolak) pengajuan peminjaman.
   - Return Oversight: Memantau proses pengembalian alat.
   - Security Logs: Mengawasi aktivitas harian sistem.

3. PEMINJAM (Self-Service)
   - Katalog Alat: Eksplorasi daftar alat berdasarkan kategori.
   - Request System: Pengajuan peminjaman alat secara mandiri.
   - Return Process: Melakukan konfirmasi pengembalian alat.

TEKNOLOGI YANG DIGUNAKAN
------------------------
- Core Runtime: Node.js (TypeScript)
- Framework   : Express.js
- Database    : PostgreSQL
- ORM         : Sequelize
- Security    : JWT, Bcrypt, Helmet.js
- Validation  : Joi
- Reporting   : jsPDF & ExcelJS

PANDUAN INSTALASI
-----------------
1. Clone repositori & Install dependencies:
   > npm install

2. Setup Database (pgAdmin):
   - Buat database: peminjaman_alat_sekolah
   - Jalankan query dari file database/schema.sql (Tekan F5)

3. Konfigurasi Environment:
   Buat file .env dan sesuaikan:
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=peminjaman_alat_sekolah
   DB_USER=postgres
   DB_PASSWORD=password_anda

4. Jalankan Server:
   - Development: npm run dev
   - Production : npm run build && npm start

KREDENSIAL DEFAULT (UJIB COBA)
------------------------------
- Admin   : admin / admin123
- Petugas : petugas1 / petugas123
- Peminjam: peminjam1 / peminjam123

RINGKASAN API ENDPOINTS
-----------------------
- POST /api/auth/login             : Autentikasi
- GET  /api/alat                   : Daftar Alat
- POST /api/peminjaman             : Pengajuan Pinjam
- PUT  /api/peminjaman/:id/approve : Validasi Petugas
- GET  /api/laporan/peminjaman/pdf : Cetak Laporan

STANDAR KEAMANAN
----------------
1. Password Hashing (Bcrypt)
2. Stateless Authentication (JWT)
3. Input Sanitization (Joi Validation)
4. XSS & Sniffing Protection (Helmet.js)

------------------------------------------------------------
Copyright (c) 2025 - GearFlow Team
License: ISC