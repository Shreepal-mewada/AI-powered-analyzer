import React from 'react';

export const LiveWorkflowGraph = ({ activeNode = 'Boss Agent', status = 'ANALYZING', activeStepIndex = 3 }) => {

  const stages = [
    { id: 1, title: 'Upload PDF', subtitle: 'Document Ingestion', stepRange: [1, 2], icon: '📄' },
    { id: 2, title: 'PDF Parser', subtitle: 'Chunks & Routing', stepRange: [3, 4], icon: '⚙️' },
    { id: 3, title: 'LangGraph AI', subtitle: 'Parallel Sub-Agents', stepRange: [5, 7], icon: '⚡' },
    { id: 4, title: 'Synthesis Brief', subtitle: 'Quality Verified', stepRange: [8, 8], icon: '✨' }
  ];

  const getStageState = (stg) => {
    const [start, end] = stg.stepRange;
    if (activeStepIndex > end) return 'COMPLETED';
    if (activeStepIndex >= start && activeStepIndex <= end) return 'ACTIVE';
    return 'QUEUED';
  };

  return (
    <div className="noteo-card p-6 sm:p-7 bg-[#0E0E12] border border-white/10 rounded-2xl space-y-6 relative overflow-hidden">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
          <h3 className="text-sm sm:text-base font-bold text-white font-heading tracking-tight">
            Live AI Execution Workflow
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-xs font-mono">
            <span className="text-zinc-500">Active Node:</span>{' '}
            <span className="text-amber-400 font-bold">{activeNode}</span>
          </div>

          <span className={`px-3 py-1 text-xs font-bold font-mono rounded-full border transition-all ${
            status === 'COMPLETED' || activeStepIndex >= 8
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
          }`}>
            {status === 'COMPLETED' || activeStepIndex >= 8 ? '✓ COMPLETE' : `STEP ${Math.min(8, Math.floor(activeStepIndex))}/8`}
          </span>
        </div>
      </div>

      {/* Modern Pipeline Flow with Pixel-Perfect Animated Connectors */}
      <div className="relative py-5 px-3 bg-zinc-950/60 border border-white/5 rounded-xl">
        
        {/* Bottom Feedback Loop Arc (RESPONSE -> PARSER) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 800 120" fill="none" preserveAspectRatio="none">
            <path
              d="M 720 65 C 720 110, 280 110, 280 65"
              stroke={activeStepIndex >= 8 ? '#10B981' : '#27272A'}
              strokeWidth="2" strokeDasharray="5 5"
              className={activeStepIndex >= 8 ? 'animate-dash-flow' : ''}
            />
          </svg>
        </div>

        {/* 4 Clean Capsule Nodes with Animated Streaming SVG Arrows */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-3 max-w-5xl mx-auto px-2">
          {stages.map((stg, idx) => {
            const stState = getStageState(stg);
            const isLast = idx === stages.length - 1;
            const nextActive = activeStepIndex >= stages[idx + 1]?.stepRange[0];

            return (
              <React.Fragment key={stg.id}>
                {/* Node Capsule Card */}
                <div
                  className={`flex-1 w-full p-4 rounded-xl border flex items-center gap-3.5 transition-all duration-300 ${
                    stState === 'ACTIVE'
                      ? 'bg-zinc-900 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/30'
                      : stState === 'COMPLETED'
                      ? 'bg-zinc-900/60 border-emerald-500/40'
                      : 'bg-zinc-950/60 border-white/5 opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 border ${
                    stState === 'ACTIVE'
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : stState === 'COMPLETED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-zinc-900 text-zinc-600 border-white/10'
                  }`}>
                    {stState === 'COMPLETED' && stg.id !== 4 ? '✓' : stg.icon}
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-zinc-500">0{stg.id}</span>
                      <h4 className="text-xs font-bold text-white font-heading truncate">
                        {stg.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-medium truncate mt-0.5">
                      {stg.subtitle}
                    </p>
                  </div>
                </div>

                {/* Animated Streaming SVG Arrow Connector between Cards */}
                {!isLast && (
                  <div className="hidden lg:flex items-center justify-center shrink-0 mx-1">
                    <svg className="w-10 h-5 overflow-visible" viewBox="0 0 36 20" fill="none">
                      <line
                        x1="0" y1="10" x2="26" y2="10"
                        stroke={nextActive ? '#F59E0B' : '#3F3F46'}
                        strokeWidth="2.5"
                        strokeDasharray="5 5"
                        className={nextActive ? 'animate-dash-flow' : ''}
                      />
                      <path
                        d="M 24 5 L 31 10 L 24 15"
                        fill="none"
                        stroke={nextActive ? '#F59E0B' : '#3F3F46'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>

    </div>
  );
};
