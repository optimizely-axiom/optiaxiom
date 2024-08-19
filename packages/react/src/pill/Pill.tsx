import { type KeyboardEvent, type ReactNode, forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { Text } from "../text";
import * as styles from "./Pill.css";

type PillProps = BoxProps<
  "button",
  {
    endDecorator?: ReactNode;
    onRemove?: () => void;
    startDecorator?: ReactNode;
  } & styles.PillVariants
>;

export const Pill = forwardRef<HTMLButtonElement, PillProps>(
  (
    {
      children,
      className,
      endDecorator,
      onRemove,
      size = "md",
      startDecorator,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Backspace" && onRemove) {
        onRemove();
      }
    };

    return (
      <Button
        endDecorator={endDecorator}
        onKeyDown={handleKeyDown}
        ref={ref}
        startDecorator={startDecorator}
        {...styles.pill({ size }, className)}
        {...props}
      >
        <Text display="block" fontSize="sm" truncate>
          {children}
        </Text>
      </Button>
    );
  },
);

Pill.displayName = "@optiaxiom/react/Pill";
