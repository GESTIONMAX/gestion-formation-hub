import { useState, useCallback } from "react";
import confetti from "canvas-confetti";

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
}

export const useConfetti = () => {
  const [isActive, setIsActive] = useState(false);

  const fireConfetti = useCallback((options: ConfettiOptions = {}) => {
    setIsActive(true);

    const defaults = {
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1E88E5', '#43A047', '#E53935', '#FDD835', '#8E24AA'],
    };

    const mergedOptions = { ...defaults, ...options };

    confetti({
      ...mergedOptions,
      disableForReducedMotion: true,
    });

    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  }, []);

  return {
    isActive,
    fireConfetti,
  };
};
