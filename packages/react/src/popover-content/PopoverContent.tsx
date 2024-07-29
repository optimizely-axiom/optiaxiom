import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconX } from "../icons/IconX";
import * as styles from "./PopoverContent.css";

type PopoverContentProps = BoxProps<
  typeof RadixPopover.Content,
  {
    withArrow?: boolean;
    withCloseButton?: boolean;
  }
>;

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, withArrow, withCloseButton, ...props }, ref) => {
    return (
      <Flex asChild {...styles.content({}, className)} {...props} ref={ref}>
        <RadixPopover.Content>
          {children}
          {withArrow && (
            <Box asChild>
              <RadixPopover.Arrow height={4} width={8} />
            </Box>
          )}
          {withCloseButton && (
            <Box asChild {...styles.close()}>
              <RadixPopover.Close aria-label="Close" asChild>
                <Button appearance="secondary" icon={<IconX />} size="sm" />
              </RadixPopover.Close>
            </Box>
          )}
        </RadixPopover.Content>
      </Flex>
    );
  },
);

PopoverContent.displayName = "@optiaxiom/react/PopoverContent";
