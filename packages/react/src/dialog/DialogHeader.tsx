import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Heading } from "../heading";
import { IconX } from "../icons/IconX";
import { Text } from "../text";
import { VisuallyHidden } from "../visually-hidden";
import { DialogClose } from "./DialogClose";
import { useDialogContext } from "./DialogContext";
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

/**
 * @group Dialog
 */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ addonAfter, children, className, description, ...props }, outerRef) => {
    const { headerRef } = useDialogContext("@optiaxiom/react/DialogHeader");
    const ref = useComposedRefs(headerRef, outerRef);

    return (
      <Box ref={ref} {...styles.header({}, className)} {...props}>
        <DialogClose
          appearance="subtle"
          aria-label="Close"
          icon={<IconX />}
          {...styles.close()}
        />

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
