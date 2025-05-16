import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ActionsContent } from "../actions";

export type CardActionProps = ComponentPropsWithoutRef<typeof ActionsContent>;

export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  ({ children, ...props }, ref) => {
    return (
      <ActionsContent flex="1" ref={ref} {...props}>
        {children}
      </ActionsContent>
    );
  },
);

CardAction.displayName = "@optiaxiom/react/CardAction";
