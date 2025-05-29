import { forwardRef } from "react";

import { ActionsContent } from "../actions";
import { type BoxProps } from "../box";

export type TableActionProps = BoxProps<typeof ActionsContent>;

export const TableAction = forwardRef<HTMLDivElement, TableActionProps>(
  (props, ref) => {
    return <ActionsContent ref={ref} {...props} />;
  },
);

TableAction.displayName = "@optiaxiom/react/TableAction";
