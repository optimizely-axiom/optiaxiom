import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { Listbox } from "../listbox";
import { extractSprinkles } from "../sprinkles";

type CommandListProps = BoxProps;

export const CommandListbox = forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { downshift } = useCommandContext("CommandList");

    return (
      <Listbox
        {...sprinkleProps}
        {...downshift.getMenuProps({ ref, ...restProps })}
      >
        {children}
      </Listbox>
    );
  },
);

CommandListbox.displayName = "@optiaxiom/react/CommandListbox";
