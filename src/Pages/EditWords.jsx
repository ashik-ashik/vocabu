import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaHashtag, FaList } from "react-icons/fa";
import useData from "../hooks/UseData";
import usePageTitle from "../hooks/usePageTitle";

const SCRIPT_URL = import.meta.env.VITE_COLLECTION_SHEET_WRITE_URL;

export default function EditWord() {
  const { vocabularyWordList, setVocabularyWordList, basicWordList } = useData();

  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    word: "",
    bangla: "",
    definition: "",
    synonyms: "",
    antonyms: "",
    example: "",
    other_part_speech: "",
    category: "",
  });

   // set page title
    usePageTitle("Edit Word | ASH English Learning");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ LOAD FROM STATE (NO API)
  const handleLoad = () => {
    if (!id) return toast.error("Enter Word ID");
    if (!category) return toast.error("Please select a category");

    const found = category === "advance" ? vocabularyWordList.find((item) => String(item.id) === String(id)) : basicWordList.find((item) => String(item.id) === String(id)) ;

    if (!found) {
      return toast.error("Word not found in the " + category?.toUpperCase() + " category");
    }

    setForm({
      word: found.word || "",
      bangla: found.bangla || "",
      definition: found.definition || "",
      synonyms: found.synonyms || "",
      antonyms: found.antonyms || "",
      example: found.example || "",
      other_part_speech: found?.other_part_speech || "",
      category: category || "",
    });

    toast.success("Loaded Word data!");
  };

  // ✅ UPDATE SHEET + STATE SYNC
  const handleUpdate = async () => {
    if (!id) return toast.error("Enter ID");

    const toastId = toast.loading("Updating word...");
    setLoading(true);


    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "update",
          id,
          ...form,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Updated successfully", { id: toastId });

        const updatedList = vocabularyWordList.map((item) =>
  String(item.id) === String(id)
    ? {
        ...item,
        word: form.word,
        bangla: form.bangla,
        definition: form.definition,
        example: form.example,
        other_part_speech: form.other_part_speech,
        category: form.category,


        // ✅ KEEP ARRAY FORMAT SAFE
        synonyms: Array.isArray(form.synonyms)
          ? form.synonyms
          : form.synonyms
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),

        antonyms: Array.isArray(form.antonyms)
          ? form.antonyms
          : form.antonyms
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean),
      }
    : item
);

    setVocabularyWordList(updatedList);
    setId("");
    setForm({
      word: "",
      bangla: "",
      definition: "",
      synonyms: "",
      antonyms: "",
      example: "",
      other_part_speech: "",
      category: "",
    });
      } else {
        toast.error(data.message || "Update failed", { id: toastId });
      }
    } catch (err) {
      toast.error(err.message || "Update failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-2 md:p-6">
      <h2 className="text-2xl font-bold mb-2">Edit Vocabulary Word</h2>
      <p className="text-gray-500 mb-6">
        Load from local state, update instantly sync UI.
      </p>

      {/* Load Word Form */}

      <div className="bg-white p-5 rounded-xl shadow space-y-4 mb-5">
        
        {/* Form Title */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Search Word for Editing
          </h2>
          <p className="text-sm text-gray-500">
            Enter Word ID and passkey to load vocabulary data for editing.
          </p>
        </div>

        {/* Word ID */}
        <div>
          <label className="text-xs text-gray-600 font-semibold">
            Word ID
          </label>

          <div className="relative mt-1">
            <FaHashtag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="number"
              placeholder="Enter Word ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
              focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Category */}
        <div className="my-4">
          <label className="block font-medium mb-1 text-sm">
            Select the category of the word
          </label>

          <div className="relative">
            <FaList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <select
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
              focus:outline-none focus:ring-1 focus:ring-blue-400"
              required
            >
              <option value="">Select Category</option>
              <option value="advance">Advanced Word</option>
              <option value="basic">Basic Word</option>
            </select>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleLoad}
          className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
        >
          Load Word
        </button>
      </div>


        {/* Edit Form */}
        {
  form.word !== "" && (
    <div className="bg-white p-5 rounded-xl shadow-md space-y-4 border border-gray-100">

      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Edit Vocabulary Word
        </h2>
        <p className="text-sm text-gray-500">
          Update vocabulary details and click update to save changes.
        </p>
      </div>

      {/* Word */}
      <div>
        <label className="text-xs font-medium text-gray-600">Word</label>
        <input
          name="word"
          value={form.word}
          onChange={handleChange}
          placeholder="Enter word"
          className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md
                     focus:outline-none focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Definition */}
      <div>
        <label className="text-xs font-medium text-gray-600">Definition</label>
        <textarea
          name="definition"
          value={form.definition}
          onChange={handleChange}
          placeholder="Enter definition"
          className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md
                     focus:outline-none focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Bangla */}
      <div>
        <label className="text-xs font-medium text-gray-600">Bangla Meaning</label>
        <input
          name="bangla"
          value={form.bangla}
          onChange={handleChange}
          placeholder="বাংলা অর্থ"
          className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md
                     focus:outline-none focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Synonyms */}
      <div>
        <label className="text-xs font-medium text-gray-600">
          Synonyms
        </label>
        <input
          name="synonyms"
          value={form.synonyms}
          onChange={handleChange}
          placeholder="large, big, huge"
          className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md
                     focus:outline-none focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Antonyms */}
      <div>
        <label className="text-xs font-medium text-gray-600">
          Antonyms
        </label>
        <input
          name="antonyms"
          value={form.antonyms}
          onChange={handleChange}
          placeholder="small, tiny"
          className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md
                     focus:outline-none focus:ring-0 focus:border-gray-400"
        />
      </div>

      {/* Other parts */}
      <div>
        <label className="text-xs font-medium text-gray-600">
          Other Parts of Speech
        </label>
        <input
          name="other_part_speech"
          value={form.other_part_speech}
          onChange={handleChange}
          placeholder="noun: ..., verb: ..."
          className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md
                     focus:outline-none focus:ring-0 focus:border-gray-400"
        />
        <p className="text-[11px] text-gray-400 mt-1">
          Example: noun: large, adjective: big, verb: expand
        </p>
      </div>

      {/* Example */}
      <div>
        <label className="text-xs font-medium text-gray-600">
          Example Sentence
        </label>
        <textarea
          name="example"
          value={form.example}
          onChange={handleChange}
          placeholder="Enter example sentence"
          className="w-full mt-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md
                     focus:outline-none focus:ring-0 focus:border-gray-400"
        />
      </div>

      

      {/* Button */}
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm
                   py-2 rounded-md transition disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Word"}
      </button>

    </div>
  )
}
    </div>
  );
}