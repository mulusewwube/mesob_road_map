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
// 1. PRODUCTS PORTFOLIO
// ==========================================
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'MesobOrdering',
    code: 'MSB-ORD',
    tagline: 'QR Digital Menu, Table Ordering & Contactless Billing',
    description: 'Cloud-based digital QR ordering platform allowing diners in Ethiopian restaurants and cafes to scan, browse multi-language menus (Amharic/English), place orders directly to kitchen, and pay seamlessly.',
    productManager: 'Yared Hailu',
    businessUnit: 'Hospitality Tech',
    category: 'Hospitality SaaS',
    targetMarket: 'Ethiopia (Addis Ababa, Hawassa, Adama, Bishoftu, Bahir Dar)',
    targetCustomer: 'Fine dining restaurants, premium cafes, rooftop lounges, and bistro chains',
    pricingModel: 'Monthly SaaS',
    costETB: 850000,
    revenueTargetETB: 5000000,
    currentRevenueETB: 3850000,
    profitMarginPercent: 77.9,
    stage: 'Growth',
    launchDate: '2024-03-15',
    status: 'Active',
    color: '#22c55e'
  },
  {
    id: 'prod-2',
    name: 'MesobPOS',
    code: 'MSB-POS',
    tagline: 'High-Velocity Cloud & Offline-First Restaurant POS',
    description: 'Modern touchscreen POS system with split billing, multi-station KDS routing, Ethiopian fiscal printer integration, and real-time sales reporting.',
    productManager: 'Bethlehem Tadesse',
    businessUnit: 'Hospitality Tech',
    category: 'Enterprise POS',
    targetMarket: 'Ethiopia & East Africa',
    targetCustomer: 'High-turnover restaurants, bars, fast-food franchises, multi-branch eateries',
    pricingModel: 'Tiered Hardware + SaaS',
    costETB: 720000,
    revenueTargetETB: 4000000,
    currentRevenueETB: 2750000,
    profitMarginPercent: 73.8,
    stage: 'Growth',
    launchDate: '2024-07-01',
    status: 'Active',
    color: '#3b82f6'
  },
  {
    id: 'prod-3',
    name: 'MesobInventory',
    code: 'MSB-INV',
    tagline: 'Smart Recipe Costing, Stock Tracking & Waste Control',
    description: 'Automated recipe costing, batch tracking, portion control, vendor purchase order management, and real-time food waste minimization engine.',
    productManager: 'Yared Hailu',
    businessUnit: 'Operations Tech',
    category: 'Hospitality SaaS',
    targetMarket: 'Ethiopia (Commercial Food & Beverage)',
    targetCustomer: 'Restaurant chains, hotel F&B departments, central commissaries, caterers',
    pricingModel: 'Monthly SaaS',
    costETB: 450000,
    revenueTargetETB: 2500000,
    currentRevenueETB: 950000,
    profitMarginPercent: 82.0,
    stage: 'Development',
    launchDate: '2026-10-01',
    status: 'In Development',
    color: '#f59e0b'
  },
  {
    id: 'prod-4',
    name: 'MesobPay',
    code: 'MSB-PAY',
    tagline: 'Unified Telebirr, CBE Birr & Card Payment Gateway',
    description: 'Instant contactless QR payment gateway embedded into tables and receipts, auto-reconciling Telebirr, CBE Birr, Awash, and international Visa/Mastercard payments.',
    productManager: 'Mikias Bekele',
    businessUnit: 'FinTech',
    category: 'FinTech',
    targetMarket: 'Ethiopia (Nationwide Merchant Ecosystem)',
    targetCustomer: 'All hospitality and retail merchants adopting cashless transactions',
    pricingModel: 'Per-Transaction + SaaS',
    costETB: 280000,
    revenueTargetETB: 1800000,
    currentRevenueETB: 620000,
    profitMarginPercent: 84.4,
    stage: 'Launch',
    launchDate: '2025-11-15',
    status: 'Active',
    color: '#8b5cf6'
  },
  {
    id: 'prod-5',
    name: 'MesobHotel PMS',
    code: 'MSB-HTL',
    tagline: 'Complete Property Management & Guest Folio Sync',
    description: 'Hotel room management, guest check-in/out, restaurant room-charge syncing, housekeeping status, and booking channel manager.',
    productManager: 'Bethlehem Tadesse',
    businessUnit: 'Hospitality Tech',
    category: 'Hotel Management',
    targetMarket: 'Ethiopia (Bishoftu, Hawassa, Addis Ababa)',
    targetCustomer: 'Boutique hotels, luxury lodges, eco-resorts, and serviced apartments',
    pricingModel: 'Annual License',
    costETB: 600000,
    revenueTargetETB: 3000000,
    currentRevenueETB: 320000,
    profitMarginPercent: 80.0,
    stage: 'Planning',
    launchDate: '2027-01-15',
    status: 'Planned',
    color: '#06b6d4'
  },
  {
    id: 'prod-6',
    name: 'MesobDelivery',
    code: 'MSB-DLV',
    tagline: 'Direct-to-Consumer Restaurant Dispatch & Courier App',
    description: 'Commission-free direct online delivery ordering app with live dispatch tracking and integrated motorcycle driver routing.',
    productManager: 'Mikias Bekele',
    businessUnit: 'Logistics',
    category: 'Logistics',
    targetMarket: 'Addis Ababa (Bole, Kazanchis, CMC, Sarbet)',
    targetCustomer: 'High-volume takeaway restaurants and cloud kitchens',
    pricingModel: 'Monthly SaaS',
    costETB: 350000,
    revenueTargetETB: 1200000,
    currentRevenueETB: 0,
    profitMarginPercent: 65.0,
    stage: 'Validation',
    launchDate: '2027-04-01',
    status: 'Planned',
    color: '#ec4899'
  }
];

// ==========================================
// 2. COMPANY STRATEGIC OBJECTIVES & OKRs
// ==========================================
export const INITIAL_STRATEGY: StrategicObjective[] = [
  {
    id: 'strat-1',
    title: 'Scale Ethiopian Restaurant SaaS Annual Revenue',
    businessGoal: 'Increase recurring subscription and transaction revenue across hospitality software products to dominate the Ethiopian restaurant digitization space.',
    description: 'Accelerate adoption of MesobOrdering, MesobPOS and MesobInventory across premium hospitality hubs in Addis Ababa and major regional cities.',
    financialTargetETB: 15000000,
    customerTarget: 500,
    market: 'Ethiopia',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    owner: 'Dawit Getachew (CEO)',
    priority: 'Critical',
    status: 'In Progress',
    kpis: [
      { id: 'kpi-1', name: 'Annual Recurring Revenue (ARR)', current: 10490000, target: 15000000, unit: 'ETB', trend: 'up', status: 'yellow' },
      { id: 'kpi-2', name: 'Active Paid Customers', current: 420, target: 500, unit: 'Vendors', trend: 'up', status: 'yellow' },
      { id: 'kpi-3', name: 'Lead Conversion Rate', current: 8.2, target: 10.0, unit: '%', trend: 'up', status: 'yellow' },
      { id: 'kpi-4', name: 'Product Adoption Rate', current: 72.4, target: 80.0, unit: '%', trend: 'up', status: 'yellow' },
      { id: 'kpi-5', name: 'Dev Sprint Velocity On-Time', current: 85.0, target: 100.0, unit: '%', trend: 'up', status: 'green' },
      { id: 'kpi-6', name: 'Marketing Blended ROI', current: 3.2, target: 3.0, unit: 'x', trend: 'up', status: 'green' }
    ],
    linkedProductIds: ['prod-1', 'prod-2', 'prod-3', 'prod-4'],
    linkedInitiativeIds: ['init-1', 'init-2', 'init-3']
  },
  {
    id: 'strat-2',
    title: 'Launch MesobOrdering v2.5 Inventory & Recipe Suite',
    businessGoal: 'Enable restaurants to track inventory, calculate dish cost margins in real-time, and eliminate stock theft and wastage.',
    description: 'Fulfill top customer request for integrated recipe costing, raw ingredient deduction on order placement, and automated supplier replenishment.',
    financialTargetETB: 2500000,
    customerTarget: 150,
    market: 'Addis Ababa & Regional Resorts',
    startDate: '2026-04-01',
    endDate: '2026-10-31',
    owner: 'Yared Hailu (Lead PM)',
    priority: 'High',
    status: 'In Progress',
    kpis: [
      { id: 'kpi-7', name: 'Inventory Beta Customer Signups', current: 100, target: 150, unit: 'Clients', trend: 'up', status: 'yellow' },
      { id: 'kpi-8', name: 'Stock Wastage Reduction Claimed', current: 28.5, target: 30.0, unit: '%', trend: 'up', status: 'green' },
      { id: 'kpi-9', name: 'Inventory Feature Adoption', current: 64.0, target: 75.0, unit: '%', trend: 'up', status: 'yellow' }
    ],
    linkedProductIds: ['prod-1', 'prod-3'],
    linkedInitiativeIds: ['init-1']
  },
  {
    id: 'strat-3',
    title: 'Achieve 100% Cashless Payment Integration via MesobPay',
    businessGoal: 'Embed Telebirr SuperApp QR and CBE Birr instant webhook checkout into all MesobPOS and QR Ordering bills.',
    description: 'Provide 3-second instant payment verification for waitstaff, cutting customer checkout time by 75%.',
    financialTargetETB: 1800000,
    customerTarget: 350,
    market: 'Ethiopia',
    startDate: '2026-02-01',
    endDate: '2026-11-30',
    owner: 'Mikias Bekele (FinTech PM)',
    priority: 'High',
    status: 'In Progress',
    kpis: [
      { id: 'kpi-10', name: 'Telebirr/CBE Transaction Volume', current: 48000000, target: 60000000, unit: 'ETB/mo', trend: 'up', status: 'green' },
      { id: 'kpi-11', name: 'Payment Failure / Reversal Rate', current: 0.4, target: 0.5, unit: '%', trend: 'down', status: 'green' }
    ],
    linkedProductIds: ['prod-4', 'prod-1', 'prod-2'],
    linkedInitiativeIds: ['init-3']
  }
];

