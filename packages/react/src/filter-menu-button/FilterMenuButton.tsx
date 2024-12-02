import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { ButtonAddon } from "../button-addon";
import { ButtonBase } from "../button-base";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { Text } from "../text";
import * as styles from "./FilterMenuButton.css";

type FilterMenuButtonProps = {
  appearance?: never;
  label: string;
  size?: never;
} & ComponentPropsWithoutRef<typeof ButtonBase>;

export const FilterMenuButton = forwardRef<
  HTMLButtonElement,
  FilterMenuButtonProps
>(({ children, className, label, ...props }, ref) => {
  return (
    <ButtonBase ref={ref} {...styles.button({}, className)} {...props}>
      <Flex gap="2">
        <Text color="fg.secondary" fontSize="xs">
          {label}
        </Text>
        <Box fontSize="sm">{children}</Box>
      </Flex>
      <ButtonAddon asChild>
        <IconAngleDown />
      </ButtonAddon>
    </ButtonBase>
  );
});

FilterMenuButton.displayName = "@optiaxiom/react/FilterMenuButton";
