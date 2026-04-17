import React from "react";

export default function WordCard({ item,  speakWord }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-5 border border-gray-100 relative">
      
      {/* ID */}
      <span className="absolute top-1 right-1 text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
        <span className="italic">id: </span>
        {item.id}
      </span>

      {/* WORD */}
      <h2 className="text-xl title-font tracking-wide font-bold text-blue-600 capitalize">
        {item.word}{" "}
        <span
          onClick={() => speakWord(item.word)}
          className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors duration-200 text-sm"
        >
          🔊
        </span>
      </h2>

      <p className="text-xs text-gray-400 mb-2">
        Added: {item.inserted_date || item.date}
      </p>

      <hr className="my-2" />

      {/* CONTENT */}
      <p className="text-gray-700 text-sm">
        <span className="font-semibold">Definition:</span>{" "}
        {item.definition}
      </p>

      <p className="text-gray-700 mt-1 text-sm">
        <span className="font-semibold">Bangla:</span>{" "}
        {item.bangla}
      </p>

      {/* SYNONYMS */}
      <div className="mt-2">
        <span className="text-sm font-semibold text-gray-700">
          Synonyms:
        </span>

        <div className="flex flex-wrap gap-2 mt-2">
          {item.synonyms?.map((syn) => (
            <button
              key={syn}
              onClick={() => speakWord(syn)}
              className="group relative px-2.5 py-1 text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded-full capitalize hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95 flex items-center gap-1"
            >
              <span>{syn}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px]">
                🔊
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ANTONYMS */}
      <div className="mt-2">
        <span className="text-sm font-semibold text-gray-700">
          Antonyms:
        </span>

        <div className="flex flex-wrap gap-2 mt-2">
          {item.antonyms?.map((ant) => (
            <button
              key={ant}
              onClick={() => speakWord(ant)}
              className="group relative px-2.5 py-1 text-xs bg-red-50 text-red-500 border border-red-100 rounded-full capitalize hover:bg-red-600 hover:text-white transition-all duration-200 active:scale-95 flex items-center gap-1"
            >
              <span>{ant}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px]">
                🔊
              </span>
            </button>
          ))}
        </div>
      </div>

      <hr className="my-3" />

      {/* EXAMPLE */}
      <p className="text-gray-600 italic text-xs">
        💡 "{item.example}"
      </p>
    </div>
  );
}