// ==========================================
// 3. MARKET & COMPETITOR INTELLIGENCE
// ==========================================
export const INITIAL_MARKET_SEGMENTS: MarketSegment[] = [
  {
    id: 'mkt-1',
    market: 'Ethiopia Hospitality',
    segment: 'Tier 1 Fine Dining & Upscale Restaurants',
    customerType: 'Addis Ababa restaurants with >80 seats, average check >1,200 ETB per guest',
    marketSizeETB: 180000000,
    growthOpportunity: 'Rapid modernization, high demand for fast contactless ordering, multi-currency guest billing.',
    customerProblem: 'Slow paper order dispatch, server shortages during peak dinner hours, high inventory shrinkage.',
    marketTrend: 'Shift from paper menu to branded QR tablet experiences and automated recipe inventory tracking.',
    opportunity: 'High willingness to pay 10,000–25,000 ETB/mo SaaS fee for comprehensive POS + Inventory + QR package.',
    risk: 'Demanding uptime requirements; internet latency during power outages.',
    targetProductIds: ['prod-1', 'prod-2', 'prod-3']
  },
  {
    id: 'mkt-2',
    market: 'Ethiopia Hospitality',
    segment: 'Cafes, Bakeries & Quick Service Restaurants (QSR)',
    customerType: 'High-footfall cafes in Bole, Kazanchis, Sarbet, Piazza selling coffee, pastry, fast meals',
    marketSizeETB: 320000000,
    growthOpportunity: 'Massive coffee culture expansion with 2,500+ commercial cafes in Addis Ababa alone.',
    customerProblem: 'Long morning counter queues, manual cash handling delays, lost sales during rush hour.',
    marketTrend: 'Cashless payment preference (Telebirr / CBE Birr) reaching >65% of all retail transactions.',
    opportunity: 'Rapid self-service counter QR ordering with instant Telebirr push notifications.',
    risk: 'Price sensitive; requires low setup costs and intuitive tablet UI for non-technical baristas.',
    targetProductIds: ['prod-1', 'prod-2', 'prod-4']
  },
  {
    id: 'mkt-3',
    market: 'Ethiopia Hospitality',
    segment: 'Hotel & Resort Food & Beverage (F&B)',
    customerType: 'Boutique hotels and lakeside resorts in Bishoftu, Hawassa, Langano, Bahir Dar',
    marketSizeETB: 140000000,
    growthOpportunity: 'Domestic tourism boom requiring integrated room billing and poolside order routing.',
    customerProblem: 'Restaurant tabs not syncing to front desk folio, resulting in uncollected guest balances.',
    marketTrend: 'Demand for unified PMS + POS + QR ordering platforms.',
    opportunity: 'Enterprise contracts with annual upfront billing ranging 150,000 to 450,000 ETB/year.',
    risk: 'Longer enterprise sales cycle (60–90 days) requiring on-site staff training.',
    targetProductIds: ['prod-5', 'prod-2', 'prod-1']
  }
];

export const INITIAL_COMPETITORS: Competitor[] = [
  {
    id: 'comp-1',
    name: 'Legacy Desktop POS Systems (Micros / Local FoxPro)',
    product: 'On-Premise Desktop Server POS',
    pricingModel: 'One-time license + Heavy Annual Maintenance Fee',
    pricingETB: '120,000 ETB upfront + 30,000 ETB/yr maintenance',
    features: ['Offline Database', 'Local Thermal Printing', 'Basic Kitchen Ticket', 'Cash Drawer Trigger'],
    targetCustomers: 'Established large hotels and legacy restaurants',
    strengths: ['Does not require constant internet', 'Familiar to veteran accountants'],
    weaknesses: ['No QR digital ordering', 'No remote mobile analytics', 'No Telebirr/CBE payment bridge', 'Clunky 90s UI', 'Requires expensive on-site server'],
    marketPosition: 'Leader',
    competingProductIds: ['prod-2', 'prod-3']
  },
  {
    id: 'comp-2',
    name: 'Generic International Cloud POS (Toast / Square / Lightspeed)',
    product: 'US/EU Cloud POS & QR Web Apps',
    pricingModel: 'USD Monthly Subscription + USD Processing Fee',
    pricingETB: '$120 - $250 USD / month (~15,000 - 32,000 ETB)',
    features: ['Modern iPad UI', 'Cloud Reporting', 'Kitchen Display System', 'Loyalty App'],
    targetCustomers: 'Expat-managed franchises and international hotel branches',
    strengths: ['Polished aesthetic', 'Extensive third-party marketplace'],
    weaknesses: ['Cannot accept Ethiopian Birr subscriptions easily due to forex limits', 'Zero integration with Telebirr or CBE Birr', 'No Amharic language support', 'No local support team in Addis Ababa'],
    marketPosition: 'Niche',
    competingProductIds: ['prod-1', 'prod-2']
  },
  {
    id: 'comp-3',
    name: 'Manual Paper & Telegram Order Channels',
    product: 'Physical Laminated Menus + Telegram Bot',
    pricingModel: 'Zero software cost, manual labor',
    pricingETB: '0 ETB Software / High labor & waste cost',
    features: ['Physical menus', 'Telegram messenger channel'],
    targetCustomers: 'Small independent eateries',
    strengths: ['Zero software upfront cost', 'Familiar to traditional owners'],
    weaknesses: ['Massive order errors', 'No inventory deduction', 'Uncontrollable food theft & shrinkage', 'Zero customer analytics'],
    marketPosition: 'Follower',
    competingProductIds: ['prod-1', 'prod-4']
  }
];

// ==========================================
// 4. PRODUCT STRATEGIES
// ==========================================
export const INITIAL_PRODUCT_STRATEGIES: ProductStrategy[] = [
  {
    id: 'strat-p1',
    productId: 'prod-1',
    productVision: 'To be the ubiquitous digital operating system for every dining table in East Africa.',
    productMission: 'Empower restaurant guests with instant, beautiful, multi-lingual digital ordering while tripling table turnover and diner satisfaction.',
    targetMarket: 'Addis Ababa, Hawassa, Bishoftu, Adama',
    targetCustomer: 'Upscale dining, cafes, and rooftop restaurants serving tech-forward customers.',
    customerProblem: 'Guests wait 12–18 minutes to flag down a waiter for a menu, order taking, and bill settlement, causing table congestion and lost sales.',
    valueProposition: 'Cut table wait times by 60%, increase average ticket size by 18% via rich photo menus and upsells, and enable instant mobile checkout.',
    businessModel: 'B2B SaaS subscription per location (3,500 – 9,500 ETB/mo) + optional branded hardware stands.',
    pricingTierSummary: 'Starter: 3,500 ETB/mo | Pro: 6,500 ETB/mo | Enterprise Multi-Branch: 12,000 ETB/mo',
    revenueTargetETB: 5000000,
    customerTarget: 350,
    competitiveAdvantage: 'Hyper-localized for Ethiopian payment gateways (Telebirr/CBE Birr), native bilingual Amharic/English toggle, sub-second photo menu loading over 3G/4G.',
    strategicGoals: [
      'Reach 350 active restaurants by Q4 2026',
      'Integrate MesobInventory recipe deductions directly from diner orders',
      'Maintain >99.8% system uptime during peak Ethiopian holiday weekends'
    ],
    kpiGoals: [
      'Monthly Recurring Revenue: 420,000 ETB',
      'Average Table Turnover Rate: +28% reduction in duration',
      'Diner Contactless Order Adoption: >75% of table orders'
    ]
  },
  {
    id: 'strat-p3',
    productId: 'prod-3',
    productVision: 'Eliminate all food waste, theft, and blind costing in commercial hospitality kitchens.',
    productMission: 'Provide head chefs and restaurant owners with surgical precision over dish margins, batch ingredients, and supplier purchase orders.',
    targetMarket: 'Ethiopian F&B Sector & Central Kitchens',
    targetCustomer: 'Restaurant owners who suffer from 15-25% unexplained food cost leakage.',
    customerProblem: 'Owners do not know exact ingredient costs of a burger, tibs, or pasta; chefs over-portion; kitchen staff steal high-value ingredients.',
    valueProposition: 'Real-time recipe costing that automatically deducts grams of beef, cheese, and oil every time an order is placed on MesobOrdering or POS.',
    businessModel: 'Add-on SaaS tier to MesobOrdering & POS (2,500 – 6,000 ETB/mo per location).',
    pricingTierSummary: 'Standard Recipe Costing: 3,000 ETB/mo | Full Warehouse & PO: 6,000 ETB/mo',
    revenueTargetETB: 2500000,
    customerTarget: 150,
    competitiveAdvantage: 'Direct native sync with MesobOrdering and POS without third-party connector plugins; localized for Ethiopian raw ingredient markets.',
    strategicGoals: [
      'Rollout MesobOrdering v2.5 with embedded Recipe Form and Stock Adjustment engine',
      'Acquire 100 paying inventory subscribers within 60 days of launch',
      'Prove minimum 18% food cost savings for pilot restaurants'
    ],
    kpiGoals: [
      'Inventory MRR: 200,000 ETB',
      'Recipe setup completion rate: >80% within 14 days of onboarding'
    ]
  }
];

