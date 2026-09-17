import React from 'react';
import { useApp, NavigationTab } from '../../context/AppContext';
import {
  LayoutDashboard,
  Target,
  Globe2,
  Package,
  Milestone,
  GitPullRequest,
  Rocket,
  Megaphone,
  DollarSign,
  TrendingUp,
  CircleDollarSign,
  Users,
  BarChart3,
  Network,
  FileSpreadsheet,
  Settings,
  Sparkles,
  ShieldCheck,
  Lock
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  category?: string;
}

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    devTasks,
    actionItems,
    feedback,
    salesLeads,
    hasPermission,
    currentRole,
    currentUser
  } = useApp();

  const pendingTasksCount = devTasks.filter(t => t.status === 'IN PROGRESS' || t.status === 'TESTING').length;
  const newFeedbackCount = feedback.filter(f => f.status === 'New').length;
  const activeDealsCount = salesLeads.filter(l => l.status !== 'Won' && l.status !== 'Lost').length;

  const rawNavigationSections: { category: string; items: NavItem[] }[] = [
    {
      category: 'CORE EXECUTIVE',
      items: [
        {
          id: 'dashboard',
          label: 'Executive Dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
          badge: actionItems.length > 0 ? `${actionItems.length} Alerts` : undefined,
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
        },
        {
          id: 'strategy',
          label: 'Company Strategy & OKRs',
          icon: <Target className="w-4 h-4" />
        },
        {
          id: 'market',
          label: 'Market & Competitors',
          icon: <Globe2 className="w-4 h-4" />
        }
      ]
    },
    {
      category: 'PRODUCT & ROADMAP',
      items: [
        {
          id: 'products',
          label: 'Product Portfolio & 360°',
          icon: <Package className="w-4 h-4" />
        },
        {
          id: 'roadmap',
          label: 'Product Roadmap & Epics',
          icon: <Milestone className="w-4 h-4" />,
          badge: 'Gantt'
        },
        {
          id: 'development',
          label: 'Development Kanban',
          icon: <GitPullRequest className="w-4 h-4" />,
          badge: pendingTasksCount > 0 ? `${pendingTasksCount}` : undefined,
          badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
        },
        {
          id: 'releases',
          label: 'Releases & Changelogs',
          icon: <Rocket className="w-4 h-4" />,
          badge: 'v2.5 Next',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
        }
      ]
    },
    {
      category: 'GO-TO-MARKET & SALES',
      items: [
        {
          id: 'marketing',
          label: 'Marketing & Campaigns',
          icon: <Megaphone className="w-4 h-4" />
        },
        {
          id: 'sales',
          label: 'Sales CRM & Pipeline',
          icon: <DollarSign className="w-4 h-4" />,
          badge: `${activeDealsCount}`,
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        }
      ]
    },
    {
      category: 'REVENUE & ATTRIBUTION',
      items: [
        {
          id: 'revenue',
          label: 'Revenue & SaaS Metrics',
          icon: <TrendingUp className="w-4 h-4" />,
          badge: 'MRR/ARR'
        },
        {
          id: 'feature-revenue',
          label: 'Feature-Revenue Matrix',
          icon: <CircleDollarSign className="w-4 h-4 text-emerald-400" />,
          badge: 'USP ✨',
          badgeColor: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
        }
      ]
    },
    {
      category: 'CUSTOMERS & ANALYTICS',
      items: [
        {
          id: 'feedback',
          label: 'Customer Feedback Loop',
          icon: <Users className="w-4 h-4" />,
          badge: newFeedbackCount > 0 ? `${newFeedbackCount} new` : undefined,
          badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
        },
        {
          id: 'analytics',
          label: 'Product Usage & Adoption',
          icon: <BarChart3 className="w-4 h-4" />
        },
        {
          id: 'crosslink',
          label: '360° Traceability Graph',
          icon: <Network className="w-4 h-4 text-purple-400" />,
          badge: 'Graph',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
        }
      ]
    },
    {
      category: 'REPORTING & SYSTEM',
      items: [
        {
          id: 'reports',
          label: 'Executive Reports',
          icon: <FileSpreadsheet className="w-4 h-4" />
        },
        {
          id: 'access-control',
          label: 'Access Control & RBAC',
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
          badge: 'RBAC',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        },
        {
          id: 'settings',
          label: 'System & Data Settings',
          icon: <Settings className="w-4 h-4" />
        }
      ]
    }
  ];

  // RBAC Filter: Only show modules user has 'view' permission for
  const navigationSections = rawNavigationSections
    .map(section => ({
      ...section,
      items: section.items.filter(item => hasPermission(item.id, 'view'))
    }))
    .filter(section => section.items.length > 0);

  return (
    <aside className="w-64 bg-slate-950/90 border-r border-slate-800 flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none shrink-0 overflow-hidden">
      {/* Scrollable Nav Items */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
        {navigationSections.map(section => (
          <div key={section.category} className="space-y-0.5">
            <div className="px-2.5 py-1 text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">
              {section.category}
            </div>

            {section.items.map(item => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-400 border border-emerald-500/30 font-semibold shadow-glow-brand'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`transition-colors ${
                        isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                        item.badgeColor ||
                        (isActive
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700')
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Role & Lifecycle Status Micro-Indicator */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60">
        <div className="glass-panel p-2.5 rounded-xl border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="truncate max-w-[110px]">{currentRole.name}</span>
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800">
              {currentUser.department.split(' ')[0]}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between font-mono">
            <span>{currentUser.name}</span>
            <span className="text-emerald-400">RBAC Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
