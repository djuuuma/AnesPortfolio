import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FolderGit2, Clock, Users, Layers, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gravity, MatterBody } from "@/components/ui/gravity";
import Bio from "../components/Bio";
import { useHackathonMode } from "../context/HackathonContext";

// Save your photo as public/avatar.jpg to use a local copy that won't expire.
const AVATAR_SRC = "/avatar.jpg";

const stats = [
  { label: "Client Projects", value: "4+", icon: FolderGit2 },
  { label: "Years of Experience", value: "2+", icon: Clock },
  { label: "Clients Served", value: "4+", icon: Users },
  { label: "Technologies", value: "10+", icon: Layers },
];

// Each chip starts at a roughly hand-tuned spot inside the playground so the
// pile settles into a natural, non-overlapping heap rather than a single column.
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

export default function Home() {
  const { isHackathonMode } = useHackathonMode();

  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-lg shadow-primary/10">
            <AvatarImage src={AVATAR_SRC} alt="Anes Đumišić" />
            <AvatarFallback className="text-2xl font-bold">AĐ</AvatarFallback>
          </Avatar>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent"
        >
          Anes Đumišić
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full mb-10"
        >
          <Bio />
        </motion.div>

        {!isHackathonMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" asChild>
              <Link to="/projects">Explore Projects</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </motion.div>
        )}
      </section>

      {/* Stats Strip */}
      <section className="bg-muted/30 border-y py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <stat.icon size={22} className="text-primary" />
              <span className="text-3xl font-bold font-mono">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section — interactive physics playground */}
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
    </>
  );
}
