import React from 'react';
import { cn } from '@/src/lib/utils';
import { ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';

interface FairnessBadgeProps {
  label: string;
  className?: string;
}

export function FairnessBadge({ label, className }: FairnessBadgeProps) {
  let colorClass = '';
  let Icon = ShieldQuestion;

  switch (label) {
    case 'Fair':
      colorClass = 'bg-fair-100 text-fair-800 border-fair-600';
      Icon = ShieldCheck;
      break;
    case 'Suspicious':
      colorClass = 'bg-suspicious-100 text-suspicious-800 border-suspicious-600';
      Icon = ShieldQuestion;
      break;
    case 'Exploitative Risk':
      colorClass = 'bg-exploitative-100 text-exploitative-800 border-exploitative-600';
      Icon = ShieldAlert;
      break;
    default:
      colorClass = 'bg-gray-100 text-gray-800 border-gray-400';
  }

  return (
    <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border', colorClass, className)}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </div>
  );
}
