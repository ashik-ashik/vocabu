import { LogInIcon, UserCheck } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/UseData";

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);

  const { user, userRole } = useAuth();
  const { payments } = useData();

  // ── Permission flags ──────────────────────────────────────────────────────
  const isAdmin     = userRole === "admin";
  const isModerator = userRole === "moderator";
  const isActivated = payments?.Status?.toLowerCase() === "activated";

  // Paid/activated moderator OR admin → full content access
  const hasContentAccess = isAdmin || (isModerator || isActivated);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-xs font-medium transition ${
      isActive ? "bg-white text-blue-700 shadow" : "text-white hover:bg-white/20"
    }`;

  // ── Link groups ───────────────────────────────────────────────────────────
  const contentLinks = (
    <>
      <NavLink to="/advance-words" className={linkClass} onClick={() => setOpen(false)}>Advance Words</NavLink>
      <NavLink to="/basic-words"   className={linkClass} onClick={() => setOpen(false)}>Basic Words</NavLink>
      <NavLink to="/phrases"       className={linkClass} onClick={() => setOpen(false)}>Phrases</NavLink>
      <NavLink to="/tense"         className={linkClass} onClick={() => setOpen(false)}>Tense</NavLink>
      <NavLink to="/dashboards" className={linkClass} onClick={() => setOpen(false)}>User Dash</NavLink>
    </>
  );

  const adminLinks = (
    <>
      <NavLink to="/dashboard"  className={linkClass} onClick={() => setOpen(false)}>Admin Dashboard</NavLink>
    </>
  );

  // Always visible to everyone
  const publicLinks = (
    <>
      <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
      <NavLink to="/vocabulary" className={linkClass} onClick={() => setOpen(false)}>Vocabulary</NavLink>
    </>
  );

  const authLink = (
    <NavLink to="/login" className={linkClass} onClick={() => setOpen(false)}>
      {user?.email ? <UserCheck size={16} /> : <LogInIcon size={16} />}
    </NavLink>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-blue-700 to-indigo-800 text-white shadow-md sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-4 py-1 flex items-center justify-between">

        {/* LOGO */}
        <div className="text-lg font-bold tracking-tight">
          <a href="/">
            <img src="https://i.postimg.cc/jS2nMzNq/ASH-Dictionary.png" alt="Logo" className="logo" />
          </a>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center text-sm gap-1">
          {publicLinks}
          {hasContentAccess && contentLinks}
          {isAdmin && adminLinks}
          {authLink}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">☰</button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2 flex flex-col">
          {publicLinks}
          {hasContentAccess && contentLinks}
          {isAdmin && adminLinks}
          {authLink}
        </div>
      )}
    </nav>
  );
}