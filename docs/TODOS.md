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

- [ ] Vytvoriť route `/announcements/:id`
- [ ] Pridať formulár s text inputmi a multiselectom
- [ ] Validovať vstupy (MM/DD/YYYY HH:mm)
- [ ] Implementovať "Publish" button
- [ ] Zobraziť alert box ak chýbajú hodnoty
- [ ] Mock update dát a redirect späť na tabuľku

## Finalization

- [ ] README s návodom na spustenie
- [ ] .gitignore
- [ ] Deploy na Render alebo Netlify
