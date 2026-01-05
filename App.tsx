
import React, { useEffect, useMemo, useState } from 'react';
import Layout from './components/Layout';
import WritingArea from './components/WritingArea';
import Home from './components/Home';
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

  // Show Home page if on "/" with no tool param
  const isHome = typeof window !== 'undefined' && (!window.location.search || window.location.search === '?');
  return (
    <Layout activeTool={activeTool} onToolSelect={setActiveTool} theme={theme} onToggleTheme={toggleTheme}>
      {isHome ? <Home /> : <WritingArea tool={activeTool} />}
    </Layout>
  );
};

export default App;
