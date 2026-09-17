import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserRole,
  UserAccount,
  ModuleKey,
  PermissionAction,
  RecordScope,
  ModulePermission
} from '../types';
import { ALL_MODULES, ALL_ACTIONS } from '../data/initialRbacData';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Plus,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  XCircle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Key,
  Sliders,
  Sparkles,
  UserCheck,
  UserPlus,
  RefreshCw,
  Search,
  Check,
  AlertTriangle
} from 'lucide-react';
import { Modal } from '../components/common/Modal';

export const AccessControlView: React.FC = () => {
  const {
    roles,
    users,
    currentUser,
    currentRole,
    setCurrentUserId,
    addRole,
    updateRole,
    deleteRole,
    cloneRole,
    addUser,
    updateUser,
    deleteUser,
    changeUserPassword,
    hasPermission,
    canAccessRecord
  } = useApp();

  const [activeTab, setActiveTab] = useState<'matrix' | 'users' | 'simulator'>('matrix');
  const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0]?.id || 'role-super-admin');

  // Role Modals
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleCode, setNewRoleCode] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [newRoleColor, setNewRoleColor] = useState('emerald');

  // User Modals
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('mesob123');
  const [newUserConfirmPassword, setNewUserConfirmPassword] = useState('mesob123');
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);
  const [newUserTitle, setNewUserTitle] = useState('');
  const [newUserDept, setNewUserDept] = useState('Commercial & Sales');
  const [newUserTeam, setNewUserTeam] = useState('Enterprise Sales');
  const [newUserRoleId, setNewUserRoleId] = useState(roles[0]?.id || 'role-sales-rep');

  // Password Reset Modal
  const [resetPasswordUser, setResetPasswordUser] = useState<UserAccount | null>(null);
  const [resetPasswordValue, setResetPasswordValue] = useState('mesob123');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

  // Simulator State
  const [simUserId, setSimUserId] = useState<string>(users[0]?.id || 'user-admin');
  const [simModule, setSimModule] = useState<ModuleKey>('sales');
  const [simRecordOwner, setSimRecordOwner] = useState<string>('Yonas Mulugeta');
  const [simRecordTeam, setSimRecordTeam] = useState<string>('Enterprise Hospitality Sales');

  // Selected role object
  const activeSelectedRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  // Helper to toggle action permission in selected role
  const handleToggleAction = (moduleKey: ModuleKey, action: PermissionAction) => {
    if (!activeSelectedRole) return;

    const currentPerms = [...activeSelectedRole.permissions];
    const existingIndex = currentPerms.findIndex(p => p.module === moduleKey);

    if (existingIndex >= 0) {
      const existing = currentPerms[existingIndex];
      const hasAction = existing.actions.includes(action);
      const newActions = hasAction
        ? existing.actions.filter(a => a !== action)
        : [...existing.actions, action];

      currentPerms[existingIndex] = {
        ...existing,
        actions: newActions
      };
    } else {
      currentPerms.push({
        module: moduleKey,
        actions: [action],
        scope: 'ALL'
      });
    }

    updateRole(activeSelectedRole.id, { permissions: currentPerms });
  };

  // Helper to change record scope in selected role
  const handleChangeScope = (moduleKey: ModuleKey, scope: RecordScope) => {
    if (!activeSelectedRole) return;

    const currentPerms = [...activeSelectedRole.permissions];
    const existingIndex = currentPerms.findIndex(p => p.module === moduleKey);

    if (existingIndex >= 0) {
      currentPerms[existingIndex] = {
        ...currentPerms[existingIndex],
        scope
      };
    } else {
      currentPerms.push({
        module: moduleKey,
        actions: ['view'],
        scope
      });
    }

    updateRole(activeSelectedRole.id, { permissions: currentPerms });
  };

  // Bulk enable/disable for a module
  const handleToggleAllActionsForModule = (moduleKey: ModuleKey, enable: boolean) => {
    if (!activeSelectedRole) return;
    const currentPerms = [...activeSelectedRole.permissions];
    const existingIndex = currentPerms.findIndex(p => p.module === moduleKey);

    const allActionsList: PermissionAction[] = ['view', 'create', 'edit', 'delete', 'approve', 'export'];

    if (existingIndex >= 0) {
      currentPerms[existingIndex] = {
        ...currentPerms[existingIndex],
        actions: enable ? allActionsList : []
      };
    } else {
      currentPerms.push({
        module: moduleKey,
        actions: enable ? allActionsList : [],
        scope: 'ALL'
      });
    }

    updateRole(activeSelectedRole.id, { permissions: currentPerms });
  };

  const [passwordError, setPasswordError] = useState('');

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName) return;
    addRole({
      name: newRoleName,
      code: newRoleCode || newRoleName.toUpperCase().replace(/\s+/g, '_'),
      description: newRoleDesc || 'Custom enterprise role tailored to organizational needs.',
      color: newRoleColor,
      permissions: ALL_MODULES.map(m => ({
        module: m.key,
        actions: ['view'],
        scope: 'ALL'
      }))
    });
    setNewRoleName('');
    setNewRoleCode('');
    setNewRoleDesc('');
    setIsNewRoleModalOpen(false);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    if (newUserPassword && newUserPassword !== newUserConfirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    addUser({
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword || 'mesob123',
      title: newUserTitle || 'Team Member',
      department: newUserDept,
      team: newUserTeam,
      roleId: newUserRoleId,
      isActive: true
    });
    setNewUserName('');
    setNewUserEmail('');
    setNewUserTitle('');
    setNewUserPassword('mesob123');
    setNewUserConfirmPassword('mesob123');
    setPasswordError('');
    setIsNewUserModalOpen(false);
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetPasswordUser || !resetPasswordValue) return;
    changeUserPassword(resetPasswordUser.id, resetPasswordValue);
    setResetPasswordSuccess(true);
    setTimeout(() => {
      setResetPasswordUser(null);
      setResetPasswordSuccess(false);
      setResetPasswordValue('mesob123');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" /> Enterprise Security & Governance
            </div>
            <h1 className="text-2xl font-bold font-display text-white tracking-tight flex items-center gap-3">
              Role-Based Access Control (RBAC)
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Configure granular module access, action-level permissions (View, Create, Edit, Delete, Approve, Export),
              and record-level data scopes (ALL, TEAM, OWN) across the entire product lifecycle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs">
              <span className="text-slate-400">Current Role:</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                {currentRole.name}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'matrix'
                ? 'bg-emerald-500 text-slate-950 shadow-glow-brand font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Role Permissions Matrix</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950/40">
              {roles.length} Roles
            </span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'users'
                ? 'bg-emerald-500 text-slate-950 shadow-glow-brand font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Accounts & Assignments</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950/40">
              {users.length} Users
            </span>
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'simulator'
                ? 'bg-emerald-500 text-slate-950 shadow-glow-brand font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Permission Inspector & Simulator</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200">
              Live Test ✨
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: ROLE MATRIX */}
      {activeTab === 'matrix' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Role Selector */}
          <div className="lg:col-span-1 space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                System & Custom Roles
              </span>
              <button
                onClick={() => setIsNewRoleModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> New Role
              </button>
            </div>

            <div className="space-y-2">
              {roles.map(r => {
                const isSelected = r.id === selectedRoleId;
                const assignedCount = users.filter(u => u.roleId === r.id).length;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedRoleId(r.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500/50 shadow-glow-brand ring-1 ring-emerald-500/30'
                        : 'bg-slate-950 hover:bg-slate-900/80 border-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                        {r.name}
                      </span>
                      {r.isSystemDefault ? (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          SYSTEM
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          CUSTOM
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-400 line-clamp-2 mb-2 leading-relaxed">
                      {r.description}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/60">
                      <span className="text-emerald-400">{assignedCount} Assigned Users</span>
                      <span>{r.code}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Module & Action Matrix */}
          <div className="lg:col-span-3 space-y-4">
            {/* Active Role Meta Card */}
            {activeSelectedRole && (
              <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white">{activeSelectedRole.name}</h2>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-800 text-amber-300 border border-slate-700">
                      {activeSelectedRole.code}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{activeSelectedRole.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => cloneRole(activeSelectedRole.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" /> Clone Role
                  </button>
                  {!activeSelectedRole.isSystemDefault && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete role "${activeSelectedRole.name}"?`)) {
                          deleteRole(activeSelectedRole.id);
                          setSelectedRoleId(roles[0].id);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Role
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Matrix Table */}
            <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold">Lifecycle Module</th>
                      <th className="py-3 px-3 font-semibold text-center w-36">Data Scope</th>
                      {ALL_ACTIONS.map(act => (
                        <th key={act.action} className="py-3 px-2 text-center font-semibold">
                          {act.label}
                        </th>
                      ))}
                      <th className="py-3 px-3 text-right font-semibold">Quick Set</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {ALL_MODULES.map(moduleItem => {
                      const perm = activeSelectedRole?.permissions.find(p => p.module === moduleItem.key);
                      const currentActions = perm?.actions || [];
                      const currentScope = perm?.scope || 'ALL';
                      const hasAll = ALL_ACTIONS.every(a => currentActions.includes(a.action));

                      return (
                        <tr
                          key={moduleItem.key}
                          className="hover:bg-slate-900/40 transition-colors group"
                        >
                          {/* Module Label */}
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-200 group-hover:text-white flex items-center gap-2">
                              <span>{moduleItem.label}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                                {moduleItem.category}
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1 max-w-sm">
                              {moduleItem.description}
                            </div>
                          </td>

                          {/* Data Scope Selector */}
                          <td className="py-3 px-3 text-center">
                            <select
                              value={currentScope}
                              onChange={e =>
                                handleChangeScope(moduleItem.key, e.target.value as RecordScope)
                              }
                              className={`text-[11px] font-mono font-semibold rounded-lg px-2 py-1 border transition-colors ${
                                currentScope === 'ALL'
                                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                  : currentScope === 'TEAM'
                                  ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                              }`}
                            >
                              <option value="ALL">🌐 ALL Records</option>
                              <option value="TEAM">👥 TEAM Only</option>
                              <option value="OWN">👤 OWN Records</option>
                            </select>
                          </td>

                          {/* Action Checkboxes */}
                          {ALL_ACTIONS.map(act => {
                            const isChecked = currentActions.includes(act.action);
                            return (
                              <td key={act.action} className="py-3 px-2 text-center">
                                <button
                                  onClick={() => handleToggleAction(moduleItem.key, act.action)}
                                  className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                                    isChecked
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 shadow-sm'
                                      : 'bg-slate-900 text-slate-600 border border-slate-800 hover:text-slate-400 hover:border-slate-700'
                                  }`}
                                  title={`${isChecked ? 'Disable' : 'Enable'} ${act.label} permission`}
                                >
                                  {isChecked ? (
                                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                  ) : (
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                                  )}
                                </button>
                              </td>
                            );
                          })}

                          {/* Quick Toggle Actions */}
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => handleToggleAllActionsForModule(moduleItem.key, !hasAll)}
                              className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
                            >
                              {hasAll ? 'Clear All' : 'Grant All'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER ACCOUNTS & ASSIGNMENTS */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white">System User Accounts</h2>
              <p className="text-xs text-slate-400">
                Manage user identity, department/team membership, and active role assignments.
              </p>
            </div>
            <button
              onClick={() => setIsNewUserModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-glow-brand"
            >
              <UserPlus className="w-4 h-4 stroke-[2.5]" />
              <span>Add User Account</span>
            </button>
          </div>

          <div className="glass-panel rounded-xl border border-slate-800 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">User & Identity</th>
                  <th className="py-3 px-4 font-semibold">Department & Team</th>
                  <th className="py-3 px-4 font-semibold">Assigned RBAC Role</th>
                  <th className="py-3 px-3 font-semibold text-center">Status</th>
                  <th className="py-3 px-4 text-right font-semibold">Live Testing & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map(u => {
                  const userRole = roles.find(r => r.id === u.roleId);
                  const isCurrent = u.id === currentUser.id;

                  return (
                    <tr
                      key={u.id}
                      className={`transition-colors ${
                        isCurrent ? 'bg-emerald-500/5' : 'hover:bg-slate-900/40'
                      }`}
                    >
                      {/* User Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {u.avatarUrl ? (
                            <img
                              src={u.avatarUrl}
                              alt={u.name}
                              className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-700"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold">
                              {u.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-semibold text-slate-200 flex items-center gap-2">
                              <span>{u.name}</span>
                              {isCurrent && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                                  ACTIVE PERSONA
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Department & Team */}
                      <td className="py-3 px-4">
                        <div className="text-slate-200 font-medium">{u.title}</div>
                        <div className="text-[11px] text-slate-400">
                          {u.department} • <span className="text-slate-500">{u.team}</span>
                        </div>
                      </td>

                      {/* Inline Role Selector */}
                      <td className="py-3 px-4">
                        <select
                          value={u.roleId}
                          onChange={e => updateUser(u.id, { roleId: e.target.value })}
                          className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
                        >
                          {roles.map(r => (
                            <option key={r.id} value={r.id}>
                              {r.name} ({r.code})
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => updateUser(u.id, { isActive: !u.isActive })}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                            u.isActive
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          {u.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </button>
                      </td>

                      {/* Switch Persona Trigger, Reset Password & Delete */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setCurrentUserId(u.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              isCurrent
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                            }`}
                          >
                            {isCurrent ? 'Active Persona' : 'Switch to Persona'}
                          </button>
                          <button
                            onClick={() => {
                              setResetPasswordUser(u);
                              setResetPasswordValue('mesob123');
                              setResetPasswordSuccess(false);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 border border-slate-800 hover:border-amber-500/30 transition-colors"
                            title="Reset User Password"
                          >
                            <Key className="w-3.5 h-3.5" />
                          </button>
                          {users.length > 1 && (
                            <button
                              onClick={() => {
                                if (confirm(`Remove user account "${u.name}"?`)) {
                                  deleteUser(u.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: LIVE PERMISSION SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> Live Permission & Data Scope Simulator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Evaluate how RBAC policies and Record Scopes resolve for any user, module, and data record combination.
              </p>
            </div>

            {/* Selector Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  1. Target User Persona
                </label>
                <select
                  value={simUserId}
                  onChange={e => setSimUserId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
                >
                  {users.map(u => {
                    const r = roles.find(ro => ro.id === u.roleId);
                    return (
                      <option key={u.id} value={u.id}>
                        {u.name} ({r?.name})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  2. Target Lifecycle Module
                </label>
                <select
                  value={simModule}
                  onChange={e => setSimModule(e.target.value as ModuleKey)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-semibold"
                >
                  {ALL_MODULES.map(m => (
                    <option key={m.key} value={m.key}>
                      {m.label} ({m.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  3. Record Owner
                </label>
                <input
                  type="text"
                  value={simRecordOwner}
                  onChange={e => setSimRecordOwner(e.target.value)}
                  placeholder="e.g. Yonas Mulugeta"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  4. Record Team / Department
                </label>
                <input
                  type="text"
                  value={simRecordTeam}
                  onChange={e => setSimRecordTeam(e.target.value)}
                  placeholder="e.g. Enterprise Hospitality Sales"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Evaluation Results */}
            {(() => {
              const testUser = users.find(u => u.id === simUserId) || users[0];
              const testRole = roles.find(r => r.id === testUser.roleId) || roles[0];
              const perm = testRole.permissions.find(p => p.module === simModule);
              const actions = perm?.actions || (testRole.code === 'SUPER_ADMIN' ? ALL_ACTIONS.map(a => a.action) : []);
              const scope = perm?.scope || (testRole.code === 'SUPER_ADMIN' ? 'ALL' : 'ALL');

              const isOwnerMatch =
                simRecordOwner.toLowerCase().includes(testUser.name.toLowerCase()) ||
                testUser.name.toLowerCase().includes(simRecordOwner.toLowerCase());

              const isTeamMatch =
                simRecordTeam.toLowerCase().includes(testUser.team.toLowerCase()) ||
                testUser.team.toLowerCase().includes(simRecordTeam.toLowerCase()) ||
                simRecordTeam.toLowerCase().includes(testUser.department.toLowerCase()) ||
                isOwnerMatch;

              let canAccessData = false;
              let scopeReason = '';

              if (!actions.includes('view') && testRole.code !== 'SUPER_ADMIN') {
                canAccessData = false;
                scopeReason = `Module access denied: Role '${testRole.name}' does not have VIEW permission on ${simModule}.`;
              } else if (testRole.code === 'SUPER_ADMIN' || scope === 'ALL') {
                canAccessData = true;
                scopeReason = `Granted: Scope is 'ALL' (Organization-wide data access).`;
              } else if (scope === 'TEAM') {
                canAccessData = isTeamMatch;
                scopeReason = isTeamMatch
                  ? `Granted: User team (${testUser.team}) matches record team (${simRecordTeam}).`
                  : `Denied: User team (${testUser.team}) does NOT match record team (${simRecordTeam}).`;
              } else if (scope === 'OWN') {
                canAccessData = isOwnerMatch;
                scopeReason = isOwnerMatch
                  ? `Granted: User (${testUser.name}) is the designated record owner (${simRecordOwner}).`
                  : `Denied: Scope is 'OWN' but record owner (${simRecordOwner}) does not match current user (${testUser.name}).`;
              }

              return (
                <div className="space-y-4">
                  {/* Summary Bar */}
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      canAccessData
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {canAccessData ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-rose-400" />
                      )}
                      <div>
                        <div className="text-sm font-bold text-white">
                          Record Access Decision: {canAccessData ? 'ALLOWED' : 'BLOCKED'}
                        </div>
                        <div className="text-xs text-slate-300 mt-0.5">{scopeReason}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Effective Scope</div>
                      <div className="text-xs font-mono font-bold text-amber-300">{scope}</div>
                    </div>
                  </div>

                  {/* Action-level Matrix for this evaluation */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {ALL_ACTIONS.map(act => {
                      const hasAction =
                        testRole.code === 'SUPER_ADMIN' || actions.includes(act.action);
                      const isActionAllowed = canAccessData && hasAction;

                      return (
                        <div
                          key={act.action}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                            isActionAllowed
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                        >
                          <span className="text-[11px] font-bold font-mono uppercase mb-1">
                            {act.label}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                              isActionAllowed
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-slate-800 text-slate-500 border border-slate-700'
                            }`}
                          >
                            {isActionAllowed ? 'ALLOWED' : 'RESTRICTED'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Modal: New Role */}
      <Modal
        isOpen={isNewRoleModalOpen}
        onClose={() => setIsNewRoleModalOpen(false)}
        title="Create Custom RBAC Role"
        subtitle="Define a new role and configure its module and action permissions"
      >
        <form onSubmit={handleCreateRole} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Role Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Regional Sales Director"
              value={newRoleName}
              onChange={e => setNewRoleName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Role Code</label>
            <input
              type="text"
              placeholder="e.g. REGIONAL_SALES_DIR"
              value={newRoleCode}
              onChange={e => setNewRoleCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Responsibilities, scope, and target personas for this role."
              value={newRoleDesc}
              onChange={e => setNewRoleDesc(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewRoleModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow-brand"
            >
              Create Role
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: New User */}
      <Modal
        isOpen={isNewUserModalOpen}
        onClose={() => setIsNewUserModalOpen(false)}
        title="Add User Account"
        subtitle="Create an employee user profile and assign initial RBAC role"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Almaz Tadesse"
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="e.g. almaz.tadesse@mesob.et"
                value={newUserEmail}
                onChange={e => setNewUserEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Password & Authentication Credentials */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" /> Login Credentials & Password
              </label>
              <button
                type="button"
                onClick={() => setShowNewUserPassword(!showNewUserPassword)}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono"
              >
                {showNewUserPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showNewUserPassword ? 'Hide' : 'Show'} Password</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Initial Password <span className="text-emerald-400">*</span>
                </label>
                <input
                  type={showNewUserPassword ? 'text' : 'password'}
                  required
                  placeholder="e.g. mesob123"
                  value={newUserPassword}
                  onChange={e => {
                    setNewUserPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirm Password <span className="text-emerald-400">*</span>
                </label>
                <input
                  type={showNewUserPassword ? 'text' : 'password'}
                  required
                  placeholder="Repeat password"
                  value={newUserConfirmPassword}
                  onChange={e => {
                    setNewUserConfirmPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            {passwordError && (
              <div className="text-xs text-rose-400 flex items-center gap-1.5 font-medium bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-500">
              Default demo password: <code className="text-slate-300 bg-slate-900 px-1 py-0.5 rounded">mesob123</code>. The user can sign into the portal using their email and this password.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Title</label>
              <input
                type="text"
                placeholder="e.g. Account Executive"
                value={newUserTitle}
                onChange={e => setNewUserTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Role</label>
              <select
                value={newUserRoleId}
                onChange={e => setNewUserRoleId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-semibold"
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Department</label>
              <input
                type="text"
                value={newUserDept}
                onChange={e => setNewUserDept(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Team / Tribe</label>
              <input
                type="text"
                value={newUserTeam}
                onChange={e => setNewUserTeam(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewUserModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-glow-brand"
            >
              Save User Account
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Reset Password */}
      <Modal
        isOpen={!!resetPasswordUser}
        onClose={() => setResetPasswordUser(null)}
        title="Reset User Password"
        subtitle={resetPasswordUser ? `Update credentials for ${resetPasswordUser.name} (${resetPasswordUser.email})` : ''}
      >
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showResetPassword ? 'text' : 'password'}
                required
                value={resetPasswordValue}
                onChange={e => setResetPasswordValue(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono pr-10"
              />
              <button
                type="button"
                onClick={() => setShowResetPassword(!showResetPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showResetPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Minimum 6 characters recommended. The user will use this new password immediately upon next login.
            </p>
          </div>

          {resetPasswordSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Password updated successfully!</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setResetPasswordUser(null)}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
            >
              Save New Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
