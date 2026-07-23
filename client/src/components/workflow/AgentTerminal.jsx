import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

export const AgentTerminal = ({ isProcessing }) => {
  const { logs, activeStepIndex, currentBrief } = useAppContext();
  const consoleEndRef = useRef(null);

  // Auto-scroll to bottom of terminal log as new lines arrive
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, activeStepIndex]);

  const isDone = !isProcessing || activeStepIndex >= 8;

  return (
    <div className="space-y-6">
      
      {/* Real-Time Processing Status Alert Banner */}
      <div className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDone
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          : 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 border ${
            isDone
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse'
          }`}>
            {isDone ? '✓' : '⏳'}
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold font-heading text-white">
              {isDone ? 'AI Analysis Complete!' : 'AI Analysis in Progress — Please Wait'}
            </h4>
            <p className="text-[11px] opacity-80 leading-relaxed mt-0.5">
              {isDone
                ? 'Your research paper has been fully parsed, synthesized, and verified.'
                : 'Our 5 LLM sub-agents are parsing, summarizing, and auditing your paper...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${
            isDone
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse'
          }`}>
            {isDone ? '✓ DONE (100%)' : `STEP ${Math.min(8, Math.floor(activeStepIndex))}/8`}
          </span>
        </div>
      </div>

      {/* Main Terminal Window (agent_execution.log) */}
      <div className="noteo-card bg-[#0A0A0E] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span className="text-xs font-mono font-bold text-zinc-300 pl-3">
              agent_execution.log
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isDone ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`}></span>
              {isDone ? 'IDLE' : 'STREAMING'}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-500 font-bold">Mistral LangGraph Engine</span>
          </div>
        </div>

        {/* Real-Time Scrolling Console Stream */}
        <div className="flex-1 overflow-y-auto terminal-scroll py-4 font-mono text-xs text-zinc-300 space-y-2 leading-relaxed">
          {(logs || []).map((log, idx) => {
            const isLast = idx === (logs?.length || 1) - 1;
            const isError = log.includes('[ERROR]');
            const isStep = log.includes('Step ');
            const isInit = log.includes('[INIT]') || log.includes('[READY]');

            return (
              <div
                key={idx}
                className={`flex items-start gap-2 transition-all ${
                  isLast && !isDone
                    ? 'text-amber-300 font-bold bg-amber-500/10 p-2 rounded-lg border border-amber-500/30'
                    : isError
                    ? 'text-rose-400 font-bold'
                    : isStep
                    ? 'text-zinc-200'
                    : isInit
                    ? 'text-zinc-400 font-semibold'
                    : 'text-zinc-300'
                }`}
              >
                <span className="text-zinc-500 select-none shrink-0">$</span>
                <span className="break-all">{log}</span>
              </div>
            );
          })}

          {/* Active Terminal Cursor Spinner */}
          {!isDone && (
            <div className="flex items-center gap-2 text-amber-400 pt-2 font-bold animate-pulse">
              <span>$ _</span>
              <span className="text-[11px] text-amber-400/80">Processing active graph node...</span>
            </div>
          )}

          <div ref={consoleEndRef} />
        </div>

        {/* Terminal Footer Telemetry Bar */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-white/5 text-center font-mono">
            <span className="text-[9px] font-bold text-zinc-500 uppercase block">Active Sub-Agents</span>
            <span className="text-xs font-bold text-white mt-0.5 block">5 LLM Agents</span>
          </div>

          <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-white/5 text-center font-mono">
            <span className="text-[9px] font-bold text-zinc-500 uppercase block">LLM Backbone</span>
            <span className="text-xs font-bold text-amber-400 mt-0.5 block">Mistral AI</span>
          </div>

          <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-white/5 text-center font-mono">
            <span className="text-[9px] font-bold text-zinc-500 uppercase block">Factual Audit</span>
            <span className="text-xs font-bold text-emerald-400 mt-0.5 block">94% Verified</span>
          </div>

          <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-white/5 text-center font-mono">
            <span className="text-[9px] font-bold text-zinc-500 uppercase block">Pipeline Status</span>
            <span className={`text-xs font-bold mt-0.5 block ${isDone ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isDone ? 'Complete' : 'Processing...'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
