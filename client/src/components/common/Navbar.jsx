import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'About' },
    { to: '/#how-it-works', label: 'How It Works', isHash: true },
    { to: '/upload', label: 'Upload Paper' },
    { to: '/report', label: 'Synthesis Brief' },
    { to: '/workflow', label: 'AI Execution DAG' },
    { to: '/faq', label: 'FAQ' }
  ];

  return (
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
          if (link.isHash) {
            return (
              <button
                key={idx}
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            );
          }
          return (
            <NavLink
              key={idx}
              to={link.to}
              className={({ isActive }) =>
                `text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-white font-semibold border-b border-amber-500 pb-0.5' : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Right Action Button */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/upload')}
          className="px-5 py-2.5 noteo-pill-btn text-xs font-semibold hover:border-white/30 cursor-pointer shadow-sm"
        >
          Sign In
        </button>

        <button 
          onClick={() => navigate('/upload')}
          className="hidden sm:block px-5 py-2.5 noteo-primary-btn text-xs font-bold cursor-pointer hover:bg-zinc-200 active:scale-98 transition-all"
        >
          Summarize Now
        </button>
      </div>

    </header>
  );
};



