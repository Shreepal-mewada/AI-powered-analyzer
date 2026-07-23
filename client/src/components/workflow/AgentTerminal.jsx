import React, { useEffect, useState } from 'react';

export const AgentTerminal = ({ isProcessing }) => {
  const [logs, setLogs] = useState([
    "[14:20:11] [ParserAgent] PDF stream ingested: 18 pages (2.4 MB)",
    "[14:20:12] [ParserAgent] Tokenizing text into 41 semantic chunks",
    "[14:20:15] [LogicAuditor] Validating pre-attention sub-layer claim...",
    "[14:20:17] [CitationVerifier] Cross-referencing 3 main citations",
    "[14:20:18] [Synthesizer] Compiling Executive Brief & Methodology..."
  ]);

  useEffect(() => {
    if (!isProcessing) return;

    const extraLogs = [
      "[14:20:20] [LogicAuditor] Benchmark accuracy score calculated: 9.2/10",
      "[14:20:22] [Synthesizer] Generating actionability & risk matrix...",
      "[14:20:23] [CitationVerifier] Verified SQuAD 2.0 dataset comparison",
      "[14:20:25] [Composer] Structuring final synthesis report markdown..."
    ];

    let idx = 0;
    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
      const newMsg = `[${time}] ${extraLogs[idx % extraLogs.length]}`;
      setLogs((prev) => [...prev.slice(-12), newMsg]);
      idx++;
    }, 2000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  return (
    <div className="flex flex-col gap-4">
      
      {/* Console Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-[360px]">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono font-bold text-slate-400 pl-2">agent_execution.log</span>
          </div>
          <span className="material-symbols-outlined text-slate-500 text-[18px]">terminal</span>
        </div>

        {/* Console Box */}
        <div className="p-2 font-mono text-[11px] text-emerald-400 flex-1 overflow-y-auto terminal-scroll my-2 leading-relaxed">
          {logs.map((log, i) => (
            <div key={i} className={`mb-1 transition-opacity ${i === logs.length - 1 ? 'text-white font-bold animate-pulse' : 'opacity-85'}`}>
              <span className="text-slate-500 select-none">&gt; </span>{log}
            </div>
          ))}
        </div>

        {/* Mini Stats Bar */}
        <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-center font-mono">
          <div className="p-2 bg-slate-800/60 rounded-lg">
            <p className="text-[9px] text-slate-400 uppercase font-bold">Accuracy Index</p>
            <p className="text-xs font-bold text-emerald-400">93.4% Verified</p>
          </div>
          <div className="p-2 bg-slate-800/60 rounded-lg">
            <p className="text-[9px] text-slate-400 uppercase font-bold">Step Latency</p>
            <p className="text-xs font-bold text-blue-400">4.2s Avg</p>
          </div>
        </div>

      </div>

      {/* Audit Banner */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3.5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
          <span className="material-symbols-outlined text-[18px]">fact_check</span>
        </div>
        <div>
          <h4 className="text-xs font-bold text-emerald-950 font-heading">Logic Consistency Verified</h4>
          <p className="text-[11px] text-emerald-800 leading-snug">All 12 mathematical claims cross-checked against appendix equations.</p>
        </div>
      </div>

    </div>
  );
};

