import React, { useState } from 'react';

export const FaqPage = () => {
  const faqs = [
    {
      q: "How does ScholarSense summarize research papers?",
      a: "Our system tokenizes PDF manuscripts into section chunks and runs 5 parallel LLM agents. Each agent specializes in a distinct layer: parsing math formulas, auditing methodology logic, verifying references against arXiv databases, and composing an executive brief."
    },
    {
      q: "Can I import papers directly using arXiv IDs?",
      a: "Yes! Simply paste any arXiv paper ID or URL (e.g. 2310.08921) into the Upload Studio. Our engine automatically fetches the full preprint, metadata, and citation tree."
    },
    {
      q: "How are citations verified?",
      a: "The Citation Verifier agent cross-references cited paper titles, authors, and published benchmarks against Google Scholar and arXiv repositories to ensure citations are real and correctly interpreted."
    },
    {
      q: "Is my uploaded PDF manuscript kept private?",
      a: "Yes. Manuscripts uploaded to ScholarSense are processed ephemerally for your session and are never sold or used to train public models."
    },
    {
      q: "What export formats are supported?",
      a: "You can copy or export your synthesis brief in Markdown (.md), PDF document format, or raw JSON for programmatic integration."
    }
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24 space-y-10 animate-noteo-fade">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-heading">Frequently Asked Questions</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          Everything You Need to Know
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Common questions about paper parsing, citation verification, and security
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="noteo-card overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-800/40 transition-colors"
              >
                <h3 className="text-base font-bold text-white font-heading">
                  {faq.q}
                </h3>
                <span className="text-zinc-400 font-mono text-lg font-bold">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 mt-2 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
