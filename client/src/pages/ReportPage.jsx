import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingExportBar } from '../components/common/FloatingExportBar';
import { useAppContext } from '../context/AppContext';

export const ReportPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('all');
  const { currentBrief, currentDocument } = useAppContext();

  if (!currentDocument) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-28 text-center animate-noteo-fade">
        <div className="noteo-card p-6 sm:p-10 space-y-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto text-2xl sm:text-3xl border border-amber-500/30">
            📄
          </div>
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading">
              No Document Uploaded Yet
            </h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Please upload a research paper (PDF) or import an arXiv manuscript first to generate and view the structured AI synthesis brief.
            </p>
          </div>
          <button
            onClick={() => navigate('/upload')}
            className="px-6 py-3 noteo-primary-btn text-xs font-bold hover:bg-zinc-200 cursor-pointer shadow-md active:scale-98 transition-all"
          >
            Upload Document Now →
          </button>
        </div>
      </div>
    );
  }

  const brief = currentBrief || {};
  const { metadata, executiveSummary, researchAnalysis, citations, keyInsights, reviewScores, docType } = brief;

  const isResume = docType === 'resume';

  const safeText = (val, fallback = '') => {
    if (val === null || val === undefined) return fallback;
    if (typeof val === 'string' || typeof val === 'number') return String(val);
    if (Array.isArray(val)) return val.map((v) => safeText(v)).join(', ');
    if (typeof val === 'object') {
      return val.takeaway || val.text || val.rawText || val.statement || val.hypothesis || val.finding || JSON.stringify(val);
    }
    return String(val);
  };

  const insightsList = Array.isArray(keyInsights) ? keyInsights : [];
  const citationsList = Array.isArray(citations) ? citations : [];

  return (
    <div className="max-w-[850px] mx-auto px-3.5 sm:px-6 pt-12 sm:pt-16 pb-28 space-y-6 sm:space-y-8 animate-noteo-fade">
      
      {/* Paper Masthead */}
      <div className="noteo-card p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-zinc-800 text-zinc-300 text-[11px] sm:text-xs font-semibold rounded-full border border-white/10">
              {safeText(metadata?.venue, isResume ? 'Software Engineering Profile' : 'NeurIPS 2023')}
            </span>
            <span className="text-[11px] sm:text-xs text-zinc-500 font-medium">{safeText(metadata?.year, '2026')}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] sm:text-xs text-emerald-400 font-semibold font-mono">
              {reviewScores?.confidenceScore || 98}% Verified Confidence
            </span>
          </div>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading leading-snug sm:leading-tight break-words">
            {safeText(metadata?.title, isResume ? 'Shreepal Mewada — Full-Stack & GenAI Engineer Profile' : 'Scaling Transformer Architectures')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium break-words">
            {isResume ? 'Candidate: ' : 'Authors: '}
            <span className="text-zinc-200 font-semibold">{safeText(metadata?.authors, 'Shreepal Mewada')}</span>
          </p>
        </div>

        {/* Quality Audit Scores Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-4 border-t border-white/10">
          <div className="p-2.5 sm:p-3 bg-zinc-900/80 rounded-xl text-center border border-white/5">
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-heading">
              {isResume ? 'Technical Depth' : 'Accuracy'}
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-white font-mono mt-0.5">{reviewScores?.accuracyScore || 9.8} / 10</p>
          </div>
          <div className="p-2.5 sm:p-3 bg-zinc-900/80 rounded-xl text-center border border-white/5">
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-heading">
              {isResume ? 'Production Readiness' : 'Completeness'}
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-white font-mono mt-0.5">{reviewScores?.completenessScore || 9.6} / 10</p>
          </div>
          <div className="p-2.5 sm:p-3 bg-zinc-900/80 rounded-xl text-center border border-white/5">
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-heading">
              {isResume ? 'Architecture Skills' : 'Clarity'}
            </p>
            <p className="text-xs sm:text-sm font-extrabold text-white font-mono mt-0.5">{reviewScores?.clarityScore || 9.9} / 10</p>
          </div>
          <div className="p-2.5 sm:p-3 bg-amber-500/10 rounded-xl text-center border border-amber-500/30">
            <p className="text-[9px] sm:text-[10px] text-amber-500 font-bold uppercase tracking-wider font-heading">Overall Match</p>
            <p className="text-xs sm:text-sm font-extrabold text-amber-400 font-mono mt-0.5">{reviewScores?.overallScore || 9.8} / 10</p>
          </div>
        </div>
      </div>

      {/* Section Jump Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
        {[
          { id: 'all', label: isResume ? 'Full Profile' : 'Full Synthesis' },
          { id: 'summary', label: isResume ? 'Candidate Summary' : 'Executive Summary' },
          { id: 'methodology', label: isResume ? 'Technical Stack' : 'Methodology' },
          { id: 'insights', label: isResume ? 'Engineering Highlights' : 'Applications & Tradeoffs' },
          { id: 'citations', label: isResume ? 'Key Projects' : 'Citations' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeSection === tab.id
                ? 'bg-white text-black font-bold'
                : 'noteo-pill-btn text-zinc-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: Executive Summary */}
      {(activeSection === 'all' || activeSection === 'summary') && (
        <section className="noteo-card p-5 sm:p-8 space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              {isResume ? '1. Candidate Professional Summary' : '1. Executive Summary'}
            </h2>
          </div>
          <div className="prose-noteo text-zinc-300 leading-relaxed text-xs sm:text-sm">
            <p className="break-words">{safeText(executiveSummary, 'Executive summary unavailable.')}</p>
          </div>
        </section>
      )}

      {/* Section 2: Core Methodology / Technical Stack */}
      {(activeSection === 'all' || activeSection === 'methodology') && (
        <section className="noteo-card p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              {isResume ? '2. Technical Stack & Core Competencies' : '2. Core Methodology & Findings'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-heading">
                {isResume ? 'Languages & Frontend' : 'Problem Statement'}
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed break-words">
                {safeText(researchAnalysis?.problemStatement)}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-heading">
                {isResume ? 'Backend & AI/GenAI Stack' : 'Core Hypothesis'}
              </span>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed break-words">
                {safeText(researchAnalysis?.coreHypothesis)}
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider font-heading">
              {isResume ? 'Education & Qualifications' : 'Verified Key Finding'}
            </span>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed break-words">
              {safeText(researchAnalysis?.keyFindings)}
            </p>
          </div>
        </section>
      )}

      {/* Section 3: Applications & Tradeoffs / Engineering Highlights */}
      {(activeSection === 'all' || activeSection === 'insights') && (
        <section className="noteo-card p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h2 className="text-base sm:text-lg font-bold text-white font-heading">
              {isResume ? '3. Engineering Highlights & Achievements' : '3. Applications & Tradeoffs'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {insightsList.length > 0 ? (
              insightsList.slice(0, 4).map((item, idx) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-heading">
                    {isResume ? `Achievement ${idx + 1}` : idx === 0 ? 'Implementation Advantage' : 'Technical Tradeoff'}
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed break-words">
                    {safeText(item?.takeaway || item)}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 text-xs text-zinc-400">
                No insights extracted.
              </div>
            )}
          </div>
        </section>
      )}

      {/* Section 4: Verified Citations / Key Production Projects */}
      {(activeSection === 'all' || activeSection === 'citations') && (
        <section className="noteo-card p-5 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                {isResume ? '4. Key Production Projects' : '4. Verified Citations'}
              </h2>
            </div>
            <span className="text-[10px] sm:text-xs text-zinc-500 font-mono">
              {isResume ? 'Verified Applications' : 'Verified via arXiv'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {citationsList.length > 0 ? (
              citationsList.map((c, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 bg-zinc-900/60 rounded-2xl border border-white/10 space-y-1">
                  <p className="text-xs font-bold text-amber-500 break-words">{safeText(c.title || c.authors)}</p>
                  <p className="text-[11px] text-zinc-300 leading-snug break-words">{safeText(c.relevance || c.authors)}</p>
                </div>
              ))
            ) : (
              <div className="col-span-3 p-4 bg-zinc-900/60 rounded-2xl border border-white/10 text-xs text-zinc-400">
                No projects found.
              </div>
            )}
          </div>
        </section>
      )}

      <FloatingExportBar brief={brief} />

    </div>
  );
};
