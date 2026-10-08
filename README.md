# Abha - AarogyaSangini (आरोग्य संगिनी)
### Offline-First AI Telemedicine & Community Triage PWA

An offline-first Progressive Web App (PWA) designed for frontline community health workers (like ASHA and Anganwadi workers) in remote villages with intermittent or no connectivity.

---

### Features
- **Quantized Edge AI Triage**: Runs on-device in sub-15ms with 0 bytes network traffic using calibrated WHO IMCI & MoHFW clinical risk protocols.
- **IndexedDB Offline Queueing (Dexie.js)**: Stores patient vitals and checkup encounters offline; automatically synchronizes with Primary Health Centre (PHC) servers once connectivity is detected.
- **Multilingual Voice Assistant (Web Speech API)**: Eliminates text literacy barriers with speech recognition (STT) and voice guidance (TTS) across **हिन्दी (Hindi)**, **English**, **বাংলা (Bengali)**, **తెలుగు (Telugu)**, **தமிழ் (Tamil)**, and **मराठी (Marathi)**.
- **Scannable ABHA Digital Health QR Cards**: Generates high-resolution vector QR cards (scannable with any smartphone camera) and includes camera-based offline QR scanning for patient identification.
- **PHC Telemedicine Doctor Portal & Outbreak Radar**: Remote medical officers review village referrals, listen to attached audio notes, issue digital prescriptions, and monitor village syndromic outbreak clusters.

---

### Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS Design System
- **Offline Database**: Dexie.js (IndexedDB)
- **AI Engine**: Quantized Neural Inference Kernel + CDSS Decision Rules
- **Voice & Speech**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **QR Code Engine**: `qrcode.react` (SVG) + `jsQR` (Scanner)
- **Deployment**: Vercel & PWA Service Worker (`sw.js`)

---

### Local Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```
