import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaQuoteLeft, FaLanguage, FaKey, FaBook } from "react-icons/fa";
import {  FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { VscNote } from "react-icons/vsc";

import useData from "../hooks/UseData";
import usePageTitle from "../hooks/usePageTitle";

const API_URL = import.meta.env.VITE_COLLECTION_SHEET_WRITE_URL;

const AddPhrase = () => {

    const {idiomsPhrasesList , setIdiomsPhrasesList} = useData();
      usePageTitle("Add New Phrase | ASH English Learning | Learn Words, Meanings & Synonyms");


  const [form, setForm] = useState({
    phrase: "",
    meanings_en: "",
    meanings_bn: "",
    example: "",
  });

  const [loading, setLoading] = useState(false);

  const isExistsThePhrase = idiomsPhrasesList.find(ph => ph.phrase === form.phrase)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.phrase ||
      !form.meanings_en ||
      !form.meanings_bn ||
      !form.example
    ) {
      toast.error("All fields are required");
      return;
    }

    let toastId;

    try {

      setLoading(true);
      toastId = toast.loading("Adding Phrase...");

      const params = new URLSearchParams();
      params.append("action", "addPhrase");
      params.append("phrase", form.phrase.trim());
      params.append("meanings_en", form.meanings_en.trim());
      params.append("meanings_bn", form.meanings_bn.trim());
      params.append("example", form.example.trim());


      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });


      const data = await res.json();


      if (!data.success) {
        throw new Error(data.message || "Failed");
      }


      toast.success(data.message || "Phrase Added Successfully", {
        id: toastId,
      });

      setIdiomsPhrasesList([...idiomsPhrasesList, {
        phrase: form.phrase,
        meanings_en: form.meanings_en,
        meanings_bn: form.meanings_bn,
        example: form.example,
    }])


      setForm({
        phrase: "",
        meanings_en: "",
        meanings_bn: "",
        example: "",
      });


    } catch (error) {

      toast.error(error.message || "Something went wrong", {
        id: toastId,
      });

    } finally {
      setLoading(false);
    }

  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">


      <h2 className="text-2xl font-bold mb-6">
        Add New Phrase
      </h2>


<form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">


{/* Phrase */}
<div>
  <label className="block font-medium mb-1 text-sm flex items-center gap-2 text-gray-700">
    <FaQuoteLeft className="text-gray-500 text-xs" />
    Phrase
  </label>

  <div className="relative">
    <FaQuoteLeft className={`absolute left-3 top-1/2 -translate-y-1/2 ${isExistsThePhrase?.phrase
          ? "text-red-600"
          : form?.phrase?.length > 2
          ? "text-green-600"
          : "text-gray-600"} text-xs`} />

    <input
      type="text"
      name="phrase"
      value={form.phrase}
      onChange={handleChange}
      className={`w-full pl-9 pr-9 py-2 text-sm rounded-md border transition-all duration-200
      focus:outline-none focus:ring-1
      ${
        isExistsThePhrase?.phrase
          ? "border-red-500 focus:ring-red-400 bg-red-50 text-red-700"
          : form?.phrase?.length > 2
          ? "border-green-500 focus:ring-green-400 bg-green-50 text-green-700"
          : "border-gray-300 focus:ring-blue-400"
      }`}
      placeholder="Enter phrase"
    />

    {/* Right-side status icon */}
    <div className="absolute right-3 top-1/2 -translate-y-1/2">
      {isExistsThePhrase?.phrase ? (
        <FaExclamationCircle className="text-red-500 text-sm" />
      ) : form?.phrase?.length > 2 ? (
        <FaCheckCircle className="text-green-500 text-sm" />
      ) : null}
    </div>
  </div>

  {/* Helper / Error Message */}
  {isExistsThePhrase?.phrase ? (
    <p className="text-xs mt-1 text-red-600">
      This phrase{" "}
      <span className="font-semibold">
        "{isExistsThePhrase?.phrase}"
      </span>{" "}
      already exists in the database.
    </p>
  ) : form?.phrase?.length > 2 ? (
    <p className="text-xs mt-1 text-green-600">
      Looks good! Phrase is available to use.
    </p>
  ) : (
    <p className="text-xs mt-1 text-gray-400">
      Enter a meaningful phrase (minimum 3 characters)
    </p>
  )}
</div>

  {/* English Meaning */}
  <div>
    <label className="block font-medium mb-1 text-sm">
      English Meaning
    </label>

    <div className="relative">
      <FaBook className="absolute left-3 top-3 text-gray-400 text-sm" />

      <textarea
        name="meanings_en"
        value={form.meanings_en}
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
        focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="Write English meaning"
      />
    </div>
  </div>

  {/* Bangla Meaning */}
  <div>
    <label className="block font-medium mb-1 text-sm">
      Bangla Meaning
    </label>

    <div className="relative">
      <FaLanguage className="absolute left-3 top-3 text-gray-400 text-sm" />

      <textarea
        name="meanings_bn"
        value={form.meanings_bn}
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
        focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="বাংলা অর্থ লিখুন"
      />
    </div>
  </div>

  {/* Example */}
  <div>
    <label className="block font-medium mb-1 text-sm">
      Example
    </label>
      <div className="relative">
        <VscNote size={20} className="absolute left-3 top-3  text-gray-400 text-sm" />
        <textarea
          name="example"
          value={form.example}
          onChange={handleChange}
          className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
        focus:outline-none focus:ring-1 focus:ring-blue-400"
          placeholder="Example sentence"
        />
      </div>
  </div>


  {/* Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 disabled:opacity-50"
  >
    {loading ? "Adding..." : "Add Phrase"}
  </button>

</form>

    </div>
  );
};

export default AddPhrase;