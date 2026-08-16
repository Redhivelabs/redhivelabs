import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

export default async function Dashboard() {
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#E9ECF0] px-6">
      <div className="w-full max-w-md text-center">
        <img
          src="/lockup-horizontal.svg"
          alt="RedHiveLabs"
          className="mx-auto mb-8 h-10 w-auto"
        />
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <p className="text-sm text-[#12171D]/60">Logged in as</p>
          <p className="mt-1 font-medium text-[#12171D]">{email}</p>
          <p className="mt-6 text-sm text-[#12171D]/60">
            Your reports will show up here once you order one.
          </p>
        </div>
      </div>
    </div>
  );
}
