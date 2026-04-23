import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaFont, FaBook, FaLanguage, FaKey, FaList } from "react-icons/fa";
import useData from "../hooks/UseData";
import usePageTitle from "../hooks/usePageTitle";

const SCRIPT_URL = import.meta.env.VITE_COLLECTION_SHEET_WRITE_URL;

export default function AddWord() {
  const [loading, setLoading] = useState(false);
  const {vocabularyWordList, setVocabularyWordList, basicWordList, setBasicWordList} = useData();


  const [formData, setFormData] = useState({
    word: "",
    definition: "",
    bangla: "",
    synonyms: "",
    antonyms: "",
    example: "",
    other_part_speech: "",
    passkey: "",
    category: "",
  });

  const totalWords = [...basicWordList, ...vocabularyWordList]

  const isExistTheWord = totalWords.find(witem => witem.word === formData.word);

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
      category: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.word || !formData.definition) {
      toast.error("Word and definition required");
      return;
    }

    

    const toastId = toast.loading("Adding new word...");

    try {
      setLoading(true);

      const payload = {
        action: "addWords",
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
        category: formData.category.trim(),
        passkey: formData.passkey.trim()
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
        if(payload.category === "advance"){
          setVocabularyWordList([...vocabularyWordList, payload]);
        }else{
          setBasicWordList([...vocabularyWordList, payload]);
        }
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
  className="space-y-4 bg-white p-5 rounded-xl shadow max-w-xl mx-auto"
>
  {/* Word */}
  <div>
    <label className="block font-medium mb-1 text-sm">Word</label>

    <div className="relative">
      <FaFont className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

      <input
        type="text"
        name="word"
        value={formData.word}
        onChange={handleChange}
        required
        className={`w-full pl-9 pr-3 py-2 text-sm rounded-md border 
        focus:outline-none focus:ring-1
        ${
          isExistTheWord?.id
            ? "border-red-500 focus:ring-red-500"
            : isExistTheWord?.word !== formData?.word &&
              formData?.word.length > 2
            ? "border-green-500 focus:ring-green-500"
            : "border-gray-400 focus:ring-blue-400"
        }`}
        placeholder="Enter vocabulary word"
      />
    </div>

    {isExistTheWord?.id && (
      <p className="text-xs text-gray-500 mt-1">
        The word
        <span className="font-bold text-red-500">
          {" " + isExistTheWord?.word + " "}
        </span>
        already exists!
      </p>
    )}
  </div>

  {/* Definition */}
  <div>
    <label className="block font-medium mb-1 text-sm">Definition</label>

    <div className="relative">
      <FaBook className="absolute left-3 top-3 text-gray-400 text-sm" />

      <textarea
        name="definition"
        value={formData.definition}
        onChange={handleChange}
        required
        className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
        focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="Write definition"
      />
    </div>
  </div>

  {/* Bangla */}
  <div>
    <label className="block font-medium mb-1 text-sm">
      Bangla Meaning
    </label>

    <div className="relative">
      <FaLanguage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

      <input
        type="text"
        name="bangla"
        value={formData.bangla}
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
        focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="বাংলা অর্থ"
      />
    </div>
  </div>

  {/* Synonyms */}
  <div>
    <label className="block font-medium mb-1 text-sm">Synonyms</label>

    <input
      type="text"
      name="synonyms"
      value={formData.synonyms}
      onChange={handleChange}
      className="w-full px-3 py-2 text-sm rounded-md border border-gray-400 
      focus:outline-none focus:ring-1 focus:ring-blue-400"
      placeholder="Quick, Fast, Rapid"
    />

    <p className="text-xs text-gray-400 mt-1">Separate by comma</p>
  </div>

  {/* Antonyms */}
  <div>
    <label className="block font-medium mb-1 text-sm">Antonyms</label>

    <input
      type="text"
      name="antonyms"
      value={formData.antonyms}
      onChange={handleChange}
      className="w-full px-3 py-2 text-sm rounded-md border border-gray-400 
      focus:outline-none focus:ring-1 focus:ring-blue-400"
      placeholder="Slow, Lazy"
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
      className="w-full px-3 py-2 text-sm rounded-md border border-gray-400 
      focus:outline-none focus:ring-1 focus:ring-blue-400"
      placeholder="Example sentence"
    />
  </div>

  {/* Other Part of Speech */}
  <div>
    <label className="text-sm font-medium">
      Other part of Speech
    </label>

    <input
      name="other_part_speech"
      value={formData.other_part_speech}
      onChange={handleChange}
      className="w-full mt-1 px-3 py-2 text-sm rounded-md border border-gray-400 
      focus:outline-none focus:ring-1 focus:ring-blue-400"
      placeholder="noun: large, adjective: big..."
    />

    <p className="text-xs text-gray-500 mt-1">
      Format: noun: large, adjective: big...
    </p>
  </div>

  {/* Passkey */}
  <div>
    <label className="block font-medium mb-1 text-sm">Passkey</label>

    <div className="relative">
      <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

      <input
        type="text"
        name="passkey"
        value={formData.passkey}
        onChange={handleChange}
        required
        className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
        focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="Enter admin passkey"
      />
    </div>
  </div>

  {/* Category */}
  <div>
    <label className="block font-medium mb-1 text-sm">
      Select Category
    </label>

    <div className="relative">
      <FaList className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

      <select
        onChange={handleChange}
        name="category"
        value={formData.category}
        required
        className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
        focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        <option value="">Select Category</option>
        <option value="advance">Advanced Word</option>
        <option value="basic">Basic Word</option>
      </select>
    </div>
  </div>

  {/* Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
  >
    {loading ? "Adding..." : "Add Word"}
  </button>
</form>

    </div>
  );
}