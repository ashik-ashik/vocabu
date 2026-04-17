import React, { useMemo } from "react";
import useData from "../hooks/UseData";

// simple date hook
const useDate = () => new Date();

export default function Overview() {
  const today = useDate();

  const { vocabularyWordList } = useData();

  // sort by inserted_date (old → new)
  const sortedWords = useMemo(() => {
    if (!Array.isArray(vocabularyWordList)) return [];

    return [...vocabularyWordList]
      .filter((w) => w?.inserted_date)
      .sort(
        (a, b) =>
          new Date(a.inserted_date) - new Date(b.inserted_date)
      );
  }, [vocabularyWordList]);

  // analytics
  const analytics = useMemo(() => {
    if (sortedWords.length === 0) {
      return {
        total: 0,
        avgGap: 0,
        status: "no-data",
        message: "Start adding words to see your learning pattern.",
        color: "text-gray-500",
      };
    }

    const dates = sortedWords
      .map((w) => new Date(w.inserted_date))
      .filter((d) => !isNaN(d));

    let totalGap = 0;
    let gapCount = 0;

    for (let i = 1; i < dates.length; i++) {
      const diff =
        (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
      totalGap += diff;
      gapCount++;
    }

    const avgGap = gapCount ? totalGap / gapCount : 0;

    let status = "regular";
    let message = "";
    let color = "";

    if (avgGap <= 1.5) {
      status = "super-regular";
      message = "🔥 Excellent! You are learning words daily.";
      color = "text-green-600";
    } else if (avgGap <= 3) {
      status = "regular";
      message = "👍 Good consistency. Keep adding daily words.";
      color = "text-blue-600";
    } else if (avgGap <= 7) {
      status = "irregular";
      message = "⚠️ Irregular learning pattern. Try daily practice.";
      color = "text-yellow-600";
    } else {
      status = "inactive";
      message = "🚨 You are inactive. Restart your learning today!";
      color = "text-red-600";
    }

    return {
      total: sortedWords.length,
      avgGap: avgGap.toFixed(1),
      status,
      message,
      color,
    };
  }, [sortedWords]);

  // 🧠 CRAZY FEATURE: last activity + reminder system
  const lastActivity = useMemo(() => {
    if (sortedWords.length === 0) return null;

    const lastWord = sortedWords[sortedWords.length - 1];
    const lastDate = new Date(lastWord.inserted_date);

    const diffDays = Math.floor(
      (today - lastDate) / (1000 * 60 * 60 * 24)
    );

    let reminder = "";

    if (diffDays === 0) {
      reminder = "🔥 You added a word today. Keep the streak!";
    } else if (diffDays === 1) {
      reminder = "👍 You missed 1 day. Add a new word today!";
    } else if (diffDays <= 3) {
      reminder = "⚡ You're slowing down. Revise and add words!";
    } else {
      reminder = "🚨 Long gap detected! Restart your learning now!";
    }

    return {
      word: lastWord.word,
      date: lastDate.toDateString(),
      diffDays,
      reminder,
    };
  }, [sortedWords, today]);

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Learning Overview
        </h1>
        <p className="text-gray-500 text-sm">
          Smart analysis based on your vocabulary activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-2 md:gap-4">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Total Words</h2>
          <p className="text-2xl font-bold text-blue-600">
            {analytics.total}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Avg Learning Gap</h2>
          <p className="text-2xl font-bold text-indigo-600">
            {analytics.avgGap} days
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-sm text-gray-500">Status</h2>
          <p className={`text-lg font-bold ${analytics.color}`}>
            {analytics.status}
          </p>
        </div>

      </div>

      {/* MESSAGE */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl shadow">
        <p className={`font-medium ${analytics.color}`}>
          {analytics.message}
        </p>
      </div>

      {/* 🧠 CRAZY SMART REMINDER CARD */}
      {lastActivity && (
        <div className="bg-white p-5 rounded-xl shadow border-l-4 border-indigo-500">

          <h3 className="font-semibold text-gray-800">
            🧠 Smart Learning Tracker
          </h3>

          <p className="text-gray-600 mt-1">
            Last word:{" "}
            <span className="font-bold">{lastActivity.word}</span>
          </p>

          <p className="text-gray-500 text-sm">
            Added on: {lastActivity.date} ({lastActivity.diffDays} days ago)
          </p>

          <p className="mt-3 text-blue-600 font-medium">
            {lastActivity.reminder}
          </p>

        </div>
      )}

    </div>
  );
}