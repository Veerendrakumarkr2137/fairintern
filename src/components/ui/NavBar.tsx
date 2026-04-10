import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User, LogOut, Menu, Zap } from 'lucide-react';

export function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group transition-all">
            <div className="bg-slate-900 p-2 rounded-xl group-hover:bg-indigo-600 transition-colors">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">FairIntern</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Directory</Link>
            {user?.role === 'recruiter' && (
              <Link to="/recruiter" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">Recruiter Hub</Link>
            )}
            
            <div className="flex items-center gap-6 border-l border-slate-200 pl-8">
              {!token ? (
                <button 
                  onClick={() => navigate('/auth')}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Join Platform
                </button>
              ) : (
                <div className="flex items-center gap-6">
                   <Link to="/profile" className="flex items-center gap-2 group">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all border border-slate-200">
                         <User className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-600 group-hover:text-slate-900 transition-colors">
                         {user.name}
                      </span>
                   </Link>
                   <button 
                     onClick={handleLogout}
                     className="text-slate-400 hover:text-rose-500 transition-colors"
                     title="Logout"
                   >
                     <LogOut className="w-5 h-5" />
                   </button>
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden text-slate-900">
             <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
