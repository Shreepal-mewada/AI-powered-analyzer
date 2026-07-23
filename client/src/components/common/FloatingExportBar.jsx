import React, { useState } from 'react';

export const FloatingExportBar = ({ brief }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(brief?.markdownContent || 'Research Brief Content');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format) => {
    let content = brief?.markdownContent || '';
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center gap-2 sm:gap-4 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
        
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap pl-1">
          Export Result
        </span>
        
        <div className="h-5 w-[1px] bg-white/20"></div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 sm:px-3 sm:py-1.5 hover:bg-white/10 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span className="hidden sm:inline font-medium">{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={() => handleDownload('md')}
            className="p-1.5 sm:px-3 sm:py-1.5 hover:bg-white/10 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">markdown</span>
            <span className="hidden sm:inline font-medium">Markdown</span>
          </button>

          <button
            onClick={() => handleDownload('pdf')}
            className="p-1.5 sm:px-3 sm:py-1.5 hover:bg-white/10 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            <span className="hidden sm:inline font-medium">PDF</span>
          </button>

          <button
            onClick={() => handleDownload('json')}
            className="p-1.5 sm:px-3 sm:py-1.5 hover:bg-white/10 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <span className="material-symbols-outlined text-[18px]">data_object</span>
            <span className="hidden sm:inline font-medium">JSON</span>
          </button>
        </div>

        <div className="h-5 w-[1px] bg-white/20"></div>

        <button 
          onClick={() => alert('Shareable URL link copied to clipboard!')}
          className="p-1.5 bg-blue-600 hover:bg-blue-500 transition-colors rounded-full text-white cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
        </button>

      </div>
    </div>
  );
};
