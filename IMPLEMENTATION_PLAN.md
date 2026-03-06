# Implementation Plan — HSK Johor Permit System Prototype

## Current State

Bare Vite + TypeScript scaffold. No TailwindCSS, Alpine.js, Lucide, or fonts installed.
Files to remove: `src/counter.ts`, `tsconfig.json`.
Files to replace: `src/main.ts` → `src/main.js`, `src/style.css`, `index.html`, `package.json`.

---

## Phase 1 — Project Setup

Goal: get `npm run dev` running with Tailwind styles, Alpine.js, and Lucide icons working before any page is built.

### 1.1 Update `package.json`

```json
{
  "name": "jpnj-hsk-permit",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev":     "vite",
    "build":   "vite build",
    "preview": "vite preview",
    "deploy":  "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "vite":        "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer":"^10.4.0",
    "postcss":     "^8.4.0",
    "gh-pages":    "^6.0.0"
  },
  "dependencies": {
    "alpinejs":                    "^3.13.0",
    "lucide":                      "^0.300.0",
    "@fontsource/merriweather":    "^5.0.0",
    "@fontsource/plus-jakarta-sans":"^5.0.0"
  }
}
```

### 1.2 Create `vite.config.js`

Multi-page entry pointing to all 10 HTML files. Base set to `/hsk-johor-permit/` for GitHub Pages.

```js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/hsk-johor-permit/',
  build: {
    rollupOptions: {
      input: {
        main:              resolve(__dirname, 'index.html'),
        apply:             resolve(__dirname, 'apply.html'),
        status:            resolve(__dirname, 'status.html'),
        payment:           resolve(__dirname, 'payment.html'),
        permit:            resolve(__dirname, 'permit.html'),
        adminDashboard:    resolve(__dirname, 'admin/index.html'),
        adminApplications: resolve(__dirname, 'admin/applications.html'),
        adminDetail:       resolve(__dirname, 'admin/application-detail.html'),
        adminHsk:          resolve(__dirname, 'admin/hsk.html'),
        adminReports:      resolve(__dirname, 'admin/reports.html'),
      }
    }
  }
})
```

### 1.3 Create `tailwind.config.js`

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

### 1.4 Create `postcss.config.js`

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} }
}
```

### 1.5 Replace `src/style.css`

```css
@import '@fontsource/merriweather';
@import '@fontsource/plus-jakarta-sans';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary:       #2d6a2d;
  --color-primary-dark:  #1a3d1a;
  --color-primary-light: #3a7d3a;
  --color-accent:        #c8a227;
  --color-surface:       #f0f7f0;
  --color-border:        #d4e4d4;
  --color-text:          #1c2b1c;
}

body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--color-text);
  background-color: var(--color-surface);
}

h1, h2, h3, h4 { font-family: 'Merriweather', serif; }

@media print {
  .no-print { display: none !important; }
  body { background: white; }
}
```

### 1.6 Create `src/main.js` (delete `src/main.ts` and `src/counter.ts`)

```js
import './style.css'
import Alpine from 'alpinejs'
import { createIcons, icons } from 'lucide'

window.Alpine = Alpine
Alpine.start()
createIcons({ icons })
```

### 1.7 Delete leftover scaffold files

- `src/counter.ts`
- `src/typescript.svg`
- `tsconfig.json`

### 1.8 Install dependencies

```bash
npm install
npm run dev   # verify dev server starts and Tailwind classes resolve
```

---

## Phase 2 — Public Pages

All public pages share the same **sticky navbar** and **footer**. Build `index.html` first to establish the shared HTML blocks, then copy-paste them into subsequent pages.

Every HTML file ends with:
```html
<script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

### Page 1 — `index.html` (Landing Page)

**Sections (top to bottom):**

1. **Utility bar** (`bg-primary-dark`, h-8)
   - Left: tree icon + "Portal Rasmi JPNJ | Johor"
   - Right: "Hubungi Kami | Soalan Lazim | BM / EN"

2. **Navbar** (`bg-primary`, sticky, z-50)
   - Logo: tree SVG + "JPNJ" bold + tagline (white)
   - Nav links: Utama | Permohonan | Semak Status | Bayaran | Panduan
   - Right: "Log Masuk" (white outlined) + "Daftar" (`bg-accent` filled)
   - Mobile: hamburger — `x-data="{ open: false }"` → drawer slides in

3. **Hero** (80vh, dark green CSS gradient)
   - Large white heading + subheading
   - Two CTA buttons: gold filled + white outlined
   - "✓ Diiktiraf oleh Jabatan Perhutanan Negeri Johor" badge

