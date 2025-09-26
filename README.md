# Announcements Dashboard 🚀

**Evolúcia jednoduchého dashboard-u** - od základnej verzie po rozšírenú s modernými komponentmi.

## 🌐 Live Demo

- **One-to-One Version** → [https://simplicity-test.onrender.com](https://simplicity-test.onrender.com)
- **Enhanced Version** → _Coming Soon_ (main branch)
- **Source Code** → [https://github.com/eodesign7/simplicity-test](https://github.com/eodesign7/simplicity-test)

---

## 🎯 Project Phases

### ✅ **Phase 1: One-to-One (COMPLETED)**

Striktne podľa testovacieho zadania:

- Tabuľka oznamov s Convex backend
- Form validácia s Zod
- Convex backend perzistencia
- Custom UI komponenty
- Toast notifikácie

### 🚀 **Phase 2: Enhanced (IN PROGRESS)**

Rozšírená verzia s modernými komponentmi:

- **Shadcn/ui** komponenty
- **Convex** backend (real-time)
- **Plnohodnotné CRUD** operácie
- **Header s search** funkcionalitou
- **Filter & Sorting** v tabuľke
- **Rozšírený Sidebar** s linkmi

---

## 🛠 Tech Stack

### **Current (One-to-One)**

- **React + Vite** + **TypeScript**
- **TailwindCSS** + **React Router**
- **react-hook-form** + **Zod** + **react-hot-toast**
- **Convex** (real-time backend)

### **Enhanced (Phase 2)**

- **Shadcn/ui** (moderné komponenty)
- **Convex** (real-time backend)
- **TanStack Query** (server state)
- **Lucide React** (ikony)
- **React Hook Form** + **Zod** (formuláre)

---

## 🏗 Project Setup

```bash
# Inštalácia závislostí
pnpm install

# Spustenie development servera
pnpm dev
```

Aplikácia bude dostupná na `http://localhost:5173`

## 💾 Data Persistence

### **Current: Convex Backend**

Aplikácia používa moderný real-time backend:

#### 1. **Real-time sync**

- Všetky dáta sa ukladajú v **Convex** databáze
- **Automatic sync** medzi klientmi
- **Type-safe** API calls

#### 2. **Enhanced: Convex Backend**

- **Real-time database** s TypeScript
- **Automatic sync** medzi klientmi
- **Type-safe** API calls
- **Optimistic updates**

### **Reset dát**

Pre reset dát v Convex databáze:

```javascript
// V Convex Dashboard alebo cez API
// Dáta sa resetujú automaticky v development móde
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
├── convex/                  # Convex backend
│   ├── schema.ts           # Database schema
│   └── functions/          # API functions
├── types.d.ts               # TypeScript typy
└── docs/
    ├── PRD.md               # Product Requirements
    └── TODOS.md             # Úlohy a progress
```

## 🎯 Funkcionalita

### **Current: Basic CRUD (One-to-One)**

- **CREATE** - vytvorenie nového oznamu cez "Publish" button
- **READ** - zobrazenie zoznamu oznamov v tabuľke
- **UPDATE** - **NIE** (podľa zadania len CREATE)
- **DELETE** - **NIE** (podľa zadania len CREATE)

### **Enhanced: Full CRUD Operations**

- **CREATE** - vytvorenie nového oznamu
- **READ** - zobrazenie s filtrami a sortovaním
- **UPDATE** - úprava existujúcich záznamov
- **DELETE** - mazanie s confirmation dialógom
- **BULK** - hromadné operácie

### **Form validácia**

- **Všetky polia povinné** - title, content, categories, publication date
- **Toast notifikácie** - úspech/chyba v pravom dolnom rohu
- **MM/DD/YYYY HH:mm** formát pre dátum

### **Enhanced Features**

- **Search** v header-i (debounced)
- **Filter** podľa kategórií
- **Sorting** podľa všetkých stĺpcov
- **Pagination** pre veľké datasets
- **Real-time updates** medzi klientmi

## 🎨 Design

- **Custom farby** - light-gray (#fafafa), light-yellow (#fff7d1), primary (#ffb64a)
- **TailwindCSS** - utility-first CSS framework
- **Shadcn/ui** - moderné, accessible komponenty
- **Responsive design** - mobile-first prístup

## 🚀 Development

### **Current Phase: Shadcn Integration**

```bash
# Inštalácia Shadcn/ui
npx shadcn-ui@latest init

# Pridanie komponentov
npx shadcn-ui@latest add button table input dialog
```

### **Next Phase: Convex Backend**

```bash
# Inštalácia Convex
npm install convex

# Setup projektu
npx convex dev
```

---

**🎯 Tento projekt demonštruje evolúciu od jednoduchého testovacieho zadania po profesionálnu aplikáciu s modernými komponentmi a real-time funkcionalitou.**
