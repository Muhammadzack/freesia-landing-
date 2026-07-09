# Freesia DEX — Landing Page (versi statis, v3)

Landing page ini sekarang disesuaikan dengan DEX asli Anda di
https://freesia-black.vercel.app (kode: SimpleLiquidityPoolV2 di LitVM Testnet).

## Yang berubah di v3
- DEX_URL sudah benar: https://freesia-black.vercel.app
- Fitur landing page diganti total: sebelumnya 10 fitur FIKSI (gasless, zk-privacy,
  cross-chain, dll yang tidak ada di kode Anda). Sekarang menampilkan fitur ASLI:
  Shielded Swap, Live Price Chart, Slippage Control, Add/Remove Liquidity,
  Stake LP untuk FREE, Testnet Faucet, koneksi wallet otomatis ke LitVM, dll.
- Live Stats & Kontrak & Transparansi sudah terisi alamat kontrak ASLI:
    Pool USDC/DAI : 0x71D88Cff00b50860Da4367a799a17bf483e76909
    Staking       : 0x024f68cc3bb70A41154B9468DA6b8dB2d2A76567
    USDC          : 0x6c567a7Fb7A2b4968D230A644D3C76E731e34837
    DAI           : 0xd06C4C54837e1BBd458948C45E306DA38b19a0Bc
    FREE (reward) : 0x5072FE98CD78604d8750a935fa39039F06b6e800
    RPC           : https://liteforge.rpc.caldera.xyz/infra-partner-http
    Explorer      : https://liteforge.caldera.xyz
    Chain ID      : 4441 (LitVM Testnet)
- Function selector reserveA()/reserveB() dihitung ulang dengan Keccak-256
  yang divalidasi (sebelumnya pakai tebakan yang SALAH).
- Arsitektur diperbaiki dari "CLMM + Hooks" (tidak ada di kode) jadi
  "AMM — Constant Product (x·y=k)" (sesuai kode asli).

## Isi folder
- index.html, hero-bg.jpg, og-image.jpg, favicon*, robots.txt, sitemap.xml, .nojekyll

## Cek cepat setelah upload
1. Buka situs -> scroll ke "Statistik On-Chain" -> harus muncul angka nyata
   (bukan "—") dalam beberapa detik.
2. Kalau tetap "—", buka Console browser (F12) untuk lihat error CORS/RPC.
   Kemungkinan RPC LitVM tidak mengizinkan akses browser dari domain lain.
3. Bagian "Kontrak & Jaringan" -> tombol Salin harus menyalin alamat asli.
4. Tombol Launch App / Enter App / Mulai Sekarang -> harus membuka
   freesia-black.vercel.app di tab baru.

## Cara upload (dari HP atau laptop)
1. Repo GitHub -> Add file -> Upload files
2. Pilih SEMUA file di folder ini -> Commit changes
   (Kalau cuma index.html yang berubah, cukup upload index.html saja —
   akan menimpa otomatis.)

## Aktifkan situs
Settings -> Pages -> Source: "Deploy from a branch"
-> Branch: main, folder: / (root) -> Save
Situs aktif di https://USERNAME.github.io/REPO/

## Yang masih perlu diisi manual
- DOCS_URL (belum ada dokumentasi)
- TELEGRAM, DISCORD (masih "#")
