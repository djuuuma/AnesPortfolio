import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "../data";

const gradients = [
  "from-orange-500/25 via-amber-400/10 to-transparent",
  "from-orange-600/25 via-rose-400/10 to-transparent",
  "from-amber-500/25 via-orange-300/10 to-transparent",
  "from-rose-500/25 via-orange-400/10 to-transparent",
];

export default function Projects() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Portfolio</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Selected Work</h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          A collection of client projects spanning web apps, business sites, and creative platforms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group overflow-hidden border-muted hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
              <div className={`aspect-video bg-gradient-to-br ${gradients[i % gradients.length]} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-mono text-8xl opacity-15 font-bold select-none text-primary">
                  {project.title.charAt(0)}
                </span>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl font-bold leading-none mb-2">{project.title}</CardTitle>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
