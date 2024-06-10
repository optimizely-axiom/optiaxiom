import * as RadixSwitch from "@radix-ui/react-switch";
import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef, useState } from "react";

import { Box } from "../box";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import { type ExtendProps } from "../utils";
import * as styles from "./Switch.css";

type SwitchProps = ExtendProps<
  ComponentPropsWithRef<typeof RadixSwitch.Root>,
  ComponentPropsWithRef<typeof Box>,
  {
    color?: "blue" | "red" | "yellow";
    offLabel?: string;
    onLabel?: string;
    side?: "left" | "right";
  }
>;

export const Switch = forwardRef<HTMLDivElement, SwitchProps>(
  (
    {
      className,
      defaultChecked = false,
      disabled,
      id,
      offLabel,
      onClick,
      onLabel,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const [switchValue, setSwitchValue] = useState(defaultChecked);

    const handleSwitchChange = () => {
      setSwitchValue((prevValue) => !prevValue);
    };
    return (
      <Box
        className={clsx(styles.switchBox, className)}
        ref={ref}
        {...sprinkleProps}
      >
        <Text
          asChild
          className={styles.beforeSwitch}
          data-checked={switchValue}
        >
          <label htmlFor={id}> {offLabel}</label>
        </Text>
        <RadixSwitch.Root
          {...restProps}
          className={clsx(styles.switchStyle)}
          defaultChecked={defaultChecked}
          disabled={disabled}
          id={id}
          onCheckedChange={() => {
            handleSwitchChange();
          }}
        >
          <RadixSwitch.Thumb className={styles.switchThumb} />
        </RadixSwitch.Root>
        <label
          className={clsx(styles.afterSwitch)}
          data-checked={switchValue}
          htmlFor={id}
        >
          {onLabel}
        </label>
      </Box>
    );
  },
);

Switch.displayName = "@optiaxiom/react/Switch";
