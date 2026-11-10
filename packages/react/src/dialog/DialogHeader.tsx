import { IconXmark } from "@optiaxiom/icons/IconXmark";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef, type ReactNode } from "react";

import { Box } from "../box";
import { Group } from "../group";
import { Heading } from "../heading";
import { useMessages } from "../locale";
import { Text, type TextProps } from "../text";
import { DialogClose } from "./DialogClose";
import { useDialogContext } from "./DialogContext";
import * as styles from "./DialogHeader.css";

export type DialogHeaderProps = TextProps<
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
  (
    {
      addonAfter,
      children,
      className,
      description,
      lineClamp,
      truncate,
      ...props
    },
    outerRef,
  ) => {
    const { headerRef } = useDialogContext("@optiaxiom/react/DialogHeader");
    const ref = useComposedRefs(headerRef, outerRef);
    const messages = useMessages();

    return (
      <Box ref={ref} {...styles.header({}, className)} {...props}>
        <DialogClose
          appearance="subtle"
          aria-label={messages["Close"]}
          icon={<IconXmark />}
          {...styles.close()}
        />
        <Heading
          asChild
          level="3"
          lineClamp={lineClamp}
          truncate={truncate}
          {...styles.title()}
        >
          <RadixDialog.Title>{children}</RadixDialog.Title>
        </Heading>
        {addonAfter && <Group {...styles.actions()}>{addonAfter}</Group>}
        {description && (
          <Text asChild {...styles.description()}>
            <RadixDialog.Description>{description}</RadixDialog.Description>
          </Text>
        )}
      </Box>
    );
  },
);

DialogHeader.displayName = "@optiaxiom/react/DialogHeader";
