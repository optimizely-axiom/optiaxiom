import * as RadixDialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { IconX } from "../icons/IconX";
import { Text } from "../text";
import * as styles from "./DrawerHeader.css";

type DrawerHeaderProps = BoxProps<
  "div",
  {
    addonAfter?: ReactNode;
    description?: ReactNode;
  }
>;

export const DrawerHeader = forwardRef<HTMLHeadingElement, DrawerHeaderProps>(
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

DrawerHeader.displayName = "@optiaxiom/react/DrawerHeader";
