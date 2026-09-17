# Mesob Roadmap — Product Management & Product Revenue Management System

> **End-to-End Product Lifecycle Platform**: Business Strategy → Product 360° → Development Kanban → Marketing GTM → Sales CRM → Revenue Attribution → Customer Feedback → Improvement Tasks

Mesob Roadmap is an enterprise-grade Product Management and Revenue Lifecycle platform built with React 18, TypeScript, Tailwind CSS, and Lucide Icons.

---

## 🌟 Key Features

### 1. Complete Product Lifecycle Flow
- **Executive Dashboard**: Unified cross-functional cockpit tracking OKRs, active sprints, sales velocity, ARR/MRR, and executive action items.
- **Company Strategy & OKRs**: Strategic business goals, financial targets, and key results.
- **Market & Competitor Analysis**: Market segmentation, TAM/SAM/SOM, and competitive positioning.
- **Product Portfolio & 360° View**: Unified product catalog with full lifecycle status tracking.
- **Roadmap & Epics**: Multi-quarter Gantt and milestone tracking.
- **Development Kanban**: 8-stage Kanban board (`Backlog` → `TODO` → `In Progress` → `Code Review` → `Testing` → `UAT` → `Ready for Release` → `Released`) connected to sprint milestones.
- **Release Management & Changelogs**: Versioned releases with QA verification, rollback plans, and customer-facing changelogs.
- **Marketing & GTM Campaigns**: Channel attribution, CAC, and lead generation tracking.
- **Sales Pipeline CRM**: 6-stage deal pipeline with win probabilities, weighted forecasting, and quota tracking.
- **Revenue & SaaS Metrics**: MRR, ARR, churn rate, ARPU, and LTV.
- **Feature-to-Revenue Attribution**: Direct ROI attribution connecting engineered features to realized ETB/USD revenue.
- **Customer Feedback Loop**: Feedback intake, request voting, and sentiment analysis.
- **Product Usage & Analytics**: DAU/MAU, feature stickiness, cohort retention, and churn indicators.
- **360° Traceability Graph**: Interactive dependency graph connecting Strategy → Task → Revenue → Feedback.
- **Executive Reports**: Consolidate and export tabular reports to CSV, JSON, and printable formats.

### 2. Role-Based Access Control (RBAC)
- **Role Permissions Matrix Editor**: Configure granular action permissions (`View`, `Create`, `Edit`, `Delete`, `Approve`, `Export`) across all 18 modules.
- **Record-Level Data Scopes**:
  - `ALL` — Organization-wide data access.
  - `TEAM` — Department / Team specific records.
  - `OWN` — Records created by or assigned to the active user.
- **Pre-Configured Roles & Personas**:
  - 🛡️ Super Administrator (*Dawit Haile*)
  - 📦 Product Manager (*Selam Tesfaye*)
  - 💻 Engineering Lead / Developer (*Brook Alemayehu*)
  - 💼 Sales Representative (*Yonas Mulugeta*) — Enforcing `OWN` record scope with delete/approve restrictions.
  - 📣 Marketing Lead (*Rahel Girma*)
  - 📊 Finance & Revenue Analyst (*Natnael Getachew*)
  - 👁️ Executive Stakeholder / Viewer (*Meron Kebede*)
- **Interactive Persona Switcher**: Test different role perspectives with one click from the top header.
- **Dynamic UI Gating & Route Protection**: Automatic sidebar hiding, `<PermissionGate>` action protection, and `<UnauthorizedState>` guards.

### 3. Aesthetics & Global Controls
- **Dual Theme Support**: Seamless toggle between **Dark Mode** and **White (Light) Mode**.
- **Multi-Currency Support**: Real-time conversion between **ETB** (Ethiopian Birr) and **USD ($)**.
- **Full CRUD & Zero Mock Lock-in**: Every entity, card, and record is editable with instant `localStorage` persistence.
- **Global Search**: Keyboard shortcut (`Ctrl+K` / `Cmd+K`) to search across the entire lifecycle ecosystem.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mulusewwube/mesob_road_map.git

# Navigate to the project directory
cd mesob_road_map

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production

```bash
npm run build
```

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Icons**: Lucide React
- **Architecture**: Modular View Components + Unified `AppContext` + RBAC Engine

---

## 📄 License

MIT License. Copyright (c) 2026 Mesob Technologies.
