import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  target?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'green' | 'yellow' | 'red';
  icon: React.ReactNode;
  subtitle?: string;
  badge?: string;
  className?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  target,
  change,
  trend = 'up',
  status,
  icon,
  subtitle,
  badge,
  className = '',
  onClick
}) => {
  const statusColor =
    status === 'green'
      ? 'border-emerald-500/30 hover:border-emerald-500/60 shadow-emerald-500/5'
      : status === 'yellow'
      ? 'border-amber-500/30 hover:border-amber-500/60 shadow-amber-500/5'
      : status === 'red'
      ? 'border-rose-500/30 hover:border-rose-500/60 shadow-rose-500/5'
      : 'border-slate-800 hover:border-slate-700';

  return (
    <div
      onClick={onClick}
      className={`glass-panel rounded-xl p-4 transition-all duration-200 border ${statusColor} relative group overflow-hidden ${
        onClick ? 'cursor-pointer hover:scale-[1.01]' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
            {icon}
          </div>
          <div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</div>
            {subtitle && <div className="text-[11px] text-slate-500">{subtitle}</div>}
          </div>
        </div>

        {badge && (
          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-bold font-display text-white tracking-tight">{value}</div>

        {change && (
          <div
            className={`flex items-center text-xs font-semibold ${
              trend === 'up'
                ? 'text-emerald-400'
                : trend === 'down'
                ? 'text-rose-400'
                : 'text-slate-400'
            }`}
          >
            {trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
            {trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {trend === 'neutral' && <Minus className="w-3.5 h-3.5 mr-0.5" />}
            {change}
          </div>
        )}
      </div>

      {target && (
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Target: <strong className="text-slate-300 font-semibold">{target}</strong></span>
          {status && (
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                status === 'green'
                  ? 'bg-emerald-400 shadow-[0_0_8px_#4ade80]'
                  : status === 'yellow'
                  ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                  : 'bg-rose-400 shadow-[0_0_8px_#f43f5e]'
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
};
