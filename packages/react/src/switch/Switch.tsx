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
    offLabel?: string;
    onLabel?: string;
  } & styles.SwitchVariants
>;

export const Switch = forwardRef<
  ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(
  (
    {
      className,
      disabled,
      id,
      label,
      offLabel,
      onLabel,
      size = "default",
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Box className={clsx(styles.switchBox, className)} {...sprinkleProps}>
        {offLabel && (
          <Text
            asChild
            className={styles.leftLabel}
            color={disabled ? "fg.disabled" : "fg.default"}
          >
            <label htmlFor={id}> {offLabel}</label>
          </Text>
        )}
        <RadixSwitch.Root
          ref={ref}
          {...restProps}
          className={styles.switchStyle({ size })}
          disabled={disabled}
          id={id}
        >
          <RadixSwitch.Thumb className={styles.switchThumb({ size })} />
        </RadixSwitch.Root>
        {onLabel && (
          <Text
            asChild
            className={styles.rightLabel}
            color={disabled ? "fg.disabled" : "fg.default"}
          >
            <label htmlFor={id}> {onLabel}</label>
          </Text>
        )}
        {label && (
          <Text
            asChild
            className={styles.rightLabel}
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
