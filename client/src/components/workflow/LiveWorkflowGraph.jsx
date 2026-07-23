import React from 'react';

export const LiveWorkflowGraph = ({ activeNode = 'Synthesizer', status = 'COMPLETED' }) => {
  const nodes = [
    { id: 'Parser', label: 'PDF Parser', icon: 'picture_as_pdf', status: 'COMPLETED' },
    { id: 'LogicCheck', label: 'Logic Auditor', icon: 'psychology', status: 'COMPLETED' },
    { id: 'CitationVerifier', label: 'Citation Verifier', icon: 'fact_check', status: 'COMPLETED' },
    { id: 'Synthesizer', label: 'Synthesizer', icon: 'auto_awesome', status: 'ACTIVE' },
    { id: 'Composer', label: 'Brief Composer', icon: 'description', status: 'PENDING' }
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 relative overflow-hidden shadow-xs flex flex-col justify-between min-h-[380px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-heading">Multi-Agent Workflow Execution</h3>
          <p className="text-[11px] text-slate-500">Live DAG pipeline orchestration</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded border border-emerald-200/80">
            {status}
          </span>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-mono font-semibold rounded">
            Mistral-Large
          </span>
        </div>
      </div>

      {/* Workflow Canvas */}
      <div className="relative w-full flex-1 flex items-center justify-center my-6">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path className="node-line" d="M 80 140 Q 200 50 320 140" />
          <path className="node-line" d="M 80 140 Q 200 230 320 140" />
          <path className="node-line" d="M 320 140 L 480 140" />
          <path className="node-line" d="M 480 140 L 640 140" />
        </svg>

        <div className="relative w-full max-w-3xl h-[240px] mx-auto flex items-center justify-between px-2">
          
          {nodes.map((node, i) => {
            const isActive = activeNode === node.id || node.status === 'ACTIVE';
            const isDone = node.status === 'COMPLETED';

            return (
              <div key={node.id} className="flex flex-col items-center gap-2.5 z-10">
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100 animate-pulse'
                      : isDone
                      ? 'bg-white border-2 border-emerald-500 text-emerald-600 shadow-2xs'
                      : 'bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{node.icon}</span>
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-bold text-slate-800 font-heading block">{node.label}</span>
                  <span className={`text-[9px] uppercase tracking-wider font-semibold ${
                    isActive ? 'text-blue-600 font-bold' : isDone ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    {isActive ? 'Processing' : isDone ? 'Done' : 'Queued'}
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span> Active Node: <strong className="text-slate-800 font-mono">{activeNode}</strong>
        </span>
        <span>Parallel Chunk Parsing: Active</span>
      </div>

    </div>
  );
};

