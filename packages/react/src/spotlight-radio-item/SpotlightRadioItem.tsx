import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { IconAngleRight } from "../icons/IconAngleRight";
import { ListboxRadioItem } from "../listbox-radio-item";
import { SpotlightItem } from "../spotlight-item";
import * as styles from "./SpotlightRadioItem.css";

type SpotlightRadioItemProps = ComponentPropsWithoutRef<
  typeof ListboxRadioItem
> &
  ComponentPropsWithoutRef<typeof SpotlightItem>;

export const SpotlightRadioItem = forwardRef<
  HTMLDivElement,
  SpotlightRadioItemProps
>(({ addonAfter, children, className, description, ...props }, ref) => {
  return (
    <SpotlightItem asChild ref={ref} {...styles.item({}, className)} {...props}>
      <ListboxRadioItem
        addonAfter={addonAfter ?? <IconAngleRight />}
        description={
          description && (
            <Box fontSize="md" mt="2">
              {description}
            </Box>
          )
        }
      >
        {children}
      </ListboxRadioItem>
    </SpotlightItem>
  );
});

SpotlightRadioItem.displayName = "@optiaxiom/react/SpotlightRadioItem";
