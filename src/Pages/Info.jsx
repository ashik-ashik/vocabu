import React from "react";
import { FaCode, FaDatabase, FaUser, FaFolderOpen } from "react-icons/fa";
import usePageTitle from "../hooks/usePageTitle";
import { BiEnvelope } from "react-icons/bi";
import { MapIcon } from "lucide-react";

export default function Info() {
  usePageTitle("Info | ASH English Learning");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* 🔷 HERO BANNER */}
      <div className="relative w-full h-[420px] md:h-[500px]">

        {/* Background Image */}
        <img
          src="https://i.postimg.cc/prYV9dWT/ash.png"
          alt="Developer"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* 🔥 Developer Info Overlay */}
        <div className="absolute inset-0 flex items-end justify-center px-4 pb-10">
          <div className="text-center text-white max-w-xl">

            <h1 className="text-3xl md:text-5xl font-bold">
              Md. Ashik Ali
            </h1>

            <p className="mt-2 text-lg text-gray-200">
              Social Work Graduate (BSS & MSS) • PUST
            </p>

            <p className="mt-1 text-gray-300">
              Frontend Developer • React Enthusiast • Prompt Engineer
            </p>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="px-3 py-1 text-xs bg-blue-500/20 border border-blue-400 rounded-full">
                React
              </span>
              <span className="px-3 py-1 text-xs bg-indigo-500/20 border border-indigo-400 rounded-full">
                Firebase
              </span>
              <span className="px-3 py-1 text-xs bg-purple-500/20 border border-purple-400 rounded-full">
                Google Sheets API
              </span>
              <span className="px-3 py-1 text-xs bg-green-500/20 border border-green-400 rounded-full">
                Tailwind
              </span>
            </div>

            {/* Contact */}
            <div className="mt-4 text-sm text-gray-300 space-y-1">
              <p className="flex justify-center items-center gap-2">
                <BiEnvelope /> ashikali0204@gmail.com
              </p>
              <p className="flex justify-center items-center gap-2">
                <MapIcon size={18} /> Bangladesh
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 🔷 CONTENT SECTION */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            ASH English Learning
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            A modern vocabulary learning platform built with React & Google Sheets
          </p>
        </div>

        {/* Project Overview */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <FaCode /> Project Overview
          </h2>

          <p className="text-gray-600 dark:text-gray-300">
            This application helps users learn English vocabulary, idioms,
            phrases, and grammar. It uses Google Sheets as database and
            Firebase for authentication.
          </p>
        </div>

        {/* Dependencies */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">📦 Dependencies</h2>

          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`{
  "react": "^18",
  "react-router-dom": "^6",
  "lucide-react": "^0.x",
  "react-hot-toast": "^2.x",
  "react-icons": "^5.x",
  "axios": "^1.x"
}`}
          </pre>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <FaDatabase /> Tech Stack
          </h2>

          <pre className="bg-gray-900 text-blue-300 p-4 rounded-xl overflow-x-auto text-sm">
{`Frontend     : React (Vite)
Routing      : React Router DOM
Styling      : Tailwind CSS
Database     : Google Sheets
Backend      : Google Apps Script
Auth         : Firebase
`}
          </pre>
        </div>

        {/* Project Structure */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <FaFolderOpen /> Project Structure
          </h2>

          <pre className="bg-gray-900 text-gray-200 p-4 rounded-xl overflow-x-auto text-sm">
{`src/
 ├── components/
 ├── pages/
 │   ├── Home.jsx
 │   ├── Vocabulary.jsx
 │   ├── Dashboard.jsx
 │   └── Info.jsx
 ├── hooks/
 ├── context/
 ├── routes/
 └── App.jsx`}
          </pre>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">🚀 Key Features</h2>

          <pre className="bg-gray-900 text-green-300 p-4 rounded-xl overflow-x-auto text-sm">
{`✔ Vocabulary Learning
✔ Google Voice 🔊
✔ Idioms & Phrases
✔ Tense Learning
✔ Admin Dashboard
✔ Private Routes
✔ Google Sheets Database`}
          </pre>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ASH English Learning
        </div>

      </div>
    </div>
  );
}