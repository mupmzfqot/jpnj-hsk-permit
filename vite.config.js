import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/jpnj-hsk-permit/',
  build: {
    rollupOptions: {
      input: {
        main:              resolve(__dirname, 'index.html'),
        apply:             resolve(__dirname, 'apply.html'),
        status:            resolve(__dirname, 'status.html'),
        payment:           resolve(__dirname, 'payment.html'),
        permit:            resolve(__dirname, 'permit.html'),
        adminLogin:        resolve(__dirname, 'admin/login.html'),
        adminDashboard:    resolve(__dirname, 'admin/index.html'),
        adminApplications: resolve(__dirname, 'admin/applications.html'),
        adminDetail:       resolve(__dirname, 'admin/application-detail.html'),
        adminHsk:          resolve(__dirname, 'admin/hsk.html'),
        adminReports:      resolve(__dirname, 'admin/reports.html'),
      }
    }
  }
})
