import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const menuClass = ({ isActive}) =>
    `block px-4 py-2 rounded-lg text-sm transition ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  const menuItems = (
    <div className="space-y-1">
      <NavLink to="/dashboard" end className={menuClass}>
        📊 Overview
      </NavLink>

      <NavLink to="/dashboard/add-word" className={menuClass}>
        ➕ Add Word
      </NavLink>

      <NavLink to="/dashboard/delete-word" className={menuClass}>
        📚 Delete Words
      </NavLink>

      <NavLink to="/dashboard/edit-word" className={menuClass}>
        ✏️ Edit Word
      </NavLink>

      <NavLink to="/dashboard/settings" className={menuClass}>
        ⚙️ Settings
      </NavLink>
      <NavLink to="/dashboard/info" className={menuClass}>
        ℹ️ Info
      </NavLink>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-blue-700 text-white flex items-center justify-between px-4 py-3 z-50">
        <h1 className="font-bold">Dashboard</h1>
        <button onClick={() => setOpen(!open)} className="text-2xl">
          ☰
        </button>
      </div>

      {/* SIDEBAR (DESKTOP) */}
      <aside className="hidden md:flex md:w-64 bg-white border-r flex-col">

        {/* Header */}
        <div className="p-4 border-b font-bold text-blue-700">
          📘 Admin Panel
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto p-3">
          {menuItems}
        </div>
      </aside>

      {/* MOBILE SIDEBAR */}
      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-64 bg-white h-full shadow-xl p-4 overflow-y-auto">
            <div className="mb-4 font-bold text-blue-700 flex justify-between items-center">
              Menu
              <button onClick={() => setOpen(false)}>✕</button>
            </div>
            <NavLink to="/" className={menuClass}>
              🏚 Home
            </NavLink>
            {menuItems}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-6 mt-14 md:mt-0 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}