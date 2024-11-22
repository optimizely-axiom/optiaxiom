import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Heading, type HeadingProps } from "../heading";
import * as styles from "./DialogTitle.css";

type DialogTitleProps = HeadingProps<typeof RadixDialog.Title>;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ asChild, children, className, ...props }, ref) => {
    return (
      <Heading
        asChild
        level="3"
        ref={ref}
        {...styles.title({}, className)}
        {...props}
      >
        <RadixDialog.Title asChild={asChild}>{children}</RadixDialog.Title>
      </Heading>
    );
  },
);

DialogTitle.displayName = "@optiaxiom/react/DialogTitle";
