import {
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
  ActionRequiredItem
} from '../types';

// ==========================================
// CLEAN PRODUCTION DATA INITIALIZATION
// All lifecycle collections initialized as empty arrays.
// ==========================================

export const INITIAL_PRODUCTS: Product[] = [];

export const INITIAL_STRATEGY: StrategicObjective[] = [];

export const INITIAL_MARKET_SEGMENTS: MarketSegment[] = [];

export const INITIAL_COMPETITORS: Competitor[] = [];

export const INITIAL_PRODUCT_STRATEGIES: ProductStrategy[] = [];

export const INITIAL_INITIATIVES: Initiative[] = [];

export const INITIAL_EPICS: Epic[] = [];

export const INITIAL_FEATURES: Feature[] = [];

export const INITIAL_USER_STORIES: UserStory[] = [];

export const INITIAL_DEV_TASKS: DevTask[] = [];

export const INITIAL_SPRINTS: Sprint[] = [];

export const INITIAL_RELEASES: Release[] = [];

export const INITIAL_MARKETING_STRATEGIES: MarketingStrategy[] = [];

export const INITIAL_CAMPAIGNS: Campaign[] = [];

export const INITIAL_SALES_LEADS: SalesLead[] = [];

export const INITIAL_CUSTOMERS: Customer[] = [];

export const INITIAL_REVENUE_HISTORY: RevenueRecord[] = [];

export const INITIAL_FEATURE_ATTRIBUTIONS: FeatureRevenueAttribution[] = [];

export const INITIAL_FEEDBACK: CustomerFeedback[] = [];

export const INITIAL_ACTION_ITEMS: ActionRequiredItem[] = [];

export const INITIAL_ANALYTICS: ProductAnalyticsSummary = {
  id: 'analytics-prod-1',
  productId: 'prod-1',
  month: 'Q3 2026',
  dau: 0,
  mau: 0,
  newUsers: 0,
  returningUsers: 0,
  conversionRatePercent: 0,
  retentionRatePercent: 0,
  churnRatePercent: 0,
  mostUsedFeatures: [],
  leastUsedFeatures: [],
  weeklyActivityEvents: [
    { day: 'Mon', events: 0 },
    { day: 'Tue', events: 0 },
    { day: 'Wed', events: 0 },
    { day: 'Thu', events: 0 },
    { day: 'Fri', events: 0 },
    { day: 'Sat', events: 0 },
    { day: 'Sun', events: 0 }
  ]
};
