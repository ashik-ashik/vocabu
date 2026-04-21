import { useEffect, useState } from 'react';
import { DataContext } from './CreateContext';

const VOCAB_SHEET_READ_URL = import.meta.env.VITE_VOCABULARY_COLLECTION_SHEET_READ_URL;
const BASIC_VOCAB_SHEET_READ_URL = import.meta.env.VITE_BASIC_VOCABULARY_SHEET_READ_URL;
const TENSE_SHEET_READ_URL = import.meta.env.VITE_TENSE_SHEET_READ_URL;
const IDIOMS_PHRASES_SHEET_READ_URL = import.meta.env.VITE_IDIOMS_PHRASES_SHEET_READ_URL;

const DataProvider = ({ children }) => {

  // States
  const [vocabularyWordList, setVocabularyWordList] = useState([]);
  const [basicWordList, setBasicWordList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tenseList, setTenseList] = useState([]);
  const [idiomsPhrasesList, setIdiomsPhrasesList] = useState([]);

  // Parse Words
  const parseCSVWords = (line) => {
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

    // Parse Tense CSV
    const parseCSVTense = (csvText) => {
      const lines = csvText.trim().split("\n");

      const headers = lines[0].split(",");

      const rows = lines.slice(1);

      return rows.map((row) => {
        // handle quoted commas safely
        const values = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

        const obj = {};

        headers.forEach((header, index) => {
          let value = values?.[index] || "";

          // remove quotes if exist
          value = value.replace(/^"|"$/g, "");

          obj[header.trim()] = value.trim();
        });

        return obj;
      });
    };
 
  useEffect(() => {


      // Load vocabulary words from Google Sheet
    const fetchWords = async (sheet, dataSetter) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(sheet);

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
        const cols = parseCSVWords(row);

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

      dataSetter(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      dataSetter([]); // ✅ fallback safe state
    } finally {
      setLoading(false);
    }
  };


  // Load IDIOMS and PHRASES from Google Sheet
  const loadIdiomsPhrases = async () => {
    try {
      setLoading(true);
      const res = await fetch(IDIOMS_PHRASES_SHEET_READ_URL);
      const rawText = await res.text();
      // const header = rawText.split("\n")[0].split(",").map(h => h.trim());
      // console.log("Raw Idioms and Phrases Data:", rawText.split("\n").slice(1));
      const data = rawText.split("\n").slice(1).map(line => {
        const cols = parseCSVWords(line);
        return {
          id: cols[0] || "",
          phrase: cols[1] || "",
          meanings_en: cols[2] || "",
          meanings_bn: cols[3] || "",
          example: cols[4] || "",
        };
      });
      setIdiomsPhrasesList(data);
    } catch (error) {
      console.error("Idioms and Phrases Load Error:", error);
    } finally {
      setLoading(false);
    }
  };


  // Load Tense List 
  const loadTenseData = async () => {
      try {
        setLoading(true);

        const res = await fetch(TENSE_SHEET_READ_URL);
        const rawText = await res.text();


        // 🔥 Convert CSV → JSON
        const data = parseCSVTense(rawText);

        const formatted = data.map((item) => ({
          tense: item.Tense || "",
          when_use: item.when_use || "",
          identifier: item.identifier || "",
          structure_active: item.structure_active || "",
          structure_passive: item.structure_passive || "",
          example_short_active_bn: item.example_short_active_bn || "",
          example_short_active_en: item.example_short_active_en || "",
          example_short_passive_bn: item.example_short_passive_bn || "",
          example_short_passive_en: item.example_short_passive_en || "",
          example_long_active_bn: item.example_long_active_bn || "",
          example_long_active_en: item.example_long_active_en || "",
          example_long_passive_bn: item.example_long_passive_bn || "",
          example_long_passive_en: item.example_long_passive_en || "",
          question_structure: item.question_structure || "",
          question_example: item.question_example || "",
        }));

        setTenseList(formatted);
      } catch (error) {
        console.error("Tense Load Error:", error);
      } finally {
        setLoading(false);
      }
    };


  fetchWords(VOCAB_SHEET_READ_URL, setVocabularyWordList);
  fetchWords(BASIC_VOCAB_SHEET_READ_URL, setBasicWordList);
  loadTenseData();
  loadIdiomsPhrases();
  }, []);

  return (
    <DataContext.Provider value={{ vocabularyWordList, basicWordList, loading, error, setVocabularyWordList, setBasicWordList, tenseList, idiomsPhrasesList }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;