import React from "react";
import { Volume2 } from "lucide-react";

export default function WordCard({ item, speakWord }) {
  const otherForms = item.other_part_speech
    ? item.other_part_speech.split(",").map((p) => {
        const [key, val] = p.trim().split(":");
        return { key: key?.trim(), val: val?.trim() };
      })
    : [];

  return (
    <div className="bg-[#13161e] border border-[#1e2330] rounded-2xl overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* TOP — word + meta */}
      <div className="px-5 pt-5 pb-4 border-b border-[#1e2330]">
        <div className="flex items-center justify-between mb-2">
          <h2
            className="text-xl flex items-center gap-3 font-medium text-slate-200 capitalize body-font"
            
          >
            {item.word}
            <button
            onClick={() => speakWord(item.word)}
            className="text-gray-400 hover:text-gray-300 transition"
          >
            <Volume2 size={16} />
          </button>
          </h2>
          <span className="text-[10.5px] text-gray-400 bg-[#0a0c10] border border-[#1e2330] rounded-full px-2.5 py-1 italic">
            id: {item.id}
          </span>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-300">
              Added: {item.inserted_date || item.date}
            </span>
          </div>
          
        </div>
      </div>

      {/* BODY */}
      <div className="px-5 py-4 flex flex-col gap-3.5">

        {/* Definition block */}
        <div className="bg-[#0a0c10] border border-[#1e2330] border-l-[3px] border-l-blue-600 rounded-r-xl px-4 py-3.5">
          <p className="text-[10.5px] font-medium tracking-widest uppercase text-blue-500 mb-1.5">
            Definition
          </p>
          <p
            className="text-[14.5px] text-slate-300 leading-[1.75] italic"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {item.definition}
          </p>
          {item.bangla && (
            <div className="flex items-baseline gap-2 mt-3 pt-3 border-t border-[#1e2330]">
              <span className="text-[10.5px] font-medium tracking-widest uppercase text-slate-500 flex-shrink-0">
                Bangla
              </span>
              <span className="text-[13px] text-slate-400 leading-relaxed">{item.bangla}</span>
            </div>
          )}
        </div>

        {/* Other word forms */}
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
                  className="text-[11.5px] px-2.5 py-1 bg-[#0a0c10] border border-[#1e2330] hover:border-[#3b4258] rounded-lg text-slate-500 hover:text-slate-400 transition-colors"
                >
                  <span className="text-[10.5px] text-slate-600">{key}: </span>{val}
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
            className="text-[14px] text-slate-400 leading-[1.75] italic before:content-['\201C'] before:text-[#334155] after:content-['\201D'] after:text-[#334155]"
            style={{ fontFamily: "'Lora', Georgia, serif" }}
          >
            {item.example}
          </p>
        </div>

      </div>
    </div>
  );
}