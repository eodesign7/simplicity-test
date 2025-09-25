# Simplicity Test Assignment

Jednoduchý dashboard na správu oznamov (CRUD), vytvorený ako testovacie zadanie pre spoločnosť onesimplicity.com.  
Repo obsahuje dve verzie riešenia:  
- **`main`** – rozšírená verzia so zlepšeným UI/UX a extra funkciami  
- **`one-to-one`** – verzia 1:1 podľa zadania (minimum featur a bez extra vylepšení)

---

## 🚀 Live Demo

- **Full version (main)** → [https://your-project.vercel.app](https://your-project.vercel.app)
- **One-to-one (strict zadanie)** → [https://your-project.onrender.com](https://your-project.onrender.com)

---

## 🛠 Tech Stack

- **React + Vite** – moderný FE build tool
- **TypeScript** – typová bezpečnosť
- **React Router** – routing pre `/announcements/:id`
- **Tailwind CSS** – rýchle a responzívne štýlovanie
- **React Table** – tabuľka so sortingom a pagination
- **React Select** – multiselect pre kategórie
- **React Hook Form + Zod** – validácia a správa formulárov
- **Convex** (len vo verzii `main`) – real-time databáza
- **Shadcn/UI** (len vo verzii `main`) – konzistentné komponenty

---

## 📌 Features

### One-to-one verzia:
✅ Tabuľka oznamov (react-table)  
✅ Možnosť editácie /announcements/:id  
✅ Multiselect kategórií  
✅ Validácia dátumu a času [MM/DD/YYYY HH:mm]  
✅ Alert box pri chýbajúcich hodnotách  
✅ Uloženie nového oznamu (mock data)  
✅ Zobrazenie v tabuľke po uložení  

---

### Rozšírená verzia (main):
🔹 **Pagination + Sorting** – full UX prehľadnosť  
🔹 **Search bar (debounced)** – rýchle filtrovanie oznamov  
🔹 **RT databáza (Convex)** – persistencia dát a živé updaty  
🔹 **Modal pre pridanie oznamu** – plynulejšie UX  
🔹 **Shadcn komponenty** – profesionálne UI  
🔹 **Responzívny layout** – mobile-first prístup  
🔹 (Optional) Light/Dark mode  
🔹 (Optional) Jednoduchá autentifikácia (login/logout)

---

## 🏗 Project Setup

```bash
# Klonovanie repozitára
git clone https://github.com/yourusername/announcements-dashboard.git
cd simplicity-test

# Inštalácia závislostí
pnpm install

# Spustenie v dev móde
pnpm run dev
