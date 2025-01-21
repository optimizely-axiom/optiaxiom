import { forwardRef, useEffect } from "react";

import { type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { CommandListbox } from "../command-listbox";

type ComboboxContentImpl = BoxProps;

export const ComboboxContentImpl = forwardRef<
  HTMLDivElement,
  ComboboxContentImpl
>(({ children, ...props }, ref) => {
  const { setPlaced } = useCommandContext("ComboboxContentImpl");
  useEffect(() => {
    setPlaced(true);
  }, [setPlaced]);

  return (
    <CommandListbox ref={ref} {...props}>
      {children}
    </CommandListbox>
  );
});

ComboboxContentImpl.displayName = "@optiaxiom/react/ComboboxContentImpl";
