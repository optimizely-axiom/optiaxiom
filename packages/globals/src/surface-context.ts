import {
  createContext,
  createElement,
  type ReactNode,
  useContext,
  useEffect,
} from "react";

type Surface = {
  /**
   * Optional data associated with this surface.
   */
  data?: Record<string, unknown>;
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
  /**
   * Optional value associated with this surface.
   */
  value?: unknown;
};

type SurfaceContextValue<V = unknown> = {
  accept: (suggestionId: string) => void;
  executeTool: (name: string, parameters: unknown) => Promise<void> | void;
  metadata: Record<string, Omit<Surface, "name">>;
  name: string;
  pageViewId: string | undefined;
  path: string;
  reject: (suggestionId: string) => void;
  renderSuggestionValue?: (value: V) => React.ReactNode;
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
  value?: V;
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
  add: <V = unknown>(
    suggestion: Extract<SurfaceSuggestion, { type: "message" | "value" }>,
    surface: Pick<
      SurfaceContextValue<V>,
      "accept" | "executeTool" | "reject" | "renderSuggestionValue"
    >,
  ) => () => void;
}>(null);
const SurfaceContext = createContext<null | SurfaceContextValue>(null);

const SurfaceProvider = <V = unknown>({
  accept,
  children,
  executeTool,
  reject,
  renderSuggestionValue,
  ...props
}: SurfaceContextValue<V> & {
  children?: ReactNode;
}) => {
  const suggestion = props.suggestions.find(
    (s) =>
      ("/" + props.path).endsWith("/" + s.surface) &&
      (s.type === "message" || (s.type === "value" && s.value !== props.value)),
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
      reject,
      renderSuggestionValue,
    });
  }, [
    accept,
    executeTool,
    props.suggestionAlert.registered,
    props.suggestionPopover.registered,
    reject,
    renderSuggestionValue,
    store,
    suggestion,
  ]);
  return createElement(SurfaceContext.Provider, {
    children,
    value: {
      accept,
      executeTool,
      reject,
      renderSuggestionValue,
      ...props,
    } as SurfaceContextValue,
  });
};

function useSurfaceContext() {
  return useContext(SurfaceContext);
}

export const unstable_SuggestionContext = SuggestionContext;

export const unstable_SurfaceProvider = SurfaceProvider;
export const unstable_useSurfaceContext = useSurfaceContext;
