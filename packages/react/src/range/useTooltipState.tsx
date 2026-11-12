import { useState } from "react";

import { useTimeout } from "../hooks";

export const useTooltipState = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { clear, start } = useTimeout();

  return [
    tooltipOpen,
    (flag: boolean, delayed = false) => {
      if (delayed) {
        start(() => {
          setTooltipOpen(flag);
        }, 50);
      } else {
        clear();
        setTooltipOpen(flag);
      }
    },
  ] as const;
};
