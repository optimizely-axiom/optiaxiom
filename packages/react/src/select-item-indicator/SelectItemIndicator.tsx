import { type ComponentPropsWithRef, forwardRef } from "react";

import { Box } from "../box";
import { IconCheck } from "../icons/IconCheck";
import { useSelectItemContext } from "../select-item-context";

type SelectItemIndicatorProps = ComponentPropsWithRef<typeof IconCheck>;

export const SelectItemIndicator = forwardRef<
  SVGSVGElement,
  SelectItemIndicatorProps
>(({ ...props }, ref) => {
  const { active } = useSelectItemContext("SelectItemIndicator");
  if (!active) {
    return <Box w="12" />;
  }

  return <IconCheck ref={ref} {...props} />;
});

SelectItemIndicator.displayName = "@optiaxiom/react/SelectItemIndicator";
