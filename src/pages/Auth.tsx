import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormInput } from '@/src/components/ui/FormInput';
import { GoogleAuthButton } from '@/src/components/ui/GoogleAuthButton';
import { Shield } from 'lucide-react';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin ? { email, password } : { email, password, role };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate(data.user.role === 'recruiter' ? '/recruiter' : '/student');
      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const res = await fetch('/api/auth/google/url');
      const { url } = await res.json();
      const authWindow = window.open(url, 'oauth_popup', 'width=600,height=700');
      
      if (!authWindow) {
        alert('Please allow popups to connect with Google.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        // Mock success
        localStorage.setItem('token', event.data.token);
        localStorage.setItem('user', JSON.stringify({ email: 'google@user.com', role: 'student' }));
        navigate('/student');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin ? 'Sign in to your account to continue' : 'Join FairIntern to find or post fair opportunities'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormInput 
              label="Email address" 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <FormInput 
              label="Password" 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            
            {!isLogin && (
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700">I am a...</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`py-2 px-4 text-sm font-medium rounded-lg border ${role === 'student' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('recruiter')}
                    className={`py-2 px-4 text-sm font-medium rounded-lg border ${role === 'recruiter' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                  >
                    Recruiter
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
          >
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleAuthButton onClick={handleGoogleAuth} />
          </div>
        </div>

        <div className="text-center mt-4">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