// ==========================================
// 5. ROADMAP INITIATIVES & EPICS
// ==========================================
export const INITIAL_INITIATIVES: Initiative[] = [
  {
    id: 'init-1',
    productId: 'prod-1',
    strategicObjectiveId: 'strat-2',
    title: 'Restaurant Operations & Smart Inventory Suite (v2.5)',
    description: 'Build end-to-end recipe management, raw stock deduction, supplier purchase orders, and food cost analytics into MesobOrdering.',
    horizon: 'Now',
    status: 'In Progress',
    targetQuarter: '2026 Q3',
    progressPercent: 82,
    owner: 'Yared Hailu'
  },
  {
    id: 'init-2',
    productId: 'prod-2',
    strategicObjectiveId: 'strat-1',
    title: 'Cloud & Offline-First POS Resilience Engine',
    description: 'Ensure POS operates seamlessly during Addis Ababa power and internet outages with local mesh database sync upon reconnection.',
    horizon: 'Now',
    status: 'In Progress',
    targetQuarter: '2026 Q3',
    progressPercent: 90,
    owner: 'Bethlehem Tadesse'
  },
  {
    id: 'init-3',
    productId: 'prod-4',
    strategicObjectiveId: 'strat-3',
    title: 'MesobPay Direct Table QR Payment Integration',
    description: 'Instant settlement webhook and QR display on guest screens with direct Telebirr SuperApp deep-linking.',
    horizon: 'Now',
    status: 'In Progress',
    targetQuarter: '2026 Q3',
    progressPercent: 95,
    owner: 'Mikias Bekele'
  },
  {
    id: 'init-4',
    productId: 'prod-1',
    strategicObjectiveId: 'strat-1',
    title: 'AI Dynamic Menu Engineering & Smart Recommendations',
    description: 'Machine learning model recommending high-margin appetizer and beverage pairings based on customer time of day and party size.',
    horizon: 'Next',
    status: 'Planning',
    targetQuarter: '2026 Q4',
    progressPercent: 20,
    owner: 'Yared Hailu'
  },
  {
    id: 'init-5',
    productId: 'prod-5',
    strategicObjectiveId: 'strat-1',
    title: 'Hotel PMS Room Folio & F&B Billing Bridge',
    description: 'Unified billing bridge between hotel room guests and restaurant dining tabs.',
    horizon: 'Later',
    status: 'Planning',
    targetQuarter: '2027 Q1',
    progressPercent: 10,
    owner: 'Bethlehem Tadesse'
  }
];

export const INITIAL_EPICS: Epic[] = [
  {
    id: 'epic-1',
    initiativeId: 'init-1',
    productId: 'prod-1',
    title: 'Recipe & Ingredient Management',
    description: 'Allow restaurant managers to define recipes, link ingredients with unit weights, and calculate real-time gross margins per dish.',
    owner: 'Dawit Kebede',
    status: 'In Progress',
    progressPercent: 88,
    targetQuarter: '2026 Q3'
  },
  {
    id: 'epic-2',
    initiativeId: 'init-1',
    productId: 'prod-3',
    title: 'Stock Adjustment & Waste Tracking Audit Log',
    description: 'Manager audit log for physical inventory count reconciliation, spoilage logging, and chef comp tracking.',
    owner: 'Selamawit G.',
    status: 'In Progress',
    progressPercent: 75,
    targetQuarter: '2026 Q3'
  },
  {
    id: 'epic-3',
    initiativeId: 'init-2',
    productId: 'prod-2',
    title: 'Multi-Station Kitchen Display System (KDS)',
    description: 'Split food tickets automatically to Grill, Salad, Bar, and Pastry stations with kitchen color-coded timers.',
    owner: 'Natnael Mekonnen',
    status: 'Done',
    progressPercent: 100,
    targetQuarter: '2026 Q2'
  },
  {
    id: 'epic-4',
    initiativeId: 'init-3',
    productId: 'prod-4',
    title: 'Telebirr & CBE Birr Instant Payment Webhook',
    description: 'Sub-second push verification for diner payments directly to server smartwatches and POS screens.',
    owner: 'Yordanos Tesfaye',
    status: 'Done',
    progressPercent: 100,
    targetQuarter: '2026 Q2'
  },
  {
    id: 'epic-5',
    initiativeId: 'init-4',
    productId: 'prod-1',
    title: 'Customer Loyalty Points & SMS Receipt Delivery',
    description: 'Phone number-based diner loyalty program with automated Ethio Telecom SMS receipts and re-engagement vouchers.',
    owner: 'Abebe Bekele',
    status: 'In Progress',
    progressPercent: 45,
    targetQuarter: '2026 Q4'
  }
];

