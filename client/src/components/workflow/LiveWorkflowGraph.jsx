import React from 'react';

export const LiveWorkflowGraph = ({ activeNode = 'Boss Agent', status = 'ANALYZING', activeStepIndex = 3 }) => {

  const nodes = [
    {
      id: 'input',
      num: '01',
      title: 'USER INPUT',
      subtitle: 'Upload PDF',
      stepRange: [1, 2],
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      )
    },
    {
      id: 'parser',
      num: '02',
      title: 'PARSER & CHUNKS',
      subtitle: 'Text Stream & Route',
      stepRange: [2, 4],
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      id: 'agents',
      num: '03',
      title: 'MULTI-AGENT AI',
      subtitle: 'Parallel LLMs & Audit',
      stepRange: [5, 7],
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },
    {
      id: 'response',
      num: '04',
      title: 'SYNTHESIS REPORT',
      subtitle: 'Final Brief Ready',
      stepRange: [8, 8],
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    }
  ];

  const getNodeState = (node) => {
    const [start, end] = node.stepRange;
    if (activeStepIndex > end) return 'DONE';
    if (activeStepIndex >= start && activeStepIndex <= end) return 'ACTIVE';
    return 'QUEUED';
  };

  return (
    <div className="noteo-card p-6 sm:p-7 bg-[#0A0A0E] border border-white/10 rounded-2xl space-y-6 relative overflow-hidden">
      
      {/* Top Status Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
          <h3 className="text-sm sm:text-base font-bold text-white font-heading tracking-tight">
            AI Agent Execution Flow
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Node: <span className="text-amber-400 font-bold">{activeNode}</span>
          </span>
          <span className={`px-3 py-1 text-[11px] font-bold font-mono rounded-full border ${
            status === 'COMPLETED' || activeStepIndex >= 8
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
          }`}>
            {status === 'COMPLETED' || activeStepIndex >= 8 ? '✓ COMPLETE' : `STEP ${Math.min(8, Math.floor(activeStepIndex))}/8`}
          </span>
        </div>
      </div>

      {/* Main Container Graph Section */}
      <div className="relative py-6 px-3 bg-zinc-950/70 border border-white/5 rounded-2xl">
        
        {/* SVG Connecting Flow Lines (Desktop & Tablet) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 800 180" fill="none" preserveAspectRatio="none">
            <defs>
              <marker id="arrow-neutral" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#3F3F46" />
              </marker>
              <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#F59E0B" />
              </marker>
              <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
              </marker>
            </defs>

            {/* Line 1: Node 1 -> Node 2 */}
            <line
              x1="180" y1="60" x2="230" y2="60"
              stroke={activeStepIndex >= 2 ? '#F59E0B' : '#27272A'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              markerEnd={activeStepIndex >= 2 ? 'url(#arrow-amber)' : 'url(#arrow-neutral)'}
              className={activeStepIndex >= 2 ? 'animate-dash-flow' : ''}
            />

            {/* Line 2: Node 2 -> Node 3 */}
            <line
              x1="380" y1="60" x2="430" y2="60"
              stroke={activeStepIndex >= 5 ? '#F59E0B' : '#27272A'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              markerEnd={activeStepIndex >= 5 ? 'url(#arrow-amber)' : 'url(#arrow-neutral)'}
              className={activeStepIndex >= 5 ? 'animate-dash-flow' : ''}
            />

            {/* Line 3: Node 3 -> Node 4 */}
            <line
              x1="580" y1="60" x2="630" y2="60"
              stroke={activeStepIndex >= 8 ? '#10B981' : '#27272A'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              markerEnd={activeStepIndex >= 8 ? 'url(#arrow-emerald)' : 'url(#arrow-neutral)'}
              className={activeStepIndex >= 8 ? 'animate-dash-flow' : ''}
            />

            {/* Bottom Loop Arc: Node 4 (Report) -> Node 2 (Parser) */}
            <path
              d="M 700 100 C 700 160, 300 160, 300 100"
              stroke={activeStepIndex >= 8 ? '#10B981' : '#27272A'}
              strokeWidth="2"
              strokeDasharray="5 5"
              markerEnd={activeStepIndex >= 8 ? 'url(#arrow-emerald)' : 'url(#arrow-neutral)'}
              className={activeStepIndex >= 8 ? 'animate-dash-flow' : ''}
            />
          </svg>
        </div>

        {/* 4 Compact Node Containers */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-2">
          {nodes.map((node) => {
            const st = getNodeState(node);

            return (
              <div
                key={node.id}
                className={`p-4 rounded-xl border flex flex-col justify-between h-28 transition-all duration-300 ${
                  st === 'ACTIVE'
                    ? 'bg-zinc-900 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-1 ring-amber-500/40'
                    : st === 'DONE'
                    ? 'bg-zinc-900/60 border-emerald-500/40'
                    : 'bg-zinc-950/60 border-white/5 opacity-50'
                }`}
              >
                {/* Node Top Row */}
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-lg border ${
                    st === 'ACTIVE'
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : st === 'DONE'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-zinc-900 border-white/10 text-zinc-500'
                  }`}>
                    {node.icon}
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    st === 'ACTIVE'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : st === 'DONE'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-zinc-900 text-zinc-600'
                  }`}>
                    {st === 'ACTIVE' ? '⚡ RUNNING' : st === 'DONE' ? '✓ DONE' : 'QUEUED'}
                  </span>
                </div>

                {/* Node Title & Subtitle */}
                <div>
                  <h4 className="text-xs font-extrabold text-white font-heading tracking-wide">
                    {node.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 font-medium">
                    {node.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer Info Ticker */}
      <div className="flex items-center justify-between text-xs text-zinc-400 font-mono pt-1">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Pipeline Flow: <strong className="text-zinc-200">Input ➔ Parser ➔ Agents ➔ Brief</strong>
        </span>
        <span className="text-zinc-500 hidden sm:inline">Mistral AI LangGraph Engine</span>
      </div>

    </div>
  );
};
