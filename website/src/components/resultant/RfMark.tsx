export default function RfMark({ className = 'rs-rf-mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 20" aria-hidden="true">
      <line className="rf-stream" x1="0" y1="6" x2="14" y2="10" />
      <line className="rf-stream" x1="0" y1="10" x2="14" y2="10" />
      <line className="rf-stream" x1="0" y1="14" x2="14" y2="10" />
      <circle className="rf-ring" cx="18" cy="10" r="4.5" />
      <circle className="rf-dot" cx="18" cy="10" r="1.6" />
      <line className="rf-beam" x1="22.5" y1="10" x2="36" y2="10" />
    </svg>
  );
}
