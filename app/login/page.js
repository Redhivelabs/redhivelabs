"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.error) {
        setStatus("error");
        setErrorMsg(data.error);
      } else {
        setStatus("sent");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E9ECF0] px-6">
      <div className="w-full max-w-sm text-center">
        <img
          src="/lockup-horizontal.svg"
          alt="RedHiveLabs"
          className="mx-auto mb-8 h-10 w-auto"
        />

        {status === "sent" ? (
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="font-medium text-[#12171D]">Check your email</p>
            <p className="mt-2 text-sm text-[#12171D]/60">
              We sent a login link to {email}. It expires in 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="rounded-full border border-[#12171D]/15 bg-white px-5 py-3 text-[#12171D] outline-none focus:border-[#0B6E62]"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-full bg-[#0B6E62] px-6 py-3 font-medium text-white transition-colors hover:bg-[#0a5d53] disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send login link"}
            </button>
            {status === "error" && (
              <p className="text-sm text-[#98302A]">{errorMsg}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
