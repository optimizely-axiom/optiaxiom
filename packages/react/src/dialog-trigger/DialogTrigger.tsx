import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { extractSprinkles } from "../sprinkles";

type DialogTriggerProps = ButtonProps<typeof RadixDialog.Trigger>;

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <RadixDialog.Trigger asChild ref={ref} {...sprinkleProps}>
        {asChild ? children : <Button {...restProps}>{children}</Button>}
      </RadixDialog.Trigger>
    );
  },
);

DialogTrigger.displayName = "@optiaxiom/react/DialogTrigger";
