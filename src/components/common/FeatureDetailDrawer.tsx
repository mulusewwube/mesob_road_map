import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  GitPullRequest,
  Rocket,
  Megaphone,
  DollarSign,
  Users,
  Target,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Badge } from './Badge';

export const FeatureDetailDrawer: React.FC = () => {
  const {
    selectedFeatureIdForInspect,
    setSelectedFeatureIdForInspect,
    getFeatureTraceability,
    formatMoney,
    setActiveView,
    setSelectedProductId
  } = useApp();

  if (!selectedFeatureIdForInspect) return null;

  const chain = getFeatureTraceability(selectedFeatureIdForInspect);
  if (!chain) return null;

  const {
    feature,
    product,
    epic,
    initiative,
    strategy,
    devTasks,
    release,
    campaigns,
    salesLeads,
    adoptingCustomers,
    feedbackItems,
    revenueAttribution
  } = chain;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
        onClick={() => setSelectedFeatureIdForInspect(null)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-2xl bg-slate-900/95 border-l border-slate-700/80 shadow-2xl h-full flex flex-col z-10 animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {product?.name || 'Product Feature'}
              </span>
              <Badge
                variant={
                  feature.priority === 'Critical'
                    ? 'red'
                    : feature.priority === 'High'
                    ? 'amber'
                    : 'blue'
                }
              >
                {feature.priority} Priority
              </Badge>
              <Badge variant={feature.status === 'Released' ? 'green' : 'purple'}>
                {feature.status}
              </Badge>
            </div>
            <h2 className="text-lg font-bold text-white font-display">{feature.title}</h2>
            <p className="text-xs text-slate-400 mt-1">{feature.valueProposition}</p>
          </div>

          <button
            onClick={() => setSelectedFeatureIdForInspect(null)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Revenue & Adoption Impact Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" /> Feature-to-Revenue Attribution Impact
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="text-[11px] text-slate-400">Attributed Annual Revenue</div>
                <div className="text-base font-bold text-white font-display">
                  {formatMoney(feature.revenueImpactETB)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Adopting Restaurants</div>
                <div className="text-base font-bold text-emerald-400 font-display">
                  {feature.adoptingCustomers} Clients
                </div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400">Dev Cost / ROI</div>
                <div className="text-base font-bold text-white font-display">
                  {revenueAttribution ? `${revenueAttribution.roiRatio.toFixed(1)}x ROI` : '3.3x'}
                </div>
              </div>
            </div>
          </div>

          {/* Upstream Strategic Chain */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-rose-400" /> Upstream Strategic Alignment
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">Goal</span>
                <span className="font-semibold">{strategy?.title || 'Scale Ethiopian SaaS Revenue'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 pl-3 border-l-2 border-slate-800">
                <span className="text-[10px] uppercase font-bold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">Initiative</span>
                <span>{initiative?.title || 'Restaurant Operations Suite'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 pl-6 border-l-2 border-slate-800">
                <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">Epic</span>
                <span>{epic?.title || 'Recipe & Ingredient Management'}</span>
              </div>
            </div>
          </div>

          {/* User Story Specification */}
          <div className="space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> User Story Summary
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 italic">
              "{feature.userStorySummary}"
            </div>
          </div>

          {/* Development Tasks & Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <GitPullRequest className="w-3.5 h-3.5 text-blue-400" /> Connected Dev Tasks ({devTasks.length})
              </div>
              <span className="text-xs text-emerald-400 font-semibold">{feature.devProgressPercent}% Complete</span>
            </div>

            <div className="space-y-1.5">
              {devTasks.length === 0 ? (
                <div className="p-3 text-center text-slate-500 border border-dashed border-slate-800 rounded-lg">
                  No active dev tasks linked yet.
                </div>
              ) : (
                devTasks.map(t => (
                  <div
                    key={t.id}
                    className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-white">{t.taskName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Dev: <strong className="text-slate-300">{t.developer}</strong></span>
                        <span>•</span>
                        <span>Est: {t.estimatedHours}h</span>
                        <span>•</span>
                        <span>QA: <strong className="text-emerald-400">{t.qaStatus}</strong></span>
                      </div>
                    </div>
                    <Badge variant={t.status === 'RELEASED' ? 'green' : t.status === 'IN PROGRESS' ? 'blue' : 'gray'}>
                      {t.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Target Release */}
          {release && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Rocket className="w-3.5 h-3.5 text-amber-400" /> Target Release
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{release.version}</div>
                  <div className="text-[11px] text-slate-400">Launch Date: {release.releaseDate} | Type: {release.releaseType}</div>
                </div>
                <Badge variant="amber">{release.status}</Badge>
              </div>
            </div>
          )}

          {/* Marketing Campaigns Linked */}
          {campaigns.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Megaphone className="w-3.5 h-3.5 text-amber-400" /> Connected Marketing Campaigns
              </div>
              <div className="space-y-1.5">
                {campaigns.map(c => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium text-white">{c.campaignName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Leads: <strong className="text-slate-200">{c.leadsGenerated}</strong> | Won Clients: <strong className="text-emerald-400">{c.customersWon}</strong> | Rev: <strong className="text-white">{formatMoney(c.actualRevenueETB)}</strong>
                      </div>
                    </div>
                    <Badge variant="green">{c.roiMultiplier}x ROI</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Feedback Linked */}
          {feedbackItems.length > 0 && (
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" /> Customer Feedback & Requests ({feedbackItems.length})
              </div>
              <div className="space-y-1.5">
                {feedbackItems.map(fb => (
                  <div key={fb.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">{fb.customerName} ({fb.companyName})</span>
                      <Badge variant="cyan">{fb.status}</Badge>
                    </div>
                    <p className="text-slate-300 text-xs">{fb.problem}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Action */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedFeatureIdForInspect(null);
              setActiveView('crosslink');
            }}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            View Full 360° Relational Graph <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setSelectedFeatureIdForInspect(null)}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
