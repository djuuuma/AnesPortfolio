import { useEffect, useRef, useState } from "react";
import { useHackathonMode } from "../context/HackathonContext";

const BOOT_LINES = [
  "[BOOT] hackathon.exe initializing...",
  "[SYS]  Disabling sleep protocols............. OK",
  "[MEM]  Allocating caffeine buffer............. OK",
  "[CPU]  Overclocking focus module.............. OK",
  "[NET]  Connecting to Stack Overflow........... OK",
  "[FS]   Loading crunch-time dependencies....... OK",
  "[SYS]  Injecting adrenaline................... OK",
  "[WARN] Work/life balance: SUSPENDED",
  "[OK]   HACKATHON MODE ACTIVE. Good luck.",
];

const EXIT_LINES = [
  "[SYS]  Shutting down hackathon.exe............",
  "[MEM]  Flushing caffeine buffer............... OK",
  "[CPU]  Restoring clock speed.................. OK",
  "[SYS]  Re-enabling sleep protocols............ OK",
  "[OK]   Standard mode restored. Get some rest.",
];

const LINE_INTERVAL_MS = 80;

export default function GlitchTransition() {
  const { isGlitching, isHackathonMode } = useHackathonMode();
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [title, setTitle] = useState("");

  // Capture which lines/title to use at the MOMENT glitch starts.
  // We intentionally do NOT put isHackathonMode in the dep array so the
  // effect doesn't restart mid-animation when the mode flips at the halfway mark.
  const modeAtGlitchStart = useRef(isHackathonMode);

  useEffect(() => {
    if (!isGlitching) {
      setVisibleLines([]);
      setTitle("");
      return;
    }

    // Snapshot the mode at the start of this glitch
    modeAtGlitchStart.current = isHackathonMode;
    const lines = isHackathonMode ? EXIT_LINES : BOOT_LINES;
    const heading = isHackathonMode
      ? "// DEACTIVATING HACKATHON_MODE"
      : "// BOOTING HACKATHON_MODE";

    setTitle(heading);
    setVisibleLines([lines[0]]);
    let idx = 1;

    const id = setInterval(() => {
      if (idx < lines.length) {
        setVisibleLines((prev) => [...prev, lines[idx]]);
        idx++;
      } else {
        clearInterval(id);
      }
    }, LINE_INTERVAL_MS);

    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGlitching]); // intentionally omitting isHackathonMode — see comment above

  if (!isGlitching) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex flex-col justify-center items-start p-8 md:p-20"
      style={{ animation: "glitch-fade-in 0.1s ease-out" }}
      aria-live="assertive"
      aria-label="Hackathon mode transition"
    >
      {/* CRT scan-line texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.04) 2px, rgba(0,255,65,0.04) 4px)",
        }}
      />

      {/* Glitch strip A — rapid clip-path jitter */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(0,255,65,0.08)",
          animation: "glitch-a 0.13s steps(1) infinite",
        }}
      />
      {/* Glitch strip B — magenta phase offset */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(255,0,255,0.06)",
          animation: "glitch-b 0.19s steps(1) infinite",
        }}
      />

      {/* Terminal output */}
      <div
        className="relative z-10 w-full max-w-2xl text-sm leading-relaxed"
        style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}
      >
        <p
          className="text-base font-bold tracking-widest mb-5"
          style={{ color: "#00ff41" }}
        >
          {title}
        </p>

        {visibleLines.map((line, i) => (
          <p
            key={i}
            style={{
              color: line.startsWith("[OK]")
                ? "#00ff41"
                : line.startsWith("[WARN]")
                ? "#facc15"
                : line.startsWith("[BOOT]")
                ? "#ffffff"
                : "#00cc33",
              marginBottom: "2px",
            }}
          >
            {line}
          </p>
        ))}

        {/* Blinking cursor */}
        <span
          className="inline-block mt-1 align-middle animate-pulse"
          style={{
            width: "10px",
            height: "1.1em",
            background: "#00ff41",
            display: "inline-block",
          }}
        />
      </div>
    </div>
  );
}
