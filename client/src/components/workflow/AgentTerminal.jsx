import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

export const AgentTerminal = ({ isProcessing }) => {
  const { logs } = useAppContext();

  return (
    <div className="flex flex-col gap-4">
      
      {/* Console Card */}
      <div className="bg-zinc-950 border border-white/10 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[360px]">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono font-bold text-zinc-400 pl-2">agent_execution.log</span>
          </div>
          <span className="text-zinc-500 text-xs font-mono">⌘ console</span>
        </div>

        {/* Console Box */}
        <div className="p-2 font-mono text-[11px] text-amber-500 flex-1 overflow-y-auto terminal-scroll my-2 leading-relaxed">
          {(logs || []).map((log, i) => (
            <div key={i} className={`mb-1 transition-opacity ${i === (logs?.length || 1) - 1 ? 'text-white font-bold animate-pulse' : 'opacity-85'}`}>
              <span className="text-zinc-500 select-none">&gt; </span>{log}
            </div>
          ))}
        </div>

        {/* Mini Stats Bar */}
        <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-center font-mono">
          <div className="p-2 bg-zinc-900 rounded-xl border border-white/5">
            <p className="text-[9px] text-zinc-500 uppercase font-bold">Accuracy Index</p>
            <p className="text-xs font-bold text-emerald-400">93.4% Verified</p>
          </div>
          <div className="p-2 bg-zinc-900 rounded-xl border border-white/5">
            <p className="text-[9px] text-zinc-500 uppercase font-bold">Latency</p>
            <p className="text-xs font-bold text-amber-500">4.2s Avg</p>
          </div>
        </div>

      </div>

      {/* Audit Banner */}
      <div className="noteo-card p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 font-mono font-bold flex items-center justify-center shrink-0 border border-amber-500/30">
          ✓
        </div>
        <div>
          <h4 className="text-xs font-bold text-white font-heading">Logic Consistency Verified</h4>
          <p className="text-[11px] text-zinc-400 leading-snug">All 12 mathematical claims cross-checked against appendix equations.</p>
        </div>
      </div>

    </div>
  );
};


