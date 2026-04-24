import React from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaSearch, FaLock, FaGlobe } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            📘 Build Your Vocabulary Smarter Every Day
          </h1>

          <p className="text-lg text-white/90 mb-6">
            Learn English words, phrases, synonyms, antonyms and real-life examples in a simple and interactive way.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/vocabulary"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:scale-105 transition"
            >
              Explore Words
            </Link>

            <Link
              to="/login"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
            >
              Login to Start
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <Feature icon={<FaBookOpen />} title="Vocabulary Learning" desc="Rich English words with meanings" />
        <Feature icon={<FaSearch />} title="Smart Search" desc="Find words, synonyms easily" />
        <Feature icon={<FaLock />} title="Admin Control" desc="Secure dashboard access" />
        <Feature icon={<FaGlobe />} title="Bangla Support" desc="Easy Bangla meanings included" />
      </section>

      {/* WORD PREVIEW SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">📚 Sample Vocabulary Words</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <WordCard
            word="Resilient"
            type="Adjective"
            definition="Able to recover quickly from difficulties"
            bangla="সহনশীল / দ্রুত পুনরুদ্ধারক্ষম"
            synonyms="Strong, Tough, Flexible"
            antonyms="Weak, Fragile"
            example="She is very resilient in tough situations."
          />

          <WordCard
            word="Abundant"
            type="Adjective"
            definition="Existing in large quantities"
            bangla="প্রচুর"
            synonyms="Plenty, Ample, Overflowing"
            antonyms="Scarce, Limited"
            example="Food was abundant at the party."
          />
        </div>
      </section>

      {/* PHRASE SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">💬 Popular English Phrases</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <PhraseCard
            title="Catch-22"
            meaning="A difficult situation with no escape"
            bangla="জটিল সমস্যা যেখানে কোনো সমাধান নেই"
          />

          <PhraseCard
            title="Break the ice"
            meaning="Start a conversation in a social situation"
            bangla="আলাপ শুরু করা / সংকোচ ভাঙা"
          />

          <PhraseCard
            title="Beat one’s brains out"
            meaning="Work extremely hard to solve something"
            bangla="অত্যন্ত পরিশ্রম করে সমাধান করা"
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white py-14 text-center border-t">
        <h2 className="text-3xl font-bold mb-3">🚀 Start Learning Today</h2>
        <p className="text-gray-600 mb-6">
          Join now and unlock full vocabulary access with personalized learning.
        </p>

        <Link
          to="/login"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login with Google
        </Link>
      </section>

    </div>
  );
};

/* ================= COMPONENTS ================= */

const Feature = ({ icon, title, desc }) => (
  <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition text-center">
    <div className="text-2xl text-blue-600 mb-2 flex justify-center">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);

const WordCard = ({
  word,
  type,
  definition,
  bangla,
  synonyms,
  antonyms,
  example,
}) => (
  <div className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition">
    <h3 className="text-xl font-bold text-blue-600 flex items-center justify-between">
      {word}
      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{type}</span>
    </h3>

    <p className="mt-2 text-sm text-gray-700">
      <strong>Definition:</strong> {definition}
    </p>

    <p className="text-sm text-gray-700">
      <strong>Bangla:</strong> {bangla}
    </p>

    <hr className="my-3 border-dashed" />

    <p className="text-sm">
      <strong>Synonyms:</strong> {synonyms}
    </p>

    <p className="text-sm">
      <strong>Antonyms:</strong> {antonyms}
    </p>

    <p className="text-sm mt-2 italic text-gray-600">
      💡 {example}
    </p>
  </div>
);

const PhraseCard = ({ title, meaning, bangla }) => (
  <div className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition">
    <h3 className="text-lg font-bold text-orange-500">{title}</h3>

    <p className="mt-2 text-sm">
      <strong>Meaning:</strong> {meaning}
    </p>

    <p className="text-sm text-gray-600 mt-1">
      <strong>Bangla:</strong> {bangla}
    </p>
  </div>
);

export default Home;