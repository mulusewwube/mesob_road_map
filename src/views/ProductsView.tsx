import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import {
  Product,
  ProductLifecycleStage,
  ProductStrategy
} from '../types';
import {
  Package,
  Layers,
  Sparkles,
  GitPullRequest,
  Rocket,
  Megaphone,
  DollarSign,
  TrendingUp,
  Users,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowRight,
  Target,
  Plus,
  Edit2,
  Trash2,
  ChevronRight
} from 'lucide-react';

const LIFECYCLE_STAGES: ProductLifecycleStage[] = [
  'Idea',
  'Research',
  'Validation',
  'Planning',
  'Development',
  'Testing',
  'Launch',
  'Growth',
  'Maturity',
  'Retirement'
];

export const ProductsView: React.FC = () => {
  const {
    products,
    productStrategies,
    features,
    devTasks,
    releases,
    campaigns,
    salesLeads,
    customers,
    feedback,
    selectedProductFor360,
    setSelectedProductFor360,
    formatMoney,
    formatCompactMoney,
    setActiveView,
    setSelectedFeatureIdForInspect,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStrategy
  } = useApp();

  const [activeTab, setActiveTab] = useState<'portfolio' | '360' | 'strategy'>('portfolio');

  // Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingStrategy, setEditingStrategy] = useState<{ productId: string; strategy: ProductStrategy } | null>(null);

  // Form states for Add / Edit Product
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPM, setFormPM] = useState('Product Manager');
  const [formUnit, setFormUnit] = useState('Hospitality Tech');
  const [formCategory, setFormCategory] = useState<Product['category']>('Hospitality SaaS');
  const [formMarket, setFormMarket] = useState('Ethiopia');
  const [formCustomer, setFormCustomer] = useState('Commercial Restaurants');
  const [formPricing, setFormPricing] = useState<Product['pricingModel']>('Monthly SaaS');
  const [formCost, setFormCost] = useState(500000);
  const [formTarget, setFormTarget] = useState(3000000);
  const [formCurrent, setFormCurrent] = useState(0);
  const [formMargin, setFormMargin] = useState(75);
  const [formStage, setFormStage] = useState<ProductLifecycleStage>('Planning');
  const [formColor, setFormColor] = useState('#22c55e');

  const openAddModal = () => {
    setFormName('');
    setFormCode('');
    setFormTagline('');
    setFormDesc('');
    setFormPM('Lead PM');
    setFormUnit('Core Operations');
    setFormCategory('Hospitality SaaS');
    setFormMarket('Ethiopia');
    setFormCustomer('Restaurants & Cafes');
    setFormPricing('Monthly SaaS');
    setFormCost(400000);
    setFormTarget(2500000);
    setFormCurrent(0);
    setFormMargin(75);
    setFormStage('Planning');
    setFormColor('#22c55e');
    setIsAddProductOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCode(p.code);
    setFormTagline(p.tagline);
    setFormDesc(p.description);
    setFormPM(p.productManager);
    setFormUnit(p.businessUnit);
    setFormCategory(p.category);
    setFormMarket(p.targetMarket);
    setFormCustomer(p.targetCustomer);
    setFormPricing(p.pricingModel);
    setFormCost(p.costETB);
    setFormTarget(p.revenueTargetETB);
    setFormCurrent(p.currentRevenueETB);
    setFormMargin(p.profitMarginPercent);
    setFormStage(p.stage);
    setFormColor(p.color);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCode) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName,
        code: formCode,
        tagline: formTagline,
        description: formDesc,
        productManager: formPM,
        businessUnit: formUnit,
        category: formCategory,
        targetMarket: formMarket,
        targetCustomer: formCustomer,
        pricingModel: formPricing,
        costETB: Number(formCost),
        revenueTargetETB: Number(formTarget),
        currentRevenueETB: Number(formCurrent),
        profitMarginPercent: Number(formMargin),
        stage: formStage,
        color: formColor
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: formName,
        code: formCode,
        tagline: formTagline,
        description: formDesc,
        productManager: formPM,
        businessUnit: formUnit,
        category: formCategory,
        targetMarket: formMarket,
        targetCustomer: formCustomer,
        pricingModel: formPricing,
        costETB: Number(formCost),
        revenueTargetETB: Number(formTarget),
        currentRevenueETB: Number(formCurrent),
        profitMarginPercent: Number(formMargin),
        stage: formStage,
        launchDate: new Date().toISOString().split('T')[0],
        status: formStage === 'Growth' || formStage === 'Maturity' ? 'Active' : 'In Development',
        color: formColor
      });
      setIsAddProductOpen(false);
    }
  };

  const currentProduct = products.find(p => p.id === selectedProductFor360) || products[0];
  const currentStrategy = currentProduct ? productStrategies.find(s => s.productId === currentProduct.id) : null;

  // 360 Aggregations for current product
  const productFeatures = currentProduct ? features.filter(f => f.productId === currentProduct.id) : [];
  const productTasks = currentProduct ? devTasks.filter(t => t.productId === currentProduct.id) : [];
  const productReleases = currentProduct ? releases.filter(r => r.productId === currentProduct.id) : [];
  const productCampaigns = currentProduct ? campaigns.filter(c => c.productId === currentProduct.id) : [];
  const productLeads = currentProduct ? salesLeads.filter(l => l.productId === currentProduct.id) : [];
  const productCustomers = currentProduct ? customers.filter(c => c.productId === currentProduct.id) : [];
  const productFeedback = currentProduct ? feedback.filter(fb => fb.productId === currentProduct.id) : [];

  const getStageColor = (stage: ProductLifecycleStage) => {
    switch (stage) {
      case 'Growth':
        return 'green';
      case 'Development':
      case 'Testing':
        return 'amber';
      case 'Launch':
        return 'purple';
      case 'Planning':
      case 'Validation':
        return 'blue';
      default:
        return 'gray';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Module 6 & 20 • Product Management
            </span>
            <span className="text-xs text-slate-400 font-mono">100% Editable Portfolio</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Product Portfolio & 360° Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Add custom products, edit lifecycle stages, update strategic roadmaps, and track feature monetization.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Portfolio Matrix
            </button>
            <button
              onClick={() => setActiveTab('360')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === '360'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Product 360° Cockpit
            </button>
            <button
              onClick={() => setActiveTab('strategy')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'strategy'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Product Strategy Docs
            </button>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Product
          </button>
        </div>
      </div>

      {/* 10-Stage Lifecycle Visual Pipeline */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 overflow-x-auto">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2.5 flex items-center justify-between">
          <span>Mesob Standard Product Lifecycle (10 Stages)</span>
          <span className="text-emerald-400 font-normal">Live Products Across Stages</span>
        </div>
        <div className="flex items-center gap-1.5 min-w-[760px]">
          {LIFECYCLE_STAGES.map((stage, idx) => {
            const productsInStage = products.filter(p => p.stage === stage);
            const isFilled = productsInStage.length > 0;
            return (
              <div
                key={stage}
                className={`flex-1 p-2.5 rounded-xl border text-center transition-all ${
                  isFilled
                    ? 'bg-slate-900 border-emerald-500/40 shadow-emerald-500/5'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-60'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-400">0{idx + 1}</div>
                <div className={`text-xs font-bold mt-0.5 ${isFilled ? 'text-white' : 'text-slate-400'}`}>
                  {stage}
                </div>
                {isFilled && (
                  <div className="mt-1.5 flex flex-wrap justify-center gap-1">
                    {productsInStage.map(p => (
                      <span
                        key={p.id}
                        onClick={() => {
                          setSelectedProductFor360(p.id);
                          setActiveTab('360');
                        }}
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-pointer hover:bg-emerald-500 hover:text-slate-950 transition-colors"
                      >
                        {p.code}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-3">
          <Package className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white font-display">No Products in Portfolio</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You currently have no products registered. Click "Add Product" above to define your software offerings and connect them to strategy.
          </p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create Your First Product
          </button>
        </div>
      )}

      {/* TAB 1: PRODUCT PORTFOLIO GRID */}
      {activeTab === 'portfolio' && products.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(p => (
              <div
                key={p.id}
                className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="font-mono text-xs font-bold text-white">{p.code}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Badge variant={getStageColor(p.stage)}>{p.stage}</Badge>
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${p.name}?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display group-hover:text-emerald-400 transition-colors">
                    {p.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5">{p.tagline}</div>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">Current Revenue</div>
                      <div className="font-bold text-white mt-0.5">{formatCompactMoney(p.currentRevenueETB)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Revenue Target</div>
                      <div className="font-bold text-emerald-400 mt-0.5">{formatCompactMoney(p.revenueTargetETB)}</div>
                    </div>
                    <div className="mt-1">
                      <div className="text-[10px] text-slate-400">Pricing Model</div>
                      <div className="font-semibold text-slate-200 text-[11px] truncate mt-0.5">{p.pricingModel}</div>
                    </div>
                    <div className="mt-1">
                      <div className="text-[10px] text-slate-400">Profit Margin</div>
                      <div className="font-bold text-purple-400 mt-0.5">{p.profitMarginPercent}%</div>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-400 space-y-1">
                    <div>PM: <strong className="text-slate-200">{p.productManager}</strong> • {p.businessUnit}</div>
                    <div>Market: <span className="text-slate-300">{p.targetMarket}</span></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedProductFor360(p.id);
                      setActiveTab('360');
                    }}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    Open 360° Cockpit <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-slate-500 font-mono">Launch: {p.launchDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGER 360° VIEW */}
      {activeTab === '360' && currentProduct && (
        <div className="space-y-6">
          {/* Product Selector Ribbon */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase font-mono mr-2">Select Product:</span>
            {products.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProductFor360(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  selectedProductFor360 === p.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-glow-brand'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.name} ({p.code})
              </button>
            ))}
          </div>

          {/* Product 360 Command Deck Header */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Product 360° Cockpit
                </span>
                <Badge variant={getStageColor(currentProduct.stage)}>{currentProduct.stage} Stage</Badge>
                <Badge variant="blue">{currentProduct.category}</Badge>
              </div>
              <h2 className="text-2xl font-bold text-white font-display flex items-center gap-2">
                {currentProduct.name} <span className="text-sm font-mono text-slate-400 font-normal">({currentProduct.code})</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{currentProduct.tagline}</p>
            </div>

            <div className="flex flex-col items-start md:items-end text-xs">
              <span className="text-slate-400">Current / Target Revenue</span>
              <div className="text-xl font-extrabold text-white font-display mt-0.5">
                <span className="text-emerald-400">{formatCompactMoney(currentProduct.currentRevenueETB)}</span>
                <span className="text-slate-400 font-normal"> / {formatCompactMoney(currentProduct.revenueTargetETB)}</span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  onClick={() => openEditModal(currentProduct)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1 border border-slate-700"
                >
                  <Edit2 className="w-3 h-3" /> Edit Product
                </button>
              </div>
            </div>
          </div>

          {/* 360 Core Quadrants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. STRATEGY QUADRANT */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono flex items-center gap-1.5">
                <Target className="w-4 h-4" /> 1. Strategy & Market
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400">Target Customer</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{currentProduct.targetCustomer}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Value Proposition</div>
                  <div className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">{currentStrategy?.valueProposition || currentProduct.tagline}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Competitive Advantage</div>
                  <div className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">{currentStrategy?.competitiveAdvantage || 'Direct localized solution'}</div>
                </div>
              </div>
            </div>

            {/* 2. DEVELOPMENT QUADRANT */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono flex items-center gap-1.5">
                <GitPullRequest className="w-4 h-4" /> 2. Engineering & Releases
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Next Release:</span>
                  <span className="font-bold text-amber-400">
                    {productReleases[0]?.version || 'Scheduled'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Active Dev Tasks:</span>
                  <span className="font-bold text-white">{productTasks.length} Tasks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Roadmap Features:</span>
                  <span className="font-bold text-purple-400">{productFeatures.length} Features</span>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setActiveView('development')}
                    className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                  >
                    Open Sprint Board <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. MARKETING & SALES QUADRANT */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                <Megaphone className="w-4 h-4" /> 3. Marketing & Sales
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Active Campaigns:</span>
                  <span className="font-bold text-white">{productCampaigns.length} Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Sales Opportunities:</span>
                  <span className="font-bold text-emerald-400">{productLeads.length} Deals</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Total Leads:</span>
                  <span className="font-bold text-white">{productCampaigns.reduce((acc, c) => acc + c.leadsGenerated, 0)}</span>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setActiveView('sales')}
                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
                  >
                    Open CRM Pipeline <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. CUSTOMER HEALTH & FEEDBACK */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <Users className="w-4 h-4" /> 4. Customers & Feedback
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Paid Clients:</span>
                  <span className="font-bold text-white">{productCustomers.length} Accounts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Open User Feedback:</span>
                  <span className="font-bold text-cyan-400">{productFeedback.length} Requests</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Category:</span>
                  <span className="font-semibold text-slate-300">{currentProduct.category}</span>
                </div>
                <div className="pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setActiveView('feedback')}
                    className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    Triage Feedback Loop <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUCT STRATEGY SPECIFICATION */}
      {activeTab === 'strategy' && currentProduct && currentStrategy && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Strategic Blueprint
                </div>
                <h2 className="text-xl font-bold text-white font-display">
                  {currentProduct.name} Strategy & Vision
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Product Vision</div>
                <p className="text-xs text-slate-200 leading-relaxed">{currentStrategy.productVision}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Product Mission</div>
                <p className="text-xs text-slate-200 leading-relaxed">{currentStrategy.productMission}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-rose-300">Customer Problem</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{currentStrategy.customerProblem}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-emerald-300">Value Proposition</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{currentStrategy.valueProposition}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="font-semibold text-cyan-300">Pricing Tier Summary</div>
                <p className="text-slate-300 text-[11px] leading-relaxed">{currentStrategy.pricingTierSummary}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isAddProductOpen || editingProduct !== null}
        onClose={() => {
          setIsAddProductOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Product'}
        subtitle="Configure product attributes, business unit, lifecycle stage, and financial targets"
      >
        <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Product Name</label>
              <input
                type="text"
                required
                placeholder="e.g. MesobOrdering"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Product Code</label>
              <input
                type="text"
                required
                placeholder="e.g. MSB-ORD"
                value={formCode}
                onChange={e => setFormCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Tagline</label>
            <input
              type="text"
              placeholder="e.g. Digital QR menu and table ordering for restaurants"
              value={formTagline}
              onChange={e => setFormTagline(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Detailed description of product capabilities..."
              value={formDesc}
              onChange={e => setFormDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Product Manager</label>
              <input
                type="text"
                value={formPM}
                onChange={e => setFormPM(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Business Unit</label>
              <input
                type="text"
                value={formUnit}
                onChange={e => setFormUnit(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formCategory}
                onChange={e => setFormCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Hospitality SaaS">Hospitality SaaS</option>
                <option value="Enterprise POS">Enterprise POS</option>
                <option value="FinTech">FinTech</option>
                <option value="Hotel Management">Hotel Management</option>
                <option value="Logistics">Logistics</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Lifecycle Stage</label>
              <select
                value={formStage}
                onChange={e => setFormStage(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {LIFECYCLE_STAGES.map(stg => (
                  <option key={stg} value={stg}>
                    {stg}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Pricing Model</label>
              <select
                value={formPricing}
                onChange={e => setFormPricing(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Monthly SaaS">Monthly SaaS</option>
                <option value="Tiered Hardware + SaaS">Tiered Hardware + SaaS</option>
                <option value="Per-Transaction + SaaS">Per-Transaction + SaaS</option>
                <option value="Annual License">Annual License</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Profit Margin %</label>
              <input
                type="number"
                value={formMargin}
                onChange={e => setFormMargin(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Revenue Target (ETB)</label>
              <input
                type="number"
                value={formTarget}
                onChange={e => setFormTarget(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Current Revenue (ETB)</label>
              <input
                type="number"
                value={formCurrent}
                onChange={e => setFormCurrent(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Annual Cost (ETB)</label>
              <input
                type="number"
                value={formCost}
                onChange={e => setFormCost(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsAddProductOpen(false);
                setEditingProduct(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
