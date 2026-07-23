import React from 'react';

export const LiveWorkflowGraph = ({ activeNode = 'Boss Agent', status = 'ANALYZING', activeStepIndex = 3 }) => {

  const steps = [
    { id: 1, title: 'Upload PDF', desc: 'File Ingestion', range: [1, 2] },
    { id: 2, title: 'Extract & Parse', desc: 'Text Processing', range: [3, 4] },
    { id: 3, title: 'AI Agent Analysis', desc: 'Multi-Agent Audit', range: [5, 7] },
    { id: 4, title: 'Synthesis Brief', desc: 'Final Report', range: [8, 8] }
  ];

  const getStepState = (stg) => {
    const [start, end] = stg.range;
    if (activeStepIndex > end) return 'DONE';
    if (activeStepIndex >= start && activeStepIndex <= end) return 'ACTIVE';
    return 'QUEUED';
  };

  return (
    <div className="noteo-card p-6 sm:p-8 bg-[#0D0D11] border border-white/10 rounded-2xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-base font-bold text-white font-heading">
            Live AI Workflow
          </h3>
          <p className="text-xs text-zinc-400">
            Real-time status of document analysis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${
            status === 'COMPLETED' || activeStepIndex >= 8
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
          }`}>
            {status === 'COMPLETED' || activeStepIndex >= 8 ? '✓ COMPLETE' : '⚡ PROCESSING'}
          </span>
        </div>
      </div>

      {/* Clean Stepper Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2">
        {steps.map((stg) => {
          const state = getStepState(stg);

          return (
            <div
              key={stg.id}
              className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
                state === 'ACTIVE'
                  ? 'bg-zinc-900 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : state === 'DONE'
                  ? 'bg-zinc-900/60 border-emerald-500/40 text-emerald-400'
                  : 'bg-zinc-950/50 border-white/5 text-zinc-600'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono border ${
                state === 'ACTIVE'
                  ? 'bg-amber-500 text-black border-amber-400'
                  : state === 'DONE'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-zinc-900 text-zinc-500 border-white/10'
              }`}>
                {state === 'DONE' ? '✓' : `0${stg.id}`}
              </div>

              <div>
                <h4 className="text-xs font-bold text-white font-heading">
                  {stg.title}
                </h4>
                <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                  {stg.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
