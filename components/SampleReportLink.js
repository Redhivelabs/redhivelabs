// Opens the static sample report PDF in a new tab — the same
// target="_blank" + rel="noopener noreferrer" pattern already used for
// external links elsewhere on the site (e.g. the Twitter link in
// HomeClient.js), reused here for consistency.
export default function SampleReportLink({ className, style, children, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <a
      href="/sample-report.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}
