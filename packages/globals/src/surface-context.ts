import {
  createContext,
  createElement,
  type ReactNode,
  useContext,
  useEffect,
} from "react";

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
  suggestionAlert: {
    register: () => () => void;
    registered: boolean;
  };
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
  page: string;
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

const SuggestionContext = createContext<null | {
  add: (
    suggestion: Extract<SurfaceSuggestion, { type: "message" | "value" }>,
    surface: Pick<
      SurfaceContextValue,
      "accept" | "executeTool" | "renderSuggestionValue"
    >,
  ) => () => void;
}>(null);
const SurfaceContext = createContext<null | SurfaceContextValue>(null);

const SurfaceProvider = ({
  accept,
  children,
  executeTool,
  renderSuggestionValue,
  ...props
}: SurfaceContextValue & {
  children?: ReactNode;
}) => {
  const suggestion = props.suggestions.find(
    (s) => s.type !== "cards" && ("/" + props.path).endsWith("/" + s.surface),
  );
  const store = useContext(SuggestionContext);
  useEffect(() => {
    if (
      !store ||
      !suggestion ||
      suggestion.type === "cards" ||
      props.suggestionAlert.registered ||
      props.suggestionPopover.registered
    ) {
      return;
    }

    return store.add(suggestion, {
      accept,
      executeTool,
      renderSuggestionValue,
    });
  }, [
    accept,
    executeTool,
    props.suggestionAlert.registered,
    props.suggestionPopover.registered,
    renderSuggestionValue,
    store,
    suggestion,
  ]);
  return createElement(SurfaceContext.Provider, {
    children,
    value: {
      accept,
      executeTool,
      renderSuggestionValue,
      ...props,
    },
  });
};

function useSurfaceContext() {
  return useContext(SurfaceContext);
}

export const unstable_SuggestionContext = SuggestionContext;

export const unstable_SurfaceProvider = SurfaceProvider;
export const unstable_useSurfaceContext = useSurfaceContext;
