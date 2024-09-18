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
      addonAfter,
      addonBefore,
      children,
      className,
      onRemove,
      size = "md",
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
          addonAfter={addonAfter}
          addonBefore={addonBefore}
          onKeyDown={handleKeyDown}
          ref={ref}
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
