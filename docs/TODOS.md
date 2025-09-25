# TODOS – One-to-One Version

## Setup

- [X] Inicializovať projekt cez `pnpm create vite@latest`
- [X] Pridať TypeScript template
- [X] Pridať TailwindCSS + základnú konfiguráciu
- [ ] Pridať React Router (basic setup)
- [X] Pridať react-table
- [X] Pridať react-hook-form a react-select

## Layout / Base Components

- [ ] Vytvoriť jednoduchý layout s headerom + sidebarom
- [ ] Pridať link na stránku s tabuľkou oznamov

## Table

- [ ] Pridať komponentu pre tabuľku oznamov
- [ ] Mocknúť dáta (title, publication date, last update, categories)
- [ ] Implementovať zoradenie podľa last update

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
