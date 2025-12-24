
import React, { useState, useEffect } from 'react';
import { ToolType } from '../types';
import { TOOLS, CATEGORIES } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Logo = () => (
  <div className="flex items-center gap-4 group">
    <div className="relative">
      {/* Outer Glow */}
      <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-2xl group-hover:bg-indigo-500/30 transition-all duration-500"></div>
      
      {/* Icon Container */}
      <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-[0_8px_16px_-4px_rgba(79,70,229,0.4)] group-hover:shadow-[0_12px_20px_-4px_rgba(79,70,229,0.5)] group-hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-white/20">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-7 h-7 text-white drop-shadow-sm" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Custom "W" Pen Nib Shape */}
          <path d="M3 7l4 10l5-8l5 8l4-10" />
          <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
          <path d="M12 11v4" strokeWidth="2" />
        </svg>
      </div>
    </div>
    
    <div className="flex flex-col">
      <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">
        Write<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-500">Wise</span>
      </h1>
      <div className="flex items-center gap-1.5 mt-1.5">
        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.25em]">Premium AI Suite</span>
        <div className="h-px w-3 bg-slate-200"></div>
      </div>
    </div>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children, activeTool, onToolSelect, theme, onToggleTheme }) => {
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const activeCat = CATEGORIES.find(cat => cat.tools.includes(activeTool));
    if (activeCat) {
      setExpandedCats(prev => ({ ...prev, [activeCat.name]: true }));
    }
  }, [activeTool]);

  const toggleCategory = (catName: string) => {
    setExpandedCats(prev => ({
      ...prev,
      [catName]: !prev[catName]
    }));
  };

  // Lock scroll when mobile sidebar is open
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) {
      document.body.classList.toggle('overflow-hidden', sidebarOpen);
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">
      {/* Mobile overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/40 ${sidebarOpen ? 'block' : 'hidden'} z-20`}
        aria-hidden={!sidebarOpen}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-30 md:z-20 w-72 md:w-80 bg-white border-r border-slate-200/60 flex flex-col shadow-sm transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        aria-hidden={!sidebarOpen}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="ml-4 inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <>
                <span className="text-yellow-400">☀️</span>
                <span>Light</span>
              </>
            ) : (
              <>
                <span className="text-slate-700">🌙</span>
                <span>Dark</span>
              </>
            )}
          </button>
          {/* Close button (mobile) */}
          {sidebarOpen && (
            <button
              className="md:hidden ml-2 p-2 rounded-lg hover:bg-slate-50 border border-slate-200"
              aria-label="Close menu"
              onClick={() => setSidebarOpen(false)}
              title="Close menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          </div>
        </div>

        {/* Scrollable Collapsible Tool List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-2 custom-scrollbar">
          {CATEGORIES.map((cat) => {
            const isExpanded = !!expandedCats[cat.name];
            const isActiveInCat = cat.tools.includes(activeTool);
            const shouldHighlightCat = isActiveInCat && cat.name !== 'Rewriting & Humanizing';

            return (
              <div key={cat.name} className="space-y-1">
                <button
                  onClick={() => toggleCategory(cat.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-[11px] font-black uppercase tracking-widest ${
                    shouldHighlightCat ? 'text-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Content */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <nav className="space-y-1 pt-1 pb-2">
                    {cat.tools.map((tid) => {
                      const tool = TOOLS.find(t => t.id === tid);
                      if (!tool) return null;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => { onToolSelect(tool.id); setSidebarOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-xs font-bold group ml-1 ${
                            activeTool === tool.id
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                          }`}
                        >
                          <span className={`text-lg transition-transform duration-300 ${activeTool === tool.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                            {tool.icon}
                          </span>
                          {tool.name}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM STATUS: OPERATIONAL
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative min-h-screen">
        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-4 left-4 z-20 inline-flex items-center p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 shadow-sm"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div className="max-w-6xl mx-auto relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
