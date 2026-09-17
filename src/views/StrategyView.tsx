import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { StrategicObjective, KPIItem } from '../types';
import {
  Target,
  Plus,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Layers,
  Sparkles,
  Milestone,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2
} from 'lucide-react';

export const StrategyView: React.FC = () => {
  const {
    strategy,
    products,
    initiatives,
    formatMoney,
    formatCompactMoney,
    setActiveView,
    addStrategicObjective,
    updateStrategicObjective,
    deleteStrategicObjective
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingObjective, setEditingObjective] = useState<StrategicObjective | null>(null);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTargetETB, setNewTargetETB] = useState(5000000);
  const [newCustTarget, setNewCustTarget] = useState(200);
  const [newMarket, setNewMarket] = useState('Ethiopia (Hospitality SaaS)');
  const [newOwner, setNewOwner] = useState('Dawit Getachew (CEO)');
  const [newPriority, setNewPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [newStatus, setNewStatus] = useState<StrategicObjective['status']>('In Progress');

  const openAddModal = () => {
    setEditingObjective(null);
    setNewTitle('');
    setNewGoal('');
    setNewDesc('');
    setNewTargetETB(5000000);
    setNewCustTarget(200);
    setNewMarket('Ethiopia (Hospitality SaaS)');
    setNewOwner('Executive Lead');
    setNewPriority('High');
    setNewStatus('In Progress');
    setIsAddModalOpen(true);
  };

  const openEditModal = (obj: StrategicObjective) => {
    setEditingObjective(obj);
    setNewTitle(obj.title);
    setNewGoal(obj.businessGoal);
    setNewDesc(obj.description);
    setNewTargetETB(obj.financialTargetETB);
    setNewCustTarget(obj.customerTarget);
    setNewMarket(obj.market);
    setNewOwner(obj.owner);
    setNewPriority(obj.priority);
    setNewStatus(obj.status);
    setIsAddModalOpen(true);
  };

  const handleSaveObjective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    if (editingObjective) {
      updateStrategicObjective(editingObjective.id, {
        title: newTitle,
        businessGoal: newGoal,
        description: newDesc,
        financialTargetETB: Number(newTargetETB),
        customerTarget: Number(newCustTarget),
        market: newMarket,
        owner: newOwner,
        priority: newPriority,
        status: newStatus
      });
    } else {
      addStrategicObjective({
        title: newTitle,
        businessGoal: newGoal || 'Drive market expansion and SaaS revenue.',
        description: newDesc,
        financialTargetETB: Number(newTargetETB) || 5000000,
        customerTarget: Number(newCustTarget) || 200,
        market: newMarket,
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
        owner: newOwner,
        priority: newPriority,
        status: newStatus,
        kpis: [
          {
            id: `kpi-${Date.now()}`,
            name: 'Annual SaaS Revenue Target',
            current: 0,
            target: Number(newTargetETB),
            unit: 'ETB',
            trend: 'up',
            status: 'yellow'
          }
        ],
        linkedProductIds: products.map(p => p.id),
        linkedInitiativeIds: []
      });
    }

    setIsAddModalOpen(false);
    setEditingObjective(null);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Module 4 • Strategy
            </span>
            <span className="text-xs text-slate-400 font-mono">Why Are We Building It?</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Company Strategy & Strategic Objectives</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Top-level business goals automatically cascading into Product Initiatives, Epics, and Engineering Tasks.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add Strategic Objective
        </button>
      </div>

      {/* Strategic Hierarchy Diagram Card */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 bg-slate-950/40">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
          Automatic Lifecycle Cascade
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
            1. Company Strategy
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            2. Products & Strategy
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
            3. Initiatives & Epics
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
            4. Features & Tasks
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
          <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            5. Revenue & Feedback
          </div>
        </div>
      </div>

      {/* Empty State */}
      {strategy.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-3">
          <Target className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white font-display">No Strategic Goals Defined</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You have not defined company strategic objectives yet. Click below to specify financial and customer acquisition goals.
          </p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Your First Strategic Goal
          </button>
        </div>
      )}

      {/* Strategic Objectives Cards */}
      <div className="space-y-4">
        {strategy.map((obj, idx) => {
          const linkedProds = products.filter(p => obj.linkedProductIds.includes(p.id));
          const linkedInits = initiatives.filter(i => obj.linkedInitiativeIds.includes(i.id));

          return (
            <div
              key={obj.id}
              className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all space-y-5 relative"
            >
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-rose-400">OBJ-0{idx + 1}</span>
                    <Badge variant={obj.priority === 'Critical' ? 'red' : 'amber'}>
                      {obj.priority} Priority
                    </Badge>
                    <Badge variant={obj.status === 'Achieved' ? 'green' : 'blue'}>
                      {obj.status}
                    </Badge>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => openEditModal(obj)}
                        className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        title="Edit Strategic Goal"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete strategic objective: ${obj.title}?`)) {
                            deleteStrategicObjective(obj.id);
                          }
                        }}
                        className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                        title="Delete Goal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold text-white font-display">{obj.title}</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">{obj.description}</p>
                </div>

                <div className="flex flex-col items-start md:items-end shrink-0 text-xs">
                  <span className="text-slate-400">Revenue Target</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-display">
                    {formatMoney(obj.financialTargetETB)}
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    Customer Target: <strong className="text-slate-300">{obj.customerTarget} Clients</strong>
                  </span>
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                <div>
                  <div className="text-[11px] text-slate-400">Target Market</div>
                  <div className="font-semibold text-white mt-0.5">{obj.market}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Executive Owner</div>
                  <div className="font-semibold text-white mt-0.5">{obj.owner}</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Timeline</div>
                  <div className="font-semibold text-white mt-0.5">
                    {obj.startDate} → {obj.endDate}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">Linked Initiatives</div>
                  <div className="font-semibold text-emerald-400 mt-0.5">
                    {linkedInits.length} Initiatives Active
                  </div>
                </div>
              </div>

              {/* Key Result KPIs */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
                  Key Performance Indicators (OKRs)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {obj.kpis.map(kpi => (
                    <div
                      key={kpi.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-200">{kpi.name}</div>
                        <div className="text-sm font-bold text-white mt-1">
                          {kpi.unit === 'ETB'
                            ? formatMoney(kpi.current)
                            : `${kpi.current} ${kpi.unit}`}
                          <span className="text-xs font-normal text-slate-400 ml-1.5">
                            / {kpi.unit === 'ETB' ? formatMoney(kpi.target) : `${kpi.target} ${kpi.unit}`}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`w-3 h-3 rounded-full ${
                          kpi.status === 'green'
                            ? 'bg-emerald-400 shadow-[0_0_8px_#4ade80]'
                            : kpi.status === 'yellow'
                            ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                            : 'bg-rose-400 shadow-[0_0_8px_#f43f5e]'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Connected Products & Initiatives Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 font-semibold flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-slate-500" /> Connected Products:
                  </span>
                  {linkedProds.map(p => (
                    <span
                      key={p.id}
                      className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-200 border border-slate-700 font-medium"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveView('roadmap')}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  View Connected Roadmaps <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Strategic Objective Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingObjective(null);
        }}
        title={editingObjective ? `Edit Objective: ${editingObjective.title}` : 'Create Strategic Objective'}
        subtitle="Define high-level business goal and financial target"
      >
        <form onSubmit={handleSaveObjective} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Strategic Objective Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Increase restaurant SaaS revenue to 15,000,000 ETB"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Business Goal & Rationale</label>
            <textarea
              rows={3}
              placeholder="Why are we building it and what business results will it deliver?"
              value={newGoal}
              onChange={e => setNewGoal(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Annual Revenue Target (ETB)</label>
              <input
                type="number"
                required
                value={newTargetETB}
                onChange={e => setNewTargetETB(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Customer Target (Count)</label>
              <input
                type="number"
                required
                value={newCustTarget}
                onChange={e => setNewCustTarget(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Market</label>
              <input
                type="text"
                value={newMarket}
                onChange={e => setNewMarket(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Strategic Owner</label>
              <input
                type="text"
                value={newOwner}
                onChange={e => setNewOwner(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Status</label>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Draft">Draft</option>
                <option value="In Progress">In Progress</option>
                <option value="Achieved">Achieved</option>
                <option value="At Risk">At Risk</option>
                <option value="Deferred">Deferred</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingObjective(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              {editingObjective ? 'Save Changes' : 'Create Strategic Goal'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
