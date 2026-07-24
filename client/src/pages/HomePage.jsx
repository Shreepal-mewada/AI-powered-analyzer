import React from 'react';
import { useNavigate } from 'react-router-dom';
import SoftAurora from '../components/ui/SoftAurora';
import CurvedLoop from '../components/ui/CurvedLoop';
import CircularText from '../components/ui/CircularText';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative space-y-24 pt-16 pb-24 animate-noteo-fade overflow-hidden">
      
      {/* Soft Aurora Background Component */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0 h-[100vh]">
        <SoftAurora
          speed={0.6}
          scale={1.5}
          brightness={0.8}
          color1="#FF9500"
          color2="#8B5CF6"
          noiseFrequency={2.5}
          noiseAmplitude={1.0}
          bandHeight={0.5}
          bandSpread={1.0}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={1.0}
          enableMouseInteraction={true}
          mouseInfluence={0.25}
        />
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto space-y-8 z-10">

        {/* Glow Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="relative z-10 space-y-8 flex flex-col items-center">

          {/* Circular Text Main Title Component */}
          <div className="flex justify-center my-4 py-2">
            <CircularText
              text="AI*POWERED*RESEARCH*PAPER*ANALYZER*"
              spinDuration={20}
              onHover="speedUp"
              className="text-amber-400"
            />
          </div>

          <p className="text-base sm:text-lg text-zinc-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Upload any PDF manuscript or import an arXiv paper. Vilambo deploys specialized AI agents to extract core methodology, audit claims, and generate verified executive briefs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/upload')}
              className="px-8 py-3.5 noteo-primary-btn text-sm font-bold cursor-pointer group flex items-center gap-2"
            >
              <span>Analyze Paper Now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Curved Loop Interactive Marquee for AI Models */}
        <div className="relative z-10 pt-10 border-t border-white/10 w-full max-w-5xl space-y-4">
          <p className="text-xs text-amber-500 font-bold tracking-widest uppercase font-heading">
            Powered by Leading LLM Backbones
          </p>
          <div className="opacity-90 hover:opacity-100 transition-opacity">
            <CurvedLoop
              marqueeText="Llama 3 ✦ OpenAI GPT-4 ✦ Anthropic Claude ✦ Mistral AI ✦"
              speed={1.5}
              curveAmount={120}
              direction="left"
              interactive={true}
              className="text-amber-400/90 font-extrabold"
            />
          </div>
        </div>

      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-5xl mx-auto px-6 space-y-12 relative z-10" id="how-it-works">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-heading">Workflow</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            How Vilambo Works
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
            <h3 className="text-lg font-bold text-white font-heading">1. Ingest Manuscript</h3>
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
      <section className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="noteo-card p-12 space-y-6 relative overflow-hidden">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Accelerate your literature review
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
              Start parsing research papers with multi-agent precision today. No setup required.
            </p>
          </div>
          <button
            onClick={() => navigate('/upload')}
            className="px-8 py-3.5 noteo-primary-btn text-sm font-bold cursor-pointer group inline-flex items-center gap-2"
          >
            <span>Start Analyzing Now</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </section>

    </div>
  );
};
