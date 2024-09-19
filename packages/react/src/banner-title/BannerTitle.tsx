import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";

type BannerTitleProps = ComponentPropsWithRef<typeof Box>;

export const BannerTitle = forwardRef<HTMLDivElement, BannerTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box fontWeight="600" ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

BannerTitle.displayName = "@optiaxiom/react/BannerTitle";
