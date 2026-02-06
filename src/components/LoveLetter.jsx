import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const letterLines = [
  "My Dearest Shakeela,",
  "",
  "From the moment you walked into my life,",
  "every day became Valentine's Day.",
  "",
  "Your smile is my sunrise,",
  "your laugh is my favorite song,",
  "and your love is the only home",
  "I ever want to come back to.",
  "",
  "I don't need the world to be perfect —",
  "I just need you beside me.",
  "",
  "Forever & Always yours,",
  "With all my love 💕",
];

export default function LoveLetter() {
  const [stage, setStage] = useState("sealed"); // sealed → opening → revealed
  const [showLines, setShowLines] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStage("opening"), 800);
    const t2 = setTimeout(() => setStage("revealed"), 2200);
    const t3 = setTimeout(() => setShowLines(true), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Confetti when letter fully appears
  useEffect(() => {
    if (!showLines) return;
    const timer = setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.4 },
        colors: ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3"],
        scalar: 0.9,
        zIndex: 100,
      });
    }, 2500);
    return () => clearTimeout(timer);
  }, [showLines]);

  const isOpen = stage === "opening" || stage === "revealed";

  return (
    <motion.div
      className="flex flex-col items-center mt-8 w-full"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      {/* ======= LETTER (sits above the envelope) ======= */}
      <motion.div
        className="relative w-full max-w-[280px] rounded-md shadow-2xl z-20"
        style={{
          background: "linear-gradient(to bottom, #fefcf3 0%, #faf5eb 50%, #f5ece0 100%)",
        }}
        initial={{ y: 80, opacity: 0, scale: 0.9 }}
        animate={
          stage === "revealed" || showLines
            ? { y: 0, opacity: 1, scale: 1 }
            : { y: 80, opacity: 0, scale: 0.9 }
        }
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 16,
        }}
      >
        {/* Paper ruled lines */}
        <div className="absolute inset-0 overflow-hidden rounded-md opacity-15 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="border-b border-blue-300/50"
              style={{ height: "26px" }}
            />
          ))}
        </div>

        {/* Red margin line */}
        <div className="absolute top-0 bottom-0 left-9 w-px bg-rose-300/25" />

        {/* Letter text */}
        <div className="relative p-5 pl-12 pr-5 min-h-[320px]">
          <AnimatePresence>
            {showLines &&
              letterLines.map((line, i) => (
                <motion.p
                  key={i}
                  className={`font-heading leading-relaxed ${
                    i === 0
                      ? "text-[17px] text-rose-900 font-bold mb-1"
                      : line === ""
                      ? "h-3"
                      : i >= letterLines.length - 2
                      ? "text-[15px] text-rose-800 italic"
                      : "text-[15px] text-stone-700"
                  }`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.22,
                    ease: "easeOut",
                  }}
                >
                  {line}
                </motion.p>
              ))}
          </AnimatePresence>
        </div>

        {/* Paper edge shadow at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#efe4d4]/50 to-transparent rounded-b-md" />
      </motion.div>

      {/* ======= ENVELOPE (sits below the letter) ======= */}
      <div className="relative w-full max-w-[290px] h-[140px] z-10 -mt-6">
        {/* Envelope flap — opens upward and goes behind letter */}
        <motion.div
          className="absolute -top-[1px] left-0 right-0 z-0"
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 12 }}
        >
          {/* Flap triangle */}
          <div
            className="mx-auto"
            style={{
              width: 0,
              height: 0,
              borderLeft: "145px solid transparent",
              borderRight: "145px solid transparent",
              borderTop: "80px solid #c9986e",
              filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.1))",
            }}
          />

          {/* Wax seal */}
          <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-md"
            style={{
              background: "radial-gradient(circle at 35% 35%, #ef4444, #b91c1c, #7f1d1d)",
            }}
            animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm">❤️</span>
          </motion.div>
        </motion.div>

        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-lg shadow-lg overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #d4a574 0%, #c4956a 50%, #b8845c 100%)",
          }}
        >
          {/* Inner pocket */}
          <div
            className="absolute inset-x-2 bottom-2 top-6 rounded-b-md"
            style={{
              background: "linear-gradient(to bottom, #e8d5c0 0%, #f5ece3 100%)",
            }}
          />

          {/* Side flap shadows */}
          <div
            className="absolute top-0 left-0"
            style={{
              width: 0,
              height: 0,
              borderLeft: "35px solid rgba(180,130,90,0.4)",
              borderTop: "70px solid transparent",
              borderBottom: "70px solid transparent",
            }}
          />
          <div
            className="absolute top-0 right-0"
            style={{
              width: 0,
              height: 0,
              borderRight: "35px solid rgba(180,130,90,0.4)",
              borderTop: "70px solid transparent",
              borderBottom: "70px solid transparent",
            }}
          />
        </div>

        {/* Bottom flap */}
        <div
          className="absolute -bottom-[1px] left-0 right-0 z-[5]"
          style={{
            width: 0,
            height: 0,
            borderLeft: "145px solid transparent",
            borderRight: "145px solid transparent",
            borderBottom: "65px solid #be8a5e",
            margin: "0 auto",
            filter: "drop-shadow(0 -1px 2px rgba(0,0,0,0.08))",
          }}
        />
      </div>

      {/* Floating sparkles — on top of everything */}
      {showLines && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={`sparkle-${i}`}
              className="absolute text-base"
              style={{
                left: `${8 + i * 11}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0.3, 1.3, 1, 0.3],
                y: [0, -20, -40, -65],
                x: [0, (i % 2 === 0 ? 10 : -10), (i % 2 === 0 ? -5 : 5), 0],
              }}
              transition={{
                duration: 3,
                delay: 2.5 + i * 0.6,
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            >
              {["✨", "💕", "💖", "🌹", "✨", "💗", "💘", "🥰"][i]}
            </motion.span>
          ))}
        </div>
      )}

      {/* Sealed with a kiss */}
      <AnimatePresence>
        {showLines && (
          <motion.p
            className="text-white/30 text-xs mt-6 font-heading italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: letterLines.length * 0.22 + 1 }}
          >
            sealed with a kiss 💋
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
