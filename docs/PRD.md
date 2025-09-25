# PRD – Announcements Dashboard (One-to-One Version)

## 🎯 Goal
Vytvoriť jednoduchý dashboard pre správu oznamov, ktorý bude obsahovať:
- Tabuľku oznamov (zoradenú podľa Last Update)
- Detail/edit view pre konkrétny oznam
- Formulár na úpravu oznamu
- Validáciu vstupov
- Alert box pre chýbajúce hodnoty
- Možnosť pridať nový oznam (mock uloženie)

## 🛠 Tech Stack
- React + Vite
- TypeScript
- pnpm ako package manager
- React Router (routing medzi hlavnou stránkou a detailom)
- TailwindCSS (základné štýlovanie)
- react-table (zobrazenie tabulky)
- react-select (multiselect kategórií)
- react-hook-form (správa formulárov)
- (Voliteľne) zod na validáciu

## 📋 Requirements

### Tabuľka oznamov
- Stĺpce: `Title`, `Publication date`, `Last update`, `Categories`, `Link`
- Zoradenie podľa `Last update` (najnovšie hore)
- Dáta môžu byť staticky namockované

### Detail/Edit View
- Route: `/announcements/:id`
- Obsahuje formulár s možnosťou editácie hodnôt
- Po kliknutí na "Publish" sa spustí validácia:
  - Kontrola či sú všetky povinné polia vyplnené
  - V prípade chyby sa zobrazí alert box s chybovou hláškou
  - Ak je validácia úspešná, oznam sa uloží (mock update) a presmeruje späť na hlavnú tabuľku

### Validácia
- Dátum v tvare `[MM/DD/YYYY HH:mm]`
- Povinné polia: title, publication date, categories

### UX
- Jednoduchý layout s headerom a linkom v sidebar-e
- Na kliknutie na sidebar link sa zobrazí tabuľka oznamov
- Nemusí byť pixel perfect, farby podľa Figma návrhu

## ✅ Acceptance Criteria
- Spustiteľné cez `pnpm dev`
- Dodržané základné požiadavky (tabuľka, detail, validácia)
- Komponenty a kód prehľadné a čitateľné
- README obsahuje návod na spustenie
