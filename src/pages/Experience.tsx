import { motion } from "motion/react";
import { EXPERIENCES } from "../data";

export default function Experience() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
          Career
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Professional Journey</h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Roles and experiences that have shaped my skills in data, operations, and client-facing work.
        </p>
      </div>

      <div className="max-w-3xl relative pl-8 space-y-12 border-l-2 border-primary/30 py-2">
        {EXPERIENCES.map((exp) => (
          <motion.div
            key={`${exp.company}-${exp.period}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{exp.role}</h2>
                <div className="flex flex-wrap justify-between items-center text-muted-foreground mt-1 font-medium gap-2">
                  <span>{exp.company}</span>
                  <span className="text-sm font-mono">{exp.period}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.description.map((item) => (
                  <li key={item} className="text-sm opacity-80 flex gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
