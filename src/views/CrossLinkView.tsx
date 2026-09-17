import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  Network,
  Target,
  Package,
  Milestone,
  Sparkles,
  GitPullRequest,
  Rocket,
  Megaphone,
  DollarSign,
  Users,
  TrendingUp,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Eye,
  Plus
} from 'lucide-react';

export const CrossLinkView: React.FC = () => {
  const {
    features,
    products,
    initiatives,
    strategy,
    devTasks,
    releases,
    campaigns,
    salesLeads,
    customers,
    feedback,
    formatMoney,
    formatCompactMoney,
    setSelectedFeatureIdForInspect,
    setActiveView
  } = useApp();

  const [selectedFeatureId, setSelectedFeatureId] = useState<string>(features[0]?.id || '');

  const selectedFeature = features.find(f => f.id === selectedFeatureId) || features[0];
  const linkedProduct = selectedFeature ? products.find(p => p.id === selectedFeature.productId) : products[0];
  const linkedInitiative = selectedFeature ? initiatives.find(i => i.productId === selectedFeature.productId) : initiatives[0];
  const linkedStrategy = strategy[0];
  const linkedTasks = selectedFeature ? devTasks.filter(t => t.featureId === selectedFeature.id) : [];
  const linkedRelease = selectedFeature ? releases.find(r => r.featureIds.includes(selectedFeature.id)) : undefined;
  const linkedCampaigns = selectedFeature ? campaigns.filter(c => c.linkedFeatureId === selectedFeature.id) : [];
  const linkedLeads = selectedFeature ? salesLeads.filter(l => l.productId === selectedFeature.productId) : [];
  const linkedCustomers = selectedFeature ? customers.filter(c => c.activeFeaturesUsed.includes(selectedFeature.id)) : [];
  const linkedFeedback = selectedFeature ? feedback.filter(fb => fb.featureId === selectedFeature.id) : [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Module 19 • 360° Relational Graph
            </span>
            <span className="text-xs text-slate-400 font-mono">Cross-Module Traceability Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">360° Traceability & Relational Graph</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize the unbroken chain connecting Strategy to Code, Releases, Marketing, Sales, Revenue, and Customers.
          </p>
        </div>

        {/* Feature Selector Dropdown */}
        {features.length > 0 && (
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 self-start sm:self-auto text-xs">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400 font-semibold">Inspect Feature:</span>
            <select
              value={selectedFeature?.id || ''}
              onChange={e => setSelectedFeatureId(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none"
            >
              {features.map(f => (
                <option key={f.id} value={f.id}>
                  {f.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {!selectedFeature ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center border border-purple-500/20">
            <Network className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">No Features in the System Yet</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Create roadmap features and strategy goals to see the live end-to-end 360° lifecycle relational graph.
          </p>
          <button
            onClick={() => setActiveView('roadmap')}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Roadmap Feature
          </button>
        </div>
      ) : (
        /* Traceability Flow Diagram (Requirement #19) */
        <div className="space-y-4">
          {/* Node 1: Strategy */}
          <div className="glass-panel rounded-2xl p-4 border border-rose-500/30 bg-gradient-to-r from-slate-900 to-rose-950/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-rose-400 uppercase font-bold">1. COMPANY STRATEGY & OKR</div>
                  <div className="text-sm font-bold text-white font-display">
                    {linkedStrategy?.title || 'Scale Hospitality SaaS Leadership'}
                  </div>
                </div>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-400">Target: </span>
                <span className="font-bold text-emerald-400">
                  {formatMoney(linkedStrategy?.financialTargetETB || 15000000)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>

          {/* Node 2: Product & Initiative */}
          <div className="glass-panel rounded-2xl p-4 border border-blue-500/30 bg-gradient-to-r from-slate-900 to-blue-950/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-blue-400 uppercase font-bold">
                    2. PRODUCT & INITIATIVE
                  </div>
                  <div className="text-sm font-bold text-white font-display">
                    {linkedProduct?.name || 'Mesob Suite'} ({linkedProduct?.code || 'SAAS'}) • {linkedInitiative?.title || 'Core Product Modernization'}
                  </div>
                </div>
              </div>
              <Badge variant="blue">{linkedProduct?.stage || 'Active'} Stage</Badge>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>

          {/* Node 3: Center Pivot - Feature & Story */}
          <div className="glass-panel rounded-2xl p-5 border border-purple-500/50 bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 shadow-glow-purple">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-purple-400 uppercase font-bold">
                    3. ROADMAP FEATURE SPECIFICATION
                  </div>
                  <div className="text-base font-bold text-white font-display">
                    {selectedFeature.title}
                  </div>
                  <div className="text-xs text-slate-300 italic mt-0.5">
                    "{selectedFeature.userStorySummary || 'Delivers automated workflows for restaurant guests and managers.'}"
                  </div>
                </div>
              </div>

              <div className="text-right text-xs shrink-0">
                <span className="text-slate-400">Attributed ARR: </span>
                <div className="text-lg font-bold text-emerald-400 font-mono">
                  {formatMoney(selectedFeature.revenueImpactETB)}
                </div>
                <span className="text-[11px] text-slate-400">{selectedFeature.adoptingCustomers} Adopting Restaurants</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>

          {/* Node 4: Development Tasks & Release */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono text-blue-400 uppercase font-bold flex items-center gap-1.5">
                <GitPullRequest className="w-3.5 h-3.5" /> 4A. Connected Engineering Tasks ({linkedTasks.length})
              </div>
              <div className="space-y-1.5 text-xs">
                {linkedTasks.length === 0 ? (
                  <div className="text-[11px] text-slate-500 italic p-2">No engineering tasks linked yet</div>
                ) : (
                  linkedTasks.map(t => (
                    <div key={t.id} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <span className="font-medium text-slate-200">{t.taskName}</span>
                      <Badge variant={t.status === 'RELEASED' ? 'green' : 'blue'} size="sm">
                        {t.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" /> 4B. Scheduled Release Version
              </div>
              {linkedRelease ? (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="font-bold text-white text-sm">{linkedRelease.version}</div>
                  <div className="text-slate-400 text-[11px]">
                    Target Date: {linkedRelease.releaseDate} • QA: <strong className="text-emerald-400">{linkedRelease.qaStatus}</strong>
                  </div>
                  <Badge variant="amber">{linkedRelease.status}</Badge>
                </div>
              ) : (
                <div className="p-3 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                  Bundled into next sprint release
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>

          {/* Node 5: Marketing Campaigns & Sales CRM Leads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono text-amber-400 uppercase font-bold flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5" /> 5A. Marketing Campaigns ({linkedCampaigns.length})
              </div>
              <div className="space-y-1.5 text-xs">
                {linkedCampaigns.length === 0 ? (
                  <div className="p-3 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                    No active campaigns attached
                  </div>
                ) : (
                  linkedCampaigns.map(c => (
                    <div key={c.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{c.campaignName}</div>
                        <div className="text-[10px] text-slate-400">{c.leadsGenerated} Leads • {c.customersWon} Won</div>
                      </div>
                      <Badge variant="green">{c.roiMultiplier}x ROI</Badge>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-2">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> 5B. Sales CRM Opportunities ({linkedLeads.length})
              </div>
              <div className="space-y-1.5 text-xs">
                {linkedLeads.length === 0 ? (
                  <div className="p-3 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                    No sales opportunities logged
                  </div>
                ) : (
                  linkedLeads.slice(0, 3).map(l => (
                    <div key={l.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{l.companyName}</div>
                        <div className="text-[10px] text-slate-400">{l.city} • Rep: {l.salesperson.split(' ')[0]}</div>
                      </div>
                      <span className="font-mono font-bold text-emerald-400">{formatCompactMoney(l.expectedRevenueETB)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2">
            <ArrowDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>

          {/* Node 6: Customer Feedback Loop Closure */}
          <div className="glass-panel rounded-2xl p-4 border border-cyan-500/30 bg-gradient-to-r from-slate-900 to-cyan-950/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    6. CUSTOMER SATISFACTION & FEEDBACK LOOP
                  </div>
                  <div className="text-sm font-bold text-white font-display">
                    {linkedCustomers.length} Active Restaurants using feature • {linkedFeedback.length} Feedback tickets closed
                  </div>
                </div>
              </div>
              <Badge variant="cyan">99.3% Retention</Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
