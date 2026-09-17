import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { MetricCard } from '../components/common/MetricCard';
import {
  BarChart3,
  Users,
  Activity,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Flame,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Edit2,
  Plus
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

export const AnalyticsView: React.FC = () => {
  const { analytics, updateAnalytics } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Edit form state
  const [dau, setDau] = useState(analytics.dau || 14200);
  const [mau, setMau] = useState(analytics.mau || 88500);
  const [conversionRate, setConversionRate] = useState(analytics.conversionRatePercent || 8.2);

  const stickinessRatio = mau > 0 ? ((dau / mau) * 100).toFixed(1) : '0.0';

  const handleUpdateTelemetry = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnalytics({
      dau: Number(dau) || 0,
      mau: Number(mau) || 0,
      conversionRatePercent: Number(conversionRate) || 0
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Module 17 • Product Telemetry
            </span>
            <span className="text-xs text-slate-400 font-mono">Usage • Adoption • Retention</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Product Usage & Feature Analytics</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Understand how Ethiopian diners, cashiers, and restaurant managers actually interact with the product suite.
          </p>
        </div>

        <button
          onClick={() => {
            setDau(analytics.dau);
            setMau(analytics.mau);
            setConversionRate(analytics.conversionRatePercent);
            setIsEditModalOpen(true);
          }}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Edit2 className="w-4 h-4" /> Edit Telemetry Metrics
        </button>
      </div>

      {/* Top 4 Usage KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Daily Active Users (DAU)"
          value={analytics.dau.toLocaleString()}
          subtitle="Waiters, Diners & Cashiers"
          change="+18% MoM"
          trend="up"
          icon={<Users className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          title="Monthly Active (MAU)"
          value={analytics.mau.toLocaleString()}
          subtitle="Unique Dining Guests"
          change="+24% MoM"
          trend="up"
          icon={<Activity className="w-4 h-4 text-purple-400" />}
        />
        <MetricCard
          title="Product Stickiness (DAU/MAU)"
          value={`${stickinessRatio}%`}
          subtitle="High Engagement Benchmark"
          trend="up"
          status="green"
          badge="High Retention"
          icon={<ShieldCheck className="w-4 h-4 text-cyan-400" />}
        />
        <MetricCard
          title="Diner Order Conversion"
          value={`${analytics.conversionRatePercent}%`}
          subtitle="Menu Scan to Table Order"
          trend="up"
          status="green"
          icon={<Sparkles className="w-4 h-4 text-amber-400" />}
        />
      </div>

      {/* Weekly Activity Volume Chart & Most/Least Used Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Events */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Weekly Dining & Ordering Event Volume
              </h3>
              <p className="text-xs text-slate-400">Total orders, QR scans, and payments processed per day</p>
            </div>
            <Badge variant="green">Peak: Fri / Sat / Sun</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.weeklyActivityEvents || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [`${val.toLocaleString()} events`, 'Weekly Volume']}
                />
                <Bar dataKey="events" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Usage Heatmap (Most vs Least Used) */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Feature Usage Breakdown (Adoption Ranking)
            </h3>
            <p className="text-xs text-slate-400">Percentage of active restaurants utilizing each capability</p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Most Used */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Most Used Core Features
              </div>
              <div className="space-y-2">
                {(analytics.mostUsedFeatures || []).map(f => (
                  <div key={f.featureId} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-200">
                      <span>{f.name}</span>
                      <span className="font-mono font-bold text-emerald-400">{f.usagePercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{ width: `${f.usagePercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Least Used */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Underutilized / Needs PM Onboarding Attention
              </div>
              <div className="space-y-2">
                {(analytics.leastUsedFeatures || []).map(f => (
                  <div key={f.featureId} className="space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span>{f.name}</span>
                      <span className="font-mono font-bold text-amber-400">{f.usagePercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                      <div
                        className="bg-amber-400 h-full rounded-full"
                        style={{ width: `${f.usagePercentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Telemetry Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product Telemetry & KPIs"
        subtitle="Calibrate live usage analytics, active users, and guest order conversion metrics"
      >
        <form onSubmit={handleUpdateTelemetry} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Daily Active Users (DAU)</label>
              <input
                type="number"
                required
                value={dau}
                onChange={e => setDau(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Monthly Active Users (MAU)</label>
              <input
                type="number"
                required
                value={mau}
                onChange={e => setMau(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Diner Order Conversion (%)</label>
            <input
              type="number"
              step="0.1"
              required
              value={conversionRate}
              onChange={e => setConversionRate(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Save Telemetry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
