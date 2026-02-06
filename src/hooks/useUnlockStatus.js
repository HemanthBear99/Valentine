import { useMemo } from "react";
import { DEBUG_MODE } from "../data/valentineDays";

export function useUnlockStatus(dateString) {
  return useMemo(() => {
    if (DEBUG_MODE) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayDate = new Date(dateString + "T00:00:00");
    return today >= dayDate;
  }, [dateString]);
}
