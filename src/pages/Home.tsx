import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { FolderGit2, Clock, Users, Layers, MapPin, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Bio from "../components/Bio";
import { useHackathonMode } from "../context/HackathonContext";

// Lazy-load the physics playground so matter-js ships in a separate async chunk.
const SkillsPlayground = lazy(() => import("../components/SkillsPlayground"));

const AVATAR_SRC = "/anesphoto.png";

const stats = [
  { label: "Client Projects", value: "5+", icon: FolderGit2 },
  { label: "Years of Experience", value: "2+", icon: Clock },
  { label: "Clients Served", value: "4+", icon: Users },
  { label: "Technologies", value: "10+", icon: Layers },
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

      {/* About / Philosophy Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left — personal statement */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
                Philosophy
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">A bit about me</h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              I build web products that actually work — clean, fast, and purposeful. Based in
              Sarajevo, I partner with local businesses and remote clients to turn ideas into
              polished digital experiences that serve real people.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My focus sits at the intersection of React, design systems, and the new generation
              of agentic AI tools. I believe good software is invisible to the user: it just
              responds, performs, and gets out of the way.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                <MapPin size={12} aria-hidden />
                Sarajevo, BA
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden />
                Open to work
              </span>
            </div>
          </motion.div>

          {/* Right — two quick lists */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Sparkles size={13} aria-hidden />
                Currently exploring
              </p>
              <ul className="space-y-2">
                {[
                  "Agentic AI coding workflows",
                  "Design systems & component architecture",
                  "Next.js App Router & server components",
                  "Core Web Vitals & performance budgets",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Heart size={13} aria-hidden />
                I care about
              </p>
              <ul className="space-y-2">
                {[
                  "Accessibility as a default, not an afterthought",
                  "Code that reads like prose",
                  "Honest, direct communication with clients",
                  "Shipping things that actually launch",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section — lazy-loaded physics playground */}
      <Suspense
        fallback={
          <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-6 space-y-2 animate-pulse">
              <div className="h-3 w-24 bg-muted rounded-full mx-auto" />
              <div className="h-6 w-52 bg-muted rounded-full mx-auto" />
              <div className="h-3 w-36 bg-muted rounded-full mx-auto" />
            </div>
            <div className="w-full h-[420px] sm:h-[460px] md:h-[500px] rounded-2xl border bg-muted/20 animate-pulse" />
          </section>
        }
      >
        <SkillsPlayground />
      </Suspense>
    </>
  );
}
