/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useAudioContext = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  useEffect(() => {
    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    setAudioContext(context);

    return () => {
      if (context) {
        context.close();
      }
    };
  }, []);

  const enableAudio = async () => {
    if (audioContext) {
      try {
        await audioContext.resume();
        setIsAudioEnabled(true);
      } catch (error) {
        console.error("Failed to enable audio:", error);
        setIsAudioEnabled(false);
      }
    }
  };

  return { audioContext, isAudioEnabled, enableAudio };
};
