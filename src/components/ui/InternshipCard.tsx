import React from 'react';
import { Link } from 'react-router-dom';
import { FairnessBadge } from './FairnessBadge';
import { FairnessMeter } from './FairnessMeter';
import { Building2, IndianRupee, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion } from 'framer-motion';

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
        "block relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-xl transition-all duration-300 overflow-hidden group",
        "hover:shadow-[0_0_30px_rgba(79,70,229,0.2)] hover:-translate-y-2 hover:border-indigo-400/50",
        className
      )}
    >
      {/* Glossy top highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-primary-300 transition-colors flex items-center gap-2">
            {role}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
          </h3>
          <div className="flex items-center text-slate-300 text-sm gap-5 font-medium">
            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-400" /> {company}</span>
            <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4 text-primary-400" /> {stipend}</span>
          </div>
        </div>
        <FairnessBadge label={fairnessLabel} />
      </div>

      <div className="mb-6 relative z-10 bg-black/20 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Fairness Score</span>
          <span className="text-xs font-bold text-white">{fairnessScore}/10</span>
        </div>
        <FairnessMeter score={fairnessScore} />
      </div>

      {flags && flags.length > 0 && (
        <div className="bg-red-500/10 rounded-2xl p-4 border border-red-500/20 relative z-10">
          <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> AI Insights & Flags
          </h4>
          <ul className="text-sm text-slate-300 space-y-1.5 list-none pb-1">
            {flags.slice(0, 3).map((flag, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-400 font-bold mt-0.5">•</span>
                <span className="leading-tight">{flag}</span>
              </li>
            ))}
            {flags.length > 3 && (
              <li className="text-xs text-slate-400 italic font-medium ml-4 mt-2">+ {flags.length - 3} more flags hidden</li>
            )}
          </ul>
        </div>
      )}
    </Link>
  );
}
