import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { useCommandItemContext } from "../command-item-context";
import { IconCheck } from "../icons/IconCheck";
import { ListboxItemIndicator } from "../listbox-item-indicator";

type CommandItemIndicatorProps = BoxProps<typeof IconCheck>;

export const CommandItemIndicator = forwardRef<
  SVGSVGElement,
  CommandItemIndicatorProps
>((props, ref) => {
  const { active } = useCommandItemContext("CommandItemIndicator");
  return <ListboxItemIndicator active={active} ref={ref} {...props} />;
});

CommandItemIndicator.displayName = "@optiaxiom/react/CommandItemIndicator";
