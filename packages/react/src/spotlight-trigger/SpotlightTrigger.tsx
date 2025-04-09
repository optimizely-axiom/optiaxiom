import { useHotkeys } from "@mantine/hooks";
import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { useComboboxContext } from "../combobox-context";
import { ComboboxTrigger } from "../combobox-trigger";
import { DialogTrigger } from "../dialog-trigger";
import { IconMagnifyingGlass } from "../icons/IconMagnifyingGlass";

type SpotlightTriggerProps = ButtonProps<
  typeof DialogTrigger,
  {
    hotkey?: string;
  }
>;

const DEFAULT_HOTKEY = "mod+K";

export const SpotlightTrigger = forwardRef<
  HTMLButtonElement,
  SpotlightTriggerProps
>(({ children, hotkey = DEFAULT_HOTKEY, ...props }, ref) => {
  const { open, setOpen } = useComboboxContext(
    "@optiaxiom/react/SpotlightTrigger",
  );

  useHotkeys([[hotkey, () => setOpen(!open)]]);

  return (
    <ComboboxTrigger asChild ref={ref} {...props}>
      <Button icon={<IconMagnifyingGlass />}>
        <Box color="fg.tertiary">{children}</Box>
      </Button>
    </ComboboxTrigger>
  );
});

SpotlightTrigger.displayName = "@optiaxiom/react/SpotlightTrigger";