// ==========================================
// 6. FEATURES & USER STORIES
// ==========================================
export const INITIAL_FEATURES: Feature[] = [
  {
    id: 'feat-1',
    epicId: 'epic-1',
    productId: 'prod-1',
    title: 'Recipe Management & Ingredient Costing Form',
    description: 'Comprehensive UI allowing kitchen managers to configure recipes with grams/liters, calculate dish cost margins in ETB, and set price recommendations.',
    valueProposition: 'Gives restaurant owners exact visibility into 100% of their dish margins, preventing underpricing of expensive ingredients.',
    userStorySummary: 'As a restaurant manager, I want to define burger ingredients so that raw materials are automatically calculated and deducted.',
    priority: 'Critical',
    status: 'In Dev',
    targetReleaseId: 'rel-1',
    estimatedHours: 120,
    actualHours: 105,
    devProgressPercent: 88,
    adoptingCustomers: 100,
    revenueImpactETB: 600000,
    devCostETB: 180000,
    tags: ['Inventory', 'Recipe', 'Costing', 'v2.5'],
    startDate: '2026-06-01',
    endDate: '2026-09-25'
  },
  {
    id: 'feat-2',
    epicId: 'epic-1',
    productId: 'prod-1',
    title: 'QR Multi-Language Digital Menu (Amharic & English)',
    description: 'Ultra-fast QR ordering interface with instant toggle between Geez script Amharic and English, rich photos, dietary badges, and modifier selection.',
    valueProposition: 'Diners order in their preferred language in seconds without waiting for waiters, increasing table turnover.',
    userStorySummary: 'As a diner, I want to view the menu in Amharic on my phone so that I can order effortlessly.',
    priority: 'Critical',
    status: 'Released',
    targetReleaseId: 'rel-2',
    estimatedHours: 160,
    actualHours: 155,
    devProgressPercent: 100,
    adoptingCustomers: 250,
    revenueImpactETB: 1200000,
    devCostETB: 240000,
    tags: ['Core', 'QR Menu', 'Amharic', 'UI'],
    startDate: '2024-03-01',
    endDate: '2024-06-30'
  },
  {
    id: 'feat-3',
    epicId: 'epic-4',
    productId: 'prod-4',
    title: 'Real-Time Telebirr & CBE Birr Payment Webhook Bridge',
    description: 'Instant notification on POS and waiter screen when guest completes payment on Telebirr or CBE Birr QR code, auto-closing the table tab.',
    valueProposition: 'Eliminates fake SMS payment scams and cuts waitstaff bill settlement time from 8 minutes to 15 seconds.',
    userStorySummary: 'As a cashier, I want instant confirmation of Telebirr payments so that I can close bills without manual screenshot verification.',
    priority: 'Critical',
    status: 'Released',
    targetReleaseId: 'rel-2',
    estimatedHours: 140,
    actualHours: 130,
    devProgressPercent: 100,
    adoptingCustomers: 210,
    revenueImpactETB: 840000,
    devCostETB: 190000,
    tags: ['FinTech', 'Telebirr', 'CBE', 'Payments'],
    startDate: '2025-08-01',
    endDate: '2025-11-15'
  },
  {
    id: 'feat-4',
    epicId: 'epic-3',
    productId: 'prod-2',
    title: 'Cloud POS & Split Billing Terminal',
    description: 'Fast touchscreen cashier register supporting split bills by seat, item, or percentage, table floor layout maps, and fiscal printer output.',
    valueProposition: 'Speeds up counter service, eliminates order errors, and gives owners real-time sales visibility from their phone.',
    userStorySummary: 'As a restaurant cashier, I want to split a group bill across multiple payment methods easily.',
    priority: 'High',
    status: 'Released',
    targetReleaseId: 'rel-2',
    estimatedHours: 220,
    actualHours: 210,
    devProgressPercent: 100,
    adoptingCustomers: 180,
    revenueImpactETB: 900000,
    devCostETB: 320000,
    tags: ['POS', 'Billing', 'Cashier', 'Receipts'],
    startDate: '2024-04-01',
    endDate: '2024-08-15'
  },
  {
    id: 'feat-5',
    epicId: 'epic-2',
    productId: 'prod-3',
    title: 'Stock Adjustment & Waste Audit Log',
    description: 'Digital ledger recording all physical stock counts, supplier deliveries, kitchen spoilage, and manager override write-offs.',
    valueProposition: 'Stops inventory shrinkage and holds kitchen staff accountable for raw material usage.',
    userStorySummary: 'As a head chef, I want to log spoiled milk and meat so that variance reports reflect true kitchen waste.',
    priority: 'High',
    status: 'In Dev',
    targetReleaseId: 'rel-1',
    estimatedHours: 95,
    actualHours: 80,
    devProgressPercent: 84,
    adoptingCustomers: 90,
    revenueImpactETB: 450000,
    devCostETB: 140000,
    tags: ['Inventory', 'Audit', 'Stock', 'v2.5'],
    startDate: '2026-06-15',
    endDate: '2026-09-30'
  },
  {
    id: 'feat-6',
    epicId: 'epic-5',
    productId: 'prod-1',
    title: 'Customer Loyalty Points & Ethio SMS Receipts',
    description: 'Automatic points accumulation on phone numbers, discount redemption at table QR checkout, and Ethio Telecom SMS receipts.',
    valueProposition: 'Increases repeat diner visits by 24% and builds a direct restaurant customer marketing database.',
    userStorySummary: 'As a regular customer, I want to earn loyalty points on my orders and redeem them for free drinks.',
    priority: 'Medium',
    status: 'Testing',
    targetReleaseId: 'rel-1',
    estimatedHours: 110,
    actualHours: 95,
    devProgressPercent: 86,
    adoptingCustomers: 40,
    revenueImpactETB: 120000,
    devCostETB: 150000,
    tags: ['Marketing', 'Loyalty', 'SMS', 'Retention'],
    startDate: '2026-05-01',
    endDate: '2026-09-20'
  },
  {
    id: 'feat-7',
    epicId: 'epic-3',
    productId: 'prod-2',
    title: 'Multi-Station Kitchen Display System (KDS)',
    description: 'Digital wall-mounted kitchen monitors displaying live orders with target prep time alerts and bump bar integration.',
    valueProposition: 'Eliminates lost paper tickets and synchronizes food output so hot food reaches tables simultaneously.',
    userStorySummary: 'As a kitchen cook, I want to see incoming grill orders on a screen with countdown timers.',
    priority: 'High',
    status: 'Released',
    targetReleaseId: 'rel-2',
    estimatedHours: 130,
    actualHours: 125,
    devProgressPercent: 100,
    adoptingCustomers: 85,
    revenueImpactETB: 425000,
    devCostETB: 180000,
    tags: ['KDS', 'Kitchen', 'Hardware'],
    startDate: '2025-01-10',
    endDate: '2025-04-30'
  },
  {
    id: 'feat-8',
    epicId: 'epic-1',
    productId: 'prod-1',
    title: 'AI Dynamic Menu Upsell & Smart Recommendations',
    description: 'Intelligent pairing recommendations (e.g. suggesting Tej or Habesha Beer when Ordering Kitfo) powered by dining behavior analytics.',
    valueProposition: 'Boosts average check sizes by 14% with automated upsell suggestions on the diner phone.',
    userStorySummary: 'As a diner browsing the menu, I want to see popular drink recommendations that pair well with my main dish.',
    priority: 'Medium',
    status: 'Backlog',
    estimatedHours: 150,
    actualHours: 10,
    devProgressPercent: 6,
    adoptingCustomers: 0,
    revenueImpactETB: 0,
    devCostETB: 200000,
    tags: ['AI', 'Upsell', 'Analytics'],
    startDate: '2026-10-01',
    endDate: '2027-01-15'
  }
];

export const INITIAL_USER_STORIES: UserStory[] = [
  {
    id: 'story-1',
    featureId: 'feat-1',
    title: 'Create Recipe Ingredients and Quantities Form',
    persona: 'Restaurant Head Chef / Manager',
    iWantTo: 'define individual ingredients (e.g. 200g Beef, 1 Brioche Bun, 30g Gouda Cheese, 20ml Sauce) for our signature burger',
    soThat: 'the system calculates the exact food production cost and deducts inventory stock with every customer order.',
    acceptanceCriteria: [
      'Allows adding multiple raw items with metric units (g, kg, ml, L, pcs)',
      'Calculates total cost per plate based on current supplier purchase prices in ETB',
      'Shows real-time Gross Margin % against current menu selling price',
      'Supports optional modifier ingredient additions (e.g., Extra Cheese +50 ETB)'
    ],
    status: 'In Progress'
  },
  {
    id: 'story-2',
    featureId: 'feat-1',
    title: 'Ingredient Field & Unit Conversion Selector',
    persona: 'Kitchen Admin',
    iWantTo: 'select from standardized inventory units with automatic conversions (e.g., grams to kilograms)',
    soThat: 'data entry is foolproof and unit errors do not corrupt inventory counts.',
    acceptanceCriteria: [
      'Dropdown with validated units',
      'Auto-conversion between bulk purchase units (50kg sack) and recipe units (250g)',
      'Validation preventing negative quantities or zero costs'
    ],
    status: 'Done'
  },
  {
    id: 'story-3',
    featureId: 'feat-5',
    title: 'Waste & Spoilage Incident Logger',
    persona: 'Sous Chef',
    iWantTo: 'log damaged or expired raw goods directly from a mobile device',
    soThat: 'management has full transparency on kitchen wastage reasons (expired, burnt, dropped).',
    acceptanceCriteria: [
      'Reason codes: Expired, Burnt in Kitchen, Spilled/Damaged, Staff Meal',
      'Photo attachment option for verification',
      'Updates inventory count immediately and records user timestamp'
    ],
    status: 'In Progress'
  }
];

// ==========================================
// 7. DEVELOPMENT MANAGEMENT (KANBAN & TASKS)
// ==========================================
export const INITIAL_SPRINTS: Sprint[] = [
  {
    id: 'sprint-28',
    name: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
    productId: 'prod-1',
    startDate: '2026-09-01',
    endDate: '2026-09-20',
    goal: 'Finalize Recipe Form, Stock Adjustment Engine, and UAT Testing for MesobOrdering v2.5 release.',
    status: 'Active',
    targetStoryPoints: 48,
    completedStoryPoints: 36
  },
  {
    id: 'sprint-29',
    name: 'Sprint 29: Payment Reconciliation & Offline Sync',
    productId: 'prod-2',
    startDate: '2026-09-21',
    endDate: '2026-10-10',
    goal: 'Enhance offline mesh replication and Telebirr automatic bank settlement reconciliations.',
    status: 'Planning',
    targetStoryPoints: 45,
    completedStoryPoints: 0
  }
];

