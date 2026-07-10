## v5 — Perbaikan URL block explorer (terbaru)

**Bug dilaporkan pengguna:** tombol "Lihat ↗" pada bagian Kontrak & Transparansi
mengarah ke halaman **404**.

Penyebabnya: subdomain `explorer.` hilang dari URL.

| | Salah | Benar |
|---|---|---|
| Domain | `liteforge.caldera.xyz` | `liteforge.explorer.caldera.xyz` |

Path `/address/` sudah benar — diverifikasi bekerja untuk **semua** kontrak
(pool, staking, maupun token), sedangkan `/token/` hanya cocok untuk token.

**Catatan:** bug yang sama juga memengaruhi **DEX** — link "Confirmed" di riwayat
transaksi dan tombol "View ↗" setelah swap berhasil. Pengguna yang baru saja swap
dan ingin melihat buktinya juga kena 404. Sudah diperbaiki di kedua tempat.

---

# Freesia DEX — Landing Page

Live di: https://freesiadex.xyz

## v4 — Logo seragam, menu mobile, & kejujuran MEV (terbaru)

### 1. Logo diseragamkan dengan DEX
- Kotak hijau berhuruf "F" diganti dengan **logo bunga Freesia** (SVG),
  sama persis dengan yang dipakai di DEX (freesia-black.vercel.app).
- Teks brand kini "**Freesia** DEX" — "Freesia" bergradasi teal→hijau,
  "DEX" sebagai sufiks halus. Diterapkan di navbar dan footer.
- Celah antar kelopak transparan, jadi logo tampil benar di latar terang
  (navbar) maupun gelap (footer).

### 2. Responsif untuk laptop, tablet, dan HP
- **Menu mobile/tablet ditambahkan.** Sebelumnya menu navigasi disembunyikan
  di bawah 1024px (`hidden lg:flex`) **tanpa pengganti** — artinya pengunjung
  HP dan tablet tidak punya navigasi sama sekali. Kini ada tombol hamburger
  dengan panel menu (menutup otomatis saat link diklik, saat layar dilebarkan
  ke ukuran desktop, dan saat menekan Escape).
- **Ukuran heading diperbaiki.** Hero memakai `clamp(3rem, 8vw, 6rem)` —
  minimum 48px. Di iPhone SE (320px) itu hanya muat ~10 karakter per baris,
  sehingga judul pecah menjadi banyak baris dan memenuhi layar. Diturunkan
  ke `clamp(2rem, 7.5vw, 6rem)`. Heading lain juga disesuaikan.
- Tombol Launch App kini tersedia di dalam menu mobile (di navbar ia
  tersembunyi pada layar < 640px).

### 3. Berhenti mengklaim fitur MEV yang tidak ada
Audit DEX menemukan bahwa toggle "Shielded Swap" **tidak melakukan apa pun** —
kontrak `swap()` tidak punya parameter MEV, dan "MEV Protection Tax 0.05%"
tidak pernah dipungut. Landing page ikut diperbaiki:
- Hero tidak lagi menjanjikan "swap dengan proteksi MEV opsional".
- Fitur Shielded Swap ditandai **"(Segera)"** dengan keterangan bahwa ia
  membutuhkan private relay atau perubahan smart contract.
- Roadmap Phase 1 tidak lagi mengklaim proteksi MEV sudah selesai.
- Meta keywords dibersihkan.

### 4. Bug teks
- Judul bagian fitur masih tertulis "Sepuluh Fitur yang Hilang" (sisa versi
  lama, dan jumlahnya bukan sepuluh). Diperbaiki jadi "Yang Bisa Anda Lakukan".

---

## Isi folder
index.html, hero-bg.jpg, og-image.jpg, favicon*, robots.txt, sitemap.xml, .nojekyll

## Pengaturan (di dalam index.html)
- `CONFIG` — DEX_URL, DOCS_URL, X, GITHUB, TELEGRAM, DISCORD
- `CHAIN` — RPC, alamat kontrak, explorer (untuk Live Stats)

Domain sudah aktif di **freesiadex.xyz**. Kalau mengganti domain, perbarui juga
`index.html` (meta canonical & og:url), `robots.txt`, dan `sitemap.xml`.
