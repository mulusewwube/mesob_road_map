import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Plus,
  Bell,
  Coins,
  Layers,
  Sparkles,
  GitPullRequest,
  Megaphone,
  UserPlus,
  MessageSquare,
  ChevronDown,
  Sun,
  Moon,
  Shield,
  ShieldCheck,
  Lock,
  LogOut,
  Edit2,
  User
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const Header: React.FC = () => {
  const {
    products,
    selectedProductId,
    setSelectedProductId,
    currency,
    setCurrency,
    theme,
    setTheme,
    toggleTheme,
    setIsSearchOpen,
    actionItems,
    setActiveView,
    addDevTask,
    addFeature,
    addSalesLead,
    addCampaign,
    addFeedback,
    epics,
    currentUser,
    currentRole,
    users,
    roles,
    setCurrentUserId,
    updateUser,
    hasPermission,
    logout
  } = useApp();

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileTitle, setProfileTitle] = useState('');
  const [profileDept, setProfileDept] = useState('');
  const [profileTeam, setProfileTeam] = useState('');

  const handleOpenEditProfile = () => {
    setProfileName(currentUser.name);
    setProfileEmail(currentUser.email);
    setProfileTitle(currentUser.title);
    setProfileDept(currentUser.department);
    setProfileTeam(currentUser.team);
    setIsPersonaOpen(false);
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName || !profileEmail) return;
    updateUser(currentUser.id, {
      name: profileName,
      email: profileEmail,
      title: profileTitle,
      department: profileDept,
      team: profileTeam
    });
    setIsEditProfileOpen(false);
  };
  const [quickAddType, setQuickAddType] = useState<
    'task' | 'feature' | 'lead' | 'campaign' | 'feedback' | null
  >(null);

  // Form states for Quick Add
  const [taskName, setTaskName] = useState('');
  const [taskDev, setTaskDev] = useState('Abebe Bekele');
  const [taskEpic, setTaskEpic] = useState(epics[0]?.id || '');
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');

  const [featTitle, setFeatTitle] = useState('');
  const [featDesc, setFeatDesc] = useState('');
  const [featEpic, setFeatEpic] = useState(epics[0]?.id || '');
  const [featPriority, setFeatPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');

  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadRev, setLeadRev] = useState(120000);

  const [campName, setCampName] = useState('');
  const [campBudget, setCampBudget] = useState(50000);

  const [fbCustomer, setFbCustomer] = useState('');
  const [fbProblem, setFbProblem] = useState('');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName) return;
    const epic = epics.find(ep => ep.id === taskEpic) || epics[0];
    addDevTask({
      taskName,
      productId: epic?.productId || 'prod-1',
      epicId: taskEpic,
      featureId: 'feat-1',
      developer: taskDev,
      priority: taskPriority,
      sprint: 'Sprint 28: MesobOrdering v2.5 Inventory Launch',
      estimatedHours: 16,
      actualHours: 0,
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      dependencies: [],
      acceptanceCriteria: ['Pass automated unit and e2e tests', 'Code reviewed by lead'],
      qaStatus: 'Pending',
      status: 'TODO',
      progressPercent: 0
    });
    setTaskName('');
    setQuickAddType(null);
  };

  const handleCreateFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featTitle) return;
    const epic = epics.find(ep => ep.id === featEpic) || epics[0];
    addFeature({
      epicId: featEpic,
      productId: epic?.productId || 'prod-1',
      title: featTitle,
      description: featDesc || 'New product capability driven by customer demand.',
      valueProposition: 'Increases restaurant efficiency and adoption.',
      userStorySummary: `As a user, I want ${featTitle} to improve operational workflow.`,
      priority: featPriority,
      status: 'Backlog',
      estimatedHours: 80,
      actualHours: 0,
      devProgressPercent: 0,
      adoptingCustomers: 0,
      revenueImpactETB: 0,
      devCostETB: 120000,
      tags: ['New', 'Feature'],
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    });
    setFeatTitle('');
    setFeatDesc('');
    setQuickAddType(null);
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadCompany) return;
    addSalesLead({
      leadName,
      companyName: leadCompany,
      contactEmail: `contact@${leadCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.et`,
      contactPhone: '+251 91 000 0000',
      source: 'Direct Lead Entry',
      productId: selectedProductId === 'all' ? 'prod-1' : selectedProductId,
      salesperson: 'Solomon Worku',
      opportunityName: `${leadCompany} - Mesob Hospitality Bundle`,
      expectedRevenueETB: Number(leadRev) || 100000,
      probabilityPercent: 40,
      expectedClosingDate: new Date(Date.now() + 21 * 86400000).toISOString().split('T')[0],
      actualRevenueETB: 0,
      status: 'Lead',
      city: 'Addis Ababa'
    });
    setLeadName('');
    setLeadCompany('');
    setQuickAddType(null);
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campName) return;
    addCampaign({
      campaignName: campName,
      productId: selectedProductId === 'all' ? 'prod-1' : selectedProductId,
      targetAudience: 'Ethiopian F&B Merchants',
      channel: 'Social & Field Marketing',
      budgetETB: Number(campBudget) || 50000,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      owner: 'Hanna Alemayehu',
      leadsGenerated: 0,
      opportunitiesGenerated: 0,
      customersWon: 0,
      actualRevenueETB: 0,
      costETB: Number(campBudget) || 50000,
      roiMultiplier: 0,
      status: 'Active'
    });
    setCampName('');
    setQuickAddType(null);
  };

  const handleCreateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbCustomer || !fbProblem) return;
    addFeedback({
      customerName: fbCustomer,
      companyName: `${fbCustomer} Cafe / Resto`,
      source: 'Customer',
      productId: selectedProductId === 'all' ? 'prod-1' : selectedProductId,
      problem: fbProblem,
      request: 'Automated software enhancement',
      businessImpact: 'High',
      frequency: 1,
      priority: 'High',
      relatedRevenueETB: 80000,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    });
    setFbCustomer('');
    setFbProblem('');
    setQuickAddType(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-16 border-b border-slate-800 bg-slate-950/85 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        {/* Left Side: Product Selector */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-glow-brand">
              🧭
            </div>
            <div>
              <div className="text-sm font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                MESOB <span className="text-emerald-400">ROADMAP</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
                PMS & REVENUE LIFECYCLE
              </div>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-800 hidden md:block" />

          {/* Product Filter dropdown */}
          <div className="relative hidden md:flex items-center">
            <Layers className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              className="bg-slate-900 border border-slate-700/70 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="all">🌐 All Products Portfolio</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Quick Search Trigger */}
        <div className="flex-1 max-w-md mx-4 hidden lg:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 text-xs transition-all group"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 group-hover:text-emerald-400 transition-colors" />
              <span>Search features, roadmaps, campaigns, revenue...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-300">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right Side: Currency Toggle, Quick Add, Notifications, Status */}
        <div className="flex items-center gap-2.5">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white lg:hidden"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setCurrency('ETB')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currency === 'ETB'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Ethiopian Birr"
            >
              ETB
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                currency === 'USD'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="US Dollars (1 USD = 125 ETB)"
            >
              USD ($)
            </button>
          </div>

          {/* White / Dark Theme Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setTheme('light')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                theme === 'light'
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Switch to White / Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">White</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                theme === 'dark'
                  ? 'bg-slate-800 text-emerald-400 shadow-sm font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Switch to Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dark</span>
            </button>
          </div>

          {/* Quick Action Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsQuickAddOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-glow-brand"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden sm:inline">Quick Add</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {isQuickAddOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsQuickAddOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700/90 rounded-xl shadow-2xl py-1.5 z-50 animate-slide-up">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Create New Lifecycle Item
                  </div>
                  <button
                    onClick={() => {
                      setQuickAddType('task');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition-colors text-left"
                  >
                    <GitPullRequest className="w-4 h-4 text-blue-400" />
                    <span>New Development Task</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickAddType('feature');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition-colors text-left"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>New Roadmap Feature</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickAddType('lead');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition-colors text-left"
                  >
                    <UserPlus className="w-4 h-4 text-emerald-400" />
                    <span>New Sales Lead (Deal)</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickAddType('campaign');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition-colors text-left"
                  >
                    <Megaphone className="w-4 h-4 text-amber-400" />
                    <span>New Marketing Campaign</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickAddType('feedback');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-emerald-400 transition-colors text-left"
                  >
                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                    <span>Log Customer Feedback</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Action Required / Notifications */}
          <button
            onClick={() => setActiveView('dashboard')}
            className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            title="Action Required Items"
          >
            <Bell className="w-4 h-4" />
            {actionItems.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {actionItems.length}
              </span>
            )}
          </button>

          {/* Persona / RBAC Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsPersonaOpen(prev => !prev)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-all text-left group shadow-sm"
              title="Active Persona & RBAC Role"
            >
              <div className="relative">
                {currentUser.avatarUrl ? (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-700"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-xs font-bold font-mono">
                    {currentUser.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950 ${
                    currentRole.code === 'SUPER_ADMIN'
                      ? 'bg-emerald-400'
                      : currentRole.code === 'SALES_REP'
                      ? 'bg-amber-400'
                      : currentRole.code === 'ENG_LEAD'
                      ? 'bg-indigo-400'
                      : currentRole.code === 'PRODUCT_MANAGER'
                      ? 'bg-blue-400'
                      : 'bg-cyan-400'
                  }`}
                />
              </div>

              <div className="hidden xl:block min-w-0">
                <div className="text-xs font-semibold text-slate-200 truncate group-hover:text-white leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 font-medium truncate flex items-center gap-1">
                  <span>{currentRole.name}</span>
                </div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 ml-0.5 transition-transform" />
            </button>

            {isPersonaOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsPersonaOpen(false)} />
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl py-2 z-50 animate-slide-up">
                  {/* Persona Header */}
                  <div className="px-4 py-2.5 border-b border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-emerald-400" /> Active Persona & RBAC
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
                        {currentRole.code}
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      Signed in as <strong className="text-white">{currentUser.name}</strong>
                    </div>
                    <div className="text-[11px] text-slate-400">{currentUser.title}</div>
                    <div className="mt-2 text-[10px] px-2 py-1 rounded-md bg-slate-950 border border-slate-800 text-slate-400 flex items-center justify-between">
                      <span>Department: {currentUser.department}</span>
                      <span className="font-mono text-amber-300">
                        Scope: {currentRole.permissions.find(p => p.module === 'sales')?.scope || 'ALL'}
                      </span>
                    </div>
                  </div>

                  {/* Switcher list */}
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Test Persona
                  </div>

                  <div className="max-h-60 overflow-y-auto px-1.5 space-y-1">
                    {users.map(u => {
                      const userRole = roles.find(r => r.id === u.roleId);
                      const isSelected = u.id === currentUser.id;
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            setCurrentUserId(u.id);
                            setIsPersonaOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                            isSelected
                              ? 'bg-emerald-500/15 border border-emerald-500/30 text-white'
                              : 'hover:bg-slate-800 text-slate-300 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {u.avatarUrl ? (
                              <img
                                src={u.avatarUrl}
                                alt={u.name}
                                className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-700"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold">
                                {u.name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="text-xs font-semibold truncate leading-tight flex items-center gap-1.5">
                                <span>{u.name}</span>
                                {isSelected && (
                                  <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">
                                {userRole?.name || u.title}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 text-right ml-2">
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                userRole?.code === 'SUPER_ADMIN'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : userRole?.code === 'SALES_REP'
                                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                                  : userRole?.code === 'ENG_LEAD'
                                  ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}
                            >
                              {userRole?.code || 'ROLE'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Persona Actions */}
                  <div className="pt-2 mt-1 border-t border-slate-800 px-2 space-y-1.5">
                    <button
                      onClick={handleOpenEditProfile}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Edit My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveView('access-control');
                        setIsPersonaOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-emerald-400 transition-all"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Manage Roles & Permissions</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsPersonaOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sign Out / Lock Session</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Quick Add Modals */}
      {/* 1. Add Dev Task */}
      <Modal
        isOpen={quickAddType === 'task'}
        onClose={() => setQuickAddType(null)}
        title="Add Development Task"
        subtitle="Connect a new engineering task to the Mesob product roadmap"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Build recipe gross margin calculator UI"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Assign Developer</label>
              <select
                value={taskDev}
                onChange={e => setTaskDev(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Abebe Bekele">Abebe Bekele (Full Stack)</option>
                <option value="Dawit Kebede">Dawit Kebede (POS / Systems)</option>
                <option value="Yordanos Tesfaye">Yordanos Tesfaye (FinTech / Backend)</option>
                <option value="Selamawit G.">Selamawit G. (Frontend UI)</option>
                <option value="Natnael Mekonnen">Natnael Mekonnen (QA & Mobile)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={taskPriority}
                onChange={e => setTaskPriority(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Critical">Critical (Blocker)</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Parent Epic</label>
            <select
              value={taskEpic}
              onChange={e => setTaskEpic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {epics.map(ep => (
                <option key={ep.id} value={ep.id}>
                  {ep.title} ({ep.targetQuarter})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setQuickAddType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      </Modal>

      {/* 2. Add Feature */}
      <Modal
        isOpen={quickAddType === 'feature'}
        onClose={() => setQuickAddType(null)}
        title="Add Roadmap Feature"
        subtitle="Define a new feature capability linked to company strategy"
      >
        <form onSubmit={handleCreateFeature} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Feature Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Automated Supplier Purchase Orders"
              value={featTitle}
              onChange={e => setFeatTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description & Value</label>
            <textarea
              rows={3}
              placeholder="Why are we building this and how does it drive revenue or retention?"
              value={featDesc}
              onChange={e => setFeatDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Parent Epic</label>
              <select
                value={featEpic}
                onChange={e => setFeatEpic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {epics.map(ep => (
                  <option key={ep.id} value={ep.id}>
                    {ep.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={featPriority}
                onChange={e => setFeatPriority(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setQuickAddType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Add Feature
            </button>
          </div>
        </form>
      </Modal>

      {/* 3. Add Lead */}
      <Modal
        isOpen={quickAddType === 'lead'}
        onClose={() => setQuickAddType(null)}
        title="Add Sales Opportunity"
        subtitle="Capture a new restaurant lead in the CRM pipeline"
      >
        <form onSubmit={handleCreateLead} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Restaurant / Client Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Gusto Ristorante Addis"
              value={leadCompany}
              onChange={e => setLeadCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Person</label>
              <input
                type="text"
                required
                placeholder="e.g. Elias Teshome (Owner)"
                value={leadName}
                onChange={e => setLeadName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Expected Deal Value (ETB)</label>
              <input
                type="number"
                required
                value={leadRev}
                onChange={e => setLeadRev(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setQuickAddType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Save Lead
            </button>
          </div>
        </form>
      </Modal>

      {/* 4. Add Campaign */}
      <Modal
        isOpen={quickAddType === 'campaign'}
        onClose={() => setQuickAddType(null)}
        title="Launch Marketing Campaign"
        subtitle="Connect product features to marketing budget and customer acquisition"
      >
        <form onSubmit={handleCreateCampaign} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Campaign Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Cut Food Waste by 30% with MesobInventory"
              value={campName}
              onChange={e => setCampName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Budget in ETB</label>
            <input
              type="number"
              required
              value={campBudget}
              onChange={e => setCampBudget(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setQuickAddType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Launch Campaign
            </button>
          </div>
        </form>
      </Modal>

      {/* 5. Add Feedback */}
      <Modal
        isOpen={quickAddType === 'feedback'}
        onClose={() => setQuickAddType(null)}
        title="Log Customer Feedback"
        subtitle="Capture user problem to route into product initiatives"
      >
        <form onSubmit={handleCreateFeedback} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Customer / Restaurant</label>
            <input
              type="text"
              required
              placeholder="e.g. 2000 Habesha Cultural Restaurant"
              value={fbCustomer}
              onChange={e => setFbCustomer(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Customer Problem / Feature Request</label>
            <textarea
              rows={3}
              required
              placeholder="Describe the problem the customer is facing..."
              value={fbProblem}
              onChange={e => setFbProblem(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setQuickAddType(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Log Feedback
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit My Profile */}
      <Modal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        title="Edit Profile"
        subtitle={`Update your account information (${currentUser.email})`}
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
              <input
                type="email"
                required
                value={profileEmail}
                onChange={e => setProfileEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
            <input
              type="text"
              value={profileTitle}
              onChange={e => setProfileTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <input
                type="text"
                value={profileDept}
                onChange={e => setProfileDept(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Team / Tribe</label>
              <input
                type="text"
                value={profileTeam}
                onChange={e => setProfileTeam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Assigned RBAC Role:</span>
            <span className="font-mono text-emerald-400 font-bold">{currentRole.name} ({currentRole.code})</span>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow-brand"
            >
              Save Profile
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
