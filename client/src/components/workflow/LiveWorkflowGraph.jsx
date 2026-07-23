import React from 'react';

export const LiveWorkflowGraph = ({ activeNode = 'Boss Agent', status = 'ANALYZING', activeStepIndex = 3 }) => {
  
  // 12 Graph Nodes matching user's Mermaid DAG definition
  const nodesConfig = [
    { id: 'upload', label: 'Upload PDF', step: 1 },
    { id: 'parser', label: 'PDF Parser', step: 2 },
    { id: 'chunker', label: 'Chunking Engine', step: 3 },
    { id: 'context', label: 'Context Manager', step: 4 },
    { id: 'boss', label: 'Boss Agent', step: 5 },
    { id: 'analyzer', label: 'Analyzer', step: 6 },
    { id: 'summary', label: 'Summary', step: 6 },
    { id: 'citation', label: 'Citation', step: 6 },
    { id: 'insights', label: 'Insights', step: 6 },
    { id: 'reviewer', label: 'Reviewer Agent', step: 7 },
    { id: 'retry', label: 'Retry Manager', step: 7.5 },
    { id: 'composer', label: 'Brief Composer', step: 8 }
  ];

  const getNodeStatus = (step) => {
    if (activeStepIndex > step) return 'COMPLETED';
    if (Math.floor(activeStepIndex) === Math.floor(step)) return 'ACTIVE';
    return 'PENDING';
  };

  return (
    <div className="noteo-card p-6 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-white font-heading">
            LangGraph Multi-Agent Execution DAG
          </h3>
          <p className="text-xs text-zinc-400">
            Real-time visual graph representation of pipeline state & node transitions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-bold font-mono rounded-full border ${
            status === 'COMPLETED' 
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse'
          }`}>
            {status === 'COMPLETED' ? '✓ COMPLETED' : '⚡ RUNNING DAG'}
          </span>
        </div>
      </div>

      {/* Visual Graph Layout (Matching User Mermaid Diagram) */}
      <div className="relative flex-1 my-6 flex flex-col justify-between items-center py-4">
        
        {/* ROW 1: Sequential Ingestion Pipeline (Upload -> Parser -> Chunker -> Context -> Boss) */}
        <div className="w-full flex flex-wrap items-center justify-center gap-3 sm:gap-6 z-10">
          {[
            { id: 'upload', label: 'Upload PDF', step: 1, symbol: '📄' },
            { id: 'parser', label: 'PDF Parser', step: 2, symbol: '⚙' },
            { id: 'chunker', label: 'Chunking Engine', step: 3, symbol: '🧩' },
            { id: 'context', label: 'Context Manager', step: 4, symbol: '🗂' },
            { id: 'boss', label: 'Boss Agent', step: 5, symbol: '👑' }
          ].map((n, idx, arr) => {
            const st = getNodeStatus(n.step);
            return (
              <React.Fragment key={n.id}>
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-all border ${
                    st === 'ACTIVE'
                      ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(255,149,0,0.5)] animate-bounce'
                      : st === 'COMPLETED'
                      ? 'bg-zinc-800 text-emerald-400 border-emerald-500/50'
                      : 'bg-zinc-900 text-zinc-600 border-white/10'
                  }`}>
                    {n.symbol}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-300">{n.label}</span>
                </div>

                {idx < arr.length - 1 && (
                  <span className={`text-xs font-mono font-bold hidden sm:inline ${
                    getNodeStatus(arr[idx+1].step) !== 'PENDING' ? 'text-amber-500' : 'text-zinc-700'
                  }`}>
                    ➔
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Connecting Flow Arrow */}
        <div className="text-amber-500 font-mono text-xs font-bold py-2">
          ⬇ Fan-Out Parallel Agents
        </div>

        {/* ROW 2: Parallel Agents (Analyzer / Summary / Citation / Insights) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl z-10">
          {[
            { id: 'analyzer', label: 'Analyzer', step: 6, symbol: '🔍' },
            { id: 'summary', label: 'Summary', step: 6, symbol: '📝' },
            { id: 'citation', label: 'Citation', step: 6, symbol: '📚' },
            { id: 'insights', label: 'Insights', step: 6, symbol: '💡' }
          ].map((n) => {
            const st = getNodeStatus(n.step);
            return (
              <div key={n.id} className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                st === 'ACTIVE'
                  ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(255,149,0,0.3)] animate-pulse'
                  : st === 'COMPLETED'
                  ? 'bg-zinc-900 border-emerald-500/40 text-emerald-400'
                  : 'bg-zinc-950 border-white/10 text-zinc-600'
              }`}>
                <span className="text-base">{n.symbol}</span>
                <span className="text-xs font-bold text-white">{n.label}</span>
                <span className="text-[9px] font-mono uppercase text-zinc-400">
                  {st === 'ACTIVE' ? 'Processing' : st === 'COMPLETED' ? 'Done' : 'Queued'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Connecting Flow Arrow */}
        <div className="text-amber-500 font-mono text-xs font-bold py-2">
          ⬇ Fan-In Quality Review
        </div>

        {/* ROW 3: Reviewer & Composer */}
        <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-12 z-10">
          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            getNodeStatus(7) === 'ACTIVE'
              ? 'bg-amber-500/20 border-amber-500 text-white animate-pulse'
              : getNodeStatus(7) === 'COMPLETED'
              ? 'bg-zinc-900 border-emerald-500/50 text-white'
              : 'bg-zinc-950 border-white/10 text-zinc-600'
          }`}>
            <span className="text-xl">⚖</span>
            <div>
              <p className="text-xs font-bold text-white font-heading">Reviewer Agent</p>
              <p className="text-[10px] text-emerald-400 font-mono">Approved Quality Score: 9.2/10</p>
            </div>
          </div>

          <span className="text-amber-500 font-mono text-sm font-bold">➔</span>

          <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
            getNodeStatus(8) === 'ACTIVE'
              ? 'bg-amber-500 text-black font-bold border-amber-400 animate-pulse'
              : getNodeStatus(8) === 'COMPLETED'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
              : 'bg-zinc-950 border-white/10 text-zinc-600'
          }`}>
            <span className="text-xl">✨</span>
            <div>
              <p className="text-xs font-bold font-heading">Research Brief Composer</p>
              <p className="text-[10px] opacity-80 font-mono">Output Synthesis Brief</p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          Active Graph Node: <strong className="text-white font-mono">{activeNode}</strong>
        </span>
        <span className="text-zinc-500 font-mono text-[11px]">Mistral LangGraph Parallel Architecture</span>
      </div>

    </div>
  );
};
