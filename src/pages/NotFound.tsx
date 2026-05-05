import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <p className="font-mono text-8xl font-bold text-primary/30 select-none">404</p>
        <h1 className="text-4xl font-bold tracking-tighter">Page not found</h1>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Looks like this route doesn't exist. Let's get you back on track.
        </p>
        <Button asChild className="rounded-full px-8">
          <Link to="/">Back to Home</Link>
        </Button>
      </motion.div>
    </section>
  );
}
