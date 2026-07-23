import React from 'react';
import { Zap } from 'lucide-react';

export const TokenAnalyticsCard = ({ tokens }) => {
  const promptTokens = tokens?.promptTokens || 1840;
  const completionTokens = tokens?.completionTokens || 620;
  const totalTokens = promptTokens + completionTokens;
  const cost = tokens?.costEstimate || (totalTokens * 0.0000005);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs animate-fade">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Zap size={18} className="text-blue-600" /> Processing & Usage Summary
        </h3>
        <span className="text-xs text-slate-500 font-medium">AI Model: Mistral AI</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-500 block mb-1">Input Data Size</span>
          <div className="text-xl font-bold text-slate-900">{promptTokens.toLocaleString()} units</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-500 block mb-1">Generated Summary Size</span>
          <div className="text-xl font-bold text-slate-900">{completionTokens.toLocaleString()} units</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-500 block mb-1">Total Content Processed</span>
          <div className="text-xl font-bold text-blue-600">{totalTokens.toLocaleString()} units</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-medium text-slate-500 block mb-1">Estimated Cost</span>
          <div className="text-xl font-bold text-emerald-600">${cost.toFixed(6)}</div>
        </div>
      </div>
    </div>
  );
};
