// ==========================================
// MESOB PRODUCT MANAGEMENT & REVENUE SYSTEM
// COMPLETE LIFECYCLE TYPE DEFINITIONS
// ==========================================

export type CurrencyType = 'ETB' | 'USD';

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type StatusIndicator = 'green' | 'yellow' | 'red';

// ------------------------------------------
// 1. COMPANY STRATEGY & OKRs
// ------------------------------------------
export interface KPIItem {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  status: StatusIndicator;
}

export interface StrategicObjective {
  id: string;
  title: string;
  businessGoal: string;
  description: string;
  financialTargetETB: number;
  customerTarget: number;
  market: string;
  startDate: string;
  endDate: string;
  owner: string;
  priority: PriorityLevel;
  status: 'Draft' | 'In Progress' | 'Achieved' | 'At Risk' | 'Deferred';
  kpis: KPIItem[];
  linkedProductIds: string[];
  linkedInitiativeIds: string[];
}

// ------------------------------------------
// 2. MARKET & COMPETITOR ANALYSIS
// ------------------------------------------
export interface MarketSegment {
  id: string;
  market: string;
  segment: string;
  customerType: string;
  marketSizeETB: number;
  growthOpportunity: string;
  customerProblem: string;
  marketTrend: string;
  opportunity: string;
  risk: string;
  targetProductIds: string[];
}

export interface Competitor {
  id: string;
  name: string;
  product: string;
  pricingModel: string;
  pricingETB: string;
  features: string[];
  targetCustomers: string;
  strengths: string[];
  weaknesses: string[];
  marketPosition: 'Leader' | 'Challenger' | 'Niche' | 'Follower';
  competingProductIds: string[];
}

// ------------------------------------------
// 3. PRODUCT PORTFOLIO & LIFECYCLE
// ------------------------------------------
export type ProductLifecycleStage =
  | 'Idea'
  | 'Research'
  | 'Validation'
  | 'Planning'
  | 'Development'
  | 'Testing'
  | 'Launch'
  | 'Growth'
  | 'Maturity'
  | 'Retirement';

export interface Product {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  productManager: string;
  businessUnit: string;
  category: 'Hospitality SaaS' | 'FinTech' | 'Logistics' | 'Hotel Management' | 'Enterprise POS';
  targetMarket: string;
  targetCustomer: string;
  pricingModel: 'Monthly SaaS' | 'Per-Transaction + SaaS' | 'Annual License' | 'Tiered Hardware + SaaS';
  costETB: number;
  revenueTargetETB: number;
  currentRevenueETB: number;
  profitMarginPercent: number;
  stage: ProductLifecycleStage;
  launchDate: string;
  status: 'Active' | 'In Development' | 'Planned' | 'Sunset';
  color: string;
}

export interface ProductStrategy {
  id: string;
  productId: string;
  productVision: string;
  productMission: string;
  targetMarket: string;
  targetCustomer: string;
  customerProblem: string;
  valueProposition: string;
  businessModel: string;
  pricingTierSummary: string;
  revenueTargetETB: number;
  customerTarget: number;
  competitiveAdvantage: string;
  strategicGoals: string[];
  kpiGoals: string[];
}

// ------------------------------------------
// 4. PRODUCT ROADMAP HIERARCHY
// ------------------------------------------
export type RoadmapHorizon = 'Now' | 'Next' | 'Later';

export interface Initiative {
  id: string;
  productId: string;
  strategicObjectiveId: string;
  title: string;
  description: string;
  horizon: RoadmapHorizon;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Paused';
  targetQuarter: string; // e.g., '2026 Q1', '2026 Q2'
  progressPercent: number;
  owner: string;
}

export interface Epic {
  id: string;
  initiativeId: string;
  productId: string;
  title: string;
  description: string;
  owner: string;
  status: 'Planning' | 'In Progress' | 'Done';
  progressPercent: number;
  targetQuarter: string;
}

export interface Feature {
  id: string;
  epicId: string;
  productId: string;
  title: string;
  description: string;
  valueProposition: string;
  userStorySummary: string;
  priority: PriorityLevel;
  status: 'Backlog' | 'In Dev' | 'Testing' | 'Ready' | 'Released';
  targetReleaseId?: string;
  estimatedHours: number;
  actualHours: number;
  devProgressPercent: number;
  adoptingCustomers: number;
  revenueImpactETB: number; // Feature Revenue Attribution
  devCostETB: number;
  tags: string[];
  startDate: string;
  endDate: string;
}

