import { createContext, useContext, useCallback, useRef, useState } from "react";

const AnswersContext = createContext(null);

export function AnswersProvider({ children }) {
  const answersRef = useRef({});
  const [answerCount, setAnswerCount] = useState(0);

  const saveAnswer = useCallback((dayName, question, answer) => {
    answersRef.current[dayName] = { question, answer, timestamp: new Date().toLocaleString() };
    setAnswerCount((c) => c + 1);
  }, []);

  const getAnswers = useCallback(() => answersRef.current, []);

  const downloadAnswers = useCallback(() => {
    const answers = answersRef.current;
    const dayOrder = [
      "Rose Day", "Propose Day", "Chocolate Day", "Teddy Day",
      "Promise Day", "Hug Day", "Kiss Day", "Valentine's Day",
    ];

    let text = "";
    text += "╔════════════════════════════════════════════╗\n";
    text += "║     💌 Valentine's Week — Our Story 💌     ║\n";
    text += "╚════════════════════════════════════════════╝\n\n";

    let hasAnswers = false;

    dayOrder.forEach((day) => {
      if (answers[day]) {
        hasAnswers = true;
        const entry = answers[day];
        const emoji = entry.answer === "yes" ? "💕" : "💭";
        text += `┌─── ${day} ───\n`;
        text += `│ ${entry.question}\n`;
        text += `│ ${emoji} Answer: ${entry.answer === "yes" ? "Yes!" : "Maybe later..."}\n`;
        text += `│ 🕐 ${entry.timestamp}\n`;
        text += `└──────────────\n\n`;
      }
    });

    if (!hasAnswers) {
      text += "No answers yet — go open some days and answer the questions! 💝\n";
    }

    text += "─────────────────────────────────────────────\n";
    text += "Made with love 💖 Valentine's Week App\n";

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "valentines-answers.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <AnswersContext.Provider value={{ saveAnswer, getAnswers, downloadAnswers, answerCount }}>
      {children}
    </AnswersContext.Provider>
  );
}

export function useAnswersStore() {
  const ctx = useContext(AnswersContext);
  if (!ctx) throw new Error("useAnswersStore must be used within AnswersProvider");
  return ctx;
}
