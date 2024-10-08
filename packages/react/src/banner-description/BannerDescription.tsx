import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { Flex } from "../flex";

type BannerDescriptionProps = ComponentPropsWithRef<typeof Box>;

export const BannerDescription = forwardRef<
  HTMLDivElement,
  BannerDescriptionProps
>(({ children, ...props }, ref) => {
  return (
    <Flex gap="xs" ref={ref} {...props}>
      {children}
    </Flex>
  );
});

BannerDescription.displayName = "@optiaxiom/react/BannerDescription";
