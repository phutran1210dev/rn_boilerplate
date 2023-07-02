import {useEffect, useCallback, useRef} from 'react';

/**
 * Custom hook to debounce the execution of an effect.
 * @param {Function} effect - The effect function to be debounced.
 * @param {Array} deps - The dependency array for the effect.
 * @param {number} delay - The delay in milliseconds before executing the effect.
 */
export const useDebouncedEffect = (
  effect: () => void,
  deps: any[],
  delay: number,
) => {
  const handlerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedEffect = useCallback(() => {
    clearTimeout(handlerRef.current);
    handlerRef.current = setTimeout(effect, delay);
  }, [effect, delay]);

  useEffect(() => {
    debouncedEffect();
    return () => clearTimeout(handlerRef.current!);
  }, [debouncedEffect, ...deps]);
};
