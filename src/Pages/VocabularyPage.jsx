import React, { useState, useMemo, useEffect } from "react";
import useData from "../hooks/UseData";
import WordCard from "./WordCard";
import usePageTitle from "../hooks/usePageTitle";

export default function Vocabulary() {
  const [search, setSearch] = useState("");
 const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
 const [voices, setVoices] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
  const { vocabularyWordList = [], loading, error } = useData();

  // set page title
  usePageTitle("ASH Vocabulary Dictionary | Learn Words, Meanings & Synonyms");

  // =========================
  // SAFE SEARCH FILTER
  // =========================
  const filteredWords = useMemo(() => {
  if (!Array.isArray(vocabularyWordList)) return [];

  const query = search.toLowerCase().trim();

  if (!query) return [...vocabularyWordList].reverse()

  return vocabularyWordList.filter((item) => {
    if (!item) return false;

    const wordMatch = item.word?.toLowerCase().includes(query);
    const banglaMatch = item.bangla?.toLowerCase().includes(query);
    const definitionMatch = item.definition?.toLowerCase().includes(query);

    const synonymMatch = Array.isArray(item.synonyms)
      ? item.synonyms.some((s) =>
          s?.toLowerCase().includes(query)
        )
      : false;

    const antonymMatch = Array.isArray(item.antonyms)
      ? item.antonyms.some((a) =>
          a?.toLowerCase().includes(query)
        )
      : false;

    return (
      wordMatch ||
      banglaMatch ||
      definitionMatch ||
      synonymMatch ||
      antonymMatch
    );
  });
}, [search, vocabularyWordList]);




// ==============================================================
  // Pagination logic
// ==============================================================
const ITEMS_PER_PAGE = 50;

// pagination slice
const paginatedWords = useMemo(() => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  return filteredWords.slice(start, end);
}, [filteredWords, currentPage]);

// total pages
const totalPages = Math.ceil(filteredWords.length / ITEMS_PER_PAGE);

// smart pagination generator
const getPagination = (current, total) => {
  const delta = 1;
  const range = [];

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  const pages = [];
  let last;

  for (let i of range) {
    if (last && i - last !== 1) {
      pages.push("...");
    }
    pages.push(i);
    last = i;
  }

  return pages;
};

// pagination array
const pagination = getPagination(currentPage, totalPages);


// ==============================================================


// Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Speak function
  const speakWord = (text, voiceIndex = selectedVoiceIndex) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const availableVoices = speechSynthesis.getVoices();

    const englishVoices = availableVoices.filter((v) =>
      v.lang.includes("en")
    );

    if (englishVoices.length > 0) {
      utterance.voice =
        englishVoices[voiceIndex % englishVoices.length];
    }

    utterance.lang = "en-US";
    utterance.rate = 0.9;

    speechSynthesis.speak(utterance);
  };



  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-sm">Loading vocabulary...</p>
      </div>
    );
  }

  // =========================
  // ERROR UI
  // =========================
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-red-500 text-center">
          <h2 className="text-xl font-bold">Failed to load data</h2>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO HEADER */}
    <header className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white shadow-lg">
    <div className="max-w-6xl mx-auto px-2 md:px-4 py-12">

        {/* TOP SECTION (Brand + Description) */}
        <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            📘 Vocabulary Master
        </h1>

        <p className="text-blue-100 mt-3 text-sm md:text-lg max-w-2xl mx-auto">
            Explore English vocabulary with Bangla meanings, synonyms, antonyms, examples, and instant pronunciation — all in one place.
        </p>
        </div>

        {/* CONTROL PANEL CARD */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-5 md:p-6 space-y-5">

        {/* SEARCH */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">

            {/* SMART SEARCH BOX */}
            <div className="flex-1">
            <div className="flex items-center bg-white/95 text-gray-700 rounded-full px-4 py-3 shadow-md focus-within:ring-2 focus-within:ring-yellow-300 transition">

                <span className="text-gray-400 mr-2">🔍</span>

                <input
                type="text"
                placeholder="Search word, meaning, synonym..."
                className="w-full outline-none bg-transparent text-sm md:text-base"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />

                {search && (
                <button
                    onClick={() => setSearch("")}
                    className="text-gray-400 hover:text-red-500 text-lg ml-2 transition"
                    title="Clear search"
                >
                    ✕
                </button>
                )}
            </div>

            {/* Helper text */}
            <p className="text-xs text-blue-100 mt-2 ml-2">
                Try: “abundant”, “happy”, or Bangla meaning
            </p>
            </div>

            
        </div>

        {/* OPTIONAL INFO STRIP */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-blue-100 pt-2 border-t border-white/10">
            <span>⚡ Fast Search</span>
            <span>🔊 Instant Pronunciation</span>
            <span>📚 Synonyms & Antonyms</span>
            <span>🌐 Bangla Meaning Support</span>
        </div>

        {/* VOICE SELECTOR */}
            <div className="mt-3 flex items-center gap-3 justify-end">
            <span className="text-blue-100 text-sm whitespace-nowrap ">
                Voice:
            </span>

            <select
                className="text-gray-900 text-sm outline-none cursor-pointer w-[250px]"
                value={selectedVoiceIndex}
                onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
            >
                {voices
                .filter((v) => v.lang.includes("en"))
                .map((voice, i) => (
                    <option key={voice.name} value={i} className="text-black">
                    {voice.name}
                    </option>
                ))}
            </select>
            </div>
        </div>
    </div>
    </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Learn Words, Meanings & Improve Vocabulary
        </h2>
        <p className="text-gray-600 mt-2">
          Search, explore and learn English vocabulary with Bangla meaning, synonyms and examples.
        </p>
      </section>

      {/* CARDS */}
      <main className="max-w-6xl mx-auto px-2 md:px-4 pb-10 grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-4">

        {paginatedWords?.map((item) => (
          <WordCard
            key={item.id}
            item={item}
            speakWord={speakWord}
          />
        ))}

      </main>

      {/* EMPTY STATE (ONLY WHEN NO DATA AFTER SEARCH) */}
      {filteredWords.length === 0 && vocabularyWordList.length > 0 && (
        <p className="text-center text-gray-500 pb-10">
          No vocabulary found.
        </p>
      )}

      {/* NO DATA STATE */}
      {vocabularyWordList.length === 0 && !loading && (
        <p className="text-center text-gray-500 pb-10">
          No vocabulary data available.
        </p>
      )}


      {/* ========================================================================= */}
          <div className="py-4 flex items-center justify-center gap-1 mt-6 flex-wrap">

          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs rounded bg-gray-100 disabled:opacity-40"
          >
            Prev
          </button>

          {/* Pages */}
          {pagination.map((item, index) => (
            <button
              key={index}
              onClick={() => typeof item === "number" && setCurrentPage(item)}
              className={`px-3 py-1 text-xs rounded ${
                currentPage === item
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              disabled={item === "..."}
            >
              {item}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-xs rounded bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>

        </div>
      {/* ========================================================================= */}

    </div>
  );
}