import { useEffect, useRef, useMemo } from "react";
import debounce from "lodash.debounce";

type AnyFn = (...args: unknown[]) => unknown;
type DebouncedFn<T extends AnyFn> = ((...args: Parameters<T>) => void) & {
  cancel: () => void;
  flush?: () => void;
};

export function useDebounce<T extends AnyFn>(fn: T, delay = 300): DebouncedFn<T> {
  const fnRef = useRef<T>(fn);
  const debouncedRef = useRef<DebouncedFn<T> | null>(null);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    debouncedRef.current = debounce((...args: Parameters<T>) => {
      fnRef.current(...args);
    }, delay) as unknown as DebouncedFn<T>;

    return () => {
      debouncedRef.current?.cancel();
      debouncedRef.current = null;
    };
  }, [delay]);

  // Create wrapped function once using useMemo with empty dependency array
  const wrapped = useMemo(() => {
    const fn = ((...args: Parameters<T>) => {
      debouncedRef.current?.(...args);
    }) as DebouncedFn<T>;
    fn.cancel = () => debouncedRef.current?.cancel();
    fn.flush = () => debouncedRef.current?.flush?.();
    return fn;
  }, []);

  return wrapped;
}