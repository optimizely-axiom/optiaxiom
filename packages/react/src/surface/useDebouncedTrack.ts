import { useDebouncedCallback } from "@mantine/hooks";

import { useSurface } from "./useSurface";

/**
 * Hook to track Surface interactions with debouncing (300ms).
 * Use this for high-frequency events like `changed` interactions.
 *
 * @returns A debounced track function, or undefined if not in a Surface context
 */
export function useDebouncedTrack() {
  const { track } = useSurface() ?? {};

  const debouncedTrack = useDebouncedCallback(
    (interaction: Parameters<NonNullable<typeof track>>[0]) => {
      track?.(interaction);
    },
    300,
  );

  return track ? debouncedTrack : undefined;
}
