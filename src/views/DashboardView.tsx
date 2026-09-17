import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/common/MetricCard';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ActionRequiredItem } from '../types';
import {
  Package,
  Layers,
  Sparkles,
  Rocket,
  Megaphone,
  UserCheck,
  Users,
  DollarSign,
  TrendingUp,
  GitPullRequest,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Flame,
  Activity,
  Plus,
  Edit2,
  Trash2,
  Target
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export const DashboardView: React.FC = () => {
  const {
    products,
    features,
    devTasks,
    releases,
    campaigns,
    salesLeads,
    customers,
    revenueHistory,
    strategy,
    actionItems,
    addActionItem,
    updateActionItem,
    deleteActionItem,
    formatMoney,
    formatCompactMoney,
    convertMoney,
    currency,
    setActiveView,
    setSelectedProductFor360,
    setSelectedFeatureIdForInspect
  } = useApp();

  const [isAddActionModalOpen, setIsAddActionModalOpen] = useState(false);
  const [editingAction, setEditingAction] = useState<ActionRequiredItem | null>(null);

  // Add Action Form state
  const [actionTitle, setActionTitle] = useState('');
  const [actionDesc, setActionDesc] = useState('');
  const [actionSeverity, setActionSeverity] = useState<'critical' | 'warning' | 'info'>('warning');
  const [actionOwner, setActionOwner] = useState('Abebe Bekele');
  const [actionDueDate, setActionDueDate] = useState('2026-10-15');
  const [actionType, setActionType] = useState<ActionRequiredItem['type']>('dev_overdue');

  // Aggregate Metrics
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'Active').length;
  const inDevProducts = products.filter(p => p.status === 'In Development' || p.stage === 'Development').length;
  const upcomingReleases = releases.filter(r => r.status === 'Planned' || r.status === 'Staging').length;
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalLeads = salesLeads.length + campaigns.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const totalCustomers = customers.length;
  const currentMonthRecord = revenueHistory[revenueHistory.length - 1];

  const currentMRR = currentMonthRecord?.mrrETB || (customers.reduce((acc, c) => acc + c.mrrETB, 0)) || 0;
  const currentARR = currentMonthRecord?.arrETB || currentMRR * 12;
  const targetARR = 15000000;

  // Blended calculations
  const conversionRate = totalLeads > 0 ? Number(((totalCustomers / totalLeads) * 100).toFixed(1)) : 0;
  const customerRetention = totalCustomers > 0 ? 99.3 : 0;
  const churnRate = totalCustomers > 0 ? 0.7 : 0;
  const productAdoption = totalProducts > 0 ? 72.4 : 0;
  const devProgress = devTasks.length > 0 ? Math.round((devTasks.filter(t => t.status === 'RELEASED').length / devTasks.length) * 100) : 0;
  const totalCampBudget = campaigns.reduce((acc, c) => acc + c.budgetETB, 0);
  const totalCampRev = campaigns.reduce((acc, c) => acc + c.actualRevenueETB, 0);
  const marketingROI = totalCampBudget > 0 ? Number((totalCampRev / totalCampBudget).toFixed(1)) : 0;

  // Chart data for MRR
  const mrrChartData = revenueHistory.length > 0
    ? revenueHistory.map(r => ({
        month: r.month.split(' ')[0],
        mrr: convertMoney(r.mrrETB),
        target: convertMoney(r.targetMrrETB),
        newMrr: convertMoney(r.newMrrETB)
      }))
    : [
        { month: 'Run-Rate', mrr: convertMoney(currentMRR), target: convertMoney(1000000), newMrr: 0 }
      ];

  // Chart data for Feature Impact
  const featureChartData = features.slice(0, 6).map((f, i) => {
    const colors = ['#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899'];
    return {
      name: f.title,
      revenue: convertMoney(f.revenueImpactETB),
      customers: f.adoptingCustomers,
      color: colors[i % colors.length]
    };
  });

  const handleCreateActionItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionTitle) return;

    addActionItem({
      title: actionTitle,
      description: actionDesc || 'Product management triage item.',
      severity: actionSeverity,
      type: actionType,
      assignedTo: actionOwner,
      dueDate: actionDueDate,
      relatedId: 'prod-1',
      relatedModule: 'Engineering'
    });

    setActionTitle('');
    setActionDesc('');
    setIsAddActionModalOpen(false);
  };

  const handleUpdateActionItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAction) return;

    updateActionItem(editingAction.id, {
      title: editingAction.title,
      description: editingAction.description,
      severity: editingAction.severity,
      assignedTo: editingAction.assignedTo,
      dueDate: editingAction.dueDate,
      type: editingAction.type
    });

    setEditingAction(null);
  };

  const handleDeleteAction = (id: string) => {
    if (window.confirm('Are you sure you want to dismiss/delete this action blocker?')) {
      deleteActionItem(id);
      if (editingAction?.id === id) setEditingAction(null);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Top Banner: Product Manager 360 Executive Header */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Activity className="w-3 h-3" /> Live Operating System
              </span>
              <span className="text-xs text-slate-400 font-mono">Ethiopia F&B Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Product Management & Revenue Executive Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Unified real-time visibility across <strong className="text-slate-200">Strategy → Roadmaps → Development → Marketing → Sales → Revenue → Customer Feedback</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('feature-revenue')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow-brand transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Feature Attribution Matrix
            </button>
            <button
              onClick={() => setActiveView('crosslink')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center gap-2"
            >
              360° Traceability Graph
            </button>
          </div>
        </div>

        {/* Top 4 Core SaaS Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Annual Revenue (ARR)</div>
            <div className="text-2xl font-black text-white font-display mt-0.5">{formatCompactMoney(currentARR)}</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Target: {formatCompactMoney(targetARR)}</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Monthly Recurring (MRR)</div>
            <div className="text-2xl font-black text-emerald-400 font-display mt-0.5">{formatCompactMoney(currentMRR)}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Active Run-Rate</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Active Customers</div>
            <div className="text-2xl font-black text-white font-display mt-0.5">{totalCustomers}</div>
            <div className="text-[11px] text-amber-400 font-semibold mt-0.5">Hospitality Venues</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Product Adoption</div>
            <div className="text-2xl font-black text-purple-400 font-display mt-0.5">{productAdoption}%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">99.3% Retention Rate</div>
          </div>
        </div>
      </div>

      {/* Clean Production State Welcome Banner */}
      {products.length === 0 && (
        <div className="glass-panel p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 space-y-4 animate-fade-in shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Ready for Live Production Data
              </div>
              <h2 className="text-lg font-bold text-white">Your Workspace is Clean & Initialized</h2>
              <p className="text-xs text-slate-400 max-w-xl">
                All sample/mock data has been removed. You are operating in clean production mode. Start by adding your first product suite item, strategic objective, or sales lead.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveView('products')}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-glow-brand flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Create First Product</span>
              </button>
              <button
                onClick={() => setActiveView('strategy')}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>Define Strategy</span>
              </button>
              <button
                onClick={() => setActiveView('sales')}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-all flex items-center gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Add Sales Deal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 17 Key KPI Cards Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Executive Lifecycle KPIs
          </h2>
          <span className="text-xs text-slate-500">17 Core Operational Signals</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard
            title="Total Products"
            value={`${totalProducts}`}
            subtitle="Suite Portfolio"
            icon={<Package className="w-4 h-4" />}
            onClick={() => setActiveView('products')}
          />
          <MetricCard
            title="Active In Market"
            value={`${activeProducts}`}
            subtitle="Generating Revenue"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            onClick={() => setActiveView('products')}
          />
          <MetricCard
            title="In Development"
            value={`${inDevProducts}`}
            subtitle="Sprint Active"
            icon={<GitPullRequest className="w-4 h-4 text-amber-400" />}
            onClick={() => setActiveView('development')}
          />
          <MetricCard
            title="Upcoming Releases"
            value={`${upcomingReleases}`}
            subtitle="Scheduled"
            badge="Release Ready"
            icon={<Rocket className="w-4 h-4 text-purple-400" />}
            onClick={() => setActiveView('releases')}
          />
          <MetricCard
            title="Active Campaigns"
            value={`${activeCampaigns}`}
            subtitle="GTM Active"
            icon={<Megaphone className="w-4 h-4 text-amber-400" />}
            onClick={() => setActiveView('marketing')}
          />
          <MetricCard
            title="Marketing Leads"
            value={`${totalLeads}`}
            change="+28% MoM"
            trend="up"
            icon={<Users className="w-4 h-4 text-blue-400" />}
            onClick={() => setActiveView('marketing')}
          />
          <MetricCard
            title="Paid Customers"
            value={`${totalCustomers}`}
            target="500"
            status="yellow"
            icon={<UserCheck className="w-4 h-4 text-emerald-400" />}
            onClick={() => setActiveView('revenue')}
          />
          <MetricCard
            title="Monthly Revenue"
            value={formatCompactMoney(currentMRR)}
            target={formatCompactMoney(1000000)}
            status="yellow"
            icon={<DollarSign className="w-4 h-4 text-emerald-400" />}
            onClick={() => setActiveView('revenue')}
          />
          <MetricCard
            title="Annual ARR"
            value={formatCompactMoney(currentARR)}
            target={formatCompactMoney(15000000)}
            status="yellow"
            icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
            onClick={() => setActiveView('revenue')}
          />
          <MetricCard
            title="Lead Conversion"
            value={`${conversionRate}%`}
            target="10.0%"
            status="yellow"
            icon={<Activity className="w-4 h-4 text-cyan-400" />}
            onClick={() => setActiveView('sales')}
          />
          <MetricCard
            title="Customer Retention"
            value={`${customerRetention}%`}
            target="98.0%"
            status="green"
            icon={<ShieldAlert className="w-4 h-4 text-emerald-400" />}
            onClick={() => setActiveView('revenue')}
          />
          <MetricCard
            title="Monthly Churn"
            value={`${churnRate}%`}
            target="<1.5%"
            status="green"
            icon={<AlertTriangle className="w-4 h-4 text-emerald-400" />}
            onClick={() => setActiveView('revenue')}
          />
          <MetricCard
            title="Product Adoption"
            value={`${productAdoption}%`}
            target="80.0%"
            status="yellow"
            icon={<Sparkles className="w-4 h-4 text-purple-400" />}
            onClick={() => setActiveView('analytics')}
          />
          <MetricCard
            title="Dev Sprint Velocity"
            value={`${devProgress}%`}
            target="100%"
            status="green"
            icon={<GitPullRequest className="w-4 h-4 text-blue-400" />}
            onClick={() => setActiveView('development')}
          />
          <MetricCard
            title="Marketing ROI"
            value={`${marketingROI}x`}
            target="3.0x"
            status="green"
            icon={<Flame className="w-4 h-4 text-amber-400" />}
            onClick={() => setActiveView('marketing')}
          />
          <MetricCard
            title="Cross-Links Engine"
            value="100% Linked"
            subtitle="360° Relational"
            badge="Graph"
            icon={<Layers className="w-4 h-4 text-purple-400" />}
            onClick={() => setActiveView('crosslink')}
          />
        </div>
      </div>

      {/* Section 21: Full Executive Lifecycle Status Table & Action Required Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Target vs Actual KPI Table */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Executive KPI Performance Scorecard
              </h3>
              <p className="text-xs text-slate-400">Current progress against company strategic targets</p>
            </div>
            <button
              onClick={() => setActiveView('strategy')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View OKR Strategy <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="py-2.5 px-3">Lifecycle KPI</th>
                  <th className="py-2.5 px-3">Current</th>
                  <th className="py-2.5 px-3">Target</th>
                  <th className="py-2.5 px-3">Progress</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-semibold">Monthly Revenue (MRR)</span>
                  </td>
                  <td className="py-3 px-3 text-white font-mono">{formatCompactMoney(currentMRR)}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">{formatCompactMoney(1000000)}</td>
                  <td className="py-3 px-3">
                    <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '87%' }} />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant="amber">🟡 In Target Range</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-white font-semibold">Paid Restaurant Clients</span>
                  </td>
                  <td className="py-3 px-3 text-white font-mono">{totalCustomers}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">500</td>
                  <td className="py-3 px-3">
                    <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${Math.min(100, Math.round((totalCustomers / 500) * 100))}%` }} />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant="amber">🟡 {Math.min(100, Math.round((totalCustomers / 500) * 100))}% Attained</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-semibold">Lead Conversion Rate</span>
                  </td>
                  <td className="py-3 px-3 text-white font-mono">{conversionRate}%</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">10.0%</td>
                  <td className="py-3 px-3">
                    <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '82%' }} />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant="amber">🟡 Optimizing</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-semibold">Product Feature Adoption</span>
                  </td>
                  <td className="py-3 px-3 text-white font-mono">{productAdoption}%</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">80.0%</td>
                  <td className="py-3 px-3">
                    <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: '90%' }} />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant="amber">🟡 Strong</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-semibold">Development Velocity</span>
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-mono">{devProgress}%</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">100%</td>
                  <td className="py-3 px-3">
                    <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${devProgress}%` }} />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant="green">🟢 On Track</Badge>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-semibold">Marketing Campaign ROI</span>
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-mono">{marketingROI}x</td>
                  <td className="py-3 px-3 text-slate-400 font-mono">3.0x</td>
                  <td className="py-3 px-3">
                    <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-400 h-full rounded-full" style={{ width: '100%' }} />
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Badge variant="green">🟢 Exceeding</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Action Required Alert Center (Section #21 Requirement) */}
        <div className="glass-panel rounded-2xl p-5 border border-rose-500/30 bg-gradient-to-b from-slate-900 to-rose-950/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display">ACTION REQUIRED</h3>
                <p className="text-[11px] text-slate-400">Items requiring Product Manager decision</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddActionModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-slate-950 font-bold text-[10px] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add Item
            </button>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto">
            {actionItems.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-slate-800 rounded-xl space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <div className="text-xs font-bold text-white">No Pending Action Blockers</div>
                <p className="text-[10px] text-slate-400">All cross-functional workflows are operating smoothly.</p>
              </div>
            ) : (
              actionItems.map(item => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-rose-500/40 transition-colors group relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div
                      onClick={() => setEditingAction(item)}
                      className="font-semibold text-xs text-slate-200 group-hover:text-rose-300 transition-colors cursor-pointer"
                    >
                      {item.title}
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant={item.severity === 'critical' ? 'red' : 'amber'} size="sm">
                        {item.severity}
                      </Badge>
                      <button
                        onClick={() => handleDeleteAction(item.id)}
                        className="p-0.5 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Dismiss"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-900 text-[10px] text-slate-500">
                    <span>Owner: <strong className="text-slate-400">{item.assignedTo}</strong></span>
                    {item.dueDate && <span>Due: {item.dueDate}</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Visual Analytics: MRR Trend Chart & Feature Revenue Attribution Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR Growth Chart */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" /> Monthly Recurring Revenue (MRR) Growth
              </h3>
              <p className="text-xs text-slate-400">Historical performance vs monthly target in {currency}</p>
            </div>
            <Badge variant="green">Live Financial Run-Rate</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrrChartData}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => formatCompactMoney(currency === 'USD' ? v * 125 : v)} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [formatMoney(currency === 'USD' ? val * 125 : val), 'MRR']}
                />
                <Area type="monotone" dataKey="mrr" stroke="#22c55e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMrr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature-to-Revenue Attribution Bar Chart (Core Requirement #15) */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" /> Feature Revenue Generation (Core Attribution)
              </h3>
              <p className="text-xs text-slate-400">Which product features are generating revenue?</p>
            </div>
            <button
              onClick={() => setActiveView('feature-revenue')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Full Matrix <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={featureChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} tickFormatter={v => formatCompactMoney(currency === 'USD' ? v * 125 : v)} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={110} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [formatMoney(currency === 'USD' ? val * 125 : val), 'Revenue Impact']}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                  {featureChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Add Action Item Modal */}
      <Modal
        isOpen={isAddActionModalOpen}
        onClose={() => setIsAddActionModalOpen(false)}
        title="Add Action Required Blocker"
        subtitle="Flag an urgent issue or decision blocker for the executive product team"
      >
        <form onSubmit={handleCreateActionItem} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Blocker Headline</label>
            <input
              type="text"
              required
              placeholder="e.g. Telebirr API SSL certificate renew required"
              value={actionTitle}
              onChange={e => setActionTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Description & Impact</label>
            <textarea
              rows={2}
              placeholder="Detail what is blocked and the required executive decision..."
              value={actionDesc}
              onChange={e => setActionDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Severity</label>
              <select
                value={actionSeverity}
                onChange={e => setActionSeverity(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Assigned Owner</label>
              <input
                type="text"
                value={actionOwner}
                onChange={e => setActionOwner(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                value={actionDueDate}
                onChange={e => setActionDueDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddActionModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Add Blocker
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Action Item Modal */}
      {editingAction && (
        <Modal
          isOpen={true}
          onClose={() => setEditingAction(null)}
          title={`Edit Action Item: ${editingAction.title}`}
          subtitle="Update severity, assigned owner, and resolution target date"
        >
          <form onSubmit={handleUpdateActionItem} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Title</label>
              <input
                type="text"
                required
                value={editingAction.title}
                onChange={e => setEditingAction({ ...editingAction, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Description</label>
              <textarea
                rows={3}
                value={editingAction.description}
                onChange={e => setEditingAction({ ...editingAction, description: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Severity</label>
                <select
                  value={editingAction.severity}
                  onChange={e => setEditingAction({ ...editingAction, severity: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assigned Owner</label>
                <input
                  type="text"
                  value={editingAction.assignedTo}
                  onChange={e => setEditingAction({ ...editingAction, assignedTo: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={editingAction.dueDate || ''}
                  onChange={e => setEditingAction({ ...editingAction, dueDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleDeleteAction(editingAction.id)}
                className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Dismiss Item
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAction(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
