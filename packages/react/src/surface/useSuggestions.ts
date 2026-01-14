import type { unstable_useSurfaceContext } from "@optiaxiom/globals";

import { useSurface } from "./useSurface";

type Suggestion = NonNullable<
  ReturnType<typeof useSurface>
>["suggestions"][number];

/**
 * Hook to access Surface suggestions for the current surface path only.
 * Returns suggestions that match the current surface context path exactly.
 * For child surface suggestions, use filterSuggestionsBySurface instead.
 *
 * @param type - Optional type filter ("value", "message", or "cards")
 * @returns Array of suggestions matching current path, or undefined if not in a Surface context
 */
export function useSuggestions<T extends "cards" | "message" | "value">(
  surfaceType: NonNullable<
    ReturnType<typeof unstable_useSurfaceContext>
  >["type"],
  type?: T,
) {
  const surface = useSurface(surfaceType);

  if (!surface?.suggestions) {
    return undefined;
  }

  // Filter suggestions to only those matching current path
  const filtered = surface.suggestions.filter((s) =>
    ("/" + surface.path).endsWith("/" + s.surface),
  );

  return (type ? filtered.filter((s) => s.type === type) : filtered) as [
    undefined,
  ] extends [T]
    ? Suggestion[] | undefined
    : Extract<Suggestion, { type: T }>[] | undefined;
}
