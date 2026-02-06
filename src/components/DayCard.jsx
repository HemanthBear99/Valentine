import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { useUnlockStatus } from "../hooks/useUnlockStatus";
import CountdownTimer from "./CountdownTimer";

export default function DayCard({ day, onSelect, onLocked, isShaking }) {
  const isUnlocked = useUnlockStatus(day.date);

  const handleClick = () => {
    if (isUnlocked) {
      onSelect(day);
    } else {
      onLocked(day);
    }
  };

  const formattedDate = new Date(day.date + "T00:00:00").toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" }
  );

  return (
    <motion.div
      layoutId={`card-${day.id}`}
      onClick={handleClick}
      className={`relative cursor-pointer rounded-2xl p-4 sm:p-5 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg ${day.glowColor} ${!isUnlocked ? "opacity-70 grayscale" : ""}`}
      whileHover={isUnlocked ? { scale: 1.05, y: -4 } : {}}
      whileTap={isUnlocked ? { scale: 0.97 } : {}}
      animate={
        isShaking
          ? {
              x: [0, -8, 8, -6, 6, -3, 3, 0],
              transition: { duration: 0.5 },
            }
          : { x: 0 }
      }
    >
      <div className="text-5xl sm:text-4xl mb-2">{day.emoji}</div>
      <h3 className="font-heading text-lg sm:text-xl text-white font-bold leading-tight">{day.name}</h3>
      <p className="text-xs text-white/60 mt-1">{formattedDate}</p>

      {/* Lock overlay — opaque enough to fully hide card content */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/80 backdrop-blur-sm">
          <Lock className="w-5 h-5 text-white/40 mb-2" />
          <p className="font-heading text-sm text-white/60 mb-1">{day.name}</p>
          <p className="text-[10px] text-white/30 mb-3">{formattedDate}</p>
          <CountdownTimer targetDate={day.date} />
        </div>
      )}
    </motion.div>
  );
}
