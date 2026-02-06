import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AnswersProvider } from "./hooks/useAnswersStore";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AnswersProvider>
      <App />
    </AnswersProvider>
  </StrictMode>
);
