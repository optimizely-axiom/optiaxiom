import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { ButtonAddon } from "../button-addon";
import { ButtonBase } from "../button-base";
import { Flex } from "../flex";
import { IconAngleDown } from "../icons/IconAngleDown";
import { Text } from "../text";

type FilterMenuButtonProps = {
  appearance?: never;
  caption: string;
  size?: never;
} & ComponentPropsWithoutRef<typeof ButtonBase>;

export const FilterMenuButton = forwardRef<
  HTMLButtonElement,
  FilterMenuButtonProps
>(({ caption, children, ...props }, ref) => {
  return (
    <ButtonBase
      gap="12"
      justifyContent="space-between"
      px="8"
      py="10"
      ref={ref}
      size="lg"
      {...props}
    >
      <Flex gap="2">
        <Text color="fg.secondary" fontSize="xs">
          {caption}
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
