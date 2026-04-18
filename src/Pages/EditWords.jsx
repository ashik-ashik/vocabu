import React, { useState } from "react";
import toast from "react-hot-toast";
import useData from "../hooks/UseData";
import usePageTitle from "../hooks/usePageTitle";

const SCRIPT_URL = import.meta.env.VITE_VOCABULARY_COLLECTION_SHEET_WRITE_URL;
const PASSKEY = import.meta.env.VITE_SECRET_PASSKEY;

export default function EditWord() {
  const { vocabularyWordList, setVocabularyWordList } = useData();

  const [id, setId] = useState("");
  const [passkey, setPasskey] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    word: "",
    bangla: "",
    definition: "",
    synonyms: "",
    antonyms: "",
    example: "",
    other_part_speech: "",
  });

   // set page title
    usePageTitle("Edit Word | ASH English Learning");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ LOAD FROM STATE (NO API)
  const handleLoad = () => {
    if (!id) return toast.error("Enter Word ID");
    if (passkey !== PASSKEY) return toast.error("Invalid Passkey");

    const found = vocabularyWordList.find((item) => String(item.id) === String(id));

    if (!found) {
      return toast.error("Word not found");
    }

    setForm({
      word: found.word || "",
      bangla: found.bangla || "",
      definition: found.definition || "",
      synonyms: found.synonyms || "",
      antonyms: found.antonyms || "",
      example: found.example || "",
      other_part_speech: found?.other_part_speech || "",
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
setPasskey("");

setForm({
  word: "",
  bangla: "",
  definition: "",
  synonyms: "",
  antonyms: "",
  example: "",
  other_part_speech: "",
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
            <label className="text-xs text-gray-600 font-semibold">Word ID</label>
            <input
              type="number"
              placeholder="Enter Word ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full border border-gray-500 p-2  rounded mt-1"
            />
          </div>

          {/* Passkey */}
          <div>
            <label className="text-xs text-gray-600 font-semibold">Passkey</label>
            <input
              type="password"
              placeholder="Enter Passkey"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="w-full border p-2 border-gray-500 rounded mt-1"
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLoad}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Load Word
          </button>
        </div>


        {/* Edit Form */}
        {
          form.word !== "" && <div className="bg-white p-6 rounded-xl shadow space-y-4">
            
            {/* Form Title */}
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
              <label className="text-xs text-gray-600 font-semibold">Word</label>
              <input
                name="word"
                value={form.word}
                onChange={handleChange}
                className="w-full border border-gray-500 p-2  rounded mt-1"
                placeholder="Enter word"
              />
            </div>

            {/* Definition */}
            <div>
              <label className="text-xs text-gray-600 font-semibold">Definition</label>
              <textarea
                name="definition"
                value={form.definition}
                onChange={handleChange}
                className="w-full border border-gray-500 p-2  rounded mt-1"
                placeholder="Enter definition"
              />
            </div>

            {/* Bangla Meaning */}
            <div>
              <label className="text-xs text-gray-600 font-semibold">Bangla Meaning</label>
              <input
                name="bangla"
                value={form.bangla}
                onChange={handleChange}
                className="w-full border border-gray-500 p-2  text-xs rounded mt-1"
                placeholder="বাংলা অর্থ"
              />
            </div>

            {/* Synonyms */}
            <div>
              <label className="text-xs text-gray-600 font-semibold">
                Synonyms (Comma separated)
              </label>
              <input
                name="synonyms"
                value={form.synonyms}
                onChange={handleChange}
                className="w-full border border-gray-500 p-2  rounded mt-1"
                placeholder="example: large, big, huge"
              />
            </div>

            {/* Antonyms */}
            <div>
              <label className="text-xs text-gray-600 font-semibold">
                Antonyms (Comma separated)
              </label>
              <input
                name="antonyms"
                value={form.antonyms}
                onChange={handleChange}
                className="w-full border border-gray-500 p-2  rounded mt-1"
                placeholder="example: small, tiny"
              />
            </div>

            {/* Other Part of Speech */}
            <div>
              <label className="text-xs text-gray-600 font-semibold">
                Other part of Speech (Comma separated)
              </label>
              <input
                name="other_part_speech"
                value={form.other_part_speech}
                onChange={handleChange}
                className="w-full border border-gray-500 p-2 rounded mt-1"
                placeholder="example: noun: large, adjective: big, verb: huge, etc"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format: <span className="italic">noun: large, adjective: big, verb: huge, etc...</span>
              </p>
            </div>

            {/* Example */}
            <div>
              <label className="text-xs text-gray-600 font-semibold">Example Sentence</label>
              <textarea
                name="example"
                value={form.example}
                onChange={handleChange}
                className="w-full border border-gray-500 p-2  rounded mt-1"
                placeholder="Enter example sentence"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Word"}
            </button>

          </div>
        }
    </div>
  );
}