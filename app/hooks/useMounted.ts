import {useEffect, useCallback, useRef} from 'react';

/**
 * Custom hook to check if a component is mounted.
 * @returns {Function} A function that returns a boolean indicating if the component is mounted.
 */
export function useIsMounted(): () => boolean {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  /**
   * Returns a function that can be used to check if the component is mounted.
   * @returns {boolean} A boolean indicating if the component is mounted.
   */
  return useCallback(() => isMounted.current, []);
}
