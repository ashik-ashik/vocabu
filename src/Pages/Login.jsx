import React from "react";
import useAuth from "../hooks/useAuth";
import usePageTitle from "../hooks/usePageTitle";

const Login = () => {
  const { user, googleLogin, logout, userRole, usersList } = useAuth();
  usePageTitle("Login | ASH English Learning");

  const handleLogin = async () => {
    try { await googleLogin(); }
    catch (error) { console.log(error.message); }
  };

  const thisUser = usersList.find((u) => u?.email === user?.email);

  return (
    <div className="min-h-screen flex bg-[#0f1117]">

      {/* Left panel */}
      <div className="hidden lg:flex w-64 flex-shrink-0 flex-col justify-between bg-[#0a0c10] border-r border-[#1e2330] px-6 py-7">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 15 15" fill="none" className="w-4 h-4">
              <path d="M2.5 11.5L7.5 3.5L12.5 11.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.5 9H10.5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-[13px] font-medium text-slate-200 tracking-tight">ASH English</span>
        </div>

        <div>
          <h1 className="text-[20px] font-medium text-slate-100 leading-snug tracking-tight mb-2.5">
            Your personal vocabulary dictionary
          </h1>
          <p className="text-[12.5px] text-slate-500 leading-relaxed">
            Master words, meanings &amp; synonyms — at your own pace.
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {["Words, meanings & synonyms", "Track your learning streak", "Syncs across all devices"].map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-[12px] text-slate-500">
                <span className="w-[15px] h-[15px] rounded-full bg-[#1e293b] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2">
                    <path d="M1.5 4L3.2 5.8L6.5 2.5" stroke="#1D9E75" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <span className="text-[11px] text-slate-600">© 2025 ASH English Learning</span>
      </div>

      {/* Right card */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-[#13161e] border border-[#1e2330] rounded-2xl w-full max-w-[340px] p-8">

          {user ? (
            <>
              <p className="text-[18px] font-medium text-slate-100 tracking-tight mb-1">Your account</p>
              <p className="text-[12.5px] text-slate-500 mb-6">You're signed in and ready to learn</p>

              <div className="flex flex-col gap-3">
                {/* User card */}
                <div className="flex items-center gap-3 bg-[#0f1117] border border-[#1e2330] rounded-xl p-3.5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={user?.photoURL || "https://lh3.googleusercontent.com/a/default"}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover border-[1.5px] border-[#1e2330]"
                    />
                    <span className="absolute bottom-px right-px w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0f1117]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-medium text-slate-200 truncate">{user?.displayName}</p>
                    <p className="text-[11.5px] text-slate-500 truncate">{user?.email}</p>
                    <span className="inline-flex items-center mt-1 px-2 py-0.5 bg-[#0c1a2e] border border-[#1a3a5c] rounded-full text-[10.5px] text-blue-400 capitalize tracking-wide">
                      {userRole}
                    </span>
                  </div>
                </div>

                {/* Last login */}
                {thisUser?.lastLoginAt && (
                  <div className="flex items-center gap-1.5 text-[11.5px] text-slate-600 px-0.5">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
                      <path d="M1 5.5h11M4 1v2M9 1v2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                    </svg>
                    Last login: {thisUser.lastLoginAt.split(",")[0]}
                  </div>
                )}

                {/* Sign out */}
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-transparent border border-[#2a1a1a] hover:border-[#5a2020] hover:bg-[#1a0a0a] rounded-xl text-[13px] font-medium text-[#7f3535] hover:text-[#c05050] transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M4.5 11H2A1 1 0 0 1 1 10V3a1 1 0 0 1 1-1h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M8.5 9.5L12 6.5l-3.5-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6.5H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-[18px] font-medium text-slate-100 tracking-tight mb-1">Welcome back</p>
              <p className="text-[12.5px] text-slate-500 mb-6">Sign in to access your dashboard</p>

              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-[#1a1d27] hover:bg-[#1e2233] border border-[#2a2f3e] hover:border-[#3b4258] rounded-xl text-[13.5px] font-medium text-slate-300 transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.68 8.18c0-.57-.05-1.12-.15-1.64H8v3.1h4.32a3.69 3.69 0 0 1-1.6 2.43v2.02h2.59c1.52-1.4 2.39-3.46 2.39-5.9Z" fill="#4285F4"/>
                  <path d="M8 16c2.16 0 3.97-.72 5.3-1.95l-2.59-2.02c-.72.48-1.64.77-2.71.77-2.09 0-3.86-1.41-4.49-3.31H.84v2.08A8 8 0 0 0 8 16Z" fill="#34A853"/>
                  <path d="M3.51 9.49A4.82 4.82 0 0 1 3.26 8c0-.52.09-1.03.25-1.51V4.41H.84A8 8 0 0 0 0 8c0 1.29.31 2.52.84 3.6l2.67-2.11Z" fill="#FBBC05"/>
                  <path d="M8 3.18c1.18 0 2.23.41 3.06 1.2l2.3-2.3C11.96.79 10.15 0 8 0A8 8 0 0 0 .84 4.41l2.67 2.08C4.14 4.59 5.91 3.18 8 3.18Z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="h-px bg-[#1e2330] my-5" />
              <p className="text-[11px] text-slate-600 text-center leading-relaxed">
                By continuing you agree to our{" "}
                <a href="#" className="text-slate-500 underline">terms of service</a> and{" "}
                <a href="#" className="text-slate-500 underline">privacy policy</a>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;