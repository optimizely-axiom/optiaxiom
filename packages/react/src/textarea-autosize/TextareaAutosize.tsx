import { Slot } from "@radix-ui/react-slot";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { extractSprinkles } from "../sprinkles";
import * as styles from "./TextareaAutosize.css";

type TextareaAutosizeProps = BoxProps<
  "textarea",
  NonNullable<styles.WrapperVariants>
>;

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
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const [value, setValue] = useControllableState({
      defaultProp: props.defaultValue,
      prop: props.value,
    });

    return (
      <Box {...styles.wrapper({ maxRows, resize })}>
        <Box asChild {...styles.textarea({}, className)} {...sprinkleProps}>
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
          <Box {...styles.shadow({}, className)} {...sprinkleProps}>
            {(value ?? "") + " "}
          </Box>
        )}
      </Box>
    );
  },
);

TextareaAutosize.displayName = "@optiaxiom/react/TextareaAutosize";
