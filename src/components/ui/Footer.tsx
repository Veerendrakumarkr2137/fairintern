import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900 tracking-tight">FairIntern</span>
            <span className="text-sm text-slate-500">© 2026. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">About</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
