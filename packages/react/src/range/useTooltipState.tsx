import { useRef, useState } from "react";

export const useTooltipState = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const timerRef = useRef<number>();

  return [
    tooltipOpen,
    (flag: boolean, delayed = false) => {
      if (delayed) {
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
          setTooltipOpen(flag);
        }, 50);
      } else {
        window.clearTimeout(timerRef.current);
        setTooltipOpen(flag);
      }
    },
  ] as const;
};
