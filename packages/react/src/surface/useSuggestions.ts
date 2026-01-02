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
export function useSuggestions(): Suggestion[] | undefined;
export function useSuggestions(
  type: "cards",
): Extract<Suggestion, { type: "cards" }>[] | undefined;
export function useSuggestions(
  type: "message",
): Extract<Suggestion, { type: "message" }>[] | undefined;
export function useSuggestions(
  type: "value",
): Extract<Suggestion, { type: "value" }>[] | undefined;
export function useSuggestions(type?: "cards" | "message" | "value") {
  const surface = useSurface();

  if (!surface?.suggestions) {
    return undefined;
  }

  // Filter suggestions to only those matching current path
  const filtered = surface.suggestions.filter((s) =>
    ("/" + surface.path).endsWith("/" + s.surface),
  );

  if (!type) {
    return filtered;
  }

  return filtered.filter((s) => s.type === type);
}
