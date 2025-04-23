import { useId } from "@radix-ui/react-id";
import { createSlot } from "@radix-ui/react-slot";
import { forwardRef } from "react";

import { type BoxProps, extractBoxProps } from "../box";
import { Flex } from "../flex";
import * as styles from "./ToggleInput.css";
import { ToggleInputProvider } from "./ToggleInputContext";

const Slot = createSlot("@optiaxiom/react/ToggleInput");

type ToggleInputProps = BoxProps<
  "label",
  {
    description?: boolean;
  }
>;

export const ToggleInput = forwardRef<HTMLLabelElement, ToggleInputProps>(
  (
    { asChild, children, className, description, onMouseDown, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "label";
    const { boxProps, restProps } = extractBoxProps(props);

    const descriptionId = useId();
    const labelId = useId();

    return (
      <ToggleInputProvider
        descriptionId={description ? descriptionId : undefined}
        labelId={labelId}
      >
        <Flex asChild {...styles.toggleInput({}, className)} {...boxProps}>
          <Comp
            onMouseDown={(event) => {
              onMouseDown?.(event);
              if (!event.defaultPrevented && event.detail > 1) {
                event.preventDefault();
              }
            }}
            ref={ref}
            {...restProps}
          >
            {children}
          </Comp>
        </Flex>
      </ToggleInputProvider>
    );
  },
);

ToggleInput.displayName = "@optiaxiom/react/ToggleInput";
