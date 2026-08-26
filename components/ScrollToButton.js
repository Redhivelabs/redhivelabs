"use client";

export default function ScrollToButton({ children, targetId, className, style }) {
  return (
    <a
      href={"#" + targetId}
      onClick={function (e) {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