4. **Stats strip** (white bg, border top/bottom)
   - 4 stats: permits issued, HSK count, satisfaction rate, 24/7 online

5. **Quick access cards** (4-col grid, `bg-surface`)
   - Mohon Permit Baru | Semak Status | Bayaran Online | Muat Turun Permit
   - Each: icon, title, short desc, arrow link

6. **HSK Locations** (6-card grid)
   - Cards: HSK Gunung Ledang, Endau-Rompin, Gunung Pulai, Gunung Arong, Gunung Belumut, Panti
   - Each card: green header, name, district, capacity badge, "Mohon Permit" button

7. **How It Works** (3-step horizontal)
   - Step 1: Isi Borang → Step 2: Buat Bayaran → Step 3: Muat Turun Permit

8. **Footer** (`bg-primary-dark`, 4-col grid)
   - Tentang JPNJ | Pautan Pantas | Hubungi Kami | Ikuti Kami
   - Address, phone 07-223 7471, email jpnj@johor.gov.my
   - Copyright line

---

### Page 2 — `apply.html` (Borang Permohonan)

**Alpine state:** `x-data="{ step: 1, citizens: 'malaysia', purpose: 'rekreasi', members: [], submitted: false }"`

**Step progress indicator** (top of form): numbered circles connected by line — active = `bg-primary`, done = `bg-accent` with checkmark, upcoming = gray.

**Step 1 — Maklumat Pemohon**
- Nama Penuh (text)
- No. Kad Pengenalan (text, placeholder: `000000-00-0000`)
- No. Telefon (text, placeholder: `01X-XXXXXXX`)
- Alamat Emel (email)
- Warganegara: radio — Warganegara Malaysia / Bukan Warganegara (`x-model="citizens"`)
- Alamat Tetap (textarea)

**Step 2 — Pilih HSK & Tarikh**
- Dropdown: 6 HSK options
- Tarikh Masuk / Tarikh Keluar (date inputs)
- Tujuan Lawatan: radio (Rekreasi / Penyelidikan / Pendidikan / Fotografi / Pendakian), `x-model="purpose"`
- Laluan Dipilih (text, `x-show="purpose === 'pendakian'"`)

**Step 3 — Maklumat Kumpulan**
- Bilangan Ahli (number, min 1, max 50)
- Dynamic member table — "Tambah Ahli" appends `{ nama:'', ic:'', umur:'', warganegara:'' }` to `members` array
- `x-for="(member, i) in members"` renders rows; "Buang" calls `members.splice(i, 1)`

**Step 4 — Dokumen Sokongan**
- Upload Salinan Kad Pengenalan (`.pdf,.jpg,.png`)
- Upload Surat Kebenaran (`x-show="purpose === 'penyelidikan' || purpose === 'pendidikan'"`)
- Upload Senarai Ahli Kumpulan
- Two checkboxes: maklumat benar + terma & syarat

**Step 5 — Semak & Hantar**
- Read-only summary card of all entered data
- Fee table (auto-calculated):
  - Warganegara: RM5.00/orang/hari
  - Bukan Warganegara: RM20.00/orang/hari
- "Hantar Permohonan" button (with spinner on click)
- Success state (`x-show="submitted"`): green checkmark, ref no `HSK-2024-00847`, next steps

**Navigation:** "Sebelumnya" (hidden on step 1) + "Seterusnya" (hidden on step 5) buttons.

---

### Page 3 — `status.html` (Semak Status)

**Alpine state:** `x-data="{ tab: 'rujukan', shown: true }"`

**Search card** (centered, max-w-2xl):
- Tab toggle: "No. Rujukan" | "No. Kad Pengenalan" — `x-on:click="tab = '...'"`, active tab styled with bottom border + `text-primary`
- Text input + "Semak" primary button

**Result card** (shown by default with mock data for `HSK-2024-00847`):
- Two-column: applicant details left, status badge right
- Fields: Nama, HSK, Tarikh, Status (Diluluskan — green pill), Bilangan Ahli, Jumlah Bayaran

**Vertical timeline tracker** (5 steps):
1. ✓ Permohonan Diterima — 10 Dis 2024, 09:32 AM
2. ✓ Dalam Semakan — 11 Dis 2024, 02:15 PM
3. ✓ Diluluskan — 12 Dis 2024, 10:00 AM
4. ✓ Bayaran Diterima — 12 Dis 2024, 11:45 AM
5. ● Permit Dikeluarkan — gold pulsing dot (`animate-pulse`)

