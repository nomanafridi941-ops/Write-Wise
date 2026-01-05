import React from "react";

const features = [
  {
    icon: "🧠",
    title: "AI-Powered Writing",
    desc: "Generate, rewrite, and optimize content with advanced AI models for SEO, clarity, and originality."
  },
  {
    icon: "⚡",
    title: "One-Click Tools",
    desc: "Instantly access 40+ tools for rewriting, humanizing, SEO, marketing, and more—all in one place."
  },
  {
    icon: "🌙",
    title: "Dark Mode & Mobile Friendly",
    desc: "Enjoy a beautiful, distraction-free experience on any device, day or night."
  },
  {
    icon: "🔗",
    title: "Sharable Tool Links",
    desc: "Share direct links to any tool or result for easy collaboration and workflow."
  }
];

const Home: React.FC = () => (
  <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 animate-in fade-in duration-700">
    <div className="max-w-3xl text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent mb-6">
        Write Wise AI
      </h1>
      <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-10">
        The ultimate AI-powered content suite for bloggers, marketers, and creators. Rewrite, optimize, and humanize your writing with a single click.
      </p>
      <a href="#tools" className="inline-block px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-lg hover:bg-indigo-700 transition mb-12">
        Start Writing Now
      </a>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mt-4">
      {features.map((f) => (
        <div key={f.title} className="flex items-start gap-4 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-md">
          <div className="text-3xl md:text-4xl">{f.icon}</div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{f.title}</h3>
            <p className="text-slate-500 dark:text-slate-300 text-sm">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Home;
