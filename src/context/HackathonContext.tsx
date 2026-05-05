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

const GLITCH_DURATION_MS = 700;

function readStorage(): boolean {
  try {
    return localStorage.getItem("hackathonMode") === "true";
  } catch {
    return false;
  }
}

function applyTheme(active: boolean): void {
  if (active) {
    document.documentElement.setAttribute("data-theme", "hackathon");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem("hackathonMode", String(active));
  } catch {
    /* storage unavailable */
  }
}

export function HackathonProvider({ children }: { children: ReactNode }) {
  const [isHackathonMode, setIsHackathonMode] = useState<boolean>(readStorage);
  const [isGlitching, setIsGlitching] = useState(false);

  // Apply persisted theme on first paint
  useEffect(() => {
    applyTheme(readStorage());
  }, []);

  // Auto-clear glitch after duration. Independent of any other logic.
  useEffect(() => {
    if (!isGlitching) return;
    const id = window.setTimeout(() => setIsGlitching(false), GLITCH_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [isGlitching]);

  /**
   * Toggle is SYNCHRONOUS and DETERMINISTIC.
   * State, DOM, and storage all update in a single tick.
   * The glitch is purely cosmetic on top — it cannot block the toggle.
   */
  const toggle = useCallback(() => {
    setIsHackathonMode((current) => {
      const next = !current;
      applyTheme(next); // instant DOM + storage update
      return next;
    });
    setIsGlitching(true);
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
