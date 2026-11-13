import { IconSearch } from "@optiaxiom/icons/IconSearch";
import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { MenuTrigger } from "../menu";
import { decorateChildren } from "../utils";

export type SpotlightTriggerProps = ButtonProps<typeof MenuTrigger>;

/**
 * Search button that opens the Spotlight.
 *
 * Leave out `children` for an icon-only button, and give it an `aria-label`.
 * To show a full search button on larger screens and only the icon on small
 * ones, render one of each with responsive `display`: a Spotlight can have
 * any number of triggers.
 *
 * @example
 * <SpotlightTrigger aria-label="Search" display={["flex", "none"]} />
 * <SpotlightTrigger display={["none", "flex"]}>Search</SpotlightTrigger>
 *
 * @group Spotlight
 */
export const SpotlightTrigger = forwardRef<
  HTMLButtonElement,
  SpotlightTriggerProps
>(({ asChild, children, icon = <IconSearch />, ...props }, ref) => {
  return (
    <MenuTrigger asChild ref={ref} {...props}>
      <Button asChild={asChild} icon={icon}>
        {decorateChildren(
          { asChild, children },
          (children) => children && <Box color="fg.tertiary">{children}</Box>,
        )}
      </Button>
    </MenuTrigger>
  );
});

SpotlightTrigger.displayName = "@optiaxiom/react/SpotlightTrigger";