export interface UserStory {
  id: string;
  featureId: string;
  title: string;
  persona: string;
  iWantTo: string;
  soThat: string;
  acceptanceCriteria: string[];
  status: 'To Do' | 'In Progress' | 'Done';
}

// ------------------------------------------
// 5. DEVELOPMENT MANAGEMENT (KANBAN & TASKS)
// ------------------------------------------
export type DevKanbanStage =
  | 'BACKLOG'
  | 'TODO'
  | 'IN PROGRESS'
  | 'CODE REVIEW'
  | 'TESTING'
  | 'UAT'
  | 'READY FOR RELEASE'
  | 'RELEASED';

export interface DevTask {
  id: string;
  taskName: string;
  productId: string;
  epicId: string;
  featureId: string;
  userStoryId?: string;
  developer: string;
  priority: PriorityLevel;
  sprint: string;
  estimatedHours: number;
  actualHours: number;
  startDate: string;
  dueDate: string;
  dependencies: string[];
  acceptanceCriteria: string[];
  qaStatus: 'Pending' | 'In QA' | 'Passed' | 'Failed';
  releaseId?: string;
  status: DevKanbanStage;
  progressPercent: number;
}

export interface Sprint {
  id: string;
  name: string;
  productId: string;
  startDate: string;
  endDate: string;
  goal: string;
  status: 'Active' | 'Planning' | 'Completed';
  targetStoryPoints: number;
  completedStoryPoints: number;
}

// ------------------------------------------
// 6. RELEASE MANAGEMENT
// ------------------------------------------
export interface Release {
  id: string;
  version: string;
  productId: string;
  releaseDate: string;
  releaseType: 'Major' | 'Minor' | 'Patch';
  featureIds: string[];
  bugFixes: string[];
  improvements: string[];
  leadDeveloper: string;
  qaStatus: 'Passed' | 'In Progress' | 'Blocked';
  uatStatus: 'Approved' | 'Pending' | 'Changes Requested';
  documentation: string;
  marketingRequired: boolean;
  status: 'Planned' | 'Staging' | 'Released' | 'Delayed';
  changelogNotes: string;
}

// ------------------------------------------
// 7. MARKETING STRATEGY & CAMPAIGNS
// ------------------------------------------
export interface MarketingStrategy {
  id: string;
  productId: string;
  targetMarket: string;
  targetCustomer: string;
  customerProblem: string;
  valueProposition: string;
  marketingObjective: string;
  marketingMessage: string;
  marketingChannels: string[];
  budgetETB: number;
  expectedLeads: number;
  expectedCustomers: number;
  expectedRevenueETB: number;
  startDate: string;
  endDate: string;
}

export interface Campaign {
  id: string;
  campaignName: string;
  productId: string;
  linkedFeatureId?: string;
  targetAudience: string;
  channel: string;
  budgetETB: number;
  startDate: string;
  endDate: string;
  owner: string;
  leadsGenerated: number;
  opportunitiesGenerated: number;
  customersWon: number;
  actualRevenueETB: number;
  costETB: number;
  roiMultiplier: number; // e.g. 3.4x
  status: 'Active' | 'Scheduled' | 'Completed' | 'Paused';
}

// ------------------------------------------
// 8. SALES PIPELINE CRM
// ------------------------------------------
export type SalesStage =
  | 'Lead'
  | 'Qualified'
  | 'Demo'
  | 'Proposal'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export interface SalesLead {
  id: string;
  leadName: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  source: string;
  campaignId?: string;
  productId: string;
  salesperson: string;
  opportunityName: string;
  expectedRevenueETB: number;
  probabilityPercent: number;
  expectedClosingDate: string;
  actualRevenueETB: number;
  customerId?: string;
  subscriptionTier?: string;
  status: SalesStage;
  city: string;
}

