import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/common/Modal';
import { Badge } from '../components/common/Badge';
import { SalesStage, SalesLead } from '../types';
import { PermissionGate } from '../components/common/PermissionGate';
import {
  DollarSign,
  Plus,
  TrendingUp,
  User,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  CheckCircle2,
  Filter,
  Phone,
  Mail,
  MapPin,
  Edit2,
  Trash2,
  Shield,
  Lock,
  UserCheck
} from 'lucide-react';

const PIPELINE_STAGES: SalesStage[] = [
  'Lead',
  'Qualified',
  'Demo',
  'Proposal',
  'Negotiation',
  'Won'
];

export const SalesView: React.FC = () => {
  const {
    salesLeads,
    products,
    campaigns,
    selectedProductId,
    formatMoney,
    formatCompactMoney,
    moveSalesLeadStage,
    addSalesLead,
    updateSalesLead,
    deleteSalesLead,
    hasPermission,
    canAccessRecord,
    currentUser,
    currentRole,
    getEffectiveScope
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<SalesLead | null>(null);

  // Add form state
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadValue, setLeadValue] = useState(150000);
  const [leadSalesperson, setLeadSalesperson] = useState(currentUser.name || 'Yonas Mulugeta');
  const [leadCity, setLeadCity] = useState('Addis Ababa (Bole)');
  const [leadProd, setLeadProd] = useState(products[0]?.id || 'prod-1');
  const [leadPhone, setLeadPhone] = useState('+251 91 111 2222');
  const [leadEmail, setLeadEmail] = useState('');

  const salesScope = getEffectiveScope('sales');

  const filteredLeads = salesLeads.filter(l => {
    const matchesProduct = selectedProductId === 'all' || l.productId === selectedProductId;
    const hasRecordAccess = canAccessRecord('sales', l.salesperson, 'Commercial & Sales');
    return matchesProduct && hasRecordAccess;
  });

  const totalPipelineValue = filteredLeads.reduce((acc, l) => acc + l.expectedRevenueETB, 0);
  const weightedPipelineValue = filteredLeads.reduce(
    (acc, l) => acc + (l.expectedRevenueETB * l.probabilityPercent) / 100,
    0
  );
  const totalWonRevenue = filteredLeads
    .filter(l => l.status === 'Won')
    .reduce((acc, l) => acc + (l.actualRevenueETB || l.expectedRevenueETB), 0);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadCompany || !leadName) return;

    addSalesLead({
      leadName,
      companyName: leadCompany,
      contactEmail: leadEmail || `contact@${leadCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.et`,
      contactPhone: leadPhone || '+251 91 111 2222',
      source: 'Direct Field Sales',
      productId: leadProd,
      salesperson: leadSalesperson,
      opportunityName: `${leadCompany} - Mesob SaaS Suite`,
      expectedRevenueETB: Number(leadValue) || 120000,
      probabilityPercent: 20,
      expectedClosingDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      actualRevenueETB: 0,
      status: 'Lead',
      city: leadCity
    });

    setLeadName('');
    setLeadCompany('');
    setIsAddModalOpen(false);
  };

  const handleUpdateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;

    updateSalesLead(editingLead.id, {
      companyName: editingLead.companyName,
      leadName: editingLead.leadName,
      expectedRevenueETB: Number(editingLead.expectedRevenueETB) || 0,
      probabilityPercent: Number(editingLead.probabilityPercent) || 0,
      salesperson: editingLead.salesperson,
      status: editingLead.status,
      city: editingLead.city,
      contactPhone: editingLead.contactPhone,
      contactEmail: editingLead.contactEmail,
      expectedClosingDate: editingLead.expectedClosingDate,
      actualRevenueETB: editingLead.status === 'Won' ? editingLead.expectedRevenueETB : editingLead.actualRevenueETB
    });

    setEditingLead(null);
  };

  const handleDeleteLead = (id: string) => {
    if (window.confirm('Are you sure you want to delete this sales opportunity?')) {
      deleteSalesLead(id);
      if (editingLead?.id === id) setEditingLead(null);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-full mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Module 13 • Sales Pipeline CRM
            </span>
            <span className="text-xs text-slate-400 font-mono">Marketing Leads → Deals → Won Customers</span>
            {salesScope !== 'ALL' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Shield className="w-3 h-3 text-amber-400" />
                <span>Scope: {salesScope} ({salesScope === 'OWN' ? currentUser.name : currentUser.team})</span>
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Sales Pipeline & Opportunity CRM</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track deals across Ethiopian restaurants, hotel F&B groups, and multi-branch cafes from Lead to Won.
          </p>
        </div>

        <PermissionGate module="sales" action="create">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Sales Opportunity
          </button>
        </PermissionGate>
      </div>

      {/* Scope Alert Banner if restricted to OWN / TEAM */}
      {salesScope === 'OWN' && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>RBAC Record Scope: OWN</strong> — You are viewing only deals assigned to <strong>{currentUser.name}</strong>. Pipeline values and totals reflect your assigned quota.
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
            {filteredLeads.length} of {salesLeads.length} deals visible
          </span>
        </div>
      )}

      {/* Pipeline Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Total Pipeline Value</div>
          <div className="text-xl font-bold text-white font-display mt-0.5">
            {formatMoney(totalPipelineValue)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">{filteredLeads.length} Active Deals</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Weighted Forecast Value</div>
          <div className="text-xl font-bold text-emerald-400 font-display mt-0.5">
            {formatMoney(weightedPipelineValue)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Probability-Adjusted</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Won Deals (Current Q)</div>
          <div className="text-xl font-bold text-emerald-400 font-display mt-0.5">
            {formatMoney(totalWonRevenue)}
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">Converted to Active MRR</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Average Deal Size</div>
          <div className="text-xl font-bold text-cyan-400 font-display mt-0.5">
            {formatMoney(filteredLeads.length > 0 ? totalPipelineValue / filteredLeads.length : 0)}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">Hospitality Enterprise</div>
        </div>
      </div>

      {/* Empty State */}
      {salesLeads.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">No Sales Opportunities Logged</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Your sales CRM pipeline is empty. Add restaurant prospect opportunities and advance them from initial Lead to Won Deals.
          </p>
          <PermissionGate module="sales" action="create">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add Your First Opportunity
            </button>
          </PermissionGate>
        </div>
      ) : (
        /* 6-Stage Pipeline Board */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1300px]">
            {PIPELINE_STAGES.map((stage, idx) => {
              const stageLeads = filteredLeads.filter(l => l.status === stage);
              const stageTotal = stageLeads.reduce((acc, l) => acc + l.expectedRevenueETB, 0);

              const stageBorder =
                stage === 'Won'
                  ? 'border-emerald-500/40 text-emerald-400'
                  : stage === 'Negotiation'
                  ? 'border-purple-500/40 text-purple-400'
                  : stage === 'Proposal'
                  ? 'border-blue-500/40 text-blue-400'
                  : 'border-slate-800 text-slate-400';

              return (
                <div
                  key={stage}
                  className="w-56 bg-slate-950/60 border border-slate-800/90 rounded-2xl p-3 flex flex-col shrink-0 min-h-[520px]"
                >
                  {/* Column Header */}
                  <div className={`pb-2.5 mb-2.5 border-b ${stageBorder}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider">
                        {stage}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-white">
                        {stageLeads.length}
                      </span>
                    </div>
                    <div className="text-[11px] font-bold text-white font-mono mt-1">
                      {formatCompactMoney(stageTotal)}
                    </div>
                  </div>

                  {/* Deal Cards */}
                  <div className="space-y-2.5 flex-1 overflow-y-auto">
                    {stageLeads.map(lead => {
                      const product = products.find(p => p.id === lead.productId);
                      const currentStageIdx = PIPELINE_STAGES.indexOf(stage);
                      const nextStage = currentStageIdx < PIPELINE_STAGES.length - 1 ? PIPELINE_STAGES[currentStageIdx + 1] : null;
                      const prevStage = currentStageIdx > 0 ? PIPELINE_STAGES[currentStageIdx - 1] : null;

                      // Permission check for moving to 'Won' (deal approval)
                      const isNextStageWon = nextStage === 'Won';
                      const canAdvance = !isNextStageWon || hasPermission('sales', 'approve');

                      return (
                        <div
                          key={lead.id}
                          className="glass-panel p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-2 group shadow-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-emerald-400">
                              {product?.code || 'SAAS'}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                                {lead.probabilityPercent}%
                              </span>
                              {hasPermission('sales', 'edit') && (
                                <button
                                  onClick={() => setEditingLead(lead)}
                                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                                  title="Edit Opportunity"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              )}
                              {hasPermission('sales', 'delete') && (
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                  title="Delete Opportunity"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div
                            onClick={() => {
                              if (hasPermission('sales', 'edit')) setEditingLead(lead);
                            }}
                            className={hasPermission('sales', 'edit') ? 'cursor-pointer' : ''}
                          >
                            <div className="font-bold text-white text-xs group-hover:text-emerald-400 transition-colors">
                              {lead.companyName}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <User className="w-3 h-3" /> {lead.leadName}
                            </div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-2.5 h-2.5" /> {lead.city}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                            <span className="font-extrabold text-emerald-400 font-mono">
                              {formatMoney(lead.expectedRevenueETB)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span>Rep: <strong className="text-slate-300">{lead.salesperson.split(' ')[0]}</strong></span>
                            <span>Close: {lead.expectedClosingDate.slice(5)}</span>
                          </div>

                          {/* Advance / Back Pipeline Buttons with RBAC Approval Gate */}
                          <div className="flex items-center gap-1 pt-1">
                            {prevStage && hasPermission('sales', 'edit') && (
                              <button
                                onClick={() => moveSalesLeadStage(lead.id, prevStage)}
                                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-[9px] transition-colors"
                                title={`Move back to ${prevStage}`}
                              >
                                ←
                              </button>
                            )}
                            {nextStage && (
                              canAdvance ? (
                                <button
                                  onClick={() => moveSalesLeadStage(lead.id, nextStage)}
                                  className="flex-1 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-[10px] transition-all border border-emerald-500/30 flex items-center justify-center gap-0.5"
                                >
                                  <span>Move to {nextStage}</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              ) : (
                                <div
                                  className="flex-1 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 font-bold text-[10px] flex items-center justify-center gap-1 cursor-not-allowed"
                                  title="Closing and winning deals requires APPROVE permission (Sales Manager / Super Admin)"
                                >
                                  <Lock className="w-3 h-3 text-amber-400" />
                                  <span>Approval Required</span>
                                </div>
                              )
                            )}
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
      )}

      {/* Add Lead Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Sales Opportunity"
        subtitle="Capture new restaurant prospect in the CRM pipeline"
      >
        <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Restaurant / Client Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Hyatt Regency Addis F&B Lounges"
              value={leadCompany}
              onChange={e => setLeadCompany(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Contact Person & Role</label>
              <input
                type="text"
                required
                placeholder="e.g. Dawit Wolde (F&B Director)"
                value={leadName}
                onChange={e => setLeadName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Deal Value (ETB)</label>
              <input
                type="number"
                required
                value={leadValue}
                onChange={e => setLeadValue(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Product</label>
              <select
                value={leadProd}
                onChange={e => setLeadProd(e.target.value)}
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
              <label className="block font-semibold text-slate-300 mb-1">Assigned Salesperson</label>
              <input
                type="text"
                value={leadSalesperson}
                onChange={e => setLeadSalesperson(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">City / Neighborhood</label>
              <input
                type="text"
                value={leadCity}
                onChange={e => setLeadCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={leadPhone}
                onChange={e => setLeadPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors"
            >
              Create Opportunity
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Lead Modal */}
      {editingLead && (
        <Modal
          isOpen={true}
          onClose={() => setEditingLead(null)}
          title={`Edit Opportunity: ${editingLead.companyName}`}
          subtitle="Update deal value, pipeline stage, contact person, and closing probability"
        >
          <form onSubmit={handleUpdateLead} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Restaurant / Client Name</label>
                <input
                  type="text"
                  required
                  value={editingLead.companyName}
                  onChange={e => setEditingLead({ ...editingLead, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Contact Person</label>
                <input
                  type="text"
                  required
                  value={editingLead.leadName}
                  onChange={e => setEditingLead({ ...editingLead, leadName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Deal Value (ETB)</label>
                <input
                  type="number"
                  required
                  value={editingLead.expectedRevenueETB}
                  onChange={e => setEditingLead({ ...editingLead, expectedRevenueETB: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Stage</label>
                <select
                  value={editingLead.status}
                  onChange={e => setEditingLead({ ...editingLead, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {PIPELINE_STAGES.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Probability %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingLead.probabilityPercent}
                  onChange={e => setEditingLead({ ...editingLead, probabilityPercent: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assigned Sales Rep</label>
                <input
                  type="text"
                  value={editingLead.salesperson}
                  onChange={e => setEditingLead({ ...editingLead, salesperson: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">City / Location</label>
                <input
                  type="text"
                  value={editingLead.city}
                  onChange={e => setEditingLead({ ...editingLead, city: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Phone</label>
                <input
                  type="text"
                  value={editingLead.contactPhone}
                  onChange={e => setEditingLead({ ...editingLead, contactPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Closing Target Date</label>
                <input
                  type="date"
                  value={editingLead.expectedClosingDate}
                  onChange={e => setEditingLead({ ...editingLead, expectedClosingDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {hasPermission('sales', 'delete') ? (
                <button
                  type="button"
                  onClick={() => handleDeleteLead(editingLead.id)}
                  className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Deal
                </button>
              ) : (
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Deletion restricted (Sales Rep role)</span>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
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
