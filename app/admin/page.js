import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "../../db/client.js";
import { orders, users, reports } from "../../db/schema.js";
import { eq, desc } from "drizzle-orm";

export default async function AdminQueue() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  let email = null;

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jwtVerify(sessionToken, secret);
    email = payload.email;
  } catch (error) {
    redirect("/login");
  }

  if (email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const allOrders = await db
    .select({
      orderId: orders.id,
      userEmail: users.email,
      keyword: orders.keyword,
      orderType: orders.orderType,
      quantity: orders.quantity,
      amount: orders.amount,
      status: orders.status,
      notes: orders.notes,
      createdAt: orders.createdAt,
      pdfUrl: reports.pdfUrl,
    })
    .from(orders)
    .innerJoin(users, eq(orders.userId, users.id))
    .leftJoin(reports, eq(reports.orderId, orders.id))
    .where(eq(orders.status, "paid"))
    .orderBy(desc(orders.createdAt));

  const reportOrders = allOrders.filter(function (o) {
    return o.orderType === "report";
  });
  const otherOrders = allOrders.filter(function (o) {
    return o.orderType !== "report";
  });

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
        <span
          className="rounded-full bg-[#0B6E62]/20 px-3 py-1 text-xs font-medium text-[#1FBFA8]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Admin
        </span>
      </nav>

      <div className="mx-auto mt-14 max-w-3xl">
        <h1
          className="text-2xl font-bold text-[#12171D] sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Order Queue
        </h1>
        <p className="mt-1 text-sm text-[#12171D]/60">
          Paid orders awaiting fulfillment.
        </p>

        <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-[#12171D]/70">
          Reports
        </h2>
        {reportOrders.length === 0 ? (
          <p className="mt-4 text-sm text-[#12171D]/50">
            No report orders pending.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {reportOrders.map(function (order) {
              const isDone = Boolean(order.pdfUrl);
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
                      </p>
                      <p className="mt-1 text-xs text-[#12171D]/50">
                        {order.userEmail} ·{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className="flex-shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
                      style={{
                        backgroundColor: isDone
                          ? "rgba(11, 110, 98, 0.1)"
                          : "rgba(143, 93, 12, 0.1)",
                        color: isDone ? "#0B6E62" : "#8F5D0C",
                      }}
                    >
                      {isDone ? "Delivered" : "Needs Report"}
                    </span>
                  </div>

                  {!isDone && (
                    <Link
                      href={"/admin/order/" + order.orderId}
                      className="mt-4 inline-block rounded-full bg-[#0B6E62] px-5 py-2 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(11,110,98,0.5)] transition-all hover:bg-[#0a5d53]"
                    >
                      Build Report
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <h2 className="mt-10 text-sm font-bold uppercase tracking-wide text-[#12171D]/70">
          Posts &amp; Comments
        </h2>
        {otherOrders.length === 0 ? (
          <p className="mt-4 text-sm text-[#12171D]/50">
            No posting/commenting orders pending.
          </p>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {otherOrders.map(function (order) {
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
                        {order.keyword}{" "}
                        <span className="font-normal text-[#12171D]/50">
                          ({order.orderType}, x{order.quantity})
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-[#12171D]/50">
                        {order.userEmail} ·{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-[#8F5D0C]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#8F5D0C]">
                      In Progress
                    </span>
                  </div>
                  {order.notes && (
                    <p className="mt-3 whitespace-pre-line rounded-xl bg-[#12171D]/[0.03] p-3 text-xs text-[#12171D]/70">
                      {order.notes}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
