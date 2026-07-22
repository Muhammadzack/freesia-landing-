/* ============ SITE CONFIG — GANTI nilai di bawah ============ */
var CONFIG = {
  DEX_URL:  "https://app.freesiadex.xyz",
  DOCS_URL: "https://docs.freesiadex.xyz",
  VERIFY_URL: "https://app.freesiadex.xyz/verify",    // halaman verifikasi kontrak
  LOG_URL:    "https://app.freesiadex.xyz/insiden",   // catatan insiden
  ISSUES_URL: "https://github.com/Muhammadzack/Freesia/issues/new/choose",  // kanal keluhan pengguna
  VAULT_URL:  "https://app.freesiadex.xyz/vault",     // AI vault testnet
  X:        "https://x.com/freesiadex",
  GITHUB:   "https://github.com/Muhammadzack",
  TELEGRAM: "#",
  DISCORD:  "#",
};

/* ===== ON-CHAIN CONFIG ===== */
var CHAIN = {
  RPC_URL:  "https://liteforge.rpc.caldera.xyz/infra-partner-http",
  CHAIN_ID: 4441,
  EXPLORER: "https://liteforge.explorer.caldera.xyz",
  NETWORK_NAME: "LitVM Testnet",

  // JUJUR: pool USDC/DAI ini di-deploy SEBELUM SimpleLiquidityPoolV3 ada.
  // Kode sumbernya hilang; sebagian proteksi V3 tidak dapat diverifikasi di sana.
  // Migrasinya tercatat sebagai PR terbuka di halaman /insiden.
  POOL:    "0x79989f44c13B8ed41a2bA68Cd0a584e158cD11E8",  // Pool USDC/DAI — generasi awal (pra-V3)
  STAKING: "0x5810F270dd7643Caa60858b1f5CC4a250BA38C13",  // Staking / Earn untuk pool USDC/DAI

  // Pool yang benar-benar lahir dari SimpleLiquidityPoolV3 (6 FIX, aman sejak lahir)
  POOL_KOPDES: "0xBAE8787b417AE7b56458A4FEB904c65cd8018F8a",
  POOL_MBGUSDC:"0x17F9b1ea3f6ceC4e5605f7cEDfa90674e3D3Faaf",
  POOL_MBGUSDT:"0xd54598e60712684EcEFA810E4cCA0c30C2F41B54",  // generasi awal juga

  USDC:    "0x6c567a7Fb7A2b4968D230A644D3C76E731e34837",
  DAI:     "0xd06C4C54837e1BBd458948C45E306DA38b19a0Bc",
  FREE:    "0x5072FE98CD78604d8750a935fa39039F06b6e800",
  DECIMALS: 18,
};

/* 4-byte selector = 4 byte pertama keccak256(signature). Diverifikasi manual:
   totalSupply() = 0x18160ddd · reserveA() = 0xdc5fa6c5 · reserveB() = 0x19e36f3b */
var SEL = { totalSupply:"0x18160ddd", reserveA:"0xdc5fa6c5", reserveB:"0x19e36f3b" };
