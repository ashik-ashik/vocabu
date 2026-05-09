import React, { useMemo, useState, useEffect } from "react";
import {
  Search,
  Volume2,
  BookOpen,
  Sparkles,
  Languages,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import WordCard from "./WordCard";
import useData from "../hooks/UseData";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function VocabularyCollection() {
  const { basicWordList, vocabularyWordList } = useData();
  const {userRole} = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
   const [voices, setVoices] = useState([]);


  

  const wordsPerPage = 30;

  // Combine + Randomize Words (Fisher-Yates Shuffle)
  const totalWords = useMemo(() => {
    const words = [...basicWordList, ...vocabularyWordList];

    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(0.549 * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }

    return words;
  }, [basicWordList, vocabularyWordList]);



  
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
  

  // Search by word + synonym + antonym
  const filteredWords = useMemo(() => {
    const keyword = searchTerm.toLowerCase().trim();

    if (!keyword) return totalWords;

    return totalWords.filter((item) => {
      const wordMatch = item.word?.toLowerCase().includes(keyword);

      const synonymMatch = item.synonym
        ?.toLowerCase()
        .includes(keyword);

      const antonymMatch = item.antonym
        ?.toLowerCase()
        .includes(keyword);

      return wordMatch || synonymMatch || antonymMatch;
    });
  }, [searchTerm, totalWords]);

   const visibleWords =
  userRole === "admin" 
    ? filteredWords
    : userRole === "moderator" ? filteredWords :
    userRole === "viewer" ? filteredWords.slice(0, 10) : filteredWords.slice(0, 6);

  // Pagination
  const totalPages = Math.ceil(visibleWords.length / wordsPerPage);
  const startIndex = (currentPage - 1) * wordsPerPage;
  const currentWords = visibleWords.slice(
    startIndex,
    startIndex + wordsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-black border-b">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gray-800 shadow text-green-500 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles size={18} />
                Smart Vocabulary Learning
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-300 leading-tight">
                Learn Words with
                <span className="text-green-500"> Meaning, Sound</span> & Usage
              </h1>

              <p className="text-gray-300 mt-4 text-lg leading-relaxed">
                Search vocabulary by word, synonym, or antonym and improve your
                English communication professionally.
              </p>

              {/* Pronunciation + Voice Selector */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button
                  onClick={() => speakWord("Vocabulary Learning")}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition"
                >
                  <Volume2 size={20} />
                  Hear Pronunciation
                </button>

                <div className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
                  <Languages size={20} className="text-green-600" />

                  <div className="flex flex-col">
                    <span className="text-xs text-gray-300 font-medium">
                      Change Voice
                    </span>

                    <select
                        className="text-gray-100 bg-gray-700 text-sm outline-none cursor-pointer w-[250px]"
                        value={selectedVoiceIndex}
                        onChange={(e) => setSelectedVoiceIndex(Number(e.target.value))}
                    >
                        {voices
                        .filter((v) => v.lang.includes("en"))
                        .map((voice, i) => (
                            <option key={voice.name} value={i} className="text-white">
                            {voice?.name?.split(" ")[1]}
                            </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stats */}
            <div className="bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-xl p-5 text-center shadow-sm">
                  <BookOpen className="mx-auto text-green-600 mb-2" />
                  <h3 className="text-2xl font-bold text-gray-400">
                    {totalWords.length}
                  </h3>
                  <p className="text-gray-200 text-sm">Total Words</p>
                </div>

                <div className="bg-gray-900 rounded-xl p-5 text-center shadow-sm">
                  <Volume2 className="mx-auto text-green-600 mb-2" />
                  <h3 className="text-2xl font-bold text-gray-400">Speech</h3>
                  <p className="text-gray-200 text-sm">Pronunciation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-10">
            <div className="max-w-2xl mx-auto">
              <div className=" border border-gray-800 shadow-md rounded-2xl">
                <div className="relative flex items-center">
                  <Search
                    className="absolute left-4 text-green-600"
                    size={20}
                  />

                  <input
                    type="text"
                    placeholder="Search word, synonym, antonym..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-11 pr-24 py-3 rounded-xl bg-gray-900 border border-transparent focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none text-gray-300 text-sm"
                  />

                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setCurrentPage(1);
                      }}
                      className="absolute right-2 px-4 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <p className="text-center text-xs text-gray-500 mt-2">
                Quickly search your vocabulary collection
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Word Cards */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        {currentWords.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentWords.map((item, index) => (
                <WordCard
                  key={item.word + index}
                  item={item}
                  speakWord={speakWord}
                />
              ))}
            </div>



            {/* prizing */}
            {/* Pricing Section */}
            {
              userRole !== "admin" &&
            <section className="bg-black border-t border-gray-800">
              <div className="max-w-7xl mx-auto px-4 py-16">

                {/* Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-gray-800 text-green-500 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Sparkles size={16} />
                    Limited Time Offer
                  </div>
                  <h2 className="text-4xl font-bold text-gray-300">
                    Simple, <span className="text-green-500">Affordable</span> Pricing
                  </h2>
                  <p className="text-gray-400 mt-3 text-lg">
                    Unlock your full vocabulary potential — no hidden fees.
                  </p>
                </div>

                {/* Single Pricing Card */}
                <div className="max-w-sm mx-auto relative">

                  {/* Popular Banner */}
                  <div className="bg-green-600 text-white text-sm font-bold text-center py-2 rounded-t-2xl tracking-wide">
                    🔥 Most Popular — 40% Off
                  </div>

                  {/* 40% OFF Ribbon */}
                  <div className="absolute top-12 -right-3 z-10 overflow-hidden">
                    <div className="bg-red-500 text-white text-xs font-bold px-6 py-1 rotate-45 translate-x-4 translate-y-1 shadow-md">
                      40% OFF
                    </div>
                  </div>

                  {/* Card */}
                  <div className="bg-gray-900 border-2 border-green-600 rounded-b-2xl p-8 shadow-xl">

                    {/* Icon + Plan Name */}
                    <div className="bg-green-950 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <BookOpen size={22} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-200">Premium Plan</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-5">
                      Full access to all vocabulary words, pronunciation & more.
                    </p>

                    {/* Pricing */}
                    <div className="flex items-end gap-2 mb-1">
                      <span className="text-gray-500 line-through text-lg font-medium">৳250</span>
                      <span className="text-green-400 text-5xl font-extrabold leading-none">150</span>
                      <span className="text-green-400 text-xl font-bold mb-1">৳</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3">one time pay</p>

                    {/* Savings Chip */}
                    <div className="inline-block bg-green-950 border border-green-800 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-6">
                      ✦ You save ৳100 (40% discount)
                    </div>

                    <hr className="border-gray-700 mb-6" />

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {[
                        "Unlimited vocabulary words",
                        "Unlimited Phrases and Idioms",
                        "Unlimited Group Verbs Meaning",
                        "Native pronunciation (all voices)",
                        "Synonym & antonym search",
                        "Priority support",
                        "New words added weekly",
                      ].map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                          <span className="w-5 h-5 bg-green-950 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 stroke-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={3}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button — routes to /pricing if logged in, else /login */}
                    
                    <Link to={userRole ? "/pricing" : "/login"}
                      className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-4 rounded-xl transition text-base"
                    >
                      {userRole ? "Get Premium — ৳150/mo" : "Login to Get Premium"}
                    </Link>

                    {/* Guarantee */}
                    <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-1">
                      <svg className="w-3.5 h-3.5 stroke-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      30-day money-back guarantee
                    </p>
                  </div>
                </div>
              </div>
            </section>
            }
            {/* prizing */}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-14 flex-wrap">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border bg-white shadow-sm hover:shadow-md disabled:opacity-50"
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md">
                Page {currentPage} of {totalPages || 1}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border bg-white shadow-sm hover:shadow-md disabled:opacity-50"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">
              No matching words found
            </h2>
            <p className="text-gray-500 mt-2">
              Try another word, synonym, or antonym.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}