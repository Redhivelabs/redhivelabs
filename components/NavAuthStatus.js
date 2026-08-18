"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavAuthStatus() {
  const router = useRouter();
  const [status, setStatus] = useState({
    loading: true,
    loggedIn: false,
    email: null,
    picture: null,
    name: null,
  });
  const [open, setOpen] = useState(false);

  useEffect(function () {
    fetch("/api/me")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setStatus({
          loading: false,
          loggedIn: data.loggedIn,
          email: data.email || null,
          picture: data.picture || null,
          name: data.name || null,
        });
      })
      .catch(function () {
        setStatus({
          loading: false,
          loggedIn: false,
          email: null,
          picture: null,
          name: null,
        });
      });
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  if (status.loading) {
    return null;
  }

  if (!status.loggedIn) {
    return (
      <Link href="/login" className="hover:text-white">
        Log in
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={function () {
          setOpen(!open);
        }}
        className="flex items-center"
      >
        {status.picture ? (
          <img
            src={status.picture}
            alt={status.email}
            className="h-7 w-7 flex-shrink-0 rounded-full border border-white/20"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1FBFA8] text-xs font-bold text-white">
            {status.email ? status.email[0].toUpperCase() : "?"}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={function () {
              setOpen(false);
            }}
          />
          <div
            className="absolute right-0 z-50 mt-3 w-64 rounded-2xl p-2 text-left shadow-[0_16px_40px_-12px_rgba(11,110,98,0.5)]"
            style={{
              background: "linear-gradient(180deg, #0B6E62 0%, #085248 100%)",
            }}
          >
            <div className="flex items-center gap-3 border-b border-white/15 px-3 py-3">
              {status.picture ? (
                <img
                  src={status.picture}
                  alt={status.email}
                  className="h-9 w-9 flex-shrink-0 rounded-full border border-white/20"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-bold text-white">
                  {status.email ? status.email[0].toUpperCase() : "?"}
                </span>
              )}
              <div className="min-w-0">
                {status.name && (
                  <p
                    className="truncate text-sm font-bold text-white"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    {status.name}
                  </p>
                )}
                <p className="truncate text-xs text-white/60">
                  {status.email}
                </p>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white hover:bg-white/10"
              onClick={function () {
                setOpen(false);
              }}
            >
              Dashboard
            </Link>
            <Link
              href="/privacy"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white hover:bg-white/10"
              onClick={function () {
                setOpen(false);
              }}
            >
              Privacy Policy
            </Link>
            <button
              onClick={handleLogout}
              className="mt-1 flex w-full items-center gap-3 rounded-xl border-t border-white/15 px-3 py-2.5 text-left text-sm text-white/90 hover:bg-white/10"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
