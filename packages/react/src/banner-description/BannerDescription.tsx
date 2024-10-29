import { type ComponentPropsWithRef, forwardRef } from "react";

import { useBannerContext } from "../banner-context";
import { Box } from "../box";
import { Flex } from "../flex";

type BannerDescriptionProps = ComponentPropsWithRef<typeof Box>;

export const BannerDescription = forwardRef<
  HTMLDivElement,
  BannerDescriptionProps
>(({ children, ...props }, ref) => {
  const { descriptionId } = useBannerContext("BannerDescription");

  return (
    <Flex gap="xs" id={descriptionId} ref={ref} {...props}>
      {children}
    </Flex>
  );
});

BannerDescription.displayName = "@optiaxiom/react/BannerDescription";
