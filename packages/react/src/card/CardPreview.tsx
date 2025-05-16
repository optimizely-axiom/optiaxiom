import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import * as styles from "./CardPreview.css";

export type CardPreviewProps = ComponentPropsWithRef<typeof Box>;

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Box ref={ref} {...styles.preview({}, className)} {...props}>
        {children}
      </Box>
    );
  },
);

CardPreview.displayName = "@optiaxiom/react/CardPreview";
