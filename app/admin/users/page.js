import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "../../../db/client.js";
import { users } from "../../../db/schema.js";
import { desc } from "drizzle-orm";

// Safety cap only — not real pagination. The users table is tiny today
// (single digits); revisit with proper pagination if it grows into the
// hundreds, per the actual ask here.
const MAX_ROWS = 500;

export default async function AdminUsers() {
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

  console.log("ADMIN CHECK:", JSON.stringify({
    sessionEmail: email,
    sessionEmailLength: email?.length,
    adminEnv: process.env.ADMIN_EMAIL,
    adminEnvLength: process.env.ADMIN_EMAIL?.length,
    match: email === process.env.ADMIN_EMAIL
  }));

  if (email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(MAX_ROWS);

  return (
    <div
      className="min-h-screen px-6 pb-24"
      style={{
        background:
          "radial-gradient(ellipse at top, #15171A 0%, #0D0E10 55%, #08090B 100%)",
      }}
    >
      <nav className="mx-auto mt-6 flex max-w-4xl items-center justify-between gap-2 rounded-full border border-white/8 bg-[#15171A] px-3 py-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] sm:gap-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
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
        <div className="flex items-center gap-4 text-xs font-medium" style={{ fontFamily: "var(--font-archivo), sans-serif" }}>
          <Link href="/admin" className="text-white/50 hover:text-white">
            Order Queue
          </Link>
          <span className="rounded-full bg-[#FF6A1A]/15 px-3 py-1 font-medium text-[#FF6A1A]">
            Users
          </span>
        </div>
      </nav>

      <div className="mx-auto mt-14 max-w-3xl">
        <h1
          className="text-2xl font-bold text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Users
        </h1>
        <p className="mt-1 text-sm text-white/60">
          {allUsers.length} {allUsers.length === 1 ? "signup" : "signups"} total, newest first.
        </p>

        {allUsers.length === 0 ? (
          <p className="mt-6 text-sm text-white/50">No signups yet.</p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#15171A] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/8 text-[11px] font-bold uppercase tracking-wide text-white/40">
                  <th className="px-5 py-3 font-bold">Email</th>
                  <th className="px-5 py-3 font-bold">Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(function (user, i) {
                  return (
                    <tr
                      key={user.id}
                      className={i !== allUsers.length - 1 ? "border-b border-white/5" : ""}
                    >
                      <td className="px-5 py-3 text-white">{user.email}</td>
                      <td className="px-5 py-3 text-white/60">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
