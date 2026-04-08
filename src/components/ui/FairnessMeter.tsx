import React from 'react';
import { cn } from '@/src/lib/utils';

interface FairnessMeterProps {
  score: number;
  tooltip?: string;
  className?: string;
}

export function FairnessMeter({ score, tooltip, className }: FairnessMeterProps) {
  const normalizedScore = Math.max(0, Math.min(10, score));
  const percentage = (normalizedScore / 10) * 100;

  let colorClass = 'bg-gray-200';
  if (normalizedScore >= 8) colorClass = 'bg-fair-600';
  else if (normalizedScore >= 5) colorClass = 'bg-suspicious-600';
  else colorClass = 'bg-exploitative-600';

  return (
    <div className={cn('flex flex-col gap-1 w-full', className)} title={tooltip}>
      <div className="flex justify-between items-end">
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Fairness Score</span>
        <span className="text-sm font-bold text-slate-900">{normalizedScore}/10</span>
      </div>
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colorClass)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
