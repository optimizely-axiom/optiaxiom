import type { ComponentPropsWithoutRef } from "react";

import * as Progress from "@radix-ui/react-progress";
import clsx from "clsx";
import React from "react";

import { progressBar, progressIndicator } from "./ProgressBar.css";

type ProgressBarProps = ComponentPropsWithoutRef<typeof Progress.Root>;

export const ProgressBar = React.forwardRef<
  React.ElementRef<typeof Progress.Root>,
  ProgressBarProps
>(({ className, value, ...props }, ref) => {
  const [progress, setProgress] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress.Root
      className={clsx(progressBar, className)}
      ref={ref}
      {...props}
    >
      <Progress.Indicator
        className={progressIndicator}
        // style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        style={{ width: `${progress || 0}%` }}
      />
    </Progress.Root>
  );
});

ProgressBar.displayName = "@optiaxiom/react/ProgressBar";
