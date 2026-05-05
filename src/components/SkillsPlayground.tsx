import { MousePointerClick } from "lucide-react";
import { Gravity, MatterBody } from "@/components/ui/gravity";

// Colours use hackathon: CSS variant — no JS context needed.
const skills = [
  { label: "React",           x: "18%", y: "8%",  angle: -6, color: "bg-[#0ea5e9] text-white hackathon:bg-foreground hackathon:text-background" },
  { label: "Next.js",         x: "38%", y: "5%",  angle: 4,  color: "bg-foreground text-background" },
  { label: "TypeScript",      x: "62%", y: "8%",  angle: -4, color: "bg-[#3178C6] text-white hackathon:bg-foreground hackathon:text-background" },
  { label: "Tailwind CSS",    x: "82%", y: "10%", angle: 8,  color: "bg-[#06b6d4] text-white hackathon:bg-foreground hackathon:text-background" },
  { label: "Motion",          x: "12%", y: "28%", angle: 5,  color: "bg-[#8b5cf6] text-white hackathon:bg-foreground hackathon:text-background" },
  { label: "Vite",            x: "32%", y: "32%", angle: -8, color: "bg-primary text-primary-foreground" },
  { label: "Git",             x: "55%", y: "30%", angle: 6,  color: "bg-[#f97316] text-white hackathon:bg-foreground hackathon:text-background" },
  { label: "Python",          x: "78%", y: "32%", angle: -3, color: "bg-[#facc15] text-black hackathon:bg-foreground hackathon:text-background" },
  { label: "Google Sheets",   x: "28%", y: "55%", angle: 2,  color: "bg-[#16a34a] text-white hackathon:bg-foreground hackathon:text-background" },
  { label: "Microsoft Excel", x: "65%", y: "55%", angle: -5, color: "bg-[#107c41] text-white hackathon:bg-foreground hackathon:text-background" },
];

export default function SkillsPlayground() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
          Tech Stack
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Tools & Technologies</h2>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <MousePointerClick size={13} aria-hidden />
          drag the chips around
        </p>
      </div>

      <div className="relative w-full h-[420px] sm:h-[460px] md:h-[500px] rounded-2xl border bg-muted/20 overflow-hidden">
        <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
          {skills.map((skill) => (
            <MatterBody
              key={skill.label}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              x={skill.x}
              y={skill.y}
              angle={skill.angle}
            >
              <div
                className={`select-none whitespace-nowrap rounded-full px-5 py-2.5 text-sm sm:text-base md:text-lg font-medium shadow-sm hover:cursor-grab active:cursor-grabbing ${skill.color}`}
              >
                {skill.label}
              </div>
            </MatterBody>
          ))}
        </Gravity>
      </div>
    </section>
  );
}
