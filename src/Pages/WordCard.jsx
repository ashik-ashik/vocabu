import React, { useState } from "react";
import { Volume2, CheckCircle2, Circle } from "lucide-react";
import useData from "../hooks/UseData";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const APPS_SCRIPT_URL = import.meta.env.VITE_PRIZING_DETAILS_POST_API;

// ─── Component ────────────────────────────────────────────────────────────────
export default function WordCard({ item, speakWord }) {
  const { payments, setPayments } = useData();

  const userEmail = payments?.Email;

  // stored read words
  const readWords = payments?.["Read Words"]
    ? String(payments["Read Words"])
        .split(",")
        .map((id) => id.trim())
    : [];

  // check locally if already read
  const alreadyRead = readWords.includes(String(item?.id));

  const [checked, setChecked] = useState(alreadyRead);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  const otherForms = item.other_part_speech
    ? item.other_part_speech.split(",").map((p) => {
        const [key, val] = p.trim().split(":");
        return { key: key?.trim(), val: val?.trim() };
      })
    : [];

  // ─── Google Sheets sync ───────────────────────────────────────────────────────
  async function markWordAsRead(email, wordId) {
    const body = new URLSearchParams({
      action: "ReadUpdate",
      category: "Words",
      email,
      wordId: String(wordId),
    });

    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    return response.json();
  }

  const handleCheck = async () => {
    if (checked || syncing) return;

    setSyncing(true);
    setSyncError(null);

    try {
      await markWordAsRead(userEmail, item.id);

      // update local state instantly
      const updatedReadWords = [...readWords, String(item.id)];

      setPayments((prev) => ({
        ...prev,
        "Read Words": updatedReadWords.join(","),
      }));

      setChecked(true);
    } catch (err) {
      console.error(err);
      setSyncError("Sync failed — try again");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div
      className="bg-[#13161e] rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        fontFamily: "'Inter', sans-serif",
        border: checked
          ? "1.5px solid #22c55e"
          : "1px solid #1e2330",
        boxShadow: checked ? "0 0 0 1px #16a34a33" : "none",
      }}
    >
      {/* TOP — word + meta */}
      <div className="px-5 pt-5 pb-4 border-b border-[#1e2330]">
        <div className="flex items-start justify-between mb-2">
          {/* Word + speaker */}
          <div className="flex items-start gap-3">
            <h2 className="text-xl grid grid-col-1 gap-0 font-medium text-slate-200 capitalize body-font">
              {item?.word?.split(":")[0]?.trim()}{" "}
              <span className="text-sm text-blue-500">
                {item?.word?.split(":")[1]?.trim()}
              </span>
            </h2>

            <button
              onClick={() => speakWord(item?.word?.split(":")[0])}
              className="text-gray-400 hover:text-gray-300 transition mt-2"
            >
              <Volume2 size={16} />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] text-gray-400 bg-[#0a0c10] border border-[#1e2330] rounded-full px-2.5 py-1 italic">
              id: {item?.id}
            </span>

            {/* Read checkbox */}
            <button
              onClick={handleCheck}
              disabled={checked || syncing}
              title={checked ? "Marked as read" : "Mark as read"}
              className="flex items-center gap-1.5 transition-opacity disabled:opacity-60"
              style={{ cursor: checked ? "default" : "pointer" }}
            >
              {syncing ? (
                <svg
                  className="animate-spin"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth={2}
                >
                  <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
              ) : checked ? (
                <CheckCircle2 size={18} className="text-green-500" />
              ) : (
                <Circle
                  size={18}
                  className="text-slate-600 hover:text-slate-400"
                />
              )}
            </button>
          </div>
        </div>

        {/* Read badge / error */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-300">
              Added: {item?.inserted_date || item?.date}
            </span>
          </div>

          {checked && (
            <span className="text-[10px] font-medium tracking-widest uppercase text-green-500 bg-[#0c1f17] border border-[#0f3a23] rounded-full px-2.5 py-0.5">
              ✓ Read
            </span>
          )}

          {syncError && (
            <span className="text-[10px] text-red-400">
              {syncError}
            </span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="px-5 py-4 flex flex-col gap-3.5">
        {/* Definition */}
        <div className="bg-[#0a0c10] border border-[#1e2330] border-l-[3px] border-l-blue-600 rounded-r-xl px-4 py-3.5">
          <p className="text-[10.5px] font-medium tracking-widest uppercase text-blue-500 mb-1.5">
            Definition
          </p>

          <p
            className="text-[14.5px] text-slate-200 leading-[1.75] italic"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {item.definition?.trim().charAt(0).toUpperCase() +
              item.definition.trim().slice(1)}
          </p>

          {item.bangla && (
            <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-[#1e2330]">
              <span className="text-[10.5px] font-medium tracking-widest uppercase text-slate-300 flex-shrink-0">
                Bangla
              </span>

              <span className="text-[13px] text-slate-400 leading-relaxed">
                {item.bangla}
              </span>
            </div>
          )}
        </div>

        {/* Other forms */}
        {otherForms.length > 0 && (
          <div>
            <p className="text-[10.5px] font-medium tracking-widest uppercase text-slate-500 mb-2">
              Other forms
            </p>

            <div className="flex flex-wrap gap-1.5">
              {otherForms.map(({ key, val }, i) => (
                <button
                  key={i}
                  onClick={() => speakWord(val)}
                  className="text-[11.5px] px-2.5 py-1 bg-[#0a0c10] capitalize border border-[#1e2330] hover:border-[#3b4258] rounded-lg text-slate-500 hover:text-slate-400 transition-colors"
                >
                  <span className="text-[10.5px] text-slate-600">
                    {key}:{" "}
                  </span>
                  {val}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Synonyms + Antonyms */}
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-[#0a0c10] border border-[#1e2330] rounded-xl px-3.5 py-3">
            <p className="text-[10.5px] font-medium tracking-widest uppercase text-emerald-600 mb-2">
              Synonyms
            </p>

            <div className="flex flex-wrap gap-1.5">
              {item.synonyms?.map((syn) => (
                <button
                  key={syn}
                  onClick={() => speakWord(syn)}
                  className="text-[11.5px] px-2.5 py-1 rounded-full bg-[#0c1f17] border border-[#0f3a23] text-emerald-400 hover:text-emerald-300 hover:bg-[#0f2a1f] capitalize transition-colors"
                >
                  {syn}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0a0c10] border border-[#1e2330] rounded-xl px-3.5 py-3">
            <p className="text-[10.5px] font-medium tracking-widest uppercase text-red-700 mb-2">
              Antonyms
            </p>

            <div className="flex flex-wrap gap-1.5">
              {item.antonyms?.map((ant) => (
                <button
                  key={ant}
                  onClick={() => speakWord(ant)}
                  className="text-[11.5px] px-2.5 py-1 rounded-full bg-[#1f0c0c] border border-[#3a1515] text-red-400 hover:text-red-300 hover:bg-[#2a1010] capitalize transition-colors"
                >
                  {ant}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Example */}
        <div className="bg-[#0a0c10] border border-[#1e2330] rounded-xl px-4 py-3.5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />

            <span className="text-[10.5px] font-medium tracking-widest uppercase text-slate-500">
              Example sentence
            </span>
          </div>

          <p
            className="text-[14px] text-slate-200 leading-[1.75] italic before:content-['\201C'] before:text-[#334155] after:content-['\201D'] after:text-[#334155]"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {item.example}
          </p>
        </div>
      </div>
    </div>
  );
}