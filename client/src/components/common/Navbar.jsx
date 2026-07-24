import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const Navbar = () => {
  const navigate = useNavigate();
  const { currentDocument } = useAppContext();
  const [toastMsg, setToastMsg] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProtectedNav = (e, path, label) => {
    if (!currentDocument) {
      e.preventDefault();
      setToastMsg(`Please upload a document first to view ${label}`);
      setTimeout(() => setToastMsg(''), 3500);
      navigate('/upload');
    }
    setMobileMenuOpen(false);
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

      <header className="fixed top-0 left-0 w-full z-50 h-20 noteo-glass border-b border-white/10 flex items-center justify-between px-5 sm:px-8 lg:px-16">

        {/* Brand Logo */}
        <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-extrabold text-sm font-heading shadow-md">
            V
          </div>
          <span className="font-extrabold text-white text-lg tracking-tight font-heading group-hover:text-amber-500 transition-colors">
            Vilambo
          </span>
        </NavLink>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => {
            const isLocked = link.protected && !currentDocument;

            return (
              <NavLink
                key={idx}
                to={link.to}
                onClick={(e) => link.protected && handleProtectedNav(e, link.to, link.label)}
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive ? 'text-white font-semibold border-b border-amber-500 pb-0.5' : 'text-zinc-400 hover:text-white'
                  } ${isLocked ? 'opacity-60' : ''}`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Action Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => { setMobileMenuOpen(false); navigate('/upload'); }}
            className="hidden sm:inline-block px-4 sm:px-5 py-2.5 noteo-primary-btn text-xs font-bold cursor-pointer hover:bg-zinc-200 active:scale-98 transition-all"
          >
            Summarize Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </header>

      {/* Mobile Slide-Down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 z-40 bg-[#0A0A0E]/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden space-y-4 animate-noteo-fade shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link, idx) => {
              const isLocked = link.protected && !currentDocument;

              return (
                <NavLink
                  key={idx}
                  to={link.to}
                  onClick={(e) => {
                    if (link.protected) {
                      handleProtectedNav(e, link.to, link.label);
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    } ${isLocked ? 'opacity-60' : ''}`
                  }
                >
                  <span>{link.label}</span>
                  {isLocked && <span className="text-[10px] text-amber-400 font-mono bg-amber-500/20 px-2 py-0.5 rounded-full">Requires Upload</span>}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
