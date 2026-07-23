import React, { useState, useEffect } from 'react';

export const AnimatedPipeline = ({ isProcessing, activeStep = 3, onStepClick }) => {
  const [currentActiveStep, setCurrentActiveStep] = useState(activeStep);

  useEffect(() => {
    setCurrentActiveStep(activeStep);
  }, [activeStep]);

  // Simulate auto progress animation if processing
  useEffect(() => {
    if (!isProcessing) return;
    let step = 1;
    const interval = setInterval(() => {
      step = (step % 5) + 1;
      setCurrentActiveStep(step);
    }, 2500);
    return () => clearInterval(interval);
  }, [isProcessing]);

  const stages = [
    {
      id: 1,
      title: "PDF Ingestion & OCR",
      subtitle: "Parsing & Chunking",
      icon: "picture_as_pdf",
      description: "Reads PDF manuscript, extracts equations, tables & splits document into 41 semantic section chunks.",
      details: ["18 Pages Analyzed", "41 Chunks Extracted", "Math Formulas Parsed"]
    },
    {
      id: 2,
      title: "Logic & Methodology Audit",
      subtitle: "Hypothesis Testing",
      icon: "psychology",
      description: "Audits pre-layer normalization and attention head sparsity claims against reported benchmarks.",
      details: ["12 Claims Audited", "Pre-layer Norm Verified", "0 Logical Inconsistencies"]
    },
    {
      id: 3,
      title: "Citation & Benchmark Verification",
      subtitle: "Reference Cross-Check",
      icon: "fact_check",
      description: "Cross-references Vaswani 2017 & Kitaev 2020 citations against arXiv academic repositories.",
      details: ["3 Core Citations Verified", "SQuAD 2.0 Benchmark Validated", "1.2% Reported Variance"]
    },
    {
      id: 4,
      title: "Multi-Agent Parallel Synthesis",
      subtitle: "LLM Orchestration",
      icon: "hub",
      description: "5 specialized AI agents work in parallel to synthesize executive takeaways & risk tradeoffs.",
      details: ["5 Agents Active", "12.4k Prompt Tokens", "3.8k Completion Tokens"]
    },
    {
      id: 5,
      title: "Final Executive Report",
      subtitle: "Brief Composition",
      icon: "auto_awesome",
      description: "Generates high-clarity synthesis brief with verified confidence scores and exportable formats.",
      details: ["94% Confidence Score", "9.2/10 Overall Quality", "Export PDF/JSON Ready"]
    }
  ];

  const selectedStage = stages.find(s => s.id === currentActiveStep) || stages[4];

  return (
    <div className="apple-card p-6 sm:p-8 space-y-6">
      
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              How AI Analyzes Your Paper: Live Workflow Pipeline
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Click any step to inspect how the AI transforms raw PDF research into verified synthesis briefs
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            {isProcessing ? `Processing Step ${currentActiveStep} of 5...` : 'Pipeline Status: Verified Complete'}
          </span>
        </div>
      </div>

      {/* Stepper Node Visualizer Bar */}
      <div className="relative pt-4 pb-2 px-2 overflow-x-auto">
        <div className="min-w-[650px]">
          
          {/* Animated SVG Beam Lines */}
          <div className="relative flex items-center justify-between">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#E5E5EA" strokeWidth="3" strokeLinecap="round" />
              <line 
                x1="10%" 
                y1="50%" 
                x2={`${10 + (currentActiveStep - 1) * 20}%`} 
                y2="50%" 
                stroke="#0071E3" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                className="transition-all duration-500 ease-out"
              />
            </svg>

            {stages.map((stage) => {
              const isActive = currentActiveStep === stage.id;
              const isPast = currentActiveStep > stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    setCurrentActiveStep(stage.id);
                    if (onStepClick) onStepClick(stage.id);
                  }}
                  className="relative z-10 flex flex-col items-center group cursor-pointer outline-none"
                >
                  <div 
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg scale-110 ring-4 ring-blue-100 glow-blue'
                        : isPast
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-white border-2 border-slate-200 text-slate-400 hover:border-blue-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">
                      {isPast ? 'check' : stage.icon}
                    </span>
                  </div>

                  <div className="mt-3 text-center max-w-[120px]">
                    <span className={`text-[11px] font-bold block leading-tight font-heading ${
                      isActive ? 'text-blue-600 font-extrabold' : isPast ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {stage.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                      Step {stage.id}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Selected Step Details Inspector Box */}
      <div className="bg-slate-50/80 rounded-2xl p-5 border border-black/5 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-md font-heading uppercase">
                Step {selectedStage.id}: {selectedStage.subtitle}
              </span>
              <span className="text-xs font-bold text-slate-800 font-heading">
                {selectedStage.title}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
              {selectedStage.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            {selectedStage.details.map((detail, idx) => (
              <div key={idx} className="bg-white border border-slate-200/80 px-3 py-1.5 rounded-xl shadow-2xs text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
