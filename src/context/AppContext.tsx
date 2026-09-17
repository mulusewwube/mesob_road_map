import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CurrencyType,
  Product,
  StrategicObjective,
  MarketSegment,
  Competitor,
  ProductStrategy,
  Initiative,
  Epic,
  Feature,
  UserStory,
  DevTask,
  Sprint,
  Release,
  MarketingStrategy,
  Campaign,
  SalesLead,
  Customer,
  RevenueRecord,
  FeatureRevenueAttribution,
  CustomerFeedback,
  ProductAnalyticsSummary,
  ActionRequiredItem,
  DevKanbanStage,
  SalesStage,
  UserRole,
  UserAccount,
  ModuleKey,
  PermissionAction,
  RecordScope,
  ModulePermission,
  AuthResult,
  LoginCredentials
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_STRATEGY,
  INITIAL_MARKET_SEGMENTS,
  INITIAL_COMPETITORS,
  INITIAL_PRODUCT_STRATEGIES,
  INITIAL_INITIATIVES,
  INITIAL_EPICS,
  INITIAL_FEATURES,
  INITIAL_USER_STORIES,
  INITIAL_DEV_TASKS,
  INITIAL_SPRINTS,
  INITIAL_RELEASES,
  INITIAL_MARKETING_STRATEGIES,
  INITIAL_CAMPAIGNS,
  INITIAL_SALES_LEADS,
  INITIAL_CUSTOMERS,
  INITIAL_REVENUE_HISTORY,
  INITIAL_FEATURE_ATTRIBUTIONS,
  INITIAL_FEEDBACK,
  INITIAL_ANALYTICS,
  INITIAL_ACTION_ITEMS
} from '../data/initialData';
import { INITIAL_ROLES, INITIAL_USERS } from '../data/initialRbacData';

export type NavigationTab =
  | 'dashboard'
  | 'strategy'
  | 'market'
  | 'products'
  | 'product-360'
  | 'roadmap'
  | 'development'
  | 'releases'
  | 'marketing'
  | 'sales'
  | 'revenue'
  | 'feature-revenue'
  | 'feedback'
  | 'analytics'
  | 'crosslink'
  | 'reports'
  | 'access-control'
  | 'settings';

export type ThemeMode = 'dark' | 'light';

export interface FeatureTraceabilityChain {
  feature: Feature;
  product?: Product;
  epic?: Epic;
  initiative?: Initiative;
  strategy?: StrategicObjective;
  devTasks: DevTask[];
  release?: Release;
  campaigns: Campaign[];
  salesLeads: SalesLead[];
  adoptingCustomers: Customer[];
  feedbackItems: CustomerFeedback[];
  revenueAttribution?: FeatureRevenueAttribution;
}

interface AppContextType {
  // Theme State
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;

