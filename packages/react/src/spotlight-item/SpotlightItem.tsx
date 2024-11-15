import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Box } from "../box";
import { CommandItem } from "../command-item";
import { IconAngleRight } from "../icons/IconAngleRight";
import * as styles from "./SpotlightItem.css";

type SpotlightItemProps = ComponentPropsWithoutRef<typeof CommandItem>;

export const SpotlightItem = forwardRef<HTMLDivElement, SpotlightItemProps>(
  ({ addonAfter, className, description, ...props }, ref) => {
    return (
      <CommandItem
        addonAfter={addonAfter ?? <IconAngleRight />}
        description={
          description && <Box {...styles.description()}>{description}</Box>
        }
        ref={ref}
        {...styles.item({}, className)}
        {...props}
      />
    );
  },
);

SpotlightItem.displayName = "@optiaxiom/react/SpotlightItem";
