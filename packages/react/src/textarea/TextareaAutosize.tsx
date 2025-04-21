import { Slot } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./TextareaAutosize.css";

type TextareaAutosizeProps = BoxProps<"textarea", styles.WrapperVariants>;

export const TextareaAutosize = forwardRef<
  HTMLTextAreaElement,
  TextareaAutosizeProps
>(
  (
    {
      asChild,
      children,
      className,
      maxRows,
      onChange,
      resize = "none",
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "textarea";
    const { boxProps, restProps } = extractBoxProps(props);

    const [value, setValue] = useControllableState({
      defaultProp: props.defaultValue,
      prop: props.value,
    });

    return (
      <Box {...styles.wrapper({ maxRows, resize })}>
        <Box asChild {...styles.textarea({}, className)} {...boxProps}>
          <Comp
            onChange={(event) => {
              setValue(event.target.value);
              onChange?.(event);
            }}
            ref={ref}
            {...restProps}
          >
            {children}
          </Comp>
        </Box>

        {resize === "auto" && (
          <Box {...styles.shadow({}, className)} {...boxProps}>
            {(value ?? "") + " "}
          </Box>
        )}
      </Box>
    );
  },
);

TextareaAutosize.displayName = "@optiaxiom/react/TextareaAutosize";
