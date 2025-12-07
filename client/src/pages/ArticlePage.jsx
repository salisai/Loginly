import React, { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 flex flex-col items-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#101828]" />
        <p className="mt-4 text-gray-600">Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 text-center">
          My Articles
        </h1>
        <p className="text-center text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
        My Articles
      </h1>

      {articles.length === 0 ? (
        <p className="text-center text-gray-600">
          No articles available yet. Check back later!
        </p>
      ) : (
        articles.map((article) => (
          <article
            key={article.id}
            className="bg-white p-6 rounded-xl shadow border mb-8"
          >
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">
              {article.title}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {article.excerpt || article.content}
            </p>
          </article>
        ))
      )}
    </div>
  );
};

export default Articles;
