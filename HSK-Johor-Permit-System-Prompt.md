# Claude Code Prompt: Sistem Permit HSK Negeri Johor

> **Cara Guna:** Salin keseluruhan blok prompt di bawah dan tampal terus ke terminal Claude Code.

---

## 📋 Full Prompt

```
Build a complete multi-page static HTML prototype for "Sistem Dalam Talian Permohonan & Bayaran Permit Memasuki Hutan Simpanan Kekal (HSK) Negeri Johor" — an online forest reserve entry permit system for Jabatan Perhutanan Negeri Johor (JPNJ).

## Tech Stack
- Vite (vanilla template) — build tool & dev server
- TailwindCSS v3 installed via npm (NOT CDN)
- Alpine.js installed via npm
- Lucide icons via npm
- Google Fonts via @fontsource npm packages
- Vanilla HTML/JS — multi-page via Vite's multi-entry config
- Deploy target: GitHub Pages via vite build + gh-pages

## Brand Colors
Define these in src/style.css as CSS variables and extend them in tailwind.config.js:

Primary Green:       #2d6a2d  (navbar, buttons, icons)
Primary Dark:        #1a3d1a  (sidebar, footer, top bar)
Primary Light:       #3a7d3a  (hover states, secondary buttons)
Accent Gold:         #c8a227  (highlights, CTA, active indicators)
Surface:             #f0f7f0  (page backgrounds, section tints)
Card:                #ffffff  (cards, panels)
Border:              #d4e4d4  (dividers, input borders)
Text:                #1c2b1c  (body text)

## Typography
- Headings: "Merriweather" via @fontsource/merriweather
- Body/UI: "Plus Jakarta Sans" via @fontsource/plus-jakarta-sans

## Vite Project Setup

Generate a proper Vite vanilla project with this exact structure:

project-root/
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── index.html
├── apply.html
├── status.html
├── payment.html
├── permit.html
├── admin/
│   ├── index.html
│   ├── applications.html
│   ├── application-detail.html
│   ├── hsk.html
│   └── reports.html
└── src/
    ├── main.js
    └── style.css

vite.config.js — multi-page entry config:
```js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/hsk-johor-permit/',
  build: {
    rollupOptions: {
      input: {
        main:               resolve(__dirname, 'index.html'),
        apply:              resolve(__dirname, 'apply.html'),
        status:             resolve(__dirname, 'status.html'),
        payment:            resolve(__dirname, 'payment.html'),
        permit:             resolve(__dirname, 'permit.html'),
        adminDashboard:     resolve(__dirname, 'admin/index.html'),
        adminApplications:  resolve(__dirname, 'admin/applications.html'),
        adminDetail:        resolve(__dirname, 'admin/application-detail.html'),
        adminHsk:           resolve(__dirname, 'admin/hsk.html'),
        adminReports:       resolve(__dirname, 'admin/reports.html'),
      }
    }
  }
})
```

tailwind.config.js:
```js
export default {
  content: ['./**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary:        '#2d6a2d',
        'primary-dark': '#1a3d1a',
        'primary-light':'#3a7d3a',
        accent:         '#c8a227',
        surface:        '#f0f7f0',
        border:         '#d4e4d4',
        text:           '#1c2b1c',
      },
      fontFamily: {
        heading: ['Merriweather', 'serif'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
      }
    }
  },
  plugins: []
}
```

postcss.config.js:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

package.json scripts:
```json
{
  "name": "hsk-johor-permit",
  "version": "1.0.0",
  "scripts": {
    "dev":     "vite",
    "build":   "vite build",
    "preview": "vite preview",
    "deploy":  "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "gh-pages": "^6.0.0"
  },
  "dependencies": {
    "alpinejs": "^3.13.0",
    "lucide": "^0.300.0",
    "@fontsource/merriweather": "^5.0.0",
    "@fontsource/plus-jakarta-sans": "^5.0.0"
  }
}
```

src/style.css:
```css
@import '@fontsource/merriweather';
@import '@fontsource/plus-jakarta-sans';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary:        #2d6a2d;
  --color-primary-dark:   #1a3d1a;
  --color-primary-light:  #3a7d3a;
  --color-accent:         #c8a227;
  --color-surface:        #f0f7f0;
  --color-border:         #d4e4d4;
  --color-text:           #1c2b1c;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--color-text);
  background-color: var(--color-surface);
}

