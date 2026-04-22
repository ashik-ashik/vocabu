import React from "react";
import { FaCode, FaDatabase, FaUser, FaFolderOpen } from "react-icons/fa";
import { SiReact, SiFirebase, SiTailwindcss } from "react-icons/si";
import usePageTitle from "../hooks/usePageTitle";
import { BiEnvelope } from "react-icons/bi";
import { MapIcon } from "lucide-react";

export default function Info() {
  usePageTitle("Info | ASH English Learning");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
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
          <h2 className="text-xl font-semibold mb-3">
            📦 Dependencies
          </h2>

          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
{`{
  "dependencies": {
    "react": "^18",
    "react-router-dom": "^6",
    "lucide-react": "^0.x",
    "react-hot-toast": "^2.x",
    "react-icons": "^5.x",
    "axios": "^1.x"
  }
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
Icons        : Lucide React + React Icons
Styling      : Tailwind CSS
Database     : Google Sheets
Backend      : Google Apps Script
Notifications: React Hot Toast
State Mgmt   : Context API
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
 │   ├── Idioms.jsx
 │   ├── Tense.jsx
 │   └── Dashboard.jsx
 │   └── Info.jsx
 │
 ├── hooks/
 │   └── usePageTitle.jsx
 │
 ├── context/
 │   └── DataCollectionProvider.jsx
 │
 ├── routes/
 │   └── useDataCollections.jsx
 │
 └── App.jsx
`}
          </pre>
        </div>


        {/* Environment */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">
            ⚙️ Environment Variables
          </h2>

          <pre className="bg-gray-900 text-yellow-300 p-4 rounded-xl overflow-x-auto text-sm">
{`VITE_READ_WORDS_API_KEY= YOUR WORDS COLLECTION URL
VITE_GOOGLE_SCRIPT_URL= YOUR SCRIPT URL
VITE_READ_TENSE_API_URL= YOUR COLLECTION API URL
`}
          </pre>
        </div>



        {/* Features */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-3">
            🚀 Key Features
          </h2>

          <pre className="bg-gray-900 text-green-300 p-4 rounded-xl overflow-x-auto text-sm">
{`✔ Vocabulary Learning
✔ Google Voice 🔊
✔ Idioms & Phrases
✔ Tense Learning
✔ Search Functionality
✔ Admin Dashboard
✔ Private Routes
✔ Google Sheets Database
✔ Responsive UI
`}
          </pre>
        </div>



        {/* Author */}
<div className="relative group">

  {/* Gradient Border */}
  <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-2xl shadow-xl overflow-hidden">

    {/* Background Glow */}
    <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>
    <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full"></div>

    {/* Header */}
    <h2 className="text-xl font-semibold flex items-center gap-2 mb-5 relative z-10">
      <FaUser className="text-blue-500" />
      About Developer
    </h2>

    {/* Content */}
    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">

      {/* Avatar */}
      <div className="relative">

        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 blur-md scale-110"></div>

        <img
          src="https://i.postimg.cc/prYV9dWT/ash.png"
          alt="Developer"
          className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-lg relative"
        />

        {/* Status Dot */}
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>

      </div>


      {/* Info */}
      <div className="text-center md:text-left space-y-2">

        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Md. Ashik Ali
        </h3>

        <p className="text-sm text-blue-500 font-medium">
          Social Work Graduate (BSS & MSS) • PUST
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          Frontend Developer • React Enthusiast • Prompt Engineer
        </p>

        {/* Badge */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">

          <span className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
            React
          </span>

          <span className="px-3 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full">
            Firebase
          </span>

          <span className="px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
            Google Sheets API
          </span>

          <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
            Tailwind
          </span>

        </div>


        {/* Contact */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-3 space-y-1">
          <p className="flex items-center gap-x-2"><BiEnvelope size={20} /> ashikali0204@gmail.com</p>
          <p className="flex items-center gap-x-2"><MapIcon size={20} /> Bangladesh</p>
        </div>

      </div>

    </div>

  </div>

</div>


        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ASH English Learning
        </div>


      </div>
    </div>
  );
}