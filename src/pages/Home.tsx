import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '@/src/mockData';
import { Shield, Search, Zap, CheckCircle2, AlertTriangle, AlertOctagon, Calendar, Sparkles, User } from 'lucide-react';
import { Modal } from '@/src/components/ui/Modal';
import { Hero3D } from '@/src/components/ui/Hero3D';
import { motion } from 'framer-motion';

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
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center select-none font-sans text-slate-900">
        
        {/* Public Hero */}
        <section className="w-full relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
          <Hero3D />
          
          <div className="w-full max-w-6xl mx-auto px-6 py-24 text-center flex flex-col items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-black text-indigo-600 mb-10 shadow-sm uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4" />
              Empowering the Next Generation of Talent
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-10"
            >
              FIND FAIR <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500">OPPORTUNITY.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 max-w-2xl mb-14 leading-relaxed font-medium"
            >
              The AI-powered aggregator that vets internships for fairness, 
              transparency, and educational value.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 w-full justify-center"
            >
              <button 
                onClick={handleActionClick}
                className="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-lg"
              >
                Explore Roles
              </button>
              <button 
                onClick={handleActionClick}
                className="px-12 py-5 bg-white text-slate-900 border-2 border-slate-200 font-black rounded-2xl hover:border-indigo-400 hover:text-indigo-600 transition-all hover:-translate-y-1 active:scale-95 text-lg"
              >
                Post for Free
              </button>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
             <div className="w-6 h-10 rounded-full border-2 border-slate-900 flex justify-center p-1">
                <div className="w-1 h-2 bg-slate-900 rounded-full" />
             </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="w-full py-32 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 font-sans">How it <span className="text-indigo-600">Works.</span></h2>
               <p className="text-slate-500 font-medium max-w-xl mx-auto">We use advanced LLMs to audit thousands of internship listings every day.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { i: "01", t: "Discovery", d: "Our AI agent crawls dozens of platforms to find the latest roles." },
                 { i: "02", t: "Vetting", d: "We analyze pay, hours, and educational value to generate a Fairness Score." },
                 { i: "03", t: "Empowerment", d: "Apply with confidence to roles that respect your time and talent." }
               ].map((step, idx) => (
                 <div key={idx} className="relative group p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                    <span className="text-6xl font-black text-slate-50 absolute -top-4 -left-2 z-0 group-hover:text-indigo-50 transition-colors">{step.i}</span>
                    <h3 className="text-2xl font-black text-slate-900 mb-4 relative z-10">{step.t}</h3>
                    <p className="text-slate-500 font-medium relative z-10">{step.d}</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Live Vetted Section */}
        <section className="w-full max-w-7xl mx-auto px-6 py-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Sample <span className="text-indigo-600">Audit.</span></h2>
              <p className="text-slate-500 font-medium">Verified roles currently active in the ecosystem.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {internships.slice(0, 3).map((internship, i) => (
              <InternshipCard key={internship.id || i} {...internship} onClick={handleActionClick} />
            ))}
          </div>
          
          <div className="text-center">
             <button onClick={handleActionClick} className="text-indigo-600 font-black flex items-center gap-2 mx-auto hover:gap-4 transition-all">
                View All Audited Opportunities <Zap className="w-5 h-5 fill-current" />
             </button>
          </div>
        </section>

        {/* Global Features Section */}
        <section className="w-full py-32 bg-slate-900 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
           <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                 <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">Built for <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">Fair Play.</span></h2>
                 <p className="text-slate-400 text-xl font-medium leading-relaxed">We believe every hour worked is an hour that should be respected. Our platform is the shield against exploitative "unpaid experience" roles.</p>
                 
                 <div className="grid grid-cols-2 gap-8 pt-4">
                    <div className="space-y-2">
                       <h4 className="text-3xl font-black text-white">85%</h4>
                       <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Fair Accuracy</p>
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-3xl font-black text-white">10k+</h4>
                       <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Roles Audited</p>
                    </div>
                 </div>
              </div>
              
              <div className="space-y-6">
                 {[
                   { icon: <Shield />, t: "Integrity Protect", d: "Proprietary AI flags suspicious patterns in job descriptions." },
                   { icon: <CheckCircle2 />, t: "Verified Stipends", d: "Only roles with confirmed payment ranges are promoted." },
                   { icon: <Zap />, t: "Instant Alerts", d: "Be the first to apply to the most fair roles on the market." }
                 ].map((feat, i) => (
                    <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                       <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                          {feat.icon}
                       </div>
                       <div>
                          <h4 className="text-lg font-black mb-1">{feat.t}</h4>
                          <p className="text-slate-400 font-medium text-sm">{feat.d}</p>
                       </div>
                    </div>
                 ))}
              </div>
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
                 <p className="text-slate-400 text-sm font-medium">© 2026 FairIntern. Vetting for a better future.</p>
              </div>
              
              <div className="flex gap-12">
                 <div className="flex flex-col gap-3">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-900">Product</span>
                    <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Directory</a>
                    <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">AI Audit</a>
                 </div>
                 <div className="flex flex-col gap-3">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-900">Legal</span>
                    <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Privacy</a>
                    <a href="#" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Terms</a>
                 </div>
              </div>
           </div>
        </footer>

        <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} title="Join FairIntern" className="max-w-sm text-center p-8 bg-white rounded-[2rem]">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl mx-auto flex items-center justify-center mb-6">
             <User className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black mb-4">Discovery Awaits</h3>
          <p className="text-slate-500 mb-8 font-medium">Create a free account to view detailed audits and apply to premium roles.</p>
          <button onClick={() => navigate('/auth')} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all uppercase tracking-widest text-xs">
            Let's Go
          </button>
        </Modal>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}

function InternshipCard(props: any) {
  const { role, company, stipend, fairness_score, fairnessScore, fairness_label, fairnessLabel, flags, source, onClick } = props;

  const score = fairness_score || fairnessScore || 5;
  const label = fairness_label || fairnessLabel || 'Suspicious';

  const getFairnessColor = () => {
    const l = label.toLowerCase();
    if (l === 'fair') return 'bg-green-100 text-green-800 border-green-200';
    if (l === 'suspicious') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getFairnessProgressColor = () => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm cursor-pointer hover:shadow-2xl transition-shadow flex flex-col relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-2xl bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-l border-slate-200">
        {source || 'External'}
      </div>

      <div className="flex justify-between items-start mb-5 pt-2">
        <div className="pr-4">
          <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">{role}</h3>
          <p className="text-slate-500 text-sm font-medium">{company} • {stipend}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${getFairnessColor()} shrink-0`}>
          {label}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fairness Score</span>
          <span className="text-sm font-bold text-slate-700">{score}/10</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div className={`h-full rounded-full ${getFairnessProgressColor()}`} style={{ width: `${(score / 10) * 100}%` }}></div>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-auto">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Analysis Flags</h4>
        <div className="flex flex-wrap gap-2">
          {flags && (typeof flags === 'string' ? JSON.parse(flags) : flags).map((flag: string, i: number) => (
            <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">{flag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
