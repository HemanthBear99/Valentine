import { motion, AnimatePresence } from "motion/react";

export default function Toast({ message, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 left-1/2 z-[35] px-6 py-3 rounded-full backdrop-blur-md bg-white/15 border border-white/20 text-white text-sm font-medium shadow-lg"
          style={{ x: "-50%" }}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
