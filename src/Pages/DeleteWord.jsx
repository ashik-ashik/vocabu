import React, { useState } from "react";
import toast from "react-hot-toast";
import useData from "../hooks/UseData";

const SCRIPT_URL = import.meta.env.VITE_VOCABULARY_COLLECTION_SHEET_WRITE_URL;
const PASSKEY = import.meta.env.VITE_SECRET_PASSKEY;

export default function DeleteWord() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [passkey, setPasskey] = useState("");

  const [showModal, setShowModal] = useState(false);
  const {vocabularyWordList, setVocabularyWordList} = useData();

  const handleDelete = async () => {
    if (!id) return toast.error("Enter ID");

    if (passkey !== PASSKEY) {
      return toast.error("Invalid Passkey");
    }

    setShowModal(true); // open modal instead of confirm
  };

  const confirmDelete = async () => {
    const toastId = toast.loading("Deleting word...");
    setShowModal(false);

    try {
      setLoading(true);

      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "delete",
          id: id,
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Word deleted successfully", { id: toastId });
        setVocabularyWordList(vocabularyWordList.filter(w => w.id !== id));
        setId("");
        setPasskey("");
      } else {
        toast.error(data.message || "Delete failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Network error " + error.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-2 md:p-6">
      <h2 className="text-2xl font-bold mb-2">Delete Vocabulary Word</h2>

      <p className="text-gray-500 mb-6">
        Enter ID to delete vocabulary permanently.
      </p>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block font-medium mb-1">Word ID</label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter word ID"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Passkey</label>
          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter admin passkey"
          />
        </div>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          Delete Word
        </button>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-600">
              Confirm Deletion
            </h3>

            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete this word? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}