h1, h2, h3, h4 {
  font-family: 'Merriweather', serif;
}

@media print {
  .no-print { display: none !important; }
  body { background: white; }
}
```

src/main.js:
```js
import './style.css'
import Alpine from 'alpinejs'
import { createIcons, icons } from 'lucide'

window.Alpine = Alpine
Alpine.start()
createIcons({ icons })
```

Every HTML file must include at the bottom of <body>:
<script type="module" src="/src/main.js"></script>

---

## PAGE 1: index.html (Public Landing Page)

Build a professional government portal landing page with:

Top utility bar (bg-primary-dark):
- Left: "Portal Rasmi JPNJ | Johor" with small tree icon
- Right: Links — Hubungi Kami | Soalan Lazim | BM / EN toggle

Main navbar (bg-primary, sticky top-0 z-50):
- Logo left: tree SVG icon + "JPNJ" bold + "Jabatan Perhutanan Negeri Johor" small text, all white
- Nav links: Utama | Permohonan | Semak Status | Bayaran | Panduan
- Right: "Log Masuk" outlined white button + "Daftar" filled accent/gold button
- Mobile: hamburger menu with Alpine.js x-data toggle drawer

Hero section:
- Full-width, 80vh height, layered dark green CSS gradient background
- Large white heading: "Sistem Permit Memasuki Hutan Simpanan Kekal"
- Subheading: "Mohon permit anda secara dalam talian dengan mudah, selamat dan pantas"
- Two CTA buttons: "Mohon Permit Sekarang" (gold filled) + "Semak Status Permohonan" (white outlined)
- Badge below: "✓ Diiktiraf oleh Jabatan Perhutanan Negeri Johor"

Stats strip (white bg, border top/bottom):
- 4 stats: "12,450+ Permit Dikeluarkan" | "18 Hutan Simpanan Kekal" | "98% Kepuasan Pengguna" | "24/7 Perkhidmatan Dalam Talian"

Quick Access Cards (bg-surface, 4 columns grid):
- Mohon Permit Baru (green icon)
- Semak Status Permohonan (blue icon)
- Bayaran Online (teal icon)
- Muat Turun Permit (orange icon)

HSK Locations section:
- Section title: "Hutan Simpanan Kekal di Johor"
- 6 cards grid: HSK Gunung Ledang (Segahar), HSK Endau-Rompin (Mersing), HSK Gunung Pulai (Kulai), HSK Gunung Arong (Mersing), HSK Gunung Belumut (Kluang), HSK Panti (Kota Tinggi)
- Each card: green header, location name, district, capacity badge, "Mohon Permit" button

How it works (3 steps, icon + title + desc):
- Step 1: Isi Borang Permohonan
- Step 2: Buat Bayaran Online
- Step 3: Muat Turun Permit Digital

Footer (bg-primary-dark):
- 4 columns: Tentang JPNJ | Pautan Pantas | Hubungi Kami | Ikuti Kami
- Address: Jabatan Perhutanan Negeri Johor, Wisma Sumber Alam, Jalan Bukit Timbalan, 80000 Johor Bahru
- Phone: 07-223 7471 | Email: jpnj@johor.gov.my
- Copyright: "© 2024 Jabatan Perhutanan Negeri Johor. Hak Cipta Terpelihara."

---

## PAGE 2: apply.html (Borang Permohonan)

Multi-step form with 5 steps. Show step progress indicator at top (numbered circles connected by line, active=primary filled, done=accent checkmark, upcoming=gray). Use Alpine.js x-data="{ step: 1 }" for step navigation.

Step 1 — Maklumat Pemohon:
- Nama Penuh (text)
- No. Kad Pengenalan (text, placeholder: 000000-00-0000)
- No. Telefon (text, placeholder: 01X-XXXXXXX)
- Alamat Emel (email)
- Warganegara radio: Warganegara Malaysia / Bukan Warganegara
- Alamat Tetap (textarea)

Step 2 — Pilih HSK & Tarikh:
- Dropdown: Pilih Hutan Simpanan Kekal
  Options: HSK Gunung Ledang | HSK Endau-Rompin | HSK Gunung Pulai | HSK Gunung Arong | HSK Gunung Belumut | HSK Panti
- Tarikh Masuk (date input)
- Tarikh Keluar (date input)
- Tujuan Lawatan radio: Rekreasi | Penyelidikan | Pendidikan | Fotografi | Pendakian
- Laluan Dipilih (text, shown conditionally for Pendakian)

Step 3 — Maklumat Kumpulan:
- Bilangan Ahli (number input, min 1 max 50)
- Dynamic member table (Alpine.js): Nama | No. IC | Umur | Warganegara
- "Tambah Ahli" button appends new row
- "Buang" button per row

Step 4 — Dokumen Sokongan:
- Upload Salinan Kad Pengenalan (accept: .pdf,.jpg,.png)
- Upload Surat Kebenaran (conditional: penyelidikan/pendidikan)
- Upload Senarai Ahli Kumpulan (file)
- Checkbox: Saya mengesahkan semua maklumat adalah benar dan tepat
- Checkbox: Saya bersetuju dengan Terma & Syarat

Step 5 — Semak & Hantar:
- Read-only summary card of all entered data
- Fee calculation table:
  Warganegara: RM5.00/orang/hari
  Bukan Warganegara: RM20.00/orang/hari
  Jumlah dikira automatik
- "Hantar Permohonan" large primary button
- Success state (Alpine toggle): green checkmark, No. Rujukan: HSK-2024-00847, next step instructions

Navigation: "Sebelumnya" + "Seterusnya" buttons on each step.

---

## PAGE 3: status.html (Semak Status)

Search card (centered, max-w-2xl):
- Title: "Semak Status Permohonan"
- Tab toggle (Alpine.js): "No. Rujukan" | "No. Kad Pengenalan"
- Text input + "Semak" primary button

Result card (shown by default with mock data for HSK-2024-00847):
- Nama: Ahmad Firdaus bin Hamzah
- HSK: Gunung Ledang
- Tarikh: 15 Disember 2024 — 17 Disember 2024
- Status badge: Diluluskan (green pill)
- Bilangan Ahli: 5 orang
- Jumlah Bayaran: RM75.00

Vertical timeline tracker (5 steps):
1. ✓ Permohonan Diterima — 10 Dis 2024, 09:32 AM
2. ✓ Dalam Semakan — 11 Dis 2024, 02:15 PM
3. ✓ Diluluskan — 12 Dis 2024, 10:00 AM
4. ✓ Bayaran Diterima — 12 Dis 2024, 11:45 AM
5. ● Permit Dikeluarkan — 12 Dis 2024, 11:46 AM (gold pulse animation on dot)

Completed steps: green circle with checkmark. Current step: gold pulsing dot.

Action buttons: "Muat Turun Permit" (primary) | "Cetak" (outlined)

---

## PAGE 4: payment.html (Bayaran Online)

Fee Summary card:
- Table: Nama Pemohon | HSK | Tempoh | Bil. Ahli | Kadar | Jumlah
- Row: Ahmad Firdaus | Gunung Ledang | 3 hari | 5 orang | RM5/orang/hari | RM75.00
- Bold total row: Jumlah Perlu Dibayar: RM75.00
- Green info note: "Bayaran perlu diselesaikan dalam 24 jam"

Payment method radio cards (Alpine.js x-data="{ method: 'fpx' }"):
- FPX Online Banking (selected by default)
- Kad Kredit / Debit (Visa / Mastercard)
- e-Wallet (Touch 'n Go, Boost, GrabPay)

FPX Bank Grid (shown when method === 'fpx'):
- 8 bank buttons in grid: Maybank2u | CIMB Clicks | RHB Now | Public Bank | Hong Leong Connect | AmOnline | Bank Islam | Bank Rakyat

Security badge: padlock icon + "Pembayaran selamat menggunakan enkripsi SSL 256-bit"

"Teruskan Pembayaran" button — on click shows success modal (Alpine.js x-show):
- Large green checkmark
- "Pembayaran Berjaya!"
- No. Rujukan Bayaran: PAY-2024-075834
- Jumlah: RM75.00
- Tarikh: 12 Disember 2024, 11:45 AM
- Buttons: "Muat Turun Resit" (outlined) + "Lihat Permit" (primary)

---

## PAGE 5: permit.html (Digital Permit)

Screen action bar (no-print class):
- "Cetak Permit" | "Muat Turun PDF" | "Kongsi" buttons
- Status: SAH / VALID green badge

Printable permit card (A4-style, white bg, border, centered, max-w-3xl):

Top header:
- Tree SVG icon + "JABATAN PERHUTANAN NEGERI JOHOR"
- Subtitle: "PERMIT MEMASUKI HUTAN SIMPANAN KEKAL"
- Green top border strip
- Permit No: HSK-PERMIT-2024-00847 (right aligned, gold)

Details two-column grid:
- Nama Pemohon: Ahmad Firdaus bin Hamzah
- No. Kad Pengenalan: 850412-01-5231
- No. Telefon: 012-345 6789
- HSK Tujuan: Hutan Simpanan Kekal Gunung Ledang
- Daerah: Segahar, Johor
- Tarikh Masuk: 15 Disember 2024
- Tarikh Keluar: 17 Disember 2024 (3 Hari)
- Tujuan Lawatan: Rekreasi / Pendakian
- Bilangan Peserta: 5 Orang
- Jumlah Bayaran: RM75.00
- Status: SAH / VALID (large green badge)

Ahli Kumpulan table (5 rows):
No. | Nama | No. Kad Pengenalan | Umur | Warganegara
Mock names: Ahmad Firdaus, Nurul Ain Binti Razali, Mohd Hafiz Bin Ismail, Siti Rahayu Binti Omar, Faizal Bin Yusof

Bottom section (two columns):
- Left: 200x200 gray QR code placeholder box + "Imbas untuk pengesahan permit"
- Right: Circular stamp "SAH — JPNJ 2024" + Authorized signature line + "Pengarah Perhutanan Negeri Johor"

Permit conditions (small text, BM): 5 conditions about responsible forest entry

Print CSS: hide .no-print elements, white background, remove shadows.

---

## PAGE 6: admin/index.html (Admin Dashboard)

Layout: fixed left sidebar (260px) + top navbar + scrollable main content.

Sidebar (fixed, bg-primary-dark, full height, white text):
- Top: tree icon + "JPNJ" + "Admin Panel"
- Nav groups with uppercase labels:
  UTAMA → Dashboard (active)
  PERMOHONAN → Senarai Permohonan | Permohonan Baru | Semakan Pending (badge: 43)
  PENGURUSAN → Pengurusan HSK | Pengguna | Pegawai
  LAPORAN → Laporan & Statistik | Eksport Data
  SISTEM → Tetapan | Log Aktiviti
- Active item: left gold border (border-l-4 border-accent) + lighter bg tint
- Bottom: avatar + "Encik Zulkifli" + "Pegawai Perhutanan" + logout icon

Top navbar (white, shadow-sm, h-16):
- Left: hamburger icon + breadcrumb "Utama / Dashboard"
- Right: search input | bell icon (red badge "3") | avatar with dropdown (Alpine.js)

Stats row (4 cards):
- Jumlah Permohonan: 1,247 | +12% bulan ini | blue icon
- Permohonan Pending: 43 | perlu tindakan segera | yellow icon + yellow left border
- Diluluskan Hari Ini: 28 | green icon
- Jumlah Hasil: RM 18,650 | bulan Disember | teal icon

Recent Applications table (white card):
- Header: "Permohonan Terkini" + "Lihat Semua" link
- Columns: No. Rujukan | Nama Pemohon | HSK | Tarikh Mohon | Bil. | Status | Tindakan
- 8 rows mock data, varied statuses
- Status badges: Baru (blue) | Dalam Semakan (yellow) | Diluluskan (green) | Ditolak (red) | Dibayar (teal)
- Tindakan: eye, edit, trash icon buttons

Bottom two columns:
- Left card: "Permohonan 6 Bulan Terakhir" — CSS bar chart using div heights (Jul–Dec)
- Right card: "Mengikut HSK" — CSS horizontal bar chart with 6 HSK locations

---

## PAGE 7: admin/applications.html (Senarai Permohonan)

Same sidebar/navbar layout. Active nav: "Senarai Permohonan"

Page header: "Senarai Permohonan" h1 + "Eksport Excel" outlined + "Eksport PDF" outlined buttons

Filter card (Alpine.js x-data for filter state):
- Search input: "Cari No. Rujukan atau Nama..."
- Select: Tapis Status (Semua | Baru | Dalam Semakan | Diluluskan | Ditolak | Dibayar)
- Select: Pilih HSK (all 6 options)
- Date inputs: Dari — Hingga
- "Tapis" primary button + "Set Semula" text link

Bulk action bar (Alpine x-show when any checkbox checked):
- "X item dipilih" + "Luluskan Semua" green + "Tolak Semua" red + "Eksport" outlined

Data table (white card, 15 rows mock data):
- Columns: ☐ | No. Rujukan | Nama Pemohon | No. IC | HSK | Tarikh Mohon | Tarikh Lawatan | Bil. | RM | Status | Tindakan
- Select-all checkbox in header
- Alternating row bg (white / gray-50)
- Sortable headers with ↕ arrow icons
- Tindakan per row: eye (primary) | approve (green) | reject (red)

15 rows mock data with varied names, HSK locations, and statuses.

Pagination: ← Sebelumnya | 1 2 3 ... 13 | Seterusnya → | "Menunjukkan 1–15 daripada 187 rekod"

---

## PAGE 8: admin/application-detail.html (Butiran Permohonan)

Same sidebar/navbar. Breadcrumb: "Permohonan / HSK-2024-00847"

Page header: "HSK-2024-00847" h1 + Diluluskan badge + "← Kembali" link

Two-column layout (2/3 left + 1/3 right):

Left column:
Card "Maklumat Pemohon":
- Nama: Ahmad Firdaus bin Hamzah
- No. K/P: 850412-01-5231
- No. Telefon: 012-345 6789
- Emel: ahmad.firdaus@gmail.com
- Warganegara: Malaysia
- Alamat: No. 12, Jalan Bahagia 3, Taman Bahagia, 81300 Skudai, Johor

Card "Maklumat Lawatan":
- HSK: Gunung Ledang, Segahar | Tarikh: 15–17 Disember 2024 (3 hari)
- Tujuan: Rekreasi / Pendakian | Laluan: Laluan Puteri

Card "Ahli Kumpulan": table with 5 members

Card "Dokumen Dimuat Naik": ic_ahmad_firdaus.pdf + senarai_ahli.pdf with download icons

Right column:
Card "Status Permohonan": current status badge + mini vertical timeline

Card "Tindakan Pegawai":
- "Luluskan Permohonan" full-width green button → approve modal
- "Tolak Permohonan" full-width red outlined button → reject modal
- Textarea: "Nota Pegawai"
- Select: "Assign Kepada" (dropdown of officer names)
- "Simpan Nota" button

Card "Maklumat Bayaran": Dibayar | RM75.00 | 12 Dis 2024 | PAY-2024-075834

Card "Log Aktiviti" (timestamped):
- 12 Dis 11:46 — Permit dikeluarkan (system)
- 12 Dis 11:45 — Bayaran diterima (system)
- 12 Dis 10:00 — Diluluskan oleh Encik Zulkifli
- 11 Dis 14:15 — Semakan dimulakan
- 10 Dis 09:32 — Permohonan diterima (system)

Approve Modal (Alpine x-show): green header, confirm text, "Ya, Luluskan" button
Reject Modal (Alpine x-show): red header, required reason textarea, "Tolak Permohonan" button

---

## PAGE 9: admin/hsk.html (Pengurusan HSK)

Same sidebar/navbar. Active nav: "Pengurusan HSK"

Page header: "Pengurusan Hutan Simpanan Kekal" + "Tambah HSK Baru" primary button

HSK Cards grid (3 columns, 6 cards):
Each card:
- Green top border + HSK name as title
- Daerah badge
- Kapasiti Harian: 50 orang
- Permohonan Aktif: 12
- Capacity progress bar (green fill)
- Status toggle (Alpine.js): Aktif (green) / Tidak Aktif (red)
- Footer buttons: "Edit" | "Tarikh Tutup" | "Lihat Permohonan"

Card data:
- HSK Gunung Ledang | Segahar | 50 kapasiti | 38 hari ini | Aktif
- HSK Endau-Rompin | Mersing | 30 kapasiti | 12 hari ini | Aktif
- HSK Gunung Pulai | Kulai | 40 kapasiti | 40 hari ini | Aktif (penuh, red bar)
- HSK Gunung Arong | Mersing | 25 kapasiti | 5 hari ini | Aktif
- HSK Gunung Belumut | Kluang | 35 kapasiti | 0 hari ini | Tidak Aktif
- HSK Panti | Kota Tinggi | 20 kapasiti | 8 hari ini | Aktif

Tarikh Penutupan section (white card):
Title: "Jadual Penutupan HSK" + "Tambah Tarikh Tutup" button
Table: HSK | Tarikh Mula | Tarikh Tamat | Sebab | Status | Tindakan
5 mock rows (operasi kawalan, hari kelepasan am, musim tengkujuh, etc.)

---

## PAGE 10: admin/reports.html (Laporan & Statistik)

Same sidebar/navbar. Active nav: "Laporan & Statistik"

Page header: "Laporan & Statistik" + "Eksport Excel" + "Eksport PDF" buttons

Filter row: date range | select HSK | select tahun (2024/2023/2022) | "Jana Laporan" button

Summary stats (4 cards):
- Jumlah Permohonan: 1,247
- Permohonan Diluluskan: 1,089 (87.3%)
- Permohonan Ditolak: 158 (12.7%)
- Jumlah Hasil: RM 62,340

Charts section (2x2 grid, white cards, CSS-only charts):
- Top left: "Permohonan Bulanan" — CSS bar chart, 12 months, green bars
- Top right: "Hasil Bulanan (RM)" — CSS bar chart approximation
- Bottom left: "Mengikut HSK" — horizontal CSS bars with % labels
- Bottom right: "Mengikut Tujuan" — CSS bars (Rekreasi, Pendakian, Penyelidikan, Pendidikan, Fotografi)

Detailed Monthly Table:
Columns: Bulan | Bil. Permohonan | Diluluskan | Ditolak | Kadar Lulus | Hasil (RM)
Jan | 89 | 78 | 11 | 87.6% | RM 4,230
Feb | 76 | 65 | 11 | 85.5% | RM 3,540
Mar | 95 | 84 | 11 | 88.4% | RM 4,890
Apr | 112 | 98 | 14 | 87.5% | RM 5,670
May | 134 | 119 | 15 | 88.8% | RM 6,450
Jun | 98 | 82 | 16 | 83.7% | RM 4,110
Jul | 87 | 75 | 12 | 86.2% | RM 4,020
Aug | 103 | 90 | 13 | 87.4% | RM 4,860
Sep | 91 | 79 | 12 | 86.8% | RM 4,230
Oct | 108 | 95 | 13 | 88.0% | RM 5,180
Nov | 115 | 101 | 14 | 87.8% | RM 5,490
Dec | 139 | 123 | 16 | 88.5% | RM 7,670
Jumlah | 1,247 | 1,089 | 158 | 87.3% | RM 62,340 (bold total row)

---

## General Requirements

1. Every public page shares the same sticky navbar and footer (copy consistently across all public HTML files)
2. Every admin page shares the same fixed sidebar and top navbar (copy consistently)
3. Use Alpine.js x-data for: multi-step form, tab switching, modal open/close, dropdown menus, sidebar mobile toggle, filter bars, bulk checkbox selection
4. Smooth CSS transitions: hover card effects (translate-y, shadow), button press states, modal fade-in overlay
5. Realistic Malaysian mock data: names (Ahmad Firdaus, Nurul Ain, Mohd Hafiz, Siti Rahayu, Faizal, Zulkifli), IC numbers, phone numbers starting 01x, Johor addresses
6. All interface text in Bahasa Malaysia
7. Form inputs: label above, placeholder text, green focus ring (focus:ring-primary focus:border-primary)
8. Status badges: pill-shaped (rounded-full px-3 py-1 text-xs font-semibold), consistent colors across all pages
9. Loading spinner CSS animation on form submit button state
10. permit.html has @media print CSS to hide .no-print elements, render clean white page
11. All internal links use correct relative paths (admin pages use ../index.html to go back to public)
12. Admin sidebar highlights current active page with gold left border + lighter background
13. Public page sections use subtle green gradients for visual depth
14. Mobile responsive: public pages fully responsive with hamburger nav drawer; admin has collapsible sidebar via Alpine.js
15. Overall feel: professional Malaysian government portal — trustworthy, clean, accessible, nature-inspired
```

