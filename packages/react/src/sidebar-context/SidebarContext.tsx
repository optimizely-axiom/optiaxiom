import { createContext } from "@radix-ui/react-context";

export const [SidebarContextProvider, useSidebarContext] = createContext<{
  animations: boolean;
  expanded: boolean | undefined;
  onExpandedChange: (expanded: boolean) => void;
}>("Sidebar");
