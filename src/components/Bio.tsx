import { useHackathonMode } from "../context/HackathonContext";

interface BioData {
  name: string;
  role: string;
  location: string;
  focus: string[];
  bio: string;
  available: boolean;
  github: string;
  linkedin: string;
}

const bioData: BioData = {
  name: "Anes Đumišić",
  role: "Frontend Engineer",
  location: "Sarajevo, BA",
  focus: ["React", "Next.js", "TypeScript", "Agentic AI workflows"],
  bio: "Focusing on modern front-end architectures and agentic coding workflows. Exploring the intersection of React, Next.js, and autonomous AI tools to build efficient, scalable web solutions.",
  available: true,
  github: "github.com/djuuuma",
  linkedin: "linkedin.com/in/anes-djumisic",
};

function JsonValue({ value }: { value: BioData[keyof BioData] }): JSX.Element {
  if (Array.isArray(value)) {
    return (
      <span className="text-[#ffcc00]">
        [{value.map((v, i) => (
          <span key={i}>
            <span className="text-[#ce9178]">&quot;{v}&quot;</span>
            {i < value.length - 1 && <span className="text-white">, </span>}
          </span>
        ))}]
      </span>
    );
  }
  if (typeof value === "boolean") {
    return <span className="text-[#569cd6]">{String(value)}</span>;
  }
  return <span className="text-[#ce9178]">&quot;{value}&quot;</span>;
}

export default function Bio() {
  const { isHackathonMode } = useHackathonMode();

  if (isHackathonMode) {
    const entries = Object.entries(bioData) as [keyof BioData, BioData[keyof BioData]][];
    return (
      <div className="max-w-2xl w-full mx-auto text-left">
        <p className="text-[#00ff41]/50 text-xs font-mono mb-2 tracking-widest">
          // bio.json — read-only
        </p>
        <pre className="font-mono text-sm leading-7 bg-[#0d0d0d] border border-[#00ff41]/20 p-6 overflow-x-auto">
          <span className="text-white/40">{"{\n"}</span>
          {entries.map(([key, value], i) => (
            <span key={key}>
              {"  "}
              <span className="text-[#9cdcfe]">&quot;{key}&quot;</span>
              <span className="text-white">: </span>
              <JsonValue value={value} />
              {i < entries.length - 1 && <span className="text-white/40">,</span>}
              {"\n"}
            </span>
          ))}
          <span className="text-white/40">{"}"}</span>
        </pre>
      </div>
    );
  }

  return (
    <p className="text-xl text-muted-foreground max-w-2xl text-center mx-auto">
      {bioData.bio}
    </p>
  );
}
