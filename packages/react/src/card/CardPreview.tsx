import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./CardPreview.css";

export type CardPreviewProps = BoxProps<
  "div",
  {
    addonBottomLeft?: ReactNode;
    addonBottomRight?: ReactNode;
    addonTopLeft?: ReactNode;
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
            <Box alignSelf="start">{addonTopLeft}</Box>
            <Box alignSelf="start">{addonTopRight}</Box>
            <Box w="full" />
            <Box alignSelf="end">{addonBottomLeft}</Box>
            <Box alignSelf="end">{addonBottomRight}</Box>
          </Box>
        )}
      </Box>
    );
  },
);

CardPreview.displayName = "@optiaxiom/react/CardPreview";