export const INITIAL_DEV_TASKS: DevTask[] = [
  {
    id: 'task-101',
    taskName: 'Create recipe form component with dynamic ingredient rows',
    productId: 'prod-1',
    epicId: 'epic-1',
    featureId: 'feat-1',
    userStoryId: 'story-1',
    developer: 'Abebe Bekele',
    priority: 'Critical',
    sprint: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
    estimatedHours: 24,
    actualHours: 22,
    startDate: '2026-09-02',
    dueDate: '2026-09-12',
    dependencies: [],
    acceptanceCriteria: ['Dynamic row addition', 'Unit selector', 'Total cost calculation in ETB', 'Form validation'],
    qaStatus: 'Passed',
    releaseId: 'rel-1',
    status: 'TESTING',
    progressPercent: 90
  },
  {
    id: 'task-102',
    taskName: 'Create ingredient unit conversion & search field',
    productId: 'prod-1',
    epicId: 'epic-1',
    featureId: 'feat-1',
    userStoryId: 'story-2',
    developer: 'Dawit Kebede',
    priority: 'High',
    sprint: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
    estimatedHours: 16,
    actualHours: 14,
    startDate: '2026-09-03',
    dueDate: '2026-09-10',
    dependencies: [],
    acceptanceCriteria: ['Instant fuzzy search over 500+ ingredients', 'Auto conversion g -> kg, ml -> L'],
    qaStatus: 'Passed',
    releaseId: 'rel-1',
    status: 'READY FOR RELEASE',
    progressPercent: 100
  },
  {
    id: 'task-103',
    taskName: 'Build stock adjustment deduction ledger & DB triggers',
    productId: 'prod-1',
    epicId: 'epic-2',
    featureId: 'feat-5',
    userStoryId: 'story-3',
    developer: 'Yordanos Tesfaye',
    priority: 'Critical',
    sprint: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
    estimatedHours: 32,
    actualHours: 28,
    startDate: '2026-09-05',
    dueDate: '2026-09-18',
    dependencies: ['task-101'],
    acceptanceCriteria: ['Atomically decrement raw ingredients when dish order is marked PREPARING', 'Rollback if order canceled'],
    qaStatus: 'In QA',
    releaseId: 'rel-1',
    status: 'IN PROGRESS',
    progressPercent: 80
  },
  {
    id: 'task-104',
    taskName: 'Implement waste tracking & spoilage reason codes UI',
    productId: 'prod-3',
    epicId: 'epic-2',
    featureId: 'feat-5',
    userStoryId: 'story-3',
    developer: 'Selamawit G.',
    priority: 'Medium',
    sprint: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
    estimatedHours: 20,
    actualHours: 16,
    startDate: '2026-09-08',
    dueDate: '2026-09-19',
    dependencies: ['task-103'],
    acceptanceCriteria: ['Modal with reason codes', 'Photo upload thumbnail', 'Manager PIN required for write-off >500 ETB'],
    qaStatus: 'In QA',
    releaseId: 'rel-1',
    status: 'CODE REVIEW',
    progressPercent: 75
  },
  {
    id: 'task-105',
    taskName: 'Perform UAT security & load testing with 50 concurrent tables',
    productId: 'prod-1',
    epicId: 'epic-1',
    featureId: 'feat-1',
    developer: 'Natnael Mekonnen',
    priority: 'Critical',
    sprint: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
    estimatedHours: 18,
    actualHours: 8,
    startDate: '2026-09-14',
    dueDate: '2026-09-20',
    dependencies: ['task-101', 'task-103'],
    acceptanceCriteria: ['Simulate 50 tablet orders per second', 'Verify no deadlocks on raw stock counter'],
    qaStatus: 'In QA',
    releaseId: 'rel-1',
    status: 'UAT',
    progressPercent: 50
  },
  {
    id: 'task-106',
    taskName: 'Refactor POS print spooler for Ethiopian fiscal printers (Datecs/Bixolon)',
    productId: 'prod-2',
    epicId: 'epic-3',
    featureId: 'feat-4',
    developer: 'Dawit Kebede',
    priority: 'High',
    sprint: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
    estimatedHours: 25,
    actualHours: 25,
    startDate: '2026-09-01',
    dueDate: '2026-09-08',
    dependencies: [],
    acceptanceCriteria: ['Ethiopian tax authority QR compliance', 'Speed under 0.8 seconds per receipt'],
    qaStatus: 'Passed',
    releaseId: 'rel-1',
    status: 'RELEASED',
    progressPercent: 100
  },
  {
    id: 'task-107',
    taskName: 'Develop Ethio Telecom SMS gateway webhook for loyalty receipts',
    productId: 'prod-1',
    epicId: 'epic-5',
    featureId: 'feat-6',
    developer: 'Abebe Bekele',
    priority: 'Medium',
    sprint: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
    estimatedHours: 18,
    actualHours: 12,
    startDate: '2026-09-10',
    dueDate: '2026-09-18',
    dependencies: [],
    acceptanceCriteria: ['Send SMS within 2 seconds of payment confirmation', 'Include diner loyalty balance'],
    qaStatus: 'In QA',
    releaseId: 'rel-1',
    status: 'TESTING',
    progressPercent: 70
  },
  {
    id: 'task-108',
    taskName: 'Design AI dynamic upsell recommendation engine heuristics',
    productId: 'prod-1',
    epicId: 'epic-1',
    featureId: 'feat-8',
    developer: 'Natnael Mekonnen',
    priority: 'Low',
    sprint: 'Sprint 29: Payment Reconciliation & Offline Sync',
    estimatedHours: 35,
    actualHours: 0,
    startDate: '2026-09-25',
    dueDate: '2026-10-15',
    dependencies: [],
    acceptanceCriteria: ['Frequent itemset mining over past 100k guest checks'],
    qaStatus: 'Pending',
    status: 'TODO',
    progressPercent: 0
  },
  {
    id: 'task-109',
    taskName: 'Backlog: Customer feedback export to PDF & Excel for restaurant owners',
    productId: 'prod-1',
    epicId: 'epic-1',
    featureId: 'feat-1',
    developer: 'Selamawit G.',
    priority: 'Low',
    sprint: 'Sprint 29: Payment Reconciliation & Offline Sync',
    estimatedHours: 12,
    actualHours: 0,
    startDate: '2026-10-01',
    dueDate: '2026-10-10',
    dependencies: [],
    acceptanceCriteria: ['Export monthly feedback summary report'],
    qaStatus: 'Pending',
    status: 'BACKLOG',
    progressPercent: 0
  }
];

// ==========================================
// 8. RELEASE MANAGEMENT
// ==========================================
export const INITIAL_RELEASES: Release[] = [
  {
    id: 'rel-1',
    version: 'MesobOrdering v2.5',
    productId: 'prod-1',
    releaseDate: '2026-09-25',
    releaseType: 'Major',
    featureIds: ['feat-1', 'feat-5', 'feat-6'],
    bugFixes: [
      'Resolved table lock collision when multiple diners scan identical QR simultaneously',
      'Fixed Amharic Geez font rendering clipping on older Android devices',
      'Fixed fiscal printer paper-end error hang on POS bridge'
    ],
    improvements: [
      'New Recipe Costing UI with real-time Gross Margin % calculation',
      'Automatic Raw Ingredient stock deduction on order fulfillment',
      'Stock Adjustment & Waste Tracking audit log for kitchen managers',
      'Brand New Executive Dashboard with live restaurant sales metrics',
      'POS performance optimization: 40% faster split bill calculation'
    ],
    leadDeveloper: 'Abebe Bekele',
    qaStatus: 'In Progress',
    uatStatus: 'Pending',
    documentation: 'https://docs.mesob.et/releases/v2-5-inventory-recipe-guide',
    marketingRequired: true,
    status: 'Staging',
    changelogNotes: 'Flagship Q3 release introducing smart inventory control and automated recipe costing to MesobOrdering.'
  },
  {
    id: 'rel-2',
    version: 'MesobPOS v3.1',
    productId: 'prod-2',
    releaseDate: '2026-08-15',
    releaseType: 'Minor',
    featureIds: ['feat-2', 'feat-3', 'feat-4', 'feat-7'],
    bugFixes: [
      'Fixed currency decimal rounding discrepancy on split checks',
      'Resolved Bluetooth receipt printer disconnect issue during sleep mode'
    ],
    improvements: [
      'Multi-station Kitchen Display System (KDS) routing',
      'Sub-second Telebirr & CBE Birr dynamic QR checkout verification',
      'Offline local mesh sync resilience for internet dropouts'
    ],
    leadDeveloper: 'Dawit Kebede',
    qaStatus: 'Passed',
    uatStatus: 'Approved',
    documentation: 'https://docs.mesob.et/releases/pos-v3-1',
    marketingRequired: true,
    status: 'Released',
    changelogNotes: 'Enhanced speed and reliability for high-turnover restaurant cashiers.'
  },
  {
    id: 'rel-3',
    version: 'MesobPay Gateway v1.2',
    productId: 'prod-4',
    releaseDate: '2026-10-15',
    releaseType: 'Minor',
    featureIds: ['feat-3'],
    bugFixes: [
      'Resolved timeout on Telebirr callback when network connectivity drops'
    ],
    improvements: [
      'Automated daily bank settlement batch reconciliation export',
      'Enhanced cashier smartwatch vibration alerts upon instant payment arrival'
    ],
    leadDeveloper: 'Yordanos Tesfaye',
    qaStatus: 'In Progress',
    uatStatus: 'Pending',
    documentation: 'https://docs.mesob.et/releases/pay-v1-2',
    marketingRequired: false,
    status: 'Planned',
    changelogNotes: 'Payment infrastructure stability upgrade.'
  }
];

