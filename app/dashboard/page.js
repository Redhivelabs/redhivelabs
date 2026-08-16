import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
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
    .where(and(eq(orders.userId, userId), inArray(orders.status, ["paid", "fulfilled"])))
    .orderBy(desc(orders.createdAt));

  function statusLabel(order) {
    if (order.pdfUrl) {
      return "Ready — download below";
    }
    if (order.status === "paid") {
      return "Paid — report in progress";
    }
    if (order.status === "pending") {
      return "Payment pending";
    }
    return order.status;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#E9ECF0] px-6 py-16">
      <div className="w-full max-w-md">
        <img
          src="/lockup-horizontal.svg"
          alt="RedHiveLabs"
          className="mx-auto mb-8 h-10 w-auto"
        />
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <p className="text-sm text-[#12171D]/60">Logged in as</p>
          <p className="mt-1 font-medium text-[#12171D]">{email}</p>

          <div className="mt-8">
            {userOrders.length === 0 ? (
              <p className="text-sm text-[#12171D]/60">
                Your reports will show up here once you order one.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {userOrders.map(function (order) {
                  return (
                    <div
                      key={order.orderId}
                      className="rounded-lg border border-[#12171D]/10 p-4"
                    >
                      <p className="font-medium text-[#12171D]">
                        {order.keyword}
                      </p>
                      <p className="mt-1 text-sm text-[#12171D]/60">
                        {statusLabel(order)}
                      </p>
                      {order.pdfUrl ? (
                        <a
                          href={order.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm font-medium text-[#0B6E62] hover:underline"
                        >
                          Download PDF
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
