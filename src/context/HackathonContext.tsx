import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface HackathonContextType {
  isHackathonMode: boolean;
  isGlitching: boolean;
  toggle: () => void;
}

const HackathonContext = createContext<HackathonContextType | null>(null);

const GLITCH_DURATION_MS = 950;
const THEME_FLIP_DELAY_MS = GLITCH_DURATION_MS / 2;

function readStorage(): boolean {
  try {
    return localStorage.getItem("hackathonMode") === "true";
  } catch {
    return false;
  }
}

function writeStorage(value: boolean): void {
  try {
    localStorage.setItem("hackathonMode", String(value));
  } catch {
    /* storage unavailable */
  }
}

export function HackathonProvider({ children }: { children: ReactNode }) {
  const [isHackathonMode, setIsHackathonMode] = useState<boolean>(readStorage);
  const [isGlitching, setIsGlitching] = useState(false);

  // Sync data-theme attribute + localStorage whenever mode changes
  useEffect(() => {
    writeStorage(isHackathonMode);
    if (isHackathonMode) {
      document.documentElement.setAttribute("data-theme", "hackathon");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isHackathonMode]);

  // Apply persisted theme immediately on first render (no flash)
  useEffect(() => {
    if (readStorage()) {
      document.documentElement.setAttribute("data-theme", "hackathon");
    }
  }, []);

  // Drive the glitch timing via useEffect so cleanup works correctly in
  // StrictMode and rapid re-clicks are always properly cancelled.
  useEffect(() => {
    if (!isGlitching) return;

    const t1 = setTimeout(() => {
      setIsHackathonMode((prev) => !prev);
    }, THEME_FLIP_DELAY_MS);

    const t2 = setTimeout(() => {
      setIsGlitching(false);
    }, GLITCH_DURATION_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isGlitching]);

  // Toggle just kicks off the glitch — all timer logic lives in the effect above
  const toggle = useCallback(() => {
    setIsGlitching(false); // reset first (handles rapid double-click)
    // Use rAF so the false→true transition is always a separate render
    requestAnimationFrame(() => setIsGlitching(true));
  }, []);

  return (
    <HackathonContext.Provider value={{ isHackathonMode, isGlitching, toggle }}>
      {children}
    </HackathonContext.Provider>
  );
}

export function useHackathonMode(): HackathonContextType {
  const ctx = useContext(HackathonContext);
  if (!ctx) {
    throw new Error("useHackathonMode must be called inside <HackathonProvider>");
  }
  return ctx;
}
