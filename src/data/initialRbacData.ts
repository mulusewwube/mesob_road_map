import { UserRole, UserAccount, ModuleKey, PermissionAction } from '../types';

export const ALL_MODULES: { key: ModuleKey; label: string; category: string; description: string }[] = [
  { key: 'dashboard', label: 'Executive Dashboard', category: 'Executive', description: 'High-level business KPIs, health indicators, alerts, and quick actions.' },
  { key: 'strategy', label: 'Company Strategy & OKRs', category: 'Executive', description: 'Strategic pillars, company targets, and OKR scorecards.' },
  { key: 'market', label: 'Market & Competitors', category: 'Executive', description: 'Market segments, growth projections, competitor pricing & positioning.' },
  { key: 'products', label: 'Product Portfolio', category: 'Product', description: '360° product catalog, lifecycle states, business units, and owners.' },
  { key: 'product-360', label: 'Product 360° View', category: 'Product', description: 'Unified product cockpit tracking roadmap, dev, marketing, sales & revenue.' },
  { key: 'roadmap', label: 'Product Roadmap & Epics', category: 'Product', description: 'Strategic initiatives, quarterly epics, and Gantt timeline.' },
  { key: 'development', label: 'Development Kanban', category: 'Engineering', description: 'Sprints, user stories, task kanban board, and QA burndown.' },
  { key: 'releases', label: 'Releases & Changelogs', category: 'Engineering', description: 'Product version releases, changelog notes, rollback plans, and gates.' },
  { key: 'marketing', label: 'Marketing & Campaigns', category: 'GTM', description: 'GTM positioning, launch campaigns, channels, CAC, and leads.' },
  { key: 'sales', label: 'Sales CRM & Pipeline', category: 'GTM', description: 'Deals, sales pipeline stages, deal probabilities, and customer accounts.' },
  { key: 'revenue', label: 'Revenue & SaaS Metrics', category: 'Revenue', description: 'MRR, ARR, churn rate, LTV, revenue growth breakdown by product.' },
  { key: 'feature-revenue', label: 'Feature-Revenue Matrix', category: 'Revenue', description: 'Direct ROI attribution connecting engineered features to realized ETB/USD.' },
  { key: 'feedback', label: 'Customer Feedback Loop', category: 'Customer', description: 'Feedback intake, feature request voting, and sentiment analysis.' },
  { key: 'analytics', label: 'Product Usage & Adoption', category: 'Customer', description: 'DAU/MAU, feature stickiness, cohort retention, and churn alerts.' },
  { key: 'crosslink', label: '360° Traceability Graph', category: 'System', description: 'End-to-end graph connecting Strategy → Task → Revenue → Feedback.' },
  { key: 'reports', label: 'Executive Reports', category: 'System', description: 'Consolidated PDF/Excel exportable reports across business units.' },
  { key: 'access-control', label: 'Access Control & RBAC', category: 'Administration', description: 'Role matrix editor, user account assignments, and permission simulator.' },
  { key: 'settings', label: 'System & Data Settings', category: 'Administration', description: 'Backup, JSON import/export, data reset, and currency preferences.' }
];

export const ALL_ACTIONS: { action: PermissionAction; label: string; icon: string; description: string }[] = [
  { action: 'view', label: 'View', icon: 'Eye', description: 'Browse and read module contents and records' },
  { action: 'create', label: 'Create', icon: 'Plus', description: 'Add new records, items, campaigns, or tasks' },
  { action: 'edit', label: 'Edit', icon: 'Edit3', description: 'Modify and update existing record parameters' },
  { action: 'delete', label: 'Delete', icon: 'Trash2', description: 'Permanently remove records from the system' },
  { action: 'approve', label: 'Approve', icon: 'CheckCircle2', description: 'Authorize releases, sign off deals, and approve initiatives' },
  { action: 'export', label: 'Export', icon: 'Download', description: 'Export tabular datasets to CSV, Excel, or JSON' }
];

const FULL_ACTIONS: PermissionAction[] = ['view', 'create', 'edit', 'delete', 'approve', 'export'];

