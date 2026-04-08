import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FairnessBadge } from '@/src/components/ui/FairnessBadge';
import { FairnessMeter } from '@/src/components/ui/FairnessMeter';
import { TaskList, Task } from '@/src/components/ui/TaskSystem';
import { Building2, IndianRupee, Clock, ArrowLeft, ShieldAlert } from 'lucide-react';

export function InternshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    fetch(`/api/internships/${id}`)
      .then(res => res.json())
      .then(data => {
        setInternship(data);
        setLoading(false);
      });
  }, [id]);

  const handleApply = async (submissions: Record<string, string | File>) => {
    setApplying(true);
    // Mock API call
    setTimeout(() => {
      setApplying(false);
      setApplied(true);
    }, 1500);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!internship) return <div className="p-8 text-center">Internship not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </button>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">{internship.role}</h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <span className="flex items-center gap-1.5"><Building2 className="w-5 h-5" /> {internship.company}</span>
              <span className="flex items-center gap-1.5"><IndianRupee className="w-5 h-5" /> {internship.stipend}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-5 h-5" /> {internship.work_type === 'learning' ? 'Learning Focus' : 'Production Focus'}</span>
            </div>
          </div>
          <FairnessBadge label={internship.fairnessLabel} className="text-sm px-3 py-1" />
        </div>

        <div className="prose prose-slate max-w-none mb-10">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">About the Role</h3>
          <p className="text-slate-700 leading-relaxed">{internship.description}</p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-primary-600" /> AI Fairness Analysis
          </h3>
          <div className="mb-6 max-w-md">
            <FairnessMeter score={internship.fairnessScore} />
          </div>
          
          {internship.flags && internship.flags.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">Key Findings:</h4>
              <ul className="space-y-2">
                {internship.flags.map((flag: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-primary-500 mt-0.5">•</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Tasks</h2>
        <p className="text-slate-500 mb-8">Complete the following tasks to apply for this internship. Your submissions will be evaluated by the recruiter.</p>
        
        {applied ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-900 mb-2">Application Submitted!</h3>
            <p className="text-green-700">You can track your application status in your dashboard.</p>
          </div>
        ) : (
          <TaskList 
            tasks={internship.tasks || []} 
            onAllCompleted={handleApply}
          />
        )}
      </div>
    </div>
  );
}
