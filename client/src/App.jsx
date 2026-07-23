import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { ReportPage } from './pages/ReportPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { FaqPage } from './pages/FaqPage';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0A0C] text-[#F4F4F5] flex flex-col font-sans antialiased">
        
        {/* Top Noteo Glass Header */}
        <Navbar />

        {/* Full-Width Canvas */}
        <main className="pt-20 min-h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/workflow" element={<WorkflowPage />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </main>

        {/* Simple Clean Footer */}
        <footer className="py-8 border-t border-white/10 text-center text-xs text-zinc-500 space-y-1">
          <p>© 2026 ScholarSense Inc. Multi-Agent Research Intelligence Engine.</p>
          <p className="text-zinc-600">Privacy & Terms • Ephemeral Parsing Mode</p>
        </footer>

      </div>
    </Router>
  );
}



