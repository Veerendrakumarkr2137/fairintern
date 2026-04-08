import React, { useState } from 'react';
import { FormInput } from '@/src/components/ui/FormInput';
import { Modal } from '@/src/components/ui/Modal';
import { Plus, Users } from 'lucide-react';

export function RecruiterDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    role: '',
    company: '',
    stipend: '',
    description: ''
  });

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formData.description })
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, submit to /api/internships
    setIsModalOpen(false);
    setFormData({ role: '', company: '', stipend: '', description: '' });
    setAnalysisResult(null);
  };

  // Mock candidates (Note: College name is explicitly omitted)
  const candidates = [
    { id: "c1", name: "Alex J.", email: "alex@example.com", score: 9, status: "shortlisted" },
    { id: "c2", name: "Sam K.", email: "sam@example.com", score: 7, status: "pending" },
    { id: "c3", name: "Jordan L.", email: "jordan@example.com", score: 4, status: "rejected" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Recruiter Dashboard</h1>
          <p className="text-slate-500 mt-2">Manage your postings and review candidates fairly.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Post Internship
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900">Recent Candidates</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 bg-white">
                <th className="px-6 py-4 font-semibold">Candidate Name</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Task Score</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {candidates.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{c.email}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{c.score}/10</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      c.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                      c.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-primary-600 hover:text-primary-800">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Post New Internship" className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput 
              label="Role Title" 
              value={formData.role} 
              onChange={e => setFormData({...formData, role: e.target.value})} 
              required 
            />
            <FormInput 
              label="Company" 
              value={formData.company} 
              onChange={e => setFormData({...formData, company: e.target.value})} 
              required 
            />
          </div>
          <FormInput 
            label="Stipend (e.g., ₹10,000/month, Unpaid)" 
            value={formData.stipend} 
            onChange={e => setFormData({...formData, stipend: e.target.value})} 
            required 
          />
          <FormInput 
            label="Job Description & Responsibilities" 
            textarea 
            rows={5}
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            required 
          />
          
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={handleAnalyze}
              disabled={analyzing || !formData.description}
              className="px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              {analyzing ? 'Analyzing...' : 'Analyze Fairness'}
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Post Internship
            </button>
          </div>

          {analysisResult && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="font-semibold text-slate-900 mb-2">AI Analysis Result</h4>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div><span className="text-slate-500">Score:</span> <span className="font-bold">{analysisResult.fairness_score}/10</span></div>
                <div><span className="text-slate-500">Label:</span> <span className="font-medium">{analysisResult.fairness_label}</span></div>
              </div>
              {analysisResult.flags?.length > 0 && (
                <ul className="text-sm text-slate-600 space-y-1 pl-4 list-disc">
                  {analysisResult.flags.map((f: string, i: number) => <li key={i}>{f}</li>)}
                </ul>
              )}
            </div>
          )}
        </form>
      </Modal>
    </div>
  );
}
