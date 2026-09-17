import React from 'react';
import { useApp } from '../../context/AppContext';
import { ModuleKey, PermissionAction } from '../../types';
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';

interface PermissionGateProps {
  module: ModuleKey;
  action: PermissionAction;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  disabledMode?: boolean;
  tooltipText?: string;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  module,
  action,
  children,
  fallback = null,
  disabledMode = false,
  tooltipText
}) => {
  const { hasPermission, currentRole } = useApp();
  const allowed = hasPermission(module, action);

  if (allowed) {
    return <>{children}</>;
  }

  if (disabledMode) {
    return (
      <div
        className="relative group inline-block cursor-not-allowed"
        title={tooltipText || `Restricted: Your role (${currentRole.name}) lacks '${action}' permission for this module.`}
      >
        <div className="opacity-40 pointer-events-none filter grayscale">{children}</div>
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1.5 px-2.5 py-1 bg-slate-900 border border-slate-700 text-amber-300 text-[11px] rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none">
          <Lock className="w-3 h-3 text-amber-400" />
          <span>Requires {action.toUpperCase()} permission</span>
        </div>
      </div>
    );
  }

  return <>{fallback}</>;
};

interface UnauthorizedStateProps {
  module: ModuleKey;
  moduleName?: string;
}

export const UnauthorizedState: React.FC<UnauthorizedStateProps> = ({ module, moduleName }) => {
  const { currentRole, currentUser, setActiveView } = useApp();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center animate-in fade-in zoom-in duration-200">
      <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 shadow-glow-rose">
        <ShieldAlert className="w-10 h-10 text-rose-400" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
        Access Restricted (RBAC Gate)
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mb-2">
        Access Denied for {moduleName || module}
      </h2>

      <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
        Your current active persona <strong className="text-slate-200">{currentUser.name}</strong> assigned with role{' '}
        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-xs">
          {currentRole.name}
        </span>{' '}
        does not have <code className="text-amber-300 font-mono">VIEW</code> permission for this module.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </button>
        {currentRole.code === 'SUPER_ADMIN' && (
          <button
            onClick={() => setActiveView('access-control')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-glow-brand"
          >
            Configure RBAC Matrix
          </button>
        )}
      </div>
    </div>
  );
};