// ------------------------------------------
// 9. CUSTOMERS & SUBSCRIPTIONS
// ------------------------------------------
export interface Customer {
  id: string;
  name: string;
  company: string;
  businessType: 'Fine Dining' | 'Cafe & Bistro' | 'Hotel Resort' | 'Fast Food Chain' | 'Traditional Mesob';
  city: string;
  email: string;
  phone: string;
  productId: string;
  subscriptionTier: 'Starter' | 'Growth' | 'Enterprise' | 'Custom';
  mrrETB: number;
  arrETB: number;
  joinedDate: string;
  healthScore: number; // 0 to 100
  churnRisk: 'Low' | 'Medium' | 'High';
  activeFeaturesUsed: string[];
  status: 'Active' | 'At Risk' | 'Churned';
}

// ------------------------------------------
// 10. REVENUE MANAGEMENT & SAAS METRICS
// ------------------------------------------
export interface RevenueRecord {
  id: string;
  month: string;
  year: number;
  productId: string;
  mrrETB: number;
  arrETB: number;
  newMrrETB: number;
  expansionMrrETB: number;
  churnedMrrETB: number;
  targetMrrETB: number;
  customerCount: number;
  arpuETB: number;
  cacETB: number;
  ltvETB: number;
  grossMarginPercent: number;
  marketingRoi: number;
  salesRoi: number;
  churnRatePercent: number;
  retentionRatePercent: number;
}

// ------------------------------------------
// 11. FEATURE-TO-REVENUE ATTRIBUTION
// ------------------------------------------
export interface FeatureRevenueAttribution {
  featureId: string;
  featureName: string;
  productId: string;
  productName: string;
  adoptingCustomersCount: number;
  totalRevenueImpactETB: number;
  monthlyRevenueImpactETB: number;
  developmentCostETB: number;
  developmentHours: number;
  roiRatio: number;
  adoptionPercentage: number;
  strategicCategory: 'Core Driver' | 'High Growth Bet' | 'Utility / Maintenance' | 'Question Mark';
}

// ------------------------------------------
// 12. CUSTOMER FEEDBACK LOOP
// ------------------------------------------
export type FeedbackSource =
  | 'Customer'
  | 'Sales'
  | 'Support'
  | 'Marketing'
  | 'User Interview'
  | 'Survey'
  | 'Review'
  | 'Product Analytics';

export interface CustomerFeedback {
  id: string;
  customerName: string;
  companyName: string;
  source: FeedbackSource;
  productId: string;
  featureId?: string;
  problem: string;
  request: string;
  businessImpact: 'High' | 'Medium' | 'Low';
  frequency: number;
  priority: PriorityLevel;
  relatedRevenueETB: number;
  status: 'New' | 'Under Review' | 'Planned' | 'In Development' | 'Completed' | 'Declined';
  date: string;
  linkedInitiativeId?: string;
}

// ------------------------------------------
// 13. PRODUCT ANALYTICS
// ------------------------------------------
export interface ProductAnalyticsSummary {
  id: string;
  productId: string;
  month: string;
  dau: number;
  mau: number;
  newUsers: number;
  returningUsers: number;
  conversionRatePercent: number;
  retentionRatePercent: number;
  churnRatePercent: number;
  mostUsedFeatures: { featureId: string; name: string; usagePercentage: number }[];
  leastUsedFeatures: { featureId: string; name: string; usagePercentage: number }[];
  weeklyActivityEvents: { day: string; events: number }[];
}

// ------------------------------------------
// 14. EXECUTIVE ACTION ITEMS
// ------------------------------------------
export interface ActionRequiredItem {
  id: string;
  title: string;
  type: 'dev_overdue' | 'campaign_ending' | 'customer_risk' | 'release_ready' | 'feedback_urgent';
  severity: 'critical' | 'warning' | 'info';
  relatedId: string;
  relatedModule: string;
  dueDate?: string;
  description: string;
  assignedTo: string;
}

// ------------------------------------------
// 15. ROLE-BASED ACCESS CONTROL (RBAC)
// ------------------------------------------
export type ModuleKey =
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
  | 'settings'
  | 'access-control';

export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export';

export type RecordScope = 'ALL' | 'TEAM' | 'OWN';

export interface ModulePermission {
  module: ModuleKey;
  actions: PermissionAction[];
  scope: RecordScope;
}

export interface UserRole {
  id: string;
  name: string;
  code: string;
  description: string;
  color: string;
  isSystemDefault?: boolean;
  permissions: ModulePermission[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  roleId: string;
  department: string;
  team: string;
  title: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: UserAccount;
}
