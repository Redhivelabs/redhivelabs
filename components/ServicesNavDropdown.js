"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ServicesNavDropdown() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(function () {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={function () {
        setOpen(true);
      }}
      onMouseLeave={function () {
        setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={function () {
          setOpen(function (v) {
            return !v;
          });
        }}
        className="flex items-center gap-1 hover:text-white"
      >
        Services
        <svg
          viewBox="0 0 24 24"
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={"transition-transform " + (open ? "rotate-180" : "")}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl bg-[#12171D] py-2 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5)]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          <Link
            href="/services/posts"
            className="block px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            onClick={function () {
              setOpen(false);
            }}
          >
            Sub Reddit Posts
          </Link>
          <Link
            href="/services/comments"
            className="block px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
            onClick={function () {
              setOpen(false);
            }}
          >
            Sub Reddit Comments
          </Link>
        </div>
      )}
    </div>
  );
}
