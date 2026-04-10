import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@/src/utils/supabase/client';
import { Shield, Sparkles, User, Briefcase, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls } from '@react-three/drei';

function Login3DBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-slate-50 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#818cf8" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[1.5, 64, 64]} position={[-3, 1, 0]}>
            <MeshDistortMaterial color="#818cf8" attach="material" distort={0.4} speed={2} roughness={0.1} />
          </Sphere>
        </Float>
        
        <Float speed={2.5} rotationIntensity={2} floatIntensity={2}>
           <mesh position={[4, -1, -2]}>
             <torusKnotGeometry args={[1, 0.3, 128, 32]} />
             <meshStandardMaterial color="#2dd4bf" roughness={0.1} metalness={0.2} />
           </mesh>
        </Float>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-slate-100/50 pointer-events-none" />
    </div>
  );
}

export function Auth() {
  const [authMode, setAuthMode] = useState<'student' | 'recruiter'>('student');
  const [isLogin, setIsLogin] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const [recName, setRecName] = useState('');
  const [recCompany, setRecCompany] = useState('');
  const [recPhone, setRecPhone] = useState('');

  const navigate = useNavigate();

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email, password } : { email, password, role })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate(data.user.role === 'recruiter' ? '/recruiter' : '/');
      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRecruiterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/recruiter-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: recName, company: recCompany, phone: recPhone })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/recruiter');
      } else {
        alert(data.error || 'Recruiter login failed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=${authMode}`,
          queryParams: { prompt: 'select_account' }
        }
      });
      if (error) throw error;
    } catch (e: any) {
      console.error(e);
      alert(e.message || 'Google Auth failed');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 overflow-hidden bg-slate-50">
      <Login3DBackground />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] border border-white shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          
          <div className="flex bg-slate-100 rounded-2xl p-1 mb-8 shadow-inner border border-slate-200">
            <button
              onClick={() => setAuthMode('student')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${authMode === 'student' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <User className="w-4 h-4" /> Student
            </button>
            <button
              onClick={() => setAuthMode('recruiter')}
              className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${authMode === 'recruiter' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Briefcase className="w-4 h-4" /> Recruiter
            </button>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {authMode === 'recruiter' ? 'Recruiter Login' : (isLogin ? 'Welcome Back' : 'Join FairIntern')}
            </h2>
            <p className="mt-2 text-slate-500 font-medium text-sm">
              {authMode === 'recruiter' ? 'Manage your internships' : 'Discover fair opportunities with AI analysis'}
            </p>
          </div>

          {authMode === 'recruiter' ? (
            <form className="space-y-4" onSubmit={handleRecruiterSubmit}>
              <input 
                type="text" required value={recName} onChange={e => setRecName(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 font-medium text-sm"
                placeholder="Full Name"
              />
              <input 
                type="text" required value={recCompany} onChange={e => setRecCompany(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 font-medium text-sm"
                placeholder="Company Name"
              />
              <input 
                type="tel" required value={recPhone} onChange={e => setRecPhone(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 font-medium text-sm"
                placeholder="Phone Number"
              />
              <button type="submit" className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all uppercase tracking-widest text-xs shadow-lg mt-2">
                Continue
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleStudentSubmit}>
              <input 
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 font-medium text-sm"
                placeholder="Email address"
              />
              <input 
                type="password" required value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900 placeholder-slate-400 font-medium text-sm"
                placeholder="Password"
              />
              <button type="submit" className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all uppercase tracking-widest text-xs shadow-lg mt-2">
                {isLogin ? 'Sign-In' : 'Create Account'}
              </button>
            </form>
          )}

          <div className="mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center md:hidden"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-slate-400 bg-white inline-block mx-auto px-4">Or continue with</div>
            </div>

            <button 
              onClick={handleGoogleAuth}
              className="w-full flex items-center justify-center gap-3 py-3 px-6 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-sm transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <div className="text-center mt-6">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
