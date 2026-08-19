import Link from "next/link";

export default function PackageCard({ qty, unitPrice, unitLabel, orderType, featured }) {
  const total = qty * unitPrice;
  return (
    <div
      className={
        "rounded-2xl p-6 text-center " +
        (featured
          ? "bg-[#12171D] text-white shadow-[0_16px_40px_-12px_rgba(18,23,29,0.5)]"
          : "bg-white text-[#12171D] shadow-[0_8px_24px_-12px_rgba(18,23,29,0.15)]")
      }
    >
      {featured && (
        <p
          className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#1FBFA8]"
          style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        >
          Most popular
        </p>
      )}
      <p
        className={"mt-2 text-3xl font-extrabold " + (featured ? "text-white" : "text-[#12171D]")}
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        {qty}
      </p>
      <p
        className={"text-xs font-medium uppercase tracking-wide " + (featured ? "text-white/60" : "text-[#12171D]/50")}
      >
        {unitLabel}
      </p>
      <p
        className={"mt-4 text-2xl font-bold " + (featured ? "text-white" : "text-[#12171D]")}
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        ${total}
      </p>
      <p className={"mt-1 text-xs " + (featured ? "text-white/50" : "text-[#12171D]/40")}>
        ${unitPrice} per {unitLabel === "posts" ? "post" : "comment"}
      </p>
      <Link
        href={"/dashboard?order=" + orderType + "&quantity=" + qty}
        className={
          "mt-5 inline-block w-full rounded-full px-5 py-2.5 text-sm font-bold transition-all " +
          (featured
            ? "bg-[#0B6E62] text-white hover:bg-[#0a5d53]"
            : "bg-[#0B6E62]/10 text-[#0B6E62] hover:bg-[#0B6E62]/20")
        }
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
      >
        Get Started
      </Link>
    </div>
  );
}
