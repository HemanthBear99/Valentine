import { motion } from "motion/react";
import { useState } from "react";
import LoveQuestion from "../components/LoveQuestion";

export default function ProposeDay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center py-6">
      {!isOpen && (
        <motion.p
          className="text-white/50 text-sm mb-6"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap the box to open
        </motion.p>
      )}

      <div
        className="relative cursor-pointer"
        style={{ perspective: "800px" }}
        onClick={() => setIsOpen(true)}
      >
        {/* Ring — positioned OUTSIDE the box so it won't be clipped */}
        <motion.div
          className="absolute left-1/2 z-20"
          style={{ x: "-50%", bottom: "20px" }}
          initial={{ scale: 0, y: 0, opacity: 0 }}
          animate={
            isOpen
              ? { scale: 1, y: -80, opacity: 1 }
              : { scale: 0, y: 0, opacity: 0 }
          }
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 12,
            delay: isOpen ? 0.5 : 0,
          }}
        >
          <div className="relative">
            {/* Glow behind ring */}
            <motion.div
              className="absolute -inset-6 rounded-full bg-yellow-300/25 blur-xl"
              initial={{ opacity: 0 }}
              animate={
                isOpen
                  ? { opacity: [0, 0.7, 0.4], scale: [0.5, 1.3, 1] }
                  : { opacity: 0 }
              }
              transition={{ duration: 1.5, delay: 0.6 }}
            />

            {/* Ring band */}
            <div className="w-14 h-14 rounded-full border-[5px] border-yellow-400 shadow-lg shadow-yellow-400/50" />

            {/* Diamond */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="w-6 h-6 bg-white rotate-45 rounded-sm shadow-lg shadow-white/60" />
              <div className="absolute inset-0.5 bg-gradient-to-br from-white via-blue-100 to-white rotate-45 rounded-sm" />
            </div>

            {/* Shine sweep */}
            <motion.div
              className="absolute -inset-3 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={isOpen ? { x: ["-100%", "100%"] } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: 1.2,
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Box container */}
        <div className="relative" style={{ transformStyle: "preserve-3d" }}>
          {/* Box lid */}
          <motion.div
            className="w-40 h-16 rounded-t-xl border border-rose-600/50 origin-bottom relative z-10"
            style={{
              background: "linear-gradient(to bottom, #be123c, #9f1239)",
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateX: 0 }}
            animate={isOpen ? { rotateX: -130 } : { rotateX: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
          >
            {/* Lid clasp */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-3 rounded-b-md bg-yellow-500/80" />
          </motion.div>

          {/* Box base */}
          <div
            className="w-40 h-24 rounded-b-xl border border-rose-700/50 relative"
            style={{ background: "linear-gradient(to bottom, #881337, #4c0519)" }}
          >
            {/* Velvet interior */}
            <div className="absolute inset-1.5 rounded-lg bg-rose-950/80" />
            {/* Cushion ridge */}
            <div className="absolute bottom-3 left-3 right-3 h-6 rounded-full bg-rose-900/60" />
            {/* Slit for ring */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-8 rounded-full bg-rose-900/40" />
          </div>
        </div>
      </div>

      {/* Proposal text */}
      <motion.div
        className="text-center mt-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="font-heading text-2xl md:text-3xl text-amber-200 leading-relaxed">
          I don&rsquo;t need the whole world to notice me &mdash;
        </p>
        <p className="font-heading text-2xl md:text-3xl text-amber-200 leading-relaxed mt-1">
          I just need you to say yes
        </p>
      </motion.div>

      {isOpen && (
        <LoveQuestion
          dayName="Propose Day"
          question="So tell me… will you be mine forever? 💍"
          yesText="Yes, I'm yours 💍"
          noText="Let me think"
          yesReaction="You said yes! My heart is dancing and it only knows your name 💃❤️"
          noReaction="Take all the time you need — I'll be right here, loving you quietly 💕"
          accentColor="amber"
          delay={2}
        />
      )}
    </div>
  );
}
