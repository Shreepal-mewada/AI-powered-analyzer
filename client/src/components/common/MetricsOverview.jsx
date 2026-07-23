import React from 'react';

export const MetricsOverview = ({ analytics }) => {
  const metrics = [
    { label: 'Manuscript Pages', value: analytics?.pages || 18, unit: 'pages', icon: 'find_in_page' },
    { label: 'Parsed Chunks', value: analytics?.chunks || 41, unit: 'blocks', icon: 'segment' },
    { label: 'Agents Executed', value: analytics?.agentsInvoked ? String(analytics.agentsInvoked).padStart(2, '0') : '05', unit: 'nodes', icon: 'hub' },
    { label: 'Audit Score', value: '9.2 / 10', unit: 'verified', icon: 'verified' },
    { label: 'Latency', value: `${((analytics?.totalLatencyMs || 19000) / 1000).toFixed(0)}s`, unit: 'duration', icon: 'timer' }
  ];

  return (
    <div className="space-y-4 animate-apple-fade">
      
      {/* Primary Stats Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="apple-card p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">{m.label}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-400">{m.icon}</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 font-heading tracking-tight">{m.value}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5 font-medium">{m.unit}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Token Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="apple-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="material-symbols-outlined text-[18px]">input</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-heading">Prompt Input Context</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 font-mono">12,402 units</p>
            </div>
          </div>
        </div>

        <div className="apple-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="material-symbols-outlined text-[18px]">output</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider font-heading">Generated Brief Context</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 font-mono">3,851 units</p>
            </div>
          </div>
        </div>

        <div className="apple-card p-4 flex items-center justify-between bg-blue-50/40 border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </div>
            <div>
              <p className="text-[10px] text-blue-600 uppercase font-bold tracking-wider font-heading">Estimated Compute Cost</p>
              <p className="text-xs sm:text-sm font-bold text-blue-900 font-mono">$0.24 USD</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-blue-700 bg-white px-2.5 py-1 rounded-full border border-blue-100">Optimized</span>
        </div>
      </section>

    </div>
  );
};


