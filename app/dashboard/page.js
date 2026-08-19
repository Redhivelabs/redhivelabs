"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PayPalButton from "../../components/PayPalButton.js";
import DashboardAvatarMenu from "../../components/DashboardAvatarMenu.js";

const sections = [
  { key: "scans", label: "My Scans", icon: "search" },
  { key: "report", label: "Report", icon: "doc" },
  { key: "posts", label: "Sub Reddit Posts", icon: "edit" },
  { key: "comments", label: "Sub Reddit Comments", icon: "chat" },
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
  if (name === "edit") {
    return (
      <svg {...common}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
      </svg>
    );
  }
  if (name === "chat") {
    return (
      <svg {...common}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    );
  }
  return null;
}

const PRICES = { report: 49, posts: 30, comments: 15 };

function statusLabel(order) {
  if (order.orderType === "report") {
    if (order.pdfUrl) return { text: "Ready", color: "#0B6E62" };
    return { text: "In Progress", color: "#8F5D0C" };
  }
  if (order.status === "fulfilled") return { text: "Completed", color: "#0B6E62" };
  return { text: "In Progress", color: "#8F5D0C" };
}

function OrderList({ orders }) {
  if (orders.length === 0) {
    return (
      <p className="mt-6 text-sm text-[#12171D]/60">
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
            className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p
                  className="font-bold text-[#12171D]"
                  style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                >
                  {order.keyword}
                  {order.quantity > 1 ? " × " + order.quantity : ""}
                </p>
                <p className="mt-1 text-xs text-[#12171D]/40">
                  ${order.amount} USD ·{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span
                className="flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                style={{ backgroundColor: s.color + "1A", color: s.color }}
              >
                {s.text}
              </span>
            </div>
            {order.orderType === "report" && order.pdfUrl && (
              <a
                href={order.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-[#0B6E62] px-5 py-2 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
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

  const [reportKeyword, setReportKeyword] = useState("");
  const [postsKeyword, setPostsKeyword] = useState("");
  const [postsQty, setPostsQty] = useState(1);
  const [postsUrl, setPostsUrl] = useState("");
  const [postsInstructions, setPostsInstructions] = useState("");
  const [postsFindSubreddit, setPostsFindSubreddit] = useState(false);
  const [commentsKeyword, setCommentsKeyword] = useState("");
  const [commentsQty, setCommentsQty] = useState(1);
  const [commentsUrl, setCommentsUrl] = useState("");
  const [commentsInstructions, setCommentsInstructions] = useState("");
  const [commentsFindSubreddit, setCommentsFindSubreddit] = useState(false);

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
    const keywordParam = searchParams.get("keyword");
    const quantityParam = parseInt(searchParams.get("quantity"), 10);
    if (orderParam && sections.some(function (s) { return s.key === orderParam; })) {
      setActiveSection(orderParam);
    }
    if (keywordParam) {
      setReportKeyword(keywordParam);
      setPostsKeyword(keywordParam);
      setCommentsKeyword(keywordParam);
    }
    if (Number.isFinite(quantityParam) && quantityParam >= 1 && quantityParam <= 15) {
      setPostsQty(quantityParam);
      setCommentsQty(quantityParam);
    }
  }, [searchParams]);

  if (loading || !data) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-6"
        style={{
          background:
            "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
        }}
      >
        <p className="text-[#12171D]/60">Loading...</p>
      </div>
    );
  }

  const reportOrders = data.orders.filter(function (o) {
    return o.orderType === "report";
  });
  const postsOrders = data.orders.filter(function (o) {
    return o.orderType === "posts";
  });
  const commentsOrders = data.orders.filter(function (o) {
    return o.orderType === "comments";
  });

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <div className="mx-auto flex max-w-6xl gap-6 px-6 py-6">
        <aside className="hidden w-56 flex-shrink-0 sm:block">
          <div className="rounded-2xl bg-[#12171D] p-4 shadow-[0_8px_24px_-8px_rgba(18,23,29,0.4)]">
            <Link href="/" className="block px-2 pb-5">
              <img
                src="/lockup-horizontal-white.svg"
                alt="RedHiveLabs"
                className="w-auto"
                style={{ height: "28px" }}
              />
            </Link>
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
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: isActive ? "#0B6E62" : "transparent",
                      color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.65)",
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
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto rounded-full bg-white p-1 shadow-[0_4px_16px_-8px_rgba(18,23,29,0.15)] sm:hidden">
              {sections.map(function (section) {
                const isActive = activeSection === section.key;
                return (
                  <button
                    key={section.key}
                    onClick={function () {
                      setActiveSection(section.key);
                    }}
                    className="flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium"
                    style={{
                      backgroundColor: isActive ? "#0B6E62" : "transparent",
                      color: isActive ? "#FFFFFF" : "#12171D99",
                    }}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
            <div className="ml-auto">
              <DashboardAvatarMenu email={data.email} picture={data.picture} />
            </div>
          </div>

          {activeSection === "scans" && (
            <div>
              <h1
                className="text-2xl font-bold text-[#12171D]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                My Scans
              </h1>
              <p className="mt-1 text-sm text-[#12171D]/60">
                Your last 20 free scans.
              </p>
              {data.scans.length === 0 ? (
                <p className="mt-6 text-sm text-[#12171D]/60">
                  No scans yet.{" "}
                  <Link href="/" className="text-[#0B6E62] hover:underline">
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
                          className="font-bold text-[#12171D]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          {scan.keyword}
                        </p>
                        <p className="mt-1 text-xs text-[#12171D]/40">
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
              <h1
                className="text-2xl font-bold text-[#12171D]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Report
              </h1>
              <p className="mt-1 text-sm text-[#12171D]/60">
                10-15 curated subreddits, rules, timing, and removal risk.
              </p>

              <div
                className="mt-6 rounded-2xl p-6"
                style={{
                  background:
                    "radial-gradient(140% 120% at 10% 0%, #14A08C 0%, #0B6E62 32%, #063D37 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.12), 0 16px 40px -12px rgba(11,110,98,0.4)",
                }}
              >
                <label className="text-xs font-medium uppercase tracking-wide text-white/70">
                  Keyword
                </label>
                <input
                  type="text"
                  value={reportKeyword}
                  onChange={function (e) {
                    setReportKeyword(e.target.value);
                  }}
                  placeholder="e.g. skincare for sensitive skin"
                  className="mt-2 w-full rounded-full border border-white/10 px-5 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#2DD4BF]" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                />

                {!reportKeyword.trim() && (
                  <p className="mt-4 text-xs font-medium text-[#A6F0E0]">
                    Enter a keyword above to unlock checkout.
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <span
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    $49 USD
                  </span>
                </div>

                {reportKeyword.trim() && (
                  <div className="mt-4 rounded-xl bg-white p-1.5">
                    <PayPalButton
                      orderType="report"
                      keyword={reportKeyword.trim()}
                      quantity={1}
                    />
                  </div>
                )}
              </div>

              <h2
                className="mt-8 text-sm font-bold uppercase tracking-wide text-[#12171D]/80"
              >
                Your report orders
              </h2>
              <OrderList orders={reportOrders} />
            </div>
          )}

          {activeSection === "posts" && (
            <div>
              <h1
                className="text-2xl font-bold text-[#12171D]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Sub Reddit Posts
              </h1>
              <p className="mt-1 text-sm text-[#12171D]/60">
                We post your content to the subreddits you choose. $30 per
                post.
              </p>

              <div
                className="mt-6 rounded-2xl p-6"
                style={{
                  background:
                    "radial-gradient(140% 120% at 10% 0%, #14A08C 0%, #0B6E62 32%, #063D37 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.12), 0 16px 40px -12px rgba(11,110,98,0.4)",
                }}
              >
                <label className="text-xs font-medium uppercase tracking-wide text-white/70">
                  Keyword / subreddit focus
                </label>
                <input
                  type="text"
                  value={postsKeyword}
                  onChange={function (e) {
                    setPostsKeyword(e.target.value);
                  }}
                  placeholder="e.g. skincare for sensitive skin"
                  className="mt-2 w-full rounded-full border border-white/10 px-5 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#2DD4BF]" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                />

                <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-white/70">
                  Number of posts
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={function () {
                      setPostsQty(Math.max(1, postsQty - 1));
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#2DD4BF]/50" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                  >
                    −
                  </button>
                  <span
                    className="w-8 text-center text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    {postsQty}
                  </span>
                  <button
                    onClick={function () {
                      setPostsQty(Math.min(15, postsQty + 1));
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#2DD4BF]/50" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                  >
                    +
                  </button>
                </div>

                <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-white/70">
                  Subreddit URL(s) (optional)
                </label>
                <textarea
                  value={postsUrl}
                  onChange={function (e) {
                    setPostsUrl(e.target.value);
                  }}
                  rows={3}
                  placeholder={"https://www.reddit.com/r/subreddit\nAdd one per line if you have more than one"}
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 px-5 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#2DD4BF]" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                />

                <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-white/70">
                  Special instructions (optional)
                </label>
                <textarea
                  value={postsInstructions}
                  onChange={function (e) {
                    setPostsInstructions(e.target.value.slice(0, 300));
                  }}
                  maxLength={300}
                  rows={3}
                  placeholder="Anything we should know before posting?"
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 px-5 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#2DD4BF]" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                />
                <p className="mt-1 text-right text-xs text-white/40">
                  {postsInstructions.length}/300
                </p>

                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 p-4 transition-colors hover:border-[#2DD4BF]/40" style={{ backgroundColor: "rgba(6,32,29,0.3)" }}>
                  <input
                    type="checkbox"
                    checked={postsFindSubreddit}
                    onChange={function (e) {
                      setPostsFindSubreddit(e.target.checked);
                    }}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#2DD4BF]"
                  />
                  <span className="text-sm text-white">
                    <span className="font-medium">
                      Find the right subreddit for us
                    </span>
                    <span className="block text-xs text-white/60">
                      Don't know where to post? We'll find it. +$5 per post.
                    </span>
                  </span>
                </label>

                {!postsKeyword.trim() && (
                  <p className="mt-4 text-xs font-medium text-[#A6F0E0]">
                    Enter a keyword above to unlock checkout.
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-white/70">
                    Total
                    {postsFindSubreddit ? " (incl. find-subreddit add-on)" : ""}
                  </span>
                  <span
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    ${(PRICES.posts + (postsFindSubreddit ? 5 : 0)) * postsQty} USD
                  </span>
                </div>

                {postsKeyword.trim() && (
                  <div className="mt-4 rounded-xl bg-white p-1.5">
                    <PayPalButton
                      orderType="posts"
                      keyword={postsKeyword.trim()}
                      quantity={postsQty}
                      findSubreddit={postsFindSubreddit}
                      notes={
                        "Subreddit URL(s): " +
                        (postsUrl.trim() || "not provided") +
                        "\nInstructions: " +
                        (postsInstructions.trim() || "none") +
                        "\nFind subreddit for us: " +
                        (postsFindSubreddit ? "Yes (+$5/post)" : "No")
                      }
                    />
                  </div>
                )}
              </div>

              <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-[#12171D]/80">
                Your posting orders
              </h2>
              <OrderList orders={postsOrders} />
            </div>
          )}

          {activeSection === "comments" && (
            <div>
              <h1
                className="text-2xl font-bold text-[#12171D]"
                style={{ fontFamily: "var(--font-archivo), sans-serif" }}
              >
                Sub Reddit Comments
              </h1>
              <p className="mt-1 text-sm text-[#12171D]/60">
                We leave real comments on relevant threads. $15 per comment.
              </p>

              <div
                className="mt-6 rounded-2xl p-6"
                style={{
                  background:
                    "radial-gradient(140% 120% at 10% 0%, #14A08C 0%, #0B6E62 32%, #063D37 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.12), 0 16px 40px -12px rgba(11,110,98,0.4)",
                }}
              >
                <label className="text-xs font-medium uppercase tracking-wide text-white/70">
                  Keyword / subreddit focus
                </label>
                <input
                  type="text"
                  value={commentsKeyword}
                  onChange={function (e) {
                    setCommentsKeyword(e.target.value);
                  }}
                  placeholder="e.g. skincare for sensitive skin"
                  className="mt-2 w-full rounded-full border border-white/10 px-5 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#2DD4BF]" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                />

                <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-white/70">
                  Number of comments
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={function () {
                      setCommentsQty(Math.max(1, commentsQty - 1));
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#2DD4BF]/50" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                  >
                    −
                  </button>
                  <span
                    className="w-8 text-center text-lg font-bold text-white"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    {commentsQty}
                  </span>
                  <button
                    onClick={function () {
                      setCommentsQty(Math.min(15, commentsQty + 1));
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white transition-colors hover:border-[#2DD4BF]/50" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                  >
                    +
                  </button>
                </div>

                <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-white/70">
                  Subreddit URL(s) (optional)
                </label>
                <textarea
                  value={commentsUrl}
                  onChange={function (e) {
                    setCommentsUrl(e.target.value);
                  }}
                  rows={3}
                  placeholder={"https://www.reddit.com/r/subreddit\nAdd one per line if you have more than one"}
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 px-5 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#2DD4BF]" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                />

                <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-white/70">
                  Special instructions (optional)
                </label>
                <textarea
                  value={commentsInstructions}
                  onChange={function (e) {
                    setCommentsInstructions(e.target.value.slice(0, 300));
                  }}
                  maxLength={300}
                  rows={3}
                  placeholder="Anything we should know before commenting?"
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 px-5 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#2DD4BF]" style={{ backgroundColor: "rgba(6,32,29,0.45)" }}
                />
                <p className="mt-1 text-right text-xs text-white/40">
                  {commentsInstructions.length}/300
                </p>

                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 p-4 transition-colors hover:border-[#2DD4BF]/40" style={{ backgroundColor: "rgba(6,32,29,0.3)" }}>
                  <input
                    type="checkbox"
                    checked={commentsFindSubreddit}
                    onChange={function (e) {
                      setCommentsFindSubreddit(e.target.checked);
                    }}
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#2DD4BF]"
                  />
                  <span className="text-sm text-white">
                    <span className="font-medium">
                      Find the right subreddit for us
                    </span>
                    <span className="block text-xs text-white/60">
                      Don't know where to comment? We'll find it. +$5 per
                      comment.
                    </span>
                  </span>
                </label>

                {!commentsKeyword.trim() && (
                  <p className="mt-4 text-xs font-medium text-[#A6F0E0]">
                    Enter a keyword above to unlock checkout.
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-white/70">
                    Total
                    {commentsFindSubreddit ? " (incl. find-subreddit add-on)" : ""}
                  </span>
                  <span
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                  >
                    ${(PRICES.comments + (commentsFindSubreddit ? 5 : 0)) * commentsQty} USD
                  </span>
                </div>

                {commentsKeyword.trim() && (
                  <div className="mt-4 rounded-xl bg-white p-1.5">
                    <PayPalButton
                      orderType="comments"
                      keyword={commentsKeyword.trim()}
                      quantity={commentsQty}
                      findSubreddit={commentsFindSubreddit}
                      notes={
                        "Subreddit URL(s): " +
                        (commentsUrl.trim() || "not provided") +
                        "\nInstructions: " +
                        (commentsInstructions.trim() || "none") +
                        "\nFind subreddit for us: " +
                        (commentsFindSubreddit ? "Yes (+$5/comment)" : "No")
                      }
                    />
                  </div>
                )}
              </div>

              <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-[#12171D]/80">
                Your comment orders
              </h2>
              <OrderList orders={commentsOrders} />
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
