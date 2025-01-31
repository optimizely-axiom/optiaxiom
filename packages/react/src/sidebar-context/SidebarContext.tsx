import { createContext } from "@radix-ui/react-context";

export const [SidebarContextProvider, useSidebarContext] = createContext<{
  expanded: boolean | undefined;
  navId: string;
  onExpandedChange: (expanded: boolean) => void;
  spacing: "8" | "12";
}>("Sidebar");
