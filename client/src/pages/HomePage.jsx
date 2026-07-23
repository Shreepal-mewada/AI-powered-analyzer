import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 pt-16 pb-24 animate-noteo-fade">
      
      {/* HERO SECTION (Directly matching Noteo reference image) */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto space-y-8">
        
        {/* Glow Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight font-heading leading-tight">
            AI Powered <span className="text-amber-500 font-extrabold noteo-amber-glow">Summaries</span>
          </h1>

          <p className="text-base sm:text-xl text-zinc-400 font-normal max-w-2xl mx-auto leading-relaxed">
            From meetings and emails to research papers and reports, our AI distills complex information into clear, concise summaries — so you're always in control and up to speed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/upload')}
              className="px-8 py-3.5 noteo-pill-btn text-sm font-medium hover:border-white/40 cursor-pointer shadow-lg active:scale-98 transition-all"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate('/upload')}
              className="px-8 py-3.5 noteo-pill-btn text-sm font-medium hover:border-white/40 cursor-pointer shadow-lg active:scale-98 transition-all bg-zinc-800/80 hover:bg-zinc-700"
            >
              Summarize Now
            </button>
          </div>
        </div>

        {/* Bottom Hero "Powered By" Bar */}
        <div className="relative z-10 pt-20 border-t border-white/10 w-full max-w-3xl space-y-6">
          <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase">Powered by</p>
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm font-heading">
              <span className="text-lg">Oll·1</span> Llama 3
            </div>
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm font-heading">
              <span className="w-5 h-5 rounded border border-white/30 flex items-center justify-center text-[10px]">⚙</span> OpenAI GPT-4
            </div>
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm font-heading">
              <span className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-amber-500 font-mono">AI</span> Anthropic Claude
            </div>
            <div className="flex items-center gap-2 text-zinc-300 font-bold text-sm font-heading">
              <span className="w-5 h-5 rounded border border-white/30 flex items-center justify-center text-[10px]">🤖</span> Mistral AI
            </div>
          </div>
        </div>

      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-5xl mx-auto px-6 space-y-12" id="how-it-works">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-heading">Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            How ScholarSense Works
          </h2>
          <p className="text-sm text-zinc-400 max-w-lg mx-auto">
            3 simple steps to transform complex academic papers into actionable synthesis briefs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="noteo-card p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 text-white font-mono font-bold flex items-center justify-center">
              01
            </div>
            <h3 className="text-lg font-bold text-white font-heading">1. Upload Manuscript</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Drop any PDF research paper or paste an arXiv ID. Our engine parses sections, math equations, and tables cleanly.
            </p>
          </div>

          <div className="noteo-card p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-500 font-mono font-bold flex items-center justify-center">
              02
            </div>
            <h3 className="text-lg font-bold text-white font-heading">2. Multi-Agent Audit</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              5 parallel AI agents audit logic claims, cross-check references against academic databases, and score accuracy.
            </p>
          </div>

          <div className="noteo-card p-8 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 text-white font-mono font-bold flex items-center justify-center">
              03
            </div>
            <h3 className="text-lg font-bold text-white font-heading">3. Read Synthesis Brief</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Get an executive summary, verified methodology, key findings, and exportable Markdown or PDF briefs instantly.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="noteo-card p-12 space-y-6 relative overflow-hidden">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Ready to summarize your research?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              Start parsing research papers with multi-agent precision today. No setup required.
            </p>
          </div>
          <button
            onClick={() => navigate('/upload')}
            className="px-8 py-3.5 noteo-primary-btn text-sm font-bold cursor-pointer hover:bg-zinc-200 active:scale-98 transition-all inline-block"
          >
            Start Analyzing Now
          </button>
        </div>
      </section>

    </div>
  );
};
