import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'blue' | 'amber' | 'purple' | 'red' | 'gray' | 'cyan' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  size = 'sm',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-semibold';

  const variantMap: Record<string, string> = {
    green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
    red: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
    gray: 'bg-slate-800/80 text-slate-300 border border-slate-700',
    outline: 'border border-slate-600 text-slate-300 bg-transparent'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full transition-all ${sizeClasses} ${variantMap[variant] || variantMap.blue} ${className}`}
    >
      {children}
    </span>
  );
};
