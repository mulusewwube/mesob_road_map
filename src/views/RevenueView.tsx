import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { MetricCard } from '../components/common/MetricCard';
import { Customer, RevenueRecord } from '../types';
import {
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as PieChartIcon,
  Layers,
  Sparkles,
  Calculator,
  ArrowRight,
  Plus,
  Edit2,
  Trash2,
  Building2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

export const RevenueView: React.FC = () => {
  const {
    revenueHistory,
    products,
    customers,
    currency,
    formatMoney,
    formatCompactMoney,
    convertMoney,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addRevenueRecord,
    updateRevenueRecord,
    deleteRevenueRecord,
    setActiveView
  } = useApp();

  const [forecastGrowthPercent, setForecastGrowthPercent] = useState<number>(15);

  // Modals state
  const [isAddCustModalOpen, setIsAddCustModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isAddRevModalOpen, setIsAddRevModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RevenueRecord | null>(null);

  // Customer Form state
  const [custName, setCustName] = useState('');
  const [custBusinessType, setCustBusinessType] = useState<'Fine Dining' | 'Cafe & Bistro' | 'Hotel Resort' | 'Fast Food Chain' | 'Traditional Mesob'>('Traditional Mesob');
  const [custCity, setCustCity] = useState('Addis Ababa (Bole)');
  const [custTier, setCustTier] = useState<'Starter' | 'Growth' | 'Enterprise' | 'Custom'>('Growth');
  const [custMrr, setCustMrr] = useState(2500);
  const [custHealth, setCustHealth] = useState(90);

  // Revenue Record Form state
  const [revMonth, setRevMonth] = useState('Sep 2026');
  const [revMrr, setRevMrr] = useState(874166);
  const [revTarget, setRevTarget] = useState(1000000);
  const [revNewMrr, setRevNewMrr] = useState(78000);
  const [revExpMrr, setRevExpMrr] = useState(45000);
  const [revChurnMrr, setRevChurnMrr] = useState(5000);

  const currentMonth = revenueHistory[revenueHistory.length - 1];
  const mrr = currentMonth?.mrrETB || (customers.reduce((acc, c) => acc + c.mrrETB, 0)) || 0;
  const arr = currentMonth?.arrETB || mrr * 12;
  const newMrr = currentMonth?.newMrrETB || 0;
  const expansionMrr = currentMonth?.expansionMrrETB || 0;
  const churnedMrr = currentMonth?.churnedMrrETB || 0;
  const netNewMrr = newMrr + expansionMrr - churnedMrr;

  const arpu = currentMonth?.arpuETB || (customers.length > 0 ? Math.round(mrr / customers.length) : 0);
  const cac = currentMonth?.cacETB || 0;
  const ltv = currentMonth?.ltvETB || 0;
  const ltvCacRatio = cac > 0 ? (ltv / cac).toFixed(1) : '0.0';
  const churnRate = currentMonth?.churnRatePercent || 0;
  const retentionRate = currentMonth?.retentionRatePercent || (customers.length > 0 ? 100 : 0);
  const grossMargin = currentMonth?.grossMarginPercent || 0;

  // Product revenue breakdown data
  const productRevData = products.map(p => ({
    name: p.name,
    code: p.code,
    revenue: convertMoney(p.currentRevenueETB),
    target: convertMoney(p.revenueTargetETB),
    color: p.color
  }));

  // Forecast Simulation Data
  const forecastMonths = ['Oct 2026', 'Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027'];
  let simMrr = mrr;
  const forecastData = forecastMonths.map(m => {
    simMrr = simMrr * (1 + forecastGrowthPercent / 100 / 12);
    return {
      month: m,
      forecastMRR: convertMoney(simMrr),
      forecastARR: convertMoney(simMrr * 12)
    };
  });

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName) return;

    addCustomer({
      name: custName,
      company: `${custName} Hospitality`,
      businessType: custBusinessType,
      city: custCity,
      email: `contact@${custName.toLowerCase().replace(/[^a-z0-9]/g, '')}.et`,
      phone: '+251 91 111 2222',
      productId: products[0]?.id || 'prod-1',
      subscriptionTier: custTier,
      mrrETB: Number(custMrr) || 2500,
      arrETB: (Number(custMrr) || 2500) * 12,
      joinedDate: new Date().toISOString().split('T')[0],
      healthScore: Number(custHealth) || 85,
      activeFeaturesUsed: ['feat-1'],
      churnRisk: 'Low',
      status: 'Active'
    });

    setCustName('');
    setIsAddCustModalOpen(false);
  };

  const handleUpdateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;

    const mrrVal = Number(editingCustomer.mrrETB) || 0;
    updateCustomer(editingCustomer.id, {
      name: editingCustomer.name,
      businessType: editingCustomer.businessType,
      city: editingCustomer.city,
      subscriptionTier: editingCustomer.subscriptionTier,
      mrrETB: mrrVal,
      arrETB: mrrVal * 12,
      healthScore: Number(editingCustomer.healthScore) || 0,
      status: editingCustomer.status,
      churnRisk: editingCustomer.churnRisk
    });

    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer account?')) {
      deleteCustomer(id);
      if (editingCustomer?.id === id) setEditingCustomer(null);
    }
  };

  const handleCreateRevRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const m = Number(revMrr) || 100000;
    addRevenueRecord({
      month: revMonth,
      year: 2026,
      productId: products[0]?.id || 'prod-1',
      mrrETB: m,
      arrETB: m * 12,
      targetMrrETB: Number(revTarget) || m,
      newMrrETB: Number(revNewMrr) || 0,
      expansionMrrETB: Number(revExpMrr) || 0,
      churnedMrrETB: Number(revChurnMrr) || 0,
      customerCount: customers.length,
      arpuETB: 2200,
      cacETB: 1500,
      ltvETB: 52000,
      marketingRoi: 3.6,
      salesRoi: 5.7,
      churnRatePercent: 0.7,
      retentionRatePercent: 99.3,
      grossMarginPercent: 82.0
    });
    setIsAddRevModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Module 14 • Financial Cockpit
            </span>
            <span className="text-xs text-slate-400 font-mono">Multi-Currency (ETB / USD)</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Revenue Management & SaaS Metrics</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            SaaS recurring revenue, customer unit economics, cohort retention, and dynamic growth forecasting.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAddRevModalOpen(true)}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Monthly Record
          </button>
          <button
            onClick={() => setIsAddCustModalOpen(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Client Account
          </button>
        </div>
      </div>

      {/* Top 4 SaaS Financial KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          title="Annual Recurring (ARR)"
          value={formatCompactMoney(arr)}
          target={formatCompactMoney(15000000)}
          change="+28.5% YoY"
          trend="up"
          status="yellow"
          icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          title="Monthly Recurring (MRR)"
          value={formatCompactMoney(mrr)}
          target={formatCompactMoney(1000000)}
          change="+12.4% MoM"
          trend="up"
          status="yellow"
          icon={<DollarSign className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          title="Net New MRR Added"
          value={formatCompactMoney(netNewMrr)}
          subtitle={`+${formatCompactMoney(newMrr)} New • +${formatCompactMoney(expansionMrr)} Exp`}
          trend="up"
          status="green"
          icon={<ArrowUpRight className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          title="LTV : CAC Ratio"
          value={`${ltvCacRatio}x`}
          subtitle={`LTV: ${formatCompactMoney(ltv)} | CAC: ${formatCompactMoney(cac)}`}
          trend="up"
          status="green"
          badge="High Efficiency"
          icon={<ShieldCheck className="w-4 h-4 text-purple-400" />}
        />
      </div>

      {/* Secondary SaaS Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase">ARPU (Per Vendor)</div>
          <div className="text-base font-bold text-white font-mono mt-1">{formatMoney(arpu)}/mo</div>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Gross Profit Margin</div>
          <div className="text-base font-bold text-purple-400 font-mono mt-1">{grossMargin}%</div>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Monthly Churn Rate</div>
          <div className="text-base font-bold text-emerald-400 font-mono mt-1">{churnRate}%</div>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Net Retention (NRR)</div>
          <div className="text-base font-bold text-emerald-400 font-mono mt-1">{retentionRate}%</div>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Total Customers</div>
          <div className="text-base font-bold text-amber-400 font-mono mt-1">{customers.length} Clients</div>
        </div>
        <div className="glass-panel p-3.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[10px] text-slate-400 font-mono uppercase">Revenue Currency</div>
          <div className="text-base font-bold text-cyan-400 font-mono mt-1">{currency}</div>
        </div>
      </div>

      {/* Visual Charts: Revenue by Product & Revenue Growth Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Product Bar Chart */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display">Revenue by Product Portfolio</h3>
              <p className="text-xs text-slate-400">Current revenue vs target across product lines</p>
            </div>
            <Badge variant="blue">{currency}</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productRevData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="code" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => formatCompactMoney(currency === 'USD' ? v * 125 : v)} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [formatMoney(currency === 'USD' ? val * 125 : val), 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#22c55e" radius={[4, 4, 0, 0]} name="Current Revenue" />
                <Bar dataKey="target" fill="#334155" radius={[4, 4, 0, 0]} name="Target Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Forecasting Simulator */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-400" /> 6-Month MRR/ARR Revenue Forecast
              </h3>
              <p className="text-xs text-slate-400">Simulate annualized growth with compound expansion</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400">Growth:</span>
              <select
                value={forecastGrowthPercent}
                onChange={e => setForecastGrowthPercent(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 text-emerald-400 font-bold rounded-lg px-2 py-1 text-xs"
              >
                <option value={10}>+10% p.a.</option>
                <option value={15}>+15% p.a.</option>
                <option value={25}>+25% p.a. (Fast)</option>
                <option value={40}>+40% p.a. (Hyper)</option>
              </select>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => formatCompactMoney(currency === 'USD' ? v * 125 : v)} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: any) => [formatMoney(currency === 'USD' ? val * 125 : val), 'Forecast MRR']}
                />
                <Line type="monotone" dataKey="forecastMRR" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Customer Accounts Table */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-display">
              Enterprise Customer Accounts & Health
            </h3>
            <p className="text-xs text-slate-400">Live restaurant clients generating recurring SaaS revenue in Ethiopia</p>
          </div>
          <button
            onClick={() => setIsAddCustModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </button>
        </div>

        {customers.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-slate-800 rounded-xl space-y-2">
            <Building2 className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-sm font-bold text-white">No Customer Accounts Added Yet</div>
            <p className="text-xs text-slate-400">Add paid restaurant accounts to track recurring MRR, ARR, and health scores.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider">
                  <th className="py-2.5 px-3">Restaurant / Company</th>
                  <th className="py-2.5 px-3">City & Location</th>
                  <th className="py-2.5 px-3">Subscription Tier</th>
                  <th className="py-2.5 px-3">Monthly MRR</th>
                  <th className="py-2.5 px-3">Annual ARR</th>
                  <th className="py-2.5 px-3">Health Score</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {customers.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{c.name}</div>
                      <div className="text-[11px] text-slate-400">{c.businessType}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{c.city}</td>
                    <td className="py-3 px-3">
                      <Badge variant={c.subscriptionTier === 'Enterprise' ? 'purple' : 'blue'}>
                        {c.subscriptionTier}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">{formatMoney(c.mrrETB)}</td>
                    <td className="py-3 px-3 font-mono text-white">{formatMoney(c.arrETB)}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-white">{c.healthScore}/100</span>
                        <div className="w-16 bg-slate-800 rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full ${
                              c.healthScore > 80 ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                            style={{ width: `${c.healthScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={c.status === 'Active' ? 'green' : 'red'}>{c.status}</Badge>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingCustomer(c)}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                          title="Edit Customer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(c.id)}
                          className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Delete Customer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddCustModalOpen}
        onClose={() => setIsAddCustModalOpen(false)}
        title="Add Customer Account"
        subtitle="Onboard a new restaurant client and configure recurring subscription MRR"
      >
        <form onSubmit={handleCreateCustomer} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Restaurant / Client Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Bait Al Mandi Addis"
              value={custName}
              onChange={e => setCustName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Business Type</label>
              <select
                value={custBusinessType}
                onChange={e => setCustBusinessType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Traditional Mesob">Traditional Mesob</option>
                <option value="Fine Dining">Fine Dining</option>
                <option value="Cafe & Bistro">Cafe & Bistro</option>
                <option value="Hotel Resort">Hotel Resort</option>
                <option value="Fast Food Chain">Fast Food Chain</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">City / Neighborhood</label>
              <input
                type="text"
                value={custCity}
                onChange={e => setCustCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Subscription Tier</label>
              <select
                value={custTier}
                onChange={e => setCustTier(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Starter">Starter</option>
                <option value="Growth">Growth</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Monthly MRR (ETB)</label>
              <input
                type="number"
                required
                value={custMrr}
                onChange={e => setCustMrr(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Health Score (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={custHealth}
                onChange={e => setCustHealth(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddCustModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Add Customer
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <Modal
          isOpen={true}
          onClose={() => setEditingCustomer(null)}
          title={`Edit Customer: ${editingCustomer.name}`}
          subtitle="Update restaurant subscription tier, monthly MRR, and account health score"
        >
          <form onSubmit={handleUpdateCustomer} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Restaurant / Client Name</label>
              <input
                type="text"
                required
                value={editingCustomer.name}
                onChange={e => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Business Type</label>
                <select
                  value={editingCustomer.businessType}
                  onChange={e => setEditingCustomer({ ...editingCustomer, businessType: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Traditional Mesob">Traditional Mesob</option>
                  <option value="Fine Dining">Fine Dining</option>
                  <option value="Cafe & Bistro">Cafe & Bistro</option>
                  <option value="Hotel Resort">Hotel Resort</option>
                  <option value="Fast Food Chain">Fast Food Chain</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">City / Location</label>
                <input
                  type="text"
                  value={editingCustomer.city}
                  onChange={e => setEditingCustomer({ ...editingCustomer, city: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Subscription Tier</label>
                <select
                  value={editingCustomer.subscriptionTier}
                  onChange={e => setEditingCustomer({ ...editingCustomer, subscriptionTier: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Starter">Starter</option>
                  <option value="Growth">Growth</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Monthly MRR (ETB)</label>
                <input
                  type="number"
                  required
                  value={editingCustomer.mrrETB}
                  onChange={e => setEditingCustomer({ ...editingCustomer, mrrETB: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Health Score (0-100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingCustomer.healthScore}
                  onChange={e => setEditingCustomer({ ...editingCustomer, healthScore: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Account Status</label>
                <select
                  value={editingCustomer.status}
                  onChange={e => setEditingCustomer({ ...editingCustomer, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Active">Active</option>
                  <option value="Churned">Churned</option>
                  <option value="Onboarding">Onboarding</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Churn Risk</label>
                <select
                  value={editingCustomer.churnRisk}
                  onChange={e => setEditingCustomer({ ...editingCustomer, churnRisk: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleDeleteCustomer(editingCustomer.id)}
                className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Account
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
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

      {/* Add Revenue Record Modal */}
      <Modal
        isOpen={isAddRevModalOpen}
        onClose={() => setIsAddRevModalOpen(false)}
        title="Add Monthly Revenue Record"
        subtitle="Log historical monthly MRR, growth targets, and expansion metrics"
      >
        <form onSubmit={handleCreateRevRecord} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Month Label</label>
              <input
                type="text"
                required
                placeholder="e.g. Oct 2026"
                value={revMonth}
                onChange={e => setRevMonth(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Monthly MRR (ETB)</label>
              <input
                type="number"
                required
                value={revMrr}
                onChange={e => setRevMrr(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target MRR (ETB)</label>
              <input
                type="number"
                value={revTarget}
                onChange={e => setRevTarget(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">New MRR</label>
              <input
                type="number"
                value={revNewMrr}
                onChange={e => setRevNewMrr(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Expansion MRR</label>
              <input
                type="number"
                value={revExpMrr}
                onChange={e => setRevExpMrr(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddRevModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Save Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
