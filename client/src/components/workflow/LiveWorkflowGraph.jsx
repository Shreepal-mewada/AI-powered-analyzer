import React, { useState } from 'react';

export const LiveWorkflowGraph = ({ activeNode = 'Boss Agent', status = 'ANALYZING', activeStepIndex = 3 }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  // 4 Primary Architecture Stages
  const stages = [
    {
      id: 'ingestion',
      stageNum: '01',
      title: 'Document Ingestion',
      subtitle: 'PDF Parsing & Semantic Chunking',
      stepRange: [1, 3],
      nodes: [
        { label: 'PDF Parser', desc: 'Byte stream & math formula parsing', step: 2 },
        { label: 'Chunking Engine', desc: 'Semantic section segmentation', step: 3 }
      ],
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      id: 'routing',
      stageNum: '02',
      title: 'Context Orchestration',
      subtitle: 'LangGraph Router & Boss Agent',
      stepRange: [4, 5],
      nodes: [
        { label: 'Context Router', desc: 'Context window filtering & token optimization', step: 4 },
        { label: 'Boss Agent', desc: 'State-graph node dispatcher', step: 5 }
      ],
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    },
    {
      id: 'parallel',
      stageNum: '03',
      title: 'Parallel Agent Execution',
      subtitle: 'Fan-Out LLM Sub-Agents',
      stepRange: [6, 6],
      nodes: [
        { label: 'Analyzer Agent', desc: 'Technical extraction', step: 6 },
        { label: 'Summarizer Agent', desc: 'Executive synthesis', step: 6 },
        { label: 'Citation Agent', desc: 'Reference & baseline audit', step: 6 },
        { label: 'Insight Agent', desc: 'Tradeoffs & takeaways', step: 6 }
      ],
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      id: 'synthesis',
      stageNum: '04',
      title: 'Quality Audit & Brief',
      subtitle: 'Peer Reviewer & Composer',
      stepRange: [7, 8],
      nodes: [
        { label: 'Reviewer Agent', desc: 'Quality score validation', step: 7 },
        { label: 'Brief Composer', desc: 'Final synthesis brief', step: 8 }
      ],
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    }
  ];

  const getStageStatus = (stage) => {
    const [start, end] = stage.stepRange;
    if (activeStepIndex > end) return 'COMPLETED';
    if (activeStepIndex >= start && activeStepIndex <= end) return 'ACTIVE';
    return 'QUEUED';
  };

  return (
    <div className="noteo-card p-6 sm:p-8 space-y-8 bg-[#0E0E12] border border-white/10 rounded-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <h3 className="text-base sm:text-lg font-bold text-white font-heading tracking-tight">
              Multi-Agent Graph Execution Architecture
            </h3>
          </div>
          <p className="text-xs text-zinc-400 font-medium">
            State-based LangGraph DAG pipeline execution & node transitions
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/10 rounded-full text-xs font-mono">
            <span className="text-zinc-500">Active Node:</span>
            <span className="text-amber-400 font-bold">{activeNode}</span>
          </div>

          <span className={`px-3 py-1 text-xs font-bold font-mono rounded-full border transition-all ${
            status === 'COMPLETED' || activeStepIndex >= 8
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
          }`}>
            {status === 'COMPLETED' || activeStepIndex >= 8 ? '✓ PIPELINE READY' : `⚡ STEP ${Math.min(8, Math.floor(activeStepIndex))}/8`}
          </span>
        </div>
      </div>

      {/* 4 Architectural Stages Horizontal Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {stages.map((stg, idx) => {
          const stStatus = getStageStatus(stg);
          const isSelected = selectedStage === stg.id;

          return (
            <div
              key={stg.id}
              onClick={() => setSelectedStage(isSelected ? null : stg.id)}
              className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 ${
                stStatus === 'ACTIVE'
                  ? 'bg-zinc-900/90 border-amber-500/60 shadow-[0_0_25px_rgba(255,149,0,0.15)] ring-1 ring-amber-500/30'
                  : stStatus === 'COMPLETED'
                  ? 'bg-zinc-900/50 border-emerald-500/30 hover:border-emerald-500/50'
                  : 'bg-zinc-950/40 border-white/5 opacity-60 hover:opacity-100 hover:border-white/10'
              }`}
            >
              {/* Top Header of Stage Card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${
                    stStatus === 'ACTIVE'
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                      : stStatus === 'COMPLETED'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-zinc-900 border-white/10 text-zinc-500'
                  }`}>
                    {stg.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold font-mono text-zinc-500 uppercase tracking-widest block">
                      STAGE {stg.stageNum}
                    </span>
                    <h4 className="text-xs font-bold text-white font-heading leading-snug">
                      {stg.title}
                    </h4>
                  </div>
                </div>

                <span className={`w-2 h-2 rounded-full ${
                  stStatus === 'ACTIVE'
                    ? 'bg-amber-500 animate-ping'
                    : stStatus === 'COMPLETED'
                    ? 'bg-emerald-500'
                    : 'bg-zinc-700'
                }`}></span>
              </div>

              {/* Subtitle */}
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                {stg.subtitle}
              </p>

              {/* Internal Micro Nodes list */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                {stg.nodes.map((nd, nIdx) => {
                  const nodeDone = activeStepIndex > nd.step;
                  const nodeActive = Math.floor(activeStepIndex) === nd.step;

                  return (
                    <div
                      key={nIdx}
                      className={`px-2.5 py-1.5 rounded-lg flex items-center justify-between text-[11px] font-medium transition-all ${
                        nodeActive
                          ? 'bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30'
                          : nodeDone
                          ? 'text-zinc-300'
                          : 'text-zinc-600'
                      }`}
                    >
                      <span className="truncate max-w-[140px]">{nd.label}</span>
                      <span className="font-mono text-[10px] shrink-0">
                        {nodeActive ? '⚡ ACTIVE' : nodeDone ? '✓ DONE' : 'QUEUED'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom status line */}
              <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-zinc-500 border-t border-white/5">
                <span>Steps {stg.stepRange[0]}–{stg.stepRange[1]}</span>
                <span className={stStatus === 'ACTIVE' ? 'text-amber-400 font-bold' : stStatus === 'COMPLETED' ? 'text-emerald-400' : ''}>
                  {stStatus}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Direct Flow Connector Arrow Bar */}
      <div className="hidden lg:flex items-center justify-between px-8 py-2 bg-zinc-950/60 rounded-xl border border-white/5 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>01. Ingestion</span>
        </div>
        <span className="text-zinc-600 font-bold">➔</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>02. Context Router</span>
        </div>
        <span className="text-zinc-600 font-bold">➔</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>03. Fan-Out Agents</span>
        </div>
        <span className="text-zinc-600 font-bold">➔</span>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>04. Synthesis Brief</span>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs text-zinc-400 font-medium">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          Framework: <strong className="text-zinc-200">Mistral AI + LangGraph Orchestrator</strong>
        </span>
        <span className="text-zinc-500 font-mono text-[11px]">
          Parallel Execution • Quality Audit Feedback Loop
        </span>
      </div>

    </div>
  );
};
