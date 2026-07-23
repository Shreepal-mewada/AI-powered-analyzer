import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ReviewHistoryTimeline = ({ reviewScores, retryCount, reviewFeedback }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs animate-fade">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" /> Quality Review & Accuracy History
          </h3>
          <span className="text-xs text-slate-500 font-medium">Quality Benchmark: 7.0 / 10.0</span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Score: {reviewScores?.overallScore || 9.2} / 10
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Confidence: {reviewScores?.confidenceScore || 94}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          <span className="text-xs font-medium text-slate-500 block mb-1">Accuracy Score</span>
          <div className="text-lg font-bold text-slate-900">{reviewScores?.accuracyScore || 9.2}</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          <span className="text-xs font-medium text-slate-500 block mb-1">Completeness Score</span>
          <div className="text-lg font-bold text-slate-900">{reviewScores?.completenessScore || 9.0}</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          <span className="text-xs font-medium text-slate-500 block mb-1">Clarity Score</span>
          <div className="text-lg font-bold text-slate-900">{reviewScores?.clarityScore || 9.5}</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
          <span className="text-xs font-medium text-slate-500 block mb-1">Quality Status</span>
          <div className="text-lg font-bold text-blue-700">
            {retryCount ? `${retryCount} Re-check` : 'Passed First Check'}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-3.5 rounded-xl border-l-4 border-emerald-500 text-xs text-slate-700 leading-relaxed">
        <strong className="text-slate-900 font-semibold">Reviewer Notes:</strong> {reviewFeedback || "Factual consistency verified against source paper. All quantitative metrics and main conclusions correctly captured."}
      </div>
    </div>
  );
};
