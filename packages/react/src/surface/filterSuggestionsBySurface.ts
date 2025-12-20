import type { useSurface } from "./useSurface";

import { buildSurfacePath } from "./buildSurfacePath";

type Suggestion = NonNullable<
  ReturnType<typeof useSurface>
>["suggestions"][number];

type SurfaceMetadata = {
  name: string;
  type: string;
};

/**
 * Helper to filter suggestions by surface metadata.
 * Builds a target path by appending surfaces to the current context path,
 * then filters suggestions matching that path.
 */
export function filterSuggestionsBySurface<T extends Suggestion>(
  suggestions: T[] | undefined,
  path: string | undefined,
  surfaces: SurfaceMetadata[] | undefined,
) {
  if (!suggestions || !surfaces?.length) {
    return suggestions;
  }

  // Build the target path by appending surface metadata
  const targetPath = surfaces.reduce(buildSurfacePath, path ?? "");

  // Filter suggestions matching the target path
  return suggestions.filter((s) => s.surface === targetPath);
}