// ==========================================
// 9. MARKETING STRATEGY & CAMPAIGNS
// ==========================================
export const INITIAL_MARKETING_STRATEGIES: MarketingStrategy[] = [
  {
    id: 'mkt-strat-1',
    productId: 'prod-1',
    targetMarket: 'Addis Ababa & Regional Resort Cities',
    targetCustomer: 'Restaurant owners, general managers, and head chefs who want higher profits and faster table turnover.',
    customerProblem: 'Owners struggle with 20% food cost leakage, slow waiter table service, and inaccurate paper order tickets.',
    valueProposition: 'The all-in-one Ethiopian restaurant tech stack that cuts food waste, boosts table speed by 60%, and increases monthly profits.',
    marketingObjective: 'Generate 400 qualified restaurant demo requests and sign 80 new recurring subscribers in Q3 2026.',
    marketingMessage: 'Stop guessing your food costs. Turn tables faster and manage your restaurant inventory without losing a single Birr.',
    marketingChannels: ['Direct Field Sales in Bole/Kazanchis', 'Facebook & Instagram Food Service Ads', 'Hospitality Expo Addis', 'Chef Network Word of Mouth'],
    budgetETB: 225000,
    expectedLeads: 650,
    expectedCustomers: 120,
    expectedRevenueETB: 1800000,
    startDate: '2026-06-01',
    endDate: '2026-10-31'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    campaignName: 'Manage your restaurant inventory without losing money',
    productId: 'prod-1',
    linkedFeatureId: 'feat-1',
    targetAudience: 'Restaurant Owners & F&B Managers suffering from high food shrinkage',
    channel: 'Direct B2B Field Demos & Hospitality Seminars (Addis Ababa)',
    budgetETB: 50000,
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    owner: 'Hanna Alemayehu (Head of Growth)',
    leadsGenerated: 180,
    opportunitiesGenerated: 65,
    customersWon: 42,
    actualRevenueETB: 504000,
    costETB: 50000,
    roiMultiplier: 10.08,
    status: 'Active'
  },
  {
    id: 'camp-2',
    campaignName: 'Cut Table Wait Time by 60% with QR Ordering',
    productId: 'prod-1',
    linkedFeatureId: 'feat-2',
    targetAudience: 'High-footfall cafes and trendy lounges in Bole & Kazanchis',
    channel: 'Meta Social Ads (Instagram/Facebook) + In-Person Table Stand Trials',
    budgetETB: 75000,
    startDate: '2026-06-15',
    endDate: '2026-09-15',
    owner: 'Hanna Alemayehu',
    leadsGenerated: 340,
    opportunitiesGenerated: 110,
    customersWon: 68,
    actualRevenueETB: 816000,
    costETB: 75000,
    roiMultiplier: 10.88,
    status: 'Active'
  },
  {
    id: 'camp-3',
    campaignName: 'Never Lose an Order: Offline-First Cloud POS for Addis Cafes',
    productId: 'prod-2',
    linkedFeatureId: 'feat-4',
    targetAudience: 'Busy coffee shops and bakeries experiencing internet and power cuts',
    channel: 'Direct Sales + POS Hardware Bundles',
    budgetETB: 60000,
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    owner: 'Solomon Worku',
    leadsGenerated: 195,
    opportunitiesGenerated: 58,
    customersWon: 38,
    actualRevenueETB: 456000,
    costETB: 60000,
    roiMultiplier: 7.6,
    status: 'Active'
  },
  {
    id: 'camp-4',
    campaignName: 'Instant Cashless: All-in-One Telebirr & CBE Birr Table QR',
    productId: 'prod-4',
    linkedFeatureId: 'feat-3',
    targetAudience: 'Merchants seeking to eliminate POS paper receipt reconciliation',
    channel: 'FinTech Partnership Co-Marketing (Ethio Telecom & CBE)',
    budgetETB: 40000,
    startDate: '2026-08-10',
    endDate: '2026-10-15',
    owner: 'Hanna Alemayehu',
    leadsGenerated: 140,
    opportunitiesGenerated: 44,
    customersWon: 29,
    actualRevenueETB: 290000,
    costETB: 40000,
    roiMultiplier: 7.25,
    status: 'Active'
  }
];

// ==========================================
// 10. SALES CRM PIPELINE
// ==========================================
export const INITIAL_SALES_LEADS: SalesLead[] = [
  {
    id: 'lead-1',
    leadName: 'Chef Roberto Castelli',
    companyName: 'Ristorante Castelli',
    contactEmail: 'info@castellipizza.et',
    contactPhone: '+251 91 123 4567',
    source: 'Direct Field Sales',
    campaignId: 'camp-1',
    productId: 'prod-1',
    salesperson: 'Yonas Mulugeta',
    opportunityName: 'Castelli Fine Dining - MesobOrdering & Recipe Costing Suite',
    expectedRevenueETB: 144000,
    probabilityPercent: 90,
    expectedClosingDate: '2026-09-22',
    actualRevenueETB: 144000,
    subscriptionTier: 'Enterprise',
    status: 'Won',
    city: 'Addis Ababa (Piazza)'
  },
  {
    id: 'lead-2',
    leadName: 'Ato Getachew Belay',
    companyName: '2000 Habesha Cultural Restaurant',
    contactEmail: 'reservations@2000habesha.com',
    contactPhone: '+251 91 234 5678',
    source: 'Campaign: Manage your restaurant inventory',
    campaignId: 'camp-1',
    productId: 'prod-1',
    salesperson: 'Yonas Mulugeta',
    opportunityName: '2000 Habesha - Multi-Station KDS & Inventory Bundle',
    expectedRevenueETB: 220000,
    probabilityPercent: 80,
    expectedClosingDate: '2026-09-28',
    actualRevenueETB: 0,
    subscriptionTier: 'Enterprise',
    status: 'Negotiation',
    city: 'Addis Ababa (Bole)'
  },
  {
    id: 'lead-3',
    leadName: 'W/ro Selamawit Hailu',
    companyName: 'Kaldi’s Coffee (Bole Medhanialem Branch)',
    contactEmail: 'manager.bole@kaldiscoffeegroup.et',
    contactPhone: '+251 91 345 6789',
    source: 'Campaign: Offline-First Cloud POS',
    campaignId: 'camp-3',
    productId: 'prod-2',
    salesperson: 'Solomon Worku',
    opportunityName: 'Kaldis Bole - POS & MesobPay Fast Counter Rollout',
    expectedRevenueETB: 95000,
    probabilityPercent: 70,
    expectedClosingDate: '2026-10-05',
    actualRevenueETB: 0,
    subscriptionTier: 'Growth',
    status: 'Proposal',
    city: 'Addis Ababa (Bole)'
  },
  {
    id: 'lead-4',
    leadName: 'Ato Tadesse Wolde',
    companyName: 'Kuriftu Resort & Spa Bishoftu',
    contactEmail: 'fnb@kurifturesorts.com',
    contactPhone: '+251 91 456 7890',
    source: 'Referral',
    campaignId: 'camp-2',
    productId: 'prod-1',
    salesperson: 'Yonas Mulugeta',
    opportunityName: 'Kuriftu Bishoftu - Poolside & Dining QR Ordering',
    expectedRevenueETB: 360000,
    probabilityPercent: 60,
    expectedClosingDate: '2026-10-15',
    actualRevenueETB: 0,
    subscriptionTier: 'Enterprise',
    status: 'Demo',
    city: 'Bishoftu'
  },
  {
    id: 'lead-5',
    leadName: 'Ato Elias Teshome',
    companyName: 'Gusto Ristorante & Lounge',
    contactEmail: 'elias@gustoaddis.com',
    contactPhone: '+251 91 567 8901',
    source: 'Campaign: Cut Table Wait Time by 60%',
    campaignId: 'camp-2',
    productId: 'prod-1',
    salesperson: 'Mahlet Assefa',
    opportunityName: 'Gusto Addis - QR Ordering + Wine Cellar Inventory',
    expectedRevenueETB: 120000,
    probabilityPercent: 50,
    expectedClosingDate: '2026-10-20',
    actualRevenueETB: 0,
    subscriptionTier: 'Growth',
    status: 'Qualified',
    city: 'Addis Ababa (Kazanchis)'
  },
  {
    id: 'lead-6',
    leadName: 'Ato Henok Mulugeta',
    companyName: 'Tomoca Coffee Kazanchis',
    contactEmail: 'henok@tomocacoffee.et',
    contactPhone: '+251 91 678 9012',
    source: 'Web Inbound Demo Request',
    campaignId: 'camp-4',
    productId: 'prod-4',
    salesperson: 'Mahlet Assefa',
    opportunityName: 'Tomoca Kazanchis - Telebirr QR Stand Checkout',
    expectedRevenueETB: 48000,
    probabilityPercent: 30,
    expectedClosingDate: '2026-10-30',
    actualRevenueETB: 0,
    subscriptionTier: 'Starter',
    status: 'Lead',
    city: 'Addis Ababa (Kazanchis)'
  }
];

