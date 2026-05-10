import React, { useState } from "react";
import { CheckCircle, Loader2, ShieldCheck, Zap, BookOpen, Volume2, Star, ArrowRight, Copy, Check } from "lucide-react";
import useData from "../hooks/UseData";
// import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { DotLoader } from "./DoLoader";
import usePageTitle from "../hooks/usePageTitle";
import useAuth from "../hooks/useAuth";

const PAYMENT_METHODS = [
  {
    id: "bkash",
    name: "bKash",
    number: "01884142484",
    color: "#E2136E",
    bg: "#fdf0f6",
    border: "#f9b8d8",
    logo: "bKash",
    instruction: "Send money to the bKash number above and enter your transaction ID below.",
    accent: "#E2136E",
  },
  {
    id: "nagad",
    name: "Nagad",
    number: "01884142484",
    color: "#F7931E",
    bg: "#fff8f0",
    border: "#fdd9a8",
    logo: "Nagad",
    instruction: "Send money to the Nagad number above and enter your transaction ID below.",
    accent: "#F7931E",
  },
  {
    id: "rocket",
    name: "Rocket",
    number: "01884142484",
    color: "#8B2FC9",
    bg: "#f8f0fd",
    border: "#ddb8f5",
    logo: "Rocket",
    instruction: "Send money to the Rocket number above and enter your transaction ID below.",
    accent: "#8B2FC9",
  },
];

const FEATURES = [
  { icon: <BookOpen size={16} />, text: "100% job oriented contents" },
  { icon: <BookOpen size={16} />, text: "Unlimited vocabulary words" },
  { icon: <BookOpen size={16} />, text: "Unlimited phrases and idoms" },
  { icon: <BookOpen size={16} />, text: "Unlimited group verbs meaning" },
  { icon: <BookOpen size={16} />, text: "Different parts of speech of the word" },
  { icon: <BookOpen size={16} />, text: "Word definition" },
  { icon: <BookOpen size={16} />, text: "Practical example using words/ phrase/ idoms" },
  { icon: <Volume2 size={16} />, text: "Native pronunciation (all voices)" },
  { icon: <Zap size={16} />, text: "Synonym & antonym search" },
  { icon: <Star size={16} />, text: "New words added weekly" },
  { icon: <ShieldCheck size={16} />, text: "Priority support" },
];

const STEPS = ["Choose Method", "Your Info", "Payment Details", "Confirm"];

