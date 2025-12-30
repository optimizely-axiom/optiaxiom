import { createContext } from "@radix-ui/react-context";

type Surface<
  T extends Record<string, unknown> | undefined =
    | Record<string, unknown>
    | undefined,
> = {
  /**
   * Optional data associated with this surface.
   */
  data?: T;
  /**
   * The surface name (used in surface path).
   */
  name: string;
  /**
   * The surface type.
   */
  type:
    | "action"
    | "cards"
    | "collection"
    | "dialog"
    | "page"
    | "product"
    | "property"
    | "resource"
    | "tab";
};

type SurfaceContextValue = {
  accept: (suggestionId: string) => void;
  executeTool: (name: string, parameters: unknown) => Promise<void> | void;
  metadata: Record<string, Omit<Surface, "name">>;
  name: string;
  pageViewId: string | undefined;
  path: string;
  reject: (suggestionId: string) => void;
  renderSuggestionValue?: (value: unknown) => React.ReactNode;
  suggestionPopover: {
    register: () => () => void;
    registered: boolean;
  };
  suggestions: SurfaceSuggestion[];
  track: (
    interaction: SurfaceInteraction,
    metadata?: Record<string, Omit<Surface, "name">>,
  ) => void;
  type: Surface["type"];
};

type SurfaceInteraction = { id?: string } & (
  | { checked: boolean; name: "toggled" }
  | { name: "added"; value: unknown }
  | { name: "blurred" }
  | { name: "changed"; value: unknown }
  | { name: "focused" }
  | { name: "invoked" }
  | { name: "removed"; value: unknown }
  | { name: "viewed" }
);

type SurfaceSuggestion = {
  createdAt: string;
  id: string;
  surface: string;
} & (
  | {
      cards: Array<{
        data: unknown;
        id: string;
        name: string;
        reason: string;
      }>;
      type: "cards";
    }
  | {
      reason: string;
      type: "value";
      value: unknown;
    }
  | {
      text: string;
      tool?: { name: string; parameters: unknown };
      type: "message";
    }
);

export const [unstable_SurfaceProvider, unstable_useSurfaceContext] =
  createContext<null | SurfaceContextValue>("@optiaxiom/globals/Surface", null);
