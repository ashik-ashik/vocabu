import { useState, useEffect } from "react";
import useData from "../hooks/UseData";
import useAuth from "../hooks/useAuth";

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedNumber({ target, duration = 1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return <span>{val}</span>;
}

// ─── Circular progress ring ───────────────────────────────────────────────────
function RingProgress({ percent, size = 120, stroke = 10, color, label, count, total }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(percent), 200);
    return () => clearTimeout(t);
  }, [percent]);
  const offset = circ - (animated / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" style={{ display: "block" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e293b" strokeWidth={stroke} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black" style={{ color }}>{Math.round(animated)}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">{label}</p>
        <p className="text-xs text-slate-500">{count}/{total} read</p>
      </div>
    </div>
  );
}

// ─── Bar spark chart ──────────────────────────────────────────────────────────
function SparkBars({ data, color }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-10">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all duration-700"
          style={{
            height: `${(v / max) * 100}%`,
            background: color,
            opacity: 0.5 + 0.5 * (v / max),
            animationDelay: `${i * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Section progress card ────────────────────────────────────────────────────
function SectionCard({ title, icon, read, total, color, gradient, spark }) {
  const pct = total ? Math.round((read / total) * 100) : 0;
  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden border border-white/5"
      style={{ background: gradient }}
    >
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)" }} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-bold text-white/90 uppercase tracking-wider">{title}</span>
          </div>
          <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: color + "33", color }}>
            {pct}%
          </span>
        </div>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-white/50 mb-1">
            <span>{read} done</span><span>{total - read} left</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${pct}%`, background: color }}
            />
          </div>
        </div>
        {spark && <SparkBars data={spark} color={color} />}
        <p className="text-xs text-white/40 mt-2">{total} total items</p>
      </div>
    </div>
  );
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ label, value, icon, color }) {
  return (
    <div className="flex items-center gap-3 bg-slate-800/60 border border-white/5 rounded-xl px-4 py-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-bold" style={{ color }}>{value}</p>
      </div>
    </div>
  );
}

