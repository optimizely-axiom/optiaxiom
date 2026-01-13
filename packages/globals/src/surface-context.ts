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
  track: (interaction: SurfaceInteraction, surfaces?: Surface[]) => void;
  type: Surface["type"];
  value?: V;
};

type SurfaceInteraction = { id?: string } & (
  | { checked: boolean; name: "toggled" }
  | { name: "added"; value: unknown }
  | { name: "blurred" }
  | { name: "changed"; previousValue?: unknown; value: unknown }
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

const SurfaceProvider = <V = unknown>(
  props:
    | (Partial<SurfaceContextValue<V>> & {
        children?: ReactNode;
        disabled: true;
      })
    | (SurfaceContextValue<V> & { children?: ReactNode; disabled?: false }),
) => {
  const {
    accept,
    children,
    disabled,
    executeTool,
    reject,
    renderSuggestionValue,
    ...rest
  } = props;

  const store = useContext(SuggestionContext);
  const suggestion =
    !disabled && "suggestions" in rest
      ? rest.suggestions?.find(
          (s) =>
            ("/" + rest.path).endsWith("/" + s.surface) &&
            (s.type === "message" ||
              (s.type === "value" && s.value !== rest.value)),
        )
      : undefined;

  useEffect(() => {
    if (
      disabled ||
      !store ||
      !suggestion ||
      suggestion.type === "cards" ||
      rest.suggestionAlert?.registered ||
      rest.suggestionPopover?.registered
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
    disabled,
    accept,
    executeTool,
    rest.suggestionAlert?.registered,
    reject,
    renderSuggestionValue,
    store,
    suggestion,
    rest.suggestionPopover?.registered,
  ]);

  return createElement(SurfaceContext.Provider, {
    children,
    value: disabled
      ? null
      : ({
          accept,
          executeTool,
          reject,
          renderSuggestionValue,
          ...rest,
        } as SurfaceContextValue),
  });
};

function useSurfaceContext() {
  return useContext(SurfaceContext);
}

export const unstable_SuggestionContext = SuggestionContext;

export const unstable_SurfaceProvider = SurfaceProvider;
export const unstable_useSurfaceContext = useSurfaceContext;
