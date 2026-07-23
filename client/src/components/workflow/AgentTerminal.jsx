import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

export const AgentTerminal = ({ isProcessing }) => {
  const { logs, activeStepIndex } = useAppContext();
  const consoleEndRef = useRef(null);

  // Auto-scroll to bottom of terminal log as new lines arrive
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, activeStepIndex]);

  const isDone = !isProcessing || activeStepIndex >= 8;

  return (
    <div className="space-y-6">
      
      {/* Minimal & Professional Terminal Window */}
      <div className="noteo-card bg-[#0B0B0F] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/70"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/70"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/70"></span>
            <span className="text-xs font-mono font-bold text-zinc-300 pl-2 tracking-tight">
              agent_execution.log
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 ${
              isDone
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isDone ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`}></span>
              <span>{isDone ? 'IDLE / COMPLETE' : 'LIVE STREAMING'}</span>
            </div>

            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-500 font-bold hidden sm:inline">Mistral AI</span>
          </div>
        </div>

        {/* Real-Time Scrolling Console Stream */}
        <div className="flex-1 overflow-y-auto terminal-scroll py-4 font-mono text-xs sm:text-[13px] text-zinc-300 space-y-2 leading-relaxed">
          {(logs || []).map((log, idx) => {
            const isLast = idx === (logs?.length || 1) - 1;
            const isError = log.includes('[ERROR]');
            const isStep = log.includes('Step ');
            const isInit = log.includes('[INIT]') || log.includes('[READY]');

            return (
              <div
                key={idx}
                className={`flex items-start gap-2.5 px-3 py-1.5 rounded-lg transition-all ${
                  isLast && !isDone
                    ? 'text-amber-300 font-bold bg-amber-500/10 border-l-2 border-amber-500'
                    : isError
                    ? 'text-rose-400 font-bold bg-rose-500/10 border-l-2 border-rose-500'
                    : isStep
                    ? 'text-white bg-zinc-900/60 border-l-2 border-amber-500/40'
                    : isInit
                    ? 'text-zinc-400 font-medium'
                    : 'text-zinc-300 hover:bg-white/[0.02]'
                }`}
              >
                <span className="text-amber-500/80 font-bold select-none shrink-0">$</span>
                <span className="break-all tracking-tight">{log}</span>
              </div>
            );
          })}

          {/* Minimal Animated Blinking Cursor */}
          {!isDone && (
            <div className="flex items-center gap-2 text-amber-400 px-3 py-1.5 font-bold animate-pulse">
              <span className="text-amber-500">$</span>
              <span className="w-2 h-4 bg-amber-400 inline-block animate-bounce"></span>
              <span className="text-xs text-amber-400/80 font-normal">Executing LLM sub-agent step...</span>
            </div>
          )}

          <div ref={consoleEndRef} />
        </div>

        {/* Minimal Terminal Telemetry Footer */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="p-2.5 bg-zinc-900/60 rounded-xl border border-white/5 text-center font-mono">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Active Sub-Agents</span>
            <span className="text-xs font-bold text-white mt-0.5 block">5 LLM Agents</span>
          </div>

          <div className="p-2.5 bg-zinc-900/60 rounded-xl border border-white/5 text-center font-mono">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">LLM Backbone</span>
            <span className="text-xs font-bold text-amber-400 mt-0.5 block">Mistral AI</span>
          </div>

          <div className="p-2.5 bg-zinc-900/60 rounded-xl border border-white/5 text-center font-mono">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Factual Audit</span>
            <span className="text-xs font-bold text-emerald-400 mt-0.5 block">94% Verified</span>
          </div>

          <div className="p-2.5 bg-zinc-900/60 rounded-xl border border-white/5 text-center font-mono">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider block">Pipeline Status</span>
            <span className={`text-xs font-bold mt-0.5 block ${isDone ? 'text-emerald-400' : 'text-amber-400'}`}>
              {isDone ? '✓ Complete' : '⚡ Streaming...'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
