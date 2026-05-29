# Noorrix Motors — Next.js Folder Structure Guide

> Yeh guide tumhare liye hai jo abhi React se Next.js mein aye hain.
> Har cheez simple Roman English mein explain ki gayi hai — senior developer ki tarah.

---

## Table of Contents

1. [Next.js Kya Hai aur React Se Kaise Alag Hai?](#1-nextjs-kya-hai)
2. [App Router Ka Concept](#2-app-router)
3. [Tumhara Current Folder Structure](#3-current-folder-structure)
4. [Har Folder/File Ki Detail](#4-folder-file-detail)
5. [Routing System Kaise Kaam Karta Hai](#5-routing)
6. [Data Flow — Frontend Se Backend Tak](#6-data-flow)
7. [API Calls Kahan Likhein](#7-api-calls)
8. [Environment Variables](#8-env-variables)
9. [Common Beginner Mistakes](#9-common-mistakes)
10. [Recommended Production Folder Structure](#10-recommended-structure)

---

## 1. Next.js Kya Hai?

React ek **library** hai — sirf UI banata hai.
Next.js ek **framework** hai — React ke upar bana hai aur bahut saari cheezein automatic karta hai:

| Feature | React (CRA) | Next.js |
|---|---|---|
| Routing | React Router install karo | Automatically folder se banta hai |
| SEO | Bahut mushkil | Built-in, asaan |
| Server Side Rendering | Nahi | Haan |
| API Routes | Nahi | Built-in |
| Image Optimization | Nahi | Built-in |
| Performance | Average | Bahut zyada better |

---

## 2. App Router

Next.js 13+ ke baad ek naya system aaya — **App Router**.

Purana system tha `pages/` folder. Naya system hai `app/` folder.

**Simple Rule:**
> Jo folder `src/app/` ke andar hai, woh automatically ek URL banta hai.

```
src/app/contact/page.js   →   website.com/contact
src/app/about/page.js     →   website.com/about
src/app/stock/page.js     →   website.com/stock
src/app/page.js           →   website.com/  (homepage)
```

---

## 3. Tumhara Current Folder Structure

```
noorrix-motors/
│
├── public/                        ← Static files (images, icons)
│   ├── assets/
│   │   └── images/
│   │       ├── banners/
│   │       ├── cars-logos/
│   │       ├── noorix_logo.jpg
│   │       └── favicon-noorrix.ico
│   └── favicon.jpg
│
├── src/
│   ├── app/                       ← NEXT.JS KA BRAIN (routing yahan hoti hai)
│   │   ├── layout.js              ← Root layout (Navbar, Footer, global wrap)
│   │   ├── page.js                ← Homepage (website.com/)
│   │   ├── globals.css            ← Global CSS
│   │   ├── favicon.ico            ← Browser tab icon
│   │   ├── not-found.js           ← 404 page
│   │   ├── robots.js              ← SEO robots file
│   │   │
│   │   ├── about/page.js          ← website.com/about
│   │   ├── contact/page.js        ← website.com/contact
│   │   ├── stock/page.js          ← website.com/stock
│   │   ├── finance/page.js        ← website.com/finance
│   │   ├── servicing/page.js      ← website.com/servicing
│   │   ├── warranty/page.js       ← website.com/warranty
│   │   ├── delivery/page.js       ← website.com/delivery
│   │   ├── dents-paints/page.js   ← website.com/dents-paints
│   │   ├── part-exchange/page.js  ← website.com/part-exchange
│   │   ├── vehicle-sourcing/page.js
│   │   ├── login/page.js
│   │   ├── reset-password/page.js
│   │   ├── privacy-policy/page.js
│   │   ├── cookie-policy/page.js
│   │   ├── terms-of-use/page.js
│   │   ├── sitemap/page.js
│   │   │
│   │   ├── cars/[id]/             ← Dynamic route (website.com/cars/123)
│   │   └── used-cars/[brand]/     ← Dynamic route (website.com/used-cars/toyota)
│   │
│   ├── components/                ← Reusable UI pieces
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Hero/
│   │   ├── WhatsApp/
│   │   └── ... (20+ components)
│   │
│   ├── views/                     ← Full page content (page ka poora UI)
│   │   ├── Home.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   └── ... (15+ views)
│   │
│   ├── data/
│   │   └── cars.js                ← Static data (cars list)
│   │
│   └── styles/
│       └── global.css             ← Extra global styles
│
├── .env.local                     ← Secret environment variables
├── next.config.mjs                ← Next.js settings
├── tailwind.config.js             ← Tailwind CSS settings
├── package.json                   ← Project info + dependencies
└── jsconfig.json                  ← Path aliases (@/ shortcut)
```

---

## 4. Folder / File Ki Detail

---

### `src/app/` — SABSE IMPORTANT FOLDER

Yeh Next.js ka dil hai. Yahan routing hoti hai.

---

#### `src/app/layout.js` — Root Layout

**Kya karta hai?**
Yeh ek wrapper hai jo **har page pe wrap hota hai**. Ek baar likhو, sab pages pe apply ho jata hai.

**Tumhare project mein:**
```js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ScrollToHash />
        {children}         {/* ← Yahan har page load hota hai */}
        <WhatsAppButton />
      </body>
    </html>
  );
}
```

`{children}` ki jagah kabhi Contact page aata hai, kabhi About page. Layout same rehta hai.

**Practical Example:**
Agar tumhe Navbar aur Footer har page pe chahiye — layout.js mein dalo, har page pe automatically aa jayega.

---

#### `src/app/page.js` — Homepage

```js
// website.com/ → yeh file chalti hai
import Home from "@/views/Home";

export default function Page() {
  return <Home />;
}
```

Yeh sirf ek wrapper hai jo `views/Home.jsx` ko call karta hai.

**Metadata export** — SEO ke liye:
```js
export const metadata = {
  title: "Noorrix Motors | Quality Used Cars UK",
  description: "Browse quality used cars..."
};
```
Yeh automatically browser tab aur Google search mein dikhta hai. React mein yeh itna asaan nahi tha.

---

#### `src/app/contact/page.js` — Contact Page

```
Folder:  src/app/contact/
File:    page.js
URL:     website.com/contact
```

**Rule yad rakho:**
> Har folder ke andar `page.js` hona chahiye — warna woh URL accessible nahi hoga.

---

#### `src/app/cars/[id]/` — Dynamic Route

Square brackets `[id]` matlab — yeh value URL se aati hai.

```
src/app/cars/[id]/page.js

URL: website.com/cars/toyota-corolla-2020
URL: website.com/cars/honda-civic-2019
URL: website.com/cars/bmw-3series-2021
```

Ek hi `page.js` file, aur hazaron alag URLs. `id` variable mein car ki value aati hai.

---

#### `src/app/not-found.js` — 404 Page

Jab user koi aisi URL type kare jo exist nahi karti, yeh page show hota hai.

```
website.com/kuch-bhi-galat  →  not-found.js chalega
```

---

#### `src/app/robots.js` — SEO Robots

Google aur doosre search engines ko batata hai — konse pages index karo, konse mat karo.
Automatically `/robots.txt` URL pe serve hota hai.

---

### `src/components/` — Reusable UI Pieces

**Kya hota hai yahan?**
Woh cheezein jo **multiple pages pe use hoti hain**.

**Tumhare project mein:**

| Component | Use Kahan Hota Hai |
|---|---|
| `Navbar/` | Har page pe (layout.js se) |
| `Footer/` | Har page pe (layout.js se) |
| `Hero/` | Homepage pe |
| `WhatsApp/` | Har page pe (layout.js se) |
| `CTA/` | Multiple pages pe |
| `Testimonials/` | Multiple pages pe |
| `Faqs/` | Multiple pages pe |

**Rule:**
> Agar koi UI piece ek se zyada jagah use ho raha hai — woh `components/` mein jata hai.
> Agar sirf ek hi page pe use hota hai — woh `views/` mein page ke saath rehta hai.

**Naming Convention:**
Folder ka naam aur file ka naam same rakho:
```
components/
  Navbar/
    Navbar.jsx    ← Same naam
    Navbar.css    ← Same naam
```

---

### `src/views/` — Full Page Content

**Yeh tumhara custom pattern hai (Next.js ka default nahi).**

Tumne ek smart kaam kiya — `app/` folder ke `page.js` files ko chhota rakha aur actual UI `views/` mein likha.

**Flow:**
```
URL: website.com/contact
  ↓
src/app/contact/page.js   (sirf metadata + import)
  ↓
src/views/Contact.jsx     (poora Contact page ka UI yahan hai)
```

**Kyun yeh acha hai?**
- `app/` folder clean rehta hai
- `views/` mein actual UI logic rehti hai
- Agar baad mein routing badlani ho — sirf `app/` folder mein change hoga, UI same rehega

---

### `src/data/` — Static Data

```js
// src/data/cars.js
const cars = [
  { id: 1, brand: "Toyota", model: "Corolla", price: 8500 },
  { id: 2, brand: "Honda", model: "Civic", price: 9200 },
  ...
];
```

**Kab use karo?**
Jab data change nahi hota — jaise car logos, service types, FAQ answers.

**Kab mat use karo?**
Real-time data ke liye — cars ki live inventory, prices. Woh backend API se aani chahiye.

---

### `src/styles/` — Global CSS

`globals.css` — Next.js ka default global CSS
`global.css` — Tumhara extra global CSS

**Best Practice:** Dono ko merge karo ek hi file mein — confusion kam hoga.

---

### `public/` — Static Files

Jo files seedha URL se accessible honi chahiye — woh yahan jaati hain.

```
public/assets/images/noorix_logo.jpg
URL: website.com/assets/images/noorix_logo.jpg
```

**Yahan kya jata hai:**
- Images (logo, banners, car photos)
- Favicon
- PDF files (brochures)
- Fonts (agar local fonts use kar rahe ho)

**Yahan kya nahi jata:**
- JavaScript files (woh `src/` mein jaati hain)
- CSS files (woh `src/` mein jaati hain)
- Data files (woh `src/data/` mein jaati hain)

---

### `.env.local` — Environment Variables

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

**Kya hai yeh?**
Secret values jo code mein directly nahi likhte — jaise API URLs, passwords, API keys.

**NEXT_PUBLIC_ prefix ka matlab:**
- `NEXT_PUBLIC_API_URL` → Browser (frontend) mein bhi accessible
- `SECRET_KEY` (bina prefix ke) → Sirf server side pe accessible, browser mein nahi

**Example:**
```js
// Yeh karo (correct)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Yeh mat karo (galat — hardcode)
const apiUrl = "http://127.0.0.1:8000";
```

---

### `next.config.mjs` — Next.js Settings

```js
const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
};
```

Yahan Next.js ki settings hoti hain — image domains, redirects, headers, etc.

---

### `jsconfig.json` — Path Alias

Yeh file `@/` shortcut enable karti hai:

```js
// Bina alias ke (mushkil)
import Navbar from "../../../../components/Navbar/Navbar";

// Alias ke saath (asaan)
import Navbar from "@/components/Navbar/Navbar";
```

`@/` matlab `src/` folder.

---

## 5. Routing System

Next.js mein routing **file system based** hai — koi React Router install nahi karna.

### Basic Routes

```
src/app/page.js              →  website.com/
src/app/about/page.js        →  website.com/about
src/app/contact/page.js      →  website.com/contact
src/app/stock/page.js        →  website.com/stock
```

### Dynamic Routes

Square brackets `[param]` use karo:

```
src/app/cars/[id]/page.js    →  website.com/cars/KUCH-BHI
src/app/used-cars/[brand]/page.js  →  website.com/used-cars/KUCH-BHI
```

Page ke andar `params` se value milti hai:
```js
// src/app/cars/[id]/page.js
export default function CarPage({ params }) {
  const carId = params.id;  // URL se aata hai
  return <div>Car: {carId}</div>;
}
```

### Special Files in App Router

| File | Kya Karta Hai |
|---|---|
| `page.js` | Woh page jo URL pe dikhta hai |
| `layout.js` | Wrapper jo children pages ko wrap karta hai |
| `loading.js` | Loading spinner (page load hone tak) |
| `error.js` | Error boundary (kuch galat ho jaye to) |
| `not-found.js` | 404 page |
| `route.js` | API endpoint banana |

---

## 6. Data Flow — Frontend Se Backend Tak

```
USER
  |
  | Browser mein URL type karta hai: website.com/stock
  ↓
NEXT.JS ROUTER
  |
  | src/app/stock/page.js dhundta hai
  ↓
PAGE.JS
  |
  | metadata export karta hai (SEO ke liye)
  | views/OurStock.jsx import karta hai
  ↓
VIEWS/OURSTOCK.JSX
  |
  | UI render hota hai
  | Agar cars chahiye → API call jaati hai
  ↓
API CALL (fetch/axios)
  |
  | process.env.NEXT_PUBLIC_API_URL + "/api/cars"
  | → http://127.0.0.1:8000/api/cars
  ↓
BACKEND (Django/Node/etc.)
  |
  | Database se cars ki list laata hai
  | JSON mein bhejta hai
  ↓
BACK TO OURSTOCK.JSX
  |
  | Data milta hai → useState mein store hota hai
  | Cars ka UI render hota hai
  ↓
USER KO CARS DIKHTI HAIN
```

---

## 7. API Calls Kahan Likhein

### Option 1 — Seedha Component/View Mein (Simple Projects)

```js
// views/OurStock.jsx
"use client";
import { useState, useEffect } from "react";

export default function OurStock() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`)
      .then(res => res.json())
      .then(data => setCars(data));
  }, []);

  return <div>{/* cars display */}</div>;
}
```

### Option 2 — Services Folder Mein (Better Practice)

```
src/
  services/
    carsService.js     ← Cars se related API calls
    authService.js     ← Login/logout API calls
    contactService.js  ← Contact form API calls
```

```js
// src/services/carsService.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCars() {
  const res = await fetch(`${BASE_URL}/api/cars`);
  return res.json();
}

export async function getCarById(id) {
  const res = await fetch(`${BASE_URL}/api/cars/${id}`);
  return res.json();
}
```

```js
// views/OurStock.jsx
import { getAllCars } from "@/services/carsService";

// Ab yahan seedha call karo
const cars = await getAllCars();
```

**Kyun alag file mein?**
Agar API URL badal jaye, ek jagah change karo — sab jagah update ho jata hai.

### Option 3 — Next.js API Routes (Backend Logic Frontend Project Mein)

```
src/app/api/
  cars/
    route.js      →   website.com/api/cars
  contact/
    route.js      →   website.com/api/contact
```

```js
// src/app/api/contact/route.js
export async function POST(request) {
  const data = await request.json();
  // Email bhejo ya database mein save karo
  return Response.json({ success: true });
}
```

Yeh tab use karo jab tumhare paas alag backend nahi hai.

---

## 8. Environment Variables

```
.env.local           ← Local development (git mein nahi jata)
.env.production      ← Production server ke liye
.env                 ← Default (sab environments)
```

**Tumhara current `.env.local`:**
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Production pe yeh hoga:
```
NEXT_PUBLIC_API_URL=https://api.noorixmotors.co.uk
```

**Rules:**
1. `.env.local` ko `.gitignore` mein dalo — secrets GitHub pe nahi jaane chahiye
2. `NEXT_PUBLIC_` prefix browser mein visible hota hai — API keys wahan mat dalo
3. Sensitive keys (database password, email password) bina prefix ke rakho

---

## 9. Common Beginner Mistakes

### Mistake 1 — `"use client"` Har Jagah Likh Dena

```js
// GALAT — har component mein blindly likh dena
"use client";
export default function StaticCard() {
  return <div>Toyota Corolla - £8500</div>;  // Koi interactivity nahi!
}
```

```js
// SAHI — sirf jab zaroori ho
"use client";
export default function ContactForm() {
  // useState, useEffect, onClick — yeh sab "use client" chahte hain
  const [name, setName] = useState("");
  ...
}
```

**Rule:** `useState`, `useEffect`, `onClick`, `onChange` use kar rahe ho — tab `"use client"` lagao. Warna mat lagao.

---

### Mistake 2 — `page.js` Ke Baghair Folder Banana

```
src/app/about/         ← Folder hai
                       ← page.js NAHI hai
```

Result: `website.com/about` → 404 error!

**Fix:** Har route folder mein `page.js` hona chahiye.

---

### Mistake 3 — Images `public/` Mein Nahi Daalna

```js
// GALAT
<img src="./images/logo.jpg" />  // Yeh kaam nahi karega

// SAHI
<img src="/assets/images/noorix_logo.jpg" />  // public/ se relative path
```

Ya Next.js ka `Image` component use karo:
```js
import Image from "next/image";
<Image src="/assets/images/noorix_logo.jpg" width={200} height={100} alt="Logo" />
```

---

### Mistake 4 — Hardcoded API URLs

```js
// GALAT
fetch("http://127.0.0.1:8000/api/cars")  // Production pe fail hoga

// SAHI
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cars`)
```

---

### Mistake 5 — Sab Kuch Ek File Mein Likhna

```js
// GALAT — ek hi page.js mein 500 lines
export default function Page() {
  // Poora UI yahan
  // API calls yahan
  // State management yahan
  // Helper functions yahan
  ...
}
```

```js
// SAHI — split karo
// page.js → metadata + import
// views/Contact.jsx → UI
// services/contactService.js → API calls
// hooks/useContactForm.js → form logic
```

---

### Mistake 6 — `layout.js` Ki Taaqat Nahi Samajhna

```js
// GALAT — har page.js mein Navbar import karna
// about/page.js
import Navbar from "@/components/Navbar/Navbar";
// contact/page.js
import Navbar from "@/components/Navbar/Navbar";
// stock/page.js
import Navbar from "@/components/Navbar/Navbar";
```

```js
// SAHI — ek baar layout.js mein
// app/layout.js
import Navbar from "@/components/Navbar/Navbar";
export default function RootLayout({ children }) {
  return (
    <html><body>
      <Navbar />
      {children}
    </body></html>
  );
}
```

---

### Mistake 7 — CSS Files Ka Naam Mismatch

```
components/
  Navbar/
    Navbar.jsx
    navbar.css   ← Lowercase 'n' — import fail ho sakta hai Windows pe
```

**Fix:** Hamesha exact same naam rakho:
```
Navbar.jsx
Navbar.css
```

---

## 10. Recommended Production Folder Structure

Yeh structure ek professional, scalable Next.js project ke liye hai:

```
noorrix-motors/
│
├── public/
│   └── assets/
│       ├── images/          ← logos, banners, car photos
│       ├── icons/           ← favicon, social icons
│       └── docs/            ← PDF brochures
│
├── src/
│   │
│   ├── app/                 ← ROUTING (sirf routing yahan)
│   │   ├── layout.js        ← Root layout (Navbar, Footer wrap)
│   │   ├── page.js          ← Homepage
│   │   ├── globals.css      ← Global CSS (ek hi file)
│   │   ├── not-found.js     ← 404 page
│   │   ├── robots.js        ← SEO
│   │   ├── sitemap.js       ← SEO sitemap
│   │   │
│   │   ├── (marketing)/     ← Route group (URL mein nahi aata)
│   │   │   ├── about/page.js
│   │   │   ├── contact/page.js
│   │   │   └── layout.js    ← Sirf marketing pages ka layout
│   │   │
│   │   ├── (cars)/          ← Route group
│   │   │   ├── stock/page.js
│   │   │   ├── used-cars/[brand]/page.js
│   │   │   └── cars/[id]/page.js
│   │   │
│   │   ├── (services)/      ← Route group
│   │   │   ├── finance/page.js
│   │   │   ├── servicing/page.js
│   │   │   ├── warranty/page.js
│   │   │   └── ...
│   │   │
│   │   ├── (auth)/          ← Route group
│   │   │   ├── login/page.js
│   │   │   └── reset-password/page.js
│   │   │
│   │   └── api/             ← API routes (optional, agar backend nahi)
│   │       ├── contact/route.js
│   │       └── cars/route.js
│   │
│   ├── components/          ← Reusable UI pieces
│   │   ├── ui/              ← Generic UI (Button, Modal, Input)
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Input.jsx
│   │   ├── layout/          ← Layout components
│   │   │   ├── Navbar/
│   │   │   └── Footer/
│   │   └── shared/          ← Shared business components
│   │       ├── CarCard/
│   │       ├── Testimonials/
│   │       └── WhatsApp/
│   │
│   ├── views/               ← Full page UI (tumhara current pattern — acha hai!)
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.css
│   │   └── ...
│   │
│   ├── services/            ← API calls (IMPORTANT — add karo)
│   │   ├── carsService.js
│   │   ├── contactService.js
│   │   └── authService.js
│   │
│   ├── hooks/               ← Custom React hooks (IMPORTANT — add karo)
│   │   ├── useCarFilter.js
│   │   ├── useContactForm.js
│   │   └── useAuth.js
│   │
│   ├── utils/               ← Helper functions (useful hai)
│   │   ├── formatPrice.js   ← £8,500 format karna
│   │   ├── formatDate.js
│   │   └── validateForm.js
│   │
│   ├── constants/           ← Fixed values (useful hai)
│   │   ├── carBrands.js     ← ["Toyota", "Honda", "BMW"]
│   │   ├── routes.js        ← URL constants
│   │   └── config.js
│   │
│   ├── data/                ← Static data (tumhara existing)
│   │   └── cars.js
│   │
│   ├── context/             ← Global state (agar zaroorat ho)
│   │   └── CartContext.jsx
│   │
│   └── styles/              ← Merge kar lo globals.css mein
│
├── .env.local               ← Local secrets (git mein nahi)
├── .env.example             ← Template (git mein jata hai)
├── .gitignore
├── next.config.mjs
├── tailwind.config.js
├── jsconfig.json
└── package.json
```

---

### Folders Ki Priority

**ZAROORI (Must Have):**
- `src/app/` — routing ke liye
- `src/components/` — reusable UI ke liye
- `src/views/` — page UI ke liye (tumhara pattern)
- `public/` — static files ke liye
- `.env.local` — environment variables ke liye

**BAHUT USEFUL (Add Karo):**
- `src/services/` — API calls organize karne ke liye
- `src/hooks/` — reusable logic ke liye
- `src/utils/` — helper functions ke liye

**OPTIONAL (Bade Projects Ke Liye):**
- `src/constants/` — hardcoded values organize karne ke liye
- `src/context/` — global state ke liye
- `src/app/api/` — agar alag backend nahi hai

---

### Ek `.env.example` File Zaror Banao

`.env.local` git mein nahi jata. Isliye ek example file banao jo team members ko bataye kya variables chahiye:

```
# .env.example (yeh git mein jata hai — actual values mat likho)
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
EMAIL_SERVICE_API_KEY=
DATABASE_URL=
```

---

## Quick Reference Card

```
URL chahiye?          →  src/app/[folder]/page.js banao
Reusable component?   →  src/components/ mein dalo
Page ka poora UI?     →  src/views/ mein dalo
API call?             →  src/services/ mein likhو
State logic?          →  src/hooks/ mein likhو
Helper function?      →  src/utils/ mein likhو
Static image?         →  public/assets/images/ mein dalo
Secret URL/Key?       →  .env.local mein likhو
Global wrap (Navbar)? →  src/app/layout.js mein dalo
```

---

*Guide written for Noorrix Motors Next.js project — May 2026*
