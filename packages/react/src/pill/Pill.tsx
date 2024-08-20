import { type KeyboardEvent, forwardRef } from "react";

import { type BoxProps } from "../box";
import { Button } from "../button";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import * as styles from "./Pill.css";

type PillProps = BoxProps<
  typeof Button,
  {
    onRemove?: () => void;
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
        <Tooltip auto content={children}>
          <Text display="block" fontSize="sm" truncate>
            {children}
          </Text>
        </Tooltip>
      </Button>
    );
  },
);

Pill.displayName = "@optiaxiom/react/Pill";
