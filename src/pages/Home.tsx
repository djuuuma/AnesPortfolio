import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FolderGit2, Clock, Users, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Bio from "../components/Bio";
import { useHackathonMode } from "../context/HackathonContext";

const stats = [
  { label: "Completed Projects", value: "5+", icon: FolderGit2 },
  { label: "Years of Experience", value: "2+", icon: Clock },
  { label: "Clients", value: "10+", icon: Users },
  { label: "Technologies", value: "8+", icon: Layers },
];

const skills = [
  { label: "React", group: "frontend" },
  { label: "Next.js", group: "frontend" },
  { label: "TypeScript", group: "frontend" },
  { label: "Tailwind CSS", group: "frontend" },
  { label: "Motion", group: "frontend" },
  { label: "Vite", group: "tools" },
  { label: "Git", group: "tools" },
  { label: "Python", group: "tools" },
  { label: "Google Sheets", group: "tools" },
  { label: "Microsoft Excel", group: "tools" },
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
          <Avatar className="w-32 h-32 border-4 border-muted">
            <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQH4Epya9pDMyQ/profile-displayphoto-crop_800_800/B4DZwKAvVvKUAI-/0/1769694496794?e=1779321600&v=beta&t=Tz9sK1NJZc8EMlr3eusM33m5oCVvJC9u4eQoXZk2wfg" />
            <AvatarFallback>AĐ</AvatarFallback>
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
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-2"
            >
              <stat.icon size={22} className="text-primary" />
              <span className="text-3xl font-bold font-mono">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Tech Stack</p>
          <h2 className="text-2xl font-bold tracking-tight">Tools & Technologies</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {skills.map((skill) => (
            <Badge
              key={skill.label}
              variant="outline"
              className="px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
            >
              {skill.label}
            </Badge>
          ))}
        </div>
      </section>
    </>
  );
}
