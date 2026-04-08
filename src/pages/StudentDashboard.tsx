import React from 'react';

export function StudentDashboard() {
  // Mock data for student submissions
  const submissions = [
    { id: "sub-001", role: "Frontend Intern", company: "SparkLabs", status: "reviewed", score: 8, date: "2026-04-01" },
    { id: "sub-002", role: "Data Science Intern", company: "AI Solutions", status: "pending", score: null, date: "2026-04-05" },
    { id: "sub-005", role: "Graphic Design Intern", company: "Creative Agency", status: "reviewed", score: 7, date: "2026-04-06" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-500 mt-2">Track your applications and task scores.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-lg font-semibold text-slate-900">Your Applications</h2>
        </div>
        <div className="divide-y divide-slate-200">
          {submissions.map(sub => (
            <div key={sub.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-slate-900">{sub.role}</h3>
                <p className="text-sm text-slate-500">{sub.company} • Applied on {sub.date}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sub.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    sub.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                  </span>
                </div>
                <div className="text-right min-w-[80px]">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Task Score</p>
                  <span className="text-lg font-bold text-slate-900">
                    {sub.score !== null ? `${sub.score}/10` : '-'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
