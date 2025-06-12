import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { IconX } from "../icons/IconX";
import { Text } from "../text";
import * as styles from "./AsideHeader.css";

export type AsideHeaderProps = BoxProps<
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

export const AsideHeader = forwardRef<HTMLHeadingElement, AsideHeaderProps>(
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
        />

        <Heading level="3" {...styles.title()}>
          {children}
        </Heading>

        {addonAfter && <Flex {...styles.actions()}>{addonAfter}</Flex>}

        {description && (
          <Text asChild {...styles.description()}>
            {description}
          </Text>
        )}
      </Box>
    );
  },
);

AsideHeader.displayName = "@optiaxiom/react/AsideHeader";
