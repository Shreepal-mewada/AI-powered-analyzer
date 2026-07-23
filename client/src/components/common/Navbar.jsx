import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { currentDocument } = useAppContext();
  const [toastMsg, setToastMsg] = useState('');

  const handleProtectedNav = (e, path, label) => {
    if (!currentDocument) {
      e.preventDefault();
      setToastMsg(`Please upload a document first to view ${label}`);
      setTimeout(() => setToastMsg(''), 3500);
      navigate('/upload');
    }
  };

  const navLinks = [
    { to: '/', label: 'About' },
    { to: '/upload', label: 'Upload Paper' },
    { to: '/report', label: 'Synthesis Brief', protected: true },
    { to: '/workflow', label: 'AI Execution DAG', protected: true },
  ];

  return (
    <>
      {/* Toast Notification Alert when clicking locked tabs */}
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-amber-500 text-black text-xs font-bold rounded-full shadow-xl border border-amber-400 flex items-center gap-2 animate-bounce">

          <span>{toastMsg}</span>
        </div>
      )}

      <header className="fixed top-0 left-0 w-full z-50 h-20 noteo-glass border-b border-white/10 flex items-center justify-between px-6 lg:px-16">

        {/* Brand Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-extrabold text-sm font-heading shadow-md">
            N
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight font-heading group-hover:text-amber-500 transition-colors">
            ScholarSense
          </span>
        </NavLink>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => {
            const isLocked = link.protected && !currentDocument;

            return (
              <NavLink
                key={idx}
                to={link.to}
                onClick={(e) => link.protected && handleProtectedNav(e, link.to, link.label)}
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${isActive ? 'text-white font-semibold border-b border-amber-500 pb-0.5' : 'text-zinc-400 hover:text-white'
                  } ${isLocked ? 'opacity-60' : ''}`
                }
              >
                <span>{link.label}</span>

              </NavLink>
            );
          })}
        </nav>

        {/* Right Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/upload')}
            className="px-5 py-2.5 noteo-primary-btn text-xs font-bold cursor-pointer hover:bg-zinc-200 active:scale-98 transition-all"
          >
            Summarize Now
          </button>
        </div>

      </header>
    </>
  );
};
