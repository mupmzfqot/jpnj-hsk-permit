# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML prototype for "Sistem Dalam Talian Permohonan & Bayaran Permit Memasuki Hutan Simpanan Kekal (HSK) Negeri Johor" — an online forest reserve entry permit system for Jabatan Perhutanan Negeri Johor (JPNJ). Full specification is in `HSK-Johor-Permit-System-Prompt.md`.

> Note: The repo was scaffolded as a Vite + TypeScript vanilla template. The target spec uses vanilla JS (`src/main.js`). When building out the project, replace TypeScript scaffolding with plain JS per the spec.

## Commands

```bash
npm install         # Install dependencies
npm run dev         # Dev server → http://localhost:5173
npm run build       # vite build → /dist
npm run preview     # Preview production build
npm run deploy      # npm run build && gh-pages -d dist  (add gh-pages dep first)
```

## Tech Stack

- **Vite** — build tool & dev server, vanilla (no framework)
- **TailwindCSS v3** via npm (NOT CDN)
- **Alpine.js** via npm — all UI interactivity
- **Lucide** icons via npm
- **@fontsource/merriweather** (headings) + **@fontsource/plus-jakarta-sans** (body)
- Deploy: **GitHub Pages** via `gh-pages` npm package

## Target Project Structure

```
project-root/
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── index.html                    # Landing page (public)
├── apply.html                    # Borang permohonan (multi-step)
├── status.html                   # Semak status permohonan
├── payment.html                  # Bayaran online
├── permit.html                   # Digital permit (printable)
├── admin/
│   ├── index.html                # Dashboard admin
│   ├── applications.html         # Senarai semua permohonan
│   ├── application-detail.html   # Butiran & tindakan pegawai
│   ├── hsk.html                  # Pengurusan hutan simpanan kekal
│   └── reports.html              # Laporan & statistik
└── src/
    ├── main.js                   # Alpine.js + Lucide init
    └── style.css                 # Tailwind directives + CSS variables
```

## Config Files

**vite.config.js** — multi-page entry with all 10 HTML files:
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

**tailwind.config.js:**
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

**postcss.config.js:**
```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } }
```

## src/main.js

Every HTML file must include `<script type="module" src="/src/main.js"></script>` before `</body>`.

```js
import './style.css'
import Alpine from 'alpinejs'
import { createIcons, icons } from 'lucide'
window.Alpine = Alpine
Alpine.start()
createIcons({ icons })
```

## src/style.css

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
body { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--color-text); background-color: var(--color-surface); }
h1, h2, h3, h4 { font-family: 'Merriweather', serif; }
@media print { .no-print { display: none !important; } body { background: white; } }
```

## Page Summaries

| Page | Key Features |
|---|---|
| `index.html` | Hero (80vh gradient), stats strip, 4 quick-access cards, 6 HSK location cards, 3-step how-it-works, public navbar + footer |
| `apply.html` | 5-step form (Alpine `step`): personal info → HSK & date → group members (dynamic table) → documents upload → review & submit; fee calc; success state with reference no |
| `status.html` | Search by ref no or IC; result card with vertical 5-step timeline tracker; gold pulse animation on current step |
| `payment.html` | Fee summary table; payment method radio cards (FPX/card/e-wallet); FPX bank grid (8 banks); success modal |
| `permit.html` | A4-style printable card; QR placeholder; circular stamp; group members table; `.no-print` action bar; print CSS |
| `admin/index.html` | Fixed sidebar + top navbar; 4 stat cards; recent applications table (8 rows); CSS bar charts |
| `admin/applications.html` | Filter card; bulk action bar (Alpine x-show); 15-row table with checkboxes; pagination |
| `admin/application-detail.html` | 2/3 + 1/3 layout; officer action card (approve/reject modals); activity log timeline |
| `admin/hsk.html` | 6 HSK cards with capacity progress bars; status toggles; closure schedule table |
| `admin/reports.html` | Filter row; 4 summary cards; 4 CSS-only charts (2×2 grid); monthly breakdown table (12 rows + total) |

## HSK Locations

HSK Gunung Ledang (Segahar), HSK Endau-Rompin (Mersing), HSK Gunung Pulai (Kulai), HSK Gunung Arong (Mersing), HSK Gunung Belumut (Kluang), HSK Panti (Kota Tinggi)

## Architecture Conventions

**Layouts:**
- Public pages: sticky navbar (`bg-primary`, top-0 z-50) + footer (`bg-primary-dark`); mobile hamburger with Alpine drawer
- Admin pages: fixed left sidebar (260px, `bg-primary-dark`) + top navbar (white, h-16); active nav item uses `border-l-4 border-accent` + lighter bg tint; sidebar bottom shows officer avatar

**Alpine.js patterns:**
- Multi-step form: `x-data="{ step: 1 }"`
- Modals: `x-data="{ open: false }"` + `x-show` with overlay
- Payment method: `x-data="{ method: 'fpx' }"`
- Filter/bulk select, tab toggle, dropdown menus, HSK status toggle

**Status badge classes** (pill: `rounded-full px-3 py-1 text-xs font-semibold`):
- Baru → `bg-blue-100 text-blue-700`
- Dalam Semakan → `bg-yellow-100 text-yellow-700`
- Diluluskan → `bg-green-100 text-green-700`
- Ditolak → `bg-red-100 text-red-700`
- Dibayar → `bg-teal-100 text-teal-700`

**Forms:** label above input, green focus ring (`focus:ring-primary focus:border-primary`), loading spinner on submit

**Fee rates:** Warganegara RM5.00/orang/hari · Bukan Warganegara RM20.00/orang/hari

**Internal links:** Admin pages link back to public with `../index.html`

**Mock data:** Malaysian names (Ahmad Firdaus, Nurul Ain, Mohd Hafiz, Siti Rahayu, Faizal, Zulkifli), IC format `XXXXXX-XX-XXXX`, phones `01X-XXXXXXX`, Johor addresses. Reference numbers: `HSK-2024-00847`, payment: `PAY-2024-075834`.

**All UI text in Bahasa Malaysia.**

**GitHub Pages:** `base: '/hsk-johor-permit/'` in vite.config.js — change to match actual repo name. Deploy to `gh-pages` branch.
