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
      <Tooltip auto content={children}>
        <Button
          endDecorator={endDecorator}
          onKeyDown={handleKeyDown}
          ref={ref}
          startDecorator={startDecorator}
          {...styles.pill({ size }, className)}
          {...props}
        >
          <Text display="block" fontSize="inherit" truncate>
            {children}
          </Text>
        </Button>
      </Tooltip>
    );
  },
);

Pill.displayName = "@optiaxiom/react/Pill";
