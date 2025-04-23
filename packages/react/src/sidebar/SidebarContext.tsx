import { Context } from "radix-ui/internal";

export const [SidebarProvider, useSidebarContext] = Context.createContext<{
  expanded: boolean | undefined;
  navId: string;
  onExpandedChange: (expanded: boolean) => void;
  spacing: "8" | "12";
}>("@optiaxiom/react/Sidebar");
