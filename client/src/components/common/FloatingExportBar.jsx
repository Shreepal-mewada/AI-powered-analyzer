import React, { useState } from 'react';
import { Copy, Check, FileText, Download, Code } from 'lucide-react';

export const FloatingExportBar = ({ brief }) => {
  const [copied, setCopied] = useState(false);

  const getMarkdownText = (b) => {
    if (b?.markdownContent) return b.markdownContent;
    const title = b?.metadata?.title || 'Research Manuscript Synthesis Brief';
    const authors = Array.isArray(b?.metadata?.authors) ? b.metadata.authors.join(', ') : (b?.metadata?.authors || 'Academic Researchers');
    const venue = b?.metadata?.venue || 'NeurIPS / Academic Conference';
    const summary = typeof b?.executiveSummary === 'string' ? b.executiveSummary : (b?.executiveSummary?.paragraph || b?.executiveSummary?.overview || 'Executive summary synthesized by multi-agent LLM workflow.');

    let insights = '';
    if (Array.isArray(b?.keyInsights)) {
      insights = b.keyInsights.map(i => `- ${typeof i === 'string' ? i : (i.takeaway || i.finding || i.text || JSON.stringify(i))}`).join('\n');
    }

    return `# ${title}\n\n**Authors:** ${authors}\n**Venue:** ${venue}\n\n## Executive Summary\n${summary}\n\n## Key Research Insights\n${insights || 'Verified key insights compiled.'}\n`;
  };

  const handleCopy = () => {
    const text = getMarkdownText(brief);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format) => {
    if (format === 'pdf') {
      window.print();
      return;
    }

    let content = getMarkdownText(brief);
    let mime = 'text/markdown';
    let filename = `Research_Brief.${format}`;

    if (format === 'json') {
      content = JSON.stringify(brief || {}, null, 2);
      mime = 'application/json';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] sm:max-w-[95vw] floating-export-bar">
      <div className="bg-zinc-900 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-1.5 sm:gap-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
        
        <span className="text-[11px] sm:text-sm font-semibold whitespace-nowrap pl-1 text-zinc-300 hidden xs:inline">
          Export Brief
        </span>
        
        <div className="h-4 sm:h-5 w-[1px] bg-white/20 hidden xs:block"></div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleCopy}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-white/10 rounded-full flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs font-medium"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-300" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => handleDownload('md')}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-white/10 rounded-full flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs font-medium"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Markdown</span>
          </button>

          <button
            onClick={() => handleDownload('pdf')}
            className="px-3 sm:px-3.5 py-1 sm:py-1.5 bg-amber-500 hover:bg-amber-400 text-black rounded-full flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs font-bold shadow-md active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>

          <button
            onClick={() => handleDownload('json')}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 hover:bg-white/10 rounded-full flex items-center gap-1 sm:gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs font-medium"
          >
            <Code className="w-3.5 h-3.5 text-blue-400" />
            <span>JSON</span>
          </button>
        </div>

      </div>
    </div>
  );
};
