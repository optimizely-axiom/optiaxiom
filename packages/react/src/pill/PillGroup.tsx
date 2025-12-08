import { type ComponentPropsWithRef, forwardRef } from "react";

import { Group } from "../group";

export type PillGroupProps = ComponentPropsWithRef<typeof Group>;

/**
 * @group Pill
 */
export const PillGroup = forwardRef<HTMLDivElement, PillGroupProps>(
  ({ children, ...props }, ref) => {
    return (
      <Group flexWrap="wrap" gap="8" ref={ref} {...props}>
        {children}
      </Group>
    );
  },
);

PillGroup.displayName = "@optiaxiom/react/PillGroup";
