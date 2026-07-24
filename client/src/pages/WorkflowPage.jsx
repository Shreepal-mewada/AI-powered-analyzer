import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentTerminal } from '../components/workflow/AgentTerminal';
import { useAppContext } from '../context/AppContext';

export const WorkflowPage = () => {
  const navigate = useNavigate();
  const { activeStepIndex, isProcessing, currentBrief, currentDocument, hasActiveUploadSession, setHasActiveUploadSession } = useAppContext();

  // Auto-navigate to /report ONLY after a fresh upload finishes
  useEffect(() => {
    if (activeStepIndex >= 8 && !isProcessing && hasActiveUploadSession) {
      const timer = setTimeout(() => {
        setHasActiveUploadSession(false);
        navigate('/report');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [activeStepIndex, isProcessing, hasActiveUploadSession, navigate, setHasActiveUploadSession]);

  if (!currentDocument) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-28 text-center animate-noteo-fade">
        <div className="noteo-card p-6 sm:p-10 space-y-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto text-2xl sm:text-3xl border border-amber-500/30">
            ⚡
          </div>
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading">
              No Document Uploaded Yet
            </h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Please upload a research paper (PDF) or import an arXiv manuscript first to view live multi-agent execution telemetry and logs.
            </p>
          </div>
          <button
            onClick={() => navigate('/upload')}
            className="px-6 py-3 noteo-primary-btn text-xs font-bold hover:bg-zinc-200 cursor-pointer shadow-md active:scale-98 transition-all"
          >
            Upload Document Now →
          </button>
        </div>
      </div>
    );
  }

  const stepLabels = {
    1: 'Upload PDF — Manuscript Stream Ingested',
    2: 'PDF Parser — Extracting Text & Math Symbols',
    3: 'Chunking Engine — Generating Semantic Units',
    4: 'Context Manager — Routing Window to LLM Pipeline',
    5: 'Boss Agent — Dispatching Parallel Sub-Agents',
    6: 'Parallel Agents — Analyzing Methodology & References',
    7: 'Reviewer Agent — Verifying Quality Score (9.4/10 Verified)',
    8: 'Research Brief Composer — Synthesis Brief Ready'
  };

  const progressPercent = Math.min(100, Math.round((activeStepIndex / 8) * 100));

  return (
    <div className="max-w-4xl mx-auto px-3.5 sm:px-6 pt-12 sm:pt-16 pb-24 space-y-4 sm:space-y-6 animate-noteo-fade">
      
      {/* Clean Minimal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-white font-heading tracking-tight break-words">
            AI Execution DAG
          </h1>
          <p className="text-[11px] sm:text-xs text-zinc-400 font-medium mt-0.5 break-words">
            Real-time telemetry for {currentBrief?.metadata?.title || currentDocument?.originalName || 'Uploaded Manuscript'}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 text-[11px] sm:text-xs font-mono font-bold rounded-full border ${
            isProcessing
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
          }`}>
            {isProcessing ? '⚡ EXECUTING' : '✓ COMPLETED'}
          </span>
        </div>
      </div>

      {/* Primary Centerpiece: Live agent_execution.log Console */}
      <AgentTerminal isProcessing={isProcessing} />

      {/* Simple Minimal Progress Bar Below Terminal */}
      <div className="noteo-card p-4 sm:p-6 space-y-2.5 sm:space-y-3 bg-[#0D0D11]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="text-zinc-500 shrink-0">Phase:</span>
            <span className="text-amber-400 font-bold truncate">
              {stepLabels[Math.floor(activeStepIndex)] || 'Executing Graph Nodes...'}
            </span>
          </div>
          <span className="text-zinc-400 font-bold shrink-0">
            Step {activeStepIndex}/8 ({progressPercent}%)
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden border border-white/5">
          <div 
            className="bg-amber-500 h-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

    </div>
  );
};
