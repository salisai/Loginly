import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

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
        // If unauthorized, ProtectedRoute should already redirect,
        // but we still handle any unexpected errors here.
        setError(
          err.response?.data?.message ||
          "Something went wrong while fetching articles."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Latest Articles
          </h1>
          <p className="text-gray-400 mb-12 text-lg">
            Explore our collection of articles and updates.
          </p>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500" />
              <p className="mt-4 text-gray-500">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-500 text-lg">
                No articles available yet. Check back later!
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 group shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                      {article.title}
                    </h2>
                    <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-base">
                    {article.excerpt || article.content}
                  </p>
                  <div className="mt-6 flex items-center text-green-500 font-medium text-sm group-hover:translate-x-1 transition-transform cursor-pointer">
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