export default function PricingPage() {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loadingPricing, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const {payments, loading} = useData();
  const {user} = useAuth();
  usePageTitle("Pricing ASH Vocab")

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    transactionId: "",
    senderNumber: "",
    amount: "150",
  });

  const method = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validate = () => {
    const e = {};
    if (step === 2) {
      if (!form.name.trim()) e.name = "Name is required";
      if (!form.phone.trim() || form.phone.length < 11) e.phone = "Valid phone number required";
    }
    if (step === 3) {
      if (!form.transactionId.trim()) e.transactionId = "Transaction ID is required";
      if (!form.senderNumber.trim() || form.senderNumber.length < 11) e.senderNumber = "Sender number is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !selectedMethod) return;
    if (!validate()) return;
    setStep((s) => s + 1);
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("action", "paymentDetails");
      params.append("name", form.name);
      params.append("email", user.email);
      params.append("phone", form.phone);
      params.append("paymentMethod", method?.name || "");
      params.append("transactionId", form.transactionId);
      params.append("senderNumber", form.senderNumber);
      params.append("amount", form.amount);
      params.append("submittedAt", new Date().toISOString());

      await fetch(import.meta.env.VITE_PRIZING_DETAILS_POST_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if(loading){
    return <DotLoader />
  }
  // Find this user's payment record
  const paymentStatus = payments?.["Status"]?.toLowerCase();

  // Already activated
  if (paymentStatus === "activated") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-950 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-3">You're Premium!</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Your Premium access is <span className="text-green-400 font-semibold">active</span>. Enjoy unlimited vocabulary, pronunciation & more.
          </p>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 text-left mb-8 space-y-2">
            <Row label="Method" value={payments["Payment Method"]} />
            <Row label="Transaction ID" value={payments["Transaction ID"]} mono />
            <Row label="Amount" value={`৳${payments["Amount (৳)"]}`} green />
            <Row label="Status" value="Activated ✓" green />
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition text-base"
          >
            Go to Dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // Payment pending verification
  if (paymentStatus === "pending") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-yellow-950 border-2 border-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 size={40} className="text-yellow-400 animate-spin" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Payment Under Review</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Hi <span className="text-yellow-400 font-semibold">{payments["Name"]}</span>, we've received your payment and it's currently being verified. Your Premium access will be activated within{" "}
            <span className="text-yellow-400 font-semibold">24 hours</span>.
          </p>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 text-left mb-8 space-y-3">
            <Row label="Method" value={payments["Payment Method"]} />
            <Row label="Transaction ID" value={payments["Transaction ID"]} mono />
            <Row label="Amount" value={`৳${payments["Amount (৳)"]}`} green />
            <Row label="Submitted" value={new Date(payments["Submitted At"]).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" })} />
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">Status</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-yellow-950 border border-yellow-800 text-yellow-400 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                Pending Verification
              </span>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-3 mb-6 text-left">
            <ShieldCheck size={18} className="text-gray-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              If it's been more than 24 hours, please contact support with your Transaction ID.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold px-8 py-4 rounded-xl transition text-base"
          >
            Back to Home <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // Payment rejected
  if (paymentStatus === "rejected") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-950 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={40} className="text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Payment Rejected</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Unfortunately your payment could not be verified. Please resubmit with the correct transaction details or contact support.
          </p>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 text-left mb-8 space-y-2">
            <Row label="Method" value={payments["Payment Method"]} />
            <Row label="Transaction ID" value={payments["Transaction ID"]} mono />
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-500">Status</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-950 border border-red-800 text-red-400 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Rejected
              </span>
            </div>
          </div>
          <button
            onClick={() => { setStep(1); setSelectedMethod(null); setSubmitted(false); }}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition text-base"
          >
            Try Again <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-950 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 mb-3">Payment Submitted!</h2>
          <p className="text-gray-400 text-base leading-relaxed mb-6">
            Thank you, <span className="text-green-400 font-semibold">{form.name}</span>! We've received your payment details. Your Premium access will be activated within <span className="text-green-400 font-semibold">24 hours</span>.
          </p>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 text-left mb-8 space-y-2">
            <Row label="Method" value={method?.name} />
            <Row label="Transaction ID" value={form.transactionId} />
            <Row label="Amount" value={`৳${form.amount}`} />
            <Row label="Email" value={form.email} />
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition text-base"
          >
            Back to Home <ArrowRight size={18} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-100">VocabPro</span>
          </div>
          <div className="flex items-center gap-1">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    step === i + 1
                      ? "bg-green-600 text-white"
                      : step > i + 1
                      ? "bg-green-950 text-green-400 border border-green-800"
                      : "bg-gray-900 text-gray-500"
                  }`}
                >
                  {step > i + 1 ? <Check size={10} /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-4 h-px ${step > i + 1 ? "bg-green-600" : "bg-gray-800"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid lg:grid-cols-5 gap-8">
        {/* Left: Plan Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-green-950 rounded-xl flex items-center justify-center">
                <Zap size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">Premium</p>
                <p className="text-lg font-bold text-gray-100">Vocabulary Plan</p>
              </div>
            </div>

            <div className="flex items-end gap-2 mb-1">
              <span className="text-gray-600 line-through text-base">৳250</span>
              <span className="text-4xl font-extrabold text-green-400">৳150</span>
            </div>
            <p className="text-gray-500 text-sm mb-1">per month</p>
            <div className="inline-block bg-green-950 border border-green-900 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-5">
              ✦ 40% off — Save ৳100
            </div>

            <hr className="border-gray-800 mb-5" />

            <ul className="space-y-3">
              {FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-6 h-6 bg-green-950 rounded-full flex items-center justify-center text-green-500 flex-shrink-0">
                    {f.icon}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            <hr className="border-gray-800 my-5" />
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <ShieldCheck size={14} className="text-green-700" />
              30-day money-back guarantee
            </div>
          </div>
        </div>

        {/* Right: Steps */}
        <div className="lg:col-span-3 space-y-6">

          {/* Step 1: Choose Method */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-1">Choose Payment Method</h2>
              <p className="text-gray-500 text-sm mb-6">Select your preferred mobile banking method.</p>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setSelectedMethod(pm.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedMethod === pm.id
                        ? "border-green-500 bg-green-950/30"
                        : "border-gray-800 bg-gray-900 hover:border-gray-700"
                    }`}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0"
                      style={{ backgroundColor: pm.color, color: "#fff" }}
                    >
                      {pm.logo.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-100 text-base">{pm.name}</p>
                      <p className="text-gray-500 text-sm">Send to: <span className="font-mono text-gray-300">{pm.number}</span></p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        selectedMethod === pm.id ? "border-green-500 bg-green-500" : "border-gray-600"
                      }`}
                    >
                      {selectedMethod === pm.id && <Check size={10} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-1">Your Information</h2>
              <p className="text-gray-500 text-sm mb-6">We'll use this to activate your Premium account.</p>
              <div className="space-y-4">
                <Field
                  label="Full Name"
                  type="text"
                  placeholder="e.g. Rahim Uddin"
                  value={form.name}
                  onChange={(v) => handleChange("name", v)}
                  error={errors.name}
                />
                <Field
                  label="Phone Number"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={form.phone}
                  onChange={(v) => handleChange("phone", v)}
                  error={errors.phone}
                />
              </div>
            </div>
          )}

          {/* Step 3: Payment Details */}
          {step === 3 && method && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-1">Payment Details</h2>
              <p className="text-gray-500 text-sm mb-6">Send <span className="text-green-400 font-bold">৳150</span> using {method.name} then fill below.</p>

              {/* Payment instruction box */}
              <div
                className="rounded-2xl p-5 mb-6 border"
                style={{ backgroundColor: method.bg + "15", borderColor: method.color + "40" }}
              >
                <p className="text-sm font-semibold mb-3" style={{ color: method.color }}>
                  {method.name} Number
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-2xl font-bold text-gray-100 tracking-wider">{method.number}</span>
                  <button
                    onClick={() => handleCopy(method.number)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-700 text-gray-400 hover:text-gray-200 hover:border-gray-600 transition"
                  >
                    {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3">{method.instruction}</p>
              </div>

              <div className="space-y-4">
                <Field
                  label="Transaction ID"
                  type="text"
                  placeholder="e.g. ABC1234567"
                  value={form.transactionId}
                  onChange={(v) => handleChange("transactionId", v)}
                  error={errors.transactionId}
                  mono
                />
                <Field
                  label={`${method.name} Sender Number`}
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={form.senderNumber}
                  onChange={(v) => handleChange("senderNumber", v)}
                  error={errors.senderNumber}
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Amount Sent</label>
                  <div className="bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-gray-400 font-mono flex items-center gap-2">
                    <span className="text-green-500 font-bold text-lg">৳</span>
                    <span className="text-gray-200 font-bold text-lg">150</span>
                    <span className="ml-auto text-xs text-green-600 bg-green-950 px-2 py-0.5 rounded-full">Fixed</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && method && (
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-1">Confirm & Submit</h2>
              <p className="text-gray-500 text-sm mb-6">Review your details before final submission.</p>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3 mb-6">
                <SummarySection title="Personal Info">
                  <Row label="Name" value={form.name} />
                  <Row label="Email" value={user.email} />
                  <Row label="Phone" value={form.phone} />
                </SummarySection>
                <hr className="border-gray-800" />
                <SummarySection title="Payment Info">
                  <Row label="Method" value={method.name} accent={method.color} />
                  <Row label="Transaction ID" value={form.transactionId} mono />
                  <Row label="Sender Number" value={form.senderNumber} />
                  <Row label="Amount" value="৳150" green />
                </SummarySection>
              </div>

              <div className="bg-green-950 border border-green-900 rounded-xl p-4 flex items-start gap-3 mb-6">
                <ShieldCheck size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-300">
                  By submitting, you confirm that the payment details are accurate. Your Premium access will be activated within 24 hours after verification.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 pt-2">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-semibold hover:bg-gray-900 transition text-sm"
              >
                Back
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={handleNext}
                disabled={step === 1 && !selectedMethod}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition text-base"
              >
                Continue <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loadingPricing}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition text-base"
              >
                {loadingPricing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={18} /> Submit Payment
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type, placeholder, value, onChange, error, mono }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-gray-900 border rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 outline-none transition text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
          mono ? "font-mono tracking-wider" : ""
        } ${error ? "border-red-500" : "border-gray-700 hover:border-gray-600"}`}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function SummarySection({ title, children }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-3">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value, mono, green, accent }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`text-sm font-semibold text-right ${mono ? "font-mono" : ""} ${
          green ? "text-green-400" : "text-gray-200"
        }`}
        style={accent ? { color: accent } : {}}
      >
        {value}
      </span>
    </div>
  );
}