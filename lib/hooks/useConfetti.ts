import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * Hook personnalisé pour gérer les effets de confettis
 * @returns Un objet avec une fonction pour déclencher les confettis
 */
function useConfetti() {
  const confettiRef = useRef<confetti.CreateTypes | null>(null);

  useEffect(() => {
    // Initialiser confetti une seule fois
    if (typeof window !== 'undefined' && !confettiRef.current) {
      const confettiCanvas = document.createElement('canvas');
      confettiCanvas.style.position = 'fixed';
      confettiCanvas.style.top = '0';
      confettiCanvas.style.left = '0';
      confettiCanvas.style.width = '100%';
      confettiCanvas.style.height = '100%';
      confettiCanvas.style.pointerEvents = 'none';
      confettiCanvas.style.zIndex = '9999';
      document.body.appendChild(confettiCanvas);

      confettiRef.current = confetti.create(confettiCanvas, {
        resize: true,
        useWorker: true,
      });
    }

    // Nettoyage
    return () => {
      if (confettiRef.current) {
        const canvas = document.querySelector('canvas[aria-label="confetti"]');
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }
    };
  }, []);

  /**
   * Fonction pour déclencher les confettis
   * @param options Options de configuration des confettis
   */
  const triggerConfetti = (options: confetti.Options = {}) => {
    if (confettiRef.current) {
      confettiRef.current({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        ...options,
      });
    }
  };

  return { triggerConfetti };
};

export { useConfetti };
export default useConfetti;
