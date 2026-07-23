import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export const UploadPage = () => {
  const navigate = useNavigate();
  const { uploadAndAnalyze, isProcessing } = useAppContext();
  const [arxivUrl, setArxivUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const samplePapers = [
    { title: 'Scaling Transformer Architectures via Recursive Sub-layering', arxiv: '2310.08921', venue: 'NeurIPS 2023' },
    { title: 'Attention Is All You Need', arxiv: '1706.03762', venue: 'NIPS 2017' },
    { title: 'Llama 2: Open Foundation and Fine-Tuned Chat Models', arxiv: '2307.09288', venue: 'arXiv 2023' }
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    navigate('/workflow');
    await uploadAndAnalyze(formData);
    if (e.target) e.target.value = '';
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    if (!arxivUrl) return;

    navigate('/workflow');
    await uploadAndAnalyze({ url: arxivUrl });
  };


  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24 space-y-10 animate-noteo-fade">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-heading">Ingestion Studio</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          Upload Research Paper
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
          Drop any PDF manuscript or enter an arXiv ID to begin multi-agent extraction
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* PDF Dropzone */}
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
          className={`lg:col-span-2 group relative border-2 border-dashed rounded-3xl p-10 sm:p-14 flex flex-col items-center justify-center text-center transition-all cursor-pointer noteo-card ${
            dragOver ? 'border-amber-500 bg-amber-500/5' : 'border-white/15 hover:border-amber-500/60'
          }`}
        >
          <div className="w-14 h-14 bg-zinc-800 text-white rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-white/10">
            📄
          </div>
          <h3 className="text-lg font-bold text-white font-heading mb-1">
            {isProcessing ? 'Analyzing Manuscript via 5 LLM Agents...' : 'Drop PDF File Here'}
          </h3>
          <p className="text-xs text-zinc-400 max-w-sm mb-6">
            Supports multi-page research PDFs, LaTeX manuscripts, and preprints up to 50MB.
          </p>
          <div className="px-6 py-2.5 noteo-pill-btn text-xs font-bold font-heading group-hover:border-amber-500 transition-colors">
            {isProcessing ? 'Processing Pipeline...' : 'Choose Local File'}
          </div>
          <input type="file" accept=".pdf" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>

        {/* arXiv URL Form */}
        <div className="noteo-card p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-heading mb-4">
              Import via arXiv ID
            </h3>

            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] text-zinc-400 font-semibold block mb-1.5">
                  arXiv ID or URL
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2310.08921"
                  value={arxivUrl}
                  onChange={(e) => setArxivUrl(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:border-amber-500 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full noteo-primary-btn py-2.5 text-xs font-bold cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? 'Fetching & Parsing...' : 'Import & Analyze'}
              </button>
            </form>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-heading">Sample Papers</p>
            <div className="space-y-1.5">
              {samplePapers.map((paper, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setArxivUrl(paper.arxiv);
                    handleUrlSubmit({ preventDefault: () => {} });
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-zinc-800 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-semibold text-zinc-200 truncate group-hover:text-amber-500">{paper.title}</p>
                  <span className="text-[10px] text-zinc-500 font-mono">ID: {paper.arxiv}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

