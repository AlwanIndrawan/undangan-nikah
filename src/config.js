// ============================================================
//  KONFIGURASI PERNIKAHAN
//  Edit semua data di bawah sesuai pernikahan kamu
// ============================================================

export const WEDDING = {
  mempelai1: "Andi Anugrah",
  mempelai2: "Andi Rahayu",

  ayah1: "Bpk. Ahmad Fauzi",
  ibu1:  "Ibu Rini Wulandari",

  ayah2: "Bpk. Drs. Hasan Basri",
  ibu2:  "Ibu Dra. Nurlaela",

  tanggal: "2026-08-17",

  akad: {
    tanggal: "17 Agustus 2026",
    waktu:   "08:00 – 10:00 WIB",
  },

  resepsi: {
    tanggal: "17 Agustus 2026",
    waktu:   "10:00 – 14:00 WIB",
  },

  venue:  "Gedung Serbaguna Graha Indah",
  alamat: "Jl. Sultan Hasanuddin No.10, Makassar, Sulawesi Selatan",

  mapsUrl: "https://maps.google.com/?q=-5.1477,119.4327",

  batasRsvp: "7 Agustus 2026",
};

// ============================================================
//  REKENING BANK (AMPLOP DIGITAL)
// ============================================================

export const BANKS = [
  {
    bank:  "BCA",
    norek: "1234 5678 90",
    atas:  "Rizky Pratama",
  },
  {
    bank:  "Mandiri",
    norek: "0987 6543 21",
    atas:  "Siti Aisyah",
  },
];

// ============================================================
//  KISAH CINTA
// ============================================================

export const LOVE_STORY = [
  {
    tahun:  "2019",
    judul:  "Pertama Bertemu",
    cerita: "Kami bertemu di acara seminar kampus. Sebuah pertemuan sederhana yang ternyata mengubah segalanya.",
    icon:   "✨",
  },
  {
    tahun:  "2020",
    judul:  "Jatuh Cinta",
    cerita: "Di tengah pandemi, kami semakin dekat lewat panggilan video yang panjang hingga larut malam.",
    icon:   "💌",
  },
  {
    tahun:  "2022",
    judul:  "Resmi Pacaran",
    cerita: "Dengan satu kalimat sederhana di tepi pantai Losari, ia memintaku menjadi kekasihnya.",
    icon:   "🌊",
  },
  {
    tahun:  "2024",
    judul:  "Lamaran",
    cerita: "Di depan keluarga besar, dengan cincin yang indah, ia bertanya apakah aku mau menjadi pendampingnya seumur hidup.",
    icon:   "💍",
  },
];

// ============================================================
//  FOTO GALERI
//  Simpan foto di folder: public/photos/
// ============================================================

export const PHOTOS = [
  "/photos/galeri1.jpg",
  "/photos/galeri2.jpg",
  "/photos/galeri3.jpg",
  "/photos/galeri4.jpg",
  "/photos/galeri5.jpg",
  "/photos/galeri6.jpg",
];

export const PHOTO_PLACEHOLDERS = ["📸", "🌸", "💍", "🌿", "🕊️", "🌹"];

// ============================================================
//  GOOGLE FORMS RSVP (OPSIONAL)
// ============================================================

export const GOOGLE_FORM = {
  actionUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdGU9z1vhIsMItONuTQX57PPMPCgyWsvaZsEKMCiYGlvXZ43A/formResponse",
  fields: {
    nama:       "entry.34614750",
    telepon:    "entry.483468591",
    kehadiran:  "entry.1978178535",
    jumlahTamu: "entry.2127729527",
    pesan:      "entry.1661952454",
  },
  enabled: true,
};

// BUKU TAMU
export const GUESTBOOK_URL = "https://script.google.com/macros/s/AKfycbwXHW293A0KlMrXqOcz2i0xEOIE_bw9usRRtoR9iUsKUo468w4PZB78rH91b01WrQ/exec";

// ============================================================
//  MUSIK BACKGROUND
//  Simpan file MP3 di: public/music/background.mp3
// ============================================================

export const MUSIC = {
  src:     "/music/background.mp3",
  enabled: true,
};