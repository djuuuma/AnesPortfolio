import { motion } from "motion/react";
import { ExternalLink, Globe } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "../data";

const gradients = [
  "from-orange-500/25 via-amber-400/10 to-transparent",
  "from-orange-600/25 via-rose-400/10 to-transparent",
  "from-amber-500/25 via-orange-300/10 to-transparent",
  "from-rose-500/25 via-orange-400/10 to-transparent",
];

function ProjectPreview({
  project,
  gradient,
}: {
  project: (typeof PROJECTS)[number];
  gradient: string;
}) {
  if (project.image) {
    return (
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
      </div>
    );
  }

  return (
    <div
      className={`aspect-video bg-gradient-to-br ${gradient} relative overflow-hidden flex flex-col`}
    >
      {/* Mock browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-background/30 backdrop-blur-sm border-b border-white/10 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="flex-1 mx-2 bg-background/40 rounded text-[10px] font-mono text-foreground/50 px-2 py-0.5 flex items-center gap-1 truncate">
          <Globe size={9} className="shrink-0" />
          {project.link.replace(/^https?:\/\//, "")}
        </div>
      </div>
      {/* Content area */}
      <div className="flex-1 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="font-mono text-8xl opacity-10 font-bold select-none text-primary">
          {project.title.charAt(0)}
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="px-4 py-24">
      <div className="max-w-5xl mx-auto">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
          Portfolio
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Selected Work</h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          A collection of client projects spanning web apps, business sites, and creative platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Card className="group overflow-hidden border-muted hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
              <ProjectPreview project={project} gradient={gradients[i % gradients.length]} />
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold leading-none mb-2">
                    {project.title}
                  </CardTitle>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title} in a new tab`}
                    className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ExternalLink size={18} aria-hidden="true" />
                  </a>
                </div>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="font-mono text-[10px] uppercase tracking-wider"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
