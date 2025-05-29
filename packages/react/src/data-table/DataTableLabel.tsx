import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useDataTableRowContext } from "./DataTableRowContext";

export type DataTableLabelProps = BoxProps;

export const DataTableLabel = forwardRef<HTMLDivElement, DataTableLabelProps>(
  (props, ref) => {
    const { labelId } = useDataTableRowContext(
      "@optiaxiom/react/DataTableLabel",
    );
    return <Box id={labelId} ref={ref} {...props} />;
  },
);

DataTableLabel.displayName = "@optiaxiom/react/DataTableLabel";
