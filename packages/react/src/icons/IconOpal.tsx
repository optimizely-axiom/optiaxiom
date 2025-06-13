import { createSlot } from "@radix-ui/react-slot";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { BoxProps } from "../box";

export type IconOpalProps = ComponentPropsWithoutRef<"img"> &
  Pick<BoxProps, "asChild">;

const Slot = createSlot("@optiaxiom/react/IconOpal");

export const IconOpal = forwardRef<HTMLImageElement, IconOpalProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "img";

    return (
      <Comp
        alt="Opal"
        ref={ref}
        src="data:image/webp;base64,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"
        {...props}
      />
    );
  },
);

IconOpal.displayName = "@optiaxiom/react/IconOpal";
