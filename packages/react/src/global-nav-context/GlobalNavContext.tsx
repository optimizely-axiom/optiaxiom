import { createContext } from "react";

type GlobalNavContextType = {
  isCollapsed: boolean;
  toggleCollapsed: () => void;
};

export const GlobalNavContext = createContext<GlobalNavContextType | undefined>(
  undefined,
);
