import * as RadixPortal from "@radix-ui/react-portal";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { usePortalContext } from "./PortalContext";

export type PortalProps = ComponentPropsWithoutRef<typeof RadixPortal.Root>;

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ children, ...props }, ref) => {
    const { container } = usePortalContext("@optiaxiom/react/Portal");

    return (
      <RadixPortal.Root container={container} ref={ref} {...props}>
        {children}
      </RadixPortal.Root>
    );
  },
);

Portal.displayName = "@optiaxiom/react/Portal";
