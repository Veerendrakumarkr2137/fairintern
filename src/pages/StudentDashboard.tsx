import React from 'react';
import { motion } from 'framer-motion';

export function StudentDashboard() {
  // Mock data for student submissions
  const submissions = [
    { id: "sub-001", role: "Frontend Intern", company: "SparkLabs", status: "reviewed", score: 8, date: "2026-04-01" },
    { id: "sub-002", role: "Data Science Intern", company: "AI Solutions", status: "pending", score: null, date: "2026-04-05" },
    { id: "sub-005", role: "Graphic Design Intern", company: "Creative Agency", status: "reviewed", score: 7, date: "2026-04-06" }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
      {/* Background glowing effects to match Home and Auth */}
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 relative z-10"
      >
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Student Dashboard</h1>
        <p className="text-slate-400 mt-2 text-lg">Track your active applications and progress.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl overflow-hidden relative z-10"
      >
        <div className="px-6 py-5 border-b border-white/10 bg-white/5">
          <h2 className="text-xl font-bold text-white">Your Applications</h2>
        </div>
        <div className="divide-y divide-white/5">
          {submissions.map(sub => (
            <div key={sub.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
              <div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">{sub.role}</h3>
                <p className="text-sm text-slate-400 font-medium">
                  {sub.company} <span className="mx-2">•</span> Applied on {sub.date}
                </p>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    sub.status === 'reviewed' ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30' :
                    sub.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                    'bg-white/10 text-slate-300 border border-white/20'
                  }`}>
                    {sub.status}
                  </span>
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">Task Score</p>
                  <span className={`text-xl font-black ${sub.score !== null ? 'text-white' : 'text-slate-500'}`}>
                    {sub.score !== null ? `${sub.score}/10` : '-'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
