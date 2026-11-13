export default function Brand({ className = "" }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <span className="brand-symbol" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2.8 14.2 9.1 20.5 12l-6.3 2.2L12 20.5l-2.2-6.3L3.5 12l6.3-2.9L12 2.8Z" />
          <path d="m18.8 3.5.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6.6-1.7Z" />
        </svg>
      </span>
      <span className="brand-copy">
        <strong>AI Career</strong>
        <small>CAREER STUDIO</small>
      </span>
    </span>
  );
}
