import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Initiative, Epic, Feature, UserStory } from '../types';
import {
  Milestone,
  Calendar,
  Layers,
  Sparkles,
  GitPullRequest,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Target,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const {
    products,
    initiatives,
    epics,
    features,
    userStories,
    devTasks,
    strategy,
    selectedProductId,
    setSelectedFeatureIdForInspect,
    formatMoney,
    formatCompactMoney,
    addInitiative,
    updateInitiative,
    deleteInitiative,
    addEpic,
    updateEpic,
    deleteEpic,
    addFeature,
    updateFeature,
    deleteFeature
  } = useApp();

  const [roadmapViewMode, setRoadmapViewMode] = useState<'timeline' | 'horizon' | 'tree'>('timeline');
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'init-1': true,
    'epic-1': true,
    'feat-1': true
  });

  // Modal States
  const [isAddInitOpen, setIsAddInitOpen] = useState(false);
  const [editingInit, setEditingInit] = useState<Initiative | null>(null);

  const [isAddEpicOpen, setIsAddEpicOpen] = useState(false);
  const [editingEpic, setEditingEpic] = useState<Epic | null>(null);
  const [targetInitForEpic, setTargetInitForEpic] = useState<string>('');

  const [isAddFeatOpen, setIsAddFeatOpen] = useState(false);
  const [editingFeat, setEditingFeat] = useState<Feature | null>(null);
  const [targetEpicForFeat, setTargetEpicForFeat] = useState<string>('');

  // Initiative Form State
  const [initTitle, setInitTitle] = useState('');
  const [initDesc, setInitDesc] = useState('');
  const [initHorizon, setInitHorizon] = useState<Initiative['horizon']>('Now');
  const [initQuarter, setInitQuarter] = useState('2026 Q3');
  const [initProgress, setInitProgress] = useState(50);
  const [initOwner, setInitOwner] = useState('Lead PM');
  const [initProdId, setInitProdId] = useState(products[0]?.id || 'prod-1');

  // Epic Form State
  const [epicTitle, setEpicTitle] = useState('');
  const [epicDesc, setEpicDesc] = useState('');
  const [epicOwner, setEpicOwner] = useState('Senior Engineer');
  const [epicQuarter, setEpicQuarter] = useState('2026 Q3');
  const [epicProgress, setEpicProgress] = useState(50);

  // Feature Form State
  const [featTitle, setFeatTitle] = useState('');
  const [featDesc, setFeatDesc] = useState('');
  const [featValProp, setFeatValProp] = useState('');
  const [featUserStory, setFeatUserStory] = useState('');
  const [featPriority, setFeatPriority] = useState<Feature['priority']>('High');
  const [featStatus, setFeatStatus] = useState<Feature['status']>('In Dev');
  const [featEstHours, setFeatEstHours] = useState(80);
  const [featAdoptionCusts, setFeatAdoptionCusts] = useState(50);
  const [featRevImpact, setFeatRevImpact] = useState(300000);
  const [featDevCost, setFeatDevCost] = useState(90000);

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredInitiatives = initiatives.filter(
    i => selectedProductId === 'all' || i.productId === selectedProductId
  );

  const quarters = ['2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1'];

  // Initiative Handlers
  const openAddInit = () => {
    setEditingInit(null);
    setInitTitle('');
    setInitDesc('');
    setInitHorizon('Now');
    setInitQuarter('2026 Q3');
    setInitProgress(20);
    setInitOwner('Lead PM');
    setInitProdId(selectedProductId === 'all' ? (products[0]?.id || 'prod-1') : selectedProductId);
    setIsAddInitOpen(true);
  };

  const openEditInit = (i: Initiative) => {
    setEditingInit(i);
    setInitTitle(i.title);
    setInitDesc(i.description);
    setInitHorizon(i.horizon);
    setInitQuarter(i.targetQuarter);
    setInitProgress(i.progressPercent);
    setInitOwner(i.owner);
    setInitProdId(i.productId);
    setIsAddInitOpen(true);
  };

  const handleSaveInit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initTitle) return;

    if (editingInit) {
      updateInitiative(editingInit.id, {
        title: initTitle,
        description: initDesc,
        horizon: initHorizon,
        targetQuarter: initQuarter,
        progressPercent: Number(initProgress),
        owner: initOwner,
        productId: initProdId
      });
    } else {
      addInitiative({
        productId: initProdId,
        strategicObjectiveId: strategy[0]?.id || 'strat-1',
        title: initTitle,
        description: initDesc,
        horizon: initHorizon,
        status: 'In Progress',
        targetQuarter: initQuarter,
        progressPercent: Number(initProgress) || 0,
        owner: initOwner
      });
    }

    setIsAddInitOpen(false);
    setEditingInit(null);
  };

  // Epic Handlers
  const openAddEpic = (parentInitId?: string) => {
    setEditingEpic(null);
    setTargetInitForEpic(parentInitId || initiatives[0]?.id || '');
    setEpicTitle('');
    setEpicDesc('');
    setEpicOwner('Module Owner');
    setEpicQuarter('2026 Q3');
    setEpicProgress(30);
    setIsAddEpicOpen(true);
  };

  const openEditEpic = (e: Epic) => {
    setEditingEpic(e);
    setTargetInitForEpic(e.initiativeId);
    setEpicTitle(e.title);
    setEpicDesc(e.description);
    setEpicOwner(e.owner);
    setEpicQuarter(e.targetQuarter);
    setEpicProgress(e.progressPercent);
    setIsAddEpicOpen(true);
  };

  const handleSaveEpic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!epicTitle) return;

    const parentInit = initiatives.find(i => i.id === targetInitForEpic) || initiatives[0];

    if (editingEpic) {
      updateEpic(editingEpic.id, {
        title: epicTitle,
        description: epicDesc,
        owner: epicOwner,
        targetQuarter: epicQuarter,
        progressPercent: Number(epicProgress)
      });
    } else {
      addEpic({
        initiativeId: targetInitForEpic || parentInit?.id || 'init-1',
        productId: parentInit?.productId || 'prod-1',
        title: epicTitle,
        description: epicDesc,
        owner: epicOwner,
        status: 'In Progress',
        progressPercent: Number(epicProgress) || 0,
        targetQuarter: epicQuarter
      });
    }

    setIsAddEpicOpen(false);
    setEditingEpic(null);
  };

  // Feature Handlers
  const openAddFeat = (parentEpicId?: string) => {
    setEditingFeat(null);
    setTargetEpicForFeat(parentEpicId || epics[0]?.id || '');
    setFeatTitle('');
    setFeatDesc('');
    setFeatValProp('');
    setFeatUserStory('');
    setFeatPriority('High');
    setFeatStatus('In Dev');
    setFeatEstHours(80);
    setFeatAdoptionCusts(25);
    setFeatRevImpact(200000);
    setFeatDevCost(60000);
    setIsAddFeatOpen(true);
  };

  const openEditFeat = (f: Feature) => {
    setEditingFeat(f);
    setTargetEpicForFeat(f.epicId);
    setFeatTitle(f.title);
    setFeatDesc(f.description);
    setFeatValProp(f.valueProposition);
    setFeatUserStory(f.userStorySummary);
    setFeatPriority(f.priority);
    setFeatStatus(f.status);
    setFeatEstHours(f.estimatedHours);
    setFeatAdoptionCusts(f.adoptingCustomers);
    setFeatRevImpact(f.revenueImpactETB);
    setFeatDevCost(f.devCostETB);
    setIsAddFeatOpen(true);
  };

  const handleSaveFeat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!featTitle) return;

    const parentEpic = epics.find(ep => ep.id === targetEpicForFeat) || epics[0];

    if (editingFeat) {
      updateFeature(editingFeat.id, {
        title: featTitle,
        description: featDesc,
        valueProposition: featValProp,
        userStorySummary: featUserStory,
        priority: featPriority,
        status: featStatus,
        estimatedHours: Number(featEstHours),
        adoptingCustomers: Number(featAdoptionCusts),
        revenueImpactETB: Number(featRevImpact),
        devCostETB: Number(featDevCost)
      });
    } else {
      addFeature({
        epicId: targetEpicForFeat || parentEpic?.id || 'epic-1',
        productId: parentEpic?.productId || 'prod-1',
        title: featTitle,
        description: featDesc || 'New product feature requirement.',
        valueProposition: featValProp || 'Drives customer engagement and retention.',
        userStorySummary: featUserStory || `As a user, I want ${featTitle} to improve operations.`,
        priority: featPriority,
        status: featStatus,
        estimatedHours: Number(featEstHours) || 60,
        actualHours: 0,
        devProgressPercent: 0,
        adoptingCustomers: Number(featAdoptionCusts) || 0,
        revenueImpactETB: Number(featRevImpact) || 0,
        devCostETB: Number(featDevCost) || 50000,
        tags: ['Roadmap', 'Feature'],
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
      });
    }

    setIsAddFeatOpen(false);
    setEditingFeat(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Module 8 • Roadmap Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">100% Editable Hierarchy</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Multi-Level Product Roadmap</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Connect high-level strategic goals down to epics, features, user stories, and development tasks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setRoadmapViewMode('timeline')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                roadmapViewMode === 'timeline'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Timeline (Gantt)
            </button>
            <button
              onClick={() => setRoadmapViewMode('horizon')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                roadmapViewMode === 'horizon'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Horizon (Now/Next/Later)
            </button>
            <button
              onClick={() => setRoadmapViewMode('tree')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                roadmapViewMode === 'tree'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              7-Level Hierarchy Tree
            </button>
          </div>

          <button
            onClick={openAddInit}
            className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Initiative
          </button>
        </div>
      </div>

      {/* 7-Level Legend Bar */}
      <div className="glass-panel rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[680px]">
          <span className="text-slate-400 font-bold uppercase text-[10px] font-mono">Roadmap Levels:</span>
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold text-[10px]">1. Goal</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold text-[10px]">2. Initiative</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">3. Epic</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">4. Feature</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">5. User Story</span>
          <span>→</span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">6. Task</span>
        </div>
        <span className="text-[11px] text-emerald-400 font-medium hidden md:inline">Click any feature to inspect or edit 360°</span>
      </div>

      {/* Empty State */}
      {filteredInitiatives.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-3">
          <Milestone className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white font-display">No Initiatives on Roadmap</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You currently have no product initiatives on your roadmap. Add an initiative to bridge company strategy with development sprints.
          </p>
          <button
            onClick={openAddInit}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create Your First Initiative
          </button>
        </div>
      )}

      {/* VIEW 1: QUARTERLY TIMELINE (GANTT) */}
      {roadmapViewMode === 'timeline' && filteredInitiatives.length > 0 && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-6 overflow-x-auto">
            {/* Timeline Column Headers */}
            <div className="grid grid-cols-12 gap-2 pb-3 border-b border-slate-800 text-xs font-mono font-bold text-slate-400 min-w-[800px]">
              <div className="col-span-4 uppercase tracking-wider">Product Initiative & Epic</div>
              <div className="col-span-8 grid grid-cols-5 text-center">
                {quarters.map(q => (
                  <div key={q} className="border-l border-slate-800/80 px-1 py-0.5 text-[11px]">
                    {q}
                  </div>
                ))}
              </div>
            </div>

            {/* Initiatives & Epics Rows */}
            <div className="space-y-5 min-w-[800px]">
              {filteredInitiatives.map(init => {
                const initEpics = epics.filter(e => e.initiativeId === init.id);
                const parentProduct = products.find(p => p.id === init.productId);

                return (
                  <div key={init.id} className="space-y-2">
                    {/* Initiative Row */}
                    <div className="grid grid-cols-12 gap-2 items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800 relative group">
                      <div className="col-span-4 flex items-center justify-between pr-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
                          <div>
                            <div className="font-bold text-white text-xs">{init.title}</div>
                            <div className="text-[10px] text-slate-400">{parentProduct?.name} • Lead: {init.owner}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditInit(init)}
                            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                            title="Edit Initiative"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => openAddEpic(init.id)}
                            className="p-1 rounded bg-slate-800 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950"
                            title="Add Epic under this Initiative"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete initiative: ${init.title}?`)) {
                                deleteInitiative(init.id);
                              }
                            }}
                            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-rose-400"
                            title="Delete Initiative"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-8 grid grid-cols-5 gap-1 items-center">
                        <div className="col-span-3 bg-gradient-to-r from-blue-600/40 to-blue-500/80 border border-blue-400/60 rounded-lg p-2 text-xs text-white font-semibold flex items-center justify-between shadow-glow-blue">
                          <span>{init.status} ({init.progressPercent}%)</span>
                          <span className="text-[10px] font-mono">{init.targetQuarter}</span>
                        </div>
                      </div>
                    </div>

                    {/* Epics Nested */}
                    <div className="pl-6 space-y-2">
                      {initEpics.map(epic => {
                        const epicFeatures = features.filter(f => f.epicId === epic.id);

                        return (
                          <div key={epic.id} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2 group/epic">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                                  Epic
                                </span>
                                <span className="font-bold text-slate-200 text-xs">{epic.title}</span>
                                <span className="text-[10px] text-slate-500 font-mono">({epic.targetQuarter})</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-emerald-400 font-semibold">{epic.progressPercent}% Complete</span>
                                <button
                                  onClick={() => openAddFeat(epic.id)}
                                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 transition-colors flex items-center gap-0.5"
                                >
                                  <Plus className="w-3 h-3" /> Feature
                                </button>
                                <button
                                  onClick={() => openEditEpic(epic)}
                                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                                  title="Edit Epic"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Delete epic: ${epic.title}?`)) {
                                      deleteEpic(epic.id);
                                    }
                                  }}
                                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-rose-400"
                                  title="Delete Epic"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Features inside Epic */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                              {epicFeatures.map(feat => (
                                <div
                                  key={feat.id}
                                  className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 group/feat transition-all relative"
                                >
                                  <div className="flex items-start justify-between gap-1 mb-1">
                                    <div
                                      onClick={() => setSelectedFeatureIdForInspect(feat.id)}
                                      className="font-semibold text-xs text-white group-hover/feat:text-emerald-400 transition-colors cursor-pointer"
                                    >
                                      {feat.title}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Badge variant={feat.status === 'Released' ? 'green' : 'amber'} size="sm">
                                        {feat.status}
                                      </Badge>
                                      <button
                                        onClick={() => openEditFeat(feat)}
                                        className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                                        title="Edit Feature"
                                      >
                                        <Edit2 className="w-2.5 h-2.5" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          if (window.confirm(`Delete feature: ${feat.title}?`)) {
                                            deleteFeature(feat.id);
                                          }
                                        }}
                                        className="p-1 rounded bg-slate-800 text-slate-400 hover:text-rose-400"
                                        title="Delete Feature"
                                      >
                                        <Trash2 className="w-2.5 h-2.5" />
                                      </button>
                                    </div>
                                  </div>
                                  <div className="text-[10px] text-slate-400 line-clamp-1">{feat.userStorySummary}</div>
                                  <div className="mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-900">
                                    <span className="font-mono text-emerald-400 font-bold">{formatCompactMoney(feat.revenueImpactETB)}</span>
                                    <span className="text-slate-500">{feat.adoptingCustomers} Clients</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: HORIZON (NOW / NEXT / LATER) */}
      {roadmapViewMode === 'horizon' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* NOW LANE */}
          <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-emerald-950/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-glow-brand" />
                <h3 className="font-bold text-white font-display text-sm">NOW (In Active Dev)</h3>
              </div>
              <Badge variant="green">Current Horizon</Badge>
            </div>
            <div className="space-y-2.5">
              {initiatives
                .filter(i => i.horizon === 'Now')
                .map(init => (
                  <div key={init.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 group">
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-white text-xs">{init.title}</div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEditInit(init)} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
                          <Edit2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">{init.description}</p>
                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-900">
                      <span className="text-emerald-400 font-semibold">{init.progressPercent}% Dev Complete</span>
                      <span className="text-slate-500">Lead: {init.owner}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* NEXT LANE */}
          <div className="glass-panel rounded-2xl p-4 border border-blue-500/30 bg-gradient-to-b from-slate-900 to-blue-950/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-glow-blue" />
                <h3 className="font-bold text-white font-display text-sm">NEXT (Planning & Spec)</h3>
              </div>
              <Badge variant="blue">Next Horizon</Badge>
            </div>
            <div className="space-y-2.5">
              {initiatives
                .filter(i => i.horizon === 'Next')
                .map(init => (
                  <div key={init.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-white text-xs">{init.title}</div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEditInit(init)} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
                          <Edit2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">{init.description}</p>
                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-900">
                      <span className="text-blue-400 font-semibold">{init.progressPercent}% Planned</span>
                      <span className="text-slate-500">Lead: {init.owner}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* LATER LANE */}
          <div className="glass-panel rounded-2xl p-4 border border-purple-500/30 bg-gradient-to-b from-slate-900 to-purple-950/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-glow-purple" />
                <h3 className="font-bold text-white font-display text-sm">LATER (Future Vision)</h3>
              </div>
              <Badge variant="purple">Later Horizon</Badge>
            </div>
            <div className="space-y-2.5">
              {initiatives
                .filter(i => i.horizon === 'Later')
                .map(init => (
                  <div key={init.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="font-bold text-white text-xs">{init.title}</div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEditInit(init)} className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white">
                          <Edit2 className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400">{init.description}</p>
                    <div className="flex items-center justify-between text-[10px] pt-2 border-t border-slate-900">
                      <span className="text-purple-400 font-semibold">{init.progressPercent}% Research</span>
                      <span className="text-slate-500">Lead: {init.owner}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: 7-LEVEL HIERARCHY TREE EXPLORER */}
      {roadmapViewMode === 'tree' && (
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Interactive 7-Level Breakdown (Mesob Strategic Cascade)
              </h3>
              <p className="text-xs text-slate-400">
                Click arrows to expand nodes from Strategic Goal down to tasks
              </p>
            </div>
            <button
              onClick={openAddInit}
              className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> New Initiative
            </button>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Level 1: Strategic Goals */}
            {strategy.map((strat, sIdx) => (
              <div key={strat.id} className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/40 space-y-3">
                <div className="flex items-center justify-between text-rose-300 font-bold">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-rose-400" />
                    <span>Level 1: Goal 0{sIdx + 1} — {strat.title}</span>
                  </div>
                  <span className="font-mono text-emerald-400">{formatMoney(strat.financialTargetETB)}</span>
                </div>

                {/* Level 2: Initiatives under this Goal */}
                <div className="ml-6 pl-4 border-l-2 border-blue-500/50 space-y-3">
                  {initiatives.map(init => {
                    const initEpics = epics.filter(e => e.initiativeId === init.id);
                    const isInitExp = expandedNodes[init.id];

                    return (
                      <div key={init.id} className="space-y-2">
                        <div
                          onClick={() => toggleNode(init.id)}
                          className="flex items-center justify-between text-blue-300 font-bold cursor-pointer hover:text-white"
                        >
                          <div className="flex items-center gap-2">
                            {isInitExp ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            <span>Level 2: Initiative — {init.title}</span>
                          </div>
                          <span className="text-[11px] text-slate-400">{init.progressPercent}% Dev</span>
                        </div>

                        {isInitExp && (
                          /* Level 3: Epics */
                          <div className="ml-6 pl-4 border-l-2 border-purple-500/50 space-y-3">
                            {initEpics.map(epic => {
                              const epicFeats = features.filter(f => f.epicId === epic.id);
                              const isEpicExp = expandedNodes[epic.id];

                              return (
                                <div key={epic.id} className="space-y-2">
                                  <div
                                    onClick={() => toggleNode(epic.id)}
                                    className="flex items-center justify-between text-purple-300 font-bold cursor-pointer hover:text-white"
                                  >
                                    <div className="flex items-center gap-2">
                                      {isEpicExp ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                      <span>Level 3: Epic — {epic.title}</span>
                                    </div>
                                    <span className="text-[11px] text-slate-400">{epic.targetQuarter}</span>
                                  </div>

                                  {isEpicExp && (
                                    /* Level 4: Features */
                                    <div className="ml-6 pl-4 border-l-2 border-emerald-500/50 space-y-3">
                                      {epicFeats.map(feat => {
                                        const featStories = userStories.filter(s => s.featureId === feat.id);
                                        const featTasks = devTasks.filter(t => t.featureId === feat.id);
                                        const isFeatExp = expandedNodes[feat.id];

                                        return (
                                          <div key={feat.id} className="space-y-2">
                                            <div
                                              onClick={() => toggleNode(feat.id)}
                                              className="flex items-center justify-between text-emerald-300 font-bold cursor-pointer hover:text-white"
                                            >
                                              <div className="flex items-center gap-2">
                                                {isFeatExp ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                                <span>Level 4: Feature — {feat.title}</span>
                                              </div>
                                              <span className="text-emerald-400">{formatCompactMoney(feat.revenueImpactETB)}</span>
                                            </div>

                                            {isFeatExp && (
                                              /* Level 5, 6, 7 */
                                              <div className="ml-6 pl-4 border-l-2 border-amber-500/50 space-y-2 text-[11px]">
                                                {featStories.map(story => (
                                                  <div key={story.id} className="p-2 rounded bg-slate-900 text-amber-300 border border-slate-800">
                                                    <strong>Level 5: Story</strong> — "{story.title}"
                                                  </div>
                                                ))}
                                                {featTasks.map(task => (
                                                  <div key={task.id} className="ml-4 p-2 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                                                    <strong>Level 6: Task</strong> — {task.taskName} (Dev: {task.developer} | {task.status})
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Initiative Modal */}
      <Modal
        isOpen={isAddInitOpen}
        onClose={() => {
          setIsAddInitOpen(false);
          setEditingInit(null);
        }}
        title={editingInit ? `Edit Initiative: ${editingInit.title}` : 'Add Product Initiative'}
        subtitle="Group multiple epics and features under a strategic initiative"
      >
        <form onSubmit={handleSaveInit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Initiative Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Restaurant Operations & Smart Inventory Suite"
              value={initTitle}
              onChange={e => setInitTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Description & Strategic Impact</label>
            <textarea
              rows={2}
              placeholder="Describe initiative scope and customer value..."
              value={initDesc}
              onChange={e => setInitDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Horizon</label>
              <select
                value={initHorizon}
                onChange={e => setInitHorizon(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Now">Now (Active)</option>
                <option value="Next">Next (Planning)</option>
                <option value="Later">Later (Vision)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Quarter</label>
              <select
                value={initQuarter}
                onChange={e => setInitQuarter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {quarters.map(q => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Progress %</label>
              <input
                type="number"
                value={initProgress}
                onChange={e => setInitProgress(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Product</label>
              <select
                value={initProdId}
                onChange={e => setInitProdId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Initiative Owner</label>
              <input
                type="text"
                value={initOwner}
                onChange={e => setInitOwner(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsAddInitOpen(false);
                setEditingInit(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {editingInit ? 'Save Changes' : 'Create Initiative'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add / Edit Epic Modal */}
      <Modal
        isOpen={isAddEpicOpen}
        onClose={() => {
          setIsAddEpicOpen(false);
          setEditingEpic(null);
        }}
        title={editingEpic ? `Edit Epic: ${editingEpic.title}` : 'Add Product Epic'}
        subtitle="Group related features under a technical epic"
      >
        <form onSubmit={handleSaveEpic} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Epic Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Recipe & Ingredient Costing Module"
              value={epicTitle}
              onChange={e => setEpicTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="What functionality does this epic cover?"
              value={epicDesc}
              onChange={e => setEpicDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Parent Initiative</label>
              <select
                value={targetInitForEpic}
                onChange={e => setTargetInitForEpic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {initiatives.map(i => (
                  <option key={i.id} value={i.id}>
                    {i.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Quarter</label>
              <select
                value={epicQuarter}
                onChange={e => setEpicQuarter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {quarters.map(q => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Progress %</label>
              <input
                type="number"
                value={epicProgress}
                onChange={e => setEpicProgress(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Epic Owner</label>
            <input
              type="text"
              value={epicOwner}
              onChange={e => setEpicOwner(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsAddEpicOpen(false);
                setEditingEpic(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {editingEpic ? 'Save Changes' : 'Create Epic'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add / Edit Feature Modal */}
      <Modal
        isOpen={isAddFeatOpen}
        onClose={() => {
          setIsAddFeatOpen(false);
          setEditingFeat(null);
        }}
        title={editingFeat ? `Edit Feature: ${editingFeat.title}` : 'Add Roadmap Feature'}
        subtitle="Define feature value proposition, user stories, hours, and revenue attribution"
      >
        <form onSubmit={handleSaveFeat} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Feature Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Recipe Gross Margin Calculator Form"
              value={featTitle}
              onChange={e => setFeatTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Value Proposition</label>
            <input
              type="text"
              placeholder="Why build this? (e.g. Gives owners exact visibility into dish margins)"
              value={featValProp}
              onChange={e => setFeatValProp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">User Story Summary</label>
            <textarea
              rows={2}
              placeholder="As a [user], I want [capability] so that [benefit]..."
              value={featUserStory}
              onChange={e => setFeatUserStory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Parent Epic</label>
              <select
                value={targetEpicForFeat}
                onChange={e => setTargetEpicForFeat(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {epics.map(e => (
                  <option key={e.id} value={e.id}>
                    {e.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Priority</label>
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
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Dev Status</label>
              <select
                value={featStatus}
                onChange={e => setFeatStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Backlog">Backlog</option>
                <option value="In Dev">In Dev</option>
                <option value="Testing">Testing</option>
                <option value="Ready">Ready</option>
                <option value="Released">Released</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Est Hours</label>
              <input
                type="number"
                value={featEstHours}
                onChange={e => setFeatEstHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Dev Cost (ETB)</label>
              <input
                type="number"
                value={featDevCost}
                onChange={e => setFeatDevCost(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Adopting Clients</label>
              <input
                type="number"
                value={featAdoptionCusts}
                onChange={e => setFeatAdoptionCusts(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Revenue (ETB)</label>
              <input
                type="number"
                value={featRevImpact}
                onChange={e => setFeatRevImpact(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsAddFeatOpen(false);
                setEditingFeat(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {editingFeat ? 'Save Changes' : 'Add Feature'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
