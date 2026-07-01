# CNIC.io — AI-Powered CNIC Parser

> **Drop the ID. We'll do the rest.**  
> Transform Pakistani identity documents into clean, structured data within seconds.

---

## 📸 Screenshots

> *(Screenshots will be added here once deployed)*

| Loading Screen | Hero | Upload | Results |
|:-:|:-:|:-:|:-:|
| *Coming soon* | *Coming soon* | *Coming soon* | *Coming soon* |

---

## ✨ Features

- 🤖 **AI-Powered OCR** — Neural network trained on Pakistani CNIC documents
- ⚡ **Lightning Fast** — Full extraction in under 2 seconds
- 🔒 **Privacy First** — No image storage; all processing is ephemeral
- 📊 **8 Fields Extracted** — Name, Father's Name, CNIC No., Gender, DOB, DOI, DOE, Address
- 📋 **One-Click Copy** — Copy individual fields or all data at once
- 🎨 **Premium UI** — Glassmorphism, animations, dark mode
- 📱 **Fully Responsive** — Desktop, tablet, and mobile support
- 🌐 **Developer API Ready** — REST API integration points prepared

---

## 🛠️ Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Framework   | React 18 + Vite 6           |
| Styling     | Tailwind CSS v4             |
| Animations  | Framer Motion               |
| Icons       | Lucide React                |
| Fonts       | Inter + Space Grotesk       |
| Build Tool  | Vite                        |
| Package Mgr | npm                         |

---

## 📁 Folder Structure

```
frontend/
├── public/
│   └── logo.jpg              # App favicon & OG image
│
├── src/
│   ├── assets/
│   │   └── logo/             # Logo assets
│   │
│   ├── components/
│   │   ├── AnimatedBackground.jsx  # Floating gradient blobs
│   │   ├── ErrorCard.jsx           # Error states (invalid, failed, etc.)
│   │   ├── EmptyState.jsx          # Pre-upload empty state
│   │   ├── Footer.jsx              # Site footer
│   │   ├── Hero.jsx                # Landing hero section
│   │   ├── LoadingScreen.jsx       # Intro loading screen (2-3s)
│   │   ├── Logo.jsx                # Animated SVG logo component
│   │   ├── Navbar.jsx              # Sticky glass navigation bar
│   │   ├── ProcessingCard.jsx      # AI scanning animation card
│   │   ├── ResultCard.jsx          # Extraction results display
│   │   └── UploadCard.jsx          # Drag & drop upload interface
│   │
│   ├── hooks/
│   │   └── useFileUpload.js        # File selection & validation hook
│   │
│   ├── pages/
│   │   └── Home.jsx                # Main page (state machine)
│   │
│   ├── utils/
│   │   └── format.js               # CNIC, date, file size formatters
│   │
│   ├── App.jsx                     # Root with loading gate
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global design system
│
├── .env.example                    # Environment variable template
├── .gitignore
├── index.html                      # HTML entry with SEO meta tags
├── jsconfig.json
├── package.json
└── vite.config.js
```

---

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/cnic-parser.git
cd cnic-parser/frontend

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env

# 4. Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

---

## 🧑‍💻 Development

```bash
# Start dev server with HMR
npm run dev

# Type-check & lint
npm run lint

# Preview production build locally
npm run preview
```

---

## 🏗️ Build for Production

```bash
# Build optimized bundle
npm run build

# Output is in: dist/
```

---

## 🔌 Future Backend Integration

The frontend is designed for plug-and-play backend integration.

When your backend is ready:

1. Set `VITE_API_BASE_URL` in `.env` to your API endpoint
2. Create `src/services/cnicService.js`:

```js
const BASE = import.meta.env.VITE_API_BASE_URL

export async function parseCnic(file) {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${BASE}/api/parse`, {
    method: 'POST',
    body: form,
  })
  if (!res.ok) throw new Error('Extraction failed')
  return res.json()
}
```

3. Replace the `setTimeout` mock in `src/pages/Home.jsx` with `parseCnic(file)`.

---

## 📦 Key Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "framer-motion": "^11.x",
  "lucide-react": "^0.4xx",
  "tailwindcss": "^4.x",
  "@tailwindcss/vite": "^4.x"
}
```

---

## 🎨 Design System

The design system is defined entirely in `src/index.css` via CSS custom properties:

- **Colors**: Emerald + Blue gradient palette on slate-950 dark base
- **Typography**: Inter (body) + Space Grotesk (headings)
- **Glass cards**: `glass-card` utility class
- **Gradient text**: `gradient-text` utility
- **Animations**: Float, pulse glow, scan line, shimmer, fade

---

## 🤝 Credits

- **Design inspiration**: Linear, Vercel, Stripe, ChatGPT
- **Icons**: [Lucide](https://lucide.dev)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Fonts**: [Google Fonts](https://fonts.google.com) — Inter & Space Grotesk
- **Built with** ❤️ in Pakistan

---

## 📄 License

MIT © CNIC.io


