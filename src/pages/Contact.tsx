import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Contact() {
  return (
    <section className="container mx-auto px-4 py-24">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">Get in Touch</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Contact</h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Open to new opportunities and collaborations in Sarajevo and remotely.
        </p>
      </div>

      <div className="max-w-4xl">
        <Card className="bg-background border-none shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 space-y-8 bg-primary text-primary-foreground">
              <div>
                <h2 className="text-3xl font-bold mb-4">Let&apos;s build something together.</h2>
                <p className="opacity-80">Currently looking for new opportunities and collaborations in Sarajevo and remotely.</p>
              </div>
              <div className="space-y-4">
                <a
                  href="mailto:djumisic.anes@gmail.com"
                  className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Mail size={20} />
                  <span>djumisic.anes@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/anes-djumisic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Linkedin size={20} />
                  <span>linkedin.com/in/anes-djumisic</span>
                </a>
                <a
                  href="https://github.com/djuuuma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Github size={20} />
                  <span>github.com/djuuuma</span>
                </a>
              </div>
            </div>
            <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Full Name</label>
                <input
                  className="w-full bg-muted border-none rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Email Address</label>
                <input
                  className="w-full bg-muted border-none rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest opacity-60">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-muted border-none rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <Button className="w-full py-6 text-lg font-bold">Send Message</Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
