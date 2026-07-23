import React from 'react';
import { Cpu, Clock, ShieldCheck } from 'lucide-react';

export const AgentCard = ({ name, role, status, confidence, latency, outputPreview, isReviewer }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all animate-fade">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
              <Cpu size={16} />
            </div>
            <span className="text-sm font-bold text-slate-900">{name}</span>
          </div>

          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
            status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            status === 'RUNNING' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
            'bg-slate-100 text-slate-600'
          }`}>
            {status}
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-3">{role}</p>

        <div className="grid grid-cols-2 gap-3 py-2.5 my-2 border-t border-slate-100">
          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Accuracy Score</span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <ShieldCheck size={13} /> {confidence || 93}%
            </span>
          </div>

          <div>
            <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Processing Speed</span>
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Clock size={13} /> {latency || 4.2}s
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
          {isReviewer ? 'Quality Audit Result' : 'Stage Output Preview'}
        </span>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-xs text-slate-600 max-h-24 overflow-y-auto overflow-x-hidden leading-relaxed">
          {outputPreview || "Analysis completed successfully."}
        </div>
      </div>
    </div>
  );
};
