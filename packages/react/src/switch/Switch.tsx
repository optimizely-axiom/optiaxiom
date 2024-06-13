import * as RadixSwitch from "@radix-ui/react-switch";
import clsx from "clsx";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";

import { Box } from "../box";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import { type ExtendProps } from "../utils";
import * as styles from "./Switch.css";

type SwitchProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixSwitch.Root>,
  ComponentPropsWithRef<typeof Box>,
  {
    label?: string;
    readonly?: boolean;
  } & styles.SwitchVariants
>;

export const Switch = forwardRef<
  ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(
  (
    { className, disabled, id, label, readonly, size = "default", ...props },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box className={clsx(styles.switchBox, className)} {...sprinkleProps}>
        <RadixSwitch.Root
          ref={ref}
          {...restProps}
          className={styles.switchStyle({ size })}
          disabled={disabled || readonly}
          id={id}
        >
          <RadixSwitch.Thumb className={styles.switchThumb({ size })} />
        </RadixSwitch.Root>
        {label && (
          <Text
            asChild
            className={styles.label}
            color={disabled ? "fg.disabled" : "fg.default"}
          >
            <label htmlFor={id}> {label}</label>
          </Text>
        )}
      </Box>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
