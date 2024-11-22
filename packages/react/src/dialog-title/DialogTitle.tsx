import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Heading } from "../heading";

type DialogTitleProps = BoxProps<typeof RadixDialog.Title>;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ asChild, children, ...props }, ref) => {
    return (
      <Heading asChild fontWeight="500" level="3" ref={ref} {...props}>
        <RadixDialog.Title asChild={asChild}>{children}</RadixDialog.Title>
      </Heading>
    );
  },
);

DialogTitle.displayName = "@optiaxiom/react/DialogTitle";
