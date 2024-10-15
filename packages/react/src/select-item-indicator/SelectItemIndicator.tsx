import { type ComponentPropsWithRef, forwardRef } from "react";

import { IconCheck } from "../icons/IconCheck";
import { useSelectItemContext } from "../select-item-context";

type SelectItemIndicatorProps = ComponentPropsWithRef<typeof IconCheck>;

export const SelectItemIndicator = forwardRef<
  SVGSVGElement,
  SelectItemIndicatorProps
>(({ ...props }, ref) => {
  const { active } = useSelectItemContext("SelectItemIndicator");
  if (!active) {
    return null;
  }

  return <IconCheck ref={ref} {...props} />;
});

SelectItemIndicator.displayName = "@optiaxiom/react/SelectItemIndicator";
