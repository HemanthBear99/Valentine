import { motion } from "motion/react";
import { useMemo } from "react";

export default function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        size: 10 + Math.random() * 14,
        opacity: 0.05 + Math.random() * 0.12,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-rose-500"
          style={{
            left: `${h.x}%`,
            fontSize: h.size,
            opacity: h.opacity,
          }}
          initial={{ y: "100vh" }}
          animate={{ y: "-5vh" }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          &#10084;
        </motion.div>
      ))}
    </div>
  );
}
