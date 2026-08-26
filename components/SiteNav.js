"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavAuthStatus from "./NavAuthStatus.js";
import ServicesNavDropdown from "./ServicesNavDropdown.js";

function HamburgerIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={"transition-transform " + (open ? "rotate-180" : "")}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function BrandLockup() {
  return (
    <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
      <img
        src="/brand/wolf-icon.png"
        alt="Wolf of Reddit"
        className="h-8 w-8 flex-shrink-0 rounded-full sm:h-9 sm:w-9"
      />
      <span className="flex flex-col leading-none">
        <span
          className="inline-flex items-baseline gap-1.5 text-sm font-extrabold tracking-tight text-white sm:text-base"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          <span>WOLF</span>
          <span>OF</span>
          <span style={{ color: "var(--color-accent)" }}>REDDIT</span>
        </span>
        <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35 lg:block">
          Find <span style={{ color: "var(--color-accent)" }}>•</span> Engage{" "}
          <span style={{ color: "var(--color-accent)" }}>•</span> Influence
        </span>
      </span>
    </Link>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(function () {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  return (
    <div className="relative mx-auto mt-4 max-w-4xl sm:mt-6">
      <nav
        className="flex items-center justify-between gap-2 rounded-full border border-white/8 px-3 py-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] sm:gap-3 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <BrandLockup />

        {/* Desktop nav */}
        <div
          className="hidden items-center gap-6 text-sm font-medium text-white/70 sm:flex"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          <ServicesNavDropdown />
          <Link href="/reddit-intel-report" className="hover:text-white">
            Reddit Intelligence
          </Link>
          <Link href="/about" className="hover:text-white">
            About Me
          </Link>
          <NavAuthStatus />
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={function () {
            setMobileOpen(function (v) {
              return !v;
            });
          }}
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white/80 hover:text-white sm:hidden"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-white/8 p-3 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)] sm:hidden"
          style={{ fontFamily: "var(--font-archivo), sans-serif", backgroundColor: "var(--color-surface)" }}
        >
          <button
            type="button"
            onClick={function () {
              setMobileServicesOpen(function (v) {
                return !v;
              });
            }}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
          >
            Services
            <ChevronIcon open={mobileServicesOpen} />
          </button>
          {mobileServicesOpen && (
            <div className="ml-3 flex flex-col border-l border-white/10 pl-3">
              <Link
                href="/services/posts"
                className="rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"
                onClick={function () {
                  setMobileOpen(false);
                }}
              >
                Buy Reddit Posts
              </Link>
              <Link
                href="/services/comments"
                className="rounded-xl px-3 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"
                onClick={function () {
                  setMobileOpen(false);
                }}
              >
                Buy Reddit Comments
              </Link>
            </div>
          )}

          <Link
            href="/reddit-intel-report"
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
            onClick={function () {
              setMobileOpen(false);
            }}
          >
            Reddit Intelligence
          </Link>
          <Link
            href="/about"
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
            onClick={function () {
              setMobileOpen(false);
            }}
          >
            About Me
          </Link>

          <div className="mt-2 border-t border-white/10 pt-3">
            <NavAuthStatus />
          </div>
        </div>
      )}
    </div>
  );
}
