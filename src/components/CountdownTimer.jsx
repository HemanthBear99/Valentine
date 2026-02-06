import { useState, useEffect } from "react";
import { motion } from "motion/react";

function getTimeLeft(targetDate) {
  const now = new Date();
  const target = new Date(targetDate + "T00:00:00");
  const diff = target - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

const romanticMessages = [
  "Love is worth the wait",
  "Good things take time",
  "A little patience, my love",
  "The best is yet to come",
  "Almost there, darling",
  "Counting moments for you",
];

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      const left = getTimeLeft(targetDate);
      if (!left) {
        clearInterval(interval);
      }
      setTimeLeft(left);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft) return null;

  const msgIndex = targetDate.charCodeAt(targetDate.length - 1) % romanticMessages.length;

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Compact timer */}
      <div className="flex items-center justify-center gap-0.5 text-rose-300/80 font-mono">
        {timeLeft.days > 0 && (
          <span className="text-[11px] font-bold">{timeLeft.days}d </span>
        )}
        <span className="text-[11px] font-bold">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-rose-400/50 text-[10px]">:</span>
        <span className="text-[11px] font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-rose-400/50 text-[10px]">:</span>
        <motion.span
          className="text-[11px] font-bold"
          key={timeLeft.seconds}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(timeLeft.seconds).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Romantic message */}
      <p className="text-[8px] text-white/25 mt-1 font-heading italic leading-tight">
        {romanticMessages[msgIndex]}
      </p>
    </motion.div>
  );
}
