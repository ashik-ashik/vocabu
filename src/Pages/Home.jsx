import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePageTitle from "../hooks/usePageTitle";

const Home = () => {
  usePageTitle("ASH English Learning — Build Your Vocabulary");
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0f1117] text-slate-400">

     

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-7 pt-14 pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0c1a2e] border border-[#1a3a5c] rounded-full text-[11.5px] text-blue-400 mb-5">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
          English vocabulary platform
        </div>
        <h1 className="text-[32px] font-medium text-slate-100 leading-tight tracking-tight mb-3.5">
          Build your vocabulary<br />
          <span className="text-blue-400">smarter every day</span>
        </h1>
        <p className="text-[14px] text-slate-500 leading-relaxed max-w-[440px] mx-auto mb-7">
          Learn English words, phrases, synonyms, antonyms and real-life examples — with Bangla support built in.
        </p>
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          <Link to="/vocabulary" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13.5px] font-medium rounded-xl transition-colors">
            Explore words
          </Link>
          {!user?.email && (
            <Link to="/login" className="px-6 py-2.5 border border-[#2a2f3e] hover:bg-[#1a1d27] text-slate-400 text-[13.5px] rounded-xl transition-colors">
              Sign in to start
            </Link>
          )}
        </div>
      </section>

      

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-7 py-11">
        <p className="text-[11px] font-medium tracking-widest text-blue-500 uppercase mb-2">Features</p>
        <h2 className="text-[20px] font-medium text-slate-100 tracking-tight mb-1.5">Everything you need to learn</h2>
        <p className="text-[13px] text-slate-500 mb-6">A complete vocabulary toolkit in one place</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: "Vocabulary learning", desc: "Rich English words with meanings, examples and Bangla translations" },
            { title: "Smart search", desc: "Find words, synonyms and antonyms instantly with fast lookup" },
            { title: "Bangla support", desc: "Every word includes an easy Bangla meaning for fast comprehension" },
          ].map((f) => (
            <div key={f.title} className="bg-[#13161e] border border-[#1e2330] rounded-xl p-4">
              <div className="w-8 h-8 bg-[#0c1a2e] border border-[#1a3a5c] rounded-lg flex items-center justify-center mb-3">
                <svg className="w-3.5 h-3.5" viewBox="0 0 15 15" fill="none">
                  <rect x="2" y="2" width="11" height="11" rx="2" stroke="#60a5fa" strokeWidth="1.2"/>
                  <path d="M5 7h5M5 9.5h3" stroke="#60a5fa" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[13px] font-medium text-slate-200 mb-1">{f.title}</p>
              <p className="text-[12px] text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORD CARDS */}
      <section className="max-w-6xl mx-auto px-7 pb-11">
        <p className="text-[11px] font-medium tracking-widest text-blue-500 uppercase mb-2">Vocabulary</p>
        <h2 className="text-[20px] font-medium text-slate-100 tracking-tight mb-1.5">Sample words</h2>
        <p className="text-[13px] text-slate-500 mb-6">A taste of what's inside the dictionary</p>
        <div className="grid grid-cols-2 gap-3">
          <WordCard word="Resilient" type="Adjective" definition="Able to recover quickly from difficulties" bangla="সহনশীল / দ্রুত পুনরুদ্ধারক্ষম" synonyms={["Strong","Tough","Flexible"]} antonyms={["Weak","Fragile"]} example="She is very resilient in tough situations." />
          <WordCard word="Abundant" type="Adjective" definition="Existing in large quantities; more than enough" bangla="প্রচুর" synonyms={["Plenty","Ample","Overflowing"]} antonyms={["Scarce","Limited"]} example="Food was abundant at the party." />
        </div>
      </section>

      {/* PHRASES */}
      <section className="max-w-6xl mx-auto px-7 pb-11">
        <p className="text-[11px] font-medium tracking-widest text-blue-500 uppercase mb-2">Phrases</p>
        <h2 className="text-[20px] font-medium text-slate-100 tracking-tight mb-1.5">Popular English phrases</h2>
        <p className="text-[13px] text-slate-500 mb-6">Idioms and expressions used in everyday conversation</p>
        <div className="grid grid-cols-3 gap-3">
          <PhraseCard title="Catch-22" meaning="A difficult situation with no escape" bangla="জটিল সমস্যা যেখানে কোনো সমাধান নেই" />
          <PhraseCard title="Break the ice" meaning="Start a conversation in a social situation" bangla="আলাপ শুরু করা / সংকোচ ভাঙা" />
          <PhraseCard title="Beat one's brains out" meaning="Work extremely hard to solve something" bangla="অত্যন্ত পরিশ্রম করে সমাধান করা" />
        </div>
      </section>

      {/* CTA */}
      {!user?.email && (
        <section className="bg-[#0a0c10] border-t border-[#1e2330] py-11 text-center px-7">
          <h2 className="text-[22px] font-medium text-slate-100 tracking-tight mb-2">Start learning today</h2>
          <p className="text-[13px] text-slate-500 mb-6">Sign in to unlock full vocabulary access and personalized learning.</p>
          <Link to="/login" className="inline-block px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13.5px] font-medium rounded-xl transition-colors">
            Sign in with Google
          </Link>
        </section>
      )}

      {/* FOOTER */}
      <footer className="flex items-center justify-between px-7 py-5 border-t border-[#1e2330]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3">
              <path d="M2 11L7 3L12 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 8.5H10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[12.5px] text-slate-600">ASH English Learning</span>
        </div>
        <span className="text-[11.5px] text-[#1e293b]">© 2025 ASH English Learning</span>
      </footer>
    </div>
  );
};

const WordCard = ({ word, type, definition, bangla, synonyms, antonyms, example }) => (
  <div className="bg-[#13161e] border border-[#1e2330] rounded-xl p-4">
    <div className="flex items-center justify-between mb-3">
      <span className="text-[17px] font-medium text-blue-400 tracking-tight">{word}</span>
      <span className="text-[10.5px] px-2 py-0.5 bg-[#0c1a2e] border border-[#1a3a5c] rounded-full text-blue-400">{type}</span>
    </div>
    <p className="text-[12.5px] text-slate-400 leading-relaxed mb-1.5">{definition}</p>
    <p className="text-[12px] text-slate-500 mb-3">{bangla}</p>
    <div className="h-px bg-[#1e2330] mb-3" />
    <div className="flex flex-wrap gap-1.5 mb-1.5">
      {synonyms.map(s => <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-[#0c1f17] border border-[#0f3a23] text-emerald-400">{s}</span>)}
    </div>
    <div className="flex flex-wrap gap-1.5 mb-3">
      {antonyms.map(a => <span key={a} className="text-[11px] px-2 py-0.5 rounded-full bg-[#1f0c0c] border border-[#3a1515] text-red-400">{a}</span>)}
    </div>
    <p className="text-[11.5px] text-slate-500 italic leading-relaxed border-l-2 border-[#1e2330] pl-2">{example}</p>
  </div>
);

const PhraseCard = ({ title, meaning, bangla }) => (
  <div className="bg-[#13161e] border border-[#1e2330] rounded-xl p-4">
    <div className="w-0.5 h-7 bg-amber-500 mb-2.5" style={{borderRadius:0}} />
    <p className="text-[13.5px] font-medium text-amber-400 mb-1.5">{title}</p>
    <p className="text-[12px] text-slate-400 leading-relaxed mb-1.5">{meaning}</p>
    <p className="text-[11.5px] text-slate-500">{bangla}</p>
  </div>
);

export default Home;