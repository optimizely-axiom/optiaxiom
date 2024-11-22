import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Text } from "../text";

type DialogDescriptionProps = BoxProps<
  typeof RadixDialog.Description,
  {
    description?: string;
  }
>;

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, ...props }, ref) => {
  return (
    <Text
      asChild
      color="fg.secondary"
      fontWeight="400"
      mt="xs"
      ref={ref}
      {...props}
    >
      <RadixDialog.Description>{children}</RadixDialog.Description>
    </Text>
  );
});

DialogDescription.displayName = "@optiaxiom/react/DialogDescription";
