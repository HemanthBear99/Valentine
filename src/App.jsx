import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download } from "lucide-react";
import { valentineDays } from "./data/valentineDays";
import DayCard from "./components/DayCard";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import FloatingHearts from "./components/FloatingHearts";
import { useAnswersStore } from "./hooks/useAnswersStore";

const dayComponents = {
  RoseDay: lazy(() => import("./days/RoseDay")),
  ProposeDay: lazy(() => import("./days/ProposeDay")),
  ChocolateDay: lazy(() => import("./days/ChocolateDay")),
  TeddyDay: lazy(() => import("./days/TeddyDay")),
  PromiseDay: lazy(() => import("./days/PromiseDay")),
  HugDay: lazy(() => import("./days/HugDay")),
  KissDay: lazy(() => import("./days/KissDay")),
  ValentineDay: lazy(() => import("./days/ValentineDay")),
};

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [shakingCardId, setShakingCardId] = useState(null);
  const { downloadAnswers, answerCount } = useAnswersStore();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    if (!shakingCardId) return;
    const timer = setTimeout(() => setShakingCardId(null), 600);
    return () => clearTimeout(timer);
  }, [shakingCardId]);

  const handleSelect = useCallback((day) => {
    setSelectedDay(day);
  }, []);

  const handleLocked = useCallback((day) => {
    setShakingCardId(day.id);
    setToastMessage("Patience, my love! 🤫");
  }, []);

  const handleClose = useCallback(() => {
    setSelectedDay(null);
  }, []);

  const DayComponent = selectedDay
    ? dayComponents[selectedDay.component]
    : null;

  return (
    <div className="min-h-dvh bg-gradient-to-br from-rose-950 via-slate-900 to-black relative">
      <FloatingHearts />

      <div className="relative z-10 max-w-2xl mx-auto px-3 sm:px-4 py-6 md:py-12">
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-2">
            Valentine's Week
          </h1>
          <p className="text-white/50 text-sm">
            A surprise for every day
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {valentineDays.map((day) => (
            <DayCard
              key={day.id}
              day={day}
              onSelect={handleSelect}
              onLocked={handleLocked}
              isShaking={shakingCardId === day.id}
            />
          ))}
        </div>

        {/* Save Our Story download button — appears after at least 1 answer */}
        <AnimatePresence>
          {answerCount > 0 && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={downloadAnswers}
                className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 transition-colors shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download className="w-4 h-4" />
                <span className="font-heading text-lg">Save Our Story</span>
                <span className="text-white/40 text-xs ml-1">({answerCount})</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {selectedDay && (
          <Modal key={selectedDay.id} day={selectedDay} onClose={handleClose}>
            <Suspense fallback={<LoadingSpinner />}>
              {DayComponent && <DayComponent />}
            </Suspense>
          </Modal>
        )}
      </AnimatePresence>

      <Toast message={toastMessage} isVisible={!!toastMessage} />
    </div>
  );
}
