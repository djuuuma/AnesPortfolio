import { useEffect, useState } from "react";
import { useHackathonMode } from "../context/HackathonContext";

export default function GlitchTransition() {
  const { isGlitching, isHackathonMode } = useHackathonMode();
  const [tick, setTick] = useState(0);

  // Force a remount on every glitch so the CSS animation plays from the start
  useEffect(() => {
    if (isGlitching) setTick((t) => t + 1);
  }, [isGlitching]);

  if (!isGlitching) return null;

  const heading = isHackathonMode ? "// HACKATHON_MODE" : "// STANDARD_MODE";

  return (
    <div
      key={tick}
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.85)",
        animation: "glitch-fade-out 700ms ease-out forwards",
      }}
      aria-live="polite"
      aria-label="Theme transition"
    >
      {/* Scan lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.08) 2px, rgba(0,255,65,0.08) 4px)",
        }}
      />
      {/* Green glitch strip */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0,255,65,0.12)",
          animation: "glitch-a 0.13s steps(1) 5",
        }}
      />
      {/* Magenta glitch strip */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(255,0,255,0.10)",
          animation: "glitch-b 0.19s steps(1) 4",
        }}
      />
      {/* Centered heading */}
      <p
        className="relative z-10 text-2xl md:text-4xl font-bold tracking-widest"
        style={{
          color: "#00ff41",
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          textShadow: "0 0 12px rgba(0,255,65,0.8)",
        }}
      >
        {heading}
      </p>
    </div>
  );
}
