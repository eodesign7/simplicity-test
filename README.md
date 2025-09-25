# Announcements Dashboard

Jednoduchý dashboard pre správu oznamov vytvorený ako testovacie zadanie.

## 🚀 Spustenie projektu

```bash
# Inštalácia závislostí
pnpm install

# Spustenie development servera
pnpm dev
```

Aplikácia bude dostupná na `http://localhost:5173`

## 🛠 Tech Stack

- **React** + **Vite**
- **TypeScript**
- **TailwindCSS** (štýlovanie)
- **React Router** (routing)
- **react-hook-form** (formuláre)
- **Zod** (validácia)
- **react-hot-toast** (notifikácie)
- **pnpm** (package manager)

## 💾 Perzistencia dát

### Local Storage + Mock Data systém

Aplikácia používa hybridný prístup pre ukladanie dát:

#### 1. **Úvodný load**

- Pri prvom spustení sa načítajú dáta z `lib/mock-data.ts`
- Tieto dáta sa automaticky uložia do **Local Storage**
- Následne sa všetky operácie vykonávajú cez Local Storage

#### 2. **Logika fungovania**

```typescript
// lib/storage.ts
export function loadAnnouncements(): Announcement[] {
  const stored = localStorage.getItem("announcements-data");
  if (stored) {
    return JSON.parse(stored); // Načíta z Local Storage
  }

  // Fallback na mock dáta ak je Local Storage prázdny
  localStorage.setItem("announcements-data", JSON.stringify(mockData));
  return mockData;
}
```

#### 3. **Ukladanie nových záznamov**

- Nové oznamy sa pridávajú do Local Storage
- Dáta sa **perzistentne** uchovávajú medzi sessions
- Po refreshi stránky sa dáta **nestratia**

#### 4. **Výhody tohto prístupu**

- ✅ **Rýchle pre development** - okamžite dostupné dáta
- ✅ **Perzistentné** - dáta sa nestratia po refreshi
- ✅ **Žiadny backend** - všetko beží v prehliadači
- ✅ **Jednoduché testovanie** - možnosť resetovať Local Storage

### Reset dát

Pre reset na pôvodné mock dáta:

```javascript
// V Developer Tools Console
localStorage.removeItem("announcements-data");
location.reload();
```

## 📁 Štruktúra projektu

```
├── app/
│   ├── components/          # React komponenty
│   │   ├── Layout.tsx       # Hlavný layout
│   │   ├── Header.tsx       # Header komponent
│   │   ├── Sidebar.tsx      # Sidebar navigácia
│   │   └── AnnouncementsTable.tsx # Tabuľka oznamov
│   ├── routes/              # React Router stránky
│   │   ├── home.tsx         # Domovská stránka
│   │   ├── announcements.tsx # Zoznam oznamov
│   │   └── announcements.$id.tsx # Detail/Edit oznamu
│   ├── app.css              # Globálne štýly
│   └── root.tsx             # Root komponent
├── lib/
│   ├── storage.ts           # Local Storage funkcie
│   └── mock-data.ts         # Počiatočné mock dáta
├── types.d.ts               # TypeScript typy
└── docs/
    ├── PRD.md               # Product Requirements
    └── TODOS.md             # Úlohy a progress
```

## 🎯 Funkcionalita

### CRUD operácie (podľa zadania)

- **CREATE** - vytvorenie nového oznamu cez "Publish" button
- **READ** - zobrazenie zoznamu oznamov v tabuľke
- **UPDATE** - **NIE** (podľa zadania len CREATE)
- **DELETE** - **NIE** (podľa zadania len CREATE)

### Formulár validácia

- **Všetky polia povinné** - title, content, categories, publication date
- **Toast notifikácie** - úspech/chyba v pravom dolnom rohu
- **MM/DD/YYYY HH:mm** formát pre dátum

### Custom komponenty

- **Multiselect dropdown** - kategórie s custom logikou
- **Responsive design** - funguje na všetkých zariadeniach
- **Lato font** - celá aplikácia používa Lato font

## 🎨 Design

- **Custom farby** - light-gray (#fafafa), light-yellow (#fff7d1), primary (#ffb64a)
- **TailwindCSS** - utility-first CSS framework
- **1:1 design** - presne podľa poskytnutých mockupov

## 📋 Stav projektu

Všetky úlohy z `docs/TODOS.md` sú dokončené:

- ✅ Setup a konfigurácia
- ✅ Layout a komponenty
- ✅ Tabuľka oznamov
- ✅ Detail/Edit stránka
- ✅ Data Handling (Local Storage + Mock Data)
- ✅ Validácia a notifikácie

Zostáva len finálne úpravy:

- [ ] .gitignore
- [ ] Deploy na Render/Netlify
