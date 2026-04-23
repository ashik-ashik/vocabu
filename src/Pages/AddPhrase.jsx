import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaQuoteLeft, FaLanguage, FaKey, FaBook } from "react-icons/fa";
import useData from "../hooks/UseData";

const API_URL = import.meta.env.VITE_COLLECTION_SHEET_WRITE_URL;

const AddPhrase = () => {

    const {idiomsPhrasesList , setIdiomsPhrasesList} = useData();

  const [form, setForm] = useState({
    phrase: "",
    meanings_en: "",
    meanings_bn: "",
    example: "",
    passkey: "",
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
      params.append("passkey", form.passkey.trim());


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
        passkey: "",
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
    <label className="block font-medium mb-1 text-sm">Phrase</label>

    <div className="relative">
      <FaQuoteLeft className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

      <input
        type="text"
        name="phrase"
        value={form.phrase}
        onChange={handleChange}
        className={`w-full pl-9 pr-3 py-2 text-sm rounded-md border focus:outline-none focus:ring-1
        ${
          isExistsThePhrase?.phrase
            ? "border-red-500 text-red-600 font-semibold focus:ring-red-500"
            : form?.phrase?.length > 2
            ? "border-green-500 text-green-600 font-semibold focus:ring-green-500"
            : "border-gray-400 focus:ring-blue-400"
        }`}
        placeholder="Enter phrase"
      />
    </div>

    {isExistsThePhrase?.phrase && (
      <p className="text-xs mt-1 text-gray-500">
        The Phrase
        <span className="text-red-600 font-bold">
          {" " + isExistsThePhrase?.phrase + " "}
        </span>
        already exists!
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

    <textarea
      name="example"
      value={form.example}
      onChange={handleChange}
      className="w-full px-3 py-2 text-sm rounded-md border border-gray-400 
      focus:outline-none focus:ring-1 focus:ring-blue-400"
      placeholder="Example sentence"
    />
  </div>

  {/* Passkey */}
  <div>
    <label className="block font-medium mb-1 text-sm">
      Passkey
    </label>

    <div className="relative">
      <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

      <input
        type="text"
        name="passkey"
        value={form.passkey}
        onChange={handleChange}
        className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-gray-400 
        focus:outline-none focus:ring-1 focus:ring-blue-400"
        placeholder="Enter admin passkey"
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