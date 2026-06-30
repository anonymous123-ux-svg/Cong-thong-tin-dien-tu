export default function EmblemStar({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Quốc huy"
      className="shrink-0"
    >
      <circle cx="50" cy="50" r="48" fill="#c8102e" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#ffcd00" strokeWidth="3" />
      <path
        fill="#ffcd00"
        d="M50 14 L59.4 39.5 L86.9 40.4 L65 57.3 L73 83.6 L50 67.5 L27 83.6 L35 57.3 L13.1 40.4 L40.6 39.5 Z"
      />
    </svg>
  );
}
