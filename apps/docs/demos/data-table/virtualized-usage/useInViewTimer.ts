import { useEffect, useRef, useState } from "react";

export const useInViewTimer = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [intersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        setIntersecting(entry.isIntersecting);
      }
    });
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [count, setCount] = useState(0);
  const timerRef = useRef(0);
  useEffect(() => {
    if (intersecting) {
      timerRef.current = window.setInterval(
        () => setCount((count) => count + 1),
        1000,
      );
    }
    return () => clearInterval(timerRef.current);
  }, [intersecting]);

  return [count, elementRef] as const;
};
