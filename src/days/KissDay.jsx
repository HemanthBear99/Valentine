import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback } from "react";
import LoveQuestion from "../components/LoveQuestion";

export default function KissDay() {
  const [marks, setMarks] = useState([]);

  const handleClick = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotation = Math.random() * 40 - 20;
    const id = Date.now() + Math.random();
    const size = 24 + Math.random() * 16;

    setMarks((prev) => [...prev.slice(-49), { id, x, y, rotation, size }]);
  }, []);

  return (
    <div className="flex flex-col items-center py-4">
      {marks.length >= 5 ? (
        <p className="font-heading text-lg md:text-xl text-rose-300 leading-relaxed mb-3 px-4 text-center">
          Every kiss is a whispered poem only your heart can hear
        </p>
      ) : (
        <p className="text-white/50 text-sm mb-3">
          {marks.length === 0
            ? "Tap anywhere to leave a kiss"
            : `${marks.length} kiss${marks.length !== 1 ? "es" : ""} — keep going`}
        </p>
      )}

      <div
        className="relative w-full h-64 rounded-xl bg-white/5 border border-white/10 cursor-pointer overflow-hidden select-none"
        onClick={handleClick}
      >
        {/* Subtle hint when empty */}
        {marks.length === 0 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-white/10 text-6xl pointer-events-none"
            animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {"💋"}
          </motion.div>
        )}

        <AnimatePresence>
          {marks.map((mark) => (
            <motion.div
              key={mark.id}
              className="absolute pointer-events-none select-none"
              style={{
                left: mark.x,
                top: mark.y,
                fontSize: mark.size,
                rotate: `${mark.rotation}deg`,
                translateX: "-50%",
                translateY: "-50%",
              }}
              initial={{ scale: 2.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
              }}
            >
              {"💋"}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {marks.length >= 3 && (
        <LoveQuestion
          dayName="Kiss Day"
          question="Can I steal one more kiss — just one that lasts forever? 💋"
          yesText="Take all of them 💋"
          noText="You're greedy"
          yesReaction="Every kiss with you feels like the first one — my heart never gets used to it 💋✨"
          noReaction="Fine… but I'm stealing one when you're not looking 😏💋"
          accentColor="rose"
          delay={0.3}
        />
      )}
    </div>
  );
}