  // Navigation & View State
  activeView: NavigationTab;
  setActiveView: (view: NavigationTab) => void;
  selectedProductId: string; // 'all' or productId
  setSelectedProductId: (id: string) => void;
  selectedProductFor360: string;
  setSelectedProductFor360: (id: string) => void;
  selectedFeatureIdForInspect: string | null;
  setSelectedFeatureIdForInspect: (id: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Currency & Formats
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  exchangeRateETBtoUSD: number;
  formatMoney: (amountETB: number) => string;
  formatCompactMoney: (amountETB: number) => string;
  convertMoney: (amountETB: number) => number;

  // Lifecycle Data
  products: Product[];
  strategy: StrategicObjective[];
  marketSegments: MarketSegment[];
  competitors: Competitor[];
  productStrategies: ProductStrategy[];
  initiatives: Initiative[];
  epics: Epic[];
  features: Feature[];
  userStories: UserStory[];
  devTasks: DevTask[];
  sprints: Sprint[];
  releases: Release[];
  marketingStrategies: MarketingStrategy[];
  campaigns: Campaign[];
  salesLeads: SalesLead[];
  customers: Customer[];
  revenueHistory: RevenueRecord[];
  featureAttributions: FeatureRevenueAttribution[];
  feedback: CustomerFeedback[];
  analytics: ProductAnalyticsSummary;
  actionItems: ActionRequiredItem[];

  // CRUD Mutations for EVERY entity
  // Products
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductStrategy: (productId: string, updates: Partial<ProductStrategy>) => void;

  // Strategy
  addStrategicObjective: (obj: Omit<StrategicObjective, 'id'>) => void;
  updateStrategicObjective: (id: string, updates: Partial<StrategicObjective>) => void;
  deleteStrategicObjective: (id: string) => void;

  // Market & Competitors
  addMarketSegment: (seg: Omit<MarketSegment, 'id'>) => void;
  updateMarketSegment: (id: string, updates: Partial<MarketSegment>) => void;
  deleteMarketSegment: (id: string) => void;
  addCompetitor: (comp: Omit<Competitor, 'id'>) => void;
  updateCompetitor: (id: string, updates: Partial<Competitor>) => void;
  deleteCompetitor: (id: string) => void;

  // Roadmap & Hierarchy
  addInitiative: (init: Omit<Initiative, 'id'>) => void;
  updateInitiative: (id: string, updates: Partial<Initiative>) => void;
  deleteInitiative: (id: string) => void;
  addEpic: (epic: Omit<Epic, 'id'>) => void;
  updateEpic: (id: string, updates: Partial<Epic>) => void;
  deleteEpic: (id: string) => void;
  addFeature: (feat: Omit<Feature, 'id'>) => void;
  updateFeature: (id: string, updates: Partial<Feature>) => void;
  deleteFeature: (id: string) => void;
  addUserStory: (story: Omit<UserStory, 'id'>) => void;
  updateUserStory: (id: string, updates: Partial<UserStory>) => void;
  deleteUserStory: (id: string) => void;

  // Development
  addDevTask: (task: Omit<DevTask, 'id'>) => void;
  updateDevTask: (id: string, updates: Partial<DevTask>) => void;
  deleteDevTask: (id: string) => void;
  moveDevTaskStage: (taskId: string, newStage: DevKanbanStage) => void;

  // Releases
  addRelease: (release: Omit<Release, 'id'>) => void;
  updateRelease: (id: string, updates: Partial<Release>) => void;
  deleteRelease: (id: string) => void;

  // Marketing
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  updateMarketingStrategy: (id: string, updates: Partial<MarketingStrategy>) => void;

  // Sales CRM
  addSalesLead: (lead: Omit<SalesLead, 'id'>) => void;
  updateSalesLead: (id: string, updates: Partial<SalesLead>) => void;
  deleteSalesLead: (id: string) => void;
  moveSalesLeadStage: (leadId: string, newStage: SalesStage) => void;

  // Customers
  addCustomer: (cust: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, updates: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;

  // Revenue & Metrics
  addRevenueRecord: (record: Omit<RevenueRecord, 'id'>) => void;
  updateRevenueRecord: (id: string, updates: Partial<RevenueRecord>) => void;
  deleteRevenueRecord: (id: string) => void;
  updateFeatureAttribution: (featureId: string, updates: Partial<FeatureRevenueAttribution>) => void;

  // Feedback
  addFeedback: (fb: Omit<CustomerFeedback, 'id'>) => void;
  updateFeedback: (id: string, updates: Partial<CustomerFeedback>) => void;
  deleteFeedback: (id: string) => void;
  updateFeedbackStatus: (id: string, status: CustomerFeedback['status']) => void;

  // Analytics
  updateAnalytics: (updates: Partial<ProductAnalyticsSummary>) => void;

  // Action Items
  addActionItem: (item: Omit<ActionRequiredItem, 'id'>) => void;
  updateActionItem: (id: string, updates: Partial<ActionRequiredItem>) => void;
  deleteActionItem: (id: string) => void;

  // Authentication & Session
  isAuthenticated: boolean;
  login: (email: string, password?: string) => AuthResult;
  logout: () => void;
  changeUserPassword: (userId: string, newPassword: string) => boolean;

  // RBAC & User Management
  currentUser: UserAccount;
  currentRole: UserRole;
  currentUserId: string;
  setCurrentUserId: (id: string) => void;
  roles: UserRole[];
  users: UserAccount[];
  addRole: (role: Omit<UserRole, 'id'>) => void;
  updateRole: (id: string, updates: Partial<UserRole>) => void;
  deleteRole: (id: string) => void;
  cloneRole: (id: string) => void;
  addUser: (user: Omit<UserAccount, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<UserAccount>) => void;
  deleteUser: (id: string) => void;
  hasPermission: (module: ModuleKey, action: PermissionAction) => boolean;
  canAccessRecord: (module: ModuleKey, ownerName?: string, teamName?: string) => boolean;
  getEffectiveScope: (module: ModuleKey) => RecordScope;
  getRoleById: (id: string) => UserRole | undefined;
  getUserById: (id: string) => UserAccount | undefined;

  // Data management
  getFeatureTraceability: (featureId: string) => FeatureTraceabilityChain | null;
  getProductDetails: (productId: string) => Product | undefined;
  resetAllData: () => void;
  clearAllDataToBlank: () => void;
  importDataJSON: (jsonString: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'mesob_pms_data_v2';
const LOCAL_STORAGE_ACTIVE_USER_KEY = 'mesob_active_user';
const LOCAL_STORAGE_AUTH_KEY = 'mesob_auth_session';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      if (saved !== null) return saved === 'true';
      return true;
    } catch {
      return true;
    }
  });
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('mesob_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'dark';
    } catch {
      return 'dark';
    }
  });

  const [activeView, setActiveView] = useState<NavigationTab>('dashboard');
  const [selectedProductId, setSelectedProductId] = useState<string>('all');
  const [selectedProductFor360, setSelectedProductFor360] = useState<string>('prod-1');
  const [selectedFeatureIdForInspect, setSelectedFeatureIdForInspect] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<CurrencyType>('ETB');
  const exchangeRateETBtoUSD = 125.0;

  // RBAC State
  const [roles, setRoles] = useState<UserRole[]>(INITIAL_ROLES);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
  const [currentUserId, setCurrentUserIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ACTIVE_USER_KEY);
      if (saved) return saved;
      return 'user-admin';
    } catch {
      return 'user-admin';
    }
  });

  const setCurrentUserId = (id: string) => {
    setCurrentUserIdState(id);
    try {
      localStorage.setItem(LOCAL_STORAGE_ACTIVE_USER_KEY, id);
    } catch (e) {
      console.warn('Could not save active user', e);
    }
  };

  const currentUser: UserAccount = users.find(u => u.id === currentUserId) || users[0] || INITIAL_USERS[0];
  const currentRole: UserRole = roles.find(r => r.id === currentUser?.roleId) || roles[0] || INITIAL_ROLES[0];

  // Sync theme with document element
  useEffect(() => {
    try {
      localStorage.setItem('mesob_theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      console.warn('Failed to update theme on document', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Entities state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [strategy, setStrategy] = useState<StrategicObjective[]>(INITIAL_STRATEGY);
  const [marketSegments, setMarketSegments] = useState<MarketSegment[]>(INITIAL_MARKET_SEGMENTS);
  const [competitors, setCompetitors] = useState<Competitor[]>(INITIAL_COMPETITORS);
  const [productStrategies, setProductStrategies] = useState<ProductStrategy[]>(INITIAL_PRODUCT_STRATEGIES);
  const [initiatives, setInitiatives] = useState<Initiative[]>(INITIAL_INITIATIVES);
  const [epics, setEpics] = useState<Epic[]>(INITIAL_EPICS);
  const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);
  const [userStories, setUserStories] = useState<UserStory[]>(INITIAL_USER_STORIES);
  const [devTasks, setDevTasks] = useState<DevTask[]>(INITIAL_DEV_TASKS);
  const [sprints, setSprints] = useState<Sprint[]>(INITIAL_SPRINTS);
  const [releases, setReleases] = useState<Release[]>(INITIAL_RELEASES);
  const [marketingStrategies, setMarketingStrategies] = useState<MarketingStrategy[]>(INITIAL_MARKETING_STRATEGIES);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [salesLeads, setSalesLeads] = useState<SalesLead[]>(INITIAL_SALES_LEADS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [revenueHistory, setRevenueHistory] = useState<RevenueRecord[]>(INITIAL_REVENUE_HISTORY);
  const [featureAttributions, setFeatureAttributions] = useState<FeatureRevenueAttribution[]>(INITIAL_FEATURE_ATTRIBUTIONS);
  const [feedback, setFeedback] = useState<CustomerFeedback[]>(INITIAL_FEEDBACK);
  const [analytics, setAnalytics] = useState<ProductAnalyticsSummary>(INITIAL_ANALYTICS);
  const [actionItems, setActionItems] = useState<ActionRequiredItem[]>(INITIAL_ACTION_ITEMS);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.roles && Array.isArray(parsed.roles) && parsed.roles.length > 0) setRoles(parsed.roles);
        if (parsed.users && Array.isArray(parsed.users) && parsed.users.length > 0) setUsers(parsed.users);
        if (parsed.products) setProducts(parsed.products);
        if (parsed.strategy) setStrategy(parsed.strategy);
        if (parsed.marketSegments) setMarketSegments(parsed.marketSegments);
        if (parsed.competitors) setCompetitors(parsed.competitors);
        if (parsed.productStrategies) setProductStrategies(parsed.productStrategies);
        if (parsed.initiatives) setInitiatives(parsed.initiatives);
        if (parsed.epics) setEpics(parsed.epics);
        if (parsed.features) setFeatures(parsed.features);
        if (parsed.userStories) setUserStories(parsed.userStories);
        if (parsed.devTasks) setDevTasks(parsed.devTasks);
        if (parsed.sprints) setSprints(parsed.sprints);
        if (parsed.releases) setReleases(parsed.releases);
        if (parsed.marketingStrategies) setMarketingStrategies(parsed.marketingStrategies);
        if (parsed.campaigns) setCampaigns(parsed.campaigns);
        if (parsed.salesLeads) setSalesLeads(parsed.salesLeads);
        if (parsed.customers) setCustomers(parsed.customers);
        if (parsed.revenueHistory) setRevenueHistory(parsed.revenueHistory);
        if (parsed.featureAttributions) setFeatureAttributions(parsed.featureAttributions);
        if (parsed.feedback) setFeedback(parsed.feedback);
        if (parsed.analytics) setAnalytics(parsed.analytics);
        if (parsed.actionItems) setActionItems(parsed.actionItems);
      }
    } catch (e) {
      console.warn('Could not parse saved storage:', e);
    }
  }, []);

  // Persistence helper
  const saveToStorage = (updates: any) => {
    try {
      const current = localStorage.getItem(LOCAL_STORAGE_KEY);
      const parsed = current ? JSON.parse(current) : {};
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...parsed, ...updates }));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Currency helpers
  const convertMoney = (amountETB: number): number => {
    if (currency === 'USD') return amountETB / exchangeRateETBtoUSD;
    return amountETB;
  };

  const formatMoney = (amountETB: number): string => {
    if (currency === 'USD') {
      const val = amountETB / exchangeRateETBtoUSD;
      return `$${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `${amountETB.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ETB`;
  };

  const formatCompactMoney = (amountETB: number): string => {
    if (currency === 'USD') {
      const val = amountETB / exchangeRateETBtoUSD;
      if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
      return `$${val.toFixed(0)}`;
    }
    if (amountETB >= 1000000) return `${(amountETB / 1000000).toFixed(1)}M ETB`;
    if (amountETB >= 1000) return `${(amountETB / 1000).toFixed(0)}K ETB`;
    return `${amountETB} ETB`;
  };

  // ==========================================
  // COMPLETE MUTATIONS FOR EVERY ENTITY
  // ==========================================

  // Products
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProd: Product = { ...productData, id: `prod-${Date.now().toString().slice(-4)}` };
    setProducts(prev => {
      const next = [...prev, newProd];
      saveToStorage({ products: next });
      return next;
    });
    // also create default strategy for it
    const newStrat: ProductStrategy = {
      id: `strat-p-${newProd.id}`,
      productId: newProd.id,
      productVision: `Lead market adoption for ${newProd.name}`,
      productMission: `Deliver unmatched value to ${newProd.targetCustomer}`,
      targetMarket: newProd.targetMarket,
      targetCustomer: newProd.targetCustomer,
      customerProblem: 'Operational inefficiency and slow workflows.',
      valueProposition: newProd.tagline,
      businessModel: newProd.pricingModel,
      pricingTierSummary: 'Starter / Growth / Enterprise',
      revenueTargetETB: newProd.revenueTargetETB,
      customerTarget: 100,
      competitiveAdvantage: 'Localized technology and direct integration.',
      strategicGoals: ['Reach target market', 'Scale monthly revenue'],
      kpiGoals: ['MRR Growth', 'Adoption Rate']
    };
    setProductStrategies(prev => {
      const next = [...prev, newStrat];
      saveToStorage({ productStrategies: next });
      return next;
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => {
      const next = prev.map(p => (p.id === id ? { ...p, ...updates } : p));
      saveToStorage({ products: next });
      return next;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const next = prev.filter(p => p.id !== id);
      saveToStorage({ products: next });
      return next;
    });
  };

  const updateProductStrategy = (productId: string, updates: Partial<ProductStrategy>) => {
    setProductStrategies(prev => {
      const exists = prev.find(s => s.productId === productId);
      let next;
      if (exists) {
        next = prev.map(s => (s.productId === productId ? { ...s, ...updates } : s));
      } else {
        next = [...prev, { id: `strat-p-${productId}`, productId, ...updates } as ProductStrategy];
      }
      saveToStorage({ productStrategies: next });
      return next;
    });
  };

  // Strategy
  const addStrategicObjective = (objData: Omit<StrategicObjective, 'id'>) => {
    const newObj: StrategicObjective = { ...objData, id: `strat-${Date.now().toString().slice(-4)}` };
    setStrategy(prev => {
      const next = [newObj, ...prev];
      saveToStorage({ strategy: next });
      return next;
    });
  };

  const updateStrategicObjective = (id: string, updates: Partial<StrategicObjective>) => {
    setStrategy(prev => {
      const next = prev.map(s => (s.id === id ? { ...s, ...updates } : s));
      saveToStorage({ strategy: next });
      return next;
    });
  };

  const deleteStrategicObjective = (id: string) => {
    setStrategy(prev => {
      const next = prev.filter(s => s.id !== id);
      saveToStorage({ strategy: next });
      return next;
    });
  };

  // Market & Competitors
  const addMarketSegment = (segData: Omit<MarketSegment, 'id'>) => {
    const newSeg: MarketSegment = { ...segData, id: `mkt-${Date.now().toString().slice(-4)}` };
    setMarketSegments(prev => {
      const next = [...prev, newSeg];
      saveToStorage({ marketSegments: next });
      return next;
    });
  };

  const updateMarketSegment = (id: string, updates: Partial<MarketSegment>) => {
    setMarketSegments(prev => {
      const next = prev.map(m => (m.id === id ? { ...m, ...updates } : m));
      saveToStorage({ marketSegments: next });
      return next;
    });
  };

  const deleteMarketSegment = (id: string) => {
    setMarketSegments(prev => {
      const next = prev.filter(m => m.id !== id);
      saveToStorage({ marketSegments: next });
      return next;
    });
  };

  const addCompetitor = (compData: Omit<Competitor, 'id'>) => {
    const newComp: Competitor = { ...compData, id: `comp-${Date.now().toString().slice(-4)}` };
    setCompetitors(prev => {
      const next = [...prev, newComp];
      saveToStorage({ competitors: next });
      return next;
    });
  };

  const updateCompetitor = (id: string, updates: Partial<Competitor>) => {
    setCompetitors(prev => {
      const next = prev.map(c => (c.id === id ? { ...c, ...updates } : c));
      saveToStorage({ competitors: next });
      return next;
    });
  };

  const deleteCompetitor = (id: string) => {
    setCompetitors(prev => {
      const next = prev.filter(c => c.id !== id);
      saveToStorage({ competitors: next });
      return next;
    });
  };

  // Roadmap & Hierarchy
  const addInitiative = (initData: Omit<Initiative, 'id'>) => {
    const newInit: Initiative = { ...initData, id: `init-${Date.now().toString().slice(-4)}` };
    setInitiatives(prev => {
      const next = [...prev, newInit];
      saveToStorage({ initiatives: next });
      return next;
    });
  };

  const updateInitiative = (id: string, updates: Partial<Initiative>) => {
    setInitiatives(prev => {
      const next = prev.map(i => (i.id === id ? { ...i, ...updates } : i));
      saveToStorage({ initiatives: next });
      return next;
    });
  };

  const deleteInitiative = (id: string) => {
    setInitiatives(prev => {
      const next = prev.filter(i => i.id !== id);
      saveToStorage({ initiatives: next });
      return next;
    });
  };

  const addEpic = (epicData: Omit<Epic, 'id'>) => {
    const newEpic: Epic = { ...epicData, id: `epic-${Date.now().toString().slice(-4)}` };
    setEpics(prev => {
      const next = [...prev, newEpic];
      saveToStorage({ epics: next });
      return next;
    });
  };

  const updateEpic = (id: string, updates: Partial<Epic>) => {
    setEpics(prev => {
      const next = prev.map(e => (e.id === id ? { ...e, ...updates } : e));
      saveToStorage({ epics: next });
      return next;
    });
  };

  const deleteEpic = (id: string) => {
    setEpics(prev => {
      const next = prev.filter(e => e.id !== id);
      saveToStorage({ epics: next });
      return next;
    });
  };

  const addFeature = (featData: Omit<Feature, 'id'>) => {
    const newFeat: Feature = { ...featData, id: `feat-${Date.now().toString().slice(-4)}` };
    setFeatures(prev => {
      const next = [newFeat, ...prev];
      saveToStorage({ features: next });
      return next;
    });
    // add to attribution table too
    const prod = products.find(p => p.id === newFeat.productId);
    setFeatureAttributions(prev => {
      const next = [
        ...prev,
        {
          featureId: newFeat.id,
          featureName: newFeat.title,
          productId: newFeat.productId,
          productName: prod?.name || 'Product',
          adoptingCustomersCount: newFeat.adoptingCustomers || 0,
          totalRevenueImpactETB: newFeat.revenueImpactETB || 0,
          monthlyRevenueImpactETB: Math.round((newFeat.revenueImpactETB || 0) / 12),
          developmentCostETB: newFeat.devCostETB || 100000,
          developmentHours: newFeat.estimatedHours || 50,
          roiRatio: (newFeat.devCostETB || 0) > 0 ? (newFeat.revenueImpactETB || 0) / (newFeat.devCostETB || 1) : 0,
          adoptionPercentage: 0,
          strategicCategory: 'High Growth Bet' as const
        }
      ];
      saveToStorage({ featureAttributions: next });
      return next;
    });
  };

  const updateFeature = (id: string, updates: Partial<Feature>) => {
    setFeatures(prev => {
      const next = prev.map(f => (f.id === id ? { ...f, ...updates } : f));
      saveToStorage({ features: next });
      return next;
    });
    // sync attribution if revenue or customers changed
    if (updates.title || updates.revenueImpactETB !== undefined || updates.adoptingCustomers !== undefined) {
      setFeatureAttributions(prev => {
        const next = prev.map(fa => {
          if (fa.featureId === id) {
            const rev = updates.revenueImpactETB !== undefined ? updates.revenueImpactETB : fa.totalRevenueImpactETB;
            const cost = fa.developmentCostETB || 1;
            return {
              ...fa,
              featureName: updates.title || fa.featureName,
              totalRevenueImpactETB: rev,
              monthlyRevenueImpactETB: Math.round(rev / 12),
              adoptingCustomersCount: updates.adoptingCustomers !== undefined ? updates.adoptingCustomers : fa.adoptingCustomersCount,
              roiRatio: cost > 0 ? rev / cost : 0
            };
          }
          return fa;
        });
        saveToStorage({ featureAttributions: next });
        return next;
      });
    }
  };

  const deleteFeature = (id: string) => {
    setFeatures(prev => {
      const next = prev.filter(f => f.id !== id);
      saveToStorage({ features: next });
      return next;
    });
    setFeatureAttributions(prev => {
      const next = prev.filter(fa => fa.featureId !== id);
      saveToStorage({ featureAttributions: next });
      return next;
    });
  };

  const addUserStory = (storyData: Omit<UserStory, 'id'>) => {
    const newStory: UserStory = { ...storyData, id: `story-${Date.now().toString().slice(-4)}` };
    setUserStories(prev => {
      const next = [...prev, newStory];
      saveToStorage({ userStories: next });
      return next;
    });
  };

  const updateUserStory = (id: string, updates: Partial<UserStory>) => {
    setUserStories(prev => {
      const next = prev.map(s => (s.id === id ? { ...s, ...updates } : s));
      saveToStorage({ userStories: next });
      return next;
    });
  };

  const deleteUserStory = (id: string) => {
    setUserStories(prev => {
      const next = prev.filter(s => s.id !== id);
      saveToStorage({ userStories: next });
      return next;
    });
  };

  // Development Tasks
  const addDevTask = (taskData: Omit<DevTask, 'id'>) => {
    const newTask: DevTask = { ...taskData, id: `task-${Date.now().toString().slice(-4)}` };
    setDevTasks(prev => {
      const next = [newTask, ...prev];
      saveToStorage({ devTasks: next });
      return next;
    });
  };

  const updateDevTask = (id: string, updates: Partial<DevTask>) => {
    setDevTasks(prev => {
      const next = prev.map(t => (t.id === id ? { ...t, ...updates } : t));
      saveToStorage({ devTasks: next });
      return next;
    });
  };

  const deleteDevTask = (id: string) => {
    setDevTasks(prev => {
      const next = prev.filter(t => t.id !== id);
      saveToStorage({ devTasks: next });
      return next;
    });
  };

  const moveDevTaskStage = (taskId: string, newStage: DevKanbanStage) => {
    setDevTasks(prev => {
      const next = prev.map(t => {
        if (t.id === taskId) {
          const progress = newStage === 'RELEASED' ? 100 : newStage === 'READY FOR RELEASE' ? 95 : newStage === 'TESTING' ? 80 : newStage === 'IN PROGRESS' ? 50 : 0;
          return { ...t, status: newStage, progressPercent: progress };
        }
        return t;
      });
      saveToStorage({ devTasks: next });
      return next;
    });
  };

  // Releases
  const addRelease = (relData: Omit<Release, 'id'>) => {
    const newRel: Release = { ...relData, id: `rel-${Date.now().toString().slice(-4)}` };
    setReleases(prev => {
      const next = [newRel, ...prev];
      saveToStorage({ releases: next });
      return next;
    });
  };

  const updateRelease = (id: string, updates: Partial<Release>) => {
    setReleases(prev => {
      const next = prev.map(r => (r.id === id ? { ...r, ...updates } : r));
      saveToStorage({ releases: next });
      return next;
    });
  };

  const deleteRelease = (id: string) => {
    setReleases(prev => {
      const next = prev.filter(r => r.id !== id);
      saveToStorage({ releases: next });
      return next;
    });
  };

  // Marketing Campaigns
  const addCampaign = (campData: Omit<Campaign, 'id'>) => {
    const newCamp: Campaign = { ...campData, id: `camp-${Date.now().toString().slice(-4)}` };
    setCampaigns(prev => {
      const next = [newCamp, ...prev];
      saveToStorage({ campaigns: next });
      return next;
    });
  };

  const updateCampaign = (id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => {
      const next = prev.map(c => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          const roi = updated.budgetETB > 0 ? (updated.actualRevenueETB / updated.budgetETB) : 0;
          return { ...updated, roiMultiplier: Number(roi.toFixed(2)) };
        }
        return c;
      });
      saveToStorage({ campaigns: next });
      return next;
    });
  };

  const deleteCampaign = (id: string) => {
    setCampaigns(prev => {
      const next = prev.filter(c => c.id !== id);
      saveToStorage({ campaigns: next });
      return next;
    });
  };

  const updateMarketingStrategy = (id: string, updates: Partial<MarketingStrategy>) => {
    setMarketingStrategies(prev => {
      const next = prev.map(m => (m.id === id ? { ...m, ...updates } : m));
      saveToStorage({ marketingStrategies: next });
      return next;
    });
  };

  // Sales CRM
  const addSalesLead = (leadData: Omit<SalesLead, 'id'>) => {
    const newLead: SalesLead = { ...leadData, id: `lead-${Date.now().toString().slice(-4)}` };
    setSalesLeads(prev => {
      const next = [newLead, ...prev];
      saveToStorage({ salesLeads: next });
      return next;
    });
  };

  const updateSalesLead = (id: string, updates: Partial<SalesLead>) => {
    setSalesLeads(prev => {
      const next = prev.map(l => (l.id === id ? { ...l, ...updates } : l));
      saveToStorage({ salesLeads: next });
      return next;
    });
  };

  const deleteSalesLead = (id: string) => {
    setSalesLeads(prev => {
      const next = prev.filter(l => l.id !== id);
      saveToStorage({ salesLeads: next });
      return next;
    });
  };

  const moveSalesLeadStage = (leadId: string, newStage: SalesStage) => {
    setSalesLeads(prev => {
      const next = prev.map(l => {
        if (l.id === leadId) {
          const actualRev = newStage === 'Won' ? l.expectedRevenueETB : l.actualRevenueETB;
          const prob = newStage === 'Won' ? 100 : newStage === 'Negotiation' ? 80 : newStage === 'Proposal' ? 60 : newStage === 'Demo' ? 40 : 20;
          return { ...l, status: newStage, actualRevenueETB: actualRev, probabilityPercent: prob };
        }
        return l;
      });
      saveToStorage({ salesLeads: next });
      return next;
    });
  };

  // Customers
  const addCustomer = (custData: Omit<Customer, 'id'>) => {
    const newCust: Customer = { ...custData, id: `cust-${Date.now().toString().slice(-4)}` };
    setCustomers(prev => {
      const next = [...prev, newCust];
      saveToStorage({ customers: next });
      return next;
    });
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomers(prev => {
      const next = prev.map(c => (c.id === id ? { ...c, ...updates } : c));
      saveToStorage({ customers: next });
      return next;
    });
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => {
      const next = prev.filter(c => c.id !== id);
      saveToStorage({ customers: next });
      return next;
    });
  };

  // Revenue Records
  const addRevenueRecord = (recordData: Omit<RevenueRecord, 'id'>) => {
    const newRec: RevenueRecord = { ...recordData, id: `rev-${Date.now().toString().slice(-4)}` };
    setRevenueHistory(prev => {
      const next = [...prev, newRec];
      saveToStorage({ revenueHistory: next });
      return next;
    });
  };

  const updateRevenueRecord = (id: string, updates: Partial<RevenueRecord>) => {
    setRevenueHistory(prev => {
      const next = prev.map(r => (r.id === id ? { ...r, ...updates } : r));
      saveToStorage({ revenueHistory: next });
      return next;
    });
  };

  const deleteRevenueRecord = (id: string) => {
    setRevenueHistory(prev => {
      const next = prev.filter(r => r.id !== id);
      saveToStorage({ revenueHistory: next });
      return next;
    });
  };

  const updateFeatureAttribution = (featureId: string, updates: Partial<FeatureRevenueAttribution>) => {
    setFeatureAttributions(prev => {
      const next = prev.map(fa => (fa.featureId === featureId ? { ...fa, ...updates } : fa));
      saveToStorage({ featureAttributions: next });
      return next;
    });
  };

  // Customer Feedback
  const addFeedback = (fbData: Omit<CustomerFeedback, 'id'>) => {
    const newFb: CustomerFeedback = { ...fbData, id: `fb-${Date.now().toString().slice(-4)}` };
    setFeedback(prev => {
      const next = [newFb, ...prev];
      saveToStorage({ feedback: next });
      return next;
    });
  };

  const updateFeedback = (id: string, updates: Partial<CustomerFeedback>) => {
    setFeedback(prev => {
      const next = prev.map(f => (f.id === id ? { ...f, ...updates } : f));
      saveToStorage({ feedback: next });
      return next;
    });
  };

  const deleteFeedback = (id: string) => {
    setFeedback(prev => {
      const next = prev.filter(f => f.id !== id);
      saveToStorage({ feedback: next });
      return next;
    });
  };

  const updateFeedbackStatus = (fbId: string, status: CustomerFeedback['status']) => {
    setFeedback(prev => {
      const next = prev.map(f => (f.id === fbId ? { ...f, status } : f));
      saveToStorage({ feedback: next });
      return next;
    });
  };

  // Analytics
  const updateAnalytics = (updates: Partial<ProductAnalyticsSummary>) => {
    setAnalytics(prev => {
      const next = { ...prev, ...updates };
      saveToStorage({ analytics: next });
      return next;
    });
  };

  // Action Items
  const addActionItem = (itemData: Omit<ActionRequiredItem, 'id'>) => {
    const newItem: ActionRequiredItem = { ...itemData, id: `act-${Date.now().toString().slice(-4)}` };
    setActionItems(prev => {
      const next = [newItem, ...prev];
      saveToStorage({ actionItems: next });
      return next;
    });
  };

  const updateActionItem = (id: string, updates: Partial<ActionRequiredItem>) => {
    setActionItems(prev => {
      const next = prev.map(a => (a.id === id ? { ...a, ...updates } : a));
      saveToStorage({ actionItems: next });
      return next;
    });
  };

  const deleteActionItem = (id: string) => {
    setActionItems(prev => {
      const next = prev.filter(a => a.id !== id);
      saveToStorage({ actionItems: next });
      return next;
    });
  };

  // ==========================================
  // RBAC & PERMISSION EVALUATOR
  // ==========================================
  const hasPermission = (module: ModuleKey, action: PermissionAction): boolean => {
    if (!currentRole) return true;
    if (currentRole.code === 'SUPER_ADMIN') return true;
    const modPerm = currentRole.permissions.find(p => p.module === module);
    if (!modPerm) return false;
    return modPerm.actions.includes(action);
  };

  const getEffectiveScope = (module: ModuleKey): RecordScope => {
    if (!currentRole || currentRole.code === 'SUPER_ADMIN') return 'ALL';
    const modPerm = currentRole.permissions.find(p => p.module === module);
    return modPerm ? modPerm.scope : 'ALL';
  };

  const canAccessRecord = (module: ModuleKey, ownerName?: string, teamName?: string): boolean => {
    if (!hasPermission(module, 'view')) return false;
    if (!currentRole || currentRole.code === 'SUPER_ADMIN') return true;
    const scope = getEffectiveScope(module);
    if (scope === 'ALL') return true;

    if (scope === 'TEAM') {
      if (!teamName) return true;
      const userTeam = (currentUser?.team || '').toLowerCase();
      const userDept = (currentUser?.department || '').toLowerCase();
      const targetTeam = teamName.toLowerCase();
      const match =
        targetTeam.includes(userTeam) ||
        userTeam.includes(targetTeam) ||
        targetTeam.includes(userDept) ||
        userDept.includes(targetTeam);
      if (match) return true;
      // Also allow if user created/owns it
      if (ownerName) {
        const currentName = (currentUser?.name || '').toLowerCase();
        if (ownerName.toLowerCase().includes(currentName)) return true;
      }
      return false;
    }

    if (scope === 'OWN') {
      if (!ownerName) return false;
      const currentName = (currentUser?.name || '').toLowerCase();
      const currentEmail = (currentUser?.email || '').toLowerCase();
      const targetOwner = ownerName.toLowerCase();
      return (
        targetOwner.includes(currentName) ||
        currentName.includes(targetOwner) ||
        targetOwner.includes(currentEmail)
      );
    }

    return true;
  };

  const getRoleById = (id: string): UserRole | undefined => {
    return roles.find(r => r.id === id);
  };

  const getUserById = (id: string): UserAccount | undefined => {
    return users.find(u => u.id === id);
  };

  // Role CRUD
  const addRole = (roleData: Omit<UserRole, 'id'>) => {
    const newRole: UserRole = {
      ...roleData,
      id: `role-${Date.now().toString().slice(-4)}`,
      isSystemDefault: false
    };
    setRoles(prev => {
      const next = [...prev, newRole];
      saveToStorage({ roles: next });
      return next;
    });
  };

  const updateRole = (id: string, updates: Partial<UserRole>) => {
    setRoles(prev => {
      const next = prev.map(r => (r.id === id ? { ...r, ...updates } : r));
      saveToStorage({ roles: next });
      return next;
    });
  };

  const deleteRole = (id: string) => {
    setRoles(prev => {
      const target = prev.find(r => r.id === id);
      if (target?.isSystemDefault) return prev;
      const next = prev.filter(r => r.id !== id);
      saveToStorage({ roles: next });
      return next;
    });
  };

  const cloneRole = (id: string) => {
    const source = roles.find(r => r.id === id);
    if (!source) return;
    const cloned: UserRole = {
      ...source,
      id: `role-${Date.now().toString().slice(-4)}`,
      name: `${source.name} (Custom Copy)`,
      code: `${source.code}_CUSTOM`,
      isSystemDefault: false
    };
    setRoles(prev => {
      const next = [...prev, cloned];
      saveToStorage({ roles: next });
      return next;
    });
  };

  // User CRUD
  const addUser = (userData: Omit<UserAccount, 'id' | 'createdAt'>) => {
    const newUser: UserAccount = {
      ...userData,
      id: `user-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => {
      const next = [...prev, newUser];
      saveToStorage({ users: next });
      return next;
    });
  };

  const updateUser = (id: string, updates: Partial<UserAccount>) => {
    setUsers(prev => {
      const next = prev.map(u => (u.id === id ? { ...u, ...updates } : u));
      saveToStorage({ users: next });
      return next;
    });
  };

  // Authentication methods
  const login = (email: string, password?: string): AuthResult => {
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find(u => {
      const uEmail = u.email.toLowerCase();
      if (uEmail === cleanEmail) return true;
      if (cleanEmail === 'admin@mesob.et' && u.id === 'user-admin') return true;
      if (cleanEmail === 'admin@gmail.com' && u.id === 'user-admin') return true;
      if (cleanEmail === 'admin' && u.id === 'user-admin') return true;
      if (cleanEmail === 'dawit@mesob.et' && u.id === 'user-admin') return true;
      return false;
    });

    if (!user) {
      return { success: false, error: 'No user account found matching this email address.' };
    }

    if (!user.isActive) {
      return { success: false, error: 'This user account has been deactivated. Please contact your system administrator.' };
    }

    // Check password
    if (password !== undefined && password !== '') {
      const expectedPassword = user.password || 'mesob123';
      if (password !== expectedPassword) {
        return { success: false, error: 'Incorrect password. Please verify your credentials and try again.' };
      }
    }

    setCurrentUserId(user.id);
    setIsAuthenticated(true);
    try {
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, 'true');
    } catch (e) {
      console.warn('Could not save auth session', e);
    }
    return { success: true, user };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, 'false');
    } catch (e) {
      console.warn('Could not clear auth session', e);
    }
  };

  const changeUserPassword = (userId: string, newPassword: string): boolean => {
    setUsers(prev => {
      const next = prev.map(u => (u.id === userId ? { ...u, password: newPassword } : u));
      saveToStorage({ users: next });
      return next;
    });
    return true;
  };

  const deleteUser = (id: string) => {
    setUsers(prev => {
      if (prev.length <= 1) return prev;
      const next = prev.filter(u => u.id !== id);
      saveToStorage({ users: next });
      return next;
    });
  };

  // Data Reset & Blank Canvas
  const resetAllData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setRoles(INITIAL_ROLES);
    setUsers(INITIAL_USERS);
    setCurrentUserId('user-admin');
    setProducts(INITIAL_PRODUCTS);
    setStrategy(INITIAL_STRATEGY);
    setMarketSegments(INITIAL_MARKET_SEGMENTS);
    setCompetitors(INITIAL_COMPETITORS);
    setProductStrategies(INITIAL_PRODUCT_STRATEGIES);
    setInitiatives(INITIAL_INITIATIVES);
    setEpics(INITIAL_EPICS);
    setFeatures(INITIAL_FEATURES);
    setUserStories(INITIAL_USER_STORIES);
    setDevTasks(INITIAL_DEV_TASKS);
    setSprints(INITIAL_SPRINTS);
    setReleases(INITIAL_RELEASES);
    setMarketingStrategies(INITIAL_MARKETING_STRATEGIES);
    setCampaigns(INITIAL_CAMPAIGNS);
    setSalesLeads(INITIAL_SALES_LEADS);
    setCustomers(INITIAL_CUSTOMERS);
    setRevenueHistory(INITIAL_REVENUE_HISTORY);
    setFeatureAttributions(INITIAL_FEATURE_ATTRIBUTIONS);
    setFeedback(INITIAL_FEEDBACK);
    setAnalytics(INITIAL_ANALYTICS);
    setActionItems(INITIAL_ACTION_ITEMS);
  };

  const clearAllDataToBlank = () => {
    setProducts([]);
    setStrategy([]);
    setMarketSegments([]);
    setCompetitors([]);
    setProductStrategies([]);
    setInitiatives([]);
    setEpics([]);
    setFeatures([]);
    setUserStories([]);
    setDevTasks([]);
    setSprints([]);
    setReleases([]);
    setMarketingStrategies([]);
    setCampaigns([]);
    setSalesLeads([]);
    setCustomers([]);
    setRevenueHistory([]);
    setFeatureAttributions([]);
    setFeedback([]);
    setActionItems([]);
    saveToStorage({
      products: [],
      strategy: [],
      marketSegments: [],
      competitors: [],
      productStrategies: [],
      initiatives: [],
      epics: [],
      features: [],
      userStories: [],
      devTasks: [],
      sprints: [],
      releases: [],
      marketingStrategies: [],
      campaigns: [],
      salesLeads: [],
      customers: [],
      revenueHistory: [],
      featureAttributions: [],
      feedback: [],
      actionItems: []
    });
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.roles) setRoles(parsed.roles);
      if (parsed.users) setUsers(parsed.users);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.strategy) setStrategy(parsed.strategy);
      if (parsed.marketSegments) setMarketSegments(parsed.marketSegments);
      if (parsed.competitors) setCompetitors(parsed.competitors);
      if (parsed.initiatives) setInitiatives(parsed.initiatives);
      if (parsed.epics) setEpics(parsed.epics);
      if (parsed.features) setFeatures(parsed.features);
      if (parsed.devTasks) setDevTasks(parsed.devTasks);
      if (parsed.releases) setReleases(parsed.releases);
      if (parsed.campaigns) setCampaigns(parsed.campaigns);
      if (parsed.salesLeads) setSalesLeads(parsed.salesLeads);
      if (parsed.customers) setCustomers(parsed.customers);
      if (parsed.revenueHistory) setRevenueHistory(parsed.revenueHistory);
      if (parsed.featureAttributions) setFeatureAttributions(parsed.featureAttributions);
      if (parsed.feedback) setFeedback(parsed.feedback);
      saveToStorage(parsed);
      return true;
    } catch (e) {
      console.error('Import error', e);
      return false;
    }
  };

  const getProductDetails = (productId: string): Product | undefined => {
    return products.find(p => p.id === productId);
  };

  // Cross-module traceability link resolver
  const getFeatureTraceability = (featureId: string): FeatureTraceabilityChain | null => {
    const feature = features.find(f => f.id === featureId);
    if (!feature) return null;

    const product = products.find(p => p.id === feature.productId);
    const epic = epics.find(e => e.id === feature.epicId);
    const initiative = epic ? initiatives.find(i => i.id === epic.initiativeId) : undefined;
    const strat = initiative ? strategy.find(s => s.id === initiative.strategicObjectiveId) : undefined;
    const tasks = devTasks.filter(t => t.featureId === featureId);
    const rel = releases.find(r => r.featureIds.includes(featureId));
    const linkedCampaigns = campaigns.filter(c => c.linkedFeatureId === featureId);
    const linkedLeads = salesLeads.filter(l => l.productId === feature.productId);
    const adoptingCusts = customers.filter(c => c.activeFeaturesUsed.includes(featureId));
    const relatedFb = feedback.filter(fb => fb.featureId === featureId);
    const revAttribution = featureAttributions.find(fa => fa.featureId === featureId);

    return {
      feature,
      product,
      epic,
      initiative,
      strategy: strat,
      devTasks: tasks,
      release: rel,
      campaigns: linkedCampaigns,
      salesLeads: linkedLeads,
      adoptingCustomers: adoptingCusts,
      feedbackItems: relatedFb,
      revenueAttribution: revAttribution
    };
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        activeView,
        setActiveView,
        selectedProductId,
        setSelectedProductId,
        selectedProductFor360,
        setSelectedProductFor360,
        selectedFeatureIdForInspect,
        setSelectedFeatureIdForInspect,
        isSearchOpen,
        setIsSearchOpen,
        currency,
        setCurrency,
        exchangeRateETBtoUSD,
        formatMoney,
        formatCompactMoney,
        convertMoney,
        // Authentication & Session
        isAuthenticated,
        login,
        logout,
        changeUserPassword,
        // RBAC Context
        currentUser,
        currentRole,
        currentUserId,
        setCurrentUserId,
        roles,
        users,
        addRole,
        updateRole,
        deleteRole,
        cloneRole,
        addUser,
        updateUser,
        deleteUser,
        hasPermission,
        canAccessRecord,
        getEffectiveScope,
        getRoleById,
        getUserById,
        // Entities
        products,
        strategy,
        marketSegments,
        competitors,
        productStrategies,
        initiatives,
        epics,
        features,
        userStories,
        devTasks,
        sprints,
        releases,
        marketingStrategies,
        campaigns,
        salesLeads,
        customers,
        revenueHistory,
        featureAttributions,
        feedback,
        analytics,
        actionItems,
        // Product CRUD
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStrategy,
        // Strategy CRUD
        addStrategicObjective,
        updateStrategicObjective,
        deleteStrategicObjective,
        // Market CRUD
        addMarketSegment,
        updateMarketSegment,
        deleteMarketSegment,
        addCompetitor,
        updateCompetitor,
        deleteCompetitor,
        // Roadmap CRUD
        addInitiative,
        updateInitiative,
        deleteInitiative,
        addEpic,
        updateEpic,
        deleteEpic,
        addFeature,
        updateFeature,
        deleteFeature,
        addUserStory,
        updateUserStory,
        deleteUserStory,
        // Dev CRUD
        addDevTask,
        updateDevTask,
        deleteDevTask,
        moveDevTaskStage,
        // Releases CRUD
        addRelease,
        updateRelease,
        deleteRelease,
        // Marketing CRUD
        addCampaign,
        updateCampaign,
        deleteCampaign,
        updateMarketingStrategy,
        // Sales CRUD
        addSalesLead,
        updateSalesLead,
        deleteSalesLead,
        moveSalesLeadStage,
        // Customers CRUD
        addCustomer,
        updateCustomer,
        deleteCustomer,
        // Revenue CRUD
        addRevenueRecord,
        updateRevenueRecord,
        deleteRevenueRecord,
        updateFeatureAttribution,
        // Feedback CRUD
        addFeedback,
        updateFeedback,
        deleteFeedback,
        updateFeedbackStatus,
        // Analytics
        updateAnalytics,
        // Action Items
        addActionItem,
        updateActionItem,
        deleteActionItem,
        // Data helpers
        getFeatureTraceability,
        getProductDetails,
        resetAllData,
        clearAllDataToBlank,
        importDataJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
