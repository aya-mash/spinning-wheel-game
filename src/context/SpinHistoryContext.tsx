import { createContext } from "react";
import { SpinResult } from "../types/wheel";

interface SpinHistoryContextType {
  history: SpinResult[];
  addSpin: (spin: SpinResult) => void;
  clearHistory: () => void;
}

export const SpinHistoryContext = createContext<SpinHistoryContextType>({
  history: [],
  addSpin: () => {},
  clearHistory: () => {},
});
