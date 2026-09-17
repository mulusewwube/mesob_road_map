import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { CustomerFeedback } from '../types';
import {
  MessageSquare,
  Plus,
  Users,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Filter,
  Layers,
  Edit2,
  Trash2
} from 'lucide-react';

export const FeedbackView: React.FC = () => {
  const {
    feedback,
    products,
    features,
    initiatives,
    formatMoney,
    updateFeedbackStatus,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    setSelectedFeatureIdForInspect,
    setActiveView
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<CustomerFeedback | null>(null);

  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Form state for Add
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [problem, setProblem] = useState('');
  const [request, setRequest] = useState('');
  const [prodId, setProdId] = useState(products[0]?.id || 'prod-1');
  const [relatedRev, setRelatedRev] = useState(140000);
  const [priority, setPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');

  const filteredFeedback = feedback.filter(fb => {
    if (filterSource !== 'all' && fb.source !== filterSource) return false;
    if (filterPriority !== 'all' && fb.priority !== filterPriority) return false;
    return true;
  });

  const handleCreateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !problem) return;

    addFeedback({
      customerName,
      companyName: companyName || `${customerName} Restaurant`,
      source: 'Customer',
      productId: prodId,
      problem,
      request: request || 'Automated software feature enhancement',
      businessImpact: 'High',
      frequency: 1,
      priority,
      relatedRevenueETB: Number(relatedRev) || 100000,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    });

    setCustomerName('');
    setCompanyName('');
    setProblem('');
    setRequest('');
    setIsAddModalOpen(false);
  };

  const handleUpdateFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFeedback) return;

    updateFeedback(editingFeedback.id, {
      customerName: editingFeedback.customerName,
      companyName: editingFeedback.companyName,
      problem: editingFeedback.problem,
      request: editingFeedback.request,
      priority: editingFeedback.priority,
      status: editingFeedback.status,
      relatedRevenueETB: Number(editingFeedback.relatedRevenueETB) || 0,
      featureId: editingFeedback.featureId
    });

    setEditingFeedback(null);
  };

  const handleDeleteFeedback = (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer feedback entry?')) {
      deleteFeedback(id);
      if (editingFeedback?.id === id) setEditingFeedback(null);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Module 16 • Feedback Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Feedback → Problem → Feature → Release</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Customer Feedback & Feature Requests</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Triage restaurant pain points and convert customer requests directly into product roadmap initiatives.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Log Customer Feedback
        </button>
      </div>

      {/* Lifecycle Flow Ribbon (Requirement #16) */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2">
          Closed-Loop Customer Feedback Lifecycle
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold">1. Customer Feedback</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold">2. Problem Identified</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold">3. Product Initiative</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold">4. Feature Dev</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold">5. Release v2.5</span>
          <span>→</span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold">6. Satisfied Client</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={filterSource}
            onChange={e => setFilterSource(e.target.value)}
            className="bg-transparent text-slate-200 focus:outline-none"
          >
            <option value="all">All Feedback Sources</option>
            <option value="Customer">Direct Customer</option>
            <option value="Sales">Sales Team</option>
            <option value="Support">Support Tickets</option>
            <option value="User Interview">User Interviews</option>
          </select>
        </div>

        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5">
          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="bg-transparent text-slate-200 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {feedback.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center border border-cyan-500/20">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">No Feedback Logged Yet</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Log real restaurant customer pain points, feature requests, and support tickets to feed your product roadmap.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Log First Feedback
          </button>
        </div>
      ) : (
        /* Feedback Cards */
        <div className="space-y-4">
          {filteredFeedback.map(fb => {
            const product = products.find(p => p.id === fb.productId);
            const feature = features.find(f => f.id === fb.featureId);

            return (
              <div
                key={fb.id}
                className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-cyan-400">
                        Source: {fb.source}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        Product: <strong className="text-white">{product?.name || 'Mesob'}</strong>
                      </span>
                      <Badge variant={fb.priority === 'Critical' ? 'red' : 'amber'}>
                        {fb.priority} Priority
                      </Badge>
                      <Badge variant={fb.status === 'In Development' ? 'purple' : fb.status === 'Planned' ? 'blue' : fb.status === 'Completed' ? 'green' : 'gray'}>
                        {fb.status}
                      </Badge>
                    </div>

                    <h3 className="text-base font-bold text-white font-display">
                      {fb.companyName} — <span className="font-normal text-slate-300">{fb.customerName}</span>
                    </h3>
                  </div>

                  <div className="flex flex-col items-start md:items-end text-xs shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <button
                        onClick={() => setEditingFeedback(fb)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFeedback(fb.id)}
                        className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors flex items-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                    <span className="text-slate-400">Related Client ARR</span>
                    <span className="text-base font-extrabold text-emerald-400 font-mono">
                      {formatMoney(fb.relatedRevenueETB)}
                    </span>
                  </div>
                </div>

                {/* Problem & Request Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="font-semibold text-rose-400 flex items-center gap-1.5 mb-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Customer Problem / Pain Point
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{fb.problem}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5" /> Requested Capability / Solution
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{fb.request}</p>
                  </div>
                </div>

                {/* Footer Actions: Connected Feature & Triage Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
                  {feature ? (
                    <div
                      onClick={() => setSelectedFeatureIdForInspect(feature.id)}
                      className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 cursor-pointer font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Mapped to Feature: {feature.title}</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveView('roadmap')}
                      className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                    >
                      + Convert to Roadmap Feature
                    </button>
                  )}

                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-[11px]">Triage Status:</span>
                    <select
                      value={fb.status}
                      onChange={e => updateFeedbackStatus(fb.id, e.target.value as any)}
                      className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 focus:outline-none"
                    >
                      <option value="New">New</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Planned">Planned</option>
                      <option value="In Development">In Development</option>
                      <option value="Completed">Completed</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Feedback Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log Customer Feedback"
        subtitle="Capture user problem to route into product initiatives"
      >
        <form onSubmit={handleCreateFeedback} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Customer / Contact Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Chef Roberto Castelli"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Restaurant / Company</label>
              <input
                type="text"
                required
                placeholder="e.g. Castelli Ristorante"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Customer Problem / Pain Point</label>
            <textarea
              rows={3}
              required
              placeholder="What obstacle is the customer facing in their day-to-day restaurant operations?"
              value={problem}
              onChange={e => setProblem(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Proposed Solution / Feature Request</label>
            <textarea
              rows={2}
              placeholder="What feature or UI improvement would resolve this?"
              value={request}
              onChange={e => setRequest(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Product</label>
              <select
                value={prodId}
                onChange={e => setProdId(e.target.value)}
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
              <label className="block font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as any)}
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
              onClick={() => setIsAddModalOpen(false)}
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

      {/* Edit Feedback Modal */}
      {editingFeedback && (
        <Modal
          isOpen={true}
          onClose={() => setEditingFeedback(null)}
          title={`Edit Feedback: ${editingFeedback.companyName}`}
          subtitle="Update customer problem statement, priority, and linked roadmap feature"
        >
          <form onSubmit={handleUpdateFeedback} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={editingFeedback.customerName}
                  onChange={e => setEditingFeedback({ ...editingFeedback, customerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Restaurant / Company</label>
                <input
                  type="text"
                  required
                  value={editingFeedback.companyName}
                  onChange={e => setEditingFeedback({ ...editingFeedback, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Problem Statement</label>
              <textarea
                rows={3}
                required
                value={editingFeedback.problem}
                onChange={e => setEditingFeedback({ ...editingFeedback, problem: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Requested Solution</label>
              <textarea
                rows={2}
                value={editingFeedback.request}
                onChange={e => setEditingFeedback({ ...editingFeedback, request: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Priority</label>
                <select
                  value={editingFeedback.priority}
                  onChange={e => setEditingFeedback({ ...editingFeedback, priority: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={editingFeedback.status}
                  onChange={e => setEditingFeedback({ ...editingFeedback, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Planned">Planned</option>
                  <option value="In Development">In Development</option>
                  <option value="Completed">Completed</option>
                  <option value="Declined">Declined</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Related ARR (ETB)</label>
                <input
                  type="number"
                  value={editingFeedback.relatedRevenueETB}
                  onChange={e => setEditingFeedback({ ...editingFeedback, relatedRevenueETB: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Map to Roadmap Feature</label>
              <select
                value={editingFeedback.featureId || ''}
                onChange={e => setEditingFeedback({ ...editingFeedback, featureId: e.target.value || undefined })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="">-- No Linked Feature (Unmapped) --</option>
                {features.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleDeleteFeedback(editingFeedback.id)}
                className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Ticket
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFeedback(null)}
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
