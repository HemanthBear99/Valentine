import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import LoveQuestion from "../components/LoveQuestion";

export default function TeddyDay() {
  const [arrived, setArrived] = useState(false);

  return (
    <div className="flex flex-col items-center py-4">
      {/* Animation container — teddy walks here */}
      <div className="relative w-full h-48 overflow-hidden">
        {/* Ground line */}
        <div className="absolute bottom-8 left-0 right-0 h-px bg-white/20" />

        {/* Footprints that appear along the path */}
        <AnimatePresence>
          {arrived && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`step-${i}`}
                  className="absolute bottom-4 text-xs text-white/20"
                  style={{ left: `${15 + i * 15}%` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 }}
                >
                  .
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Teddy bear */}
        <motion.div
          className="absolute bottom-8 text-7xl"
          style={{ translateX: "-50%" }}
          initial={{ left: "-15%", y: 0 }}
          animate={{
            left: "50%",
            y: [0, -25, 0, -18, 0, -10, 0, -5, 0],
          }}
          transition={{
            left: { duration: 2.2, ease: "easeOut" },
            y: { duration: 2.2, ease: "easeOut" },
          }}
          onAnimationComplete={() => setArrived(true)}
        >
          {"🧸"}
        </motion.div>

        {/* Hearts floating up after arrival */}
        <AnimatePresence>
          {arrived && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={`heart-${i}`}
                  className="absolute text-rose-400 pointer-events-none"
                  style={{
                    left: `calc(50% + ${(i - 1) * 22}px)`,
                    bottom: "70px",
                    fontSize: 16 + i * 2,
                  }}
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.3, 1, 0.9, 0.7],
                    y: [-5, -25, -40, -60],
                  }}
                  transition={{ duration: 2, delay: 0.2 + i * 0.35 }}
                >
                  &#10084;
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Hug text — OUTSIDE the animation container to avoid overlap */}
      <AnimatePresence>
        {arrived && (
          <motion.div
            className="text-center mt-3 px-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <p className="font-heading text-lg md:text-xl text-orange-300 leading-relaxed">
              Hold me close, because in your arms the whole world disappears
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {arrived && (
        <LoveQuestion
          dayName="Teddy Day"
          question="Can I be the one you hold onto on every bad day? 🧸"
          yesText="Always you 🧸"
          noText="I'll think about it"
          yesReaction="I'll be your comfort, your warmth, your safe place — always 🧸❤️"
          noReaction="This little bear will sit right here, waiting with open arms 🥺"
          accentColor="orange"
          delay={2}
        />
      )}
    </div>
  );
}
