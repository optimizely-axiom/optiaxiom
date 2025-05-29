import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./CardPreview.css";

export type CardPreviewProps = BoxProps<
  "div",
  {
    /**
     * Display content in the bottom-left corner of the preview panel.
     */
    addonBottomLeft?: ReactNode;
    /**
     * Display content in the bottom-right corner of the preview panel.
     */
    addonBottomRight?: ReactNode;
    /**
     * Display content in the top-left corner of the preview panel.
     */
    addonTopLeft?: ReactNode;
    /**
     * Display content in the top-right corner of the preview panel.
     */
    addonTopRight?: ReactNode;
  }
>;

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(
  (
    {
      addonBottomLeft,
      addonBottomRight,
      addonTopLeft,
      addonTopRight,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Box ref={ref} {...styles.preview({}, className)} {...props}>
        {children}

        {(addonTopLeft || addonTopRight) && (
          <Box {...styles.overlay()}>
            <Box
              alignItems="center"
              alignSelf="start"
              display="flex"
              justifyContent="space-between"
            >
              {addonTopLeft}
            </Box>
            <Box
              alignItems="center"
              alignSelf="start"
              display="flex"
              justifyContent="space-between"
            >
              {addonTopRight}
            </Box>
            <Box w="full" />
            <Box
              alignItems="center"
              alignSelf="end"
              display="flex"
              justifyContent="space-between"
            >
              {addonBottomLeft}
            </Box>
            <Box
              alignItems="center"
              alignSelf="end"
              display="flex"
              justifyContent="space-between"
            >
              {addonBottomRight}
            </Box>
          </Box>
        )}
      </Box>
    );
  },
);

CardPreview.displayName = "@optiaxiom/react/CardPreview";