// ==========================================
// 11. CUSTOMERS & SUBSCRIPTIONS
// ==========================================
export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Castelli Ristorante',
    company: 'Castelli Restaurant PLC',
    businessType: 'Fine Dining',
    city: 'Addis Ababa (Piazza)',
    email: 'castelli@ethionet.et',
    phone: '+251 91 123 4567',
    productId: 'prod-1',
    subscriptionTier: 'Enterprise',
    mrrETB: 12000,
    arrETB: 144000,
    joinedDate: '2024-04-10',
    healthScore: 96,
    churnRisk: 'Low',
    activeFeaturesUsed: ['feat-1', 'feat-2', 'feat-3', 'feat-4'],
    status: 'Active'
  },
  {
    id: 'cust-2',
    name: 'Savor Addis Restaurant',
    company: 'Savor F&B Group',
    businessType: 'Fine Dining',
    city: 'Addis Ababa (Bole Atlas)',
    email: 'admin@savoraddis.com',
    phone: '+251 91 222 3344',
    productId: 'prod-1',
    subscriptionTier: 'Enterprise',
    mrrETB: 10500,
    arrETB: 126000,
    joinedDate: '2024-05-18',
    healthScore: 92,
    churnRisk: 'Low',
    activeFeaturesUsed: ['feat-2', 'feat-3', 'feat-4'],
    status: 'Active'
  },
  {
    id: 'cust-3',
    name: 'Mamma Mia Italian Restaurant',
    company: 'Mamma Mia Addis PLC',
    businessType: 'Fine Dining',
    city: 'Addis Ababa (Kazanchis)',
    email: 'info@mammamiaaddis.com',
    phone: '+251 91 333 4455',
    productId: 'prod-1',
    subscriptionTier: 'Growth',
    mrrETB: 6500,
    arrETB: 78000,
    joinedDate: '2024-08-01',
    healthScore: 78,
    churnRisk: 'Medium',
    activeFeaturesUsed: ['feat-2', 'feat-3'],
    status: 'Active'
  },
  {
    id: 'cust-4',
    name: 'Boston Day Spa Cafe & Lounge',
    company: 'Boston Health & Spa Ltd',
    businessType: 'Cafe & Bistro',
    city: 'Addis Ababa (Bole)',
    email: 'cafe@bostondayspa.com',
    phone: '+251 91 444 5566',
    productId: 'prod-2',
    subscriptionTier: 'Growth',
    mrrETB: 5500,
    arrETB: 66000,
    joinedDate: '2024-09-12',
    healthScore: 88,
    churnRisk: 'Low',
    activeFeaturesUsed: ['feat-4', 'feat-3'],
    status: 'Active'
  },
  {
    id: 'cust-5',
    name: 'Romina Restaurant & Pastry (4 Kilo)',
    company: 'Romina Pastry PLC',
    businessType: 'Fast Food Chain',
    city: 'Addis Ababa (4 Kilo)',
    email: 'romina4kilo@gmail.com',
    phone: '+251 91 555 6677',
    productId: 'prod-2',
    subscriptionTier: 'Enterprise',
    mrrETB: 14000,
    arrETB: 168000,
    joinedDate: '2024-06-20',
    healthScore: 94,
    churnRisk: 'Low',
    activeFeaturesUsed: ['feat-4', 'feat-7', 'feat-3'],
    status: 'Active'
  },
  {
    id: 'cust-6',
    name: 'Haile Grand Addis Restaurant',
    company: 'Haile Hotels & Resorts',
    businessType: 'Hotel Resort',
    city: 'Addis Ababa (CMC)',
    email: 'fb.grand@hailehotels.et',
    phone: '+251 91 666 7788',
    productId: 'prod-1',
    subscriptionTier: 'Enterprise',
    mrrETB: 18000,
    arrETB: 216000,
    joinedDate: '2025-01-10',
    healthScore: 89,
    churnRisk: 'Low',
    activeFeaturesUsed: ['feat-1', 'feat-2', 'feat-3', 'feat-4', 'feat-7'],
    status: 'Active'
  },
  {
    id: 'cust-7',
    name: 'Bole Mini Bakery & Cafe',
    company: 'Bole Mini Ventures',
    businessType: 'Cafe & Bistro',
    city: 'Addis Ababa (Bole)',
    email: 'bolemini@yahoo.com',
    phone: '+251 91 777 8899',
    productId: 'prod-2',
    subscriptionTier: 'Starter',
    mrrETB: 3500,
    arrETB: 42000,
    joinedDate: '2025-03-05',
    healthScore: 62,
    churnRisk: 'High',
    activeFeaturesUsed: ['feat-4'],
    status: 'At Risk'
  }
];

// ==========================================
// 12. REVENUE MANAGEMENT & SAAS METRICS
// ==========================================
export const INITIAL_REVENUE_HISTORY: RevenueRecord[] = [
  {
    id: 'rev-2026-04',
    month: 'Apr 2026',
    year: 2026,
    productId: 'prod-1',
    mrrETB: 680000,
    arrETB: 8160000,
    newMrrETB: 65000,
    expansionMrrETB: 25000,
    churnedMrrETB: 8000,
    targetMrrETB: 700000,
    customerCount: 360,
    arpuETB: 1888,
    cacETB: 1800,
    ltvETB: 42000,
    grossMarginPercent: 78.5,
    marketingRoi: 3.1,
    salesRoi: 4.8,
    churnRatePercent: 1.2,
    retentionRatePercent: 98.8
  },
  {
    id: 'rev-2026-05',
    month: 'May 2026',
    year: 2026,
    productId: 'prod-1',
    mrrETB: 720000,
    arrETB: 8640000,
    newMrrETB: 50000,
    expansionMrrETB: 30000,
    churnedMrrETB: 6000,
    targetMrrETB: 750000,
    customerCount: 375,
    arpuETB: 1920,
    cacETB: 1750,
    ltvETB: 43500,
    grossMarginPercent: 79.0,
    marketingRoi: 3.2,
    salesRoi: 5.0,
    churnRatePercent: 0.9,
    retentionRatePercent: 99.1
  },
  {
    id: 'rev-2026-06',
    month: 'Jun 2026',
    year: 2026,
    productId: 'prod-1',
    mrrETB: 775000,
    arrETB: 9300000,
    newMrrETB: 70000,
    expansionMrrETB: 35000,
    churnedMrrETB: 9000,
    targetMrrETB: 800000,
    customerCount: 390,
    arpuETB: 1987,
    cacETB: 1700,
    ltvETB: 45000,
    grossMarginPercent: 79.4,
    marketingRoi: 3.3,
    salesRoi: 5.2,
    churnRatePercent: 1.1,
    retentionRatePercent: 98.9
  },
  {
    id: 'rev-2026-07',
    month: 'Jul 2026',
    year: 2026,
    productId: 'prod-1',
    mrrETB: 815000,
    arrETB: 9780000,
    newMrrETB: 62000,
    expansionMrrETB: 38000,
    churnedMrrETB: 7000,
    targetMrrETB: 850000,
    customerCount: 405,
    arpuETB: 2012,
    cacETB: 1650,
    ltvETB: 46200,
    grossMarginPercent: 80.1,
    marketingRoi: 3.4,
    salesRoi: 5.3,
    churnRatePercent: 0.8,
    retentionRatePercent: 99.2
  },
  {
    id: 'rev-2026-08',
    month: 'Aug 2026',
    year: 2026,
    productId: 'prod-1',
    mrrETB: 848000,
    arrETB: 10176000,
    newMrrETB: 55000,
    expansionMrrETB: 42000,
    churnedMrrETB: 8000,
    targetMrrETB: 900000,
    customerCount: 415,
    arpuETB: 2043,
    cacETB: 1600,
    ltvETB: 47800,
    grossMarginPercent: 80.5,
    marketingRoi: 3.5,
    salesRoi: 5.5,
    churnRatePercent: 0.9,
    retentionRatePercent: 99.1
  },
  {
    id: 'rev-2026-09',
    month: 'Sep 2026 (Current)',
    year: 2026,
    productId: 'prod-1',
    mrrETB: 874166, // ~10.49M ETB ARR total across products
    arrETB: 10490000,
    newMrrETB: 78000,
    expansionMrrETB: 45000,
    churnedMrrETB: 5000,
    targetMrrETB: 1000000,
    customerCount: 420,
    arpuETB: 2081,
    cacETB: 1550,
    ltvETB: 49500,
    grossMarginPercent: 81.2,
    marketingRoi: 3.6,
    salesRoi: 5.7,
    churnRatePercent: 0.7,
    retentionRatePercent: 99.3
  }
];

