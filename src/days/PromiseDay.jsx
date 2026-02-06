import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import LoveQuestion from "../components/LoveQuestion";

export default function PromiseDay() {
  const [clasped, setClasped] = useState(false);

  return (
    <div className="flex flex-col items-center py-6">
      {!clasped && (
        <motion.p
          className="text-white/50 text-sm mb-6"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Tap to make a promise
        </motion.p>
      )}

      <div
        className="relative flex items-center justify-center h-36 w-full cursor-pointer"
        onClick={() => setClasped(true)}
      >
        {/* Left hand */}
        <motion.div
          className="text-5xl select-none"
          style={{ scaleX: -1 }}
          animate={clasped ? { x: 8 } : { x: -50 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          {"✋"}
        </motion.div>

        {/* Right hand */}
        <motion.div
          className="text-5xl select-none"
          animate={clasped ? { x: -8 } : { x: 50 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          {"✋"}
        </motion.div>

        {/* Glowing bond line */}
        <AnimatePresence>
          {clasped && (
            <motion.div
              className="absolute top-1/2 left-1/4 right-1/4 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Glow pulse */}
        {clasped && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-yellow-300/15 blur-2xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}

        {/* Sparkle particles */}
        <AnimatePresence>
          {clasped && (
            <>
              {[...Array(6)].map((_, i) => {
                const angle = (i / 6) * Math.PI * 2;
                const radius = 45;
                return (
                  <motion.div
                    key={`spark-${i}`}
                    className="absolute w-1 h-1 rounded-full bg-yellow-200"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      x: Math.cos(angle) * radius,
                      y: Math.sin(angle) * radius,
                    }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.08 }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Promise text */}
      <AnimatePresence>
        {clasped && (
          <motion.div
            className="text-center mt-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="font-heading text-xl md:text-2xl text-emerald-300 leading-relaxed">
              I promise to be your shelter in every storm,
            </p>
            <p className="font-heading text-xl md:text-2xl text-emerald-300 leading-relaxed mt-1">
              your calm in every chaos, and your home in every heartbeat
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {clasped && (
        <LoveQuestion
          dayName="Promise Day"
          question="Do you promise to never let go of my hand? 🤞"
          yesText="I promise 🤝"
          noText="I need time"
          yesReaction="Then this bond is unbreakable — you and me, against the whole world ✨🤝"
          noReaction="No rush, my love — some promises are worth waiting a lifetime for 💚"
          accentColor="emerald"
          delay={1.2}
        />
      )}
    </div>
  );
}
