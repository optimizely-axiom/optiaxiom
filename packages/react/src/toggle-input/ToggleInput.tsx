import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./ToggleInput.css";

type ToggleInputProps = BoxProps<"label">;

export const ToggleInput = forwardRef<HTMLLabelElement, ToggleInputProps>(
  ({ asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <Flex asChild {...styles.toggleInput()} {...sprinkleProps}>
        <Comp ref={ref} {...restProps}>
          {children}
        </Comp>
      </Flex>
    );
  },
);

ToggleInput.displayName = "@optiaxiom/react/ToggleInput";
