"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import DashboardAvatarMenu from "../../components/DashboardAvatarMenu.js";

const sections = [
  { key: "scans", label: "My Scans", mobileLabel: "Scans", icon: "search" },
  { key: "report", label: "Reddit Intel Report", mobileLabel: "Report", icon: "doc" },
];

function SidebarIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  }
  if (name === "doc") {
    return (
      <svg {...common}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    );
  }
  return null;
}

function statusLabel(order) {
  if (order.orderType === "report") {
    if (order.pdfUrl) return { text: "Ready", color: "#FF6A1A" };
    return { text: "In Progress", color: "#E0A542" };
  }
  if (order.status === "fulfilled") return { text: "Completed", color: "#FF6A1A" };
  return { text: "In Progress", color: "#E0A542" };
}

function OrderList({ orders }) {
  if (orders.length === 0) {
    return (
      <p className="mt-6 text-sm text-white/60">
        No orders yet in this category.
      </p>
    );
  }
  return (
    <div className="mt-6 flex flex-col gap-3">
      {orders.map(function (order) {
        const s = statusLabel(order);
        return (
          <div
            key={order.orderId}
            className="rounded-2xl border border-white/8 border-l-4 bg-[#15171A] p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]"
            style={{ borderLeftColor: s.color }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="font-bold text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {order.keyword}
                  {order.quantity > 1 ? " × " + order.quantity : ""}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  ${order.amount} USD ·{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                className="flex-shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide"
                style={{ backgroundColor: s.color + "1A", color: s.color, fontFamily: "var(--font-archivo), sans-serif" }}
              >
                {s.text}
              </span>
            </div>
            {order.orderType === "report" && order.pdfUrl && (
              <a
                href={order.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-[#FF6A1A] px-5 py-2 text-sm font-bold text-white shadow-[0_8px_20px_-6px_rgba(255,106,26,0.5)] transition-all hover:bg-[#E85A0C]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Download Report
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DashboardInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("report");

  useEffect(function () {
    async function load() {
      try {
        const res = await fetch("/api/dashboard-data");
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (e) {
        router.push("/login");
      }
    }
    load();
  }, [router]);

  useEffect(function () {
    const orderParam = searchParams.get("order");
    if (orderParam && sections.some(function (s) { return s.key === orderParam; })) {
      setActiveSection(orderParam);
    }
  }, [searchParams]);

  if (loading || !data) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-6"
        style={{
          background:
            "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
        }}
      >
        <p className="text-white/50">Loading...</p>
      </div>
    );
  }

  const reportOrders = data.orders.filter(function (o) {
    return o.orderType === "report";
  });

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
      }}
    >
      <div className="mx-auto flex max-w-6xl gap-6 px-6 py-6">
        <aside className="hidden w-64 flex-shrink-0 sm:block">
          <div
            className="rounded-2xl border border-white/8 p-4 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)]"
            style={{
              background: "linear-gradient(160deg, #1B1E22 0%, #131518 60%, #08090B 100%)",
            }}
          >
            <Link href="/" className="flex items-center gap-2.5 px-2 pb-5">
              <img
                src="/brand/wolf-icon.png"
                alt="Wolf of Reddit"
                className="h-8 w-8 flex-shrink-0 rounded-full"
              />
              <span
                className="inline-flex items-baseline gap-1.5 text-sm font-extrabold tracking-tight text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                <span>WOLF</span>
                <span>OF</span>
                <span style={{ color: "var(--color-accent)" }}>REDDIT</span>
              </span>
            </Link>

            <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/8 p-3" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
              {data.picture ? (
                <img
                  src={data.picture}
                  alt={data.email}
                  className="h-9 w-9 flex-shrink-0 rounded-full border border-white/15"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#FF6A1A] text-sm font-bold text-white">
                  {data.email ? data.email[0].toUpperCase() : "?"}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-white" style={{ fontFamily: "var(--font-archivo), sans-serif" }}>
                  {data.email}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-[#FF6A1A]">
                  Account
                </p>
              </div>
            </div>

            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/30">
              Menu
            </p>
            <nav className="flex flex-col gap-1.5">
              {sections.map(function (section) {
                const isActive = activeSection === section.key;
                return (
                  <button
                    key={section.key}
                    onClick={function () {
                      setActiveSection(section.key);
                    }}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all"
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, #FF8A42 0%, #FF6A1A 100%)"
                        : "transparent",
                      color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)",
                      boxShadow: isActive ? "0 8px 20px -6px rgba(255,106,26,0.5)" : "none",
                      fontFamily: "var(--font-archivo), sans-serif",
                    }}
                  >
                    <SidebarIcon name={section.icon} />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="mb-4 flex flex-col gap-3 sm:hidden">
            <div className="flex items-center justify-between rounded-full border border-white/8 bg-[#15171A] px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]">
              <Link href="/" className="flex items-center gap-2 px-1">
                <img
                  src="/brand/wolf-icon.png"
                  alt="Wolf of Reddit"
                  className="h-6 w-6 flex-shrink-0 rounded-full"
                />
                <span
                  className="inline-flex items-baseline gap-1 text-xs font-extrabold tracking-tight text-white"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  <span>WOLF</span>
                  <span>OF</span>
                  <span style={{ color: "var(--color-accent)" }}>REDDIT</span>
                </span>
              </Link>
              <DashboardAvatarMenu email={data.email} picture={data.picture} />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto rounded-full border border-white/8 bg-[#15171A] p-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]">
              {sections.map(function (section) {
                const isActive = activeSection === section.key;
                return (
                  <button
                    key={section.key}
                    onClick={function () {
                      setActiveSection(section.key);
                    }}
                    className="flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors"
                    style={{
                      backgroundColor: isActive ? "#FF6A1A" : "transparent",
                      color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                      fontFamily: "var(--font-archivo), sans-serif",
                    }}
                  >
                    {section.mobileLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 hidden items-center justify-end sm:flex">
            <DashboardAvatarMenu email={data.email} picture={data.picture} />
          </div>

          {activeSection === "scans" && (
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF6A1A]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Free Scans
              </p>
              <h1
                className="mt-1 text-2xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                My Scans
              </h1>
              <p className="mt-1 text-sm text-white/60">
                Your last 20 free scans.
              </p>
              {data.scans.length === 0 ? (
                <p className="mt-6 text-sm text-white/60">
                  No scans yet.{" "}
                  <Link href="/" className="text-[#FF6A1A] hover:underline">
                    Run a free scan
                  </Link>
                </p>
              ) : (
                <div className="mt-6 flex flex-col gap-3">
                  {data.scans.map(function (scan) {
                    return (
                      <Link
                        key={scan.id}
                        href={"/scan/" + encodeURIComponent(scan.keyword)}
                        className="block rounded-2xl bg-white p-5 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)] transition-shadow hover:shadow-[0_8px_28px_-8px_rgba(18,23,29,0.2)]"
                      >
                        <p
                          className="font-bold text-white"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          {scan.keyword}
                        </p>
                        <p className="mt-1 text-xs text-white/40">
                          {new Date(scan.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeSection === "report" && (
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF6A1A]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Reddit Intel Report
              </p>
              <h1
                className="mt-1 text-2xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Reddit Intel Report
              </h1>
              <p className="mt-1 text-sm text-white/60">
                10-15 curated subreddits, rules, timing, and removal risk.
              </p>

              <h2
                className="mt-8 text-xs font-bold uppercase tracking-[0.1em] text-white/50"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Your report orders
              </h2>
              <OrderList orders={reportOrders} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={null}>
      <DashboardInner />
    </Suspense>
  );
}
