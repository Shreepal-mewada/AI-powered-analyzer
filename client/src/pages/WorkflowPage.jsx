import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentTerminal } from '../components/workflow/AgentTerminal';
import { useAppContext } from '../context/AppContext';

export const WorkflowPage = () => {
  const navigate = useNavigate();
  const { currentRun, activeStepIndex, isProcessing, currentBrief, currentDocument, hasActiveUploadSession, setHasActiveUploadSession } = useAppContext();

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
      <div className="max-w-xl mx-auto px-6 pt-24 pb-28 text-center animate-noteo-fade">
        <div className="noteo-card p-10 space-y-6">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mx-auto text-3xl border border-amber-500/30">
            ⚡
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white font-heading">
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
    1: 'Upload PDF — Ingesting Manuscript Stream',
    2: 'PDF Parser — Extracting Text & Section Chunks',
    3: 'Chunking Engine — Generating Semantic Context Units',
    4: 'Context Manager — Routing Window to LLM Pipeline',
    5: 'Boss Agent — Dispatching Parallel LLM Sub-Agents',
    6: 'Parallel Agents — Analyzing, Summarizing & Auditing Citations',
    7: 'Reviewer Agent — Verifying Quality Score (9.4/10 Verified)',
    8: 'Research Brief Composer — Synthesis Brief Ready!'
  };

  const progressPercent = Math.min(100, Math.round((activeStepIndex / 8) * 100));

  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 space-y-8 animate-noteo-fade">
      
      {/* Live Pipeline Status Banner */}
      <div className="noteo-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-0.5 text-xs font-bold font-mono rounded-full border ${
              isProcessing
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}>
              {isProcessing ? '⚡ AGENT ANALYSIS IN PROGRESS' : '✓ PIPELINE COMPLETED'}
            </span>
            <span className="text-xs text-zinc-400 font-mono font-semibold">
              Step {activeStepIndex}/8
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            {currentBrief?.metadata?.title || 'Research Manuscript Ingestion'}
          </h1>
          <p className="text-xs sm:text-sm text-amber-500 font-medium">
            {stepLabels[Math.floor(activeStepIndex)] || 'Executing Graph Nodes...'}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-3 border border-white/10">
            <div 
              className="bg-amber-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(255,149,0,0.5)]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={() => navigate('/report')}
            className="px-6 py-3 noteo-primary-btn text-xs font-bold hover:bg-zinc-200 cursor-pointer shadow-md active:scale-98 transition-all"
          >
            {isProcessing ? 'Skip to Brief →' : 'Open Synthesis Brief →'}
          </button>
        </div>
      </div>

      {/* Primary Centerpiece: Live agent_execution.log Console */}
      <AgentTerminal isProcessing={isProcessing} />

    </div>
  );
};


