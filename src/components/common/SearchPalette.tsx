import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Layers,
  Sparkles,
  GitPullRequest,
  Megaphone,
  DollarSign,
  Users,
  Target,
  FileText,
  ArrowRight,
  X
} from 'lucide-react';

export const SearchPalette: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    features,
    products,
    devTasks,
    campaigns,
    salesLeads,
    customers,
    strategy,
    releases,
    setActiveView,
    setSelectedProductId,
    setSelectedProductFor360,
    setSelectedFeatureIdForInspect
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      category: string;
      icon: React.ReactNode;
      onSelect: () => void;
    }> = [];

    // Search Products
    products.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)) {
        results.push({
          id: p.id,
          title: `${p.name} (${p.code})`,
          subtitle: p.tagline,
          category: 'Products',
          icon: <Layers className="w-4 h-4 text-emerald-400" />,
          onSelect: () => {
            setSelectedProductFor360(p.id);
            setActiveView('product-360');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Search Features
    features.forEach(f => {
      if (f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q) || f.tags.some(t => t.toLowerCase().includes(q))) {
        results.push({
          id: f.id,
          title: f.title,
          subtitle: `Priority: ${f.priority} | Status: ${f.status}`,
          category: 'Features',
          icon: <Sparkles className="w-4 h-4 text-purple-400" />,
          onSelect: () => {
            setSelectedFeatureIdForInspect(f.id);
            setActiveView('feature-revenue');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Search Tasks
    devTasks.forEach(t => {
      if (t.taskName.toLowerCase().includes(q) || t.developer.toLowerCase().includes(q) || t.status.toLowerCase().includes(q)) {
        results.push({
          id: t.id,
          title: t.taskName,
          subtitle: `Dev: ${t.developer} | Stage: ${t.status}`,
          category: 'Dev Tasks',
          icon: <GitPullRequest className="w-4 h-4 text-blue-400" />,
          onSelect: () => {
            setActiveView('development');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Search Campaigns
    campaigns.forEach(c => {
      if (c.campaignName.toLowerCase().includes(q) || c.channel.toLowerCase().includes(q)) {
        results.push({
          id: c.id,
          title: c.campaignName,
          subtitle: `Channel: ${c.channel} | Leads: ${c.leadsGenerated}`,
          category: 'Marketing Campaigns',
          icon: <Megaphone className="w-4 h-4 text-amber-400" />,
          onSelect: () => {
            setActiveView('marketing');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Search Sales Leads
    salesLeads.forEach(l => {
      if (l.leadName.toLowerCase().includes(q) || l.companyName.toLowerCase().includes(q) || l.opportunityName.toLowerCase().includes(q)) {
        results.push({
          id: l.id,
          title: `${l.companyName} — ${l.leadName}`,
          subtitle: `Stage: ${l.status} | Value: ${l.expectedRevenueETB.toLocaleString()} ETB`,
          category: 'Sales Pipeline',
          icon: <DollarSign className="w-4 h-4 text-emerald-400" />,
          onSelect: () => {
            setActiveView('sales');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Search Customers
    customers.forEach(c => {
      if (c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q) || c.city.toLowerCase().includes(q)) {
        results.push({
          id: c.id,
          title: `${c.name} (${c.company})`,
          subtitle: `${c.city} | Tier: ${c.subscriptionTier} | Health: ${c.healthScore}/100`,
          category: 'Customers',
          icon: <Users className="w-4 h-4 text-cyan-400" />,
          onSelect: () => {
            setActiveView('revenue');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Search Strategy
    strategy.forEach(s => {
      if (s.title.toLowerCase().includes(q) || s.businessGoal.toLowerCase().includes(q)) {
        results.push({
          id: s.id,
          title: s.title,
          subtitle: `Target: ${s.financialTargetETB.toLocaleString()} ETB | Owner: ${s.owner}`,
          category: 'Strategy & OKRs',
          icon: <Target className="w-4 h-4 text-rose-400" />,
          onSelect: () => {
            setActiveView('strategy');
            setIsSearchOpen(false);
          }
        });
      }
    });

    // Search Releases
    releases.forEach(r => {
      if (r.version.toLowerCase().includes(q) || r.changelogNotes.toLowerCase().includes(q)) {
        results.push({
          id: r.id,
          title: r.version,
          subtitle: `Date: ${r.releaseDate} | Type: ${r.releaseType}`,
          category: 'Releases',
          icon: <FileText className="w-4 h-4 text-orange-400" />,
          onSelect: () => {
            setActiveView('releases');
            setIsSearchOpen(false);
          }
        });
      }
    });

    return results.slice(0, 15);
  }, [
    searchQuery,
    features,
    products,
    devTasks,
    campaigns,
    salesLeads,
    customers,
    strategy,
    releases,
    setActiveView,
    setSelectedProductFor360,
    setSelectedFeatureIdForInspect,
    setIsSearchOpen
  ]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Palette Box */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up flex flex-col">
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/50">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type to search across Strategy, Products, Roadmap, Dev, Marketing, Sales, Revenue..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {searchQuery.trim() === '' ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              <p className="font-medium text-slate-400">Quick Search across the Entire Mesob PMS Ecosystem</p>
              <p className="mt-1">Try searching for <span className="text-emerald-400">"Recipe"</span>, <span className="text-emerald-400">"Castelli"</span>, <span className="text-emerald-400">"Telebirr"</span>, <span className="text-emerald-400">"v2.5"</span>, or <span className="text-emerald-400">"Campaign"</span>.</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              No matching records found for "<span className="text-white">{searchQuery}</span>"
            </div>
          ) : (
            <div className="space-y-1">
              {searchResults.map(item => (
                <div
                  key={`${item.category}-${item.id}`}
                  onClick={item.onSelect}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 shrink-0">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate">{item.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/40 text-[11px] text-slate-500 flex justify-between items-center">
          <div>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">ESC</kbd> to close</div>
          <div><kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">Ctrl+K</kbd> to toggle search</div>
        </div>
      </div>
    </div>
  );
};
