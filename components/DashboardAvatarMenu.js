"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardAvatarMenu({ email, picture }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="relative">
      <button
        onClick={function () {
          setOpen(!open);
        }}
        className="flex items-center gap-2 rounded-full bg-white px-2 py-1.5 shadow-[0_4px_16px_-8px_rgba(18,23,29,0.2)]"
      >
        {picture ? (
          <img
            src={picture}
            alt={email}
            className="h-7 w-7 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B6E62] text-xs font-bold text-white">
            {email ? email[0].toUpperCase() : "?"}
          </span>
        )}
        <span className="hidden pr-1 text-sm text-[#12171D]/70 sm:inline">
          {email}
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={function () {
              setOpen(false);
            }}
          />
          <div className="absolute right-0 z-20 mt-2 w-48 rounded-xl bg-white p-2 shadow-[0_12px_32px_-12px_rgba(18,23,29,0.3)]">
            <div className="border-b border-[#12171D]/10 px-3 py-2 text-xs text-[#12171D]/50">
              {email}
            </div>
            <button
              onClick={handleLogout}
              className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-[#12171D] hover:bg-[#12171D]/5"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