// ==========================================
// 13. FEATURE-TO-REVENUE ATTRIBUTION MATRIX
// (Directly implements Requirement #15)
// ==========================================
export const INITIAL_FEATURE_ATTRIBUTIONS: FeatureRevenueAttribution[] = [
  {
    featureId: 'feat-2',
    featureName: 'QR Multi-Language Ordering & Menu',
    productId: 'prod-1',
    productName: 'MesobOrdering',
    adoptingCustomersCount: 250,
    totalRevenueImpactETB: 1200000,
    monthlyRevenueImpactETB: 100000,
    developmentCostETB: 240000,
    developmentHours: 160,
    roiRatio: 5.0,
    adoptionPercentage: 59.5,
    strategicCategory: 'Core Driver'
  },
  {
    featureId: 'feat-4',
    featureName: 'Cloud POS & Split Billing Terminal',
    productId: 'prod-2',
    productName: 'MesobPOS',
    adoptingCustomersCount: 180,
    totalRevenueImpactETB: 900000,
    monthlyRevenueImpactETB: 75000,
    developmentCostETB: 320000,
    developmentHours: 220,
    roiRatio: 2.81,
    adoptionPercentage: 42.8,
    strategicCategory: 'Core Driver'
  },
  {
    featureId: 'feat-3',
    featureName: 'Telebirr & CBE Birr Payment Bridge',
    productId: 'prod-4',
    productName: 'MesobPay',
    adoptingCustomersCount: 210,
    totalRevenueImpactETB: 840000,
    monthlyRevenueImpactETB: 70000,
    developmentCostETB: 190000,
    developmentHours: 140,
    roiRatio: 4.42,
    adoptionPercentage: 50.0,
    strategicCategory: 'Core Driver'
  },
  {
    featureId: 'feat-1',
    featureName: 'Recipe Management & Inventory Costing',
    productId: 'prod-1',
    productName: 'MesobOrdering',
    adoptingCustomersCount: 100,
    totalRevenueImpactETB: 600000,
    monthlyRevenueImpactETB: 50000,
    developmentCostETB: 180000,
    developmentHours: 120,
    roiRatio: 3.33,
    adoptionPercentage: 23.8,
    strategicCategory: 'High Growth Bet'
  },
  {
    featureId: 'feat-7',
    featureName: 'Multi-Station Kitchen Display System (KDS)',
    productId: 'prod-2',
    productName: 'MesobPOS',
    adoptingCustomersCount: 85,
    totalRevenueImpactETB: 425000,
    monthlyRevenueImpactETB: 35416,
    developmentCostETB: 180000,
    developmentHours: 130,
    roiRatio: 2.36,
    adoptionPercentage: 20.2,
    strategicCategory: 'Utility / Maintenance'
  },
  {
    featureId: 'feat-6',
    featureName: 'Customer Loyalty Points & Ethio SMS',
    productId: 'prod-1',
    productName: 'MesobOrdering',
    adoptingCustomersCount: 40,
    totalRevenueImpactETB: 120000,
    monthlyRevenueImpactETB: 10000,
    developmentCostETB: 150000,
    developmentHours: 110,
    roiRatio: 0.8,
    adoptionPercentage: 9.5,
    strategicCategory: 'Question Mark'
  }
];

// ==========================================
// 14. CUSTOMER FEEDBACK & REQUEST LOOP
// ==========================================
export const INITIAL_FEEDBACK: CustomerFeedback[] = [
  {
    id: 'fb-1',
    customerName: 'Chef Roberto Castelli',
    companyName: 'Ristorante Castelli',
    source: 'Customer',
    productId: 'prod-1',
    featureId: 'feat-1',
    problem: 'Cannot calculate true profit margins on imported Italian cheeses due to fluctuating EUR/ETB exchange rates.',
    request: 'Add auto-cost recalculation field when raw ingredient purchase price changes in inventory.',
    businessImpact: 'High',
    frequency: 18,
    priority: 'Critical',
    relatedRevenueETB: 144000,
    status: 'In Development',
    date: '2026-09-02',
    linkedInitiativeId: 'init-1'
  },
  {
    id: 'fb-2',
    customerName: 'Ato Getachew Belay',
    companyName: '2000 Habesha Cultural Restaurant',
    source: 'Sales',
    productId: 'prod-1',
    featureId: 'feat-1',
    problem: 'Traditional Ethiopian dishes (Tibs, Kitfo, Doro Wat) are cooked in large communal batches, making single-portion ingredient deduction tricky.',
    request: 'Support Batch Cooking recipes where 10kg of meat is pre-cooked and depleted as 40 individual orders are sold.',
    businessImpact: 'High',
    frequency: 24,
    priority: 'High',
    relatedRevenueETB: 220000,
    status: 'Planned',
    date: '2026-09-06',
    linkedInitiativeId: 'init-1'
  },
  {
    id: 'fb-3',
    customerName: 'Ato Henok Mulugeta',
    companyName: 'Tomoca Coffee Kazanchis',
    source: 'Support',
    productId: 'prod-4',
    featureId: 'feat-3',
    problem: 'During morning rush hour, cashiers need audio confirmation when Telebirr payment succeeds so they don’t look down at the screen.',
    request: 'Add sound chime and spoken Amharic voice alert ("ክፍያው ተሳክቷል") on POS speaker upon instant payment confirmation.',
    businessImpact: 'Medium',
    frequency: 31,
    priority: 'Medium',
    relatedRevenueETB: 48000,
    status: 'New',
    date: '2026-09-10'
  },
  {
    id: 'fb-4',
    customerName: 'W/ro Selamawit Hailu',
    companyName: 'Kaldi’s Coffee Bole',
    source: 'User Interview',
    productId: 'prod-2',
    featureId: 'feat-4',
    problem: 'Staff turnover requires baristas to learn POS fast; complicated nested menus slow down ordering.',
    request: 'Speed grid mode with quick buttons for top 8 coffee drinks on main screen.',
    businessImpact: 'High',
    frequency: 15,
    priority: 'High',
    relatedRevenueETB: 95000,
    status: 'Planned',
    date: '2026-09-12'
  }
];

// ==========================================
// 15. PRODUCT ANALYTICS & USAGE
// ==========================================
export const INITIAL_ANALYTICS: ProductAnalyticsSummary = {
  id: 'analytics-p1',
  productId: 'prod-1',
  month: 'September 2026',
  dau: 18450,
  mau: 92300,
  newUsers: 14200,
  returningUsers: 78100,
  conversionRatePercent: 8.2,
  retentionRatePercent: 99.3,
  churnRatePercent: 0.7,
  mostUsedFeatures: [
    { featureId: 'feat-2', name: 'QR Amharic/English Menu Browse', usagePercentage: 94.2 },
    { featureId: 'feat-3', name: 'Telebirr/CBE Birr QR Payment', usagePercentage: 86.8 },
    { featureId: 'feat-4', name: 'Split Bill Calculation', usagePercentage: 68.4 },
    { featureId: 'feat-1', name: 'Recipe & Ingredient Margin View', usagePercentage: 54.1 }
  ],
  leastUsedFeatures: [
    { featureId: 'feat-6', name: 'Loyalty SMS Receipt Voucher', usagePercentage: 18.2 },
    { featureId: 'feat-5', name: 'Manual Spoilage Photo Logger', usagePercentage: 12.6 }
  ],
  weeklyActivityEvents: [
    { day: 'Mon', events: 34200 },
    { day: 'Tue', events: 38900 },
    { day: 'Wed', events: 41200 },
    { day: 'Thu', events: 48500 },
    { day: 'Fri', events: 72400 },
    { day: 'Sat', events: 89100 },
    { day: 'Sun', events: 81600 }
  ]
};

// ==========================================
// 16. EXECUTIVE ACTION REQUIRED ITEMS
// ==========================================
export const INITIAL_ACTION_ITEMS: ActionRequiredItem[] = [
  {
    id: 'act-1',
    title: '5 Overdue / Critical Dev Tasks in Sprint 28 for MesobOrdering v2.5',
    type: 'dev_overdue',
    severity: 'critical',
    relatedId: 'task-103',
    relatedModule: 'Development',
    dueDate: '2026-09-18',
    description: 'Stock adjustment ledger & DB triggers task is blocking UAT release sign-off.',
    assignedTo: 'Yordanos Tesfaye & Natnael Mekonnen'
  },
  {
    id: 'act-2',
    title: '2 Marketing Campaigns Ending This Month (ETB 125,000 Budget)',
    type: 'campaign_ending',
    severity: 'warning',
    relatedId: 'camp-1',
    relatedModule: 'Marketing',
    dueDate: '2026-09-30',
    description: 'Campaign "Manage your restaurant inventory" and "Cut Table Wait Time" reach end of scheduled run; renew or scale budget.',
    assignedTo: 'Hanna Alemayehu'
  },
  {
    id: 'act-3',
    title: '3 High-Priority Customer Feedback Items on Batch Recipe Costing',
    type: 'feedback_urgent',
    severity: 'warning',
    relatedId: 'fb-2',
    relatedModule: 'Feedback',
    description: 'Key enterprise accounts (2000 Habesha & Castelli) requested batch cooking recipe conversion before contract signing.',
    assignedTo: 'Yared Hailu (Lead PM)'
  },
  {
    id: 'act-4',
    title: 'Bole Mini Bakery Customer At Churn Risk (Health Score: 62)',
    type: 'customer_risk',
    severity: 'critical',
    relatedId: 'cust-7',
    relatedModule: 'Customers',
    description: 'Usage dropped 45% over past 14 days due to cashier staff turnover.',
    assignedTo: 'Mahlet Assefa (Customer Success)'
  }
];
