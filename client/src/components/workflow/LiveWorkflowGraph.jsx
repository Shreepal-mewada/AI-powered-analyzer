import React from 'react';

export const LiveWorkflowGraph = ({ activeNode = 'Boss Agent', status = 'ANALYZING', activeStepIndex = 3 }) => {

  // Map step index (1-8) to active workflow card
  // Step 1-2: USER INPUT & FRONTEND
  // Step 3-4: FRONTEND -> AGENT ENGINE
  // Step 5-7: AGENT ENGINE (Parsing, Fan-Out, Reviewing)
  // Step 8: RESPONSE & Loopback
  const getCardActiveState = (cardKey) => {
    switch (cardKey) {
      case 'user_input':
        return activeStepIndex >= 1 ? (activeStepIndex <= 2 ? 'ACTIVE' : 'COMPLETED') : 'PENDING';
      case 'frontend':
        return activeStepIndex >= 2 ? (activeStepIndex <= 4 ? 'ACTIVE' : 'COMPLETED') : 'PENDING';
      case 'agent_engine':
        return activeStepIndex >= 4 ? (activeStepIndex <= 7 ? 'ACTIVE' : 'COMPLETED') : 'PENDING';
      case 'response':
        return activeStepIndex >= 8 ? 'COMPLETED' : 'PENDING';
      default:
        return 'PENDING';
    }
  };

  const stepsList = [
    { step: 1, label: '1. Ingest PDF', node: 'Upload PDF' },
    { step: 2, label: '2. Extract Stream', node: 'PDF Parser' },
    { step: 3, label: '3. Chunking', node: 'Chunking Engine' },
    { step: 4, label: '4. Context Route', node: 'Context Manager' },
    { step: 5, label: '5. Boss Orchestrator', node: 'Boss Agent' },
    { step: 6, label: '6. Parallel Agents', node: 'Sub-Agents Fan-Out' },
    { step: 7, label: '7. Quality Audit', node: 'Reviewer Agent' },
    { step: 8, label: '8. Synthesis Ready', node: 'Brief Composer' }
  ];

  return (
    <div className="noteo-card p-6 sm:p-8 space-y-8 relative overflow-hidden bg-[#0D0D11] border border-white/10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <h3 className="text-lg font-bold text-white font-heading tracking-tight">
              AI Multi-Agent Visual Workflow Architecture
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Real-time visual node execution & feedback loop state machine
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-3.5 py-1 text-xs font-bold font-mono rounded-full border transition-all ${
            status === 'COMPLETED' || activeStepIndex >= 8
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse'
          }`}>
            {status === 'COMPLETED' || activeStepIndex >= 8 ? '✓ WORKFLOW COMPLETED' : `⚡ EXECUTING NODE ${activeStepIndex}/8`}
          </span>
        </div>
      </div>

      {/* Main Flow Canvas matching attached screenshot */}
      <div className="relative py-8 px-2 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:18px_18px] rounded-3xl border border-white/5 bg-zinc-950/60">
        
        {/* SVG Animated Connector Paths */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 900 240" fill="none" preserveAspectRatio="none">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#71717A" />
              </marker>
              <marker id="arrow-active" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 8 5 L 0 9 z" fill="#F59E0B" />
              </marker>
            </defs>

            {/* Path 1: USER INPUT <--> FRONTEND */}
            <path
              d="M 195 90 L 265 90"
              stroke={activeStepIndex >= 1 ? '#F59E0B' : '#3F3F46'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              markerEnd={activeStepIndex >= 1 ? 'url(#arrow-active)' : 'url(#arrow)'}
              className={activeStepIndex >= 1 ? 'animate-dash-flow' : ''}
            />

            {/* Path 2: FRONTEND -> CREW AI AGENT */}
            <path
              d="M 425 90 L 495 90"
              stroke={activeStepIndex >= 3 ? '#F59E0B' : '#3F3F46'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              markerEnd={activeStepIndex >= 3 ? 'url(#arrow-active)' : 'url(#arrow)'}
              className={activeStepIndex >= 3 ? 'animate-dash-flow' : ''}
            />

            {/* Path 3: CREW AI AGENT -> RESPONSE */}
            <path
              d="M 655 90 L 725 90"
              stroke={activeStepIndex >= 7 ? '#F59E0B' : '#3F3F46'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              markerEnd={activeStepIndex >= 7 ? 'url(#arrow-active)' : 'url(#arrow)'}
              className={activeStepIndex >= 7 ? 'animate-dash-flow' : ''}
            />

            {/* Path 4: Bottom Feedback Loop Arc (RESPONSE -> FRONTEND) */}
            <path
              d="M 790 145 C 790 225, 345 225, 345 145"
              stroke={activeStepIndex >= 8 ? '#10B981' : '#3F3F46'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
              markerEnd={activeStepIndex >= 8 ? 'url(#arrow-active)' : 'url(#arrow)'}
              className={activeStepIndex >= 8 ? 'animate-dash-flow' : ''}
            />
          </svg>
        </div>

        {/* 4 Primary Flow Cards (Styled like the exact attached lavender screenshot) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
          
          {/* Node 1: USER INPUT */}
          <div className={`p-6 rounded-[24px] flex flex-col items-center justify-between text-center min-h-[170px] transition-all duration-300 shadow-xl ${
            getCardActiveState('user_input') === 'ACTIVE'
              ? 'bg-[#B4BEFE] ring-4 ring-amber-400 scale-105 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
              : 'bg-[#B4BEFE]/95 hover:bg-[#B4BEFE]'
          }`}>
            <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 18.5c1.5-2.5 3.5-3.5 5-3.5s3.5 1 5 3.5" />
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-black font-heading">
              USER INPUT
            </span>
          </div>

          {/* Node 2: FRONTEND */}
          <div className={`p-6 rounded-[24px] flex flex-col items-center justify-between text-center min-h-[170px] transition-all duration-300 shadow-xl ${
            getCardActiveState('frontend') === 'ACTIVE'
              ? 'bg-[#B4BEFE] ring-4 ring-amber-400 scale-105 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
              : 'bg-[#B4BEFE]/95 hover:bg-[#B4BEFE]'
          }`}>
            <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center mb-3">
              <div className="flex items-center gap-1.5 text-black">
                <span className="text-xl font-black font-heading leading-none">N</span>
                <span className="text-xs font-bold border border-black/40 px-1 py-0.5 rounded">▲</span>
              </div>
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-black font-heading">
              FRONTEND
            </span>
          </div>

          {/* Node 3: CREW AI AGENT / LANGGRAPH */}
          <div className={`p-6 rounded-[24px] flex flex-col items-center justify-between text-center min-h-[170px] transition-all duration-300 shadow-xl ${
            getCardActiveState('agent_engine') === 'ACTIVE'
              ? 'bg-[#B4BEFE] ring-4 ring-amber-400 scale-105 shadow-[0_0_30px_rgba(245,158,11,0.4)]'
              : 'bg-[#B4BEFE]/95 hover:bg-[#B4BEFE]'
          }`}>
            <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center mb-3">
              <span className="text-base font-extrabold italic tracking-tighter text-black font-serif">
                crewai
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-black font-heading">
              CREW AI AGENT
            </span>
          </div>

          {/* Node 4: RESPONSE */}
          <div className={`p-6 rounded-[24px] flex flex-col items-center justify-between text-center min-h-[170px] transition-all duration-300 shadow-xl ${
            getCardActiveState('response') === 'ACTIVE' || activeStepIndex >= 8
              ? 'bg-[#B4BEFE] ring-4 ring-emerald-400 scale-105 shadow-[0_0_30px_rgba(16,185,129,0.4)]'
              : 'bg-[#B4BEFE]/95 hover:bg-[#B4BEFE]'
          }`}>
            <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center mb-3">
              <svg className="w-7 h-7 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
              </svg>
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-black font-heading">
              RESPONSE
            </span>
          </div>

        </div>
      </div>

      {/* Live Step Execution Telemetry Bar */}
      <div className="pt-4 border-t border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-300 font-heading">
            Sub-Agent Execution Nodes Telemetry:
          </span>
          <span className="text-[11px] font-mono text-amber-400 font-semibold">
            Active: {activeNode}
          </span>
        </div>

        {/* 8 Step Micro-Nodes Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {stepsList.map((st) => {
            const isDone = activeStepIndex > st.step;
            const isCurrent = Math.floor(activeStepIndex) === st.step;

            return (
              <div
                key={st.step}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse'
                    : isDone
                    ? 'bg-zinc-900 border-emerald-500/40 text-emerald-400'
                    : 'bg-zinc-950 border-white/5 text-zinc-600'
                }`}
              >
                <div className="text-[10px] font-mono font-bold">{st.step}/8</div>
                <div className="text-[11px] font-bold text-white leading-snug mt-0.5 truncate">
                  {st.node}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
