import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { IconX } from "../icons/IconX";
import * as styles from "./DialogHeader.css";

type DialogHeaderProps = BoxProps;

export const DialogHeader = forwardRef<HTMLHeadingElement, DialogHeaderProps>(
  ({ children, ...props }, ref) => {
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

        {children}
      </Box>
    );
  },
);

DialogHeader.displayName = "@optiaxiom/react/DialogHeader";
