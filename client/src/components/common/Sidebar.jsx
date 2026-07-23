import React from 'react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const workspaceLinks = [
    { id: 'dashboard', label: 'Analysis Studio', icon: 'auto_awesome' },
    { id: 'reader', label: 'Synthesis Report', icon: 'article' },
    { id: 'pipeline', label: 'AI Execution Graph', icon: 'account_tree' },
    { id: 'upload', label: 'Paper Library', icon: 'folder' }
  ];

  const systemLinks = [
    { id: 'settings', label: 'Settings', icon: 'tune' }
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 apple-glass border-r border-black/5 p-4 flex flex-col justify-between hidden lg:flex z-40">
      
      <div className="space-y-6">
        {/* Upload Paper CTA Button */}
        <div>
          <button 
            onClick={() => setActiveTab('upload')}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold font-heading hover:bg-blue-500 transition-all cursor-pointer shadow-md active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Upload New Paper</span>
          </button>
        </div>

        {/* Main Workspace Navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
            Workspace
          </p>
          {workspaceLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                }`}
              >
                <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Engine Live Pill */}
        <div className="bg-white/80 border border-black/5 rounded-2xl p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-heading">Mistral Multi-Agent</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-[11px] text-slate-700 font-semibold">5 Parallel Agents Ready</p>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-full rounded-full"></div>
          </div>
        </div>

      </div>

      {/* Footer Links */}
      <div className="border-t border-black/5 pt-4 space-y-1">
        {systemLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-2xl text-xs font-semibold transition-all cursor-pointer text-left ${
              activeTab === item.id ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-slate-400">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

    </aside>
  );
};


