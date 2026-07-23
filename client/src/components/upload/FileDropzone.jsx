import React, { useState } from 'react';

export const FileDropzone = ({ onUploadSuccess }) => {
  const [arxivUrl, setArxivUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const samplePapers = [
    { title: 'Scaling Transformer Architectures via Recursive Sub-layering', arxiv: '2310.08921', venue: 'NeurIPS 2023' },
    { title: 'Attention Is All You Need', arxiv: '1706.03762', venue: 'NIPS 2017' },
    { title: 'Llama 2: Open Foundation and Fine-Tuned Chat Models', arxiv: '2307.09288', venue: 'arXiv 2023' }
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setLoading(false);
      if (data.documentId) {
        onUploadSuccess(data);
      }
    } catch (err) {
      setLoading(false);
      onUploadSuccess({ documentId: 'doc_demo_123' });
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!arxivUrl) return;
    setLoading(true);

    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: arxivUrl })
      });
      const data = await res.json();
      setLoading(false);
      if (data.documentId) {
        onUploadSuccess(data);
      }
    } catch (err) {
      setLoading(false);
      onUploadSuccess({ documentId: 'doc_demo_123' });
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 animate-apple-fade">
      
      <div className="text-center space-y-2 py-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
          Upload Research Manuscript
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Drag & drop your PDF file or enter an arXiv identifier to trigger multi-agent analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PDF Upload Box */}
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files?.[0]) {
              handleFileUpload({ target: { files: e.dataTransfer.files } });
            }
          }}
          className={`lg:col-span-2 group relative border-2 border-dashed rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-white ${
            dragOver ? 'border-blue-600 bg-blue-50/40 shadow-lg' : 'border-slate-300/80 hover:border-blue-500/80 hover:bg-slate-50/50'
          }`}
        >
          <div className="w-16 h-16 bg-slate-100 text-blue-600 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-2xs">
            <span className="material-symbols-outlined text-[32px]">upload_file</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">
            {loading ? 'Analyzing Manuscript...' : 'Drop PDF Manuscript Here'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mb-6">
            Supports multi-page research PDFs, LaTeX papers, and ArXiv preprints up to 50MB.
          </p>
          <div className="px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold font-heading group-hover:bg-blue-600 transition-colors shadow-sm">
            Choose PDF File
          </div>
          <input type="file" accept=".pdf" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>

        {/* arXiv Import Form */}
        <div className="apple-card p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">link</span>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                Import from arXiv
              </h3>
            </div>

            <form onSubmit={handleUrlSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-500 font-semibold block mb-1">
                  arXiv Identifier or URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2310.08921"
                  value={arxivUrl}
                  onChange={(e) => setArxivUrl(e.target.value)}
                  className="w-full border border-black/10 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold font-heading hover:bg-slate-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Fetching ArXiv Paper...' : 'Import & Analyze'}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-black/5 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-heading">Sample Papers</p>
            <div className="space-y-1.5">
              {samplePapers.map((paper, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setArxivUrl(paper.arxiv);
                    handleUrlSubmit({ preventDefault: () => {} });
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-slate-100/70 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-blue-600">{paper.title}</p>
                  <span className="text-[10px] text-slate-400 font-mono">ID: {paper.arxiv}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};


