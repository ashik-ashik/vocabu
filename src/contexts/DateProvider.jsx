import { useEffect, useState } from 'react';
import { DataContext } from './CreateContext';

const VOCAB_SHEET_READ_URL = import.meta.env.VITE_VOCABULARY_COLLECTION_SHEET_READ_URL;

const DataProvider = ({ children }) => {

  // States
  const [vocabularyWordList, setVocabularyWordList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {

    const parseCSVLine = (line) => {
        const result = [];
        let current = "";
        let insideQuotes = false;

        for (let i = 0; i < line.length; i++) {
          const char = line[i];

          if (char === '"') {
            insideQuotes = !insideQuotes;
          } else if (char === "," && !insideQuotes) {
            result.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }

        result.push(current.trim());
        return result;
      };

    const fetchWords = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(VOCAB_SHEET_READ_URL);

      if (!res.ok) {
        throw new Error("Failed to fetch vocabulary data");
      }

      const text = await res.text();

      // convert CSV → JSON safely
      const rows = text.trim().split("\n");

      if (rows.length < 2) {
        setVocabularyWordList([]);
        return;
      }
      const data = rows.slice(1).map((row) => {
        const cols = parseCSVLine(row);

        return {
          id: cols[0] || "",
          word: cols[1] || "",
          definition: cols[2] || "",
          bangla: cols[3] || "",

          // safely handle quoted CSV lists
          synonyms: (cols[4] || "")
            .replace(/"/g, " ")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),

          antonyms: (cols[5] || "")
            .replace(/"/g, " ")
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),

          example: cols[6] || "",
          inserted_date: cols[7] || "",
            other_part_speech: cols[8] || "",
        };
      });

      setVocabularyWordList(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setVocabularyWordList([]); // ✅ fallback safe state
    } finally {
      setLoading(false);
    }
  };
  fetchWords();
  }, []);


  return (
    <DataContext.Provider value={{ vocabularyWordList, loading, error, setVocabularyWordList }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;