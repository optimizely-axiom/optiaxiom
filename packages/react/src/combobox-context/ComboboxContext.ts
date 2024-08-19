import { createContext } from "@radix-ui/react-context";

export const [ComboboxContextProvider, useComboboxContext] = createContext<{
  mode?: "multiple" | "single" | undefined;
  open?: boolean | undefined;
  setOpen: (open: boolean) => void;
  setValue: (value: string | string[]) => void;
  value?: string | string[] | undefined;
}>("Combobox");