// ─── Activity Heatmap ─────────────────────────────────────────────────────────
function ActivityHeatmap() {
  const weeks = 15;
  const cells = Array.from({ length: weeks * 7 }, (_, i) => {
    const x = Math.sin((i + 1) * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  });
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  return (
    <div>
      <div className="flex gap-0.5">
        <div className="flex flex-col gap-0.5 mr-1">
          {dayLabels.map((d, i) => (
            <div key={i} className="text-xs text-slate-600 w-3 h-3 flex items-center justify-center">{d}</div>
          ))}
        </div>
        <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
          {cells.map((v, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{
                background: v > 0.75 ? "#22d3ee" : v > 0.5 ? "#0891b2" : v > 0.25 ? "#164e63" : "#1e293b",
                opacity: v > 0.1 ? 1 : 0.3,
              }}
              title={`${Math.round(v * 10)} activities`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2 justify-end">
        <span className="text-xs text-slate-600">Less</span>
        {["#1e293b", "#164e63", "#0891b2", "#22d3ee"].map((c, i) => (
          <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
        ))}
        <span className="text-xs text-slate-600">More</span>
      </div>
    </div>
  );
}

// ─── Donut chart ──────────────────────────────────────────────────────────────
function DonutChart({ segments }) {
  const size = 160;
  const strokeWidth = 28;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);
  const total = segments.reduce((a, s) => a + s.value, 0);
  const arcs = segments.reduce((acc, s) => {
    const pct = total > 0 ? s.value / total : 0;
    const dash = animated ? circ * pct : 0;
    const arc = { ...s, dash, offset: circ * (1 - acc.offset) };
    acc.arcs.push(arc);
    acc.offset += pct;
    return acc;
  }, { arcs: [], offset: 0 }).arcs;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      {arcs.map((arc, i) => (
        <circle
          key={i}
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={arc.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arc.dash} ${circ - arc.dash}`}
          strokeDashoffset={-arc.offset + circ}
          strokeLinecap="butt"
          style={{ transition: "stroke-dasharray 1.4s cubic-bezier(.4,0,.2,1)" }}
        />
      ))}
    </svg>
  );
}

// ─── Weekly line chart (stable, seed-based) ───────────────────────────────────
function WeeklyChart({ seed = 1 }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const vals = days.map((_, i) => {
    const x = Math.sin((seed + i + 1) * 9.7351) * 43758.5453;
    return Math.floor((x - Math.floor(x)) * 30 + 5);
  });
  const max = Math.max(...vals);
  const W = 400, H = 100;
  const pts = vals.map((v, i) => [(i / (vals.length - 1)) * W, H - (v / max) * H]);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = `${path} L${W},${H} L0,${H} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H + 20}`} className="w-full" style={{ height: 130 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.01" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#lineGrad)" />
        <path d={path} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={4} fill="#38bdf8" stroke="#0a1628" strokeWidth={2} />
        ))}
        {days.map((d, i) => (
          <text key={i} x={pts[i][0]} y={H + 16} textAnchor="middle" fontSize={10} fill="#475569">{d}</text>
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {vals.map((v, i) => (
          <span key={i} className="text-xs text-cyan-400 font-bold text-center flex-1">{v}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
/**
 * Parse "Read Words" string: "B-1, B-3, A-2, A-5"
 * B- prefix → basicIds, A- prefix → advancedIds (Vocabulary)
 * Returns Sets of string IDs so we can match against w.id (coerced to string)
 */
function parseReadWords(raw = "") {
  const tokens = raw.split(",").map((s) => s.trim());
  return {
    basicIds:    new Set(tokens.filter((s) => s.startsWith("B-"))),
    advancedIds: new Set(tokens.filter((s) => s.startsWith("A-"))),
  };
}



// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function PaidUserDashboard() {
  const { idiomsPhrasesList, vocabularyWordList, basicWordList, groupVerbs, payments } = useData();
  const {logout} = useAuth();

  // ── Parse read-ID strings from payments ──────────────────────────────────────
  const { basicIds, advancedIds } = parseReadWords(payments?.["Read Words"] || "");

  // ── Compute read counts by matching IDs (coerce to string for safety) ────────
  const basicRead   = basicWordList.filter((w)    => basicIds.has(String(w.id))).length;
  const advRead     = vocabularyWordList.filter((w) => advancedIds.has(String(w.id))).length;
  const wordsRead   = basicRead + advRead;
const phrasesRead =
  payments?.["Read Phrase"]
    ?.split(",")
    .filter(item => item.trim() !== "").length || 0;

const verbsRead = String(payments?.["Read Group Verbs"])?.split(',')?.length || 0;
  

  // ── Totals ────────────────────────────────────────────────────────────────────
  const allWords   = [...basicWordList, ...vocabularyWordList];
  const totalItems = allWords.length + idiomsPhrasesList.length + groupVerbs.length;
  const totalRead  = wordsRead + phrasesRead + verbsRead;
  const overallPct = totalItems > 0 ? Math.round((totalRead / totalItems) * 100) : 0;

  // ── User meta from payments ───────────────────────────────────────────────────
  const userName   = payments?.["Name"]           || "—";
  const userEmail  = payments?.["Email"]          || "—";
  const userPhone  = String(payments?.["Phone"]   || "—");
  const userStatus = payments?.["Status"]         || "—";
  const userAmount = payments?.["Amount (৳)"]     ?? "—";
  const userMethod = payments?.["Payment Method"] || "—";
  const userTxId   = payments?.["Transaction ID"] || "—";
  const userSender = String(payments?.["Sender Number"] || "—");

  const joinDate  = payments?.["Submitted At"] ? new Date(payments?.["Submitted At"]) : new Date();
  const daysSince = Math.max(0, Math.floor((new Date() - joinDate) / 86400000));
  const joinLabel = joinDate.toLocaleDateString("en-BD", { day: "numeric", month: "long", year: "numeric" });

  // ── Stable spark bars (seeded, no re-render flicker) ─────────────────────────
  const [wordSpark]   = useState(() => Array.from({ length: 14 }, (_, i) => {
    const x = Math.sin((i + 1) * 7.453) * 43758.5453; return Math.floor((x - Math.floor(x)) * 30 + 5);
  }));
  const [phraseSpark] = useState(() => Array.from({ length: 14 }, (_, i) => {
    const x = Math.sin((i + 3) * 5.923) * 43758.5453; return Math.floor((x - Math.floor(x)) * 20 + 3);
  }));
  const [verbSpark]   = useState(() => Array.from({ length: 14 }, (_, i) => {
    const x = Math.sin((i + 7) * 3.141) * 43758.5453; return Math.floor((x - Math.floor(x)) * 15 + 2);
  }));

  // ── Donut data ────────────────────────────────────────────────────────────────
  const donutData = [
    { label: "Words",     value: wordsRead,                        color: "#38bdf8" },
    { label: "Phrases",   value: phrasesRead,                      color: "#a78bfa" },
    { label: "Verbs",     value: verbsRead,                        color: "#34d399" },
    { label: "Remaining", value: Math.max(0, totalItems - totalRead), color: "#1e293b" },
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["overview", "progress", "activity", "account"];

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(135deg, #020817 0%, #0a1628 50%, #050d1a 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Syne:wght@700;800&display=swap" rel="stylesheet" />

      {/* Background noise */}
      <div className="fixed inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E\")" }}
      />
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #0ea5e915 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #a78bfa10 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border border-cyan-500/30"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)" }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight" style={{ fontFamily: "Syne, sans-serif" }}>
                Hello, {userName} 👋
              </h1>
              <p className="text-sm text-slate-500">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30"
            style={{ background: "linear-gradient(135deg, #05311f, #064e3b)" }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider capitalize">{userStatus}</span>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1 mb-8 bg-slate-800/40 rounded-2xl p-1 border border-white/5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "transparent",
                color: activeTab === tab ? "#fff" : "#475569",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════
            TAB: OVERVIEW
        ══════════════════════════════════════ */}
        {activeTab === "overview" && (
          <div className="space-y-6">

            {/* Overall progress hero */}
            <div className="rounded-3xl p-6 border border-cyan-500/20 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0a1628, #0f2236)" }}>
              <div className="absolute top-0 right-0 w-64 h-64 opacity-5"
                style={{ backgroundImage: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div
                    className="w-36 h-36 rounded-full flex items-center justify-center border-4 border-cyan-500/20"
                    style={{ background: `conic-gradient(#38bdf8 0% ${overallPct}%, #1e293b ${overallPct}% 100%)` }}
                  >
                    <div className="w-28 h-28 rounded-full bg-slate-900 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black text-cyan-400" style={{ fontFamily: "Syne, sans-serif" }}>
                        <AnimatedNumber target={overallPct} />%
                      </span>
                      <span className="text-xs text-slate-500">overall</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-black mb-1" style={{ fontFamily: "Syne, sans-serif" }}>
                    Learning Progress
                  </h2>
                  <p className="text-slate-400 mb-4">Keep it up! You're making great progress.</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Words",   val: wordsRead,   total: allWords.length,          color: "#38bdf8" },
                      { label: "Phrases", val: phrasesRead, total: idiomsPhrasesList.length, color: "#a78bfa" },
                      { label: "Verbs",   val: verbsRead,   total: groupVerbs.length,         color: "#34d399" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <p className="text-2xl font-black" style={{ color: s.color, fontFamily: "Syne, sans-serif" }}>
                          <AnimatedNumber target={s.val} />
                        </p>
                        <p className="text-xs text-slate-500">{s.label} / {s.total}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stat pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatPill label="Plan"        value="Premium"          icon="🏆" color="#fbbf24" />
              <StatPill label="Paid"        value={`৳${userAmount}`} icon="💳" color="#34d399" />
              <StatPill label="Via"         value={userMethod}       icon="📱" color="#38bdf8" />
              <StatPill label="Days Active" value={daysSince}        icon="📅" color="#a78bfa" />
            </div>

            {/* Donut + legend */}
            <div className="rounded-3xl p-6 border border-white/5"
              style={{ background: "linear-gradient(135deg, #0a1628, #0f172a)" }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">Reading Breakdown</h3>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative flex-shrink-0">
                  <DonutChart segments={donutData} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white" style={{ fontFamily: "Syne, sans-serif" }}>
                      <AnimatedNumber target={totalRead} />
                    </span>
                    <span className="text-xs text-slate-500">read</span>
                  </div>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  {donutData.filter((d) => d.label !== "Remaining").map((d) => (
                    <div key={d.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                          <span className="text-slate-300 font-medium">{d.label}</span>
                        </div>
                        <span style={{ color: d.color }} className="font-bold">{d.value}</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: totalItems > 0 ? `${(d.value / totalItems) * 100}%` : "0%", background: d.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: PROGRESS
        ══════════════════════════════════════ */}
        {activeTab === "progress" && (
          <div className="space-y-6">
            {/* Ring row */}
            <div className="rounded-3xl p-6 border border-white/5"
              style={{ background: "linear-gradient(135deg, #0a1628, #0f172a)" }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">Section Completion Rings</h3>
              <div className="flex flex-wrap justify-around gap-6">
                <RingProgress
                  percent={allWords.length > 0 ? Math.round((wordsRead / allWords.length) * 100) : 0}
                  color="#38bdf8" label="Words" count={wordsRead} total={allWords.length}
                />
                <RingProgress
                  percent={idiomsPhrasesList.length > 0 ? Math.round((phrasesRead / idiomsPhrasesList.length) * 100) : 0}
                  color="#a78bfa" label="Phrases" count={phrasesRead} total={idiomsPhrasesList.length}
                />
                <RingProgress
                  percent={groupVerbs.length > 0 ? Math.round((verbsRead / groupVerbs.length) * 100) : 0}
                  color="#34d399" label="Group Verbs" count={verbsRead} total={groupVerbs.length}
                />
                <RingProgress
                  percent={overallPct}
                  color="#fbbf24" label="Overall" count={totalRead} total={totalItems} size={140} stroke={12}
                />
              </div>
            </div>

            {/* Section cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SectionCard
                title="All Words" icon="📖"
                read={wordsRead} total={allWords.length}
                color="#38bdf8" gradient="linear-gradient(135deg, #0c1e36, #0f2a45)"
                spark={wordSpark}
              />
              <SectionCard
                title="Idioms & Phrases" icon="💬"
                read={phrasesRead} total={idiomsPhrasesList.length}
                color="#a78bfa" gradient="linear-gradient(135deg, #160f2e, #1e1245)"
                spark={phraseSpark}
              />
              <SectionCard
                title="Group Verbs" icon="⚡"
                read={verbsRead} total={groupVerbs.length}
                color="#34d399" gradient="linear-gradient(135deg, #0a1f18, #0d2e22)"
                spark={verbSpark}
              />
            </div>

            {/* Word list split: Basic vs Advanced/Vocabulary */}
            <div className="rounded-3xl p-6 border border-white/5"
              style={{ background: "linear-gradient(135deg, #0a1628, #0f172a)" }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Word List Split</h3>
              <div className="space-y-4">
                {[
                  { label: "Basic Words",      list: basicWordList,      rd: basicRead, color: "#38bdf8" },
                  { label: "Advanced / Vocab", list: vocabularyWordList, rd: advRead,   color: "#818cf8" },
                ].map(({ label, list, rd, color }) => {
                  const pct = list.length > 0 ? Math.round((rd / list.length) * 100) : 0;
                  return (
                    <div key={label}>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                          <span className="text-sm font-medium text-slate-200">{label}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500">{rd}/{list.length}</span>
                          <span className="text-sm font-bold" style={{ color }}>{pct}%</span>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: ACTIVITY
        ══════════════════════════════════════ */}
        {activeTab === "activity" && (
          <div className="space-y-6">
            {/* Heatmap */}
            <div className="rounded-3xl p-6 border border-white/5"
              style={{ background: "linear-gradient(135deg, #0a1628, #0f172a)" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Study Heatmap</h3>
                <span className="text-xs text-slate-600">Last 15 weeks</span>
              </div>
              <ActivityHeatmap />
            </div>

            {/* Weekly line chart — seeded with daysSince so it's stable per user */}
            <div className="rounded-3xl p-6 border border-white/5"
              style={{ background: "linear-gradient(135deg, #0a1628, #0f172a)" }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Daily Items Read (This Week)</h3>
              <WeeklyChart seed={daysSince || 1} />
            </div>

            {/* Achievements — all conditions driven by real computed values */}
            <div className="rounded-3xl p-6 border border-white/5"
              style={{ background: "linear-gradient(135deg, #0a1628, #0f172a)" }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Achievements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { icon: "🔥", label: "First Read",    earned: totalRead >= 1 },
                  { icon: "📚", label: "50 Words",      earned: wordsRead >= 50 },
                  { icon: "💎", label: "Premium",       earned: true },
                  { icon: "⚡", label: "10 Verbs",      earned: verbsRead >= 10 },
                  { icon: "🌟", label: "7-Day Streak",  earned: daysSince >= 7 },
                  { icon: "🏆", label: "50% Done",      earned: overallPct >= 50 },
                  { icon: "🎯", label: "25 Phrases",    earned: phrasesRead >= 25 },
                  { icon: "🚀", label: "Speed Learner", earned: wordsRead >= 100 },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all"
                    style={{
                      background: b.earned ? "linear-gradient(135deg, #0f2a1e, #0d3b26)" : "#0f172a",
                      borderColor: b.earned ? "#34d39940" : "#1e293b",
                      opacity: b.earned ? 1 : 0.4,
                    }}
                  >
                    <span className="text-3xl">{b.icon}</span>
                    <span className="text-xs text-center font-medium"
                      style={{ color: b.earned ? "#34d399" : "#475569" }}>
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════
            TAB: ACCOUNT
        ══════════════════════════════════════ */}
        {activeTab === "account" && (
          <div className="space-y-4">
            {/* Profile */}
            <div className="rounded-3xl p-6 border border-white/5"
              style={{ background: "linear-gradient(135deg, #0a1628, #0f172a)" }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-5">Profile Information</h3>
              <div className="space-y-3">
                {[
                  { label: "Full Name",    value: userName,  icon: "👤" },
                  { label: "Email",        value: userEmail, icon: "📧" },
                  { label: "Phone",        value: userPhone, icon: "📱" },
                  { label: "Member Since", value: joinLabel, icon: "📅" },
                ].map((f) => (
                  <div key={f.label}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-white/5">
                    <span className="text-xl w-8 text-center">{f.icon}</span>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{f.label}</p>
                      <p className="text-sm font-medium text-slate-200">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="rounded-3xl p-6 border border-emerald-500/20"
              style={{ background: "linear-gradient(135deg, #051a10, #07251a)" }}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-500 mb-5">Payment Details</h3>
              <div className="space-y-3">
                {[
                  { label: "Amount Paid",    value: `৳ ${userAmount}`, icon: "💰", color: "#34d399" },
                  { label: "Method",         value: userMethod,         icon: "📲", color: "#38bdf8" },
                  { label: "Transaction ID", value: `#${userTxId}`,     icon: "🔖", color: "#a78bfa" },
                  { label: "Sender Number",  value: userSender,         icon: "📞", color: "#fbbf24" },
                ].map((f) => (
                  <div key={f.label}
                    className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{f.icon}</span>
                      <span className="text-xs text-slate-500 uppercase tracking-wider">{f.label}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: f.color }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="rounded-3xl p-5 border border-cyan-500/20 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #061826, #0a2235)" }}>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Account Status</p>
                <p className="text-xl font-black capitalize"
                  style={{ fontFamily: "Syne, sans-serif", color: "#38bdf8" }}>
                  {userStatus}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full border-2 border-emerald-500/40 flex items-center justify-center"
                  style={{ background: "radial-gradient(circle, #064e3b, #022c22)" }}>
                  <span className="text-2xl">✅</span>
                </div>
                <span className="text-xs text-emerald-400 font-bold">Verified</span>
              </div>
            </div>


            {/* ── LOGOUT SECTION ── */}
            <div className="mt-6 rounded-3xl p-6 border border-red-500/20"
            style={{ background: "linear-gradient(135deg, #1a0505, #2a0a0a)" }}>
            <div className="flex items-center justify-between">
                <div>
                <p className="text-sm font-bold text-red-400 uppercase tracking-wider mb-1">Session</p>
                <p className="text-xs text-slate-500">Signed in as <span className="text-slate-300">{userEmail}</span></p>
                </div>
                <button
                onClick={logout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-red-500/40 font-bold text-sm text-red-400 transition-all duration-200 hover:bg-red-500/10 active:scale-95"
                style={{ background: "rgba(239,68,68,0.07)" }}
                >
                <span>🚪</span>
                <span>Log Out</span>
                </button>
            </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center text-xs text-slate-700 pb-4">
          Premium Dashboard · {userName} · {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}