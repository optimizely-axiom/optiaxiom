import { createContext } from "@radix-ui/react-context";

export const [SidebarProvider, useSidebarContext] = createContext<{
  /**
   * The `aria-current` value of an active `NavItem`. A primary nav item marks
   * the current section instead of the page while a `SubNav` item is active.
   */
  current: "page" | "true";
  expanded: boolean | undefined;
  navId: string;
  /**
   * Called by an active `NavItem`. `SubNav` tags its items' calls with
   * `"sub-nav"`.
   */
  onActiveChange: (active: boolean, nav?: "sub-nav") => void;
  onExpandedChange: (expanded: boolean) => void;
  spacing: "8" | "12";
}>("@optiaxiom/react/Sidebar");
