import React, { useState } from 'react';

export const FaqPage = () => {
  const faqs = [
    {
      q: "How does Vilambo summarize research papers?",
      a: "Vilambo uses a multi-agent LangGraph workflow running on LLM backbones like Mistral AI and GPT-4. It breaks manuscripts into semantic chunks, extracts methodology, cross-references claims, and synthesizes structured executive briefs."
    },
    {
      q: "Can I import papers directly using arXiv IDs?",
      a: "Yes! Simply paste any arXiv paper ID or URL (e.g. 2310.08921) into the Upload Studio. Our engine automatically fetches the full preprint, metadata, and citation tree."
    },
    {
      q: "Can I upload any academic PDF or arXiv paper?",
      a: "Yes. You can drag and drop any research PDF (up to 50MB) or paste an arXiv paper link/ID to initiate instant parallel analysis."
    },
    {
      q: "Is my uploaded paper private and secure?",
      a: "Yes. Manuscripts uploaded to Vilambo are processed ephemerally for your session and are never sold or used to train public models."
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
