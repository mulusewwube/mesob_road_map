import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { FeatureRevenueAttribution } from '../types';
import {
  CircleDollarSign,
  Sparkles,
  Users,
  TrendingUp,
  Clock,
  Layers,
  ArrowRight,
  HelpCircle,
  BarChart3,
  Award,
  Zap,
  Target,
  Edit2,
  Trash2,
  Plus
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Cell
} from 'recharts';

export const FeatureRevenueView: React.FC = () => {
  const {
    featureAttributions,
    products,
    formatMoney,
    formatCompactMoney,
    convertMoney,
    currency,
    updateFeatureAttribution,
    setSelectedFeatureIdForInspect
  } = useApp();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [editingAttribution, setEditingAttribution] = useState<FeatureRevenueAttribution | null>(null);

  const filteredAttributions = featureAttributions.filter(
    f => activeCategoryFilter === 'all' || f.strategicCategory === activeCategoryFilter
  );

  const totalFeatureRevenue = featureAttributions.reduce(
    (acc, f) => acc + f.totalRevenueImpactETB,
    0
  );
  const totalDevCost = featureAttributions.reduce((acc, f) => acc + f.developmentCostETB, 0);
  const blendedFeatureROI = totalDevCost > 0 ? (totalFeatureRevenue / totalDevCost).toFixed(1) : '0.0';

  // Scatter plot data for Strategic Value Matrix (Effort vs Revenue)
  const scatterData = featureAttributions.map(f => ({
    name: f.featureName,
    hours: f.developmentHours,
    revenue: convertMoney(f.totalRevenueImpactETB),
    customers: f.adoptingCustomersCount,
    category: f.strategicCategory,
    featureId: f.featureId,
    color:
      f.strategicCategory === 'Core Driver'
        ? '#22c55e'
        : f.strategicCategory === 'High Growth Bet'
        ? '#3b82f6'
        : f.strategicCategory === 'Utility / Maintenance'
        ? '#f59e0b'
        : '#ec4899'
  }));

  const handleUpdateAttribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAttribution) return;

    const rev = Number(editingAttribution.totalRevenueImpactETB) || 0;
    const cost = Number(editingAttribution.developmentCostETB) || 1;
    const roi = cost > 0 ? rev / cost : 0;

    updateFeatureAttribution(editingAttribution.featureId, {
      featureName: editingAttribution.featureName,
      productName: editingAttribution.productName,
      adoptingCustomersCount: Number(editingAttribution.adoptingCustomersCount) || 0,
      adoptionPercentage: Number(editingAttribution.adoptionPercentage) || 0,
      totalRevenueImpactETB: rev,
      monthlyRevenueImpactETB: Math.round(rev / 12),
      developmentCostETB: cost,
      developmentHours: Number(editingAttribution.developmentHours) || 0,
      roiRatio: Number(roi.toFixed(2)),
      strategicCategory: editingAttribution.strategicCategory
    });

    setEditingAttribution(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Module 15 • Core Innovation
            </span>
            <span className="text-xs text-slate-400 font-mono">Revenue ⇋ Development Connection</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Feature-to-Revenue Attribution Matrix</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Definitive visibility into which software features are directly driving customer adoption and SaaS ARR.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeCategoryFilter === 'all'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Features
          </button>
          <button
            onClick={() => setActiveCategoryFilter('Core Driver')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeCategoryFilter === 'Core Driver'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Core Drivers
          </button>
          <button
            onClick={() => setActiveCategoryFilter('High Growth Bet')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeCategoryFilter === 'High Growth Bet'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Growth Bets
          </button>
        </div>
      </div>

      {/* Attribution Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Attributed ARR Impact</div>
          <div className="text-xl font-extrabold text-emerald-400 font-display mt-0.5">
            {formatMoney(totalFeatureRevenue)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Direct Feature Monetization</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Total Engineering Cost</div>
          <div className="text-xl font-bold text-white font-display mt-0.5">
            {formatMoney(totalDevCost)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Cumulative Feature Sprints</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Feature Portfolio ROI</div>
          <div className="text-xl font-bold text-purple-400 font-display mt-0.5">
            {blendedFeatureROI}x Net ROI
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">🟢 Strong Multiplier</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Highest Revenue Feature</div>
          <div className="text-base font-bold text-white mt-0.5 truncate">
            {featureAttributions[0]?.featureName || 'QR Ordering'}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {featureAttributions[0]?.adoptingCustomersCount || 250} Adopting Restaurants
          </div>
        </div>
      </div>

      {/* Requirement #15 Standard Feature Revenue Impact Table */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Feature Revenue & Adoption Breakdown (Requirement #15)
            </h3>
            <p className="text-xs text-slate-400">
              Click any feature row to inspect its connected roadmap, tasks, releases, and campaigns or click edit to update values
            </p>
          </div>
          <Badge variant="green">Live Attribution Active</Badge>
        </div>

        {featureAttributions.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl space-y-2">
            <Sparkles className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-sm font-bold text-white">No Feature Attributions Available</div>
            <p className="text-xs text-slate-400">Create features in the Roadmap to automatically attribute customer adoption and recurring revenue.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="py-3 px-3">Product Feature</th>
                  <th className="py-3 px-3">Product Line</th>
                  <th className="py-3 px-3">Adopting Clients</th>
                  <th className="py-3 px-3">Adoption %</th>
                  <th className="py-3 px-3">Revenue Impact ({currency})</th>
                  <th className="py-3 px-3">Dev Cost & Hours</th>
                  <th className="py-3 px-3">Feature ROI</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredAttributions.map(item => (
                  <tr
                    key={item.featureId}
                    className="hover:bg-slate-800/40 transition-colors group"
                  >
                    <td
                      onClick={() => setSelectedFeatureIdForInspect(item.featureId)}
                      className="py-3.5 px-3 cursor-pointer"
                    >
                      <div className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        {item.featureName}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-300">{item.productName}</td>
                    <td className="py-3.5 px-3 font-semibold text-white">
                      {item.adoptingCustomersCount} Restaurants
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-300">{item.adoptionPercentage}%</span>
                        <div className="w-16 bg-slate-800 rounded-full h-1.5">
                          <div
                            className="bg-emerald-400 h-full rounded-full"
                            style={{ width: `${item.adoptionPercentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-extrabold text-emerald-400 text-sm">
                      {formatMoney(item.totalRevenueImpactETB)}
                    </td>
                    <td className="py-3.5 px-3 text-slate-300 font-mono">
                      {formatCompactMoney(item.developmentCostETB)} ({item.developmentHours}h)
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge
                        variant={
                          item.roiRatio >= 4.0 ? 'green' : item.roiRatio >= 2.0 ? 'blue' : 'amber'
                        }
                      >
                        {item.roiRatio.toFixed(2)}x
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge
                        variant={
                          item.strategicCategory === 'Core Driver'
                            ? 'green'
                            : item.strategicCategory === 'High Growth Bet'
                            ? 'purple'
                            : item.strategicCategory === 'Utility / Maintenance'
                            ? 'amber'
                            : 'red'
                        }
                      >
                        {item.strategicCategory}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => setEditingAttribution(item)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors inline-flex items-center gap-1 text-[11px]"
                        title="Edit Attribution"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Strategic 2x2 Value Matrix: Revenue Impact vs Engineering Effort */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" /> Strategic Feature Value Matrix (Effort vs Revenue Impact)
            </h3>
            <p className="text-xs text-slate-400">
              Identify Quick Wins, Strategic Core Drivers, High Growth Bets, and Maintenance items
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">X: Dev Hours • Y: Revenue Impact ({currency})</span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                dataKey="hours"
                name="Development Hours"
                unit="h"
                stroke="#64748b"
                fontSize={11}
              />
              <YAxis
                type="number"
                dataKey="revenue"
                name="Revenue Impact"
                stroke="#64748b"
                fontSize={11}
                tickFormatter={v => formatCompactMoney(currency === 'USD' ? v * 125 : v)}
              />
              <ZAxis type="number" dataKey="customers" range={[100, 500]} name="Adopting Clients" />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                formatter={(val: any, name: any) => {
                  if (name === 'Revenue Impact') return [formatMoney(currency === 'USD' ? val * 125 : val), name];
                  return [val, name];
                }}
              />
              <Scatter name="Features" data={scatterData}>
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Edit Attribution Modal */}
      {editingAttribution && (
        <Modal
          isOpen={true}
          onClose={() => setEditingAttribution(null)}
          title={`Edit Attribution: ${editingAttribution.featureName}`}
          subtitle="Adjust customer adoption numbers, revenue impact, development cost, and strategic category"
        >
          <form onSubmit={handleUpdateAttribution} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Feature Name</label>
              <input
                type="text"
                required
                value={editingAttribution.featureName}
                onChange={e => setEditingAttribution({ ...editingAttribution, featureName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Total Revenue Impact (ETB)</label>
                <input
                  type="number"
                  required
                  value={editingAttribution.totalRevenueImpactETB}
                  onChange={e => setEditingAttribution({ ...editingAttribution, totalRevenueImpactETB: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Development Cost (ETB)</label>
                <input
                  type="number"
                  required
                  value={editingAttribution.developmentCostETB}
                  onChange={e => setEditingAttribution({ ...editingAttribution, developmentCostETB: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Adopting Clients</label>
                <input
                  type="number"
                  value={editingAttribution.adoptingCustomersCount}
                  onChange={e => setEditingAttribution({ ...editingAttribution, adoptingCustomersCount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Adoption %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingAttribution.adoptionPercentage}
                  onChange={e => setEditingAttribution({ ...editingAttribution, adoptionPercentage: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Dev Hours</label>
                <input
                  type="number"
                  value={editingAttribution.developmentHours}
                  onChange={e => setEditingAttribution({ ...editingAttribution, developmentHours: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Strategic Category</label>
              <select
                value={editingAttribution.strategicCategory}
                onChange={e => setEditingAttribution({ ...editingAttribution, strategicCategory: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Core Driver">Core Driver (High Revenue & Adoption)</option>
                <option value="High Growth Bet">High Growth Bet (Rapid Expansion)</option>
                <option value="Utility / Maintenance">Utility / Maintenance (Table Stakes)</option>
                <option value="Experimental">Experimental</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setEditingAttribution(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
              >
                Save Attribution
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
