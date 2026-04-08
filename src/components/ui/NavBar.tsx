import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, User } from 'lucide-react';

export function NavBar() {
  const navigate = useNavigate();
  // Mock auth state
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">FairIntern</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Browse</Link>
            {token ? (
              <div className="flex items-center gap-4">
                <Link 
                  to={user?.role === 'recruiter' ? '/recruiter' : '/student'} 
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
                >
                  <User className="w-4 h-4" /> Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
                <Link to="/auth" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
