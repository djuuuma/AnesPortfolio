import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";

// Create a free Formspree account at https://formspree.io and replace
// the endpoint below with your own (e.g. "https://formspree.io/f/abcdefgh").
const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "loading" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM: FormState = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isPlaceholder = FORM_ENDPOINT.includes("YOUR_FORM_ID");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isPlaceholder) {
      setStatus("error");
      setErrorMessage(
        "Form endpoint not configured. Add your Formspree ID to Contact.tsx."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(INITIAL_FORM);
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Submission failed. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <section className="px-4 py-24">
      <div className="max-w-4xl mx-auto">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2">
          Get in Touch
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Contact</h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Open to new opportunities and collaborations in Sarajevo and remotely.
        </p>
      </div>

      <div>
        <Card className="bg-background border-none shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left panel — contact info */}
            <div className="p-8 md:p-12 space-y-8 bg-primary text-primary-foreground">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Let&apos;s build something together.
                </h2>
                <p className="opacity-80">
                  Currently looking for new opportunities and collaborations in
                  Sarajevo and remotely.
                </p>
              </div>
              <div className="space-y-4">
                <a
                  href="mailto:djumisic.anes@gmail.com"
                  className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Mail size={20} aria-hidden="true" />
                  <span>djumisic.anes@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/anes-djumisic/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Linkedin size={20} aria-hidden="true" />
                  <span>linkedin.com/in/anes-djumisic</span>
                </a>
                <a
                  href="https://github.com/djuuuma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 opacity-90 hover:opacity-100 transition-opacity"
                >
                  <Github size={20} aria-hidden="true" />
                  <span>github.com/djuuuma</span>
                </a>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center gap-4 py-8"
                >
                  <CheckCircle className="text-primary" size={48} />
                  <h3 className="text-xl font-bold">Message sent!</h3>
                  <p className="text-muted-foreground text-sm">
                    Thanks for reaching out. I&apos;ll get back to you as soon as
                    possible.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus("idle")}
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-bold uppercase tracking-widest opacity-60"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-muted border border-transparent rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-bold uppercase tracking-widest opacity-60"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full bg-muted border border-transparent rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-bold uppercase tracking-widest opacity-60"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      className="w-full bg-muted border border-transparent rounded-lg p-3 focus:ring-2 focus:ring-primary outline-none resize-none transition-shadow"
                    />
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 text-destructive text-sm"
                    >
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full py-6 text-lg font-bold gap-2"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
      </div>
    </section>
  );
}
