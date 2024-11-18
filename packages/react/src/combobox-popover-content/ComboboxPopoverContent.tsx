import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { PopoverContent } from "../popover-content";
import * as styles from "./ComboboxPopoverContent.css";

type ComboboxPopoverContentProps = ComponentPropsWithoutRef<
  typeof PopoverContent
> &
  styles.ContentVariants;

export const ComboboxPopoverContent = forwardRef<
  HTMLDivElement,
  ComboboxPopoverContentProps
>((props, ref) => {
  return <PopoverContent ref={ref} {...props} />;
});
ComboboxPopoverContent.displayName = "@optiaxiom/react/ComboboxPopoverContent";
