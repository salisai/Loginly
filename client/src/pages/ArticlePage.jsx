import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { HiArrowNarrowRight } from "react-icons/hi";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(`${API_URL}/api/blog/articles`, {
          withCredentials: true,
        });

        if (response.data && response.data.success) {
          setArticles(response.data.data || []);
        } else {
          setError("Failed to load articles.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Connection error.");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Background Polish */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow py-20 px-6">
          <div className="max-w-4xl mx-auto w-full">
            {/* Header Section */}
            <header className="relative mb-16 md:mb-24">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Knowledge Base</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6">
                Latest <span className="text-emerald-500">Insights</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-2xl font-medium leading-relaxed">
                Technical deep dives, product updates, and engineering best practices from the Loginly team.
              </p>
            </header>

            {loading ? (
              <LoadingState />
            ) : error ? (
              <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-10 text-center">
                <p className="text-red-400 font-bold tracking-tight">{error}</p>
              </div>
            ) : articles.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-12">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

const ArticleCard = ({ article }) => (
  <article className="group relative flex flex-col items-start transition-all duration-300">
    <div className="flex flex-col md:flex-row md:items-baseline justify-between w-full mb-4">
      <h2 className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-300">
        {article.title}
      </h2>
      <time className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mt-2 md:mt-0 font-mono">
        {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </time>
    </div>
    
    <p className="text-slate-400 leading-relaxed font-medium line-clamp-3 mb-6 max-w-3xl">
      {article.excerpt || article.content}
    </p>

    <div className="flex items-center gap-2 text-emerald-500 font-black text-[11px] uppercase tracking-widest cursor-pointer">
      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-emerald-500 after:transition-all group-hover:after:w-full">
        Full Analysis
      </span>
      <HiArrowNarrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={16} />
    </div>

    {/* Subtle divider */}
    <div className="w-full h-[1px] bg-white/[0.05] mt-12 transition-colors duration-500 group-hover:bg-emerald-500/20" />
  </article>
);

const LoadingState = () => (
  <div className="space-y-12">
    {[1, 2, 3].map((n) => (
      <div key={n} className="animate-pulse">
        <div className="h-8 bg-white/5 rounded-lg w-2/3 mb-4" />
        <div className="h-4 bg-white/5 rounded-lg w-full mb-2" />
        <div className="h-4 bg-white/5 rounded-lg w-1/2" />
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-24 bg-white/[0.02] rounded-[32px] border border-white/[0.05]">
    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">The vault is empty</p>
  </div>
);

export default Articles;