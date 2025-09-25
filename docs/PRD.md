# PRD – Announcements Dashboard (Enhanced Version)

## 🎯 Goal

Rozšíriť existujúci dashboard o moderné komponenty a plnohodnotné CRUD operácie.

## 🛠 Enhanced Tech Stack

- **Shadcn/ui** – moderné, accessible komponenty
- **Convex** – real-time backend s TypeScript
- **TanStack Query** – server state management
- **Lucide React** – konzistentné ikony

## 📋 Enhanced Features

### **🎨 UI/UX Improvements**

- **Shadcn komponenty** – Button, Input, Table, Dialog, etc.
- **Moderný header** s search funkcionalitou
- **Rozšírený sidebar** s nefunkčnými linkmi (pre budúcnosť)
- **Responsive design** s mobile support

### **🔧 Backend Integration**

- **Convex** real-time database
- **Plnohodnotné CRUD** – Create, Read, Update, Delete
- **Real-time sync** medzi klientmi
- **Type-safe** API calls

### **🔍 Enhanced Table**

- **Search** v header-i (debounced)
- **Filter** podľa kategórií
- **Sorting** podľa všetkých stĺpcov
- **Pagination** pre veľké datasets

### **📝 Form Improvements**

- **Shadcn form** komponenty
- **Better validation** s error states
- **Edit mode** pre existujúce záznamy
- **Delete confirmation** dialógy

## 🏗 Architecture

### **Frontend Architecture**

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── services/           # API services
├── stores/             # State management
├── utils/              # Utility functions
└── types/              # TypeScript definitions
```

### **Backend Architecture**

```
convex/
├── schema.ts           # Database schema
├── announcements.ts    # Announcements CRUD
├── categories.ts       # Categories management
└── auth.ts            # Authentication (future)
```

## 🔒 Security & Performance

### **Security Measures**

- **Type-safe** database queries (Convex)
- **Input validation** (Zod schemas)
- **CORS configuration** (built-in Convex)

### **Performance Optimization**

- **Real-time updates** (Convex subscriptions)
- **Optimistic updates** (TanStack Query)
- **Code splitting** (Dynamic imports)
- **Image optimization** (WebP, lazy loading)

## 🧪 Quality Assurance

### **Testing Strategy**

- **Unit tests** (Jest + React Testing Library)
- **Integration tests** (API endpoints)
- **E2E tests** (Playwright/Cypress)

### **Code Quality**

- **ESLint** + **Prettier** (Code formatting)
- **TypeScript strict mode** (Type safety)
- **Husky** (Git hooks)
- **Conventional commits** (Standardized messages)

## 📈 Roadmap

### **Phase 1: Shadcn Integration (Week 1)**

- Shadcn/ui setup & configuration
- Dashboard components installation
- Component migration from custom to Shadcn
- Icon system integration
- Theme customization

### **Phase 2: Backend Integration (Week 2)**

- Convex project setup
- Database schema design
- CRUD operations implementation
- Real-time sync setup

### **Phase 3: Enhanced Features (Week 3)**

- Header search functionality
- Table filtering & sorting
- Pagination implementation
- Form improvements

### **Phase 4: CRUD Operations (Week 4)**

- Edit mode implementation
- Delete functionality
- Bulk operations
- Enhanced form UX

### **Phase 5: Sidebar & Navigation (Week 5)**

- Extended sidebar with links
- Navigation structure
- Active states
- Mobile responsiveness

### **Phase 6: Polish & Deploy (Week 6)**

- Error handling improvements
- Loading states
- Performance optimization
- Production deployment

## ✅ Acceptance Criteria

### **Functional Requirements**

- [ ] User can view announcements in modern table
- [ ] User can search announcements in header
- [ ] User can filter announcements by category
- [ ] User can sort announcements by any column
- [ ] User can create new announcements
- [ ] User can edit existing announcements
- [ ] User can delete announcements with confirmation
- [ ] System supports real-time updates
- [ ] System works on mobile devices
- [ ] System uses Shadcn/ui components

### **Non-Functional Requirements**

- [ ] Page load time < 2 seconds
- [ ] Real-time updates < 100ms latency
- [ ] Mobile responsive design
- [ ] WCAG 2.1 AA accessibility compliance
- [ ] Type-safe database operations
- [ ] 90%+ test coverage
- [ ] Cross-browser compatibility

### **Technical Requirements**

- [ ] TypeScript strict mode enabled
- [ ] ESLint with zero errors
- [ ] All tests passing
- [ ] Convex backend functional
- [ ] Shadcn/ui components integrated
- [ ] Real-time sync working
- [ ] Error monitoring setup
- [ ] Performance monitoring active

---

**🎯 This PRD represents a practical enhancement of the existing application with modern components and real-time capabilities.**
