import React from "react";
import useData from "../hooks/UseData";

export default function TenseComponent() {
  const { tenseList, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading tense data...
        </p>
      </div>
    );
  }

  if (!tenseList.length) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-gray-500 text-lg">
          No tense data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen py-10">
      {/* Page Header */}
      <header className="max-w-5xl mx-auto text-center mb-10 px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-3">
          English Tense Learning Guide
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Explore all English tenses with clear structures, usage rules, and
          practical examples in both English and Bangla. This guide helps you
          understand how sentences are formed and used in real-life contexts.
        </p>
      </header>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 space-y-8">
        {tenseList.map((item, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 space-y-5"
          >
            {/* Title */}
            <h2 className="text-2xl font-bold text-blue-600 border-b pb-2">
              {item.tense}
            </h2>

            {/* When Use & Identifier */}
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">
                  When to Use:
                </span>{" "}
                {item.when_use}
              </p>
              <p>
                <span className="font-semibold text-gray-900">
                  Identifier:
                </span>{" "}
                <span className="capitalize text-blue-600">
                  {item.identifier}
                </span>
              </p>
            </div>

            {/* Structures */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-xl border">
                <p className="font-semibold text-blue-700 mb-1">
                  Active Structure
                </p>
                <p className="text-gray-700">{item.structure_active}</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-xl border">
                <p className="font-semibold text-indigo-700 mb-1">
                  Passive Structure
                </p>
                <p className="text-gray-700">{item.structure_passive}</p>
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-10 text-sm">
              {/* Short Examples */}
              <div>
                <h3 className="text-lg font-semibold text-blue-800 text-center mb-4">
                  Short Examples
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <h4 className="font-bold mb-2 text-gray-800">
                      Active
                    </h4>
                    <p className="border-l-4 border-blue-500 pl-3">
                      {item.example_short_active_en}
                    </p>
                    <p className="border-l-4 border-blue-500 pl-3 mt-2 text-gray-600">
                      {item.example_short_active_bn}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl border">
                    <h4 className="font-bold mb-2 text-gray-800">
                      Passive
                    </h4>
                    <p className="border-l-4 border-blue-500 pl-3">
                      {item.example_short_passive_en}
                    </p>
                    <p className="border-l-4 border-blue-500 pl-3 mt-2 text-gray-600">
                      {item.example_short_passive_bn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Long Examples */}
              <div>
                <h3 className="text-lg font-semibold text-green-700 text-center mb-4">
                  Long Examples
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-xl border">
                    <h4 className="font-bold mb-2 text-gray-800">
                      Active
                    </h4>
                    <p className="border-l-4 border-green-500 pl-3">
                      {item.example_long_active_en}
                    </p>
                    <p className="border-l-4 border-green-500 pl-3 mt-2 text-gray-600">
                      {item.example_long_active_bn}
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-xl border">
                    <h4 className="font-bold mb-2 text-gray-800">
                      Passive
                    </h4>
                    <p className="border-l-4 border-green-500 pl-3">
                      {item.example_long_passive_en}
                    </p>
                    <p className="border-l-4 border-green-500 pl-3 mt-2 text-gray-600">
                      {item.example_long_passive_bn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
