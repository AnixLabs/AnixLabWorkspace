export function BgGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute -top-60 -left-60 w-175 h-175 rounded-full bg-indigo-700/5 blur-[140px]" />
      <div className="absolute top-1/2 -right-60 w-125 h-125 rounded-full bg-violet-700/5 blur-[120px]" />
      <div className="absolute -bottom-40 left-1/3 w-100 h-100 rounded-full bg-cyan-700/4 blur-[100px]" />
    </div>
  );
}

export function BgGridPattern() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.035]"
      aria-hidden
      style={{
        backgroundImage: `
          linear-gradient(to right, #ffffff 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />
  );
}
