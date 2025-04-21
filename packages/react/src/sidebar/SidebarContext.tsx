import { createContext } from "@radix-ui/react-context";

export const [SidebarProvider, useSidebarContext] = createContext<{
  expanded: boolean | undefined;
  navId: string;
  onExpandedChange: (expanded: boolean) => void;
  spacing: "8" | "12";
}>("@optiaxiom/react/Sidebar");
