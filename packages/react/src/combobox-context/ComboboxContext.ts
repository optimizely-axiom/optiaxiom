import { createContext } from "react";

export type Item = {
  disabled?: boolean;
  label: string;
  value: string;
};

export type ComboboxContextType = {
  items?: Item[];
  mode?: "multiple" | "single";
  onSelect?: (value: string) => void;
  open?: boolean;
  setOpen: (open: boolean) => void;
  setValue: (value: string) => void;
  value: string;
};

export const ComboboxContext = createContext<ComboboxContextType | undefined>(
  undefined,
);
