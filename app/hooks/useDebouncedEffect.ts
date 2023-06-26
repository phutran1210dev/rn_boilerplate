import {useEffect, useCallback, useRef} from 'react';

export const useDebouncedEffect = (
  effect: () => void,
  deps: any,
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