---

## 🗂️ Struktur Fail Yang Akan Dijana

```
hsk-johor-permit/
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── index.html                    ← Landing page (public)
├── apply.html                    ← Borang permohonan (multi-step)
├── status.html                   ← Semak status permohonan
├── payment.html                  ← Bayaran online
├── permit.html                   ← Digital permit (printable)
├── admin/
│   ├── index.html                ← Dashboard admin
│   ├── applications.html         ← Senarai semua permohonan
│   ├── application-detail.html   ← Butiran & tindakan pegawai
│   ├── hsk.html                  ← Pengurusan hutan simpanan kekal
│   └── reports.html              ← Laporan & statistik
└── src/
    ├── main.js                   ← Alpine.js + Lucide init
    └── style.css                 ← Tailwind directives + CSS variables
```

---

## 🎨 Rujukan Warna (JPNJ Brand)

| Peranan | Kelas Tailwind | Hex |
|---|---|---|
| Primary Green | `bg-primary` | `#2d6a2d` |
| Primary Dark | `bg-primary-dark` | `#1a3d1a` |
| Primary Light | `bg-primary-light` | `#3a7d3a` |
| Accent Gold | `bg-accent` | `#c8a227` |
| Surface | `bg-surface` | `#f0f7f0` |
| Card | `bg-white` | `#ffffff` |
| Border | `border-border` | `#d4e4d4` |
| Text | `text-text` | `#1c2b1c` |

