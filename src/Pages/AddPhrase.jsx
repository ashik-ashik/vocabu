import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const API_URL = import.meta.env.VITE_COLLECTION_SHEET_WRITE_URL;

const AddPhrase = () => {

  const [form, setForm] = useState({
    phrase: "",
    meanings_en: "",
    meanings_bn: "",
    example: "",
    passkey: "",
  });

  const [loading, setLoading] = useState(false);


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

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium mb-1">Phrase</label>
          <input
            type="text"
            name="phrase"
            value={form.phrase}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>


        <div>
          <label className="block font-medium mb-1">
            English Meaning
          </label>
          <textarea
            name="meanings_en"
            value={form.meanings_en}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>


        <div>
          <label className="block font-medium mb-1">
            Bangla Meaning
          </label>
          <textarea
            name="meanings_bn"
            value={form.meanings_bn}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>


        <div>
          <label className="block font-medium mb-1">
            Example
          </label>
          <textarea
            name="example"
            value={form.example}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>


        <div>
          <label className="block font-medium mb-1">
            Passkey
          </label>
          <input
            type="text"
            name="passkey"
            value={form.passkey}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Phrase"}
        </button>

      </form>

    </div>
  );
};

export default AddPhrase;