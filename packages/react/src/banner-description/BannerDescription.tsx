import { type ComponentPropsWithRef, forwardRef } from "react";

import { useBannerContext } from "../banner-context";
import { Box } from "../box";

type BannerDescriptionProps = ComponentPropsWithRef<typeof Box>;

export const BannerDescription = forwardRef<
  HTMLDivElement,
  BannerDescriptionProps
>(({ children, ...props }, ref) => {
  const { descriptionId } = useBannerContext("BannerDescription");

  return (
    <Box id={descriptionId} ref={ref} {...props}>
      {children}
    </Box>
  );
});

BannerDescription.displayName = "@optiaxiom/react/BannerDescription";
