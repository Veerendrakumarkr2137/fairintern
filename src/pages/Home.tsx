import React, { useState } from 'react';
import { MOCK_INTERNSHIPS } from '@/src/mockData';
import { useNavigate } from 'react-router-dom';
import { Shield, Search, Zap, CheckCircle2, AlertTriangle, AlertOctagon, Calendar } from 'lucide-react';
import { Modal } from '@/src/components/ui/Modal';
import { InternshipBot } from '@/src/components/ui/InternshipBot';

export function Home() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [internships, setInternships] = useState<any[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [fairOnly, setFairOnly] = useState(false);
  const [paidOnly, setPaidOnly] = useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('all_internships');
    if (saved) {
      setInternships(JSON.parse(saved));
    } else {
      setInternships(MOCK_INTERNSHIPS);
      localStorage.setItem('all_internships', JSON.stringify(MOCK_INTERNSHIPS));
    }
  }, []);
  
  const handleActionClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  };



  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 min-h-[calc(100vh-4rem)] flex flex-col items-center select-none">
        
        {/* Public Hero */}
        <section className="w-full max-w-5xl mx-auto px-4 py-24 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-600 mb-8 shadow-sm">
            <Shield className="w-4 h-4 text-primary-500" />
            AI-POWERED INTERNSHIP VETTING APP
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            Find Fair Internships.<br className="hidden md:block"/> Avoid the Exploitation.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mb-10 leading-relaxed font-medium">
            We use AI to analyze internship descriptions, highlighting skill-building opportunities and flagging unpaid, production-heavy roles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full flex-wrap justify-center">
            <button 
              onClick={handleActionClick}
              className="px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-all shadow-lg"
            >
              Browse Internships
            </button>
            <button 
              onClick={handleActionClick}
              className="px-8 py-3.5 bg-white text-slate-900 border-2 border-slate-200 font-semibold rounded-full hover:bg-slate-50 transition-all"
            >
              Post an Internship
            </button>
          </div>
        </section>

        {/* Showcase exactly 3 */}
        <section className="w-full max-w-7xl mx-auto px-4 pb-24">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Sample Vetted Opportunities</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_INTERNSHIPS.slice(0, 3).map(internship => (
              <InternshipCard key={internship.id} {...internship} onClick={handleActionClick} />
            ))}
          </div>
        </section>

        <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} title="Sign In to Continue" className="max-w-sm text-center p-6">
          <p className="text-slate-600 mb-6">You must be signed in to view complete details, apply, or post roles.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/auth')} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800">
              Go to Login / Signup
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  // Authenticated State (Student/General Dashboard View)
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search roles, companies..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 transition-colors"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setFairOnly(!fairOnly)}
              className={`px-5 py-2.5 border rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${fairOnly ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              Fair Only
            </button>
            <button 
              onClick={() => setPaidOnly(!paidOnly)}
              className={`px-5 py-2.5 border rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${paidOnly ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              Paid Only
            </button>

          </div>
        </div>

        {/* listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.filter(i => {
            if (fairOnly && i.fairnessLabel.toLowerCase() !== 'fair') return false;
            const isUnpaid = i.stipend.toLowerCase().includes('unpaid') || i.stipend.toLowerCase().includes('not listed');
            if (paidOnly && isUnpaid) return false;
            return true;
          }).map(internship => (
            <InternshipCard 
              key={internship.id} 
              {...internship} 
              onClick={() => navigate(`/internships/${internship.id}`)} 
            />
          ))}
        </div>
      </div>
      <InternshipBot />
    </div>
  );
}

function InternshipCard(props: any) {
  const { role, company, stipend, fairnessScore, fairnessLabel, flags, source, startDate, endDate, onClick } = props;

  const getFairnessColor = () => {
    if (fairnessLabel.toLowerCase() === 'fair') return 'bg-green-100 text-green-800 border-green-200';
    if (fairnessLabel.toLowerCase() === 'suspicious') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getFairnessProgressColor = () => {
    if (fairnessScore >= 8) return 'bg-green-500';
    if (fairnessScore >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getIcon = () => {
    if (fairnessScore >= 8) return <CheckCircle2 className="w-4 h-4" />;
    if (fairnessScore >= 5) return <AlertTriangle className="w-4 h-4" />;
    return <AlertOctagon className="w-4 h-4" />;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col relative"
    >
      <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-l border-slate-200">
        {source}
      </div>

      <div className="flex justify-between items-start mb-5 pt-2">
        <div className="pr-4">
          <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">{role}</h3>
          <div className="flex items-center text-slate-500 text-sm font-medium gap-3">
            <span>{company}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-slate-700 font-semibold">{stipend}</span>
          </div>
          {startDate && (
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-2 bg-indigo-50 px-2 py-0.5 rounded-md inline-block w-fit">
              <Calendar className="w-3 h-3" /> {startDate} to {endDate}
            </div>
          )}
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border ${getFairnessColor()} shrink-0`}>
          {getIcon()}
          {fairnessLabel}
        </div>
      </div>

      {/* Progress Bar Area */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fairness Score</span>
          <span className="text-sm font-bold text-slate-700">{fairnessScore}/10</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div className={`h-2 rounded-full ${getFairnessProgressColor()}`} style={{ width: `${(fairnessScore / 10) * 100}%` }}></div>
        </div>
      </div>

      {/* Analysis Flags */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-auto">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Analysis Flags</h4>
        <ul className="text-sm text-slate-700 space-y-1.5">
          {flags.map((flag: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
               <span className="text-slate-400 leading-none mt-0.5">•</span>
               <span className="leading-tight">{flag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
