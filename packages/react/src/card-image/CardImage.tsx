import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCardContext } from "../card-context";
import * as styles from "./CardImage.css";

type CardImageProps = BoxProps<"img">;

export const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ alt, asChild, children, className, src, ...props }, ref) => {
    const { orientation } = useCardContext("CardImage");

    return (
      <Box
        asChild
        ref={ref}
        {...styles.cardImage({ orientation }, className)}
        {...props}
      >
        {asChild ? children : <img alt={alt} src={src} />}
      </Box>
    );
  },
);

CardImage.displayName = "@optiaxiom/react/CardImage";
