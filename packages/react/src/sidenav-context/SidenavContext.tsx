import { createContext } from "@radix-ui/react-context";

export const [SidenavContextProvider, useSidenavContext] = createContext<{
  animations: boolean;
  expanded: boolean | undefined;
  onExpandedChange: (expanded: boolean) => void;
}>("Sidenav");
