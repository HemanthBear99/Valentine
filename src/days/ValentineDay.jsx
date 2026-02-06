import { motion } from "motion/react";
import { useState, useCallback, useEffect } from "react";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";
import LoveQuestion from "../components/LoveQuestion";

const message = "In all the world there is no heart for me like yours";
const words = message.split(" ");

export default function ValentineDay() {
  const [revealed, setRevealed] = useState(false);

  // Cleanup confetti on unmount
  useEffect(() => {
    return () => confetti.reset();
  }, []);

  const fireConfetti = useCallback(() => {
    // Reveal text on first click only
    if (!revealed) setRevealed(true);

    const defaults = {
      colors: ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fff1f2"],
      scalar: 1.2,
      zIndex: 100,
    };

    // Center burst
    confetti({
      ...defaults,
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
    });

    // Side bursts with delay
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

    // Second wave
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

  return (
    <div className="flex flex-col items-center py-6">
      {/* Pulsing heart button — always active */}
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

        {/* Ring glow — always pulses */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-red-400/50"
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.button>

      {/* Instruction text before first click */}
      {!revealed && (
        <motion.p
          className="text-white/40 text-sm mb-6"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap the heart
        </motion.p>
      )}

      {/* Tap again hint after first click */}
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

      {/* Subtitle after reveal */}
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
        />
      )}
    </div>
  );
}
