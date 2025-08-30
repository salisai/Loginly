// src/pages/ArticlePage.jsx
import React from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer"



const ArticlePage = () => {
  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-16 mb-20 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          The Future of AI in Everyday Life
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Artificial Intelligence is rapidly shaping our daily experiences —
          from smart assistants that help us manage schedules, to recommendation
          systems that curate our entertainment. In the coming years, we can
          expect even more personalized, efficient, and intelligent tools
          seamlessly integrated into our lives.
        </p>
      </div>

      <Footer />
    </>
  );
};

export default ArticlePage;
