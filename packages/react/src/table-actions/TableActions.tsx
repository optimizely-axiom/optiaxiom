import { forwardRef } from "react";

import { ActionsContent } from "../actions-content";
import { type BoxProps } from "../box";

type TableActionsProps = BoxProps<"div">;

export const TableActions = forwardRef<HTMLDivElement, TableActionsProps>(
  (props, ref) => {
    return <ActionsContent ref={ref} {...props} />;
  },
);

TableActions.displayName = "@optiaxiom/react/TableActions";