export const INITIAL_ROLES: UserRole[] = [
  {
    id: 'role-super-admin',
    name: 'Super Administrator',
    code: 'SUPER_ADMIN',
    description: 'Unrestricted organizational access with full administrative privileges across all modules, workflows, and roles.',
    color: 'emerald',
    isSystemDefault: true,
    permissions: ALL_MODULES.map(m => ({
      module: m.key,
      actions: [...FULL_ACTIONS],
      scope: 'ALL'
    }))
  },
  {
    id: 'role-product-manager',
    name: 'Product Manager',
    code: 'PRODUCT_MANAGER',
    description: 'Owns product strategy, roadmaps, features, feedback loops, and feature-revenue attribution with release approval.',
    color: 'blue',
    isSystemDefault: true,
    permissions: [
      { module: 'dashboard', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'strategy', actions: ['view', 'create', 'edit', 'approve', 'export'], scope: 'ALL' },
      { module: 'market', actions: ['view', 'create', 'edit', 'delete', 'export'], scope: 'ALL' },
      { module: 'products', actions: ['view', 'create', 'edit', 'delete', 'approve', 'export'], scope: 'ALL' },
      { module: 'product-360', actions: ['view', 'create', 'edit', 'export'], scope: 'ALL' },
      { module: 'roadmap', actions: ['view', 'create', 'edit', 'delete', 'approve', 'export'], scope: 'ALL' },
      { module: 'development', actions: ['view', 'create', 'edit', 'approve', 'export'], scope: 'ALL' },
      { module: 'releases', actions: ['view', 'create', 'edit', 'approve', 'export'], scope: 'ALL' },
      { module: 'marketing', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'sales', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'revenue', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'feature-revenue', actions: ['view', 'create', 'edit', 'export'], scope: 'ALL' },
      { module: 'feedback', actions: ['view', 'create', 'edit', 'delete', 'approve', 'export'], scope: 'ALL' },
      { module: 'analytics', actions: ['view', 'edit', 'export'], scope: 'ALL' },
      { module: 'crosslink', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'reports', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'access-control', actions: ['view'], scope: 'ALL' },
      { module: 'settings', actions: ['view'], scope: 'ALL' }
    ]
  },
  {
    id: 'role-eng-lead',
    name: 'Engineering Lead / Developer',
    code: 'ENG_LEAD',
    description: 'Manages engineering tasks, sprints, releases, and architectural artifacts. View-only on commercial/financial data.',
    color: 'indigo',
    isSystemDefault: true,
    permissions: [
      { module: 'dashboard', actions: ['view'], scope: 'TEAM' },
      { module: 'products', actions: ['view'], scope: 'ALL' },
      { module: 'product-360', actions: ['view'], scope: 'ALL' },
      { module: 'roadmap', actions: ['view', 'create', 'edit', 'export'], scope: 'TEAM' },
      { module: 'development', actions: ['view', 'create', 'edit', 'delete', 'approve', 'export'], scope: 'TEAM' },
      { module: 'releases', actions: ['view', 'create', 'edit', 'approve', 'export'], scope: 'TEAM' },
      { module: 'feedback', actions: ['view', 'edit'], scope: 'ALL' },
      { module: 'crosslink', actions: ['view'], scope: 'ALL' },
      { module: 'analytics', actions: ['view'], scope: 'ALL' },
      { module: 'reports', actions: ['view', 'export'], scope: 'TEAM' }
    ]
  },
  {
    id: 'role-sales-rep',
    name: 'Sales Representative',
    code: 'SALES_REP',
    description: 'Manages customer opportunities and deals. Can create and edit OWN deals, but cannot delete or approve deals.',
    color: 'amber',
    isSystemDefault: true,
    permissions: [
      { module: 'dashboard', actions: ['view'], scope: 'OWN' },
      { module: 'products', actions: ['view'], scope: 'ALL' },
      { module: 'product-360', actions: ['view'], scope: 'ALL' },
      { module: 'roadmap', actions: ['view'], scope: 'ALL' },
      { module: 'releases', actions: ['view'], scope: 'ALL' },
      { module: 'sales', actions: ['view', 'create', 'edit', 'export'], scope: 'OWN' }, // Explicit: NO delete, NO approve
      { module: 'feedback', actions: ['view', 'create', 'edit'], scope: 'OWN' },
      { module: 'reports', actions: ['view', 'export'], scope: 'OWN' }
    ]
  },
  {
    id: 'role-marketing-lead',
    name: 'Marketing Lead',
    code: 'MARKETING_LEAD',
    description: 'Owns GTM campaigns, value propositions, competitor intelligence, and demand generation initiatives.',
    color: 'rose',
    isSystemDefault: true,
    permissions: [
      { module: 'dashboard', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'market', actions: ['view', 'create', 'edit', 'export'], scope: 'ALL' },
      { module: 'products', actions: ['view'], scope: 'ALL' },
      { module: 'product-360', actions: ['view'], scope: 'ALL' },
      { module: 'roadmap', actions: ['view'], scope: 'ALL' },
      { module: 'releases', actions: ['view'], scope: 'ALL' },
      { module: 'marketing', actions: ['view', 'create', 'edit', 'delete', 'approve', 'export'], scope: 'ALL' },
      { module: 'sales', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'feedback', actions: ['view', 'create', 'edit'], scope: 'ALL' },
      { module: 'analytics', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'reports', actions: ['view', 'export'], scope: 'ALL' }
    ]
  },
  {
    id: 'role-finance-analyst',
    name: 'Finance & Revenue Analyst',
    code: 'FINANCE_ANALYST',
    description: 'Oversees SaaS revenue, ARR/MRR metrics, pricing models, feature ROI attributions, and financial reporting.',
    color: 'cyan',
    isSystemDefault: true,
    permissions: [
      { module: 'dashboard', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'strategy', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'market', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'products', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'product-360', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'sales', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'revenue', actions: ['view', 'create', 'edit', 'approve', 'export'], scope: 'ALL' },
      { module: 'feature-revenue', actions: ['view', 'create', 'edit', 'approve', 'export'], scope: 'ALL' },
      { module: 'analytics', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'reports', actions: ['view', 'create', 'edit', 'approve', 'export'], scope: 'ALL' }
    ]
  },
  {
    id: 'role-stakeholder-viewer',
    name: 'Executive Stakeholder / Viewer',
    code: 'STAKEHOLDER_VIEWER',
    description: 'Read-only access to high-level strategic dashboards, product roadmaps, and executive reports without modification rights.',
    color: 'slate',
    isSystemDefault: true,
    permissions: [
      { module: 'dashboard', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'strategy', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'products', actions: ['view'], scope: 'ALL' },
      { module: 'product-360', actions: ['view'], scope: 'ALL' },
      { module: 'roadmap', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'releases', actions: ['view'], scope: 'ALL' },
      { module: 'revenue', actions: ['view', 'export'], scope: 'ALL' },
      { module: 'reports', actions: ['view', 'export'], scope: 'ALL' }
    ]
  }
];

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'user-admin',
    name: 'Dawit Haile',
    email: 'dawit.haile@mesob.et',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    roleId: 'role-super-admin',
    department: 'Executive Leadership',
    team: 'Executive Committee',
    title: 'Chief Product & Technology Officer (CPTO)',
    isActive: true,
    createdAt: '2025-01-01'
  },
  {
    id: 'user-pm',
    name: 'Selam Tesfaye',
    email: 'selam.tesfaye@mesob.et',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    roleId: 'role-product-manager',
    department: 'Product Management',
    team: 'Hospitality & POS Tribe',
    title: 'Lead Product Manager',
    isActive: true,
    createdAt: '2025-01-15'
  },
  {
    id: 'user-dev',
    name: 'Brook Alemayehu',
    email: 'brook.alemayehu@mesob.et',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    roleId: 'role-eng-lead',
    department: 'Engineering',
    team: 'Core Platform & Architecture',
    title: 'Principal Software Architect & Eng Lead',
    isActive: true,
    createdAt: '2025-02-01'
  },
  {
    id: 'user-sales',
    name: 'Yonas Mulugeta',
    email: 'yonas.mulugeta@mesob.et',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    roleId: 'role-sales-rep',
    department: 'Commercial & Sales',
    team: 'Enterprise Hospitality Sales',
    title: 'Senior Enterprise Account Executive',
    isActive: true,
    createdAt: '2025-02-15'
  },
  {
    id: 'user-mkt',
    name: 'Rahel Girma',
    email: 'rahel.girma@mesob.et',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    roleId: 'role-marketing-lead',
    department: 'Growth & Marketing',
    team: 'Product Marketing & GTM',
    title: 'Head of Product Marketing',
    isActive: true,
    createdAt: '2025-03-01'
  },
  {
    id: 'user-fin',
    name: 'Natnael Getachew',
    email: 'natnael.getachew@mesob.et',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    roleId: 'role-finance-analyst',
    department: 'Finance & Strategy',
    team: 'Revenue Operations',
    title: 'Senior SaaS Revenue Analyst',
    isActive: true,
    createdAt: '2025-03-10'
  },
  {
    id: 'user-view',
    name: 'Meron Kebede',
    email: 'meron.kebede@mesob.et',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    roleId: 'role-stakeholder-viewer',
    department: 'Board of Directors',
    team: 'Strategic Advisory Board',
    title: 'Executive Board Member & Investor',
    isActive: true,
    createdAt: '2025-03-15'
  }
];
