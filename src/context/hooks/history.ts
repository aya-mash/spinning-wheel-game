import { useContext } from "react";
import { SpinHistoryContext } from "../SpinHistoryContext";

export const useSpinHistory = () => useContext(SpinHistoryContext);
