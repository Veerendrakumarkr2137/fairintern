import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '@/src/mockData';
import { Shield, Search, Zap, CheckCircle2, AlertTriangle, AlertOctagon, Calendar, Sparkles, User } from 'lucide-react';
import { Modal } from '@/src/components/ui/Modal';
import { Hero3D } from '@/src/components/ui/Hero3D';
import { motion } from 'framer-motion';

function InternshipCard({ role, company, stipend, fairness_score, fairnessScore, fairness_label, fairnessLabel, flags, source, onClick }: any) {
  const score = fairness_score || fairnessScore || 5;
  const label = fairness_label || fairnessLabel || 'Suspicious';
  
  const getFairnessColor = (l: string) => {
    const lower = l.toLowerCase();
    if (lower === 'fair') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (lower === 'suspicious') return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  const getFairnessProgressColor = (s: number) => {
    if (s >= 7) return 'bg-emerald-500';
    if (s >= 5) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getFairnessColor(label)}`}>
          {label}
        </div>
        {source && (
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{source}</span>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{role}</h3>
        <p className="text-slate-500 font-bold mb-6 flex items-center gap-2">
          {company} <span className="w-1 h-1 rounded-full bg-slate-300" /> {stipend}
        </p>
        
        <div className="space-y-4 mb-8">
           <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fairness Score</span>
              <span className="text-lg font-black text-slate-900">{score}/10</span>
           </div>
           <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${getFairnessProgressColor(score)} transition-all duration-1000`} style={{ width: `${score * 10}%` }} />
           </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(flags || []).slice(0, 3).map((flag: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100">
              {flag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
         <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">Details <Zap className="w-3 h-3 fill-current" /></span>
      </div>
    </motion.div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const [internships, setInternships] = useState<any[]>(MOCK_INTERNSHIPS);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [fairOnly, setFairOnly] = useState(false);
  const [paidOnly, setPaidOnly] = useState(false);

  useEffect(() => {
    async function fetchInternships() {
      try {
        const res = await fetch('/api/internships');
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setInternships(data);
        }
      } catch (e) {
        console.warn("Using fallback mock data:", e);
      }
    }
    fetchInternships();
  }, []);

  const handleActionClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      // Logic for authenticated interaction
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center select-none font-sans text-slate-900">
        
        {/* Public Hero */}
        <section className="w-full relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-50/50">
          <Hero3D />
          
          <div className="w-full max-w-6xl mx-auto px-6 py-24 text-center flex flex-col items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-[10px] font-black text-slate-500 mb-10 uppercase tracking-[0.3em]"
            >
              The Next Standard of Internships
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-10"
            >
              FIND FAIR <br/>
              <span className="text-indigo-600">OPPORTUNITY.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-14 leading-relaxed font-medium"
            >
              The AI-powered aggregator built to vet internships for transparency, 
              fairness, and real educational value.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
              <button 
                onClick={handleActionClick}
                className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 text-lg uppercase tracking-widest text-xs"
              >
                Browse Roles
              </button>
              <button 
                onClick={handleActionClick}
                className="px-12 py-5 bg-white text-slate-900 border border-slate-200 font-black rounded-2xl hover:border-slate-400 transition-all hover:-translate-y-1 text-lg uppercase tracking-widest text-xs"
              >
                Post for Free
              </button>
            </div>
          </div>
        </section>

        {/* Live Integrity Audit Feed */}
        <section className="w-full py-6 bg-slate-900 text-white overflow-hidden border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-6 whitespace-nowrap flex items-center justify-between gap-20">
             <div className="flex items-center gap-3 shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Live Audit Engine</span>
             </div>
             <div className="flex gap-20 overflow-x-auto no-scrollbar py-2">
                {[
                  { l: "Vetting Accuracy", v: "99.2%" },
                  { l: "Blocked Red Flags", v: "2,491" },
                  { l: "Roles Crawled", v: "14,802" },
                  { l: "Pay Transparency", v: "High" }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col text-center">
                     <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{s.l}</span>
                     <span className="text-sm font-black text-white tracking-widest">{s.v}</span>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-20 tracking-tighter">How we protect <br/><span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">your future.</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {[
                 { t: "Discovery", d: "Our global AI agent crawls dozens of platforms to find the latest openings in real-time." },
                 { t: "Vetting", d: "Gemini 2.0 analyzes pay ranges, task descriptions, and educational intent." },
                 { t: "Empowerment", d: "We promote only the roles that hit our strict Fairness and Growth standards." }
               ].map((step, idx) => (
                 <div key={idx} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-900 font-black text-xl mb-8">0{idx+1}</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">{step.t}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{step.d}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="w-full py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="p-10 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                  <div className="flex items-center gap-3 text-rose-500 mb-8">
                     <AlertOctagon className="w-6 h-6" />
                     <span className="text-xs font-black uppercase tracking-widest">The Red Flags</span>
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Vague, Unpaid, and <br/>Exploitative.</h4>
                  <ul className="space-y-4 text-slate-500 font-medium">
                     {["Unspecified 'Competitive' Stipends", "Production-heavy task lists with 0 pay", "Ambiguous learning objectives", "No mentorship guarantees"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-rose-200" /> {item}</li>
                     ))}
                  </ul>
               </div>

               <div className="p-10 bg-white border border-indigo-200 rounded-[2.5rem] shadow-sm">
                  <div className="flex items-center gap-3 text-indigo-600 mb-8">
                     <CheckCircle2 className="w-6 h-6" />
                     <span className="text-xs font-black uppercase tracking-widest">The Fair Standard</span>
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Verified, Vetted, and <br/>Educational.</h4>
                  <ul className="space-y-4 text-slate-700 font-bold">
                     {["Explicit Pay Transparency", "Structured skill-building tracks", "Dedicated mentor allocation", "Reasonable hours (Max 40/wk)"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-500" /> {item}</li>
                     ))}
                  </ul>
               </div>
            </div>
          </div>
        </section>

        {/* Live Opportunities Directory (Sample) */}
        <section className="w-full max-w-7xl mx-auto px-6 py-32">
          <div className="flex justify-between items-end mb-16 px-4">
             <div>
                <h2 className="text-4xl font-black text-slate-900 mb-4">Live <span className="text-indigo-600">Audit.</span></h2>
                <p className="text-slate-500 font-medium">Recently verified internships currently active.</p>
             </div>
             <button onClick={handleActionClick} className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all text-xs uppercase tracking-widest">View Directory</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {internships.slice(0, 3).map((internship, i) => (
              <InternshipCard key={internship.id || i} {...internship} onClick={handleActionClick} />
            ))}
          </div>
        </section>

        {/* Simple Footer */}
        <footer className="w-full py-20 bg-white border-t border-slate-100">
           <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                       <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">FairIntern</span>
                 </div>
                 <p className="text-slate-400 text-xs font-medium">© 2026 FairIntern. Vetting for a better future.</p>
              </div>
              
              <div className="flex gap-12 text-xs font-black uppercase tracking-widest text-slate-400">
                 <a href="#" className="hover:text-indigo-600 transition-colors">Directory</a>
                 <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                 <a href="#" className="hover:text-indigo-600 transition-colors">Contact</a>
              </div>
           </div>
        </footer>

        <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} title="Join FairIntern" className="max-w-sm text-center p-8 bg-white rounded-[2rem]">
          <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-3xl mx-auto flex items-center justify-center mb-6 border border-slate-100">
             <User className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black mb-4">Discovery Awaits</h3>
          <p className="text-slate-500 mb-8 font-medium">Sign in to view detailed audit reports and apply to premium roles.</p>
          <button onClick={() => navigate('/auth')} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all uppercase tracking-widest text-xs">
            Enter Platform
          </button>
        </Modal>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
           <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter uppercase">Internship Directory</h1>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Vetted and analyzed by FairIntern AI Engine.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters */}
          <aside className="w-full md:w-64 space-y-8">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-8">Filters</h3>
              <div className="space-y-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" checked={fairOnly} onChange={e => setFairOnly(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                  />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">Fair Only</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" checked={paidOnly} onChange={e => setPaidOnly(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                  />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors">Paid Only</span>
                </label>
              </div>
            </div>
            
            <div className="p-8 bg-slate-900 rounded-[2rem] text-white">
               <Zap className="w-6 h-6 text-indigo-400 mb-6 fill-current" />
               <h4 className="text-sm font-black uppercase tracking-widest mb-4">AI Search Live</h4>
               <p className="text-xs text-slate-400 leading-relaxed font-bold">New roles are being evaluated in real-time by the Integrity Engine.</p>
            </div>
          </aside>

          {/* Listings */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
            {internships.filter(i => {
              if (fairOnly && (i.fairness_label || i.fairnessLabel)?.toLowerCase() !== 'fair') return false;
              const isUnpaid = (i.stipend || "").toLowerCase().includes('unpaid');
              if (paidOnly && isUnpaid) return false;
              return true;
            }).map((internship, i) => (
              <InternshipCard 
                key={internship.id || i} 
                {...internship} 
                onClick={() => navigate(`/internships/${internship.id}`)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
