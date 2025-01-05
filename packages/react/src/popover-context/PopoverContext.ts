import { createContext } from "@radix-ui/react-context";

export const [PopoverContextProvider, usePopoverContext] = createContext<{
  open: boolean | undefined;
  setOpen: (open: boolean) => void;
  trigger: "click" | "hover";
}>("Popover");
