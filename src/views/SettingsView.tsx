import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import {
  Settings,
  RotateCcw,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Database,
  Layers,
  Sparkles,
  Info,
  Sun,
  Moon
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const {
    theme,
    setTheme,
    currency,
    setCurrency,
    exchangeRateETBtoUSD,
    resetAllData,
    products,
    features,
    devTasks,
    campaigns,
    salesLeads,
    customers,
    feedback
  } = useApp();

  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    if (window.confirm('Reset all demo data back to the default Mesob Hospitality SaaS Suite dataset?')) {
      resetAllData();
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            System Preferences
          </span>
          <span className="text-xs text-slate-400 font-mono">Configuration & Persistence</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-display">System Settings & Data Management</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure visual appearance (White / Dark view), currency standards, exchange rates, and manage local application state.
        </p>
      </div>

      {resetSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Successfully restored all lifecycle data to default Mesob dataset.
        </div>
      )}

      {/* Theme Appearance Settings */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
          <Sun className="w-4 h-4 text-amber-400" /> Appearance & Theme Mode
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              theme === 'dark'
                ? 'bg-slate-900 border-emerald-500 shadow-glow-brand'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Dark Mode</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Executive sleek dark palette</div>
              </div>
            </div>
            {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>

          <div
            onClick={() => setTheme('light')}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
              theme === 'light'
                ? 'bg-white border-amber-500 shadow-md'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-500 border border-amber-400/30">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">White Mode (Light)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Crisp, high-clarity white view</div>
              </div>
            </div>
            {theme === 'light' && <CheckCircle2 className="w-4 h-4 text-amber-500" />}
          </div>
        </div>
      </div>

      {/* Currency Settings */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
          <Coins className="w-4 h-4 text-emerald-400" /> Currency & Financial Units
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="font-semibold text-white">Active System Currency</div>
              <div className="text-[11px] text-slate-400">
                Choose between Ethiopian Birr (ETB) and United States Dollars (USD)
              </div>
            </div>
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => setCurrency('ETB')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  currency === 'ETB'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ETB (Br)
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                  currency === 'USD'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div>
              <div className="font-semibold text-white">Indicative FX Conversion Rate</div>
              <div className="text-[11px] text-slate-400">Fixed rate used for dynamic currency switching</div>
            </div>
            <span className="font-mono text-xs font-bold text-slate-200">
              1 USD = {exchangeRateETBtoUSD} ETB
            </span>
          </div>
        </div>
      </div>

      {/* Database Entity Diagnostics */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
          <Database className="w-4 h-4 text-purple-400" /> Lifecycle Entity Diagnostics
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400">Products in Suite</div>
            <div className="text-base font-bold text-white mt-0.5">{products.length} Products</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400">Roadmap Features</div>
            <div className="text-base font-bold text-white mt-0.5">{features.length} Features</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400">Development Tasks</div>
            <div className="text-base font-bold text-white mt-0.5">{devTasks.length} Tasks</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400">Customer Feedback</div>
            <div className="text-base font-bold text-white mt-0.5">{feedback.length} Tickets</div>
          </div>
        </div>
      </div>

      {/* Data Reset */}
      <div className="glass-panel rounded-2xl p-6 border border-rose-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white font-display flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-rose-400" /> Reset to Default Mesob Demo Data
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Clear your custom local modifications and restore the complete initial Ethiopian hospitality dataset.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-bold text-xs rounded-xl border border-rose-500/40 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};
