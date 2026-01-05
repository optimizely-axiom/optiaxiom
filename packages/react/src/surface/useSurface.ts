import { unstable_useSurfaceContext } from "@optiaxiom/globals";

/**
 * Hook to access Surface context with optional type filtering.
 *
 * @param type - Optional surface type to filter by. Only returns surface if it matches this type.
 * @returns Surface context if type matches (or any surface if no type specified), undefined otherwise
 *
 * @example
 * // Only get surface if it's an interaction surface
 * const surface = useSurface("interaction");
 *
 * @example
 * // Get any surface
 * const surface = useSurface();
 */
export function useSurface(
  type?: NonNullable<ReturnType<typeof unstable_useSurfaceContext>>["type"],
) {
  const surface = unstable_useSurfaceContext();

  if (surface && (!type || surface.type === type)) {
    return surface;
  }

  return undefined;
}
