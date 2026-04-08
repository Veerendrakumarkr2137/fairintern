import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTERNSHIPS } from '@/src/mockData';
import { Building2, IndianRupee, ArrowLeft, ShieldAlert, CheckCircle2, AlertTriangle, AlertOctagon, Lock, Upload, PlayCircle, User } from 'lucide-react';
import { Modal } from '@/src/components/ui/Modal';

export function InternshipDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState<any>(null);
  
  // Application Data
  const [taskScore, setTaskScore] = useState<number | null>(null);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isFaceAuthOpen, setIsFaceAuthOpen] = useState(false);
  const [isProctoredOpen, setIsProctoredOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  
  // Apply Form
  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  
  useEffect(() => {
    // Simulate Fetch
    const item = MOCK_INTERNSHIPS.find(i => i.id === id);
    if (item) setInternship(item);
  }, [id]);

  const startFaceAuth = () => {
    setIsRulesOpen(false);
    setIsFaceAuthOpen(true);
  };

  const handleFaceAuthComplete = () => {
    setIsFaceAuthOpen(false);
    setIsProctoredOpen(true);
  };

  const submitTask = () => {
    setTaskScore(Math.floor(Math.random() * 3) + 8); // Random score 8-10
    setIsProctoredOpen(false);
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeUploaded) return alert("Please upload a resume first!");
    alert("Application successfully submitted with Task Score: " + taskScore + "/10");
    setIsApplyOpen(false);
    navigate('/');
  };

  if (!internship) return <div className="p-8 text-center text-slate-500 font-medium">Internship not found or loading...</div>;

  const getFairnessColor = () => {
    if (internship.fairnessLabel.toLowerCase() === 'fair') return 'bg-green-100 text-green-800 border-green-200';
    if (internship.fairnessLabel.toLowerCase() === 'suspicious') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getFairnessProgressColor = () => {
    if (internship.fairnessScore >= 8) return 'bg-green-500';
    if (internship.fairnessScore >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to internships
      </button>

      {/* Main Internship Description */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 border-b border-slate-100 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              {internship.source}
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-3">{internship.role}</h1>
            <div className="flex flex-wrap items-center gap-5 text-slate-600 font-medium">
              <span className="flex items-center gap-1.5"><Building2 className="w-5 h-5 text-slate-400" /> {internship.company}</span>
              <span className="flex items-center gap-1.5"><IndianRupee className="w-5 h-5 text-slate-400" /> {internship.stipend}</span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center gap-2 border ${getFairnessColor()}`}>
             {internship.fairnessScore >= 8 ? <CheckCircle2 className="w-5 h-5"/> : <AlertTriangle className="w-5 h-5"/>}
             {internship.fairnessLabel}
          </div>
        </div>

        <div className="prose prose-slate max-w-none mb-10">
          <h3 className="text-lg font-bold text-slate-900 mb-3">About the Role</h3>
          <p className="text-slate-600 leading-relaxed font-medium">{internship.description}</p>
        </div>

        {/* AI Fairness Analysis Box */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-5 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-green-600" /> AI Fairness Breakdown
          </h3>
          
          <div className="mb-6 max-w-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fairness Score</span>
              <span className="text-sm font-bold text-slate-800">{internship.fairnessScore}/10</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div className={`h-2.5 rounded-full ${getFairnessProgressColor()}`} style={{ width: `${(internship.fairnessScore / 10) * 100}%` }}></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Analysis Flags</h4>
            <ul className="space-y-2">
              {internship.flags.map((flag: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
                  <span className="text-slate-400 mt-0.5">•</span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Area for Application Flow */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Apply for this Internship</h2>
        <p className="text-slate-500 font-medium mb-8 max-w-xl mx-auto">
          To ensure fairness, all candidates must complete a brief skill-assessment task before submitting a resume.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {taskScore === null ? (
            <button 
              onClick={() => setIsRulesOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" /> Start Task
            </button>
          ) : (
            <div className="w-full sm:w-auto px-8 py-3.5 bg-green-50 text-green-700 font-bold rounded-xl border border-green-200 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Task Completed (Score: {taskScore}/10)
            </div>
          )}

          <button 
            disabled={taskScore === null}
            onClick={() => setIsApplyOpen(true)}
            className={`w-full sm:w-auto px-8 py-3.5 font-bold rounded-xl transition-all ${taskScore === null ? 'bg-slate-100 text-slate-400 cursor-not-allowed border-transparent' : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'}`}
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Rules & Regulations Modal */}
      <Modal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} title="Assessment Rules & Regulations">
        <div className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm font-medium">
            Please read the following instructions carefully before starting the assessment.
          </div>
          <ul className="space-y-3 text-sm text-slate-600 font-medium">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              This is a proctored environment. Tab switching is strictly prohibited.
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              Copy and Paste functionality has been disabled to ensure academic integrity.
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              You have one attempt to complete this task. Closing the window will void your progress.
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              Ensure you have a stable internet connection before proceeding.
            </li>
          </ul>
          <div className="pt-4">
            <button 
              onClick={startFaceAuth}
              className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg"
            >
              I Understand, Start Assessment
            </button>
          </div>
        </div>
      </Modal>

      {/* Face Authentication Modal */}
      <Modal isOpen={isFaceAuthOpen} onClose={() => setIsFaceAuthOpen(false)} title="Face Authentication">
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
            <div className="w-48 h-48 rounded-full border-4 border-dashed border-primary-500 animate-pulse flex items-center justify-center bg-slate-100/50 backdrop-blur-sm z-10">
              <User className="w-24 h-24 text-slate-300" />
            </div>
            
            {/* Scanner line simulation */}
            <div className="absolute inset-0 flex flex-col items-center justify-start pointer-events-none">
              <div className="w-full h-1 bg-primary-500/50 shadow-[0_0_15px_rgba(20,184,166,0.5)] animate-scan" />
            </div>

            <p className="mt-6 text-sm font-bold text-slate-500 tracking-wide uppercase">Adjust your face in the center</p>
          </div>

          <div className="space-y-3">
             <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-xs font-semibold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                Your camera is being used for live proctoring. Please do not move away.
             </div>
             <button 
               onClick={handleFaceAuthComplete}
               className="w-full py-4 bg-primary-600 text-white font-black rounded-2xl hover:bg-primary-700 transition-all shadow-md uppercase tracking-wider"
             >
               Verify & Authenticate
             </button>
          </div>
        </div>
      </Modal>

      {/* Simulated Proctored Environment Modal */}
      {isProctoredOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col">
          <div className="bg-red-600 text-white text-xs font-bold uppercase tracking-widest text-center py-2 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" /> Restricted Environment: Tab switching and Copy/Paste disabled.
          </div>
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center text-slate-300">
            <span className="font-bold">Skill Assessment Task</span>
            <button onClick={() => setIsProctoredOpen(false)} className="text-sm font-semibold hover:text-white">Exit Task</button>
          </div>
          <div className="flex-1 overflow-auto p-8 max-w-4xl mx-auto w-full text-slate-100">
            <h2 className="text-2xl font-bold mb-4">{internship.role} Task</h2>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8 font-medium">
              Task Prompt: {internship.task}
            </div>
            
            <label className="block text-sm font-bold text-slate-400 mb-2">Your Submission (Code or Text)</label>
            <textarea 
              className="w-full h-64 bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-300 font-mono focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              placeholder="// Write your solution here..."
            />
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={submitTask}
                className="px-8 py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-400 shadow-lg"
              >
                Submit Task & Evaluate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Apply Form */}
      <Modal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} title="Complete Application">
        <form onSubmit={submitApplication} className="space-y-5 p-2">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Key Skills</label>
            <input 
              type="text" 
              required
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="React, Python, Figma..."
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Past Projects / Portfolio (Brief)</label>
            <textarea 
              required
              value={projects}
              onChange={e => setProjects(e.target.value)}
              placeholder="Describe tools built, Hackathons won, etc."
              rows={3}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-slate-400 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Resume</label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${resumeUploaded ? 'border-green-500 bg-green-50' : 'border-slate-300 hover:bg-slate-50'}`}
                 onClick={() => setResumeUploaded(true)}>
              {resumeUploaded ? (
                 <div className="text-green-700 font-bold flex items-center justify-center gap-2"><CheckCircle2 className="w-5 h-5"/> Resume_Final.pdf Uploaded</div>
              ) : (
                 <div className="text-slate-500 font-semibold flex flex-col items-center gap-2"><Upload className="w-6 h-6"/> Click to simulate upload (.pdf)</div>
              )}
            </div>
          </div>
          <button type="submit" className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl mt-4 hover:bg-slate-800">
            Submit Application
          </button>
        </form>
      </Modal>

    </div>
  );
}
