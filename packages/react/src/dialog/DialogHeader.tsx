import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { IconX } from "../icons/IconX";
import { Text } from "../text";
import { VisuallyHidden } from "../visually-hidden";
import * as styles from "./DialogHeader.css";

export type DialogHeaderProps = BoxProps<
  "div",
  {
    /**
     * Display content inside the header after `children`.
     */
    addonAfter?: ReactNode;
    /**
     * Add secondary text after the primary title.
     */
    description?: ReactNode;
  }
>;

export const DialogHeader = forwardRef<HTMLHeadingElement, DialogHeaderProps>(
  ({ addonAfter, children, description, ...props }, ref) => {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        gap="8"
        p="24"
        pb="16"
        ref={ref}
        {...props}
      >
        <Button
          appearance="subtle"
          aria-label="Close"
          asChild
          icon={<IconX />}
          {...styles.close()}
        >
          <RadixDialog.Close />
        </Button>

        <Heading asChild level="3" {...styles.title()}>
          <RadixDialog.Title>{children}</RadixDialog.Title>
        </Heading>

        {addonAfter && <Flex {...styles.actions()}>{addonAfter}</Flex>}

        {description ? (
          <Text asChild {...styles.description()}>
            <RadixDialog.Description>{description}</RadixDialog.Description>
          </Text>
        ) : (
          <VisuallyHidden>
            <RadixDialog.Description />
          </VisuallyHidden>
        )}
      </Box>
    );
  },
);

DialogHeader.displayName = "@optiaxiom/react/DialogHeader";
