import React, { useState } from "react";
import toast from "react-hot-toast";
import useData from "../hooks/UseData";
import usePageTitle from "../hooks/usePageTitle";

const SCRIPT_URL = import.meta.env.VITE_VOCABULARY_COLLECTION_SHEET_WRITE_URL;
const PASSKEY = "YOUR_SECRET_PASSKEY"; // change this

export default function AddWord() {
  const [loading, setLoading] = useState(false);
  const {vocabularyWordList, setVocabularyWordList} = useData();


  const [formData, setFormData] = useState({
    word: "",
    definition: "",
    bangla: "",
    synonyms: "",
    antonyms: "",
    example: "",
    other_part_speech: "",
    passkey: "",
  });

   // set page title
    usePageTitle("Add Word | ASH English Learning");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    setFormData({
      word: "",
      definition: "",
      bangla: "",
      synonyms: "",
      antonyms: "",
      example: "",
      other_part_speech: "",
      passkey: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.word || !formData.definition) {
      toast.error("Word and definition required");
      return;
    }

    if (formData.passkey !== import.meta.env.VITE_SECRET_PASSKEY) {
      toast.error("Invalid passkey");
      return;
    }

    const toastId = toast.loading("Adding new word...");

    try {
      setLoading(true);

      const payload = {
        action: "add",
        word: formData.word.trim(),
        definition: formData.definition.trim(),
        bangla: formData.bangla.trim(),
        synonyms: formData.synonyms
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        antonyms: formData.antonyms
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        example: formData.example.trim(),
        other_part_speech: formData.other_part_speech.trim(),
      };
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(payload),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Word added successfully", { id: toastId });
        payload.id = vocabularyWordList.length + 1; 
        payload.inserted_date = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`; // assign new ID from server
        setVocabularyWordList([...vocabularyWordList, payload]);
        resetForm();
      } else if (data.status === "exists") {
        toast.error("Word already exists", { id: toastId });
      } else {
        toast.error(data.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Network error" + error?.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-6">
      
      <h2 className="text-2xl font-bold mb-2">
        Add New Vocabulary Word
      </h2>

      <p className="text-gray-500 mb-6">
        Fill all fields carefully. Separate synonyms and antonyms using comma.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl shadow"
      >
        
        {/* Word */}
        <div>
          <label className="block font-medium mb-1 text-sm">
            Word
          </label>
          <input
            type="text"
            name="word"
            value={formData.word}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 p-2  rounded"
            placeholder="Enter vocabulary word"
          />
        </div>

        {/* Definition */}
        <div>
          <label className="block font-medium mb-1 text-sm">
            Definition
          </label>
          <textarea
            name="definition"
            value={formData.definition}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 p-2  rounded"
            placeholder="Write definition"
          />
        </div>

        {/* Bangla */}
        <div>
          <label className="block font-medium mb-1 text-sm">
            Bangla Meaning
          </label>
          <input
            type="text"
            name="bangla"
            value={formData.bangla}
            onChange={handleChange}
            className="w-full border border-gray-500 p-2  rounded"
            placeholder="বাংলা অর্থ"
          />
        </div>

        {/* Synonyms */}
        <div>
          <label className="block font-medium mb-1 text-sm">
            Synonyms
          </label>
          <input
            type="text"
            name="synonyms"
            value={formData.synonyms}
            onChange={handleChange}
            className="w-full border border-gray-500 p-2  rounded"
            placeholder="Example: Quick, Fast, Rapid"
          />
          <p className="text-xs text-gray-400 mt-1">
            Separate by comma
          </p>
        </div>

        {/* Antonyms */}
        <div>
          <label className="block font-medium mb-1 text-sm">
            Antonyms
          </label>
          <input
            type="text"
            name="antonyms"
            value={formData.antonyms}
            onChange={handleChange}
            className="w-full border border-gray-500 p-2  rounded"
            placeholder="Example: Slow, Lazy"
          />
        </div>

        {/* Example */}
        <div>
          <label className="block font-medium mb-1 text-sm">
            Example Sentence
          </label>
          <textarea
            name="example"
            value={formData.example}
            onChange={handleChange}
            className="w-full border border-gray-500 p-2  rounded"
            placeholder="Example sentence"
          />
        </div>

        {/* Other Part of Speech */}
          <div>
            <label className="text-sm font-medium">
              Other part of Speech (Comma separated)
            </label>
            <input
              name="other_part_speech"
              value={formData.other_part_speech}
              onChange={handleChange}
              className="w-full border border-gray-500 p-2  rounded mt-1"
              placeholder="example: noun: large, adjective: big, verb: huge, etc"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format: noun: large, adjective: big, verb: huge, etc...
            </p>
          </div>

        {/* Passkey */}
        <div>
          <label className="block font-medium mb-1 text-sm">
            Passkey
          </label>
          <input
            type="password"
            name="passkey"
            value={formData.passkey}
            onChange={handleChange}
            required
            className="w-full border border-gray-500 p-2  rounded"
            placeholder="Enter admin passkey"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Word"}
        </button>
      </form>

    </div>
  );
}