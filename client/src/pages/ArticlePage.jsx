import React from "react";

const Articles = () => {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
        My Articles
      </h1>

      <article className="bg-white p-6 rounded-xl shadow border mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          How I Built Loginly
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Bro this is where you drop your article content…
        </p>
      </article>

      <article className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-2xl font-semibold mb-3 text-gray-900">
          My ML Journey
        </h2>
        <p className="text-gray-700 leading-relaxed">
          This is your second article…
        </p>
      </article>
    </div>
  );
};

export default Articles;
