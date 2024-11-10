import { useId } from "@radix-ui/react-id";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ButtonAddon } from "../button-addon";
import { ButtonBase } from "../button-base";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { Text } from "../text";
import * as styles from "./LabelMenuButton.css";

type FilterMenuButtonProps = ComponentPropsWithoutRef<typeof ButtonBase> & {
  appearance?: never;
  label: string;
  size?: never;
};

export const LabelMenuButton = forwardRef<
  HTMLButtonElement,
  FilterMenuButtonProps
>(
  (
    { "aria-labelledby": ariaLabelledBy, children, className, label, ...props },
    ref,
  ) => {
    const filled =
      String(props["aria-expanded"]) === "true" || Boolean(children);
    const labelId = useId();
    const valueId = useId();

    return (
      <ButtonBase
        aria-labelledby={ariaLabelledBy ?? clsx(labelId, children && valueId)}
        data-filled={filled ? "" : undefined}
        ref={ref}
        size="lg"
        {...styles.button({}, className)}
        {...props}
      >
        <Flex gap="0" overflow="hidden" textAlign="start">
          <Text asChild id={labelId} truncate {...styles.label({ filled })}>
            <Label>{label}</Label>
          </Text>
          <Text id={valueId} truncate {...styles.content({ filled })}>
            {children ?? <>&nbsp;</>}
          </Text>
        </Flex>
        <ButtonAddon asChild>
          <IconAngleDown />
        </ButtonAddon>
      </ButtonBase>
    );
  },
);

LabelMenuButton.displayName = "@optiaxiom/react/LabelMenuButton";
