import { motion } from "motion/react";
import LoveQuestion from "../components/LoveQuestion";

export default function RoseDay() {
  return (
    <div className="flex flex-col items-center py-4">
      <motion.div
        animate={{ rotate: [0, 3, -3, 2, -2, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 200 320" className="w-48 h-72">
          {/* Stem */}
          <motion.path
            d="M100 290 C100 260 98 230 100 180"
            stroke="#22c55e"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Left leaf */}
          <motion.path
            d="M100 240 Q75 225 65 235 Q72 248 100 240"
            stroke="#22c55e"
            strokeWidth="2"
            fill="#22c55e"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 0.8 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeInOut" }}
          />

          {/* Right leaf */}
          <motion.path
            d="M100 220 Q125 205 135 215 Q128 228 100 220"
            stroke="#22c55e"
            strokeWidth="2"
            fill="#22c55e"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 0.8 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeInOut" }}
          />

          {/* Outer petal left */}
          <motion.path
            d="M100 170 Q70 145 60 120 Q55 95 75 80 Q90 90 100 115"
            stroke="#e11d48"
            strokeWidth="2"
            fill="#e11d48"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 0.85 }}
            transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
          />

          {/* Outer petal right */}
          <motion.path
            d="M100 170 Q130 145 140 120 Q145 95 125 80 Q110 90 100 115"
            stroke="#e11d48"
            strokeWidth="2"
            fill="#e11d48"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 0.85 }}
            transition={{ duration: 1.2, delay: 1.8, ease: "easeOut" }}
          />

          {/* Outer petal top */}
          <motion.path
            d="M100 115 Q85 80 75 65 Q80 45 100 50 Q120 45 125 65 Q115 80 100 115"
            stroke="#be123c"
            strokeWidth="2"
            fill="#be123c"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 0.9 }}
            transition={{ duration: 1.2, delay: 2.0, ease: "easeOut" }}
          />

          {/* Inner petal */}
          <motion.path
            d="M100 130 Q88 105 85 90 Q90 78 100 82 Q110 78 115 90 Q112 105 100 130"
            stroke="#f43f5e"
            strokeWidth="1.5"
            fill="#f43f5e"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{ pathLength: 1, fillOpacity: 1 }}
            transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
          />

          {/* Center bud */}
          <motion.circle
            cx="100"
            cy="95"
            r="8"
            fill="#9f1239"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.0 }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="text-center mt-6 px-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.8 }}
      >
        <p className="font-heading text-xl md:text-2xl text-rose-300 leading-relaxed">
          Every petal I drew was a heartbeat,
        </p>
        <p className="font-heading text-xl md:text-2xl text-rose-300 leading-relaxed mt-1">
          every colour a shade of how deeply I adore you
        </p>
      </motion.div>

      <LoveQuestion
        dayName="Rose Day"
        question="Will you accept my rose, my love? 🌹"
        yesText="Yes, I will ❤️"
        noText="Not yet"
        yesReaction="This rose will never wilt — just like my love for you 🌹❤️"
        noReaction="I'll leave it at your door, petal by petal, until you say yes 💐"
        accentColor="rose"
        delay={3.8}
      />
    </div>
  );
}
