import { useState } from "react";
import { ArrowLeft, CheckCircle2, KeyRound, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link to="/login" className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"><ArrowLeft size={16} /> Back to login</Link>
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><KeyRound size={23} /></div>
        {submitted ? <div><CheckCircle2 className="mb-4 text-emerald-500" size={30} /><h1 className="text-2xl font-bold text-slate-900">Check your inbox</h1><p className="mt-2 text-sm leading-6 text-slate-500">If an account exists for <span className="font-medium text-slate-700">{email}</span>, we sent a link to reset your password.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-7 w-full rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Try another email</button></div> : <><h1 className="text-2xl font-bold text-slate-900">Forgot your password?</h1><p className="mt-2 text-sm leading-6 text-slate-500">Enter the email address linked to your account and we&apos;ll send you a secure reset link.</p><form onSubmit={handleSubmit} className="mt-7 space-y-5"><label className="block text-sm font-medium text-slate-700">Email address<div className="relative mt-2"><Mail className="absolute left-3 top-3 text-slate-400" size={17} /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" className="h-11 w-full rounded-lg border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" /></div></label><button type="submit" className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Send reset link</button></form></>}
      </section>
    </main>
  );
}
