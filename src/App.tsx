/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/ui/NavBar';
import { Footer } from './components/ui/Footer';
import { Home } from './pages/Home';
import { InternshipDetail } from './pages/InternshipDetail';
import { StudentDashboard } from './pages/StudentDashboard';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { Auth } from './pages/Auth';
import { AuthCallback } from './pages/AuthCallback';
import { Profile } from './pages/Profile';
import { InternshipBot } from './components/ui/InternshipBot';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white selection:bg-indigo-600 selection:text-white relative">
        <NavBar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/internships/:id" element={<InternshipDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </main>
        <Footer />
        <InternshipBot />
      </div>
    </Router>
  );
}

