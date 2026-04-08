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

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
        <NavBar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/internships/:id" element={<InternshipDetail />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

