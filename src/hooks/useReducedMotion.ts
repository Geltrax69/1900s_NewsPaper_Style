import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Live reduced-motion signal; updates if the OS setting is toggled. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** True only on devices with a real hover-capable fine pointer. */
export function useFineHover(): boolean {
  const [fine, setFine] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = () => setFine(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return fine;
}
