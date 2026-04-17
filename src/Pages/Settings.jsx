import React from "react";

export default function Settings() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <div className="bg-white shadow rounded-2xl p-10">
        <h1 className="text-3xl font-bold mb-3">Settings</h1>

        <p className="text-gray-500 mb-6">
          This feature is currently under development.
        </p>

        <div className="text-5xl mb-4">⚙️</div>

        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
          Upcoming Feature:
          <ul className="mt-2 text-sm space-y-1">
            <li>• Theme customization (dark/light)</li>
            <li>• Account security settings</li>
            <li>• Data export (Excel / CSV)</li>
            <li>• Notification controls</li>
          </ul>
        </div>
      </div>
    </div>
  );
}