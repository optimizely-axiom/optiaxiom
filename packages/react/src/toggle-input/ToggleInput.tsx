import { useId } from "@radix-ui/react-id";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";
import { ToggleInputContextProvider } from "../toggle-input-context";
import * as styles from "./ToggleInput.css";

type ToggleInputProps = BoxProps<
  "label",
  {
    description?: boolean;
  }
>;

export const ToggleInput = forwardRef<HTMLLabelElement, ToggleInputProps>(
  ({ asChild, children, description, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const descriptionId = useId();
    const labelId = useId();

    return (
      <ToggleInputContextProvider
        descriptionId={description ? descriptionId : undefined}
        labelId={labelId}
      >
        <Flex asChild {...styles.toggleInput()} {...sprinkleProps}>
          <Comp ref={ref} {...restProps}>
            {children}
          </Comp>
        </Flex>
      </ToggleInputContextProvider>
    );
  },
);

ToggleInput.displayName = "@optiaxiom/react/ToggleInput";
