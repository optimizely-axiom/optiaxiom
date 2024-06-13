import * as RadixLabel from "@radix-ui/react-label";
import * as RadixSwitch from "@radix-ui/react-switch";
import clsx from "clsx";
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from "react";

import { Box } from "../box";
import { extractSprinkles } from "../sprinkles";
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
          <RadixLabel.Root
            className={clsx(
              styles.label,
              disabled ? styles.disabledColor : styles.primaryColor,
            )}
            htmlFor={id}
          >
            {label}
          </RadixLabel.Root>
        )}
      </Box>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
