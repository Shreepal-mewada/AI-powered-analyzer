import React from 'react';
import { LiveWorkflowGraph } from '../components/workflow/LiveWorkflowGraph';
import { AgentTerminal } from '../components/workflow/AgentTerminal';
import { MetricsOverview } from '../components/common/MetricsOverview';
import { TokenAnalyticsCard } from '../components/workflow/TokenAnalyticsCard';
import { useAppContext } from '../context/AppContext';

export const WorkflowPage = () => {
  const { currentRun, isProcessing, currentBrief } = useAppContext();

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-24 space-y-10 animate-noteo-fade">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-heading">Execution Engine</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          Multi-Agent Execution DAG
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Deep inspection of active pipeline nodes, compute analytics, and real-time execution logs
        </p>
      </div>

      <MetricsOverview analytics={currentBrief?.analytics} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <LiveWorkflowGraph 
            activeNode={currentRun?.activeNode || 'Synthesizer'} 
            status={currentRun?.status || 'COMPLETED'} 
          />
          <TokenAnalyticsCard />
        </div>
        <div className="lg:col-span-5">
          <AgentTerminal isProcessing={isProcessing} />
        </div>
      </div>

    </div>
  );
};

