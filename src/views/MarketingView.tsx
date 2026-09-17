import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Campaign } from '../types';
import {
  Megaphone,
  Plus,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  Edit2,
  Trash2
} from 'lucide-react';

export const MarketingView: React.FC = () => {
  const {
    campaigns,
    products,
    features,
    selectedProductId,
    formatMoney,
    formatCompactMoney,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    setSelectedFeatureIdForInspect
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  // Add form fields
  const [newTitle, setNewTitle] = useState('');
  const [newFeatId, setNewFeatId] = useState(features[0]?.id || 'feat-1');
  const [newChannel, setNewChannel] = useState('Direct Field Sales & Hospitality Seminars');
  const [newAudience, setNewAudience] = useState('Ethiopian F&B Managers & Restaurant Owners');
  const [newBudget, setNewBudget] = useState(50000);
  const [newOwner, setNewOwner] = useState('Hanna Alemayehu');
  const [newStatus, setNewStatus] = useState<'Active' | 'Scheduled' | 'Completed' | 'Paused'>('Active');

  const filteredCampaigns = campaigns.filter(
    c => selectedProductId === 'all' || c.productId === selectedProductId
  );

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budgetETB, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.actualRevenueETB, 0);
  const blendedROI = totalBudget > 0 ? (totalRevenue / totalBudget).toFixed(1) : '0.0';
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const totalWon = campaigns.reduce((acc, c) => acc + c.customersWon, 0);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const feat = features.find(f => f.id === newFeatId) || features[0];
    addCampaign({
      campaignName: newTitle,
      productId: feat ? feat.productId : (products[0]?.id || 'prod-1'),
      linkedFeatureId: newFeatId,
      targetAudience: newAudience,
      channel: newChannel,
      budgetETB: Number(newBudget) || 50000,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
      owner: newOwner,
      leadsGenerated: 0,
      opportunitiesGenerated: 0,
      customersWon: 0,
      actualRevenueETB: 0,
      costETB: Number(newBudget) || 50000,
      roiMultiplier: 0,
      status: newStatus
    });
    setNewTitle('');
    setIsAddModalOpen(false);
  };

  const handleUpdateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCampaign) return;

    updateCampaign(editingCampaign.id, {
      campaignName: editingCampaign.campaignName,
      targetAudience: editingCampaign.targetAudience,
      channel: editingCampaign.channel,
      budgetETB: Number(editingCampaign.budgetETB) || 0,
      owner: editingCampaign.owner,
      leadsGenerated: Number(editingCampaign.leadsGenerated) || 0,
      opportunitiesGenerated: Number(editingCampaign.opportunitiesGenerated) || 0,
      customersWon: Number(editingCampaign.customersWon) || 0,
      actualRevenueETB: Number(editingCampaign.actualRevenueETB) || 0,
      status: editingCampaign.status,
      startDate: editingCampaign.startDate,
      endDate: editingCampaign.endDate
    });

    setEditingCampaign(null);
  };

  const handleDeleteCampaign = (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      deleteCampaign(id);
      if (editingCampaign?.id === id) setEditingCampaign(null);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Module 11 & 12 • Go-To-Market
            </span>
            <span className="text-xs text-slate-400 font-mono">Roadmap Feature → Marketing → Leads → Revenue</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Marketing Strategy & Campaign Manager</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Connect product features directly to marketing campaigns, customer acquisition, and ROI attribution.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Launch Campaign
        </button>
      </div>

      {/* Marketing KPI Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Total Campaign Budget</div>
          <div className="text-xl font-bold text-white font-display mt-0.5">{formatMoney(totalBudget)}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{campaigns.length} Active Campaigns</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Generated Revenue</div>
          <div className="text-xl font-bold text-emerald-400 font-display mt-0.5">{formatMoney(totalRevenue)}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Direct GTM Attribution</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Blended Marketing ROI</div>
          <div className="text-xl font-bold text-amber-400 font-display mt-0.5">{blendedROI}x ROI</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">🟢 Strong Multiplier</div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800">
          <div className="text-[11px] text-slate-400 font-mono uppercase">Total Leads Acquired</div>
          <div className="text-xl font-bold text-cyan-400 font-display mt-0.5">{totalLeads} Leads</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{totalWon} Won Clients</div>
        </div>
      </div>

      {/* Empty State */}
      {campaigns.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/20">
            <Megaphone className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">No Campaigns Created Yet</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Launch Go-To-Market campaigns to generate leads for newly shipped product features and track customer acquisition ROI.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Launch Your First Campaign
          </button>
        </div>
      ) : (
        /* Active Campaigns List */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider font-mono">
              Active Go-To-Market Campaigns
            </h3>
            <span className="text-xs text-slate-400">Tied to Product Features</span>
          </div>

          <div className="space-y-4">
            {filteredCampaigns.map(camp => {
              const product = products.find(p => p.id === camp.productId);
              const feature = features.find(f => f.id === camp.linkedFeatureId);

              return (
                <div
                  key={camp.id}
                  className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {product?.name || 'Mesob Suite'}
                        </span>
                        {feature && (
                          <span
                            onClick={() => setSelectedFeatureIdForInspect(feature.id)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 cursor-pointer hover:bg-purple-500 hover:text-white transition-colors flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3" /> Feature: {feature.title}
                          </span>
                        )}
                        <Badge variant={camp.status === 'Active' ? 'green' : 'blue'}>{camp.status}</Badge>
                      </div>

                      <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-amber-400 shrink-0" />
                        "{camp.campaignName}"
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Target Audience: <span className="text-slate-300">{camp.targetAudience}</span> • Channel: <span className="text-slate-300">{camp.channel}</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end text-xs shrink-0">
                      <div className="flex items-center gap-2 mb-1">
                        <button
                          onClick={() => setEditingCampaign(camp)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1 text-[11px]"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCampaign(camp.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors flex items-center gap-1 text-[11px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                      <span className="text-slate-400">Campaign ROI</span>
                      <span className="text-xl font-extrabold text-emerald-400 font-display">
                        {camp.roiMultiplier}x
                      </span>
                      <span className="text-[11px] text-slate-500">Owner: {camp.owner}</span>
                    </div>
                  </div>

                  {/* Campaign Funnel Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">BUDGET</div>
                      <div className="font-bold text-white mt-0.5">{formatMoney(camp.budgetETB)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">LEADS GENERATED</div>
                      <div className="font-bold text-blue-400 mt-0.5">{camp.leadsGenerated} Leads</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">OPPORTUNITIES</div>
                      <div className="font-bold text-purple-400 mt-0.5">{camp.opportunitiesGenerated} Deals</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">WON CLIENTS</div>
                      <div className="font-bold text-emerald-400 mt-0.5">{camp.customersWon} Clients</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-mono">ACTUAL REVENUE</div>
                      <div className="font-bold text-emerald-400 font-display mt-0.5">
                        {formatMoney(camp.actualRevenueETB)}
                      </div>
                    </div>
                  </div>

                  {/* Timeline and Dates */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      Duration: <strong className="text-slate-300">{camp.startDate}</strong> to <strong className="text-slate-300">{camp.endDate}</strong>
                    </span>

                    <span className="text-slate-400">
                      Net Profit: <strong className="text-emerald-400 font-mono">{formatMoney(camp.actualRevenueETB - camp.budgetETB)}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Launch Campaign Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Launch GTM Marketing Campaign"
        subtitle="Connect product features to customer acquisition campaigns"
      >
        <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Campaign Headline / Message</label>
            <input
              type="text"
              required
              placeholder="e.g. Cut Food Waste by 30% with Recipe Costing"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Linked Feature</label>
              <select
                value={newFeatId}
                onChange={e => setNewFeatId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {features.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Campaign Budget (ETB)</label>
              <input
                type="number"
                required
                value={newBudget}
                onChange={e => setNewBudget(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Marketing Channel</label>
              <input
                type="text"
                value={newChannel}
                onChange={e => setNewChannel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Audience</label>
              <input
                type="text"
                value={newAudience}
                onChange={e => setNewAudience(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Campaign Owner</label>
              <input
                type="text"
                value={newOwner}
                onChange={e => setNewOwner(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Initial Status</label>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Paused">Paused</option>
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
              Launch Campaign
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Campaign Modal */}
      {editingCampaign && (
        <Modal
          isOpen={true}
          onClose={() => setEditingCampaign(null)}
          title={`Edit Campaign: ${editingCampaign.campaignName}`}
          subtitle="Update campaign budget, lead conversion metrics, and revenue attribution"
        >
          <form onSubmit={handleUpdateCampaign} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Campaign Headline</label>
              <input
                type="text"
                required
                value={editingCampaign.campaignName}
                onChange={e => setEditingCampaign({ ...editingCampaign, campaignName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Channel</label>
                <input
                  type="text"
                  value={editingCampaign.channel}
                  onChange={e => setEditingCampaign({ ...editingCampaign, channel: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Audience</label>
                <input
                  type="text"
                  value={editingCampaign.targetAudience}
                  onChange={e => setEditingCampaign({ ...editingCampaign, targetAudience: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Budget (ETB)</label>
                <input
                  type="number"
                  value={editingCampaign.budgetETB}
                  onChange={e => setEditingCampaign({ ...editingCampaign, budgetETB: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Actual Revenue (ETB)</label>
                <input
                  type="number"
                  value={editingCampaign.actualRevenueETB}
                  onChange={e => setEditingCampaign({ ...editingCampaign, actualRevenueETB: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status</label>
                <select
                  value={editingCampaign.status}
                  onChange={e => setEditingCampaign({ ...editingCampaign, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Planned">Planned</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Leads Generated</label>
                <input
                  type="number"
                  value={editingCampaign.leadsGenerated}
                  onChange={e => setEditingCampaign({ ...editingCampaign, leadsGenerated: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Deals Created</label>
                <input
                  type="number"
                  value={editingCampaign.opportunitiesGenerated}
                  onChange={e => setEditingCampaign({ ...editingCampaign, opportunitiesGenerated: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Won Customers</label>
                <input
                  type="number"
                  value={editingCampaign.customersWon}
                  onChange={e => setEditingCampaign({ ...editingCampaign, customersWon: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleDeleteCampaign(editingCampaign.id)}
                className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Campaign
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCampaign(null)}
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
