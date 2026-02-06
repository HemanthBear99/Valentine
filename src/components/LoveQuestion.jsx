import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useAnswersStore } from "../hooks/useAnswersStore";

export default function LoveQuestion({
  question,
  yesText = "Yes, always",
  noText = "Maybe later",
  yesReaction = "You just made my heart skip a beat ❤️",
  noReaction = "I'll wait forever for you 🥹",
  accentColor = "rose",
  delay = 0,
  dayName = "",
  onAnswer = null,
}) {
  const [answer, setAnswer] = useState(null);
  const { saveAnswer } = useAnswersStore();

  const handleAnswer = (choice) => {
    setAnswer(choice);
    if (dayName) {
      saveAnswer(dayName, question, choice);
    }
    if (onAnswer) {
      onAnswer(choice);
    }
  };

  const colorMap = {
    rose: {
      yesBg: "from-rose-500 to-pink-600",
      yesShadow: "shadow-rose-500/40",
      noBorder: "border-rose-400/40",
      noText: "text-rose-300",
      reactionColor: "text-rose-200",
      glowBg: "bg-rose-500/20",
    },
    amber: {
      yesBg: "from-amber-400 to-yellow-500",
      yesShadow: "shadow-amber-400/40",
      noBorder: "border-amber-400/40",
      noText: "text-amber-300",
      reactionColor: "text-amber-200",
      glowBg: "bg-amber-400/20",
    },
    orange: {
      yesBg: "from-orange-400 to-amber-500",
      yesShadow: "shadow-orange-400/40",
      noBorder: "border-orange-400/40",
      noText: "text-orange-300",
      reactionColor: "text-orange-200",
      glowBg: "bg-orange-400/20",
    },
    emerald: {
      yesBg: "from-emerald-400 to-teal-500",
      yesShadow: "shadow-emerald-400/40",
      noBorder: "border-emerald-400/40",
      noText: "text-emerald-300",
      reactionColor: "text-emerald-200",
      glowBg: "bg-emerald-400/20",
    },
    purple: {
      yesBg: "from-purple-500 to-violet-600",
      yesShadow: "shadow-purple-500/40",
      noBorder: "border-purple-400/40",
      noText: "text-purple-300",
      reactionColor: "text-purple-200",
      glowBg: "bg-purple-500/20",
    },
    red: {
      yesBg: "from-red-500 to-rose-600",
      yesShadow: "shadow-red-500/40",
      noBorder: "border-red-400/40",
      noText: "text-red-300",
      reactionColor: "text-red-200",
      glowBg: "bg-red-500/20",
    },
  };

  const colors = colorMap[accentColor] || colorMap.rose;

  return (
    <motion.div
      className="mt-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {answer === null ? (
          <motion.div
            key="question"
            className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-5 text-center"
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* The question */}
            <motion.p
              className="font-heading text-xl md:text-2xl text-white leading-relaxed mb-5"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {question}
            </motion.p>

            {/* Buttons */}
            <div className="flex items-center justify-center gap-4">
              {/* Yes button — big, glowing, inviting */}
              <motion.button
                onClick={() => handleAnswer("yes")}
                className={`relative px-7 py-3 rounded-full bg-gradient-to-r ${colors.yesBg} text-white font-semibold text-sm md:text-base shadow-lg ${colors.yesShadow} outline-none`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {yesText}
                {/* Subtle pulse ring */}
                <motion.span
                  className={`absolute inset-0 rounded-full border-2 ${colors.noBorder}`}
                  animate={{ scale: [1, 1.25], opacity: [0.4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              </motion.button>

              {/* No button — soft, gentle, smaller */}
              <motion.button
                onClick={() => handleAnswer("no")}
                className={`px-5 py-3 rounded-full border ${colors.noBorder} ${colors.noText} text-sm font-medium backdrop-blur-sm bg-white/5 outline-none`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {noText}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reaction"
            className="rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 p-5 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
          >
            {/* Background glow */}
            <motion.div
              className={`absolute inset-0 ${colors.glowBg} blur-2xl rounded-2xl`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0.3] }}
              transition={{ duration: 1.5 }}
            />

            {/* Reaction text */}
            <motion.p
              className={`relative font-heading text-xl md:text-2xl ${colors.reactionColor} leading-relaxed`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {answer === "yes" ? yesReaction : noReaction}
            </motion.p>

            {/* Floating hearts on "yes" */}
            {answer === "yes" && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-base"
                    style={{
                      left: `${12 + Math.random() * 76}%`,
                      bottom: "0%",
                    }}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      y: [0, -30, -60, -90],
                      x: (Math.random() - 0.5) * 30,
                    }}
                    transition={{
                      duration: 1.8,
                      delay: 0.1 + i * 0.12,
                      ease: "easeOut",
                    }}
                  >
                    {["❤️", "💕", "✨", "💗", "🥰", "💖", "💘", "💓"][i]}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Tap to change answer */}
            <motion.button
              className="relative mt-3 text-white/30 text-xs underline underline-offset-2 outline-none"
              onClick={() => setAnswer(null)}
              whileHover={{ color: "rgba(255,255,255,0.5)" }}
            >
              change my answer
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
