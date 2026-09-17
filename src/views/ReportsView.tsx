import React from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  FileSpreadsheet,
  Download,
  Printer,
  TrendingUp,
  DollarSign,
  Package,
  GitPullRequest,
  Megaphone,
  Users,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const {
    products,
    features,
    devTasks,
    campaigns,
    salesLeads,
    customers,
    revenueHistory,
    strategy,
    currency,
    formatMoney,
    formatCompactMoney
  } = useApp();

  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      currency,
      products,
      features,
      devTasks,
      campaigns,
      salesLeads,
      customers,
      revenueHistory,
      strategy
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mesob_pms_executive_report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in print:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Module 22 • Reporting Hub
            </span>
            <span className="text-xs text-slate-400 font-mono">Executive Synthesis & Export</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Executive Lifecycle Reports</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Comprehensive executive audit across Product, Engineering, Marketing, Sales, and SaaS Revenue.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" /> Export JSON
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-glow-brand transition-all flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 stroke-[3]" /> Print Executive Report
          </button>
        </div>
      </div>

      {/* Printable Report Canvas */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-6 bg-slate-950/70">
        {/* Report Meta */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="text-base font-extrabold text-white font-display">
              MESOB PRODUCT MANAGEMENT & REVENUE REPORT
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Ethiopia Hospitality SaaS Suite (MesobOrdering, POS, Inventory, Pay, Hotel PMS)
            </div>
          </div>
          <div className="text-right text-xs font-mono text-slate-400">
            <div>Period: <strong>Q3 2026</strong></div>
            <div>Currency: <strong>{currency}</strong></div>
          </div>
        </div>

        {/* Executive Summary Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4" /> 1. Financial & Recurring Revenue Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">ANNUAL ARR</div>
              <div className="text-base font-bold text-white font-display mt-0.5">{formatMoney(10490000)}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">MONTHLY MRR</div>
              <div className="text-base font-bold text-emerald-400 font-display mt-0.5">{formatMoney(874166)}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">ACTIVE CLIENTS</div>
              <div className="text-base font-bold text-white font-display mt-0.5">420 Restaurants</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400 font-mono">RETENTION / CHURN</div>
              <div className="text-base font-bold text-purple-400 font-display mt-0.5">99.3% / 0.7%</div>
            </div>
          </div>
        </div>

        {/* Product Suite Performance */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono flex items-center gap-1.5">
            <Package className="w-4 h-4" /> 2. Product Portfolio Revenue Contribution
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                  <th className="py-2 px-2">Product Name</th>
                  <th className="py-2 px-2">Stage</th>
                  <th className="py-2 px-2">Current Revenue</th>
                  <th className="py-2 px-2">Target</th>
                  <th className="py-2 px-2">Attainment</th>
                  <th className="py-2 px-2 text-right">Profit Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {products.map(p => (
                  <tr key={p.id}>
                    <td className="py-2.5 px-2 font-bold text-white">{p.name} ({p.code})</td>
                    <td className="py-2.5 px-2"><Badge variant="blue" size="sm">{p.stage}</Badge></td>
                    <td className="py-2.5 px-2 font-mono font-bold text-emerald-400">{formatMoney(p.currentRevenueETB)}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-300">{formatMoney(p.revenueTargetETB)}</td>
                    <td className="py-2.5 px-2 text-slate-200">{((p.currentRevenueETB / p.revenueTargetETB) * 100).toFixed(0)}%</td>
                    <td className="py-2.5 px-2 text-right font-mono text-purple-400">{p.profitMarginPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Feature Revenue Attribution */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> 3. Top Feature Revenue Drivers (Requirement #15)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-white">QR Digital Ordering</div>
              <div className="text-emerald-400 font-mono font-extrabold">{formatMoney(1200000)} ARR</div>
              <div className="text-slate-400 text-[10px]">250 Clients • 5.0x Dev ROI</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Touchscreen Cloud POS</div>
              <div className="text-emerald-400 font-mono font-extrabold">{formatMoney(900000)} ARR</div>
              <div className="text-slate-400 text-[10px]">180 Clients • 2.8x Dev ROI</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Telebirr/CBE Payment Bridge</div>
              <div className="text-emerald-400 font-mono font-extrabold">{formatMoney(840000)} ARR</div>
              <div className="text-slate-400 text-[10px]">210 Clients • 4.4x Dev ROI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
