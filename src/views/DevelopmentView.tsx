import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { DevKanbanStage, DevTask } from '../types';
import {
  GitPullRequest,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  User,
  Layers,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  Edit2,
  Trash2,
  ExternalLink,
  Code2
} from 'lucide-react';

import { PermissionGate } from '../components/common/PermissionGate';
import { Shield, Lock } from 'lucide-react';

const KANBAN_STAGES: DevKanbanStage[] = [
  'BACKLOG',
  'TODO',
  'IN PROGRESS',
  'CODE REVIEW',
  'TESTING',
  'UAT',
  'READY FOR RELEASE',
  'RELEASED'
];

export const DevelopmentView: React.FC = () => {
  const {
    devTasks,
    products,
    features,
    releases,
    selectedProductId,
    moveDevTaskStage,
    addDevTask,
    updateDevTask,
    deleteDevTask,
    setSelectedFeatureIdForInspect,
    hasPermission,
    canAccessRecord,
    currentUser,
    getEffectiveScope
  } = useApp();

  const [filterDev, setFilterDev] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterQA, setFilterQA] = useState<string>('all');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<DevTask | null>(null);

  // Form state for Add
  const [taskName, setTaskName] = useState('');
  const [developer, setDeveloper] = useState(currentUser.name || 'Abebe Bekele');
  const [productId, setProductId] = useState(products[0]?.id || 'prod-1');
  const [featureId, setFeatureId] = useState(features[0]?.id || 'feat-1');
  const [priority, setPriority] = useState<'Critical' | 'High' | 'Medium' | 'Low'>('High');
  const [status, setStatus] = useState<DevKanbanStage>('TODO');
  const [estimatedHours, setEstimatedHours] = useState(24);
  const [actualHours, setActualHours] = useState(0);
  const [qaStatus, setQaStatus] = useState<'Pending' | 'In QA' | 'Passed' | 'Failed'>('Pending');
  const [dueDate, setDueDate] = useState('2026-10-15');
  const [prUrl, setPrUrl] = useState('https://github.com/mesob/ordering/pull/402');

  const devScope = getEffectiveScope('development');

  const filteredTasks = devTasks.filter(task => {
    if (selectedProductId !== 'all' && task.productId !== selectedProductId) return false;
    if (filterDev !== 'all' && task.developer !== filterDev) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    if (filterQA !== 'all' && task.qaStatus !== filterQA) return false;
    if (!canAccessRecord('development', task.developer, 'Engineering')) return false;
    return true;
  });

  const getNextStage = (current: DevKanbanStage): DevKanbanStage | null => {
    const idx = KANBAN_STAGES.indexOf(current);
    if (idx < KANBAN_STAGES.length - 1) return KANBAN_STAGES[idx + 1];
    return null;
  };

  const getPrevStage = (current: DevKanbanStage): DevKanbanStage | null => {
    const idx = KANBAN_STAGES.indexOf(current);
    if (idx > 0) return KANBAN_STAGES[idx - 1];
    return null;
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName) return;

    addDevTask({
      taskName,
      developer,
      productId,
      epicId: 'epic-1',
      featureId,
      sprint: 'Sprint 14',
      priority,
      status,
      estimatedHours: Number(estimatedHours) || 20,
      actualHours: Number(actualHours) || 0,
      startDate: new Date().toISOString().split('T')[0],
      dueDate,
      dependencies: [],
      acceptanceCriteria: ['Unit test coverage > 85%', 'QA sign-off', 'Tested in staging'],
      qaStatus,
      progressPercent: status === 'RELEASED' ? 100 : status === 'IN PROGRESS' ? 50 : 0
    });

    setTaskName('');
    setIsAddModalOpen(false);
  };

  const handleUpdateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTask) return;

    updateDevTask(editingTask.id, {
      taskName: editingTask.taskName,
      developer: editingTask.developer,
      productId: editingTask.productId,
      featureId: editingTask.featureId,
      priority: editingTask.priority,
      status: editingTask.status,
      estimatedHours: Number(editingTask.estimatedHours) || 0,
      actualHours: Number(editingTask.actualHours) || 0,
      qaStatus: editingTask.qaStatus,
      dueDate: editingTask.dueDate,
      progressPercent: editingTask.status === 'RELEASED' ? 100 : editingTask.status === 'IN PROGRESS' ? 50 : 0
    });

    setEditingTask(null);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this development task?')) {
      deleteDevTask(id);
      if (editingTask?.id === id) setEditingTask(null);
    }
  };

  // Developer summary stats
  const developers = Array.from(new Set(devTasks.map(t => t.developer)));

  return (
    <div className="p-6 space-y-6 max-w-full mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Module 9 • Engineering Hub
            </span>
            <span className="text-xs text-slate-400 font-mono">8-Stage Development Kanban</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-display">Development & Sprint Management</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Engineering tasks connected directly to features, releases, developers, and QA verification.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <PermissionGate module="development" action="create">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add Dev Task
            </button>
          </PermissionGate>

          {/* Filter Bar */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterDev}
              onChange={e => setFilterDev(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs"
            >
              <option value="all">All Developers</option>
              {developers.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
            <select
              value={filterQA}
              onChange={e => setFilterQA(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none text-xs"
            >
              <option value="all">All QA Statuses</option>
              <option value="Pending">Pending QA</option>
              <option value="In QA">In QA</option>
              <option value="Passed">Passed QA</option>
              <option value="Failed">Failed QA</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {devTasks.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center border border-blue-500/20">
            <Code2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">No Development Tasks Created Yet</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Your engineering board is ready. Create tasks to track features from Backlog through Testing, UAT, and Release.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-glow-brand transition-all inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Create Your First Task
          </button>
        </div>
      ) : (
        /* 8-Stage Kanban Board */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-[1700px]">
            {KANBAN_STAGES.map(stage => {
              const stageTasks = filteredTasks.filter(t => t.status === stage);

              const stageBorder =
                stage === 'RELEASED'
                  ? 'border-emerald-500/40 text-emerald-400'
                  : stage === 'READY FOR RELEASE'
                  ? 'border-amber-500/40 text-amber-400'
                  : stage === 'TESTING' || stage === 'UAT'
                  ? 'border-purple-500/40 text-purple-400'
                  : stage === 'IN PROGRESS'
                  ? 'border-blue-500/40 text-blue-400'
                  : 'border-slate-800 text-slate-400';

              return (
                <div
                  key={stage}
                  className="w-56 bg-slate-950/60 border border-slate-800/90 rounded-2xl p-3 flex flex-col shrink-0 min-h-[580px]"
                >
                  {/* Column Header */}
                  <div className={`flex items-center justify-between pb-2.5 mb-2.5 border-b ${stageBorder}`}>
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider truncate">
                      {stage}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-white">
                      {stageTasks.length}
                    </span>
                  </div>

                  {/* Cards Container */}
                  <div className="space-y-2.5 flex-1 overflow-y-auto">
                    {stageTasks.map(task => {
                      const feature = features.find(f => f.id === task.featureId);
                      const parentProduct = products.find(p => p.id === task.productId);
                      const nextStage = getNextStage(task.status);
                      const prevStage = getPrevStage(task.status);

                      return (
                        <div
                          key={task.id}
                          className="glass-panel p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-all space-y-2 group shadow-sm relative"
                        >
                          {/* Task Priority & Code & Edit/Delete actions */}
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                task.priority === 'Critical'
                                  ? 'red'
                                  : task.priority === 'High'
                                  ? 'amber'
                                  : 'blue'
                              }
                              size="sm"
                            >
                              {task.priority}
                            </Badge>

                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-mono text-slate-400">
                                {parentProduct?.code || 'DEV'}
                              </span>
                              {hasPermission('development', 'edit') && (
                                <button
                                  onClick={() => setEditingTask(task)}
                                  className="p-1 rounded text-slate-500 hover:text-white hover:bg-slate-800 transition-colors"
                                  title="Edit Task"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              )}
                              {hasPermission('development', 'delete') && (
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                  title="Delete Task"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Task Title */}
                          <div
                            onClick={() => setEditingTask(task)}
                            className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors leading-snug cursor-pointer"
                          >
                            {task.taskName}
                          </div>

                          {/* Linked Feature pill */}
                          {feature && (
                            <div
                              onClick={() => setSelectedFeatureIdForInspect(feature.id)}
                              className="text-[10px] text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/20 cursor-pointer truncate flex items-center gap-1"
                            >
                              <Sparkles className="w-2.5 h-2.5 shrink-0" />
                              <span className="truncate">{feature.title}</span>
                            </div>
                          )}

                          {/* Developer & Hours */}
                          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                            <span className="flex items-center gap-1 text-slate-300 font-medium">
                              <User className="w-3 h-3 text-slate-400" />
                              {task.developer.split(' ')[0]}
                            </span>
                            <span>
                              {task.actualHours}/{task.estimatedHours}h
                            </span>
                          </div>

                          {/* QA Status & Acceptance Criteria Count */}
                          <div className="flex items-center justify-between text-[10px]">
                            <span
                              className={`font-semibold ${
                                task.qaStatus === 'Passed'
                                  ? 'text-emerald-400'
                                  : task.qaStatus === 'In QA'
                                  ? 'text-purple-400'
                                  : task.qaStatus === 'Failed'
                                  ? 'text-rose-400'
                                  : 'text-slate-400'
                              }`}
                            >
                              QA: {task.qaStatus}
                            </span>
                            <span className="text-slate-500 font-mono">Due: {task.dueDate.slice(5)}</span>
                          </div>

                          {/* Stage Progression Buttons */}
                          <div className="pt-1.5 flex items-center justify-between gap-1">
                            {prevStage ? (
                              <button
                                onClick={() => moveDevTaskStage(task.id, prevStage)}
                                className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                                title={`Move back to ${prevStage}`}
                              >
                                ← Back
                              </button>
                            ) : (
                              <span />
                            )}

                            {nextStage && (
                              <button
                                onClick={() => moveDevTaskStage(task.id, nextStage)}
                                className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 transition-all border border-emerald-500/30 flex items-center gap-0.5 ml-auto"
                                title={`Progress to ${nextStage}`}
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-2.5 h-2.5" />
                              </button>
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

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Engineering Dev Task"
        subtitle="Connect engineering deliverables to roadmap features, sprint milestones, and QA criteria"
      >
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Task Name / Engineering Ticket</label>
            <input
              type="text"
              required
              placeholder="e.g. Implement CBE Birr QR payload parser"
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Product</label>
              <select
                value={productId}
                onChange={e => setProductId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Connected Feature</label>
              <select
                value={featureId}
                onChange={e => setFeatureId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                {features.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Assigned Developer</label>
              <input
                type="text"
                required
                value={developer}
                onChange={e => setDeveloper(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
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

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Kanban Stage</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {KANBAN_STAGES.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Est. Hours</label>
              <input
                type="number"
                value={estimatedHours}
                onChange={e => setEstimatedHours(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">QA Status</label>
              <select
                value={qaStatus}
                onChange={e => setQaStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Pending">Pending QA</option>
                <option value="In QA">In QA</option>
                <option value="Passed">Passed QA</option>
                <option value="Failed">Failed QA</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Target Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Pull Request / Git Branch</label>
              <input
                type="text"
                value={prUrl}
                onChange={e => setPrUrl(e.target.value)}
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
              Create Task
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Task Modal */}
      {editingTask && (
        <Modal
          isOpen={true}
          onClose={() => setEditingTask(null)}
          title={`Edit Dev Task: ${editingTask.taskName}`}
          subtitle="Update engineering ticket status, assigned developer, hours, and QA verification"
        >
          <form onSubmit={handleUpdateTask} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Task Name</label>
              <input
                type="text"
                required
                value={editingTask.taskName}
                onChange={e => setEditingTask({ ...editingTask, taskName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assigned Developer</label>
                <input
                  type="text"
                  required
                  value={editingTask.developer}
                  onChange={e => setEditingTask({ ...editingTask, developer: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Priority</label>
                <select
                  value={editingTask.priority}
                  onChange={e => setEditingTask({ ...editingTask, priority: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Kanban Stage</label>
                <select
                  value={editingTask.status}
                  onChange={e => setEditingTask({ ...editingTask, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {KANBAN_STAGES.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Est. Hours</label>
                <input
                  type="number"
                  value={editingTask.estimatedHours}
                  onChange={e => setEditingTask({ ...editingTask, estimatedHours: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Actual Hours</label>
                <input
                  type="number"
                  value={editingTask.actualHours}
                  onChange={e => setEditingTask({ ...editingTask, actualHours: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">QA Verification Status</label>
                <select
                  value={editingTask.qaStatus}
                  onChange={e => setEditingTask({ ...editingTask, qaStatus: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Pending">Pending QA</option>
                  <option value="In QA">In QA</option>
                  <option value="Passed">Passed QA</option>
                  <option value="Failed">Failed QA</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={editingTask.dueDate}
                  onChange={e => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleDeleteTask(editingTask.id)}
                className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Task
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
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
