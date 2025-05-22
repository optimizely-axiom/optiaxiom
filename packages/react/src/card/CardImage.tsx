import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./CardImage.css";

export type CardImageProps = BoxProps<"img">;

export const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ alt = "", asChild, children, className, src, ...props }, ref) => {
    return (
      <Box asChild ref={ref} {...styles.image({}, className)} {...props}>
        {asChild ? children : <img alt={alt} src={src} />}
      </Box>
    );
  },
);

CardImage.displayName = "@optiaxiom/react/CardImage";
