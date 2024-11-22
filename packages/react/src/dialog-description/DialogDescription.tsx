import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Text } from "../text";
import * as styles from "./DialogDescription.css";

type DialogDescriptionProps = BoxProps<
  typeof RadixDialog.Description,
  {
    description?: string;
  }
>;

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <Text asChild ref={ref} {...styles.description({}, className)} {...props}>
      <RadixDialog.Description>{children}</RadixDialog.Description>
    </Text>
  );
});

DialogDescription.displayName = "@optiaxiom/react/DialogDescription";
