import React, { useState, useMemo } from "react";
import useData from "../hooks/UseData";
import usePageTitle from "../hooks/usePageTitle";

export default function IdiomsPhrases() {
  const { idiomsPhrasesList, loading, error } = useData();
  usePageTitle("Learn Advance Phrases | ASH English Learning | Learn Words, Meanings & Synonyms");

  // ===== NEW STATE =====
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // ===== FILTERED DATA =====
  const filteredData = useMemo(() => {
    return idiomsPhrasesList?.reverse().filter((item) =>
      item.phrase
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [idiomsPhrasesList, searchTerm]);

  // ===== PAGINATION LOGIC =====
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const generatePagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-300 border-t-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-medium">
          Error loading idioms and phrases.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-10 py-6">

      {/* ===== Banner ===== */}
      <div className="mb-10 bg-orange-600 rounded-2xl shadow-sm px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Idioms & Phrases Learning Hub
        </h1>
        <p className="mt-3 text-white max-w-2xl mx-auto text-sm md:text-base">
          Improve your English communication skills by learning commonly used 
          idioms and phrases with clear meanings and real-life examples.
        </p>

        {/* ===== SEARCH INPUT ===== */}
        <div className="mt-10 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by phrase..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reset page
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
          />
        </div>
      </div>

      {/* ===== Cards Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData?.map((item, index) => (
          <div
            key={item.id || index}
            className="relative bg-white rounded-2xl border border-orange-200 shadow-sm hover:shadow-lg transition duration-300 p-5"
          >
            <span className="absolute top-4 right-4 text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
              #{item.id || index + 1}
            </span>

            <div className="mb-4">
              <h2 className="text-md md:text-lg font-bold text-gray-900 leading-snug tracking-tight">
                {item.phrase.trim().charAt(0).toUpperCase() +
                  item.phrase.trim().slice(1).toLowerCase()}
              </h2>
              <div className="w-[50%] h-[1px] bg-orange-400 mt-1 rounded-full"></div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-md border-l-4 border-orange-400">
                <p className="text-gray-700 font-medium">
                  Meaning (English)
                </p>
                <p className="text-gray-600 mt-1 text-sm">
                  {item.meanings_en?.trim().charAt(0).toUpperCase() +
                  item.meanings_en.trim().slice(1)}
                </p>
              </div>

              <div className="bg-gray-50 p-3 rounded-md border-l-4 border-orange-400">
                <p className="text-gray-700 font-medium">
                  Meaning (বাংলা)
                </p>
                <p className="text-gray-600 mt-1 text-xs">
                  {item.meanings_bn}
                </p>
              </div>
            </div>

            <div className="my-4 border-t border-gray-100"></div>

            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-700 italic leading-relaxed">
                💡 “{item.example}”
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="flex justify-center items-center mt-10 gap-2 text-sm">
        
        {/* Prev */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded-md hover:bg-gray-100"
        >
            &laquo;
        </button>

        {generatePagination().map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-2">...</span>
          ) : (
            <button
              key={i}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === page
                  ? "bg-orange-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(p + 1, totalPages))
          }
          className="px-3 py-1 border rounded-md hover:bg-gray-100"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}