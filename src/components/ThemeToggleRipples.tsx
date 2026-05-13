import { motion, AnimatePresence } from "motion/react";

/** Hollow rings spreading from the theme control — decorative only; theme changes on live DOM underneath. */
export function ThemeToggleRipples({
  origin,
  onFinish,
}: {
  origin: { cx: number; cy: number };
  onFinish: () => void;
}) {
  const maxDim = Math.hypot(window.innerWidth, window.innerHeight);

  /** Scale multiplier so rings reach past the viewport (ring base size 10px φ). */
  const endScale = (maxDim / 10) * 1.15;

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key="ripple-root"
        className="fixed inset-0 pointer-events-none z-[55] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border-2 border-primary/50 dark:border-primary/60 box-border"
            style={{
              left: origin.cx,
              top: origin.cy,
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
            }}
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: endScale, opacity: 0 }}
            transition={{
              duration: 1.15,
              delay: i * 0.12,
              ease: [0.22, 0.94, 0.28, 1],
            }}
            onAnimationComplete={i === 2 ? () => onFinish() : undefined}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
