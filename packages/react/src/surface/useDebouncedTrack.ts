import type { unstable_useSurfaceContext } from "@optiaxiom/globals";

import { useDebouncedCallback } from "@mantine/hooks";
import { useRef } from "react";

import { useSurface } from "./useSurface";

/**
 * Hook to track Surface interactions with debouncing (300ms).
 * Use this for high-frequency events like `changed` interactions.
 *
 * Automatically tracks previous values for change events.
 *
 * @param initialValue - The initial value to use as the first "previous value"
 * @returns A debounced track function that accepts value, or undefined if not in a Surface context
 */
export function useDebouncedTrack(
  type: NonNullable<ReturnType<typeof unstable_useSurfaceContext>>["type"],
  initialValue?: unknown,
) {
  const { track } = useSurface(type) ?? {};
  const previousValueRef = useRef<unknown>(initialValue);

  const debouncedTrack = useDebouncedCallback((value: unknown) => {
    track?.({
      name: "changed",
      previousValue: previousValueRef.current,
      value,
    });
    previousValueRef.current = value;
  }, 300);

  return track ? debouncedTrack : undefined;
}
