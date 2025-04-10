import { ReactNode, useEffect, useMemo, useState } from "react";
import { SpinHistoryContext } from "../SpinHistoryContext";
import { SpinResult } from "../../types/wheel";

export const SpinHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<SpinResult[]>(() => {
    const savedHistory = localStorage.getItem("wheelHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const addSpin = (spin: SpinResult) => {
    setHistory((prev) => [spin, ...prev].slice(0, 10));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    localStorage.setItem("wheelHistory", JSON.stringify(history));
  }, [history]);

  const contextValue = useMemo(
    () => ({ history, addSpin, clearHistory }),
    [history]
  );

  return (
    <SpinHistoryContext.Provider value={contextValue}>
      {children}
    </SpinHistoryContext.Provider>
  );
};
