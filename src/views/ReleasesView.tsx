import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { Release } from '../types';
import { PermissionGate } from '../components/common/PermissionGate';
import {
  Rocket,
  Plus,
  CheckCircle2,
  Clock,
  FileText,
  Megaphone,
  AlertCircle,
  Sparkles,
  Bug,
  Layers,
  ArrowRight,
  ExternalLink,
  Edit2,
  Trash2,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const ReleasesView: React.FC = () => {
  const {
    releases,
    products,
    features,
    addRelease,
    updateRelease,
    deleteRelease,
    setSelectedFeatureIdForInspect,
    hasPermission,
    currentRole
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRelease, setEditingRelease] = useState<Release | null>(null);

  // Add Form state
  const [newVersion, setNewVersion] = useState('');
  const [newProductId, setNewProductId] = useState(products[0]?.id || 'prod-1');
  const [newDate, setNewDate] = useState('2026-10-15');
  const [newType, setNewType] = useState<'Major' | 'Minor' | 'Patch'>('Minor');
  const [newStatus, setNewStatus] = useState<'Planned' | 'Staging' | 'Released'>('Planned');
  const [newLead, setNewLead] = useState('Abebe Bekele');
  const [newQaStatus, setNewQaStatus] = useState<'Passed' | 'In Progress' | 'Blocked'>('In Progress');
  const [newUatStatus, setNewUatStatus] = useState<'Approved' | 'Pending' | 'Changes Requested'>('Pending');
  const [newMarketingRequired, setNewMarketingRequired] = useState(true);
  const [newNotes, setNewNotes] = useState('');
  const [newImprovements, setNewImprovements] = useState('Enhanced UI speed and reporting');
  const [newBugFixes, setNewBugFixes] = useState('General stability and latency improvements');

  const handleCreateRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersion) return;

    addRelease({
      version: newVersion,
      productId: newProductId,
      releaseDate: newDate,
      releaseType: newType,
      featureIds: features.slice(0, 2).map(f => f.id),
      bugFixes: newBugFixes.split('\n').filter(b => b.trim().length > 0),
      improvements: newImprovements.split('\n').filter(i => i.trim().length > 0),
      leadDeveloper: newLead,
      qaStatus: newQaStatus,
      uatStatus: newUatStatus,
      documentation: 'https://docs.mesob.et/releases',
      marketingRequired: newMarketingRequired,
      status: newStatus,
      changelogNotes: newNotes || 'Scheduled upcoming release.'
    });

    setNewVersion('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleUpdateRelease = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRelease) return;

    updateRelease(editingRelease.id, {
      version: editingRelease.version,
      productId: editingRelease.productId,
      releaseDate: editingRelease.releaseDate,
      releaseType: editingRelease.releaseType,
      status: editingRelease.status,
      leadDeveloper: editingRelease.leadDeveloper,
      qaStatus: editingRelease.qaStatus,
      uatStatus: editingRelease.uatStatus,
      marketingRequired: editingRelease.marketingRequired,
      documentation: editingRelease.documentation,
      changelogNotes: editingRelease.changelogNotes,
      bugFixes: typeof editingRelease.bugFixes === 'string' ? (editingRelease.bugFixes as string).split('\n').filter(Boolean) : editingRelease.bugFixes,
      improvements: typeof editingRelease.improvements === 'string' ? (editingRelease.improvements as string).split('\n').filter(Boolean) : editingRelease.improvements
    });

    setEditingRelease(null);
  };

  const handleDeleteRelease = (id: string) => {
    if (window.confirm('Are you sure you want to delete this release?')) {
      deleteRelease(id);
      if (editingRelease?.id === id) setEditingRelease(null);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Module 10 • Release Hub
            </span>
            <span className="text-xs text-slate-400 font-mono">Development → Release → Market</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Release Management & Changelogs</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Every development activity connects to a release with QA verification and marketing readiness.
          </p>
        </div>

        <PermissionGate module="releases" action="create">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create New Release
          </button>
        </PermissionGate>
      </div>

      {/* Empty State */}
      {releases.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/20">
            <Rocket className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">No Releases Scheduled Yet</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Schedule releases to bundle features, manage QA/UAT milestones, and publish customer changelogs.
          </p>
          <PermissionGate module="releases" action="create">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Schedule First Release
            </button>
          </PermissionGate>
        </div>
      ) : (
        /* Releases List */
        <div className="space-y-6">
          {releases.map(rel => {
            const product = products.find(p => p.id === rel.productId);
            const relFeatures = features.filter(f => rel.featureIds.includes(f.id));

            return (
              <div
                key={rel.id}
                className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all space-y-5"
              >
                {/* Release Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {product?.name || 'Mesob Suite'}
                      </span>
                      <Badge variant={rel.releaseType === 'Major' ? 'purple' : 'blue'}>
                        {rel.releaseType} Release
                      </Badge>
                      <Badge variant={rel.status === 'Released' ? 'green' : 'amber'}>
                        {rel.status}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-amber-400" />
                      {rel.version}
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl">{rel.changelogNotes}</p>
                  </div>

                  <div className="flex flex-col items-start md:items-end text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      {hasPermission('releases', 'edit') && (
                        <button
                          onClick={() => setEditingRelease(rel)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1 text-[11px]"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                      )}
                      {hasPermission('releases', 'delete') && (
                        <button
                          onClick={() => handleDeleteRelease(rel.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors flex items-center gap-1 text-[11px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      )}
                    </div>
                    <span className="text-slate-400">Release Date</span>
                    <span className="text-base font-bold text-white font-mono mt-0.5">{rel.releaseDate}</span>
                    <span className="text-[11px] text-slate-500">Lead: {rel.leadDeveloper}</span>
                  </div>
                </div>

                {/* QA & UAT Readiness Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">QA STATUS</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{rel.qaStatus}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">UAT STATUS</div>
                    <div className="font-bold text-amber-400 mt-0.5">{rel.uatStatus}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">MARKETING REQUIRED</div>
                    <div className="font-bold text-purple-400 mt-0.5">
                      {rel.marketingRequired ? 'Yes (Campaign Scheduled)' : 'Internal Only'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-mono">DOCUMENTATION</div>
                    <a
                      href={rel.documentation}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      User Guide <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Changelog Breakdown (Features / Improvements / Fixes) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Included Features */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Included Features ({relFeatures.length})
                    </div>
                    <div className="space-y-1.5">
                      {relFeatures.map(f => (
                        <div
                          key={f.id}
                          onClick={() => setSelectedFeatureIdForInspect(f.id)}
                          className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 cursor-pointer group transition-colors"
                        >
                          <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
                            {f.title}
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">{f.userStorySummary}</div>
                        </div>
                      ))}
                      {relFeatures.length === 0 && (
                        <div className="text-[11px] text-slate-500 italic p-1">No linked features yet</div>
                      )}
                    </div>
                  </div>

                  {/* Improvements */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-blue-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Key Improvements
                    </div>
                    <ul className="space-y-1.5 text-slate-300 text-[11px]">
                      {(Array.isArray(rel.improvements) ? rel.improvements : []).map((imp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bug Fixes */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-rose-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Bug className="w-3.5 h-3.5" /> Bug Fixes
                    </div>
                    <ul className="space-y-1.5 text-slate-300 text-[11px]">
                      {(Array.isArray(rel.bugFixes) ? rel.bugFixes : []).map((bug, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{bug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Release Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Schedule New Release"
        subtitle="Bundle features into a version tag with QA and documentation criteria"
      >
        <form onSubmit={handleCreateRelease} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Release Version Tag</label>
              <input
                type="text"
                required
                placeholder="e.g. MesobOrdering v2.6"
                value={newVersion}
                onChange={e => setNewVersion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Product</label>
              <select
                value={newProductId}
                onChange={e => setNewProductId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Launch Date</label>
              <input
                type="date"
                required
                value={newDate}
                onChange={e => setNewDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Release Type</label>
              <select
                value={newType}
                onChange={e => setNewType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Major">Major Version</option>
                <option value="Minor">Minor Feature</option>
                <option value="Patch">Patch / Hotfix</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Release Status</label>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Planned">Planned</option>
                <option value="Staging">Staging</option>
                <option value="Released">Released</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Lead Developer</label>
              <input
                type="text"
                value={newLead}
                onChange={e => setNewLead(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">QA Status</label>
              <select
                value={newQaStatus}
                onChange={e => setNewQaStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Passed">Passed</option>
                <option value="In Progress">In Progress</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Changelog Summary Notes</label>
            <textarea
              rows={2}
              placeholder="Summary of changes included in this release..."
              value={newNotes}
              onChange={e => setNewNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Key Improvements (one per line)</label>
              <textarea
                rows={2}
                value={newImprovements}
                onChange={e => setNewImprovements(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Bug Fixes (one per line)</label>
              <textarea
                rows={2}
                value={newBugFixes}
                onChange={e => setNewBugFixes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
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
              Create Release
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Release Modal */}
      {editingRelease && (
        <Modal
          isOpen={true}
          onClose={() => setEditingRelease(null)}
          title={`Edit Release: ${editingRelease.version}`}
          subtitle="Modify release milestone, changelog notes, QA validation, and launch dates"
        >
          <form onSubmit={handleUpdateRelease} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Version Tag</label>
                <input
                  type="text"
                  required
                  value={editingRelease.version}
                  onChange={e => setEditingRelease({ ...editingRelease, version: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Release Status</label>
                <select
                  value={editingRelease.status}
                  onChange={e => setEditingRelease({ ...editingRelease, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Planned">Planned</option>
                  <option value="Staging">Staging</option>
                  <option value="Released">Released</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Launch Date</label>
                <input
                  type="date"
                  value={editingRelease.releaseDate}
                  onChange={e => setEditingRelease({ ...editingRelease, releaseDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Release Type</label>
                <select
                  value={editingRelease.releaseType}
                  onChange={e => setEditingRelease({ ...editingRelease, releaseType: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Major">Major</option>
                  <option value="Minor">Minor</option>
                  <option value="Patch">Patch</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">QA Status</label>
                <select
                  value={editingRelease.qaStatus}
                  onChange={e => setEditingRelease({ ...editingRelease, qaStatus: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Passed">Passed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Changelog Summary</label>
              <textarea
                rows={3}
                value={editingRelease.changelogNotes}
                onChange={e => setEditingRelease({ ...editingRelease, changelogNotes: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleDeleteRelease(editingRelease.id)}
                className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Release
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingRelease(null)}
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
