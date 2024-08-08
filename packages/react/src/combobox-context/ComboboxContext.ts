import { createContext } from "react";

export type Item = {
  label: string;
  value: string;
};

export type ComboboxContextType = {
  items?: Item[];
  onSelect?: (value: string) => void;
  open?: boolean;
  setOpen: (open: boolean) => void;
  setValue: (value: string) => void;
  value: string;
};

export const ComboboxContext = createContext<ComboboxContextType | undefined>(
  undefined,
);
