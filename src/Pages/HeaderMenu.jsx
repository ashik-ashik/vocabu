import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive}) =>
    `px-4 py-2 rounded-full text-sm font-medium transition ${
      isActive
        ? "bg-white text-blue-700 shadow"
        : "text-white hover:bg-white/20"
    }`;

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 text-white shadow-md sticky top-0 z-50">
      
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-lg font-bold tracking-tight">
          📘 Vocabulary App
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>
        </div>
      )}
    </nav>
  );
}