
import React, { useState, useEffect, useMemo } from 'react';
import { ToolType, WritingMode } from '../types';
import { TOOLS } from '../constants';
import { generateWritingContent } from '../services/geminiService';

interface WritingAreaProps {
  tool: ToolType;
}

const WritingArea: React.FC<WritingAreaProps> = ({ tool }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<WritingMode>(WritingMode.DEFAULT);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toolConfig = TOOLS.find(t => t.id === tool)!;

  useEffect(() => {
    setOutput('');
    setInput('');
    setError(null);
    setMode(WritingMode.DEFAULT);
  }, [tool]);

  const stats = useMemo(() => {
    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const chars = input.length;
    const readTime = Math.ceil(words / 200); // Avg 200 wpm
    return { words, chars, readTime };
  }, [input]);

  const outputStats = useMemo(() => {
    const words = output.trim() ? output.trim().split(/\s+/).length : 0;
    return { words };
  }, [output]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateWritingContent(tool, input, mode);
      setOutput(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([output], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `writewise-${tool.toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-widest mb-2">
            AI Assistant Active
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight flex items-center gap-4">
            <span className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl text-3xl">
              {toolConfig.icon}
            </span>
            {toolConfig.name}
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-xl">
            {toolConfig.description}
          </p>
        </div>

        {tool === ToolType.ARTICLE_REWRITER && (
          <div className="flex bg-white/60 p-1.5 rounded-2xl border border-slate-200/50 shadow-sm backdrop-blur-md">
            {[
              { id: WritingMode.DEFAULT, label: 'Standard', icon: '⚡' },
              { id: WritingMode.SEO, label: 'SEO', icon: '📈' },
              { id: WritingMode.SIMPLE, label: 'Simple', icon: '👶' },
              { id: WritingMode.PROFESSIONAL, label: 'Business', icon: '👔' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as WritingMode)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === m.id
                    ? 'bg-white text-indigo-700 shadow-md ring-1 ring-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
        {/* Input Card */}
        <div className="group relative">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-[2.5rem] blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-white rounded-[2rem] border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="px-6 py-5 border-b border-slate-100 bg-white/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Source Content</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Word Count</span>
                  <span className="text-sm font-black text-slate-700">{stats.words}</span>
                </div>
                <div className="h-6 w-px bg-slate-200"></div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Read Time</span>
                  <span className="text-sm font-black text-slate-700">{stats.readTime}m</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 p-8">
              <textarea
                className="w-full h-full bg-transparent border-0 focus:ring-0 text-slate-700 placeholder-slate-300 resize-none font-medium leading-[1.8] text-lg outline-none"
                placeholder={toolConfig.placeholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            
            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-center">
              <button
                onClick={handleGenerate}
                disabled={isLoading || !input.trim()}
                className={`w-full py-5 rounded-2xl font-extrabold text-white transition-all transform active:scale-[0.98] disabled:opacity-40 shadow-2xl overflow-hidden relative group/btn ${
                  isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-black shadow-indigo-200'
                }`}
              >
                <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-[400%] transition-transform duration-1000 ease-in-out"></div>
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Optimizing Content...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    {toolConfig.buttonText}
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Card */}
        <div className="group relative">
          <div className={`absolute -inset-0.5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2.5rem] blur transition duration-1000 ${output ? 'opacity-30' : 'opacity-10'}`}></div>
          <div className="relative bg-white rounded-[2rem] border border-slate-200/60 shadow-xl overflow-hidden flex flex-col h-full min-h-[500px]">
            <div className="px-6 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${output ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`}></div>
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">AI Output</h3>
              </div>
              
              {output && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={downloadText}
                    title="Download as .txt"
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  </button>
                  <div className="w-px h-6 bg-slate-200 mx-1"></div>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      copied 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        COPIED
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                        COPY TEXT
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex-1 p-8 bg-slate-50/30 overflow-y-auto max-h-[500px]">
              {error && (
                <div className="p-5 mb-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold flex items-start gap-3 animate-in fade-in zoom-in duration-300">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                  {error}
                </div>
              )}
              
              {output ? (
                <div className="prose prose-lg prose-slate max-w-none text-slate-700 font-medium leading-[1.8] animate-in fade-in slide-in-from-top-2 duration-500">
                  {output.split('\n').map((para, i) => (
                    para.trim() ? <p key={i} className="mb-6 last:mb-0">{para}</p> : <div key={i} className="h-4"></div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center space-y-6 py-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
                    <div className="relative w-24 h-24 rounded-3xl bg-white border border-slate-100 shadow-2xl flex items-center justify-center text-5xl">
                      {isLoading ? '🧠' : '✨'}
                    </div>
                  </div>
                  <div className="text-center max-w-xs">
                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-2">
                      {isLoading ? 'Processing' : 'Awaiting Input'}
                    </p>
                    <p className="text-slate-500 font-medium text-sm leading-relaxed">
                      {isLoading 
                        ? 'Gemini is analyzing your text and applying semantic optimizations...' 
                        : 'Your refined, SEO-safe content will appear here once generated.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {output && (
              <div className="p-5 bg-indigo-600 flex items-center justify-between text-white/90">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-indigo-600 bg-indigo-400 flex items-center justify-center text-[8px] font-black">
                        AI
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Verified Human-Like Quality</span>
                </div>
                <div className="text-[10px] font-bold text-white/60">
                  {outputStats.words} WORDS GENERATED
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingArea;
