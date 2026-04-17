import React from "react";
import { FaCode, FaDatabase, FaUser } from "react-icons/fa";
import usePageTitle from "../hooks/usePageTitle";

export default function Info() {
     // set page title
      usePageTitle("Info | ASH Vocabulary Dictionary");
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Vocabulary Dictionary Web App
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            A modern vocabulary learning platform built with React & Google Sheets
          </p>
        </div>

        {/* Project Overview */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCode /> Project Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            This application helps users learn English vocabulary with meanings,
            Bangla translations, synonyms, antonyms, and examples. It uses Google Sheets
            as a lightweight database and Firebase for authentication.
          </p>
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-2">
          <h2 className="text-xl font-semibold">Key Features</h2>
          <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300 space-y-1">
            <li>Browse and search vocabulary words</li>
            <li>View definitions, Bangla meanings, synonyms, antonyms</li>
            <li>Admin dashboard for managing words</li>
            <li>Firebase Google Authentication</li>
            <li>Google Sheets as backend database</li>
            <li>Private route for admin access</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-2">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaDatabase /> Tech Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            ReactJS (Vite), Tailwind CSS, Firebase Authentication,
            Google Sheets API, Google Apps Script, React Router,
            Custom Hooks (Context API pattern)
          </p>
        </div>

        {/* Author Info */}
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg overflow-hidden">

                {/* Decorative background glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full"></div>

                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 relative title-font tracking-wide z-10">
                    <FaUser /> About the Developer
                </h2>

                {/* Avatar + Info Layout */}
                <div className="flex items-center gap-5 relative z-10">

                    {/* Avatar */}
                    <div className="relative">
                    {/* Gradient ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 blur-sm scale-110"></div>

                    {/* Image */}
                    <img
                        src="https://i.postimg.cc/prYV9dWT/ash.png"
                        alt="Developer"
                        className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-md relative"
                    />

                    {/* Online dot (optional stylish touch) */}
                    <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                    </div>

                    {/* Info */}
                    <div className="text-gray-600 dark:text-gray-300 space-y-1 body-font">
                    <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                        Md. Ashik Ali
                    </p>
                    <p>Social Work Graduate (BSS & MSS), PUST</p>
                    <p>Frontend Developer | React Enthusiast | Prompt Engineer</p>
                    <p>Email: ashikali0204@gmail.com</p>
                    <p>Location: Bangladesh</p>
                    </div>

                </div>
                </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm pt-4">
          © {new Date().getFullYear()} My Vocabulary Dictionary Web App. Built with React.
        </div>

      </div>
    </div>
  );
}