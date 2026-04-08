import React, { useState } from 'react';
import { FormInput } from '@/src/components/ui/FormInput';
import { MOCK_APPLICANTS } from '@/src/mockData';
import { Plus, Users, FileText, Check, X, ShieldAlert } from 'lucide-react';

export function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState<'review' | 'post'>('review');
  const [applicants, setApplicants] = useState(MOCK_APPLICANTS);
  
  // Custom Post Form State
  const [formData, setFormData] = useState({
    title: '',
    stipend: '',
    description: '',
    customTask: ''
  });

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Internship successfully posted and added to AI Review Queue!");
    setFormData({ title: '', stipend: '', description: '', customTask: '' });
    setActiveTab('review');
  };

  const handleStatusChange = (id: string, status: 'accepted' | 'rejected') => {
    setApplicants(applicants.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen bg-slate-50">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900">Recruiter Portal</h1>
        <p className="text-slate-500 font-medium mt-1">Manage fair postings and review skills-based applicants.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 mb-8">
        <button 
          onClick={() => setActiveTab('review')}
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${activeTab === 'review' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          <Users className="w-5 h-5" /> Applicant Review
        </button>
        <button 
          onClick={() => setActiveTab('post')}
          className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all ${activeTab === 'post' ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          <Plus className="w-5 h-5" /> Post Internship
        </button>
      </div>

      {activeTab === 'review' ? (
        <div className="grid grid-cols-1 gap-6">
          {applicants.map(app => (
             <div key={app.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
               <div className="flex-1 space-y-4">
                 <div>
                   <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                     {app.name} 
                     {app.status === 'accepted' && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full uppercase tracking-wider">Accepted</span>}
                     {app.status === 'rejected' && <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full uppercase tracking-wider">Rejected</span>}
                   </h3>
                   <span className="text-sm font-medium text-slate-500">Applying for Role ID: {app.internshipId}</span>
                 </div>
                 
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm">
                   <div className="mb-2"><span className="font-bold text-slate-700">Skills:</span> <span className="text-slate-600">{app.skills}</span></div>
                   <div><span className="font-bold text-slate-700">Projects:</span> <span className="text-slate-600">{app.projects}</span></div>
                 </div>
                 
                 <button className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700">
                   <FileText className="w-4 h-4" /> View Resume
                 </button>
               </div>

               <div className="flex flex-col items-center sm:items-end gap-4 w-full md:w-auto mt-4 md:mt-0 p-4 bg-slate-50 md:bg-transparent rounded-xl md:rounded-none">
                 <div className="text-center md:text-right">
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pre-Screening Score</div>
                   <div className="text-4xl font-black text-slate-900">{app.taskScore}<span className="text-2xl text-slate-400">/10</span></div>
                 </div>
                 
                 {app.status === 'pending' && (
                   <div className="flex w-full md:w-auto gap-3">
                     <button 
                       onClick={() => handleStatusChange(app.id, 'accepted')}
                       className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-green-100 text-green-800 border border-green-200 font-bold rounded-xl hover:bg-green-200 transition-colors"
                     >
                       <Check className="w-4 h-4" /> Accept
                     </button>
                     <button 
                       onClick={() => handleStatusChange(app.id, 'rejected')}
                       className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-red-100 text-red-800 border border-red-200 font-bold rounded-xl hover:bg-red-200 transition-colors"
                     >
                       <X className="w-4 h-4" /> Reject
                     </button>
                   </div>
                 )}
               </div>
             </div>
          ))}
          {applicants.length === 0 && <div className="text-slate-500 font-medium text-center p-8">No applicants available for your roles.</div>}
        </div>
      ) : (
        <form onSubmit={handlePost} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-3xl">
           <div className="flex items-center gap-3 bg-yellow-50 text-yellow-800 p-4 rounded-xl border border-yellow-200 mb-8 font-medium text-sm">
             <ShieldAlert className="w-5 h-5 shrink-0" />
             AI Fairness Disclaimer: All roles are run through our Fairness Analyzer. Roles that fail minimum fairness requirements will not be visible to students.
           </div>

           <div className="space-y-6">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Job Title</label>
               <input 
                 required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                 placeholder="e.g. Graphic Designer"
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium"
               />
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Stipend details</label>
               <input 
                 required value={formData.stipend} onChange={e => setFormData({...formData, stipend: e.target.value})}
                 placeholder="e.g. ₹15,000/month or Unpaid"
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium"
               />
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Job Description (Determines AI Flagging)</label>
               <textarea 
                 required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                 rows={4}
                 placeholder="Provide detailed responsibilities. Clear expectation of learning vs production task minimizes risk flags."
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium"
               />
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Custom Mandatory Task (Optional)</label>
               <textarea 
                 value={formData.customTask} onChange={e => setFormData({...formData, customTask: e.target.value})}
                 rows={2}
                 placeholder="Leave blank to let AI specify a task based on the Role Title."
                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium"
               />
               <p className="text-xs text-slate-500 mt-2 font-medium">This task must be completed by the student before they can upload their resume.</p>
             </div>
             <div className="pt-4">
               <button type="submit" className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                  Post & Run Fairness Check
               </button>
             </div>
           </div>
        </form>
      )}
    </div>
  );
}
