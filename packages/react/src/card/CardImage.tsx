import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCardContext } from "./CardContext";
import * as styles from "./CardImage.css";

type CardImageProps = BoxProps<"img">;

export const CardImage = forwardRef<HTMLImageElement, CardImageProps>(
  ({ alt = "", asChild, children, className, src, ...props }, ref) => {
    const { orientation } = useCardContext("@optiaxiom/react/CardImage");

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
