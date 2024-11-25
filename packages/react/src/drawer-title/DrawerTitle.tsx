import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Heading, type HeadingProps } from "../heading";
import * as styles from "./DrawerTitle.css";

type DrawerTitleProps = HeadingProps<typeof RadixDialog.Title>;

export const DrawerTitle = forwardRef<HTMLDivElement, DrawerTitleProps>(
  ({ asChild, children, className, ...props }, ref) => {
    return (
      <Heading
        asChild
        level="4"
        ref={ref}
        {...styles.title({}, className)}
        {...props}
      >
        <RadixDialog.Title asChild={asChild}>{children}</RadixDialog.Title>
      </Heading>
    );
  },
);

DrawerTitle.displayName = "@optiaxiom/react/DrawerTitle";