---

## 🏷️ Status Badge Colors

| Status | Kelas Tailwind |
|---|---|
| Baru | `bg-blue-100 text-blue-700` |
| Dalam Semakan | `bg-yellow-100 text-yellow-700` |
| Diluluskan | `bg-green-100 text-green-700` |
| Ditolak | `bg-red-100 text-red-700` |
| Dibayar | `bg-teal-100 text-teal-700` |

---

## ⚡ Quick Start Selepas Generate

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173

# 3. Build untuk production
npm run build
# → output dalam /dist

# 4. Preview build
npm run preview

# 5. Deploy ke GitHub Pages
npm run deploy
# → push /dist ke branch gh-pages automatik
```

> **Nota penting:** Tukar nilai `base` dalam `vite.config.js` kepada nama GitHub repo anda.
> Contoh: repo bernama `hsk-johor-permit` → `base: '/hsk-johor-permit/'`

---

## 🚀 Setup GitHub Pages (Satu Kali Sahaja)

1. Push kod ke GitHub repo anda
2. Pergi ke **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **gh-pages** / **(root)**
5. Klik Save — laman akan live di:
   `https://username.github.io/hsk-johor-permit/`

---

*Prompt ini disediakan untuk pembangunan prototaip Sistem Permit HSK Negeri Johor oleh Jabatan Perhutanan Negeri Johor (JPNJ).*
