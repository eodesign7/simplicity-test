# TODOS – One-to-One Version

## Setup

- [x] Inicializovať projekt cez `pnpm create vite@latest`
- [x] Pridať TypeScript template
- [x] Pridať TailwindCSS + základnú konfiguráciu
- [x] Pridať React Router (basic setup)
- [x] Pridať react-table
- [x] Pridať react-hook-form a react-select

## Layout / Base Components

- [x] Vytvoriť jednoduchý layout s headerom + sidebarom
- [x] Pridať link na stránku s tabuľkou oznamov

## Table

- [x] Pridať komponentu pre tabuľku oznamov
- [x] Mocknúť dáta (title, publication date, last update, categories)
- [x] Implementovať zoradenie podľa last update

## Detail / Edit Page

- [x] Vytvoriť route `/announcements/:id`
- [x] Pridať formulár s text inputmi a multiselectom
- [x] Validovať vstupy (MM/DD/YYYY HH:mm)
- [x] Implementovať "Publish" button
- [x] Zobraziť alert box ak chýbajú hodnoty (toast notifikácie)
- [x] Mock update dát a redirect späť na tabuľku

## Data Handling

- [x] Pouzit mock-data pre simulaciu
- [x] CRUD Operations - zo zadania vypliva iba "Create" po "Publish", nie editacia
- [x] Vytvorenie zaznamu dat v mock-data.ts subore
- [x] "Po kliku na publish button prebehne validácia či sú hodnoty zadané, všetky sú povinné. - Ak chýba niektorá z hodnôt zobrazí sa alert box s chybovou hláškou.- Ak validácia prebehla úspešne, vytvorí sa nový oznam a uloží sa ako nový záznam, následne sa zobrazí hlavná stránka s tabuľkou oznamov.- V prípade upravovania existujúuceho oznamu sú hodnoty predvyplnené z daného oznamu. - Priamo zo zadania"

## Code Optimization & Refactoring

- [X] Centralizácia typov a schem
- [X] Dekompozícia komponentov (separation of concerns)
- [X] Zmenšenie codelength - žiadne spaghetti kód
- [X] Zjednodušenie kódu
- [X] Optimalizácia importov a exportov
- [X] Refaktoring veľkých komponentov na menšie
- [X] Vytvorenie custom hooks pre logiku
- [X] Separácia business logiky od UI komponentov

## Testing & Quality

- [X] Testovať lint (ESLint)
- [X] Testovať TypeScript types
- [X] Testovať build proces
- [X] Kontrola bundle size
- [X] Performance optimalizácia

## Finalization

- [x] README s návodom na spustenie
- [X] .gitignore
- [X] Deploy na Render alebo Netlify
