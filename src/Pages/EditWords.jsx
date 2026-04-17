import React, { useState } from "react";
import toast from "react-hot-toast";
import useData from "../hooks/UseData";

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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ LOAD FROM STATE (NO API)
  const handleLoad = () => {
    if (!id) return toast.error("Enter ID");
    if (passkey !== PASSKEY) return toast.error("Invalid Passkey");

    const found = vocabularyWordList.find((item) => String(item.id) === String(id));

    if (!found) {
      return toast.error("Word not found in local state");
    }

    setForm({
      word: found.word || "",
      bangla: found.bangla || "",
      definition: found.definition || "",
      synonyms: found.synonyms || "",
      antonyms: found.antonyms || "",
    });

    toast.success("Loaded from local data");
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

      {/* ID + Passkey */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3 mb-4">
        <input
          type="number"
          placeholder="Word ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Passkey"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleLoad}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Load Word
        </button>
      </div>

      {/* Edit Form */}
      <div className="bg-white p-6 rounded-xl shadow space-y-3">
        <input
          name="word"
          value={form.word}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Word"
        />

        <input
          name="bangla"
          value={form.bangla}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Bangla Meaning"
        />

        <textarea
          name="definition"
          value={form.definition}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Definition"
        />

        <input
          name="synonyms"
          value={form.synonyms}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Synonyms"
        />

        <input
          name="antonyms"
          value={form.antonyms}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Antonyms"
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Word"}
        </button>
      </div>
    </div>
  );
}