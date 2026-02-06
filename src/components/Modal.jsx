import { motion } from "motion/react";
import { X } from "lucide-react";

export default function Modal({ day, onClose, children }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          layoutId={`card-${day.id}`}
          className={`relative w-full max-w-lg max-h-[85vh] rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl ${day.glowColor} flex flex-col overflow-hidden`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close button — sticky on top */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable inner content */}
          <div className="overflow-y-auto flex-1 p-6 md:p-8 modal-scroll">
            <div className="text-center mb-6">
              <div className="text-5xl mb-2">{day.emoji}</div>
              <h2 className="font-heading text-3xl text-white font-bold">
                {day.name}
              </h2>
              <p className="text-white/70 mt-3 italic text-base md:text-lg leading-relaxed font-heading max-w-sm mx-auto">
                &ldquo;{day.tagline}&rdquo;
              </p>
            </div>

            {children}
          </div>
        </motion.div>
      </div>
    </>
  );
}
