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
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-white">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="page-content flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow section-spacing-lg">
          <div className="container-wide max-w-4xl">
            <header className="mb-10 md:mb-12">
              <h1 className="text-heading-1 text-white mb-3">
                Latest Articles
              </h1>
              <p className="text-body-lg text-[var(--text-body)]">
                Explore our collection of articles and updates.
              </p>
            </header>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-[var(--color-border)] border-t-[var(--color-primary)]" aria-hidden="true" />
                <p className="mt-5 text-caption text-[var(--text-muted)]">Loading articles...</p>
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <p className="text-red-400 text-body">{error}</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.04] rounded-2xl border border-[var(--color-border)]">
                <p className="text-body text-[var(--text-muted)]">
                  No articles available yet. Check back later!
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white/[0.04] backdrop-blur-sm p-7 md:p-8 rounded-2xl border border-[var(--color-border)] hover:bg-white/[0.06] hover:border-green-500/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                      <h2 className="text-heading-2 text-white group-hover:text-[var(--color-primary-hover)] transition-colors">
                        {article.title}
                      </h2>
                      <span className="text-caption font-mono text-[var(--text-muted)] bg-white/[0.06] px-3 py-1.5 rounded-lg border border-[var(--color-border)] shrink-0">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-body text-[var(--text-body)] leading-relaxed">
                      {article.excerpt || article.content}
                    </p>
                    <div className="mt-6 flex items-center text-[var(--color-primary)] font-medium text-caption group-hover:translate-x-1 transition-transform cursor-pointer">
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </article>
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

export default Articles;
