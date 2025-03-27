import { forwardRef, useEffect } from "react";

import { type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { Listbox } from "../listbox";

type CommandListProps = BoxProps;

export const CommandListbox = forwardRef<HTMLDivElement, CommandListProps>(
  ({ children, size, ...props }, ref) => {
    const { downshift, setPlaced } = useCommandContext(
      "@optiaxiom/react/CommandListbox",
    );
    useEffect(() => {
      requestAnimationFrame(() => setPlaced(true));
    }, [setPlaced]);

    return (
      <Listbox size={size} {...downshift.getMenuProps({ ref, ...props })}>
        {children}
      </Listbox>
    );
  },
);

CommandListbox.displayName = "@optiaxiom/react/CommandListbox";
