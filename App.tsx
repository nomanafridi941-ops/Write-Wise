
import React, { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout';
import WritingArea from './components/WritingArea';
import { ToolType } from './types';

const App: React.FC = () => {
  const getToolFromUrl = (): ToolType => {
    try {
      const url = new URL(window.location.href);
      const qp = url.searchParams.get('tool');
      if (!qp) return ToolType.ARTICLE_REWRITER;
      const key = qp.toUpperCase();
      if ((ToolType as any)[key]) return (ToolType as any)[key] as ToolType;
      return ToolType.ARTICLE_REWRITER;
    } catch {
      return ToolType.ARTICLE_REWRITER;
    }
  };

  const [activeTool, setActiveTool] = useState<ToolType>(getToolFromUrl());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored as 'light' | 'dark';
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keep URL in sync with currently selected tool
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('tool', activeTool);
      window.history.replaceState(null, '', url.toString());
    } catch {}
  }, [activeTool]);

  // Support browser back/forward to change the active tool
  useEffect(() => {
    const onPop = () => {
      const t = getToolFromUrl();
      setActiveTool(t);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <Layout activeTool={activeTool} onToolSelect={setActiveTool} theme={theme} onToggleTheme={toggleTheme}>
      <WritingArea tool={activeTool} />
      
      {/* Informational Footer Section for users */}
      <footer className="mt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-slate-200 pt-16">
          <div className="group">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h4 className="text-xs font-black text-slate-900 mb-4 uppercase tracking-[0.2em]">Next-Gen Intelligence</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Powered by the latest Gemini architecture, WriteWise offers semantic depth that legacy AI models simply can't match.
            </p>
          </div>
          <div className="group">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 mb-6 group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h4 className="text-xs font-black text-slate-900 mb-4 uppercase tracking-[0.2em]">Safety First</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Our unique prompting engine avoids repetitive patterns that trigger modern AI detectors, keeping your site AdSense safe.
            </p>
          </div>
          <div className="group">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h4 className="text-xs font-black text-slate-900 mb-4 uppercase tracking-[0.2em]">Zero Plagiarism</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Every generation is semantically unique, ensuring your content is 100% original and ready for competitive SERP rankings.
            </p>
          </div>
        </div>
        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40">
           <div className="flex items-center gap-4">
             <div className="w-8 h-8 bg-slate-400 rounded-lg flex items-center justify-center text-white font-black text-sm">W</div>
             <p className="text-[10px] font-bold tracking-widest uppercase">WriteWise Premium Content Suite</p>
           </div>
           <p className="text-[10px] font-bold">&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </Layout>
  );
};

export default App;
