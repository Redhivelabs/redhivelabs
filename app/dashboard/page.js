import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "../../db/client.js";
import { orders, reports } from "../../db/schema.js";
import { eq, desc, and, inArray } from "drizzle-orm";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  let email = null;
  let userId = null;

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(sessionToken, secret);
    email = payload.email;
    userId = payload.userId;
  } catch (error) {
    redirect("/login");
  }

  const userOrders = await db
    .select({
      orderId: orders.id,
      keyword: orders.keyword,
      status: orders.status,
      amount: orders.amount,
      createdAt: orders.createdAt,
      pdfUrl: reports.pdfUrl,
    })
    .from(orders)
    .leftJoin(reports, eq(reports.orderId, orders.id))
    .where(
      and(eq(orders.userId, userId), inArray(orders.status, ["paid", "fulfilled"]))
    )
    .orderBy(desc(orders.createdAt));

  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #F3F5F7 0%, #E9ECF0 55%, #E2E6EA 100%)",
      }}
    >
      <nav className="mx-auto mt-6 flex max-w-4xl items-center justify-between gap-2 rounded-full bg-[#12171D] px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(18,23,29,0.4)] sm:gap-3 sm:px-6">
        <Link href="/">
          <img
            src="/lockup-horizontal-white.svg"
            alt="RedHiveLabs"
            className="w-auto flex-shrink-0"
            style={{ height: "32px" }}
          />
        </Link>
        <div
          className="flex items-center gap-2 text-[11px] font-medium text-white/70 sm:gap-6 sm:text-sm"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          <Link href="/features" className="hover:text-white">
            Features
          </Link>
          <Link href="/sample" className="hover:text-white">
            Sample
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
        </div>
      </nav>

      <div className="mx-auto mt-14 max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-2xl font-bold text-[#12171D] sm:text-3xl"
              style={{ fontFamily: "var(--font-archivo), sans-serif" }}
            >
              Your Reports
            </h1>
            <p className="mt-1 text-sm text-[#12171D]/50">{email}</p>
          </div>
        </div>

        <div className="mt-8">
          {userOrders.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]">
              <p className="text-[#12171D]/60">
                Your reports will show up here once you order one.
              </p>
              <Link
                href="/"
                className="mt-5 inline-block rounded-full bg-[#0B6E62] px-6 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
              >
                Run a free scan
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {userOrders.map(function (order) {
                const isReady = Boolean(order.pdfUrl);
                return (
                  <div
                    key={order.orderId}
                    className="rounded-2xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className="text-lg font-bold text-[#12171D]"
                          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
                        >
                          {order.keyword}
                        </p>
                        <p className="mt-1 text-xs text-[#12171D]/40">
                          Ordered{" "}
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric", year: "numeric" }
                          )}
                        </p>
                      </div>
                      <span
                        className="flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                        style={{
                          backgroundColor: isReady
                            ? "rgba(11, 110, 98, 0.1)"
                            : "rgba(143, 93, 12, 0.1)",
                          color: isReady ? "#0B6E62" : "#8F5D0C",
                        }}
                      >
                        {isReady ? "Ready" : "In Progress"}
                      </span>
                    </div>

                    {isReady ? (
                      <a
                        href={order.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0B6E62] px-6 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
                      >
                        Download Report
                      </a>
                    ) : (
                      <p className="mt-4 text-sm text-[#12171D]/60">
                        We're putting your report together. You'll get an
                        email the moment it's ready.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
