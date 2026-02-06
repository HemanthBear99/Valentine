import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import LoveQuestion from "../components/LoveQuestion";

export default function HugDay() {
  const [merged, setMerged] = useState(false);

  return (
    <div className="flex flex-col items-center py-4">
      {!merged && (
        <motion.p
          className="text-white/50 text-sm mb-4"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Tap to embrace
        </motion.p>
      )}

      <div
        className="relative w-64 h-64 cursor-pointer mx-auto"
        onClick={() => setMerged(true)}
      >
        {/* Blob 1 — Pink (left) */}
        <motion.div
          className="absolute w-28 h-28 rounded-full blur-sm"
          style={{
            background: "radial-gradient(circle, #ec4899, #e11d48)",
          }}
          animate={
            merged
              ? {
                  left: "50%",
                  top: "35%",
                  x: "-70%",
                  y: "-50%",
                  scale: 0.7,
                  opacity: 0,
                }
              : {
                  left: "10%",
                  top: "40%",
                  x: "0%",
                  y: "0%",
                  scale: 1,
                  opacity: 1,
                }
          }
          transition={{ type: "spring", stiffness: 60, damping: 14, duration: 1.2 }}
        />

        {/* Blob 2 — Purple (right) */}
        <motion.div
          className="absolute w-28 h-28 rounded-full blur-sm"
          style={{
            background: "radial-gradient(circle, #a855f7, #7c3aed)",
          }}
          animate={
            merged
              ? {
                  left: "50%",
                  top: "35%",
                  x: "-30%",
                  y: "-50%",
                  scale: 0.7,
                  opacity: 0,
                }
              : {
                  left: "55%",
                  top: "40%",
                  x: "0%",
                  y: "0%",
                  scale: 1,
                  opacity: 1,
                }
          }
          transition={{ type: "spring", stiffness: 60, damping: 14, duration: 1.2 }}
        />

        {/* Idle floating animation for blobs */}
        {!merged && (
          <>
            <motion.div
              className="absolute w-28 h-28 rounded-full"
              style={{ left: "10%", top: "40%" }}
              animate={{ y: [0, -8, 0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Heart that appears after merge */}
        <AnimatePresence>
          {merged && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
            >
              <svg viewBox="0 0 100 100" className="w-36 h-36 drop-shadow-lg">
                <defs>
                  <linearGradient
                    id="hugHeartGrad"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M50 88 C25 65 5 50 5 30 C5 15 18 5 30 5 C38 5 45 10 50 18 C55 10 62 5 70 5 C82 5 95 15 95 30 C95 50 75 65 50 88Z"
                  fill="url(#hugHeartGrad)"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  stroke="url(#hugHeartGrad)"
                  strokeWidth="2"
                />
              </svg>

              {/* Pulsing glow */}
              <motion.div
                className="absolute w-40 h-40 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(168,85,247,0.3), rgba(236,72,153,0.2), transparent)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {merged && (
          <motion.div
            className="text-center mt-2 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <p className="font-heading text-xl md:text-2xl text-purple-300 leading-relaxed">
              When I hold you, the rest of the world fades away &mdash;
            </p>
            <p className="font-heading text-xl md:text-2xl text-purple-300 leading-relaxed mt-1">
              and all that remains is the sound of two hearts becoming one
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {merged && (
        <LoveQuestion
          dayName="Hug Day"
          question="If I open my arms right now, will you fall into them? 🤗"
          yesText="I'm already there 🤗"
          noText="Not right now"
          yesReaction="Then stay — because my arms were made to hold only you 💜✨"
          noReaction="Whenever you're ready, I'll be the warmest place you know 💛"
          accentColor="purple"
          delay={1.8}
        />
      )}
    </div>
  );
}
