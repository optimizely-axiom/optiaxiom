import * as RadixDrawer from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Text, type TextProps } from "../text";
import * as styles from "./DrawerDescription.css";

type DrawerDescriptionProps = TextProps<typeof RadixDrawer.Description>;

export const DrawerDescription = forwardRef<
  HTMLParagraphElement,
  DrawerDescriptionProps
>(({ children, className, ...props }, ref) => {
  return (
    <Text asChild ref={ref} {...styles.description({}, className)} {...props}>
      <RadixDrawer.Description>{children}</RadixDrawer.Description>
    </Text>
  );
});

DrawerDescription.displayName = "@optiaxiom/react/DrawerDescription";
