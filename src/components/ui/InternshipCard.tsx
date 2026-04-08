import React from 'react';
import { Link } from 'react-router-dom';
import { FairnessBadge } from './FairnessBadge';
import { FairnessMeter } from './FairnessMeter';
import { Building2, MapPin, IndianRupee, AlertTriangle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface InternshipCardProps {
  id: string;
  role: string;
  company: string;
  stipend: string;
  fairnessScore: number;
  fairnessLabel: string;
  flags: string[];
  className?: string;
}

export function InternshipCard({ id, role, company, stipend, fairnessScore, fairnessLabel, flags, className }: InternshipCardProps) {
  return (
    <Link 
      to={`/internships/${id}`}
      className={cn(
        "block bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1 hover:border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">{role}</h3>
          <div className="flex items-center text-slate-600 text-sm gap-4">
            <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {company}</span>
            <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {stipend}</span>
          </div>
        </div>
        <FairnessBadge label={fairnessLabel} />
      </div>

      <div className="mb-5">
        <FairnessMeter score={fairnessScore} />
      </div>

      {flags && flags.length > 0 && (
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Analysis Flags
          </h4>
          <ul className="text-sm text-slate-700 space-y-1">
            {flags.slice(0, 3).map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-400 mt-0.5">•</span>
                <span>{flag}</span>
              </li>
            ))}
            {flags.length > 3 && (
              <li className="text-xs text-slate-500 italic ml-3">+ {flags.length - 3} more</li>
            )}
          </ul>
        </div>
      )}
    </Link>
  );
}
