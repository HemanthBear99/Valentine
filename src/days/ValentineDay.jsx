import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Heart, Mail, ArrowLeft } from "lucide-react";
import LoveQuestion from "../components/LoveQuestion";
import LoveLetter from "../components/LoveLetter";

const message = "In all the world there is no heart for me like yours";
const words = message.split(" ");

export default function ValentineDay() {
  const [revealed, setRevealed] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const hasAnswered = useRef(false);

  // Cleanup confetti on unmount
  useEffect(() => {
    return () => confetti.reset();
  }, []);

  const fireConfetti = useCallback(() => {
    if (!revealed) setRevealed(true);

    const defaults = {
      colors: ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fff1f2"],
      scalar: 1.2,
      zIndex: 100,
    };

    confetti({
      ...defaults,
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.65 },
      });
      confetti({
        ...defaults,
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.65 },
      });
    }, 250);

    setTimeout(() => {
      confetti({
        ...defaults,
        particleCount: 30,
        spread: 150,
        origin: { y: 0.5 },
        startVelocity: 25,
      });
    }, 600);
  }, [revealed]);

  const handleQuestionAnswer = useCallback((choice) => {
    hasAnswered.current = true;
    if (choice === "yes") {
      setSaidYes(true);
    } else {
      setSaidYes(false);
      setShowLetter(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center py-6">
      <AnimatePresence mode="wait">
        {!showLetter ? (
          /* ====== MAIN VIEW ====== */
          <motion.div
            key="main-view"
            className="flex flex-col items-center w-full"
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {/* Pulsing heart button */}
            <motion.button
              onClick={fireConfetti}
              className="relative mb-10 p-7 rounded-full bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/40 outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: [1, 1.12, 1],
                boxShadow: [
                  "0 0 20px rgba(225,29,72,0.3)",
                  "0 0 45px rgba(225,29,72,0.6)",
                  "0 0 20px rgba(225,29,72,0.3)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-12 h-12" fill="white" strokeWidth={0} />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-400/50"
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.button>

            {/* Instruction text */}
            {!revealed && (
              <motion.p
                className="text-white/40 text-sm mb-6"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Tap the heart
              </motion.p>
            )}

            {revealed && (
              <motion.p
                className="text-white/30 text-xs mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 4 }}
              >
                Tap again for more magic ✨
              </motion.p>
            )}

            {/* Staggered text reveal */}
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 px-4 min-h-[48px]">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="font-heading text-3xl md:text-4xl text-white"
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={
                    revealed
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 30, filter: "blur(10px)" }
                  }
                  transition={{
                    duration: 0.6,
                    delay: revealed ? 0.8 + i * 0.18 : 0,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.div
              className="text-center mt-8 px-4"
              initial={{ opacity: 0 }}
              animate={revealed ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 3, duration: 1.2 }}
            >
              <p className="font-heading text-xl md:text-2xl text-rose-300 leading-relaxed">
                You are my today, my tomorrow,
              </p>
              <p className="font-heading text-xl md:text-2xl text-rose-300 leading-relaxed mt-1">
                and every single day after that &mdash; forever yours
              </p>
            </motion.div>

            {/* Love question — only after heart tapped */}
            {revealed && (
              <LoveQuestion
                dayName="Valentine's Day"
                question="Will you be my Valentine — not just today, but every day for the rest of our lives? ❤️"
                yesText="Yes, forever yours ❤️"
                noText="Ask me again"
                yesReaction="You just turned my whole universe into a love story — and the best part? It never ends 💖✨🎉"
                noReaction="I'll ask you every single day until every star in the sky has heard your name 🌌❤️"
                accentColor="red"
                delay={3.5}
                onAnswer={handleQuestionAnswer}
              />
            )}

            {/* "Read Your Letter" button — ONLY after explicitly saying Yes */}
            {revealed && saidYes && hasAnswered.current && (
              <motion.button
                onClick={() => setShowLetter(true)}
                className="mt-8 flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold shadow-lg shadow-rose-500/40 outline-none relative"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 15, delay: 1.5 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                <span className="font-heading text-xl">Read Your Letter</span>
                <span className="ml-1">💌</span>
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-rose-300/40"
                  animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                />
              </motion.button>
            )}
          </motion.div>
        ) : (
          /* ====== LETTER VIEW ====== */
          <motion.div
            key="letter-view"
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back button */}
            <motion.button
              onClick={() => setShowLetter(false)}
              className="self-start flex items-center gap-1.5 mb-4 px-3 py-1.5 rounded-full text-white/40 hover:text-white/70 text-xs transition-colors outline-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ x: -3 }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>back</span>
            </motion.button>

            {/* The love letter */}
            <LoveLetter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