Completed steps: green circle with white checkmark. Connecting line between steps.

**Action buttons:** "Muat Turun Permit" (primary) | "Cetak" (outlined)

---

### Page 4 — `payment.html` (Bayaran Online)

**Alpine state:** `x-data="{ method: 'fpx', bank: '', processing: false, paid: false }"`

**Fee summary card** (white, border):
- Table: Nama Pemohon | HSK | Tempoh | Bil. Ahli | Kadar | Jumlah
- Mock row: Ahmad Firdaus | Gunung Ledang | 3 hari | 5 orang | RM5/orang/hari | **RM75.00**
- Bold total row: "Jumlah Perlu Dibayar: RM75.00"
- Green info note: "Bayaran perlu diselesaikan dalam 24 jam"

**Payment method** — radio cards with icon + label:
- FPX Online Banking (default, `x-model="method"` value `fpx`)
- Kad Kredit / Debit (Visa / Mastercard) — value `card`
- e-Wallet (Touch 'n Go, Boost, GrabPay) — value `ewallet`

**FPX bank grid** (`x-show="method === 'fpx'"`):
- 8 bank buttons: Maybank2u, CIMB Clicks, RHB Now, Public Bank, Hong Leong Connect, AmOnline, Bank Islam, Bank Rakyat
- Selected bank highlighted with `ring-2 ring-primary`

**Security badge:** padlock icon + "Pembayaran selamat menggunakan enkripsi SSL 256-bit"

**"Teruskan Pembayaran"** button — `x-on:click="processing=true"` shows spinner; after 1.5s (setTimeout), `paid=true`

**Success modal** (`x-show="paid"`, fixed overlay):
- Large green checkmark
- "Pembayaran Berjaya!" heading
- Ref: `PAY-2024-075834` | Jumlah: RM75.00 | Tarikh: 12 Disember 2024, 11:45 AM
- "Muat Turun Resit" (outlined) + "Lihat Permit" (primary, link to `permit.html`)

---

### Page 5 — `permit.html` (Digital Permit)

**No-print action bar** (`class="no-print"`, `bg-white`, shadow):
- "Cetak Permit" (`onclick="window.print()"`) | "Muat Turun PDF" | "Kongsi"
- Status badge: "SAH / VALID" (green pill, large)

**Printable permit card** (A4-style, `max-w-3xl`, white bg, border, centered, `mx-auto`):

Header:
- 4px green top border strip
- Tree SVG icon + "JABATAN PERHUTANAN NEGERI JOHOR" (centered)
- "PERMIT MEMASUKI HUTAN SIMPANAN KEKAL" subtitle
- Permit No: `HSK-PERMIT-2024-00847` (gold, right-aligned)

Two-column details grid:
- Nama Pemohon, No. K/P, No. Telefon, HSK Tujuan, Daerah, Tarikh Masuk, Tarikh Keluar (3 Hari), Tujuan, Bilangan Peserta, Jumlah Bayaran, Status (large green badge)

Group members table (5 rows):
- No. | Nama | No. Kad Pengenalan | Umur | Warganegara
- Mock: Ahmad Firdaus, Nurul Ain, Mohd Hafiz, Siti Rahayu, Faizal

Bottom two-column section:
- Left: 200×200 gray QR placeholder box + "Imbas untuk pengesahan permit"
- Right: circular stamp "SAH — JPNJ 2024" + signature line + "Pengarah Perhutanan Negeri Johor"

Permit conditions (5 items, small text, BM): responsible forest entry rules.

---

## Phase 3 — Admin Pages

All admin pages share the **same fixed sidebar + top navbar HTML block**. Build the sidebar once in `admin/index.html`, then copy it verbatim into the other 4 admin pages, only changing the active nav item.

**Sidebar structure** (fixed, w-64, `bg-primary-dark`, full height, white text):
- Top: tree icon + "JPNJ" + "Admin Panel"
- Nav groups (uppercase labels):
  - UTAMA: Dashboard
  - PERMOHONAN: Senarai Permohonan | Permohonan Baru | Semakan Pending (badge: 43)
  - PENGURUSAN: Pengurusan HSK | Pengguna | Pegawai
  - LAPORAN: Laporan & Statistik | Eksport Data
  - SISTEM: Tetapan | Log Aktiviti
- Active item: `border-l-4 border-accent bg-white/10`
- Bottom: avatar + "Encik Zulkifli" + "Pegawai Perhutanan" + logout icon

**Top navbar** (white, `shadow-sm`, h-16, `ml-64`):
- Left: hamburger + breadcrumb
- Right: search | bell (red badge "3") | avatar dropdown (`x-data="{ open: false }"`)

---

### Page 6 — `admin/index.html` (Dashboard)

Active nav: Dashboard

**4 stat cards** (grid-cols-4):
- Jumlah Permohonan: 1,247 | +12% bulan ini | blue icon
- Permohonan Pending: 43 | yellow icon + `border-l-4 border-yellow-400`
- Diluluskan Hari Ini: 28 | green icon
- Jumlah Hasil: RM 18,650 | teal icon

**Recent applications table** (white card):
- "Permohonan Terkini" header + "Lihat Semua" link
- Columns: No. Rujukan | Nama Pemohon | HSK | Tarikh Mohon | Bil. | Status | Tindakan
- 8 mock rows with varied statuses
- Tindakan: eye, edit, trash icon buttons

**Bottom row (2 cols)**:
- "Permohonan 6 Bulan Terakhir" — CSS bar chart using `div` heights, labels Jul–Dec
- "Mengikut HSK" — CSS horizontal bars with 6 HSK rows + percentage labels

---

### Page 7 — `admin/applications.html` (Senarai Permohonan)

Active nav: Senarai Permohonan

**Alpine state:** `x-data="{ selected: [], allSelected: false, filters: { status: '', hsk: '', search: '' } }"`

**Page header:** "Senarai Permohonan" h1 + "Eksport Excel" outlined + "Eksport PDF" outlined

**Filter card:**
- Search input: "Cari No. Rujukan atau Nama..."
- Select: Tapis Status (Semua | Baru | Dalam Semakan | Diluluskan | Ditolak | Dibayar)
- Select: Pilih HSK (6 options)
- Date range inputs: Dari — Hingga
- "Tapis" primary button + "Set Semula" text link

**Bulk action bar** (`x-show="selected.length > 0"`, yellow/amber bg):
- "X item dipilih" + "Luluskan Semua" green + "Tolak Semua" red + "Eksport" outlined

**Data table** (15 mock rows, alternating `bg-white / bg-gray-50`):
- Columns: ☐ | No. Rujukan | Nama Pemohon | No. IC | HSK | Tarikh Mohon | Tarikh Lawatan | Bil. | RM | Status | Tindakan
- Select-all checkbox in header syncs via Alpine
- Sortable header icons (↕ decorative only in prototype)
- Tindakan: eye (primary) | approve (green check) | reject (red x)

**Pagination:** ← 1 2 3 ... 13 → | "Menunjukkan 1–15 daripada 187 rekod"

---

### Page 8 — `admin/application-detail.html` (Butiran Permohonan)

Active nav: Senarai Permohonan

**Alpine state:** `x-data="{ approveModal: false, rejectModal: false }"`

**Page header:** "HSK-2024-00847" h1 + Diluluskan badge + "← Kembali ke Senarai" link

**Layout:** `grid grid-cols-3 gap-6` — left col spans 2, right col spans 1

**Left column cards:**
1. Maklumat Pemohon — all fields from apply form
2. Maklumat Lawatan — HSK, dates, purpose, route
3. Ahli Kumpulan — 5-row table
4. Dokumen Dimuat Naik — `ic_ahmad_firdaus.pdf` + `senarai_ahli.pdf` with download icons

**Right column cards:**
1. Status Permohonan — current badge + mini vertical timeline (5 steps)
2. Tindakan Pegawai:
   - "Luluskan Permohonan" (full-width, green) → `approveModal = true`
   - "Tolak Permohonan" (full-width, red outlined) → `rejectModal = true`
   - Nota Pegawai textarea
   - Assign Kepada dropdown
   - "Simpan Nota" button
3. Maklumat Bayaran — Dibayar | RM75.00 | 12 Dis 2024 | PAY-2024-075834
4. Log Aktiviti — timestamped list (5 entries, newest first)

**Approve Modal** (`x-show="approveModal"`, fixed overlay):
- Green header "Luluskan Permohonan"
- Confirm message
- "Batal" + "Ya, Luluskan" buttons

**Reject Modal** (`x-show="rejectModal"`, fixed overlay):
- Red header "Tolak Permohonan"
- Required reason textarea
- "Batal" + "Tolak Permohonan" buttons

---

### Page 9 — `admin/hsk.html` (Pengurusan HSK)

Active nav: Pengurusan HSK

**Alpine state:** `x-data="{ hskStatus: { ledang: true, endau: true, pulai: true, arong: true, belumut: false, panti: true } }"`

**Page header:** "Pengurusan Hutan Simpanan Kekal" + "Tambah HSK Baru" primary button

**HSK Cards grid** (3-col, 6 cards):

Each card:
- Green top border + HSK name (h3)
- Daerah badge (`bg-surface text-primary`)
- Kapasiti Harian + Permohonan Aktif stats
- Capacity progress bar (`bg-primary` fill, red if > 90%)
- Status toggle: `x-on:click="hskStatus.X = !hskStatus.X"` — Aktif (green) / Tidak Aktif (red)
- Footer: "Edit" | "Tarikh Tutup" | "Lihat Permohonan"

Card data:
| HSK | Daerah | Kapasiti | Hari Ini | Status |
|---|---|---|---|---|
| Gunung Ledang | Segahar | 50 | 38 | Aktif |
| Endau-Rompin | Mersing | 30 | 12 | Aktif |
| Gunung Pulai | Kulai | 40 | 40 | Aktif (penuh) |
| Gunung Arong | Mersing | 25 | 5 | Aktif |
| Gunung Belumut | Kluang | 35 | 0 | Tidak Aktif |
| Panti | Kota Tinggi | 20 | 8 | Aktif |

**Jadual Penutupan HSK** (white card below):
- Header + "Tambah Tarikh Tutup" button
- Table: HSK | Tarikh Mula | Tarikh Tamat | Sebab | Status | Tindakan
- 5 mock rows (operasi kawalan, hari kelepasan, musim tengkujuh, etc.)

---

### Page 10 — `admin/reports.html` (Laporan & Statistik)

Active nav: Laporan & Statistik

**Page header:** "Laporan & Statistik" + "Eksport Excel" + "Eksport PDF" buttons

**Filter row:** date range | select HSK | select tahun (2024/2023/2022) | "Jana Laporan" primary button

**4 summary cards:**
- Jumlah Permohonan: 1,247
- Permohonan Diluluskan: 1,089 (87.3%)
- Permohonan Ditolak: 158 (12.7%)
- Jumlah Hasil: RM 62,340

**Charts section** (2×2 grid, white cards, CSS-only — no external chart library):

Each chart uses `div` elements with inline `height` % or `width` % to simulate bars.

- Top left: "Permohonan Bulanan" — vertical bar chart, 12 months
- Top right: "Hasil Bulanan (RM)" — vertical bar chart approximation
- Bottom left: "Mengikut HSK" — horizontal bars with % labels
- Bottom right: "Mengikut Tujuan" — horizontal bars (Rekreasi, Pendakian, Penyelidikan, Pendidikan, Fotografi)

**Monthly breakdown table:**
- Columns: Bulan | Bil. Permohonan | Diluluskan | Ditolak | Kadar Lulus | Hasil (RM)
- 12 data rows (Jan–Dec) + bold total row
- Alternating row bg

---

## Shared Conventions (apply across all pages)

- Status badges: `rounded-full px-3 py-1 text-xs font-semibold` — colors per spec
- Form inputs: `block w-full rounded-md border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`
- Primary button: `bg-primary text-white hover:bg-primary-light transition`
- Outlined button: `border border-primary text-primary hover:bg-primary hover:text-white transition`
- Card: `bg-white rounded-lg shadow-sm border border-border`
- Smooth hover cards: `hover:-translate-y-1 hover:shadow-md transition-transform duration-200`
- Admin internal links: `../index.html`, `../apply.html`, etc.
- All text in Bahasa Malaysia
- Lucide icons rendered via `<i data-lucide="icon-name"></i>` — `createIcons()` in main.js replaces them with SVGs

---

## Mock Data Reference

| Field | Value |
|---|---|
| Reference no | HSK-2024-00847 |
| Payment ref | PAY-2024-075834 |
| Permit no | HSK-PERMIT-2024-00847 |
| Applicant | Ahmad Firdaus bin Hamzah |
| IC | 850412-01-5231 |
| Phone | 012-345 6789 |
| HSK | Gunung Ledang, Segahar |
| Dates | 15–17 Disember 2024 (3 hari) |
| Group size | 5 orang |
| Fee | RM75.00 (RM5 × 5 orang × 3 hari) |
| Admin officer | Encik Zulkifli, Pegawai Perhutanan |
| Route | Laluan Puteri |

Group members: Ahmad Firdaus, Nurul Ain Binti Razali, Mohd Hafiz Bin Ismail, Siti Rahayu Binti Omar, Faizal Bin Yusof
