import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./CardImage.css";

type CardImageProps = BoxProps<"img">;

export const CardImage = forwardRef<HTMLDivElement, CardImageProps>(
  ({ alt, className, src, ...props }, ref) => {
    return (
      <Box asChild ref={ref} {...styles.cardImage({}, className)} {...props}>
        <img alt={alt} src={src} />
      </Box>
    );
  },
);

CardImage.displayName = "@optiaxiom/react/CardImage";
