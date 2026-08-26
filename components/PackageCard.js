import Link from "next/link";

export default function PackageCard({ qty, unitPrice, unitLabel, orderType, featured }) {
  const total = qty * unitPrice;
  return (
    <div
      className={
        "rounded-2xl border p-6 text-center " +
        (featured
          ? "border-[#FF6A1A]/30 bg-[#1D2024] text-white shadow-[0_16px_40px_-12px_rgba(255,106,26,0.35)]"
          : "border-white/8 bg-[#15171A] text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]")
      }
    >
      {featured && (
        <p
          className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6A1A]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Most popular
        </p>
      )}
      <p
        className={"mt-2 text-3xl font-extrabold text-white"}
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        {qty}
      </p>
      <p
        className={"text-xs font-medium uppercase tracking-wide " + (featured ? "text-white/60" : "text-white/50")}
      >
        {unitLabel}
      </p>
      <p
        className={"mt-4 text-2xl font-bold text-white"}
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        ${total}
      </p>
      <p className={"mt-1 text-xs " + (featured ? "text-white/50" : "text-white/40")}>
        ${unitPrice} per {unitLabel === "posts" ? "post" : "comment"}
      </p>
      <Link
        href={"/dashboard?order=" + orderType + "&quantity=" + qty}
        className={
          "mt-5 inline-block w-full rounded-full px-5 py-2.5 text-sm font-bold transition-all " +
          (featured
            ? "bg-[#FF6A1A] text-white hover:bg-[#E85A0C]"
            : "bg-[#FF6A1A]/10 text-[#FF6A1A] hover:bg-[#FF6A1A]/20")
        }
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        Get Started
      </Link>
    </div>
  );
}
