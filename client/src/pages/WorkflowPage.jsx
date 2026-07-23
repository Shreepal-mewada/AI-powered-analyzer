import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveWorkflowGraph } from '../components/workflow/LiveWorkflowGraph';
import { AgentTerminal } from '../components/workflow/AgentTerminal';
import { MetricsOverview } from '../components/common/MetricsOverview';
import { TokenAnalyticsCard } from '../components/workflow/TokenAnalyticsCard';
import { useAppContext } from '../context/AppContext';

export const WorkflowPage = () => {
  const navigate = useNavigate();
  const { currentRun, activeStepIndex, isProcessing, currentBrief } = useAppContext();

  // Auto-navigate to /report when graph pipeline finishes (activeStepIndex >= 8)
  useEffect(() => {
    if (activeStepIndex >= 8 && !isProcessing) {
      const timer = setTimeout(() => {
        navigate('/report');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [activeStepIndex, isProcessing, navigate]);

  const stepLabels = {
    1: 'Upload PDF — Ingesting Manuscript',
    2: 'PDF Parser — Extracting Text & Math Streams',
    3: 'Chunking Engine — Generating Semantic Chunks',
    4: 'Context Manager — Routing Context to LangGraph',
    5: 'Boss Agent — Fan-Out Multi-Agent Orchestration',
    6: 'Parallel Agents — Analyzing, Summarizing, Verifying Citations',
    7: 'Reviewer Agent — Auditing Quality Score (Approved 9.2/10)',
    8: 'Research Brief Composer — Final Synthesis Ready!'
  };

  const progressPercent = Math.min(100, Math.round((activeStepIndex / 8) * 100));

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 space-y-8 animate-noteo-fade">
      
      {/* Live Pipeline Status Banner */}
      <div className="noteo-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-0.5 text-xs font-bold font-mono rounded-full border ${
              isProcessing
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
            }`}>
              {isProcessing ? '⚡ EXECUTING WORKFLOW DAG' : '✓ PIPELINE COMPLETED'}
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

      {/* Interactive Visual Graph DAG */}
      <LiveWorkflowGraph 
        activeNode={currentRun?.activeNode || 'Boss Agent'} 
        status={isProcessing ? 'ANALYZING' : 'COMPLETED'}
        activeStepIndex={activeStepIndex}
      />

      <MetricsOverview analytics={currentBrief?.analytics} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <TokenAnalyticsCard />
        </div>
        <div className="lg:col-span-5">
          <AgentTerminal isProcessing={isProcessing} />
        </div>
      </div>

    </div>
  );
};
