import { createContext } from "@radix-ui/react-context";

export const [SideNavContextProvider, useSideNavContext] = createContext<{
  animations: boolean;
  expanded: boolean | undefined;
  onExpandedChange: (expanded: boolean) => void;
}>("SideNav");
