
import { motion } from "motion/react";
import { Code2, Mail, FileText, Github, Linkedin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PROJECTS, EXPERIENCES } from "./data";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 font-bold text-xl tracking-tighter"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <Code2 size={20} />
            </div>
            <span>Portfolio.exe</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium opacity-70">
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <FileText size={16} />
            Download CV
          </Button>
        </div>
      </nav>

      <main className="pt-16">
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
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Focusing on modern front-end architectures and agentic coding workflows. Exploring the intersection of React, Next.js, and autonomous AI tools to build efficient, scalable web solutions.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
              Explore Projects
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Get in Touch
            </Button>
          </motion.div>
        </section>

        {/* Stats / Badges */}
        <section className="bg-muted/30 border-y py-12">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Completed Projects", value: "5+" },
              { label: "Years of Experience", value: "2+" },
              { label: "Clients", value: "10+" },
              { label: "Technologies", value: "8+" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-bold font-mono">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Content Tabs */}
        <section className="container mx-auto px-4 py-24">
          <Tabs defaultValue="projects" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="grid w-full max-w-xs grid-cols-2 h-12 p-1 bg-muted rounded-full">
                <TabsTrigger value="projects" className="rounded-full">Projects</TabsTrigger>
                <TabsTrigger value="experience" className="rounded-full">Careers</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="projects" id="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="group overflow-hidden border-muted hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-video bg-muted relative group-hover:scale-105 transition-transform duration-500 overflow-hidden flex items-center justify-center">
                         <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opaitcy-0 group-hover:opacity-100 transition-opacity" />
                         <span className="font-mono text-4xl opacity-10 font-bold select-none">{project.title.charAt(0)}</span>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-2xl font-bold leading-none mb-2">{project.title}</CardTitle>
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
                            <ExternalLink size={18} />
                          </a>
                        </div>
                        <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" id="experience">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-muted-foreground mb-8">Professional Journey</h3>
                <div className="relative pl-8 space-y-12 border-l-2 border-muted py-2">
                  {EXPERIENCES.map((exp, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-2xl font-bold">{exp.role}</h4>
                          <div className="flex justify-between items-center text-muted-foreground mt-1 font-medium">
                            <span>{exp.company}</span>
                            <span className="text-sm font-mono">{exp.period}</span>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {exp.description.map((item, j) => (
                            <li key={j} className="text-sm opacity-80 flex gap-3">
                              <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-muted py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="bg-background border-none shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 space-y-8 bg-primary text-primary-foreground">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Let&apos;s build something together.</h2>
                    <p className="opacity-80">Currently looking for new opportunities and collaborations in Sarajevo and remotely.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail size={20} />
                      <span>djumisic.anes@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Linkedin size={20} />
                      <span>linkedin.com/in/anes-djumisic</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Github size={20} />
                      <span>github.com/djuuuma</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60">Full Name</label>
                    <input className="w-full bg-muted border-none rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60">Email Address</label>
                    <input className="w-full bg-muted border-none rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60">Message</label>
                    <textarea rows={4} className="w-full bg-muted border-none rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Your message here..." />
                  </div>
                  <Button className="w-full py-6 text-lg font-bold">Send Message</Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">© 2026 Anes Đumišić. Built for excellence.</p>
          <div className="flex gap-4 text-xs font-mono uppercase tracking-widest font-bold">
            <a href="https://github.com/djuuuma" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/anes-djumisic/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
