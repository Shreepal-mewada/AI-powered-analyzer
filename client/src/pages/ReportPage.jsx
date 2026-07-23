import React, { useState } from 'react';
import { FloatingExportBar } from '../components/common/FloatingExportBar';

export const ReportPage = () => {
  const [activeSection, setActiveSection] = useState('all');

  const brief = {
    metadata: {
      title: "Scaling Transformer Architectures via Recursive Sub-layering",
      authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit"],
      year: 2023,
      venue: "NeurIPS 2023"
    },
    executiveSummary: 'This analysis explores the core methodologies presented in "Efficient Transformers via Recursive Sub-layering." The paper introduces a novel approach to attention mechanisms that reduces computational complexity from O(n²) to O(n log n) without significant accuracy loss. Benchmark results are verified against the SQuAD 2.0 dataset, finding a 1.2% variance from reported values.',
    researchAnalysis: {
      problemStatement: "Recursive Layer Normalization applied before multi-head attention.",
      coreHypothesis: "Sparsity-aware pruning of attention heads based on importance scoring.",
      methodology: "Constructing a state-based multi-agent graph to analyze section chunks in parallel.",
      keyFindings: "Dynamic token merging for long-context windows up to 128k tokens with 94.2% accuracy."
    },
    citations: [
      { title: "Attention Is All You Need. NIPS.", authors: "[Vaswani et al., 2017]", year: "2017" },
      { title: "Reformer: The Efficient Transformer. ICLR.", authors: "[Kitaev et al., 2020]", year: "2020" },
      { title: "Generating Long Sequences with Sparse Transformers.", authors: "[Child et al., 2019]", year: "2019" }
    ],
    keyInsights: [
      { takeaway: "The sub-layering technique can be integrated into existing BERT pipelines with <10% code modification." },
      { takeaway: "Reduced precision in long-context merging may lead to slight degradation in specific semantic tasks." }
    ],
    markdownContent: `# Synthesis Report: Scaling Transformer Architectures...`
  };

  const { metadata, executiveSummary, researchAnalysis, citations, keyInsights } = brief;

  return (
    <div className="max-w-[850px] mx-auto px-6 pt-16 pb-28 space-y-8 animate-noteo-fade">
      
      {/* Paper Masthead */}
      <div className="noteo-card p-8 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-full border border-white/10">
              {metadata?.venue}
            </span>
            <span className="text-xs text-zinc-500 font-medium">{metadata?.year}</span>
          </div>

          <span className="text-xs text-amber-500 font-semibold font-mono">
            Verified Synthesis Report
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading leading-tight">
            {metadata?.title}
          </h1>
          <p className="text-sm text-zinc-400 font-medium">
            Authors: <span className="text-zinc-200 font-semibold">{metadata?.authors?.join(', ')}</span>
          </p>
        </div>
      </div>

      {/* Section Jump Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: 'Full Synthesis' },
          { id: 'summary', label: 'Executive Summary' },
          { id: 'methodology', label: 'Methodology' },
          { id: 'insights', label: 'Applications & Tradeoffs' },
          { id: 'citations', label: 'Citations' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
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
        <section className="noteo-card p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h2 className="text-lg font-bold text-white font-heading">1. Executive Summary</h2>
          </div>
          <div className="prose-noteo">
            <p>{executiveSummary}</p>
          </div>
        </section>
      )}

      {/* Section 2: Core Methodology */}
      {(activeSection === 'all' || activeSection === 'methodology') && (
        <section className="noteo-card p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h2 className="text-lg font-bold text-white font-heading">2. Core Methodology & Findings</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-heading">Problem Statement</span>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                {researchAnalysis?.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-heading">Core Hypothesis</span>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                {researchAnalysis?.coreHypothesis}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider font-heading">Verified Key Finding</span>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
              {researchAnalysis?.keyFindings}
            </p>
          </div>
        </section>
      )}

      {/* Section 3: Applications & Risks */}
      {(activeSection === 'all' || activeSection === 'insights') && (
        <section className="noteo-card p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h2 className="text-lg font-bold text-white font-heading">3. Applications & Tradeoffs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-heading">Implementation Advantage</span>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                {keyInsights?.[0]?.takeaway}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-heading">Technical Tradeoff</span>
              <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed">
                {keyInsights?.[1]?.takeaway}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Verified Citations */}
      {(activeSection === 'all' || activeSection === 'citations') && (
        <section className="noteo-card p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h2 className="text-lg font-bold text-white font-heading">4. Verified Citations</h2>
            </div>
            <span className="text-xs text-zinc-500 font-mono">Verified via arXiv</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {citations.map((c, idx) => (
              <div key={idx} className="p-4 bg-zinc-900/60 rounded-2xl border border-white/10 space-y-1">
                <p className="text-xs font-bold text-amber-500">{c.authors}</p>
                <p className="text-[11px] text-zinc-300 leading-snug">{c.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <FloatingExportBar brief={brief} />

    </div>
  );
};
