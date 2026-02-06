import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import LoveQuestion from "../components/LoveQuestion";

const chocolates = [
  { id: 0, shape: "rounded-full", color: "bg-amber-900", inner: "bg-amber-700" },
  { id: 1, shape: "rounded-lg", color: "bg-yellow-900", inner: "bg-yellow-700" },
  { id: 2, shape: "rounded-full", color: "bg-amber-800", inner: "bg-orange-700" },
  { id: 3, shape: "rounded-lg", color: "bg-yellow-800", inner: "bg-amber-600" },
  { id: 4, shape: "rounded-full", color: "bg-orange-900", inner: "bg-orange-700" },
  { id: 5, shape: "rounded-lg", color: "bg-amber-950", inner: "bg-amber-800" },
  { id: 6, shape: "rounded-full", color: "bg-yellow-900", inner: "bg-yellow-700" },
  { id: 7, shape: "rounded-lg", color: "bg-amber-800", inner: "bg-amber-600" },
  { id: 8, shape: "rounded-full", color: "bg-orange-800", inner: "bg-orange-600" },
];

export default function ChocolateDay() {
  const [unwrapped, setUnwrapped] = useState(new Set());

  const handleUnwrap = (id) => {
    setUnwrapped((prev) => new Set(prev).add(id));
  };

  const allUnwrapped = unwrapped.size === chocolates.length;

  return (
    <div className="flex flex-col items-center py-4">
      {allUnwrapped ? (
        <p className="font-heading text-xl md:text-2xl text-amber-300 leading-relaxed mb-4 px-4 text-center">
          All the sweetness in the world couldn&rsquo;t compare to the way you melt my heart
        </p>
      ) : (
        <p className="text-white/50 text-sm mb-4">Tap each wrapper to unwrap</p>
      )}

      <div className="grid grid-cols-3 gap-3 max-w-[252px] mx-auto">
        {chocolates.map((choc) => (
          <div
            key={choc.id}
            className="relative w-20 h-20 cursor-pointer"
            onClick={() => handleUnwrap(choc.id)}
          >
            {/* Chocolate underneath */}
            <motion.div
              className={`absolute inset-2 ${choc.shape} ${choc.color} shadow-inner flex items-center justify-center`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={
                unwrapped.has(choc.id)
                  ? { scale: 1, opacity: 1 }
                  : { scale: 0.8, opacity: 0.5 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Chocolate swirl pattern */}
              <div className={`w-4 h-4 ${choc.shape} ${choc.inner} opacity-60`} />
            </motion.div>

            {/* Wrapper (splits on tap) */}
            <AnimatePresence>
              {!unwrapped.has(choc.id) && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, #d97706, #b45309)",
                      clipPath: "polygon(0 0, 100% 0, 0 100%)",
                    }}
                    exit={{ x: -30, y: -30, opacity: 0, rotate: -15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "linear-gradient(315deg, #f59e0b, #d97706)",
                      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    }}
                    exit={{ x: 30, y: 30, opacity: 0, rotate: 15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                  {/* Foil shine */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/20 via-transparent to-white/10 pointer-events-none"
                    exit={{ opacity: 0 }}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {allUnwrapped && (
        <LoveQuestion
          dayName="Chocolate Day"
          question="Will you share every sweet moment of life with me? 🍫"
          yesText="Every single one 🍫"
          noText="Hmm, maybe"
          yesReaction="With you, even the bitter days taste like chocolate 🍫❤️"
          noReaction="I'll keep a piece saved just for you — always 💝"
          accentColor="amber"
          delay={0.5}
        />
      )}
    </div>
  );
}
