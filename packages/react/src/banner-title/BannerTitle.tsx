import { type ComponentPropsWithRef, forwardRef } from "react";

import { useBannerContext } from "../banner-context";
import { Box } from "../box";

type BannerTitleProps = ComponentPropsWithRef<typeof Box>;

export const BannerTitle = forwardRef<HTMLDivElement, BannerTitleProps>(
  ({ children, ...props }, ref) => {
    const { labelId } = useBannerContext("BannerTitle");

    return (
      <Box fontWeight="600" id={labelId} ref={ref} {...props}>
        {children}
      </Box>
    );
  },
);

BannerTitle.displayName = "@optiaxiom/react/BannerTitle";
